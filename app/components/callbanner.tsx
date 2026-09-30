import React, { useEffect, useRef } from 'react';
import { Link } from '@remix-run/react';
import call from '../routes/content/call.json';

/* ---------------------------------------------------------------------------
   Site-wide notice that a call for proposals is open.

   It sits above the navigation, fixed with it, because the navigation is
   fixed at the top of the viewport and anything placed above it in the normal
   flow ends up underneath it. The bar publishes its own height as
   --callbar-h on the root element, and the nav, the page and the home-page
   deck all offset by that — so it never covers the menu, and nothing covers
   it. The value is measured rather than fixed because the line wraps on a
   phone; CSS carries a one-line default for the moment before this runs.

   Set `active: false` in content/call.json when the deadline passes and it
   disappears everywhere at once, taking the offset with it.
--------------------------------------------------------------------------- */

export default function CallBanner() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const root = document.documentElement;
    const publish = () => root.style.setProperty('--callbar-h', `${element.offsetHeight}px`);
    publish();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', publish);
      return () => {
        window.removeEventListener('resize', publish);
        root.style.removeProperty('--callbar-h');
      };
    }
    const observer = new ResizeObserver(publish);
    observer.observe(element);
    return () => {
      observer.disconnect();
      root.style.removeProperty('--callbar-h');
    };
  }, []);

  if (!call.active) return null;

  return (
    <aside className="callbar" aria-label="Call for proposals" ref={ref}>
      <div className="callbar__inner">
        <span className="callbar__tag">Open call</span>
        <p className="callbar__text">
          <b>{call.title}</b> — proposals for {call.observingPeriod} are being accepted. Deadline{' '}
          <b>{call.deadline}</b>, {call.deadlineNote}.
        </p>
        <Link className="callbar__link" to="/users/call">
          Dates and documents
        </Link>
      </div>
    </aside>
  );
}
