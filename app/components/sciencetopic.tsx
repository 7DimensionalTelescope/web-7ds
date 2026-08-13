import React from 'react';
import { Link } from '@remix-run/react';
import { PageLayout, PageHero, Section, Figure, NextLinks } from './site';
import science from '../routes/content/science.json';

/* ---------------------------------------------------------------------------
   One page per science theme.

   The seven themes answer the same four questions in the same order — why it
   matters, what 7DS contributes, what that looks like in the data, and what
   the program is aiming to deliver — so they are one component rather than
   seven copies. Everything that differs lives in content/science.json.

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

export function getTheme(id: string): Theme {
  const theme = themes.find((t) => t.id === id);
  if (!theme) throw new Response(`Unknown science theme: ${id}`, { status: 404 });
  return theme;
}

/** Title and description for a theme page, in the shape a MetaFunction returns. */
export function topicMeta(id: string) {
  const theme = getTheme(id);
  return [
    { title: `${theme.title} · 7DS science` },
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
        eyebrow={`Science · Theme ${theme.n}`}
        title={theme.title}
        lede={theme.question}
        image={theme.image}
      />

      <Section eyebrow="Background" title="Why it matters" alt={alt()}>
        <div className="prose">
          {(theme.detail ?? []).map((para, k) => (
            <p key={k}>{para}</p>
          ))}
        </div>
      </Section>

      <Section eyebrow="Approach" title="What 7DS contributes" alt={alt()}>
        <p className="prose">{theme.summary}</p>
      </Section>

      {figures.length > 0 && (
        <Section eyebrow="Figures" title="What it looks like" alt={alt()}>
          {figures.map((fig, k) => (
            <div key={fig.src} style={{ marginTop: k === 0 ? 0 : '2.5rem' }}>
              <Figure src={fig.src} alt={fig.alt} label={fig.label} caption={fig.caption} />
            </div>
          ))}
        </Section>
      )}

      {theme.goals && theme.goals.length > 0 && (
        <Section eyebrow="Targets" title="What the program aims to deliver" alt={alt()}>
          <ul className="prose">
            {theme.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
          <p className="prose" style={{ marginTop: '1.5rem' }}>
            These are program targets over the seven years of the survey, not results in hand.
            What has been observed so far is on the{' '}
            <Link to="/users/status">status page</Link>, and published work is listed under{' '}
            <Link to="/publication/list">publications</Link>.
          </p>
        </Section>
      )}

      <Section eyebrow="Continue" title="Other themes" alt={alt()}>
        <NextLinks
          links={[
            ...(previous ? [{ label: `← ${previous.title}`, href: `/science/${previous.id}` }] : []),
            ...(next ? [{ label: `${next.title} →`, href: `/science/${next.id}` }] : []),
            { label: 'All seven themes', href: '/science/overview' },
          ]}
        />
      </Section>
    </PageLayout>
  );
}
