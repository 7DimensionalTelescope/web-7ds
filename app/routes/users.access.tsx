import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';

export const meta: MetaFunction = () => [
  { title: 'Data access · 7DT for users' },
  {
    name: 'description',
    content:
      'How 7DS data will be obtained. A public query and download service is being built; until it opens, data are requested from the project directly.',
  },
];

/* ---------------------------------------------------------------------------
   Data access — the service, not the data.

   A query and download interface is being built and does not exist yet. The
   page says that rather than describing a process nobody can follow. What does
   work today has moved to where it belongs: coverage and the position query to
   the status page, the format specification to its own page.
--------------------------------------------------------------------------- */

const Index = () => (
  <PageLayout menu="manuUsers">
    <PageHero
      eyebrow="For users"
      title="Data access"
      lede="How 7DS data are obtained: search, query and download. The service is being built; this page will describe it when it opens."
      image="/img/hero/data.jpg"
    />

    <Section eyebrow="Status" title="Being built">
      <div className="panel" style={{ maxWidth: '68ch' }}>
        <div className="panel__title">To be determined</div>
        <p className="feature-list__body" style={{ marginBottom: '1rem' }}>
          There is no public interface for querying or downloading 7DS data yet. How data will be
          searched, what may be retrieved at once, how bulk transfers are handled and what
          authentication is required are all still being decided, and this page will set them out
          once they are.
        </p>
        <p className="feature-list__body" style={{ marginBottom: '1rem' }}>
          Data taken for the surveys carry a proprietary period during which they are available to
          the 7DS team. Membership, and the data rights that come with it, are described under{' '}
          <Link to="/users/propose">how to propose</Link>. Until the service opens, requests —
          from team members and from anyone else — go to the project directly.
        </p>
        <a
          className="btn btn--primary"
          href="mailto:mim@astro.snu.ac.kr?subject=7DS%20data%20request"
        >
          Request data
        </a>
      </div>
    </Section>

    <Section eyebrow="Meanwhile" title="What can be answered today" alt>
      <p className="prose">
        Two of the questions that bring people here can already be answered without the service.
      </p>
      <ul className="feature-list" style={{ marginTop: '2rem' }}>
        <li>
          <span className="feature-list__key">01</span>
          <div>
            <h3 className="feature-list__title" style={{ fontSize: '1.0625rem' }}>
              Has this position been observed, and in which bands?
            </h3>
            <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
              The coverage map on the <Link to="/users/status">status page</Link> draws the whole
              footprint against the designed tiling, and the position search beside it reports
              whether a tile covers a given coordinate and what exists for it — bands taken, frame
              counts, dates and estimated depth. It runs in the browser against the tile list, so
              there is no service behind it to wait for.
            </p>
          </div>
        </li>
        <li>
          <span className="feature-list__key">02</span>
          <div>
            <h3 className="feature-list__title" style={{ fontSize: '1.0625rem' }}>
              What will the files look like when I get them?
            </h3>
            <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
              The <Link to="/users/format">data format specification</Link> gives the image and
              catalog products, the filename convention, the WCS and unit conventions, every FITS
              header keyword the pipeline writes, and the columns of a source catalog. Analysis can
              be written against it before the data arrive.
            </p>
          </div>
        </li>
      </ul>
      <div className="btn-row" style={{ marginTop: '2rem' }}>
        <Link className="btn btn--primary" to="/users/status">
          Coverage and position search
        </Link>
        <Link className="btn btn--secondary" to="/users/format">
          Data format
        </Link>
        <Link className="btn btn--secondary" to="/users/software">
          Software
        </Link>
      </div>
    </Section>
  </PageLayout>
);

export default Index;
