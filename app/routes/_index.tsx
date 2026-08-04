import React from 'react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import NavBar from './navigate';
import MainFrame from './main';
import { getStatus, getTileMapLite } from '../lib/portal.server';

export const meta: MetaFunction = () => {
  return [
    { title: '7-Dimensional Telescope' },
    {
      name: 'description',
      content:
        'The 7-Dimensional Telescope: a twenty-unit medium-band array at El Sauce Observatory, Chile, and the 7-Dimensional Sky Survey of the southern sky.',
    },
  ];
};

const CACHE = 'public, max-age=1800, stale-while-revalidate=86400';
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

export async function loader() {
  /* The landing page shows the survey footprint, so it needs the tile list —
     but only to draw it, so the reduced copy without identifiers or the
     per-filter breakdown is enough and costs less than half the payload.
     Neither fetch can fail the page: both fall back to a stored copy. */
  const [tiles, status] = await Promise.all([
    getTileMapLite().catch(() => null),
    getStatus().catch(() => null),
  ]);

  return json(
    {
      tiles: tiles?.data ?? null,
      tilesLive: tiles?.live ?? false,
      generatedAt: tiles?.generatedAt ?? '',
      telescopes: status?.data.telescopes ?? null,
      risCoverage: status?.data.ris.coverage_pct ?? null,
    },
    { headers: { 'Cache-Control': CACHE } }
  );
}

/* The home page runs as a snap-scrolling deck; the footer is the final
   section inside MainFrame rather than a sibling of it. */
const Index: React.FC = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="page">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <NavBar manu="manuHome" />
      <main id="content" style={{ height: '100%' }}>
        <MainFrame {...data} />
      </main>
    </div>
  );
};

export default Index;
