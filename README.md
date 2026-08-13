# web-7ds

Website for the **7-Dimensional Telescope (7DT)** and the **7-Dimensional Sky Survey (7DS)**,
operated by the Center for the Gravitational-wave Universe at Seoul National University.

Built with [Remix](https://remix.run) + React 18 + Tailwind. Most routes are static; the pages
that report survey progress read the observation database on the server (see **Live survey
data** below). Deployment is a Node process behind a proxy, plus one environment variable.

---

## Requirements

**Node 20.** Remix refuses to run on Node 16, and the default `node` on some of our machines is
still v16. The version is pinned in `.nvmrc`:

```bash
nvm use            # reads .nvmrc → 20.20.2
node -v            # must print v20.x
```

If you do not use nvm, put a Node ≥ 18 on your `PATH` before running anything below.

## Build and run

```bash
npm ci
npm run build              # build:css (Tailwind) THEN remix build — always use this, never `remix build` alone
PORT=3000 npm start
```

Development server:

```bash
npm run dev                # http://localhost:3003
```

> `npm run build` writes `app/css/app.css`, `build/` and `public/build/`. These are **generated**
> and are not committed — a fresh clone must run `npm run build` before `npm start`.

---

## Updating the content

Almost everything on the site is data, not code. These files need no web development:

| To change | Edit | Notes |
|---|---|---|
| A news item or milestone | `app/routes/content/news.json` | Add an object to `news[]`. File order = page order. `type` is one of `update`, `publication`, `press`, `meeting`. |
| A publication | `app/routes/content/news.json` | Same array, `"type": "publication"`. **`abstract` must be the author's published abstract, quoted verbatim.** For anything you write yourself use `summary` instead — the page labels the two differently on purpose. |
| Team members | `app/routes/content/team.json` | `imgName` points into `public/img/team/`. Leave it `""` and the card falls back to initials. |
| Collaborator list | `app/routes/content/collabs.json` | `id` must be unique. |
| Survey tiers and status | `app/routes/content/surveys.json` | Includes each tier's `progress` percentage. |
| Instrument specs and depths | `app/routes/content/specs.json` | |
| Science themes and results | `app/routes/content/science.json` | One page per theme at `/science/<id>`; `id` is the route segment. Adding a theme means adding a `app/routes/science.<id>.tsx` stub and a nav entry. |
| Software descriptions | `app/routes/content/software.json` | |
| External links | `app/routes/content/links.json` | |
| Gallery | `app/routes/content/images.json` | Put the full-size file in `public/img/images/` **and** a ≤900 px version in `public/img/thumbs/`, same basename, `.jpg`. |
| Body prose | `app/routes/content/text.tsx` | Named string exports. Mind the `\` line continuations and the quoting. |
| A hero image | `public/img/hero/<name>.jpg` | Replace the file and keep the name — no code change. ~2400 px wide, quality 80. |

Rebuild and restart after any change: the JSON is compiled into the bundle, not read at runtime.

### Adding a page

1. Create `app/routes/<section>.<page>.tsx` (dots become URL slashes).
2. Copy an existing route; wrap it in `PageLayout` / `PageHero` / `Section` from
   `app/components/site.tsx`.
3. Export a `meta` function for the title and description.
4. Register it in the `MENU` array in `app/routes/navigate.tsx`.

---

## Live survey data

`/survey/status` and `/data/coverage` read the 7DT GW Portal rather than hard-coded numbers.

- The portal's address is **not in this repository**. Set `PORTAL_API_BASE` in `.env`
  (copy `.env.example`) or in the process environment. `app/lib/portal.server.ts` reads
  `process.env` first and falls back to parsing `.env`, because `remix-serve` does not load it.
- All fetching happens in a `.server.ts` module inside route loaders, so the address never
  reaches the browser bundle and a visitor's browser never contacts the portal.
- Refresh intervals are per endpoint and set by `PORTAL_TTL_STATUS_MIN` (default 30) and
  `PORTAL_TTL_TILES_MIN` (default 1440, i.e. once a day). Status is ~2 KB and worth keeping
  current; the tile list is ~6 MB and cannot change until a night in Chile ends, so refetching
  it more often is pure bandwidth. At these settings the portal sees about 50 requests a day.
- Timeouts are per endpoint too: 6 s for status, 45 s for tiles. The portal builds the tile
  payload on demand — a third of a second while its own cache is warm, thirteen or more when it
  is not — so a shared 6 s limit made the map fail exactly when the portal refreshed. Nothing
  waits on the tile fetch anyway; it happens at boot or behind a stale response.
- The cache serves stale while it revalidates: an expired entry is returned immediately and the
  refetch runs behind the response, so no visitor ever waits on the portal. Concurrent requests
  share one refresh. A failed refresh marks the held copy stale — the page then says so — and
  backs off for two minutes rather than retrying on every request.
- If the portal is unreachable, the status page renders from
  `app/routes/content/status-snapshot.json` and says so in a banner; the sky map renders empty.
  Refresh the snapshot occasionally so the fallback is not embarrassing.
- The tile payload is ~6 MB. `getTileMap()` reduces it to parallel arrays before it is
  serialised to the client. Do not pass the raw payload through. Two encodings keep that
  reduction small enough to send whole, at ~90 KB gzipped for 15,000 tiles: identifiers travel
  as first differences (they are ascending `T#####`, with a fallback to raw strings if the
  portal ever breaks that pattern), and the per-filter frame counts are deduplicated into a
  table of ~950 distinct patterns that the tiles index into. Anything derivable on the client —
  the month index used for the colour scale, a tile's first night — is derived there rather
  than sent.

