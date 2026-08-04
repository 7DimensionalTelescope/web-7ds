import React from 'react';
import { viridis, rgb, isDark } from './colors';

/* ---------------------------------------------------------------------------
   A single survey field, drawn at its own scale.

   The all-sky map is the wrong figure for a field of a few square degrees:
   seven tiles out of fifteen thousand are a speck on it. This draws just the
   field, on a tangent plane centred on it, which is the projection a small
   region is normally shown in — straight lines stay straight and the tiles
   keep their shape.

   SVG rather than canvas: there are seven shapes, not fifteen thousand, and
   SVG gives crisp labels inside each tile, renders without JavaScript, and
   scales to any display without a device-pixel-ratio dance.
--------------------------------------------------------------------------- */

const DEG = Math.PI / 180;

export type FieldTile = {
  name: string;
  ra: number;
  dec: number;
  /** The number shown under the tile name — cycles, visits, frames. */
  value: number;
  /** Drawn emphasised; everything else is context around it. */
  highlight?: boolean;
};

/** Gnomonic (tangent plane) projection, in degrees, x increasing to the left. */
function project(ra: number, dec: number, ra0: number, dec0: number): [number, number] {
  const d = dec * DEG;
  const d0 = dec0 * DEG;
  const dRa = (ra - ra0) * DEG;
  const cosC = Math.sin(d0) * Math.sin(d) + Math.cos(d0) * Math.cos(d) * Math.cos(dRa);
  if (cosC <= 0) return [NaN, NaN]; // more than 90° away: off this plane
  const x = (Math.cos(d) * Math.sin(dRa)) / cosC;
  const y = (Math.cos(d0) * Math.sin(d) - Math.sin(d0) * Math.cos(d) * Math.cos(dRa)) / cosC;
  // Right ascension increases to the left, as on the sky.
  return [-x / DEG, y / DEG];
}

/** Nice round grid spacing for an axis spanning `span` degrees. */
function step(span: number) {
  for (const candidate of [0.25, 0.5, 1, 2, 5, 10]) {
    if (span / candidate <= 6) return candidate;
  }
  return 15;
}

