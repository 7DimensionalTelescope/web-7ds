/* ---------------------------------------------------------------------------
   Live figures from the 7DT GW Portal.

   The portal publishes aggregate survey status and the list of observed tiles.
   Its address is NOT in this repository: it is read from PORTAL_API_BASE in
   the environment (see .env.example). That keeps the internal host and port off
   a public GitHub page, and means the address can be changed without a deploy.

   Everything here runs on the server. The `.server` suffix keeps it out of the
   browser bundle, and only the reduced results reach the client — a visitor's
   browser never contacts the portal, learns its address, or is able to reach it
   through this site. Two further rules govern its use:

   1. If the portal cannot be reached, the page still renders — from the
      snapshot committed alongside this file — and says so. A status page that
      500s because a backend blinked is worse than one that is an hour stale.
   2. Nothing is cached for longer than the thing it describes can change:
      status for half an hour, the tile list for a day, since tiles can only
      change once a night. Neither page ever claims to be fresher than that.
--------------------------------------------------------------------------- */

import fs from 'node:fs';
import path from 'node:path';
import snapshot from '../routes/content/status-snapshot.json';

/* remix-serve does not read .env in production, so do it here — once, at
   module load, and only for the keys this module needs. */
function fromEnvFile(key: string): string | undefined {
  try {
    const file = fs.readFileSync(path.join(process.cwd(), '.env'), 'utf8');
    for (const line of file.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq > 0 && trimmed.slice(0, eq).trim() === key) {
        return trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      }
    }
  } catch {
    /* No .env is a normal state — the snapshot covers it. */
  }
  return undefined;
}

const BASE = (process.env.PORTAL_API_BASE || fromEnvFile('PORTAL_API_BASE') || '').replace(/\/$/, '');

/* How long to wait on each endpoint, which is not the same question for the
   two of them. Status is small and a page is usually waiting on it, so it gets
   a few seconds and then gives up to the snapshot. Tiles is six megabytes the
   portal builds on demand: it answers in a third of a second while its own
   cache is warm and takes upwards of thirteen when it is not, and since that
   fetch happens at boot or behind an already-served stale response, nobody is
   kept waiting by a generous limit here. Six seconds for both meant the tile
   map failed precisely when the portal refreshed. */
const TIMEOUT_MS = { status: 6000, tiles: 45000 } as const;

function minutes(key: string, fallback: number) {
  const raw = process.env[key] || fromEnvFile(key);
  const parsed = raw ? Number(raw) : NaN;
  return (Number.isFinite(parsed) && parsed > 0 ? parsed : fallback) * 60 * 1000;
}

/* How long a payload is served before it is refetched. The two endpoints are
   costed very differently, so they are cached very differently:

     status  ~2 KB, and the whole point of the page is that it is current.
     tiles   ~6 MB, and it can only change once a night, after Chile closes.

   Refetching six megabytes every ten minutes was most of a gigabyte a day off
   the portal to show a map that gains about thirty-six tiles a night. Once a
   day costs six megabytes and loses nothing. Both are overridable from the
   environment so the rate can be changed without a deploy. */
const TTL = {
  status: minutes('PORTAL_TTL_STATUS_MIN', 30),
  tiles: minutes('PORTAL_TTL_TILES_MIN', 24 * 60),
} as const;

export type PortalStatus = typeof snapshot;

export type Fetched<T> = {
  data: T;
  /** False when the payload came from the committed snapshot. */
  live: boolean;
  /** ISO timestamp the portal stamped on the payload. */
  generatedAt: string;
};

type Entry<T> = { at: number; value: Fetched<T>; failed: boolean };

const cache = new Map<string, Entry<unknown>>();
const inFlight = new Map<string, Promise<unknown>>();

/* After a failed refresh, wait this long before trying again rather than
   retrying on every request and hammering a portal that is already down. */
const RETRY_MS = 2 * 60 * 1000;

