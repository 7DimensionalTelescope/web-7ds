import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import { modeText } from './content/text';
import surveys from './content/surveys.json';
import call from './content/call.json';
import ObsModes from '../components/obsmodes';
import ToolDock from '../components/tooldock';

export const meta: MetaFunction = () => [
  { title: 'How to propose · 7DT for users' },
  {
    name: 'description',
    content:
      'Who may propose for 7DT time, how much is available and when: team membership through the science working groups, the KASI and KAS allocations, the data policy, and how an observation is specified.',
  },
];

/* The three program types. A different axis from the observation modes: the
   type says what kind of program it is, the mode says how the array is
   configured to carry it out. */
const PROGRAM_TYPES: string[][] = [
  [
    'ToO',
    'Target of opportunity',
    'Observations triggered by an unpredictable event — a gamma-ray burst, a gravitational-wave counterpart, a newly discovered supernova. The trigger condition is described in prose; the response time is a separate field.',
  ],
  [
    'Target',
    'Pre-selected targets',
    'One or more targets observed on a planned schedule. A custom tiling may be used. Every target has to be listed with its coordinates — a representative subset is not enough, since each is judged on its own visibility and priority.',
  ],
  [
    'Survey',
    'Wide area or many tiles',
    "Systematic coverage of an area. Carried out on the existing 7DS tiling grid, the same one RIS, WTS and IMS use, rather than a tiling of your own. Give the coordinate range and the area in square degrees rather than a tile list.",
  ],
];

/* The fields of the Phase 1 form, in the order the form asks for them. The
   Preparation Instructions are the authority; this table exists so that a
   reader can see what they are committing to before opening a document, and so
   that each field that a calculator answers points at that calculator. */
const REQUEST_PARAMETERS: { field: string; what: React.ReactNode }[] = [
  {
    field: 'Total requested hours',
    what: (
      <>
        The whole request, overheads included — slewing, filter changes, readout — not time on
        source. The <Link to="/overhead">overhead calculator</Link> gives the difference.
      </>
    ),
  },
  {
    field: 'Minimum acceptable hours',
    what: 'The smallest allocation that still meets the core objective. Used when a partial allocation is considered.',
  },
  { field: 'Program type', what: 'ToO, Target or Survey, as above.' },
  {
    field: 'Observation mode',
    what: 'Spec, Deep, Color or Search. More than one may be listed, with the time allocated to each explained.',
  },
  {
    field: 'Proprietary period',
    what: 'None, 12 months or 18 months, counted from the date the data products are delivered rather than from the observation.',
  },
  {
    field: 'Observing window',
    what: (
      <>
        Any constraint on when the observations may happen — a seasonal visibility window,
        coordination with another facility, a deadline for a fading object. &ldquo;None&rdquo; if
        there is none. The <Link to="/visibility">visibility calculator</Link> gives the
        window a target actually has.
      </>
    ),
  },
  { field: 'Moon phase', what: 'Dark, gray or bright; more than one if the program tolerates a range.' },
  {
    field: 'Required response time',
    what: 'ToO programs only: the longest acceptable delay between trigger and the start of observation.',
  },
  {
    field: 'Exposure time justification',
    what: (
      <>
        The exposure per target or tile and how it was derived, the target signal-to-noise and the
        calculation or calculator used to reach it, the filters and the time on each, and the
        arithmetic that adds up to the total requested hours. The{' '}
        <Link to="/exptime">exposure calculator</Link> works in either direction.
      </>
    ),
  },
  {
    field: 'Target coordinates',
    what: (
      <>
        Target programs: every target in RA and Dec, J2000. Survey programs: the coordinate range
        and the area in deg². The <Link to="/tile">tile matcher</Link> shows which
        tiles cover a position, and how they overlap.
      </>
    ),
  },
  {
    field: 'Duplication with existing 7DS data',
    what: (
      <>
        Whether the targets or area overlap <Link to="/survey/ris">RIS</Link>,{' '}
        <Link to="/survey/ims">IMS</Link> or <Link to="/survey/wts">WTS</Link>.
        &ldquo;None&rdquo;, or why the existing data are not sufficient — greater depth, a different
        cadence, a different filter set. What exists on a given tile is on the{' '}
        <Link to="/users/status">status page</Link>.
      </>
    ),
  },
];

