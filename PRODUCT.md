# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: students and young professionals in central Novi Sad, at **lunchtime**, plus the surrounding neighborhood. The lokal sits at Stražilovska 10, ground floor, near the faculties: walk-in traffic on foot, deciding fast, usually on a phone. Mobile is the dominant surface (~90% of traffic expected from Instagram/TikTok).

Three ways the same person meets the product: eating in at one of the few tables, taking away, or ordering delivery across Novi Sad.

## Product Purpose

PARA cooks real Vietnamese phở in Novi Sad and serves it hot, at its own tables, for takeaway, and on delivery. Success is a person who came for lunch coming back next week, and telling someone.

## Positioning

The broth is the product. It simmers **6 hours every day** on beef bones, oxtail and brisket with roasted ginger and onion and five spices: star anise, cinnamon, clove, cardamom, ginger. No bouillon cubes, no shortcuts, no preservatives. That is the claim a neighboring kitchen cannot truthfully copy, and it is the thing to sell.

Explicit owner direction (2026-08-10): **the separate-packaging / assemble-at-home ritual is a short-lived gimmick and must not be the theme.** It remains a true operational detail of delivery only. The product, the bowl and the broth, is the selling point.

## Operating Context

- Lokal: Stražilovska 10, Novi Sad (centar, 50 m², ground floor, near the faculties). Several tables, walk-in, no reservations.
- Hours: every day 11–22.
- Delivery across Novi Sad: Centar, Liman, Grbavica, Novo Naselje, Detelinara, Podbara. 200 RSD fee, free over 1800 RSD. Aggregators (Wolt, Glovo, mr.D) also listed.
- Pre-launch as of writing: ordering is gated behind a waitlist (`site.orderingLive: false`); the Meta Pixel is inert (`site.metaPixelId: ""`). Both are the owner's levers and must never be flipped by an agent.

## Capabilities and Constraints

- Menu (RSD, direct channel), set by the owner on 2026-08-10: **Phở Bò 650** and **Pilsner Urquell 350**. That is the entire menu. There are no sides, no add-ons, no chicken or vegan bowl and no coffee; all of those were removed at the owner's direction, and the copy now says plainly that the menu is two items. **Prices and menu data are product truth; never invent or alter them.**
  - Open item: the beer's serving format (draught or bottle, and volume) is not recorded anywhere and must not be invented.
  - Open item: `src/worker/menu.ts` prices every line at the reduced VAT label "Ђ" (10%). Alcohol is normally the standard "Е" (20%); the override is present but commented out and needs a decision before ordering goes live.
- Payments: card online via AllSecure (3-D Secure) and cash/card on delivery. Fiscal receipt emailed on payment.
- Stack: Next.js 14 App Router with `output: "export"` (fully static), TypeScript, Tailwind. Cloudflare Worker serves the export via the ASSETS binding and owns the API (checkout, D1 orders, fiscalization seam, Resend receipts).
  - `next.config` redirects are ignored under static export, so redirects live in `src/worker/index.ts`.
  - No middleware, no ISR, no server components with dynamic data.
  - CSP lives in `src/worker/security.ts` and applies to every response; any new external origin must be added there in the same commit.
  - Fonts are self-hosted in `public/fonts` (no third-party font origins).
- Terminology: consumer copy is **Latin-script Serbian**, informal "ti". Open terms that must be left as found unless the owner decides: the phở pronunciation gloss, `temeljac` vs `bujon` (the site consistently uses `supa`), and the declension of "PARA" in oblique cases.

## Brand Commitments

- Name: PARA. In Serbian, *para* is the steam rising off a hot bowl, so the name is the product's own physical evidence, and the one piece of wordplay the brand owns.
- Voice: dry, credible, urban. Not cute, not hypey.
- Vietnamese dish names are used as the real names (Phở Bò), with Serbian description alongside.
- Owner direction (2026-08-10): the previous look reads as generic/AI-default and is treated as **anti-reference**, not authority. Full visual-world replacement is authorized.
- Owner direction (2026-08-10, second pass): the printed-label look that replaced it was also rejected. Cream grounds, muted colour, the drawn bowl and all hover animation are out. The surface is now black with bright saturated inks. See DESIGN.md.
- Voice correction (2026-08-10): the clipped declarative style, where every line reads like a punchline, is explicitly not wanted. Write plain connected sentences. **No em-dashes anywhere**, in copy or code comments.

## Evidence on Hand

- Real: address, hours, delivery zones, menu with real prices, the 6-hour broth process and its aromatics, payment/fiscalization flow.
- **No food photography and none expected for a while** (owner-confirmed). The design must carry the product without photographs; any imagery must be authored. Do not source stock food photos and do not present synthetic imagery as the real kitchen.
- No reviews, ratings, customer counts, awards, or press exist. These must not be fabricated.
- Existing assets: `public/icon.svg` (steam-wisp mark), generated OG image.

## Product Principles

1. **Sell the broth, not the logistics.** Cooking time, bones and spices are the story; packaging and assembly are an operational footnote.
2. **Lunch decides.** A hungry person on a phone must know what this is, what it costs, and where it is, in seconds.
3. **Never fabricate proof.** No invented reviews, counts, awards, or photographed dishes.
4. **Local and physical.** Address, hours and the room are primary facts, not footer text.
5. **Owner levers stay owner levers.** `orderingLive`, `metaPixelId`, prices, and payment logic are never changed by an agent.

## Accessibility & Inclusion

WCAG AA contrast for text is an established project standard (previously audited and fixed); keyboard focus is visible on all interactive elements; motion respects `prefers-reduced-motion`. Serbian diacritics and Vietnamese diacritics must both render, so any chosen typeface must cover Latin Extended and Vietnamese, or carry a fallback that does.
