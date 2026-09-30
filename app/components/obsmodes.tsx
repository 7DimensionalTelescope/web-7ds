import React, { useState } from 'react';
import data from '../data/obsmodes.json';
import { wavelengthColor } from './colors';

/* ---------------------------------------------------------------------------
   What each observation mode covers.

   The same two views the calculators' mode builder draws, so the two agree:
   above, the transmission curve of every filter the mode takes, labeled with
   how many units take it; below, which filter each unit carries and in what
   order. Search adds the one thing the other three do not have — it spends the
   units on different fields rather than on one — so the field count is drawn
   beside the grid.

   The mode definitions are a snapshot of the live telescope configuration
   (scripts/snapshot_obsmodes.py), not a description of it: Spec and Color are
   the array's own mode files, and Deep and Search, which the proposer defines,
   are shown with a stated example.
--------------------------------------------------------------------------- */

type Mode = {
  key: string;
  name: string;
  source: string;
  fields: number;
  example: boolean;
  units: Record<string, string[]>;
  note: string;
};

const MODES = data.modes as Mode[];
const UNITS = data.units as string[];
const CURVES = data.curves as Record<string, { nm: number; pts: number[][] }>;

const W = 960;
const H = 230;
const L = 34;
const R = 12;
const T = 58;
const B = 30;
const NM_MIN = 350;
const NM_MAX = 950;

const sx = (nm: number) => L + ((nm - NM_MIN) / (NM_MAX - NM_MIN)) * (W - L - R);
const sy = (v: number) => T + (1 - v) * (H - T - B);

/** Text on a filled cell has to stay legible whatever the band's color. */
function inkOn(rgbString: string) {
  const m = rgbString.match(/\d+/g);
  if (!m) return '#0a101c';
  const [r, g, b] = m.map(Number);
  return 0.299 * r + 0.587 * g + 0.114 * b < 150 ? '#ffffff' : '#0a101c';
}

function Coverage({ mode }: { mode: Mode }) {
  const count: Record<string, number> = {};
  Object.values(mode.units).forEach((filters) =>
    filters.forEach((f) => {
      count[f] = (count[f] ?? 0) + 1;
    })
  );
  const filters = Object.keys(count).sort((a, b) => CURVES[a].nm - CURVES[b].nm);

  const line = (pts: number[][]) =>
    pts.map((p, i) => `${i ? 'L' : 'M'}${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(' ');
  const area = (pts: number[][]) =>
    `${line(pts)} L${sx(pts[pts.length - 1][0]).toFixed(1)},${sy(0)} L${sx(pts[0][0]).toFixed(1)},${sy(0)} Z`;

  const peak = (pts: number[][]) => pts.reduce((best, p) => (p[1] > best[1] ? p : best), pts[0]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label={`Wavelength coverage of the ${mode.name} mode: ${filters
        .map((f) => (count[f] > 1 ? `${f} on ${count[f]} units` : f))
        .join(', ')}.`}
    >
      <g stroke="var(--slate-200)" strokeWidth="1">
        {[400, 500, 600, 700, 800, 900].map((t) => (
          <line key={t} x1={sx(t)} x2={sx(t)} y1={T} y2={sy(0)} />
        ))}
      </g>

      {filters.map((f) => {
        const pts = CURVES[f].pts;
        if (!pts.length) return null;
        const color = wavelengthColor(CURVES[f].nm);
        return (
          <g key={f}>
            <path d={area(pts)} fill={color} opacity="0.2" />
            <path d={line(pts)} fill="none" stroke={color} strokeWidth="1.4" />
          </g>
        );
      })}

      {/* Labels at each curve's peak, turned upright so thirty-two of them
          still fit across the band. */}
      {filters.map((f) => {
        const pts = CURVES[f].pts;
        if (!pts.length) return null;
        const [x] = peak(pts);
        return (
          <text
            key={`l-${f}`}
            x={sx(x)}
            y={T - 6}
            transform={`rotate(-90 ${sx(x)} ${T - 6})`}
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill={wavelengthColor(CURVES[f].nm)}
          >
            {count[f] > 1 ? `${f} ×${count[f]}` : f}
          </text>
        );
      })}

      <line x1={L} x2={W - R} y1={sy(0)} y2={sy(0)} stroke="var(--ink-900)" strokeWidth="1" />
      <g fontSize="10" fill="var(--slate-500)" fontFamily="var(--font-mono)" textAnchor="middle">
        {[400, 500, 600, 700, 800, 900].map((t) => (
          <text key={t} x={sx(t)} y={H - 12}>
            {t}
          </text>
        ))}
      </g>
      <text x={W - R} y={H - 1} fontSize="10" fill="var(--slate-500)" textAnchor="end">
        wavelength, nm
      </text>
    </svg>
  );
}

function UnitGrid({ mode }: { mode: Mode }) {
  const depth = Math.max(...UNITS.map((u) => (mode.units[u] ?? []).length), 1);
  return (
    <div className="modegrid" role="table" aria-label={`Filter carried by each unit in the ${mode.name} mode`}>
      <div className="modegrid__row" role="row">
        <span className="modegrid__head" role="rowheader" />
        {UNITS.map((u) => (
          <span className="modegrid__unit" role="columnheader" key={u}>
            {u.replace('7DT', '')}
          </span>
        ))}
      </div>
      {Array.from({ length: depth }).map((_, order) => (
        <div className="modegrid__row" role="row" key={order}>
          <span className="modegrid__head" role="rowheader">
            {depth > 1 ? `Set ${order + 1}` : 'Filter'}
          </span>
          {UNITS.map((u) => {
            const f = (mode.units[u] ?? [])[order];
            if (!f) {
              return <span className="modegrid__cell modegrid__cell--empty" role="cell" key={u} aria-label="none" />;
            }
            const color = wavelengthColor(CURVES[f].nm);
            return (
              <span
                className="modegrid__cell"
                role="cell"
                key={u}
                style={{ background: color, color: inkOn(color) }}
              >
                {f}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Fields({ n }: { n: number }) {
  const side = Math.round(Math.sqrt(n));
  return (
    <div className="modefields">
      <div
        className="modefields__grid"
        style={{ gridTemplateColumns: `repeat(${side}, 1fr)` }}
        aria-hidden="true"
      >
        {Array.from({ length: n }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
      <span className="modefields__label">
        {n === 1 ? 'one field' : `${n} fields`}
      </span>
    </div>
  );
}

export default function ObsModes() {
  const [key, setKey] = useState(MODES[0].key);
  const mode = MODES.find((m) => m.key === key) ?? MODES[0];

  return (
    <div className="obsmodes">
      <fieldset className="obsmodes__pick">
        <legend>Show the coverage of</legend>
        {MODES.map((m) => (
          <label key={m.key} className="obsmodes__option">
            <input
              type="radio"
              name="obsmode"
              value={m.key}
              checked={m.key === key}
              onChange={() => setKey(m.key)}
            />
            <span>{m.name}</span>
          </label>
        ))}
      </fieldset>

      <div className="obsmodes__figure">
        <Coverage mode={mode} />
        <div className="obsmodes__layout">
          <UnitGrid mode={mode} />
          <Fields n={mode.fields} />
        </div>
        <p className="footnote" style={{ marginTop: '1rem' }}>
          {mode.note}{' '}
          {mode.example
            ? 'The filter is illustrative: this mode is defined by the proposal.'
            : `From the array's configuration, ${mode.source}.`}
        </p>
      </div>
    </div>
  );
}
