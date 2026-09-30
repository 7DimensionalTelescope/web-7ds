import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, ButtonRow } from '../components/site';
import { Md, Paras, SmartLink } from '../components/md';
import { fill, metaOf } from '../lib/page';
import call from '../content/data/call.json';
import page from '../content/pages/users/call.json';

export const meta: MetaFunction = () => metaOf(page);

/* ---------------------------------------------------------------------------
   The current call, and nothing else.

   Dates, files and status come from content/data/call.yaml, which the
   site-wide bar reads as well, so a call opening or closing is one edit. The
   rules — who may apply, how the two pools are counted, how proposals are
   reviewed — are not restated here: they are in the Call for Proposals
   document, which is the version of record and the one that changes between
   calls. This page exists to hand a proposer the dates and the files without
   making them read a document to find out when things are due.

   How to write the proposal is on /users/propose; that page outlives any one
   call and is where the guidance belongs.
--------------------------------------------------------------------------- */

const md = (text: string) => fill(text, { call });

const Index = () => {
  const { hero, open, closed } = page;
  const [day, month] = call.deadline.split(' ');
  return (
    <PageLayout menu="manuUsers">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lede={call.active ? md(hero.ledeOpen) : hero.ledeClosed}
        image={hero.image}
        meta={call.active ? [{ value: day, unit: month, label: hero.deadlineLabel }, ...hero.meta] : undefined}
      />

      {call.active ? (
        <>
          <Section eyebrow={open.documents.eyebrow} title={open.documents.title}>
            <p className="prose">
              <Md>{md(open.documents.body)}</Md>
            </p>
            <ul className="feature-list" style={{ marginTop: '2rem' }}>
              {call.files.map((file, index) => (
                <li key={file.href}>
                  <span className="feature-list__key">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="feature-list__title" style={{ fontSize: '1.0625rem' }}>
                      <SmartLink href={file.href}>{file.name}</SmartLink>{' '}
                      <span className="tag-docx">{open.documents.tag}</span>
                    </h3>
                    <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                      <Md>{file.note}</Md>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section eyebrow={open.schedule.eyebrow} title={open.schedule.title} alt>
            <div className="table-wrap">
              <table className="spec-table">
                <caption>{open.schedule.caption}</caption>
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
              <Md>{md(open.schedule.footnote)}</Md>
            </p>
          </Section>

          <Section eyebrow={open.time.eyebrow} title={open.time.title}>
            <Paras className="prose">{open.time.body.map(md)}</Paras>
            <ButtonRow buttons={open.time.buttons} style={{ marginTop: '2rem' }} />
          </Section>

          <Section eyebrow={open.submit.eyebrow} title={open.submit.title}>
            <div className="panel" style={{ maxWidth: '68ch' }}>
              <div className="panel__title">{md(open.submit.panelTitle)}</div>
              <p className="feature-list__body" style={{ marginBottom: '1rem' }}>
                <Md>{md(open.submit.body)}</Md>
              </p>
              <SmartLink className="btn btn--primary" href={md(open.submit.button.href)}>
                {open.submit.button.label}
              </SmartLink>
            </div>
          </Section>

          <Section eyebrow={open.questions.eyebrow} title={open.questions.title} alt>
            <p className="prose">
              <Md>{md(open.questions.body)}</Md>
            </p>
          </Section>
        </>
      ) : (
        <Section eyebrow={closed.eyebrow} title={closed.title}>
          <div className="panel" style={{ maxWidth: '68ch' }}>
            <div className="panel__title">{closed.panelTitle}</div>
            <p className="feature-list__body" style={{ marginBottom: '1rem' }}>
              <Md>{closed.body}</Md>
            </p>
          </div>
        </Section>
      )}
    </PageLayout>
  );
};

export default Index;
