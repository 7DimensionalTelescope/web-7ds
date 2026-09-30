import React from 'react';
import { tools } from '../lib/calculators';

/* ---------------------------------------------------------------------------
   The four calculators as a 2x2 of icons, kept in reach while a proposal is
   being read.

   It lives in a rail that spans the page's content sections and nothing else,
   and sticks inside that rail — so it follows the reader down the guidelines
   but never rides up over the hero or down over the footer. Put it as the
   first child of a `.dockzone` wrapper around the sections it accompanies.

   It needs the left margin to sit in, and a 1280px content column only
   leaves one on a wide window; below that it is not shown, and the same four
   tools are linked from the checklist, the form-field table and Useful links.

   Links go to /visibility, /exptime, /overhead and /tile — the addresses the
   Call for Proposals prints.
--------------------------------------------------------------------------- */

/* Line icons on a 24-unit grid, drawn in the current text color. */
const ICONS: Record<string, React.ReactNode> = {
  // a target's track rising over the horizon
  visibility: (
    <>
      <path d="M3 18h18" />
      <path d="M5 18c1.6-7.5 12.4-7.5 14 0" />
      <circle cx="12" cy="10.4" r="1.6" fill="currentColor" stroke="none" />
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

export default function ToolDock() {
  return (
    <aside className="tooldock" aria-label="Useful tools">
      <nav className="tooldock__card">
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
    </aside>
  );
}
