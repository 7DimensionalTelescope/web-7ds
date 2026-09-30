import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section, SpecTable, NextLinks, ContentFigure } from '../components/site';
import { Md, Paras } from '../components/md';
import { metaOf } from '../lib/page';
import specs from '../content/data/specs.json';
import page from '../content/pages/telescope/overview.json';

export const meta: MetaFunction = () => metaOf(page);

const Index = () => {
  const { hero, hardware, design, specs: summary } = page;
  return (
    <PageLayout menu="manu7dt">
      <PageHero
        eyebrow={hero.eyebrow}
        title={<Md>{hero.title}</Md>}
        lede={hero.lede}
        image={hero.image}
        meta={hero.meta}
      />

      <Section eyebrow={hardware.eyebrow} title={hardware.title}>
        <div className="split split--wide-text">
          <div>
            <p className="prose">
              <Md>{hardware.body}</Md>
            </p>
            <div className="table-wrap" style={{ marginTop: '1.5rem' }}>
              <table className="spec-table">
                <caption>{hardware.table.caption}</caption>
                <tbody>
                  {hardware.table.rows.map((row) => (
                    <tr key={row[0]}>
                      <th scope="row">{row[0]}</th>
                      <td>
                        <Md>{row[1]}</Md>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="note" style={{ marginTop: '1rem' }}>
              <Md>{hardware.note}</Md>
            </p>
          </div>
          <ContentFigure fig={hardware.figure} />
        </div>
      </Section>

      <Section eyebrow={design.eyebrow} title={design.title} alt>
        <div className="split split--wide-text">
          <div>
            <Paras className="prose">{design.body}</Paras>
          </div>
          <ContentFigure fig={design.figure} />
        </div>
      </Section>

      <Section eyebrow={summary.eyebrow} title={summary.title}>
        <SpecTable caption={summary.caption} groups={specs.groups} />
        <div style={{ marginTop: '2.5rem' }}>
          <NextLinks title={summary.next.title} links={summary.next.links} />
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
