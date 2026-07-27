import React, { useMemo, useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Pagination } from 'flowbite-react';

import { PageLayout, PageHero, Section } from '../components/site';
import news from './content/news.json';

export const meta: MetaFunction = () => [
  { title: 'News · 7-Dimensional Telescope' },
  { name: 'description', content: 'Updates, publications, meetings and press from the 7DT project.' },
];

const TYPES = ['press', 'publication', 'meeting', 'update'] as const;
const PER_PAGE = 6;

const tagClass = (type: string) =>
  type === 'meeting'
    ? 'tag-news'
    : type === 'publication'
    ? 'tag-publication'
    : type === 'press'
    ? 'tag-press'
    : 'tag-update';

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([...TYPES]);

  const toggle = (type: string) => {
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const items = news.news as any[];

  const filtered = useMemo(
    () => items.filter((item) => selected.includes(item.type)),
    [items, selected]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <PageLayout menu="manuNews">
      <PageHero
        eyebrow="News"
        title="Latest from 7DT"
        lede="Survey milestones, instrument changes, publications and meetings."
        image="/img/hero/news.jpg"
      />

      <Section eyebrow="Updates" title="A bunch of intriguing updates">
        <div className="toolbar">
          <div className="toolbar__group">
            <span className="toolbar__label">Filter</span>
            {TYPES.map((type) => (
              <label className="checkbox" key={type} htmlFor={`filter-${type}`}>
                <input
                  id={`filter-${type}`}
                  type="checkbox"
                  checked={selected.includes(type)}
                  onChange={() => toggle(type)}
                />
                <span style={{ textTransform: 'capitalize' }}>{type}</span>
              </label>
            ))}
          </div>
          <span className="toolbar__label" role="status" aria-live="polite">
            {filtered.length} item{filtered.length === 1 ? '' : 's'}
          </span>
        </div>

        {filtered.length === 0 && (
          <p className="note" style={{ padding: '2rem 0' }}>
            No items match the selected categories. Tick a category above to see updates.
          </p>
        )}

        <div className="news-list">
          {shown.map((item, index) => (
            <article className="news" key={`${item.title}-${index}`}>
              <div className="news-content">
                <div className="news-img-container">
                  <img src={`/img/news/${item.imgName}`} alt="" loading="lazy" width={640} height={480} />
                </div>
                <div className="news-info">
                  <div className="news-about">
                    <span className={`news-tag ${tagClass(item.type)}`}>{item.type}</span>
                    <span className="news-time">{item.date}</span>
                  </div>
                  <h2 className="news-title">{item.title}</h2>
                  <div className="news-creator">
                    {item.type === 'meeting'
                      ? item.place
                      : item.type === 'publication'
                      ? item.shortAuthor
                      : item.source}
                  </div>
                  {item.content && (
                    <p className="feature-list__body" style={{ marginTop: '0.75rem', maxWidth: '64ch' }}>
                      {item.content}
                    </p>
                  )}
                  {item.webpage && (
                    <a
                      className="details-button"
                      href={item.webpage}
                      target={item.webpage.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                    >
                      Details →
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

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
