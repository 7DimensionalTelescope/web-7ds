import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@remix-run/react';

const MENU = [
  {
    key: 'manuAbout',
    label: 'About',
    href: '/about/intro',
    items: [
      { label: 'What is 7DS', href: '/about/intro' },
      { label: 'Team', href: '/about/team' },
      { label: 'Funding', href: '/about/funding' },
    ],
  },
  {
    key: 'manuScience',
    label: 'Science',
    href: '/science/overview',
    items: [
      { label: 'Overview', href: '/science/overview' },
      { label: 'Multi-messenger Astronomy', href: '/science/sci#mma' },
      { label: 'Transients', href: '/science/sci#transients' },
      { label: 'Galaxy Formation & Evolution', href: '/science/sci#galaxies' },
      { label: 'Cosmology', href: '/science/sci#cosmology' },
      { label: 'Active Galactic Nuclei', href: '/science/sci#agn' },
      { label: 'Galactic Science', href: '/science/sci#galactic' },
      { label: 'Solar System Objects', href: '/science/sci#solar' },
    ],
  },
  {
    key: 'manu7ds',
    label: 'Survey',
    href: '/survey/overview',
    items: [
      { label: 'Overview', href: '/survey/overview' },
      { label: 'Reference Imaging (RIS)', href: '/survey/ris' },
      { label: 'Wide-area Time-domain (WTS)', href: '/survey/wts' },
      { label: 'Intensive Monitoring (IMS)', href: '/survey/ims' },
    ],
  },
  {
    key: 'manu7dt',
    label: 'Telescope',
    href: '/telescope/overview',
    items: [
      { label: 'Overview', href: '/telescope/overview' },
      { label: 'Instrument', href: '/telescope/instrument' },
      { label: 'Location', href: '/telescope/location' },
      { label: 'Computational Resources', href: '/telescope/computer' },
    ],
  },
  {
    key: 'manuUsers',
    label: 'For Users',
    href: '/users/status',
    items: [
      { label: 'Status & Overview', href: '/users/status' },
      { label: 'Performance', href: '/users/performance' },
      { label: 'How to Propose', href: '/users/propose' },
      { label: 'How to Use the Data', href: '/users/data' },
      { label: 'Data Format', href: '/users/format' },
      { label: 'Data Access', href: '/users/access' },
      { label: 'Available Software', href: '/users/software' },
      { label: 'Questions', href: '/users/faq' },
    ],
  },
];

const CaretIcon = () => (
  <svg className="site-nav__caret" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function NavBar(props: { manu?: string; fixed?: boolean }) {
  const [scrolled, setScrolled] = useState(Boolean(props.fixed));
  const [showMenu, setShowMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // The home page scrolls inside .fullpage-wrapper, interior pages scroll the
  // window. Watch both so the bar settles consistently either way.
  useEffect(() => {
    if (props.fixed) {
      setScrolled(true);
      return undefined;
    }

    const wrapper = document.querySelector('.fullpage-wrapper');
    let frame = 0;

    // Hysteresis: a single threshold flips back and forth while a scroll snap
    // settles, and each flip restarts the background transition — which is what
    // made the bar blink. Solid above 64px, transparent only below 8px.
    const measure = () => {
      frame = 0;
      const offset = wrapper ? wrapper.scrollTop : window.scrollY;
      setScrolled((was) => (was ? offset > 8 : offset > 64));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    if (wrapper) wrapper.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      if (wrapper) wrapper.removeEventListener('scroll', onScroll);
    };
  }, [props.fixed]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const openNow = (key: string) => {
    clearTimeout(closeTimer.current);
    setOpenDropdown(key);
  };

  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 140);

  };

  const closeNow = () => {
    clearTimeout(closeTimer.current);
    setOpenDropdown(null);
  };

  const isActive = (key: string) => props.manu === key;

  return (
    <nav className={`site-nav${scrolled ? ' site-nav--solid' : ''}`} onKeyDown={(e) => e.key === 'Escape' && closeNow()}>
      <div className="site-nav__inner">
        <Link to="/" className="site-nav__brand" aria-label="7-Dimensional Telescope — home">
          <img src="/img/logo_name.png" alt="7DT" />
        </Link>

        <div className="site-nav__menu">
          <div className="site-nav__item">
            <Link to="/" className={`site-nav__link${isActive('manuHome') ? ' site-nav__link--active' : ''}`}>
              Home
            </Link>
          </div>

          {MENU.map((menu) => (
            <div
              key={menu.key}
              className={`site-nav__item${openDropdown === menu.key ? ' site-nav__item--open' : ''}`}
              onMouseEnter={() => openNow(menu.key)}
              onMouseLeave={closeSoon}
            >
              {/* The label navigates to the section's first page; the caret
                  beside it opens the submenu without leaving the page. */}
              <Link
                to={menu.href}
                className={`site-nav__link${isActive(menu.key) ? ' site-nav__link--active' : ''}`}
                onFocus={() => openNow(menu.key)}
              >
                {menu.label}
              </Link>
              <button
                type="button"
                className="site-nav__caret-btn"
                aria-expanded={openDropdown === menu.key}
                aria-label={`${menu.label} submenu`}
                onClick={() => (openDropdown === menu.key ? closeNow() : openNow(menu.key))}
              >
                <CaretIcon />
              </button>

              {openDropdown === menu.key && (
                <div className="site-nav__dropdown">
                  <div className="site-nav__dropdown-label">{menu.label}</div>
                  {menu.items.map((item) => (
                    <Link key={item.label} to={item.href} onClick={closeNow}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="site-nav__item">
            <Link to="/publication/list" className={`site-nav__link${isActive('manuPaper') ? ' site-nav__link--active' : ''}`}>
              Publications
            </Link>
          </div>
          <div className="site-nav__item">
            <Link to="/gallery" className={`site-nav__link${isActive('manuGallery') ? ' site-nav__link--active' : ''}`}>
              Gallery
            </Link>
          </div>
          <div className="site-nav__item">
            <Link to="/news" className={`site-nav__link${isActive('manuNews') ? ' site-nav__link--active' : ''}`}>
              News
            </Link>
          </div>
        </div>

        <button
          type="button"
          className="site-nav__toggle"
          onClick={() => setShowMenu(!showMenu)}
          aria-expanded={showMenu}
          aria-controls="mobile-menu"
          aria-label={showMenu ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {showMenu ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {showMenu && (
        <div className="site-nav__mobile" id="mobile-menu">
          <Link to="/">Home</Link>

          {/* Full two-level menu: on a phone the section landing pages alone
              left most of the site two hops away. */}
          {MENU.map((menu) => {
            const open = mobileOpen === menu.key;
            return (
              <div className="site-nav__mobile-group" key={menu.key}>
                <button
                  type="button"
                  className="site-nav__mobile-toggle"
                  aria-expanded={open}
                  aria-controls={`m-${menu.key}`}
                  onClick={() => setMobileOpen(open ? null : menu.key)}
                >
                  {menu.label}
                  <svg
                    className="site-nav__caret"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    style={{ transform: open ? 'rotate(180deg)' : undefined }}
                  >
                    <path
                      d="M2.5 4.5L6 8l3.5-3.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {open && (
                  <div className="site-nav__mobile-sub" id={`m-${menu.key}`}>
                    {menu.items.map((item) => (
                      <Link key={item.href} to={item.href}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link to="/publication/list">Publications</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/news">News</Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
