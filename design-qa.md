# Design QA · V2 Dark Motion Edition

## Comparison target

- Composition reference: `design/references/selected-visual.png` (1487 × 1058)
- Motion/color references:
  - `design/references/gsap-home-hero.png`
  - `design/references/gsap-home-scroll-1100.png`
  - `design/references/gsap-home-scroll-2500.png`
- Normalized V2 source board: `design/references/v2-visual-target.png` (1440 × 1024, DPR 1)
- Desktop implementation: `design/qa/v2-desktop-hero.png` (1440 × 1024, DPR 1)
- Full-view comparison: `design/qa/v2-hero-comparison.png` (2880 × 1024)
- State: initial Hero frame, Chinese UI, dark stage, navigation visible, no menu open.

## Findings

No actionable P0, P1, or P2 visual issue remains.

- Typography: the implementation matches the reference's oversized display-type hierarchy while preserving the selected Chinese two-line composition. Chinese headings use a platform CJK fallback stack with strong optical weight and intentional tight tracking; body copy remains readable at presentation distance.
- Spacing/layout rhythm: the Hero preserves a wide title block on the left and a real finance workflow asset on the right. Section spacing, pinned stages, content cards, sticky settings navigation, and footer flow have no visible collision or horizontal overflow.
- Colors/tokens: every full-bleed chapter resolves to either `rgb(5, 7, 6)` or `rgb(10, 13, 11)`. No white or light-gray full-page chapter remains. Finance green is reserved for progress, active states, confirmations, and primary CTAs.
- Image quality: the Hero uses `public/assets/hero-silver-workflow.png`; the settings chapter uses the supplied 3396 × 2124 source screenshot and links to its full-resolution original. No placeholder, div art, handcrafted SVG, or emoji replaces required imagery.
- Copy/content: all user-facing course UI is Chinese. Product names such as Codex, GSAP, Skill, MCP, Git and Worktree keep their recognized English names. The site now includes visible deep-dive content and a 396-line desktop settings guide.

## Focused evidence

- Settings chapter: `design/qa/v2-desktop-settings.png`
  - Sticky left navigation remains aligned at 112 px.
  - The active group synchronizes with the visible settings card.
  - Each card includes definition, use guidance, recommendation and risk boundary.
- Five-role case: `design/qa/v2-desktop-case.png`
  - Role streams and management summary stay readable during the bidirectional clip transition.
- Labs: `design/qa/v2-desktop-labs.png`
  - Prompt code surfaces remain stable and clickable during the card-depth sequence.
- Closing: `design/qa/v2-desktop-closing.png`
  - Final CTA remains full size, keyboard-focusable and highest contrast.
- Mobile: `design/qa/v2-mobile-hero.png`, `design/qa/v2-mobile-settings.png`, `design/qa/v2-mobile-closing.png`
  - 390 × 844 viewport, DPR 1, no horizontal overflow and no pin spacers.

## Comparison history

### Pass 1 — blocked

- P2: mobile Hero created a one-character orphan line (`径`).
- P2: the Settings navigation used a nested ScrollTrigger pin and landed below the visible viewport after upstream pins.
- P2: Settings cards and non-current capability panels were too dim during mid-transition, reducing teaching readability.
- P1: Closing CTA remained at `scale(0.55)` at the maximum scroll position.

Fixes:

- Reduced mobile Hero size and adjusted line width to keep the title on two deliberate lines.
- Replaced the Settings nested pin with native CSS sticky positioning while retaining ScrollTrigger-driven active-group sync.
- Raised transition opacity; Settings card content now stays fully opaque while depth, scale and mask provide the motion.
- Removed the nested CTA scale tween; the Closing scene keeps the outer cinematic zoom while the action remains full size.

### Pass 2 — passed

- Hero composition and typography: `design/qa/v2-hero-comparison.png`.
- Desktop settings, case, labs and closing: focused screenshots listed above.
- Mobile Hero title, settings layout and Closing CTA: mobile screenshots listed above.
- All full-bleed sections use the same black/charcoal system; programmatic background inspection found no light chapter.

## Interaction and runtime checks

- Header navigation: desktop chapter states and mobile open/close state work; six mobile entries fit without clipping.
- Mobile viewport: 390 × 844, `scrollWidth === clientWidth`, `pin-spacer === 0`.
- Desktop viewport: 1440 × 1024, `scrollWidth === clientWidth`, three intentional pins (Hero, capability rail, Closing).
- Prompt copy: button changes from `复制提示词` to `已复制`.
- Lab download: resolves to `/labs/01-operating-metrics.csv`.
- Desktop guide: resolves to `/guides/codex-desktop-guide.md`; image and guide return HTTP 200 locally.
- Reduced motion: the JS branch skips matchMedia timelines and clears opacity, transform, filter and clip-path; CSS disables residual transitions.
- Browser runtime: all inspected pages rendered without an error state; no overflow, scroll trap or dead CTA appeared during full-page navigation. Raw DevTools console capture is not exposed by this Browser surface, so build/runtime verification is backed by Vite production build, interaction checks and Sites worker tests.

## Build verification

- `npm run build`: passed; React, icons and GSAP are split into separate production chunks.
- `npm run test:sites`: 4/4 passed.
- `git diff --check`: passed.

## Follow-up polish

- P3: the native Codex settings screenshot remains a light application surface inside the dark glass frame. This is intentional source fidelity, not a full-page theme break.
- P3: very long Chinese headings may wrap differently on non-Apple system fonts, but tested desktop and mobile breakpoints remain readable.

final result: passed
