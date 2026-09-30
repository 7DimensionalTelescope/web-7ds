import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import { Md, Paras } from '../components/md';
import { metaOf } from '../lib/page';
import page from '../content/pages/about/funding.json';

export const meta: MetaFunction = () => metaOf(page);

const Logo = ({ logo }: { logo: { src: string; alt: string } }) => (
  <figure className="figure">
    <img
      src={logo.src}
      alt={logo.alt}
      style={{ padding: '2rem', background: '#fff' }}
      loading="lazy"
    />
  </figure>
);

const Index = () => {
  const { hero, host, agencies, network } = page;
  return (
    <PageLayout menu="manuAbout">
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} image={hero.image} />

      <Section eyebrow={host.eyebrow} title={host.title}>
        <div className="split split--wide-text">
          <p className="prose">
            <Md>{host.body}</Md>
          </p>
          <Logo logo={host.logo} />
        </div>
      </Section>

      <Section eyebrow={agencies.eyebrow} title={agencies.title} alt>
        <div className="split split--wide-text">
          <div>
            <Paras className="prose">{agencies.body}</Paras>
          </div>
          <Logo logo={agencies.logo} />
        </div>
      </Section>

      <Section eyebrow={network.eyebrow} title={network.title}>
        <p className="prose">
          <Md>{network.body}</Md>
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