---

## Editorial rules

This site is a scientific facility's public record. Two rules matter more than any style guide:

1. **Every number traces to a source.** The figures come from the SPIE status report (Kim et al.,
   Proc. SPIE 14147-84) and the pipeline paper (Hyun et al., Proc. SPIE 14155-12). The `note`
   field at the top of each content JSON records its provenance. If you cannot cite it, do not
   publish it.
2. **Never invent placeholder data.** No sample observation tables, no illustrative catalogs, no
   captions written without looking at the image. If something does not exist yet, say so.
3. **American English.** color, program, center, catalog, analyze, percent, acknowledgment.
4. **A publication's thumbnail is a figure from that publication.** These live in
   `public/img/news/pub-*.jpg`. Three entries — Chang et al., Ko et al. and Lim et al. — had no
   obtainable paper figure and fall back to a 7DT project figure; the `_note` in `news.json`
   records which. Do not describe a fallback as a figure from the paper.

5. **One fact, one home.** Tier parameters live on the survey overview, depths on the For Users
   performance page, tiling in one table, per-component rationale on the component pages, project
   history in About. Everywhere else links. If you find yourself pasting a number into a second
   page, link to the first instead — otherwise the two drift apart.
6. **Plain scientific wording.** State what is measured and what follows from it. Avoid rhetorical
   framing, and avoid asserting significance the reader can judge for themselves.

Status figures are stamped "as of June 2026" and appear in several places. When the survey
advances, grep for the old value before assuming one edit is enough.

---

## Site structure

```
/                     landing page — survey overview, live footprint map
/about/…              intro (motivation, seven dimensions, approach, history), team, funding
/science/…            overview (motivation: spectral mapping + time domain, reach),
                      then one page per theme: mma, transients, galaxies,
                      cosmology, agn, galactic, solar
/survey/…             overview (design + parameters + tiling), ris, wts, ims,
                      coverage (interactive map), status (array operations)
/telescope/…          overview (hardware first), instrument, location, computer
/users/…              status, performance, propose, data, format, access, software, faq
/publication/…        list, policy          /news  /gallery  /links
```

Redirects are kept for URLs that moved: `/data/*` → the For Users pages, `/survey/design` →
`/survey/overview`, `/telescope/mode` → `/users/propose`. Do not delete these — they were public.

---

## Repository layout

```
app/
  components/site.tsx     shared page furniture (PageLayout, PageHero, Section, tables, StatGrid)
  css/custom.css          the design system — tokens, components, responsive rules
  components/skymap.tsx   the all-sky coverage map (canvas, Mollweide, equatorial/galactic)
  components/surveypage.tsx  shared layout for the RIS/WTS/IMS pages
  lib/portal.server.ts    live data: fetch, cache, reduce, fall back
  routes/                 one file per URL, plus navigate/footer/main/plot (components, not routes)
  routes/content/         all site copy and data
public/img/
  hero/                   page hero backgrounds (~2400 px)
  thumbs/                 gallery thumbnails (~900 px)
  images/                 full-resolution science images
  science/                figures for the science theme pages
```

`navigate.tsx`, `footer.tsx`, `main.tsx` and `plot.tsx` sit under `app/routes/` for historical
reasons but are components. They are excluded from routing in `remix.config.js` — without that
they get served as bare URLs.

## Contact

Prof. Myungshin Im — <mim@astro.snu.ac.kr>
