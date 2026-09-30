import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from '@remix-run/react';
import type { TileMap } from '../lib/portal.server';
import { LiveBadge } from '../components/site';
import SkyMap from '../components/skymap';
import news from '../content/data/news.json';
import surveys from '../content/data/surveys.json';
import science from '../content/data/science.json';
import { Md } from '../components/md';
import { fill } from '../lib/page';
import page from '../content/pages/home.json';
import FooterBar from './footer';

/* Which snap sections carry a dark background — the dot navigation and the
   scroll cue invert against it. The last entry is the footer. */
const SECTION_IS_DARK = [true, false, true, false, true, false, true];
const SECTION_COUNT = SECTION_IS_DARK.length;
const SECTION_NAMES = page.sections;

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
        aria-label={page.backToTop}
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
  /** Mean seconds per science frame, for the footprint's exposure shading. */
  exposureSec: number | null;
};

const MainPage = ({ tiles, tilesLive, generatedAt, telescopes, risCoverage, exposureSec }: MainProps) => {
  const latest = (news.news as any[]).filter((item) => item.type !== 'update').slice(0, 3);
  const { hero, intro, science: sci, survey, facility, news: latestNews } = page;
  const counts = {
    total: telescopes?.total ?? facility.offline.total,
    online: telescopes?.online ?? facility.offline.online,
  };

  return (
    <div className="fullpage-container">
      <ScrollChrome />

      <div className="fullpage-wrapper">
        {/* 01 — Hero ------------------------------------------------------ */}
        <section
          className="fullpage-section fullpage-section--dark fullpage-hero"
          style={{ backgroundImage: `url('${hero.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="container container--wide">
            <div className="reveal">
              <p className="fullpage-hero__eyebrow">{hero.eyebrow}</p>
              <h1>
                <Md>{hero.title}</Md>
              </h1>
              <p className="fullpage-hero__lede">
                <Md>{hero.lede}</Md>
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
            <span>{hero.scroll}</span>
            <span className="scroll-cue__line" />
          </button>
        </section>

        {/* 02 — Introduction --------------------------------------------- */}
        <section className="fullpage-section">
          <div className="container container--wide">
            <div className="split split--wide-text split--middle reveal">
              <div>
                <span className="eyebrow">{intro.eyebrow}</span>
                <h2>{intro.title}</h2>
                <p className="prose">
                  <Md>{intro.body}</Md>
                </p>
                <p style={{ marginTop: '1.5rem' }}>
                  <Link className="link-arrow" to={intro.link.href}>
                    {intro.link.label}
                  </Link>
                </p>
              </div>
              <figure className="figure">
                <img
                  src={intro.figure.src}
                  alt={intro.figure.alt}
                  width={900}
                  height={929}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <Md>{intro.figure.caption}</Md>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 03 — Science --------------------------------------------------- */}
        <section
          className="fullpage-section fullpage-section--dark"
          style={{ backgroundImage: `url('${sci.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="container container--wide">
            <div className="split split--middle reveal">
              <div>
                <span className="eyebrow eyebrow--on-dark">{sci.eyebrow}</span>
                <h2>{sci.title}</h2>
                <p className="prose" style={{ color: 'rgba(255,255,255,.78)' }}>
                  <Md>{sci.body}</Md>
                </p>
                <p style={{ marginTop: '1.5rem' }}>
                  <Link className="link-arrow" to={sci.link.href} style={{ color: 'var(--accent-on-dark)' }}>
                    {sci.link.label}
                  </Link>
                </p>
              </div>
              {/* The themes are listed rather than described: the point of this
                  section is the breadth, not any one result. They sit opposite
                  the copy so the seven read as a set at a glance. */}
              <ul className="theme-chips theme-chips--panel">
                {science.themes.map((theme) => (
                  <li key={theme.id}>
                    <Link to={`/science/${theme.id}`}>
                      <span className="theme-chips__hash" aria-hidden="true">#</span>
                      {theme.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 04 — Survey ---------------------------------------------------- */}
        {/* The footprint is the background rather than a figure inside the
            section: it is the one thing here that is worth looking at, and as
            a panel beside the cards it forced the section past one viewport.
            The interactive map, with per-tile detail, is on the coverage page. */}
        <section className="fullpage-section home-survey-panel">
          {tiles && tiles.count > 0 ? (
            <div className="home-survey__bg" aria-hidden="true">
              {/* Shaded by integration time: it varies smoothly across the
                  footprint, so behind a veil it reads as depth of coverage
                  rather than as a patchwork. */}
              <SkyMap
                tiles={tiles}
                exposureSec={exposureSec}
                interactive={false}
                defaultMode="exposure"
              />
            </div>
          ) : null}

          {/* The freshness of the map belongs on the map, not in the prose:
              it qualifies what is drawn behind everything else. Top right,
              where the Mollweide ellipse leaves the corner empty. */}
          {tiles && tiles.count > 0 ? (
            <div className="home-survey__stamp">
              <LiveBadge live={tilesLive} updated={generatedAt} />
              <span className="home-survey__count">
                {fill(survey.tilesObserved, { count: tiles.count.toLocaleString('en-US') })}
              </span>
            </div>
          ) : null}

          <div className="container container--wide">
            <div className="reveal">
              <span className="eyebrow">{survey.eyebrow}</span>
              <h2>{survey.title}</h2>
              <p className="prose" style={{ maxWidth: '62ch' }}>
                <Md>{survey.body}</Md>
              </p>

              {tiles && tiles.count > 0 ? (
                <div className="home-survey__meta">
                  <Link className="link-arrow" to={survey.link.href}>
                    {survey.link.label}
                  </Link>
                </div>
              ) : null}

              {/* A row under the copy, not a column beside the map: three short
                  cards cost far less height that way, which is what keeps the
                  section inside one viewport on a laptop screen. */}
              <div className="home-survey__tiers">
                {surveys.tiers.map((tier) => (
                  <Link
                    className="tier-card tier-card--link"
                    key={tier.code}
                    to={`/survey/${tier.code.toLowerCase()}`}
                  >
                    <span className="tier-card__code">{tier.code}</span>
                    <h3 className="tier-card__name">{tier.name}</h3>
                    {/* One line rather than a two-row table: the full
                        parameters are one click away. */}
                    <p className="home-survey__spec">
                      {tier.area} · {tier.cadence}
                    </p>
                    <span className={`pill pill--${tier.status}`}>
                      {tier.status === 'live' && risCoverage !== null && tier.code === 'RIS'
                        ? fill(survey.observed, { percent: risCoverage })
                        : tier.statusLabel}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 05 — Telescope -------------------------------------------------- */}
        <section
          className="fullpage-section fullpage-section--dark"
          style={{ backgroundImage: `url('${facility.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="container container--wide">
            <div className="split split--middle reveal">
              <div>
                <span className="eyebrow eyebrow--on-dark">{facility.eyebrow}</span>
                <h2>{facility.title}</h2>
                <p className="prose" style={{ color: 'rgba(255,255,255,.78)' }}>
                  <Md>{facility.body}</Md>
                </p>
                <p style={{ marginTop: '1.5rem' }}>
                  <Link className="link-arrow" to={facility.link.href} style={{ color: 'var(--accent-on-dark)' }}>
                    {facility.link.label}
                  </Link>
                </p>
              </div>
              {/* The four numbers that fix the scale of the facility. The
                  hardware, site and pipeline detail they replace is set out in
                  full on the telescope pages. */}
              <div className="stat-grid stat-grid--2x2 stat-grid--on-dark">
                {facility.stats.map((stat) => (
                  <div className="stat" key={stat.label}>
                    <span className="stat__value">
                      {fill(stat.value, counts)}
                      {stat.unit && <span className="stat__unit">{stat.unit}</span>}
                    </span>
                    <span className="stat__label">{stat.label}</span>
                    {stat.note && (
                      <span className={`stat__note${stat.live ? ' stat__note--live' : ''}`}>
                        {fill(stat.note, counts)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 06 — News ------------------------------------------------------- */}
        <section className="fullpage-section section--alt">
          <div className="container container--wide">
            <div className="reveal">
              <div className="section-title">
                <span className="eyebrow">{latestNews.eyebrow}</span>
                <h2>{latestNews.title}</h2>
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
                {/* Both secondary: neither is the page's main action. */}
                {latestNews.links.map((link) => (
                  <Link className="btn btn--secondary" to={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
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
