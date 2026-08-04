import React from 'react';
import { Link } from '@remix-run/react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PageLayout, PageHero, Section, LiveBadge } from '../components/site';
import { getStatus } from '../lib/portal.server';

export const meta: MetaFunction = () => [
  { title: 'Data access · 7DT for users' },
  {
    name: 'description',
    content: 'How to find out whether 7DT data exist for a position, and how to request them.',
  },
];

const CACHE = 'public, max-age=900, stale-while-revalidate=86400';
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

export async function loader() {
  const status = await getStatus();
  return json(
    {
      ris: status.data.ris,
      live: status.live,
      generatedAt: status.generatedAt,
    },
    { headers: { 'Cache-Control': CACHE } }
  );
}

const num = (value: number) => value.toLocaleString('en-US');

const Index = () => {
  const { ris, live, generatedAt } = useLoaderData<typeof loader>();

  return (
    <PageLayout menu="manuUsers">
      <PageHero
        eyebrow="For users"
        title={
          <>
            Data <em>access</em>
          </>
        }
        lede="How to find out what exists for a position on the sky, and how to obtain it."
        image="/img/hero/data.jpg"
      />

      <Section eyebrow="Searching" title="Finding out what exists">
        <div style={{ marginBottom: '1.5rem' }}>
          <LiveBadge live={live} updated={generatedAt} interval="every 30 minutes" />
        </div>

        <p className="prose">
          The sky coverage map is the search interface at present. Point at any position and it
          reports whether a tile there has been observed, how many nights and frames it carries,
          which medium bands were taken and over what date range — read from the same database
          that drives the pipeline, so a tile shown as observed has calibrated images behind it.
          Positions with no data are reported as having none.
        </p>
        <p className="prose">
          {num(ris.tiles_observed)} of {num(ris.tiles_defined)} reference tiles have data,{' '}
          {ris.coverage_pct} percent of the tiling. Tiles are identified as T00000 through T28519
          in order of increasing declination; quoting the tile identifier is the quickest way to
          make a request unambiguous.
        </p>

        <div className="btn-row" style={{ marginTop: '1.5rem' }}>
          <Link className="btn btn--primary" to="/survey/coverage">
            Search the coverage map
          </Link>
          <Link className="btn btn--secondary" to="/users/format">
            What you will receive
          </Link>
        </div>
      </Section>

      <Section eyebrow="Requesting" title="Obtaining data" alt>
        <div className="split split--wide-text">
          <div>
            <p className="prose">
              There is no public archive interface yet. A complete record of every image type and
              source catalog is held internally, with the provenance of any product traceable back
              to the raw frames it was built from, and requests are handled by the project
              directly until a public release is made.
            </p>
            <p className="prose">
              A request is quickest to fill if it states the field or coordinates — or the tile
              identifier — the filters, the epoch range, and which product is wanted: single
              exposures, coadds, difference images or catalogs. Terms of use and acknowledgment are
              set out under <Link to="/users/data">how to use the data</Link>.
            </p>
          </div>
          <div className="panel">
            <div className="panel__title">Requesting data</div>
            <p className="feature-list__body" style={{ marginBottom: '1rem' }}>
              Include the position or tile identifier, the bands, the epoch range and the product
              type.
            </p>
            <a
              className="btn btn--primary"
              href="mailto:mim@astro.snu.ac.kr?subject=7DT%20data%20request"
            >
              Contact the project
            </a>
          </div>
        </div>
      </Section>

      <Section eyebrow="Ahead" title="Planned public release">
        <p className="prose">
          A public release of survey products is being prepared alongside the completion of the
          Reference Imaging Survey, whose first full cycle is anticipated by the end of 2027. The
          release is intended to include a query interface over images and catalogs; this page will
          carry it when it exists.
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
