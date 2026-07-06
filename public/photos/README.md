# Photos

Drop real food photography here, then reference it from the data — the layout is
already built around these slots (the `Photo` component shows a branded gradient
placeholder until a real file exists).

## Menu dishes

Add an `image` to the item in `src/data/menu.ts`, e.g.:

```ts
{ id: "pho-bo-tai", /* … */, image: "/photos/pho-bo-tai.jpg" }
```

Recommended: 4:3, ~1200×900, JPG/WebP, ~150–300 KB each. Suggested filenames
match the item `id`: `pho-bo-tai.jpg`, `pho-ga.jpg`, `pho-chay.jpg`, etc.

## Phở guide hero

`src/app/pho/page.tsx` renders a `<Photo … />` banner — pass it `src="/photos/pho-hero.jpg"`
(16:9, ~1600×900) for the guide's hero shot.

Images are served as-is (the site uses `images.unoptimized` for the static
Cloudflare export), so export them already compressed.
