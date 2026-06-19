# Deploying PARA to Cloudflare automatically from GitHub

PARA runs as **one Cloudflare Worker** that serves the static Next.js export (`./out`,
via the `ASSETS` binding) and handles `/api/*` for payments, backed by **D1**. This guide
sets up **push-to-deploy**: every push to `main` builds and ships automatically.

There are two ways to wire it. **Option A (GitHub Actions)** is already in this repo and
recommended. **Option B (Cloudflare Workers Builds)** needs no Actions file. Pick one.

---

## One-time setup (needed for either option)

### 1. Install Wrangler & log in (local, once)
```bash
npm install
npx wrangler login
```

### 2. Create the D1 database and apply the schema
```bash
npx wrangler d1 create para-orders
# Copy the printed database_id into wrangler.jsonc -> d1_databases[0].database_id
npx wrangler d1 execute para-orders --file=./schema.sql --remote
```

### 3. Set the app secrets (stored in Cloudflare, NOT in GitHub)
```bash
npx wrangler secret put ALLSECURE_API_KEY
npx wrangler secret put ALLSECURE_API_USER
npx wrangler secret put ALLSECURE_API_PASSWORD
npx wrangler secret put ALLSECURE_SHARED_SECRET
npx wrangler secret put RESEND_API_KEY
# once your ESIR vendor is chosen:
# npx wrangler secret put FISCAL_API_BASE
# npx wrangler secret put FISCAL_API_KEY
```
These are read by the running Worker; CI never sees them.

### 4. First manual deploy (proves config before automating)
```bash
npm run cf:deploy      # = next build + wrangler deploy
```

### 5. Point para.rs at the Worker
In the Cloudflare dashboard → **Workers & Pages → para → Settings → Domains & Routes**,
add the custom domain **para.rs** (and **www.para.rs**). This replaces whatever currently
serves the domain. DNS for para.rs is already on Cloudflare, so this is a couple of clicks.

> ⚠️ If para.rs is currently served by a **Cloudflare Pages** project, detach that domain
> from Pages first (or delete the Pages project) so the Worker takes over the hostname.

---

## Option A — GitHub Actions (this repo: `.github/workflows/deploy.yml`)

The workflow runs on every push to `main`: `npm ci` → typecheck Worker → `next build` →
`wrangler deploy`. You only need to give it two GitHub secrets.

### Create a scoped Cloudflare API token
Cloudflare dashboard → **My Profile → API Tokens → Create Token**.
Use the **"Edit Cloudflare Workers"** template, then ensure these permissions:
- Account → **Workers Scripts**: Edit
- Account → **D1**: Edit
- Account → **Workers KV / Workers R2**: not needed
- (Account → **Account Settings**: Read — usually included)

Scope it to your account. Copy the token.

### Find your Account ID
Dashboard → **Workers & Pages** → right sidebar shows **Account ID**.

### Add them as GitHub repository secrets
Repo → **Settings → Secrets and variables → Actions → New repository secret**:
- `CLOUDFLARE_API_TOKEN` = the token above
- `CLOUDFLARE_ACCOUNT_ID` = your Account ID

That's it. Push to `main` (or run the workflow manually from the **Actions** tab) and it deploys.

---

## Option B — Cloudflare Workers Builds (no Actions file)

If you'd rather not manage a token in GitHub, let Cloudflare build from the repo:

1. Dashboard → **Workers & Pages → Create → Workers → Connect to Git**, pick this repo.
2. Build settings:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - (Wrangler config `wrangler.jsonc` is auto-detected.)
3. Cloudflare installs the GitHub app and redeploys on every push to `main`.

Secrets and D1 are still set once via steps 2–3 above (or in the dashboard under the
Worker's **Settings → Variables and Secrets** / **Bindings**).

---

## Notes

- **`npm ci` needs `package-lock.json`** — it's committed, so CI installs are reproducible.
- The legacy [`.github/workflows/main.yml`](.github/workflows/main.yml) ("move files to
  root") is from the old static-file setup and is **no longer needed** — it only runs on
  manual dispatch, so it won't interfere, but you can delete it.
- **Migrations:** if you change `schema.sql` later, re-run the `wrangler d1 execute … --remote`
  command. CI does not run migrations automatically (intentional — schema changes are deliberate).
- **Rollback:** `npx wrangler rollback` reverts the Worker to the previous deployment.
- **Custom domain TLS** is automatic once para.rs is attached to the Worker.
