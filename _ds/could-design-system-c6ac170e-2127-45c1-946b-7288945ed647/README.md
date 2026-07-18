# COULD — Design System

> **Possibility is a Can.**
> A small-batch UK matcha brand. Functional, plant-based, quietly energising.
> First product: **Matcha Yuzu Lemonade** — a lightly carbonated, L-Theanine
> infused green tea with ceremonial-grade matcha.

This folder is a working design system for **COULD**. It collects the brand's
official typography, colours, illustrations, photography and logo files; codifies
them into CSS tokens and React components; and provides UI kits that designers
and agents can use to mock or ship interfaces that look, sound, and feel like
COULD.

---

## Sources

This system was built from materials provided by the brand:

| Source | What's in it |
| --- | --- |
| **Horunu/design-system-could** (GitHub) | Logos (Main + Isotype, SVG + PNG, 10 brand colours), 10 line illustrations (Picnic, Morning Ritual, Me-time Pause, Mindful Balance, Active Flow, On the Move, Elegant Table, Shared Gathering, Urban Escape, Post-workout Refresh), 33 brand photographs, fonts (Figtree, Antarctican Mono), Instagram grid templates, business cards, letterheads, social mockups, and the **MUSED × Could – Brand Guidelines.pdf** (14 MB — not imported; explore directly on GitHub). |
| **Could_Sleeve_art.pdf** (local) | Production sleeve artwork for the 250 ml slim can — product copy, nutrition info, ingredient list, sleeve cutter dimensions. |
| `uploads/matcha lemonade mockup.png`, `uploads/Matcha Original – Can File.ai`, `uploads/OHE250mlTemplate – Jasmine Yuzu Matcha.ai` | Can artwork files (referenced but not yet imported — see Caveats). |

