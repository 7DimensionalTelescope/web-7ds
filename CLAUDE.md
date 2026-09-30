# House rules for this repository

Rules a session cannot work out for itself. Everything else — how the routes
are laid out, where content lives, which pages exist — is in `README.md`, which
is kept current and should be read before changing structure.

## Language

**American English throughout, in every file.** Page copy, captions, alt text,
code comments, commit messages, JSON content, CSS comments. `color`, `center`,
`catalog`, `program`, `labeled`, `modeling`, `gray`, `analyze`, `optimize`,
`normalize`, `summarize`, `emphasize`, `toward`, `while`, `among`, `learned`.
Not `colour`, `centre`, `catalogue`, `programme`, `labelled`, `modelling`,
`grey`, `analyse`, `optimise`, `whilst`, `amongst`, `towards`.

Two exceptions, both narrow:

- Proper nouns keep their own spelling — *Centre for Astrophysics*, a paper
  title, an institution's registered name.
- CSS properties and web APIs are what they are: `color`, `text-align: center`,
  `grey` never appears but `color` is not a spelling choice.

## What must never be published

- **`/reference` is gitignored and holds unpublished manuscripts** — SPIE
  drafts and a funding proposal. Nothing from it reaches the web root without
  a specific decision. Figures reproduced from other authors inside those
  documents are theirs, not the project's, and are not ours to republish.
- **Personal data.** The funding proposal contains personnel records —
  birthdates, national researcher numbers. None of it goes anywhere near the
  site, in any form.
- **Service addresses.** The observation portal's base URL lives in
  `PORTAL_API_BASE` in the environment, never in the repository, and must not
  appear in a client bundle. The data server is configured the same way, in
  `LINK_PORTAL`. The wiki, pipeline-status and target-of-opportunity pages are
  published by decision of the project and are written into
  `content/pages/users/links.yaml`; the four observation calculators the same
  way, in `content/data/calculators.yaml`. Do not extend that to any other
  host without being asked. That page reads only `LINK_` variables, so that a
  content edit cannot surface other configuration; keep it that way.
- **Grant numbers** were deliberately removed from the funding page. Do not
  reinstate them.

## Numbers on this site

Every figure is either a fixed property of the instrument or a number read
from the observation database. A reader must always be able to tell which.

- Live numbers come through `app/lib/portal.server.ts` and are marked with
  `<LiveBadge>`. They are never hard-coded into prose: content text names them
  as `{placeholders}` that the route fills (`fill` in `app/lib/page.ts`).
- Fixed numbers live in `content/data/*.yaml` — `specs.yaml`, `surveys.yaml`,
  `science.yaml` — and each has exactly one home. A page that needs a figure
  imports it; it does not restate it.
- Anything derived rather than measured says so and says how. Estimated depth
  and integration time on the sky maps carry their derivation in the caption.
- Do not invent a number to fill a gap. If the data does not exist, the page
  says the data does not exist.

## Prose

Write for someone who knows astronomy but not this project. State what a thing
is and what it is for; do not sell it. No exclamation marks, no "cutting-edge",
no "state-of-the-art". Prefer a plain sentence to a hedged one. When something
is not yet decided or not yet built, say so plainly rather than implying it
exists.

## Code

- Comments explain *why*, not *what*. A comment that restates the line below it
  is noise; a comment recording the constraint that forced an unobvious choice
  is the point.
- Match the surrounding file's idiom. This codebase uses function components,
  typed props with doc comments on the non-obvious ones, and Remix v2 flat
  routes.
- **Words belong in `content/`, not in a route.** A route lays content out; it
  does not carry prose, labels, captions or links of its own. New text goes in
  the page's YAML file, rendered through `Md`/`Paras` from
  `app/components/md.tsx`. `content/README.md` is the editors' guide — keep it
  true when the format changes. Controls inside the interactive widgets (sky
  map, tile search, mode picker) are the exception, being part of the widget.
- `build/` is gitignored but tracked. Stage it with `git add -u`, never
  `git add build/`.

## Before finishing

`npm run typecheck && npm run build` (the first compiles `content/` before
type-checking, which a bare `tsc` does not). Then look at the result on a
spare port — `PORT=3005 node_modules/.bin/remix-serve build/index.js` — and
check the affected URLs there. A page that returns 200 has not necessarily
rendered — check the markup for what you expected to be there.

**The live site deploys itself from `main` on GitHub** (`deploy/AUTODEPLOY.md`):
it runs from `~/7ds-live/current`, not from this working copy, so a change
reaches it only by being pushed, and pushing is the user's to do. Never
`pm2 delete`/`pm2 start` the `7ds` app or edit `~/7ds-live` by hand; a bad
restart there takes the public site down. Test the deployer, if it changes,
under another `DEPLOY_ROOT` and `DEPLOY_APP`, as the script's header describes,
and check that `site.config.cjs` resolves to that test name before starting
anything with pm2.
