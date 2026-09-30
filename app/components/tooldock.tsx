import React from 'react';
import { tools } from '../lib/calculators';

/* ---------------------------------------------------------------------------
   The four calculators as a 2x2 of icons. Placed by PageRail, which keeps it
   in reach while a proposal is being read.

   Links go to /visibility, /exptime, /overhead and /tile — the addresses the
   Call for Proposals prints.
--------------------------------------------------------------------------- */

/* Line icons on a 24-unit grid, drawn in the current text color. */
const ICONS: Record<string, React.ReactNode> = {
  // a telescope on its mount, pointed at a star: can it be observed
  visibility: (
    <>
      <path d="M2.6 15.4 11.4 10.5l1.5 2.7-8.8 4.9z" />
      <path d="M11.4 10.5l2-1.1 1.5 2.7-2 1.1" />
      <path d="M8 15.1 5.6 21M8 15.1l2.4 5.9" />
      <path d="M18.40 1.70 L19.36 4.27 L22.11 4.39 L19.96 6.11 L20.69 8.76 L18.40 7.24 L16.11 8.76 L16.84 6.11 L14.69 4.39 L17.44 4.27Z" fill="currentColor" stroke="none" />
    </>
  ),
  // a stopwatch
  exptime: (
    <>
      <circle cx="12" cy="13.5" r="7" />
      <path d="M12 13.5V9.5" />
      <path d="M10 3h4" />
      <path d="M12 3v3.5" />
    </>
  ),
  // an hourglass: time spent around the exposure
  overhead: (
    <>
      <path d="M7 3h10M7 21h10" />
      <path d="M8 3c0 5 8 5 8 9s-8 4-8 9" />
      <path d="M16 3c0 5-8 5-8 9s8 4 8 9" />
    </>
  ),
  // the tiling grid
  tile: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </>
  ),
};

/* One word each, under the icon: an icon alone does not say which calculator. */
const SHORT: Record<string, string> = {
  visibility: 'Visibility',
  exptime: 'Exp. time',
  overhead: 'Overhead',
  tile: 'Tiles',
};

export function ToolIcons() {
  return (
    <nav aria-label="Useful tools">
        <p className="tooldock__title">Tools</p>
        <ul className="tooldock__grid">
          {tools.map((tool) => (
            <li key={tool.slug}>
              <a
                className="tooldock__icon"
                href={tool.path}
                target="_blank"
                rel="noreferrer"
                title={tool.name}
                aria-label={`${tool.name} (opens in a new tab)`}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {ICONS[tool.slug]}
                </svg>
                <span className="tooldock__label">{SHORT[tool.slug] ?? tool.name}</span>
              </a>
            </li>
          ))}
        </ul>
    </nav>
  );
}
