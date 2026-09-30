import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import {
  PageLayout,
  PageHero,
  Section,
  SimpleTable,
  StatGrid,
  ContentFigure,
  ButtonRow,
} from '../components/site';
import { Md } from '../components/md';
import { metaOf } from '../lib/page';
import page from '../content/pages/telescope/computer.json';

export const meta: MetaFunction = () => metaOf(page);

type Block = { eyebrow: string; title: string; body: string; table: { caption: string; rows: string[][] } };

/* Text beside its table: the pattern all three hardware sections share. */
const TextAndTable = ({ block }: { block: Block }) => (
  <div className="split split--wide-text">
    <p className="prose">
      <Md>{block.body}</Md>
    </p>
    <SimpleTable caption={block.table.caption} rows={block.table.rows} />
  </div>
);

const Index = () => {
  const { hero, onsite, proton, storage, facility } = page;
  return (
    <PageLayout menu="manu7dt" rail>
      <PageHero
        eyebrow={hero.eyebrow}
        title={<Md>{hero.title}</Md>}
        lede={hero.lede}
        image={hero.image}
        meta={hero.meta}
      />

      <Section eyebrow={onsite.eyebrow} title={onsite.title}>
        <TextAndTable block={onsite} />
      </Section>

      <Section eyebrow={proton.eyebrow} title={proton.title} alt>
        <TextAndTable block={proton} />
      </Section>

      <Section eyebrow={storage.eyebrow} title={storage.title}>
        <TextAndTable block={storage} />
        <div style={{ marginTop: '2.5rem' }}>
          <StatGrid items={storage.stats} />
        </div>
      </Section>

      <Section eyebrow={facility.eyebrow} title={facility.title} alt>
        <ContentFigure fig={facility.figure} style={{ maxWidth: '760px' }} />
        <ButtonRow buttons={facility.buttons} style={{ marginTop: '2rem' }} />
      </Section>
    </PageLayout>
  );
};

export default Index;
