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
      'Who may propose for 7DT time, how much is available and when: team membership through the science working groups, the KASI and KAS allocations, observing modes and target-of-opportunity response.',
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
          How to <em>Propose</em>
        </>
      }
      lede="Who may ask for time on 7DT, how much of it there is, and what the array can be asked to do with it."
      image="/img/hero/telescope.jpg"
    />

    {/* Before the modes and the mechanics: whether a reader is eligible at all,
        how much time exists, and when they can ask for it. Those three
        questions were answered in a panel at the foot of the page, which is a
        long way to read to find out the answer is "not yet, unless you are on
        a working group". */}
    <Section eyebrow="Eligibility" title="Who may propose">
      <div className="split split--wide-text">
        <div className="prose">
          <p>
            The 7DS team is being formally constituted. Anyone taking part in a 7DS Science
            Working Group becomes a member of the team automatically, without having to ask —
            opting out is the action that requires notice, not joining. The working groups follow
            the <Link to="/science/overview">seven science themes</Link>.
          </p>
          <p>
            Team membership carries two rights. The first is early access to 7DS data during its
            proprietary period, before it is released more widely. The second is the right to
            propose an independent observing programme of your own on 7DT, rather than working
            only from what the surveys happen to collect.
          </p>
          <p>
            Publication rules for collaborative work using 7DS data are still being settled. They
            will include a co-authorship policy under which the initial core members of the 7DS
            team — seven people at present — are included in the author list. The rules will be
            published under <Link to="/publication/policy">publication policy</Link> once agreed.
          </p>
        </div>
        <div className="panel">
          <div className="panel__title">In short</div>
          <ul className="feature-list" style={{ borderTop: 0, margin: 0 }}>
            <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
              <div>
                <p className="feature-list__body" style={{ margin: 0 }}>
                  <b>Who</b> Members of the 7DS team. Joining a science working group makes you
                  one.
                </p>
              </div>
            </li>
            <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
              <div>
                <p className="feature-list__body" style={{ margin: 0 }}>
                  <b>How much</b> 200 hours for KASI and 200 hours for the Korean Astronomical
                  Society.
                </p>
              </div>
            </li>
            <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
              <div>
                <p className="feature-list__body" style={{ margin: 0 }}>
                  <b>When</b> No call has opened yet. It will be announced on this page.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Section>

    <Section eyebrow="Time" title="How much time there is, and when" alt>
      <div className="prose">
        <p>
          Two hundred hours of 7DT time are allocated to the Korea Astronomy and Space Science
          Institute, and a further two hundred hours to the Korean Astronomical Society — four
          hundred hours in total, held separately and awarded through their own routes. This is
          time on the array outside the three surveys, which otherwise occupy the night.
        </p>
        <p>
          No call for proposals has opened against either allocation. The schedule will be
          announced here when it is fixed, together with a proposal template and an exposure time
          calculator. Until then, enquiries about observations outside the survey programme — and
          target-of-opportunity requests, which are handled separately and continuously — should
          go to the project directly.
        </p>
      </div>
      <div className="btn-row" style={{ marginTop: '1.5rem' }}>
        <a
          className="btn btn--primary"
          href="mailto:mim@astro.snu.ac.kr?subject=7DT%20observation%20enquiry"
        >
          Contact the project
        </a>
        <Link className="btn btn--secondary" to="/science/overview">
          Science working groups
        </Link>
      </div>
    </Section>

    {/* Third of the general questions: what happens to the data afterwards.
        The detail is not settled yet, so this states what is decided, names
        what is still open, and sends the reader to the policy page rather than
        filling the gaps with plausible-sounding rules. */}
    <Section eyebrow="Policy" title="Data rights and authorship">
      <div className="split split--wide-text">
        <div className="prose">
          <p>
            Data taken for the surveys and for approved programmes carry a proprietary period
            during which they are available to the 7DS team before wider release. Team membership
            is what grants that access, which is the practical reason the working groups matter as
            much as the allocations do.
          </p>
          <p>
            Authorship on work using 7DS data is governed by a policy still under discussion. What
            is settled is that it will include the initial core members of the 7DS team — seven
            people at present — in the author list of collaborative papers drawing on 7DS data.
            Anyone intending to publish is asked to contact the principal investigator first, so
            that authors and acknowledgments are agreed before submission rather than after.
          </p>
          <p>
            The full policy — proprietary period, terms for sharing data outside the team, the
            public release schedule and authorship for external collaborators — is being prepared
            by the collaboration and will be posted under{' '}
            <Link to="/publication/policy">publication policy</Link> once ratified. This page will
            point to it.
          </p>
        </div>
        <div className="panel">
          <div className="panel__title">Settled, and not</div>
          <ul className="feature-list" style={{ borderTop: 0, margin: 0 }}>
            <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
              <div>
                <p className="feature-list__body" style={{ margin: 0 }}>
                  <b>Decided</b> Team members have proprietary-period access; the seven core
                  members appear on collaborative papers.
                </p>
              </div>
            </li>
            <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
              <div>
                <p className="feature-list__body" style={{ margin: 0 }}>
                  <b>Still open</b> How long the proprietary period runs, how data may be shared
                  outside the team, when it becomes public, and authorship for collaborators
                  outside the team.
                </p>
              </div>
            </li>
            <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
              <div>
                <p className="feature-list__body" style={{ margin: 0 }}>
                  <b>Meanwhile</b> Contact the PI before submitting, and acknowledge the funders
                  listed on the <Link to="/about/funding">funding page</Link>.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Section>

    <Section eyebrow="Modes" title="Four observing modes" alt>
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

    <Section eyebrow="Specifying" title="What an observation request contains">
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

    <Section eyebrow="Response" title="Target of opportunity" alt>
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

    <Section eyebrow="Applying" title="Requesting observing time">
      <div className="panel" style={{ maxWidth: '68ch' }}>
        <div className="panel__title">No open call at present</div>
        <p className="feature-list__body" style={{ marginBottom: '1rem' }}>
          Outside the KASI and KAS allocations described at the top of this page, observing time
          is allocated within the collaboration and its partner institutions, and there is no
          general call for proposals. Enquiries should be addressed to the project directly.
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
