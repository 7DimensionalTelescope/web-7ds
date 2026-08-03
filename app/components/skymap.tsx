import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { TileMap } from '../lib/portal.server';

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

/* Viridis, sampled at nine stops and interpolated between them. Chosen to
   match the colour scale used in the survey's own footprint figures, and
   because it stays legible in greyscale and to colour-blind readers. */
const VIRIDIS: [number, number, number][] = [
  [68, 1, 84],
  [72, 40, 120],
  [62, 74, 137],
  [49, 104, 142],
  [38, 130, 142],
  [31, 158, 137],
  [53, 183, 121],
  [110, 206, 88],
  [181, 222, 43],
  [253, 231, 37],
];

function viridis(t: number): [number, number, number] {
  const clamped = Math.max(0, Math.min(1, t));
  const scaled = clamped * (VIRIDIS.length - 1);
  const i = Math.min(VIRIDIS.length - 2, Math.floor(scaled));
  const f = scaled - i;
  const a = VIRIDIS[i];
  const b = VIRIDIS[i + 1];
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ];
}

const rgb = (c: [number, number, number]) => `rgb(${c[0]},${c[1]},${c[2]})`;

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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function monthLabel(index: number, epoch: [number, number]) {
  const total = (epoch[1] - 1) + index;
  return `${MONTHS[((total % 12) + 12) % 12]} ${epoch[0] + Math.floor(total / 12)}`;
}

type Mode = 'date' | 'visits';
type Frame = 'equatorial' | 'galactic';

export default function SkyMap({ tiles }: { tiles: TileMap }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<Mode>('date');
  const [frame, setFrame] = useState<Frame>('equatorial');
  const [width, setWidth] = useState(960);
  const [hover, setHover] = useState<number | null>(null);

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
        ? tiles.monthMax > 0
          ? tiles.month[i] / tiles.monthMax
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
    ctx.fillStyle = '#f2f5fa';
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

      ctx.fillStyle = rgb(viridis(value(i)));
      ctx.fillRect(px(x) - w / 2, py(y) - h / 2, w, h);
    }
    ctx.restore();

    // Graticule — drawn in longitude so the curves are continuous.
    ctx.strokeStyle = 'rgba(10,16,28,0.18)';
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
    ctx.strokeStyle = '#0a101c';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 2 * scale, scale, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Labels. Right ascension is conventionally read in hours, galactic
    // longitude in degrees, so the two frames are labelled differently.
    ctx.fillStyle = '#4d5b71';
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
  }, [tiles, coords, frame, width, value]);

  const onMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const height = rect.height;
    const pad = 40;
    const scale = Math.min((rect.width - pad * 2) / 4, (height - pad * 1.4) / 2);
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;

    let best = -1;
    let bestDistance = 64; // px², so within about 8 px
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
    setHover(best >= 0 ? best : null);
  };

  const legendStops = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => rgb(viridis(i / 11))).join(', '),
    []
  );

  const legendTicks = useMemo(() => {
    if (mode === 'date') {
      return [0, 0.5, 1].map((t) => monthLabel(Math.round(t * tiles.monthMax), tiles.epoch));
    }
    return [0, 0.5, 1].map((t) => {
      const visits = Math.round(Math.exp(t * visitScale) - 1);
      return `${visits.toLocaleString('en-US')}`;
    });
  }, [mode, tiles, visitScale]);

  return (
    <div className="skymap">
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
          {hover === null ? (
            `${tiles.count.toLocaleString('en-US')} tiles observed`
          ) : (
            <>
              <b>{tiles.name[hover]}</b> ·{' '}
              {frame === 'equatorial' ? (
                <>
                  RA {tiles.ra[hover].toFixed(1)}° Dec {tiles.dec[hover].toFixed(1)}°
                </>
              ) : (
                <>
                  l {coords.lon[hover].toFixed(1)}° b {coords.lat[hover].toFixed(1)}°
                </>
              )}{' '}
              · {tiles.visits[hover]} {tiles.visits[hover] === 1 ? 'visit' : 'visits'} · last{' '}
              {monthLabel(tiles.month[hover], tiles.epoch)}
            </>
          )}
        </span>
      </div>

      <div className="skymap__canvas" ref={wrapRef}>
        <canvas
          ref={canvasRef}
          style={{ width: '100%', display: 'block' }}
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
          role="img"
          aria-label={`Mollweide all-sky map of ${tiles.count.toLocaleString(
            'en-US'
          )} observed 7DS tiles in ${
            frame === 'equatorial' ? 'equatorial' : 'galactic'
          } coordinates, colored by ${
            mode === 'date' ? 'the date each was last observed' : 'the number of visits to each'
          }. Longitude increases to the left.`}
        />
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
