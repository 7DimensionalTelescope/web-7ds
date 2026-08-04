import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from '@remix-run/react';
import type { TileMap } from '../lib/portal.server';
import { LiveBadge } from '../components/site';
import SkyMap from '../components/skymap';
import news from './content/news.json';
import surveys from './content/surveys.json';
import science from './content/science.json';
import { mainText1, mainText2, mainText3, mainText4 } from './content/text';
import FooterBar from './footer';

/* Which snap sections carry a dark background — the dot navigation and the
   scroll cue invert against it. The last entry is the footer. */
const SECTION_IS_DARK = [true, false, true, false, true, false, true];
const SECTION_COUNT = SECTION_IS_DARK.length;
const SECTION_NAMES = [
  'Introduction',
  'About 7DT',
  'Science',
  'Sky survey',
  'Telescope',
  'News',
  'Contact and partners',
];

/* The snap sections are static markup. They are deliberately kept out of any
   component that holds scroll state: when `current` lived here, changing
   section re-rendered all seven sections, their images and the footer at the
   exact moment of the transition, which showed up as a flash. All scroll state
   now lives in <ScrollChrome/>, which renders only the dots and buttons. */

function ScrollChrome() {
  const [current, setCurrent] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const wrapperRef = useRef<HTMLElement | null>(null);
  const frame = useRef(0);

  const scrollToSection = useCallback((index: number) => {
    const target = sectionsRef.current[index];
    if (!target) return;
    // An explicit `behavior: smooth` overrides the CSS reduced-motion rule,
    // so the preference has to be checked here too.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }, []);

  useEffect(() => {
    const wrapper = document.querySelector<HTMLElement>('.fullpage-wrapper');
    if (!wrapper) return undefined;
    wrapperRef.current = wrapper;

    sectionsRef.current = Array.from(
      wrapper.querySelectorAll<HTMLElement>('.fullpage-section')
    );

    document.body.classList.add('fullpage-active');
    document.documentElement.classList.add('fullpage-active');
    // Only opt into the reveal transition once the script is live, so the
    // copy is readable if it never is.
    document.documentElement.classList.add('reveal-ready');

    const progressBar = document.querySelector<HTMLElement>('.fullpage-progress');
    const nav = document.querySelector<HTMLElement>('.fullpage-nav');

    const measure = () => {
      frame.current = 0;

      const scrollTop = wrapper.scrollTop;
      const viewport = wrapper.clientHeight;
      // Sections are min-height:100vh, so any that overflows breaks a
      // scrollTop/viewport estimate. Measure where they actually are.
      const midpoint = viewport * 0.5;
      let index = 0;
      sectionsRef.current.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= midpoint && rect.bottom > midpoint) index = i;
      });

      setCurrent(index);
      setShowTop(scrollTop > viewport * 0.75);

      if (progressBar) {
        const span = wrapper.scrollHeight - viewport;
        progressBar.style.width = `${span > 0 ? (scrollTop / span) * 100 : 0}%`;
      }
      // Driven through the DOM rather than React so that scrolling over a
      // light section never re-renders anything.
      if (nav) nav.classList.toggle('fullpage-nav--on-light', !SECTION_IS_DARK[index]);

      // `has-revealed` is deliberately never removed: if the reveal were tied
      // to `is-active` alone, content would fade back out whenever the index
      // flipped while a snap was settling, which reads as flickering.
      sectionsRef.current.forEach((section, i) => {
        section.classList.toggle('is-active', i === index);
        if (i === index) section.classList.add('has-revealed');
      });
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(measure);
    };

    measure();
    wrapper.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (frame.current) window.cancelAnimationFrame(frame.current);
      wrapper.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.body.classList.remove('fullpage-active');
      document.documentElement.classList.remove('fullpage-active');
      document.documentElement.classList.remove('reveal-ready');
    };
  }, []);

  // Keyboard paging
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

      const target = e.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable]')) return;

      const keys = ['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp', 'Home', 'End'];
      if (!keys.includes(e.key)) return;

      // If this section is taller than the viewport, let the browser scroll it
      // normally — paging past it would make the overflow unreachable.
      const wrapper = wrapperRef.current;
      const section = sectionsRef.current[current];
      if (
        wrapper &&
        section &&
        section.getBoundingClientRect().height > wrapper.clientHeight + 2 &&
        (e.key === 'ArrowDown' || e.key === 'ArrowUp')
      ) {
        return;
      }

      e.preventDefault();

      if (e.key === 'ArrowDown' || e.key === 'PageDown') scrollToSection(Math.min(current + 1, SECTION_COUNT - 1));
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') scrollToSection(Math.max(current - 1, 0));
      else if (e.key === 'Home') scrollToSection(0);
      else scrollToSection(SECTION_COUNT - 1);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, scrollToSection]);

  return (
    <>
      <div className="fullpage-progress" />

      <div className="fullpage-nav">
        {Array.from({ length: SECTION_COUNT }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`fullpage-dot${current === index ? ' active' : ''}`}
            onClick={() => scrollToSection(index)}
            aria-label={SECTION_NAMES[index]}
            aria-current={current === index}
          />
        ))}
      </div>

      <button
        type="button"
        className={`scroll-to-top${showTop ? ' visible' : ''}`}
        onClick={() => scrollToSection(0)}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}

