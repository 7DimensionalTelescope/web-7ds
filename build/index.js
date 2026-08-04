var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError
} from "@remix-run/react";

// app/css/app.css
var app_default = "/build/_assets/app-ZXQWFZKN.css";

// app/css/custom.css
var custom_default = "/build/_assets/custom-D4XIE6FV.css";

// app/root.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var links = () => [
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "stylesheet", href: app_default },
  { rel: "stylesheet", href: custom_default },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
  },
  ...void 0 ? [{ rel: "stylesheet", href: void 0 }] : []
];
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "scroll-smooth", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx2(
        "meta",
        {
          name: "description",
          content: "The 7-Dimensional Telescope: a medium-band multi-telescope array at El Sauce Observatory, Chile, and the 7-Dimensional Sky Survey of the southern sky."
        }
      ),
      /* @__PURE__ */ jsx2(
        "meta",
        {
          name: "keywords",
          content: "7DT, 7DS, telescope, astronomy, medium-band, gravitational waves, multi-messenger, survey, Chile, El Sauce"
        }
      ),
      /* @__PURE__ */ jsx2("meta", { name: "author", content: "Center for the Gravitational-wave Universe, Seoul National University" }),
      /* @__PURE__ */ jsx2("meta", { name: "theme-color", content: "#05080f" }),
      /* @__PURE__ */ jsx2("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx2("meta", { property: "og:url", content: "https://7dt.org/" }),
      /* @__PURE__ */ jsx2("meta", { property: "og:title", content: "7-Dimensional Telescope" }),
      /* @__PURE__ */ jsx2(
        "meta",
        {
          property: "og:description",
          content: "Twenty 50-cm telescopes carrying forty medium-band filters \u2014 imaging that reads like spectroscopy, over the whole southern sky."
        }
      ),
      /* @__PURE__ */ jsx2("meta", { property: "og:image", content: "/img/title.png" }),
      /* @__PURE__ */ jsx2("meta", { property: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx2("meta", { property: "twitter:url", content: "https://7dt.org/" }),
      /* @__PURE__ */ jsx2("meta", { property: "twitter:title", content: "7-Dimensional Telescope" }),
      /* @__PURE__ */ jsx2(
        "meta",
        {
          property: "twitter:description",
          content: "Twenty 50-cm telescopes carrying forty medium-band filters \u2014 imaging that reads like spectroscopy, over the whole southern sky."
        }
      ),
      /* @__PURE__ */ jsx2("meta", { property: "twitter:image", content: "/img/title.png" }),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "antialiased", children: [
      /* @__PURE__ */ jsx2(Outlet, {}),
      /* @__PURE__ */ jsx2(ScrollRestoration, {}),
      /* @__PURE__ */ jsx2(Scripts, {}),
      /* @__PURE__ */ jsx2(LiveReload, {})
    ] })
  ] });
}
function ErrorBoundary() {
  let error = useRouteError(), is404 = isRouteErrorResponse(error) && error.status === 404;
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx2("title", { children: is404 ? "Page not found \xB7 7DT" : "Something went wrong \xB7 7DT" }),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "antialiased", children: [
      /* @__PURE__ */ jsx2(
        "main",
        {
          id: "content",
          style: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            background: "var(--ink-950, #05080f)",
            color: "#fff"
          },
          children: /* @__PURE__ */ jsxs("div", { className: "container container--wide", children: [
            /* @__PURE__ */ jsx2("span", { className: "eyebrow eyebrow--on-dark", children: is404 ? "404" : "Error" }),
            /* @__PURE__ */ jsx2("h1", { className: "hero__title", children: is404 ? "That page is not here" : "Something went wrong" }),
            /* @__PURE__ */ jsx2("p", { className: "hero__lede", children: is404 ? "The page you asked for does not exist. It may have moved, or the link may be out of date." : "An unexpected error occurred while rendering this page." }),
            /* @__PURE__ */ jsxs("div", { className: "btn-row", children: [
              /* @__PURE__ */ jsx2("a", { className: "btn btn--on-dark", href: "/", children: "Return home" }),
              /* @__PURE__ */ jsx2("a", { className: "btn btn--on-dark", href: "/telescope/overview", children: "The telescope" }),
              /* @__PURE__ */ jsx2("a", { className: "btn btn--on-dark", href: "/news", children: "News" })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsx2(Scripts, {})
    ] })
  ] });
}

// app/routes/telescope.instrument.tsx
var telescope_instrument_exports = {};
__export(telescope_instrument_exports, {
  default: () => telescope_instrument_default,
  meta: () => meta
});
import { Link as Link4 } from "@remix-run/react";

// app/components/site.tsx
import React2 from "react";
import { Link as Link3 } from "@remix-run/react";

// app/routes/navigate.tsx
import { useState, useEffect, useRef } from "react";
import { Link } from "@remix-run/react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var MENU = [
  {
    key: "manuAbout",
    label: "About",
    href: "/about/intro",
    items: [
      { label: "What is 7DS", href: "/about/intro" },
      { label: "Team", href: "/about/team" },
      { label: "Funding", href: "/about/funding" }
    ]
  },
  {
    key: "manuScience",
    label: "Science",
    href: "/science/overview",
    items: [
      { label: "Overview", href: "/science/overview" },
      { label: "Multi-messenger Astronomy", href: "/science/sci#mma" },
      { label: "Transients", href: "/science/sci#transients" },
      { label: "Galaxy Formation & Evolution", href: "/science/sci#galaxies" },
      { label: "Cosmology", href: "/science/sci#cosmology" },
      { label: "Active Galactic Nuclei", href: "/science/sci#agn" },
      { label: "Galactic Science", href: "/science/sci#galactic" },
      { label: "Solar System Objects", href: "/science/sci#solar" }
    ]
  },
  {
    key: "manu7ds",
    label: "Survey",
    href: "/survey/overview",
    items: [
      { label: "Overview", href: "/survey/overview" },
      { label: "Reference Imaging (RIS)", href: "/survey/ris" },
      { label: "Wide-area Time-domain (WTS)", href: "/survey/wts" },
      { label: "Intensive Monitoring (IMS)", href: "/survey/ims" }
    ]
  },
  {
    key: "manu7dt",
    label: "Telescope",
    href: "/telescope/overview",
    items: [
      { label: "Overview", href: "/telescope/overview" },
      { label: "Instrument", href: "/telescope/instrument" },
      { label: "Location", href: "/telescope/location" },
      { label: "Computational Resources", href: "/telescope/computer" }
    ]
  },
  {
    key: "manuUsers",
    label: "For Users",
    href: "/users/status",
    items: [
      { label: "Status & Overview", href: "/users/status" },
      { label: "Performance", href: "/users/performance" },
      { label: "How to Propose", href: "/users/propose" },
      { label: "Data Access & Format", href: "/users/access" },
      { label: "Using the Data", href: "/users/data" },
      { label: "Available Software", href: "/users/software" },
      { label: "Useful Links", href: "/users/links" },
      { label: "Questions", href: "/users/faq" }
    ]
  }
], CaretIcon = () => /* @__PURE__ */ jsx3("svg", { className: "site-nav__caret", viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx3("path", { d: "M2.5 4.5L6 8l3.5-3.5", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
function NavBar(props) {
  let [scrolled, setScrolled] = useState(Boolean(props.fixed)), [showMenu, setShowMenu] = useState(!1), [mobileOpen, setMobileOpen] = useState(null), [openDropdown, setOpenDropdown] = useState(null), closeTimer = useRef(void 0);
  useEffect(() => {
    if (props.fixed) {
      setScrolled(!0);
      return;
    }
    let wrapper = document.querySelector(".fullpage-wrapper"), frame = 0, measure = () => {
      frame = 0;
      let offset = wrapper ? wrapper.scrollTop : window.scrollY;
      setScrolled((was) => was ? offset > 8 : offset > 64);
    }, onScroll = () => {
      frame || (frame = window.requestAnimationFrame(measure));
    };
    return measure(), window.addEventListener("scroll", onScroll, { passive: !0 }), wrapper && wrapper.addEventListener("scroll", onScroll, { passive: !0 }), () => {
      frame && window.cancelAnimationFrame(frame), window.removeEventListener("scroll", onScroll), wrapper && wrapper.removeEventListener("scroll", onScroll);
    };
  }, [props.fixed]), useEffect(() => () => clearTimeout(closeTimer.current), []);
  let openNow = (key) => {
    clearTimeout(closeTimer.current), setOpenDropdown(key);
  }, closeSoon = () => {
    clearTimeout(closeTimer.current), closeTimer.current = setTimeout(() => setOpenDropdown(null), 140);
  }, closeNow = () => {
    clearTimeout(closeTimer.current), setOpenDropdown(null);
  }, isActive = (key) => props.manu === key;
  return /* @__PURE__ */ jsxs2("nav", { className: `site-nav${scrolled ? " site-nav--solid" : ""}`, onKeyDown: (e) => e.key === "Escape" && closeNow(), children: [
    /* @__PURE__ */ jsxs2("div", { className: "site-nav__inner", children: [
      /* @__PURE__ */ jsx3(Link, { to: "/", className: "site-nav__brand", "aria-label": "7-Dimensional Telescope \u2014 home", children: /* @__PURE__ */ jsx3("img", { src: "/img/logo_name.png", alt: "7DT" }) }),
      /* @__PURE__ */ jsxs2("div", { className: "site-nav__menu", children: [
        /* @__PURE__ */ jsx3("div", { className: "site-nav__item", children: /* @__PURE__ */ jsx3(Link, { to: "/", className: `site-nav__link${isActive("manuHome") ? " site-nav__link--active" : ""}`, children: "Home" }) }),
        MENU.map((menu) => /* @__PURE__ */ jsxs2(
          "div",
          {
            className: `site-nav__item${openDropdown === menu.key ? " site-nav__item--open" : ""}`,
            onMouseEnter: () => openNow(menu.key),
            onMouseLeave: closeSoon,
            children: [
              /* @__PURE__ */ jsx3(
                Link,
                {
                  to: menu.href,
                  className: `site-nav__link${isActive(menu.key) ? " site-nav__link--active" : ""}`,
                  onFocus: () => openNow(menu.key),
                  children: menu.label
                }
              ),
              /* @__PURE__ */ jsx3(
                "button",
                {
                  type: "button",
                  className: "site-nav__caret-btn",
                  "aria-expanded": openDropdown === menu.key,
                  "aria-label": `${menu.label} submenu`,
                  onClick: () => openDropdown === menu.key ? closeNow() : openNow(menu.key),
                  children: /* @__PURE__ */ jsx3(CaretIcon, {})
                }
              ),
              openDropdown === menu.key && /* @__PURE__ */ jsxs2("div", { className: "site-nav__dropdown", children: [
                /* @__PURE__ */ jsx3("div", { className: "site-nav__dropdown-label", children: menu.label }),
                menu.items.map((item) => /* @__PURE__ */ jsx3(Link, { to: item.href, onClick: closeNow, children: item.label }, item.label))
              ] })
            ]
          },
          menu.key
        )),
        /* @__PURE__ */ jsx3("div", { className: "site-nav__item", children: /* @__PURE__ */ jsx3(Link, { to: "/publication/list", className: `site-nav__link${isActive("manuPaper") ? " site-nav__link--active" : ""}`, children: "Publications" }) }),
        /* @__PURE__ */ jsx3("div", { className: "site-nav__item", children: /* @__PURE__ */ jsx3(Link, { to: "/gallery", className: `site-nav__link${isActive("manuGallery") ? " site-nav__link--active" : ""}`, children: "Gallery" }) }),
        /* @__PURE__ */ jsx3("div", { className: "site-nav__item", children: /* @__PURE__ */ jsx3(Link, { to: "/news", className: `site-nav__link${isActive("manuNews") ? " site-nav__link--active" : ""}`, children: "News" }) })
      ] }),
      /* @__PURE__ */ jsx3(
        "button",
        {
          type: "button",
          className: "site-nav__toggle",
          onClick: () => setShowMenu(!showMenu),
          "aria-expanded": showMenu,
          "aria-controls": "mobile-menu",
          "aria-label": showMenu ? "Close navigation menu" : "Open navigation menu",
          children: /* @__PURE__ */ jsx3("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", "aria-hidden": "true", children: showMenu ? /* @__PURE__ */ jsx3("path", { d: "M6 6l12 12M18 6L6 18", strokeLinecap: "round" }) : /* @__PURE__ */ jsx3("path", { d: "M4 7h16M4 12h16M4 17h16", strokeLinecap: "round" }) })
        }
      )
    ] }),
    showMenu && /* @__PURE__ */ jsxs2("div", { className: "site-nav__mobile", id: "mobile-menu", children: [
      /* @__PURE__ */ jsx3(Link, { to: "/", children: "Home" }),
      MENU.map((menu) => {
        let open = mobileOpen === menu.key;
        return /* @__PURE__ */ jsxs2("div", { className: "site-nav__mobile-group", children: [
          /* @__PURE__ */ jsxs2(
            "button",
            {
              type: "button",
              className: "site-nav__mobile-toggle",
              "aria-expanded": open,
              "aria-controls": `m-${menu.key}`,
              onClick: () => setMobileOpen(open ? null : menu.key),
              children: [
                menu.label,
                /* @__PURE__ */ jsx3(
                  "svg",
                  {
                    className: "site-nav__caret",
                    viewBox: "0 0 12 12",
                    fill: "none",
                    "aria-hidden": "true",
                    style: { transform: open ? "rotate(180deg)" : void 0 },
                    children: /* @__PURE__ */ jsx3(
                      "path",
                      {
                        d: "M2.5 4.5L6 8l3.5-3.5",
                        stroke: "currentColor",
                        strokeWidth: "1.6",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }
                    )
                  }
                )
              ]
            }
          ),
          open && /* @__PURE__ */ jsx3("div", { className: "site-nav__mobile-sub", id: `m-${menu.key}`, children: menu.items.map((item) => /* @__PURE__ */ jsx3(Link, { to: item.href, children: item.label }, item.href)) })
        ] }, menu.key);
      }),
      /* @__PURE__ */ jsx3(Link, { to: "/publication/list", children: "Publications" }),
      /* @__PURE__ */ jsx3(Link, { to: "/gallery", children: "Gallery" }),
      /* @__PURE__ */ jsx3(Link, { to: "/news", children: "News" })
    ] })
  ] });
}
var navigate_default = NavBar;

// app/routes/footer.tsx
import { Link as Link2 } from "@remix-run/react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var PARTNERS = [
  { src: "/img/institutes/snu.jpeg", alt: "Seoul National University" },
  { src: "/img/institutes/kasi.gif", alt: "Korea Astronomy and Space Science Institute" },
  { src: "/img/institutes/postech.png", alt: "POSTECH" },
  { src: "/img/institutes/ewha.png", alt: "Ewha Womans University" },
  { src: "/img/institutes/gwuniv.png", alt: "Center for the Gravitational-wave Universe" },
  { src: "/img/institutes/nrf.jpg", alt: "National Research Foundation of Korea" }
], COLUMNS = [
  {
    title: "About",
    links: [
      { label: "What is 7DS", href: "/about/intro" },
      { label: "Team", href: "/about/team" },
      { label: "Funding", href: "/about/funding" },
      { label: "Gallery", href: "/gallery" },
      { label: "Links", href: "/links" }
    ]
  },
  {
    title: "Survey",
    links: [
      { label: "Overview", href: "/survey/overview" },
      { label: "Reference Imaging (RIS)", href: "/survey/ris" },
      { label: "Wide-area Time-domain (WTS)", href: "/survey/wts" },
      { label: "Intensive Monitoring (IMS)", href: "/survey/ims" }
    ]
  },
  {
    title: "Science",
    links: [
      { label: "Overview", href: "/science/overview" },
      { label: "Multi-messenger Astronomy", href: "/science/sci#mma" },
      { label: "Transients", href: "/science/sci#transients" },
      { label: "Galaxy Formation & Evolution", href: "/science/sci#galaxies" },
      { label: "Cosmology", href: "/science/sci#cosmology" },
      { label: "Active Galactic Nuclei", href: "/science/sci#agn" },
      { label: "Galactic Science", href: "/science/sci#galactic" },
      { label: "Solar System Objects", href: "/science/sci#solar" }
    ]
  },
  {
    title: "Telescope",
    links: [
      { label: "Overview", href: "/telescope/overview" },
      { label: "Instrument", href: "/telescope/instrument" },
      { label: "Location", href: "/telescope/location" },
      { label: "Computational Resources", href: "/telescope/computer" }
    ]
  },
  {
    title: "For Users",
    links: [
      { label: "Status & Overview", href: "/users/status" },
      { label: "Performance", href: "/users/performance" },
      { label: "How to Propose", href: "/users/propose" },
      { label: "Data Access & Format", href: "/users/access" },
      { label: "Using the Data", href: "/users/data" },
      { label: "Available Software", href: "/users/software" },
      { label: "Useful Links", href: "/users/links" },
      { label: "Questions", href: "/users/faq" }
    ]
  }
], FooterBar = () => /* @__PURE__ */ jsxs3("footer", { className: "site-footer", children: [
  /* @__PURE__ */ jsx4("div", { className: "site-footer__spectrum" }),
  /* @__PURE__ */ jsx4("div", { className: "site-footer__top", children: /* @__PURE__ */ jsx4("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs3("div", { className: "site-footer__grid", children: [
    /* @__PURE__ */ jsxs3("div", { className: "site-footer__contact", children: [
      /* @__PURE__ */ jsx4("h3", { className: "site-footer__heading", children: "Contact" }),
      /* @__PURE__ */ jsx4("p", { className: "site-footer__name", children: "Prof. Myungshin Im" }),
      /* @__PURE__ */ jsx4("p", { children: "Principal Investigator" }),
      /* @__PURE__ */ jsx4("p", { children: "Dept. of Physics & Astronomy" }),
      /* @__PURE__ */ jsx4("p", { children: "Seoul National University" }),
      /* @__PURE__ */ jsx4("p", { children: "1 Gwanak-ro, Gwanak-gu" }),
      /* @__PURE__ */ jsx4("p", { children: "Seoul 08826, Republic of Korea" }),
      /* @__PURE__ */ jsx4("p", { children: "+82-2-880-6585 / 6761" }),
      /* @__PURE__ */ jsx4("p", { style: { marginTop: "0.75rem" }, children: /* @__PURE__ */ jsx4("a", { href: "mailto:mim@astro.snu.ac.kr", children: "mim@astro.snu.ac.kr" }) })
    ] }),
    COLUMNS.map((column) => /* @__PURE__ */ jsxs3("div", { children: [
      /* @__PURE__ */ jsx4("h3", { className: "site-footer__heading", children: column.title }),
      /* @__PURE__ */ jsx4("ul", { children: column.links.map((link) => /* @__PURE__ */ jsx4("li", { children: /* @__PURE__ */ jsx4(Link2, { to: link.href, children: link.label }) }, link.label)) })
    ] }, column.title))
  ] }) }) }),
  /* @__PURE__ */ jsx4("div", { className: "site-footer__partners", children: /* @__PURE__ */ jsxs3("div", { className: "container container--wide", children: [
    /* @__PURE__ */ jsx4("h3", { className: "site-footer__heading", children: "Participating institutions" }),
    /* @__PURE__ */ jsx4("div", { className: "logo-strip", children: PARTNERS.map((partner) => /* @__PURE__ */ jsx4("div", { className: "logo-strip__item", children: /* @__PURE__ */ jsx4("img", { src: partner.src, alt: partner.alt, loading: "lazy" }) }, partner.alt)) })
  ] }) }),
  /* @__PURE__ */ jsx4("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs3("div", { className: "site-footer__bottom", children: [
    /* @__PURE__ */ jsx4("div", { className: "site-footer__copyright", children: "\xA9 2026 7-Dimensional Telescope \xB7 Center for the Gravitational-wave Universe, SNU" }),
    /* @__PURE__ */ jsxs3("div", { className: "site-footer__legal", children: [
      /* @__PURE__ */ jsx4(Link2, { to: "/publication/policy", children: "Publication Policy" }),
      /* @__PURE__ */ jsx4(Link2, { to: "/links", children: "Links" }),
      /* @__PURE__ */ jsx4("a", { href: "mailto:mim@astro.snu.ac.kr", children: "Contact" })
    ] })
  ] }) })
] }), footer_default = FooterBar;

// app/components/site.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function PageLayout({
  menu,
  children
}) {
  return /* @__PURE__ */ jsxs4("div", { className: "page", children: [
    /* @__PURE__ */ jsx5("a", { className: "skip-link", href: "#content", children: "Skip to content" }),
    /* @__PURE__ */ jsx5(navigate_default, { manu: menu, fixed: !0 }),
    /* @__PURE__ */ jsx5("main", { id: "content", children }),
    /* @__PURE__ */ jsx5(footer_default, {})
  ] });
}
function PageHero({
  eyebrow,
  title,
  lede,
  image,
  meta: meta28,
  actions,
  tall
}) {
  return /* @__PURE__ */ jsxs4(
    "header",
    {
      className: `hero${tall ? " hero--tall" : ""}`,
      style: image ? { backgroundImage: `url("${image}")` } : void 0,
      children: [
        /* @__PURE__ */ jsx5("div", { className: "hero__inner", children: /* @__PURE__ */ jsxs4("div", { className: "container container--wide", children: [
          eyebrow && /* @__PURE__ */ jsx5("span", { className: "eyebrow eyebrow--on-dark", children: eyebrow }),
          /* @__PURE__ */ jsx5("h1", { className: "hero__title", children: title }),
          lede && /* @__PURE__ */ jsx5("p", { className: "hero__lede", children: lede }),
          actions && /* @__PURE__ */ jsx5("div", { className: "btn-row", children: actions }),
          meta28 && meta28.length > 0 && /* @__PURE__ */ jsx5("div", { className: "hero__meta", children: meta28.map((item) => /* @__PURE__ */ jsxs4("div", { className: "hero__meta-item", children: [
            /* @__PURE__ */ jsxs4("span", { className: "hero__meta-value", children: [
              item.value,
              item.unit && /* @__PURE__ */ jsx5("span", { className: "stat__unit", children: item.unit })
            ] }),
            /* @__PURE__ */ jsx5("span", { className: "hero__meta-label", children: item.label }),
            item.note && /* @__PURE__ */ jsx5("span", { className: `stat__note${item.live ? " stat__note--live" : ""}`, children: item.note })
          ] }, item.label)) })
        ] }) }),
        /* @__PURE__ */ jsx5("div", { className: "hero__spectrum" })
      ]
    }
  );
}
function Section({
  id,
  eyebrow,
  title,
  alt,
  center,
  wide,
  children
}) {
  return /* @__PURE__ */ jsx5("section", { className: `section${alt ? " section--alt" : ""}`, id, children: /* @__PURE__ */ jsxs4("div", { className: `container${wide ? " container--wide" : ""}`, children: [
    (eyebrow || title) && /* @__PURE__ */ jsxs4("div", { className: `section-title${center ? " section-title--center" : ""}`, children: [
      eyebrow && /* @__PURE__ */ jsx5("span", { className: "eyebrow", children: eyebrow }),
      title && /* @__PURE__ */ jsx5("h2", { children: title })
    ] }),
    children
  ] }) });
}
function LiveBadge({
  live,
  updated,
  interval,
  onDark
}) {
  let when = updated ? new Date(updated).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC"
  }) + " UTC" : null;
  return /* @__PURE__ */ jsxs4(
    "span",
    {
      className: `live-badge${live ? "" : " live-badge--stale"}${onDark ? " live-badge--on-dark" : ""}`,
      role: "status",
      children: [
        /* @__PURE__ */ jsx5("span", { className: "live-badge__dot", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs4("span", { className: "live-badge__text", children: [
          live ? "Live data" : "Stored copy",
          when && /* @__PURE__ */ jsxs4("span", { className: "live-badge__when", children: [
            " \xB7 ",
            when
          ] }),
          live && interval && /* @__PURE__ */ jsxs4("span", { className: "live-badge__when", children: [
            " \xB7 refreshed ",
            interval
          ] })
        ] })
      ]
    }
  );
}
function StatGrid({ items, onDark }) {
  return /* @__PURE__ */ jsx5("div", { className: `stat-grid${onDark ? " stat-grid--on-dark" : ""}`, children: items.map((item) => /* @__PURE__ */ jsxs4("div", { className: "stat", children: [
    /* @__PURE__ */ jsxs4("span", { className: "stat__value", children: [
      item.value,
      item.unit && /* @__PURE__ */ jsx5("span", { className: "stat__unit", children: item.unit })
    ] }),
    /* @__PURE__ */ jsx5("span", { className: "stat__label", children: item.label }),
    item.note && /* @__PURE__ */ jsx5("span", { className: `stat__note${item.live ? " stat__note--live" : ""}`, children: item.note })
  ] }, item.label)) });
}
function SpecTable({
  caption,
  groups
}) {
  return /* @__PURE__ */ jsx5("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs4("table", { className: "spec-table", children: [
    caption && /* @__PURE__ */ jsx5("caption", { children: caption }),
    /* @__PURE__ */ jsx5("tbody", { children: groups.map((group) => /* @__PURE__ */ jsxs4(React2.Fragment, { children: [
      /* @__PURE__ */ jsx5("tr", { className: "spec-group", children: /* @__PURE__ */ jsx5("th", { colSpan: 2, children: group.group }) }),
      group.rows.map((row) => /* @__PURE__ */ jsxs4("tr", { children: [
        /* @__PURE__ */ jsx5("th", { scope: "row", children: row[0] }),
        /* @__PURE__ */ jsx5("td", { children: row[1] })
      ] }, row[0]))
    ] }, group.group)) })
  ] }) });
}
function SimpleTable({
  caption,
  rows
}) {
  return /* @__PURE__ */ jsx5("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs4("table", { className: "spec-table", children: [
    caption && /* @__PURE__ */ jsx5("caption", { children: caption }),
    /* @__PURE__ */ jsx5("tbody", { children: rows.map((row) => /* @__PURE__ */ jsxs4("tr", { children: [
      /* @__PURE__ */ jsx5("th", { scope: "row", children: row[0] }),
      /* @__PURE__ */ jsx5("td", { children: row[1] })
    ] }, row[0])) })
  ] }) });
}
function NextLinks({
  title,
  links: links3
}) {
  return /* @__PURE__ */ jsxs4("div", { children: [
    title && /* @__PURE__ */ jsx5("span", { className: "eyebrow", children: title }),
    /* @__PURE__ */ jsx5("div", { className: "chip-row", children: links3.map((link) => /* @__PURE__ */ jsx5(Link3, { className: "chip", to: link.href, children: link.label }, link.label)) })
  ] });
}

// app/routes/content/text.tsx
var mainText1 = "The 7-Dimensional Sky Survey (7DS) is a medium-band survey of the southern sky. It is carried out with the 7-Dimensional Telescope (7DT), an array of twenty 50-cm telescopes at El Sauce Observatory in Chile, built and operated by the Center for the Gravitational-wave Universe at Seoul National University. Each unit carries a share of a forty-filter medium-band set, so a single visit records a low-resolution spectrum of every source in 1.25 square degrees. As of now, sixteen units and thirty-five filters are in routine operation.", mainText2 = "A medium-band spectral energy distribution for every source in the field supports a wide range of science from one data product: how galaxies assemble and cease forming stars, where the heavy elements are produced, the expansion rate of the Universe, accretion onto black holes, the variability of young stars, and the composition of small solar-system bodies. 7DS was designed to identify gravitational-wave counterparts; the same images serve the rest.", mainText3 = "7DS comprises three surveys that trade area against depth and cadence: a single-visit reference map of the southern sky, a time-domain survey on a 10-14 day cadence, and nightly monitoring of a deep field at the south ecliptic pole. All three use the same tiling of the sky, so their data coadd directly.", mainText4 = "Twenty DeltaRho 500 units on direct-drive mounts, sixteen currently observing, one control computer per operational telescope, a scheduler that can interrupt the night and begin a follow-up exposure in under a minute, and a pipeline that reduces a 3,000-image night the same day. The array is built to observe a transient while it is still bright.", surveyIntroText = "7DS is a spectral-mapping survey of the southern sky. Rather than measuring a few broadband colors, it images through medium-band filters of about 25 nm width, so each visit yields a spectral energy distribution at R = 30-70 for every source in the field. Applied over 23,000 square degrees, this produces a homogeneous low-resolution spectroscopic map of the southern sky, and applied repeatedly it measures how those spectra change with time.", aboutMotivationText = "Most optical surveys measure a source in a few broad bands, which constrains its spectrum only weakly. Identifying what a source is \u2014 and, for anything that varies, what is changing about it \u2014 then requires spectroscopic follow-up on a larger telescope, which is expensive and cannot be applied to more than a small fraction of detections. The result is a large gap between the number of sources a survey finds and the number it can characterize.", aboutMotivationText2 = "7DS closes that gap by putting the spectral information into the survey itself. Imaging through a set of medium bands rather than a few broad ones gives every source a low-resolution spectrum at the moment it is detected, for the whole field at once and without follow-up. The immediate motivation was the search for optical counterparts to gravitational-wave events, where candidates must be classified quickly and in large numbers; the same capability applies to any survey question that depends on knowing what a source is rather than only how bright it is.", aboutApproachText = "The survey combines two capabilities that are usually separate. Spectral mapping: each visit samples the spectrum of every source in a 1.25 square-degree field at R = 30-70 between 375 and 875 nm, which is enough to locate the 4000 Angstrom break and strong emission lines, and so to estimate redshifts and stellar populations directly from imaging. Time domain: the same field can be revisited on cadences from one day to two weeks, so the spectral measurement becomes a time series rather than a single epoch.", aboutApproachText2 = "Sampling a spectrum at this resolution costs exposures: a full medium-band set is many more frames than a broadband survey takes for the same field. The array is what makes that affordable, and the trade is set out under the telescope and the survey design.", aboutText3 = "The name counts the measured axes of the data. Two of position on the sky, one of brightness, one of wavelength and one of time come directly from the observations; distance and radial velocity are derived from the medium-band spectral energy distribution. A single visit therefore records where a source is, how bright it is, what its spectrum looks like, and how both change with time.", scienceOverviewText = "Two capabilities define what 7DS can answer. The first is spectral mapping: every visit samples the spectrum of every source in the field at R = 30-70 across 375 to 875 nm. That is coarse compared with a spectrograph, but it resolves the 4000 Angstrom break, strong emission lines and broad continuum features, and it applies to every object in 1.25 square degrees at once rather than to the few that fit on a slit.", scienceOverviewText2 = "The second is the time domain. Because the spectral measurement is made by imaging, it can be repeated: the same field is revisited on cadences from one night to two weeks, so what is measured is not a spectrum but its evolution. Questions that need both at once \u2014 what a transient is while it is still bright, how an active galactic nucleus responds to its own variability, how a young star changes from night to night \u2014 are the ones this survey is built for.", surveyOverviewText = "7DS is the science program of 7DT. It comprises three surveys distinguished by area, cadence and depth: the Reference Imaging Survey (RIS), the Wide-area Time-domain Survey (WTS) and the Intensive Monitoring Survey (IMS). Across the three, area decreases and depth increases \u2014 from a single visit to the whole southern sky, to nightly observation of one field \u2014 while all three use the same instrument and the same tiling.", surveyTilingText = "All 7DS observations use a common set of fixed pointings, generated from a HEALPix pixelization of the celestial sphere. Adjacent pointings overlap by about 5 arcminutes in right ascension and 4 arcminutes in declination near the celestial equator, and by more toward the poles. Tiles are numbered T00000 to T28519 in order of increasing declination, covering everything accessible to the array from the south celestial pole to +30 degrees.", surveyTilingText2 = "This tiling is the operational reference for the whole program. WTS and IMS point at the same tile centers, and target-of-opportunity observations use them wherever the field allows. Because all three surveys share it, data from any of them coadd directly with data from the others and difference imaging always runs against a consistent reference. A visit is three consecutive 100-second exposures coadded to a 300-second frame; the exposure length is set by the unguided tracking capability of the mount and the read noise of the detector.", telescopeOverviewText = "7DT is an array of twenty 50-cm commercial off-the-shelf telescopes. Each unit is a PlaneWave DeltaRho 500 optical tube assembly on an L-500 direct-drive mount in equatorial configuration, paired with a Moravian Instruments C3-61000 PRO CMOS camera. Units are identical except for the filters they carry. Sixteen of the twenty are deployed and operational as of June 2026; the remaining four complete the array. All operational units share a common configuration and show consistent optical performance in routine use.", arrayDesignText = "Twenty commercial 50-cm units, each carrying a different share of the forty-filter medium-band set, cost a fraction of a purpose-built instrument, can be brought on line in stages, and can be reconfigured between science goals without hardware changes. Pointed together the units build a spectrum of one field; pointed apart they cover 25 square degrees at once.", arrayDesignText2 = "Other multi-telescope arrays \u2014 GOTO, BlackGEM, LAST \u2014 take the same approach to off-the-shelf optics. What distinguishes 7DT is the filter set placed in front of them: 40 medium bands of about 25 nm width spanning 375 to 900 nm, distributed across the array so that the full set is covered in a small number of exposures.", locationText = "El Sauce Observatory sits in the Rio Hurtado Valley of Chile at 30 deg 28 min 16 sec South, 70 deg 45 min 47 sec West, 1,600 m above sea level. It neighbors the sites of Cerro Tololo Inter-American Observatory, Gemini South, the Southern Astrophysical Research Telescope and the Vera C. Rubin Observatory, and shares their sky conditions: typical seeing of about 1.5 arcseconds, more than 300 clear nights a year, and a mean zenith sky brightness of 21.97 mag per square arcsecond. Site infrastructure and maintenance are provided by ObsTech, a Chilean telescope hosting company.", opticText = "Each unit is a PlaneWave DeltaRho 500, a corrected Cassegrain of 508 mm aperture with a focal length of 1,537 mm and a focal ratio of f/3.0. The design delivers a 70 mm image circle covering approximately 2.6 degrees - fast optics over a field far wider than a conventional research telescope of the same aperture. Optomechanical alignment of all sixteen operational units is complete, and image quality is monitored continuously through routine survey operations rather than in scheduled campaigns.", mountText = "The DeltaRho 500 rides on a PlaneWave L-500 mount operated in equatorial configuration. Its direct-drive motors reach a slew rate of 20 degrees per second and sustain unguided tracking longer than the 100-second exposure used for survey work. Polar alignment is maintained through pointing models built by PWI4 from 40 to 50 sky points, and pointing and tracking accuracies are monitored continuously, with models refreshed when required.", cameraText = "Each unit carries a Moravian Instruments C3-61000 PRO. Its back-illuminated SONY IMX455 CMOS sensor measures 36 by 24 mm with 9,576 by 6,388 pixels of 3.76 micron pitch. At the DeltaRho focal plane this gives a field of view of 1.34 by 0.90 degrees at a pixel scale of 0.5 arcseconds - about 1.25 square degrees of spectral mapping per pointing. Bias levels are consistent with the manufacturer specification of roughly 3.5 electrons RMS, and the horizontal pattern characteristic of CMOS detectors is present but stable.", filterText = "Every unit carries a nine-slot filter wheel. Three slots in each wheel hold Sloan g, r and i; one unit adds u and three units add z. The remaining slots hold medium-band filters, distributed across the array so that the full set is covered in a small number of exposures. The original twenty medium bands are spaced regularly at 25 nm from 400 to 875 nm with 25 nm FWHM. Fifteen more, procured from Edmund Optics and installed in late 2025, fill the gaps between them with central wavelengths from 412 to 832 nm and bandwidths of 14 to 41 nm. The current suite of 35 filters covers 375 to 875 nm, advancing toward the designed complement of 40 medium bands at 12.5 nm spacing.", filterCaveatText = "The additional fifteen filters depart from the regularity of the original set: their central wavelengths are not precisely aligned to the 12.5 nm grid, their bandwidths vary, and no filter between 700 and 800 nm is included in the second batch. These departures reflect availability and will be addressed as the remaining five filters become available. Their spectrophotometric calibration is in preparation; the original twenty remain the calibrated set in operational use.", performanceText = "Across the sixteen operational units the point-spread function measured at field center on good nights ranges from 1.4 to 2.2 arcseconds FWHM, with an array median of 2.0 arcseconds closely tracking the median site seeing. Unit-to-unit scatter in delivered FWHM is 0.2 arcseconds, and the PSF grows by 0.3 arcseconds from field center to corner while ellipticity stays below 0.1 over the central 80 percent of the field. Delivered image quality is therefore consistent across the array. Median delivered FWHM has held stable to within 0.3 arcseconds since routine survey operations began in July 2024.", photometryText = "Photometric calibration runs against synthetic photometry derived from Gaia DR3 BP/RP spectra, homogenized to correct the color- and magnitude-dependent residuals reported by the Gaia collaboration. The procedure was established during commissioning on 68 spectrophotometric standard stars, including CALSPEC sources, with non-variable point sources selected following criteria adapted from SkyMapper DR4. Zero-point uncertainty across the twenty medium bands in operational use is 15 to 25 mmag, with the larger values redward of 775 nm where detector quantum efficiency falls and signal-to-noise drops accordingly.", depthText = "For the canonical 100-second exposure the 5-sigma point-source depth reaches 19.06 mag in the bluest medium band (m400) and 16.60 mag at the longest wavelength (m875), peaking at 19.61 mag in m475 near maximum system throughput. The Sloan broad bands reach 20.59, 20.25 and 19.17 mag in g, r and i. These are nominal-condition figures: seeing better than 2.0 arcseconds, airmass below 1.5, and non-bright nights.", modeText = "Because each unit carries its own filter complement, the array can be reconfigured between science goals without changing hardware. The full spectral range is covered by assigning different filter combinations to individual units and rotating through them during an observation. Four modes are in routine use; the choice between them trades spectral sampling, depth and sky coverage against one another.", computingText = "On-site computing consists of sixteen Telescope Control Computers, one per operational unit, and a single Main Control Computer that coordinates the array. Each TCC drives its own mount, camera, focuser and filter wheel and writes exposures to local storage as they complete. The MCC dispatches observation commands through RTCSpy, aggregates data from every TCC, and manages transfer to the processing facility at Seoul National University over KREONET.", storageText = "A typical night yields about 3,000 raw frames of roughly 117 MiB each, some 350 GB before compression. Raw data are compressed on site and transferred by GridFTP at a typical 80 MB/s, a procedure that usually completes in under twelve hours; target-of-opportunity data skip the compression and the wait for sunrise, cutting latency to tens of minutes. Storage is provided by a growing set of servers named for the hydrogen transition series. Two are in service \u2014 Lyman, with two 1.2 PB volumes, and Balmer, with one \u2014 for a current capacity of about 3.6 PB, and further servers are added as the archive grows. Each is attached to the compute server as an NFS mount over a 10 Gbps class network, so that I/O buffering does not burden processing.", protonText = "All 7DT data are reduced on Proton, a dedicated server with dual AMD EPYC 7513 processors providing 128 cores at up to 2.6 GHz, 512 GB of memory, and two NVIDIA A100 GPUs sharing memory over NVLink. A nightly volume of roughly 3,000 raw images requires an effective per-image processing time of about 30 seconds to complete within the daily budget; the current pipeline sustains a median end-to-end throughput of 66 \xB1 24 GB per hour and clears a typical survey night in about five hours of wall-clock time after transfer completes. GPU acceleration is available for preprocessing, though in this deployment the throughput gain over the CPU path is minimal \u2014 the pipeline is bound by I/O rather than by computation.";
var dataProductText = "The basic data product of the survey is a 300-second coadd of three 100-second exposures, with a source catalog attached to every processed single, coadd and difference image. Coadds are flux-scaled to a zero point of 23.9 AB magnitudes, which puts each pixel directly in units of microjansky - a convenient convention for the pixel-based, IFU-like analysis that medium-band data invite. Quality-assurance metrics including seeing, ellipticity, 5-sigma depth and astrometric precision are written to FITS headers and ingested into the database for every image produced.";
var softwareReuseText = "Beyond its pipeline role, Py7DT is structured for offline reuse. Researchers inside and outside the 7DT team can run the same codebase to reprocess data with custom configurations, resuming from any stage of the reduction, and choose for themselves how far to trust the standard products. Images are passed through the pipeline as string paths with metadata in FITS headers and YAML files, rather than wrapped in a bespoke data model, which keeps products inspectable outside the pipeline and lowers the cost of learning to process 7DT data.", fundingGWText = "The 7-Dimensional Telescope is designed, built and operated by the Center for the Gravitational-wave Universe at Seoul National University. The Center is supported by National Research Foundation of Korea (MSIT).", fundingNRFText = "Further project support is provided by the National Research Foundation of Korea (MSIT). Several members of the collaboration are additionally supported by individual NRF awards; those grants support the researchers rather than the facility, and are acknowledged in their own papers.", fundingKASIText = "7DT is operated in part with support from special funding of the Korea Astronomy and Space Science Institute (KASI).", fundingKreonetText = "Nightly transfer of roughly 350 GB of raw data from Chile to the processing facility in Seoul is carried by KREONET, the Korea Research Environment Open NETwork, operated by KISTI, the Korea Institute of Science and Technology Information. The 7DT project gratefully acknowledges this support, without which same-day reduction of survey and target-of-opportunity data would not be possible.", publicationPolicyText = "The 7DS publication policy governs authorship, data rights and the acknowledgment of 7DT observations in refereed work. It is being prepared by the collaboration and will be posted here once ratified. In the meantime, anyone intending to publish results based on 7DT data is asked to contact the principal investigator so that the appropriate collaboration authors and funding acknowledgments can be agreed in advance.";

// app/routes/telescope.instrument.tsx
import { Fragment, jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var meta = () => [
  { title: "Instrument \xB7 7-Dimensional Telescope" },
  {
    name: "description",
    content: "Optics, mount, camera and the 35-filter medium-band set of the 7-Dimensional Telescope."
  }
], OPTICS = [
  ["Model", "PlaneWave DeltaRho 500"],
  ["Design", "Corrected Cassegrain"],
  ["Primary diameter", "50.8 cm"],
  ["Focal length", "1537 mm"],
  ["Focal ratio", "f/3.0"],
  ["Image circle", "70 mm (\u2248 2.6\xB0)"]
], MOUNT = [
  ["Model", "PlaneWave L-500"],
  ["Drive", "Direct drive, equatorial"],
  ["Slew rate", "20 deg s\u207B\xB9"],
  ["Unguided tracking", "> 100 s"],
  ["Pointing model", "PWI4, 40\u201350 sky points"]
], CAMERA = [
  ["Model", "Moravian C3-61000 PRO"],
  ["Sensor", "SONY IMX455 back-illuminated CMOS"],
  ["Sensor size", "36 \xD7 24 mm"],
  ["Dimension", "9576 \xD7 6388 pixels"],
  ["Pixel size", "3.76 \xB5m"],
  ["Pixel scale", "0.5 arcsec"],
  ["Field of view", "1.34\xB0 \xD7 0.90\xB0"],
  ["Operating temperature", "\u221210 \xB0C"]
], FILTERS = [
  ["Filter wheel", "9 slots per unit"],
  ["Sloan g, r, i", "Every unit"],
  ["Sloan u", "1 unit"],
  ["Sloan z", "3 units"],
  ["Medium bands installed", "35 of 40 planned"],
  ["Wavelength coverage", "375\u2013875 nm"],
  ["FWHM", "14\u201341 nm (typ. 25\u201330)"],
  ["Manufacturers", "Chroma (broad), Edmund Optics (medium)"]
], Index = () => /* @__PURE__ */ jsxs5(PageLayout, { menu: "manu7dt", children: [
  /* @__PURE__ */ jsx6(
    PageHero,
    {
      eyebrow: "Telescope",
      title: /* @__PURE__ */ jsxs5(Fragment, { children: [
        "Instrument ",
        /* @__PURE__ */ jsx6("em", { children: "specification" })
      ] }),
      lede: "All twenty units are identical in optics, mount and camera. They differ only in the filters they carry, which is what allows the array to cover the full medium-band set in a few exposures.",
      image: "/img/hero/instrument.jpg"
    }
  ),
  /* @__PURE__ */ jsx6(Section, { eyebrow: "01", title: "Optical tube assembly", children: /* @__PURE__ */ jsxs5("div", { className: "split split--wide-text", children: [
    /* @__PURE__ */ jsx6("p", { className: "prose", children: opticText }),
    /* @__PURE__ */ jsx6(SimpleTable, { caption: "DeltaRho 500", rows: OPTICS })
  ] }) }),
  /* @__PURE__ */ jsx6(Section, { eyebrow: "02", title: "Mount", alt: !0, children: /* @__PURE__ */ jsxs5("div", { className: "split split--wide-text", children: [
    /* @__PURE__ */ jsx6("p", { className: "prose", children: mountText }),
    /* @__PURE__ */ jsx6(SimpleTable, { caption: "L-500 mount", rows: MOUNT })
  ] }) }),
  /* @__PURE__ */ jsx6(Section, { eyebrow: "03", title: "Camera", children: /* @__PURE__ */ jsxs5("div", { className: "split split--wide-text", children: [
    /* @__PURE__ */ jsx6("p", { className: "prose", children: cameraText }),
    /* @__PURE__ */ jsx6(SimpleTable, { caption: "C3-61000 PRO", rows: CAMERA })
  ] }) }),
  /* @__PURE__ */ jsxs5(Section, { eyebrow: "04", title: "Filters", alt: !0, children: [
    /* @__PURE__ */ jsxs5("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx6("p", { className: "prose", children: filterText }),
        /* @__PURE__ */ jsx6("p", { className: "prose", children: filterCaveatText })
      ] }),
      /* @__PURE__ */ jsx6(SimpleTable, { caption: "Filter complement", rows: FILTERS })
    ] }),
    /* @__PURE__ */ jsxs5("p", { className: "note", style: { marginTop: "1.5rem" }, children: [
      "Filters are designated by central wavelength in nanometers \u2014 m400 is the band centered at 400 nm. System response curves, which fold in detector quantum efficiency, sky transmission and telescope optics, are shown under",
      " ",
      /* @__PURE__ */ jsx6(Link4, { to: "/users/status", children: "status and overview" }),
      "; photometric calibration and its accuracy are reported on the ",
      /* @__PURE__ */ jsx6(Link4, { to: "/users/performance", children: "performance page" }),
      "."
    ] })
  ] }),
  /* @__PURE__ */ jsx6(Section, { eyebrow: "On sky", title: "What the filter set looks like", children: /* @__PURE__ */ jsxs5("div", { className: "split", children: [
    /* @__PURE__ */ jsxs5("figure", { className: "figure", children: [
      /* @__PURE__ */ jsx6("img", { src: "/img/NGC7293.gif", alt: "The Helix Nebula through successive 7DT medium bands", loading: "lazy" }),
      /* @__PURE__ */ jsxs5("figcaption", { children: [
        /* @__PURE__ */ jsx6("b", { children: "NGC 7293" }),
        " The Helix Nebula, band by band across the medium-band set."
      ] })
    ] }),
    /* @__PURE__ */ jsxs5("figure", { className: "figure", children: [
      /* @__PURE__ */ jsx6("img", { src: "/img/NGC0253.gif", alt: "The Sculptor Galaxy through successive 7DT medium bands", loading: "lazy" }),
      /* @__PURE__ */ jsxs5("figcaption", { children: [
        /* @__PURE__ */ jsx6("b", { children: "NGC 253" }),
        " The Sculptor Galaxy, band by band across the medium-band set."
      ] })
    ] })
  ] }) })
] }), telescope_instrument_default = Index;

// app/routes/publication.policy.tsx
var publication_policy_exports = {};
__export(publication_policy_exports, {
  default: () => publication_policy_default,
  meta: () => meta2
});
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var meta2 = () => [
  { title: "Publication policy \xB7 7-Dimensional Telescope" },
  { name: "description", content: "Authorship, data rights and acknowledgment for work using 7DT data." }
], Index2 = () => /* @__PURE__ */ jsxs6(PageLayout, { menu: "manuPaper", children: [
  /* @__PURE__ */ jsx7(
    PageHero,
    {
      eyebrow: "Publications",
      title: "Publication policy",
      lede: "How authorship, data rights and acknowledgment are handled for work based on 7DT observations.",
      image: "/img/hero/policy.jpg"
    }
  ),
  /* @__PURE__ */ jsxs6(Section, { eyebrow: "Status", title: "In preparation", children: [
    /* @__PURE__ */ jsx7("p", { className: "prose", children: publicationPolicyText }),
    /* @__PURE__ */ jsxs6("div", { className: "panel", style: { marginTop: "2rem", maxWidth: "68ch" }, children: [
      /* @__PURE__ */ jsx7("div", { className: "panel__title", children: "In the meantime" }),
      /* @__PURE__ */ jsxs6("ul", { className: "prose", style: { paddingLeft: "1.25rem", margin: 0 }, children: [
        /* @__PURE__ */ jsxs6("li", { children: [
          "Contact the principal investigator at",
          " ",
          /* @__PURE__ */ jsx7("a", { href: "mailto:mim@astro.snu.ac.kr", children: "mim@astro.snu.ac.kr" }),
          " before submitting."
        ] }),
        /* @__PURE__ */ jsxs6("li", { children: [
          "Acknowledge the Center for the Gravitational-wave Universe at Seoul National University and the funding bodies set out on the",
          " ",
          /* @__PURE__ */ jsx7("a", { href: "/about/funding", children: "funding" }),
          " page."
        ] }),
        /* @__PURE__ */ jsxs6("li", { children: [
          "Cite the instrument and pipeline papers listed under",
          " ",
          /* @__PURE__ */ jsx7("a", { href: "/publication/list", children: "publications" }),
          "."
        ] })
      ] })
    ] })
  ] })
] }), publication_policy_default = Index2;

// app/routes/telescope.computer.tsx
var telescope_computer_exports = {};
__export(telescope_computer_exports, {
  default: () => telescope_computer_default,
  meta: () => meta3
});
import { Link as Link5 } from "@remix-run/react";
import { Fragment as Fragment2, jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
var meta3 = () => [
  { title: "Computational resources \xB7 7-Dimensional Telescope" },
  {
    name: "description",
    content: "On-site control computers, the Proton processing server and the storage behind 7DT."
  }
], ONSITE = [
  ["Telescope control computers", "16, one per operational unit"],
  ["Main control computer", "1, array-level command hub"],
  ["Dispatch", "RTCSpy over real-time network"],
  ["Link to Korea", "KREONET"],
  ["Transfer protocol", "GridFTP, \u2248 80 MB s\u207B\xB9"],
  ["Typical transfer time", "< 12 hours (ToO: tens of minutes)"]
], PROTON = [
  ["CPU", "2 \xD7 AMD EPYC 7513"],
  ["Cores", "128 @ up to 2.6 GHz"],
  ["Memory", "512 GB (8 \xD7 64 GB)"],
  ["GPU", "2 \xD7 NVIDIA A100, 82 GB VRAM"],
  ["GPU interconnect", "NVLink"],
  ["Target throughput", "\u2248 30 s per image"]
], STORAGE = [
  ["Naming", "Hydrogen transition series \u2014 Lyman, Balmer, \u2026"],
  ["Lyman", "2 \xD7 1.2 PB (RAID 60)"],
  ["Balmer", "1 \xD7 1.2 PB, extensible"],
  ["Current capacity", "\u2248 3.6 PB, extended as required"],
  ["Attachment", "NFS over 10 Gbps class network"],
  ["Nightly inflow", "\u2248 350 GB (\u2248 3,000 \xD7 117 MiB)"]
], Index3 = () => /* @__PURE__ */ jsxs7(PageLayout, { menu: "manu7dt", children: [
  /* @__PURE__ */ jsx8(
    PageHero,
    {
      eyebrow: "Telescope",
      title: /* @__PURE__ */ jsxs7(Fragment2, { children: [
        /* @__PURE__ */ jsx8("em", { children: "Computational" }),
        " resources"
      ] }),
      lede: "About 350 GB of raw data are produced each night, transferred from Chile to Seoul and reduced the same day.",
      image: "/img/hero/computer.jpg",
      meta: [
        { value: "128", label: "CPU cores" },
        { value: "2", unit: "\xD7 A100", label: "GPUs" },
        { value: "3.6", unit: "PB", label: "Storage" },
        { value: "66 \xB1 24", unit: "GB/hr", label: "Pipeline throughput" }
      ]
    }
  ),
  /* @__PURE__ */ jsx8(Section, { eyebrow: "On site", title: "Control computers in Chile", children: /* @__PURE__ */ jsxs7("div", { className: "split split--wide-text", children: [
    /* @__PURE__ */ jsx8("p", { className: "prose", children: computingText }),
    /* @__PURE__ */ jsx8(SimpleTable, { caption: "On-site infrastructure", rows: ONSITE })
  ] }) }),
  /* @__PURE__ */ jsx8(Section, { eyebrow: "Processing", title: "Proton", alt: !0, children: /* @__PURE__ */ jsxs7("div", { className: "split split--wide-text", children: [
    /* @__PURE__ */ jsx8("p", { className: "prose", children: protonText }),
    /* @__PURE__ */ jsx8(SimpleTable, { caption: "Processing server", rows: PROTON })
  ] }) }),
  /* @__PURE__ */ jsxs7(Section, { eyebrow: "Storage", title: "Storage servers", children: [
    /* @__PURE__ */ jsxs7("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsx8("p", { className: "prose", children: storageText }),
      /* @__PURE__ */ jsx8(SimpleTable, { caption: "Storage servers", rows: STORAGE })
    ] }),
    /* @__PURE__ */ jsx8("div", { style: { marginTop: "2.5rem" }, children: /* @__PURE__ */ jsx8(
      StatGrid,
      {
        items: [
          { value: "\u2248 3,000", label: "Images per night" },
          { value: "\u2248 5", unit: "hr", label: "To reduce a night" },
          { value: "\u2248 350", unit: "GB", label: "Nightly inflow" },
          { value: "1.75", unit: "M", label: "Images archived" }
        ]
      }
    ) })
  ] }),
  /* @__PURE__ */ jsxs7(Section, { eyebrow: "Facility", title: "The processing center", alt: !0, children: [
    /* @__PURE__ */ jsxs7("figure", { className: "figure", style: { maxWidth: "760px" }, children: [
      /* @__PURE__ */ jsx8("img", { src: "/img/computer.jpeg", alt: "The 7DT data processing facility at Seoul National University", loading: "lazy" }),
      /* @__PURE__ */ jsxs7("figcaption", { children: [
        /* @__PURE__ */ jsx8("b", { children: "Proton" }),
        " The dedicated reduction server at Seoul National University, where all 7DT data are processed."
      ] })
    ] }),
    /* @__PURE__ */ jsxs7("div", { className: "btn-row", style: { marginTop: "2rem" }, children: [
      /* @__PURE__ */ jsx8(Link5, { className: "btn btn--primary", to: "/users/software", children: "Reduction software" }),
      /* @__PURE__ */ jsx8(Link5, { className: "btn btn--secondary", to: "/users/access#format", children: "Data products" })
    ] })
  ] })
] }), telescope_computer_default = Index3;

// app/routes/telescope.location.tsx
var telescope_location_exports = {};
__export(telescope_location_exports, {
  default: () => telescope_location_default,
  links: () => links2,
  meta: () => meta4
});
import { useEffect as useEffect2, useState as useState2 } from "react";
import { Link as Link6 } from "@remix-run/react";
import { Carousel } from "react-bootstrap";

// node_modules/bootstrap/dist/css/bootstrap.min.css
var bootstrap_min_default = "/build/_assets/bootstrap.min-TQVI2G2N.css";

// app/routes/telescope.location.tsx
import { Fragment as Fragment3, jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
var links2 = () => [{ rel: "stylesheet", href: bootstrap_min_default }], meta4 = () => [
  { title: "Location \xB7 7-Dimensional Telescope" },
  {
    name: "description",
    content: "El Sauce Observatory, R\xEDo Hurtado Valley, Chile \u2014 the site of the 7-Dimensional Telescope."
  }
], IMAGES = ["c1.jpg", "c2.jpg", "c3.jpg", "c4.jpg", "c5.jpg", "c6.jpg", "c7.jpg"], CAPTIONS = [
  "Site preparation and pier foundations above the R\xEDo Hurtado Valley",
  "The roll-off enclosure erected over the instrument deck, before installation",
  "Inside the closed enclosure: DeltaRho 500 units parked on their piers",
  "The roof rolled open at dusk, units stowed and ready for the night",
  "Members of the 7DT team and ObsTech site staff on the instrument deck",
  "The deck from above \u2014 installed units alongside piers still awaiting theirs",
  "The array working under the southern Milky Way"
], SITE = [
  ["Observatory", "El Sauce, R\xEDo Hurtado Valley"],
  ["Latitude", "30\xB0 28\u2032 16\u2033 S"],
  ["Longitude", "70\xB0 45\u2032 47\u2033 W"],
  ["Altitude", "1600 m"],
  ["Median seeing", "\u2248 1.5 arcsec"],
  ["Clear nights", "> 300 per year"],
  ["Zenith sky brightness", "21.97 mag arcsec\u207B\xB2"],
  ["Site operator", "ObsTech"]
], NEIGHBOURS = [
  "Cerro Tololo Inter-American Observatory",
  "Gemini South Telescope",
  "Southern Astrophysical Research Telescope",
  "Vera C. Rubin Observatory"
], Index4 = () => {
  let [index, setIndex] = useState2(0), [paused, setPaused] = useState2(!1), [reduceMotion, setReduceMotion] = useState2(!1);
  useEffect2(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  let autoplay = !paused && !reduceMotion;
  return /* @__PURE__ */ jsxs8(PageLayout, { menu: "manu7dt", children: [
    /* @__PURE__ */ jsx9(
      PageHero,
      {
        eyebrow: "Telescope",
        title: /* @__PURE__ */ jsxs8(Fragment3, { children: [
          "7DT in ",
          /* @__PURE__ */ jsx9("em", { children: "Chile" })
        ] }),
        lede: "El Sauce Observatory, in the R\xEDo Hurtado Valley of Chile, at 1,600 m and close to Cerro Tololo, Gemini South and Rubin.",
        image: "/img/hero/location.jpg",
        meta: [
          { value: "1600", unit: "m", label: "Altitude" },
          { value: "1.5", unit: "\u2033", label: "Median seeing" },
          { value: "300", unit: "+", label: "Clear nights / yr" },
          { value: "21.97", label: "Sky brightness" }
        ]
      }
    ),
    /* @__PURE__ */ jsx9(Section, { eyebrow: "The site", title: "R\xEDo Hurtado Valley", children: /* @__PURE__ */ jsxs8("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsxs8("div", { children: [
        /* @__PURE__ */ jsx9("p", { className: "prose", children: locationText }),
        /* @__PURE__ */ jsx9("h3", { style: { marginTop: "2rem", fontSize: "1rem" }, children: "Neighbouring facilities" }),
        /* @__PURE__ */ jsx9("ul", { className: "prose", style: { paddingLeft: "1.25rem" }, children: NEIGHBOURS.map(
          (name) => /* @__PURE__ */ jsx9("li", { children: name }, name)
        ) })
      ] }),
      /* @__PURE__ */ jsx9(SimpleTable, { caption: "Site parameters", rows: SITE })
    ] }) }),
    /* @__PURE__ */ jsxs8("div", { className: "carousel-frame", children: [
      /* @__PURE__ */ jsx9(
        Carousel,
        {
          activeIndex: index,
          onSelect: (selected) => setIndex(selected),
          interval: autoplay ? 5e3 : null,
          fade: !reduceMotion,
          children: IMAGES.map(
            (image, i) => /* @__PURE__ */ jsx9(Carousel.Item, { children: /* @__PURE__ */ jsx9(
              "div",
              {
                className: "carousel-slide",
                style: { backgroundImage: `url(/img/carousel/${image})` },
                role: "img",
                "aria-label": `${CAPTIONS[i]} (${i + 1} of ${IMAGES.length})`
              }
            ) }, image)
          )
        }
      ),
      /* @__PURE__ */ jsx9(
        "button",
        {
          type: "button",
          className: "carousel-pause",
          "aria-pressed": paused,
          onClick: () => setPaused((p) => !p),
          children: paused || reduceMotion ? "\u25B6 Play" : "\u275A\u275A Pause"
        }
      )
    ] }),
    /* @__PURE__ */ jsx9("div", { className: "container container--wide", children: /* @__PURE__ */ jsx9("p", { className: "footnote", style: { padding: "0.75rem 0" }, children: CAPTIONS[index] }) }),
    /* @__PURE__ */ jsxs8(Section, { eyebrow: "On site", title: "Infrastructure", alt: !0, children: [
      /* @__PURE__ */ jsx9("p", { className: "prose", children: "Site infrastructure, enclosures and on-site computing hardware are maintained by ObsTech, a Chilean telescope hosting company. The array is controlled from sixteen telescope control computers and a single main control computer housed at the site; data are handed to the Korean processing facility over KREONET each night." }),
      /* @__PURE__ */ jsxs8("div", { className: "btn-row", style: { marginTop: "1.5rem" }, children: [
        /* @__PURE__ */ jsx9(Link6, { className: "btn btn--primary", to: "/telescope/computer", children: "Computational resources" }),
        /* @__PURE__ */ jsx9(Link6, { className: "btn btn--secondary", to: "/telescope/instrument", children: "Instrument" })
      ] })
    ] })
  ] });
}, telescope_location_default = Index4;

// app/routes/telescope.overview.tsx
var telescope_overview_exports = {};
__export(telescope_overview_exports, {
  default: () => telescope_overview_default,
  meta: () => meta5
});
import { Link as Link7 } from "@remix-run/react";

// app/routes/content/specs.json
var specs_default = {
  note: "7DT system specifications as of June 2026. Source: Kim et al., Proc. SPIE 14147-84, Table 1; Hyun et al., Proc. SPIE 14155-12, Sec. 2.",
  groups: [
    {
      group: "Array",
      rows: [
        ["Telescopes in the array", "20"],
        ["Currently operational", "16 (as of June 2026)"],
        ["Field of view per pointing", "\u2248 1.25 deg\xB2"],
        ["Spectral resolution", "R = 30\u201370"]
      ]
    },
    {
      group: "Unit telescope",
      rows: [
        ["OTA", "PlaneWave DeltaRho 500"],
        ["Optical design", "Corrected Cassegrain"],
        ["Primary diameter", "50.8 cm"],
        ["Focal length", "1537 mm"],
        ["Focal ratio", "f/3.0"],
        ["Image circle", "70 mm (\u2248 2.6\xB0)"],
        ["Mount", "PlaneWave L-500, direct drive"],
        ["Mount slew rate", "20 deg s\u207B\xB9"]
      ]
    },
    {
      group: "Camera & filters",
      rows: [
        ["Camera", "Moravian C3-61000 PRO"],
        ["Sensor", "SONY IMX455 back-illuminated CMOS"],
        ["Sensor size", "36 \xD7 24 mm"],
        ["Sensor dimension", "9576 \xD7 6388 pixels"],
        ["Pixel size", "3.76 \xB5m"],
        ["Pixel scale", "0.5 arcsec"],
        ["Field of view per unit", "1.34\xB0 \xD7 0.90\xB0"],
        ["Filter wheel", "9 slots per unit"],
        ["Broad bands", "Sloan u, g, r, i, z"],
        ["Medium-band filters (design)", "40"],
        ["Medium-band filters installed", "35 (as of June 2026)"],
        ["Wavelength coverage", "375\u2013875 nm"],
        ["Medium-band FWHM", "14\u201341 nm (typ. 25\u201330)"]
      ]
    },
    {
      group: "Site",
      rows: [
        ["Observatory", "El Sauce, R\xEDo Hurtado Valley, Chile"],
        ["Coordinates", "30\xB028\u203216\u2033 S, 70\xB045\u203247\u2033 W"],
        ["Altitude", "1600 m"],
        ["Median seeing", "\u2248 1.5 arcsec"],
        ["Clear nights", "> 300 per year"],
        ["Zenith sky brightness", "21.97 mag arcsec\u207B\xB2"]
      ]
    },
    {
      group: "Computing & storage",
      rows: [
        ["Processing server", "Proton \u2014 2 \xD7 AMD EPYC 7513"],
        ["CPU / memory", "128 cores @ 2.6 GHz / 512 GB"],
        ["GPU", "2 \xD7 NVIDIA A100, 82 GB (NVLink)"],
        ["Storage", "Lyman 2 \xD7 1.2 PB, Balmer 1.2 PB"],
        ["Total capacity", "\u2248 3.6 PB"],
        ["Data link", "KREONET, GridFTP \u2248 80 MB s\u207B\xB9"]
      ]
    }
  ],
  depths: {
    caption: "5\u03C3 point-source depth, single 100 s exposure, nominal conditions",
    rows: [
      ["m400 (bluest medium band)", "19.06 mag"],
      ["m475 (peak throughput)", "19.61 mag"],
      ["m875 (reddest medium band)", "16.60 mag"],
      ["Sloan g", "20.59 mag"],
      ["Sloan r", "20.25 mag"],
      ["Sloan i", "19.17 mag"]
    ]
  },
  performance: [
    { value: "1.4\u20132.2", unit: "\u2033", label: "PSF FWHM at center" },
    { value: "2.0", unit: "\u2033", label: "Array median FWHM" },
    { value: "0.2", unit: "\u2033", label: "Unit-to-unit scatter" },
    { value: "< 0.1", unit: "", label: "PSF ellipticity" },
    { value: "15\u201325", unit: "mmag", label: "Zero-point uncertainty" }
  ]
};

// app/routes/telescope.overview.tsx
import { Fragment as Fragment4, jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
var meta5 = () => [
  { title: "Telescope \xB7 7-Dimensional Telescope" },
  {
    name: "description",
    content: "The 7-Dimensional Telescope: twenty 50-cm units on direct-drive mounts with CMOS cameras and medium-band filter wheels, operated as one instrument."
  }
], Index5 = () => /* @__PURE__ */ jsxs9(PageLayout, { menu: "manu7dt", children: [
  /* @__PURE__ */ jsx10(
    PageHero,
    {
      eyebrow: "Telescope",
      title: /* @__PURE__ */ jsxs9(Fragment4, { children: [
        "The ",
        /* @__PURE__ */ jsx10("em", { children: "7DT" }),
        " array"
      ] }),
      lede: "Twenty 50-cm telescopes on direct-drive mounts, each with its own camera and filter wheel, operated as a single instrument.",
      image: "/img/hero/telescope.jpg",
      meta: [
        { value: "20", label: "Telescopes", note: "16 online", live: !0 },
        { value: "50.8", unit: "cm", label: "Primary diameter" },
        { value: "f/3.0", label: "Focal ratio" },
        { value: "1.34 \xD7 0.90", unit: "\xB0", label: "Field per unit" }
      ]
    }
  ),
  /* @__PURE__ */ jsx10(Section, { eyebrow: "Hardware", title: "What the array is made of", children: /* @__PURE__ */ jsxs9("div", { className: "split split--wide-text", children: [
    /* @__PURE__ */ jsxs9("div", { children: [
      /* @__PURE__ */ jsx10("p", { className: "prose", children: telescopeOverviewText }),
      /* @__PURE__ */ jsx10("div", { className: "table-wrap", style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsxs9("table", { className: "spec-table", children: [
        /* @__PURE__ */ jsx10("caption", { children: "Unit telescope, at a glance" }),
        /* @__PURE__ */ jsxs9("tbody", { children: [
          /* @__PURE__ */ jsxs9("tr", { children: [
            /* @__PURE__ */ jsx10("th", { scope: "row", children: "Optical tube" }),
            /* @__PURE__ */ jsx10("td", { children: "PlaneWave DeltaRho 500 \u2014 508 mm corrected Cassegrain, f/3.0" })
          ] }),
          /* @__PURE__ */ jsxs9("tr", { children: [
            /* @__PURE__ */ jsx10("th", { scope: "row", children: "Mount" }),
            /* @__PURE__ */ jsx10("td", { children: "PlaneWave L-500 direct drive, equatorial, 20 deg s\u207B\xB9 slew" })
          ] }),
          /* @__PURE__ */ jsxs9("tr", { children: [
            /* @__PURE__ */ jsx10("th", { scope: "row", children: "Camera" }),
            /* @__PURE__ */ jsx10("td", { children: "Moravian C3-61000 PRO \u2014 SONY IMX455 CMOS, 9576 \xD7 6388 px" })
          ] }),
          /* @__PURE__ */ jsxs9("tr", { children: [
            /* @__PURE__ */ jsx10("th", { scope: "row", children: "Filter wheel" }),
            /* @__PURE__ */ jsx10("td", { children: "9 slots per unit \u2014 Sloan broad bands and a share of 35 medium bands" })
          ] }),
          /* @__PURE__ */ jsxs9("tr", { children: [
            /* @__PURE__ */ jsx10("th", { scope: "row", children: "Field of view" }),
            /* @__PURE__ */ jsx10("td", { children: "1.34\xB0 \xD7 0.90\xB0 at 0.5\u2033 per pixel, 1.25 deg\xB2 per pointing" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs9("p", { className: "note", style: { marginTop: "1rem" }, children: [
        "Each subsystem is described in full under",
        " ",
        /* @__PURE__ */ jsx10(Link7, { to: "/telescope/instrument", children: "instrument" }),
        ". Measured on-sky performance is reported on the ",
        /* @__PURE__ */ jsx10(Link7, { to: "/users/performance", children: "performance page" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxs9("figure", { className: "figure", children: [
      /* @__PURE__ */ jsx10(
        "img",
        {
          src: "/img/images/Figure2_7DT.jpg",
          alt: "The 7-Dimensional Telescope array seen from the front",
          loading: "lazy"
        }
      ),
      /* @__PURE__ */ jsxs9("figcaption", { children: [
        /* @__PURE__ */ jsx10("b", { children: "DeltaRho 500" }),
        " Each unit is a 508 mm corrected Cassegrain on an L-500 direct-drive mount, with its own camera and filter wheel."
      ] })
    ] })
  ] }) }),
  /* @__PURE__ */ jsx10(Section, { eyebrow: "Design", title: "Why an array rather than one telescope", alt: !0, children: /* @__PURE__ */ jsxs9("div", { className: "split split--wide-text", children: [
    /* @__PURE__ */ jsxs9("div", { children: [
      /* @__PURE__ */ jsx10("p", { className: "prose", children: arrayDesignText }),
      /* @__PURE__ */ jsx10("p", { className: "prose", children: arrayDesignText2 })
    ] }),
    /* @__PURE__ */ jsxs9("figure", { className: "figure", children: [
      /* @__PURE__ */ jsx10(
        "img",
        {
          src: "/img/images/Figure1_7DT.jpeg",
          alt: "The 7-Dimensional Telescope array at El Sauce Observatory",
          loading: "lazy"
        }
      ),
      /* @__PURE__ */ jsxs9("figcaption", { children: [
        /* @__PURE__ */ jsx10("b", { children: "The array" }),
        " DeltaRho 500 units installed at El Sauce Observatory, R\xEDo Hurtado Valley, Chile."
      ] })
    ] })
  ] }) }),
  /* @__PURE__ */ jsxs9(Section, { eyebrow: "Specifications", title: "System summary", children: [
    /* @__PURE__ */ jsx10(SpecTable, { caption: "7DT system specifications \u2014 June 2026", groups: specs_default.groups }),
    /* @__PURE__ */ jsx10("div", { style: { marginTop: "2.5rem" }, children: /* @__PURE__ */ jsx10(
      NextLinks,
      {
        title: "In detail",
        links: [
          { label: "Instrument", href: "/telescope/instrument" },
          { label: "Location", href: "/telescope/location" },
          { label: "Computational resources", href: "/telescope/computer" },
          { label: "Measured performance", href: "/users/performance" }
        ]
      }
    ) })
  ] })
] }), telescope_overview_default = Index5;

// app/routes/users.performance.tsx
var users_performance_exports = {};
__export(users_performance_exports, {
  default: () => users_performance_default,
  meta: () => meta6
});
import { Link as Link8 } from "@remix-run/react";

// app/routes/content/surveys.json
var surveys_default = {
  note: "The three tiers of the 7-Dimensional Sky Survey. Design parameters from Kim et al., Proc. SPIE 14147-84, Sec. 4 and Table 2. Progress figures are NOT stored here \u2014 they are read live from the portal by app/lib/portal.server.ts, so nothing in this file goes stale as the survey advances.",
  depthFootnote: "*WTS and IMS depths are cumulative over the planned five-year operation, not the depth of a single visit. RIS depth is that of one visit.",
  tiers: [
    {
      code: "RIS",
      name: "Reference Imaging Survey",
      status: "live",
      statusLabel: "Observing",
      area: "23,000 deg\xB2",
      region: "Dec < +20\xB0",
      cadence: "Single visit",
      depth: "19.1 mag",
      depthNote: "5\u03C3 point source in m600, single visit (3 \xD7 100 s)",
      started: "July 2024",
      summary: "The wide-area survey of 7DS. Every tile of the southern sky is observed once with the full set of available medium bands, in three consecutive 100-second exposures. RIS images serve two purposes at once: reference frames against which transients are identified by difference imaging, and a homogeneous spectrophotometric map of the southern sky usable for galaxy population studies, photometric redshift catalogs and quasar identification. Full-cycle completion is anticipated by the end of 2027.",
      depthRange: "5\u03C3 depths range from 19.7 mag at m400 to 17.2 mag at m875.",
      tradeoff: "Area over depth and cadence",
      goal: "Give every part of the southern sky a medium-band reference image, once.",
      rationale: "Difference imaging requires an earlier image of the same sky in the same bands. RIS builds that reference, and its scale follows from the problem: a gravitational-wave localization can fall anywhere, so the reference must cover everything the array can reach. Covering 23,000 deg\xB2 limits the time available per tile to a single visit of 3 \xD7 100 s, which makes RIS the shallowest of the three surveys. A reference map built from forty medium bands is also a homogeneous spectrophotometric survey in its own right, so the same exposures support galaxy population studies, photometric redshifts and quasar identification."
    },
    {
      code: "WTS",
      name: "Wide-area Time-domain Survey",
      status: "planned",
      statusLabel: "Commencing 2026",
      area: "800\u20131,200 deg\xB2",
      region: "Fields with near-infrared ancillary data",
      cadence: "10\u201314 days",
      depth: "22.2 mag*",
      depthNote: "*Cumulative over the planned five-year operation",
      started: "2026",
      summary: "WTS extends 7DS into the time domain over a moderately wide area, sustained over a five-year operational period. Field selection prioritizes regions with existing near-infrared coverage, including the VISTA Kilo-degree Infrared Galaxy (VIKING) survey footprint and the Vera C. Rubin Observatory Deep Drilling Fields, so that 7DT data are complemented at wavelengths the array cannot reach. Roughly 90 to 100 visits per tile accumulate to 22.0\u201322.5 mag in the majority of medium bands.",
      depthRange: "Science cases include reverberation mapping of AGN, long-period variables and eclipsing systems, and slow-evolving extragalactic transients such as superluminous supernovae and tidal disruption events.",
      tradeoff: "Cadence over area",
      goal: "Follow what changes on timescales of weeks, and stack deep enough to reach faint galaxies.",
      rationale: "A single epoch measures what is present, not what is changing. WTS covers a smaller area in order to revisit it every 10 to 14 days, an interval matched to what evolves on that timescale: reverberation in active galactic nuclei, long-period variable and eclipsing stars, and slow extragalactic transients such as superluminous supernovae and tidal disruption events. Repetition also accumulates depth: 90 to 100 visits per tile stack to 22.0\u201322.5 mag across most medium bands, sufficient for photometric redshifts on galaxies well below the single-visit limit. Fields are selected where near-infrared data already exist \u2014 the VIKING footprint and the Rubin Deep Drilling Fields \u2014 covering wavelengths 7DT cannot reach."
    },
    {
      code: "IMS",
      name: "Intensive Monitoring Survey",
      status: "live",
      statusLabel: "Observing",
      area: "8.5 deg\xB2",
      region: "AKARI / SPHEREx Deep Field South",
      cadence: "1 day",
      depth: "23.6 mag*",
      depthNote: "*Cumulative over the planned five-year operation",
      started: "April 2025",
      summary: "The deep, high-cadence survey of 7DS. Seven tiles near the south ecliptic pole are observed every available night with the full medium-band set. The field was deliberately chosen to overlap the SPHEREx Deep Field South, so that 7DT optical medium-band photometry is co-located with SPHEREx near-infrared spectrophotometry within the same survey volume \u2014 a choice that maximizes the synergy between the two surveys for photometric redshifts and for spatially resolved studies of faint sources.",
      depthRange: "Field center: RA 05h13m07.36s, Dec \u221260\xB028\u203211.71\u2033. Observing time budget of 20,000 minutes per year.",
      tradeoff: "Depth and cadence over area",
      goal: "Catch variability within a single night, and build the deepest photometry 7DS will produce.",
      rationale: "Some sources vary faster than a wide survey can follow. IMS reduces area to about 8.5 deg\xB2 \u2014 seven tiles \u2014 in order to observe every available night, which is what is required to characterize short-period variables, active galactic nuclei on short timescales, and transients appearing within the field. Observing the same tiles nightly for five years also coadds to the deepest photometry the survey will produce, about 23.6 mag at peak sensitivity. The field position was chosen to overlap the SPHEREx Deep Field South, so that 7DT optical medium-band photometry and SPHEREx near-infrared spectrophotometry cover the same volume."
    }
  ],
  modes: [
    {
      name: "Spec",
      tagline: "Maximum spectral resolution",
      body: "The default mode. Units rotate through every available medium and broad band, covering the full spectral range in as few exposures as the filter distribution allows. This is the mode in which 7DT delivers low-resolution spectroscopy over 1.25 square degrees."
    },
    {
      name: "Deep",
      tagline: "Maximum depth",
      body: "A selected subset of filters is used, trading spectral sampling for signal-to-noise. Used when the question is detection rather than characterization."
    },
    {
      name: "Color",
      tagline: "Broadband, fast",
      body: "Broad-band filters only. Used for faint, fast events such as gamma-ray bursts and young supernovae, where early detection on the light curve matters more than spectral detail."
    },
    {
      name: "Search",
      tagline: "Maximum sky coverage",
      body: "Each unit points at a different region of sky. A gravitational-wave counterpart is localized only to a probable region covering a wide area, so covering that area quickly takes priority over observing any single field deeply."
    }
  ],
  dimensions: [
    {
      n: "01",
      label: "Right ascension"
    },
    {
      n: "02",
      label: "Declination"
    },
    {
      n: "03",
      label: "Distance"
    },
    {
      n: "04",
      label: "Radial velocity"
    },
    {
      n: "05",
      label: "Brightness"
    },
    {
      n: "06",
      label: "Wavelength"
    },
    {
      n: "07",
      label: "Time"
    }
  ],
  designNote: "Area, cadence and depth cannot all be maximized from a fixed number of nights. Rather than adopt a single compromise, 7DS operates at three separate points in that trade, and ties them together by using one tiling for all three, so that data from any of them coadd directly with data from the others."
};

// app/routes/users.performance.tsx
import { jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
var meta6 = () => [
  { title: "Performance \xB7 7DT for users" },
  {
    name: "description",
    content: "Measured on-sky performance of the 7DT array and the depths reached by each of its three surveys: image quality, photometric calibration and limiting magnitudes."
  }
], Index6 = () => /* @__PURE__ */ jsxs10(PageLayout, { menu: "manuUsers", children: [
  /* @__PURE__ */ jsx11(
    PageHero,
    {
      eyebrow: "For users",
      title: "Performance",
      lede: "What the array delivers on sky, as measured in routine operation rather than specified on paper.",
      image: "/img/hero/telescope.jpg",
      meta: [
        { value: "2.0", unit: "\u2033", label: "Median PSF FWHM" },
        { value: "15\u201325", unit: "mmag", label: "Zero-point uncertainty" },
        { value: "19.6", unit: "mag", label: "Best single-visit depth" },
        { value: "23.6", unit: "mag", label: "Deepest planned coadd" }
      ]
    }
  ),
  /* @__PURE__ */ jsxs10(Section, { eyebrow: "Image quality", title: "Optical performance", children: [
    /* @__PURE__ */ jsx11(StatGrid, { items: specs_default.performance }),
    /* @__PURE__ */ jsx11("p", { className: "prose", style: { marginTop: "2rem" }, children: performanceText })
  ] }),
  /* @__PURE__ */ jsxs10(Section, { eyebrow: "Photometry", title: "Calibration accuracy", alt: !0, children: [
    /* @__PURE__ */ jsx11("p", { className: "prose", children: photometryText }),
    /* @__PURE__ */ jsx11("p", { className: "footnote", style: { marginTop: "1rem" }, children: "Zero-point uncertainties are larger redward of 775 nm, where detector quantum efficiency falls and signal-to-noise drops with it. The fifteen filters installed in late 2025 are not yet spectrophotometrically calibrated; the original twenty medium bands are the calibrated set in operational use." })
  ] }),
  /* @__PURE__ */ jsxs10(Section, { eyebrow: "Depth", title: "Limiting magnitudes", children: [
    /* @__PURE__ */ jsx11("p", { className: "prose", children: depthText }),
    /* @__PURE__ */ jsxs10("div", { className: "split split--wide-text", style: { marginTop: "2rem" }, children: [
      /* @__PURE__ */ jsx11("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs10("table", { className: "spec-table", children: [
        /* @__PURE__ */ jsx11("caption", { children: specs_default.depths.caption }),
        /* @__PURE__ */ jsx11("tbody", { children: specs_default.depths.rows.map((row) => /* @__PURE__ */ jsxs10("tr", { children: [
          /* @__PURE__ */ jsx11("th", { scope: "row", children: row[0] }),
          /* @__PURE__ */ jsx11("td", { children: row[1] })
        ] }, row[0])) })
      ] }) }),
      /* @__PURE__ */ jsx11("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs10("table", { className: "spec-table", children: [
        /* @__PURE__ */ jsx11("caption", { children: "Depth reached by each survey, 5\u03C3 in m600" }),
        /* @__PURE__ */ jsx11("tbody", { children: surveys_default.tiers.map((tier4) => /* @__PURE__ */ jsxs10("tr", { children: [
          /* @__PURE__ */ jsx11("th", { scope: "row", children: /* @__PURE__ */ jsx11(Link8, { to: `/survey/${tier4.code.toLowerCase()}`, children: tier4.code }) }),
          /* @__PURE__ */ jsx11("td", { children: tier4.depth })
        ] }, tier4.code)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs10("figure", { className: "figure", style: { marginTop: "2.5rem" }, children: [
      /* @__PURE__ */ jsx11(
        "img",
        {
          src: "/img/images/depth-distribution.png",
          alt: "Violin plot of the 5-sigma limiting magnitude distribution for each 7DT band in a 100-second exposure",
          loading: "lazy"
        }
      ),
      /* @__PURE__ */ jsxs10("figcaption", { children: [
        /* @__PURE__ */ jsx11("b", { children: "Measured depth per band" }),
        " Distribution of single-exposure 5\u03C3 point-source depths for the twenty original medium bands and Sloan g, r, i and z, measured from individual 100-second exposures taken in routine survey operation. The width of each violin is proportional to the number of exposures reaching that magnitude; the spread within a band is the variation in seeing, airmass and sky brightness across real nights. The fifteen filters added in late 2025 are not included, their spectrophotometric calibration being incomplete. From Kim et al., Proc. SPIE 14147-84."
      ] })
    ] }),
    /* @__PURE__ */ jsx11("p", { className: "footnote", style: { marginTop: "1.5rem" }, children: "Single-exposure depths above are for a 100 s exposure under nominal conditions: seeing better than 2.0 arcseconds, airmass below 1.5, and a non-bright night. The RIS figure is one visit of 3 \xD7 100 s. WTS and IMS figures are cumulative over the planned five-year operation, not the depth of any single visit." })
  ] }),
  /* @__PURE__ */ jsxs10(Section, { eyebrow: "Estimating", title: "Planning an exposure", alt: !0, children: [
    /* @__PURE__ */ jsxs10("p", { className: "prose", children: [
      "To estimate the signal-to-noise expected for a source, combine the depths above with the filter response curves. The ",
      /* @__PURE__ */ jsx11("code", { children: "supy" }),
      " package includes a simulator module that generates filter and detector response for the 7DT bands, and an observer module for target visibility from El Sauce. Both are described under",
      " ",
      /* @__PURE__ */ jsx11(Link8, { to: "/users/software", children: "available software" }),
      "."
    ] }),
    /* @__PURE__ */ jsxs10("div", { className: "btn-row", style: { marginTop: "1.5rem" }, children: [
      /* @__PURE__ */ jsx11(Link8, { className: "btn btn--primary", to: "/users/software", children: "Software" }),
      /* @__PURE__ */ jsx11(Link8, { className: "btn btn--secondary", to: "/users/propose", children: "Observing modes" }),
      /* @__PURE__ */ jsx11(Link8, { className: "btn btn--secondary", to: "/telescope/instrument", children: "Instrument detail" })
    ] })
  ] })
] }), users_performance_default = Index6;

// app/routes/publication.list.tsx
var publication_list_exports = {};
__export(publication_list_exports, {
  default: () => publication_list_default,
  meta: () => meta7
});
import { useMemo, useState as useState3 } from "react";
import { Pagination } from "flowbite-react";

// app/routes/content/news.json
var news_default = {
  _note: "Publication entries: 'abstract' holds the author's published abstract, quoted verbatim. 'summary' holds a site-written description and is labelled as such where no published abstract is available. Never put a paraphrase in 'abstract'. 'imgName' for a publication should be a figure from that publication (pub-*.jpg, see public/img/news). Three entries have no obtainable paper figure \u2014 Chang et al., Ko et al. and Lim et al. \u2014 and fall back to a 7DT project figure instead; do not describe those as figures from the paper.",
  news: [
    {
      type: "publication",
      author: "Kim, M.-R.; Lee, J.-E.; Im, M.; Lee, J.; Kim, J. H.; Chang, S.-W.; Paek, G. S. H.; Choi, H.; Tak, D.; Hyun, D.; Lee, W.-H.; Lee, H.; Kim, S.; Megeath, S. T.",
      shortAuthor: "Kim, M.-R. et al.",
      title: "7DT Insight: Variability in Young Stellar Objects",
      journal: "The Astronomical Journal 172, 22",
      date: "Jul. 2026",
      doi: "",
      preprint: "",
      ref: "2026AJ....172...22K",
      summary: "Two-epoch 7DT photometry in sixteen medium bands across 400-825 nm identifies 110 variable young stellar objects in the central region of Orion A, and uses the wavelength dependence of the variability to discriminate between extinction-like, gray and spot-like mechanisms on day timescales.",
      imgName: "pub-yso-orion.jpg",
      webpage: "",
      webpage2: ""
    },
    {
      type: "publication",
      author: "Kim, Ji Hoon; Im, Myungshin; Lee, Hyung Mok; Chang, Seo-Won; Tak, Donggeun; Paek, Gregory S. H.; Choi, Hyeonho; Hyun, Donghwan; Kim, Chang-wan; Lee, Won-Hyeong",
      shortAuthor: "Kim, J. H. et al.",
      title: "The 7-Dimensional Telescope and the 7-Dimensional Sky Survey: Status Report on Final Commissioning and Survey Operation",
      journal: "Proc. SPIE 14147, Ground-based and Airborne Telescopes",
      date: "Jun. 2026",
      doi: "",
      preprint: "",
      ref: "SPIE 14147-84",
      abstract: "The 7-Dimensional Telescope (7DT), developed by Center for the Gravitational-Wave Universe at Seoul National University, is a multi-telescope array designed to identify the electromagnetic counterparts of gravitational-wave events. 7DT consists of twenty 50-cm telescopes equipped with CMOS cameras, each providing a 1.25 deg\xB2 field of view. This provides IFU-like data with low spectral resolution (R = 30-70) by utilizing 40 medium-band filters of 25 nm width spanning from 400 to 900 nm, distributed across the array. Since achieving first light in October 2023, comprehensive commissioning has been carried out to evaluate instrument functionality and verify science procedures. These activities included optomechanical alignment, focus measurement, optical assessment, the generation of master calibration frames, spectrophotometric calibration, and evaluation of astrometry and image depth. To verify the science capabilities of the 7-Dimensional Sky Survey (7DS), observations were conducted on a wide range of astronomical targets, including nearby galaxies (e.g., PHANGS sample), extragalactic fields (e.g., UDS for photometric redshift tests), Galactic objects, and solar system objects. 7DS comprises three tiered surveys: the Reference Imaging Survey (RIS), which covers over 20,000 deg\xB2 of the Southern Hemisphere sky and aims to provide reference images for image subtraction analysis for gravitational-wave counterparts and other transient objects with a single 5-minute exposure visit, the Wide-area Time-domain Survey (WTS), which will cover 800-1,200 deg\xB2 with a 10-14 day cadence, prioritizing areas with ancillary near-infrared data, such as VIKING or the LSST Deep Drilling Fields, and the Intensive Monitoring Survey (IMS), which focuses on the SPHEREx Deep Field South, near the ecliptic south pole, with a 1-day cadence. RIS commenced in July 2024, and IMS began in April 2025. WTS will commence in 2026. This presentation summarizes the 7DT commissioning status, the early science results derived from the commissioning data, and the current operational status of the 7DS.",
      imgName: "pub-7ds-status.jpg",
      webpage: "",
      webpage2: ""
    },
    {
      type: "publication",
      author: "Hyun, Donghwan; Tak, Donggeun; Paek, Gregory S. H.; Im, Myungshin; Kim, Ji Hoon; Chang, Seo-Won; Choi, Hyeonho; Lee, Won-Hyeong; Seol, Danhyeuk; Bae, Jangho",
      shortAuthor: "Hyun, D. et al.",
      title: "Py7DT: Data Reduction Pipeline of the 7-Dimensional Telescope",
      journal: "Proc. SPIE 14155, Software and Cyberinfrastructure for Astronomy",
      date: "Jun. 2026",
      doi: "",
      preprint: "",
      ref: "SPIE 14155-12",
      abstract: "We present Py7DT, the operational data reduction pipeline for the 7-Dimensional Telescope (7DT), a medium-band optical telescope array in Chile designed for rapid target-of-opportunity follow-up and the 7-Dimensional Sky Survey of the entire southern sky. Py7DT addresses the main reduction challenge of 7DT: reducing heterogeneous data from many telescope units, filters, and observing modes while sustaining nightly survey throughput and minimizing latency for transient events. The pipeline orchestrates the processing flow by wrapping established astronomical software behind Python interfaces, using a stage-dependent image-grouping scheme, centralized path handling, and priority-aware scheduling. The code is modular and portable, serving as a standard tool for end users to reprocess 7DT data with custom configurations, and supports the diverse scientific goals of 7DT from transient object search to pixel-based analysis of spatially resolved galaxies while remaining flexible and easy to maintain. The pipeline also features multi-level logging, automatically generated quality-assessment statistics and flags, and web-based real-time status monitoring to reduce the management load on the small developer team. Current operational tests show that Py7DT can process a typical nightly survey volume within the daily time budget while producing prompt ToO products on an approximately one-hour end-to-end timescale when the target is immediately observable.",
      imgName: "pub-py7dt-arch.jpg",
      webpage: "",
      webpage2: ""
    },
    {
      type: "update",
      title: "Reference Imaging Survey passes 58 percent of the southern sky",
      source: "7DS Survey Operations",
      date: "Jun. 2026",
      content: "14,866 of 25,472 RIS tiles have been fully observed since the survey began in July 2024. Completion of the full cycle is anticipated by the end of 2027.",
      imgName: "news-11.png",
      webpage: "/survey/status"
    },
    {
      type: "publication",
      author: "Paek, Gregory S. H.; Im, Myungshin; Chang, Seo-Won; Choi, Hyeonho; Kim, Ji Hoon",
      shortAuthor: "Paek, G. S. H. et al.",
      title: "A Hybrid Framework for Kilonova Anomaly Detection Using Single-epoch SEDs from the 7-Dimensional Telescope",
      journal: "The Astrophysical Journal 1001, 198",
      date: "Apr. 2026",
      doi: "",
      preprint: "",
      ref: "2026ApJ..1001..198P",
      summary: "An unsupervised anomaly detector coupled to a supervised multiclass classifier, trained on simulated 7DT photometry, reaches macro F1 \u2248 0.80 across eight common transient types while recovering more than 90 percent of optically detectable kilonovae \u2014 including AT2017gfo \u2014 without direct training on kilonovae.",
      imgName: "pub-kn-anomaly.jpg",
      webpage: "",
      webpage2: ""
    },
    {
      type: "publication",
      author: "Paek, Gregory S. H.; Im, Myungshin; Jeong, M.; Choi, Hyeonho; Bach, Y. P.; Ishiguro, M.; Lim, B.; Chang, Seo-Won; Kim, Ji Hoon; Geem, J.; Hoogendam, W. B.",
      shortAuthor: "Paek, G. S. H. et al.",
      title: "Pre-perihelion Emergence of the CN Gas Coma in 3I/ATLAS Temporally and Spatially Resolved by the 7-dimensional Telescope",
      journal: "The Astrophysical Journal 1000, 53",
      date: "Mar. 2026",
      doi: "",
      preprint: "",
      ref: "2026ApJ..1000...53P",
      summary: "Time-series m400-band imaging of the third interstellar object, 3I/ATLAS (C/2025 N1), between July and September 2025 tracks the emergence of pronounced, spatially extended CN emission as the object fell inside 3 au, with the coma half-light radius growing from \u2248 11,000 to \u2248 19,000 km.",
      imgName: "pub-3iatlas.jpg",
      webpage: "",
      webpage2: ""
    },
    {
      type: "publication",
      author: "Bae, J.; Lee, B.; Im, M.; Bahk, H.; Dachan, K.; Hwang, H. S.; Hong, S.; Kim, S.; Kim, M.; Kim, T.; Lee, J.; Sohn, J.; Song, H.; Chang, S.-W.; Cheng, Y.-T.; Faisst, A. L.; Huai, Z.; Jeong, W.-S.; Kim, J. H.; Kim, D.; Kim, Y.; Lee, S.-K.; Masters, D. C.; Ko, E.",
      shortAuthor: "Bae, J. et al.",
      title: "The redshifts from 122 bands: Comparative redshift forecast for low-resolution spectra from SPHEREx and the 7-Dimensional Sky Survey (7DS)",
      journal: "Astronomy & Astrophysics 706, A347",
      date: "Feb. 2026",
      doi: "",
      preprint: "",
      ref: "2026A&A...706A.347B",
      summary: "Six photometric-redshift methods \u2014 four template-fitting codes and two machine-learning approaches \u2014 applied to combined 7DS and SPHEREx mock catalogs. All deliver \u03C3_NMAD \u2272 0.005 for bright GAMA-like galaxies and \u2248 0.01 for fainter COSMOS-like galaxies, with the combined dataset consistently outperforming either survey alone.",
      imgName: "pub-photoz-122.jpg",
      webpage: "",
      webpage2: ""
    },
    {
      type: "publication",
      author: "Chang, Seo-Won; Im, Myungshin; Kim, Ji Hoon; Tak, Donggeun; Paek, Gregory S.-H.; Choi, Hyeonho; Hyun, Donghwan; 7DS Team",
      shortAuthor: "Chang, S.-W. et al.",
      title: "7DT database for survey management",
      journal: "The Bulletin of the Korean Astronomical Society 51(1), 108",
      date: "2026",
      doi: "",
      preprint: "",
      ref: "Poster P7DT-01",
      summary: "Presents gwportal, the database that manages all 7DT data and integrates the operations of the telescope control system and the reduction pipeline.",
      imgName: "news-8.jpg",
      webpage: "",
      webpage2: ""
    },
    {
      type: "update",
      title: "Py7DT becomes the sole operational pipeline",
      source: "7DT Data Center",
      date: "Jan. 2026",
      content: "After a parallel-operation period with gpPy-GPU through late 2025, Py7DT took over all 7DT data reduction. The pipeline sustains a median end-to-end throughput of 66 \xB1 24 GB per hour and clears a typical 3,000-image survey night in about five hours.",
      imgName: "news-8.jpg",
      webpage: "/data/software"
    },
    {
      type: "publication",
      author: "Ko, E.; Im, M.; Yang, Y.; Kim, J. H.; Lee, S.-K.; Paek, G. S.-H.",
      shortAuthor: "Ko, E. et al.",
      title: "Photometric Redshift Forecast for the 7-Dimensional Sky Survey",
      journal: "The Astrophysical Journal 994, 224",
      date: "Dec. 2025",
      doi: "",
      preprint: "",
      ref: "2025ApJ...994..224K",
      summary: "Forecasts the photometric-redshift performance of the three 7DS tiers using EAZY on EL-COSMOS mock catalogs, reporting \u03C3_NMAD = 0.003-0.007 and catastrophic failure fractions of 0.8-8.1 percent at 19 < m625 < 22 for the five-year stacked WTS with 40 medium bands.",
      imgName: "news-7.png",
      webpage: "",
      webpage2: ""
    },
    {
      type: "update",
      title: "Fifteen additional medium-band filters installed across the array",
      source: "7DT Instrument Team",
      date: "Late 2025",
      content: "The medium-band complement grows from 20 to 35 filters, covering 375 to 875 nm with finer spectral sampling and advancing toward the designed set of 40.",
      imgName: "news-7.png",
      webpage: "/telescope/instrument"
    },
    {
      type: "update",
      title: "Intensive Monitoring Survey begins nightly observation of the south ecliptic pole",
      source: "7DS Survey Operations",
      date: "Apr. 2025",
      content: "Seven tiles covering approximately 8.5 deg\xB2, chosen to overlap the SPHEREx Deep Field South, are now observed every available night with the full medium-band set.",
      imgName: "news-9.jpg",
      webpage: "/survey/design"
    },
    {
      type: "publication",
      author: "Lim, H.; Shim, H.; Im, M.; Kim, J. H.; Lee, S.-K.; Paek, G. S. H.; Ko, E.; Kim, D.",
      shortAuthor: "Lim, H. et al.",
      title: "Prospect of Deriving Galaxy Properties through Machine Learning: Application to Medium-Band Data from the 7DT",
      journal: "Journal of the Korean Astronomical Society 58, 43-53",
      date: "Feb. 2025",
      doi: "",
      preprint: "",
      ref: "2025JKAS...58...43L",
      summary: "Machine-learning models trained on 7DT-like medium-band photometry recover not only redshifts but derived galaxy properties, reaching \u03C3_\u0394z/(1+z) = 0.008 and gas-phase metallicity to \u03C3_NMAD = 0.081 dex at z < 0.4.",
      imgName: "news-7.png",
      webpage: "",
      webpage2: ""
    },
    {
      type: "update",
      title: "Array grows to sixteen units and automated ToO response enters service",
      source: "7DT Operations",
      date: "Dec. 2024",
      content: "Four additional DeltaRho 500 units were deployed and brought into routine operation. Automated target-of-opportunity ingestion and interruption logic went live at the same time, letting the scheduler interrupt an ongoing observation and begin a follow-up exposure in under a minute.",
      imgName: "news-10.jpg",
      webpage: "/telescope/overview"
    },
    {
      type: "publication",
      author: "Kim, Ji Hoon; Im, Myungshin; Lee, Hyung Mok; Chang, Seo-Won; Choi, Hyeonho; Paek, Gregory S. H.",
      shortAuthor: "Kim, J. H. et al.",
      title: "Introduction to the 7-Dimensional Telescope: commissioning procedures and data characteristics",
      journal: "Proc. SPIE 13094, Ground-based and Airborne Telescopes X, 130940X",
      date: "Aug. 2024",
      doi: "",
      preprint: "",
      ref: "2024SPIE13094E..0XK",
      summary: "The first full description of the 7DT system \u2014 optical tube assemblies, mounts, cameras and site infrastructure \u2014 together with the commissioning procedures established while twelve of the twenty planned units were on sky, and the resulting data characteristics.",
      imgName: "pub-dr500.jpg",
      webpage: "",
      webpage2: ""
    },
    {
      type: "publication",
      author: "Choi, Hyeonho; Im, Myungshin; Kim, Ji Hoon",
      shortAuthor: "Choi, H. et al.",
      title: "TCSpy: Multitelescope array control software for 7-Dimensional Telescope (7DT)",
      journal: "Proc. SPIE 13101, Software and Cyberinfrastructure for Astronomy VIII, 131012V",
      date: "Jul. 2024",
      doi: "",
      preprint: "",
      ref: "2024SPIE13101E..2VC",
      summary: "TCSpy is the device control layer beneath 7DT array operations, providing interfaces to mounts, cameras, focusers and filter wheels, and forming the foundation on which the autonomous RTCSpy operations framework is built.",
      imgName: "pub-array-deck.jpg",
      webpage: "",
      webpage2: ""
    },
    {
      type: "update",
      title: "Reference Imaging Survey commences",
      source: "7DS Survey Operations",
      date: "Jul. 2024",
      content: "Routine survey operation begins on the wide-area tier of 7DS, covering approximately 23,000 deg\xB2 at Dec < +20\xB0 with a single visit per tile in the full available medium-band set.",
      imgName: "news-11.png",
      webpage: "/survey/overview"
    },
    {
      type: "press",
      title: "First Release of Images Taken with 7-Dimensional Telescope",
      webpage: "https://sites.google.com/view/7dtfirstimages",
      date: "Feb. 14, 2024",
      source: "Center for the Gravitational-wave Universe",
      content: "",
      imgName: "news-4.png"
    },
    {
      type: "meeting",
      title: "2024 SPHEREx-7DT Joint Workshop",
      place: "Grand Hall, Forest Resom",
      webpage: "https://sites.google.com/view/spherex-7ds-workshop/home",
      date: "Jan. 24-26, 2024",
      content: "",
      imgName: "news-3.png"
    },
    {
      type: "publication",
      author: "Paek, Gregory S. H.; Im, Myungshin; Kim, Joonho; Lim, Gu; Park, Bomi; Choi, Changsu; Kim, Sophia; Barbieri, Claudio; Salafia, Om Sharan; Paek, Insu; Shin, Suhyun; Seo, Jinguk; Lee, Hyung Mok; Lee, Chung-Uk; Kim, Seung-Lee; Sung, Hyun-Il",
      shortAuthor: "Paek, G. S. H. et al.",
      title: "Gravitational-wave Electromagnetic Counterpart Korean Observatory (GECKO): GECKO Follow-up Observation of GW190425",
      journal: "ApJ 960, 113",
      date: "Jan. 2024",
      doi: "10.3847/1538-4357/ad0238",
      preprint: "arXiv:2310.19593",
      ref: "2024ApJ...960..113P",
      abstract: "One of the keys to the success of multimessenger astronomy is the rapid identification of the electromagnetic wave counterpart, kilonova (KN), of the gravitational-wave (GW) event. Despite its importance, it is hard to find a KN associated with a GW event, due to a poorly constrained GW localization map and numerous signals that could be confused as a KN. Here, we present the Gravitational-wave Electromagnetic wave Counterpart Korean Observatory (GECKO) project, the GECKO observation of GW190425, and prospects of GECKO in the fourth observing run (O4) of the GW detectors. We outline our follow-up observation strategies during O3. In particular, we describe our galaxy-targeted observation criteria that prioritize based on galaxy properties. Armed with this strategy, we performed an optical and/or near-infrared follow-up observation of GW190425, the first binary neutron star merger event during the O3 run. Despite a vast localization area of 7460 deg2, we observed 621 host galaxy candidates, corresponding to 29.5% of the scores we assigned, with most of them observed within the first 3 days of the GW event. Ten transients were discovered during this search, including a new transient with a host galaxy. No plausible KN was found, but we were still able to constrain the properties of potential KNe using upper limits. The GECKO observation demonstrates that GECKO can possibly uncover a GW170817-like KN at a distance <200 Mpc if the localization area is of the order of hundreds of square degrees, providing a bright prospect for the identification of GW electromagnetic wave counterparts during the O4 run.",
      imgName: "news-2.png",
      webpage: "https://iopscience.iop.org/article/10.3847/1538-4357/ad0238",
      webpage2: "https://arxiv.org/abs/2310.19593"
    },
    {
      type: "publication",
      author: "Tak, Donggeun; Uhm, Z. Lucas; Gillanders, James H.",
      shortAuthor: "Tak, D. et al.",
      title: "Exploring the Impact of the Ejecta Velocity Profile on the Evolution of Kilonova: Diversity of the Kilonova Lightcurves",
      journal: "ApJ 958, 121",
      date: "Dec. 2023",
      doi: "10.3847/1538-4357/ad06b0",
      preprint: "arXiv:2310.15608",
      ref: "2023ApJ...958..121T",
      abstract: "A kilonova is a short-lived explosive event in the Universe, resulting from the merger of two compact objects. Despite its importance as a primary source of heavy elements through r-process nucleosynthesis, its nature is not well understood due to its rarity. In this work, we introduce a model that determines the density of a radially stratified relativistic ejecta. We apply the model to kilonova ejecta and explore several hypothesized velocity profiles as a function of the merger's ejection time. These velocity profiles result in diverse density profiles of the ejecta, for which we conduct radiative transfer simulations using TARDIS with the solar r-process composition. Consequently, we investigate the impact of the ejecta velocity profile on the resulting evolution of the lightcurve and spectra through the line transitions of heavy elements. The change in the rate at which these elements accumulate in the line-forming region leaves its imprint on the kilonova lightcurve at specific wavelengths, causing the lightcurves to decay at different rates. Furthermore, in several profiles, plateau-like behaviors (slow and/or flat decline) are also observed. In conclusion, this work proposes potential scenarios of the evolution of kilonova due to the ejecta velocity profile.",
      imgName: "news-1.png",
      webpage: "https://iopscience.iop.org/article/10.3847/1538-4357/ad06b0",
      webpage2: "https://arxiv.org/abs/2310.15608"
    }
  ]
};

// app/routes/publication.list.tsx
import { jsx as jsx12, jsxs as jsxs11 } from "react/jsx-runtime";
var meta7 = () => [
  { title: "Publications \xB7 7-Dimensional Telescope" },
  { name: "description", content: "Refereed papers and conference proceedings from the 7DT collaboration." }
], PER_PAGE = 6, Index7 = () => {
  let [currentPage, setCurrentPage] = useState3(1), [showAbstract, setShowAbstract] = useState3(!1), pubs = useMemo(
    () => news_default.news.filter((item) => item.type === "publication"),
    []
  ), totalPages = Math.max(1, Math.ceil(pubs.length / PER_PAGE)), page = Math.min(currentPage, totalPages), shown = pubs.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  return /* @__PURE__ */ jsxs11(PageLayout, { menu: "manuPaper", children: [
    /* @__PURE__ */ jsx12(
      PageHero,
      {
        eyebrow: "Publications",
        title: "Papers & proceedings",
        lede: "Instrument, operations and science papers from the 7DT collaboration.",
        image: "/img/hero/publications.jpg",
        meta: [{ value: String(pubs.length), label: "Listed works" }]
      }
    ),
    /* @__PURE__ */ jsxs11("div", { className: "notice", children: [
      /* @__PURE__ */ jsxs11("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx12("circle", { cx: "12", cy: "12", r: "9" }),
        /* @__PURE__ */ jsx12("path", { d: "M12 8h.01M11 12h1v5h1", strokeLinecap: "round" })
      ] }),
      /* @__PURE__ */ jsxs11("span", { children: [
        "Publishing with 7DT data? Please read the",
        " ",
        /* @__PURE__ */ jsx12("a", { href: "/publication/policy", children: "publication policy" }),
        " first."
      ] })
    ] }),
    /* @__PURE__ */ jsxs11(Section, { eyebrow: "Bibliography", title: "Meet our work", children: [
      /* @__PURE__ */ jsxs11("div", { className: "toolbar", children: [
        /* @__PURE__ */ jsxs11("span", { className: "toolbar__label", children: [
          pubs.length,
          " publications \xB7 page ",
          page,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ jsx12(
          "button",
          {
            type: "button",
            className: "toggle-btn",
            "aria-pressed": showAbstract,
            onClick: () => setShowAbstract(!showAbstract),
            children: showAbstract ? "Hide abstracts" : "Show abstracts"
          }
        )
      ] }),
      /* @__PURE__ */ jsx12("ul", { className: "pub-list", children: shown.map((pub, index) => /* @__PURE__ */ jsxs11("li", { className: "pub", children: [
        /* @__PURE__ */ jsx12("h2", { className: "pub__title", children: pub.webpage ? /* @__PURE__ */ jsx12("a", { href: pub.webpage, target: "_blank", rel: "noreferrer", children: pub.title }) : pub.title }),
        /* @__PURE__ */ jsx12("p", { className: "pub__authors", children: pub.author }),
        /* @__PURE__ */ jsxs11("div", { className: "pub__meta", children: [
          pub.journal && /* @__PURE__ */ jsxs11("span", { children: [
            /* @__PURE__ */ jsx12("b", { children: "Journal" }),
            pub.journal
          ] }),
          pub.date && /* @__PURE__ */ jsxs11("span", { children: [
            /* @__PURE__ */ jsx12("b", { children: "Date" }),
            pub.date
          ] }),
          pub.doi && /* @__PURE__ */ jsxs11("span", { children: [
            /* @__PURE__ */ jsx12("b", { children: "doi" }),
            /* @__PURE__ */ jsx12("a", { href: pub.webpage, target: "_blank", rel: "noreferrer", children: pub.doi })
          ] }),
          pub.preprint && /* @__PURE__ */ jsxs11("span", { children: [
            /* @__PURE__ */ jsx12("b", { children: "Preprint" }),
            /* @__PURE__ */ jsx12("a", { href: pub.webpage2, target: "_blank", rel: "noreferrer", children: pub.preprint })
          ] }),
          !pub.doi && !pub.preprint && pub.ref && /* @__PURE__ */ jsxs11("span", { children: [
            /* @__PURE__ */ jsx12("b", { children: "Ref" }),
            pub.ref
          ] })
        ] }),
        showAbstract && pub.abstract && /* @__PURE__ */ jsx12("p", { className: "pub__abstract", children: pub.abstract })
      ] }, `${pub.title}-${index}`)) }),
      totalPages > 1 && /* @__PURE__ */ jsx12("div", { className: "pagination-wrap", children: /* @__PURE__ */ jsx12(Pagination, { currentPage: page, totalPages, onPageChange: setCurrentPage }) })
    ] })
  ] });
}, publication_list_default = Index7;

// app/routes/science.overview.tsx
var science_overview_exports = {};
__export(science_overview_exports, {
  default: () => science_overview_default,
  meta: () => meta8
});
import { Link as Link9 } from "@remix-run/react";

// app/routes/content/science.json
var science_default = {
  note: "Science themes of 7DS. Source: Kim et al., Proc. SPIE 14147-84, Sec. 3.4. Published results are listed on the publications page rather than duplicated here.",
  themes: [
    {
      id: "mma",
      n: "01",
      title: "Multi-messenger Astronomy",
      summary: "The application 7DT was designed for. A kilonova peaks near absolute magnitude \u221215 to \u221217 and fades by roughly half a magnitude per day, within a gravitational-wave localization of hundreds to thousands of square degrees; a single 100 deg\xB2 region is expected to contain of order a hundred unrelated transients over a seven-day window. 7DT addresses this with wide-field tiling, sub-minute response to an alert, and sufficient spectral information in one visit to reject contaminants without follow-up spectroscopy."
    },
    {
      id: "transients",
      n: "02",
      title: "Transients",
      summary: "Medium-band spectral sampling gives direct color and continuum information for a transient from one epoch of imaging. A hybrid classification framework built on 7DT spectral energy distributions \u2014 an unsupervised anomaly detector coupled to a supervised multiclass classifier \u2014 reaches macro F1 \u2248 0.80 across eight common transient types and recovers more than 90 percent of optically detectable kilonovae, including AT2017gfo, without ever being trained on one."
    },
    {
      id: "galaxies",
      n: "03",
      title: "Galaxy Formation & Evolution",
      summary: "Medium-band mapping over 1.25 square degrees is IFU-like data at survey scale. Star-forming clumps are identified through H\u03B1 emission in stellar-continuum-subtracted images, and pilot studies indicate that pixel-based SED fitting of 7DT and SPHEREx data can recover spatially resolved stellar populations approaching the quality of high-resolution IFU spectroscopy \u2014 for galaxies that would otherwise demand dedicated campaigns on much larger telescopes. Both studies are as yet unpublished (Shim et al., submitted; Lee et al., in prep)."
    },
    {
      id: "cosmology",
      n: "04",
      title: "Cosmology & Photometric Redshifts",
      summary: "At R = 30\u201370 across 0.4\u20130.9 \xB5m, 7DT straddles the boundary between broadband photometry and low-resolution spectroscopy, capturing the 4000 \xC5 break and prominent emission lines at a resolution that lifts much of the color\u2013redshift degeneracy inherent to broadband surveys. Forecasts give \u03C3_NMAD = 0.003\u20130.007 at 19 < m625 < 22 for the five-year stacked WTS, with strong gains when combined with SPHEREx all-sky data."
    },
    {
      id: "agn",
      n: "05",
      title: "Active Galactic Nuclei",
      summary: "Repeated medium-band visits measure how an AGN spectrum changes, not only how its brightness does. The 10\u201314 day cadence of WTS over five years is suited to reverberation mapping through long-term spectral variability, while the nightly cadence of IMS reaches variability on timescales of a single night."
    },
    {
      id: "galactic",
      n: "06",
      title: "Galactic Science & Exoplanets",
      summary: "Two-epoch 7DT photometry with sixteen medium bands across 400\u2013825 nm identified 110 variable young stellar objects in the central region of Orion A \u2014 14 percent of 769 candidates \u2014 including seven varying by more than 0.5 mag. The wavelength dependence of the variability distinguishes extinction-like, gray and spot-like mechanisms on day timescales, which otherwise requires rapid filter cycling or simultaneous multi-band instrumentation. The same combination of cadence and spectral sampling applies to transiting exoplanets: a transit observed in many bands at once measures its depth as a function of wavelength, which separates a genuine planetary signal from a blended eclipsing binary and constrains stellar activity that would otherwise bias the derived planet radius."
    },
    {
      id: "solar",
      n: "07",
      title: "Solar System Objects",
      summary: "Medium-band imaging of the main-belt asteroids 13 Egeria and 10 Hygiea targets the 0.7 \xB5m absorption feature characteristic of Ch-type bodies, a tracer of their thermal history. Time-series observations of the third interstellar object, 3I/ATLAS, followed the emergence of extended CN emission as it fell inside 3 au \u2014 behavior resembling that of 2I/Borisov at comparable heliocentric distance."
    }
  ]
};

// app/routes/science.overview.tsx
import { jsx as jsx13, jsxs as jsxs12 } from "react/jsx-runtime";
var meta8 = () => [
  { title: "Science \xB7 7-Dimensional Telescope" },
  {
    name: "description",
    content: "What 7DS is built to measure: spectral mapping and the time domain, and the science themes that follow from them."
  }
], Index8 = () => /* @__PURE__ */ jsxs12(PageLayout, { menu: "manuScience", children: [
  /* @__PURE__ */ jsx13(
    PageHero,
    {
      eyebrow: "Science",
      title: "Motivation",
      lede: "7DS measures two things a conventional survey does not measure together: the spectrum of every source in the field, and how that spectrum changes with time.",
      image: "/img/hero/science.jpg",
      meta: [
        { value: "30\u201370", label: "Spectral resolution R" },
        { value: "375\u2013875", unit: "nm", label: "Wavelength range" },
        { value: "1", unit: "d", label: "Fastest cadence" }
      ]
    }
  ),
  /* @__PURE__ */ jsxs12(Section, { eyebrow: "Spectral mapping", title: "A spectrum for every source in the field", children: [
    /* @__PURE__ */ jsx13("p", { className: "prose", children: scienceOverviewText }),
    /* @__PURE__ */ jsxs12("p", { className: "prose", children: [
      "The practical consequence is that classification does not depend on follow-up. A source detected in a 7DS image already carries the information needed to estimate a photometric redshift, separate a quasar from a star, or distinguish a kilonova from the supernovae and detector artifacts that outnumber it \u2014 at the moment of detection, for every object in 1.25 square degrees. The filter set that makes this possible, and which bands exist on a given tile, are described under ",
      /* @__PURE__ */ jsx13(Link9, { to: "/users/status", children: "status and overview" }),
      "."
    ] })
  ] }),
  /* @__PURE__ */ jsxs12(Section, { eyebrow: "Time domain", title: "Repeating the measurement", alt: !0, children: [
    /* @__PURE__ */ jsx13("p", { className: "prose", children: scienceOverviewText2 }),
    /* @__PURE__ */ jsxs12("p", { className: "prose", children: [
      "The three surveys exist to put that repetition at different cadences: one visit everywhere, a revisit every 10 to 14 days over a smaller area, and nightly observation of a single deep field. Which cadence a question needs is what determines which survey serves it \u2014 set out under ",
      /* @__PURE__ */ jsx13(Link9, { to: "/survey/overview", children: "survey design" }),
      "."
    ] })
  ] }),
  /* @__PURE__ */ jsxs12(Section, { eyebrow: "Program", title: "Seven science themes", children: [
    /* @__PURE__ */ jsx13("p", { className: "prose", children: "Each theme below draws on the same data product: a medium-band spectral energy distribution for every source in the field, measured repeatedly." }),
    /* @__PURE__ */ jsx13("div", { className: "grid grid-cols-2", style: { marginTop: "2rem" }, children: science_default.themes.map((theme) => /* @__PURE__ */ jsxs12("a", { className: "theme-card", href: `/science/sci#${theme.id}`, children: [
      /* @__PURE__ */ jsx13("span", { className: "theme-card__index", children: theme.n }),
      /* @__PURE__ */ jsx13("h3", { className: "theme-card__title", children: theme.title }),
      /* @__PURE__ */ jsx13("p", { className: "theme-card__body", children: theme.summary })
    ] }, theme.id)) }),
    /* @__PURE__ */ jsxs12("div", { className: "btn-row", style: { marginTop: "2rem" }, children: [
      /* @__PURE__ */ jsx13(Link9, { className: "btn btn--primary", to: "/science/sci", children: "All themes in detail" }),
      /* @__PURE__ */ jsx13(Link9, { className: "btn btn--secondary", to: "/publication/list", children: "Publications" })
    ] })
  ] })
] }), science_overview_default = Index8;

// app/routes/survey.coverage.tsx
var survey_coverage_exports = {};
__export(survey_coverage_exports, {
  loader: () => loader
});
import { redirect } from "@remix-run/node";
function loader() {
  return redirect("/users/access", 301);
}

// app/routes/survey.overview.tsx
var survey_overview_exports = {};
__export(survey_overview_exports, {
  default: () => survey_overview_default,
  meta: () => meta9
});
import { Link as Link10 } from "@remix-run/react";
import { Fragment as Fragment5, jsx as jsx14, jsxs as jsxs13 } from "react/jsx-runtime";
var meta9 = () => [
  { title: "7-Dimensional Sky Survey \xB7 7DT" },
  {
    name: "description",
    content: "The 7-Dimensional Sky Survey: three surveys covering the southern sky in medium bands, from a single-visit reference map to nightly deep monitoring, on one tiling."
  }
], TILING = [
  ["Tile centers", "HEALPix pixelization of the celestial sphere"],
  ["Tile numbering", "T00000 \u2013 T28519, by increasing declination"],
  ["Sky coverage", "South celestial pole to Dec +30\xB0"],
  ["Overlap near equator", "\u2248 5\u2032 in right ascension, 4\u2032 in declination"],
  ["Standard visit", "3 \xD7 100 s, coadded to 300 s"],
  ["Field of view per tile", "1.34\xB0 \xD7 0.90\xB0, 1.25 deg\xB2"]
], PAGES = {
  RIS: "/survey/ris",
  WTS: "/survey/wts",
  IMS: "/survey/ims"
}, Index9 = () => /* @__PURE__ */ jsxs13(PageLayout, { menu: "manu7ds", children: [
  /* @__PURE__ */ jsx14(
    PageHero,
    {
      eyebrow: "Survey",
      title: /* @__PURE__ */ jsxs13(Fragment5, { children: [
        "The 7-Dimensional ",
        /* @__PURE__ */ jsx14("em", { children: "Sky Survey" })
      ] }),
      lede: "7DS is the science program of 7DT. It comprises three surveys that differ in area, cadence and depth, and that share one tiling of the sky.",
      image: "/img/hero/survey.jpg",
      meta: [
        { value: "3", label: "Surveys" },
        { value: "23,000", unit: "deg\xB2", label: "Widest survey" },
        { value: "1", unit: "d", label: "Fastest cadence" },
        { value: "23.6", unit: "mag", label: "Deepest planned" }
      ]
    }
  ),
  /* @__PURE__ */ jsxs13(Section, { eyebrow: "Overview", title: "Three surveys on one tiling", children: [
    /* @__PURE__ */ jsx14("p", { className: "prose", children: surveyOverviewText }),
    /* @__PURE__ */ jsx14("div", { className: "table-wrap", style: { marginTop: "2rem" }, children: /* @__PURE__ */ jsxs13("table", { className: "tier-table", children: [
      /* @__PURE__ */ jsx14("caption", { children: "Design parameters of the three surveys" }),
      /* @__PURE__ */ jsx14("thead", { children: /* @__PURE__ */ jsxs13("tr", { children: [
        /* @__PURE__ */ jsx14("th", { scope: "col", children: "Property" }),
        surveys_default.tiers.map((tier4) => /* @__PURE__ */ jsx14("th", { scope: "col", children: /* @__PURE__ */ jsx14(Link10, { to: PAGES[tier4.code], children: tier4.code }) }, tier4.code))
      ] }) }),
      /* @__PURE__ */ jsxs13("tbody", { children: [
        /* @__PURE__ */ jsxs13("tr", { children: [
          /* @__PURE__ */ jsx14("th", { scope: "row", children: "Survey area" }),
          surveys_default.tiers.map((tier4) => /* @__PURE__ */ jsx14("td", { children: tier4.area }, tier4.code))
        ] }),
        /* @__PURE__ */ jsxs13("tr", { children: [
          /* @__PURE__ */ jsx14("th", { scope: "row", children: "Target region" }),
          surveys_default.tiers.map((tier4) => /* @__PURE__ */ jsx14("td", { children: tier4.region }, tier4.code))
        ] }),
        /* @__PURE__ */ jsxs13("tr", { children: [
          /* @__PURE__ */ jsx14("th", { scope: "row", children: "Cadence" }),
          surveys_default.tiers.map((tier4) => /* @__PURE__ */ jsx14("td", { children: tier4.cadence }, tier4.code))
        ] }),
        /* @__PURE__ */ jsxs13("tr", { children: [
          /* @__PURE__ */ jsx14("th", { scope: "row", children: "Depth" }),
          surveys_default.tiers.map((tier4) => /* @__PURE__ */ jsx14("td", { children: tier4.depth }, tier4.code))
        ] }),
        /* @__PURE__ */ jsxs13("tr", { children: [
          /* @__PURE__ */ jsx14("th", { scope: "row", children: "Status" }),
          surveys_default.tiers.map((tier4) => /* @__PURE__ */ jsx14("td", { children: tier4.statusLabel }, tier4.code))
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs13("p", { className: "footnote", style: { marginTop: "0.75rem" }, children: [
      "Depths are 5\u03C3 point-source limits in the m600 band. The RIS figure is the depth of one visit (3 \xD7 100 s); the WTS and IMS figures are cumulative over the planned five-year operation. Measured performance is reported on the",
      " ",
      /* @__PURE__ */ jsx14(Link10, { to: "/users/performance", children: "performance page" }),
      ", and current progress on each survey page."
    ] })
  ] }),
  /* @__PURE__ */ jsx14(Section, { eyebrow: "Tiling", title: "One tile pattern for the whole program", alt: !0, children: /* @__PURE__ */ jsxs13("div", { className: "split split--wide-text", children: [
    /* @__PURE__ */ jsxs13("div", { children: [
      /* @__PURE__ */ jsx14("p", { className: "prose", children: surveyTilingText }),
      /* @__PURE__ */ jsx14("p", { className: "prose", children: surveyTilingText2 })
    ] }),
    /* @__PURE__ */ jsx14("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs13("table", { className: "spec-table", children: [
      /* @__PURE__ */ jsx14("caption", { children: "Tiling and exposure" }),
      /* @__PURE__ */ jsx14("tbody", { children: TILING.map((row) => /* @__PURE__ */ jsxs13("tr", { children: [
        /* @__PURE__ */ jsx14("th", { scope: "row", children: row[0] }),
        /* @__PURE__ */ jsx14("td", { children: row[1] })
      ] }, row[0])) })
    ] }) })
  ] }) }),
  /* @__PURE__ */ jsxs13(Section, { eyebrow: "Rationale", title: "Why three surveys and not one", children: [
    /* @__PURE__ */ jsx14("p", { className: "prose", children: surveys_default.designNote }),
    /* @__PURE__ */ jsx14("div", { className: "grid grid-cols-3", style: { marginTop: "2rem" }, children: surveys_default.tiers.map((tier4) => /* @__PURE__ */ jsxs13(Link10, { className: "tier-card tier-card--link", to: PAGES[tier4.code], children: [
      /* @__PURE__ */ jsx14("span", { className: "tier-card__code", children: tier4.code }),
      /* @__PURE__ */ jsx14("h3", { className: "tier-card__name", children: tier4.name }),
      /* @__PURE__ */ jsx14("p", { className: "rationale__tradeoff", style: { marginBottom: "0.75rem" }, children: tier4.tradeoff }),
      /* @__PURE__ */ jsx14("p", { className: "tier-card__note", children: tier4.goal }),
      /* @__PURE__ */ jsx14("span", { className: `pill pill--${tier4.status}`, children: tier4.statusLabel })
    ] }, tier4.code)) }),
    /* @__PURE__ */ jsx14("p", { className: "note", style: { marginTop: "1.5rem" }, children: "Each survey page carries its own strategy, sky map, coverage and current status." })
  ] })
] }), survey_overview_default = Index9;

// app/routes/telescope.mode.tsx
var telescope_mode_exports = {};
__export(telescope_mode_exports, {
  loader: () => loader2
});
import { redirect as redirect2 } from "@remix-run/node";
function loader2() {
  return redirect2("/users/propose", 301);
}

// app/routes/users.software.tsx
var users_software_exports = {};
__export(users_software_exports, {
  default: () => users_software_default,
  meta: () => meta10
});
import { Link as Link11 } from "@remix-run/react";

// app/routes/content/software.json
var software_default = {
  note: "Operations and reduction software. Source: Kim et al., Proc. SPIE 14147-84, Sec. 2.4; Hyun et al., Proc. SPIE 14155-12.",
  systems: [
    {
      name: "RTCSpy",
      expansion: "Robotic Telescope Control System with Python",
      role: "Array control, scheduling and target-of-opportunity response",
      since: "Operational since August 2024",
      body: "The autonomous operations framework that drives the array. Built on the TCSpy control layer, RTCSpy automates the whole night \u2014 startup, target selection, science observation, calibration acquisition, data transfer and shutdown \u2014 while coordinating all sixteen operational units over real-time network communication. A dedicated Target of Opportunity manager watches external alerts and can interrupt an ongoing observation, giving a response time of less than one minute between alert ingestion and the start of a follow-up exposure.",
      layers: [
        ["Control layer", "Device interfaces to mounts, cameras, focusers and filter wheels through ASCOM Alpaca and the PWI4 HTTP API."],
        ["Support layer", "A MySQL dynamic target database holding targets, status and precomputed observability; an observation queue manager that ranks candidates in real time; a data transfer manager; and a weather monitor that suspends and resumes operation."],
        ["Application layer", "Composes those components into the high-level applications executed during routine nightly operation."]
      ],
      stats: [
        { value: "1.75", unit: "M", label: "Images acquired unattended" },
        { value: "< 1", unit: "min", label: "Alert to first exposure" },
        { value: "\u2248 100", unit: "", label: "ToO follow-ups" }
      ]
    },
    {
      name: "Py7DT",
      expansion: "7DT data reduction pipeline",
      role: "Preprocessing through difference imaging, at survey throughput",
      since: "Sole operational pipeline since January 2026",
      body: "Py7DT reduces heterogeneous data from many telescope units, filters and observing modes while sustaining nightly survey throughput and minimizing latency for transient events. It succeeds gpPy-GPU, inheriting its scientific routines and choice of external engines but rebuilding the orchestration around them. Images are grouped by their properties into configurations, submitted to an SQLite-backed system queue, and dispatched in parallel according to priority and stage hierarchy \u2014 typically fifteen workers, three of them reserved for preprocessing.",
      layers: [
        ["Orchestration", "DataReduction, BluePrint and Scheduler convert observations into executable processing units and track their dependencies."],
        ["Processing", "Preprocess, Astrometry, Photometry, ImCoadd and ImSubtract run the standard reduction on each group."],
        ["Management", "Multi-level logging, a composite-error registry for structured exception handling, automatically generated quality-assessment flags carried in FITS headers, and a web-based monitoring interface."]
      ],
      stats: [
        { value: "66 \xB1 24", unit: "GB/hr", label: "Median throughput" },
        { value: "\u2248 5", unit: "hr", label: "Per 3,000-image night" },
        { value: "3.3 \xB1 2.0", unit: "s", label: "Preprocessing per image" }
      ]
    },
    {
      name: "gwportal",
      expansion: "7DS data and operations database",
      role: "System of record for observations, processing state and data quality",
      since: "In operational use",
      body: "A Django and PostgreSQL database that manages all 7DT data and integrates the operations of RTCSpy and Py7DT. Its survey schema is synchronized in real time and mirrors the operational state of the pipeline: process_status records the progress of every product along with its software version and any error codes, while image_qa holds quality metrics \u2014 seeing, ellipticity, 5\u03C3 depth, astrometric precision \u2014 for every image produced. A companion dependency table traces the provenance of any output back through coadds, processed singles, master frames and raw exposures.",
      layers: [
        ["Pipeline status", "Real-time processing progress, QA summaries, logs, check plots and manual reprocessing triggers."],
        ["ToO page", "Observation requests, the history of past events and the current status of the telescope units."],
        ["Documentation wiki", "User manuals, event logs and QA criteria for internal team members and external users of 7DT data."]
      ],
      stats: [
        { value: "3.6", unit: "PB", label: "Archive capacity" },
        { value: "\u2248 3,000", unit: "", label: "Images ingested nightly" },
        { value: "\u2248 30", unit: "", label: "Tiles observed nightly" }
      ]
    }
  ],
  stages: [
    {
      module: "Preprocess",
      body: "Bias, dark and flat correction against master frames matched to the science data by camera, gain, binning, unit, night and filter. Raw frames sharing a master set are loaded as a cube and processed by array broadcasting, reducing per-image time to about one second under optimal conditions, and to 3.3 \xB1 2.0 s in routine operation; GPU preprocessing through CuPy is available as an option, though the throughput gain in this deployment is minimal. Master-frame selection quality is recorded as a bitmask in the FITS header so that a compromise is always visible downstream."
    },
    {
      module: "Astrometry",
      body: "World coordinate solutions against Gaia DR3, pre-cut to RIS tiles and to HEALPix cells for arbitrary pointings. SCAMP is the default engine, with Astrometry.net as a fallback for blind solves. This is also the first stage that extracts sources, so it generates the image-quality metrics: astrometric separation statistics, field vertices and position angle, PSF size and elongation in radial bins, and source counts against a magnitude-limited reference."
    },
    {
      module: "Photometry",
      body: "Flux-calibrated source catalogs from SExtractor, in fixed apertures and in the AUTO aperture. Zero points come from synthetic photometry integrated from Gaia XP spectra over each 7DT bandpass \u2014 an unusual advantage for an instrument with an unusual filter set. The module runs on single, coadd and difference images alike."
    },
    {
      module: "ImCoadd",
      body: "Background subtraction, zero-point scaling, weight maps, bad-pixel interpolation, PSF homogenization, reprojection and combination via SWarp with a LANCZOS3 kernel. Flux scaling is defined to put the coadd at a zero point of 23.9 AB, so that pixel values carry units of microjansky."
    },
    {
      module: "ImSubtract",
      body: "Difference image analysis with HOTPANTS against a reference of the same field. Because of the unusual filter set, 7DT uses homogeneous references from RIS taken with the same instrument; Pan-STARRS templates are available as an option for the broad bands. Difference imaging is skipped where no reference exists yet."
    }
  ],
  external: [
    ["SExtractor", "Source extraction and photometry"],
    ["SCAMP", "Astrometric and photometric solution"],
    ["SWarp", "Reprojection and coaddition"],
    ["HOTPANTS", "Difference image analysis"],
    ["Astrometry.net", "Blind astrometric fallback"],
    ["CuPy", "GPU-accelerated preprocessing"],
    ["Gaia DR3 / XP", "Astrometric and spectrophotometric reference"]
  ]
};

// app/routes/users.software.tsx
import { Fragment as Fragment6, jsx as jsx15, jsxs as jsxs14 } from "react/jsx-runtime";
var meta10 = () => [
  { title: "Software \xB7 7DT for users" },
  {
    name: "description",
    content: "Software available to 7DT users: supy for analysis, Py7DT for reprocessing, and the operational systems that produce the data."
  }
], SUPY_MODULES = [
  ["Observer", "Target visibility and altitude from El Sauce, including StarAlt-style plots"],
  ["Tiles", "Tile lookup by coordinate, matching against a localization region, and tile plotting"],
  ["Simulator", "Filter and detector response simulation for the 7DT bands"],
  ["const", "Instrument and site constants used by the other modules"]
], Index10 = () => /* @__PURE__ */ jsxs14(PageLayout, { menu: "manuUsers", children: [
  /* @__PURE__ */ jsx15(
    PageHero,
    {
      eyebrow: "For users",
      title: /* @__PURE__ */ jsxs14(Fragment6, { children: [
        "Available ",
        /* @__PURE__ */ jsx15("em", { children: "software" })
      ] }),
      lede: "What to install to plan an observation or work with 7DT data, and what produced the data in the first place.",
      image: "/img/hero/computer.jpg"
    }
  ),
  /* @__PURE__ */ jsx15(Section, { eyebrow: "Analysis", title: "supy", children: /* @__PURE__ */ jsxs14("div", { className: "split split--wide-text", children: [
    /* @__PURE__ */ jsxs14("div", { children: [
      /* @__PURE__ */ jsxs14("p", { className: "prose", children: [
        /* @__PURE__ */ jsx15("code", { children: "supy" }),
        " is a collection of Python utilities for members and users of the 7DT survey. It covers the tasks that come up before and after an observation rather than the reduction itself: working out whether a target is observable, finding which tiles cover a position or a gravitational-wave localization region, and simulating the response of the filter set."
      ] }),
      /* @__PURE__ */ jsxs14("p", { className: "prose", children: [
        "It is installed from source. Documentation, including worked examples for each module, is published at ",
        /* @__PURE__ */ jsx15("code", { children: "sdt-supy.readthedocs.io" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs14("div", { className: "panel panel--alt", style: { marginTop: "1.5rem" }, children: [
        /* @__PURE__ */ jsx15("div", { className: "panel__title", children: "Install" }),
        /* @__PURE__ */ jsx15(
          "pre",
          {
            style: {
              margin: 0,
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              lineHeight: 1.7,
              overflowX: "auto"
            },
            children: /* @__PURE__ */ jsxs14("code", { children: [
              "git clone https://github.com/7DimensionalTelescope/supy.git",
              `
`,
              "cd supy",
              `
`,
              "pip install ."
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs14("div", { className: "btn-row", style: { marginTop: "1.25rem" }, children: [
        /* @__PURE__ */ jsx15(
          "a",
          {
            className: "btn btn--primary",
            href: "https://sdt-supy.readthedocs.io/en/latest/",
            target: "_blank",
            rel: "noreferrer",
            children: "Documentation"
          }
        ),
        /* @__PURE__ */ jsx15(
          "a",
          {
            className: "btn btn--secondary",
            href: "https://github.com/7DimensionalTelescope/supy",
            target: "_blank",
            rel: "noreferrer",
            children: "Source"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx15("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs14("table", { className: "spec-table", children: [
      /* @__PURE__ */ jsx15("caption", { children: "Modules" }),
      /* @__PURE__ */ jsx15("tbody", { children: SUPY_MODULES.map((row) => /* @__PURE__ */ jsxs14("tr", { children: [
        /* @__PURE__ */ jsx15("th", { scope: "row", style: { fontFamily: "var(--font-mono)" }, children: row[0] }),
        /* @__PURE__ */ jsx15("td", { children: row[1] })
      ] }, row[0])) })
    ] }) })
  ] }) }),
  /* @__PURE__ */ jsxs14(Section, { eyebrow: "Reprocessing", title: "Running the pipeline yourself", alt: !0, children: [
    /* @__PURE__ */ jsx15("p", { className: "prose", children: softwareReuseText }),
    /* @__PURE__ */ jsxs14("p", { className: "note", style: { marginTop: "1rem" }, children: [
      "Py7DT uses a rolling-release version scheme in which the last digit is incremented whenever a scientific decision changes how data are processed. That version is recorded in every configuration file and in the process status database, so any product can be traced to the code that made it and reprocessed in bulk when the code changes. What each stage does is described under ",
      /* @__PURE__ */ jsx15(Link11, { to: "/users/access#format", children: "using the data" }),
      "."
    ] })
  ] }),
  /* @__PURE__ */ jsxs14(Section, { eyebrow: "Operations", title: "The systems that produce the data", children: [
    /* @__PURE__ */ jsx15("p", { className: "prose", children: "Three systems close observation, reduction and analysis into a nightly loop. They are not installed by external users, but knowing which one recorded a given quantity is often useful when interpreting it." }),
    /* @__PURE__ */ jsx15("div", { className: "stack-lg", style: { marginTop: "2rem" }, children: software_default.systems.map((system) => /* @__PURE__ */ jsxs14("div", { className: "panel", id: system.name.toLowerCase(), children: [
      /* @__PURE__ */ jsxs14("div", { className: "rationale__head", children: [
        /* @__PURE__ */ jsx15("span", { className: "tier-card__code", children: system.name }),
        /* @__PURE__ */ jsx15("h3", { children: system.role })
      ] }),
      /* @__PURE__ */ jsx15("p", { className: "eyebrow", style: { marginBottom: "0.5rem" }, children: system.expansion }),
      /* @__PURE__ */ jsx15("p", { className: "prose", style: { fontSize: "1rem" }, children: system.body }),
      /* @__PURE__ */ jsx15(StatGrid, { items: system.stats })
    ] }, system.name)) }),
    /* @__PURE__ */ jsxs14("p", { className: "note", style: { marginTop: "2rem" }, children: [
      "Full technical descriptions are in Hyun et al., ",
      /* @__PURE__ */ jsx15("i", { children: "Py7DT: Data Reduction Pipeline of the 7-Dimensional Telescope" }),
      " (Proc. SPIE 14155-12), and Choi et al., Proc. SPIE 14151-12, which covers RTCSpy. See ",
      /* @__PURE__ */ jsx15(Link11, { to: "/publication/list", children: "publications" }),
      "."
    ] })
  ] })
] }), users_software_default = Index10;

// app/routes/about.funding.tsx
var about_funding_exports = {};
__export(about_funding_exports, {
  default: () => about_funding_default,
  meta: () => meta11
});
import { jsx as jsx16, jsxs as jsxs15 } from "react/jsx-runtime";
var meta11 = () => [
  { title: "Funding \xB7 7-Dimensional Telescope" },
  {
    name: "description",
    content: "Grants and institutions supporting the 7-Dimensional Telescope and Sky Survey."
  }
], Index11 = () => /* @__PURE__ */ jsxs15(PageLayout, { menu: "manuAbout", children: [
  /* @__PURE__ */ jsx16(
    PageHero,
    {
      eyebrow: "About",
      title: "Funding sources",
      lede: "The bodies that fund the facility, its operation, and the network that carries its data.",
      image: "/img/hero/about.jpg"
    }
  ),
  /* @__PURE__ */ jsx16(Section, { eyebrow: "Host center", title: "Center for the Gravitational-wave Universe", children: /* @__PURE__ */ jsxs15("div", { className: "split split--wide-text", children: [
    /* @__PURE__ */ jsx16("p", { className: "prose", children: fundingGWText }),
    /* @__PURE__ */ jsx16("figure", { className: "figure", children: /* @__PURE__ */ jsx16(
      "img",
      {
        src: "/img/institutes/gwuniv.png",
        alt: "Center for the Gravitational-wave Universe",
        style: { padding: "2rem", background: "#fff" },
        loading: "lazy"
      }
    ) })
  ] }) }),
  /* @__PURE__ */ jsx16(Section, { eyebrow: "Agencies", title: "Project support", alt: !0, children: /* @__PURE__ */ jsxs15("div", { className: "split split--wide-text", children: [
    /* @__PURE__ */ jsxs15("div", { children: [
      /* @__PURE__ */ jsx16("p", { className: "prose", children: fundingNRFText }),
      /* @__PURE__ */ jsx16("p", { className: "prose", children: fundingKASIText })
    ] }),
    /* @__PURE__ */ jsx16("figure", { className: "figure", children: /* @__PURE__ */ jsx16(
      "img",
      {
        src: "/img/institutes/nrf.jpg",
        alt: "National Research Foundation of Korea",
        style: { padding: "2rem", background: "#fff" },
        loading: "lazy"
      }
    ) })
  ] }) }),
  /* @__PURE__ */ jsx16(Section, { eyebrow: "Infrastructure", title: "KREONET / KISTI", children: /* @__PURE__ */ jsx16("p", { className: "prose", children: fundingKreonetText }) })
] }), about_funding_default = Index11;

// app/routes/survey.design.tsx
var survey_design_exports = {};
__export(survey_design_exports, {
  loader: () => loader3
});
import { redirect as redirect3 } from "@remix-run/node";
function loader3() {
  return redirect3("/survey/overview", 301);
}

// app/routes/survey.status.tsx
var survey_status_exports = {};
__export(survey_status_exports, {
  loader: () => loader4
});
import { redirect as redirect4 } from "@remix-run/node";
function loader4() {
  return redirect4("/users/status", 301);
}

// app/routes/users.propose.tsx
var users_propose_exports = {};
__export(users_propose_exports, {
  default: () => users_propose_default,
  headers: () => headers,
  loader: () => loader5,
  meta: () => meta12
});
import { Link as Link12, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

// app/lib/portal.server.ts
import fs from "node:fs";
import path from "node:path";

// app/routes/content/status-snapshot.json
var status_snapshot_default = { version: "0.6", source: "7DT GW Portal", generated_at: "2026-08-03T04:36:33.310776+00:00", telescopes: { total: 20, online: 16, status_updated_at: "2026-07-14T13:56:17.111000+00:00" }, totals: { science_frames: 2199304, observing_nights: 754, exposure_hours: 48704.3 }, nightly: { basis: "all observing nights (nights with science frames)", n_nights: 754, first_night: "2023-10-10", last_night: "2026-07-12", tiles_per_night: { n: 599, mean: 36.2, median: 36, mode: 36, min: 1, max: 590 }, exposures_per_night: { n: 754, mean: 2916.8, median: 2595.5, mode: 2520, min: 7, max: 24570 }, raw_gb_per_night: { n: 754, mean: 382.7, median: 375.1, mode: 396, min: 0.8, max: 2185.4 } }, ris: { tiles_observed: 15513, tiles_defined: 25472, coverage_pct: 60.9, tiles_observed_extended: 15579, tiles_extended: 28520 }, ims: { n_tiles: 7, min_cycles_per_tile: 225, max_cycles_per_tile: 276, cycles_per_tile: { T02252: 244, T02385: 260, T02386: 276, T02523: 251, T02524: 257, T02665: 225, T02666: 241 } }, too: { followup_events: 178, gw_campaigns: 9, gw_event_ids: ["S251112cm", "S250830bp", "S250725j", "S250328ae", "S250206dm", "S241011k", "S240925n", "S240915b", "S240910ci"] }, notes: ["ris.tiles_defined/tiles_observed cover the original RIS grid (T00000-T25471); the *_extended fields cover the full grid including the northern extension.", "nightly stats cover all observing nights; nights where a metric is zero are excluded from that metric (each block's 'n' is its actual night count); mode is computed on integer-rounded values.", "raw_gb_per_night includes calibration (bias/dark/flat) frames.", "ims cycles count distinct observing nights per IMS tile.", "gw_event_ids are LVK superevent IDs (public alerts); no target-level details are published here.", "observing_nights and n_nights share one definition: nights with science frames.", "Aggregates only; payload refreshed at most every ~15 minutes."] };

// app/lib/portal.server.ts
function fromEnvFile(key) {
  try {
    let file = fs.readFileSync(path.join(process.cwd(), ".env"), "utf8");
    for (let line of file.split(`
`)) {
      let trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#"))
        continue;
      let eq = trimmed.indexOf("=");
      if (eq > 0 && trimmed.slice(0, eq).trim() === key)
        return trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    }
  } catch {
  }
}
function readEnv(key) {
  let value = process.env[key] || fromEnvFile(key);
  return value && value.trim() ? value.trim() : void 0;
}
var BASE = (process.env.PORTAL_API_BASE || fromEnvFile("PORTAL_API_BASE") || "").replace(/\/$/, ""), TIMEOUT_MS = { status: 6e3, tiles: 45e3 };
function minutes(key, fallback) {
  let raw = process.env[key] || fromEnvFile(key), parsed = raw ? Number(raw) : NaN;
  return (Number.isFinite(parsed) && parsed > 0 ? parsed : fallback) * 60 * 1e3;
}
var TTL = {
  status: minutes("PORTAL_TTL_STATUS_MIN", 30),
  tiles: minutes("PORTAL_TTL_TILES_MIN", 24 * 60)
}, cache = /* @__PURE__ */ new Map(), inFlight = /* @__PURE__ */ new Map(), RETRY_MS = 2 * 60 * 1e3;
async function getJson(endpoint, key) {
  if (!BASE)
    throw new Error("PORTAL_API_BASE is not configured");
  let response = await fetch(`${BASE}${endpoint}`, {
    signal: AbortSignal.timeout(TIMEOUT_MS[key]),
    headers: { accept: "application/json" }
  });
  if (!response.ok)
    throw new Error(`${endpoint} responded ${response.status}`);
  return await response.json();
}
function revalidate(key, load) {
  let existing = inFlight.get(key);
  if (existing)
    return existing;
  let task = load().then((value) => (cache.set(key, { at: Date.now(), value, failed: !1 }), value)).catch((error) => {
    let hit = cache.get(key);
    throw hit && cache.set(key, {
      ...hit,
      at: Date.now() - TTL[key] + RETRY_MS,
      value: { ...hit.value, live: !1 },
      failed: !0
    }), error;
  }).finally(() => inFlight.delete(key));
  return inFlight.set(key, task), task;
}
async function cached(key, load) {
  let hit = cache.get(key);
  return hit && Date.now() - hit.at < TTL[key] ? hit.value : hit ? (revalidate(key, load).catch(() => {
  }), cache.get(key).value) : revalidate(key, load);
}
function getStatus() {
  return cached("status", async () => {
    let data = await getJson("/status/", "status");
    return { data, live: !0, generatedAt: data.generated_at };
  }).catch(() => ({
    data: status_snapshot_default,
    live: !1,
    generatedAt: status_snapshot_default.generated_at
  }));
}
var DAY_MS = 24 * 60 * 60 * 1e3, dayIndex = (iso, epochMs) => Math.round((Date.parse(`${iso}T00:00:00Z`) - epochMs) / DAY_MS), BROADBAND_NM = { u: 355, g: 477, r: 623, i: 762, z: 913 };
function filterWavelength(name) {
  let medium = /^m(\d+)w?$/.exec(name);
  return medium ? Number(medium[1]) : BROADBAND_NM[name] ?? Number.POSITIVE_INFINITY;
}
function getTileMap() {
  return cached("tiles", async () => {
    let raw = await getJson("/tiles/", "tiles"), tiles = raw.tiles.filter((t) => Number.isFinite(t.ra) && Number.isFinite(t.dec)).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0), firstNight = tiles[0]?.first_night ?? "", lastNight = tiles[0]?.last_night ?? "";
    for (let tile of tiles)
      tile.first_night < firstNight && (firstNight = tile.first_night), tile.last_night > lastNight && (lastNight = tile.last_night);
    let epochMs = Date.parse(`${firstNight}T00:00:00Z`), numeric = tiles.map((t) => /^T\d{1,6}$/.test(t.name) ? Number(t.name.slice(1)) : NaN), nameDelta = numeric.every((n) => Number.isFinite(n)) && numeric.every((n, i) => i === 0 || n > numeric[i - 1]) ? numeric.map((n, i) => i === 0 ? n : n - numeric[i - 1]) : void 0, seen = /* @__PURE__ */ new Set();
    for (let tile of tiles)
      for (let name of Object.keys(tile.filters ?? {}))
        seen.add(name);
    let filters = [...seen].sort((a, b) => filterWavelength(a) - filterWavelength(b)), filterIndex = new Map(filters.map((name, i) => [name, i])), patterns = [], patternIndex = /* @__PURE__ */ new Map(), patternFor = (tile) => {
      let flat = Object.entries(tile.filters ?? {}).map(([name, frames]) => [filterIndex.get(name) ?? -1, frames]).filter(([i]) => i >= 0).sort((a, b) => a[0] - b[0]).flatMap(([i, frames]) => [i, frames]), key = flat.join(","), at = patternIndex.get(key);
      return at === void 0 && (at = patterns.push(flat) - 1, patternIndex.set(key, at)), at;
    }, data = {
      count: tiles.length,
      ...nameDelta ? { nameDelta } : { name: tiles.map((t) => t.name) },
      // One decimal is well below the ~1° tile pitch and halves the payload.
      ra: tiles.map((t) => Math.round(t.ra * 10) / 10),
      dec: tiles.map((t) => Math.round(t.dec * 10) / 10),
      visits: tiles.map((t) => t.n_nights),
      frames: tiles.map((t) => t.n_frames),
      lastDay: tiles.map((t) => dayIndex(t.last_night, epochMs)),
      // Most tiles were observed on a single night, so a span of zero repeats
      // thousands of times and costs almost nothing to send.
      span: tiles.map((t) => dayIndex(t.last_night, epochMs) - dayIndex(t.first_night, epochMs)),
      pattern: tiles.map(patternFor),
      filters,
      filterWave: filters.map(filterWavelength),
      patterns,
      epochDate: firstNight,
      visitsMax: 0,
      framesMax: 0,
      firstNight,
      lastNight
    };
    return data.visitsMax = data.visits.reduce((a, b) => b > a ? b : a, 0), data.framesMax = (data.frames ?? []).reduce((a, b) => b > a ? b : a, 0), { data, live: !0, generatedAt: raw.generated_at };
  }).catch(() => ({ data: EMPTY_TILES, live: !1, generatedAt: "" }));
}
var ids = null;
function runningId(deltas, index) {
  if (!ids || ids.from !== deltas) {
    let out = new Int32Array(deltas.length), running = 0;
    for (let i = 0; i < deltas.length; i += 1)
      running += deltas[i], out[i] = running;
    ids = { from: deltas, value: out };
  }
  return ids.value[index];
}
async function getTilesNear(ra, dec, radius) {
  let full = await getTileMap(), { data } = full, found = [], cosDec = Math.cos(dec * (Math.PI / 180));
  for (let i = 0; i < data.count; i += 1) {
    let dDec = data.dec[i] - dec;
    if (Math.abs(dDec) > radius)
      continue;
    let dRa = data.ra[i] - ra;
    dRa > 180 && (dRa -= 360), dRa < -180 && (dRa += 360), !(Math.abs(dRa * cosDec) > radius) && found.push({
      name: data.name ? data.name[i] : `T${String(runningId(data.nameDelta ?? [], i)).padStart(5, "0")}`,
      ra: data.ra[i],
      dec: data.dec[i],
      visits: data.visits[i],
      frames: data.frames?.[i] ?? 0,
      lastDay: data.lastDay[i],
      epochDate: data.epochDate
    });
  }
  return { ...full, data: found };
}
var lite = /* @__PURE__ */ new Map();
async function getTileMapLite(withNames = !1) {
  let full = await getTileMap(), key = withNames ? "named" : "bare", held = lite.get(key);
  if (held && held.from === full.generatedAt)
    return held.value;
  let { frames, span, pattern, filters, filterWave, patterns, name, nameDelta, ...rest } = full.data, data = withNames ? { ...rest, name, nameDelta } : rest, value = { ...full, data };
  return lite.set(key, { from: full.generatedAt, value }), value;
}
BASE && setTimeout(() => {
  getStatus().catch(() => {
  }), getTileMap().catch(() => {
  });
}, 500).unref?.();
var EMPTY_TILES = {
  count: 0,
  name: [],
  ra: [],
  dec: [],
  visits: [],
  frames: [],
  lastDay: [],
  span: [],
  pattern: [],
  filters: [],
  filterWave: [],
  patterns: [],
  epochDate: "2023-10-01",
  visitsMax: 0,
  framesMax: 0,
  firstNight: "",
  lastNight: ""
};

// app/routes/users.propose.tsx
import { Fragment as Fragment7, jsx as jsx17, jsxs as jsxs16 } from "react/jsx-runtime";
var meta12 = () => [
  { title: "How to propose \xB7 7DT for users" },
  {
    name: "description",
    content: "Observing modes, target-of-opportunity response and how observing time on 7DT is requested."
  }
], CACHE = "public, max-age=900, stale-while-revalidate=86400", headers = () => ({ "Cache-Control": CACHE });
async function loader5() {
  let status = await getStatus();
  return json(
    { too: status.data.too, live: status.live, generatedAt: status.generatedAt },
    { headers: { "Cache-Control": CACHE } }
  );
}
var num = (value) => value.toLocaleString("en-US"), Index12 = () => {
  let { too, live, generatedAt } = useLoaderData();
  return /* @__PURE__ */ jsxs16(PageLayout, { menu: "manuUsers", children: [
    /* @__PURE__ */ jsx17(
      PageHero,
      {
        eyebrow: "For users",
        title: /* @__PURE__ */ jsxs16(Fragment7, { children: [
          "How to ",
          /* @__PURE__ */ jsx17("em", { children: "propose" })
        ] }),
        lede: "What the array can be asked to do, how an observation is specified, and how time is requested.",
        image: "/img/hero/telescope.jpg"
      }
    ),
    /* @__PURE__ */ jsxs16(Section, { eyebrow: "Modes", title: "Four observing modes", children: [
      /* @__PURE__ */ jsx17("p", { className: "prose", children: modeText }),
      /* @__PURE__ */ jsx17("ul", { className: "feature-list", style: { marginTop: "2rem" }, children: surveys_default.modes.map((mode2, index) => /* @__PURE__ */ jsxs16("li", { children: [
        /* @__PURE__ */ jsx17("span", { className: "feature-list__key", children: String(index + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxs16("div", { children: [
          /* @__PURE__ */ jsxs16("h3", { className: "feature-list__title", style: { fontSize: "1.125rem" }, children: [
            mode2.name,
            /* @__PURE__ */ jsx17(
              "span",
              {
                style: {
                  marginLeft: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--slate-500)",
                  fontWeight: 400
                },
                children: mode2.tagline
              }
            )
          ] }),
          /* @__PURE__ */ jsx17("p", { className: "feature-list__body", style: { maxWidth: "68ch" }, children: mode2.body })
        ] })
      ] }, mode2.name)) })
    ] }),
    /* @__PURE__ */ jsx17(Section, { eyebrow: "Specifying", title: "What an observation request contains", alt: !0, children: /* @__PURE__ */ jsxs16("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsxs16("div", { children: [
        /* @__PURE__ */ jsx17("p", { className: "prose", children: "An observation is specified by target position, observing mode, exposure time and the number of repetitions, together with any constraint on airmass, moon separation or time window. Positions on the survey tiling are preferred where the science allows, because data taken on a tile coadd directly with existing survey data and can be differenced against the reference image without an additional calibration step." }),
        /* @__PURE__ */ jsx17("p", { className: "prose", children: "Before requesting time, check the target is observable from El Sauce in the intended window, and check what already exists: much of the southern sky already has a medium-band reference image, and the tile under a given position may already carry the bands needed." })
      ] }),
      /* @__PURE__ */ jsxs16("div", { className: "panel", children: [
        /* @__PURE__ */ jsx17("div", { className: "panel__title", children: "Before you write" }),
        /* @__PURE__ */ jsxs16("ul", { className: "feature-list", style: { borderTop: 0, margin: 0 }, children: [
          /* @__PURE__ */ jsx17("li", { style: { gridTemplateColumns: "minmax(0, 1fr)" }, children: /* @__PURE__ */ jsx17("div", { children: /* @__PURE__ */ jsxs16("p", { className: "feature-list__body", style: { margin: 0 }, children: [
            "Check visibility and existing coverage \u2014 the",
            " ",
            /* @__PURE__ */ jsx17(Link12, { to: "/users/access", children: "data access page" }),
            " reports the bands and frame counts held for any position."
          ] }) }) }),
          /* @__PURE__ */ jsx17("li", { style: { gridTemplateColumns: "minmax(0, 1fr)" }, children: /* @__PURE__ */ jsx17("div", { children: /* @__PURE__ */ jsxs16("p", { className: "feature-list__body", style: { margin: 0 }, children: [
            "Estimate depth from the measured",
            " ",
            /* @__PURE__ */ jsx17(Link12, { to: "/users/performance", children: "limiting magnitudes" }),
            " rather than from the aperture."
          ] }) }) }),
          /* @__PURE__ */ jsx17("li", { style: { gridTemplateColumns: "minmax(0, 1fr)" }, children: /* @__PURE__ */ jsx17("div", { children: /* @__PURE__ */ jsxs16("p", { className: "feature-list__body", style: { margin: 0 }, children: [
            "Target visibility and filter response can be computed with",
            " ",
            /* @__PURE__ */ jsx17(Link12, { to: "/users/software", children: /* @__PURE__ */ jsx17("code", { children: "supy" }) }),
            "."
          ] }) }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs16(Section, { eyebrow: "Response", title: "Target of opportunity", children: [
      /* @__PURE__ */ jsx17("p", { className: "prose", children: "When a transient alert arrives \u2014 a gamma-ray burst, a gravitational-wave candidate \u2014 the scheduler interrupts the observing plan and repoints. Two response modes are available: a regular mode that completes the current exposure block before switching, and a rapid mode that interrupts immediately. Once the follow-up finishes, the array returns to the queue and resumes the interrupted target if it is still observable. Time from alert ingestion to the start of a follow-up exposure is under one minute." }),
      /* @__PURE__ */ jsx17("p", { className: "prose", children: "Target-of-opportunity data are processed at elevated priority and the requester is notified when raw data arrive, as each filter set completes, and on completion with a spectral energy distribution plot and magnitude table attached." }),
      /* @__PURE__ */ jsx17("div", { style: { margin: "2rem 0 1.25rem" }, children: /* @__PURE__ */ jsx17(LiveBadge, { live, updated: generatedAt, interval: "every 30 minutes" }) }),
      /* @__PURE__ */ jsxs16("p", { className: "prose", children: [
        num(too.followup_events),
        " follow-up campaigns have been carried out since automated target-of-opportunity response entered service, ",
        num(too.gw_campaigns),
        " of them on gravitational-wave events."
      ] }),
      /* @__PURE__ */ jsx17("div", { className: "chip-row", style: { marginTop: "1.25rem" }, children: too.gw_event_ids.map((id) => /* @__PURE__ */ jsx17("span", { className: "chip chip--static", children: id }, id)) }),
      /* @__PURE__ */ jsx17("p", { className: "footnote", style: { marginTop: "1rem" }, children: "LVK superevent identifiers as issued in the public alert stream. Target-level details are not published here." })
    ] }),
    /* @__PURE__ */ jsx17(Section, { eyebrow: "Applying", title: "Requesting observing time", alt: !0, children: /* @__PURE__ */ jsxs16("div", { className: "panel", style: { maxWidth: "68ch" }, children: [
      /* @__PURE__ */ jsx17("div", { className: "panel__title", children: "No open call at present" }),
      /* @__PURE__ */ jsx17("p", { className: "feature-list__body", style: { marginBottom: "1rem" }, children: "Observing time is currently allocated within the collaboration and its partner institutions; there is no general call for proposals yet. A proposal template and an exposure time calculator will be published on this page when one opens. Enquiries about observations outside the survey program, including target-of-opportunity requests, should be addressed to the project directly." }),
      /* @__PURE__ */ jsx17(
        "a",
        {
          className: "btn btn--primary",
          href: "mailto:mim@astro.snu.ac.kr?subject=7DT%20observation%20enquiry",
          children: "Contact the project"
        }
      )
    ] }) })
  ] });
}, users_propose_default = Index12;

// app/routes/users.access.tsx
var users_access_exports = {};
__export(users_access_exports, {
  default: () => users_access_default,
  headers: () => headers2,
  loader: () => loader6,
  meta: () => meta13
});
import { json as json2 } from "@remix-run/node";
import { Link as Link13, useLoaderData as useLoaderData2 } from "@remix-run/react";

// app/components/skymap.tsx
import { useCallback, useEffect as useEffect3, useMemo as useMemo2, useRef as useRef2, useState as useState4 } from "react";

// app/components/colors.ts
var SPECTRUM = [
  [0, [91, 58, 209]],
  [0.14, [53, 99, 216]],
  [0.28, [43, 155, 196]],
  [0.42, [53, 171, 124]],
  [0.56, [143, 180, 63]],
  [0.68, [210, 177, 53]],
  [0.8, [216, 128, 47]],
  [0.9, [191, 66, 44]],
  [1, [140, 36, 32]]
], rgb = (c) => `rgb(${c[0]},${c[1]},${c[2]})`;
function spectrum(t) {
  let clamped = Math.max(0, Math.min(1, t)), i = 0;
  for (; i < SPECTRUM.length - 2 && clamped > SPECTRUM[i + 1][0]; )
    i += 1;
  let [t0, a] = SPECTRUM[i], [t1, b] = SPECTRUM[i + 1], f = t1 === t0 ? 0 : (clamped - t0) / (t1 - t0);
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f)
  ];
}
var isDark = (c) => 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2] < 140;
function wavelengthColor(nm) {
  let t = Math.max(0, Math.min(1, (nm - 400) / 500)), i = 0;
  for (; i < SPECTRUM.length - 2 && t > SPECTRUM[i + 1][0]; )
    i += 1;
  let [t0, a] = SPECTRUM[i], [t1, b] = SPECTRUM[i + 1], f = t1 === t0 ? 0 : (t - t0) / (t1 - t0);
  return rgb([
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f)
  ]);
}

// app/components/tiledetail.tsx
import { Fragment as Fragment8, jsx as jsx18, jsxs as jsxs17 } from "react/jsx-runtime";
var DAY_MS2 = 24 * 60 * 60 * 1e3, degLabel = (value) => `${value >= 0 ? "+" : "\u2212"}${Math.abs(value).toFixed(1)}\xB0`;
function dayLabel(index, epochDate) {
  return new Date(Date.parse(`${epochDate}T00:00:00Z`) + index * DAY_MS2).toISOString().slice(0, 10);
}
function duration(seconds) {
  let h = seconds / 3600;
  return h < 1 ? `${Math.round(seconds / 60)} min` : h < 10 ? `${h.toFixed(1)} h` : `${Math.round(h).toLocaleString("en-US")} h`;
}
function breakdown(tiles, index) {
  let { patterns, pattern, filters, filterWave } = tiles;
  if (!patterns || !pattern || !filters || !filterWave)
    return null;
  let flat = patterns[pattern[index]] ?? [], bands = [], broad = [], peak = 0;
  for (let i = 0; i < flat.length; i += 2) {
    let name = filters[flat[i]], frames = flat[i + 1];
    frames > peak && (peak = frames), name?.startsWith("m") ? bands.push({ name, nm: filterWave[flat[i]], frames }) : name && broad.push({ name, frames });
  }
  let byName = new Map(bands.map((band) => [band.name, band])), strip = filters.map((name, i) => ({ name, nm: filterWave[i] })).filter((f) => f.name.startsWith("m")).map((f) => ({ ...f, frames: byName.get(f.name)?.frames ?? 0 }));
  return { broad, strip, peak, count: bands.length + broad.length };
}
function findTileAt(tiles, ra, dec, fovLon = 1.34, fovLat = 0.9) {
  let wrapped = (ra % 360 + 360) % 360, best = -1, bestScore = 1 / 0;
  for (let i = 0; i < tiles.count; i += 1) {
    let dDec = tiles.dec[i] - dec;
    if (Math.abs(dDec) > fovLat / 2)
      continue;
    let dRa = tiles.ra[i] - wrapped;
    dRa > 180 && (dRa -= 360), dRa < -180 && (dRa += 360);
    let dRaSky = dRa * Math.cos(dec * (Math.PI / 180));
    if (Math.abs(dRaSky) > fovLon / 2)
      continue;
    let score = dRaSky * dRaSky + dDec * dDec;
    score < bestScore && (bestScore = score, best = i);
  }
  return best >= 0 ? best : null;
}
function TileDetail({
  tiles,
  index,
  name,
  ra,
  dec,
  l,
  b,
  exposureSec
}) {
  let detail = breakdown(tiles, index), frames = tiles.frames?.[index] ?? 0, span = tiles.span?.[index] ?? 0;
  return /* @__PURE__ */ jsxs17(Fragment8, { children: [
    /* @__PURE__ */ jsxs17("div", { className: "skymap__tip-head", children: [
      /* @__PURE__ */ jsx18("span", { className: "skymap__tip-name", children: name }),
      /* @__PURE__ */ jsx18("span", { className: "skymap__tip-badge", children: "Observed" })
    ] }),
    /* @__PURE__ */ jsxs17("dl", { className: "skymap__tip-grid", children: [
      /* @__PURE__ */ jsx18("dt", { children: "RA, Dec" }),
      /* @__PURE__ */ jsxs17("dd", { children: [
        ra.toFixed(1),
        "\xB0, ",
        degLabel(dec)
      ] }),
      /* @__PURE__ */ jsx18("dt", { children: "l, b" }),
      /* @__PURE__ */ jsxs17("dd", { children: [
        l.toFixed(1),
        "\xB0, ",
        degLabel(b)
      ] }),
      /* @__PURE__ */ jsx18("dt", { children: "Visits" }),
      /* @__PURE__ */ jsxs17("dd", { children: [
        tiles.visits[index].toLocaleString("en-US"),
        " ",
        tiles.visits[index] === 1 ? "night" : "nights"
      ] }),
      /* @__PURE__ */ jsx18("dt", { children: "Frames" }),
      /* @__PURE__ */ jsx18("dd", { children: frames.toLocaleString("en-US") }),
      exposureSec ? /* @__PURE__ */ jsxs17(Fragment8, { children: [
        /* @__PURE__ */ jsx18("dt", { children: "Exposure" }),
        /* @__PURE__ */ jsxs17("dd", { children: [
          "\u2248 ",
          duration(frames * exposureSec)
        ] })
      ] }) : null,
      detail && /* @__PURE__ */ jsxs17(Fragment8, { children: [
        /* @__PURE__ */ jsx18("dt", { children: "Filters" }),
        /* @__PURE__ */ jsx18("dd", { children: detail.count })
      ] }),
      /* @__PURE__ */ jsx18("dt", { children: "Dates" }),
      /* @__PURE__ */ jsxs17("dd", { children: [
        dayLabel(tiles.lastDay[index] - span, tiles.epochDate),
        span > 0 && /* @__PURE__ */ jsxs17(Fragment8, { children: [
          " \u2013 ",
          dayLabel(tiles.lastDay[index], tiles.epochDate)
        ] })
      ] })
    ] }),
    detail && /* @__PURE__ */ jsxs17(Fragment8, { children: [
      /* @__PURE__ */ jsx18("div", { className: "skymap__tip-bands", children: detail.strip.map((band) => /* @__PURE__ */ jsx18(
        "span",
        {
          className: "skymap__tip-band",
          title: `${band.name}: ${band.frames} frames`,
          children: /* @__PURE__ */ jsx18(
            "span",
            {
              className: "skymap__tip-band-fill",
              style: {
                height: `${band.frames > 0 ? Math.max(12, Math.sqrt(band.frames) / Math.sqrt(detail.peak) * 100) : 0}%`,
                background: wavelengthColor(band.nm)
              }
            }
          )
        },
        band.name
      )) }),
      /* @__PURE__ */ jsxs17("div", { className: "skymap__tip-scale", children: [
        /* @__PURE__ */ jsx18("span", { children: "400 nm" }),
        /* @__PURE__ */ jsx18("span", { children: "frames per medium band" }),
        /* @__PURE__ */ jsx18("span", { children: "875 nm" })
      ] }),
      detail.broad.length > 0 && /* @__PURE__ */ jsx18("p", { className: "skymap__tip-broad", children: detail.broad.map((band) => /* @__PURE__ */ jsxs17("span", { children: [
        /* @__PURE__ */ jsx18("b", { children: band.name }),
        " ",
        band.frames.toLocaleString("en-US")
      ] }, band.name)) })
    ] })
  ] });
}

// app/components/skymap.tsx
import { Fragment as Fragment9, jsx as jsx19, jsxs as jsxs18 } from "react/jsx-runtime";
var DEG = Math.PI / 180, RATIO = 0.52, TABLE_STEP = 0.1, TABLE = (() => {
  let n = Math.round(180 / TABLE_STEP) + 1, table = new Float64Array(n);
  for (let i = 0; i < n; i += 1) {
    let lat = (-90 + i * TABLE_STEP) * DEG, theta2 = lat;
    if (Math.abs(Math.abs(lat) - Math.PI / 2) < 1e-9)
      theta2 = lat > 0 ? Math.PI / 2 : -Math.PI / 2;
    else
      for (let k = 0; k < 12; k += 1) {
        let denominator = 2 + 2 * Math.cos(2 * theta2);
        if (Math.abs(denominator) < 1e-12)
          break;
        let step2 = (2 * theta2 + Math.sin(2 * theta2) - Math.PI * Math.sin(lat)) / denominator;
        if (theta2 -= step2, Math.abs(step2) < 1e-10)
          break;
      }
    table[i] = theta2;
  }
  return table;
})();
function theta(latDeg) {
  let position = (latDeg + 90) / TABLE_STEP, i = Math.max(0, Math.min(TABLE.length - 2, Math.floor(position))), f = position - i;
  return TABLE[i] * (1 - f) + TABLE[i + 1] * f;
}
var toLon = (raDeg) => -(((raDeg + 180) % 360 + 360) % 360 - 180);
function projectLon(lonDeg, decDeg) {
  let t = theta(decDeg);
  return [2 / Math.PI * lonDeg * DEG * Math.cos(t), Math.sin(t)];
}
function project(raDeg, decDeg) {
  return projectLon(toLon(raDeg), decDeg);
}
function unproject(x, y) {
  if (x * x / 4 + y * y > 1 + 1e-9)
    return null;
  let t = Math.asin(Math.max(-1, Math.min(1, y))), lat = Math.asin(Math.max(-1, Math.min(1, (2 * t + Math.sin(2 * t)) / Math.PI))) / DEG, cosT = Math.cos(t);
  if (cosT < 1e-9)
    return [0, lat > 0 ? 90 : -90];
  let lon = Math.PI * x / (2 * cosT) / DEG;
  return lon < -180.0001 || lon > 180.0001 ? null : [(-lon % 360 + 360) % 360, lat];
}
var NGP_RA = 192.85948 * DEG, NGP_DEC = 27.12825 * DEG, L_NCP = 122.93192 * DEG;
function equatorialToGalactic(raDeg, decDeg) {
  let ra = raDeg * DEG, dec = decDeg * DEG, sinDec = Math.sin(dec), cosDec = Math.cos(dec), dRa = ra - NGP_RA, sinB = Math.sin(NGP_DEC) * sinDec + Math.cos(NGP_DEC) * cosDec * Math.cos(dRa), b = Math.asin(Math.max(-1, Math.min(1, sinB))), y = cosDec * Math.sin(dRa), x = Math.cos(NGP_DEC) * sinDec - Math.sin(NGP_DEC) * cosDec * Math.cos(dRa), l = (L_NCP - Math.atan2(y, x)) / DEG;
  return l = (l % 360 + 360) % 360, [l, b / DEG];
}
function galacticToEquatorial(lDeg, bDeg) {
  let l = lDeg * DEG, b = bDeg * DEG, sinB = Math.sin(b), cosB = Math.cos(b), dL = L_NCP - l, sinDec = Math.sin(NGP_DEC) * sinB + Math.cos(NGP_DEC) * cosB * Math.cos(dL), dec = Math.asin(Math.max(-1, Math.min(1, sinDec))), y = cosB * Math.sin(dL), x = Math.cos(NGP_DEC) * sinB - Math.sin(NGP_DEC) * cosB * Math.cos(dL), ra = (NGP_RA + Math.atan2(y, x)) / DEG;
  return ra = (ra % 360 + 360) % 360, [ra, dec / DEG];
}
var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function monthLabel(index, epoch) {
  let total = epoch[1] - 1 + index;
  return `${MONTHS[(total % 12 + 12) % 12]} ${epoch[0] + Math.floor(total / 12)}`;
}
var DAY_MS3 = 24 * 60 * 60 * 1e3;
function SkyMap({
  tiles,
  exposureSec,
  emphasize,
  interactive = !0,
  caption,
  theme = "light"
}) {
  let dark = theme === "dark", canvasRef = useRef2(null), wrapRef = useRef2(null), [mode2, setMode] = useState4("date"), [frame, setFrame] = useState4("equatorial"), [width, setWidth] = useState4(960), [probe, setProbe] = useState4(null), hover = probe?.tile ?? null, ids2 = useMemo2(() => {
    if (!tiles.nameDelta)
      return null;
    let out = new Int32Array(tiles.nameDelta.length), running = 0;
    for (let i = 0; i < out.length; i += 1)
      running += tiles.nameDelta[i], out[i] = running;
    return out;
  }, [tiles]), nameAt = useCallback(
    (i) => ids2 ? `T${String(ids2[i]).padStart(5, "0")}` : tiles.name?.[i] ?? "",
    [ids2, tiles]
  ), emphasized = useMemo2(() => {
    if (!emphasize || emphasize.length === 0)
      return null;
    let wanted = new Set(emphasize), mask = new Uint8Array(tiles.count);
    for (let i = 0; i < tiles.count; i += 1)
      mask[i] = wanted.has(nameAt(i)) ? 1 : 0;
    return mask;
  }, [emphasize, tiles, nameAt]), months = useMemo2(() => {
    let epochMs = Date.parse(`${tiles.epochDate}T00:00:00Z`), index = new Int32Array(tiles.count), max = 0;
    for (let i = 0; i < tiles.count; i += 1) {
      let at = new Date(epochMs + tiles.lastDay[i] * DAY_MS3), m = (at.getUTCFullYear() - Number(tiles.epochDate.slice(0, 4))) * 12 + (at.getUTCMonth() + 1 - Number(tiles.epochDate.slice(5, 7)));
      index[i] = m, m > max && (max = m);
    }
    return { index, max };
  }, [tiles]), epoch = useMemo2(
    () => [Number(tiles.epochDate.slice(0, 4)), Number(tiles.epochDate.slice(5, 7))],
    [tiles.epochDate]
  ), coords = useMemo2(() => {
    if (frame === "equatorial")
      return { lon: tiles.ra, lat: tiles.dec };
    let lon = new Float64Array(tiles.count), lat = new Float64Array(tiles.count);
    for (let i = 0; i < tiles.count; i += 1) {
      let [l, b] = equatorialToGalactic(tiles.ra[i], tiles.dec[i]);
      lon[i] = l, lat[i] = b;
    }
    return { lon, lat };
  }, [frame, tiles]), visitScale = useMemo2(() => Math.log(tiles.visitsMax + 1), [tiles.visitsMax]), value = useCallback(
    (i) => mode2 === "date" ? months.max > 0 ? months.index[i] / months.max : 1 : Math.log(tiles.visits[i] + 1) / visitScale,
    [mode2, tiles, visitScale]
  );
  useEffect3(() => {
    let element = wrapRef.current;
    if (!element)
      return;
    let measure = () => setWidth(element.clientWidth || 960);
    if (measure(), typeof ResizeObserver > "u")
      return window.addEventListener("resize", measure), () => window.removeEventListener("resize", measure);
    let observer = new ResizeObserver(measure);
    return observer.observe(element), () => observer.disconnect();
  }, []), useEffect3(() => {
    let canvas = canvasRef.current;
    if (!canvas)
      return;
    let height = Math.round(width * RATIO), dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr), canvas.height = Math.round(height * dpr), canvas.style.height = `${height}px`;
    let ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0), ctx.clearRect(0, 0, width, height);
    let pad = 40, scale = Math.min((width - pad * 2) / 4, (height - pad * 1.4) / 2), cx = width / 2, cy = height / 2, px = (x) => cx + x * scale, py = (y) => cy - y * scale;
    ctx.save(), ctx.beginPath(), ctx.ellipse(cx, cy, 2 * scale, scale, 0, 0, Math.PI * 2), ctx.clip(), ctx.fillStyle = dark ? "rgba(255,255,255,0.05)" : "#e7edf5", ctx.fillRect(0, 0, width, height);
    let FOV_LON = 1.34, FOV_LAT = 0.9;
    for (let i = 0; i < tiles.count; i += 1) {
      let lat = coords.lat[i], t = theta(lat), [x, y] = project(coords.lon[i], lat), dLon = FOV_LON / Math.max(0.02, Math.cos(lat * DEG)), w = Math.max(1.1, 2 / Math.PI * dLon * DEG * Math.cos(t) * scale), hi = Math.min(90, lat + FOV_LAT / 2), lo = Math.max(-90, lat - FOV_LAT / 2), h = Math.max(1.1, (Math.sin(theta(hi)) - Math.sin(theta(lo))) * scale);
      ctx.fillStyle = emphasized && !emphasized[i] ? dark ? "rgba(255,255,255,0.12)" : "rgba(10,16,28,0.10)" : rgb(spectrum(value(i))), ctx.fillRect(px(x) - w / 2, py(y) - h / 2, w, h);
    }
    ctx.restore(), ctx.strokeStyle = dark ? "rgba(255,255,255,0.16)" : "rgba(10,16,28,0.18)", ctx.lineWidth = 0.6, ctx.setLineDash([2, 3]);
    for (let dec = -75; dec <= 75; dec += 15) {
      ctx.beginPath();
      for (let lon = -180; lon <= 180; lon += 2) {
        let [x, y] = projectLon(lon, dec);
        lon === -180 ? ctx.moveTo(px(x), py(y)) : ctx.lineTo(px(x), py(y));
      }
      ctx.stroke();
    }
    for (let lon = -150; lon <= 150; lon += 30) {
      ctx.beginPath();
      for (let dec = -90; dec <= 90; dec += 1) {
        let [x, y] = projectLon(lon, dec);
        dec === -90 ? ctx.moveTo(px(x), py(y)) : ctx.lineTo(px(x), py(y));
      }
      ctx.stroke();
    }
    if (ctx.setLineDash([]), ctx.strokeStyle = dark ? "rgba(255,255,255,0.42)" : "#0a101c", ctx.lineWidth = 1.2, ctx.beginPath(), ctx.ellipse(cx, cy, 2 * scale, scale, 0, 0, Math.PI * 2), ctx.stroke(), ctx.fillStyle = dark ? "rgba(255,255,255,0.62)" : "#4d5b71", ctx.font = '11px ui-monospace, "JetBrains Mono", monospace', ctx.textAlign = "center", ctx.textBaseline = "middle", frame === "equatorial")
      for (let hours = 2; hours <= 22; hours += 4) {
        let [x, y] = project(hours * 15, 0);
        ctx.fillText(`${String(hours).padStart(2, "0")}h`, px(x), py(y) - 9);
      }
    else
      for (let l of [30, 90, 150, 210, 270, 330]) {
        let [x, y] = project(l, 0);
        ctx.fillText(`${l}\xB0`, px(x), py(y) - 9);
      }
    ctx.textAlign = "right";
    for (let lat = -75; lat <= 75; lat += 15) {
      let [x, y] = projectLon(-180, lat);
      ctx.fillText(`${lat > 0 ? "+" : ""}${lat}\xB0`, px(x) - 7, py(y));
    }
  }, [tiles, coords, frame, width, value, emphasized, dark]);
  let onMove = (event) => {
    let canvas = canvasRef.current;
    if (!canvas)
      return;
    let rect = canvas.getBoundingClientRect(), height = rect.height, pad = 40, scale = Math.min((rect.width - pad * 2) / 4, (height - pad * 1.4) / 2), mx = event.clientX - rect.left, my = event.clientY - rect.top, sky = unproject((mx - rect.width / 2) / scale, (height / 2 - my) / scale);
    if (!sky) {
      setProbe(null);
      return;
    }
    let perDegree = scale * (2 / 180), tolerance = Math.max(6, perDegree * 1.2), best = -1, bestDistance = tolerance * tolerance;
    for (let i = 0; i < tiles.count; i += 1) {
      let [x, y] = project(coords.lon[i], coords.lat[i]), dx = rect.width / 2 + x * scale - mx, dy = height / 2 - y * scale - my, distance = dx * dx + dy * dy;
      distance < bestDistance && (bestDistance = distance, best = i);
    }
    let [lon, lat] = sky, equatorial = best >= 0 ? [tiles.ra[best], tiles.dec[best]] : frame === "equatorial" ? [lon, lat] : galacticToEquatorial(lon, lat), galactic = best >= 0 ? frame === "galactic" ? [coords.lon[best], coords.lat[best]] : equatorialToGalactic(tiles.ra[best], tiles.dec[best]) : frame === "galactic" ? [lon, lat] : equatorialToGalactic(lon, lat);
    setProbe({
      x: mx,
      y: my,
      tile: best >= 0 ? best : null,
      ra: equatorial[0],
      dec: equatorial[1],
      l: galactic[0],
      b: galactic[1]
    });
  }, legendStops = useMemo2(
    () => Array.from({ length: 12 }, (_, i) => rgb(spectrum(i / 11))).join(", "),
    []
  ), legendTicks = useMemo2(() => mode2 === "date" ? [0, 0.5, 1].map((t) => monthLabel(Math.round(t * months.max), epoch)) : [0, 0.5, 1].map((t) => `${Math.round(Math.exp(t * visitScale) - 1).toLocaleString("en-US")}`), [mode2, tiles, visitScale]);
  return /* @__PURE__ */ jsxs18("div", { className: `skymap${dark ? " skymap--dark" : ""}`, children: [
    interactive && /* @__PURE__ */ jsxs18("div", { className: "skymap__controls", children: [
      /* @__PURE__ */ jsxs18("div", { className: "skymap__modes", role: "group", "aria-label": "Coordinate system", children: [
        /* @__PURE__ */ jsx19(
          "button",
          {
            type: "button",
            className: "toggle-btn",
            "aria-pressed": frame === "equatorial",
            onClick: () => setFrame("equatorial"),
            children: "RA / Dec"
          }
        ),
        /* @__PURE__ */ jsx19(
          "button",
          {
            type: "button",
            className: "toggle-btn",
            "aria-pressed": frame === "galactic",
            onClick: () => setFrame("galactic"),
            children: "Galactic"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs18("div", { className: "skymap__modes", role: "group", "aria-label": "Color the map by", children: [
        /* @__PURE__ */ jsx19(
          "button",
          {
            type: "button",
            className: "toggle-btn",
            "aria-pressed": mode2 === "date",
            onClick: () => setMode("date"),
            children: "Latest observation"
          }
        ),
        /* @__PURE__ */ jsx19(
          "button",
          {
            type: "button",
            className: "toggle-btn",
            "aria-pressed": mode2 === "visits",
            onClick: () => setMode("visits"),
            children: "Number of visits"
          }
        )
      ] }),
      /* @__PURE__ */ jsx19("span", { className: "skymap__readout", role: "status", children: probe === null ? caption ?? `${tiles.count.toLocaleString("en-US")} tiles observed` : hover === null ? /* @__PURE__ */ jsxs18(Fragment9, { children: [
        "RA ",
        probe.ra.toFixed(1),
        "\xB0 Dec ",
        degLabel(probe.dec),
        " \xB7 not observed"
      ] }) : /* @__PURE__ */ jsxs18(Fragment9, { children: [
        /* @__PURE__ */ jsx19("b", { children: nameAt(hover) }),
        " \xB7",
        " ",
        frame === "equatorial" ? /* @__PURE__ */ jsxs18(Fragment9, { children: [
          "RA ",
          probe.ra.toFixed(1),
          "\xB0 Dec ",
          degLabel(probe.dec)
        ] }) : /* @__PURE__ */ jsxs18(Fragment9, { children: [
          "l ",
          probe.l.toFixed(1),
          "\xB0 b ",
          degLabel(probe.b)
        ] }),
        " ",
        "\xB7 ",
        tiles.visits[hover],
        " ",
        tiles.visits[hover] === 1 ? "visit" : "visits",
        " \xB7",
        " ",
        (tiles.frames?.[hover] ?? 0).toLocaleString("en-US"),
        " frames \xB7 last",
        " ",
        monthLabel(months.index[hover], epoch)
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs18("div", { className: "skymap__canvas", ref: wrapRef, children: [
      /* @__PURE__ */ jsx19(
        "canvas",
        {
          ref: canvasRef,
          style: { width: "100%", display: "block" },
          onPointerMove: interactive ? onMove : void 0,
          onPointerLeave: interactive ? () => setProbe(null) : void 0,
          role: "img",
          "aria-label": `Mollweide all-sky map of ${tiles.count.toLocaleString(
            "en-US"
          )} observed 7DS tiles in ${frame === "equatorial" ? "equatorial" : "galactic"} coordinates, colored by ${mode2 === "date" ? "the date each was last observed" : "the number of visits to each"}. Longitude increases to the left.`
        }
      ),
      probe && /* @__PURE__ */ jsx19(
        "div",
        {
          className: `skymap__tip${probe.x > width * 0.55 ? " skymap__tip--left" : ""}${probe.y > width * RATIO * 0.55 ? " skymap__tip--up" : ""}`,
          style: { left: probe.x, top: probe.y },
          "aria-hidden": "true",
          children: hover === null ? /* @__PURE__ */ jsxs18(Fragment9, { children: [
            /* @__PURE__ */ jsxs18("div", { className: "skymap__tip-head", children: [
              /* @__PURE__ */ jsx19("span", { className: "skymap__tip-name", children: "No observation" }),
              /* @__PURE__ */ jsx19("span", { className: "skymap__tip-badge skymap__tip-badge--none", children: "Not observed" })
            ] }),
            /* @__PURE__ */ jsxs18("dl", { className: "skymap__tip-grid", children: [
              /* @__PURE__ */ jsx19("dt", { children: "RA" }),
              /* @__PURE__ */ jsxs18("dd", { children: [
                probe.ra.toFixed(1),
                "\xB0"
              ] }),
              /* @__PURE__ */ jsx19("dt", { children: "Dec" }),
              /* @__PURE__ */ jsx19("dd", { children: degLabel(probe.dec) }),
              /* @__PURE__ */ jsx19("dt", { children: "l, b" }),
              /* @__PURE__ */ jsxs18("dd", { children: [
                probe.l.toFixed(1),
                "\xB0, ",
                degLabel(probe.b)
              ] })
            ] }),
            /* @__PURE__ */ jsx19("p", { className: "skymap__tip-note", children: "No science frames recorded at this position." })
          ] }) : /* @__PURE__ */ jsx19(
            TileDetail,
            {
              tiles,
              index: hover,
              name: nameAt(hover),
              ra: probe.ra,
              dec: probe.dec,
              l: probe.l,
              b: probe.b,
              exposureSec
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs18("div", { className: "skymap__legend", children: [
      /* @__PURE__ */ jsx19("span", { className: "skymap__legend-title", children: mode2 === "date" ? "Last observed" : "Visits per tile" }),
      /* @__PURE__ */ jsx19("div", { className: "skymap__ramp", style: { background: `linear-gradient(to right, ${legendStops})` } }),
      /* @__PURE__ */ jsx19("div", { className: "skymap__ticks", children: legendTicks.map((tick, index) => /* @__PURE__ */ jsx19("span", { children: tick }, tick + index)) })
    ] })
  ] });
}

// app/components/tilequery.tsx
import React6, { useMemo as useMemo3, useState as useState5 } from "react";
import { Fragment as Fragment10, jsx as jsx20, jsxs as jsxs19 } from "react/jsx-runtime";
var DEG2 = Math.PI / 180, NGP_RA2 = 192.85948 * DEG2, NGP_DEC2 = 27.12825 * DEG2, L_NCP2 = 122.93192 * DEG2;
function equatorialToGalactic2(raDeg, decDeg) {
  let ra = raDeg * DEG2, dec = decDeg * DEG2, sinDec = Math.sin(dec), cosDec = Math.cos(dec), dRa = ra - NGP_RA2, sinB = Math.sin(NGP_DEC2) * sinDec + Math.cos(NGP_DEC2) * cosDec * Math.cos(dRa), b = Math.asin(Math.max(-1, Math.min(1, sinB))), y = cosDec * Math.sin(dRa), x = Math.cos(NGP_DEC2) * sinDec - Math.sin(NGP_DEC2) * cosDec * Math.cos(dRa), l = (L_NCP2 - Math.atan2(y, x)) / DEG2;
  return l = (l % 360 + 360) % 360, [l, b / DEG2];
}
function parseAngle(raw, hours) {
  let text = raw.trim().replace(/[dhms°'"]/g, " ").replace(/:/g, " ").trim();
  if (!text)
    return null;
  let parts = text.split(/\s+/);
  if (parts.some((p) => !/^[+-]?\d*\.?\d+$/.test(p)))
    return null;
  let values = parts.map(Number);
  if (values.some((v) => !Number.isFinite(v)))
    return null;
  if (values.length === 1)
    return values[0];
  let sign = /^\s*-/.test(raw) ? -1 : 1, magnitude = Math.abs(values[0]) + (values[1] ?? 0) / 60 + (values[2] ?? 0) / 3600;
  return sign * magnitude * (hours ? 15 : 1);
}
var EXAMPLES = [
  { label: "IMS field", ra: "05:13:07", dec: "-60:28:12" },
  { label: "LMC", ra: "80.894", dec: "-69.756" },
  { label: "Fornax cluster", ra: "54.62", dec: "-35.45" }
];
function TileQuery({
  tiles,
  exposureSec
}) {
  let [ra, setRa] = useState5(""), [dec, setDec] = useState5(""), [query, setQuery] = useState5(null), [error, setError] = useState5(null), ids2 = useMemo3(() => {
    if (!tiles.nameDelta)
      return null;
    let out = new Int32Array(tiles.nameDelta.length), running = 0;
    for (let i = 0; i < out.length; i += 1)
      running += tiles.nameDelta[i], out[i] = running;
    return out;
  }, [tiles]), nameAt = (i) => ids2 ? `T${String(ids2[i]).padStart(5, "0")}` : tiles.name?.[i] ?? "", hit = useMemo3(
    () => query ? findTileAt(tiles, query.ra, query.dec) : null,
    [query, tiles]
  ), submit = (event) => {
    event.preventDefault();
    let parsedRa = parseAngle(ra, ra.includes(":") || /\s/.test(ra.trim())), parsedDec = parseAngle(dec, !1);
    if (parsedRa === null || parsedDec === null) {
      setError("Enter a position as decimal degrees (78.83, \u221261.13) or sexagesimal (05:13:07, \u221260:28:12)."), setQuery(null);
      return;
    }
    if (parsedDec < -90 || parsedDec > 90) {
      setError("Declination must be between \u221290 and +90 degrees."), setQuery(null);
      return;
    }
    setError(null), setQuery({ ra: (parsedRa % 360 + 360) % 360, dec: parsedDec });
  }, useExample = (example) => {
    setRa(example.ra), setDec(example.dec), setError(null);
    let parsedRa = parseAngle(example.ra, example.ra.includes(":")), parsedDec = parseAngle(example.dec, !1);
    parsedRa !== null && parsedDec !== null && setQuery({ ra: (parsedRa % 360 + 360) % 360, dec: parsedDec });
  }, galactic = query ? equatorialToGalactic2(query.ra, query.dec) : null;
  return /* @__PURE__ */ jsxs19("div", { className: "tilequery", children: [
    /* @__PURE__ */ jsxs19("div", { children: [
      /* @__PURE__ */ jsxs19("form", { className: "tilequery__form", onSubmit: submit, children: [
        /* @__PURE__ */ jsxs19("div", { className: "tilequery__field", children: [
          /* @__PURE__ */ jsx20("label", { htmlFor: "q-ra", children: "Right ascension" }),
          /* @__PURE__ */ jsx20(
            "input",
            {
              id: "q-ra",
              type: "text",
              inputMode: "decimal",
              value: ra,
              onChange: (e) => setRa(e.target.value),
              placeholder: "78.83 or 05:13:07"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs19("div", { className: "tilequery__field", children: [
          /* @__PURE__ */ jsx20("label", { htmlFor: "q-dec", children: "Declination" }),
          /* @__PURE__ */ jsx20(
            "input",
            {
              id: "q-dec",
              type: "text",
              inputMode: "decimal",
              value: dec,
              onChange: (e) => setDec(e.target.value),
              placeholder: "-61.13 or -60:28:12"
            }
          )
        ] }),
        /* @__PURE__ */ jsx20("button", { className: "btn btn--primary", type: "submit", children: "Check coverage" })
      ] }),
      error && /* @__PURE__ */ jsx20("p", { className: "tilequery__error", children: error }),
      /* @__PURE__ */ jsxs19("p", { className: "tilequery__examples", children: [
        "Try",
        " ",
        EXAMPLES.map((example, index) => /* @__PURE__ */ jsxs19(React6.Fragment, { children: [
          index > 0 && ", ",
          /* @__PURE__ */ jsx20("button", { type: "button", onClick: () => useExample(example), children: example.label })
        ] }, example.label)),
        ". Right ascension is read as hours when written with colons or spaces, and as degrees when written as a single number."
      ] }),
      query && /* @__PURE__ */ jsxs19("p", { className: "note", style: { marginTop: "1rem" }, children: [
        "Queried RA ",
        query.ra.toFixed(3),
        "\xB0, Dec ",
        degLabel(query.dec),
        galactic && /* @__PURE__ */ jsxs19(Fragment10, { children: [
          " ",
          "\xB7 l ",
          galactic[0].toFixed(2),
          "\xB0, b ",
          degLabel(galactic[1])
        ] }),
        hit !== null ? " \u2014 this position falls on an observed tile." : " \u2014 no observed tile covers this position."
      ] })
    ] }),
    /* @__PURE__ */ jsx20("div", { className: "tilequery__result", "aria-live": "polite", children: query === null ? /* @__PURE__ */ jsx20("p", { className: "tilequery__empty", children: "Enter a position to see whether it has been observed and what exists for it." }) : hit !== null && galactic ? /* @__PURE__ */ jsx20(
      TileDetail,
      {
        tiles,
        index: hit,
        name: nameAt(hit),
        ra: tiles.ra[hit],
        dec: tiles.dec[hit],
        l: galactic[0],
        b: galactic[1],
        exposureSec
      }
    ) : /* @__PURE__ */ jsxs19(Fragment10, { children: [
      /* @__PURE__ */ jsxs19("div", { className: "skymap__tip-head", children: [
        /* @__PURE__ */ jsx20("span", { className: "skymap__tip-name", children: "No observation" }),
        /* @__PURE__ */ jsx20("span", { className: "skymap__tip-badge skymap__tip-badge--none", children: "Not observed" })
      ] }),
      /* @__PURE__ */ jsxs19("dl", { className: "skymap__tip-grid", children: [
        /* @__PURE__ */ jsx20("dt", { children: "RA" }),
        /* @__PURE__ */ jsxs19("dd", { children: [
          query.ra.toFixed(3),
          "\xB0"
        ] }),
        /* @__PURE__ */ jsx20("dt", { children: "Dec" }),
        /* @__PURE__ */ jsx20("dd", { children: degLabel(query.dec) }),
        galactic && /* @__PURE__ */ jsxs19(Fragment10, { children: [
          /* @__PURE__ */ jsx20("dt", { children: "l, b" }),
          /* @__PURE__ */ jsxs19("dd", { children: [
            galactic[0].toFixed(1),
            "\xB0, ",
            degLabel(galactic[1])
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx20("p", { className: "skymap__tip-note", children: "No science frames are recorded on the tile at this position. It may be outside the observable declination range, or not yet reached by the survey." })
    ] }) })
  ] });
}

// app/routes/users.access.tsx
import { Fragment as Fragment11, jsx as jsx21, jsxs as jsxs20 } from "react/jsx-runtime";
var meta13 = () => [
  { title: "Data access \xB7 7DT for users" },
  {
    name: "description",
    content: "Search 7DS coverage by position or on an all-sky map, find out how to obtain the data, and what the pipeline produces and in what units."
  }
], CACHE2 = "public, max-age=3600, stale-while-revalidate=86400", headers2 = () => ({ "Cache-Control": CACHE2 });
async function loader6() {
  let [tiles, status] = await Promise.all([getTileMap(), getStatus().catch(() => null)]), totals = status?.data.totals, exposureSec = totals && totals.science_frames > 0 ? totals.exposure_hours * 3600 / totals.science_frames : null;
  return json2(
    {
      tiles: tiles.data,
      live: tiles.live,
      generatedAt: tiles.generatedAt,
      ris: status?.data.ris ?? null,
      frames: totals?.science_frames ?? null,
      exposureSec
    },
    { headers: { "Cache-Control": CACHE2 } }
  );
}
var PRODUCTS = [
  ["single", "A calibrated individual exposure, 100 s, with WCS and a source catalog"],
  ["coadd", "Three singles combined to a 300 s frame \u2014 the basic survey product"],
  ["difference", "A coadd minus its reference image, for transient detection"],
  ["catalog", "A flux-calibrated source list attached to every image above"],
  ["master frame", "Bias, dark and flat, generated nightly and matched by group key"]
], CONVENTIONS = [
  ["Photometric system", "AB magnitudes"],
  ["Coadd zero point", "23.9 AB \u2014 pixel values in \xB5Jy"],
  ["Astrometric reference", "Gaia DR3"],
  ["Flux calibration", "Synthetic photometry from Gaia XP spectra"],
  ["Tiling", "HEALPix-derived, T00000 \u2013 T28519"],
  ["File format", "FITS, with QA metrics in the header"]
], QA_KEYS = [
  ["SANITY", "Boolean; false means the image should not be used for science"],
  ["REJ_PROC", "The processing stage at which SANITY was set false"],
  ["SEEING", "Measured PSF FWHM"],
  ["UL5_5", "5\u03C3 limiting magnitude"],
  ["ELLIP", "Point-source elongation"],
  ["PPFLAG", "Bitmask recording compromises in master-frame selection"]
], num2 = (value) => value.toLocaleString("en-US"), day = (iso) => new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }), Index13 = () => {
  let { tiles, live, generatedAt, ris, frames, exposureSec } = useLoaderData2(), singleVisit = (tiles.visits ?? []).filter((v) => v === 1).length, repeated = tiles.count - singleVisit;
  return /* @__PURE__ */ jsxs20(PageLayout, { menu: "manuUsers", children: [
    /* @__PURE__ */ jsx21(
      PageHero,
      {
        eyebrow: "For users",
        title: /* @__PURE__ */ jsxs20(Fragment11, { children: [
          "Data access & ",
          /* @__PURE__ */ jsx21("em", { children: "format" })
        ] }),
        lede: "Find out whether a position has been observed, obtain the data, and know what arrives when you do.",
        image: "/img/hero/data.jpg",
        meta: [
          { value: num2(tiles.count), label: "Tiles with data", live: !0 },
          ...ris ? [{ value: String(ris.coverage_pct), unit: "%", label: "Sky referenced" }] : [],
          { value: num2(tiles.visitsMax), label: "Most-visited tile" },
          { value: day(tiles.lastNight), label: "Last observation" }
        ]
      }
    ),
    /* @__PURE__ */ jsxs20(Section, { eyebrow: "Search", title: "Is this position observed?", children: [
      /* @__PURE__ */ jsx21("div", { style: { marginBottom: "1.5rem" }, children: /* @__PURE__ */ jsx21(LiveBadge, { live, updated: generatedAt, interval: "daily" }) }),
      /* @__PURE__ */ jsx21("p", { className: "prose", children: "Enter a position to see whether a survey tile covers it and what the observation record holds \u2014 how many nights and frames, roughly how much open-shutter time, which medium bands were taken and over what date range. The search runs against the same database that drives the pipeline, so a tile reported as observed has calibrated images behind it." }),
      /* @__PURE__ */ jsx21("div", { style: { marginTop: "2rem" }, children: /* @__PURE__ */ jsx21(TileQuery, { tiles, exposureSec }) }),
      /* @__PURE__ */ jsxs20("p", { className: "footnote", style: { marginTop: "1.5rem" }, children: [
        "A position is matched to a tile when it falls within that tile's 1.34\xB0 \xD7 0.90\xB0 field. Frame counts and filters are exact. Exposure time is an estimate \u2014 the frame count times the survey mean of ",
        exposureSec ? exposureSec.toFixed(0) : "\u224880",
        " seconds per frame \u2014 and is marked \u2248 for that reason."
      ] })
    ] }),
    /* @__PURE__ */ jsxs20(Section, { eyebrow: "Footprint", title: "Where 7DS has observed", alt: !0, wide: !0, children: [
      /* @__PURE__ */ jsx21("p", { className: "prose", children: "The same record, drawn as a map. The projection is Mollweide and equal-area: a given area of the map corresponds to the same area of sky wherever it falls, so coverage near the pole is not exaggerated as it would be on a rectangular plot. Longitude increases to the left. Switch between equatorial and galactic coordinates, and point anywhere to read what exists at that position." }),
      /* @__PURE__ */ jsx21("div", { style: { marginTop: "2rem" }, children: /* @__PURE__ */ jsx21(SkyMap, { tiles, exposureSec }) }),
      /* @__PURE__ */ jsxs20("p", { className: "footnote", style: { marginTop: "1rem" }, children: [
        live ? `Generated ${day(generatedAt)}.` : "The database could not be reached; this map is a stored copy and may be out of date.",
        " ",
        "Only tiles with at least one science exposure are shown. Target-of-opportunity pointings at arbitrary coordinates are not on the tiling and do not appear."
      ] }),
      /* @__PURE__ */ jsx21("div", { style: { marginTop: "2.5rem" }, children: /* @__PURE__ */ jsx21(
        StatGrid,
        {
          items: [
            { value: num2(tiles.count), label: "Tiles with data" },
            { value: num2(singleVisit), label: "Observed once", note: "RIS reference pass" },
            { value: num2(repeated), label: "Revisited", note: "monitoring and ToO" },
            ...frames ? [{ value: num2(frames), label: "Science frames" }] : []
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs20("p", { className: "footnote", style: { marginTop: "1.25rem" }, children: [
        "The broad wash across the southern sky is the",
        " ",
        /* @__PURE__ */ jsx21(Link13, { to: "/survey/ris", children: "Reference Imaging Survey" }),
        "; the heavily repeated cluster near the south ecliptic pole is the",
        " ",
        /* @__PURE__ */ jsx21(Link13, { to: "/survey/ims", children: "Intensive Monitoring Survey" }),
        ", which is why the visit scale is logarithmic. Isolated tiles elsewhere are target-of-opportunity follow-ups that fell on the tiling."
      ] })
    ] }),
    /* @__PURE__ */ jsx21(Section, { eyebrow: "Requesting", title: "Obtaining data", children: /* @__PURE__ */ jsxs20("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsxs20("div", { children: [
        /* @__PURE__ */ jsx21("p", { className: "prose", children: "There is no public archive interface yet. A complete record of every image type and source catalog is held internally, with the provenance of any product traceable back to the raw frames it was built from, and requests are handled by the project directly until a public release is made." }),
        /* @__PURE__ */ jsxs20("p", { className: "prose", children: [
          "A request is quickest to fill if it states the tile identifier \u2014 or the coordinates \u2014 the filters, the epoch range, and which product is wanted: single exposures, coadds, difference images or catalogs. Terms of use and acknowledgment are set out under",
          " ",
          /* @__PURE__ */ jsx21(Link13, { to: "/users/data", children: "how to use the data" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs20("div", { className: "panel", children: [
        /* @__PURE__ */ jsx21("div", { className: "panel__title", children: "Requesting data" }),
        /* @__PURE__ */ jsx21("p", { className: "feature-list__body", style: { marginBottom: "1rem" }, children: "Include the tile identifier or position, the bands, the epoch range and the product type." }),
        /* @__PURE__ */ jsx21(
          "a",
          {
            className: "btn btn--primary",
            href: "mailto:mim@astro.snu.ac.kr?subject=7DT%20data%20request",
            children: "Contact the project"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx21(Section, { id: "format", eyebrow: "Format", title: "What the pipeline produces", alt: !0, children: /* @__PURE__ */ jsxs20("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsxs20("div", { children: [
        /* @__PURE__ */ jsx21("p", { className: "prose", children: dataProductText }),
        /* @__PURE__ */ jsx21("ul", { className: "feature-list", style: { marginTop: "1.5rem" }, children: PRODUCTS.map((product) => /* @__PURE__ */ jsxs20("li", { children: [
          /* @__PURE__ */ jsx21("span", { className: "feature-list__key", style: { fontFamily: "var(--font-mono)" }, children: product[0] }),
          /* @__PURE__ */ jsx21("div", { children: /* @__PURE__ */ jsx21("p", { className: "feature-list__body", style: { margin: 0 }, children: product[1] }) })
        ] }, product[0])) })
      ] }),
      /* @__PURE__ */ jsx21(SimpleTable, { caption: "Conventions", rows: CONVENTIONS })
    ] }) }),
    /* @__PURE__ */ jsx21(Section, { eyebrow: "Headers", title: "Header and catalog information", children: /* @__PURE__ */ jsxs20("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsx21("div", { children: /* @__PURE__ */ jsx21("p", { className: "prose", children: "Quality-assurance metrics are written into the FITS header of every product and ingested into the operations database, so the state of an image can be inspected without opening it. Each catalog is a flux-calibrated source list matched to its parent image, carrying positions on the Gaia DR3 frame and AB magnitudes in the band of the image it was extracted from. For a coadd this means one row per detected source per band; combining bands for a given source gives the medium-band spectral energy distribution that the survey exists to produce." }) }),
      /* @__PURE__ */ jsx21(SimpleTable, { caption: "Selected header keywords", rows: QA_KEYS })
    ] }) }),
    /* @__PURE__ */ jsxs20(Section, { eyebrow: "Processing", title: "How a night is reduced", alt: !0, children: [
      /* @__PURE__ */ jsx21("p", { className: "prose", children: "Images are grouped by their properties \u2014 unit, filter, observing mode, night \u2014 into configurations, and each group runs through the same sequence. Established astronomical software does the numerical work behind Python interfaces rather than being reimplemented, so the behavior of each stage is that of the underlying tool." }),
      /* @__PURE__ */ jsx21("ul", { className: "feature-list", style: { marginTop: "2rem" }, children: software_default.stages.map((stage, index) => /* @__PURE__ */ jsxs20("li", { children: [
        /* @__PURE__ */ jsx21("span", { className: "feature-list__key", children: String(index + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxs20("div", { children: [
          /* @__PURE__ */ jsx21(
            "h3",
            {
              className: "feature-list__title",
              style: { fontFamily: "var(--font-mono)", fontSize: "1rem" },
              children: stage.module
            }
          ),
          /* @__PURE__ */ jsx21("p", { className: "feature-list__body", style: { maxWidth: "68ch" }, children: stage.body })
        ] })
      ] }, stage.module)) }),
      /* @__PURE__ */ jsxs20("div", { className: "panel panel--alt", style: { marginTop: "2rem" }, children: [
        /* @__PURE__ */ jsx21("div", { className: "panel__title", children: "External engines" }),
        /* @__PURE__ */ jsx21("div", { className: "table-wrap", style: { border: 0 }, children: /* @__PURE__ */ jsx21("table", { className: "spec-table", children: /* @__PURE__ */ jsx21("tbody", { children: software_default.external.map((tool) => /* @__PURE__ */ jsxs20("tr", { children: [
          /* @__PURE__ */ jsx21("th", { scope: "row", style: { fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }, children: tool[0] }),
          /* @__PURE__ */ jsx21("td", { style: { fontFamily: "var(--font-sans)" }, children: tool[1] })
        ] }, tool[0])) }) }) })
      ] }),
      /* @__PURE__ */ jsxs20("div", { className: "btn-row", style: { marginTop: "2rem" }, children: [
        /* @__PURE__ */ jsx21(Link13, { className: "btn btn--primary", to: "/users/access", children: "Getting the data" }),
        /* @__PURE__ */ jsx21(Link13, { className: "btn btn--secondary", to: "/users/software", children: "Reprocessing it yourself" })
      ] })
    ] }),
    /* @__PURE__ */ jsx21(Section, { eyebrow: "Ahead", title: "Planned public release", children: /* @__PURE__ */ jsx21("p", { className: "prose", children: "A public release of survey products is being prepared alongside the completion of the Reference Imaging Survey, whose first full cycle is anticipated by the end of 2027. The release is intended to include a query interface over images and catalogs; this page will carry it when it exists." }) })
  ] });
}, users_access_default = Index13;

// app/routes/users.format.tsx
var users_format_exports = {};
__export(users_format_exports, {
  loader: () => loader7
});
import { redirect as redirect5 } from "@remix-run/node";
function loader7() {
  return redirect5("/users/access#format", 301);
}

// app/routes/users.status.tsx
var users_status_exports = {};
__export(users_status_exports, {
  default: () => users_status_default,
  headers: () => headers3,
  loader: () => loader8,
  meta: () => meta14
});
import { json as json3 } from "@remix-run/node";
import { Link as Link14, useLoaderData as useLoaderData3 } from "@remix-run/react";

// app/routes/content/filters.json
var filters_default = {
  note: "Filter response curves taken from the supy reference data (supy/refdata/7dt/7dt_filter.*.response.dat). Resampled to 1.5 nm and trimmed to where the response exceeds 0.001. Wavelength in nm; response is the fraction transmitted, peaking near 0.58.",
  source: "https://github.com/7DimensionalTelescope/supy",
  medium: [
    {
      name: "m4000",
      center: 400,
      pts: [
        [
          382,
          2e-4
        ],
        [
          383.8,
          32e-4
        ],
        [
          385.6,
          0.0262
        ],
        [
          387.4,
          0.0938
        ],
        [
          389.2,
          0.1724
        ],
        [
          391,
          0.2126
        ],
        [
          392.8,
          0.2279
        ],
        [
          394.6,
          0.2388
        ],
        [
          396.4,
          0.2481
        ],
        [
          398.2,
          0.2591
        ],
        [
          400,
          0.2704
        ],
        [
          401.8,
          0.2817
        ],
        [
          403.6,
          0.2932
        ],
        [
          405.4,
          0.3036
        ],
        [
          407.2,
          0.3094
        ],
        [
          409,
          0.3084
        ],
        [
          410.8,
          0.2676
        ],
        [
          412.6,
          0.1559
        ],
        [
          414.4,
          0.0467
        ],
        [
          416.2,
          61e-4
        ],
        [
          418,
          3e-4
        ]
      ]
    },
    {
      name: "m4250",
      center: 425,
      pts: [
        [
          406.3,
          1e-4
        ],
        [
          408.1,
          2e-3
        ],
        [
          409.9,
          0.0228
        ],
        [
          411.7,
          0.1067
        ],
        [
          413.5,
          0.2378
        ],
        [
          415.3,
          0.3192
        ],
        [
          417.1,
          0.3429
        ],
        [
          418.9,
          0.3508
        ],
        [
          420.7,
          0.3574
        ],
        [
          422.5,
          0.364
        ],
        [
          424.3,
          0.3705
        ],
        [
          426.1,
          0.3772
        ],
        [
          427.9,
          0.3839
        ],
        [
          429.7,
          0.3906
        ],
        [
          431.5,
          0.3972
        ],
        [
          433.3,
          0.4004
        ],
        [
          435.1,
          0.3738
        ],
        [
          436.9,
          0.2612
        ],
        [
          438.7,
          0.1027
        ],
        [
          440.5,
          0.0184
        ],
        [
          442.3,
          14e-4
        ],
        [
          444.1,
          0
        ]
      ]
    },
    {
      name: "m4500",
      center: 450,
      pts: [
        [
          431.5,
          1e-4
        ],
        [
          433.3,
          37e-4
        ],
        [
          435.1,
          0.0372
        ],
        [
          436.9,
          0.1568
        ],
        [
          438.7,
          0.3222
        ],
        [
          440.5,
          0.4133
        ],
        [
          442.3,
          0.4373
        ],
        [
          444.1,
          0.4457
        ],
        [
          445.9,
          0.4528
        ],
        [
          447.8,
          0.46
        ],
        [
          449.6,
          0.4673
        ],
        [
          451.4,
          0.4725
        ],
        [
          453.1,
          0.477
        ],
        [
          454.9,
          0.4815
        ],
        [
          456.8,
          0.4855
        ],
        [
          458.6,
          0.4837
        ],
        [
          460.4,
          0.4384
        ],
        [
          462.2,
          0.2871
        ],
        [
          464,
          0.1025
        ],
        [
          465.8,
          0.0164
        ],
        [
          467.6,
          11e-4
        ],
        [
          469.4,
          0
        ]
      ]
    },
    {
      name: "m4750",
      center: 475,
      pts: [
        [
          455.9,
          0
        ],
        [
          457.7,
          15e-4
        ],
        [
          459.5,
          0.021
        ],
        [
          461.3,
          0.12
        ],
        [
          463.1,
          0.313
        ],
        [
          464.9,
          0.4597
        ],
        [
          466.7,
          0.5051
        ],
        [
          468.5,
          0.5138
        ],
        [
          470.3,
          0.5181
        ],
        [
          472.1,
          0.5221
        ],
        [
          473.9,
          0.526
        ],
        [
          475.7,
          0.5291
        ],
        [
          477.5,
          0.5324
        ],
        [
          479.3,
          0.5372
        ],
        [
          481.1,
          0.5422
        ],
        [
          482.9,
          0.5448
        ],
        [
          484.7,
          0.5214
        ],
        [
          486.5,
          0.3991
        ],
        [
          488.3,
          0.184
        ],
        [
          490.1,
          0.0404
        ],
        [
          491.9,
          37e-4
        ],
        [
          493.7,
          1e-4
        ]
      ]
    },
    {
      name: "m5000",
      center: 500,
      pts: [
        [
          481.1,
          1e-4
        ],
        [
          482.9,
          25e-4
        ],
        [
          484.7,
          0.0307
        ],
        [
          486.5,
          0.1577
        ],
        [
          488.3,
          0.3772
        ],
        [
          490.1,
          0.525
        ],
        [
          491.9,
          0.5659
        ],
        [
          493.7,
          0.5715
        ],
        [
          495.5,
          0.5734
        ],
        [
          497.3,
          0.575
        ],
        [
          499.1,
          0.5762
        ],
        [
          500.9,
          0.576
        ],
        [
          502.7,
          0.5744
        ],
        [
          504.5,
          0.5729
        ],
        [
          506.3,
          0.5723
        ],
        [
          508.1,
          0.5683
        ],
        [
          509.9,
          0.531
        ],
        [
          511.7,
          0.384
        ],
        [
          513.5,
          0.1615
        ],
        [
          515.3,
          0.0317
        ],
        [
          517.1,
          26e-4
        ],
        [
          518.9,
          1e-4
        ]
      ]
    },
    {
      name: "m5250",
      center: 525,
      pts: [
        [
          506.3,
          1e-4
        ],
        [
          508.1,
          37e-4
        ],
        [
          509.9,
          0.0408
        ],
        [
          511.7,
          0.1873
        ],
        [
          513.5,
          0.4088
        ],
        [
          515.3,
          0.5375
        ],
        [
          517.1,
          0.5656
        ],
        [
          518.9,
          0.567
        ],
        [
          520.7,
          0.5659
        ],
        [
          522.5,
          0.5644
        ],
        [
          524.3,
          0.5627
        ],
        [
          526.1,
          0.5609
        ],
        [
          527.9,
          0.559
        ],
        [
          529.7,
          0.5572
        ],
        [
          531.5,
          0.5554
        ],
        [
          533.3,
          0.5493
        ],
        [
          535.1,
          0.5035
        ],
        [
          536.9,
          0.3455
        ],
        [
          538.7,
          0.1334
        ],
        [
          540.5,
          0.0235
        ],
        [
          542.3,
          17e-4
        ],
        [
          544.1,
          0
        ]
      ]
    },
    {
      name: "m5500",
      center: 550,
      pts: [
        [
          530.6,
          0
        ],
        [
          532.4,
          12e-4
        ],
        [
          534.2,
          0.0179
        ],
        [
          536,
          0.1127
        ],
        [
          537.8,
          0.318
        ],
        [
          539.6,
          0.4888
        ],
        [
          541.4,
          0.5424
        ],
        [
          543.2,
          0.5477
        ],
        [
          545,
          0.5465
        ],
        [
          546.9,
          0.5452
        ],
        [
          548.6,
          0.5439
        ],
        [
          550.5,
          0.5424
        ],
        [
          552.2,
          0.5403
        ],
        [
          554,
          0.5381
        ],
        [
          555.9,
          0.5358
        ],
        [
          557.7,
          0.5316
        ],
        [
          559.5,
          0.5079
        ],
        [
          561.3,
          0.4002
        ],
        [
          563.1,
          0.1969
        ],
        [
          564.9,
          0.0472
        ],
        [
          566.7,
          48e-4
        ],
        [
          568.5,
          2e-4
        ]
      ]
    },
    {
      name: "m5750",
      center: 575,
      pts: [
        [
          555.9,
          0
        ],
        [
          557.7,
          16e-4
        ],
        [
          559.5,
          0.0227
        ],
        [
          561.3,
          0.1276
        ],
        [
          563.1,
          0.3281
        ],
        [
          564.9,
          0.4749
        ],
        [
          566.7,
          0.5145
        ],
        [
          568.5,
          0.5157
        ],
        [
          570.3,
          0.5127
        ],
        [
          572.1,
          0.5096
        ],
        [
          573.9,
          0.5069
        ],
        [
          575.7,
          0.5046
        ],
        [
          577.5,
          0.5027
        ],
        [
          579.3,
          0.5019
        ],
        [
          581.1,
          0.5018
        ],
        [
          582.9,
          0.4991
        ],
        [
          584.7,
          0.4725
        ],
        [
          586.5,
          0.3575
        ],
        [
          588.3,
          0.1624
        ],
        [
          590.1,
          0.0351
        ],
        [
          591.9,
          32e-4
        ],
        [
          593.7,
          1e-4
        ]
      ]
    },
    {
      name: "m6000",
      center: 600,
      pts: [
        [
          581.1,
          1e-4
        ],
        [
          582.9,
          23e-4
        ],
        [
          584.7,
          0.0278
        ],
        [
          586.5,
          0.1412
        ],
        [
          588.3,
          0.3329
        ],
        [
          590.1,
          0.4561
        ],
        [
          591.9,
          0.4856
        ],
        [
          593.7,
          0.4873
        ],
        [
          595.5,
          0.484
        ],
        [
          597.3,
          0.4808
        ],
        [
          599.1,
          0.4783
        ],
        [
          600.9,
          0.4756
        ],
        [
          602.7,
          0.4723
        ],
        [
          604.5,
          0.4692
        ],
        [
          606.3,
          0.4661
        ],
        [
          608.1,
          0.4604
        ],
        [
          609.9,
          0.4277
        ],
        [
          611.7,
          0.3077
        ],
        [
          613.5,
          0.1288
        ],
        [
          615.3,
          0.0251
        ],
        [
          617.1,
          2e-3
        ],
        [
          618.9,
          1e-4
        ]
      ]
    },
    {
      name: "m6250",
      center: 625,
      pts: [
        [
          606.3,
          1e-4
        ],
        [
          608.1,
          3e-3
        ],
        [
          609.9,
          0.0329
        ],
        [
          611.7,
          0.1501
        ],
        [
          613.5,
          0.3261
        ],
        [
          615.3,
          0.4268
        ],
        [
          617.1,
          0.4469
        ],
        [
          618.9,
          0.4456
        ],
        [
          620.7,
          0.4424
        ],
        [
          622.5,
          0.4389
        ],
        [
          624.3,
          0.4354
        ],
        [
          626.1,
          0.4318
        ],
        [
          627.9,
          0.4157
        ],
        [
          629.7,
          0.4192
        ],
        [
          631.5,
          0.4202
        ],
        [
          633.3,
          0.4155
        ],
        [
          635.1,
          0.3792
        ],
        [
          636.9,
          0.2591
        ],
        [
          638.7,
          0.0996
        ],
        [
          640.5,
          0.0175
        ],
        [
          642.3,
          13e-4
        ],
        [
          644.1,
          0
        ]
      ]
    },
    {
      name: "m6500",
      center: 650,
      pts: [
        [
          631.5,
          2e-4
        ],
        [
          633.3,
          39e-4
        ],
        [
          635.1,
          0.0377
        ],
        [
          636.9,
          0.1555
        ],
        [
          638.7,
          0.3124
        ],
        [
          640.5,
          0.3918
        ],
        [
          642.3,
          0.4052
        ],
        [
          644.1,
          0.4034
        ],
        [
          646,
          0.3999
        ],
        [
          647.8,
          0.3948
        ],
        [
          649.5,
          0.3924
        ],
        [
          651.4,
          0.3895
        ],
        [
          653.1,
          0.3872
        ],
        [
          655,
          0.3833
        ],
        [
          656.8,
          0.3804
        ],
        [
          658.6,
          0.3729
        ],
        [
          660.4,
          0.3324
        ],
        [
          662.2,
          0.214
        ],
        [
          664,
          0.0751
        ],
        [
          665.8,
          0.0118
        ],
        [
          667.6,
          8e-4
        ]
      ]
    },
    {
      name: "m6750",
      center: 675,
      pts: [
        [
          655.9,
          0
        ],
        [
          657.7,
          12e-4
        ],
        [
          659.5,
          0.0161
        ],
        [
          661.3,
          0.0902
        ],
        [
          663.1,
          0.2313
        ],
        [
          664.9,
          0.3337
        ],
        [
          666.7,
          0.3603
        ],
        [
          668.5,
          0.3603
        ],
        [
          670.3,
          0.3572
        ],
        [
          672.1,
          0.354
        ],
        [
          673.9,
          0.3507
        ],
        [
          675.7,
          0.3474
        ],
        [
          677.5,
          0.3442
        ],
        [
          679.3,
          0.3409
        ],
        [
          681.1,
          0.3375
        ],
        [
          682.9,
          0.3326
        ],
        [
          684.7,
          0.3124
        ],
        [
          686.5,
          0.2249
        ],
        [
          688.3,
          0.0967
        ],
        [
          690.1,
          0.0207
        ],
        [
          691.9,
          2e-3
        ],
        [
          693.7,
          1e-4
        ]
      ]
    },
    {
      name: "m7000",
      center: 700,
      pts: [
        [
          681.1,
          0
        ],
        [
          682.9,
          15e-4
        ],
        [
          684.7,
          0.0184
        ],
        [
          686.5,
          0.0889
        ],
        [
          688.3,
          0.1983
        ],
        [
          690.1,
          0.2693
        ],
        [
          691.9,
          0.3035
        ],
        [
          693.7,
          0.3082
        ],
        [
          695.5,
          0.3071
        ],
        [
          697.3,
          0.3068
        ],
        [
          699.1,
          0.3009
        ],
        [
          700.9,
          0.2978
        ],
        [
          702.7,
          0.2933
        ],
        [
          704.5,
          0.2904
        ],
        [
          706.3,
          0.2862
        ],
        [
          708.1,
          0.2805
        ],
        [
          709.9,
          0.2585
        ],
        [
          711.7,
          0.1844
        ],
        [
          713.5,
          0.0765
        ],
        [
          715.3,
          0.0148
        ],
        [
          717.1,
          11e-4
        ],
        [
          718.9,
          0
        ]
      ]
    },
    {
      name: "m7250",
      center: 725,
      pts: [
        [
          706.3,
          1e-4
        ],
        [
          708.1,
          18e-4
        ],
        [
          709.9,
          0.0199
        ],
        [
          711.7,
          0.0899
        ],
        [
          713.5,
          0.1935
        ],
        [
          715.3,
          0.2504
        ],
        [
          717.1,
          0.2525
        ],
        [
          718.9,
          0.2399
        ],
        [
          720.7,
          0.2411
        ],
        [
          722.5,
          0.2463
        ],
        [
          724.3,
          0.2339
        ],
        [
          726.1,
          0.2343
        ],
        [
          727.9,
          0.2276
        ],
        [
          729.7,
          0.2275
        ],
        [
          731.5,
          0.2244
        ],
        [
          733.3,
          0.2215
        ],
        [
          735.1,
          0.2005
        ],
        [
          736.9,
          0.1353
        ],
        [
          738.7,
          0.0516
        ],
        [
          740.5,
          9e-3
        ],
        [
          742.3,
          6e-4
        ]
      ]
    },
    {
      name: "m7500",
      center: 750,
      pts: [
        [
          731.5,
          1e-4
        ],
        [
          733.3,
          21e-4
        ],
        [
          735.1,
          0.0199
        ],
        [
          736.9,
          0.0812
        ],
        [
          738.7,
          0.1618
        ],
        [
          740.5,
          0.2011
        ],
        [
          742.3,
          0.2056
        ],
        [
          744.1,
          0.2025
        ],
        [
          746,
          0.1987
        ],
        [
          747.8,
          0.195
        ],
        [
          749.5,
          0.1912
        ],
        [
          751.4,
          0.1876
        ],
        [
          753.1,
          0.1839
        ],
        [
          755,
          0.1803
        ],
        [
          756.8,
          0.1765
        ],
        [
          758.6,
          0.1704
        ],
        [
          760.4,
          0.0506
        ],
        [
          762.2,
          0.0672
        ],
        [
          764,
          0.0197
        ],
        [
          765.8,
          41e-4
        ],
        [
          767.6,
          3e-4
        ]
      ]
    },
    {
      name: "m7750",
      center: 775,
      pts: [
        [
          756.8,
          1e-4
        ],
        [
          758.6,
          22e-4
        ],
        [
          760.4,
          65e-4
        ],
        [
          762.2,
          0.0495
        ],
        [
          764,
          0.0769
        ],
        [
          765.8,
          0.1231
        ],
        [
          767.6,
          0.1447
        ],
        [
          769.4,
          0.1499
        ],
        [
          771.2,
          0.1501
        ],
        [
          773,
          0.1482
        ],
        [
          774.8,
          0.1462
        ],
        [
          776.6,
          0.1441
        ],
        [
          778.4,
          0.142
        ],
        [
          780.2,
          0.1399
        ],
        [
          782,
          0.1377
        ],
        [
          783.8,
          0.1334
        ],
        [
          785.6,
          0.1151
        ],
        [
          787.4,
          0.0691
        ],
        [
          789.2,
          0.0219
        ],
        [
          791,
          31e-4
        ],
        [
          792.8,
          2e-4
        ]
      ]
    },
    {
      name: "m8000",
      center: 800,
      pts: [
        [
          782,
          1e-4
        ],
        [
          783.8,
          24e-4
        ],
        [
          785.6,
          0.0186
        ],
        [
          787.4,
          0.0624
        ],
        [
          789.2,
          0.1072
        ],
        [
          791,
          0.1241
        ],
        [
          792.8,
          0.125
        ],
        [
          794.6,
          0.1237
        ],
        [
          796.4,
          0.1209
        ],
        [
          798.2,
          0.1196
        ],
        [
          800,
          0.1174
        ],
        [
          801.8,
          0.1157
        ],
        [
          803.6,
          0.114
        ],
        [
          805.4,
          0.1126
        ],
        [
          807.2,
          0.1107
        ],
        [
          809,
          0.1064
        ],
        [
          810.8,
          0.0889
        ],
        [
          812.6,
          0.0497
        ],
        [
          814.4,
          0.014
        ],
        [
          816.2,
          17e-4
        ],
        [
          818,
          1e-4
        ]
      ]
    },
    {
      name: "m8250",
      center: 825,
      pts: [
        [
          807.2,
          2e-4
        ],
        [
          809,
          26e-4
        ],
        [
          810.8,
          0.0182
        ],
        [
          812.6,
          0.055
        ],
        [
          814.4,
          0.0867
        ],
        [
          816.2,
          0.0943
        ],
        [
          818,
          0.0949
        ],
        [
          819.8,
          0.0948
        ],
        [
          821.6,
          0.0961
        ],
        [
          823.4,
          0.0876
        ],
        [
          825.2,
          0.0931
        ],
        [
          827,
          0.0913
        ],
        [
          828.8,
          0.0879
        ],
        [
          830.6,
          0.0872
        ],
        [
          832.4,
          0.0854
        ],
        [
          834.2,
          0.0826
        ],
        [
          836,
          0.067
        ],
        [
          837.8,
          0.0352
        ],
        [
          839.6,
          92e-4
        ],
        [
          841.4,
          1e-3
        ],
        [
          843.2,
          0
        ]
      ]
    },
    {
      name: "m8500",
      center: 850,
      pts: [
        [
          832.4,
          2e-4
        ],
        [
          834.2,
          28e-4
        ],
        [
          836,
          0.0172
        ],
        [
          837.8,
          0.0478
        ],
        [
          839.6,
          0.0725
        ],
        [
          841.4,
          0.0791
        ],
        [
          843.2,
          0.0787
        ],
        [
          845,
          0.0773
        ],
        [
          846.9,
          0.0758
        ],
        [
          848.6,
          0.0743
        ],
        [
          850.5,
          0.0728
        ],
        [
          852.2,
          0.0713
        ],
        [
          854,
          0.0701
        ],
        [
          855.9,
          0.0692
        ],
        [
          857.7,
          0.068
        ],
        [
          859.5,
          0.0644
        ],
        [
          861.3,
          0.0503
        ],
        [
          863.1,
          0.0245
        ],
        [
          864.9,
          58e-4
        ],
        [
          866.7,
          6e-4
        ]
      ]
    },
    {
      name: "m8750",
      center: 875,
      pts: [
        [
          857.7,
          2e-4
        ],
        [
          859.5,
          29e-4
        ],
        [
          861.3,
          0.016
        ],
        [
          863.1,
          0.0409
        ],
        [
          864.9,
          0.0587
        ],
        [
          866.7,
          0.063
        ],
        [
          868.5,
          0.0627
        ],
        [
          870.3,
          0.0618
        ],
        [
          872.1,
          0.0608
        ],
        [
          873.9,
          0.0599
        ],
        [
          875.7,
          0.059
        ],
        [
          877.5,
          0.0581
        ],
        [
          879.3,
          0.0572
        ],
        [
          881.1,
          0.0563
        ],
        [
          882.9,
          0.0552
        ],
        [
          884.7,
          0.0515
        ],
        [
          886.5,
          0.0384
        ],
        [
          888.3,
          0.0173
        ],
        [
          890.1,
          37e-4
        ],
        [
          891.9,
          3e-4
        ]
      ]
    }
  ],
  broad: [
    {
      name: "u",
      center: 355.6,
      pts: [
        [
          338.5,
          0
        ],
        [
          340,
          0
        ],
        [
          341.5,
          37e-4
        ],
        [
          343,
          76e-4
        ],
        [
          344.5,
          0.0116
        ],
        [
          346,
          0.0158
        ],
        [
          347.5,
          0.021
        ],
        [
          349,
          0.0261
        ],
        [
          350.5,
          0.0313
        ],
        [
          352,
          0.0364
        ],
        [
          353.5,
          0.0421
        ],
        [
          355,
          0.0474
        ],
        [
          356.5,
          0.0527
        ],
        [
          358,
          0.0593
        ],
        [
          359.5,
          0.0652
        ],
        [
          361,
          0.0711
        ],
        [
          362.5,
          0.0775
        ],
        [
          364,
          0.084
        ],
        [
          365.5,
          0.0908
        ],
        [
          367,
          0.0976
        ],
        [
          368.5,
          0.1044
        ],
        [
          370,
          0.1102
        ],
        [
          371.5,
          0.1162
        ],
        [
          373,
          0.1245
        ],
        [
          374.5,
          0.1298
        ],
        [
          376,
          0.1361
        ],
        [
          377.5,
          0.148
        ],
        [
          379,
          0.1529
        ],
        [
          380.5,
          0.1607
        ],
        [
          382,
          0.1666
        ],
        [
          383.5,
          0.1775
        ],
        [
          385,
          0.1867
        ],
        [
          386.5,
          0.1936
        ],
        [
          388,
          0.1956
        ],
        [
          389.5,
          0.15
        ],
        [
          391,
          39e-4
        ],
        [
          392.5,
          0
        ]
      ]
    },
    {
      name: "g",
      center: 473.3,
      pts: [
        [
          393.5,
          0
        ],
        [
          395,
          1e-3
        ],
        [
          396.5,
          0.1165
        ],
        [
          398,
          0.2298
        ],
        [
          399.5,
          0.2705
        ],
        [
          401,
          0.2815
        ],
        [
          402.5,
          0.2922
        ],
        [
          404,
          0.3028
        ],
        [
          405.5,
          0.3117
        ],
        [
          407,
          0.3176
        ],
        [
          408.5,
          0.323
        ],
        [
          410,
          0.3285
        ],
        [
          411.5,
          0.3343
        ],
        [
          413,
          0.3398
        ],
        [
          414.5,
          0.345
        ],
        [
          416,
          0.3517
        ],
        [
          417.5,
          0.3573
        ],
        [
          419,
          0.3615
        ],
        [
          420.5,
          0.3665
        ],
        [
          422,
          0.3742
        ],
        [
          423.5,
          0.3804
        ],
        [
          425,
          0.3865
        ],
        [
          426.5,
          0.3919
        ],
        [
          428,
          0.398
        ],
        [
          429.5,
          0.404
        ],
        [
          431,
          0.4101
        ],
        [
          432.5,
          0.4158
        ],
        [
          434,
          0.4208
        ],
        [
          435.5,
          0.4267
        ],
        [
          437,
          0.4331
        ],
        [
          438.5,
          0.4395
        ],
        [
          440,
          0.4462
        ],
        [
          441.5,
          0.4524
        ],
        [
          443,
          0.4584
        ],
        [
          444.5,
          0.4646
        ],
        [
          446,
          0.4707
        ],
        [
          447.5,
          0.4772
        ],
        [
          449,
          0.4836
        ],
        [
          450.5,
          0.4895
        ],
        [
          452,
          0.4935
        ],
        [
          453.5,
          0.4976
        ],
        [
          455,
          0.5009
        ],
        [
          456.5,
          0.5041
        ],
        [
          458,
          0.5085
        ],
        [
          459.5,
          0.5123
        ],
        [
          461,
          0.5151
        ],
        [
          462.5,
          0.519
        ],
        [
          464,
          0.5226
        ],
        [
          465.5,
          0.526
        ],
        [
          467,
          0.5301
        ],
        [
          468.5,
          0.5347
        ],
        [
          470,
          0.5388
        ],
        [
          471.5,
          0.5417
        ],
        [
          473,
          0.5442
        ],
        [
          474.5,
          0.5473
        ],
        [
          476,
          0.5505
        ],
        [
          477.5,
          0.5545
        ],
        [
          479,
          0.5591
        ],
        [
          480.5,
          0.5635
        ],
        [
          482,
          0.5678
        ],
        [
          483.5,
          0.572
        ],
        [
          485,
          0.5761
        ],
        [
          486.5,
          0.5803
        ],
        [
          488,
          0.5836
        ],
        [
          489.5,
          0.5875
        ],
        [
          491,
          0.5915
        ],
        [
          492.5,
          0.5942
        ],
        [
          494,
          0.5948
        ],
        [
          495.5,
          0.5967
        ],
        [
          497,
          0.598
        ],
        [
          498.5,
          0.5994
        ],
        [
          500,
          0.601
        ],
        [
          501.5,
          0.5968
        ],
        [
          503,
          0.5916
        ],
        [
          504.5,
          0.5901
        ],
        [
          506,
          0.5931
        ],
        [
          507.5,
          0.5957
        ],
        [
          509,
          0.5959
        ],
        [
          510.5,
          0.5941
        ],
        [
          512,
          0.5921
        ],
        [
          513.5,
          0.5921
        ],
        [
          515,
          0.592
        ],
        [
          516.5,
          0.5917
        ],
        [
          518,
          0.5912
        ],
        [
          519.5,
          0.5895
        ],
        [
          521,
          0.5847
        ],
        [
          522.5,
          0.5807
        ],
        [
          524,
          0.5806
        ],
        [
          525.5,
          0.582
        ],
        [
          527,
          0.5818
        ],
        [
          528.5,
          0.5804
        ],
        [
          530,
          0.5784
        ],
        [
          531.5,
          0.5757
        ],
        [
          533,
          0.5751
        ],
        [
          534.5,
          0.5747
        ],
        [
          536,
          0.5742
        ],
        [
          537.5,
          0.5741
        ],
        [
          539,
          0.5699
        ],
        [
          540.5,
          0.5633
        ],
        [
          542,
          0.563
        ],
        [
          543.5,
          0.5657
        ],
        [
          545,
          0.5649
        ],
        [
          546.5,
          0.5539
        ],
        [
          548,
          0.5508
        ],
        [
          549.5,
          0.2768
        ],
        [
          551,
          0.0285
        ],
        [
          552.5,
          36e-4
        ],
        [
          554,
          8e-4
        ],
        [
          555.5,
          2e-4
        ]
      ]
    },
    {
      name: "r",
      center: 624.6,
      pts: [
        [
          550.5,
          1e-4
        ],
        [
          552,
          7e-4
        ],
        [
          553.5,
          0.0752
        ],
        [
          555,
          0.5416
        ],
        [
          556.5,
          0.5561
        ],
        [
          558,
          0.5527
        ],
        [
          559.5,
          0.5538
        ],
        [
          561,
          0.55
        ],
        [
          562.5,
          0.5492
        ],
        [
          564,
          0.5408
        ],
        [
          565.5,
          0.5437
        ],
        [
          567,
          0.5369
        ],
        [
          568.5,
          0.5361
        ],
        [
          570,
          0.5358
        ],
        [
          571.5,
          0.5311
        ],
        [
          573,
          0.5264
        ],
        [
          574.5,
          0.5284
        ],
        [
          576,
          0.5253
        ],
        [
          577.5,
          0.5225
        ],
        [
          579,
          0.5244
        ],
        [
          580.5,
          0.5193
        ],
        [
          582,
          0.5199
        ],
        [
          583.5,
          0.5207
        ],
        [
          585,
          0.5152
        ],
        [
          586.5,
          0.5099
        ],
        [
          588,
          0.513
        ],
        [
          589.5,
          0.513
        ],
        [
          591,
          0.5064
        ],
        [
          592.5,
          0.4993
        ],
        [
          594,
          0.5002
        ],
        [
          595.5,
          0.4941
        ],
        [
          597,
          0.4848
        ],
        [
          598.5,
          0.4855
        ],
        [
          600,
          0.4882
        ],
        [
          601.5,
          0.4832
        ],
        [
          603,
          0.4801
        ],
        [
          604.5,
          0.4808
        ],
        [
          606,
          0.4795
        ],
        [
          607.5,
          0.4767
        ],
        [
          609,
          0.472
        ],
        [
          610.5,
          0.4714
        ],
        [
          612,
          0.4696
        ],
        [
          613.5,
          0.4619
        ],
        [
          615,
          0.46
        ],
        [
          616.5,
          0.4608
        ],
        [
          618,
          0.4622
        ],
        [
          619.5,
          0.4564
        ],
        [
          621,
          0.4511
        ],
        [
          622.5,
          0.4512
        ],
        [
          624,
          0.45
        ],
        [
          625.5,
          0.4447
        ],
        [
          627,
          0.4423
        ],
        [
          628.5,
          0.4341
        ],
        [
          630,
          0.4353
        ],
        [
          631.5,
          0.4325
        ],
        [
          633,
          0.4301
        ],
        [
          634.5,
          0.4305
        ],
        [
          636,
          0.4293
        ],
        [
          637.5,
          0.4263
        ],
        [
          639,
          0.4202
        ],
        [
          640.5,
          0.4178
        ],
        [
          642,
          0.419
        ],
        [
          643.5,
          0.4152
        ],
        [
          645,
          0.4093
        ],
        [
          646.5,
          0.4056
        ],
        [
          648,
          0.4044
        ],
        [
          649.5,
          0.4048
        ],
        [
          651,
          0.4011
        ],
        [
          652.5,
          0.3928
        ],
        [
          654,
          0.3901
        ],
        [
          655.5,
          0.3895
        ],
        [
          657,
          0.388
        ],
        [
          658.5,
          0.3815
        ],
        [
          660,
          0.3776
        ],
        [
          661.5,
          0.3788
        ],
        [
          663,
          0.3802
        ],
        [
          664.5,
          0.3765
        ],
        [
          666,
          0.3669
        ],
        [
          667.5,
          0.362
        ],
        [
          669,
          0.3639
        ],
        [
          670.5,
          0.3649
        ],
        [
          672,
          0.3639
        ],
        [
          673.5,
          0.3582
        ],
        [
          675,
          0.3541
        ],
        [
          676.5,
          0.3546
        ],
        [
          678,
          0.3504
        ],
        [
          679.5,
          0.3421
        ],
        [
          681,
          0.339
        ],
        [
          682.5,
          0.3403
        ],
        [
          684,
          0.3372
        ],
        [
          685.5,
          0.3279
        ],
        [
          687,
          0.2615
        ],
        [
          688.5,
          0.2907
        ],
        [
          690,
          0.2675
        ],
        [
          691.5,
          0.271
        ],
        [
          693,
          0.2824
        ],
        [
          694.5,
          0.2821
        ],
        [
          696,
          0.1598
        ],
        [
          697.5,
          0.0427
        ],
        [
          699,
          26e-4
        ],
        [
          700.5,
          5e-4
        ]
      ]
    },
    {
      name: "i",
      center: 777.9,
      pts: [
        [
          694.5,
          1e-4
        ],
        [
          696,
          4e-4
        ],
        [
          697.5,
          45e-4
        ],
        [
          699,
          0.0413
        ],
        [
          700.5,
          0.2259
        ],
        [
          702,
          0.3033
        ],
        [
          703.5,
          0.3027
        ],
        [
          705,
          0.2982
        ],
        [
          706.5,
          0.2963
        ],
        [
          708,
          0.2928
        ],
        [
          709.5,
          0.2896
        ],
        [
          711,
          0.287
        ],
        [
          712.5,
          0.2818
        ],
        [
          714,
          0.2775
        ],
        [
          715.5,
          0.2746
        ],
        [
          717,
          0.2652
        ],
        [
          718.5,
          0.2519
        ],
        [
          720,
          0.2501
        ],
        [
          721.5,
          0.2576
        ],
        [
          723,
          0.2522
        ],
        [
          724.5,
          0.2434
        ],
        [
          726,
          0.2436
        ],
        [
          727.5,
          0.2378
        ],
        [
          729,
          0.2362
        ],
        [
          730.5,
          0.2321
        ],
        [
          732,
          0.2306
        ],
        [
          733.5,
          0.2303
        ],
        [
          735,
          0.2287
        ],
        [
          736.5,
          0.2254
        ],
        [
          738,
          0.2228
        ],
        [
          739.5,
          0.2191
        ],
        [
          741,
          0.2177
        ],
        [
          742.5,
          0.2142
        ],
        [
          744,
          0.2113
        ],
        [
          745.5,
          0.2077
        ],
        [
          747,
          0.2046
        ],
        [
          748.5,
          0.2008
        ],
        [
          750,
          0.1979
        ],
        [
          751.5,
          0.1949
        ],
        [
          753,
          0.1914
        ],
        [
          754.5,
          0.1883
        ],
        [
          756,
          0.1853
        ],
        [
          757.5,
          0.182
        ],
        [
          759,
          0.1724
        ],
        [
          760.5,
          0.0549
        ],
        [
          762,
          0.1202
        ],
        [
          763.5,
          0.095
        ],
        [
          765,
          0.1188
        ],
        [
          766.5,
          0.1421
        ],
        [
          768,
          0.1522
        ],
        [
          769.5,
          0.1557
        ],
        [
          771,
          0.1558
        ],
        [
          772.5,
          0.1547
        ],
        [
          774,
          0.1534
        ],
        [
          775.5,
          0.1507
        ],
        [
          777,
          0.1491
        ],
        [
          778.5,
          0.1471
        ],
        [
          780,
          0.1448
        ],
        [
          781.5,
          0.1442
        ],
        [
          783,
          0.1421
        ],
        [
          784.5,
          0.14
        ],
        [
          786,
          0.1383
        ],
        [
          787.5,
          0.1366
        ],
        [
          789,
          0.1349
        ],
        [
          790.5,
          0.1325
        ],
        [
          792,
          0.1311
        ],
        [
          793.5,
          0.1293
        ],
        [
          795,
          0.1274
        ],
        [
          796.5,
          0.1254
        ],
        [
          798,
          0.1239
        ],
        [
          799.5,
          0.1227
        ],
        [
          801,
          0.1204
        ],
        [
          802.5,
          0.1192
        ],
        [
          804,
          0.1178
        ],
        [
          805.5,
          0.1169
        ],
        [
          807,
          0.115
        ],
        [
          808.5,
          0.1133
        ],
        [
          810,
          0.1115
        ],
        [
          811.5,
          0.1101
        ],
        [
          813,
          0.1077
        ],
        [
          814.5,
          0.1043
        ],
        [
          816,
          0.0999
        ],
        [
          817.5,
          0.0987
        ],
        [
          819,
          0.0983
        ],
        [
          820.5,
          0.0993
        ],
        [
          822,
          0.0983
        ],
        [
          823.5,
          0.0915
        ],
        [
          825,
          0.0958
        ],
        [
          826.5,
          0.0943
        ],
        [
          828,
          0.0908
        ],
        [
          829.5,
          0.0902
        ],
        [
          831,
          0.0904
        ],
        [
          832.5,
          0.0889
        ],
        [
          834,
          0.0883
        ],
        [
          835.5,
          0.0876
        ],
        [
          837,
          0.0859
        ],
        [
          838.5,
          0.0854
        ],
        [
          840,
          0.0844
        ],
        [
          841.5,
          0.0829
        ],
        [
          843,
          0.0812
        ],
        [
          844.5,
          0.0806
        ],
        [
          846,
          0.0787
        ],
        [
          847.5,
          0.0776
        ],
        [
          849,
          0.0776
        ],
        [
          850.5,
          0.0755
        ],
        [
          852,
          0.0734
        ],
        [
          853.5,
          0.0711
        ],
        [
          855,
          0.0601
        ],
        [
          856.5,
          0.02
        ],
        [
          858,
          4e-3
        ],
        [
          859.5,
          11e-4
        ],
        [
          861,
          2e-4
        ]
      ]
    },
    {
      name: "z",
      center: 1013.5,
      pts: [
        [
          821,
          1e-4
        ],
        [
          822.5,
          6e-4
        ],
        [
          824,
          45e-4
        ],
        [
          825.5,
          0.0359
        ],
        [
          827,
          0.0882
        ],
        [
          828.5,
          0.0886
        ],
        [
          830,
          0.0904
        ],
        [
          831.5,
          0.0884
        ],
        [
          833,
          0.0855
        ],
        [
          834.5,
          0.0858
        ],
        [
          836,
          0.0866
        ],
        [
          837.5,
          0.0854
        ],
        [
          839,
          0.0824
        ],
        [
          840.5,
          0.079
        ],
        [
          842,
          0.0771
        ],
        [
          843.5,
          0.077
        ],
        [
          845,
          0.0776
        ],
        [
          846.5,
          0.0781
        ],
        [
          848,
          0.078
        ],
        [
          849.5,
          0.077
        ],
        [
          851,
          0.0754
        ],
        [
          852.5,
          0.0735
        ],
        [
          854,
          0.0717
        ],
        [
          855.5,
          0.0704
        ],
        [
          857,
          0.0691
        ],
        [
          858.5,
          0.0685
        ],
        [
          860,
          0.068
        ],
        [
          861.5,
          0.0678
        ],
        [
          863,
          0.0676
        ],
        [
          864.5,
          0.0673
        ],
        [
          866,
          0.0669
        ],
        [
          867.5,
          0.0663
        ],
        [
          869,
          0.0655
        ],
        [
          870.5,
          0.0645
        ],
        [
          872,
          0.0633
        ],
        [
          873.5,
          0.062
        ],
        [
          875,
          0.0607
        ],
        [
          876.5,
          0.0596
        ],
        [
          878,
          0.0586
        ],
        [
          879.5,
          0.0578
        ],
        [
          881,
          0.0572
        ],
        [
          882.5,
          0.0568
        ],
        [
          884,
          0.0565
        ],
        [
          885.5,
          0.0562
        ],
        [
          887,
          0.0558
        ],
        [
          888.5,
          0.0552
        ],
        [
          890,
          0.0545
        ],
        [
          891.5,
          0.0537
        ],
        [
          893,
          0.0524
        ],
        [
          894.5,
          0.0511
        ],
        [
          896,
          0.0487
        ],
        [
          897.5,
          0.047
        ],
        [
          899,
          0.0437
        ],
        [
          900.5,
          0.0444
        ],
        [
          902,
          0.0439
        ],
        [
          903.5,
          0.0455
        ],
        [
          905,
          0.0455
        ],
        [
          906.5,
          0.0442
        ],
        [
          908,
          0.0425
        ],
        [
          909.5,
          0.0428
        ],
        [
          911,
          0.0426
        ],
        [
          912.5,
          0.0426
        ],
        [
          914,
          0.0411
        ],
        [
          915.5,
          0.0403
        ],
        [
          917,
          0.0414
        ],
        [
          918.5,
          0.0406
        ],
        [
          920,
          0.0408
        ],
        [
          921.5,
          0.0402
        ],
        [
          923,
          0.0398
        ],
        [
          924.5,
          0.0388
        ],
        [
          926,
          0.0386
        ],
        [
          927.5,
          0.0376
        ],
        [
          929,
          0.0354
        ],
        [
          930.5,
          0.0324
        ],
        [
          932,
          0.0277
        ],
        [
          933.5,
          0.0263
        ],
        [
          935,
          0.0249
        ],
        [
          936.5,
          0.026
        ],
        [
          938,
          0.0254
        ],
        [
          939.5,
          0.0313
        ],
        [
          941,
          0.0299
        ],
        [
          942.5,
          0.0278
        ],
        [
          944,
          0.0255
        ],
        [
          945.5,
          0.027
        ],
        [
          947,
          0.027
        ],
        [
          948.5,
          0.0258
        ],
        [
          950,
          0.0237
        ],
        [
          951.5,
          0.0274
        ],
        [
          953,
          0.0252
        ],
        [
          954.5,
          0.0252
        ],
        [
          956,
          0.0244
        ],
        [
          957.5,
          0.0257
        ],
        [
          959,
          0.024
        ],
        [
          960.5,
          0.0251
        ],
        [
          962,
          0.0247
        ],
        [
          963.5,
          0.0253
        ],
        [
          965,
          0.0247
        ],
        [
          966.5,
          0.0244
        ],
        [
          968,
          0.0255
        ],
        [
          969.5,
          0.0256
        ],
        [
          971,
          0.0252
        ],
        [
          972.5,
          0.0245
        ],
        [
          974,
          0.0235
        ],
        [
          975.5,
          0.0231
        ],
        [
          977,
          0.0233
        ],
        [
          978.5,
          0.0228
        ],
        [
          980,
          0.0223
        ],
        [
          981.5,
          0.0225
        ],
        [
          983,
          0.0219
        ],
        [
          984.5,
          0.0216
        ],
        [
          986,
          0.0213
        ],
        [
          987.5,
          0.0208
        ],
        [
          989,
          0.0204
        ],
        [
          990.5,
          0.0199
        ],
        [
          992,
          0.0195
        ],
        [
          993.5,
          0.019
        ],
        [
          995,
          0.0186
        ],
        [
          996.5,
          0.0182
        ],
        [
          998,
          0.0178
        ],
        [
          999.5,
          0.0174
        ],
        [
          1001,
          0.0171
        ],
        [
          1002.5,
          0.0167
        ],
        [
          1004,
          0.0164
        ],
        [
          1005.5,
          0.0161
        ],
        [
          1007,
          0.0158
        ],
        [
          1008.5,
          0.0154
        ],
        [
          1010,
          0.015
        ],
        [
          1011.5,
          0.0147
        ],
        [
          1013,
          0.0143
        ],
        [
          1014.5,
          0.014
        ],
        [
          1016,
          0.0136
        ],
        [
          1017.5,
          0.0132
        ],
        [
          1019,
          0.0128
        ],
        [
          1020.5,
          0.0124
        ],
        [
          1022,
          0.012
        ],
        [
          1023.5,
          0.0116
        ],
        [
          1025,
          0.0112
        ],
        [
          1026.5,
          0.0108
        ],
        [
          1028,
          0.0104
        ],
        [
          1029.5,
          0.01
        ],
        [
          1031,
          96e-4
        ],
        [
          1032.5,
          92e-4
        ],
        [
          1034,
          89e-4
        ],
        [
          1035.5,
          85e-4
        ],
        [
          1037,
          82e-4
        ],
        [
          1038.5,
          78e-4
        ],
        [
          1040,
          74e-4
        ],
        [
          1041.5,
          71e-4
        ],
        [
          1043,
          67e-4
        ],
        [
          1044.5,
          63e-4
        ],
        [
          1046,
          6e-3
        ],
        [
          1047.5,
          56e-4
        ],
        [
          1049,
          52e-4
        ],
        [
          1050.5,
          49e-4
        ],
        [
          1052,
          45e-4
        ],
        [
          1053.5,
          41e-4
        ],
        [
          1055,
          37e-4
        ],
        [
          1056.5,
          33e-4
        ],
        [
          1058,
          3e-3
        ],
        [
          1059.5,
          26e-4
        ],
        [
          1061,
          24e-4
        ],
        [
          1062.5,
          24e-4
        ],
        [
          1064,
          24e-4
        ],
        [
          1065.5,
          24e-4
        ],
        [
          1067,
          24e-4
        ],
        [
          1068.5,
          24e-4
        ],
        [
          1070,
          24e-4
        ],
        [
          1071.5,
          24e-4
        ],
        [
          1073,
          24e-4
        ],
        [
          1074.5,
          24e-4
        ],
        [
          1076,
          24e-4
        ],
        [
          1077.5,
          24e-4
        ],
        [
          1079,
          24e-4
        ],
        [
          1080.5,
          24e-4
        ],
        [
          1082,
          24e-4
        ],
        [
          1083.5,
          24e-4
        ],
        [
          1085,
          24e-4
        ],
        [
          1086.5,
          24e-4
        ],
        [
          1088,
          25e-4
        ],
        [
          1089.5,
          24e-4
        ],
        [
          1091,
          25e-4
        ],
        [
          1092.5,
          24e-4
        ],
        [
          1094,
          25e-4
        ],
        [
          1095.5,
          24e-4
        ],
        [
          1097,
          25e-4
        ],
        [
          1098.5,
          24e-4
        ],
        [
          1100,
          24e-4
        ],
        [
          1101.5,
          24e-4
        ],
        [
          1103,
          24e-4
        ],
        [
          1104.5,
          24e-4
        ],
        [
          1106,
          24e-4
        ],
        [
          1107.5,
          24e-4
        ],
        [
          1109,
          23e-4
        ],
        [
          1110.5,
          23e-4
        ],
        [
          1112,
          23e-4
        ],
        [
          1113.5,
          2e-3
        ],
        [
          1115,
          2e-3
        ],
        [
          1116.5,
          16e-4
        ],
        [
          1118,
          19e-4
        ],
        [
          1119.5,
          17e-4
        ],
        [
          1121,
          18e-4
        ],
        [
          1122.5,
          14e-4
        ],
        [
          1124,
          17e-4
        ],
        [
          1125.5,
          14e-4
        ],
        [
          1127,
          18e-4
        ],
        [
          1128.5,
          17e-4
        ],
        [
          1130,
          17e-4
        ],
        [
          1131.5,
          21e-4
        ],
        [
          1133,
          18e-4
        ],
        [
          1134.5,
          1e-3
        ],
        [
          1136,
          17e-4
        ],
        [
          1137.5,
          21e-4
        ],
        [
          1139,
          21e-4
        ],
        [
          1140.5,
          2e-3
        ],
        [
          1142,
          21e-4
        ],
        [
          1143.5,
          2e-3
        ],
        [
          1145,
          18e-4
        ],
        [
          1146.5,
          17e-4
        ],
        [
          1148,
          2e-3
        ],
        [
          1149.5,
          19e-4
        ],
        [
          1151,
          2e-3
        ],
        [
          1152.5,
          19e-4
        ],
        [
          1154,
          2e-3
        ],
        [
          1155.5,
          21e-4
        ],
        [
          1157,
          22e-4
        ],
        [
          1158.5,
          22e-4
        ],
        [
          1160,
          22e-4
        ],
        [
          1161.5,
          23e-4
        ],
        [
          1163,
          23e-4
        ],
        [
          1164.5,
          23e-4
        ],
        [
          1166,
          23e-4
        ],
        [
          1167.5,
          24e-4
        ],
        [
          1169,
          24e-4
        ],
        [
          1170.5,
          24e-4
        ],
        [
          1172,
          24e-4
        ],
        [
          1173.5,
          23e-4
        ],
        [
          1175,
          24e-4
        ],
        [
          1176.5,
          24e-4
        ],
        [
          1178,
          23e-4
        ],
        [
          1179.5,
          24e-4
        ],
        [
          1181,
          24e-4
        ],
        [
          1182.5,
          23e-4
        ],
        [
          1184,
          24e-4
        ],
        [
          1185.5,
          24e-4
        ],
        [
          1187,
          24e-4
        ],
        [
          1188.5,
          23e-4
        ],
        [
          1190,
          24e-4
        ],
        [
          1191.5,
          24e-4
        ],
        [
          1193,
          24e-4
        ],
        [
          1194.5,
          24e-4
        ],
        [
          1196,
          24e-4
        ],
        [
          1197.5,
          24e-4
        ],
        [
          1199,
          24e-4
        ],
        [
          1200.5,
          0
        ]
      ]
    }
  ]
};

// app/components/filtercurves.tsx
import { jsx as jsx22, jsxs as jsxs21 } from "react/jsx-runtime";
var W = 960, H = 300, L = 46, R = 12, T = 12, B = 34;
function FilterCurves({
  showBroad = !0
}) {
  let medium = filters_default.medium, broad = filters_default.broad, shown = showBroad ? [...broad, ...medium] : medium, lamMin = 300, lamMax = 950, respMax = 0.62, sx = (nm) => L + (nm - lamMin) / (lamMax - lamMin) * (W - L - R), sy = (r) => T + (1 - r / respMax) * (H - T - B), line = (pts) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(" "), area = (pts) => `${line(pts)} L${sx(pts[pts.length - 1][0]).toFixed(1)},${sy(0).toFixed(1)} L${sx(
    pts[0][0]
  ).toFixed(1)},${sy(0).toFixed(1)} Z`, xTicks = [400, 500, 600, 700, 800, 900], yTicks = [0, 0.2, 0.4, 0.6];
  return /* @__PURE__ */ jsxs21("figure", { className: "curves", children: [
    /* @__PURE__ */ jsxs21(
      "svg",
      {
        viewBox: `0 0 ${W} ${H}`,
        width: "100%",
        role: "img",
        "aria-label": "Response curves of the 7DT filter set, from 300 to 950 nanometers.",
        children: [
          /* @__PURE__ */ jsx22("g", { stroke: "var(--slate-200)", strokeWidth: "1", children: yTicks.map((t) => /* @__PURE__ */ jsx22("line", { x1: L, x2: W - R, y1: sy(t), y2: sy(t) }, t)) }),
          showBroad && broad.map((f) => /* @__PURE__ */ jsx22(
            "path",
            {
              d: line(f.pts),
              fill: "none",
              stroke: "var(--slate-400)",
              strokeWidth: "1",
              strokeDasharray: "4 3",
              opacity: "0.8"
            },
            f.name
          )),
          medium.map((f) => /* @__PURE__ */ jsxs21("g", { children: [
            /* @__PURE__ */ jsx22("path", { d: area(f.pts), fill: wavelengthColor(f.center), opacity: "0.22" }),
            /* @__PURE__ */ jsx22("path", { d: line(f.pts), fill: "none", stroke: wavelengthColor(f.center), strokeWidth: "1.5" })
          ] }, f.name)),
          /* @__PURE__ */ jsxs21(
            "g",
            {
              fill: "var(--slate-500)",
              fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
              fontSize: "11",
              children: [
                xTicks.map((t) => /* @__PURE__ */ jsx22("text", { x: sx(t), y: H - B + 18, textAnchor: "middle", children: t }, t)),
                yTicks.map((t) => /* @__PURE__ */ jsx22("text", { x: L - 8, y: sy(t) + 3.5, textAnchor: "end", children: t.toFixed(1) }, t)),
                /* @__PURE__ */ jsx22("text", { x: (L + W - R) / 2, y: H - 2, textAnchor: "middle", children: "Wavelength (nm)" }),
                /* @__PURE__ */ jsx22(
                  "text",
                  {
                    x: -(T + (H - T - B) / 2),
                    y: 12,
                    textAnchor: "middle",
                    transform: "rotate(-90)",
                    children: "Response"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx22("line", { x1: L, x2: W - R, y1: sy(0), y2: sy(0), stroke: "var(--ink-900)", strokeWidth: "1" }),
          /* @__PURE__ */ jsx22("line", { x1: L, x2: L, y1: T, y2: sy(0), stroke: "var(--ink-900)", strokeWidth: "1" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs21("figcaption", { children: [
      /* @__PURE__ */ jsx22("b", { children: "Filter response" }),
      " The ",
      medium.length,
      " regularly spaced medium bands",
      showBroad ? " in color, with the Sloan broad bands dashed behind them" : "",
      ". Curves are the project's own reference data \u2014 the response the pipeline calibrates against \u2014 rather than nominal transmission, so they include detector and optical throughput and peak near 0.58. The ",
      (shown.length === medium.length, ""),
      "fifteen filters installed in late 2025 are not shown: their spectrophotometric calibration is still in preparation."
    ] })
  ] });
}

// app/routes/users.status.tsx
import { Fragment as Fragment12, jsx as jsx23, jsxs as jsxs22 } from "react/jsx-runtime";
var meta14 = () => [
  { title: "Status & overview \xB7 7DT for users" },
  {
    name: "description",
    content: "What 7DT can observe now and what data exist: telescopes and filters available, survey coverage, measured depths and processing status."
  }
], CACHE3 = "public, max-age=900, stale-while-revalidate=86400", headers3 = () => ({ "Cache-Control": CACHE3 });
async function loader8() {
  let status = await getStatus();
  return json3(status, { headers: { "Cache-Control": CACHE3 } });
}
var BANDS_ORIGINAL = [
  400,
  425,
  450,
  475,
  500,
  525,
  550,
  575,
  600,
  625,
  650,
  675,
  700,
  725,
  750,
  775,
  800,
  825,
  850,
  875
], BANDS_ADDED = [375, 386, 412, 438, 462, 483, 512, 534, 561, 586, 615, 640, 661, 769, 832], num3 = (value, digits = 0) => value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }), day2 = (iso) => new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }), Index14 = () => {
  let { data, live, generatedAt } = useLoaderData3(), { telescopes, ris, nightly, totals } = data;
  return /* @__PURE__ */ jsxs22(PageLayout, { menu: "manuUsers", children: [
    /* @__PURE__ */ jsx23(
      PageHero,
      {
        eyebrow: "For users",
        title: /* @__PURE__ */ jsxs22(Fragment12, { children: [
          "Status & ",
          /* @__PURE__ */ jsx23("em", { children: "overview" })
        ] }),
        lede: "What the array can observe at the moment, and what data already exist. Start here before planning an observation or a data request.",
        image: "/img/hero/data.jpg",
        meta: [
          {
            value: String(telescopes.online),
            label: "Telescopes available",
            note: `of ${telescopes.total}`,
            live: !0
          },
          { value: "35", label: "Filters installed", note: "of 40 medium bands" },
          { value: String(ris.coverage_pct), unit: "%", label: "Sky referenced" },
          { value: day2(nightly.last_night), label: "Last night observed" }
        ]
      }
    ),
    /* @__PURE__ */ jsxs22(Section, { eyebrow: "Availability", title: "What is on sky tonight", children: [
      /* @__PURE__ */ jsx23("div", { style: { marginBottom: "1.5rem" }, children: /* @__PURE__ */ jsx23(LiveBadge, { live, updated: generatedAt, interval: "every 30 minutes" }) }),
      /* @__PURE__ */ jsxs22("p", { className: "prose", children: [
        telescopes.online,
        " of ",
        telescopes.total,
        " telescopes are in routine operation. Units not listed as online are either awaiting installation or out of service for maintenance. Each operational unit carries a nine-slot filter wheel holding Sloan broad bands and a share of the medium-band set, so the number of distinct bands available on a given night depends on how many units are observing."
      ] }),
      /* @__PURE__ */ jsx23("div", { style: { marginTop: "2rem" }, children: /* @__PURE__ */ jsx23(
        StatGrid,
        {
          items: [
            {
              value: String(telescopes.online),
              label: "Telescopes online",
              note: `of ${telescopes.total}`,
              live: !0
            },
            { value: "35", label: "Filters installed", note: "of 40 medium bands" },
            { value: num3(nightly.n_nights), label: "Nights observed" },
            { value: day2(nightly.last_night), label: "Most recent night" }
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs22(Section, { eyebrow: "Operations", title: "What a night produces", alt: !0, children: [
      /* @__PURE__ */ jsxs22("p", { className: "prose", children: [
        "Over ",
        num3(nightly.n_nights),
        " observing nights since ",
        day2(nightly.first_night),
        ", the array has recorded ",
        num3(totals.science_frames),
        " science frames in",
        " ",
        num3(totals.exposure_hours),
        " hours of open shutter. A typical night covers",
        " ",
        nightly.tiles_per_night.median,
        " tiles in ",
        num3(nightly.exposures_per_night.median),
        " ",
        "exposures and writes ",
        num3(nightly.raw_gb_per_night.median),
        " GB of raw data, calibration frames included."
      ] }),
      /* @__PURE__ */ jsx23("div", { style: { marginTop: "2rem" }, children: /* @__PURE__ */ jsx23(
        StatGrid,
        {
          items: [
            {
              value: num3(nightly.tiles_per_night.median),
              label: "Tiles per night",
              note: "median"
            },
            {
              value: num3(nightly.exposures_per_night.median),
              label: "Exposures per night",
              note: "median"
            },
            {
              value: num3(nightly.raw_gb_per_night.median),
              unit: "GB",
              label: "Raw data per night",
              note: "median"
            },
            { value: num3(totals.science_frames), label: "Science frames", note: "to date" },
            {
              value: num3(totals.exposure_hours),
              unit: "hr",
              label: "Open shutter",
              note: "to date"
            }
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs22("p", { className: "footnote", style: { marginTop: "1.25rem" }, children: [
        "Medians rather than means: target-of-opportunity nights run to",
        " ",
        num3(nightly.exposures_per_night.max),
        " exposures and would otherwise dominate the figure. Progress of each survey is on its own page \u2014",
        " ",
        /* @__PURE__ */ jsx23(Link14, { to: "/survey/ris", children: "RIS" }),
        ", ",
        /* @__PURE__ */ jsx23(Link14, { to: "/survey/wts", children: "WTS" }),
        " and",
        " ",
        /* @__PURE__ */ jsx23(Link14, { to: "/survey/ims", children: "IMS" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsx23(Section, { eyebrow: "Filters", title: "Bands available", children: /* @__PURE__ */ jsx23("div", { className: "split split--wide-text", children: /* @__PURE__ */ jsxs22("div", { children: [
      /* @__PURE__ */ jsx23("p", { className: "prose", children: "The filter set is what distinguishes 7DT from other survey arrays. Twenty medium bands of 25 nm width are spaced regularly at 25 nm from 400 to 875 nm. Fifteen further filters, installed in late 2025, fall between them with central wavelengths from 375 to 832 nm and bandwidths of 14 to 41 nm. Sloan g, r and i are carried by every unit; u is carried by one and z by three." }),
      /* @__PURE__ */ jsxs22("p", { className: "prose", children: [
        "The original twenty are the calibrated set in operational use. Spectrophotometric calibration of the fifteen added filters is in preparation, and their central wavelengths are not aligned to a regular grid \u2014 check which bands a given tile actually carries on the",
        " ",
        /* @__PURE__ */ jsx23(Link14, { to: "/users/access", children: "data access page" }),
        ", which reports the medium bands observed on any tile."
      ] }),
      /* @__PURE__ */ jsx23("div", { className: "table-wrap", style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsxs22("table", { className: "spec-table", children: [
        /* @__PURE__ */ jsx23("caption", { children: "Medium bands, central wavelength in nm" }),
        /* @__PURE__ */ jsxs22("tbody", { children: [
          /* @__PURE__ */ jsxs22("tr", { children: [
            /* @__PURE__ */ jsx23("th", { scope: "row", children: "Original set (25 nm spacing)" }),
            /* @__PURE__ */ jsx23("td", { style: { fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }, children: BANDS_ORIGINAL.join(", ") })
          ] }),
          /* @__PURE__ */ jsxs22("tr", { children: [
            /* @__PURE__ */ jsx23("th", { scope: "row", children: "Added 2025 (irregular)" }),
            /* @__PURE__ */ jsx23("td", { style: { fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }, children: BANDS_ADDED.join(", ") })
          ] }),
          /* @__PURE__ */ jsxs22("tr", { children: [
            /* @__PURE__ */ jsx23("th", { scope: "row", children: "Broad bands" }),
            /* @__PURE__ */ jsx23("td", { style: { fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }, children: "u, g, r, i, z" })
          ] })
        ] })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs22(Section, { eyebrow: "Response", title: "Filter response curves", alt: !0, wide: !0, children: [
      /* @__PURE__ */ jsx23(FilterCurves, {}),
      /* @__PURE__ */ jsxs22("p", { className: "footnote", style: { marginTop: "1rem" }, children: [
        "Curves are read from the reference data shipped with",
        " ",
        /* @__PURE__ */ jsx23(Link14, { to: "/users/software", children: /* @__PURE__ */ jsx23("code", { children: "supy" }) }),
        ", which is also what its simulator module uses, so a response computed there matches this figure exactly."
      ] })
    ] }),
    /* @__PURE__ */ jsxs22(Section, { eyebrow: "Coverage", title: "What has been observed", children: [
      /* @__PURE__ */ jsxs22("p", { className: "prose", children: [
        ris.coverage_pct,
        " percent of the reference tiling has been observed at least once:",
        " ",
        num3(ris.tiles_observed),
        " of ",
        num3(ris.tiles_defined),
        " tiles. A tile with data has calibrated images and a source catalog. Coverage per tile, including which bands were taken and how many frames exist, is on the sky coverage map."
      ] }),
      /* @__PURE__ */ jsxs22("div", { className: "btn-row", style: { marginTop: "1.5rem" }, children: [
        /* @__PURE__ */ jsx23(Link14, { className: "btn btn--primary", to: "/users/access", children: "Search coverage" }),
        /* @__PURE__ */ jsx23(Link14, { className: "btn btn--secondary", to: "/users/performance", children: "Measured depths" }),
        /* @__PURE__ */ jsx23(Link14, { className: "btn btn--secondary", to: "/users/access", children: "Requesting data" })
      ] })
    ] }),
    /* @__PURE__ */ jsx23(Section, { eyebrow: "Processing", title: "Processing status", alt: !0, children: /* @__PURE__ */ jsxs22("p", { className: "prose", children: [
      "Data are reduced the same day they are taken. Raw frames are transferred from Chile overnight and a typical night clears the pipeline in about five hours of wall-clock time after transfer completes, so survey data are normally available the following day. Target-of-opportunity data skip compression and the wait for sunrise, which brings latency down to tens of minutes. What the pipeline produces, and the quality metrics attached to each product, are described under",
      " ",
      /* @__PURE__ */ jsx23(Link14, { to: "/users/access#format", children: "using the data" }),
      "."
    ] }) })
  ] });
}, users_status_default = Index14;

// app/routes/about.intro.tsx
var about_intro_exports = {};
__export(about_intro_exports, {
  default: () => about_intro_default,
  meta: () => meta15
});
import { Link as Link15 } from "@remix-run/react";
import { Fragment as Fragment13, jsx as jsx24, jsxs as jsxs23 } from "react/jsx-runtime";
var meta15 = () => [
  { title: "What is 7DS \xB7 7-Dimensional Telescope" },
  {
    name: "description",
    content: "The 7-Dimensional Sky Survey: what it measures, why it is built as a medium-band survey, and how it has developed since first light in October 2023."
  }
], MILESTONES = [
  {
    when: "2019\u20132020",
    what: "Before 7DT",
    body: "GECKO, the Gravitational-wave Electromagnetic Counterpart Korean Observatory, follows up gravitational-wave alerts during the O3 run using existing Korean-accessible telescopes. Its campaign on GW190425 covers 621 candidate host galaxies inside a 7,460 deg\xB2 localization and finds no counterpart \u2014 the direct argument for a purpose-built facility."
  },
  {
    when: "Oct 2023",
    what: "First light",
    body: "The first units observe from El Sauce Observatory in the R\xEDo Hurtado Valley, Chile. Commissioning begins with twelve of the twenty planned telescopes on sky."
  },
  {
    when: "Feb 2024",
    what: "First images released",
    body: "The Center for the Gravitational-wave Universe publishes the first public set of 7DT images."
  },
  {
    when: "Jul 2024",
    what: "Reference Imaging Survey begins",
    body: "Routine survey operation starts on the wide-area survey, covering roughly 23,000 deg\xB2 south of Dec +20\xB0 with a single visit per tile."
  },
  {
    when: "Aug 2024",
    what: "Robotic operation",
    body: "RTCSpy takes over nightly operation. From this point the array plans, observes and hands off the night without an operator at the controls."
  },
  {
    when: "Dec 2024",
    what: "Sixteen units, automated response",
    body: "Four more DeltaRho 500 units enter routine operation, and automated target-of-opportunity ingestion goes live: the scheduler can interrupt the night and begin a follow-up exposure in under a minute."
  },
  {
    when: "Apr 2025",
    what: "Intensive Monitoring Survey begins",
    body: "Seven tiles at the south ecliptic pole, chosen to overlap the SPHEREx Deep Field South, are observed every available night."
  },
  {
    when: "Late 2025",
    what: "Thirty-five medium bands",
    body: "Fifteen further medium-band filters are installed, extending coverage to 375\u2013875 nm and advancing toward the designed complement of forty."
  },
  {
    when: "Jun 2026",
    what: "Commissioning closes",
    body: "Final commissioning is completed. The facility is reported as an operating observatory, with two of the three surveys under way."
  },
  {
    when: "Ahead",
    what: "Completing the survey",
    body: "The Wide-area Time-domain Survey commences in 2026. Four remaining units and five remaining filters complete the design, and the first full cycle of the Reference Imaging Survey is anticipated by the end of 2027."
  }
], Index15 = () => /* @__PURE__ */ jsxs23(PageLayout, { menu: "manuAbout", children: [
  /* @__PURE__ */ jsx24(
    PageHero,
    {
      eyebrow: "About",
      title: /* @__PURE__ */ jsxs23(Fragment13, { children: [
        "What is ",
        /* @__PURE__ */ jsx24("em", { children: "7DS" }),
        "?"
      ] }),
      lede: "A medium-band survey of the southern sky that measures a low-resolution spectrum for every source it observes, and repeats the measurement over time.",
      image: "/img/hero/about.jpg",
      meta: [
        { value: "23,000", unit: "deg\xB2", label: "Survey area" },
        { value: "40", label: "Medium bands", note: "35 installed" },
        { value: "30\u201370", label: "Spectral resolution R" },
        { value: "2023", label: "First light" }
      ]
    }
  ),
  /* @__PURE__ */ jsx24(Section, { id: "motivation", eyebrow: "Motivation", title: "Why a medium-band survey", children: /* @__PURE__ */ jsxs23("div", { className: "split split--wide-text", children: [
    /* @__PURE__ */ jsxs23("div", { children: [
      /* @__PURE__ */ jsx24("p", { className: "prose", children: aboutMotivationText }),
      /* @__PURE__ */ jsx24("p", { className: "prose", children: aboutMotivationText2 })
    ] }),
    /* @__PURE__ */ jsxs23("figure", { className: "figure", children: [
      /* @__PURE__ */ jsx24(
        "img",
        {
          src: "/img/overview.png",
          alt: "Sky areas compared: a gravitational-wave localization region set against the fields of view of 7DT and other survey telescopes",
          loading: "lazy"
        }
      ),
      /* @__PURE__ */ jsxs23("figcaption", { children: [
        /* @__PURE__ */ jsx24("b", { children: "Scale of the problem" }),
        " A gravitational-wave localization region set against the field of view of 7DT and of other survey telescopes."
      ] })
    ] })
  ] }) }),
  /* @__PURE__ */ jsx24(Section, { eyebrow: "The name", title: "Seven dimensions", alt: !0, children: /* @__PURE__ */ jsxs23("div", { className: "split split--wide-text", children: [
    /* @__PURE__ */ jsx24("p", { className: "prose", children: aboutText3 }),
    /* @__PURE__ */ jsx24("ul", { className: "feature-list", style: { margin: 0 }, children: surveys_default.dimensions.map((dim) => /* @__PURE__ */ jsxs23("li", { style: { padding: "0.6rem 0" }, children: [
      /* @__PURE__ */ jsx24("span", { className: "feature-list__key", children: dim.n }),
      /* @__PURE__ */ jsx24("div", { children: /* @__PURE__ */ jsx24("h3", { className: "feature-list__title", style: { margin: 0, fontSize: "1rem" }, children: dim.label }) })
    ] }, dim.n)) })
  ] }) }),
  /* @__PURE__ */ jsx24(Section, { eyebrow: "Approach", title: "Spectral mapping and the time domain", children: /* @__PURE__ */ jsxs23("div", { className: "split split--wide-text", children: [
    /* @__PURE__ */ jsxs23("div", { children: [
      /* @__PURE__ */ jsx24("p", { className: "prose", children: surveyIntroText }),
      /* @__PURE__ */ jsx24("p", { className: "prose", children: aboutApproachText }),
      /* @__PURE__ */ jsx24("p", { className: "prose", children: aboutApproachText2 })
    ] }),
    /* @__PURE__ */ jsxs23("div", { className: "panel", children: [
      /* @__PURE__ */ jsx24("div", { className: "panel__title", children: "Where the detail is" }),
      /* @__PURE__ */ jsxs23("ul", { className: "feature-list", style: { borderTop: 0, margin: 0 }, children: [
        /* @__PURE__ */ jsx24("li", { style: { gridTemplateColumns: "minmax(0, 1fr)" }, children: /* @__PURE__ */ jsx24("div", { children: /* @__PURE__ */ jsxs23("p", { className: "feature-list__body", style: { margin: 0 }, children: [
          "How the three surveys divide area, cadence and depth \u2014",
          " ",
          /* @__PURE__ */ jsx24(Link15, { to: "/survey/overview", children: "survey design" }),
          "."
        ] }) }) }),
        /* @__PURE__ */ jsx24("li", { style: { gridTemplateColumns: "minmax(0, 1fr)" }, children: /* @__PURE__ */ jsx24("div", { children: /* @__PURE__ */ jsxs23("p", { className: "feature-list__body", style: { margin: 0 }, children: [
          "What the array is and why it is built as an array \u2014",
          " ",
          /* @__PURE__ */ jsx24(Link15, { to: "/telescope/overview", children: "the telescope" }),
          "."
        ] }) }) }),
        /* @__PURE__ */ jsx24("li", { style: { gridTemplateColumns: "minmax(0, 1fr)" }, children: /* @__PURE__ */ jsx24("div", { children: /* @__PURE__ */ jsxs23("p", { className: "feature-list__body", style: { margin: 0 }, children: [
          "What the measurement is used for \u2014",
          " ",
          /* @__PURE__ */ jsx24(Link15, { to: "/science/overview", children: "science" }),
          "."
        ] }) }) })
      ] })
    ] })
  ] }) }),
  /* @__PURE__ */ jsxs23(Section, { id: "history", eyebrow: "History", title: "From first light to survey operation", alt: !0, children: [
    /* @__PURE__ */ jsx24("ol", { className: "timeline", children: MILESTONES.map((item) => /* @__PURE__ */ jsxs23("li", { children: [
      /* @__PURE__ */ jsx24("span", { className: "timeline__when", children: item.when }),
      /* @__PURE__ */ jsxs23("div", { className: "timeline__body", children: [
        /* @__PURE__ */ jsx24("h3", { children: item.what }),
        /* @__PURE__ */ jsx24("p", { children: item.body })
      ] })
    ] }, item.when)) }),
    /* @__PURE__ */ jsx24("div", { style: { marginTop: "2.5rem" }, children: /* @__PURE__ */ jsx24(
      NextLinks,
      {
        title: "Continue",
        links: [
          { label: "Survey design", href: "/survey/overview" },
          { label: "Team", href: "/about/team" },
          { label: "Funding", href: "/about/funding" },
          { label: "For users", href: "/users/status" }
        ]
      }
    ) })
  ] })
] }), about_intro_default = Index15;

// app/routes/science.sci.tsx
var science_sci_exports = {};
__export(science_sci_exports, {
  default: () => science_sci_default,
  meta: () => meta16
});
import { Link as Link16 } from "@remix-run/react";
import { jsx as jsx25, jsxs as jsxs24 } from "react/jsx-runtime";
var meta16 = () => [
  { title: "Science themes \xB7 7-Dimensional Telescope" },
  {
    name: "description",
    content: "Science themes and early results from the 7-Dimensional Telescope: multi-messenger astronomy, transients, galaxies, cosmology, AGN, Galactic and solar-system science."
  }
], Index16 = () => /* @__PURE__ */ jsxs24(PageLayout, { menu: "manuScience", children: [
  /* @__PURE__ */ jsx25(
    PageHero,
    {
      eyebrow: "Science",
      title: "Themes & early results",
      lede: "Each theme draws on the same data product: a medium-band spectral energy distribution for every source in a 1.25 square degree field.",
      image: "/img/hero/sci.jpg"
    }
  ),
  /* @__PURE__ */ jsx25(Section, { eyebrow: "Themes", title: "The 7DS science program", children: /* @__PURE__ */ jsx25("ul", { className: "feature-list", children: science_default.themes.map((theme) => /* @__PURE__ */ jsxs24("li", { id: theme.id, style: { scrollMarginTop: "6rem" }, children: [
    /* @__PURE__ */ jsx25("span", { className: "feature-list__key", children: theme.n }),
    /* @__PURE__ */ jsxs24("div", { children: [
      /* @__PURE__ */ jsx25("h2", { className: "feature-list__title", style: { fontSize: "1.25rem" }, children: theme.title }),
      /* @__PURE__ */ jsx25("p", { className: "feature-list__body", style: { maxWidth: "68ch" }, children: theme.summary })
    ] })
  ] }, theme.id)) }) }),
  /* @__PURE__ */ jsx25(Section, { eyebrow: "Data", title: "Working with 7DT data", alt: !0, children: /* @__PURE__ */ jsxs24("div", { className: "split", children: [
    /* @__PURE__ */ jsxs24("div", { children: [
      /* @__PURE__ */ jsx25("p", { className: "prose", children: "7DT data products are medium-band images and matched source catalogs on the survey tiling, calibrated against Gaia DR3 synthetic photometry and flux-scaled so that pixel values carry units of microjansky. That makes them directly usable for pixel-based SED fitting without further conversion." }),
      /* @__PURE__ */ jsxs24("div", { className: "btn-row", style: { marginTop: "1.5rem" }, children: [
        /* @__PURE__ */ jsx25(Link16, { className: "btn btn--primary", to: "/users/access#format", children: "Using the data" }),
        /* @__PURE__ */ jsx25(Link16, { className: "btn btn--secondary", to: "/users/software", children: "Software" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs24("figure", { className: "figure", children: [
      /* @__PURE__ */ jsx25(
        "img",
        {
          src: "/img/images/Figure8a(lowres)_u-500-650_asinh.png",
          alt: "Pseudo-color image of the Helix Nebula from Sloan u and the m500 and m650 medium bands",
          loading: "lazy"
        }
      ),
      /* @__PURE__ */ jsxs24("figcaption", { children: [
        /* @__PURE__ */ jsx25("b", { children: "Helix Nebula" }),
        " Pseudo-color composite from Sloan u and the m500 and m650 medium bands, mapped to blue, green and red."
      ] })
    ] })
  ] }) })
] }), science_sci_default = Index16;

// app/routes/users.links.tsx
var users_links_exports = {};
__export(users_links_exports, {
  default: () => users_links_default,
  headers: () => headers4,
  loader: () => loader9,
  meta: () => meta17
});
import { json as json4 } from "@remix-run/node";
import { Link as Link17, useLoaderData as useLoaderData4 } from "@remix-run/react";
import { Fragment as Fragment14, jsx as jsx26, jsxs as jsxs25 } from "react/jsx-runtime";
var meta17 = () => [
  { title: "Useful links \xB7 7DT for users" },
  {
    name: "description",
    content: "Project services, code repositories and documentation for users of the 7-Dimensional Telescope."
  }
], CACHE4 = "public, max-age=3600", headers4 = () => ({ "Cache-Control": CACHE4 }), SERVICES = [
  {
    key: "LINK_WIKI",
    name: "Project wiki",
    note: "User manuals, quality-assurance criteria and operating procedures for internal and external users of 7DT data."
  },
  {
    key: "LINK_PIPELINE",
    name: "Pipeline status",
    note: "Real-time progress of the nightly reduction, with quality-assurance summaries per night and per unit."
  },
  {
    key: "LINK_TOO",
    name: "Target-of-opportunity page",
    note: "Observation requests and the history of follow-up campaigns, including gravitational-wave events."
  },
  {
    key: "LINK_PORTAL",
    name: "Data server",
    note: "The observation database of record: images, catalogs, processing state and data quality."
  }
];
async function loader9() {
  return json4(
    {
      services: SERVICES.map((service) => ({ ...service, url: readEnv(service.key) ?? null }))
    },
    { headers: { "Cache-Control": CACHE4 } }
  );
}
var GITHUB = "https://github.com/7DimensionalTelescope", CODE = [
  ["pipeline", `${GITHUB}/pipeline`, "Py7DT \u2014 the data reduction pipeline, from preprocessing through difference imaging"],
  ["supy", `${GITHUB}/supy`, "Target visibility, tile lookup and filter response simulation for 7DT users"],
  ["tcspy", `${GITHUB}/tcspy`, "RTCSpy \u2014 telescope control and scheduling for the array"],
  ["Spec7DT", `${GITHUB}/Spec7DT`, "Spectral image handling tools for 7DT users"],
  ["Spec7plot", `${GITHUB}/Spec7plot`, "Plotting and image handling tools for 7DT users"],
  ["tract7dt", `${GITHUB}/tract7dt`, "Tractor-based photometry pipeline for 7DT images"],
  ["gcn_bot", `${GITHUB}/gcn_bot`, "Real-time GCN alert monitoring feeding target-of-opportunity response"],
  ["gppy", `${GITHUB}/gppy`, "Automatic processing and transient search"]
], DOCS = [
  ["supy documentation", "https://sdt-supy.readthedocs.io/en/latest/", "Installation, module reference and worked examples"],
  ["supy examples \u2014 Observer", "https://sdt-supy.readthedocs.io/en/latest/examples/observer.html", "Target visibility and altitude from El Sauce"],
  ["supy examples \u2014 Tiles", "https://sdt-supy.readthedocs.io/en/latest/examples/tiles.html", "Tile lookup by coordinate and matching a localization region"],
  ["supy examples \u2014 Simulator", "https://sdt-supy.readthedocs.io/en/latest/examples/simulator.html", "Filter and detector response simulation"]
], Index17 = () => {
  let { services } = useLoaderData4(), linked = services.filter((service) => service.url);
  return /* @__PURE__ */ jsxs25(PageLayout, { menu: "manuUsers", children: [
    /* @__PURE__ */ jsx26(
      PageHero,
      {
        eyebrow: "For users",
        title: /* @__PURE__ */ jsxs25(Fragment14, { children: [
          "Useful ",
          /* @__PURE__ */ jsx26("em", { children: "links" })
        ] }),
        lede: "Project services, code and documentation. For partner surveys, vendors and institutions, see the site-wide links page.",
        image: "/img/hero/computer.jpg"
      }
    ),
    /* @__PURE__ */ jsxs25(Section, { eyebrow: "Services", title: "Operational services", children: [
      linked.length > 0 ? /* @__PURE__ */ jsx26("ul", { className: "feature-list", children: linked.map((service) => /* @__PURE__ */ jsxs25("li", { children: [
        /* @__PURE__ */ jsx26("span", { className: "feature-list__key", children: "\u2197" }),
        /* @__PURE__ */ jsxs25("div", { children: [
          /* @__PURE__ */ jsx26("h3", { className: "feature-list__title", children: /* @__PURE__ */ jsx26("a", { href: service.url ?? "#", target: "_blank", rel: "noreferrer", children: service.name }) }),
          /* @__PURE__ */ jsx26("p", { className: "feature-list__body", children: service.note })
        ] })
      ] }, service.key)) }) : /* @__PURE__ */ jsxs25("div", { className: "panel", style: { maxWidth: "68ch" }, children: [
        /* @__PURE__ */ jsx26("div", { className: "panel__title", children: "Not publicly linked" }),
        /* @__PURE__ */ jsx26("p", { className: "feature-list__body", style: { marginBottom: "0.75rem" }, children: "Four services support work with 7DT data \u2014 a project wiki carrying user manuals and quality-assurance criteria, a pipeline status page with per-night progress, a target-of-opportunity page holding observation requests and campaign history, and the observation database itself. They run on project infrastructure and are reached through the collaboration rather than from this page." }),
        /* @__PURE__ */ jsxs25("p", { className: "feature-list__body", style: { marginBottom: 0 }, children: [
          "Ask the project for access, or see",
          " ",
          /* @__PURE__ */ jsx26(Link17, { to: "/users/access", children: "data access" }),
          " for what can be obtained without it."
        ] })
      ] }),
      linked.length > 0 && linked.length < services.length && /* @__PURE__ */ jsx26("p", { className: "footnote", style: { marginTop: "1rem" }, children: "Services not listed here are reached through the collaboration rather than from this page." })
    ] }),
    /* @__PURE__ */ jsxs25(Section, { eyebrow: "Code", title: "Repositories", alt: !0, children: [
      /* @__PURE__ */ jsxs25("p", { className: "prose", children: [
        "All 7DT software is developed in the open on GitHub. What to install as a user, and what each package is for, is set out under",
        " ",
        /* @__PURE__ */ jsx26(Link17, { to: "/users/software", children: "available software" }),
        "."
      ] }),
      /* @__PURE__ */ jsx26("ul", { className: "feature-list", style: { marginTop: "2rem" }, children: CODE.map((item) => /* @__PURE__ */ jsxs25("li", { children: [
        /* @__PURE__ */ jsx26("span", { className: "feature-list__key", style: { fontFamily: "var(--font-mono)" }, children: "\u2197" }),
        /* @__PURE__ */ jsxs25("div", { children: [
          /* @__PURE__ */ jsx26("h3", { className: "feature-list__title", style: { fontFamily: "var(--font-mono)", fontSize: "1rem" }, children: /* @__PURE__ */ jsx26("a", { href: item[1], target: "_blank", rel: "noreferrer", children: item[0] }) }),
          /* @__PURE__ */ jsx26("p", { className: "feature-list__body", children: item[2] })
        ] })
      ] }, item[0])) }),
      /* @__PURE__ */ jsx26("div", { className: "btn-row", style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsx26("a", { className: "btn btn--secondary", href: GITHUB, target: "_blank", rel: "noreferrer", children: "All repositories" }) })
    ] }),
    /* @__PURE__ */ jsxs25(Section, { eyebrow: "Documentation", title: "Manuals and examples", children: [
      /* @__PURE__ */ jsx26("ul", { className: "feature-list", children: DOCS.map((item) => /* @__PURE__ */ jsxs25("li", { children: [
        /* @__PURE__ */ jsx26("span", { className: "feature-list__key", children: "\u2197" }),
        /* @__PURE__ */ jsxs25("div", { children: [
          /* @__PURE__ */ jsx26("h3", { className: "feature-list__title", children: /* @__PURE__ */ jsx26("a", { href: item[1], target: "_blank", rel: "noreferrer", children: item[0] }) }),
          /* @__PURE__ */ jsx26("p", { className: "feature-list__body", children: item[2] })
        ] })
      ] }, item[0])) }),
      /* @__PURE__ */ jsxs25("p", { className: "footnote", style: { marginTop: "1.5rem" }, children: [
        "Instrument and pipeline papers are listed under",
        " ",
        /* @__PURE__ */ jsx26(Link17, { to: "/publication/list", children: "publications" }),
        ". Partner surveys, facilities, vendors and institutions are on the ",
        /* @__PURE__ */ jsx26(Link17, { to: "/links", children: "links page" }),
        "."
      ] })
    ] })
  ] });
}, users_links_default = Index17;

// app/routes/about.team.tsx
var about_team_exports = {};
__export(about_team_exports, {
  default: () => about_team_default,
  meta: () => meta18
});

// app/routes/content/team.json
var team_default = {
  members: [
    {
      name: "Prof. Myungshin Im",
      role: "Principal Investigator",
      title: "Professor",
      affiliation: "Seoul National University",
      email: "mim@astro.snu.ac.kr",
      webpage: "http://astro.snu.ac.kr/~mim",
      imgName: "ImMS.jpeg"
    },
    {
      name: "Dr. Ji Hoon Kim",
      role: "Project Manager",
      title: "Principal Researcher",
      affiliation: "Seoul National University",
      email: "jhkim.astrosnu@gmail.com",
      imgName: "KimJH.jpeg"
    },
    {
      name: "Dr. Seo-won Chang",
      role: "Database Management",
      title: "Associate Research Professor",
      affiliation: "Seoul National University",
      email: "seowon.chang@snu.ac.kr",
      imgName: "ChangSW.jpeg"
    },
    {
      name: "Prof. Donggeun Tak",
      role: "Software Management",
      title: "Assistant Professor",
      affiliation: "Kyung Hee University",
      email: "donggeun.tak@gmail.com",
      webpage: "https://sites.google.com/view/khu-mma/",
      imgName: ""
    },
    {
      name: "Dr. Gregory S.H. Paek",
      role: "Software Development",
      title: "",
      affiliation: "Institute for Astronomy, University of Hawaii",
      email: "gregorypaek94@gmail.com",
      imgName: "PaekG.jpeg"
    },
    {
      name: "Hyeonho Choi",
      role: "Control System Development",
      title: "PhD Student",
      affiliation: "Seoul National University",
      email: "hhchoi1022@gmail.com",
      imgName: "ChoiHH.jpeg"
    },
    {
      name: "Donghwan Hyun",
      role: "Data Pipeline Development",
      title: "PhD Student",
      affiliation: "Seoul National University",
      email: "",
      imgName: ""
    }
  ]
};

// app/routes/content/collabs.json
var collabs_default = {
  collabs: [
    { id: 1, firstName: "Myungshin", lastName: "Im", affiliation: "Seoul National University", workingGroup: "Science, Multi-messenger", email: "myungshin.im@gmail.com" },
    { id: 2, firstName: "Ji Hoon", lastName: "Kim", affiliation: "Seoul National University", workingGroup: "Operations", email: "jhkim.astrosnu@gmail.com" },
    { id: 3, firstName: "Hyung Mok", lastName: "Lee", affiliation: "Seoul National University", workingGroup: "Science", email: "" },
    { id: 4, firstName: "Seo-Won", lastName: "Chang", affiliation: "Seoul National University", workingGroup: "Database", email: "seowon.chang@snu.ac.kr" },
    { id: 5, firstName: "Donggeun", lastName: "Tak", affiliation: "Kyung Hee University", workingGroup: "MMA, Transients", email: "donggeun.tak@gmail.com" },
    { id: 6, firstName: "Gregory S. H.", lastName: "Paek", affiliation: "University of Hawaii", workingGroup: "Photometric Calibration", email: "gregorypaek94@gmail.com" },
    { id: 7, firstName: "Hyeonho", lastName: "Choi", affiliation: "Seoul National University", workingGroup: "Telescope Control", email: "hhchoi1022@gmail.com" },
    { id: 8, firstName: "Donghwan", lastName: "Hyun", affiliation: "Seoul National University", workingGroup: "Data Pipeline", email: "" },
    { id: 9, firstName: "Chang-wan", lastName: "Kim", affiliation: "Seoul National University", workingGroup: "Operations", email: "" },
    { id: 10, firstName: "Won-Hyeong", lastName: "Lee", affiliation: "Seoul National University", workingGroup: "Data Pipeline", email: "" },
    { id: 11, firstName: "Danhyeuk", lastName: "Seol", affiliation: "Seoul National University", workingGroup: "Data Pipeline", email: "" },
    { id: 12, firstName: "Jangho", lastName: "Bae", affiliation: "Seoul National University", workingGroup: "Data Pipeline", email: "" }
  ]
};

// app/routes/about.team.tsx
import { Fragment as Fragment15, jsx as jsx27, jsxs as jsxs26 } from "react/jsx-runtime";
var meta18 = () => [
  { title: "Team \xB7 7-Dimensional Telescope" },
  {
    name: "description",
    content: "The people who build, operate and analyze 7DT and the 7-Dimensional Sky Survey."
  }
], initials = (name) => name.replace(/^(Prof\.|Dr\.)\s+/, "").split(/\s+/).map((part) => part[0]).slice(0, 2).join(""), Index18 = () => /* @__PURE__ */ jsxs26(PageLayout, { menu: "manuAbout", children: [
  /* @__PURE__ */ jsx27(
    PageHero,
    {
      eyebrow: "About",
      title: "The team",
      lede: "7DT is designed, built and operated by the Center for the Gravitational-wave Universe at Seoul National University, with collaborators across Korea and abroad.",
      image: "/img/hero/team.jpg",
      meta: [
        { value: String(team_default.members.length), label: "Core Members" },
        { value: String(7), label: "Science Groups" },
        { value: "SNU", label: "Host institution" }
      ]
    }
  ),
  /* @__PURE__ */ jsx27(Section, { eyebrow: "Core team", title: "Who does what", children: /* @__PURE__ */ jsx27("div", { className: "people-grid", children: team_default.members.map((member) => /* @__PURE__ */ jsxs26("div", { className: "person", children: [
    /* @__PURE__ */ jsx27(
      "div",
      {
        className: "person__portrait",
        style: member.imgName ? { backgroundImage: `url(/img/team/${member.imgName})` } : void 0,
        children: !member.imgName && initials(member.name)
      }
    ),
    /* @__PURE__ */ jsxs26("div", { children: [
      /* @__PURE__ */ jsx27("h3", { className: "person__name", children: member.name }),
      /* @__PURE__ */ jsx27("p", { className: "person__role", children: member.role }),
      /* @__PURE__ */ jsxs26("p", { className: "person__meta", children: [
        member.title && /* @__PURE__ */ jsxs26(Fragment15, { children: [
          member.title,
          /* @__PURE__ */ jsx27("br", {})
        ] }),
        member.affiliation
      ] }),
      /* @__PURE__ */ jsxs26("div", { className: "person__links", children: [
        member.webpage && /* @__PURE__ */ jsx27("a", { href: member.webpage, title: "Homepage", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsx27("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx27(
          "path",
          {
            fillRule: "evenodd",
            d: "M11.3 3.3a1 1 0 0 1 1.4 0l6 6 2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2 6-6Z",
            clipRule: "evenodd"
          }
        ) }) }),
        member.email && /* @__PURE__ */ jsx27("a", { href: `mailto:${member.email}`, title: member.email, children: /* @__PURE__ */ jsxs26(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.7",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsx27("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
              /* @__PURE__ */ jsx27("path", { d: "m3 7 9 6 9-6" })
            ]
          }
        ) })
      ] })
    ] })
  ] }, member.name)) }) }),
  /* @__PURE__ */ jsxs26(Section, { eyebrow: "Collaboration", title: "7DT/7DS team members", alt: !0, wide: !0, children: [
    /* @__PURE__ */ jsx27("p", { className: "lede", children: "Members of the 7DT collaboration contributing to the instrument, operations, pipeline and science working groups." }),
    /* @__PURE__ */ jsx27("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs26("table", { className: "tier-table", children: [
      /* @__PURE__ */ jsxs26("caption", { children: [
        "7DT collaboration \u2014 ",
        collabs_default.collabs.length,
        " members"
      ] }),
      /* @__PURE__ */ jsx27("thead", { children: /* @__PURE__ */ jsxs26("tr", { children: [
        /* @__PURE__ */ jsx27("th", { scope: "col", children: "Name" }),
        /* @__PURE__ */ jsx27("th", { scope: "col", children: "Affiliation" }),
        /* @__PURE__ */ jsx27("th", { scope: "col", children: "Working group" }),
        /* @__PURE__ */ jsx27("th", { scope: "col", children: "Contact" })
      ] }) }),
      /* @__PURE__ */ jsx27("tbody", { children: collabs_default.collabs.map((person) => /* @__PURE__ */ jsxs26("tr", { children: [
        /* @__PURE__ */ jsxs26("th", { scope: "row", style: { fontWeight: 600, color: "var(--ink-900)" }, children: [
          person.firstName,
          " ",
          person.lastName
        ] }),
        /* @__PURE__ */ jsx27("td", { style: { fontFamily: "var(--font-sans)" }, children: person.affiliation }),
        /* @__PURE__ */ jsx27("td", { style: { fontFamily: "var(--font-sans)" }, children: person.workingGroup }),
        /* @__PURE__ */ jsx27("td", { children: person.email ? /* @__PURE__ */ jsx27("a", { href: `mailto:${person.email}`, children: person.email }) : /* @__PURE__ */ jsx27("span", { style: { color: "var(--slate-400)" }, children: "\u2014" }) })
      ] }, person.id)) })
    ] }) }),
    /* @__PURE__ */ jsxs26("p", { className: "note", style: { marginTop: "1rem" }, children: [
      "To join a working group or propose a collaboration, contact the principal investigator at ",
      /* @__PURE__ */ jsx27("a", { href: "mailto:mim@astro.snu.ac.kr", children: "mim@astro.snu.ac.kr" }),
      "."
    ] })
  ] })
] }), about_team_default = Index18;

// app/routes/survey.ims.tsx
var survey_ims_exports = {};
__export(survey_ims_exports, {
  default: () => survey_ims_default,
  headers: () => headers5,
  loader: () => loader10,
  meta: () => meta19
});
import { json as json5 } from "@remix-run/node";
import { useLoaderData as useLoaderData5 } from "@remix-run/react";

// app/components/surveypage.tsx
import { Link as Link18 } from "@remix-run/react";
import { jsx as jsx28, jsxs as jsxs27 } from "react/jsx-runtime";
function SurveyPage(props) {
  let {
    code,
    name,
    lede,
    image,
    heroMeta,
    tradeoff,
    goal,
    rationale,
    parameters,
    live,
    generatedAt,
    map,
    coverage,
    progress,
    children
  } = props;
  return /* @__PURE__ */ jsxs27(PageLayout, { menu: "manu7ds", children: [
    /* @__PURE__ */ jsx28(
      PageHero,
      {
        eyebrow: `Survey \xB7 ${code}`,
        title: name,
        lede,
        image,
        meta: heroMeta
      }
    ),
    /* @__PURE__ */ jsx28(Section, { eyebrow: "Strategy", title: "What this survey is for", children: /* @__PURE__ */ jsxs27("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsxs27("div", { children: [
        /* @__PURE__ */ jsx28("p", { className: "rationale__goal", children: goal }),
        /* @__PURE__ */ jsx28("p", { className: "prose", children: rationale })
      ] }),
      /* @__PURE__ */ jsxs27("div", { children: [
        /* @__PURE__ */ jsxs27("div", { className: "panel", children: [
          /* @__PURE__ */ jsx28("div", { className: "panel__title", children: "Trade" }),
          /* @__PURE__ */ jsx28("p", { className: "feature-list__body", style: { margin: 0 }, children: tradeoff })
        ] }),
        /* @__PURE__ */ jsx28("div", { className: "table-wrap", style: { marginTop: "1.25rem" }, children: /* @__PURE__ */ jsxs27("table", { className: "spec-table", children: [
          /* @__PURE__ */ jsx28("caption", { children: "Design parameters" }),
          /* @__PURE__ */ jsx28("tbody", { children: parameters.map((row) => /* @__PURE__ */ jsxs27("tr", { children: [
            /* @__PURE__ */ jsx28("th", { scope: "row", children: row[0] }),
            /* @__PURE__ */ jsx28("td", { children: row[1] })
          ] }, row[0])) })
        ] }) })
      ] })
    ] }) }),
    map && /* @__PURE__ */ jsxs27(Section, { eyebrow: "Map", title: map.title ?? "Where it has observed", alt: !0, wide: !0, children: [
      /* @__PURE__ */ jsx28("div", { style: { marginBottom: "1.25rem" }, children: /* @__PURE__ */ jsx28(LiveBadge, { live, updated: generatedAt, interval: "daily" }) }),
      map.node,
      /* @__PURE__ */ jsxs27("p", { className: "footnote", style: { marginTop: "1rem" }, children: [
        map.note,
        " The whole survey footprint, with per-tile detail under the pointer and a search by position, is on the ",
        /* @__PURE__ */ jsx28(Link18, { to: "/users/access", children: "data access page" }),
        "."
      ] })
    ] }),
    coverage && /* @__PURE__ */ jsxs27(Section, { eyebrow: "Coverage", title: "What has been observed so far", children: [
      /* @__PURE__ */ jsx28("div", { style: { marginBottom: "1.5rem" }, children: /* @__PURE__ */ jsx28(LiveBadge, { live, updated: generatedAt, interval: "every 30 minutes" }) }),
      /* @__PURE__ */ jsx28(StatGrid, { items: coverage }),
      progress && /* @__PURE__ */ jsxs27("div", { className: "panel", style: { marginTop: "2rem" }, children: [
        /* @__PURE__ */ jsx28("div", { className: "panel__title", children: "Status" }),
        /* @__PURE__ */ jsx28(
          "div",
          {
            className: "meter",
            role: "img",
            "aria-label": `${code} progress: ${progress.percent} percent`,
            children: /* @__PURE__ */ jsx28(
              "span",
              {
                className: "meter__fill meter__fill--spectrum",
                style: { width: `${progress.percent}%` }
              }
            )
          }
        ),
        /* @__PURE__ */ jsx28("p", { className: "note", style: { marginTop: "0.75rem", marginBottom: 0 }, children: progress.label }),
        progress.note && /* @__PURE__ */ jsx28("p", { className: "footnote", style: { marginTop: "0.5rem", marginBottom: 0 }, children: progress.note })
      ] })
    ] }),
    children,
    /* @__PURE__ */ jsx28(Section, { eyebrow: "Elsewhere", title: "Related pages", alt: !0, children: /* @__PURE__ */ jsxs27("div", { className: "chip-row", children: [
      /* @__PURE__ */ jsx28(Link18, { className: "chip", to: "/survey/overview", children: "All three surveys" }),
      /* @__PURE__ */ jsx28(Link18, { className: "chip", to: "/users/access", children: "Sky coverage and search" }),
      /* @__PURE__ */ jsx28(Link18, { className: "chip", to: "/users/status", children: "Array operations" }),
      /* @__PURE__ */ jsx28(Link18, { className: "chip", to: "/users/performance", children: "Measured performance" })
    ] }) })
  ] });
}

// app/components/fieldmap.tsx
import { jsx as jsx29, jsxs as jsxs28 } from "react/jsx-runtime";
var DEG3 = Math.PI / 180;
function project2(ra, dec, ra0, dec0) {
  let d = dec * DEG3, d0 = dec0 * DEG3, dRa = (ra - ra0) * DEG3, cosC = Math.sin(d0) * Math.sin(d) + Math.cos(d0) * Math.cos(d) * Math.cos(dRa);
  if (cosC <= 0)
    return [NaN, NaN];
  let x = Math.cos(d) * Math.sin(dRa) / cosC, y = (Math.cos(d0) * Math.sin(d) - Math.sin(d0) * Math.cos(d) * Math.cos(dRa)) / cosC;
  return [-x / DEG3, y / DEG3];
}
function step(span) {
  for (let candidate of [0.25, 0.5, 1, 2, 5, 10])
    if (span / candidate <= 6)
      return candidate;
  return 15;
}
function FieldMap({
  tiles,
  fovLon = 1.34,
  fovLat = 0.9,
  valueLabel = "visits",
  caption
}) {
  if (tiles.length === 0)
    return null;
  let focus = tiles.some((t) => t.highlight) ? tiles.filter((t) => t.highlight) : tiles, ra0 = focus.reduce((sum, t) => sum + t.ra, 0) / focus.length, dec0 = focus.reduce((sum, t) => sum + t.dec, 0) / focus.length, corners = (t) => {
    let halfLat = fovLat / 2, out = [];
    for (let [dLat, sign] of [
      [+halfLat, -1],
      [+halfLat, 1],
      [-halfLat, 1],
      [-halfLat, -1]
    ]) {
      let dec = t.dec + dLat, halfLon = fovLon / 2 / Math.max(0.02, Math.cos(dec * DEG3));
      out.push(project2(t.ra + sign * halfLon, dec, ra0, dec0));
    }
    return out;
  }, shapes = tiles.map((t) => ({ tile: t, points: corners(t) })), xs = shapes.flatMap((s) => s.points.map((p) => p[0])).filter(Number.isFinite), ys = shapes.flatMap((s) => s.points.map((p) => p[1])).filter(Number.isFinite), pad = Math.max(fovLon, fovLat) * 0.45, minX = Math.min(...xs) - pad, maxX = Math.max(...xs) + pad, minY = Math.min(...ys) - pad, maxY = Math.max(...ys) + pad, PPD = 150, L2 = 52, B2 = 34, T2 = 10, R2 = 12, plotW = (maxX - minX) * PPD, plotH = (maxY - minY) * PPD, W2 = plotW + L2 + R2, H2 = plotH + T2 + B2, sx = (x) => L2 + (x - minX) * PPD, sy = (y) => T2 + (maxY - y) * PPD, maxValue = Math.max(...focus.map((t) => t.value), 1), minValue = Math.min(...focus.map((t) => t.value)), decs = [], ras = [], decSpan = fovLat + Math.abs(maxY - minY), decStep = step(decSpan), raStep = step((maxX - minX) / Math.cos(dec0 * DEG3));
  for (let d = Math.ceil((dec0 - 6) / decStep) * decStep; d <= dec0 + 6; d += decStep)
    decs.push(d);
  for (let r = Math.ceil((ra0 - 12) / raStep) * raStep; r <= ra0 + 12; r += raStep)
    ras.push(r);
  let path2 = (points) => points.filter((p) => Number.isFinite(p[0]) && Number.isFinite(p[1])).map((p, i) => `${i === 0 ? "M" : "L"}${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(" "), decLine = (d) => {
    let pts = [];
    for (let r = ra0 - 12; r <= ra0 + 12; r += 0.25)
      pts.push(project2(r, d, ra0, dec0));
    return pts;
  }, raLine = (r) => {
    let pts = [];
    for (let d = dec0 - 6; d <= dec0 + 6; d += 0.1)
      pts.push(project2(r, d, ra0, dec0));
    return pts;
  }, raLabel = (deg) => `${((deg % 360 + 360) % 360).toFixed(raStep < 1 ? 1 : 0)}\xB0`;
  return /* @__PURE__ */ jsxs28("div", { className: "fieldmap", children: [
    /* @__PURE__ */ jsxs28(
      "svg",
      {
        viewBox: `0 0 ${W2.toFixed(0)} ${H2.toFixed(0)}`,
        width: "100%",
        role: "img",
        "aria-label": `Map of ${tiles.length} survey tiles centered on right ascension ${ra0.toFixed(
          1
        )} degrees, declination ${dec0.toFixed(1)} degrees.`,
        children: [
          /* @__PURE__ */ jsx29("rect", { x: L2, y: T2, width: plotW, height: plotH, fill: "#f2f5fa" }),
          /* @__PURE__ */ jsxs28("g", { stroke: "rgba(10,16,28,0.16)", strokeWidth: "0.7", fill: "none", strokeDasharray: "2 3", children: [
            decs.map((d) => /* @__PURE__ */ jsx29("path", { d: path2(decLine(d)) }, `d${d}`)),
            ras.map((r) => /* @__PURE__ */ jsx29("path", { d: path2(raLine(r)) }, `r${r}`))
          ] }),
          /* @__PURE__ */ jsxs28(
            "g",
            {
              fill: "#4d5b71",
              fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
              fontSize: "11",
              children: [
                decs.map((d) => {
                  let p = project2(ra0, d, ra0, dec0), y = sy(p[1]);
                  return y < T2 + 6 || y > T2 + plotH - 2 ? null : /* @__PURE__ */ jsxs28("text", { x: L2 - 8, y: y + 3.5, textAnchor: "end", children: [
                    d > 0 ? "+" : "\u2212",
                    Math.abs(d).toFixed(decStep < 1 ? 2 : 0),
                    "\xB0"
                  ] }, `dl${d}`);
                }),
                ras.map((r) => {
                  let p = project2(r, dec0, ra0, dec0), x = sx(p[0]);
                  return x < L2 + 14 || x > L2 + plotW - 14 ? null : /* @__PURE__ */ jsx29("text", { x, y: T2 + plotH + 16, textAnchor: "middle", children: raLabel(r) }, `rl${r}`);
                }),
                /* @__PURE__ */ jsx29("text", { x: L2 - 8, y: T2 + plotH + 16, textAnchor: "end", fill: "#8090a6", children: "Dec" }),
                /* @__PURE__ */ jsx29("text", { x: L2 + plotW / 2, y: T2 + plotH + 30, textAnchor: "middle", fill: "#8090a6", children: "RA (deg) \u2014 increasing to the left" })
              ]
            }
          ),
          /* @__PURE__ */ jsx29("g", { children: [...shapes].sort((a, b) => Number(Boolean(a.tile.highlight)) - Number(Boolean(b.tile.highlight))).map(({ tile, points }) => {
            let active = tile.highlight !== !1, color = spectrum(
              maxValue === minValue ? 0.65 : (tile.value - minValue) / (maxValue - minValue) * 0.75 + 0.2
            ), center = project2(tile.ra, tile.dec, ra0, dec0), cx = sx(center[0]), cy = sy(center[1]), text = active ? isDark(color) ? "#ffffff" : "#0a101c" : "#5b6b82";
            return /* @__PURE__ */ jsxs28("g", { children: [
              /* @__PURE__ */ jsx29(
                "polygon",
                {
                  points: points.filter((p) => Number.isFinite(p[0])).map((p) => `${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(" "),
                  fill: active ? rgb(color) : "rgba(10,16,28,0.03)",
                  stroke: active ? "rgba(255,255,255,0.75)" : "rgba(10,16,28,0.22)",
                  strokeWidth: active ? 2.5 : 0.8,
                  strokeDasharray: active ? "7 4" : void 0
                }
              ),
              /* @__PURE__ */ jsx29(
                "text",
                {
                  x: cx,
                  y: active ? cy - 3 : cy + 4,
                  textAnchor: "middle",
                  fill: text,
                  fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
                  fontSize: active ? 13 : 10,
                  fontWeight: active ? 600 : 400,
                  children: tile.name
                }
              ),
              active && /* @__PURE__ */ jsxs28(
                "text",
                {
                  x: cx,
                  y: cy + 14,
                  textAnchor: "middle",
                  fill: text,
                  fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
                  fontSize: "11",
                  opacity: "0.85",
                  children: [
                    tile.value.toLocaleString("en-US"),
                    " ",
                    valueLabel
                  ]
                }
              )
            ] }, tile.name);
          }) }),
          /* @__PURE__ */ jsx29(
            "rect",
            {
              x: L2,
              y: T2,
              width: plotW,
              height: plotH,
              fill: "none",
              stroke: "#0a101c",
              strokeWidth: "1"
            }
          )
        ]
      }
    ),
    caption && /* @__PURE__ */ jsx29("p", { className: "fieldmap__caption", children: caption })
  ] });
}

// app/routes/survey.ims.tsx
import { jsx as jsx30 } from "react/jsx-runtime";
var meta19 = () => [
  { title: "Intensive Monitoring Survey \xB7 7DT" },
  {
    name: "description",
    content: "The deep, nightly survey of 7DS: seven tiles at the south ecliptic pole, overlapping the SPHEREx Deep Field South."
  }
], CACHE5 = "public, max-age=900, stale-while-revalidate=86400", headers5 = () => ({ "Cache-Control": CACHE5 }), CENTER = { ra: 78.28, dec: -60.47 };
async function loader10() {
  let status = await getStatus(), field = await getTilesNear(CENTER.ra, CENTER.dec, 3.4);
  return json5(
    {
      field: field.data,
      ims: status.data.ims,
      live: status.live && field.live,
      generatedAt: status.generatedAt
    },
    { headers: { "Cache-Control": CACHE5 } }
  );
}
var num4 = (value) => value.toLocaleString("en-US"), tier = surveys_default.tiers.find((t) => t.code === "IMS"), Index19 = () => {
  let { field, ims, live, generatedAt } = useLoaderData5(), cycles = Object.values(ims.cycles_per_tile), median = [...cycles].sort((a, b) => a - b)[Math.floor(cycles.length / 2)], planned = 5 * 250;
  return /* @__PURE__ */ jsx30(
    SurveyPage,
    {
      code: "IMS",
      name: "Intensive Monitoring Survey",
      lede: "Seven tiles at the south ecliptic pole, observed every available night with the full medium-band set.",
      image: "/img/hero/status.jpg",
      heroMeta: [
        { value: num4(median), label: "Cycles, median tile", live: !0 },
        { value: "8.5", unit: "deg\xB2", label: "Survey area" },
        { value: "1", unit: "d", label: "Cadence" },
        { value: "April 2025", label: "Started" }
      ],
      tradeoff: tier.tradeoff,
      goal: tier.goal,
      rationale: tier.rationale,
      parameters: [
        ["Area", tier.area],
        ["Field", tier.region],
        ["Field center", "RA 05h13m07.4s, Dec \u221260\xB028\u203212\u2033"],
        ["Cadence", tier.cadence],
        ["Tiles", `${ims.n_tiles}`],
        ["Time budget", "20,000 minutes per year"],
        ["Cumulative depth", "23.6 mag over five years"]
      ],
      live,
      generatedAt,
      map: {
        title: "The monitored field",
        node: /* @__PURE__ */ jsx30(
          FieldMap,
          {
            tiles: field.map((tile) => {
              let cycles2 = ims.cycles_per_tile[tile.name];
              return {
                name: tile.name,
                ra: tile.ra,
                dec: tile.dec,
                value: cycles2 ?? tile.visits,
                highlight: cycles2 !== void 0
              };
            }),
            valueLabel: "cycles",
            caption: `The ${ims.n_tiles} monitored tiles, dashed, against their neighbours on the survey tiling. Shading and the figure inside each monitored tile give the observing cycles completed on it, read from the observation database.`
          }
        ),
        note: "The field covers about 8.5 square degrees near the south ecliptic pole and is drawn at its own scale, on a tangent plane, rather than on an all-sky map where it would be a few pixels across."
      },
      coverage: [
        { value: String(ims.n_tiles), label: "Tiles monitored" },
        { value: num4(median), label: "Cycles, median tile" },
        { value: num4(ims.min_cycles_per_tile), label: "Fewest cycles" },
        { value: num4(ims.max_cycles_per_tile), label: "Most cycles" }
      ],
      progress: {
        percent: Math.min(100, Math.round(median / planned * 100)),
        label: `${ims.min_cycles_per_tile}\u2013${ims.max_cycles_per_tile} observing cycles across ${ims.n_tiles} tiles`,
        note: "Progress is the median tile against a nominal five years of observable nights. Cycle counts differ between tiles because the field sets at different times through the season and because weather does not fall evenly."
      }
    }
  );
}, survey_ims_default = Index19;

// app/routes/survey.ris.tsx
var survey_ris_exports = {};
__export(survey_ris_exports, {
  default: () => survey_ris_default,
  headers: () => headers6,
  loader: () => loader11,
  meta: () => meta20
});
import { json as json6 } from "@remix-run/node";
import { useLoaderData as useLoaderData6 } from "@remix-run/react";
import { jsx as jsx31 } from "react/jsx-runtime";
var meta20 = () => [
  { title: "Reference Imaging Survey \xB7 7DT" },
  {
    name: "description",
    content: "The wide-area survey of 7DS: one medium-band visit to every tile of the southern sky, with live coverage from the observation database."
  }
], CACHE6 = "public, max-age=900, stale-while-revalidate=86400", headers6 = () => ({ "Cache-Control": CACHE6 });
async function loader11() {
  let [tiles, status] = await Promise.all([getTileMapLite(), getStatus()]);
  return json6(
    {
      tiles: tiles.data,
      ris: status.data.ris,
      live: status.live && tiles.live,
      generatedAt: status.generatedAt
    },
    { headers: { "Cache-Control": CACHE6 } }
  );
}
var num5 = (value) => value.toLocaleString("en-US"), tier2 = surveys_default.tiers.find((t) => t.code === "RIS"), Index20 = () => {
  let { tiles, ris, live, generatedAt } = useLoaderData6();
  return /* @__PURE__ */ jsx31(
    SurveyPage,
    {
      code: "RIS",
      name: "Reference Imaging Survey",
      lede: "One medium-band visit to every tile the array can reach, to give the southern sky a reference image against which anything that changes can be found.",
      image: "/img/hero/survey.jpg",
      heroMeta: [
        { value: String(ris.coverage_pct), unit: "%", label: "Tiles observed", live: !0 },
        { value: "23,000", unit: "deg\xB2", label: "Survey area" },
        { value: "Single visit", label: "Cadence" },
        { value: "July 2024", label: "Started" }
      ],
      tradeoff: tier2.tradeoff,
      goal: tier2.goal,
      rationale: tier2.rationale,
      parameters: [
        ["Area", tier2.area],
        ["Region", tier2.region],
        ["Cadence", tier2.cadence],
        ["Visit", "3 \xD7 100 s, coadded to 300 s"],
        ["Single-visit depth", "19.1 mag, 5\u03C3 in m600"],
        ["Tile range", "T00000 \u2013 T25471, plus northern extension"]
      ],
      live,
      generatedAt,
      map: {
        node: /* @__PURE__ */ jsx31(
          SkyMap,
          {
            tiles,
            interactive: !1,
            caption: `${num5(tiles.count)} tiles observed`
          }
        ),
        note: "Every tile with at least one science exposure, colored by the month it was last observed. Because RIS covers everything the array can reach, this map is also the footprint of the survey as a whole."
      },
      coverage: [
        { value: num5(ris.tiles_observed), label: "Tiles observed", note: "original grid" },
        { value: num5(ris.tiles_defined), label: "Tiles defined" },
        { value: String(ris.coverage_pct), unit: "%", label: "Complete" },
        {
          value: num5(ris.tiles_observed_extended),
          label: "Including extension",
          note: `of ${num5(ris.tiles_extended)}`
        }
      ],
      progress: {
        percent: ris.coverage_pct,
        label: `${num5(ris.tiles_observed)} of ${num5(ris.tiles_defined)} tiles observed`,
        note: "Counted over the original grid, T00000\u2013T25471. The northern extension carries the tiling to Dec +30\xB0 and is counted separately. A full cycle is anticipated by the end of 2027."
      }
    }
  );
}, survey_ris_default = Index20;

// app/routes/survey.wts.tsx
var survey_wts_exports = {};
__export(survey_wts_exports, {
  default: () => survey_wts_default,
  meta: () => meta21
});
import { jsx as jsx32, jsxs as jsxs29 } from "react/jsx-runtime";
var meta21 = () => [
  { title: "Wide-area Time-domain Survey \xB7 7DT" },
  {
    name: "description",
    content: "The time-domain survey of 7DS: 800\u20131,200 deg\xB2 revisited every 10\u201314 days over five years, in fields with existing near-infrared coverage."
  }
], tier3 = surveys_default.tiers.find((t) => t.code === "WTS"), Index21 = () => /* @__PURE__ */ jsxs29(
  SurveyPage,
  {
    code: "WTS",
    name: "Wide-area Time-domain Survey",
    lede: "A moderately wide area revisited every 10 to 14 days for five years, in fields where near-infrared data already exist.",
    image: "/img/hero/survey.jpg",
    heroMeta: [
      { value: "800\u20131,200", unit: "deg\xB2", label: "Survey area" },
      { value: "10\u201314", unit: "d", label: "Cadence" },
      { value: "90\u2013100", label: "Visits per tile" },
      { value: "2026", label: "Commencing" }
    ],
    tradeoff: tier3.tradeoff,
    goal: tier3.goal,
    rationale: tier3.rationale,
    parameters: [
      ["Area", tier3.area],
      ["Field selection", tier3.region],
      ["Cadence", tier3.cadence],
      ["Visits per tile", "90\u2013100 over five years"],
      ["Cumulative depth", "22.0\u201322.5 mag in most medium bands"],
      ["Status", tier3.statusLabel]
    ],
    live: !1,
    children: [
      /* @__PURE__ */ jsx32(Section, { eyebrow: "Status", title: "Not yet started", children: /* @__PURE__ */ jsxs29("div", { className: "panel", style: { maxWidth: "68ch" }, children: [
        /* @__PURE__ */ jsx32("div", { className: "panel__title", children: "Field selection under consideration" }),
        /* @__PURE__ */ jsxs29("p", { className: "feature-list__body", style: { marginBottom: 0 }, children: [
          "WTS is scheduled to commence in 2026. Fields are being selected to overlap existing near-infrared coverage \u2014 the VISTA Kilo-degree Infrared Galaxy survey footprint and the Vera C. Rubin Observatory Deep Drilling Fields are the leading candidates \u2014 so that 7DT medium-band photometry is complemented at wavelengths the array cannot reach. Until observations begin there is no coverage to report; tiles observed under the Reference Imaging Survey in these fields already exist and are shown on the",
          " ",
          /* @__PURE__ */ jsx32("a", { href: "/users/access", children: "data access page" }),
          "."
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs29(Section, { eyebrow: "Science", title: "What the cadence is chosen for", alt: !0, children: [
        /* @__PURE__ */ jsx32("p", { className: "prose", children: tier3.depthRange }),
        /* @__PURE__ */ jsxs29("p", { className: "prose", children: [
          "Stacking 90 to 100 visits also reaches 22.0\u201322.5 mag across most of the medium bands, deep enough for photometric redshifts on galaxies well below the single-visit limit. Forecast redshift precision for the stacked survey is given under",
          " ",
          /* @__PURE__ */ jsx32("a", { href: "/science/sci#cosmology", children: "cosmology and photometric redshifts" }),
          "."
        ] })
      ] })
    ]
  }
), survey_wts_default = Index21;

// app/routes/users.data.tsx
var users_data_exports = {};
__export(users_data_exports, {
  default: () => users_data_default,
  meta: () => meta22
});
import { Link as Link19 } from "@remix-run/react";
import { Fragment as Fragment16, jsx as jsx33, jsxs as jsxs30 } from "react/jsx-runtime";
var meta22 = () => [
  { title: "Using the data \xB7 7DT for users" },
  {
    name: "description",
    content: "Terms of use, publication policy and acknowledgment for 7DT data, and what to know before working with it."
  }
], Index22 = () => /* @__PURE__ */ jsxs30(PageLayout, { menu: "manuUsers", children: [
  /* @__PURE__ */ jsx33(
    PageHero,
    {
      eyebrow: "For users",
      title: /* @__PURE__ */ jsxs30(Fragment16, { children: [
        "Using the ",
        /* @__PURE__ */ jsx33("em", { children: "data" })
      ] }),
      lede: "Who may use 7DT data, on what terms, and what to know before working with it.",
      image: "/img/hero/data.jpg"
    }
  ),
  /* @__PURE__ */ jsx33(Section, { id: "policy", eyebrow: "Policy", title: "Data rights and publication", children: /* @__PURE__ */ jsxs30("div", { className: "split split--wide-text", children: [
    /* @__PURE__ */ jsxs30("div", { children: [
      /* @__PURE__ */ jsx33("p", { className: "prose", children: publicationPolicyText }),
      /* @__PURE__ */ jsx33("p", { className: "prose", children: "Until the policy is ratified, anyone intending to publish results based on 7DT data should contact the principal investigator in advance so that collaboration authorship and funding acknowledgments can be agreed. Observations obtained as target-of-opportunity follow-up carry the same expectation." })
    ] }),
    /* @__PURE__ */ jsxs30("div", { className: "panel", children: [
      /* @__PURE__ */ jsx33("div", { className: "panel__title", children: "Acknowledgment" }),
      /* @__PURE__ */ jsxs30("p", { className: "feature-list__body", style: { marginBottom: 0 }, children: [
        "Publications using 7DT data should acknowledge the 7-Dimensional Telescope and its funding bodies. The current wording is on the",
        " ",
        /* @__PURE__ */ jsx33(Link19, { to: "/about/funding", children: "funding page" }),
        ", and the instrument and pipeline should be cited from ",
        /* @__PURE__ */ jsx33(Link19, { to: "/publication/list", children: "publications" }),
        "."
      ] })
    ] })
  ] }) }),
  /* @__PURE__ */ jsx33(Section, { eyebrow: "Before you start", title: "Four things to know", alt: !0, children: /* @__PURE__ */ jsxs30("ul", { className: "feature-list", children: [
    /* @__PURE__ */ jsxs30("li", { children: [
      /* @__PURE__ */ jsx33("span", { className: "feature-list__key", children: "01" }),
      /* @__PURE__ */ jsxs30("div", { children: [
        /* @__PURE__ */ jsx33("h3", { className: "feature-list__title", children: "Every image carries its own quality flags" }),
        /* @__PURE__ */ jsxs30("p", { className: "feature-list__body", children: [
          "Check ",
          /* @__PURE__ */ jsx33("code", { children: "SANITY" }),
          " before using a frame: false means the pipeline judged the image unusable and recorded the stage at which it did so. Measured seeing, depth, ellipticity and astrometric precision are in the header of every product."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs30("li", { children: [
      /* @__PURE__ */ jsx33("span", { className: "feature-list__key", children: "02" }),
      /* @__PURE__ */ jsxs30("div", { children: [
        /* @__PURE__ */ jsx33("h3", { className: "feature-list__title", children: "Coadd pixels are already in flux units" }),
        /* @__PURE__ */ jsx33("p", { className: "feature-list__body", children: "Coadds are scaled to a zero point of 23.9 AB, which puts pixel values directly in microjansky \u2014 convenient for the pixel-based analysis that medium-band data invite, but a departure from the counts other archives deliver." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs30("li", { children: [
      /* @__PURE__ */ jsx33("span", { className: "feature-list__key", children: "03" }),
      /* @__PURE__ */ jsxs30("div", { children: [
        /* @__PURE__ */ jsx33("h3", { className: "feature-list__title", children: "Not every band is calibrated to the same standard" }),
        /* @__PURE__ */ jsxs30("p", { className: "feature-list__body", children: [
          "The original twenty medium bands are the calibrated set. The fifteen filters added in late 2025 are in operational use but their spectrophotometric calibration is still in preparation. Measured depths per band are on the",
          " ",
          /* @__PURE__ */ jsx33(Link19, { to: "/users/performance", children: "performance page" }),
          "."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs30("li", { children: [
      /* @__PURE__ */ jsx33("span", { className: "feature-list__key", children: "04" }),
      /* @__PURE__ */ jsxs30("div", { children: [
        /* @__PURE__ */ jsx33("h3", { className: "feature-list__title", children: "Products can be traced back to their inputs" }),
        /* @__PURE__ */ jsx33("p", { className: "feature-list__body", children: "A dependency record links each output to the coadds, processed singles and master frames it was built from, and the pipeline version that produced it is recorded with the product." })
      ] })
    ] })
  ] }) }),
  /* @__PURE__ */ jsxs30(Section, { eyebrow: "Next", title: "Where the rest is", children: [
    /* @__PURE__ */ jsx33("p", { className: "prose", children: "What the pipeline produces, in what units, with what recorded alongside it \u2014 and how to obtain it in the first place \u2014 are on the data access page. How to reprocess it yourself is under available software." }),
    /* @__PURE__ */ jsxs30("div", { className: "btn-row", style: { marginTop: "1.5rem" }, children: [
      /* @__PURE__ */ jsx33(Link19, { className: "btn btn--primary", to: "/users/access", children: "Data access and format" }),
      /* @__PURE__ */ jsx33(Link19, { className: "btn btn--secondary", to: "/users/software", children: "Software" }),
      /* @__PURE__ */ jsx33(Link19, { className: "btn btn--secondary", to: "/users/performance", children: "Measured performance" })
    ] })
  ] })
] }), users_data_default = Index22;

// app/routes/users.faq.tsx
var users_faq_exports = {};
__export(users_faq_exports, {
  default: () => users_faq_default,
  meta: () => meta23
});
import { Link as Link20 } from "@remix-run/react";

// app/components/questionform.tsx
import { useState as useState6 } from "react";
import { jsx as jsx34, jsxs as jsxs31 } from "react/jsx-runtime";
var PI_EMAIL = "mim@astro.snu.ac.kr", TOPICS = [
  "Observing with 7DT",
  "Requesting data",
  "Data format or processing",
  "Software",
  "Publication and acknowledgment",
  "Something else"
];
function QuestionForm() {
  let [name, setName] = useState6(""), [affiliation, setAffiliation] = useState6(""), [topic, setTopic] = useState6(TOPICS[0]), [question, setQuestion] = useState6(""), [handedOff, setHandedOff] = useState6(!1);
  return /* @__PURE__ */ jsxs31("form", { className: "qform", onSubmit: (event) => {
    event.preventDefault();
    let signature = [name, affiliation].filter(Boolean).join(", "), body = [
      question.trim(),
      "",
      "\u2014",
      signature ? `From: ${signature}` : null,
      "Sent from the 7DS website"
    ].filter((line) => line !== null).join(`
`), href = `mailto:${PI_EMAIL}?subject=${encodeURIComponent(
      `7DS question: ${topic}`
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href, setHandedOff(!0);
  }, children: [
    /* @__PURE__ */ jsxs31("div", { className: "qform__row", children: [
      /* @__PURE__ */ jsxs31("div", { className: "qform__field", children: [
        /* @__PURE__ */ jsx34("label", { htmlFor: "q-name", children: "Your name" }),
        /* @__PURE__ */ jsx34(
          "input",
          {
            id: "q-name",
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            autoComplete: "name",
            placeholder: "Optional"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs31("div", { className: "qform__field", children: [
        /* @__PURE__ */ jsx34("label", { htmlFor: "q-aff", children: "Affiliation" }),
        /* @__PURE__ */ jsx34(
          "input",
          {
            id: "q-aff",
            type: "text",
            value: affiliation,
            onChange: (e) => setAffiliation(e.target.value),
            autoComplete: "organization",
            placeholder: "Optional"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs31("div", { className: "qform__field", children: [
      /* @__PURE__ */ jsx34("label", { htmlFor: "q-topic", children: "Topic" }),
      /* @__PURE__ */ jsx34("select", { id: "q-topic", value: topic, onChange: (e) => setTopic(e.target.value), children: TOPICS.map((item) => /* @__PURE__ */ jsx34("option", { value: item, children: item }, item)) })
    ] }),
    /* @__PURE__ */ jsxs31("div", { className: "qform__field", children: [
      /* @__PURE__ */ jsx34("label", { htmlFor: "q-body", children: "Your question" }),
      /* @__PURE__ */ jsx34(
        "textarea",
        {
          id: "q-body",
          rows: 6,
          required: !0,
          value: question,
          onChange: (e) => setQuestion(e.target.value),
          placeholder: "If the question is about a particular field or dataset, include the position or tile identifier, the filters and the epoch range."
        }
      )
    ] }),
    /* @__PURE__ */ jsxs31("div", { className: "qform__actions", children: [
      /* @__PURE__ */ jsx34("button", { className: "btn btn--primary", type: "submit", children: "Compose the question" }),
      /* @__PURE__ */ jsx34("p", { className: "qform__note", children: "This opens the message in your own email program, addressed to the principal investigator, so you keep a copy and the reply comes to you. Nothing is sent from this page and nothing you type here is stored." })
    ] }),
    handedOff && /* @__PURE__ */ jsxs31("p", { className: "qform__sent", role: "status", children: [
      "Your email program should now be open with the message ready. If it did not open, write to ",
      /* @__PURE__ */ jsx34("a", { href: `mailto:${PI_EMAIL}`, children: PI_EMAIL }),
      " directly."
    ] })
  ] });
}

// app/routes/users.faq.tsx
import { Fragment as Fragment17, jsx as jsx35, jsxs as jsxs32 } from "react/jsx-runtime";
var meta23 = () => [
  { title: "Questions \xB7 7DT for users" },
  {
    name: "description",
    content: "Common questions about observing with 7DT and using its data: coverage, depth, filters, response time, data access and acknowledgment."
  }
], GROUPS = [
  {
    group: "Observing",
    items: [
      {
        q: "What does 7DT do that a conventional survey telescope does not?",
        a: /* @__PURE__ */ jsx35(Fragment17, { children: "It images through 35 medium-band filters rather than a handful of broad ones, so every exposure yields a low-resolution spectrum \u2014 R = 30\u201370 \u2014 for every source in a 1.25 deg\xB2 field. Classification that would otherwise need follow-up spectroscopy can be done from the imaging itself." })
      },
      {
        q: "How quickly can the array respond to an alert?",
        a: /* @__PURE__ */ jsxs32(Fragment17, { children: [
          "Under a minute from alert ingestion to the start of a follow-up exposure. The scheduler interrupts the observing plan, repoints, and returns to the queue afterwards. See",
          " ",
          /* @__PURE__ */ jsx35(Link20, { to: "/users/propose", children: "how to propose" }),
          "."
        ] })
      },
      {
        q: "Can I request observations?",
        a: /* @__PURE__ */ jsx35(Fragment17, { children: "There is no general call for proposals yet; time is allocated within the collaboration and its partner institutions. Enquiries about observations outside the survey program are handled directly by the project." })
      },
      {
        q: "What depth should I expect?",
        a: /* @__PURE__ */ jsxs32(Fragment17, { children: [
          "A single 100 s exposure reaches 19.06 mag at m400 and 19.61 mag at m475, where throughput peaks; Sloan g reaches 20.59 mag. Cumulative depths for each survey survey and the conditions these assume are on the",
          " ",
          /* @__PURE__ */ jsx35(Link20, { to: "/users/performance", children: "performance page" }),
          "."
        ] })
      }
    ]
  },
  {
    group: "Data",
    items: [
      {
        q: "How do I check whether my field has been observed?",
        a: /* @__PURE__ */ jsxs32(Fragment17, { children: [
          "Use the search on ",
          /* @__PURE__ */ jsx35(Link20, { to: "/users/access", children: "data access" }),
          ". Entering a position reports whether a tile there has data, how many nights and frames it carries, which medium bands were taken and the date range they span."
        ] })
      },
      {
        q: "Is there a public archive?",
        a: /* @__PURE__ */ jsxs32(Fragment17, { children: [
          "Not yet. A public release is being prepared alongside the completion of the Reference Imaging Survey, whose first full cycle is anticipated by the end of 2027. Until then requests are handled by the project \u2014 see ",
          /* @__PURE__ */ jsx35(Link20, { to: "/users/access", children: "data access" }),
          "."
        ] })
      },
      {
        q: "How soon after an observation are data available?",
        a: /* @__PURE__ */ jsx35(Fragment17, { children: "Normally the following day. Raw frames transfer from Chile overnight and a typical night clears the pipeline in about five hours after transfer. Target-of-opportunity data skip compression and the wait for sunrise, reducing latency to tens of minutes." })
      },
      {
        q: "Why are coadd pixel values in microjansky?",
        a: /* @__PURE__ */ jsxs32(Fragment17, { children: [
          "Coadds are flux-scaled to a zero point of 23.9 AB, which puts each pixel directly in \xB5Jy. It suits the pixel-based analysis medium-band data invite, but it differs from the counts most archives deliver \u2014 see ",
          /* @__PURE__ */ jsx35(Link20, { to: "/users/access#format", children: "using the data" }),
          "."
        ] })
      },
      {
        q: "What is a tile?",
        a: /* @__PURE__ */ jsx35(Fragment17, { children: "A fixed pointing on the survey tiling, 1.34\xB0 \xD7 0.90\xB0, numbered T00000 to T28519 by increasing declination. All three surveys and most target-of-opportunity pointings use the same tiling, so data taken at different times coadd without resampling." })
      },
      {
        q: "Are all 35 filters calibrated to the same standard?",
        a: /* @__PURE__ */ jsx35(Fragment17, { children: "No. The original twenty medium bands are the calibrated set in operational use. The fifteen installed in late 2025 are being used but their spectrophotometric calibration is still in preparation, and their central wavelengths are not on a regular grid." })
      }
    ]
  },
  {
    group: "Software and credit",
    items: [
      {
        q: "Is there software for planning observations or handling tiles?",
        a: /* @__PURE__ */ jsxs32(Fragment17, { children: [
          "Yes \u2014 ",
          /* @__PURE__ */ jsx35("code", { children: "supy" }),
          " provides target visibility, tile lookup and matching against a localization region, and filter response simulation. See",
          " ",
          /* @__PURE__ */ jsx35(Link20, { to: "/users/software", children: "available software" }),
          "."
        ] })
      },
      {
        q: "Can I reprocess raw data myself?",
        a: /* @__PURE__ */ jsx35(Fragment17, { children: "Yes. Py7DT can be run offline with custom configurations and resumed from any stage of the reduction. Images are passed as file paths with metadata in FITS headers and YAML files rather than wrapped in a bespoke data model, so products stay inspectable outside the pipeline." })
      },
      {
        q: "How should I acknowledge 7DT in a publication?",
        a: /* @__PURE__ */ jsxs32(Fragment17, { children: [
          "Contact the principal investigator before publishing so that collaboration authorship and funding acknowledgments can be agreed. Current wording is on the",
          " ",
          /* @__PURE__ */ jsx35(Link20, { to: "/about/funding", children: "funding page" }),
          ", and",
          " ",
          /* @__PURE__ */ jsx35(Link20, { to: "/users/data", children: "how to use the data" }),
          " sets out the terms."
        ] })
      }
    ]
  }
], Index23 = () => /* @__PURE__ */ jsxs32(PageLayout, { menu: "manuUsers", children: [
  /* @__PURE__ */ jsx35(
    PageHero,
    {
      eyebrow: "For users",
      title: "Questions",
      lede: "Short answers, each pointing to the page that carries the detail.",
      image: "/img/hero/data.jpg"
    }
  ),
  GROUPS.map((group, index) => /* @__PURE__ */ jsx35(Section, { eyebrow: "FAQ", title: group.group, alt: index % 2 === 1, children: /* @__PURE__ */ jsx35("div", { className: "faq", children: group.items.map((item) => /* @__PURE__ */ jsxs32("details", { className: "faq__item", children: [
    /* @__PURE__ */ jsx35("summary", { className: "faq__q", children: item.q }),
    /* @__PURE__ */ jsx35("div", { className: "faq__a", children: /* @__PURE__ */ jsx35("p", { className: "feature-list__body", style: { margin: 0 }, children: item.a }) })
  ] }, item.q)) }) }, group.group)),
  /* @__PURE__ */ jsxs32(Section, { eyebrow: "Not answered", title: "Ask a question", children: [
    /* @__PURE__ */ jsx35("p", { className: "prose", children: "Questions not covered above go to the principal investigator. If the answer would be useful to others it will be added to this page." }),
    /* @__PURE__ */ jsx35("div", { style: { marginTop: "2rem" }, children: /* @__PURE__ */ jsx35(QuestionForm, {}) }),
    /* @__PURE__ */ jsxs32("p", { className: "footnote", style: { marginTop: "1.5rem" }, children: [
      "If your question is about a data request, ",
      /* @__PURE__ */ jsx35(Link20, { to: "/users/access", children: "data access" }),
      " sets out what to include; for an observation, see",
      " ",
      /* @__PURE__ */ jsx35(Link20, { to: "/users/propose", children: "how to propose" }),
      "."
    ] })
  ] })
] }), users_faq_default = Index23;

// app/routes/gallery.tsx
var gallery_exports = {};
__export(gallery_exports, {
  default: () => gallery_default,
  meta: () => meta24
});
import { useState as useState7 } from "react";
import { Pagination as Pagination2 } from "flowbite-react";

// app/routes/content/images.json
var images_default = [
  {
    name: "The 7-Dimensional Telescope.",
    file: "Figure1_7DT.jpeg"
  },
  {
    name: "Another view of the 7-Dimensional Telescope.",
    file: "Figure2_7DT.jpg"
  },
  {
    name: "The 7-Dimensional Telescope in action at night. ",
    file: "Figure3_7DTatNight.JPG"
  },
  {
    name: "Image of the Sculptor Galaxy (NGC 253) ",
    file: "Figure4_NGC0253.jpg"
  },
  {
    name: "An image demonstrating the field of view of the 7-Dimensional Telescope. ",
    file: "Figure5_NGC253+6moon.jpg"
  },
  {
    name: "Pseudo-color composite Image of the Helix Nebula",
    file: "Figure7_Helix_Nebula_Zoomin.jpeg"
  },
  {
    name: "Pseudo-color image of the Helix Nebula from Sloan u and the m500 and m650 medium bands, mapped to blue, green and red.",
    file: "Figure8a(lowres)_u-500-650_asinh.png"
  },
  {
    name: "Pseudo-color image of the Trifid Nebula.",
    file: "Figure9(lowres)_NGC6514_RGB.jpg"
  }
];

// app/routes/gallery.tsx
import { jsx as jsx36, jsxs as jsxs33 } from "react/jsx-runtime";
var meta24 = () => [
  { title: "Gallery \xB7 7-Dimensional Telescope" },
  { name: "description", content: "Images of the 7-Dimensional Telescope and of the sky it observes." }
], PER_PAGE2 = 6, Index24 = () => {
  let [currentPage, setCurrentPage] = useState7(1), totalPages = Math.max(1, Math.ceil(images_default.length / PER_PAGE2)), page = Math.min(currentPage, totalPages), shown = images_default.slice((page - 1) * PER_PAGE2, page * PER_PAGE2);
  return /* @__PURE__ */ jsxs33(PageLayout, { menu: "manuGallery", children: [
    /* @__PURE__ */ jsx36(
      PageHero,
      {
        eyebrow: "Gallery",
        title: "Our Universe, seen in seven dimensions",
        lede: "Pictures of the array, and of what it returns.",
        image: "/img/hero/gallery.jpg"
      }
    ),
    /* @__PURE__ */ jsxs33(Section, { eyebrow: "Images", title: "Gallery", wide: !0, children: [
      /* @__PURE__ */ jsx36("div", { className: "gallery", children: /* @__PURE__ */ jsx36("ul", { children: shown.map((img) => /* @__PURE__ */ jsx36("li", { children: /* @__PURE__ */ jsxs33("a", { href: `/img/images/${img.file}`, target: "_blank", rel: "noreferrer", children: [
        /* @__PURE__ */ jsxs33("figure", { children: [
          /* @__PURE__ */ jsx36(
            "img",
            {
              src: `/img/thumbs/${img.file.replace(/\.[^.]+$/, ".jpg")}`,
              alt: img.name,
              width: 900,
              height: 675,
              loading: "lazy",
              decoding: "async"
            }
          ),
          /* @__PURE__ */ jsx36("figcaption", { children: img.name })
        ] }),
        /* @__PURE__ */ jsx36("span", { className: "sr-only", children: " (opens the full-resolution image in a new tab)" })
      ] }) }, img.file)) }) }),
      totalPages > 1 && /* @__PURE__ */ jsx36("div", { className: "pagination-wrap", children: /* @__PURE__ */ jsx36(Pagination2, { currentPage: page, totalPages, onPageChange: setCurrentPage }) })
    ] })
  ] });
}, gallery_default = Index24;

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  headers: () => headers7,
  loader: () => loader12,
  meta: () => meta25
});
import { json as json7 } from "@remix-run/node";
import { useLoaderData as useLoaderData7 } from "@remix-run/react";

// app/routes/main.tsx
import { useEffect as useEffect4, useState as useState8, useRef as useRef3, useCallback as useCallback2 } from "react";
import { Link as Link21 } from "@remix-run/react";
import { Fragment as Fragment18, jsx as jsx37, jsxs as jsxs34 } from "react/jsx-runtime";
var SECTION_IS_DARK = [!0, !1, !0, !1, !0, !1, !0], SECTION_COUNT = SECTION_IS_DARK.length, SECTION_NAMES = [
  "Introduction",
  "About 7DT",
  "Science",
  "Sky survey",
  "Telescope",
  "News",
  "Contact and partners"
];
function ScrollChrome() {
  let [current, setCurrent] = useState8(0), [showTop, setShowTop] = useState8(!1), sectionsRef = useRef3([]), wrapperRef = useRef3(null), frame = useRef3(0), scrollToSection = useCallback2((index) => {
    let target = sectionsRef.current[index];
    if (!target)
      return;
    let reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, []);
  return useEffect4(() => {
    let wrapper = document.querySelector(".fullpage-wrapper");
    if (!wrapper)
      return;
    wrapperRef.current = wrapper, sectionsRef.current = Array.from(
      wrapper.querySelectorAll(".fullpage-section")
    ), document.body.classList.add("fullpage-active"), document.documentElement.classList.add("fullpage-active"), document.documentElement.classList.add("reveal-ready");
    let progressBar = document.querySelector(".fullpage-progress"), nav = document.querySelector(".fullpage-nav"), measure = () => {
      frame.current = 0;
      let scrollTop = wrapper.scrollTop, viewport = wrapper.clientHeight, midpoint = viewport * 0.5, index = 0;
      if (sectionsRef.current.forEach((section, i) => {
        let rect = section.getBoundingClientRect();
        rect.top <= midpoint && rect.bottom > midpoint && (index = i);
      }), setCurrent(index), setShowTop(scrollTop > viewport * 0.75), progressBar) {
        let span = wrapper.scrollHeight - viewport;
        progressBar.style.width = `${span > 0 ? scrollTop / span * 100 : 0}%`;
      }
      nav && nav.classList.toggle("fullpage-nav--on-light", !SECTION_IS_DARK[index]), sectionsRef.current.forEach((section, i) => {
        section.classList.toggle("is-active", i === index), i === index && section.classList.add("has-revealed");
      });
    }, onScroll = () => {
      frame.current || (frame.current = window.requestAnimationFrame(measure));
    };
    return measure(), wrapper.addEventListener("scroll", onScroll, { passive: !0 }), window.addEventListener("resize", onScroll, { passive: !0 }), () => {
      frame.current && window.cancelAnimationFrame(frame.current), wrapper.removeEventListener("scroll", onScroll), window.removeEventListener("resize", onScroll), document.body.classList.remove("fullpage-active"), document.documentElement.classList.remove("fullpage-active"), document.documentElement.classList.remove("reveal-ready");
    };
  }, []), useEffect4(() => {
    let onKey = (e) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.target?.closest("input, textarea, select, [contenteditable]") || !["ArrowDown", "PageDown", "ArrowUp", "PageUp", "Home", "End"].includes(e.key))
        return;
      let wrapper = wrapperRef.current, section = sectionsRef.current[current];
      wrapper && section && section.getBoundingClientRect().height > wrapper.clientHeight + 2 && (e.key === "ArrowDown" || e.key === "ArrowUp") || (e.preventDefault(), e.key === "ArrowDown" || e.key === "PageDown" ? scrollToSection(Math.min(current + 1, SECTION_COUNT - 1)) : e.key === "ArrowUp" || e.key === "PageUp" ? scrollToSection(Math.max(current - 1, 0)) : e.key === "Home" ? scrollToSection(0) : scrollToSection(SECTION_COUNT - 1));
    };
    return window.addEventListener("keydown", onKey), () => window.removeEventListener("keydown", onKey);
  }, [current, scrollToSection]), /* @__PURE__ */ jsxs34(Fragment18, { children: [
    /* @__PURE__ */ jsx37("div", { className: "fullpage-progress" }),
    /* @__PURE__ */ jsx37("div", { className: "fullpage-nav", children: Array.from({ length: SECTION_COUNT }).map((_, index) => /* @__PURE__ */ jsx37(
      "button",
      {
        type: "button",
        className: `fullpage-dot${current === index ? " active" : ""}`,
        onClick: () => scrollToSection(index),
        "aria-label": SECTION_NAMES[index],
        "aria-current": current === index
      },
      index
    )) }),
    /* @__PURE__ */ jsx37(
      "button",
      {
        type: "button",
        className: `scroll-to-top${showTop ? " visible" : ""}`,
        onClick: () => scrollToSection(0),
        "aria-label": "Back to top",
        children: "\u2191"
      }
    )
  ] });
}
var MainPage = ({ tiles, tilesLive, generatedAt, telescopes, risCoverage }) => {
  let latest = news_default.news.filter((item) => item.type !== "update").slice(0, 3);
  return /* @__PURE__ */ jsxs34("div", { className: "fullpage-container", children: [
    /* @__PURE__ */ jsx37(ScrollChrome, {}),
    /* @__PURE__ */ jsxs34("div", { className: "fullpage-wrapper", children: [
      /* @__PURE__ */ jsxs34(
        "section",
        {
          className: "fullpage-section fullpage-section--dark fullpage-hero",
          style: { backgroundImage: "url('/img/hero/home.jpg')", backgroundSize: "cover", backgroundPosition: "center" },
          children: [
            /* @__PURE__ */ jsx37("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs34("div", { className: "reveal", children: [
              /* @__PURE__ */ jsx37("p", { className: "fullpage-hero__eyebrow", children: "Center for the Gravitational-wave Universe \xB7 Seoul National University" }),
              /* @__PURE__ */ jsx37("h1", { children: "7-Dimensional Sky Survey" }),
              /* @__PURE__ */ jsx37("p", { className: "fullpage-hero__lede", children: "A medium-band survey of the southern sky, measuring a low-resolution spectrum for every source it observes and repeating the measurement over time. It is carried out with the 7-Dimensional Telescope, an array of twenty 50-cm telescopes in Chile." }),
              /* @__PURE__ */ jsx37("div", { className: "dimension-row", style: { marginTop: "2rem" }, children: surveys_default.dimensions.map((dim) => /* @__PURE__ */ jsxs34("span", { className: "dimension-item", children: [
                /* @__PURE__ */ jsx37("span", { className: "dimension-item__n", children: dim.n }),
                dim.label
              ] }, dim.n)) })
            ] }) }),
            /* @__PURE__ */ jsxs34(
              "button",
              {
                type: "button",
                className: "scroll-cue",
                onClick: () => {
                  document.querySelectorAll(".fullpage-section")[1]?.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
                  });
                },
                children: [
                  /* @__PURE__ */ jsx37("span", { children: "Scroll" }),
                  /* @__PURE__ */ jsx37("span", { className: "scroll-cue__line" })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx37("section", { className: "fullpage-section", children: /* @__PURE__ */ jsx37("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs34("div", { className: "split split--wide-text split--middle reveal", children: [
        /* @__PURE__ */ jsxs34("div", { children: [
          /* @__PURE__ */ jsx37("span", { className: "eyebrow", children: "Introduction" }),
          /* @__PURE__ */ jsx37("h2", { children: "A survey that measures spectra, not colors" }),
          /* @__PURE__ */ jsx37("p", { className: "prose", children: mainText1 }),
          /* @__PURE__ */ jsx37("p", { style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsx37(Link21, { className: "link-arrow", to: "/about/intro", children: "What is 7DS" }) })
        ] }),
        /* @__PURE__ */ jsxs34("figure", { className: "figure", children: [
          /* @__PURE__ */ jsx37(
            "img",
            {
              src: "/img/NGC0253.gif",
              alt: "The Sculptor Galaxy, NGC 253, scanned through the 7DT medium-band filter set",
              width: 900,
              height: 929,
              loading: "lazy",
              decoding: "async"
            }
          ),
          /* @__PURE__ */ jsxs34("figcaption", { children: [
            /* @__PURE__ */ jsx37("b", { children: "NGC 253" }),
            " The Sculptor Galaxy seen through successive medium bands from 400 to 875 nm \u2014 each frame a different slice of the spectrum."
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx37(
        "section",
        {
          className: "fullpage-section fullpage-section--dark",
          style: { backgroundImage: "url('/img/hero/science.jpg')", backgroundSize: "cover", backgroundPosition: "center" },
          children: /* @__PURE__ */ jsx37("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs34("div", { className: "split split--middle reveal", children: [
            /* @__PURE__ */ jsxs34("div", { children: [
              /* @__PURE__ */ jsx37("span", { className: "eyebrow eyebrow--on-dark", children: "Science" }),
              /* @__PURE__ */ jsx37("h2", { children: "Broad science topics" }),
              /* @__PURE__ */ jsx37("p", { className: "prose", style: { color: "rgba(255,255,255,.78)" }, children: mainText2 }),
              /* @__PURE__ */ jsx37("ul", { className: "theme-chips", children: science_default.themes.map((theme) => /* @__PURE__ */ jsx37("li", { children: /* @__PURE__ */ jsx37(Link21, { to: `/science/sci#${theme.id}`, children: theme.title }) }, theme.id)) }),
              /* @__PURE__ */ jsx37("p", { style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsx37(Link21, { className: "link-arrow", to: "/science/overview", style: { color: "var(--accent-on-dark)" }, children: "Science program" }) })
            ] }),
            /* @__PURE__ */ jsxs34("div", { className: "stat-grid stat-grid--2x2 stat-grid--on-dark", children: [
              /* @__PURE__ */ jsxs34("div", { className: "stat", children: [
                /* @__PURE__ */ jsx37("span", { className: "stat__value", children: telescopes?.total ?? 20 }),
                /* @__PURE__ */ jsx37("span", { className: "stat__label", children: "Telescopes in the array" }),
                /* @__PURE__ */ jsx37("span", { className: "stat__note stat__note--live", children: telescopes ? `${telescopes.online} online` : "16 online" })
              ] }),
              /* @__PURE__ */ jsxs34("div", { className: "stat", children: [
                /* @__PURE__ */ jsx37("span", { className: "stat__value", children: "40" }),
                /* @__PURE__ */ jsx37("span", { className: "stat__label", children: "Medium-band filters" }),
                /* @__PURE__ */ jsx37("span", { className: "stat__note", children: "35 installed" })
              ] }),
              /* @__PURE__ */ jsxs34("div", { className: "stat", children: [
                /* @__PURE__ */ jsx37("span", { className: "stat__value", children: "30\u201370" }),
                /* @__PURE__ */ jsx37("span", { className: "stat__label", children: "Spectral resolution R" })
              ] }),
              /* @__PURE__ */ jsxs34("div", { className: "stat", children: [
                /* @__PURE__ */ jsxs34("span", { className: "stat__value", children: [
                  "1.25",
                  /* @__PURE__ */ jsx37("span", { className: "stat__unit", children: "deg\xB2" })
                ] }),
                /* @__PURE__ */ jsx37("span", { className: "stat__label", children: "Per pointing" })
              ] })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsx37("section", { className: "fullpage-section section--alt", children: /* @__PURE__ */ jsx37("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs34("div", { className: "reveal", children: [
        /* @__PURE__ */ jsx37("span", { className: "eyebrow", children: "7-Dimensional Sky Survey" }),
        /* @__PURE__ */ jsx37("h2", { children: "Three surveys over the southern sky" }),
        /* @__PURE__ */ jsx37("p", { className: "prose", style: { maxWidth: "62ch" }, children: mainText3 }),
        /* @__PURE__ */ jsxs34("div", { className: "home-survey", children: [
          /* @__PURE__ */ jsx37("div", { className: "home-survey__map", children: tiles && tiles.count > 0 ? /* @__PURE__ */ jsxs34(Fragment18, { children: [
            /* @__PURE__ */ jsx37("div", { className: "home-survey__stamp", children: /* @__PURE__ */ jsx37(LiveBadge, { live: tilesLive, updated: generatedAt }) }),
            /* @__PURE__ */ jsx37(
              SkyMap,
              {
                tiles,
                interactive: !1,
                caption: `${tiles.count.toLocaleString("en-US")} tiles observed`
              }
            ),
            /* @__PURE__ */ jsxs34("div", { className: "home-survey__meta", children: [
              /* @__PURE__ */ jsxs34("span", { className: "home-survey__count", children: [
                tiles.count.toLocaleString("en-US"),
                " tiles observed"
              ] }),
              /* @__PURE__ */ jsx37(Link21, { className: "link-arrow", to: "/users/access", children: "Explore the coverage map" })
            ] })
          ] }) : null }),
          /* @__PURE__ */ jsx37("div", { className: "home-survey__tiers", children: surveys_default.tiers.map((tier4) => /* @__PURE__ */ jsxs34(
            Link21,
            {
              className: "tier-card tier-card--link",
              to: `/survey/${tier4.code.toLowerCase()}`,
              children: [
                /* @__PURE__ */ jsx37("span", { className: "tier-card__code", children: tier4.code }),
                /* @__PURE__ */ jsx37("h3", { className: "tier-card__name", children: tier4.name }),
                /* @__PURE__ */ jsxs34("p", { className: "home-survey__spec", children: [
                  tier4.area,
                  " \xB7 ",
                  tier4.cadence
                ] }),
                /* @__PURE__ */ jsx37("span", { className: `pill pill--${tier4.status}`, children: tier4.status === "live" && risCoverage !== null && tier4.code === "RIS" ? `${risCoverage}% observed` : tier4.statusLabel })
              ]
            },
            tier4.code
          )) })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx37(
        "section",
        {
          className: "fullpage-section fullpage-section--dark",
          style: { backgroundImage: "url('/img/hero/survey.jpg')", backgroundSize: "cover", backgroundPosition: "center" },
          children: /* @__PURE__ */ jsx37("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs34("div", { className: "split split--middle reveal", children: [
            /* @__PURE__ */ jsxs34("div", { children: [
              /* @__PURE__ */ jsx37("span", { className: "eyebrow eyebrow--on-dark", children: "The facility" }),
              /* @__PURE__ */ jsx37("h2", { children: "Twenty telescopes, one system" }),
              /* @__PURE__ */ jsx37("p", { className: "prose", style: { color: "rgba(255,255,255,.78)" }, children: mainText4 }),
              /* @__PURE__ */ jsx37("p", { style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsx37(Link21, { className: "link-arrow", to: "/telescope/overview", style: { color: "var(--accent-on-dark)" }, children: "Telescope & site" }) })
            ] }),
            /* @__PURE__ */ jsxs34("ul", { className: "feature-list feature-list--on-dark", children: [
              /* @__PURE__ */ jsxs34("li", { children: [
                /* @__PURE__ */ jsx37("span", { className: "feature-list__key", children: "Hardware" }),
                /* @__PURE__ */ jsxs34("div", { children: [
                  /* @__PURE__ */ jsx37("h3", { className: "feature-list__title", children: "PlaneWave DeltaRho 500 \xD7 20" }),
                  /* @__PURE__ */ jsx37("p", { className: "feature-list__body", children: "A 508 mm corrected Cassegrain at f/3.0 on an L-500 direct-drive mount, with a Moravian C3-61000 PRO CMOS camera and a nine-slot filter wheel \u2014 1.34\xB0 \xD7 0.90\xB0 at 0.5\u2033 per pixel, 1.25 deg\xB2 per unit." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs34("li", { children: [
                /* @__PURE__ */ jsx37("span", { className: "feature-list__key", children: "Site" }),
                /* @__PURE__ */ jsxs34("div", { children: [
                  /* @__PURE__ */ jsx37("h3", { className: "feature-list__title", children: "El Sauce Observatory, Chile" }),
                  /* @__PURE__ */ jsx37("p", { className: "feature-list__body", children: "1.5\u2033 median seeing, over 300 clear nights a year, next to Rubin and Gemini-South." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs34("li", { children: [
                /* @__PURE__ */ jsx37("span", { className: "feature-list__key", children: "Operation" }),
                /* @__PURE__ */ jsxs34("div", { children: [
                  /* @__PURE__ */ jsx37("h3", { className: "feature-list__title", children: "Robotic, unattended" }),
                  /* @__PURE__ */ jsx37("p", { className: "feature-list__body", children: "RTCSpy runs the night end to end and interrupts it for an alert in under a minute." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs34("li", { children: [
                /* @__PURE__ */ jsx37("span", { className: "feature-list__key", children: "Pipeline" }),
                /* @__PURE__ */ jsxs34("div", { children: [
                  /* @__PURE__ */ jsx37("h3", { className: "feature-list__title", children: "Same-night reduction" }),
                  /* @__PURE__ */ jsx37("p", { className: "feature-list__body", children: "Py7DT clears a 3,000-image night in about five hours on 128 cores and two A100s." })
                ] })
              ] })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsx37("section", { className: "fullpage-section section--alt", children: /* @__PURE__ */ jsx37("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs34("div", { className: "reveal", children: [
        /* @__PURE__ */ jsxs34("div", { className: "section-title", children: [
          /* @__PURE__ */ jsx37("span", { className: "eyebrow", children: "Latest" }),
          /* @__PURE__ */ jsx37("h2", { children: "News & publications" })
        ] }),
        /* @__PURE__ */ jsx37("div", { className: "grid grid-cols-3", children: latest.map((item, index) => /* @__PURE__ */ jsxs34("article", { className: "card", children: [
          /* @__PURE__ */ jsx37("img", { src: `/img/news/${item.imgName}`, alt: "", loading: "lazy" }),
          /* @__PURE__ */ jsxs34("div", { className: "card-info", children: [
            /* @__PURE__ */ jsxs34("div", { className: "card-about", children: [
              /* @__PURE__ */ jsx37(
                "span",
                {
                  className: `card-tag ${item.type === "meeting" ? "tag-news" : item.type === "publication" ? "tag-publication" : item.type === "press" ? "tag-press" : "tag-update"}`,
                  children: item.type
                }
              ),
              /* @__PURE__ */ jsx37("span", { className: "card-time", children: item.date })
            ] }),
            /* @__PURE__ */ jsx37("h3", { className: "card-title", children: item.title }),
            /* @__PURE__ */ jsx37("div", { className: "card-creator", children: item.type === "meeting" ? item.place : item.type === "publication" ? item.shortAuthor : item.source })
          ] })
        ] }, index)) }),
        /* @__PURE__ */ jsxs34("div", { className: "btn-row", style: { marginTop: "2rem" }, children: [
          /* @__PURE__ */ jsx37(Link21, { className: "btn btn--secondary", to: "/news", children: "All news" }),
          /* @__PURE__ */ jsx37(Link21, { className: "btn btn--secondary", to: "/publication/list", children: "Publications" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx37("div", { className: "fullpage-section fullpage-section--footer", children: /* @__PURE__ */ jsx37(footer_default, {}) })
    ] })
  ] });
}, main_default = MainPage;

// app/routes/_index.tsx
import { jsx as jsx38, jsxs as jsxs35 } from "react/jsx-runtime";
var meta25 = () => [
  { title: "7-Dimensional Telescope" },
  {
    name: "description",
    content: "The 7-Dimensional Telescope: a twenty-unit medium-band array at El Sauce Observatory, Chile, and the 7-Dimensional Sky Survey of the southern sky."
  }
], CACHE7 = "public, max-age=1800, stale-while-revalidate=86400", headers7 = () => ({ "Cache-Control": CACHE7 });
async function loader12() {
  let [tiles, status] = await Promise.all([
    getTileMapLite().catch(() => null),
    getStatus().catch(() => null)
  ]);
  return json7(
    {
      tiles: tiles?.data ?? null,
      tilesLive: tiles?.live ?? !1,
      generatedAt: tiles?.generatedAt ?? "",
      telescopes: status?.data.telescopes ?? null,
      risCoverage: status?.data.ris.coverage_pct ?? null
    },
    { headers: { "Cache-Control": CACHE7 } }
  );
}
var Index25 = () => {
  let data = useLoaderData7();
  return /* @__PURE__ */ jsxs35("div", { className: "page", children: [
    /* @__PURE__ */ jsx38("a", { className: "skip-link", href: "#content", children: "Skip to content" }),
    /* @__PURE__ */ jsx38(navigate_default, { manu: "manuHome" }),
    /* @__PURE__ */ jsx38("main", { id: "content", style: { height: "100%" }, children: /* @__PURE__ */ jsx38(main_default, { ...data }) })
  ] });
}, index_default = Index25;

// app/routes/data.$.tsx
var data_exports = {};
__export(data_exports, {
  loader: () => loader13
});
import { redirect as redirect6 } from "@remix-run/node";
var MOVED = {
  overview: "/users/status",
  coverage: "/users/access",
  data: "/users/access",
  software: "/users/software"
};
function loader13({ params }) {
  let rest = params["*"] ?? "";
  return redirect6(MOVED[rest.split("/")[0]] ?? "/users/status", 301);
}

// app/routes/links.tsx
var links_exports = {};
__export(links_exports, {
  default: () => links_default2,
  meta: () => meta26
});

// app/routes/content/links.json
var links_default = {
  groups: [
    {
      title: "Site & host",
      items: [
        { name: "El Sauce Observatory / ObsTech", url: "https://www.obstech.cl", note: "Host of the 7DT array, R\xEDo Hurtado Valley, Chile" },
        { name: "KREONET", url: "https://www.kreonet.net", note: "Research network carrying nightly data from Chile to Seoul" },
        { name: "KISTI", url: "https://www.kisti.re.kr/eng", note: "Korea Institute of Science and Technology Information" }
      ]
    },
    {
      title: "Partner surveys & facilities",
      items: [
        { name: "SPHEREx", url: "https://spherex.caltech.edu", note: "All-sky near-infrared spectral survey; its Deep Field South overlaps the 7DS IMS field" },
        { name: "Vera C. Rubin Observatory", url: "https://rubinobservatory.org", note: "Neighbouring site; Deep Drilling Fields inform WTS field selection" },
        { name: "VISTA / VIKING survey", url: "https://www.eso.org/public/teles-instr/paranal-observatory/surveytelescopes/vista/surveys", note: "Near-infrared ancillary coverage for the time-domain survey" },
        { name: "PHANGS", url: "https://sites.google.com/view/phangs/home", note: "Nearby-galaxy sample used for 7DT science verification" },
        { name: "Gaia mission", url: "https://www.cosmos.esa.int/web/gaia", note: "DR3 astrometry and XP spectra underpin 7DT calibration" }
      ]
    },
    {
      title: "Gravitational-wave network",
      items: [
        { name: "LIGO", url: "https://www.ligo.caltech.edu", note: "Advanced Laser Interferometer Gravitational-wave Observatory" },
        { name: "Virgo", url: "https://www.virgo-gw.eu", note: "Advanced Virgo interferometer" },
        { name: "KAGRA", url: "https://gwcenter.icrr.u-tokyo.ac.jp/en", note: "Kamioka Gravitational Wave Detector" },
        { name: "GraceDB", url: "https://gracedb.ligo.org", note: "Gravitational-wave candidate event database" }
      ]
    },
    {
      title: "Instrument vendors",
      items: [
        { name: "PlaneWave Instruments", url: "https://planewave.com", note: "DeltaRho 500 optical tube assemblies and L-500 mounts" },
        { name: "Moravian Instruments", url: "https://www.gxccd.com", note: "C3-61000 PRO CMOS cameras" },
        { name: "Edmund Optics", url: "https://www.edmundoptics.com", note: "Medium-band filters" },
        { name: "Chroma Technology", url: "https://www.chroma.com", note: "Sloan broad-band filters" },
        { name: "ASCOM Alpaca", url: "https://www.ascom-alpaca.org", note: "Device control standard used by the 7DT control layer" }
      ]
    },
    {
      title: "Institutions",
      items: [
        { name: "Center for the Gravitational-wave Universe", url: "http://gwuniverse.snu.ac.kr", note: "Designs, builds and operates 7DT" },
        { name: "SNU Astronomy Program", url: "http://astro.snu.ac.kr", note: "Department of Physics and Astronomy, Seoul National University" },
        { name: "National Research Foundation of Korea", url: "https://www.nrf.re.kr/eng", note: "Principal funding agency" }
      ]
    }
  ]
};

// app/routes/links.tsx
import { jsx as jsx39, jsxs as jsxs36 } from "react/jsx-runtime";
var meta26 = () => [
  { title: "Links \xB7 7-Dimensional Telescope" },
  { name: "description", content: "Partner surveys, facilities, vendors and institutions related to 7DT." }
], Index26 = () => /* @__PURE__ */ jsxs36(PageLayout, { menu: "manuLinks", children: [
  /* @__PURE__ */ jsx39(
    PageHero,
    {
      eyebrow: "Resources",
      title: "Links",
      lede: "The surveys, facilities, networks and suppliers that 7DT depends on or works alongside.",
      image: "/img/hero/links.jpg"
    }
  ),
  links_default.groups.map((group, index) => /* @__PURE__ */ jsx39(Section, { eyebrow: String(index + 1).padStart(2, "0"), title: group.title, alt: index % 2 === 1, children: /* @__PURE__ */ jsx39("ul", { className: "feature-list", children: group.items.map((item) => /* @__PURE__ */ jsxs36("li", { children: [
    /* @__PURE__ */ jsx39("span", { className: "feature-list__key", children: "\u2197" }),
    /* @__PURE__ */ jsxs36("div", { children: [
      /* @__PURE__ */ jsx39("h3", { className: "feature-list__title", children: /* @__PURE__ */ jsx39("a", { href: item.url, target: "_blank", rel: "noreferrer", children: item.name }) }),
      /* @__PURE__ */ jsx39("p", { className: "feature-list__body", children: item.note })
    ] })
  ] }, item.name)) }) }, group.title))
] }), links_default2 = Index26;

// app/routes/news.tsx
var news_exports = {};
__export(news_exports, {
  default: () => news_default2,
  meta: () => meta27
});
import { useMemo as useMemo4, useState as useState9 } from "react";
import { Pagination as Pagination3 } from "flowbite-react";
import { jsx as jsx40, jsxs as jsxs37 } from "react/jsx-runtime";
var meta27 = () => [
  { title: "News \xB7 7-Dimensional Telescope" },
  { name: "description", content: "Updates, publications, meetings and press from the 7DT project." }
], TYPES = ["press", "publication", "meeting", "update"], PER_PAGE3 = 6, tagClass = (type) => type === "meeting" ? "tag-news" : type === "publication" ? "tag-publication" : type === "press" ? "tag-press" : "tag-update", Index27 = () => {
  let [currentPage, setCurrentPage] = useState9(1), [selected, setSelected] = useState9([...TYPES]), toggle = (type) => {
    setSelected(
      (prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    ), setCurrentPage(1);
  }, items = news_default.news, filtered = useMemo4(
    () => items.filter((item) => selected.includes(item.type)),
    [items, selected]
  ), totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE3)), page = Math.min(currentPage, totalPages), shown = filtered.slice((page - 1) * PER_PAGE3, page * PER_PAGE3);
  return /* @__PURE__ */ jsxs37(PageLayout, { menu: "manuNews", children: [
    /* @__PURE__ */ jsx40(
      PageHero,
      {
        eyebrow: "News",
        title: "Latest from 7DT",
        lede: "Survey milestones, instrument changes, publications and meetings.",
        image: "/img/hero/news.jpg"
      }
    ),
    /* @__PURE__ */ jsxs37(Section, { eyebrow: "Updates", title: "A bunch of intriguing updates", children: [
      /* @__PURE__ */ jsxs37("div", { className: "toolbar", children: [
        /* @__PURE__ */ jsxs37("div", { className: "toolbar__group", children: [
          /* @__PURE__ */ jsx40("span", { className: "toolbar__label", children: "Filter" }),
          TYPES.map((type) => /* @__PURE__ */ jsxs37("label", { className: "checkbox", htmlFor: `filter-${type}`, children: [
            /* @__PURE__ */ jsx40(
              "input",
              {
                id: `filter-${type}`,
                type: "checkbox",
                checked: selected.includes(type),
                onChange: () => toggle(type)
              }
            ),
            /* @__PURE__ */ jsx40("span", { style: { textTransform: "capitalize" }, children: type })
          ] }, type))
        ] }),
        /* @__PURE__ */ jsxs37("span", { className: "toolbar__label", role: "status", "aria-live": "polite", children: [
          filtered.length,
          " item",
          filtered.length === 1 ? "" : "s"
        ] })
      ] }),
      filtered.length === 0 && /* @__PURE__ */ jsx40("p", { className: "note", style: { padding: "2rem 0" }, children: "No items match the selected categories. Tick a category above to see updates." }),
      /* @__PURE__ */ jsx40("div", { className: "news-list", children: shown.map((item, index) => /* @__PURE__ */ jsx40("article", { className: "news", children: /* @__PURE__ */ jsxs37("div", { className: "news-content", children: [
        /* @__PURE__ */ jsx40("div", { className: "news-img-container", children: /* @__PURE__ */ jsx40("img", { src: `/img/news/${item.imgName}`, alt: "", loading: "lazy", width: 640, height: 480 }) }),
        /* @__PURE__ */ jsxs37("div", { className: "news-info", children: [
          /* @__PURE__ */ jsxs37("div", { className: "news-about", children: [
            /* @__PURE__ */ jsx40("span", { className: `news-tag ${tagClass(item.type)}`, children: item.type }),
            /* @__PURE__ */ jsx40("span", { className: "news-time", children: item.date })
          ] }),
          /* @__PURE__ */ jsx40("h2", { className: "news-title", children: item.title }),
          /* @__PURE__ */ jsx40("div", { className: "news-creator", children: item.type === "meeting" ? item.place : item.type === "publication" ? item.shortAuthor : item.source }),
          item.content && /* @__PURE__ */ jsx40("p", { className: "feature-list__body", style: { marginTop: "0.75rem", maxWidth: "64ch" }, children: item.content }),
          item.webpage && /* @__PURE__ */ jsx40(
            "a",
            {
              className: "details-button",
              href: item.webpage,
              target: item.webpage.startsWith("http") ? "_blank" : void 0,
              rel: "noreferrer",
              children: "Details \u2192"
            }
          )
        ] })
      ] }) }, `${item.title}-${index}`)) }),
      totalPages > 1 && /* @__PURE__ */ jsx40("div", { className: "pagination-wrap", children: /* @__PURE__ */ jsx40(Pagination3, { currentPage: page, totalPages, onPageChange: setCurrentPage }) })
    ] })
  ] });
}, news_default2 = Index27;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-P23GZZ35.js", imports: ["/build/_shared/chunk-ZTWSWTDU.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-AEBKYLPI.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-CVCNBYXF.js", imports: ["/build/_shared/chunk-M4HIUWHP.js", "/build/_shared/chunk-CEJZKTJ4.js", "/build/_shared/chunk-KA23V6VM.js", "/build/_shared/chunk-VAFMZNUF.js", "/build/_shared/chunk-UDVPC7JN.js", "/build/_shared/chunk-QCFZFSSR.js", "/build/_shared/chunk-2LQZOFWS.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/about.funding": { id: "routes/about.funding", parentId: "root", path: "about/funding", index: void 0, caseSensitive: void 0, module: "/build/routes/about.funding-ZCOG57LH.js", imports: ["/build/_shared/chunk-2LQZOFWS.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/about.intro": { id: "routes/about.intro", parentId: "root", path: "about/intro", index: void 0, caseSensitive: void 0, module: "/build/routes/about.intro-27W2JOBD.js", imports: ["/build/_shared/chunk-QCFZFSSR.js", "/build/_shared/chunk-2LQZOFWS.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/about.team": { id: "routes/about.team", parentId: "root", path: "about/team", index: void 0, caseSensitive: void 0, module: "/build/routes/about.team-LOAZ3X5E.js", imports: ["/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/data.$": { id: "routes/data.$", parentId: "root", path: "data/*", index: void 0, caseSensitive: void 0, module: "/build/routes/data.$-3AZXDCRW.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/gallery": { id: "routes/gallery", parentId: "root", path: "gallery", index: void 0, caseSensitive: void 0, module: "/build/routes/gallery-6JE4C6XR.js", imports: ["/build/_shared/chunk-CANRWFSK.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/links": { id: "routes/links", parentId: "root", path: "links", index: void 0, caseSensitive: void 0, module: "/build/routes/links-TM7WFXP6.js", imports: ["/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/news": { id: "routes/news", parentId: "root", path: "news", index: void 0, caseSensitive: void 0, module: "/build/routes/news-5S7FZS3Z.js", imports: ["/build/_shared/chunk-CANRWFSK.js", "/build/_shared/chunk-VAFMZNUF.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/publication.list": { id: "routes/publication.list", parentId: "root", path: "publication/list", index: void 0, caseSensitive: void 0, module: "/build/routes/publication.list-4SR3ZWNG.js", imports: ["/build/_shared/chunk-CANRWFSK.js", "/build/_shared/chunk-VAFMZNUF.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/publication.policy": { id: "routes/publication.policy", parentId: "root", path: "publication/policy", index: void 0, caseSensitive: void 0, module: "/build/routes/publication.policy-ZAKHRI4P.js", imports: ["/build/_shared/chunk-2LQZOFWS.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/science.overview": { id: "routes/science.overview", parentId: "root", path: "science/overview", index: void 0, caseSensitive: void 0, module: "/build/routes/science.overview-RN6RAEBC.js", imports: ["/build/_shared/chunk-UDVPC7JN.js", "/build/_shared/chunk-2LQZOFWS.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/science.sci": { id: "routes/science.sci", parentId: "root", path: "science/sci", index: void 0, caseSensitive: void 0, module: "/build/routes/science.sci-YGIJQDMR.js", imports: ["/build/_shared/chunk-UDVPC7JN.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.coverage": { id: "routes/survey.coverage", parentId: "root", path: "survey/coverage", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.coverage-K4PDY3QT.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.design": { id: "routes/survey.design", parentId: "root", path: "survey/design", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.design-JMRJ3FWA.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.ims": { id: "routes/survey.ims", parentId: "root", path: "survey/ims", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.ims-IRUNOONW.js", imports: ["/build/_shared/chunk-FTAXXPUR.js", "/build/_shared/chunk-CEJZKTJ4.js", "/build/_shared/chunk-KA23V6VM.js", "/build/_shared/chunk-QCFZFSSR.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.overview": { id: "routes/survey.overview", parentId: "root", path: "survey/overview", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.overview-MJMBWUA7.js", imports: ["/build/_shared/chunk-QCFZFSSR.js", "/build/_shared/chunk-2LQZOFWS.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.ris": { id: "routes/survey.ris", parentId: "root", path: "survey/ris", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.ris-AHWK6R5E.js", imports: ["/build/_shared/chunk-FTAXXPUR.js", "/build/_shared/chunk-M4HIUWHP.js", "/build/_shared/chunk-CEJZKTJ4.js", "/build/_shared/chunk-KA23V6VM.js", "/build/_shared/chunk-QCFZFSSR.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.status": { id: "routes/survey.status", parentId: "root", path: "survey/status", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.status-XAJRC3BA.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.wts": { id: "routes/survey.wts", parentId: "root", path: "survey/wts", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.wts-QXWIQWLB.js", imports: ["/build/_shared/chunk-FTAXXPUR.js", "/build/_shared/chunk-QCFZFSSR.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/telescope.computer": { id: "routes/telescope.computer", parentId: "root", path: "telescope/computer", index: void 0, caseSensitive: void 0, module: "/build/routes/telescope.computer-N5MNN2ZS.js", imports: ["/build/_shared/chunk-2LQZOFWS.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/telescope.instrument": { id: "routes/telescope.instrument", parentId: "root", path: "telescope/instrument", index: void 0, caseSensitive: void 0, module: "/build/routes/telescope.instrument-G7EIGGKF.js", imports: ["/build/_shared/chunk-2LQZOFWS.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/telescope.location": { id: "routes/telescope.location", parentId: "root", path: "telescope/location", index: void 0, caseSensitive: void 0, module: "/build/routes/telescope.location-74UWM7PW.js", imports: ["/build/_shared/chunk-2LQZOFWS.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/telescope.mode": { id: "routes/telescope.mode", parentId: "root", path: "telescope/mode", index: void 0, caseSensitive: void 0, module: "/build/routes/telescope.mode-MCZ2PIML.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/telescope.overview": { id: "routes/telescope.overview", parentId: "root", path: "telescope/overview", index: void 0, caseSensitive: void 0, module: "/build/routes/telescope.overview-6HFPS5R4.js", imports: ["/build/_shared/chunk-COPL6NCJ.js", "/build/_shared/chunk-2LQZOFWS.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.access": { id: "routes/users.access", parentId: "root", path: "users/access", index: void 0, caseSensitive: void 0, module: "/build/routes/users.access-GCMD4SIQ.js", imports: ["/build/_shared/chunk-M4HIUWHP.js", "/build/_shared/chunk-CEJZKTJ4.js", "/build/_shared/chunk-KA23V6VM.js", "/build/_shared/chunk-XOJHPTFF.js", "/build/_shared/chunk-2LQZOFWS.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.data": { id: "routes/users.data", parentId: "root", path: "users/data", index: void 0, caseSensitive: void 0, module: "/build/routes/users.data-UY2RUAK7.js", imports: ["/build/_shared/chunk-2LQZOFWS.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.faq": { id: "routes/users.faq", parentId: "root", path: "users/faq", index: void 0, caseSensitive: void 0, module: "/build/routes/users.faq-I6BYCUNY.js", imports: ["/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.format": { id: "routes/users.format", parentId: "root", path: "users/format", index: void 0, caseSensitive: void 0, module: "/build/routes/users.format-E7CQG7IZ.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.links": { id: "routes/users.links", parentId: "root", path: "users/links", index: void 0, caseSensitive: void 0, module: "/build/routes/users.links-AU3A4LEG.js", imports: ["/build/_shared/chunk-KA23V6VM.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.performance": { id: "routes/users.performance", parentId: "root", path: "users/performance", index: void 0, caseSensitive: void 0, module: "/build/routes/users.performance-N25M5SQ6.js", imports: ["/build/_shared/chunk-QCFZFSSR.js", "/build/_shared/chunk-COPL6NCJ.js", "/build/_shared/chunk-2LQZOFWS.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.propose": { id: "routes/users.propose", parentId: "root", path: "users/propose", index: void 0, caseSensitive: void 0, module: "/build/routes/users.propose-Z4DEK2G3.js", imports: ["/build/_shared/chunk-KA23V6VM.js", "/build/_shared/chunk-QCFZFSSR.js", "/build/_shared/chunk-2LQZOFWS.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.software": { id: "routes/users.software", parentId: "root", path: "users/software", index: void 0, caseSensitive: void 0, module: "/build/routes/users.software-J7BR5CN6.js", imports: ["/build/_shared/chunk-XOJHPTFF.js", "/build/_shared/chunk-2LQZOFWS.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.status": { id: "routes/users.status", parentId: "root", path: "users/status", index: void 0, caseSensitive: void 0, module: "/build/routes/users.status-TPOPGMOL.js", imports: ["/build/_shared/chunk-CEJZKTJ4.js", "/build/_shared/chunk-KA23V6VM.js", "/build/_shared/chunk-3NIHSVOT.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "e6de918c", hmr: void 0, url: "/build/manifest-E6DE918C.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/telescope.instrument": {
    id: "routes/telescope.instrument",
    parentId: "root",
    path: "telescope/instrument",
    index: void 0,
    caseSensitive: void 0,
    module: telescope_instrument_exports
  },
  "routes/publication.policy": {
    id: "routes/publication.policy",
    parentId: "root",
    path: "publication/policy",
    index: void 0,
    caseSensitive: void 0,
    module: publication_policy_exports
  },
  "routes/telescope.computer": {
    id: "routes/telescope.computer",
    parentId: "root",
    path: "telescope/computer",
    index: void 0,
    caseSensitive: void 0,
    module: telescope_computer_exports
  },
  "routes/telescope.location": {
    id: "routes/telescope.location",
    parentId: "root",
    path: "telescope/location",
    index: void 0,
    caseSensitive: void 0,
    module: telescope_location_exports
  },
  "routes/telescope.overview": {
    id: "routes/telescope.overview",
    parentId: "root",
    path: "telescope/overview",
    index: void 0,
    caseSensitive: void 0,
    module: telescope_overview_exports
  },
  "routes/users.performance": {
    id: "routes/users.performance",
    parentId: "root",
    path: "users/performance",
    index: void 0,
    caseSensitive: void 0,
    module: users_performance_exports
  },
  "routes/publication.list": {
    id: "routes/publication.list",
    parentId: "root",
    path: "publication/list",
    index: void 0,
    caseSensitive: void 0,
    module: publication_list_exports
  },
  "routes/science.overview": {
    id: "routes/science.overview",
    parentId: "root",
    path: "science/overview",
    index: void 0,
    caseSensitive: void 0,
    module: science_overview_exports
  },
  "routes/survey.coverage": {
    id: "routes/survey.coverage",
    parentId: "root",
    path: "survey/coverage",
    index: void 0,
    caseSensitive: void 0,
    module: survey_coverage_exports
  },
  "routes/survey.overview": {
    id: "routes/survey.overview",
    parentId: "root",
    path: "survey/overview",
    index: void 0,
    caseSensitive: void 0,
    module: survey_overview_exports
  },
  "routes/telescope.mode": {
    id: "routes/telescope.mode",
    parentId: "root",
    path: "telescope/mode",
    index: void 0,
    caseSensitive: void 0,
    module: telescope_mode_exports
  },
  "routes/users.software": {
    id: "routes/users.software",
    parentId: "root",
    path: "users/software",
    index: void 0,
    caseSensitive: void 0,
    module: users_software_exports
  },
  "routes/about.funding": {
    id: "routes/about.funding",
    parentId: "root",
    path: "about/funding",
    index: void 0,
    caseSensitive: void 0,
    module: about_funding_exports
  },
  "routes/survey.design": {
    id: "routes/survey.design",
    parentId: "root",
    path: "survey/design",
    index: void 0,
    caseSensitive: void 0,
    module: survey_design_exports
  },
  "routes/survey.status": {
    id: "routes/survey.status",
    parentId: "root",
    path: "survey/status",
    index: void 0,
    caseSensitive: void 0,
    module: survey_status_exports
  },
  "routes/users.propose": {
    id: "routes/users.propose",
    parentId: "root",
    path: "users/propose",
    index: void 0,
    caseSensitive: void 0,
    module: users_propose_exports
  },
  "routes/users.access": {
    id: "routes/users.access",
    parentId: "root",
    path: "users/access",
    index: void 0,
    caseSensitive: void 0,
    module: users_access_exports
  },
  "routes/users.format": {
    id: "routes/users.format",
    parentId: "root",
    path: "users/format",
    index: void 0,
    caseSensitive: void 0,
    module: users_format_exports
  },
  "routes/users.status": {
    id: "routes/users.status",
    parentId: "root",
    path: "users/status",
    index: void 0,
    caseSensitive: void 0,
    module: users_status_exports
  },
  "routes/about.intro": {
    id: "routes/about.intro",
    parentId: "root",
    path: "about/intro",
    index: void 0,
    caseSensitive: void 0,
    module: about_intro_exports
  },
  "routes/science.sci": {
    id: "routes/science.sci",
    parentId: "root",
    path: "science/sci",
    index: void 0,
    caseSensitive: void 0,
    module: science_sci_exports
  },
  "routes/users.links": {
    id: "routes/users.links",
    parentId: "root",
    path: "users/links",
    index: void 0,
    caseSensitive: void 0,
    module: users_links_exports
  },
  "routes/about.team": {
    id: "routes/about.team",
    parentId: "root",
    path: "about/team",
    index: void 0,
    caseSensitive: void 0,
    module: about_team_exports
  },
  "routes/survey.ims": {
    id: "routes/survey.ims",
    parentId: "root",
    path: "survey/ims",
    index: void 0,
    caseSensitive: void 0,
    module: survey_ims_exports
  },
  "routes/survey.ris": {
    id: "routes/survey.ris",
    parentId: "root",
    path: "survey/ris",
    index: void 0,
    caseSensitive: void 0,
    module: survey_ris_exports
  },
  "routes/survey.wts": {
    id: "routes/survey.wts",
    parentId: "root",
    path: "survey/wts",
    index: void 0,
    caseSensitive: void 0,
    module: survey_wts_exports
  },
  "routes/users.data": {
    id: "routes/users.data",
    parentId: "root",
    path: "users/data",
    index: void 0,
    caseSensitive: void 0,
    module: users_data_exports
  },
  "routes/users.faq": {
    id: "routes/users.faq",
    parentId: "root",
    path: "users/faq",
    index: void 0,
    caseSensitive: void 0,
    module: users_faq_exports
  },
  "routes/gallery": {
    id: "routes/gallery",
    parentId: "root",
    path: "gallery",
    index: void 0,
    caseSensitive: void 0,
    module: gallery_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/data.$": {
    id: "routes/data.$",
    parentId: "root",
    path: "data/*",
    index: void 0,
    caseSensitive: void 0,
    module: data_exports
  },
  "routes/links": {
    id: "routes/links",
    parentId: "root",
    path: "links",
    index: void 0,
    caseSensitive: void 0,
    module: links_exports
  },
  "routes/news": {
    id: "routes/news",
    parentId: "root",
    path: "news",
    index: void 0,
    caseSensitive: void 0,
    module: news_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
