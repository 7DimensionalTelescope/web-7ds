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

    <Section eyebrow="Query" title="Data query" alt>
      <div className="panel" style={{ maxWidth: '68ch' }}>
        <div className="panel__title">TBD</div>
        <p className="feature-list__body" style={{ marginBottom: 0 }}>
          A query interface — search by position, tile, band, date or depth, and retrieve the
          matching images and catalogs — is to be determined. It will be described here.
        </p>
      </div>
    </Section>

  </PageLayout>
);

export default Index;