type MainProps = {
  tiles: TileMap | null;
  tilesLive: boolean;
  generatedAt: string;
  telescopes: { total: number; online: number } | null;
  risCoverage: number | null;
};

const MainPage = ({ tiles, tilesLive, generatedAt, telescopes, risCoverage }: MainProps) => {
  const latest = (news.news as any[]).filter((item) => item.type !== 'update').slice(0, 3);

  return (
    <div className="fullpage-container">
      <ScrollChrome />

      <div className="fullpage-wrapper">
        {/* 01 — Hero ------------------------------------------------------ */}
        <section
          className="fullpage-section fullpage-section--dark fullpage-hero"
          style={{ backgroundImage: "url('/img/hero/home.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="container container--wide">
            <div className="reveal">
              <p className="fullpage-hero__eyebrow">
                Center for the Gravitational-wave Universe · Seoul National University
              </p>
              <h1>7-Dimensional Sky Survey</h1>
              <p className="fullpage-hero__lede">
                A medium-band survey of the southern sky, measuring a low-resolution spectrum for
                every source it observes and repeating the measurement over time. It is carried
                out with the 7-Dimensional Telescope, an array of twenty 50-cm telescopes in
                Chile.
              </p>
              <div className="dimension-row" style={{ marginTop: '2rem' }}>
                {surveys.dimensions.map((dim) => (
                  <span className="dimension-item" key={dim.n}>
                    <span className="dimension-item__n">{dim.n}</span>
                    {dim.label}
                  </span>
                ))}
              </div>
              
            </div>
          </div>

          <button
            type="button"
            className="scroll-cue"
            onClick={() => {
              const next = document.querySelectorAll('.fullpage-section')[1];
              next?.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'auto'
                  : 'smooth',
              });
            }}
          >
            <span>Scroll</span>
            <span className="scroll-cue__line" />
          </button>
        </section>

        {/* 02 — Introduction --------------------------------------------- */}
        <section className="fullpage-section">
          <div className="container container--wide">
            <div className="split split--wide-text split--middle reveal">
              <div>
                <span className="eyebrow">Introduction</span>
                <h2>A survey that measures spectra, not colors</h2>
                <p className="prose">{mainText1}</p>
                <p style={{ marginTop: '1.5rem' }}>
                  <Link className="link-arrow" to="/about/intro">What is 7DS</Link>
                </p>
              </div>
              <figure className="figure">
                <img
                  src="/img/NGC0253.gif"
                  alt="The Sculptor Galaxy, NGC 253, scanned through the 7DT medium-band filter set"
                  width={900}
                  height={929}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <b>NGC 253</b> The Sculptor Galaxy seen through successive medium bands from
                  400 to 875 nm — each frame a different slice of the spectrum.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 03 — Science --------------------------------------------------- */}
        <section
          className="fullpage-section fullpage-section--dark"
          style={{ backgroundImage: "url('/img/hero/science.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="container container--wide">
            <div className="split split--middle reveal">
              <div>
                <span className="eyebrow eyebrow--on-dark">Science</span>
                <h2>Broad science topics</h2>
                <p className="prose" style={{ color: 'rgba(255,255,255,.78)' }}>
                  {mainText2}
                </p>
                {/* The themes are listed rather than described: the point of this
                    section is the breadth, not any one result. */}
                <ul className="theme-chips">
                  {science.themes.map((theme) => (
                    <li key={theme.id}>
                      <Link to={`/science/sci#${theme.id}`}>{theme.title}</Link>
                    </li>
                  ))}
                </ul>
                <p style={{ marginTop: '1.5rem' }}>
                  <Link className="link-arrow" to="/science/overview" style={{ color: 'var(--accent-on-dark)' }}>Science program</Link>
                </p>
              </div>
              <div className="stat-grid stat-grid--2x2 stat-grid--on-dark">
                <div className="stat">
                  <span className="stat__value">{telescopes?.total ?? 20}</span>
                  <span className="stat__label">Telescopes in the array</span>
                  <span className="stat__note stat__note--live">
                    {telescopes ? `${telescopes.online} online` : '16 online'}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat__value">40</span>
                  <span className="stat__label">Medium-band filters</span>
                  <span className="stat__note">35 installed</span>
                </div>
                <div className="stat">
                  <span className="stat__value">30–70</span>
                  <span className="stat__label">Spectral resolution R</span>
                </div>
                <div className="stat">
                  <span className="stat__value">1.25<span className="stat__unit">deg²</span></span>
                  <span className="stat__label">Per pointing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 — Survey ---------------------------------------------------- */}
        <section className="fullpage-section section--alt">
          <div className="container container--wide">
            <div className="reveal">
              <span className="eyebrow">7-Dimensional Sky Survey</span>
              <h2>Three surveys over the southern sky</h2>
              <p className="prose" style={{ maxWidth: '62ch' }}>
                {mainText3}
              </p>

              {/* The footprint is shown here rather than described, because
                  what the three surveys divide up is exactly this sky. The
                  map is a figure, not a tool: the interactive one, with
                  per-tile detail, is on the coverage page. */}
              <div className="home-survey">
                <div className="home-survey__map">
                  {tiles && tiles.count > 0 ? (
                    <>
                      <SkyMap
                        tiles={tiles}
                        interactive={false}
                        caption={`${tiles.count.toLocaleString('en-US')} tiles observed`}
                      />
                      <div className="home-survey__meta">
                        <LiveBadge live={tilesLive} updated={generatedAt} />
                        <Link className="link-arrow" to="/users/access">
                          Explore the coverage map
                        </Link>
                      </div>
                    </>
                  ) : null}
                </div>

                <div className="home-survey__tiers">
                  {surveys.tiers.map((tier) => (
                    <Link
                      className="tier-card tier-card--link"
                      key={tier.code}
                      to={`/survey/${tier.code.toLowerCase()}`}
                    >
                      <span className="tier-card__code">{tier.code}</span>
                      <h3 className="tier-card__name">{tier.name}</h3>
                      <dl>
                        <div>
                          <dt>Area</dt>
                          <dd>{tier.area}</dd>
                        </div>
                        <div>
                          <dt>Cadence</dt>
                          <dd>{tier.cadence}</dd>
                        </div>
                      </dl>
                      <span className={`pill pill--${tier.status}`}>
                        {tier.status === 'live' && risCoverage !== null && tier.code === 'RIS'
                          ? `${risCoverage}% observed`
                          : tier.statusLabel}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 — Telescope -------------------------------------------------- */}
        <section
          className="fullpage-section fullpage-section--dark"
          style={{ backgroundImage: "url('/img/hero/survey.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="container container--wide">
            <div className="split split--middle reveal">
              <div>
                <span className="eyebrow eyebrow--on-dark">The facility</span>
                <h2>Twenty telescopes, one system</h2>
                <p className="prose" style={{ color: 'rgba(255,255,255,.78)' }}>{mainText4}</p>
                <p style={{ marginTop: '1.5rem' }}>
                  <Link className="link-arrow" to="/telescope/overview" style={{ color: 'var(--accent-on-dark)' }}>
                    Telescope &amp; site
                  </Link>
                </p>
              </div>
              <ul className="feature-list feature-list--on-dark">
                <li>
                  <span className="feature-list__key">Hardware</span>
                  <div>
                    <h3 className="feature-list__title">PlaneWave DeltaRho 500 × 20</h3>
                    <p className="feature-list__body">
                      A 508 mm corrected Cassegrain at f/3.0 on an L-500 direct-drive mount, with a
                      Moravian C3-61000 PRO CMOS camera and a nine-slot filter wheel — 1.34° × 0.90°
                      at 0.5″ per pixel, 1.25 deg² per unit.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="feature-list__key">Site</span>
                  <div>
                    <h3 className="feature-list__title">El Sauce Observatory, Chile</h3>
                    <p className="feature-list__body">
                      1.5″ median seeing, over 300 clear nights a year, next to Rubin and Gemini-South.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="feature-list__key">Operation</span>
                  <div>
                    <h3 className="feature-list__title">Robotic, unattended</h3>
                    <p className="feature-list__body">
                      RTCSpy runs the night end to end and interrupts it for an alert in under a minute.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="feature-list__key">Pipeline</span>
                  <div>
                    <h3 className="feature-list__title">Same-night reduction</h3>
                    <p className="feature-list__body">
                      Py7DT clears a 3,000-image night in about five hours on 128 cores and two A100s.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 06 — News ------------------------------------------------------- */}
        <section className="fullpage-section section--alt">
          <div className="container container--wide">
            <div className="reveal">
              <div className="section-title">
                <span className="eyebrow">Latest</span>
                <h2>News &amp; publications</h2>
              </div>

              <div className="grid grid-cols-3">
                {latest.map((item, index) => (
                  <article className="card" key={index}>
                    <img src={`/img/news/${item.imgName}`} alt="" loading="lazy" />
                    <div className="card-info">
                      <div className="card-about">
                        <span
                          className={`card-tag ${
                            item.type === 'meeting'
                              ? 'tag-news'
                              : item.type === 'publication'
                              ? 'tag-publication'
                              : item.type === 'press'
                              ? 'tag-press'
                              : 'tag-update'
                          }`}
                        >
                          {item.type}
                        </span>
                        <span className="card-time">{item.date}</span>
                      </div>
                      <h3 className="card-title">{item.title}</h3>
                      <div className="card-creator">
                        {item.type === 'meeting'
                          ? item.place
                          : item.type === 'publication'
                          ? item.shortAuthor
                          : item.source}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="btn-row" style={{ marginTop: '2rem' }}>
                <Link className="btn btn--secondary" to="/news">All news</Link>
                <Link className="btn btn--secondary" to="/publication/list">Publications</Link>
              </div>
            </div>
          </div>
        </section>

        {/* 07 — Footer -----------------------------------------------------
            Sized to its content and snapped to the bottom of the viewport. A
            fixed 100vh here left a strip of page background below the footer
            whenever the footer was shorter than the window. */}
        <div className="fullpage-section fullpage-section--footer">
          <FooterBar />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
