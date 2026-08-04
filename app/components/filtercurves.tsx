import React from 'react';
import { wavelengthColor } from './colors';
import filters from '../routes/content/filters.json';

/* ---------------------------------------------------------------------------
   Filter response, drawn from the numbers rather than shown as a screenshot.

   The curves are the project's own reference data (supy/refdata/7dt), so this
   is the same response the pipeline calibrates against — not a picture of a
   plot of it. Drawn as SVG: it stays sharp at any size, renders without
   JavaScript, and each band can carry its own colour and label.
--------------------------------------------------------------------------- */

type Curve = { name: string; center: number; pts: number[][] };

const W = 960;
const H = 300;
const L = 46;
const R = 12;
const T = 12;
const B = 34;

export default function FilterCurves({
  showBroad = true,
}: {
  /** The broad bands are much wider; hiding them isolates the medium set. */
  showBroad?: boolean;
}) {
  const medium = filters.medium as Curve[];
  const broad = filters.broad as Curve[];

  const shown = showBroad ? [...broad, ...medium] : medium;
  const lamMin = 300;
  const lamMax = 950;
  const respMax = 0.62;

  const sx = (nm: number) => L + ((nm - lamMin) / (lamMax - lamMin)) * (W - L - R);
  const sy = (r: number) => T + (1 - r / respMax) * (H - T - B);

  const line = (pts: number[][]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(' ');

  const area = (pts: number[][]) =>
    `${line(pts)} L${sx(pts[pts.length - 1][0]).toFixed(1)},${sy(0).toFixed(1)} L${sx(
      pts[0][0]
    ).toFixed(1)},${sy(0).toFixed(1)} Z`;

  const xTicks = [400, 500, 600, 700, 800, 900];
  const yTicks = [0, 0.2, 0.4, 0.6];

  return (
    <figure className="curves">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
        aria-label="Response curves of the 7DT filter set, from 300 to 950 nanometers.">
        <g stroke="var(--slate-200)" strokeWidth="1">
          {yTicks.map((t) => (
            <line key={t} x1={L} x2={W - R} y1={sy(t)} y2={sy(t)} />
          ))}
        </g>

        {/* Broad bands sit behind, as outlines: they overlap every medium band
            and would otherwise bury them. */}
        {showBroad &&
          broad.map((f) => (
            <path
              key={f.name}
              d={line(f.pts)}
              fill="none"
              stroke="var(--slate-400)"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.8"
            />
          ))}

        {medium.map((f) => (
          <g key={f.name}>
            <path d={area(f.pts)} fill={wavelengthColor(f.center)} opacity="0.22" />
            <path d={line(f.pts)} fill="none" stroke={wavelengthColor(f.center)} strokeWidth="1.5" />
          </g>
        ))}

        <g
          fill="var(--slate-500)"
          fontFamily="ui-monospace, 'JetBrains Mono', monospace"
          fontSize="11"
        >
          {xTicks.map((t) => (
            <text key={t} x={sx(t)} y={H - B + 18} textAnchor="middle">
              {t}
            </text>
          ))}
          {yTicks.map((t) => (
            <text key={t} x={L - 8} y={sy(t) + 3.5} textAnchor="end">
              {t.toFixed(1)}
            </text>
          ))}
          <text x={(L + W - R) / 2} y={H - 2} textAnchor="middle">
            Wavelength (nm)
          </text>
          <text
            x={-(T + (H - T - B) / 2)}
            y={12}
            textAnchor="middle"
            transform="rotate(-90)"
          >
            Response
          </text>
        </g>

        <line x1={L} x2={W - R} y1={sy(0)} y2={sy(0)} stroke="var(--ink-900)" strokeWidth="1" />
        <line x1={L} x2={L} y1={T} y2={sy(0)} stroke="var(--ink-900)" strokeWidth="1" />
      </svg>

      <figcaption>
        <b>Filter response</b> The {medium.length} regularly spaced medium bands
        {showBroad ? ' in color, with the Sloan broad bands dashed behind them' : ''}. Curves are
        the project's own reference data — the response the pipeline calibrates against — rather
        than nominal transmission, so they include detector and optical throughput and peak near
        0.58. The {shown.length === medium.length ? '' : ''}fifteen filters installed in late 2025
        are not shown: their spectrophotometric calibration is still in preparation.
      </figcaption>
    </figure>
  );
}