export default function FieldMap({
  tiles,
  fovLon = 1.34,
  fovLat = 0.9,
  valueLabel = 'visits',
  caption,
}: {
  tiles: FieldTile[];
  /** On-sky tile size in degrees. */
  fovLon?: number;
  fovLat?: number;
  /** Word placed after the number inside each tile. */
  valueLabel?: string;
  caption?: string;
}) {
  if (tiles.length === 0) return null;

  /* Centre the plane on the tiles that matter, not on all of them: the
     neighbours are context and should not pull the field off centre. */
  const focus = tiles.some((t) => t.highlight) ? tiles.filter((t) => t.highlight) : tiles;
  const ra0 = focus.reduce((sum, t) => sum + t.ra, 0) / focus.length;
  const dec0 = focus.reduce((sum, t) => sum + t.dec, 0) / focus.length;

  /* Each tile is a quadrilateral: its four sky corners projected separately,
     rather than a rectangle drawn at the centre. Half a degree of declination
     changes the width of a tile in right ascension appreciably at Dec −61. */
  const corners = (t: FieldTile) => {
    const halfLat = fovLat / 2;
    const out: [number, number][] = [];
    for (const [dLat, sign] of [
      [+halfLat, -1],
      [+halfLat, +1],
      [-halfLat, +1],
      [-halfLat, -1],
    ] as [number, number][]) {
      const dec = t.dec + dLat;
      const halfLon = fovLon / 2 / Math.max(0.02, Math.cos(dec * DEG));
      out.push(project(t.ra + sign * halfLon, dec, ra0, dec0));
    }
    return out;
  };

  const shapes = tiles.map((t) => ({ tile: t, points: corners(t) }));

  const xs = shapes.flatMap((s) => s.points.map((p) => p[0])).filter(Number.isFinite);
  const ys = shapes.flatMap((s) => s.points.map((p) => p[1])).filter(Number.isFinite);
  const pad = Math.max(fovLon, fovLat) * 0.45;
  const minX = Math.min(...xs) - pad;
  const maxX = Math.max(...xs) + pad;
  const minY = Math.min(...ys) - pad;
  const maxY = Math.max(...ys) + pad;

  // Pixel geometry. The gutters carry the axis labels.
  const PPD = 150; // pixels per degree
  const L = 52;
  const B = 34;
  const T = 10;
  const R = 12;
  const plotW = (maxX - minX) * PPD;
  const plotH = (maxY - minY) * PPD;
  const W = plotW + L + R;
  const H = plotH + T + B;

  const sx = (x: number) => L + (x - minX) * PPD;
  const sy = (y: number) => T + (maxY - y) * PPD;

  const maxValue = Math.max(...focus.map((t) => t.value), 1);
  const minValue = Math.min(...focus.map((t) => t.value));

  /* Graticule. Lines of constant declination and constant right ascension are
     curved on a tangent plane, so each is sampled rather than drawn straight. */
  const decs: number[] = [];
  const ras: number[] = [];
  const decSpan = fovLat + Math.abs(maxY - minY);
  const decStep = step(decSpan);
  const raStep = step((maxX - minX) / Math.cos(dec0 * DEG));
  for (let d = Math.ceil((dec0 - 6) / decStep) * decStep; d <= dec0 + 6; d += decStep) decs.push(d);
  for (let r = Math.ceil((ra0 - 12) / raStep) * raStep; r <= ra0 + 12; r += raStep) ras.push(r);

  const path = (points: [number, number][]) =>
    points
      .filter((p) => Number.isFinite(p[0]) && Number.isFinite(p[1]))
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`)
      .join(' ');

  const decLine = (d: number) => {
    const pts: [number, number][] = [];
    for (let r = ra0 - 12; r <= ra0 + 12; r += 0.25) pts.push(project(r, d, ra0, dec0));
    return pts;
  };
  const raLine = (r: number) => {
    const pts: [number, number][] = [];
    for (let d = dec0 - 6; d <= dec0 + 6; d += 0.1) pts.push(project(r, d, ra0, dec0));
    return pts;
  };

  const raLabel = (deg: number) => `${(((deg % 360) + 360) % 360).toFixed(raStep < 1 ? 1 : 0)}°`;

  return (
    <div className="fieldmap">
      <svg
        viewBox={`0 0 ${W.toFixed(0)} ${H.toFixed(0)}`}
        width="100%"
        role="img"
        aria-label={`Map of ${tiles.length} survey tiles centered on right ascension ${ra0.toFixed(
          1
        )} degrees, declination ${dec0.toFixed(1)} degrees.`}
      >
        <rect x={L} y={T} width={plotW} height={plotH} fill="#f2f5fa" />

        <g stroke="rgba(10,16,28,0.16)" strokeWidth="0.7" fill="none" strokeDasharray="2 3">
          {decs.map((d) => (
            <path key={`d${d}`} d={path(decLine(d))} />
          ))}
          {ras.map((r) => (
            <path key={`r${r}`} d={path(raLine(r))} />
          ))}
        </g>

        {/* Axis labels, placed where each line meets the frame. */}
        <g
          fill="#4d5b71"
          fontFamily="ui-monospace, 'JetBrains Mono', monospace"
          fontSize="11"
        >
          {decs.map((d) => {
            const p = project(ra0, d, ra0, dec0);
            const y = sy(p[1]);
            if (y < T + 6 || y > T + plotH - 2) return null;
            return (
              <text key={`dl${d}`} x={L - 8} y={y + 3.5} textAnchor="end">
                {d > 0 ? '+' : '−'}
                {Math.abs(d).toFixed(decStep < 1 ? 2 : 0)}°
              </text>
            );
          })}
          {ras.map((r) => {
            const p = project(r, dec0, ra0, dec0);
            const x = sx(p[0]);
            if (x < L + 14 || x > L + plotW - 14) return null;
            return (
              <text key={`rl${r}`} x={x} y={T + plotH + 16} textAnchor="middle">
                {raLabel(r)}
              </text>
            );
          })}
          <text x={L - 8} y={T + plotH + 16} textAnchor="end" fill="#8090a6">
            Dec
          </text>
          <text x={L + plotW / 2} y={T + plotH + 30} textAnchor="middle" fill="#8090a6">
            RA (deg) — increasing to the left
          </text>
        </g>

        {/* The tiles, each labelled in place — there are few enough that a
            legend or a separate table would only move the reading elsewhere. */}
        <g>
          {[...shapes]
            .sort((a, b) => Number(Boolean(a.tile.highlight)) - Number(Boolean(b.tile.highlight)))
            .map(({ tile, points }) => {
              const active = tile.highlight !== false;
              const color = viridis(
                maxValue === minValue
                  ? 0.65
                  : ((tile.value - minValue) / (maxValue - minValue)) * 0.75 + 0.2
              );
              const center = project(tile.ra, tile.dec, ra0, dec0);
              const cx = sx(center[0]);
              const cy = sy(center[1]);
              const text = active ? (isDark(color) ? '#ffffff' : '#0a101c') : '#5b6b82';
              return (
                <g key={tile.name}>
                  <polygon
                    points={points
                      .filter((p) => Number.isFinite(p[0]))
                      .map((p) => `${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`)
                      .join(' ')}
                    fill={active ? rgb(color) : 'rgba(10,16,28,0.03)'}
                    stroke={active ? 'rgba(255,255,255,0.75)' : 'rgba(10,16,28,0.22)'}
                    strokeWidth={active ? 2.5 : 0.8}
                    strokeDasharray={active ? '7 4' : undefined}
                  />
                  <text
                    x={cx}
                    y={active ? cy - 3 : cy + 4}
                    textAnchor="middle"
                    fill={text}
                    fontFamily="ui-monospace, 'JetBrains Mono', monospace"
                    fontSize={active ? 13 : 10}
                    fontWeight={active ? 600 : 400}
                  >
                    {tile.name}
                  </text>
                  {active && (
                    <text
                      x={cx}
                      y={cy + 14}
                      textAnchor="middle"
                      fill={text}
                      fontFamily="ui-monospace, 'JetBrains Mono', monospace"
                      fontSize="11"
                      opacity="0.85"
                    >
                      {tile.value.toLocaleString('en-US')} {valueLabel}
                    </text>
                  )}
                </g>
              );
            })}
        </g>

        <rect
          x={L}
          y={T}
          width={plotW}
          height={plotH}
          fill="none"
          stroke="#0a101c"
          strokeWidth="1"
        />
      </svg>

      {caption && <p className="fieldmap__caption">{caption}</p>}
    </div>
  );
}
