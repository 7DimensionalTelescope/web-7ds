import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { PageLayout, PageHero, Section } from '../components/site';
import { Md, Paras, SmartLink } from '../components/md';
import { metaOf } from '../lib/page';
import page from '../content/pages/users/access.json';

export const meta: MetaFunction = () => metaOf(page);

/* ---------------------------------------------------------------------------
   Data access — the service, not the data.

   A query and download interface is being built and does not exist yet. The
   page says that rather than describing a process nobody can follow. What does
   work today has moved to where it belongs: coverage and the position query to
   the status page, the format specification to its own page.
--------------------------------------------------------------------------- */

const Index = () => {
  const { hero, status, query } = page;
  return (
    <PageLayout menu="manuUsers">
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lede={hero.lede} image={hero.image} />

      <Section eyebrow={status.eyebrow} title={status.title}>
        <div className="panel" style={{ maxWidth: '68ch' }}>
          <div className="panel__title">{status.panelTitle}</div>
          <Paras className="feature-list__body" style={{ marginBottom: '1rem' }}>
            {status.body}
          </Paras>
          <SmartLink className="btn btn--primary" href={status.button.href}>
            {status.button.label}
          </SmartLink>
        </div>
      </Section>

      <Section eyebrow={query.eyebrow} title={query.title} alt>
        <div className="panel" style={{ maxWidth: '68ch' }}>
          <div className="panel__title">{query.panelTitle}</div>
          <p className="feature-list__body" style={{ marginBottom: 0 }}>
            <Md>{query.body}</Md>
          </p>
        </div>
      </Section>
    </PageLayout>
  );
};

export default Index;
