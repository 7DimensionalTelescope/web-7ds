import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from '@remix-run/react';
import news from './content/news.json';
import surveys from './content/surveys.json';
import { mainText1, mainText2, mainText3, mainText4 } from './content/text';
import FooterBar from './footer';

/* Which snap sections carry a dark background — the dot navigation and the
   scroll cue invert against it. The last entry is the footer. */
const SECTION_IS_DARK = [true, false, true, true, false, false, true];
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

const MainPage = () => {
  const [current, setCurrent] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const ticking = useRef(false);
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
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    sectionsRef.current = Array.from(
      wrapper.querySelectorAll<HTMLElement>('.fullpage-section')
    );

    document.body.classList.add('fullpage-active');
    document.documentElement.classList.add('fullpage-active');
    // Only opt into the reveal transition once the script is live, so the
    // copy is readable if it never is.
    document.documentElement.classList.add('reveal-ready');

    const progressBar = document.querySelector<HTMLElement>('.fullpage-progress');

    const measure = () => {
      ticking.current = false;

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

      // A section is "active" once it is the one filling the viewport.
      // `has-revealed` is deliberately never removed: if the reveal were tied
      // to `is-active` alone, content would fade back out whenever the index
      // flipped while a snap was settling, which reads as flickering.
      sectionsRef.current.forEach((section, i) => {
        section.classList.toggle('is-active', i === index);
        if (i === index) section.classList.add('has-revealed');
      });
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      frame.current = window.requestAnimationFrame(measure);
    };

    measure();
    wrapper.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame.current);
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

  const onLight = !SECTION_IS_DARK[current];
  const latest = (news.news as any[]).filter((item) => item.type !== 'update').slice(0, 3);

  return (
    <div className="fullpage-container">
      <div className="fullpage-progress" />

      <div className={`fullpage-nav${onLight ? ' fullpage-nav--on-light' : ''}`}>
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

      <div className="fullpage-wrapper" ref={wrapperRef}>
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
              <h1>7-Dimensional Telescope</h1>
              <p className="fullpage-hero__lede">
An array of twenty 50-cm telescopes in the Río Hurtado Valley, Chile,
                carrying forty medium-band filters between them. Imaging that reads like
                spectroscopy, over a field no spectrograph can cover.
              </p>
              <div className="stat-grid stat-grid--on-dark">
                <div className="stat">
                  <span className="stat__value">20</span>
                  <span className="stat__label">Telescopes in the array</span>
                  <span className="stat__note stat__note--live">16 online</span>
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
                  <span className="stat__value">1.2<span className="stat__unit">deg²</span></span>
                  <span className="stat__label">Per pointing</span>
                </div>
              </div>
            </div>
          </div>

          <button type="button" className="scroll-cue" onClick={() => scrollToSection(1)}>
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
                <h2>An array that observes in seven dimensions</h2>
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
                <h2>Spectra without a spectrograph</h2>
                <p className="prose" style={{ color: 'rgba(255,255,255,.78)' }}>
                  {mainText2}
                </p>
                <p style={{ marginTop: '1.5rem' }}>
                  <Link className="link-arrow" to="/science/overview" style={{ color: 'var(--accent-on-dark)' }}>Science programme</Link>
                </p>
              </div>
              <div className="stat-grid stat-grid--on-dark" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="stat">
                  <span className="stat__value">30–70</span>
                  <span className="stat__label">Spectral resolution R</span>
                </div>
                <div className="stat">
                  <span className="stat__value">&lt; 1<span className="stat__unit">min</span></span>
                  <span className="stat__label">Alert to exposure start</span>
                </div>
                <div className="stat">
                  <span className="stat__value">1.75<span className="stat__unit">M</span></span>
                  <span className="stat__label">Images, unattended</span>
                </div>
                <div className="stat">
                  <span className="stat__value">≈ 100</span>
                  <span className="stat__label">ToO follow-ups</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 — Survey ---------------------------------------------------- */}
        <section
          className="fullpage-section fullpage-section--dark"
          style={{ backgroundImage: "url('/img/hero/survey.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="container container--wide">
            <div className="reveal">
              <span className="eyebrow eyebrow--on-dark">7-Dimensional Sky Survey</span>
              <h2>Three tiers over the southern sky</h2>
              <p className="prose" style={{ color: 'rgba(255,255,255,.78)', maxWidth: '60ch' }}>
                {mainText3}
              </p>

              <div className="grid grid-cols-3" style={{ marginTop: '2rem' }}>
                {surveys.tiers.map((tier) => (
                  <div className="tier-card" key={tier.code} style={{ background: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.16)' }}>
                    <span className="tier-card__code" style={{ color: 'var(--accent-on-dark)' }}>
                      {tier.code}
                    </span>
                    <h3 className="tier-card__name" style={{ color: '#fff' }}>{tier.name}</h3>
                    <dl style={{ borderTopColor: 'rgba(255,255,255,.16)' }}>
                      <div style={{ borderBottomColor: 'rgba(255,255,255,.1)' }}>
                        <dt style={{ color: 'rgba(255,255,255,.55)' }}>Area</dt>
                        <dd style={{ color: '#fff' }}>{tier.area}</dd>
                      </div>
                      <div style={{ borderBottomColor: 'rgba(255,255,255,.1)' }}>
                        <dt style={{ color: 'rgba(255,255,255,.55)' }}>Cadence</dt>
                        <dd style={{ color: '#fff' }}>{tier.cadence}</dd>
                      </div>
                      <div style={{ borderBottomColor: 'rgba(255,255,255,.1)' }}>
                        <dt style={{ color: 'rgba(255,255,255,.55)' }}>Depth</dt>
                        <dd style={{ color: '#fff' }}>{tier.depth}</dd>
                      </div>
                    </dl>
                    <span className={`pill pill--${tier.status}`} style={tier.status === 'planned' ? { color: 'rgba(255,255,255,.6)' } : undefined}>
                      {tier.statusLabel}
                    </span>
                  </div>
                ))}
              </div>

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
        </section>

        {/* 05 — Telescope -------------------------------------------------- */}
        <section className="fullpage-section">
          <div className="container container--wide">
            <div className="split split--middle reveal">
              <div>
                <span className="eyebrow">The instrument</span>
                <h2>Twenty telescopes, one instrument</h2>
                <p className="prose">{mainText4}</p>
                <p style={{ marginTop: '1.5rem' }}>
                  <Link className="link-arrow" to="/telescope/overview">Telescope &amp; site</Link>
                </p>
              </div>
              <ul className="feature-list">
                <li>
                  <span className="feature-list__key">OTA</span>
                  <div>
                    <h3 className="feature-list__title">PlaneWave DeltaRho 500</h3>
                    <p className="feature-list__body">
                      508 mm corrected Cassegrain at f/3.0, covering 1.34° × 0.90° at 0.5″ per pixel.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="feature-list__key">Site</span>
                  <div>
                    <h3 className="feature-list__title">El Sauce Observatory, Chile</h3>
                    <p className="feature-list__body">
                      1.5″ median seeing, over 300 clear nights a year, next to Rubin and CTIO.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="feature-list__key">Ops</span>
                  <div>
                    <h3 className="feature-list__title">Robotic, unattended</h3>
                    <p className="feature-list__body">
                      RTCSpy runs the night end to end and interrupts it for an alert in under a minute.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="feature-list__key">Data</span>
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

        {/* 07 — Footer ----------------------------------------------------- */}
        <div
          className="fullpage-section"
          style={{
            display: 'block',
            height: 'auto',
            minHeight: '100vh',
            alignItems: 'stretch',
            overflow: 'visible',
          }}
        >
          <FooterBar />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
