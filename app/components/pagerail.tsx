import React, { useEffect, useRef, useState } from 'react';
import { ToolIcons } from './tooldock';

/* ---------------------------------------------------------------------------
   A right-hand rail for a long page: where you are, and optionally the tools.

   Body text is held to a readable measure, so on a wide window the right of
   the column is otherwise empty. The rail puts that space to work — the page's
   own contents, with the section in view highlighted.

   Enable it with PageLayout's `rail` prop rather than placing it by hand: the
   layout wraps everything after the hero in a `.dockzone`, which the rail
   spans and sticks inside, so it never rides over the hero or the footer, and
   whose containers leave room for it.

   Contents come from the page itself — every section heading, and every
   `.subsection` heading below it — unless a page passes its own list. That
   keeps the rail from ever disagreeing with the page it describes.
--------------------------------------------------------------------------- */

export type RailItem = { id: string; label: string; level: 2 | 3 };

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export default function PageRail({ items, tools = false }: { items?: RailItem[]; tools?: boolean }) {
  const ref = useRef<HTMLElement | null>(null);
  const [list, setList] = useState<RailItem[]>(items ?? []);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (items) return;
    const zone = ref.current?.closest('.dockzone');
    if (!zone) return;
    const seen = new Set<string>();
    const found: RailItem[] = [];
    zone.querySelectorAll<HTMLElement>('.section-title h2, .subsection > h3').forEach((el) => {
      const label = (el.textContent ?? '').trim();
      if (!label) return;
      if (!el.id) {
        let id = slug(label) || 'section';
        while (seen.has(id) || document.getElementById(id)) id = `${id}-x`;
        el.id = id;
      }
      seen.add(el.id);
      found.push({ id: el.id, label, level: el.tagName === 'H2' ? 2 : 3 });
    });
    setList(found);
  }, [items]);

  /* The heading nearest the reading line is the one being read: a band just
     under the fixed nav, so the highlight moves as a heading reaches it. */
  useEffect(() => {
    const targets = list
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
  }, [list]);

  return (
    <aside className="pagerail" aria-label="On this page" ref={ref}>
      <div className="pagerail__card">
        {list.length > 1 && (
          <nav aria-label="Page contents">
            <p className="pagerail__title">On this page</p>
            <ol className="pagerail__toc">
              {list.map((item) => (
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
        )}
        {tools && (
          <div className="pagerail__tools">
            <ToolIcons />
          </div>
        )}
      </div>
    </aside>
  );
}
