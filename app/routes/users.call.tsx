import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import call from '../content/data/call.json';

export const meta: MetaFunction = () => [
  { title: 'Call for Proposals · 7DT for users' },
  {
    name: 'description',
    content:
      'The open call for 7DT observing time: key dates, the documents to download, and where the rules are set out.',
  },
];

/* ---------------------------------------------------------------------------
   The current call, and nothing else.

   Dates, files and status come from content/call.json, which the site-wide bar
   reads as well, so a call opening or closing is one edit. The rules — who may
   apply, how the two pools are counted, how proposals are reviewed — are not
   restated here: they are in the Call for Proposals document, which is the
   version of record and the one that changes between calls. This page exists
   to hand a proposer the dates and the files without making them read a
   document to find out when things are due.

   How to write the proposal is on /users/propose; that page outlives any one
   call and is where the guidance belongs.
--------------------------------------------------------------------------- */

const Index = () => (
  <PageLayout menu="manuUsers">
    <PageHero
      eyebrow="For users"
      title="Call for Proposals"
      lede={
        call.active
          ? `${call.title} — proposals are being accepted for observations between ${call.observingPeriod}.`
          : 'No call is open at present. This page carries the dates and documents while one is.'
      }
      image="/img/hero/telescope.jpg"
      meta={
        call.active
          ? [
              { value: call.deadline.split(' ')[0], unit: call.deadline.split(' ')[1], label: 'Phase 1 deadline' },
              { value: '400', unit: 'hr', label: 'Time available' },
              { value: '9', unit: 'mo', label: 'Observing period' },
              { value: '2', label: 'Allocation pools' },
            ]
          : undefined
      }
    />

    {call.active ? (
      <>
        <Section eyebrow="Documents" title="What to download">
          <p className="prose">
            Read the first, fill in the second, and keep the third beside you while you do. This
            page is where the call directs proposers for the current versions, so use the copies
            here rather than a forwarded attachment.
          </p>
          <ul className="feature-list" style={{ marginTop: '2rem' }}>
            {call.files.map((file, index) => (
              <li key={file.href}>
                <span className="feature-list__key">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="feature-list__title" style={{ fontSize: '1.0625rem' }}>
                    <a href={file.href} download>
                      {file.name}
                    </a>{' '}
                    <span className="tag-docx">docx</span>
                  </h3>
                  <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                    {file.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section eyebrow="Schedule" title="Key dates" alt>
          <div className="table-wrap">
            <table className="spec-table">
              <caption>Milestones of this call</caption>
              <tbody>
                {call.dates.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="footnote" style={{ marginTop: '1.25rem' }}>
            Unless stated otherwise, deadlines are {call.deadlineNote}.
          </p>
        </Section>

        <Section eyebrow="Time" title="What is being offered">
          <p className="prose">
            {call.hours}. {call.pools} A proposal is counted against one pool on the basis of the
            PI&rsquo;s affiliation alone; the Call for Proposals gives the rule in full, including
            what happens to a proposal that is not selected in the first pool it is considered in.
          </p>
          <p className="prose">{call.nextCall}</p>
          <div className="btn-row" style={{ marginTop: '2rem' }}>
            <Link className="btn btn--primary" to="/users/propose">
              How to write the proposal
            </Link>
            <Link className="btn btn--secondary" to="/users/links#calculators">
              Calculators
            </Link>
            <Link className="btn btn--secondary" to="/users/performance">
              Measured performance
            </Link>
          </div>
        </Section>

        <Section eyebrow="Submitting" title="Where to send it">
          <div className="panel" style={{ maxWidth: '68ch' }}>
            <div className="panel__title">By e-mail, before {call.deadline}</div>
            <p className="feature-list__body" style={{ marginBottom: '1rem' }}>
              Send the completed Proposal Form together with the Scientific Justification, the
              Technical Justification and any accompanying files — a target list, for example — to{' '}
              <a href={`mailto:${call.submit.email}?subject=7DT%20Phase%201%20proposal`}>
                {call.submit.email}
              </a>
              . There is no submission portal; e-mail is the route.
            </p>
            <a
              className="btn btn--primary"
              href={`mailto:${call.submit.email}?subject=7DT%20Phase%201%20proposal`}
            >
              Submit a proposal
            </a>
          </div>
        </Section>

        <Section eyebrow="Questions" title="Who to ask" alt>
          <p className="prose">
            Questions about this call, the submission process or 7DS collaboration policies go to{' '}
            {call.contact.name} at{' '}
            <a href={`mailto:${call.contact.email}?subject=7DT%20Call%20for%20Proposals`}>
              {call.contact.email}
            </a>
            .
          </p>
        </Section>
      </>
    ) : (
      <Section eyebrow="Status" title="No call is open">
        <div className="panel" style={{ maxWidth: '68ch' }}>
          <div className="panel__title">Nothing to submit at present</div>
          <p className="feature-list__body" style={{ marginBottom: '1rem' }}>
            When a call opens, its dates and documents appear here and a notice goes up across the
            site. How proposals are written does not change between calls, and is set out under{' '}
            <Link to="/users/propose">how to propose</Link>.
          </p>
        </div>
      </Section>
    )}
  </PageLayout>
);

export default Index;
