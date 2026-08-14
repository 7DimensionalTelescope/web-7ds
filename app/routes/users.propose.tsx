import React from 'react';
import { Link, useLoaderData } from '@remix-run/react';
import type { HeadersFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { PageLayout, PageHero, Section, LiveBadge } from '../components/site';
import { getStatus } from '../lib/portal.server';
import { modeText } from './content/text';
import surveys from './content/surveys.json';

export const meta: MetaFunction = () => [
  { title: 'How to propose · 7DT for users' },
  {
    name: 'description',
    content:
      'Observing modes, target-of-opportunity response and how observing time on 7DT is requested.',
  },
];

const CACHE = 'public, max-age=900, stale-while-revalidate=86400';
export const headers: HeadersFunction = () => ({ 'Cache-Control': CACHE });

export async function loader() {
  const status = await getStatus();
  return json(
    { too: status.data.too, live: status.live, generatedAt: status.generatedAt },
    { headers: { 'Cache-Control': CACHE } }
  );
}

const num = (value: number) => value.toLocaleString('en-US');

const Index = () => {
  const { too, live, generatedAt } = useLoaderData<typeof loader>();

  return (
  <PageLayout menu="manuUsers">
    <PageHero
      eyebrow="For users"
      title={
        <>
          How to <em>propose</em>
        </>
      }
      lede="What the array can be asked to do, how an observation is specified, and how time is requested."
      image="/img/hero/telescope.jpg"
    />

    <Section eyebrow="Modes" title="Four observing modes">
      <p className="prose">{modeText}</p>

      <ul className="feature-list" style={{ marginTop: '2rem' }}>
        {surveys.modes.map((mode, index) => (
          <li key={mode.name}>
            <span className="feature-list__key">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="feature-list__title" style={{ fontSize: '1.125rem' }}>
                {mode.name}
                <span
                  style={{
                    marginLeft: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--slate-500)',
                    fontWeight: 400,
                  }}
                >
                  {mode.tagline}
                </span>
              </h3>
              <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                {mode.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>

    <Section eyebrow="Specifying" title="What an observation request contains" alt>
      <div className="split split--wide-text">
        <div>
          <p className="prose">
            An observation is specified by target position, observing mode, exposure time and the
            number of repetitions, together with any constraint on airmass, moon separation or
            time window. Positions on the survey tiling are preferred where the science allows,
            because data taken on a tile coadd directly with existing survey data and can be
            differenced against the reference image without an additional calibration step.
          </p>
          <p className="prose">
            Before requesting time, check the target is observable from El Sauce in the intended
            window, and check what already exists: much of the southern sky already has a
            medium-band reference image, and the tile under a given position may already carry the
            bands needed.
          </p>
        </div>
        <div className="panel">
          <div className="panel__title">Before you write</div>
          <ul className="feature-list" style={{ borderTop: 0, margin: 0 }}>
            <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
              <div>
                <p className="feature-list__body" style={{ margin: 0 }}>
                  Check visibility and existing coverage — the{' '}
                  <Link to="/users/access">data access page</Link> reports the bands and frame
                  counts held for any position.
                </p>
              </div>
            </li>
            <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
              <div>
                <p className="feature-list__body" style={{ margin: 0 }}>
                  Estimate depth from the measured{' '}
                  <Link to="/users/performance">limiting magnitudes</Link> rather than from the
                  aperture.
                </p>
              </div>
            </li>
            <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
              <div>
                <p className="feature-list__body" style={{ margin: 0 }}>
                  Target visibility and filter response can be computed with{' '}
                  <Link to="/users/software">
                    <code>supy</code>
                  </Link>
                  .
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Section>

    <Section eyebrow="Response" title="Target of opportunity">
      <p className="prose">
        When a transient alert arrives — a gamma-ray burst, a gravitational-wave candidate — the
        scheduler interrupts the observing plan and repoints. Two response modes are available: a
        regular mode that completes the current exposure block before switching, and a rapid mode
        that interrupts immediately. Once the follow-up finishes, the array returns to the queue
        and resumes the interrupted target if it is still observable. Time from alert ingestion to
        the start of a follow-up exposure is under one minute.
      </p>
      <p className="prose">
        Target-of-opportunity data are processed at elevated priority and the requester is notified
        when raw data arrive, as each filter set completes, and on completion with a spectral
        energy distribution plot and magnitude table attached.
      </p>

      <div style={{ margin: '2rem 0 1.25rem' }}>
        <LiveBadge live={live} updated={generatedAt} interval="every 30 minutes" />
      </div>
      <p className="prose">
        {num(too.followup_events)} follow-up campaigns have been carried out since automated
        target-of-opportunity response entered service, {num(too.gw_campaigns)} of them on
        gravitational-wave events.
      </p>
      <div className="chip-row" style={{ marginTop: '1.25rem' }}>
        {too.gw_event_ids.map((id: string) => (
          <span className="chip chip--static" key={id}>
            {id}
          </span>
        ))}
      </div>
      <p className="footnote" style={{ marginTop: '1rem' }}>
        LVK superevent identifiers as issued in the public alert stream. Target-level details are
        not published here.
      </p>
    </Section>

    <Section eyebrow="Applying" title="Requesting observing time" alt>
      <div className="panel" style={{ maxWidth: '68ch' }}>
        <div className="panel__title">No open call at present</div>
        <p className="feature-list__body" style={{ marginBottom: '1rem' }}>
          Observing time is currently allocated within the collaboration and its partner
          institutions; there is no general call for proposals yet. A proposal template and an
          exposure time calculator will be published on this page when one opens. Enquiries about
          observations outside the survey program, including target-of-opportunity requests, should
          be addressed to the project directly.
        </p>
        <a
          className="btn btn--primary"
          href="mailto:mim@astro.snu.ac.kr?subject=7DT%20observation%20enquiry"
        >
          Contact the project
        </a>
      </div>
    </Section>
  </PageLayout>
  );
};

export default Index;
