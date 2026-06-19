# PARA — card payments, receipts & SEO

Card payments (AllSecure Exchange), e-fiscal receipts, and on-page SEO for the
static PARA site, **all on Cloudflare**. The Next.js static export stays as-is; one
Worker sits in front of it, handles `/api/*`, applies security headers, and falls
through to the site for everything else. The Viber/WhatsApp flow stays as the
zero-fee fallback.

## Layout

```
src/worker/
  index.ts          Router + security headers + static-asset fallthrough (entrypoint)
  allsecure.ts      AllSecure v3 adapter — debit, request signing, postback verification
  security.ts       Security headers (CSP, HSTS, frame/permissions policy)
  fiscalization.ts  ESIR/PFR provider interface + stub  <-- the seam you fill in
  email.ts          Receipt email via Resend (HTML-escaped)
  menu.ts           Server-authoritative pricing (client total is never trusted)
  money.ts          RSD amount formatting
  orders.ts         D1 persistence, idempotent status, once-only receipt (PAID is terminal)
src/client/
  checkout.ts       startCardCheckout() + pollOrderStatus() (used by the Next app)
src/app/
  poruci/           "Plati karticom" button + email field wired into the cart
  placanje/uspesno  success page — polls the verified postback, not the redirect
  placanje/otkazano cancelled page
  placanje/greska   error page
  sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx, icon (public/icon.svg)
schema.sql          orders table
wrangler.jsonc      Worker + D1 + assets bindings
.dev.vars.example   secrets template
test-signature.mjs  proves the HMAC matches AllSecure's published test vector
```

## Request flow (Hosted Payment Page)

```
Browser                      Worker (/api)                 AllSecure
  | POST /api/checkout  -------> same-origin check, price cart (server)
  |                              create order (PENDING, D1)
  |                              POST /debit  ----------------------------> 
  |                              <----------- { redirectUrl }
  | <----- { redirectUrl }       store uuid/purchaseId
  | --- redirect to AllSecure hosted page (3DS) ---------------------------> 
  |                              <== signed postback ===================== (source of truth)
  |                              verify X-Signature (HMAC-SHA512, timing-safe)
  |                              order -> PAID, amount asserted
  |                              issue fiscal receipt (ESIR) + email, once
  | <--- redirect to /placanje/uspesno?mtx=...
  | poll /api/order/:mtx/status  -> PAID + receipt link
```

Two non-negotiables: the **postback, not the browser redirect, is proof of payment**;
and the **amount is recomputed server-side** from `menu.ts`, never taken from the client.

## Security (what's hardened)

- **Server-authoritative pricing** — client sends `{id, qty}` only; total is recomputed.
- **Signed-postback verification** — HMAC-SHA512, constant-time compare; unverifiable
  postbacks are rejected (401) so the gateway retries rather than us trusting a forgery.
- **PAID is terminal** — a late/duplicate FAILED postback can't un-pay a settled order.
- **Once-only receipts** — `claimReceiptIssuance()` is an atomic guarded UPDATE.
- **Same-origin guard + payload caps** on `/api/checkout` (body ≤ 16 KB, ≤ 100 lines).
- **Security headers on every response** — CSP, HSTS, `X-Content-Type-Options`,
  `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, COOP (`security.ts`).
- **HTML-escaped receipt email**; `href` restricted to http(s).
- **Secrets** only via Worker secrets / `.dev.vars` (git-ignored). No card data ever
  touches our server — AllSecure hosts the card form.

## Setup

1. **Build** the static export: `npm run build` → `./out` (next.config: `output: 'export'`).
2. **D1**:
   ```bash
   wrangler d1 create para-orders          # paste the id into wrangler.jsonc
   wrangler d1 execute para-orders --file=./schema.sql --remote
   ```
3. **Secrets** (see `.dev.vars.example`):
   ```bash
   wrangler secret put ALLSECURE_API_KEY
   wrangler secret put ALLSECURE_API_USER
   wrangler secret put ALLSECURE_API_PASSWORD
   wrangler secret put ALLSECURE_SHARED_SECRET
   wrangler secret put RESEND_API_KEY
   # FISCAL_API_BASE / FISCAL_API_KEY once your ESIR vendor is chosen
   ```
4. **Deploy:** `npm run cf:deploy` (build + `wrangler deploy`).
   Local dev: copy `.dev.vars.example` → `.dev.vars`, fill it, `npm run cf:dev`.
5. **Typecheck the Worker:** `npm run cf:typecheck`.

## The fiscalization seam

`fiscalization.ts` ships as a stub that throws `FISCALIZATION_NOT_CONFIGURED`. While it's
a stub the payment leg works end-to-end — orders settle to PAID and are flagged for manual
fiscalization (the receipt-issued claim is released so a later retry/cron can fiscalize).
Implement `issueReceipt()` against your licensed ESIR/PFR vendor's HTTP API (skeleton in
the file), set `FISCAL_API_BASE`/`FISCAL_API_KEY`, and receipts issue + email automatically.

## Confirm during onboarding (the known unknowns — don't guess)

- **RSD amount format** — `"950.00"` vs `"950"`, currency `"RSD"` vs ISO `941`. All in `money.ts`.
- **Outgoing signing** — if the debit call returns `1004 Invalid signature`, set
  `ALLSECURE_SIGN_OUTGOING=true`. (Incoming postback verification is always on.)
- **Postback success field** — code treats `result === "OK"` + no `errors[]` as success;
  confirm the failure-case payload shape.
- **DinaCard + IPS QR** — ask whether your connector includes DinaCard, and whether IPS QR
  (instant account-to-account, far cheaper than card MDR) can be enabled alongside cards.
- **VAT labels** — `menu.ts` tags every item `"Ђ"` (10%) as a placeholder; your knjigovođa
  confirms the correct rate per item before it prints on the fiscal receipt.

## SEO

- Per-page `<title>`/description, canonicals, Open Graph + Twitter (`layout.tsx` + page
  metadata). Payment result pages are `noindex`.
- `Restaurant` + `Menu` JSON-LD (`src/lib/seo.ts`), driven by `src/data` so it can't drift.
- `sitemap.xml`, `robots.txt` (disallows `/placanje/` + `/api/`), web manifest, SVG favicon,
  and a build-time OG image (`opengraph-image.tsx`).
- Fill `site.seo.streetAddress` / `postalCode` once the business address is registered —
  the schema omits them while empty rather than emitting a fake address.

## Verification done here

- `node test-signature.mjs` reproduces AllSecure's documented HMAC vector exactly.
- TODO before first deploy: `npm install` then `npm run build` and `npm run cf:typecheck`
  (node_modules wasn't present in this environment, so the full build wasn't run here).
