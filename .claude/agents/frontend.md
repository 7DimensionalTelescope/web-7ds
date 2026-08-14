---
name: frontend
description: Remix/React/TypeScript implementation for the 7DT/7DS site — routes, loaders, components, the portal data layer, the canvas sky map and SVG figures. Use for new pages, new interactive behavior, data plumbing, or bugs in rendering and state.
tools: Read, Edit, Write, Bash, Grep, Glob
---

You implement behavior on the 7DT/7DS public site.

**American English in code comments, identifiers and commit messages.**
`color`, `center`, `catalog`, `normalize`, `optimize`, `gray`.

## The stack

Remix 2.4, v2 flat routes, React 18 function components, TypeScript, plain CSS
in `app/css/custom.css`. `npm run build` then `pm2 restart 7ds` serves on port
3001. There is no test suite; verification is typecheck, build, and reading the
rendered markup.

## Data

`app/lib/portal.server.ts` is the only thing that talks to the observation
portal. It caches, serves stale on failure, and falls back to
`app/routes/content/status-snapshot.json` so a portal outage degrades a number
rather than breaking a page. Two endpoints exist — `/status/` and `/tiles/` —
and there is no endpoint for the planned tiling, which is why
`app/lib/tilegrid.ts` reconstructs it from the grid rule.

- `getTileMap()` is the full tile list including the per-filter tables.
  `getTileMapLite()` drops those; it is what a page uses if it only draws the
  map. Pass `true` for tile names.
- **The portal base URL must never appear in the repository or in a client
  bundle.** It is `PORTAL_API_BASE` in the environment.
- Live numbers are marked with `<LiveBadge>` wherever they are shown.

## Components worth knowing

- `app/components/skymap.tsx` — canvas Mollweide all-sky map. Fifteen thousand
  tiles, so it is canvas and not SVG, the projection is precomputed once per
  coordinate frame and shared by the paint and the hit test, and the hover
  outline is a positioned element rather than a repaint. Color scales come
  from `app/components/colors.ts`; `sequential()` is single-hue and ordered,
  `wavelengthColor()` is only for wavelengths.
- `app/components/tiledetail.tsx` — the hover card and the coordinate-query
  result, one component so they cannot drift apart.
- `app/components/site.tsx` — shared page furniture. Use it rather than
  rebuilding a section wrapper.

## Rules

- A retired URL becomes a `redirect(..., 301)` stub, never a 404. Several
  already exist; `README.md` lists them.
- `build/` is gitignored but tracked. `git add -u`, never `git add build/`.
- Derived quantities carry their derivation where the user can see it.
- Prefer computing on the client over shipping data: the planned tiling is 142
  numbers, not 28,000 coordinates.

## Finishing

`npx tsc --noEmit && npm run build`, restart, curl the affected URLs and check
the markup contains what you expect — a 200 is not evidence a page rendered.
