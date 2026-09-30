import React, { useState } from 'react';
import { tools } from '../lib/calculators';

/* ---------------------------------------------------------------------------
   The four calculators, kept in reach while a proposal is being read.

   A proposer goes back and forth between the guidelines and the calculators,
   so on the page where that happens the links stay on screen. On a wide
   window there is room in the left margin and the dock sits there, open. On a
   narrower one the margin is where the text starts, so it collapses to a pill
   at the lower left and opens on demand rather than covering the page.

   Links go to /calculator/<slug>, the stable address, not to wherever the
   calculator happens to run — so the dock follows it when it moves.
--------------------------------------------------------------------------- */

export default function ToolDock() {
  const [open, setOpen] = useState(false);

  return (
    <aside className={`tooldock${open ? ' tooldock--open' : ''}`} aria-label="Useful tools">
      <button
        type="button"
        className="tooldock__toggle"
        aria-expanded={open}
        aria-controls="tooldock-list"
        onClick={() => setOpen((was) => !was)}
      >
        Useful tools
      </button>
      <div className="tooldock__panel" id="tooldock-list">
        <p className="tooldock__title">Useful tools</p>
        <ul>
          {tools.map((tool) => (
            <li key={tool.slug}>
              <a href={`/calculator/${tool.slug}`} target="_blank" rel="noreferrer">
                {tool.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
