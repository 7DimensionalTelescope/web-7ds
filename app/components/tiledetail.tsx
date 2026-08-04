import React from 'react';
import type { TileMap } from '../lib/portal.server';
import { wavelengthColor } from './colors';

/* ---------------------------------------------------------------------------
   What the observation record holds for one tile.

   Used twice: under the pointer on the sky map, and as the answer to a
   coordinate query on the data access page. The two are the same question
   asked in different ways, so they render from the same component — otherwise
   the two would drift apart the first time a field was added.
--------------------------------------------------------------------------- */

const DAY_MS = 24 * 60 * 60 * 1000;

export const degLabel = (value: number) =>
  `${value >= 0 ? '+' : '−'}${Math.abs(value).toFixed(1)}°`;

/* ISO rather than prose dates: a range of two written-out dates wraps in a
   card this narrow, and an observing night is an ISO date in the record. */
export function dayLabel(index: number, epochDate: string) {
  return new Date(Date.parse(`${epochDate}T00:00:00Z`) + index * DAY_MS)
    .toISOString()
    .slice(0, 10);
}

/** Integration time, at the precision the estimate actually supports. */
export function duration(seconds: number) {
  const h = seconds / 3600;
  if (h < 1) return `${Math.round(seconds / 60)} min`;
  if (h < 10) return `${h.toFixed(1)} h`;
  return `${Math.round(h).toLocaleString('en-US')} h`;
}

export type Breakdown = {
  broad: { name: string; frames: number }[];
  strip: { name: string; nm: number; frames: number }[];
  peak: number;
  count: number;
};

/** Unpack one tile's per-filter frame counts from the shared pattern table. */
export function breakdown(tiles: TileMap, index: number): Breakdown | null {
  const { patterns, pattern, filters, filterWave } = tiles;
  if (!patterns || !pattern || !filters || !filterWave) return null;

  const flat = patterns[pattern[index]] ?? [];
  const bands: { name: string; nm: number; frames: number }[] = [];
  const broad: { name: string; frames: number }[] = [];
  let peak = 0;

  for (let i = 0; i < flat.length; i += 2) {
    const name = filters[flat[i]];
    const frames = flat[i + 1];
    if (frames > peak) peak = frames;
    if (name?.startsWith('m')) bands.push({ name, nm: filterWave[flat[i]], frames });
    else if (name) broad.push({ name, frames });
  }

  const byName = new Map(bands.map((band) => [band.name, band]));
  // Every medium band the survey owns, so the gaps are visible too.
  const strip = filters
    .map((name, i) => ({ name, nm: filterWave[i] }))
    .filter((f) => f.name.startsWith('m'))
    .map((f) => ({ ...f, frames: byName.get(f.name)?.frames ?? 0 }));

  return { broad, strip, peak, count: bands.length + broad.length };
}

/**
 * The tile covering a sky position, or null. A tile spans fovLon × fovLat on
 * the sky, so the test is in angular separation with the right ascension
 * difference scaled by cos(dec) — not in raw degrees, which would find nothing
 * near the pole and too much near the equator.
 */
export function findTileAt(
  tiles: TileMap,
  ra: number,
  dec: number,
  fovLon = 1.34,
  fovLat = 0.9
): number | null {
  const wrapped = ((ra % 360) + 360) % 360;
  let best = -1;
  let bestScore = Infinity;

  for (let i = 0; i < tiles.count; i += 1) {
    const dDec = tiles.dec[i] - dec;
    if (Math.abs(dDec) > fovLat / 2) continue;

    let dRa = tiles.ra[i] - wrapped;
    if (dRa > 180) dRa -= 360;
    if (dRa < -180) dRa += 360;
    const dRaSky = dRa * Math.cos(dec * (Math.PI / 180));
    if (Math.abs(dRaSky) > fovLon / 2) continue;

    // Inside more than one overlapping tile, prefer the nearer centre.
    const score = dRaSky * dRaSky + dDec * dDec;
    if (score < bestScore) {
      bestScore = score;
      best = i;
    }
  }

  return best >= 0 ? best : null;
}

export function TileDetail({
  tiles,
  index,
  name,
  ra,
  dec,
  l,
  b,
  exposureSec,
}: {
  tiles: TileMap;
  index: number;
  name: string;
  /** Position to report — the tile's catalogued one, or the pointer's. */
  ra: number;
  dec: number;
  l: number;
  b: number;
  exposureSec?: number | null;
}) {
  const detail = breakdown(tiles, index);
  const frames = tiles.frames?.[index] ?? 0;
  const span = tiles.span?.[index] ?? 0;

  return (
    <>
      <div className="skymap__tip-head">
        <span className="skymap__tip-name">{name}</span>
        <span className="skymap__tip-badge">Observed</span>
      </div>

      <dl className="skymap__tip-grid">
        <dt>RA, Dec</dt>
        <dd>
          {ra.toFixed(1)}°, {degLabel(dec)}
        </dd>
        <dt>l, b</dt>
        <dd>
          {l.toFixed(1)}°, {degLabel(b)}
        </dd>
        <dt>Visits</dt>
        <dd>
          {tiles.visits[index].toLocaleString('en-US')}{' '}
          {tiles.visits[index] === 1 ? 'night' : 'nights'}
        </dd>
        <dt>Frames</dt>
        <dd>{frames.toLocaleString('en-US')}</dd>
        {exposureSec ? (
          <>
            <dt>Exposure</dt>
            <dd>≈ {duration(frames * exposureSec)}</dd>
          </>
        ) : null}
        {detail && (
          <>
            <dt>Filters</dt>
            <dd>{detail.count}</dd>
          </>
        )}
        <dt>Dates</dt>
        <dd>
          {dayLabel(tiles.lastDay[index] - span, tiles.epochDate)}
          {span > 0 && <> – {dayLabel(tiles.lastDay[index], tiles.epochDate)}</>}
        </dd>
      </dl>

      {detail && (
        <>
          {/* Frames per medium band, laid out by wavelength: the shape of this
              strip is the tile's spectral coverage at a glance, and the empty
              slots are the bands it still lacks. */}
          <div className="skymap__tip-bands">
            {detail.strip.map((band) => (
              <span
                key={band.name}
                className="skymap__tip-band"
                title={`${band.name}: ${band.frames} frames`}
              >
                <span
                  className="skymap__tip-band-fill"
                  style={{
                    height: `${
                      band.frames > 0
                        ? Math.max(12, (Math.sqrt(band.frames) / Math.sqrt(detail.peak)) * 100)
                        : 0
                    }%`,
                    background: wavelengthColor(band.nm),
                  }}
                />
              </span>
            ))}
          </div>
          <div className="skymap__tip-scale">
            <span>400 nm</span>
            <span>frames per medium band</span>
            <span>875 nm</span>
          </div>

          {detail.broad.length > 0 && (
            <p className="skymap__tip-broad">
              {detail.broad.map((band) => (
                <span key={band.name}>
                  <b>{band.name}</b> {band.frames.toLocaleString('en-US')}
                </span>
              ))}
            </p>
          )}
        </>
      )}
    </>
  );
}
