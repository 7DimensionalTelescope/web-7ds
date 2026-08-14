import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import QuestionForm from '../components/questionform';

export const meta: MetaFunction = () => [
  { title: 'Questions · 7DT for users' },
  {
    name: 'description',
    content:
      'Common questions about observing with 7DT and using its data: coverage, depth, filters, response time, data access and acknowledgment.',
  },
];

/* Answers are short and point at the page that holds the detail, so that a
   figure quoted here can never drift from the page that owns it. */
const GROUPS: { group: string; items: { q: string; a: React.ReactNode }[] }[] = [
  {
    group: 'Observing',
    items: [
      {
        q: 'What does 7DT do that a conventional survey telescope does not?',
        a: (
          <>
            It images through 35 medium-band filters rather than a handful of broad ones, so every
            exposure yields a low-resolution spectrum — R = 30–70 — for every source in a 1.25
            deg² field. Classification that would otherwise need follow-up spectroscopy can be done
            from the imaging itself.
          </>
        ),
      },
      {
        q: 'How quickly can the array respond to an alert?',
        a: (
          <>
            Under a minute from alert ingestion to the start of a follow-up exposure. The scheduler
            interrupts the observing plan, repoints, and returns to the queue afterwards. See{' '}
            <Link to="/users/propose">how to propose</Link>.
          </>
        ),
      },
      {
        q: 'Can I request observations?',
        a: (
          <>
            There is no general call for proposals yet; time is allocated within the collaboration
            and its partner institutions. Enquiries about observations outside the survey program
            are handled directly by the project.
          </>
        ),
      },
      {
        q: 'What depth should I expect?',
        a: (
          <>
            A single 100 s exposure reaches 19.06 mag at m400 and 19.61 mag at m475, where
            throughput peaks; Sloan g reaches 20.59 mag. Cumulative depths for each survey
            survey and the conditions these assume are on the{' '}
            <Link to="/users/performance">performance page</Link>.
          </>
        ),
      },
    ],
  },
  {
    group: 'Data',
    items: [
      {
        q: 'How do I check whether my field has been observed?',
        a: (
          <>
            Use the search on <Link to="/users/access">data access</Link>. Entering a position
            reports whether a tile there has data, how many nights and frames it carries, which
            medium bands were taken and the date range they span.
          </>
        ),
      },
      {
        q: 'Is there a public archive?',
        a: (
          <>
            Not yet. A public release is being prepared alongside the completion of the Reference
            Imaging Survey, whose first full cycle is anticipated by the end of 2027. Until then
            requests are handled by the project — see <Link to="/users/access">data access</Link>.
          </>
        ),
      },
      {
        q: 'How soon after an observation are data available?',
        a: (
          <>
            Normally the following day. Raw frames transfer from Chile overnight and a typical
            night clears the pipeline in about five hours after transfer. Target-of-opportunity
            data skip compression and the wait for sunrise, reducing latency to tens of minutes.
          </>
        ),
      },
      {
        q: 'Why are coadd pixel values in microjansky?',
        a: (
          <>
            Coadds are flux-scaled to a zero point of 23.9 AB, which puts each pixel directly in
            µJy. It suits the pixel-based analysis medium-band data invite, but it differs from the
            counts most archives deliver — see <Link to="/users/access#format">using the data</Link>.
          </>
        ),
      },
      {
        q: 'What is a tile?',
        a: (
          <>
            A fixed pointing on the survey tiling, 1.34° × 0.90°, numbered T00000 to T28519 by
            increasing declination. All three surveys and most target-of-opportunity
            pointings use the same tiling, so data taken at different times coadd without
            resampling.
          </>
        ),
      },
      {
        q: 'Are all 35 filters calibrated to the same standard?',
        a: (
          <>
            No. The original twenty medium bands are the calibrated set in operational use. The
            fifteen installed in late 2025 are being used but their spectrophotometric calibration
            is still in preparation, and their central wavelengths are not on a regular grid.
          </>
        ),
      },
    ],
  },
  {
    group: 'Software and credit',
    items: [
      {
        q: 'Is there software for planning observations or handling tiles?',
        a: (
          <>
            Yes — <code>supy</code> provides target visibility, tile lookup and matching against a
            localization region, and filter response simulation. See{' '}
            <Link to="/users/software">available software</Link>.
          </>
        ),
      },
      {
        q: 'Can I reprocess raw data myself?',
        a: (
          <>
            Yes. Py7DT can be run offline with custom configurations and resumed from any stage of
            the reduction. Images are passed as file paths with metadata in FITS headers and YAML
            files rather than wrapped in a bespoke data model, so products stay inspectable outside
            the pipeline.
          </>
        ),
      },
      {
        q: 'How should I acknowledge 7DT in a publication?',
        a: (
          <>
            Contact the principal investigator before publishing so that collaboration authorship
            and funding acknowledgments can be agreed. Current wording is on the{' '}
            <Link to="/about/funding">funding page</Link>, and{' '}
            <Link to="/users/data">how to use the data</Link> sets out the terms.
          </>
        ),
      },
    ],
  },
];

const Index = () => (
  <PageLayout menu="manuUsers">
    <PageHero
      eyebrow="For users"
      title="Questions"
      lede="Short answers, each pointing to the page that carries the detail."
      image="/img/hero/data.jpg"
    />

    {GROUPS.map((group, index) => (
      <Section key={group.group} eyebrow="FAQ" title={group.group} alt={index % 2 === 1}>
        <div className="faq">
          {group.items.map((item) => (
            <details className="faq__item" key={item.q}>
              <summary className="faq__q">{item.q}</summary>
              <div className="faq__a">
                <p className="feature-list__body" style={{ margin: 0 }}>
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </Section>
    ))}

    <Section eyebrow="Not answered" title="Ask a question">
      <p className="prose">
        Questions not covered above go to the principal investigator. If the answer would be
        useful to others it will be added to this page.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <QuestionForm />
      </div>

      <p className="footnote" style={{ marginTop: '1.5rem' }}>
        If your question is about a data request, <Link to="/users/access">data access</Link> sets
        out what to include; for an observation, see{' '}
        <Link to="/users/propose">how to propose</Link>.
      </p>
    </Section>
  </PageLayout>
);

export default Index;
