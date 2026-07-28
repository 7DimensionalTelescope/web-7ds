# web-7ds

Website for the **7-Dimensional Telescope (7DT)** and the **7-Dimensional Sky Survey (7DS)**,
operated by the Center for the Gravitational-wave Universe at Seoul National University.

Built with [Remix](https://remix.run) + React 18 + Tailwind. Every route is static — no loaders,
no database, no secrets — so deployment is just a Node process behind a proxy.

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
| Science themes and results | `app/routes/content/science.json` | Theme `id`s are the anchor targets the nav links to. |
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

Status figures are stamped "as of June 2026" and appear in several places. When the survey
advances, grep for the old value before assuming one edit is enough.

---

## Repository layout

```
app/
  components/site.tsx     shared page furniture (PageLayout, PageHero, Section, tables, StatGrid)
  css/custom.css          the design system — tokens, components, responsive rules
  routes/                 one file per URL, plus navigate/footer/main/plot (components, not routes)
  routes/content/         all site copy and data
public/img/
  hero/                   page hero backgrounds (~2400 px)
  thumbs/                 gallery thumbnails (~900 px)
  images/                 full-resolution science images
```

`navigate.tsx`, `footer.tsx`, `main.tsx` and `plot.tsx` sit under `app/routes/` for historical
reasons but are components. They are excluded from routing in `remix.config.js` — without that
they get served as bare URLs.

## Contact

Prof. Myungshin Im — <mim@astro.snu.ac.kr>
