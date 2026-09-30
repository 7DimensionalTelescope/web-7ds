import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Section } from '../components/site';
import SurveyPage from '../components/surveypage';
import { Md, Paras } from '../components/md';
import surveys from '../content/data/surveys.json';
import { fillAll, metaOf } from '../lib/page';
import page from '../content/pages/survey/wts.json';

export const meta: MetaFunction = () => metaOf(page);

const tier = surveys.tiers.find((t) => t.code === 'WTS')!;

const Index = () => {
  const content = fillAll(page, { tier });
  const { status, science } = content;
  return (
    <SurveyPage content={content} tier={tier} live={false}>
      {/* No map and no coverage figures: the survey has not started, and an empty
          map with zeros in it would suggest that it had. */}
      <Section eyebrow={status.eyebrow} title={status.title}>
        <div className="panel" style={{ maxWidth: '68ch' }}>
          <div className="panel__title">{status.panelTitle}</div>
          <p className="feature-list__body" style={{ marginBottom: 0 }}>
            <Md>{status.body}</Md>
          </p>
        </div>
      </Section>

      <Section eyebrow={science.eyebrow} title={science.title} alt>
        <Paras className="prose">{science.body}</Paras>
      </Section>
    </SurveyPage>
  );
};

export default Index;
