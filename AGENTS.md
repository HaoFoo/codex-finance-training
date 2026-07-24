# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Project-specific direction

- All user-facing course content and navigation must be Chinese. Product names such as Codex, GSAP, Skill, Plugin, MCP, API and GitHub may remain in English where that is the commonly recognized term.
- The original composition reference is `design/references/selected-visual.png`, especially its oversized Chinese typography, translucent workflow ribbons, Codex UI, and finance-green accents. The user later made a stronger global color decision: reinterpret this composition in a GSAP-homepage-inspired black / charcoal stage with silver-white typography and finance-green energy accents.
- Every major course chapter must have its own meaningful GSAP-assisted motion grammar. Use ScrollTrigger, scrub, pin, stagger, masks, depth/scale, horizontal sequencing, counters, and chapter transitions where they improve the narrative; do not repeat the same generic fade-in pattern across the site.
- Every major chapter title uses character-level GSAP motion: the glyphs enter from alternating directions with bounce/rotation and settle into a fully readable heading. Preserve semantic heading text and reduced-motion behavior.
- Motion should feel like Apple product-film editing: each chapter has a deliberate establishing shot, focus transition, and exit handoff. Keep the effects DOM- and asset-driven, performant, and readable.
- The closing chapter must appear once in normal document flow; do not pin it in a way that makes the same screen feel duplicated. Give it a one-pass launch transition, kinetic title, and subtle CTA energy pulse.
- Keep one visual system across the entire website. Use black / charcoal as the dominant background for every chapter, with silver-white glass surfaces and finance-green energy accents. Do not alternate whole black and white chapters.
- Text must remain crisp on a projected dark screen. Use high-luminance silver-white body text and a controlled accent rhythm—finance green, ice blue, warm amber, and soft violet—across title glyphs, chapter numbers, eyebrows, and key conclusions. Keep long-form body copy neutral and highly readable rather than rainbow-colored.
- On the dark stage, real image assets must keep bright highlights and full readability. Do not apply aggressive global `brightness`, `opacity`, `invert`, or blend-mode filters to screenshots and product imagery; use purpose-built dark-background assets for cinematic sections and preserve the original luminance of instructional screenshots.
- The Hero artwork should feel alive: animate light traveling along the real image content through masked duplicate-image highlight layers and subtle depth movement, while keeping the base image sharp and avoiding handcrafted SVG/CSS illustration substitutes.
- Website chapter content should be detailed enough to teach a novice without the instructor filling every gap. Each major topic should explain what it is, when to use it, how to do it, an example or demo, and a mistake/safety boundary where relevant.
- Closing copy should be concise and motivating, framing the end of the course as the start of real delivery rather than a generic reminder to practice.
- Preserve teaching usability despite the motion: chapter navigation, prompt copy buttons, downloadable lab files, reduced-motion support, keyboard focus, and readable Chinese body copy are required.
- GitHub Pages is the publication target. The repository is public with the user's explicit approval, and the app must work from a project subpath with static assets referenced through Vite-safe URLs.
- Never expose API keys, tokens, personal account details, or confidential business data. All exercises use simulated and sanitized files.
