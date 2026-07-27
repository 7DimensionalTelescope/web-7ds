import React from 'react';
import type { MetaFunction } from '@remix-run/node';

import { PageLayout, PageHero, Section } from '../components/site';
import members from './content/team.json';
import collabs from './content/collabs.json';

export const meta: MetaFunction = () => [
  { title: 'Team · 7-Dimensional Telescope' },
  {
    name: 'description',
    content: 'The people who build, operate and analyse 7DT and the 7-Dimensional Sky Survey.',
  },
];

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
  return (
    <PageLayout menu="manuAbout">
      <PageHero
        eyebrow="About"
        title="The team"
        lede="7DT is designed, built and operated by the Center for the Gravitational-wave Universe at Seoul National University, with collaborators across Korea and abroad."
        image="/img/hero/team.jpg"
        meta={[
          { value: String(members.members.length), label: 'Core team' },
          { value: String(collabs.collabs.length), label: 'Collaborators' },
          { value: 'SNU', label: 'Host institution' },
        ]}
      />

      <Section eyebrow="Core team" title="Who does what">
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
                    <a href={member.webpage} title="Homepage" target="_blank" rel="noreferrer">
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

      <Section eyebrow="Collaboration" title="Collaborators" alt wide>
        <p className="lede">
          Members of the 7DT collaboration contributing to the instrument, operations, pipeline
          and science working groups.
        </p>
        <div className="table-wrap">
          <table className="tier-table">
            <caption>7DT collaboration — {collabs.collabs.length} members</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Affiliation</th>
                <th scope="col">Working group</th>
                <th scope="col">Contact</th>
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
          To join a working group or propose a collaboration, contact the principal investigator
          at <a href="mailto:mim@astro.snu.ac.kr">mim@astro.snu.ac.kr</a>.
        </p>
      </Section>
    </PageLayout>
  );
};

export default Index;
