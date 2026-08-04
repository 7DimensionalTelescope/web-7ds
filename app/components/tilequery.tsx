import React, { useMemo, useState } from 'react';
import type { TileMap } from '../lib/portal.server';
import { TileDetail, findTileAt, degLabel } from './tiledetail';

/* ---------------------------------------------------------------------------
   "Has this position been observed?" — asked in coordinates rather than by
   pointing at a map.

   The whole tile list is already on the page for the map, so the lookup runs
   in the browser and answers instantly. There is no query endpoint behind it
   and none is needed: fifteen thousand tiles is a scan of a few hundred
   microseconds.
--------------------------------------------------------------------------- */

const DEG = Math.PI / 180;
const NGP_RA = 192.85948 * DEG;
const NGP_DEC = 27.12825 * DEG;
const L_NCP = 122.93192 * DEG;

function equatorialToGalactic(raDeg: number, decDeg: number): [number, number] {
  const ra = raDeg * DEG;
  const dec = decDeg * DEG;
  const sinDec = Math.sin(dec);
  const cosDec = Math.cos(dec);
  const dRa = ra - NGP_RA;
  const sinB = Math.sin(NGP_DEC) * sinDec + Math.cos(NGP_DEC) * cosDec * Math.cos(dRa);
  const b = Math.asin(Math.max(-1, Math.min(1, sinB)));
  const y = cosDec * Math.sin(dRa);
  const x = Math.cos(NGP_DEC) * sinDec - Math.sin(NGP_DEC) * cosDec * Math.cos(dRa);
  let l = (L_NCP - Math.atan2(y, x)) / DEG;
  l = ((l % 360) + 360) % 360;
  return [l, b / DEG];
}

/**
 * Accepts decimal degrees ("78.83") or sexagesimal ("05:13:07.4", "05 13 07.4",
 * "-60d28m12s"). `hours` multiplies a sexagesimal value by 15, which is what a
 * right ascension written in hours means and a declination never does.
 */