> If you want richer brand context, open
> [Horunu/design-system-could](https://github.com/Horunu/design-system-could)
> and read the full `MUSED x Could - Brand Guidelines.pdf`. Everything below
> is a distillation; the guidelines PDF is the source of truth for any
> regulated or print application.

---

## Index — what's in this folder

```
README.md                  ← you are here
SKILL.md                   ← agent skill manifest (runnable as a Claude Code skill)
colors_and_type.css        ← single CSS file with all tokens + semantic styles
fonts/                     ← .woff2 files (Antarctican Mono, Figtree)
assets/
  logo/                    ← wordmark + isotype, in every brand colour
  illustrations/           ← 10 line-illustration SVGs ("Picnic", "Morning Ritual"…)
  imagery/                 ← brand photography (botanical, lifestyle)
preview/                   ← design-system-tab cards (rendered swatches & specimens)
ui_kits/
  packaging/               ← can sleeve recreation, label system, product card
  marketing-site/          ← e-commerce / brand site recreation
```

---

## CONTENT FUNDAMENTALS — how COULD writes

COULD's voice is **calm, deliberate, sensory, and self-aware**. It treats a can
of matcha the way a high-end coffee brand treats a single-origin bean: as a
ritual object. The brand is in conversation with the reader, but it never
shouts. Lines are short. Verbs do work. Adjectives are quietly chosen.

### Tone
- **Quiet, never loud.** "Quietly energising", "calm, collected, quietly sparkling".
- **Sensory and embodied.** Soft edges. Slow afternoons. Time to yourself.
- **Confidently understated.** "COULD isn't about keeping up, it's about slowing
  down just enough to savour."
- **Aspirational without performance.** "Modern yet timeless. Every can carries
  a small ritual of clarity you can slip into your day, wherever it takes you."

### Voice rules
- **Address the reader as "you"** ("a can that tastes like time to **yourself**").
  Almost never "we" — the brand is the can, not the company.
- **British English.** "Flavour", "savour", "energising", "colour".
- **Sentence case for body. UPPERCASE for headlines & labels.**
  The wordmark, product names, taglines, and section eyebrows are all-caps.
- **Em-dashes and short clauses for rhythm.** "Calm, collected, quietly sparkling."
- **No exclamation marks.** Ever.
- **No emoji.** The brand uses hand-drawn line illustrations instead. If a
  social caption needs a visual marker, it's a Unicode em-dash or a soft
  geometric character like `◯` or `—`, not a 🎉.
- **Numbers stay literal.** "250 ml", "100 mg L-Theanine", "0.4 % Yuzu juice".

### Vocabulary the brand owns
*Possibility, ritual, intention, savour, slow, soft, clarity, quietly, calm,
collected, sparkling, gentler, moments that matter, in motion, plant-based,
ceremonial-grade, the long way round.*

### Vocabulary the brand avoids
Hustle, boost, supercharged, energy bomb, sip your way to, life hack, level up,
amazing, incredible, premium (it *is* premium, it doesn't need to say so),
matcha-fied / matcha-tastic, lifestyle, wellness journey, biohack.

### Reference lines (from official materials)
- **Tagline:** "POSSIBILITY IS A CAN"
- **Hero:** "MATCHA, IN MOTION — 100% ———— ORGANIC"
- **Caption:** "For moments that matter."
- **Long copy:** "Crafted for those who drink with intention and a touch of
  indulgence. Organic, plant-based, and quietly energising, COULD isn't about
  keeping up, it's about slowing down just enough to savor."
- **Mood lines:** "A can that tastes like time to yourself. Whether it's a
  morning that needs soft edges, or an afternoon that calls for a gentler kind
  of lift. Calm, collected, quietly sparkling."

---

## VISUAL FOUNDATIONS

### The system at a glance
COULD's visual identity is built on **off-white pages, deep green ink, hand-drawn
line illustrations, and one quiet typographic voice paired with one editorial
mono voice.** It reads like a small-press cookbook or a botanical field journal,
not a tech brand.

### Colour
Sampled directly from the official isotype PNGs.

| Token | Hex | Role |
| --- | --- | --- |
| `--could-off-white` | `#F8F5E7` | Canonical page background. Everything starts here. |
| `--could-anchor-green` | `#445521` | Primary ink. Logo, body type on cream, dominant brand surface. |
| `--could-dark-green` | `#2E3119` | Strongest contrast type, near-black. Sparingly. |
| `--could-soft-green` | `#A0A66C` | Supporting green. Backgrounds, secondary fills. |
| `--could-lime` | `#CCC10B` | Yuzu / lemonade accent — used on a single can flavour. |
| `--could-coral` | `#F39E80` | Warm pop. One per layout, never two. |
| `--could-light-blue` | `#D0DEE4` | Cool pastel wash. Editorial backdrops. |
| `--could-pale-blue` | `#A7C0E5` | Deeper sky. Secondary flavour wash. |

The default page is **off-white + anchor green**. Pastel backgrounds (light blue,
blush coral) are used for editorial moments. Pure black and pure white are used
extremely sparingly — almost everything reads as "deep green on cream".

### Typography
- **Display / UI:** Figtree, semi-bold to bold, often uppercase. Substitutes for
  the brand's custom geometric wordmark in product UI. *Flagged as a substitution
  — see Caveats.*
- **Body / editorial:** **Antarctican Mono** (Book / Medium / SemiBold / Bold).
  Used for product descriptions, tasting notes, captions, ingredient lists. The
  monospace gives the brand its "field-notes / typewriter / lab-report" feel.
- **Scale:** Editorial. Display sizes are large and confident (64–96 px on
  packaging-led layouts). Body type sits at 16 px with generous line-height
  (1.45–1.7). Eyebrow labels are very small (11 px) with **wide tracking**
  (0.32 em) and uppercase.
- **Setting:** Headlines are uppercase, sometimes letterspaced. Long body copy
  is sentence-case, never justified — always ragged-right.

### Layout
- **Generous negative space.** Compositions breathe. A title on cream with a
  postage-stamp illustration centred below is a typical COULD layout.
- **Centred or quietly asymmetric.** No aggressive z-patterns or maximalist
  grids. When laid out off-centre, the framing is deliberate (margin notes,
  monospaced captions hugging the bottom).
- **Bordered "card-in-card" framing.** Editorial pieces often sit a cream
  panel inside a deeper colour border — see the Instagram grid.
- **No drop shadows on layouts.** Elevation is communicated by *containment*
  (a panel inside a panel), not by Y-offset shadows.

### Backgrounds & textures
- **Solid washes** are the default. No gradients, no noise, no patterns.
- **Photography** is botanical, lifestyle, warm and analog: leaves backlit by
  natural light, cans in soft daylight, hands holding food. No studio-clean
  product cutouts.
- **Illustrations** are hand-drawn pencil/charcoal line art on cream, with the
  occasional touch of green or coral as a single splash of colour on the
  illustrated can.
- **No stock 3D, no gradients, no glassmorphism, no glow.**

### Imagery direction
- **Mood:** warm, sunlit, natural daylight. Slight grain is fine.
- **Subjects:** ingredients, leaves, hands, picnic tables, café fronts,
  picnic blankets, ceramic vessels. People are present but secondary.
- **Colour temperature:** warm-neutral — greens, creams, soft yellows.
  Never cold or B&W.
- **Crop:** loose, magazine-like. Subject often off-centre with breathing room.

### Borders, dividers
- Hairline borders, `rgba(46,49,25,0.18)`. Almost never solid green at full
  opacity — always tinted into the cream.
- Dashed mono dividers ("100% ———— ORGANIC") are used as editorial accents.

### Shadows & elevation
- Almost flat. When elevation is needed, shadows are **warm, low-opacity, soft,
  vertical.** No blueish shadows, ever. See `--shadow-1/2/3` and
  `--shadow-press` in `colors_and_type.css`.

### Corner radii
- Buttons: pill (full radius). Chips: pill.
- Cards: `--radius-lg` (22 px) for product cards; `--radius-md` (14 px) for
  smaller surfaces.
- Imagery: usually `--radius-md` or full-bleed with no radius.

### Motion
- **Soft, slow easing.** `cubic-bezier(0.32, 0.72, 0.24, 1)` — feels like a
  can settling into a hand. Durations 140–420 ms; default 220 ms.
- **Fades and gentle vertical drift**, never bounces or spring overshoots.
- Hover transitions live. The brand does *not* use parallax, sticky-scroll,
  or hero video.

### Hover & press states
- **Hover (light surfaces):** slight darkening of the ink (anchor → dark-green),
  or `opacity: 0.78` on imagery. No colour shift to a new hue.
- **Hover (dark surfaces):** opacity 0.85 on the panel, or the inverse: type
  lightens by ~12%.
- **Press:** subtle inset shadow (`--shadow-press`) + scale(0.98). No big
  squashes — COULD is composed, not playful.
- **Focus rings:** 2 px anchor-green ring at 2 px offset on cream surfaces;
  off-white ring on dark surfaces.

### Transparency & blur
- Used sparingly. Layered cream panels at ~94% opacity over photography is
  common. **No frosted-glass / heavy blur effects.** No "glassmorphism".

### Card anatomy
A canonical COULD card:
- Off-white surface, no shadow, optional 1 px hairline border (anchor green at
  18 % alpha).
- 24–32 px padding.
- Mono eyebrow label at the top in 11 px uppercase with 0.32 em tracking.
- Display headline (Figtree, uppercase) below.
- Mono body copy underneath, ragged-right.
- Often centred on its axis.

---

## ICONOGRAPHY

COULD is a **brand of illustrations, not icons.** There is no proprietary icon
font and the brand guidelines do not ship a UI icon set. For product UIs, we
substitute the open-source [**Lucide**](https://lucide.dev) icon library —
1.5 px stroke, rounded line-caps and joins, set in `currentColor` (anchor
green). Lucide matches the brand's geometric-but-soft language and gives us a
complete UI set out of the box. *Flagged as a substitution — see Caveats.*

### Logo
The brand has two marks:
- **Main wordmark** — `COULD` in a custom rounded geometric uppercase. Lives
  in `assets/logo/could-wordmark-*.svg` in every brand colour.
- **Isotype** — a circular `C` mark, used as the favicon / social avatar /
  watermark. `assets/logo/could-isotype-*.svg`.

Use the wordmark for primary brand surfaces. Use the isotype only when the
wordmark would be too small to read or in tight square crops (avatars, can
foot, watermarks).

### Illustrations (the brand's "iconography")
These are the named illustrations COULD uses as its visual library — they sit
where icons would in a typical product:

`active-flow`, `elegant-table`, `me-time-pause`, `mindful-balance`,
`morning-ritual`, `on-the-move`, `picnic`, `post-workout-refresh`,
`shared-gathering`, `urban-escape`.

Each is named for a *moment of use* — when in your day you'd open a COULD. Use
them on landing pages, marketing cards, packaging back panels, social posts.
All are stored as SVG line art in `assets/illustrations/`.

### Unicode & symbols
- Em-dashes (`—`) and ellipses (`…`) are part of the voice.
- Geometric Unicode marks (`◯`, `◉`, `→`) may be used as quiet markers.
- **Never** emoji.

### Photography vs illustration
- **Illustration** = moods, rituals, vignettes (the picnic, the café).
- **Photography** = ingredients, the can itself, hands, sensory texture.
- **Lucide icons** = product UI only (carts, menus, settings).

---

## Caveats / known substitutions

- **Display font is substituted.** The custom COULD wordmark is a one-off
  display face shipped only as an SVG outline. We use **Figtree** as the
  closest open-source proxy for any UI/headline use. **Please replace with
  the brand's licensed display font** when shipping anything customer-facing.
  If you have the licensed file, drop it in `fonts/` and update the
  `@font-face` rule in `colors_and_type.css`.
- **No native icon set.** We use **Lucide** as the substitute UI icon library.
  Replace with the brand's preferred set when available.
- **Original SVG logos shipped without inline fills** (colour lived in a
  CSS class that was stripped). We patched the SVGs in `assets/logo/` with
  inline `fill="..."` attributes using values sampled from the official PNG
  isotypes — verify against the brand guidelines PDF before print.
- **`uploads/` was empty when explored.** The matcha mockup, `.ai` files, and
  Jasmine Yuzu template referenced in the brief were not present in the
  project filesystem. Re-attach if you need can-specific recreations.
- **Brand Guidelines PDF is too large to inline.** It lives in the GitHub
  repo at `MUSED x Could – Brand Guidelines.pdf`. Open it directly for the
  full canonical guidance on spacing, sizing, and edge cases.

---

## Asks for you

Please review and let me know:
1. Is **Figtree** an acceptable proxy for the display font, or do you have the
   licensed wordmark face?
2. Is **Lucide** acceptable for the UI icon set?
3. Are the **sampled colour hexes** (especially anchor green `#445521`) close
   enough? If you have the official Pantone / Hex values from the guidelines
   PDF, share and I'll swap them in.
4. Should I build a UI kit for the **e-commerce / shop site**, or focus the
   second kit on **social / Instagram templates**?
