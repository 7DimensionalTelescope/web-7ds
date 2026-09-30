import React from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import {
  PageLayout,
  PageHero,
  Section,
  StatGrid,
  SimpleTable,
  ContentFigure,
  ButtonRow,
} from '../components/site';
import { Md } from '../components/md';
import { metaOf } from '../lib/page';
import specs from '../content/data/specs.json';
import surveys from '../content/data/surveys.json';
import shared from '../content/shared.json';
import page from '../content/pages/users/performance.json';

export const meta: MetaFunction = () => metaOf(page);

/* ---------------------------------------------------------------------------
   The one page to read before planning an observation.

   What the array delivers, as measured in routine operation: which bands exist
   and what reaches the detector through them, how sharp the images are, how
   well they are calibrated, and how deep 100 seconds goes. Those answers were
   spread across the instrument, status and old performance pages, so getting
   them took four visits.

   Every figure is read from the same content files those pages read, so there
   is still one source for each number and they cannot drift apart.
--------------------------------------------------------------------------- */

/* A cell written {spec:LABEL} is filled from specs.json rather than retyped:
   this page renders that same file as a StatGrid a few lines below, and two
   copies of one number on one page will disagree eventually. */
const fillSpecs = (rows: string[][]) =>
  rows.map((row) =>
    row.map((cell) =>
      cell.replace(/\{spec:([^}]+)\}/g, (_, label: string) => {
        const it = specs.performance.find((r) => r.label === label);
        return it ? `${it.value}${it.unit ?? ''}` : '—';
      })
    )
  );

const Index = () => {
  const { hero, filters, psf, photometry, depth, surveys: reach, next } = page;
  return (
    <PageLayout menu="manuUsers" rail>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lede={hero.lede}
        image={hero.image}
        meta={hero.meta}
      />

      <Section eyebrow={filters.eyebrow} title={filters.title} wide>
        <div className="prose" style={{ maxWidth: '68ch' }}>
          <p>
            <Md>{shared.filterSet.body}</Md>
          </p>
          <p>
            <Md>{shared.filterSet.caveat}</Md>
          </p>
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <ContentFigure fig={filters.figure} />
        </div>

        <p className="footnote" style={{ marginTop: '1.5rem' }}>
          <Md>{filters.footnote}</Md>
        </p>
      </Section>

      <Section eyebrow={psf.eyebrow} title={psf.title} alt>
        <div className="split split--wide-text">
          <div>
            <p className="prose">
              <Md>{psf.body}</Md>
            </p>
            <p className="footnote" style={{ marginTop: '1rem' }}>
              <Md>{psf.footnote}</Md>
            </p>
          </div>
          <SimpleTable caption={psf.table.caption} rows={fillSpecs(psf.table.rows)} />
        </div>

        {psf.figures.map((fig) => (
          <div key={fig.src} style={{ marginTop: '2.5rem' }}>
            <ContentFigure fig={fig} />
          </div>
        ))}

        <div style={{ marginTop: '2rem' }}>
          <StatGrid items={specs.performance} />
        </div>
      </Section>

      <Section eyebrow={photometry.eyebrow} title={photometry.title}>
        <div className="split split--wide-text">
          <p className="prose">
            <Md>{photometry.body}</Md>
          </p>
          <SimpleTable caption={photometry.table.caption} rows={fillSpecs(photometry.table.rows)} />
        </div>
        <div style={{ marginTop: '2.5rem' }}>
          <ContentFigure fig={photometry.figure} />
        </div>

        <p className="footnote" style={{ marginTop: '1.5rem' }}>
          <Md>{photometry.footnote}</Md>
        </p>
      </Section>

      <Section eyebrow={depth.eyebrow} title={depth.title} alt>
        <p className="prose">
          <Md>{depth.body}</Md>
        </p>

        <div className="split split--wide-text" style={{ marginTop: '2rem' }}>
          <SimpleTable caption={specs.depths.caption} rows={specs.depths.rows} />
          <div>
            {depth.notes.map((note, k) => (
              <p key={k} className="footnote" style={k ? { marginTop: '1rem' } : undefined}>
                <Md>{note}</Md>
              </p>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <ContentFigure fig={depth.figure} />
        </div>
      </Section>

      <Section eyebrow={reach.eyebrow} title={reach.title}>
        <p className="prose">
          <Md>{reach.body}</Md>
        </p>

        <div className="table-wrap" style={{ marginTop: '2rem' }}>
          <table className="spec-table">
            <caption>{reach.table.caption}</caption>
            <thead>
              <tr>
                {reach.table.columns.map((col) => (
                  <th key={col} scope="col">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {surveys.tiers.map((tier) => (
                <tr key={tier.code}>
                  <th scope="row">
                    <Link to={`/survey/${tier.code.toLowerCase()}`}>{tier.code}</Link>
                  </th>
                  <td>{tier.area}</td>
                  <td>{tier.cadence}</td>
                  <td>{tier.depth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="footnote" style={{ marginTop: '1.5rem' }}>
          <Md>{reach.footnote}</Md>
        </p>
      </Section>

      <Section eyebrow={next.eyebrow} title={next.title} alt>
        <p className="prose">
          <Md>{next.body}</Md>
        </p>
        <ButtonRow buttons={next.buttons} style={{ marginTop: '1.5rem' }} />
      </Section>
    </PageLayout>
  );
};

export default Index;