const Index = () => {
  return (
    <PageLayout menu="manuUsers">
      <ToolDock />
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

      {/* Three headings, in the order the questions arrive: may I and on what
          terms, how do I write it, and where does it go. Everything else is a
          titled block inside one of them — as nine equal sections a reader
          could not tell which headings decided their eligibility and which
          only described the mechanics. */}
      <Section eyebrow="Before you start" title="General information">
        {call.active && (
          <div className="subsection">
            <h3>The open call</h3>
            <p className="prose">
              Proposals are being accepted for observations between {call.observingPeriod}. The
              deadline is <b>{call.deadline}</b>, {call.deadlineNote}. The dates, the documents to
              download and the rules that apply to this particular call are on the{' '}
              <Link to="/users/call">call for proposals</Link> page. This page is about writing the
              proposal, and does not change between calls.
            </p>
            <div className="btn-row" style={{ marginTop: '1.5rem' }}>
              <Link className="btn btn--primary" to="/users/call">
                Dates and documents
              </Link>
              <a className="btn btn--secondary" href="/proposal/7DT_Phase1_Proposal_Form.docx" download>
                Proposal Form
              </a>
            </div>
          </div>
        )}

        <div className="subsection">
          <h3>Who may propose</h3>
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
        </div>

        <div className="subsection">
          <h3>Time available, and when</h3>
          <div className="prose">
            <p>
              Two hundred hours of 7DT time are allocated to the Korea Astronomy and Space Science
              Institute, and a further two hundred hours to the Korean Astronomical Society — four
              hundred hours in total. How a proposal is assigned to a pool and reviewed is set by
              each call, and is given in its{' '}
              <Link to="/users/call">Call for Proposals</Link>. This is time on the array outside
              the three surveys, which otherwise occupy the night.
            </p>
            <p>
              The current call, its dates and its documents are on the{' '}
              <Link to="/users/call">call for proposals</Link> page. The{' '}
              <Link to="/users/links#calculators">observation calculators</Link> are available for costing a
              program.
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
                Any paper, conference contribution, thesis or other public output that uses 7DT data
                not yet in a 7DS public release must include the core members of the 7DS team as
                co-authors. They are named in the{' '}
                <a href="/proposal/7DT_Call_for_Proposals.docx" download>
                  Call for Proposals
                </a>
                , along with the reference to cite and the acknowledgment to include. Anyone
                intending to publish is asked to contact the principal investigator first, so that
                authors and acknowledgments are agreed before submission rather than after.
              </p>
              <p>
                The wider publication policy of the 7DS collaboration — the public release schedule
                among it — is being finalized, and will be posted under{' '}
                <Link to="/publication/policy">publication policy</Link> once ratified.
              </p>
            </div>
            <div className="panel">
              <div className="panel__title">Settled, and not</div>
              <ul className="feature-list" style={{ borderTop: 0, margin: 0 }}>
                <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
                  <div>
                    <p className="feature-list__body" style={{ margin: 0 }}>
                      <b>Decided</b> The PI chooses the proprietary period — none, 12 or 18
                      months from delivery of the data products. The core members appear as
                      co-authors on any output that uses non-public data.
                    </p>
                  </div>
                </li>
                <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
                  <div>
                    <p className="feature-list__body" style={{ margin: 0 }}>
                      <b>Still open</b> The wider collaboration publication policy, including the
                      public release schedule.
                    </p>
                  </div>
                </li>
                <li style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
                  <div>
                    <p className="feature-list__body" style={{ margin: 0 }}>
                      <b>Meanwhile</b> Contact the PI before submitting a paper, and use the
                      citation and acknowledgment given in the call.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Writing" title="Guidelines" alt>
        {/* In the order a proposal gets written: the two choices that decide
            the shape of a program, then the checks that depend on them — the
            exposure and overhead a mode costs — and only then the technical
            justification those checks produce the numbers for. */}
        <p className="prose">
          A request is a program type, an observation mode, a target or an area, the exposures
          that reach the signal-to-noise the science needs, and the constraints under which the
          array may take them. Positions on the survey tiling are preferred wherever the science
          allows: data taken on a tile coadd directly with the survey data already there, and
          difference against the existing reference image without a separate calibration step.
        </p>

        <div className="subsection">
          <h3>Program type</h3>
          <div className="table-wrap">
            <table className="spec-table">
              <caption>Program types</caption>
              <tbody>
                {PROGRAM_TYPES.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row" style={{ whiteSpace: 'nowrap' }}>
                      {row[0]}
                      <span className="tier-card__code" style={{ display: 'block', fontSize: '0.6875rem' }}>
                        {row[1]}
                      </span>
                    </th>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="subsection">
          <h3>Observation mode</h3>
          <p className="prose">{modeText}</p>

          <div className="modebox-grid">
            {surveys.modes.map((mode, index) => (
              <div className="modebox" key={mode.name}>
                <span className="modebox__n">{String(index + 1).padStart(2, '0')}</span>
                <h4 className="modebox__name">{mode.name}</h4>
                <span className="modebox__tag">{mode.tagline}</span>
                <p className="modebox__body">{mode.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <ObsModes />
          </div>
        </div>

        <div className="subsection">
          <h3>Before you write</h3>
          <p className="prose">
            Four things are worth settling first, because each of them can make a program unnecessary 
            or unworkable, and all four can be checked from this site.
          </p>
          <ul className="feature-list" style={{ marginTop: '1.5rem' }}>
            <li>
              <span className="feature-list__key">01</span>
              <div>
                <h4 className="feature-list__title" style={{ fontSize: '1rem' }}>
                Check the target is observable
                </h4>
                <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                  Visibility from El Sauce in the intended window, and the filter response over 
                  the wavelengths that matter, can both be computed with <Link to="/users/software">supy</Link>, or with the 7DT{' '}
                  <Link to="/visibility">Visibility Tool</Link>
                </p>
              </div>
            </li>
            <li>
              <span className="feature-list__key">02</span>
              <div>
                <h4 className="feature-list__title" style={{ fontSize: '1rem' }}>
                  Check what already exists
                </h4>
                <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                  Much of the southern sky already has a medium-band reference image, and the 
                  tile under your position may already carry the bands you need. The{' '}
                  <Link to="/users/access">data access page</Link> reports the bands and frame
                  counts held for any position, and the 7DT{' '}
                  <Link to="/tile">Tile Matcher</Link> shows which survey tile covers it.
                </p>
              </div>
            </li>
            <li>
              <span className="feature-list__key">03</span>
              <div>
                <h4 className="feature-list__title" style={{ fontSize: '1rem' }}>
                  Estimate depth from measurements, not aperture
                </h4>
                <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                  The measured <Link to="/users/performance">limiting magnitudes</Link> per band, for the fiducial 100-second exposure, 
                  are what a coadded depth should be scaled from. The 7DT <Link to="/exptime">Exposure Time Calculator</Link>{' '}
                  uses these same measurements to compute the exposure needed for a target SNR, or 
                  the SNR for a given exposure.
                </p>
              </div>
            </li>
            <li>
              <span className="feature-list__key">04</span>
              <div>
                <h4 className="feature-list__title" style={{ fontSize: '1rem' }}>
                  Calculate the total observing time
                </h4>
                <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                  Once the exposure time per filter is set, the 7DT <Link to="/overhead">Overhead Calculator</Link>{' '}
                  adds the per-frame and per-target overheads, such as filter exchange, autofocus, slewing, 
                  setup, and readout, to give the total requested hours.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="subsection">
          <h3>Technical justification</h3>
          <div className="table-wrap">
            <table className="spec-table">
              <caption>Fields of the Phase 1 form</caption>
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">What to give</th>
                </tr>
              </thead>
              <tbody>
                {REQUEST_PARAMETERS.map((row) => (
                  <tr key={row.field}>
                    <th scope="row">{row.field}</th>
                    <td>{row.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="prose" style={{ marginTop: '2rem' }}>
            Two limits shape the exposure time before the science does. A single frame should be at
            least 100 seconds, which is what it takes to reach background-limited conditions, and
            no more than 180, beyond which tracking accuracy starts to elongate the PSF. Depth
            comes from taking frames in series, not from lengthening one. Bright targets can use
            shorter frames at the cost of more overhead, and any frame time other than 100 seconds
            adds overhead for its own calibration frames. Survey observations use 100 seconds as
            standard.
          </p>
          <p className="footnote" style={{ marginTop: '1.25rem' }}>
            Of the observing conditions, only Moon phase can be requested — seeing and cloud cover
            cannot be specified, though observations are made under nominal conditions wherever
            possible. A unit may also be out of service on the night, in which case the delivered
            data lack whatever that telescope was carrying.
          </p>
        </div>

        {/* <div className="btn-row" style={{ marginTop: '2.5rem' }}>
          <Link className="btn btn--primary" to="/users/call">
            Submitting — dates, documents and address
          </Link>
        </div> */}
      </Section>

    </PageLayout>
  );
};

export default Index;
