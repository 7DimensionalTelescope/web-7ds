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
      'Who may propose for 7DT time, how much is available and when: team membership through the science working groups, the KASI and KAS allocations, the data policy, and how an observation is specified.',
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

/* What a request has to pin down. Ordered the way a proposal is written:
   what and where first, then how it is taken, then when. */
const REQUEST_PARAMETERS: string[][] = [
  [
    'Observing mode',
    'Spec, Deep, Color or Search. The mode decides how the array divides itself between filters and fields.',
  ],
  [
    'Target',
    'Position in RA and Dec, or a tile identifier. A tile is preferred where the science allows, since the data then coadd and difference against what already exists.',
  ],
  [
    'Filters',
    'Which of the 35 medium bands and five broad bands, or a wavelength range and a mode that covers it. Each unit carries nine slots, so a wider set costs more units or more nights.',
  ],
  [
    'Exposure time',
    'Seconds per frame. One hundred is the fiducial exposure the surveys are built from, and the depth every published figure is quoted at.',
  ],
  [
    'Repetitions',
    'Frames per visit, and visits per target. Depth in the coadd goes as the square root of total time, so four frames buy 0.75 magnitudes over one.',
  ],
  [
    'Cadence',
    'For a monitoring program: interval between visits and the total span. For a single epoch: the window it has to fall in.',
  ],
  [
    'Constraints',
    'Airmass limit, moon separation and phase, time window, and anything else that would make a frame useless if violated.',
  ],
  [
    'Trigger criteria',
    'Target-of-opportunity programs only: what event triggers the observation, which response mode, and how the alert reaches the scheduler.',
  ],
];

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
        lede="Who may ask for time on 7DT, how much of it there is, and what the array can be asked to do with it."
        image="/img/hero/telescope.jpg"
      />

      {/* Three headings, in the order the questions arrive: may I and on what
          terms, how do I write it, and where does it go. Everything else is a
          titled block inside one of them — as nine equal sections a reader
          could not tell which headings decided their eligibility and which
          only described the mechanics. */}
      <Section eyebrow="Before you start" title="General information">
        <div className="subsection">
          <h3>Who may propose</h3>
          <div className="split split--wide-text">
            <div className="prose">
              <p>
                The 7DS team is being formally constituted. Anyone taking part in a 7DS Science
                Working Group becomes a member of the team automatically, without having to ask —
                opting out is the action that requires notice, not joining. The working groups
                follow the <Link to="/science/overview">seven science themes</Link>.
              </p>
              <p>
                Team membership carries two rights. The first is early access to 7DS data during
                its proprietary period, before it is released more widely. The second is the right
                to propose an independent observing program of your own on 7DT, rather than working
                only from what the surveys happen to collect.
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
        </div>

        <div className="subsection">
          <h3>Time available, and when</h3>
          <div className="prose">
            <p>
              Two hundred hours of 7DT time are allocated to the Korea Astronomy and Space Science
              Institute, and a further two hundred hours to the Korean Astronomical Society — four
              hundred hours in total, held separately and awarded through their own routes. This is
              time on the array outside the three surveys, which otherwise occupy the night.
            </p>
            <p>
              No call for proposals has opened against either allocation. The schedule will be
              announced here when it is fixed, together with a proposal template. The{' '}
              <Link to="/calculator">observation calculators</Link> are available now.
              Target-of-opportunity requests are handled separately and continuously, and do not
              wait for a call.
            </p>
          </div>
        </div>

        <div className="subsection">
          <h3>Data rights and authorship</h3>
          <div className="split split--wide-text">
            <div className="prose">
              <p>
                Data taken for the surveys and for approved programs carry a proprietary period
                during which they are available to the 7DS team before wider release. Team
                membership is what grants that access, which is the practical reason the working
                groups matter as much as the allocations do.
              </p>
              <p>
                Authorship on work using 7DS data is governed by a policy still under discussion.
                What is settled is that it will include the initial core members of the 7DS team —
                seven people at present — in the author list of collaborative papers drawing on 7DS
                data. Anyone intending to publish is asked to contact the principal investigator
                first, so that authors and acknowledgments are agreed before submission rather than
                after.
              </p>
              <p>
                The full policy — proprietary period, terms for sharing data outside the team, the
                public release schedule and authorship for external collaborators — is being
                prepared by the collaboration and will be posted under{' '}
                <Link to="/publication/policy">publication policy</Link> once ratified.
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
                      <b>Still open</b> How long the proprietary period runs, how data may be
                      shared outside the team, when it becomes public, and authorship for
                      collaborators outside the team.
                    </p>
                  </div>
                </li>
                <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
                  <div>
                    <p className="feature-list__body" style={{ margin: 0 }}>
                      <b>Meanwhile</b> Contact the PI before submitting, and acknowledge the
                      funders listed on the <Link to="/about/funding">funding page</Link>.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Writing" title="Guidelines" alt>
        <div className="subsection">
          <h3>Observing modes</h3>
          <p className="prose">{modeText}</p>

          <ul className="feature-list" style={{ marginTop: '2rem' }}>
            {surveys.modes.map((mode, index) => (
              <li key={mode.name}>
                <span className="feature-list__key">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h4 className="feature-list__title" style={{ fontSize: '1.125rem' }}>
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
                  </h4>
                  <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                    {mode.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="subsection">
          <h3>What a request contains</h3>
          <p className="prose">
            An observation is a mode, a target, a filter set, an exposure and a cadence, plus
            whatever constraints the science imposes. Positions on the survey tiling are preferred
            wherever the science allows: data taken on a tile coadd directly with the survey data
            already there, and difference against the existing reference image without a separate
            calibration step.
          </p>

          <div className="table-wrap" style={{ marginTop: '2rem' }}>
            <table className="spec-table">
              <caption>Parameters of an observation request</caption>
              <thead>
                <tr>
                  <th scope="col">Parameter</th>
                  <th scope="col">What to give</th>
                </tr>
              </thead>
              <tbody>
                {REQUEST_PARAMETERS.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="footnote" style={{ marginTop: '1.25rem' }}>
            Camera gain and binning are set by the observatory rather than chosen per proposal, and
            are recorded per frame — the pipeline matches calibration masters by camera, gain,
            binning, unit, night and filter, so a frame always carries the settings it was taken
            with. If a program requires a specific gain, say so and why; the selectable settings
            are not published here.
          </p>
        </div>

        <div className="subsection">
          <h3>Target of opportunity</h3>
          <p className="prose">
            When a transient alert arrives — a gamma-ray burst, a gravitational-wave candidate —
            the scheduler interrupts the observing plan and repoints. Two response modes are
            available: a regular mode that completes the current exposure block before switching,
            and a rapid mode that interrupts immediately. Once the follow-up finishes, the array
            returns to the queue and resumes the interrupted target if it is still observable. Time
            from alert ingestion to the start of a follow-up exposure is under one minute.
          </p>
          <p className="prose">
            Target-of-opportunity data are processed at elevated priority and the requester is
            notified when raw data arrive, as each filter set completes, and on completion with a
            spectral energy distribution plot and magnitude table attached.
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
            LVK superevent identifiers as issued in the public alert stream. Target-level details
            are not published here.
          </p>
        </div>

        <div className="subsection">
          <h3>Before you write</h3>
          <p className="prose">
            Three things are worth settling first, because each of them can make a program
            unnecessary or unworkable, and all three can be checked from this site.
          </p>
          <ul className="feature-list" style={{ marginTop: '1.5rem' }}>
            <li>
              <span className="feature-list__key">01</span>
              <div>
                <h4 className="feature-list__title" style={{ fontSize: '1rem' }}>
                  Check what already exists
                </h4>
                <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                  Much of the southern sky already has a medium-band reference image, and the tile
                  under your position may already carry the bands you need. The{' '}
                  <Link to="/users/access">data access page</Link> reports the bands and frame
                  counts held for any position.
                </p>
              </div>
            </li>
            <li>
              <span className="feature-list__key">02</span>
              <div>
                <h4 className="feature-list__title" style={{ fontSize: '1rem' }}>
                  Estimate depth from measurements, not aperture
                </h4>
                <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                  The <Link to="/calculator/exposure">exposure calculator</Link> does this against
                  a depth model fitted on real observations, per filter of the mode you intend to
                  use, and the <Link to="/calculator/overhead">overhead calculator</Link> adds what
                  the array spends around the exposures. The measured{' '}
                  <Link to="/users/performance">limiting magnitudes</Link> are what both are
                  predicting against.
                </p>
              </div>
            </li>
            <li>
              <span className="feature-list__key">03</span>
              <div>
                <h4 className="feature-list__title" style={{ fontSize: '1rem' }}>
                  Check the target is observable
                </h4>
                <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                  The <Link to="/calculator/visibility">visibility calculator</Link> gives the
                  altitude track and observable hours from El Sauce for the window you have in
                  mind, and the <Link to="/calculator/tiles">tile matcher</Link> places the target
                  on the survey grid.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </Section>

      <Section eyebrow="Submitting" title="Requesting observing time">
        <div className="panel" style={{ maxWidth: '68ch' }}>
          <div className="panel__title">No open call at present</div>
          <p className="feature-list__body" style={{ marginBottom: '1rem' }}>
            Outside the KASI and KAS allocations described above, observing time is allocated
            within the collaboration and its partner institutions, and there is no general call for
            proposals. A proposal template will be published here when a call opens; the{' '}
            <Link to="/calculator">calculators</Link> for exposure time, overhead, visibility and
            tile coverage are available now. Until a call opens, and for anything outside the
            survey program — including target-of-opportunity requests — write to the project
            directly.
          </p>
          <a
            className="btn btn--primary"
            href="mailto:mim@astro.snu.ac.kr?subject=7DT%20observation%20inquiry"
          >
            Contact the project
          </a>
        </div>

        <div className="btn-row" style={{ marginTop: '2rem' }}>
          <Link className="btn btn--secondary" to="/users/performance">
            Measured performance
          </Link>
          <Link className="btn btn--secondary" to="/users/access">
            Check coverage
          </Link>
          <Link className="btn btn--secondary" to="/science/overview">
            Science working groups
          </Link>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
