# Editing the site's content

Every word a reader sees on the site is in this folder: paragraphs, headings,
table rows, captions, button labels, menu entries. You can change any of it
without reading the code. Edit a file here, rebuild, and the page follows.

The files are YAML. That is a plain-text format of `key: value` lines, where
indentation shows what belongs to what. Each file starts with a comment that
names the page it feeds and anything unusual about it.

```
content/
  pages/        one file per page. pages/users/propose.yaml is /users/propose,
                pages/home.yaml is the front page.
  data/         facts that several pages read: instrument specs, survey tiers,
                science themes, news, team, the current call for proposals.
  shared.yaml   text that appears on more than one page, such as the filter-set
                paragraphs and the headings that the survey and science pages share
  site.yaml     the navigation bar and the footer
```

## Where to find something

Look for the page's own file first: `pages/<section>/<page>.yaml`, named after
the URL. If a sentence is not there, the header comment of that file says which
data file it comes from. To search every file at once:

```bash
grep -rn "a phrase from the page" content/
```

| To change | Edit |
|---|---|
| Any page's text | `pages/…` — the file named after its URL |
| Menu entries, footer contact, partner logos | `site.yaml` |
| The open call: dates, files, whether it is open | `data/call.yaml` (the notice bar and `/users/call` both read it) |
| A news item or publication | `data/news.yaml` (newest first; `type` is `update`, `publication`, `press` or `meeting`) |
| Team members, collaboration roster | `data/team.yaml`, `data/collabs.yaml` |
| Instrument specs, measured performance, depths | `data/specs.yaml` |
| Survey tiers (RIS, WTS, IMS), observation modes | `data/surveys.yaml` |
| Science themes | `data/science.yaml` |
| Data format tables | `data/dataformat.yaml` |
| Gallery pictures | `data/images.yaml`, with the files in `public/img/images/` and a thumbnail of the same name in `public/img/thumbs/` |
| Partner-site links | `data/links.yaml` |
| The observation calculators | `data/calculators.yaml` |

Images live in `public/img/`. Replace a file and keep its name, and you do not
need to edit anything else.

## Writing a value

Most values need no quotes:

```yaml
title: Data access
lede: How 7DS data are obtained. A long line can continue on the next line,
  indented, and is read as one line with a space where the break was.
```

Put the value in double quotes when it:

- starts with `*`, `[`, `{`, `` ` ``, `&`, `!`, `%`, `@`, `#` or a quote mark;
- contains `: ` (a colon followed by a space) or ` #`;
- is a number that has to be printed exactly as written, such as `"2.0"`,
  `"01"` or `"400"`. Without quotes, YAML reads `2.0` as the number 2. The build
  refuses a number like that and tells you the file and line.

Inside double quotes, write `\"` for a quotation mark.

A list is one `- ` item per line. A table row is a list of cells:

```yaml
rows:
  - - Pixel scale
    - 0.505″ per pixel
```

A paragraph list turns each item into its own paragraph. To add a paragraph,
add an item. To remove one, delete its item.

## Marks inside the text

Text can carry a few inline marks. They are shown here with what they become:

| Write | Shows as |
|---|---|
| `**bold**` | **bold** |
| `*emphasis*` | *emphasis* |
| `_Title of a Paper_` | an italic title. It only takes effect at the start and end of a word, so `T08147_m650_7DT02` stays as it is. |
| `` `supy` `` | `supy`, in code type |
| `[text](/users/status)` | a link to a page on this site |
| `[text](/proposal/Form.docx)` | a download link |
| `[text](mailto:someone@example.org)` | an e-mail link |
| `[text](https://example.org)` | a link to another site, which opens in a new tab |
| `\*` | a literal `*`. Use a backslash before any mark character you want shown as itself. |

That is the whole set. It has no headings, lists or HTML, because the page
layout supplies the structure and the content file supplies only the words.

A few fields are shown exactly as written, without marks. These are mainly the
rows of `data/dataformat.yaml`, where `*_100s.fits` is a file pattern. The
header comment of such a file says so.

## Placeholders in braces

Some text quotes a number or a date that is kept somewhere else. That text
names the source in braces instead of repeating the value:

```yaml
body: The deadline is **{call.deadline}**, {call.deadlineNote}.
```

When the page is built, `{call.deadline}` becomes the `deadline` in
`data/call.yaml`. On the status and survey pages, placeholders name live
numbers from the observation database, such as `{telescopes.online}` or
`{ris.coverage_pct}`. A bar selects a format: `{nightly.n_nights|num}` prints
the number with thousands separators, and `{nightly.last_night|day}` prints a
date. Each file's header comment lists the placeholders it can use.

A mistyped placeholder is shown on the page as written, braces included, so
you can spot it and fix it.

**Do not write a live number into the text.** If the page shows a count of
telescopes or tiles, it comes from the database through a placeholder. A number
written in plain text is a fixed fact, and each fixed fact belongs in exactly
one file. If another page needs it, link to that page.

## Comments and notes

Lines starting with `#` are comments for editors, and the site never shows
them. The `note:` and `_note:` fields at the top of data files are also never
shown. They record where the figures come from.

## Publishing a change

Edit the file on GitHub: open it in
[7DimensionalTelescope/web-7ds](https://github.com/7DimensionalTelescope/web-7ds),
click the pencil, make the change, and commit it to `main`. The site picks it
up within about five minutes. It first builds the change and checks that
every page still renders. If anything fails, the change is not published and
the site stays as it was. Nothing on the site breaks, but your edit will not
appear until the file is fixed. Whoever looks after the server can see why in
`~/7ds-live/deploy.log` (see `deploy/AUTODEPLOY.md`).

To check a change before committing it, work in a local copy of the
repository:

```bash
npm run content     # checks every file and compiles it; stops with file:line on an error
```

The usual causes of an error are a missing quote, an indentation step that
does not match its neighbors, or a tab character. Use spaces, never tabs.

`app/content/` holds the compiled copy, which is generated. Never edit it,
because the next build overwrites it.

## What does not go here

- Anything from `/reference`, which holds unpublished manuscripts, figures owned
  by other authors, and a proposal containing personal data. See `CLAUDE.md`.
- Service addresses other than the ones already published. The data server's
  address is configuration (`LINK_PORTAL`), not content. `pages/users/links.yaml`
  names that variable. It does not contain the address.
- Grant numbers on the funding page. They were removed on purpose.
