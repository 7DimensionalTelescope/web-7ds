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
   2. Nothing here is cached longer than the portal's own refresh interval
      (~15 minutes), so the site never claims to be fresher than its source.
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
const TIMEOUT_MS = 6000;

function minutes(key: string, fallback: number) {
  const raw = process.env[key] || fromEnvFile(key);
  const parsed = raw ? Number(raw) : NaN;
  return (Number.isFinite(parsed) && parsed > 0 ? parsed : fallback) * 60 * 1000;
}

/* How long a payload is served before it is refetched. The two endpoints are
   costed very differently, so they are cached very differently:

     status  ~2 KB, and the whole point of the page is that it is current.
     tiles   ~2 MB, and it can only change once a night, after Chile closes.

   Refetching two megabytes every ten minutes was three hundred megabytes a day
   off the portal to show a map that gains about thirty-six tiles a night. Once
   a day costs two megabytes and loses nothing. Both are overridable from the
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

async function getJson<T>(endpoint: string): Promise<T> {
  if (!BASE) throw new Error('PORTAL_API_BASE is not configured');
  const response = await fetch(`${BASE}${endpoint}`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`${endpoint} responded ${response.status}`);
  return (await response.json()) as T;
}

/* Serve-stale-while-revalidating. Once something is in the cache no request
   ever waits on the portal again: an expired entry is returned immediately and
   the refetch happens behind it. Without this, one unlucky visitor a day would
   pay the three seconds it takes to pull two megabytes of tiles. Concurrent
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
    const data = await getJson<PortalStatus>('/status/');
    return { data, live: true, generatedAt: data.generated_at };
  }).catch(() => ({
    data: snapshot as PortalStatus,
    live: false,
    generatedAt: (snapshot as PortalStatus).generated_at,
  }));
}

/* --- Tiles ---------------------------------------------------------------

   The raw tile payload is ~2 MB of JSON for 15,000-odd tiles, which is not
   something to hand a browser. It is reduced here to parallel arrays of
   coordinates, month index and visit count — the only fields the sky map
   draws with — which gzip to a small fraction of that.
------------------------------------------------------------------------- */

type RawTile = {
  name: string;
  ra: number;
  dec: number;
  n_frames: number;
  n_nights: number;
  first_night: string;
  last_night: string;
};

export type TileMap = {
  count: number;
  /** Tile identifiers, for the hover readout. */
  name: string[];
  /** Right ascension, degrees, one entry per observed tile. */
  ra: number[];
  /** Declination, degrees. */
  dec: number[];
  /** Months elapsed since `epoch`, from the tile's most recent observation. */
  month: number[];
  /** Distinct observing nights on that tile. */
  visits: number[];
  /** Calendar month the index counts from, as [year, month] with month 1-12. */
  epoch: [number, number];
  /** Highest month index present, so the client can size its color scale. */
  monthMax: number;
  visitsMax: number;
  firstNight: string;
  lastNight: string;
};

const monthIndex = (iso: string, epochY: number, epochM: number) =>
  (Number(iso.slice(0, 4)) - epochY) * 12 + (Number(iso.slice(5, 7)) - epochM);

export function getTileMap(): Promise<Fetched<TileMap>> {
  return cached('tiles', async () => {
    const raw = await getJson<{ generated_at: string; tiles: RawTile[] }>('/tiles/');
    const tiles = raw.tiles.filter((t) => Number.isFinite(t.ra) && Number.isFinite(t.dec));

    let firstNight = tiles[0]?.first_night ?? '';
    let lastNight = tiles[0]?.last_night ?? '';
    for (const tile of tiles) {
      if (tile.first_night < firstNight) firstNight = tile.first_night;
      if (tile.last_night > lastNight) lastNight = tile.last_night;
    }

    const epochY = Number(firstNight.slice(0, 4));
    const epochM = Number(firstNight.slice(5, 7));

    const data: TileMap = {
      count: tiles.length,
      name: tiles.map((t) => t.name),
      // One decimal is well below the ~1° tile pitch and halves the payload.
      ra: tiles.map((t) => Math.round(t.ra * 10) / 10),
      dec: tiles.map((t) => Math.round(t.dec * 10) / 10),
      month: tiles.map((t) => monthIndex(t.last_night, epochY, epochM)),
      visits: tiles.map((t) => t.n_nights),
      epoch: [epochY, epochM],
      monthMax: 0,
      visitsMax: 0,
      firstNight,
      lastNight,
    };
    data.monthMax = data.month.reduce((a, b) => (b > a ? b : a), 0);
    data.visitsMax = data.visits.reduce((a, b) => (b > a ? b : a), 0);

    return { data, live: true, generatedAt: raw.generated_at };
  }).catch(() => ({ data: EMPTY_TILES, live: false, generatedAt: '' }));
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
  month: [],
  visits: [],
  epoch: [2023, 10],
  monthMax: 0,
  visitsMax: 0,
  firstNight: '',
  lastNight: '',
};
