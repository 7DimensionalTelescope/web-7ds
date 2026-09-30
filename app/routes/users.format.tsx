import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, ButtonRow } from '../components/site';
import { Md, type CodeStyle } from '../components/md';
import { metaOf } from '../lib/page';
import format from '../content/data/dataformat.json';
import page from '../content/pages/users/format.json';

export const meta: MetaFunction = () => metaOf(page);

/* ---------------------------------------------------------------------------
   The data format specification, as published to the science working groups.

   Every row comes from content/data/dataformat.yaml, which is a transcription
   of that document — so revising the specification is a change to one file
   rather than a rewrite of this page. Nothing here is inferred from the data.
   Table cells are shown as written, not as Markdown: `*_100s.fits` is a file
   pattern, not emphasis.

   Long reference tables, and they are meant to be: this is the page a user
   keeps open beside a terminal, not one they read through.
--------------------------------------------------------------------------- */

const Mono = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>{children}</span>
);

/* Keywords in running text are set like the keyword column of the tables. */
const keyword: CodeStyle = (text, key) => <Mono key={key}>{text}</Mono>;

function KeywordTable({ caption, rows }: { caption: string; rows: string[][] }) {
  return (
    <div className="table-wrap" style={{ marginTop: '1.25rem' }}>
      <table className="spec-table">
        <caption>{caption}</caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              <th scope="row" style={{ whiteSpace: 'nowrap' }}>
                <Mono>{row[0]}</Mono>
              </th>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Index = () => {
  const { hero, products, headers, catalogs, next } = page;
  const { images, filename, conventions } = products;
  return (
    <PageLayout menu="manuUsers" rail>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} image={hero.image} meta={hero.meta} />

      <Section eyebrow={products.eyebrow} title={products.title}>
        <div className="subsection">
          <h3>{images.title}</h3>
          <p className="prose">
            <Md>{images.body}</Md>
          </p>
          <div className="table-wrap" style={{ marginTop: '1.5rem' }}>
            <table className="spec-table">
              <caption>{images.caption}</caption>
              <thead>
                <tr>
                  {images.columns.map((col) => (
                    <th key={col} scope="col">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {format.products.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>
                      <Mono>{row[1]}</Mono>
                    </td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="subsection">
          <h3>{filename.title}</h3>
          <p className="prose">
            <Md>{filename.body}</Md>
          </p>
          <p
            style={{
              marginTop: '1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9375rem',
              overflowX: 'auto',
            }}
          >
            {filename.example}
          </p>
          <div className="table-wrap" style={{ marginTop: '1.25rem' }}>
            <table className="spec-table">
              <caption>{filename.caption}</caption>
              <tbody>
                {format.basename.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row" style={{ whiteSpace: 'nowrap' }}>
                      <Mono>{row[0]}</Mono>
                    </th>
                    <td>{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="prose" style={{ marginTop: '1.5rem' }}>
            <Md>{filename.suffixBody}</Md>
          </p>
          <KeywordTable caption={filename.suffixCaption} rows={format.suffixes} />
        </div>

        <div className="subsection">
          <h3>{conventions.title}</h3>
          <KeywordTable caption={conventions.caption} rows={format.conventions} />
        </div>
      </Section>

      <Section eyebrow={headers.eyebrow} title={headers.title} alt>
        <p className="prose">
          <Md>{headers.body}</Md>
        </p>
        {format.headerGroups.map((group) => (
          <div className="subsection" key={group.title}>
            <h3>{group.title}</h3>
            <KeywordTable caption={group.title} rows={group.rows} />
          </div>
        ))}
        <p className="footnote" style={{ marginTop: '1.5rem' }}>
          <Md code={keyword}>{headers.footnote}</Md>
        </p>
      </Section>

      <Section eyebrow={catalogs.eyebrow} title={catalogs.title}>
        <div className="subsection">
          <h3>{catalogs.naming.title}</h3>
          <p className="prose">
            <Md>{catalogs.naming.body}</Md>
          </p>
          <KeywordTable caption={catalogs.naming.caption} rows={format.catalogExample} />
          <p className="footnote" style={{ marginTop: '1rem' }}>
            <Md>{catalogs.naming.footnote}</Md>
          </p>
        </div>

        {format.catalogGroups.map((group) => (
          <div className="subsection" key={group.title}>
            <h3>{group.title}</h3>
            <KeywordTable caption={group.title} rows={group.rows} />
          </div>
        ))}
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
