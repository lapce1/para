# Design

<!-- impeccable:design 1 -->

The world is a **printed food label**. PARA has no food photography and none is
coming, so the product is *drawn and printed* rather than shot: flat process inks
on uncoated board, the way a label depicts what is inside the tin. Everything on
the surface follows from that one decision.

Seed key `ed4c0ba7` · candidate 6 of the grounded direction list · mode Persuade.
The direction contract is emitted as an HTML comment at the top of `<body>` in
`src/app/layout.tsx`; grep the built output for `ed4c0ba7` to audit it.

## Anti-reference

The previous identity (near-black ground, gold accent, soft gradients, steam
wisps as ambient decoration) is treated as evidence of what PARA is, never as
authority over what it looks like. Do not reintroduce: dark grounds as the page
default, gradient fills, glow or glass, rounded-full pills, or same-size
icon+heading+text cards as page structure.

Also refused, and not to be reintroduced: kickers/eyebrows above headings,
section numbers (01/02/03), hero-metric stat rows, and emoji standing in for
icons.

## Colour

Flat plates only. No gradient may be introduced anywhere.

| Token | Hex | Role |
|---|---|---|
| `paper` | `#EDE2CE` | Oat board — the ground |
| `board` | `#E2D4BB` | Deeper board for alternating panels |
| `ink` | `#241B14` | Espresso brown-black — all type, all rules. Never `#000` |
| `inksoft` | `#5B4B3C` | Secondary type, tinted from ink — never grey |
| `paprika` | `#A8371F` | The committed field; carries whole sections |
| `paprikabright` | `#C0442A` | Illustration plate + misregistration shift |
| `lime` | `#C9F23F` | The sharp accent — acid, not herbal. Used sparingly |
| `amber` | `#E8A33C` | Broth tone, **illustration only**, never UI chrome |

Measured contrast (all AA for body text): ink/paper 13.18 · ink/board 11.57 ·
paper/paprika 5.07 · lime/paprika 5.03 · ink/lime 13.09 · paper/ink 13.18.
`paprikabright` is a graphic plate, not a text background — it does not clear AA
with `paper` at body size.

Colour strategy is **Committed**: `paprika` and `ink` own whole sections so the
page reads as printed fields rather than accents scattered on a neutral.

## Type

Self-hosted in `public/fonts` (no third-party origins; CSP has no font origin).
All three faces carry Latin, Latin Extended and **Vietnamese** subsets — the
Vietnamese subset is mandatory, the brand word `phở` lives in it.

- **Archivo** (variable, `wdth` 62–125, `wght` 100–900) — display. Always via
  `.wordset`: weight 800, `wdth` 112, uppercase, `letter-spacing: -0.035em`,
  `line-height: 0.88`.
- **Chivo** — body copy. Measure capped at 62–68ch.
- **Chivo Mono** — prices, quantities, hours, lot codes. Measurement only, never
  as a "technical" costume. Always `tabular-nums`.
- **Bricolage Grotesque** — loaded *only* for the wordmark in `Logo.tsx`. The
  logo is unchanged brand and must not be restyled or re-set in another face.

`.stamp` is the small-caps utility for labels and section marks: Chivo Mono 700,
11px, `letter-spacing: 0.18em`, uppercase.

## Structure

- Rules, not borders: `3px` solid ink (`--rule`) for structural divisions,
  `1px ink/25` for list separators. No 1px grey card borders.
- Sections separated by full-width `border-y-[3px] border-ink`, not shadows.
- Vertical rhythm from `--section: clamp(4.5rem, 9vw, 8rem)`. More space above a
  heading than below it.
- Asymmetry is the compositional law: the hero is a 7/5 split with the product
  panel bleeding off the right edge (its section must keep `overflow-hidden`).
- Lists over cards. The menu is a **printed price list** with leader rules and
  right-aligned tabular prices, not a photo grid.

## Motion

One authored moment, reused: **offset-litho misregistration**. `.misreg` prints a
`currentColor` outline 4px out of register on hover/focus and snaps it back
(`cubic-bezier(0.16, 1, 0.3, 1)`, 260ms). `.plate-shift` does the type-level
version. `.rise` animates the drawn steam. Everything is disabled under
`prefers-reduced-motion`.

`.tooth` overlays an inline-SVG fibre grain (multiply, 0.16 opacity) so flat ink
reads as printed rather than flat-designed. No asset request, no external origin.

## Imagery

`BowlPlate.tsx` is the product, drawn as packaging art: flat fills, one heavy
`#241B14` keyline, and a duplicate silhouette offset 5px behind it as the
off-register plate. `StarAnise.tsx` is retained as the ingredients-list mark
(owner preference). When real photography eventually arrives it should sit
*inside* this world — full-bleed, high-contrast, never a rounded card thumbnail.

## Copy

Latin-script Serbian, informal "ti", dry and credible. The label idiom means
copy is stated as specification: contents, times, what is absent. The broth is
the subject of the page; packaging and assembly are a footnote on the delivery
row only. See PRODUCT.md for the terms that are the owner's to decide.
