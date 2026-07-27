import React, { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Pagination } from 'flowbite-react';

import { PageLayout, PageHero, Section } from '../components/site';
import images from './content/images.json';

export const meta: MetaFunction = () => [
  { title: 'Gallery · 7-Dimensional Telescope' },
  { name: 'description', content: 'Images of the 7-Dimensional Telescope and of the sky it observes.' },
];

const PER_PAGE = 6;

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(images.length / PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const shown = images.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <PageLayout menu="manuGallery">
      <PageHero
        eyebrow="Gallery"
        title="Our Universe, seen in seven dimensions"
        lede="Pictures of the array, and of what it returns."
        image="/img/hero/gallery.jpg"
      />

      <Section eyebrow="Images" title="Gallery" wide>
        <div className="gallery">
          <ul>
            {shown.map((img) => (
              <li key={img.file}>
                <a href={`/img/images/${img.file}`} target="_blank" rel="noreferrer">
                  <figure>
                    <img
                      src={`/img/thumbs/${img.file.replace(/\.[^.]+$/, '.jpg')}`}
                      alt={img.name}
                      width={900}
                      height={675}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption>{img.name}</figcaption>
                  </figure>
                  <span className="sr-only"> (opens the full-resolution image in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
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
