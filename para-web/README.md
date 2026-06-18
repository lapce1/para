# PARA — phở kuhinja (web)

Next.js 14 + TypeScript + Tailwind. Landing, menu, ordering and story pages,
fully populated with copy and menu data.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Make it real (edit `src/data/site.ts`)
- `phone`, `viber`, `whatsapp` — your real numbers (Viber/WhatsApp = digits only, no +).
- `aggregators.wolt/glovo/mrd` — your real listing URLs.
- `deliveryFee`, `freeDeliveryOver`, `zones`, `hours` — match operations.

## Add photos (optional)
Cards and the hero render with styled CSS/SVG so the site looks complete with
zero images. To use real photography, drop files in `public/images/` and swap the
`<BowlArt/>` / swatch blocks for `<img>` — see Appendix B of the business plan for
ready-to-use image-generation prompts.

## Ordering
Direct orders open a pre-filled WhatsApp/Viber message or a phone call (no backend).
Aggregator buttons link out to Wolt/Glovo/mr.D. To take card payments online later,
wire the `/poruci` checkout to a payment provider + a small order API.
