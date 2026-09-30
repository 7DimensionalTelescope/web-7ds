import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, ButtonRow } from '../components/site';
import { Md, Paras } from '../components/md';
import { fill, metaOf } from '../lib/page';
import surveys from '../content/data/surveys.json';
import call from '../content/data/call.json';
import page from '../content/pages/users/propose.json';
import ObsModes from '../components/obsmodes';
import type { RailItem } from '../components/pagerail';

export const meta: MetaFunction = () => metaOf(page);

type Block = { id: string; title: string; rail?: string };

const { hero, general, guidelines } = page;
const { openCall, who, time, dataRights } = general;
const { programType, observationMode, beforeYouWrite, technical } = guidelines;

/* Listed rather than discovered, so that the open call drops out of the rail
   with the block itself, and so a long heading can carry a shorter label. */
const railItem = (block: Block, level: 2 | 3): RailItem => ({
  id: block.id,
  label: block.rail ?? block.title,
  level,
});
const RAIL: RailItem[] = [
  railItem(general, 2),
  ...(call.active ? [railItem(openCall, 3)] : []),
  railItem(who, 3),
  railItem(time, 3),
  railItem(dataRights, 3),
  railItem(guidelines, 2),
  railItem(programType, 3),
  railItem(observationMode, 3),
  railItem(beforeYouWrite, 3),
  railItem(technical, 3),
];

const Index = () => {
  return (
    <PageLayout menu="manuUsers" rail={{ items: RAIL, tools: true }}>
      <PageHero eyebrow={hero.eyebrow} title={<Md>{hero.title}</Md>} lede={hero.lede} image={hero.image} />

      {/* Two headings, in the order the questions arrive: may I and on what
          terms, then how do I write it. Everything else is a titled block
          inside one of them — as nine equal sections a reader could not tell
          which headings decided their eligibility and which only described the
          mechanics. Where the proposal goes is the call's business, on
          /users/call. */}
      <Section id={general.id} eyebrow={general.eyebrow} title={general.title}>
        {call.active && (
          <div className="subsection">
            <h3 id={openCall.id}>{openCall.title}</h3>
            <p className="prose">
              <Md>{fill(openCall.body, { call })}</Md>
            </p>
            <ButtonRow buttons={openCall.buttons} style={{ marginTop: '1.5rem' }} />
          </div>
        )}

        <div className="subsection">
          <h3 id={who.id}>{who.title}</h3>
          <div className="prose">
            <Paras>{who.body}</Paras>
          </div>
        </div>

        <div className="subsection">
          <h3 id={time.id}>{time.title}</h3>
          <div className="prose">
            <Paras>{time.body}</Paras>
          </div>
        </div>

        <div className="subsection">
          <h3 id={dataRights.id}>{dataRights.title}</h3>
          <div className="split split--wide-text">
            <div className="prose">
              <Paras>{dataRights.body}</Paras>
            </div>
          </div>
        </div>
      </Section>

      <Section id={guidelines.id} eyebrow={guidelines.eyebrow} title={guidelines.title} alt>
        {/* In the order a proposal gets written: the two choices that decide
            the shape of a program, then the checks that depend on them — the
            exposure and overhead a mode costs — and only then the technical
            justification those checks produce the numbers for. */}
        <p className="prose">
          <Md>{guidelines.intro}</Md>
        </p>

        <div className="subsection">
          <h3 id={programType.id}>{programType.title}</h3>
          <div className="table-wrap">
            <table className="spec-table spec-table--key">
              <caption>{programType.caption}</caption>
              <tbody>
                {programType.types.map((row) => (
                  <tr key={row.code}>
                    <th scope="row" style={{ whiteSpace: 'nowrap' }}>
                      {row.code}
                      <span className="tier-card__code" style={{ display: 'block', fontSize: '0.6875rem' }}>
                        {row.name}
                      </span>
                    </th>
                    <td>
                      <Md>{row.body}</Md>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="subsection">
          <h3 id={observationMode.id}>{observationMode.title}</h3>
          <p className="prose">
            <Md>{observationMode.body}</Md>
          </p>

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
          <h3 id={beforeYouWrite.id}>{beforeYouWrite.title}</h3>
          <p className="prose">
            <Md>{beforeYouWrite.body}</Md>
          </p>
          <ul className="feature-list" style={{ marginTop: '1.5rem' }}>
            {beforeYouWrite.steps.map((step, index) => (
              <li key={step.title}>
                <span className="feature-list__key">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h4 className="feature-list__title" style={{ fontSize: '1rem' }}>
                    {step.title}
                  </h4>
                  <p className="feature-list__body" style={{ maxWidth: '68ch' }}>
                    <Md>{step.body}</Md>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="subsection">
          <h3 id={technical.id}>{technical.title}</h3>
          <div className="table-wrap">
            <table className="spec-table spec-table--key">
              <caption>{technical.caption}</caption>
              <thead>
                <tr>
                  {technical.columns.map((col) => (
                    <th key={col} scope="col">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {technical.fields.map((row) => (
                  <tr key={row.field}>
                    <th scope="row">{row.field}</th>
                    <td>
                      <Md>{row.what}</Md>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="prose" style={{ marginTop: '2rem' }}>
            <Md>{technical.body}</Md>
          </p>
          <p className="footnote" style={{ marginTop: '1.25rem' }}>
            <Md>{technical.footnote}</Md>
          </p>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
