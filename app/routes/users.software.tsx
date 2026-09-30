import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, ButtonRow } from '../components/site';
import { Md, Paras } from '../components/md';
import { metaOf } from '../lib/page';
import page from '../content/pages/users/software.json';

export const meta: MetaFunction = () => metaOf(page);

/* Two audiences, kept apart deliberately: supy is what an external user
   installs, the operational systems are what produced the data they are
   looking at. Mixing them made the previous page hard to act on. */

const Index = () => {
  const { hero, packages, supy, py7dt } = page;
  return (
    <PageLayout menu="manuUsers">
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} image={hero.image} />

      {/* Three packages carry almost everything a user touches. Naming them
          together at the top saves a reader working out which of the systems
          further down they are supposed to install. */}
      <Section eyebrow={packages.eyebrow} title={packages.title}>
        <div className="table-wrap">
          <table className="spec-table">
            <caption>{packages.caption}</caption>
            <thead>
              <tr>
                {packages.columns.map((col) => (
                  <th key={col} scope="col">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packages.rows.map((row) => (
                <tr key={row.name}>
                  <th scope="row">
                    <Md>{row.name}</Md>
                  </th>
                  <td>
                    <Md>{row.what}</Md>
                  </td>
                  <td>
                    <Md>{row.who}</Md>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id={supy.id} eyebrow={supy.eyebrow} title={supy.title}>
        <div className="split split--wide-text">
          <div>
            <Paras className="prose">{supy.body}</Paras>
            <div className="panel panel--alt" style={{ marginTop: '1.5rem' }}>
              <div className="panel__title">{supy.install.title}</div>
              <pre
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  lineHeight: 1.7,
                  overflowX: 'auto',
                }}
              >
                <code>{supy.install.lines.join('\n')}</code>
              </pre>
            </div>
            <ButtonRow buttons={supy.buttons} style={{ marginTop: '1.25rem' }} />
          </div>
          <div className="table-wrap">
            <table className="spec-table">
              <caption>{supy.modules.caption}</caption>
              <tbody>
                {supy.modules.rows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row" style={{ fontFamily: 'var(--font-mono)' }}>
                      {row[0]}
                    </th>
                    <td>
                      <Md>{row[1]}</Md>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section id={py7dt.id} eyebrow={py7dt.eyebrow} title={py7dt.title} alt>
        <p className="prose">
          <Md>{py7dt.body}</Md>
        </p>
        <Paras className="note" style={{ marginTop: '1rem' }}>
          {py7dt.notes}
        </Paras>
      </Section>
    </PageLayout>
  );
};

export default Index;