async function getJson<T>(endpoint: string, key: keyof typeof TIMEOUT_MS): Promise<T> {
  if (!BASE) throw new Error('PORTAL_API_BASE is not configured');
  const response = await fetch(`${BASE}${endpoint}`, {
    signal: AbortSignal.timeout(TIMEOUT_MS[key]),
    headers: { accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`${endpoint} responded ${response.status}`);
  return (await response.json()) as T;
}

/* Serve-stale-while-revalidating. Once something is in the cache no request
   ever waits on the portal again: an expired entry is returned immediately and
   the refetch happens behind it. Without this, one unlucky visitor a day would
   pay the thirteen seconds it can take the portal to build the tile list. Concurrent
   requests share one refresh, so the portal sees a single call either way. */
function revalidate<T>(key: keyof typeof TTL, load: () => Promise<Fetched<T>>) {
  const existing = inFlight.get(key);
  if (existing) return existing as Promise<Fetched<T>>;

  const task = load()
    .then((value) => {
      cache.set(key, { at: Date.now(), value, failed: false });
      return value;
    })
    .catch((error) => {
      const hit = cache.get(key) as Entry<T> | undefined;
      if (hit) {
        // Keep the data, mark it as no longer trustworthy, and schedule the
        // next attempt by backdating the entry to expire in RETRY_MS.
        cache.set(key, {
          ...hit,
          at: Date.now() - TTL[key] + RETRY_MS,
          value: { ...hit.value, live: false },
          failed: true,
        });
      }
      throw error;
    })
    .finally(() => inFlight.delete(key));

  inFlight.set(key, task);
  return task;
}

async function cached<T>(
  key: keyof typeof TTL,
  load: () => Promise<Fetched<T>>
): Promise<Fetched<T>> {
  const hit = cache.get(key) as Entry<T> | undefined;
  if (hit && Date.now() - hit.at < TTL[key]) return hit.value;

  if (hit) {
    // Expired but usable: answer from it now and refresh behind the response.
    // The rejection is swallowed because the held copy is the answer — but
    // revalidate() has already flagged it, so the page will say it is stale.
    revalidate(key, load).catch(() => undefined);
    return (cache.get(key) as Entry<T>).value;
  }

  return revalidate(key, load);
}

export function getStatus(): Promise<Fetched<PortalStatus>> {
  return cached('status', async () => {
    const data = await getJson<PortalStatus>('/status/', 'status');
    return { data, live: true, generatedAt: data.generated_at };
  }).catch(() => ({
    data: snapshot as PortalStatus,
    live: false,
    generatedAt: (snapshot as PortalStatus).generated_at,
  }));
}

/* --- Tiles ---------------------------------------------------------------

   The raw tile payload is ~6 MB of JSON for 15,000-odd tiles, which is not
   something to hand a browser. It is reduced here to parallel arrays of the
   fields the map actually draws and reports, and the per-filter breakdown is
   deduplicated into a shared table, which together gzip to about 90 KB.
------------------------------------------------------------------------- */

type RawTile = {
  name: string;
  ra: number;
  dec: number;
  n_frames: number;
  n_nights: number;
  first_night: string;
  last_night: string;
  /** Filter name to science-frame count on that tile. */
  filters?: Record<string, number>;
};

export type TileMap = {
  count: number;
  /**
   * Tile identifiers. They are T-prefixed, zero-padded and strictly ascending
   * once sorted, so they travel as first differences — 3 KB instead of 36 KB
   * gzipped for fifteen thousand of them. If the portal ever names a tile
   * outside that pattern the whole list falls back to `name` instead.
   */
  nameDelta?: number[];
  name?: string[];
  /** Right ascension, degrees, one entry per observed tile. */
  ra: number[];
  /** Declination, degrees. */
  dec: number[];
  /** Distinct observing nights on that tile. */
  visits: number[];
  /** Science frames recorded on that tile, all filters together. */
  frames?: number[];
  /** Days elapsed since `epochDate` for the tile's most recent night. */
  lastDay: number[];
  /** Nights spanned from first observation to last; 0 for a single night. */
  span?: number[];
  /** Index into `patterns` giving this tile's per-filter frame counts. */
  pattern?: number[];
  /** Every filter name the survey has used, ordered by central wavelength. */
  filters?: string[];
  /** Central wavelength in nm for each entry of `filters`. */
  filterWave?: number[];
  /**
   * Distinct per-filter frame counts across the survey, each flattened to
   * [filterIndex, frames, filterIndex, frames, ...]. Fifteen thousand tiles
   * share fewer than a thousand of these, so they are sent once and indexed.
   */
  patterns?: number[][];
  /** Calendar day `lastDay` and `span` count from, ISO. */
  epochDate: string;
  visitsMax: number;
  framesMax: number;
  firstNight: string;
  lastNight: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const dayIndex = (iso: string, epochMs: number) =>
  Math.round((Date.parse(`${iso}T00:00:00Z`) - epochMs) / DAY_MS);

/* Filters are named for their central wavelength in nanometres — m400 through
   m875, with a trailing w on the wide ones. The four broadbands are not, so
   their SDSS effective wavelengths are given here to place them on the same
   axis as the medium bands. */
const BROADBAND_NM: Record<string, number> = { u: 355, g: 477, r: 623, i: 762, z: 913 };

function filterWavelength(name: string): number {
  const medium = /^m(\d+)w?$/.exec(name);
  if (medium) return Number(medium[1]);
  return BROADBAND_NM[name] ?? Number.POSITIVE_INFINITY;
}

export function getTileMap(): Promise<Fetched<TileMap>> {
  return cached('tiles', async () => {
    const raw = await getJson<{ generated_at: string; tiles: RawTile[] }>('/tiles/', 'tiles');
    const tiles = raw.tiles
      .filter((t) => Number.isFinite(t.ra) && Number.isFinite(t.dec))
      // Sorted by identifier so the difference encoding below holds whatever
      // order the portal happened to return.
      .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

    let firstNight = tiles[0]?.first_night ?? '';
    let lastNight = tiles[0]?.last_night ?? '';
    for (const tile of tiles) {
      if (tile.first_night < firstNight) firstNight = tile.first_night;
      if (tile.last_night > lastNight) lastNight = tile.last_night;
    }

    const epochMs = Date.parse(`${firstNight}T00:00:00Z`);

    /* Identifiers as first differences, but only if they really are ascending
       T-numbers — otherwise the raw strings go instead, at four times the size
       and no risk of inventing a tile name that does not exist. */
    const numeric = tiles.map((t) => (/^T\d{1,6}$/.test(t.name) ? Number(t.name.slice(1)) : NaN));
    const ascending =
      numeric.every((n) => Number.isFinite(n)) &&
      numeric.every((n, i) => i === 0 || n > numeric[i - 1]);
    const nameDelta = ascending
      ? numeric.map((n, i) => (i === 0 ? n : n - numeric[i - 1]))
      : undefined;

    /* One column per filter the survey has ever used, ordered blue to red so
       that a tile's filter set can be drawn as a spectrum without the client
       having to sort anything. */
    const seen = new Set<string>();
    for (const tile of tiles) for (const name of Object.keys(tile.filters ?? {})) seen.add(name);
    const filters = [...seen].sort((a, b) => filterWavelength(a) - filterWavelength(b));
    const filterIndex = new Map(filters.map((name, i) => [name, i]));

    /* Most tiles carry an identical filter set — a RIS reference pass is three
       frames in each of twenty bands, over and over. Sending that per tile is
       ~300 KB; sending each distinct set once and indexing into it is ~16 KB
       gzipped for the same information, so the browser gets the whole
       breakdown and hovering costs no network at all. */
    const patterns: number[][] = [];
    const patternIndex = new Map<string, number>();

    const patternFor = (tile: RawTile) => {
      const entries = Object.entries(tile.filters ?? {})
        .map(([name, frames]) => [filterIndex.get(name) ?? -1, frames] as const)
        .filter(([i]) => i >= 0)
        .sort((a, b) => a[0] - b[0]);
      const flat = entries.flatMap(([i, frames]) => [i, frames]);
      const key = flat.join(',');
      let at = patternIndex.get(key);
      if (at === undefined) {
        at = patterns.push(flat) - 1;
        patternIndex.set(key, at);
      }
      return at;
    };

    const data: TileMap = {
      count: tiles.length,
      ...(nameDelta ? { nameDelta } : { name: tiles.map((t) => t.name) }),
      // One decimal is well below the ~1° tile pitch and halves the payload.
      ra: tiles.map((t) => Math.round(t.ra * 10) / 10),
      dec: tiles.map((t) => Math.round(t.dec * 10) / 10),
      visits: tiles.map((t) => t.n_nights),
      frames: tiles.map((t) => t.n_frames),
      lastDay: tiles.map((t) => dayIndex(t.last_night, epochMs)),
      // Most tiles were observed on a single night, so a span of zero repeats
      // thousands of times and costs almost nothing to send.
      span: tiles.map((t) => dayIndex(t.last_night, epochMs) - dayIndex(t.first_night, epochMs)),
      pattern: tiles.map(patternFor),
      filters,
      filterWave: filters.map(filterWavelength),
      patterns,
      epochDate: firstNight,
      visitsMax: 0,
      framesMax: 0,
      firstNight,
      lastNight,
    };
    data.visitsMax = data.visits.reduce((a, b) => (b > a ? b : a), 0);
    data.framesMax = (data.frames ?? []).reduce((a, b) => (b > a ? b : a), 0);

    return { data, live: true, generatedAt: raw.generated_at };
  }).catch(() => ({ data: EMPTY_TILES, live: false, generatedAt: '' }));
}

/* --- A lighter copy -------------------------------------------------------

   The landing page draws the footprint but has no pointer readout, so it needs
   coordinates and dates and nothing else. Stripping the identifiers and the
   filter breakdown takes the payload from ~90 KB gzipped to ~40 KB, which is
   the difference between the map being worth putting on the front page and
   not. It is derived from the same cached fetch, so it costs the portal
   nothing extra.
------------------------------------------------------------------------- */

const lite = new Map<string, { from: string; value: Fetched<TileMap> }>();

/**
 * The tile list without the per-filter breakdown. Pass `withNames` when the
 * page needs to pick tiles out by identifier — the identifiers are only 3 KB
 * gzipped, the filter tables are ten times that.
 */
export async function getTileMapLite(withNames = false): Promise<Fetched<TileMap>> {
  const full = await getTileMap();
  const key = withNames ? 'named' : 'bare';
  const held = lite.get(key);
  if (held && held.from === full.generatedAt) return held.value;

  const { frames, span, pattern, filters, filterWave, patterns, name, nameDelta, ...rest } =
    full.data;
  const data = withNames ? ({ ...rest, name, nameDelta } as TileMap) : (rest as TileMap);
  const value = { ...full, data };
  lite.set(key, { from: full.generatedAt, value });
  return value;
}

/* Serve-stale only helps once something is cached, so the first request after
   a restart would otherwise pay for the two-megabyte tile pull. Fill both
   caches at boot instead, without blocking startup or failing it. */
if (BASE) {
  setTimeout(() => {
    void getStatus().catch(() => undefined);
    void getTileMap().catch(() => undefined);
  }, 500).unref?.();
}

/* There is no committed copy of the tile list — it is two megabytes and would
   be stale the day after it was written. If the portal is unreachable and
   nothing is cached, the map renders empty and says so. */
const EMPTY_TILES: TileMap = {
  count: 0,
  name: [],
  ra: [],
  dec: [],
  visits: [],
  frames: [],
  lastDay: [],
  span: [],
  pattern: [],
  filters: [],
  filterWave: [],
  patterns: [],
  epochDate: '2023-10-01',
  visitsMax: 0,
  framesMax: 0,
  firstNight: '',
  lastNight: '',
};
