import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { TileMap } from '../lib/portal.server';
import { viridis, rgb } from './colors';
import { TileDetail, degLabel as deg } from './tiledetail';

/* ---------------------------------------------------------------------------
   All-sky map of observed 7DS tiles.

   Drawn on a canvas rather than in SVG: there are some fifteen thousand tiles,
   and fifteen thousand DOM nodes would make the page unusable on a phone.
   The projection is Mollweide, equal-area, so the amount of ink in a region is
   proportional to the amount of sky it covers — the whole point of a coverage
   map. Right ascension increases to the left, as it does on the sky.
--------------------------------------------------------------------------- */

const DEG = Math.PI / 180;
const RATIO = 0.52; // canvas height / width, leaving room around the ellipse

/* Mollweide needs 2θ + sin2θ = π sin φ solved per point. Solving it fifteen
   thousand times per repaint is wasteful when latitude repeats constantly, so
   it is tabulated once at 0.1° and interpolated. */
const TABLE_STEP = 0.1;
const TABLE: Float64Array = (() => {
  const n = Math.round(180 / TABLE_STEP) + 1;
  const table = new Float64Array(n);
  for (let i = 0; i < n; i += 1) {
    const lat = (-90 + i * TABLE_STEP) * DEG;
    let theta = lat;
    if (Math.abs(Math.abs(lat) - Math.PI / 2) < 1e-9) {
      theta = lat > 0 ? Math.PI / 2 : -Math.PI / 2;
    } else {
      for (let k = 0; k < 12; k += 1) {
        const denominator = 2 + 2 * Math.cos(2 * theta);
        if (Math.abs(denominator) < 1e-12) break;
        const step = (2 * theta + Math.sin(2 * theta) - Math.PI * Math.sin(lat)) / denominator;
        theta -= step;
        if (Math.abs(step) < 1e-10) break;
      }
    }
    table[i] = theta;
  }
  return table;
})();

function theta(latDeg: number) {
  const position = (latDeg + 90) / TABLE_STEP;
  const i = Math.max(0, Math.min(TABLE.length - 2, Math.floor(position)));
  const f = position - i;
  return TABLE[i] * (1 - f) + TABLE[i + 1] * f;
}

/** Right ascension in degrees to longitude in [-180, 180), increasing left. */
const toLon = (raDeg: number) => -(((((raDeg + 180) % 360) + 360) % 360) - 180);

/** Projected coordinates for a longitude already in [-180, 180]. */
function projectLon(lonDeg: number, decDeg: number): [number, number] {
  const t = theta(decDeg);
  return [(2 / Math.PI) * lonDeg * DEG * Math.cos(t), Math.sin(t)];
}

/** Projected coordinates, x in [-2, 2] and y in [-1, 1]. */
function project(raDeg: number, decDeg: number): [number, number] {
  return projectLon(toLon(raDeg), decDeg);
}

/* The inverse projection, so that a pointer anywhere on the map reports the
   sky position under it — including where nothing has been observed, which is
   the answer to "has this been covered?" just as much as a tile is. Mollweide
   inverts in closed form: y is sin θ outright, and latitude and longitude
   follow from θ. Returns null outside the ellipse, where there is no sky. */
function unproject(x: number, y: number): [number, number] | null {
  // The rim is where x²/4 + y² is exactly 1, and RA 180 lands on it precisely,
  // so the test needs a hair of tolerance or the map's edges report no sky.
  if (x * x / 4 + y * y > 1 + 1e-9) return null;
  const t = Math.asin(Math.max(-1, Math.min(1, y)));
  const lat = Math.asin(Math.max(-1, Math.min(1, (2 * t + Math.sin(2 * t)) / Math.PI))) / DEG;
  const cosT = Math.cos(t);
  if (cosT < 1e-9) return [0, lat > 0 ? 90 : -90];
  const lon = ((Math.PI * x) / (2 * cosT)) / DEG;
  if (lon < -180.0001 || lon > 180.0001) return null;
  // Longitude runs leftward on the map, so undo that to get the sky angle.
  return [((-lon % 360) + 360) % 360, lat];
}


/* Equatorial to galactic, J2000. The pole and node are the IAU 1958 values
   precessed to J2000 and are quoted to more digits than this map can show;
   they are written out in full so the transform is checkable against any
   reference rather than being a set of magic numbers. */
