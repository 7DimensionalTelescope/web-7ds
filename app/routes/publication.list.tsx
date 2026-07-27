import React, { useMemo, useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Pagination } from 'flowbite-react';

import { PageLayout, PageHero, Section } from '../components/site';
import news from './content/news.json';

export const meta: MetaFunction = () => [
  { title: 'Publications · 7-Dimensional Telescope' },
  { name: 'description', content: 'Refereed papers and conference proceedings from the 7DT collaboration.' },
];

const PER_PAGE = 6;

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAbstract, setShowAbstract] = useState(false);

  const pubs = useMemo(
    () => (news.news as any[]).filter((item) => item.type === 'publication'),
    []
  );
  const totalPages = Math.max(1, Math.ceil(pubs.length / PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const shown = pubs.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <PageLayout menu="manuPaper">
      <PageHero
        eyebrow="Publications"
        title="Papers & proceedings"
        lede="Instrument, operations and science papers from the 7DT collaboration."
        image="/img/hero/publications.jpg"
        meta={[{ value: String(pubs.length), label: 'Listed works' }]}
      />

      <div className="notice">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8h.01M11 12h1v5h1" strokeLinecap="round" />
        </svg>
        <span>
          Publishing with 7DT data? Please read the{' '}
          <a href="/publication/policy">publication policy</a> first.
        </span>
      </div>

      <Section eyebrow="Bibliography" title="Meet our work">
        <div className="toolbar">
          <span className="toolbar__label">
            {pubs.length} publications · page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="toggle-btn"
            aria-pressed={showAbstract}
            onClick={() => setShowAbstract(!showAbstract)}
          >
            {showAbstract ? 'Hide abstracts' : 'Show abstracts'}
          </button>
        </div>

        <ul className="pub-list">
          {shown.map((pub, index) => (
            <li className="pub" key={`${pub.title}-${index}`}>
              <h2 className="pub__title">
                {pub.webpage ? (
                  <a href={pub.webpage} target="_blank" rel="noreferrer">
                    {pub.title}
                  </a>
                ) : (
                  pub.title
                )}
              </h2>
              <p className="pub__authors">{pub.author}</p>
              <div className="pub__meta">
                {pub.journal && (
                  <span>
                    <b>Journal</b>
                    {pub.journal}
                  </span>
                )}
                {pub.date && (
                  <span>
                    <b>Date</b>
                    {pub.date}
                  </span>
                )}
                {pub.doi && (
                  <span>
                    <b>doi</b>
                    <a href={pub.webpage} target="_blank" rel="noreferrer">
                      {pub.doi}
                    </a>
                  </span>
                )}
                {pub.preprint && (
                  <span>
                    <b>Preprint</b>
                    <a href={pub.webpage2} target="_blank" rel="noreferrer">
                      {pub.preprint}
                    </a>
                  </span>
                )}
                {!pub.doi && !pub.preprint && pub.ref && (
                  <span>
                    <b>Ref</b>
                    {pub.ref}
                  </span>
                )}
              </div>
              {showAbstract && pub.abstract && <p className="pub__abstract">{pub.abstract}</p>}
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <div className="pagination-wrap">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </Section>
    </PageLayout>
  );
};

export default Index;
