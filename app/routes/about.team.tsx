import React from 'react';
import type { MetaFunction } from '@remix-run/node';

import { PageLayout, PageHero, Section } from '../components/site';
import members from '../content/data/team.json';
import collabs from '../content/data/collabs.json';
import { Md } from '../components/md';
import { fill, metaOf } from '../lib/page';
import content from '../content/pages/about/team.json';

export const meta: MetaFunction = () => metaOf(content);

/* Rendered as a plain table rather than a data grid: the grid shipped ~575 KB
   of JavaScript and emitted nothing at all during server rendering, so the
   roster was invisible to crawlers and to anyone without JS. */

const initials = (name: string) =>
  name
    .replace(/^(Prof\.|Dr\.)\s+/, '')
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

const Index = () => {
  const { hero, core, collaboration } = content;
  return (
    <PageLayout menu="manuAbout">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        lede={hero.lede}
        image={hero.image}
        meta={[{ value: String(members.members.length), label: hero.countLabel }, ...hero.meta]}
      />

      <Section eyebrow={core.eyebrow} title={core.title}>
        <div className="people-grid">
          {members.members.map((member) => (
            <div className="person" key={member.name}>
              <div
                className="person__portrait"
                style={
                  member.imgName ? { backgroundImage: `url(/img/team/${member.imgName})` } : undefined
                }
              >
                {!member.imgName && initials(member.name)}
              </div>
              <div>
                <h3 className="person__name">{member.name}</h3>
                <p className="person__role">{member.role}</p>
                <p className="person__meta">
                  {member.title && (
                    <>
                      {member.title}
                      <br />
                    </>
                  )}
                  {member.affiliation}
                </p>
                <div className="person__links">
                  {member.webpage && (
                    <a href={member.webpage} title={core.homepage} target="_blank" rel="noreferrer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6 2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2 6-6Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} title={member.email}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        aria-hidden="true"
                      >
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow={collaboration.eyebrow} title={collaboration.title} alt wide>
        <p className="lede">
          <Md>{collaboration.lede}</Md>
        </p>
        <div className="table-wrap">
          <table className="tier-table">
            <caption>{fill(collaboration.caption, { count: collabs.collabs.length })}</caption>
            <thead>
              <tr>
                {collaboration.columns.map((col) => (
                  <th key={col} scope="col">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {collabs.collabs.map((person) => (
                <tr key={person.id}>
                  <th scope="row" style={{ fontWeight: 600, color: 'var(--ink-900)' }}>
                    {person.firstName} {person.lastName}
                  </th>
                  <td style={{ fontFamily: 'var(--font-sans)' }}>{person.affiliation}</td>
                  <td style={{ fontFamily: 'var(--font-sans)' }}>{person.workingGroup}</td>
                  <td>
                    {person.email ? (
                      <a href={`mailto:${person.email}`}>{person.email}</a>
                    ) : (
                      <span style={{ color: 'var(--slate-400)' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note" style={{ marginTop: '1rem' }}>
          <Md>{collaboration.note}</Md>
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
