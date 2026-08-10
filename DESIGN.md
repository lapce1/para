# Design

<!-- impeccable:design 1 -->

The world is a **lit sign on a dark street**. PARA has no food photography and
none is coming, so the product is never depicted: the page states what is in the
bowl, what it costs and where the room is, at full contrast, and lets type and
flat colour do the rest. Everything on the surface follows from that decision.

## Anti-reference

Two previous identities are treated as evidence of what PARA is, never as
authority over what it looks like.

Refused from the first identity: soft gradients, glow, glass, rounded-full
pills, and same-size icon+heading+text cards as page structure.

Refused from the second (the printed-label build): cream and oat board grounds,
the fibre-grain overlay, the drawn bowl illustration, and the offset-litho
misregistration hover. Muted or tinted colour of any kind is refused with them.

Also refused, and not to be reintroduced: kickers/eyebrows above headings,
section numbers (01/02/03), hero-metric stat rows, and emoji standing in for
icons.

## Colour

Flat plates at full saturation. No gradient, no tint, no muted step may be
introduced anywhere.

| Token | Hex | Role |
|---|---|---|
| `ground` | `#0A0A0A` | True black, the page ground |
| `raised` | `#1A1A1A` | Raised panels, one step off the ground |
| `chalk` | `#FFFFFF` | All primary type and all rules |
| `chalksoft` | `#A6A09A` | Secondary type, warm grey, never blue-grey |
| `chili` | `#FF3B30` | The committed field; carries whole sections and the primary CTA |
| `jade` | `#00E676` | Section marks, links, the closing field |
| `gold` | `#FFD400` | Prices, hover state on primary buttons, the focus ring |

Measured contrast: chalk/ground 19.4 · chalksoft/ground 7.8 · chili/ground 5.6 ·
jade/ground 11.9 · gold/ground 13.8.

**Colour fields carry black type, never white.** `chalk` on `chili` is 3.6:1 and
fails AA; `ground` on `chili` is 5.6:1 and passes. Any new full-bleed colour
section must set `text-ground`.

Colour strategy is **committed**: `chili` and `jade` own whole sections so the
page reads as lit panels rather than accents scattered on a neutral.

## Type

Self-hosted in `public/fonts` (no third-party origins; CSP has no font origin).
All three faces carry Latin, Latin Extended and **Vietnamese** subsets. The
Vietnamese subset is mandatory, the brand word `phở` lives in it.

- **Archivo** (variable, `wdth` 62–125, `wght` 100–900) for display. Always via
  `.wordset`: weight 800, `wdth` 112, uppercase, `letter-spacing: -0.035em`,
  `line-height: 0.88`.
- **Chivo** for body copy. Measure capped at 62–68ch.
- **Chivo Mono** for prices, quantities, hours and lot codes. Measurement only,
  never a "technical" costume. Always `tabular-nums`.
- **Bricolage Grotesque** loaded *only* for the wordmark in `Logo.tsx`. The logo
  is unchanged brand and must not be restyled or re-set in another face.

`.stamp` is the small-caps utility for labels and section marks: Chivo Mono 700,
11px, `letter-spacing: 0.18em`, uppercase.

## Structure

- Rules, not borders: `3px` solid chalk (`--rule`) for structural divisions,
  `1px chalk/25` for list separators. No 1px grey card borders.
- Sections separated by full-width `border-y-[3px] border-chalk`, not shadows.
- Vertical rhythm from `--section: clamp(4.5rem, 9vw, 8rem)`. More space above a
  heading than below it.
- Asymmetry is the compositional law: the hero is a 7/5 split, headline and deck
  left, the contents panel boxed right.
- Lists over cards. The menu is a **printed price list** with leader rules and
  right-aligned tabular prices in `gold`, not a photo grid.

## Motion

**There is none on hover.** Interactive elements swap colour instantly: no
transition, no transform, no shadow, no outline offset. This is a deliberate
constraint, not an oversight; do not reintroduce hover transitions.

The only animation in the build is the payment spinner on
`/placanje/uspesno`, which already respects `motion-reduce`. Smooth scrolling is
disabled under `prefers-reduced-motion`.

## Imagery

**There is none, and that is the point.** The drawn bowl was removed at the
owner's direction. `StarAnise.tsx` survives as the ingredients-list mark (owner
preference) and is the only drawn element left. When real photography eventually
arrives it should sit full-bleed and high-contrast, never as a rounded card
thumbnail.

## Copy

Latin-script Serbian, informal "ti". Plain connected sentences, not slogans:
the owner's explicit direction is that the declarative style where every line
lands like a punchline is wrong for this brand. Say the thing, give the reason,
move on.

**No em-dashes anywhere**, in copy or in code comments. Use a comma, a colon or
a full stop. `·` is fine as a separator in stamps and metadata.

The broth is the subject of the page. The menu is two items and the copy says so
plainly rather than hiding it. Packaging and assembly are a footnote on the
delivery row only. See PRODUCT.md for the terms that are the owner's to decide.