function parseAngle(raw: string, hours: boolean): number | null {
  const text = raw.trim().replace(/[dhms°'"]/g, ' ').replace(/:/g, ' ').trim();
  if (!text) return null;

  const parts = text.split(/\s+/);
  if (parts.some((p) => !/^[+-]?\d*\.?\d+$/.test(p))) return null;

  const values = parts.map(Number);
  if (values.some((v) => !Number.isFinite(v))) return null;

  if (values.length === 1) {
    // A bare number is degrees, unless it is written in sexagesimal form.
    return values[0];
  }

  const sign = /^\s*-/.test(raw) ? -1 : 1;
  const magnitude =
    Math.abs(values[0]) + (values[1] ?? 0) / 60 + (values[2] ?? 0) / 3600;
  return sign * magnitude * (hours ? 15 : 1);
}

const EXAMPLES: { label: string; ra: string; dec: string }[] = [
  { label: 'IMS field', ra: '05:13:07', dec: '-60:28:12' },
  { label: 'LMC', ra: '80.894', dec: '-69.756' },
  { label: 'Fornax cluster', ra: '54.62', dec: '-35.45' },
];

export default function TileQuery({
  tiles,
  exposureSec,
}: {
  tiles: TileMap;
  exposureSec?: number | null;
}) {
  const [ra, setRa] = useState('');
  const [dec, setDec] = useState('');
  const [query, setQuery] = useState<{ ra: number; dec: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ids = useMemo(() => {
    if (!tiles.nameDelta) return null;
    const out = new Int32Array(tiles.nameDelta.length);
    let running = 0;
    for (let i = 0; i < out.length; i += 1) {
      running += tiles.nameDelta[i];
      out[i] = running;
    }
    return out;
  }, [tiles]);

  const nameAt = (i: number) =>
    ids ? `T${String(ids[i]).padStart(5, '0')}` : tiles.name?.[i] ?? '';

  const hit = useMemo(
    () => (query ? findTileAt(tiles, query.ra, query.dec) : null),
    [query, tiles]
  );

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsedRa = parseAngle(ra, ra.includes(':') || /\s/.test(ra.trim()));
    const parsedDec = parseAngle(dec, false);

    if (parsedRa === null || parsedDec === null) {
      setError('Enter a position as decimal degrees (78.83, −61.13) or sexagesimal (05:13:07, −60:28:12).');
      setQuery(null);
      return;
    }
    if (parsedDec < -90 || parsedDec > 90) {
      setError('Declination must be between −90 and +90 degrees.');
      setQuery(null);
      return;
    }

    setError(null);
    setQuery({ ra: ((parsedRa % 360) + 360) % 360, dec: parsedDec });
  };

  const useExample = (example: { ra: string; dec: string }) => {
    setRa(example.ra);
    setDec(example.dec);
    setError(null);
    const parsedRa = parseAngle(example.ra, example.ra.includes(':'));
    const parsedDec = parseAngle(example.dec, false);
    if (parsedRa !== null && parsedDec !== null) {
      setQuery({ ra: ((parsedRa % 360) + 360) % 360, dec: parsedDec });
    }
  };

  const galactic = query ? equatorialToGalactic(query.ra, query.dec) : null;

  return (
    <div className="tilequery">
      <div>
        <form className="tilequery__form" onSubmit={submit}>
          <div className="tilequery__field">
            <label htmlFor="q-ra">Right ascension</label>
            <input
              id="q-ra"
              type="text"
              inputMode="decimal"
              value={ra}
              onChange={(e) => setRa(e.target.value)}
              placeholder="78.83 or 05:13:07"
            />
          </div>
          <div className="tilequery__field">
            <label htmlFor="q-dec">Declination</label>
            <input
              id="q-dec"
              type="text"
              inputMode="decimal"
              value={dec}
              onChange={(e) => setDec(e.target.value)}
              placeholder="-61.13 or -60:28:12"
            />
          </div>
          <button className="btn btn--primary" type="submit">
            Check coverage
          </button>
        </form>

        {error && <p className="tilequery__error">{error}</p>}

        <p className="tilequery__examples">
          Try{' '}
          {EXAMPLES.map((example, index) => (
            <React.Fragment key={example.label}>
              {index > 0 && ', '}
              <button type="button" onClick={() => useExample(example)}>
                {example.label}
              </button>
            </React.Fragment>
          ))}
          . Right ascension is read as hours when written with colons or spaces, and as degrees
          when written as a single number.
        </p>

        {query && (
          <p className="note" style={{ marginTop: '1rem' }}>
            Queried RA {query.ra.toFixed(3)}°, Dec {degLabel(query.dec)}
            {galactic && (
              <>
                {' '}
                · l {galactic[0].toFixed(2)}°, b {degLabel(galactic[1])}
              </>
            )}
            {hit !== null
              ? ' — this position falls on an observed tile.'
              : ' — no observed tile covers this position.'}
          </p>
        )}
      </div>

      <div className="tilequery__result" aria-live="polite">
        {query === null ? (
          <p className="tilequery__empty">
            Enter a position to see whether it has been observed and what exists for it.
          </p>
        ) : hit !== null && galactic ? (
          <TileDetail
            tiles={tiles}
            index={hit}
            name={nameAt(hit)}
            ra={tiles.ra[hit]}
            dec={tiles.dec[hit]}
            l={galactic[0]}
            b={galactic[1]}
            exposureSec={exposureSec}
          />
        ) : (
          <>
            <div className="skymap__tip-head">
              <span className="skymap__tip-name">No observation</span>
              <span className="skymap__tip-badge skymap__tip-badge--none">Not observed</span>
            </div>
            <dl className="skymap__tip-grid">
              <dt>RA</dt>
              <dd>{query.ra.toFixed(3)}°</dd>
              <dt>Dec</dt>
              <dd>{degLabel(query.dec)}</dd>
              {galactic && (
                <>
                  <dt>l, b</dt>
                  <dd>
                    {galactic[0].toFixed(1)}°, {degLabel(galactic[1])}
                  </dd>
                </>
              )}
            </dl>
            <p className="skymap__tip-note">
              No science frames are recorded on the tile at this position. It may be outside the
              observable declination range, or not yet reached by the survey.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
