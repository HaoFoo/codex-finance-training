# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Project-specific direction

- All user-facing course content and navigation must be Chinese. Product names such as Codex, GSAP, Skill, Plugin, MCP, API and GitHub may remain in English where that is the commonly recognized term.
- The selected visual source is `design/references/selected-visual.png`: a bright silver-white product stage with oversized Chinese typography, translucent glass workflow ribbons, Codex UI, and finance-green accents.
- Every major course chapter should have meaningful GSAP-assisted scroll motion. Use ScrollTrigger, scrub, pin, stagger, masks, and horizontal sequencing where they improve the narrative.
- Preserve teaching usability despite the motion: chapter navigation, prompt copy buttons, downloadable lab files, reduced-motion support, keyboard focus, and readable Chinese body copy are required.
- GitHub Pages is the publication target. The repository is private and the app must work from a project subpath with static assets referenced through Vite-safe URLs.
- Never expose API keys, tokens, personal account details, or confidential business data. All exercises use simulated and sanitized files.
