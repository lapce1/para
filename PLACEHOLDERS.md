# PARA — placeholders to replace before launch

Everything below ships with a placeholder value. Work top-to-bottom; nothing here
needs code changes — just real values. Check each box as you go.

---

## 1. Business contact & links — [`src/data/site.ts`](src/data/site.ts)

| Field | Current (placeholder) | Put your real value |
|---|---|---|
| `phone` | `+381 60 1234567` | Real phone, display format (spaces OK) |
| `viber` | `381601234567` | Same number, **digits only, country code, no `+`** |
| `whatsapp` | `381601234567` | Same number, **digits only, no `+`** |
| `email` | `zdravo@para.rs` | Real inbox you read |
| `instagram` | `instagram.com/para.phokuhinja` | Real profile URL |
| `url` | `https://para.rs` | Your live origin (no trailing slash) — used for SEO/canonicals |
| `hours` | `Svaki dan 11–22h` | Real hours (also update `seo.openingHours`) |
| `deliveryFee` / `freeDeliveryOver` | `200` / `1800` | Match operations (RSD) |
| `zones` | 6 sample NS neighborhoods | Real delivery zones |
| `aggregators.wolt/glovo/mrd` | generic city URLs | Your actual listing URLs |

### SEO block in the same file (`site.seo`)
- [ ] `openingHours` — machine format, e.g. `"Mo-Su 11:00-22:00"` (must match `hours`)
- [ ] `priceRange` — e.g. `"800–1100 RSD"`
- [ ] `streetAddress` + `postalCode` — **leave empty until the business is registered.**
      The JSON-LD omits them while empty rather than publishing a fake address. Fill once you have them.

---

## 2. Menu prices & VAT — [`src/data/menu.ts`](src/data/menu.ts) + [`src/worker/menu.ts`](src/worker/menu.ts)

- [ ] Confirm every **price** in `menu.ts` is current (this is the amount actually charged).
- [ ] **VAT labels** in `src/worker/menu.ts`: every item defaults to `"Ђ"` (10%). Your
      knjigovođa must confirm the rate per item — it prints on the fiscal receipt and must
      be correct. Add exceptions to `TAX_OVERRIDES` (e.g. drinks may be `"Е"` = 20%).

---

## 3. Cloudflare config — [`wrangler.jsonc`](wrangler.jsonc)

- [ ] `d1_databases[0].database_id` — replace `REPLACE_WITH_D1_ID_FROM_wrangler_d1_create`
      with the id printed by `wrangler d1 create para-orders`.
- [ ] `vars.PUBLIC_BASE_URL` — `https://para.rs` (your live origin; used to build the
      success/cancel/callback URLs sent to AllSecure).
- [ ] `vars.RECEIPT_FROM` — `PARA <racun@para.rs>` → a sender on your **Resend-verified** domain.
- [ ] `vars.ALLSECURE_SIGN_OUTGOING` — leave `"false"`; flip to `"true"` only if AllSecure
      returns error `1004 Invalid signature` on the debit call.

---

## 4. Secrets (never committed) — set with `wrangler secret put NAME`

Template: [`.dev.vars.example`](.dev.vars.example). For local dev copy it to `.dev.vars` (git-ignored).

- [ ] `ALLSECURE_API_KEY`        (from AllSecure merchant onboarding)
- [ ] `ALLSECURE_API_USER`
- [ ] `ALLSECURE_API_PASSWORD`
- [ ] `ALLSECURE_SHARED_SECRET`  (HMAC key for postback verification)
- [ ] `RESEND_API_KEY`           (after verifying `para.rs` as a Resend sending domain)
- [ ] `FISCAL_API_BASE` / `FISCAL_API_KEY`  (only once you pick an ESIR/PFR vendor)

---

## 5. Fiscalization vendor — [`src/worker/fiscalization.ts`](src/worker/fiscalization.ts)

- [ ] Pick a **licensed ESIR/PFR** vendor with an HTTP API and implement `issueReceipt()`
      (skeleton is in the file). Until then it's a stub: payments still succeed, orders are
      flagged for manual fiscalization. AllSecure does **not** issue fiscal receipts.

---

## 6. Confirm with AllSecure at onboarding (don't guess)

- [ ] RSD amount format — `"950.00"` vs `"950"`, currency `"RSD"` vs ISO `941` (`src/worker/money.ts`).
- [ ] Postback success payload shape (code treats `result === "OK"` + no `errors[]` as paid).
- [ ] **DinaCard** support (domestic-only cards) and **IPS QR** (far cheaper than card MDR).

---

## 7. Security housekeeping

- [ ] **Move `aa` / `aa.pub` (your SSH keypair) out of the repo.** It's git-ignored now so it
      won't be committed, but a private key shouldn't live in a project folder at all.
