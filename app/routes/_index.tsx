import React from 'react';
import NavBar from './navigate';
import MainFrame from './main';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: '7-Dimensional Telescope' },
    {
      name: 'description',
      content:
        'The 7-Dimensional Telescope: a twenty-unit medium-band array at El Sauce Observatory, Chile, and the 7-Dimensional Sky Survey of the southern sky.',
    },
  ];
};

/* The home page runs as a snap-scrolling deck; the footer is the final
   section inside MainFrame rather than a sibling of it. */
const Index: React.FC = () => {
  return (
    <div className="page">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <NavBar manu="manuHome" />
      <main id="content" style={{ height: '100%' }}>
        <MainFrame />
      </main>
    </div>
  );
};

export default Index;
