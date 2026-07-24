# Design QA · V6 Bright Kinetic Edition

## Comparison target

- Original composition reference: `design/references/selected-visual.png` (1487 × 1058).
- Hero source truth: `public/assets/hero-bright-workflow-v3.png` (1672 × 941).
- GSAP title reference: `design/references/gsap-kinetic-title-reference.png` (1707 × 893).
- User issue references:
  - `design/references/user-feedback-hero-too-dark.png`.
  - `design/references/user-feedback-text-too-muted.png`.
  - `design/references/user-feedback-closing-duplicate.png` (1202 × 659).
- Browser-rendered implementation:
  - `design/qa/v4-desktop-hero-final.png` (1440 × 1024, CSS viewport 1440 × 1024, DPR 1).
  - `design/qa/v4-desktop-settings.png` (1440 × 1024, CSS viewport 1440 × 1024, DPR 1).
  - `design/qa/v4-mobile-hero.png` (390 × 844, CSS viewport 390 × 844, DPR 1).
  - `design/qa/v6-desktop-closing-final.png` (1280 × 720, CSS viewport 1280 × 720, DPR 1).
- State: Chinese dark-stage course site; title animations settled unless the file name says `opening`; no mobile menu open.

## Full-view comparison evidence

- Hero target versus implementation: `design/qa/v4-hero-target-vs-implementation.png` (2880 × 1024). The 1672 × 941 source was proportionally resized and centered on a 1440 × 1024 black canvas before horizontal composition with the 1440 × 1024 implementation.
- GSAP kinetic reference versus Settings title: `design/qa/v4-title-reference-vs-implementation.png` (2880 × 1024). The reference was proportionally normalized to a 1440 × 1024 black canvas; the comparison judges motion language, character scale, color rhythm and hierarchy rather than literal copy.
- Closing before versus after: `design/qa/v6-closing-before-after.png` (2560 × 720). The 1202 × 659 user screenshot was proportionally normalized to 1280 × 720 before composition with the final 1280 × 720 implementation.

## Findings

No actionable P0, P1 or P2 visual issue remains.

- Fonts and typography: oversized Chinese headings remain the primary hierarchy. Every major `h1`/`h2` is split into semantic, aria-labelled glyph spans for alternating GSAP entry motion. The settled title remains readable; English product names retain their recognized spelling.
- Spacing and layout rhythm: desktop Hero preserves a clear left text zone and a bright right-side workflow asset. Mobile Hero is 390 × 844 with `scrollWidth === clientWidth`. The Closing screen has a deliberate three-line ending and appears once in normal document flow.
- Colors and visual tokens: base text is high-luminance silver-white. Secondary text resolves to `rgb(189, 200, 192)` instead of the earlier dim gray. Title glyph rhythm uses finance green, ice blue, warm amber and soft violet, with neutral silver-white as the majority color.
- Image quality and asset fidelity: Hero uses a purpose-built 1672 × 941 raster asset without global dimming or inversion. The two moving highlight layers reuse the same real asset with animated masks; they do not replace it with CSS art or handcrafted SVG. Settings and Skill-market screenshots render at `opacity: 1; filter: none`.
- Copy and content: the final message is now `今天不是课程的终点。是你和 Codex 一起交付的全新起点。`; the CTA is `启动第一个任务`. The language ends on delivery and reusable team capability instead of a generic practice reminder.

## Focused region evidence

- Hero brightness/opening: `design/qa/v4-desktop-hero-opening.png` and `design/qa/v4-desktop-hero-final.png`.
  - Opening asset opacity now begins at `0.72` rather than `0`, so the product image stays visible while the title assembles.
  - Settled Hero media reaches opacity `1`; live flow masks were observed at different mask positions and continue moving.
- Settings readability: `design/qa/v4-desktop-settings.png`.
  - Heading glyph colors resolve to the intended four-accent rhythm.
  - Body text is visibly brighter; supplied Codex UI screenshot keeps original luminance.
- Mobile Hero: `design/qa/v4-mobile-hero.png`.
  - 390 × 844, no horizontal overflow, two deliberate title lines, bright asset and readable CTA.
- Closing: `design/qa/v6-desktop-closing-final.png`.
  - Exactly one `.closing-section` exists.
  - Its parent is `.site-shell`, not `.pin-spacer`; only the intentional Hero and capability-rail pins remain.
  - Title, body and CTA reach opacity `1`; CTA pulse remains subtle and the footer is visible in normal flow.

## Comparison history

### Pass 1 — blocked

- P1: Hero and instructional screenshots were crushed by aggressive `brightness`, `opacity`, `invert` and blend-mode filters.
- P2: body copy was too muted for a projected dark screen.
- P2: section titles used container fades but lacked the requested glyph-level GSAP energy.
- P2: Hero workflow lines were static.
- P2: Closing was pinned; DOM had one section but the same screen felt duplicated when it was held and then returned to normal flow.

Fixes:

- Replaced the Hero with a bright silver-on-black production asset and removed screenshot dimming filters.
- Raised `--ink`, `--ink-soft` and `--muted` contrast.
- Added alternating-direction character entry with rotation, elastic settle and controlled accent colors.
- Added two masked duplicate-image highlight layers with independent GSAP travel and depth motion.
- Removed Closing pin/pin-spacing and replaced it with a one-pass scale/y reveal plus CTA energy pulse.

### Pass 2 — blocked

- P2: Hero began at zero opacity and stayed too dark while the longer glyph sequence played.
- P2: Closing copy wrapped with an orphan final glyph at 1280 px.
- P2: animating `clip-path` on the whole Closing section caused an intermittent compositing/screenshot paint failure at the end of the document.

Fixes:

- Raised Hero opening opacity to `0.72`.
- Rewrote the closing into three deliberate lines ending with `全新起点。`.
- Removed section-level clip-path animation; retained inner content scale/y motion, kinetic glyphs and CTA pulse.

### Pass 3 — passed

- Hero, Settings, mobile Hero and Closing screenshots show no actionable P0/P1/P2 mismatch.
- Programmatic checks confirm one Closing section, no Closing pin-spacer, full image luminance, high-contrast text and no horizontal overflow at tested viewports.

## Interaction and runtime checks

- Header navigation remains visible and active-state progress updates work.
- Closing CTA resolves uniquely by accessible name `启动第一个任务`; clicking it smooth-scrolls back to `#labs` (final Labs top measured at about 208 px after the motion settled).
- Closing DOM count: `1`; Closing parent: `.site-shell`; total desktop pin spacers: `2` (Hero and capability rail only).
- Hero image, flow layers, Settings image and title glyphs were checked through computed styles in the deployed GitHub Pages build.
- Reduced-motion branch clears transforms/opacity and CSS hides Hero flow layers.
- Browser console errors: none in Hero/Settings and Closing inspection tabs.
- Online asset and page requests returned HTTP 200.

## Build verification

- `npm run build`: passed; `dist/client/index.html`, `dist/server/index.js` and `dist/.openai/hosting.json` emitted.
- `npm run test:sites`: 4/4 passed.
- `git diff --check`: passed.
- GitHub Pages deployment workflow: passed.

## Follow-up polish

- P3: the supplied Codex settings screenshot stays a light native app surface inside the dark frame. This is intentional source fidelity.
- P3: animation timing can be tuned after rehearsal if the instructor wants a faster or slower title settle, but no readability issue remains.

final result: passed
