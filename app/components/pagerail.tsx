import React, { useEffect, useState } from 'react';
import { ToolIcons } from './tooldock';

/* ---------------------------------------------------------------------------
   A right-hand rail for a long page: where you are, and the tools you need.

   Body text is held to a readable measure, so on a wide window the right side
   of the column is otherwise empty. The rail puts that space to work — the
   page's own contents, with the section in view highlighted, and the
   calculators below it.

   It spans the wrapped sections and sticks inside them, so it follows the
   reader but never rides over the hero above or the footer below. Wrap the
   sections in a `.dockzone` and place this as its first child; the zone's
   containers leave room for it.
--------------------------------------------------------------------------- */

export type RailItem = { id: string; label: string; level: 2 | 3 };

export default function PageRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  /* The heading nearest the top of the viewport is the one being read. A
     band just under the fixed nav, rather than the whole viewport, so the
     highlight moves when a heading reaches the reading line and not before. */
  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="pagerail" aria-label="On this page">
      <div className="pagerail__card">
        <nav aria-label="Page contents">
          <p className="pagerail__title">On this page</p>
          <ol className="pagerail__toc">
            {items.map((item) => (
              <li key={item.id} className={`pagerail__item pagerail__item--${item.level}`}>
                <a
                  href={`#${item.id}`}
                  className={active === item.id ? 'is-active' : undefined}
                  aria-current={active === item.id ? 'location' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="pagerail__tools">
          <ToolIcons />
        </div>
      </div>
    </aside>
  );
}
