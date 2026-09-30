import React from 'react';
import { PageLayout, PageHero, Section, NextLinks, ContentFigure } from './site';
import { Md, Paras } from './md';
import { fill } from '../lib/page';
import shared from '../content/shared.json';
import science from '../content/data/science.json';

/* ---------------------------------------------------------------------------
   One page per science theme.

   The seven themes answer the same four questions in the same order — why it
   matters, what 7DS contributes, what that looks like in the data, and what
   the program is aiming to deliver — so they are one component rather than
   seven copies. Everything that differs lives in content/data/science.yaml;
   the headings they share are in content/shared.yaml (sciencePage).

   Themes without a figure simply skip that section; the alternating band
   background is counted rather than hard-coded so the rhythm survives.
--------------------------------------------------------------------------- */

export type Fig = { src: string; alt: string; label?: string; caption?: string };

export type Theme = {
  id: string;
  n: string;
  title: string;
  image: string;
  metaDescription: string;
  question: string;
  summary: string;
  detail?: string[];
  goals?: string[];
  figure?: Fig;
  figure2?: Fig;
};

export const themes = science.themes as Theme[];

const T = shared.sciencePage;

export function getTheme(id: string): Theme {
  const theme = themes.find((t) => t.id === id);
  if (!theme) throw new Response(`Unknown science theme: ${id}`, { status: 404 });
  return theme;
}

/** Title and description for a theme page, in the shape a MetaFunction returns. */
export function topicMeta(id: string) {
  const theme = getTheme(id);
  return [
    { title: `${theme.title}${T.titleSuffix}` },
    { name: 'description', content: theme.metaDescription },
  ];
}

export default function ScienceTopic({ id }: { id: string }) {
  const theme = getTheme(id);
  const index = themes.findIndex((t) => t.id === id);
  const previous = index > 0 ? themes[index - 1] : undefined;
  const next = index < themes.length - 1 ? themes[index + 1] : undefined;

  // Alternating band background, counted so a missing figure section does not
  // put two plain sections next to each other.
  let band = 0;
  const alt = () => band++ % 2 === 1;

  const figures = [theme.figure, theme.figure2].filter(Boolean) as Fig[];

  return (
    <PageLayout menu="manuScience">
      <PageHero
        eyebrow={fill(T.eyebrow, theme)}
        title={theme.title}
        lede={theme.question}
        image={theme.image}
      />

      <Section eyebrow={T.background.eyebrow} title={T.background.title} alt={alt()}>
        <div className="prose">
          <Paras>{theme.detail ?? []}</Paras>
        </div>
      </Section>

      <Section eyebrow={T.approach.eyebrow} title={T.approach.title} alt={alt()}>
        <p className="prose">
          <Md>{theme.summary}</Md>
        </p>
      </Section>

      {figures.length > 0 && (
        <Section eyebrow={T.figures.eyebrow} title={T.figures.title} alt={alt()}>
          {figures.map((fig, k) => (
            <div key={fig.src} style={{ marginTop: k === 0 ? 0 : '2.5rem' }}>
              <ContentFigure fig={fig} />
            </div>
          ))}
        </Section>
      )}

      {theme.goals && theme.goals.length > 0 && (
        <Section eyebrow={T.targets.eyebrow} title={T.targets.title} alt={alt()}>
          <ul className="prose">
            {theme.goals.map((goal) => (
              <li key={goal}>
                <Md>{goal}</Md>
              </li>
            ))}
          </ul>
          <p className="prose" style={{ marginTop: '1.5rem' }}>
            <Md>{T.targets.note}</Md>
          </p>
        </Section>
      )}

      <Section eyebrow={T.continue.eyebrow} title={T.continue.title} alt={alt()}>
        <NextLinks
          links={[
            ...(previous ? [{ label: fill(T.continue.previous, previous), href: `/science/${previous.id}` }] : []),
            ...(next ? [{ label: fill(T.continue.next, next), href: `/science/${next.id}` }] : []),
            T.continue.all,
          ]}
        />
      </Section>
    </PageLayout>
  );
}