const NGP_RA = 192.85948 * DEG; // right ascension of the north galactic pole
const NGP_DEC = 27.12825 * DEG; // its declination
const L_NCP = 122.93192 * DEG; // galactic longitude of the north celestial pole

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

/** The same rotation run backwards, for reporting a pointer position in both
    frames no matter which one the map is drawn in. */
function galacticToEquatorial(lDeg: number, bDeg: number): [number, number] {
  const l = lDeg * DEG;
  const b = bDeg * DEG;
  const sinB = Math.sin(b);
  const cosB = Math.cos(b);
  const dL = L_NCP - l;

  const sinDec = Math.sin(NGP_DEC) * sinB + Math.cos(NGP_DEC) * cosB * Math.cos(dL);
  const dec = Math.asin(Math.max(-1, Math.min(1, sinDec)));

  const y = cosB * Math.sin(dL);
  const x = Math.cos(NGP_DEC) * sinB - Math.sin(NGP_DEC) * cosB * Math.cos(dL);
  let ra = (NGP_RA + Math.atan2(y, x)) / DEG;
  ra = ((ra % 360) + 360) % 360;

  return [ra, dec / DEG];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function monthLabel(index: number, epoch: [number, number]) {
  const total = (epoch[1] - 1) + index;
  return `${MONTHS[((total % 12) + 12) % 12]} ${epoch[0] + Math.floor(total / 12)}`;
}

const DAY_MS = 24 * 60 * 60 * 1000;

type Mode = 'date' | 'visits';
type Frame = 'equatorial' | 'galactic';

/** What sits under the pointer: a tile, or bare sky, or nothing at all. */
type Probe = {
  /** Pointer position in CSS pixels within the canvas, for placing the card. */
  x: number;
  y: number;
  /** Index into the tile arrays, or null where nothing has been observed. */
  tile: number | null;
  ra: number;
  dec: number;
  l: number;
  b: number;
};

export default function SkyMap({
  tiles,
  exposureSec,
  emphasize,
  interactive = true,
  caption,
  theme = 'light',
}: {
  tiles: TileMap;
  /** Mean seconds per science frame, used to estimate integration time. */
  exposureSec?: number | null;
  /**
   * Tile names to draw in colour, with everything else muted. Used by the
   * per-survey pages to show one component against the whole footprint
   * rather than on an empty sky, which would lose all sense of scale.
   */
  emphasize?: string[] | null;
  /** False strips the controls and the pointer readout: a figure, not a tool. */
  interactive?: boolean;
  /** Replaces the tile count in the readout line. */
  caption?: string;
  /** 'dark' drops the card chrome and inverts the sky, for dark sections. */
  theme?: 'light' | 'dark';
}) {
  const dark = theme === 'dark';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<Mode>('date');
  const [frame, setFrame] = useState<Frame>('equatorial');
  const [width, setWidth] = useState(960);
  const [probe, setProbe] = useState<Probe | null>(null);
  const hover = probe?.tile ?? null;

  /* Identifiers arrive as first differences (see TileMap). Undo that into a
     running total once; the name string itself is only ever built for the one
     tile under the pointer, so fifteen thousand strings are never made. */
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

  const nameAt = useCallback(
    (i: number) => (ids ? `T${String(ids[i]).padStart(5, '0')}` : tiles.name?.[i] ?? ''),
    [ids, tiles]
  );

  /* Which tiles are drawn in colour. Built from names rather than indices so
     a page can name the tiles it cares about without knowing their position
     in the arrays. */
  const emphasized = useMemo(() => {
    if (!emphasize || emphasize.length === 0) return null;
    const wanted = new Set(emphasize);
    const mask = new Uint8Array(tiles.count);
    for (let i = 0; i < tiles.count; i += 1) mask[i] = wanted.has(nameAt(i)) ? 1 : 0;
    return mask;
  }, [emphasize, tiles, nameAt]);

  /* Month index per tile, for the colour scale and its legend. Derived here
     rather than sent, because the exact dates are already on the wire and the
     month is a rounding of them. */
  const months = useMemo(() => {
    const epochMs = Date.parse(`${tiles.epochDate}T00:00:00Z`);
    const index = new Int32Array(tiles.count);
    let max = 0;
    for (let i = 0; i < tiles.count; i += 1) {
      const at = new Date(epochMs + tiles.lastDay[i] * DAY_MS);
      const m =
        (at.getUTCFullYear() - Number(tiles.epochDate.slice(0, 4))) * 12 +
        (at.getUTCMonth() + 1 - Number(tiles.epochDate.slice(5, 7)));
      index[i] = m;
      if (m > max) max = m;
    }
    return { index, max };
  }, [tiles]);

  const epoch = useMemo(
    () =>
      [Number(tiles.epochDate.slice(0, 4)), Number(tiles.epochDate.slice(5, 7))] as [number, number],
    [tiles.epochDate]
  );

  /* Fifteen thousand trigonometric conversions are cheap but not free, and the
     map repaints on resize and on every colour change. Convert once per frame
     choice instead. Equatorial is the identity, so it costs nothing. */
  const coords = useMemo(() => {
    if (frame === 'equatorial') return { lon: tiles.ra, lat: tiles.dec };
    const lon = new Float64Array(tiles.count);
    const lat = new Float64Array(tiles.count);
    for (let i = 0; i < tiles.count; i += 1) {
      const [l, b] = equatorialToGalactic(tiles.ra[i], tiles.dec[i]);
      lon[i] = l;
      lat[i] = b;
    }
    return { lon, lat };
  }, [frame, tiles]);

  // Visit counts are long-tailed: a handful of IMS tiles sit in the hundreds
  // while most of the sky has been seen once. A linear ramp would render the
  // survey as a single flat colour, so the scale is logarithmic.
  const visitScale = useMemo(() => Math.log(tiles.visitsMax + 1), [tiles.visitsMax]);

  const value = useCallback(
    (i: number) =>
      mode === 'date'
        ? months.max > 0
          ? months.index[i] / months.max
          : 1
        : Math.log(tiles.visits[i] + 1) / visitScale,
    [mode, tiles, visitScale]
  );

  useEffect(() => {
    const element = wrapRef.current;
    if (!element) return undefined;
    const measure = () => setWidth(element.clientWidth || 960);
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const height = Math.round(width * RATIO);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const pad = 40;
    const scale = Math.min((width - pad * 2) / 4, (height - pad * 1.4) / 2);
    const cx = width / 2;
    const cy = height / 2;
    const px = (x: number) => cx + x * scale;
    const py = (y: number) => cy - y * scale;

    // Sky background inside the ellipse
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, 2 * scale, scale, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = dark ? 'rgba(255,255,255,0.05)' : '#f2f5fa';
    ctx.fillRect(0, 0, width, height);

    // Tiles. Each is drawn at its true angular footprint so that contiguous
    // survey areas read as solid regions rather than as a dot scatter. The
    // footprint is derived analytically from the projection rather than by
    // re-projecting an offset point, which would wrap across the RA=180 seam.
    const FOV_LON = 1.34;
    const FOV_LAT = 0.9;
    for (let i = 0; i < tiles.count; i += 1) {
      const lat = coords.lat[i];
      const t = theta(lat);
      const [x, y] = project(coords.lon[i], lat);

      // A field of view fixed on the sky spans more longitude the nearer the
      // pole it sits. Without the 1/cos(lat) term the polar tiles shrink to
      // dots and the pole reads as a gap rather than as coverage. In galactic
      // coordinates a tile is rotated by an angle that varies across the sky;
      // it is drawn axis-aligned at the same solid angle, which is right to
      // within a fraction of the tile at this scale.
      const dLon = FOV_LON / Math.max(0.02, Math.cos(lat * DEG));
      const w = Math.max(1.1, (2 / Math.PI) * dLon * DEG * Math.cos(t) * scale);
      const hi = Math.min(90, lat + FOV_LAT / 2);
      const lo = Math.max(-90, lat - FOV_LAT / 2);
      const h = Math.max(1.1, (Math.sin(theta(hi)) - Math.sin(theta(lo))) * scale);

      ctx.fillStyle =
        emphasized && !emphasized[i]
          ? dark
            ? 'rgba(255,255,255,0.12)'
            : 'rgba(10,16,28,0.10)'
          : rgb(viridis(value(i)));
      ctx.fillRect(px(x) - w / 2, py(y) - h / 2, w, h);
    }
    ctx.restore();

    // Graticule — drawn in longitude so the curves are continuous.
    ctx.strokeStyle = dark ? 'rgba(255,255,255,0.16)' : 'rgba(10,16,28,0.18)';
    ctx.lineWidth = 0.6;
    ctx.setLineDash([2, 3]);
    for (let dec = -75; dec <= 75; dec += 15) {
      ctx.beginPath();
      for (let lon = -180; lon <= 180; lon += 2) {
        const [x, y] = projectLon(lon, dec);
        if (lon === -180) ctx.moveTo(px(x), py(y));
        else ctx.lineTo(px(x), py(y));
      }
      ctx.stroke();
    }
    for (let lon = -150; lon <= 150; lon += 30) {
      ctx.beginPath();
      for (let dec = -90; dec <= 90; dec += 1) {
        const [x, y] = projectLon(lon, dec);
        if (dec === -90) ctx.moveTo(px(x), py(y));
        else ctx.lineTo(px(x), py(y));
      }
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Border
    ctx.strokeStyle = dark ? 'rgba(255,255,255,0.42)' : '#0a101c';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 2 * scale, scale, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Labels. Right ascension is conventionally read in hours, galactic
    // longitude in degrees, so the two frames are labelled differently.
    ctx.fillStyle = dark ? 'rgba(255,255,255,0.62)' : '#4d5b71';
    ctx.font = '11px ui-monospace, "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (frame === 'equatorial') {
      for (let hours = 2; hours <= 22; hours += 4) {
        const [x, y] = project(hours * 15, 0);
        ctx.fillText(`${String(hours).padStart(2, '0')}h`, px(x), py(y) - 9);
      }
    } else {
      for (const l of [30, 90, 150, 210, 270, 330]) {
        const [x, y] = project(l, 0);
        ctx.fillText(`${l}°`, px(x), py(y) - 9);
      }
    }
    // Latitude labels ride the left edge of the ellipse, just outside it.
    ctx.textAlign = 'right';
    for (let lat = -75; lat <= 75; lat += 15) {
      const [x, y] = projectLon(-180, lat);
      ctx.fillText(`${lat > 0 ? '+' : ''}${lat}°`, px(x) - 7, py(y));
    }
  }, [tiles, coords, frame, width, value, emphasized, dark]);

  const onMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const height = rect.height;
    const pad = 40;
    const scale = Math.min((rect.width - pad * 2) / 4, (height - pad * 1.4) / 2);
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;

    // Where on the sky the pointer is, whatever happens to be drawn there.
    const sky = unproject((mx - rect.width / 2) / scale, (height / 2 - my) / scale);
    if (!sky) {
      setProbe(null); // Outside the ellipse: off the sky entirely.
      return;
    }

    /* Nearest tile centre, accepted only within about a tile's own width so
       that empty sky reads as empty rather than snapping to a distant tile.
       A degree is scale·(2/π)·(π/180) pixels at the equator of the map. */
    const perDegree = scale * (2 / 180);
    const tolerance = Math.max(6, perDegree * 1.2);
    let best = -1;
    let bestDistance = tolerance * tolerance;
    for (let i = 0; i < tiles.count; i += 1) {
      const [x, y] = project(coords.lon[i], coords.lat[i]);
      const dx = rect.width / 2 + x * scale - mx;
      const dy = height / 2 - y * scale - my;
      const distance = dx * dx + dy * dy;
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    }

    // Report the pointer in both frames: the tile's own catalogued position
    // when there is one, and the inverted projection when there is not.
    const [lon, lat] = sky;
    const equatorial: [number, number] =
      best >= 0
        ? [tiles.ra[best], tiles.dec[best]]
        : frame === 'equatorial'
          ? [lon, lat]
          : galacticToEquatorial(lon, lat);
    const galactic: [number, number] =
      best >= 0
        ? frame === 'galactic'
          ? [coords.lon[best], coords.lat[best]]
          : equatorialToGalactic(tiles.ra[best], tiles.dec[best])
        : frame === 'galactic'
          ? [lon, lat]
          : equatorialToGalactic(lon, lat);

    setProbe({
      x: mx,
      y: my,
      tile: best >= 0 ? best : null,
      ra: equatorial[0],
      dec: equatorial[1],
      l: galactic[0],
      b: galactic[1],
    });
  };

  const legendStops = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => rgb(viridis(i / 11))).join(', '),
    []
  );

  const legendTicks = useMemo(() => {
    if (mode === 'date') {
      return [0, 0.5, 1].map((t) => monthLabel(Math.round(t * months.max), epoch));
    }
    return [0, 0.5, 1].map((t) => {
      const visits = Math.round(Math.exp(t * visitScale) - 1);
      return `${visits.toLocaleString('en-US')}`;
    });
  }, [mode, tiles, visitScale]);

  return (
    <div className={`skymap${dark ? ' skymap--dark' : ''}`}>
      {interactive && (
      <div className="skymap__controls">
        <div className="skymap__modes" role="group" aria-label="Coordinate system">
          <button
            type="button"
            className="toggle-btn"
            aria-pressed={frame === 'equatorial'}
            onClick={() => setFrame('equatorial')}
          >
            RA / Dec
          </button>
          <button
            type="button"
            className="toggle-btn"
            aria-pressed={frame === 'galactic'}
            onClick={() => setFrame('galactic')}
          >
            Galactic
          </button>
        </div>
        <div className="skymap__modes" role="group" aria-label="Color the map by">
          <button
            type="button"
            className="toggle-btn"
            aria-pressed={mode === 'date'}
            onClick={() => setMode('date')}
          >
            Latest observation
          </button>
          <button
            type="button"
            className="toggle-btn"
            aria-pressed={mode === 'visits'}
            onClick={() => setMode('visits')}
          >
            Number of visits
          </button>
        </div>
        <span className="skymap__readout" role="status">
          {probe === null ? (
            caption ?? `${tiles.count.toLocaleString('en-US')} tiles observed`
          ) : hover === null ? (
            <>
              RA {probe.ra.toFixed(1)}° Dec {deg(probe.dec)} · not observed
            </>
          ) : (
            <>
              <b>{nameAt(hover)}</b> ·{' '}
              {frame === 'equatorial' ? (
                <>
                  RA {probe.ra.toFixed(1)}° Dec {deg(probe.dec)}
                </>
              ) : (
                <>
                  l {probe.l.toFixed(1)}° b {deg(probe.b)}
                </>
              )}{' '}
              · {tiles.visits[hover]} {tiles.visits[hover] === 1 ? 'visit' : 'visits'} ·{' '}
              {(tiles.frames?.[hover] ?? 0).toLocaleString('en-US')} frames · last{' '}
              {monthLabel(months.index[hover], epoch)}
            </>
          )}
        </span>
      </div>
      )}

      <div className="skymap__canvas" ref={wrapRef}>
        <canvas
          ref={canvasRef}
          style={{ width: '100%', display: 'block' }}
          onPointerMove={interactive ? onMove : undefined}
          onPointerLeave={interactive ? () => setProbe(null) : undefined}
          role="img"
          aria-label={`Mollweide all-sky map of ${tiles.count.toLocaleString(
            'en-US'
          )} observed 7DS tiles in ${
            frame === 'equatorial' ? 'equatorial' : 'galactic'
          } coordinates, colored by ${
            mode === 'date' ? 'the date each was last observed' : 'the number of visits to each'
          }. Longitude increases to the left.`}
        />

        {/* The pointer card. Hidden from assistive technology because the
            readout above is the same information in a live region, and having
            both announce would double every movement. */}
        {probe && (
          <div
            className={`skymap__tip${probe.x > width * 0.55 ? ' skymap__tip--left' : ''}${
              probe.y > width * RATIO * 0.55 ? ' skymap__tip--up' : ''
            }`}
            style={{ left: probe.x, top: probe.y }}
            aria-hidden="true"
          >
            {hover === null ? (
              <>
                <div className="skymap__tip-head">
                  <span className="skymap__tip-name">No observation</span>
                  <span className="skymap__tip-badge skymap__tip-badge--none">Not observed</span>
                </div>
                <dl className="skymap__tip-grid">
                  <dt>RA</dt>
                  <dd>{probe.ra.toFixed(1)}°</dd>
                  <dt>Dec</dt>
                  <dd>{deg(probe.dec)}</dd>
                  <dt>l, b</dt>
                  <dd>
                    {probe.l.toFixed(1)}°, {deg(probe.b)}
                  </dd>
                </dl>
                <p className="skymap__tip-note">
                  No science frames recorded at this position.
                </p>
              </>
            ) : (
              <TileDetail
                tiles={tiles}
                index={hover}
                name={nameAt(hover)}
                ra={probe.ra}
                dec={probe.dec}
                l={probe.l}
                b={probe.b}
                exposureSec={exposureSec}
              />
            )}
          </div>
        )}
      </div>

      <div className="skymap__legend">
        <span className="skymap__legend-title">
          {mode === 'date' ? 'Last observed' : 'Visits per tile'}
        </span>
        <div className="skymap__ramp" style={{ background: `linear-gradient(to right, ${legendStops})` }} />
        <div className="skymap__ticks">
          {legendTicks.map((tick, index) => (
            <span key={tick + index}>{tick}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
