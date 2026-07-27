# Design QA · V7 Orbital Hero

## Comparison target

- Selected source of truth: `design/poster-concepts/orbital-workflow.png` (1920 × 1080).
- Production asset: `public/assets/hero-orbital-workflow-v1.webp` (1920 × 1080, 162 KB).
- Desktop implementation: `design/qa/orbital-hero-implementation-desktop.jpg` (1440 × 1024).
- Mobile implementation: `design/qa/orbital-hero-implementation-mobile.jpg` (390 × 844).
- State: Hero opening motion settled; menu closed; scroll position at the top.

## Full-view comparison evidence

- Combined source and desktop implementation: `design/qa/orbital-hero-source-vs-implementation.png` (2880 × 1024).
- The 16:9 source is proportionally normalized onto a 1440 × 1024 black canvas on the left. The live Hero uses the same asset with `object-fit: cover` on the right, so the comparison judges focal point, negative space, luminance, palette, crop and hierarchy rather than identical letterboxing.

## Findings

No actionable P0, P1 or P2 visual issue remains.

- Source fidelity: the live Hero uses the selected orbital poster directly. The crystalline core, silver orbital rings, green/violet energy accents and starfield retain their original luminance; no substitute CSS/SVG artwork is present.
- Desktop composition: the title occupies the dark left field while the crystalline core stays dominant on the right. The crop preserves the primary rings and focal object without horizontal overflow.
- Mobile composition: at 390 × 844 the content remains readable, the CTA stays above the artwork focal area, the core remains visible at the right edge, and `scrollWidth === clientWidth`.
- Motion: all three image copies share a slow 14-second depth drift so duplicate highlights remain aligned. A conic mask sweeps around the real orbital artwork over 10.8 seconds, while a radial duplicate layer gives the core a subtle 4.8-second energy breath.
- Scroll handoff: the existing desktop Hero pin/zoom remains intact; transform origin is anchored at `72% 52%` so the right-side core remains the focus during depth movement.
- Accessibility: the base image has meaningful Chinese alt text; decorative duplicate layers remain `aria-hidden`; reduced-motion CSS hides both highlight layers and the GSAP reduced-motion branch clears transforms and opacity.

## Focused runtime evidence

- Desktop viewport: 1440 × 1024; no horizontal overflow; natural image dimensions 1920 × 1080; live orbit opacity `0.42`.
- Mobile viewport: 390 × 844; no horizontal overflow; image focal point `67% 50%`.
- Motion sampling confirmed the orbit angle changes between frames and the shared base transform advances without duplicate-image ghosting.
- Browser console warnings/errors: none.

## Iteration history

### Pass 1 — blocked

- P2: the first orbit tween raised opacity from `0.18` to `0.66` and would visibly jump back at the loop boundary.
- P2: the scroll zoom still used the container center rather than the selected artwork's right-side focal point.

Fixes:

- Made orbit-sweep opacity a constant `0.42`; only the conic mask angle loops.
- Set the Hero media transform origin to `72% 52%`.

### Pass 2 — passed

- Desktop and mobile screenshots preserve the source composition and remain readable.
- The orbit sweep, core breath and shared starfield drift are visibly active and restrained.
- No actionable P0, P1 or P2 issue remains.

## Build verification

- `npm run build`: passed; Sites artifacts emitted.
- `npm run test:sites`: 4/4 passed.
- `git diff --check`: passed.

final result: passed
