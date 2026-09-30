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
var app_default = "/build/_assets/app-ZGOKTAR3.css";

// app/css/custom.css
var custom_default = "/build/_assets/custom-OXF6ZIIT.css";

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

// app/components/site.tsx
import React4 from "react";
import { Link as Link5 } from "@remix-run/react";

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
      { label: "Multi-messenger Astronomy", href: "/science/mma" },
      { label: "Transients", href: "/science/transients" },
      { label: "Galaxy Formation & Evolution", href: "/science/galaxies" },
      { label: "Cosmology", href: "/science/cosmology" },
      { label: "Active Galactic Nuclei", href: "/science/agn" },
      { label: "Galactic Science & Exoplanets", href: "/science/galactic" },
      { label: "Solar System Objects", href: "/science/solar" }
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
    label: "Facilities",
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
      { label: "Status", href: "/users/status" },
      { label: "Performance", href: "/users/performance" },
      { label: "Call for Proposals", href: "/users/call" },
      { label: "How to Propose", href: "/users/propose" },
      { label: "Data Format", href: "/users/format" },
      { label: "Data Access", href: "/users/access" },
      { label: "Software", href: "/users/software" },
      { label: "Useful Links", href: "/users/links" }
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

// app/components/callbanner.tsx
import { useEffect as useEffect2, useRef as useRef2 } from "react";
import { Link as Link3 } from "@remix-run/react";

// app/components/md.tsx
import { Link as Link2 } from "@remix-run/react";
import { Fragment, jsx as jsx4 } from "react/jsx-runtime";
var DOWNLOAD = /\.(docx?|pdf|xlsx?|csv|zip|fits)$/i;
function SmartLink({
  href,
  className,
  children
}) {
  return /^https?:\/\//.test(href) ? /* @__PURE__ */ jsx4("a", { className, href, target: "_blank", rel: "noreferrer", children }) : href.startsWith("/") && DOWNLOAD.test(href.split(/[?#]/)[0]) ? /* @__PURE__ */ jsx4("a", { className, href, download: !0, children }) : href.startsWith("/") ? /* @__PURE__ */ jsx4(Link2, { className, to: href, children }) : /* @__PURE__ */ jsx4("a", { className, href, children });
}
var WORD = /[A-Za-z0-9]/, asCode = (text, key) => /* @__PURE__ */ jsx4("code", { children: text }, key);
function inline(src, code = asCode) {
  let out = [], text = "", key = 0, flush = () => {
    text && out.push(text), text = "";
  }, i = 0;
  for (; i < src.length; ) {
    let c = src[i];
    if (c === "\\" && i + 1 < src.length) {
      text += src[i + 1], i += 2;
      continue;
    }
    if (c === "`") {
      let end = src.indexOf("`", i + 1);
      if (end > i) {
        flush(), out.push(code(src.slice(i + 1, end), key++)), i = end + 1;
        continue;
      }
    }
    if (c === "[") {
      let close = src.indexOf("](", i + 1), end = close > i ? src.indexOf(")", close + 2) : -1;
      if (close > i && end > close) {
        flush(), out.push(
          /* @__PURE__ */ jsx4(SmartLink, { href: src.slice(close + 2, end), children: inline(src.slice(i + 1, close), code) }, key++)
        ), i = end + 1;
        continue;
      }
    }
    if (c === "*" && src[i + 1] === "*") {
      let end = src.indexOf("**", i + 2);
      if (end > i + 2) {
        flush(), out.push(/* @__PURE__ */ jsx4("b", { children: inline(src.slice(i + 2, end), code) }, key++)), i = end + 2;
        continue;
      }
    }
    if (c === "*" && src[i + 1] !== "*" && src[i + 1] !== " ") {
      let end = src.indexOf("*", i + 1);
      if (end > i + 1 && src[end - 1] !== " ") {
        flush(), out.push(/* @__PURE__ */ jsx4("em", { children: inline(src.slice(i + 1, end), code) }, key++)), i = end + 1;
        continue;
      }
    }
    if (c === "_" && !WORD.test(src[i - 1] ?? "") && src[i + 1] && src[i + 1] !== " ") {
      let end = src.indexOf("_", i + 1);
      for (; end > 0 && WORD.test(src[end + 1] ?? ""); )
        end = src.indexOf("_", end + 1);
      if (end > i + 1 && src[end - 1] !== " ") {
        flush(), out.push(/* @__PURE__ */ jsx4("i", { children: inline(src.slice(i + 1, end), code) }, key++)), i = end + 1;
        continue;
      }
    }
    text += c, i += 1;
  }
  return flush(), out;
}
function Md({ children, code }) {
  return children ? /* @__PURE__ */ jsx4(Fragment, { children: inline(children, code) }) : null;
}
function Paras({
  children,
  className,
  style
}) {
  if (!children)
    return null;
  let list = Array.isArray(children) ? children : children.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return /* @__PURE__ */ jsx4(Fragment, { children: list.map((p, k) => /* @__PURE__ */ jsx4("p", { className, style, children: inline(p) }, k)) });
}

// app/lib/page.ts
var metaOf = (page) => [
  { title: page.meta.title },
  { name: "description", content: page.meta.description }
], fill = (text, vars, formats = {}) => text.replace(/\{([A-Za-z][\w.]*)(?:\|(\w+))?\}/g, (whole, path2, format) => {
  let value = path2.split(".").reduce((obj, key) => obj && typeof obj == "object" ? obj[key] : void 0, vars);
  if (value == null)
    return whole;
  let f = format ? formats[format] : void 0;
  return format && !f ? whole : f ? f(value) : String(value);
});
function fillAll(content, vars, formats = {}) {
  return typeof content == "string" ? fill(content, vars, formats) : Array.isArray(content) ? content.map((item) => fillAll(item, vars, formats)) : content && typeof content == "object" ? Object.fromEntries(
    Object.entries(content).map(([k, item]) => [k, fillAll(item, vars, formats)])
  ) : content;
}

// app/content/data/call.json
var call_default = {
  note: "The open call for proposals. Dates and files come from the Call for Proposals document itself. Set active to false when the deadline passes: the site-wide bar and the call page's status both follow it.",
  active: !0,
  title: "7DT / 7DS Open Time Program",
  cycle: "Call for Proposals",
  deadline: "23 October 2026",
  deadlineNote: "23:59 KST",
  observingPeriod: "1 December 2026 \u2013 31 August 2027",
  hours: "400 hours, in two pools of 200",
  issuedBy: "the 7DS Operating Committee",
  files: [
    {
      name: "Call for Proposals",
      href: "/proposal/7DT_Call_for_Proposals.docx",
      note: "Dates, eligibility, allocation, review process, data rights and authorship"
    },
    {
      name: "Phase 1 Proposal Form",
      href: "/proposal/7DT_Phase1_Proposal_Form.docx",
      note: "The form to fill in and submit"
    },
    {
      name: "Phase 1 Preparation Instructions",
      href: "/proposal/7DT_Phase1_Instructions.docx",
      note: "How to complete each item of the form"
    }
  ],
  pools: "200 hours for a PI affiliated with KASI, and 200 for a PI who is a member of the Korean Astronomical Society.",
  nextCall: "A second call, contingent on continued operational funding, is expected in summer 2027 for 1 September 2027 to 31 August 2028 \u2014 twelve months, with the same 200 + 200 hours. This call covers nine months for the same total, so scope and cadence should be planned accordingly.",
  contact: {
    name: "Dr. Ji Hoon Kim",
    email: "jhkim.astrosnu@gmail.com"
  },
  dates: [
    [
      "Call circulated via the Korean Astronomical Society",
      "by 30 September 2026"
    ],
    [
      "Phase 1 proposal deadline",
      "23 October 2026"
    ],
    [
      "Review and selection by the 7DS Operating Committee",
      "mid-November 2026"
    ],
    [
      "Phase 2 submission, for selected proposals",
      "shortly after notification; the date is announced with the results"
    ],
    [
      "Observations begin",
      "1 December 2026"
    ]
  ],
  submit: {
    method: "e-mail",
    email: "7ds.cfp@gmail.com"
  },
  banner: {
    tag: "Open call",
    text: "**{title}** \u2014 proposals for {observingPeriod} are being accepted. Deadline **{deadline}**, {deadlineNote}.",
    link: "Dates and documents"
  }
};

// app/components/callbanner.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function CallBanner() {
  let ref = useRef2(null);
  return useEffect2(() => {
    let element = ref.current;
    if (!element)
      return;
    let root = document.documentElement, publish = () => root.style.setProperty("--callbar-h", `${element.offsetHeight}px`);
    if (publish(), typeof ResizeObserver > "u")
      return window.addEventListener("resize", publish), () => {
        window.removeEventListener("resize", publish), root.style.removeProperty("--callbar-h");
      };
    let observer = new ResizeObserver(publish);
    return observer.observe(element), () => {
      observer.disconnect(), root.style.removeProperty("--callbar-h");
    };
  }, []), call_default.active ? /* @__PURE__ */ jsx5("aside", { className: "callbar", "aria-label": "Call for proposals", ref, children: /* @__PURE__ */ jsxs3("div", { className: "callbar__inner", children: [
    /* @__PURE__ */ jsx5("span", { className: "callbar__tag", children: call_default.banner.tag }),
    /* @__PURE__ */ jsx5("p", { className: "callbar__text", children: /* @__PURE__ */ jsx5(Md, { children: fill(call_default.banner.text, call_default) }) }),
    /* @__PURE__ */ jsx5(Link3, { className: "callbar__link", to: "/users/call", children: call_default.banner.link })
  ] }) }) : null;
}

// app/components/pagerail.tsx
import { useEffect as useEffect3, useRef as useRef3, useState as useState2 } from "react";

// app/content/data/calculators.json
var calculators_default = {
  note: "The 7DT observation calculators. Each is served from this site at /<slug> - the addresses the Call for Proposals and the Phase 1 Instructions publish - by nginx proxying to a Streamlit app on 127.0.0.1 (deploy/). `url` is the lyman address, used only by the bridge routes while nginx does not yet serve the new paths.",
  tools: [
    {
      slug: "visibility",
      n: "01",
      name: "Visibility",
      url: "http://lyman.snu.ac.kr:8509",
      question: "When is my target observable from El Sauce?",
      metaDescription: "Altitude, Moon and twilight over one night for a table of 7DT targets, and a month overview of observable hours.",
      path: "/visibility"
    },
    {
      slug: "exptime",
      n: "02",
      name: "Exposure calculator",
      url: "http://lyman.snu.ac.kr:8510",
      question: "How long do I need, and how deep will I get?",
      metaDescription: "Signal-to-noise for a 7DT exposure, or the exposure needed to reach a target signal-to-noise, in every filter of an observation mode.",
      path: "/exptime"
    },
    {
      slug: "overhead",
      n: "03",
      name: "Overhead calculator",
      url: "http://lyman.snu.ac.kr:8511",
      question: "What will this actually cost in clock time?",
      metaDescription: "Total wall-clock time of one 7DT observation: exposure, readout, filter changes, autofocus, slewing and dispatch.",
      path: "/overhead"
    },
    {
      slug: "tile",
      n: "04",
      name: "Tile matcher",
      url: "http://lyman.snu.ac.kr:8512",
      question: "Which survey tiles cover my target?",
      metaDescription: "Which 7DS survey tiles contain or overlap a target position, with interactive tile maps.",
      path: "/tile"
    }
  ]
};

// app/lib/calculators.ts
var tools = calculators_default.tools;

// app/components/tooldock.tsx
import { Fragment as Fragment2, jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var ICONS = {
  // a telescope on its mount, pointed at a star: can it be observed
  visibility: /* @__PURE__ */ jsxs4(Fragment2, { children: [
    /* @__PURE__ */ jsx6("path", { d: "M2.6 15.4 11.4 10.5l1.5 2.7-8.8 4.9z" }),
    /* @__PURE__ */ jsx6("path", { d: "M11.4 10.5l2-1.1 1.5 2.7-2 1.1" }),
    /* @__PURE__ */ jsx6("path", { d: "M8 15.1 5.6 21M8 15.1l2.4 5.9" }),
    /* @__PURE__ */ jsx6("path", { d: "M18.40 1.70 L19.36 4.27 L22.11 4.39 L19.96 6.11 L20.69 8.76 L18.40 7.24 L16.11 8.76 L16.84 6.11 L14.69 4.39 L17.44 4.27Z", fill: "currentColor", stroke: "none" })
  ] }),
  // a stopwatch
  exptime: /* @__PURE__ */ jsxs4(Fragment2, { children: [
    /* @__PURE__ */ jsx6("circle", { cx: "12", cy: "13.5", r: "7" }),
    /* @__PURE__ */ jsx6("path", { d: "M12 13.5V9.5" }),
    /* @__PURE__ */ jsx6("path", { d: "M10 3h4" }),
    /* @__PURE__ */ jsx6("path", { d: "M12 3v3.5" })
  ] }),
  // an hourglass: time spent around the exposure
  overhead: /* @__PURE__ */ jsxs4(Fragment2, { children: [
    /* @__PURE__ */ jsx6("path", { d: "M7 3h10M7 21h10" }),
    /* @__PURE__ */ jsx6("path", { d: "M8 3c0 5 8 5 8 9s-8 4-8 9" }),
    /* @__PURE__ */ jsx6("path", { d: "M16 3c0 5-8 5-8 9s8 4 8 9" })
  ] }),
  // the tiling grid
  tile: /* @__PURE__ */ jsxs4(Fragment2, { children: [
    /* @__PURE__ */ jsx6("rect", { x: "4", y: "4", width: "7", height: "7", rx: "1" }),
    /* @__PURE__ */ jsx6("rect", { x: "13", y: "4", width: "7", height: "7", rx: "1" }),
    /* @__PURE__ */ jsx6("rect", { x: "4", y: "13", width: "7", height: "7", rx: "1" }),
    /* @__PURE__ */ jsx6("rect", { x: "13", y: "13", width: "7", height: "7", rx: "1" })
  ] })
}, SHORT = {
  visibility: "Visibility",
  exptime: "Exp. time",
  overhead: "Overhead",
  tile: "Tiles"
};
function ToolIcons() {
  return /* @__PURE__ */ jsxs4("nav", { "aria-label": "Useful tools", children: [
    /* @__PURE__ */ jsx6("p", { className: "tooldock__title", children: "Tools" }),
    /* @__PURE__ */ jsx6("ul", { className: "tooldock__grid", children: tools.map((tool) => /* @__PURE__ */ jsx6("li", { children: /* @__PURE__ */ jsxs4(
      "a",
      {
        className: "tooldock__icon",
        href: tool.path,
        target: "_blank",
        rel: "noreferrer",
        title: tool.name,
        "aria-label": `${tool.name} (opens in a new tab)`,
        children: [
          /* @__PURE__ */ jsx6(
            "svg",
            {
              viewBox: "0 0 24 24",
              width: "22",
              height: "22",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.6",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              "aria-hidden": "true",
              children: ICONS[tool.slug]
            }
          ),
          /* @__PURE__ */ jsx6("span", { className: "tooldock__label", children: SHORT[tool.slug] ?? tool.name })
        ]
      }
    ) }, tool.slug)) })
  ] });
}

// app/components/pagerail.tsx
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var slug = (text) => text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function PageRail({ items, tools: tools2 = !1 }) {
  let ref = useRef3(null), [list, setList] = useState2(items ?? []), [active, setActive] = useState2(null);
  return useEffect3(() => {
    if (items)
      return;
    let zone = ref.current?.closest(".dockzone");
    if (!zone)
      return;
    let seen = /* @__PURE__ */ new Set(), found = [];
    zone.querySelectorAll(".section-title h2, .subsection > h3").forEach((el) => {
      let label = (el.textContent ?? "").trim();
      if (label) {
        if (!el.id) {
          let id = slug(label) || "section";
          for (; seen.has(id) || document.getElementById(id); )
            id = `${id}-x`;
          el.id = id;
        }
        seen.add(el.id), found.push({ id: el.id, label, level: el.tagName === "H2" ? 2 : 3 });
      }
    }), setList(found);
  }, [items]), useEffect3(() => {
    let targets = list.map((item) => document.getElementById(item.id)).filter((el) => Boolean(el));
    if (!targets.length || typeof IntersectionObserver > "u")
      return;
    let observer = new IntersectionObserver(
      (entries) => {
        let hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        hit && setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    return targets.forEach((el) => observer.observe(el)), () => observer.disconnect();
  }, [list]), /* @__PURE__ */ jsx7("aside", { className: "pagerail", "aria-label": "On this page", ref, children: /* @__PURE__ */ jsxs5("div", { className: "pagerail__card", children: [
    list.length > 1 && /* @__PURE__ */ jsxs5("nav", { "aria-label": "Page contents", children: [
      /* @__PURE__ */ jsx7("p", { className: "pagerail__title", children: "On this page" }),
      /* @__PURE__ */ jsx7("ol", { className: "pagerail__toc", children: list.map((item) => /* @__PURE__ */ jsx7("li", { className: `pagerail__item pagerail__item--${item.level}`, children: /* @__PURE__ */ jsx7(
        "a",
        {
          href: `#${item.id}`,
          className: active === item.id ? "is-active" : void 0,
          "aria-current": active === item.id ? "location" : void 0,
          children: item.label
        }
      ) }, item.id)) })
    ] }),
    tools2 && /* @__PURE__ */ jsx7("div", { className: "pagerail__tools", children: /* @__PURE__ */ jsx7(ToolIcons, {}) })
  ] }) });
}

// app/routes/footer.tsx
import { Link as Link4 } from "@remix-run/react";
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
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
      { label: "Reference (RIS)", href: "/survey/ris" },
      { label: "Time-domain (WTS)", href: "/survey/wts" },
      { label: "Monitoring (IMS)", href: "/survey/ims" }
    ]
  },
  {
    title: "Science",
    links: [
      { label: "Overview", href: "/science/overview" },
      { label: "Multi-messenger", href: "/science/mma" },
      { label: "Transients", href: "/science/transients" },
      { label: "Galaxy Evolution", href: "/science/galaxies" },
      { label: "Cosmology", href: "/science/cosmology" },
      { label: "Active Galactic Nuclei", href: "/science/agn" },
      { label: "Galactic & Exoplanets", href: "/science/galactic" },
      { label: "Solar System", href: "/science/solar" }
    ]
  },
  {
    title: "Facilities",
    links: [
      { label: "Overview", href: "/telescope/overview" },
      { label: "Instrument", href: "/telescope/instrument" },
      { label: "Location", href: "/telescope/location" },
      { label: "Computing", href: "/telescope/computer" }
    ]
  },
  {
    title: "For Users",
    links: [
      { label: "Status", href: "/users/status" },
      { label: "Performance", href: "/users/performance" },
      { label: "Call for Proposals", href: "/users/call" },
      { label: "How to Propose", href: "/users/propose" },
      { label: "Data Format", href: "/users/format" },
      { label: "Data Access", href: "/users/access" },
      { label: "Software", href: "/users/software" },
      { label: "Useful Links", href: "/users/links" }
    ]
  }
], FooterBar = () => /* @__PURE__ */ jsxs6("footer", { className: "site-footer", children: [
  /* @__PURE__ */ jsx8("div", { className: "site-footer__spectrum" }),
  /* @__PURE__ */ jsx8("div", { className: "site-footer__top", children: /* @__PURE__ */ jsx8("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs6("div", { className: "site-footer__grid", children: [
    /* @__PURE__ */ jsxs6("div", { className: "site-footer__contact", children: [
      /* @__PURE__ */ jsx8("h3", { className: "site-footer__heading", children: "Contact" }),
      /* @__PURE__ */ jsx8("p", { className: "site-footer__name", children: "Prof. Myungshin Im \xB7 Principal Investigator" }),
      /* @__PURE__ */ jsx8("p", { children: "Dept. of Physics & Astronomy, Seoul National University" }),
      /* @__PURE__ */ jsx8("p", { children: "1 Gwanak-ro, Gwanak-gu, Seoul 08826, Republic of Korea" }),
      /* @__PURE__ */ jsx8("p", { children: "+82-2-880-6585 / 6761" }),
      /* @__PURE__ */ jsx8("p", { style: { marginTop: "0.5rem" }, children: /* @__PURE__ */ jsx8("a", { href: "mailto:mim@astro.snu.ac.kr", children: "mim@astro.snu.ac.kr" }) })
    ] }),
    COLUMNS.map((column) => /* @__PURE__ */ jsxs6("div", { children: [
      /* @__PURE__ */ jsx8("h3", { className: "site-footer__heading", children: column.title }),
      /* @__PURE__ */ jsx8("ul", { children: column.links.map((link) => /* @__PURE__ */ jsx8("li", { children: /* @__PURE__ */ jsx8(Link4, { to: link.href, children: link.label }) }, link.label)) })
    ] }, column.title))
  ] }) }) }),
  /* @__PURE__ */ jsx8("div", { className: "site-footer__partners", children: /* @__PURE__ */ jsxs6("div", { className: "container container--wide", children: [
    /* @__PURE__ */ jsx8("h3", { className: "site-footer__heading", children: "Participating institutions" }),
    /* @__PURE__ */ jsx8("div", { className: "logo-strip", children: PARTNERS.map((partner) => /* @__PURE__ */ jsx8("div", { className: "logo-strip__item", children: /* @__PURE__ */ jsx8("img", { src: partner.src, alt: partner.alt, loading: "lazy" }) }, partner.alt)) })
  ] }) }),
  /* @__PURE__ */ jsx8("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs6("div", { className: "site-footer__bottom", children: [
    /* @__PURE__ */ jsx8("div", { className: "site-footer__copyright", children: "\xA9 2026 7-Dimensional Telescope \xB7 Center for the Gravitational-wave Universe, SNU" }),
    /* @__PURE__ */ jsxs6("div", { className: "site-footer__legal", children: [
      /* @__PURE__ */ jsx8(Link4, { to: "/publication/policy", children: "Publication Policy" }),
      /* @__PURE__ */ jsx8(Link4, { to: "/links", children: "Links" }),
      /* @__PURE__ */ jsx8("a", { href: "mailto:mim@astro.snu.ac.kr", children: "Contact" })
    ] })
  ] }) })
] }), footer_default = FooterBar;

// app/components/site.tsx
import { Fragment as Fragment3, jsx as jsx9, jsxs as jsxs7 } from "react/jsx-runtime";
function PageLayout({
  menu,
  rail,
  children
}) {
  let body = children;
  if (rail) {
    let all = React4.Children.toArray(children), heroAt = all.findIndex((c) => React4.isValidElement(c) && c.type === PageHero), hero3 = heroAt >= 0 ? all.slice(0, heroAt + 1) : [], rest = heroAt >= 0 ? all.slice(heroAt + 1) : all, opts = typeof rail == "object" ? rail : {};
    body = /* @__PURE__ */ jsxs7(Fragment3, { children: [
      hero3,
      /* @__PURE__ */ jsxs7("div", { className: "dockzone", children: [
        /* @__PURE__ */ jsx9(PageRail, { items: opts.items, tools: opts.tools }),
        rest
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs7("div", { className: "page", children: [
    /* @__PURE__ */ jsx9("a", { className: "skip-link", href: "#content", children: "Skip to content" }),
    /* @__PURE__ */ jsx9(CallBanner, {}),
    /* @__PURE__ */ jsx9(navigate_default, { manu: menu, fixed: !0 }),
    /* @__PURE__ */ jsx9("main", { id: "content", children: body }),
    /* @__PURE__ */ jsx9(footer_default, {})
  ] });
}
function PageHero({
  eyebrow,
  title,
  lede,
  image,
  meta: meta34,
  actions,
  tall
}) {
  return /* @__PURE__ */ jsxs7(
    "header",
    {
      className: `hero${tall ? " hero--tall" : ""}`,
      style: image ? { backgroundImage: `url("${image}")` } : void 0,
      children: [
        /* @__PURE__ */ jsx9("div", { className: "hero__inner", children: /* @__PURE__ */ jsxs7("div", { className: "container container--wide", children: [
          eyebrow && /* @__PURE__ */ jsx9("span", { className: "eyebrow eyebrow--on-dark", children: eyebrow }),
          /* @__PURE__ */ jsx9("h1", { className: "hero__title", children: title }),
          lede && /* @__PURE__ */ jsx9("p", { className: "hero__lede", children: lede }),
          actions && /* @__PURE__ */ jsx9("div", { className: "btn-row", children: actions }),
          meta34 && meta34.length > 0 && /* @__PURE__ */ jsx9("div", { className: "hero__meta", children: meta34.map((item) => /* @__PURE__ */ jsxs7("div", { className: "hero__meta-item", children: [
            /* @__PURE__ */ jsxs7("span", { className: "hero__meta-value", children: [
              item.value,
              item.unit && /* @__PURE__ */ jsx9("span", { className: "stat__unit", children: item.unit })
            ] }),
            /* @__PURE__ */ jsx9("span", { className: "hero__meta-label", children: item.label }),
            item.note && /* @__PURE__ */ jsx9("span", { className: `stat__note${item.live ? " stat__note--live" : ""}`, children: item.note })
          ] }, item.label)) })
        ] }) }),
        /* @__PURE__ */ jsx9("div", { className: "hero__spectrum" })
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
  return /* @__PURE__ */ jsx9("section", { className: `section${alt ? " section--alt" : ""}`, id, children: /* @__PURE__ */ jsxs7("div", { className: `container${wide ? " container--wide" : ""}`, children: [
    (eyebrow || title) && /* @__PURE__ */ jsxs7("div", { className: `section-title${center ? " section-title--center" : ""}`, children: [
      eyebrow && /* @__PURE__ */ jsx9("span", { className: "eyebrow", children: eyebrow }),
      title && /* @__PURE__ */ jsx9("h2", { children: title })
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
  return /* @__PURE__ */ jsxs7(
    "span",
    {
      className: `live-badge${live ? "" : " live-badge--stale"}${onDark ? " live-badge--on-dark" : ""}`,
      role: "status",
      children: [
        /* @__PURE__ */ jsx9("span", { className: "live-badge__dot", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs7("span", { className: "live-badge__text", children: [
          live ? "Live data" : "Stored copy",
          when && /* @__PURE__ */ jsxs7("span", { className: "live-badge__when", children: [
            " \xB7 ",
            when
          ] }),
          live && interval && /* @__PURE__ */ jsxs7("span", { className: "live-badge__when", children: [
            " \xB7 refreshed ",
            interval
          ] })
        ] })
      ]
    }
  );
}
function StatGrid({ items, onDark }) {
  return /* @__PURE__ */ jsx9("div", { className: `stat-grid${onDark ? " stat-grid--on-dark" : ""}`, children: items.map((item) => /* @__PURE__ */ jsxs7("div", { className: "stat", children: [
    /* @__PURE__ */ jsxs7("span", { className: "stat__value", children: [
      item.value,
      item.unit && /* @__PURE__ */ jsx9("span", { className: "stat__unit", children: item.unit })
    ] }),
    /* @__PURE__ */ jsx9("span", { className: "stat__label", children: item.label }),
    item.note && /* @__PURE__ */ jsx9("span", { className: `stat__note${item.live ? " stat__note--live" : ""}`, children: item.note })
  ] }, item.label)) });
}
function SpecTable({
  caption,
  groups
}) {
  return /* @__PURE__ */ jsx9("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs7("table", { className: "spec-table", children: [
    caption && /* @__PURE__ */ jsx9("caption", { children: caption }),
    /* @__PURE__ */ jsx9("tbody", { children: groups.map((group) => /* @__PURE__ */ jsxs7(React4.Fragment, { children: [
      /* @__PURE__ */ jsx9("tr", { className: "spec-group", children: /* @__PURE__ */ jsx9("th", { colSpan: 2, children: group.group }) }),
      group.rows.map((row) => /* @__PURE__ */ jsxs7("tr", { children: [
        /* @__PURE__ */ jsx9("th", { scope: "row", children: row[0] }),
        /* @__PURE__ */ jsx9("td", { children: row[1] })
      ] }, row[0]))
    ] }, group.group)) })
  ] }) });
}
function SimpleTable({
  caption,
  rows
}) {
  return /* @__PURE__ */ jsx9("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs7("table", { className: "spec-table", children: [
    caption && /* @__PURE__ */ jsx9("caption", { children: caption }),
    /* @__PURE__ */ jsx9("tbody", { children: rows.map((row) => /* @__PURE__ */ jsxs7("tr", { children: [
      /* @__PURE__ */ jsx9("th", { scope: "row", children: row[0] }),
      /* @__PURE__ */ jsx9("td", { children: row[1] })
    ] }, row[0])) })
  ] }) });
}
function Figure({
  src,
  alt,
  caption,
  label,
  style
}) {
  return /* @__PURE__ */ jsxs7("figure", { className: "figure", style, children: [
    /* @__PURE__ */ jsx9("img", { src, alt, loading: "lazy" }),
    (caption || label) && /* @__PURE__ */ jsxs7("figcaption", { children: [
      label && /* @__PURE__ */ jsx9("b", { children: label }),
      " ",
      caption
    ] })
  ] });
}
function ContentFigure({ fig, style }) {
  return /* @__PURE__ */ jsx9(
    Figure,
    {
      src: fig.src,
      alt: fig.alt,
      style,
      label: fig.label,
      caption: fig.caption ? /* @__PURE__ */ jsx9(Md, { children: fig.caption }) : void 0
    }
  );
}
function ButtonRow({ buttons, style }) {
  return /* @__PURE__ */ jsx9("div", { className: "btn-row", style, children: buttons.map((b, k) => /* @__PURE__ */ jsx9(SmartLink, { className: `btn ${k === 0 ? "btn--primary" : "btn--secondary"}`, href: b.href, children: b.label }, b.href + b.label)) });
}
function NextLinks({
  title,
  links: links3
}) {
  return /* @__PURE__ */ jsxs7("div", { children: [
    title && /* @__PURE__ */ jsx9("span", { className: "eyebrow", children: title }),
    /* @__PURE__ */ jsx9("div", { className: "chip-row", children: links3.map((link) => /* @__PURE__ */ jsx9(Link5, { className: "chip", to: link.href, children: link.label }, link.label)) })
  ] });
}

// app/content/shared.json
var shared_default = {
  filterSet: {
    body: "Every unit carries a nine-slot filter wheel. Three slots in each wheel hold Sloan g, r and i; one unit adds u and three units add z. The remaining slots hold medium-band filters, distributed across the array so that the full set is covered in a small number of exposures. The original twenty medium bands are spaced regularly at 25 nm from 400 to 875 nm with 25 nm FWHM. Fifteen more, procured from Edmund Optics and installed in late 2025, fill the gaps between them with central wavelengths from 412 to 832 nm and bandwidths of 14 to 41 nm. The current suite of 35 filters covers 375 to 875 nm, advancing toward the designed complement of 40 medium bands at 12.5 nm spacing.",
    caveat: "The additional fifteen filters depart from the regularity of the original set: their central wavelengths are not precisely aligned to the 12.5 nm grid, their bandwidths vary, and no filter between 700 and 800 nm is included in the second batch. These departures reflect availability and will be addressed as the remaining five filters become available. Their spectrophotometric calibration is in preparation; the original twenty remain the calibrated set in operational use."
  },
  surveyPage: {
    eyebrow: "Survey \xB7 {code}",
    strategy: {
      eyebrow: "Strategy",
      title: "What this survey is for",
      trade: "Trade",
      parameters: "Design parameters"
    },
    map: {
      eyebrow: "Map",
      title: "Where it has observed",
      updated: "daily",
      footnote: "The whole survey footprint, with per-tile detail under the pointer and a search by position, is on the [data access page](/users/access)."
    },
    coverage: {
      eyebrow: "Coverage",
      title: "What has been observed so far",
      updated: "every 30 minutes",
      status: "Status",
      meter: "{code} progress: {percent} percent"
    },
    related: {
      eyebrow: "Elsewhere",
      title: "Related pages",
      links: [
        {
          label: "All three surveys",
          href: "/survey/overview"
        },
        {
          label: "Sky coverage and search",
          href: "/users/access"
        },
        {
          label: "Array operations",
          href: "/users/status"
        },
        {
          label: "Measured performance",
          href: "/users/performance"
        }
      ]
    }
  }
};

// app/content/pages/telescope/instrument.json
var instrument_default = {
  meta: {
    title: "Instrument \xB7 7-Dimensional Telescope",
    description: "Optics, mount, camera and the 35-filter medium-band set of the 7-Dimensional Telescope."
  },
  hero: {
    eyebrow: "Facilities",
    title: "Instrument *specification*",
    lede: "All twenty units are identical in optics, mount and camera. They differ only in the filters they carry, which is what allows the array to cover the full medium-band set in a few exposures.",
    image: "/img/hero/instrument.jpg"
  },
  optics: {
    eyebrow: "01",
    title: "Optical tube assembly",
    body: "Each unit is a PlaneWave DeltaRho 500, a corrected Cassegrain of 508 mm aperture with a focal length of 1,537 mm and a focal ratio of f/3.0. The design delivers a 70 mm image circle covering approximately 2.6 degrees - fast optics over a field far wider than a conventional research telescope of the same aperture. Optomechanical alignment of all sixteen operational units is complete, and image quality is monitored continuously through routine survey operations rather than in scheduled campaigns.",
    table: {
      caption: "DeltaRho 500",
      rows: [
        [
          "Model",
          "PlaneWave DeltaRho 500"
        ],
        [
          "Design",
          "Corrected Cassegrain"
        ],
        [
          "Primary diameter",
          "50.8 cm"
        ],
        [
          "Focal length",
          "1537 mm"
        ],
        [
          "Focal ratio",
          "f/3.0"
        ],
        [
          "Image circle",
          "70 mm (\u2248 2.6\xB0)"
        ]
      ]
    }
  },
  mount: {
    eyebrow: "02",
    title: "Mount",
    body: "The DeltaRho 500 rides on a PlaneWave L-500 mount operated in equatorial configuration. Its direct-drive motors reach a slew rate of 20 degrees per second and sustain unguided tracking longer than the 100-second exposure used for survey work. Polar alignment is maintained through pointing models built by PWI4 from 40 to 50 sky points, and pointing and tracking accuracies are monitored continuously, with models refreshed when required.",
    table: {
      caption: "L-500 mount",
      rows: [
        [
          "Model",
          "PlaneWave L-500"
        ],
        [
          "Drive",
          "Direct drive, equatorial"
        ],
        [
          "Slew rate",
          "20 deg s\u207B\xB9"
        ],
        [
          "Unguided tracking",
          "> 100 s"
        ],
        [
          "Pointing model",
          "PWI4, 40\u201350 sky points"
        ]
      ]
    }
  },
  camera: {
    eyebrow: "03",
    title: "Camera",
    body: "Each unit carries a Moravian Instruments C3-61000 PRO. Its back-illuminated SONY IMX455 CMOS sensor measures 36 by 24 mm with 9,576 by 6,388 pixels of 3.76 micron pitch. At the DeltaRho focal plane this gives a field of view of 1.34 by 0.90 degrees at a pixel scale of 0.5 arcseconds - about 1.25 square degrees of spectral mapping per pointing. Bias levels are consistent with the manufacturer specification of roughly 3.5 electrons RMS, and the horizontal pattern characteristic of CMOS detectors is present but stable.",
    table: {
      caption: "C3-61000 PRO",
      rows: [
        [
          "Model",
          "Moravian C3-61000 PRO"
        ],
        [
          "Sensor",
          "SONY IMX455 back-illuminated CMOS"
        ],
        [
          "Sensor size",
          "36 \xD7 24 mm"
        ],
        [
          "Dimension",
          "9576 \xD7 6388 pixels"
        ],
        [
          "Pixel size",
          "3.76 \xB5m"
        ],
        [
          "Pixel scale",
          "0.5 arcsec"
        ],
        [
          "Field of view",
          "1.34\xB0 \xD7 0.90\xB0"
        ],
        [
          "Operating temperature",
          "\u221210 \xB0C"
        ]
      ]
    }
  },
  filters: {
    eyebrow: "04",
    title: "Filters",
    table: {
      caption: "Filter complement",
      rows: [
        [
          "Filter wheel",
          "9 slots per unit"
        ],
        [
          "Sloan g, r, i",
          "Every unit"
        ],
        [
          "Sloan u",
          "1 unit"
        ],
        [
          "Sloan z",
          "3 units"
        ],
        [
          "Medium bands installed",
          "35 of 40 planned"
        ],
        [
          "Wavelength coverage",
          "375\u2013875 nm"
        ],
        [
          "FWHM",
          "14\u201341 nm (typ. 25\u201330)"
        ],
        [
          "Manufacturers",
          "Chroma (broad), Edmund Optics (medium)"
        ]
      ]
    },
    note: "Filters are designated by central wavelength in nanometers \u2014 m400 is the band centered at 400 nm. System response curves, which fold in detector quantum efficiency, sky transmission and telescope optics, are shown under [status and overview](/users/status); photometric calibration and its accuracy are reported on the [performance page](/users/performance)."
  },
  onSky: {
    eyebrow: "On sky",
    title: "What the filter set looks like",
    figures: [
      {
        src: "/img/NGC7293.gif",
        alt: "The Helix Nebula through successive 7DT medium bands",
        label: "NGC 7293",
        caption: "The Helix Nebula, band by band across the medium-band set."
      },
      {
        src: "/img/NGC0253.gif",
        alt: "The Sculptor Galaxy through successive 7DT medium bands",
        label: "NGC 253",
        caption: "The Sculptor Galaxy, band by band across the medium-band set."
      }
    ]
  }
};

// app/routes/telescope.instrument.tsx
import { jsx as jsx10, jsxs as jsxs8 } from "react/jsx-runtime";
var meta = () => metaOf(instrument_default), Index = () => {
  let { hero: hero3, optics, mount, camera, filters, onSky } = instrument_default, parts = [
    [optics, !1],
    [mount, !0],
    [camera, !1]
  ];
  return /* @__PURE__ */ jsxs8(PageLayout, { menu: "manu7dt", rail: !0, children: [
    /* @__PURE__ */ jsx10(
      PageHero,
      {
        eyebrow: hero3.eyebrow,
        title: /* @__PURE__ */ jsx10(Md, { children: hero3.title }),
        lede: hero3.lede,
        image: hero3.image
      }
    ),
    parts.map(([part, alt]) => /* @__PURE__ */ jsx10(Section, { eyebrow: part.eyebrow, title: part.title, alt, children: /* @__PURE__ */ jsxs8("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsx10("p", { className: "prose", children: /* @__PURE__ */ jsx10(Md, { children: part.body }) }),
      /* @__PURE__ */ jsx10(SimpleTable, { caption: part.table.caption, rows: part.table.rows })
    ] }) }, part.eyebrow)),
    /* @__PURE__ */ jsxs8(Section, { eyebrow: filters.eyebrow, title: filters.title, alt: !0, children: [
      /* @__PURE__ */ jsxs8("div", { className: "split split--wide-text", children: [
        /* @__PURE__ */ jsxs8("div", { children: [
          /* @__PURE__ */ jsx10("p", { className: "prose", children: /* @__PURE__ */ jsx10(Md, { children: shared_default.filterSet.body }) }),
          /* @__PURE__ */ jsx10("p", { className: "prose", children: /* @__PURE__ */ jsx10(Md, { children: shared_default.filterSet.caveat }) })
        ] }),
        /* @__PURE__ */ jsx10(SimpleTable, { caption: filters.table.caption, rows: filters.table.rows })
      ] }),
      /* @__PURE__ */ jsx10("p", { className: "note", style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsx10(Md, { children: filters.note }) })
    ] }),
    /* @__PURE__ */ jsx10(Section, { eyebrow: onSky.eyebrow, title: onSky.title, children: /* @__PURE__ */ jsx10("div", { className: "split", children: onSky.figures.map((fig) => /* @__PURE__ */ jsx10(ContentFigure, { fig }, fig.src)) }) })
  ] });
}, telescope_instrument_default = Index;

// app/routes/publication.policy.tsx
var publication_policy_exports = {};
__export(publication_policy_exports, {
  default: () => publication_policy_default,
  meta: () => meta2
});

// app/content/pages/publication/policy.json
var policy_default = {
  meta: {
    title: "Publication policy \xB7 7-Dimensional Telescope",
    description: "Authorship, data rights and acknowledgment for work using 7DT data."
  },
  hero: {
    eyebrow: "Publications",
    title: "Publication policy",
    lede: "How authorship, data rights and acknowledgment are handled for work based on 7DT observations.",
    image: "/img/hero/policy.jpg"
  },
  status: {
    eyebrow: "Status",
    title: "In preparation",
    body: "The 7DS publication policy governs authorship, data rights and the acknowledgment of 7DT observations in refereed work. It is being prepared by the collaboration and will be posted here once ratified. In the meantime, anyone intending to publish results based on 7DT data is asked to contact the principal investigator so that the appropriate collaboration authors and funding acknowledgments can be agreed in advance.",
    meantime: {
      title: "In the meantime",
      items: [
        "Contact the principal investigator at [mim@astro.snu.ac.kr](mailto:mim@astro.snu.ac.kr) before submitting.",
        "Acknowledge the Center for the Gravitational-wave Universe at Seoul National University and the funding bodies set out on the [funding](/about/funding) page.",
        "Cite the instrument and pipeline papers listed under [publications](/publication/list)."
      ]
    }
  }
};

// app/routes/publication.policy.tsx
import { jsx as jsx11, jsxs as jsxs9 } from "react/jsx-runtime";
var meta2 = () => metaOf(policy_default), Index2 = () => {
  let { hero: hero3, status } = policy_default;
  return /* @__PURE__ */ jsxs9(PageLayout, { menu: "manuPaper", children: [
    /* @__PURE__ */ jsx11(PageHero, { eyebrow: hero3.eyebrow, title: hero3.title, lede: hero3.lede, image: hero3.image }),
    /* @__PURE__ */ jsxs9(Section, { eyebrow: status.eyebrow, title: status.title, children: [
      /* @__PURE__ */ jsx11("p", { className: "prose", children: /* @__PURE__ */ jsx11(Md, { children: status.body }) }),
      /* @__PURE__ */ jsxs9("div", { className: "panel", style: { marginTop: "2rem", maxWidth: "68ch" }, children: [
        /* @__PURE__ */ jsx11("div", { className: "panel__title", children: status.meantime.title }),
        /* @__PURE__ */ jsx11("ul", { className: "prose", style: { paddingLeft: "1.25rem", margin: 0 }, children: status.meantime.items.map((item) => /* @__PURE__ */ jsx11("li", { children: /* @__PURE__ */ jsx11(Md, { children: item }) }, item)) })
      ] })
    ] })
  ] });
}, publication_policy_default = Index2;

// app/routes/science.transients.tsx
var science_transients_exports = {};
__export(science_transients_exports, {
  default: () => science_transients_default,
  meta: () => meta3
});

// app/components/sciencetopic.tsx
import { Link as Link6 } from "@remix-run/react";

// app/content/data/science.json
var science_default = {
  note: "Science themes of 7DS. Sources: Kim et al., Proc. SPIE 14147-84, Sec. 3.4, and the 7DS science program targets. Published results are listed on the publications page rather than duplicated here. Figures are 7DT observations and 7DS simulations produced by the team; no third-party figures are reproduced.",
  themes: [
    {
      id: "mma",
      n: "01",
      title: "Multi-messenger Astronomy",
      image: "/img/hero/sci.jpg",
      metaDescription: "Why GW170817 is still the only gravitational-wave event with an identified kilonova, and how 7DS is built to change that.",
      question: "Where do gravitational-wave events happen?",
      summary: "The application 7DT was designed for. A kilonova peaks near absolute magnitude \u221215 to \u221217 and fades by roughly half a magnitude per day, within a gravitational-wave localization of hundreds to thousands of square degrees; a single 100 deg\xB2 region is expected to contain of order a hundred unrelated transients over a seven-day window. 7DT addresses this with wide-field tiling, sub-minute response to an alert, and sufficient spectral information in one visit to reject contaminants without follow-up spectroscopy.",
      detail: [
        "GW170817 remains the only gravitational-wave event whose kilonova was identified, and the reasons are structural rather than accidental. Localizations span hundreds to thousands of square degrees. The kilonova itself is faint and fades within about a day. And searching an area that large turns up thousands to tens of thousands of unrelated transients and artifacts, any of which can pass for the real thing in broadband imaging.",
        "The conventional response is a sequence: localize, image wide, build a candidate list, then chase candidates with spectroscopy on a larger telescope. The spectroscopy is the bottleneck, and it arrives after the source has faded. 7DT collapses the sequence by imaging and spectrally sampling at the same time, so every candidate arrives already carrying the information needed to keep or reject it."
      ],
      goals: [
        "Optical counterparts for gravitational-wave events, with the statistical properties of their host galaxies",
        "About ten kilonova-bearing events \u2014 enough to decide the Hubble tension by standard-siren distances"
      ],
      figure: {
        src: "/img/science/kilonova-vs-supernova.jpg",
        alt: "Simulated spectra of a kilonova at 0.5 days and a Type Ia supernova at 35 days, sampled by 7DT medium bands and by broadband filters",
        label: "Why medium bands settle it",
        caption: "A kilonova at 0.5 days (orange) and a Type Ia supernova at 35 days (gray) have nearly the same broadband colors \u2014 the three red points cannot separate them. The 7DT medium bands (blue) trace the continuum shape closely enough that the two are no longer confusable. Simulation by the 7DS team."
      }
    },
    {
      id: "transients",
      n: "02",
      title: "Transients",
      image: "/img/hero/science.jpg",
      metaDescription: "Catching the first hours of a stellar explosion with spectral information already in the discovery data.",
      question: "What happens in the first hours of an explosion?",
      summary: "Medium-band spectral sampling gives direct color and continuum information for a transient from one epoch of imaging. A hybrid classification framework built on 7DT spectral energy distributions \u2014 an unsupervised anomaly detector coupled to a supervised multiclass classifier \u2014 reaches macro F1 \u2248 0.80 across eight common transient types and recovers more than 90 percent of optically detectable kilonovae, including AT2017gfo, without ever being trained on one.",
      detail: [
        "The earliest hours of a supernova carry the imprint of what the star was before it exploded \u2014 the size of a companion, the extent of circumstellar material, the structure of the outer envelope. That information is gone within days, which is why so few explosions have been caught with spectral coverage early enough to use it.",
        "A survey that samples the spectrum at every visit does not need to decide in advance which transients deserve follow-up. The spectral information is already in the discovery data."
      ],
      goals: [
        "Early-time spectral coverage for more than a hundred supernovae, to constrain explosion mechanisms and progenitor systems"
      ]
    },
    {
      id: "galaxies",
      n: "03",
      title: "Galaxy Formation & Evolution",
      image: "/img/images/Figure4_NGC0253.jpg",
      metaDescription: "Resolved stellar populations and emission-line maps at survey scale, and the galaxies hidden behind the plane of the Milky Way.",
      question: "How do galaxies build themselves, and where are the ones we have never seen?",
      summary: "Medium-band mapping over 1.25 square degrees is IFU-like data at survey scale. Star-forming clumps are identified through H\u03B1 emission in stellar-continuum-subtracted images, and pilot studies indicate that pixel-based SED fitting of 7DT and SPHEREx data can recover spatially resolved stellar populations approaching the quality of high-resolution IFU spectroscopy \u2014 for galaxies that would otherwise demand dedicated campaigns on much larger telescopes. Both studies are as yet unpublished (Shim et al., submitted; Lee et al., in prep).",
      detail: [
        "Every pixel of a 7DT image carries a low-resolution spectrum, which makes a nearby galaxy an integral-field observation rather than a photometric one. Emission lines can be isolated from the stellar continuum band by band, and the stellar populations behind that continuum can be fitted pixel by pixel \u2014 age and metallicity as maps rather than as single numbers per galaxy.",
        "At the other end of the scale, the same data address a gap in every existing redshift map. Behind the plane of the Milky Way, crowding and dust have left a zone of avoidance where few galaxies are cataloged at all. Because 7DS measures a spectrum for every source rather than a color for every source, galaxies and quasars can be picked out of those crowded fields."
      ],
      goals: [
        "50 million galaxy spectra, forming a southern-sky catalog",
        "2 million galaxies with spatially resolved spectra",
        "5 million galaxies and 20,000 quasars recovered in the zone of avoidance",
        "More than 100,000 clusters and superclusters mapped out to redshift 1"
      ],
      figure: {
        src: "/img/science/ngc253-halpha.jpg",
        alt: "NGC 253 in the 7DT m625, m650 and m675 medium bands, and the resulting continuum-subtracted H-alpha plus [N II] emission map",
        label: "Emission lines, separated band by band",
        caption: "NGC 253 in three adjacent 7DT medium bands. Because the bands on either side measure the stellar continuum, the H\u03B1 + [N II] emission can be isolated directly from imaging (right panel). 7DT observation."
      },
      figure2: {
        src: "/img/science/ngc253-populations.jpg",
        alt: "Maps of stellar age and stellar metallicity across NGC 253 derived from pixel-by-pixel SED fitting of 7DT medium-band data",
        label: "Stellar populations, pixel by pixel",
        caption: "Stellar age and metallicity across NGC 253, fitted from the 7DT medium-band spectral energy distribution of each pixel \u2014 the kind of map that otherwise requires an integral-field spectrograph on a much larger telescope. The program targets this measurement for 2 million galaxies."
      }
    },
    {
      id: "cosmology",
      n: "04",
      title: "Cosmology & Photometric Redshifts",
      image: "/img/hero/science.jpg",
      metaDescription: "Standard sirens, photometric redshifts and the disagreement between the two measurements of the expansion of the universe.",
      question: "What is the universe made of, and why do the two measurements of its expansion disagree?",
      summary: "At R = 30\u201370 across 0.4\u20130.9 \xB5m, 7DT straddles the boundary between broadband photometry and low-resolution spectroscopy, capturing the 4000 \xC5 break and prominent emission lines at a resolution that lifts much of the color\u2013redshift degeneracy inherent to broadband surveys. Forecasts give \u03C3_NMAD = 0.003\u20130.007 at 19 < m625 < 22 for the five-year stacked WTS, with strong gains when combined with SPHEREx all-sky data.",
      detail: [
        "The Hubble constant measured from the local distance ladder and the value inferred from the cosmic microwave background disagree by more than their stated uncertainties. Gravitational-wave events with identified optical counterparts offer a third route that shares no calibration with either, which is why the counterpart searches under theme 01 are also a cosmology program.",
        "Redshifts are the other half. A photometric redshift is only as good as the spectral features the filter set can resolve, and medium bands resolve the 4000 \xC5 break and the brighter emission lines that broadband surveys blur together."
      ],
      goals: [
        "Cosmological parameters from several independent methods, including standard sirens",
        "Photometric redshifts precise enough to map large-scale structure out to redshift 1"
      ]
    },
    {
      id: "agn",
      n: "05",
      title: "Active Galactic Nuclei",
      image: "/img/hero/sci.jpg",
      metaDescription: "Reverberation mapping turned into a survey measurement: direct black hole masses for thousands of active galactic nuclei.",
      question: "How did supermassive black holes grow so large so early?",
      summary: "Repeated medium-band visits measure how an AGN spectrum changes, not only how its brightness does. The 10\u201314 day cadence of WTS over five years is suited to reverberation mapping through long-term spectral variability, while the nightly cadence of IMS reaches variability on timescales of a single night.",
      detail: [
        "Black hole masses at high redshift are mostly inferred indirectly, through scaling relations calibrated on nearby objects. Measuring one directly means watching the broad emission lines respond to a change in the continuum, and timing the delay \u2014 reverberation mapping, which has always required repeated spectroscopy on a single object at a time.",
        "Medium bands turn that into a survey measurement. A filter set that separates the emission lines from the continuum tracks both light curves at once, for every AGN in the field, at whatever cadence the survey runs. The delay also scales with luminosity, which makes it a candidate distance indicator and ties this theme back to cosmology.",
        "The same data are sensitive to AGN that change type between epochs, to stars disrupted by the black holes they fall into, and to the periodic variability expected of binary black holes."
      ],
      goals: [
        "Time-series spectra for more than 50,000 active galactic nuclei",
        "Direct mass measurements for more than 5,000 supermassive black holes",
        "More than 20,000 quasars found at low Galactic latitude, where broadband surveys struggle"
      ],
      figure: {
        src: "/img/science/agn-medium-band.jpg",
        alt: "Simulated 7DS medium-band and LSST broadband sampling of a type-1 AGN spectrum at redshift 0.8",
        label: "Lines separated from continuum",
        caption: "A type-1 AGN at redshift 0.8. The 7DS medium bands (red) follow the broad emission lines and the continuum between them separately; the four broadband points (blue) average across both. Simulation by the 7DS team over an SDSS spectrum."
      }
    },
    {
      id: "galactic",
      n: "06",
      title: "Galactic Science & Exoplanets",
      image: "/img/images/Figure9(lowres)_NGC6514_RGB.jpg",
      metaDescription: "A spectrum for every star and every pixel of diffuse structure in the Galactic plane, and transmission spectra for transiting planets.",
      question: "What is our Galaxy made of, and what is in the atmospheres of its planets?",
      summary: "Two-epoch 7DT photometry with sixteen medium bands across 400\u2013825 nm identified 110 variable young stellar objects in the central region of Orion A \u2014 14 percent of 769 candidates \u2014 including seven varying by more than 0.5 mag. The wavelength dependence of the variability distinguishes extinction-like, gray and spot-like mechanisms on day timescales, which otherwise requires rapid filter cycling or simultaneous multi-band instrumentation. The same combination of cadence and spectral sampling applies to transiting exoplanets: a transit observed in many bands at once measures its depth as a function of wavelength, which separates a genuine planetary signal from a blended eclipsing binary and constrains stellar activity that would otherwise bias the derived planet radius.",
      detail: [
        "Surveys of the Galactic plane usually trade one thing for another: either many stars measured crudely, or few stars measured well. Sampling the spectrum of every pixel removes the trade \u2014 stars, H II regions and planetary nebulae in the same field are all measured the same way, and diffuse structure gets a spectrum per pixel rather than a single integrated color.",
        "Transiting planets benefit from the same property for a different reason. Measuring a transit simultaneously in every band gives the transit depth as a function of wavelength in one visit, from a single telescope, without the systematic errors that come from stitching together transits observed on different nights."
      ],
      goals: [
        "Spectra for roughly 100 million stars, constraining the origin of the Milky Way's stellar populations",
        "Transmission spectra for transiting exoplanets, measured in all bands within a single transit"
      ],
      figure: {
        src: "/img/science/exoplanet-wasp74b.jpg",
        alt: "7DT transit light curves of WASP-74b in seventeen medium bands from 400 to 850 nm, and the resulting transmission spectrum compared with published measurements",
        label: "One transit, seventeen wavelengths",
        caption: "The transit of the hot Jupiter WASP-74b recorded simultaneously in seventeen 7DT medium bands (left), and the transmission spectrum that follows from it (right, black), against published measurements of the same planet. A single visit from 0.5 m telescopes reaches comparable precision. 7DT observation; analysis in preparation (Bae et al.)."
      }
    },
    {
      id: "solar",
      n: "07",
      title: "Solar System Objects",
      image: "/img/hero/sci.jpg",
      metaDescription: "Reflectance spectra for a hundred thousand solar system objects, resolving the 0.7 micron hydration feature broadband filters miss.",
      question: "What were the building blocks of the Solar System made of?",
      summary: "Medium-band imaging of the main-belt asteroids 13 Egeria and 10 Hygiea targets the 0.7 \xB5m absorption feature characteristic of Ch-type bodies, a tracer of their thermal history. Time-series observations of the third interstellar object, 3I/ATLAS, followed the emergence of extended CN emission as it fell inside 3 au \u2014 behavior resembling that of 2I/Borisov at comparable heliocentric distance.",
      detail: [
        "Asteroid taxonomy still rests on spectra of roughly three thousand objects. Photometry exists for far more, but broadband filters straddle the 0.7 \xB5m hydration feature rather than resolving it, so the distinction between a hydrated body and a dry one is largely lost. The feature matters because water in a parent body is a record of where it formed and how warm it became.",
        "A medium-band survey measures a reflectance spectrum for every moving object that crosses the field, which changes the sample size rather than the technique."
      ],
      goals: [
        "Reflectance spectra for roughly 100,000 solar system objects, against about 3,000 classified spectroscopically today"
      ],
      figure: {
        src: "/img/science/asteroid-reflectance.jpg",
        alt: "7DT reflectance spectra of asteroids 13 Egeria and 10 Hygiea compared with SMASS and ECAS reference spectra",
        label: "Hydrated and dry, told apart",
        caption: "Three-minute 7DT observations of 13 Egeria (left) and 10 Hygiea (right), as normalized reflectance. Egeria shows the 0.7 \xB5m absorption of a hydrated body; Hygiea does not. Reference spectra from SMASS (DeMeo et al. 2009) and ECAS (Tholen 1984) shown for comparison. Preliminary 7DT result."
      }
    }
  ]
};

// app/components/sciencetopic.tsx
import { jsx as jsx12, jsxs as jsxs10 } from "react/jsx-runtime";
var themes = science_default.themes;
function getTheme(id) {
  let theme = themes.find((t) => t.id === id);
  if (!theme)
    throw new Response(`Unknown science theme: ${id}`, { status: 404 });
  return theme;
}
function topicMeta(id) {
  let theme = getTheme(id);
  return [
    { title: `${theme.title} \xB7 7DS science` },
    { name: "description", content: theme.metaDescription }
  ];
}
function ScienceTopic({ id }) {
  let theme = getTheme(id), index = themes.findIndex((t) => t.id === id), previous = index > 0 ? themes[index - 1] : void 0, next = index < themes.length - 1 ? themes[index + 1] : void 0, band = 0, alt = () => band++ % 2 === 1, figures = [theme.figure, theme.figure2].filter(Boolean);
  return /* @__PURE__ */ jsxs10(PageLayout, { menu: "manuScience", children: [
    /* @__PURE__ */ jsx12(
      PageHero,
      {
        eyebrow: `Science \xB7 Theme ${theme.n}`,
        title: theme.title,
        lede: theme.question,
        image: theme.image
      }
    ),
    /* @__PURE__ */ jsx12(Section, { eyebrow: "Background", title: "Why it matters", alt: alt(), children: /* @__PURE__ */ jsx12("div", { className: "prose", children: (theme.detail ?? []).map((para, k) => /* @__PURE__ */ jsx12("p", { children: para }, k)) }) }),
    /* @__PURE__ */ jsx12(Section, { eyebrow: "Approach", title: "What 7DS contributes", alt: alt(), children: /* @__PURE__ */ jsx12("p", { className: "prose", children: theme.summary }) }),
    figures.length > 0 && /* @__PURE__ */ jsx12(Section, { eyebrow: "Figures", title: "What it looks like", alt: alt(), children: figures.map((fig, k) => /* @__PURE__ */ jsx12("div", { style: { marginTop: k === 0 ? 0 : "2.5rem" }, children: /* @__PURE__ */ jsx12(Figure, { src: fig.src, alt: fig.alt, label: fig.label, caption: fig.caption }) }, fig.src)) }),
    theme.goals && theme.goals.length > 0 && /* @__PURE__ */ jsxs10(Section, { eyebrow: "Targets", title: "What the program aims to deliver", alt: alt(), children: [
      /* @__PURE__ */ jsx12("ul", { className: "prose", children: theme.goals.map((goal) => /* @__PURE__ */ jsx12("li", { children: goal }, goal)) }),
      /* @__PURE__ */ jsxs10("p", { className: "prose", style: { marginTop: "1.5rem" }, children: [
        "These are program targets over the seven years of the survey, not results in hand. What has been observed so far is on the",
        " ",
        /* @__PURE__ */ jsx12(Link6, { to: "/users/status", children: "status page" }),
        ", and published work is listed under",
        " ",
        /* @__PURE__ */ jsx12(Link6, { to: "/publication/list", children: "publications" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsx12(Section, { eyebrow: "Continue", title: "Other themes", alt: alt(), children: /* @__PURE__ */ jsx12(
      NextLinks,
      {
        links: [
          ...previous ? [{ label: `\u2190 ${previous.title}`, href: `/science/${previous.id}` }] : [],
          ...next ? [{ label: `${next.title} \u2192`, href: `/science/${next.id}` }] : [],
          { label: "All seven themes", href: "/science/overview" }
        ]
      }
    ) })
  ] });
}

// app/routes/science.transients.tsx
import { jsx as jsx13 } from "react/jsx-runtime";
var meta3 = () => topicMeta("transients"), Index3 = () => /* @__PURE__ */ jsx13(ScienceTopic, { id: "transients" }), science_transients_default = Index3;

// app/routes/telescope.computer.tsx
var telescope_computer_exports = {};
__export(telescope_computer_exports, {
  default: () => telescope_computer_default,
  meta: () => meta4
});

// app/content/pages/telescope/computer.json
var computer_default = {
  meta: {
    title: "Computational resources \xB7 7-Dimensional Telescope",
    description: "On-site control computers, the Proton processing server and the storage behind 7DT."
  },
  hero: {
    eyebrow: "Facilities",
    title: "*Computational* resources",
    lede: "About 350 GB of raw data are produced each night, transferred from Chile to Seoul and reduced the same day.",
    image: "/img/hero/computer.jpg",
    meta: [
      {
        value: "128",
        label: "CPU cores"
      },
      {
        value: "2",
        unit: "\xD7 A100",
        label: "GPUs"
      },
      {
        value: "3.6",
        unit: "PB",
        label: "Storage"
      },
      {
        value: "66 \xB1 24",
        unit: "GB/hr",
        label: "Pipeline throughput"
      }
    ]
  },
  onsite: {
    eyebrow: "On site",
    title: "Control computers in Chile",
    body: "On-site computing consists of sixteen Telescope Control Computers, one per operational unit, and a single Main Control Computer that coordinates the array. Each TCC drives its own mount, camera, focuser and filter wheel and writes exposures to local storage as they complete. The MCC dispatches observation commands through RTCSpy, aggregates data from every TCC, and manages transfer to the processing facility at Seoul National University over KREONET.",
    table: {
      caption: "On-site infrastructure",
      rows: [
        [
          "Telescope control computers",
          "16, one per operational unit"
        ],
        [
          "Main control computer",
          "1, array-level command hub"
        ],
        [
          "Dispatch",
          "RTCSpy over real-time network"
        ],
        [
          "Link to Korea",
          "KREONET"
        ],
        [
          "Transfer protocol",
          "GridFTP, \u2248 80 MB s\u207B\xB9"
        ],
        [
          "Typical transfer time",
          "< 12 hours (ToO: tens of minutes)"
        ]
      ]
    }
  },
  proton: {
    eyebrow: "Processing",
    title: "Proton",
    body: "All 7DT data are reduced on Proton, a dedicated server with dual AMD EPYC 7513 processors providing 128 cores at up to 2.6 GHz, 512 GB of memory, and two NVIDIA A100 GPUs sharing memory over NVLink. A nightly volume of roughly 3,000 raw images requires an effective per-image processing time of about 30 seconds to complete within the daily budget; the current pipeline sustains a median end-to-end throughput of 66 \xB1 24 GB per hour and clears a typical survey night in about five hours of wall-clock time after transfer completes. GPU acceleration is available for preprocessing, though in this deployment the throughput gain over the CPU path is minimal \u2014 the pipeline is bound by I/O rather than by computation.",
    table: {
      caption: "Processing server",
      rows: [
        [
          "CPU",
          "2 \xD7 AMD EPYC 7513"
        ],
        [
          "Cores",
          "128 @ up to 2.6 GHz"
        ],
        [
          "Memory",
          "512 GB (8 \xD7 64 GB)"
        ],
        [
          "GPU",
          "2 \xD7 NVIDIA A100, 82 GB VRAM"
        ],
        [
          "GPU interconnect",
          "NVLink"
        ],
        [
          "Target throughput",
          "\u2248 30 s per image"
        ]
      ]
    }
  },
  storage: {
    eyebrow: "Storage",
    title: "Storage servers",
    body: "A typical night yields about 3,000 raw frames of roughly 117 MiB each, some 350 GB before compression. Raw data are compressed on site and transferred by GridFTP at a typical 80 MB/s, a procedure that usually completes in under twelve hours; target-of-opportunity data skip the compression and the wait for sunrise, cutting latency to tens of minutes. Storage is provided by a growing set of servers named for the hydrogen transition series. Two are in service \u2014 Lyman, with two 1.2 PB volumes, and Balmer, with one \u2014 for a current capacity of about 3.6 PB, and further servers are added as the archive grows. Each is attached to the compute server as an NFS mount over a 10 Gbps class network, so that I/O buffering does not burden processing.",
    table: {
      caption: "Storage servers",
      rows: [
        [
          "Naming",
          "Hydrogen transition series \u2014 Lyman, Balmer, \u2026"
        ],
        [
          "Lyman",
          "2 \xD7 1.2 PB (RAID 60)"
        ],
        [
          "Balmer",
          "1 \xD7 1.2 PB, extensible"
        ],
        [
          "Current capacity",
          "\u2248 3.6 PB, extended as required"
        ],
        [
          "Attachment",
          "NFS over 10 Gbps class network"
        ],
        [
          "Nightly inflow",
          "\u2248 350 GB (\u2248 3,000 \xD7 117 MiB)"
        ]
      ]
    },
    stats: [
      {
        value: "\u2248 3,000",
        label: "Images per night"
      },
      {
        value: "\u2248 5",
        unit: "hr",
        label: "To reduce a night"
      },
      {
        value: "\u2248 350",
        unit: "GB",
        label: "Nightly inflow"
      },
      {
        value: "1.75",
        unit: "M",
        label: "Images archived"
      }
    ]
  },
  facility: {
    eyebrow: "Facility",
    title: "The processing center",
    figure: {
      src: "/img/computer.jpeg",
      alt: "The 7DT data processing facility at Seoul National University",
      label: "Proton",
      caption: "The dedicated reduction server at Seoul National University, where all 7DT data are processed."
    },
    buttons: [
      {
        label: "Reduction software",
        href: "/users/software"
      },
      {
        label: "Data products",
        href: "/users/format"
      }
    ]
  }
};

// app/routes/telescope.computer.tsx
import { jsx as jsx14, jsxs as jsxs11 } from "react/jsx-runtime";
var meta4 = () => metaOf(computer_default), TextAndTable = ({ block }) => /* @__PURE__ */ jsxs11("div", { className: "split split--wide-text", children: [
  /* @__PURE__ */ jsx14("p", { className: "prose", children: /* @__PURE__ */ jsx14(Md, { children: block.body }) }),
  /* @__PURE__ */ jsx14(SimpleTable, { caption: block.table.caption, rows: block.table.rows })
] }), Index4 = () => {
  let { hero: hero3, onsite, proton, storage, facility } = computer_default;
  return /* @__PURE__ */ jsxs11(PageLayout, { menu: "manu7dt", rail: !0, children: [
    /* @__PURE__ */ jsx14(
      PageHero,
      {
        eyebrow: hero3.eyebrow,
        title: /* @__PURE__ */ jsx14(Md, { children: hero3.title }),
        lede: hero3.lede,
        image: hero3.image,
        meta: hero3.meta
      }
    ),
    /* @__PURE__ */ jsx14(Section, { eyebrow: onsite.eyebrow, title: onsite.title, children: /* @__PURE__ */ jsx14(TextAndTable, { block: onsite }) }),
    /* @__PURE__ */ jsx14(Section, { eyebrow: proton.eyebrow, title: proton.title, alt: !0, children: /* @__PURE__ */ jsx14(TextAndTable, { block: proton }) }),
    /* @__PURE__ */ jsxs11(Section, { eyebrow: storage.eyebrow, title: storage.title, children: [
      /* @__PURE__ */ jsx14(TextAndTable, { block: storage }),
      /* @__PURE__ */ jsx14("div", { style: { marginTop: "2.5rem" }, children: /* @__PURE__ */ jsx14(StatGrid, { items: storage.stats }) })
    ] }),
    /* @__PURE__ */ jsxs11(Section, { eyebrow: facility.eyebrow, title: facility.title, alt: !0, children: [
      /* @__PURE__ */ jsx14(ContentFigure, { fig: facility.figure, style: { maxWidth: "760px" } }),
      /* @__PURE__ */ jsx14(ButtonRow, { buttons: facility.buttons, style: { marginTop: "2rem" } })
    ] })
  ] });
}, telescope_computer_default = Index4;

// app/routes/telescope.location.tsx
var telescope_location_exports = {};
__export(telescope_location_exports, {
  default: () => telescope_location_default,
  links: () => links2,
  meta: () => meta5
});
import { useEffect as useEffect4, useState as useState3 } from "react";
import { Carousel } from "react-bootstrap";

// node_modules/bootstrap/dist/css/bootstrap.min.css
var bootstrap_min_default = "/build/_assets/bootstrap.min-TQVI2G2N.css";

// app/content/pages/telescope/location.json
var location_default = {
  meta: {
    title: "Location \xB7 7-Dimensional Telescope",
    description: "El Sauce Observatory, R\xEDo Hurtado Valley, Chile \u2014 the site of the 7-Dimensional Telescope."
  },
  hero: {
    eyebrow: "Facilities",
    title: "7DT in *Chile*",
    lede: "El Sauce Observatory, in the R\xEDo Hurtado Valley of Chile, at 1,600 m and close to Cerro Tololo, Gemini South and Rubin.",
    image: "/img/hero/location.jpg",
    meta: [
      {
        value: "1600",
        unit: "m",
        label: "Altitude"
      },
      {
        value: "1.5",
        unit: "\u2033",
        label: "Median seeing"
      },
      {
        value: "300",
        unit: "+",
        label: "Clear nights / yr"
      },
      {
        value: "21.97",
        label: "Sky brightness"
      }
    ]
  },
  site: {
    eyebrow: "The site",
    title: "R\xEDo Hurtado Valley",
    body: "El Sauce Observatory sits in the Rio Hurtado Valley of Chile at 30 deg 28 min 16 sec South, 70 deg 45 min 47 sec West, 1,600 m above sea level. It neighbors the sites of Cerro Tololo Inter-American Observatory, Gemini South, the Southern Astrophysical Research Telescope and the Vera C. Rubin Observatory, and shares their sky conditions: typical seeing of about 1.5 arcseconds, more than 300 clear nights a year, and a mean zenith sky brightness of 21.97 mag per square arcsecond. Site infrastructure and maintenance are provided by ObsTech, a Chilean telescope hosting company.",
    neighbours: {
      title: "Neighbouring facilities",
      names: [
        "Cerro Tololo Inter-American Observatory",
        "Gemini South Telescope",
        "Southern Astrophysical Research Telescope",
        "Vera C. Rubin Observatory"
      ]
    },
    table: {
      caption: "Site parameters",
      rows: [
        [
          "Observatory",
          "El Sauce, R\xEDo Hurtado Valley"
        ],
        [
          "Latitude",
          "30\xB0 28\u2032 16\u2033 S"
        ],
        [
          "Longitude",
          "70\xB0 45\u2032 47\u2033 W"
        ],
        [
          "Altitude",
          "1600 m"
        ],
        [
          "Median seeing",
          "\u2248 1.5 arcsec"
        ],
        [
          "Clear nights",
          "> 300 per year"
        ],
        [
          "Zenith sky brightness",
          "21.97 mag arcsec\u207B\xB2"
        ],
        [
          "Site operator",
          "ObsTech"
        ]
      ]
    }
  },
  photos: [
    {
      file: "c1.jpg",
      caption: "Site preparation and pier foundations above the R\xEDo Hurtado Valley"
    },
    {
      file: "c2.jpg",
      caption: "The roll-off enclosure erected over the instrument deck, before installation"
    },
    {
      file: "c3.jpg",
      caption: "Inside the closed enclosure: DeltaRho 500 units parked on their piers"
    },
    {
      file: "c4.jpg",
      caption: "The roof rolled open at dusk, units stowed and ready for the night"
    },
    {
      file: "c5.jpg",
      caption: "Members of the 7DT team and ObsTech site staff on the instrument deck"
    },
    {
      file: "c6.jpg",
      caption: "The deck from above \u2014 installed units alongside piers still awaiting theirs"
    },
    {
      file: "c7.jpg",
      caption: "The array working under the southern Milky Way"
    }
  ],
  infrastructure: {
    eyebrow: "On site",
    title: "Infrastructure",
    body: "Site infrastructure, enclosures and on-site computing hardware are maintained by ObsTech, a Chilean telescope hosting company. The array is controlled from sixteen telescope control computers and a single main control computer housed at the site; data are handed to the Korean processing facility over KREONET each night.",
    buttons: [
      {
        label: "Computational resources",
        href: "/telescope/computer"
      },
      {
        label: "Instrument",
        href: "/telescope/instrument"
      }
    ]
  }
};

// app/routes/telescope.location.tsx
import { jsx as jsx15, jsxs as jsxs12 } from "react/jsx-runtime";
var links2 = () => [{ rel: "stylesheet", href: bootstrap_min_default }], meta5 = () => metaOf(location_default), { hero, site, photos, infrastructure } = location_default, Index5 = () => {
  let [index, setIndex] = useState3(0), [paused, setPaused] = useState3(!1), [reduceMotion, setReduceMotion] = useState3(!1);
  useEffect4(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  let autoplay = !paused && !reduceMotion;
  return /* @__PURE__ */ jsxs12(PageLayout, { menu: "manu7dt", children: [
    /* @__PURE__ */ jsx15(
      PageHero,
      {
        eyebrow: hero.eyebrow,
        title: /* @__PURE__ */ jsx15(Md, { children: hero.title }),
        lede: hero.lede,
        image: hero.image,
        meta: hero.meta
      }
    ),
    /* @__PURE__ */ jsx15(Section, { eyebrow: site.eyebrow, title: site.title, children: /* @__PURE__ */ jsxs12("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsxs12("div", { children: [
        /* @__PURE__ */ jsx15("p", { className: "prose", children: /* @__PURE__ */ jsx15(Md, { children: site.body }) }),
        /* @__PURE__ */ jsx15("h3", { style: { marginTop: "2rem", fontSize: "1rem" }, children: site.neighbours.title }),
        /* @__PURE__ */ jsx15("ul", { className: "prose", style: { paddingLeft: "1.25rem" }, children: site.neighbours.names.map(
          (name) => /* @__PURE__ */ jsx15("li", { children: name }, name)
        ) })
      ] }),
      /* @__PURE__ */ jsx15(SimpleTable, { caption: site.table.caption, rows: site.table.rows })
    ] }) }),
    /* @__PURE__ */ jsxs12("div", { className: "carousel-frame", children: [
      /* @__PURE__ */ jsx15(
        Carousel,
        {
          activeIndex: index,
          onSelect: (selected) => setIndex(selected),
          interval: autoplay ? 5e3 : null,
          fade: !reduceMotion,
          children: photos.map(
            (photo, i) => /* @__PURE__ */ jsx15(Carousel.Item, { children: /* @__PURE__ */ jsx15(
              "div",
              {
                className: "carousel-slide",
                style: { backgroundImage: `url(/img/carousel/${photo.file})` },
                role: "img",
                "aria-label": `${photo.caption} (${i + 1} of ${photos.length})`
              }
            ) }, photo.file)
          )
        }
      ),
      /* @__PURE__ */ jsx15(
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
    /* @__PURE__ */ jsx15("div", { className: "container container--wide", children: /* @__PURE__ */ jsx15("p", { className: "footnote", style: { padding: "0.75rem 0" }, children: photos[index].caption }) }),
    /* @__PURE__ */ jsxs12(Section, { eyebrow: infrastructure.eyebrow, title: infrastructure.title, alt: !0, children: [
      /* @__PURE__ */ jsx15("p", { className: "prose", children: /* @__PURE__ */ jsx15(Md, { children: infrastructure.body }) }),
      /* @__PURE__ */ jsx15(ButtonRow, { buttons: infrastructure.buttons, style: { marginTop: "1.5rem" } })
    ] })
  ] });
}, telescope_location_default = Index5;

// app/routes/telescope.overview.tsx
var telescope_overview_exports = {};
__export(telescope_overview_exports, {
  default: () => telescope_overview_default,
  meta: () => meta6
});

// app/content/data/specs.json
var specs_default = {
  note: "7DT system specifications as of June 2026. Source: Kim et al., Proc. SPIE 14147-84, Table 1; Hyun et al., Proc. SPIE 14155-12, Sec. 2.",
  groups: [
    {
      group: "Array",
      rows: [
        [
          "Telescopes in the array",
          "20"
        ],
        [
          "Currently operational",
          "16 (as of June 2026)"
        ],
        [
          "Field of view per pointing",
          "\u2248 1.25 deg\xB2"
        ],
        [
          "Spectral resolution",
          "R = 30\u201370"
        ]
      ]
    },
    {
      group: "Unit telescope",
      rows: [
        [
          "OTA",
          "PlaneWave DeltaRho 500"
        ],
        [
          "Optical design",
          "Corrected Cassegrain"
        ],
        [
          "Primary diameter",
          "50.8 cm"
        ],
        [
          "Focal length",
          "1537 mm"
        ],
        [
          "Focal ratio",
          "f/3.0"
        ],
        [
          "Image circle",
          "70 mm (\u2248 2.6\xB0)"
        ],
        [
          "Mount",
          "PlaneWave L-500, direct drive"
        ],
        [
          "Mount slew rate",
          "20 deg s\u207B\xB9"
        ]
      ]
    },
    {
      group: "Camera & filters",
      rows: [
        [
          "Camera",
          "Moravian C3-61000 PRO"
        ],
        [
          "Sensor",
          "SONY IMX455 back-illuminated CMOS"
        ],
        [
          "Sensor size",
          "36 \xD7 24 mm"
        ],
        [
          "Sensor dimension",
          "9576 \xD7 6388 pixels"
        ],
        [
          "Pixel size",
          "3.76 \xB5m"
        ],
        [
          "Pixel scale",
          "0.5 arcsec"
        ],
        [
          "Field of view per unit",
          "1.34\xB0 \xD7 0.90\xB0"
        ],
        [
          "Filter wheel",
          "9 slots per unit"
        ],
        [
          "Broad bands",
          "Sloan u, g, r, i, z"
        ],
        [
          "Medium-band filters (design)",
          "40"
        ],
        [
          "Medium-band filters installed",
          "35 (as of June 2026)"
        ],
        [
          "Wavelength coverage",
          "375\u2013875 nm"
        ],
        [
          "Medium-band FWHM",
          "14\u201341 nm (typ. 25\u201330)"
        ]
      ]
    },
    {
      group: "Site",
      rows: [
        [
          "Observatory",
          "El Sauce, R\xEDo Hurtado Valley, Chile"
        ],
        [
          "Coordinates",
          "30\xB028\u203216\u2033 S, 70\xB045\u203247\u2033 W"
        ],
        [
          "Altitude",
          "1600 m"
        ],
        [
          "Median seeing",
          "\u2248 1.5 arcsec"
        ],
        [
          "Clear nights",
          "> 300 per year"
        ],
        [
          "Zenith sky brightness",
          "21.97 mag arcsec\u207B\xB2"
        ]
      ]
    },
    {
      group: "Computing & storage",
      rows: [
        [
          "Processing server",
          "Proton \u2014 2 \xD7 AMD EPYC 7513"
        ],
        [
          "CPU / memory",
          "128 cores @ 2.6 GHz / 512 GB"
        ],
        [
          "GPU",
          "2 \xD7 NVIDIA A100, 82 GB (NVLink)"
        ],
        [
          "Storage",
          "Lyman 2 \xD7 1.2 PB, Balmer 1.2 PB"
        ],
        [
          "Total capacity",
          "\u2248 3.6 PB"
        ],
        [
          "Data link",
          "KREONET, GridFTP \u2248 80 MB s\u207B\xB9"
        ]
      ]
    }
  ],
  depths: {
    caption: "5\u03C3 point-source depth, single 100 s exposure, nominal conditions",
    rows: [
      [
        "m400 (bluest medium band)",
        "19.06 mag"
      ],
      [
        "m475 (peak throughput)",
        "19.61 mag"
      ],
      [
        "m875 (reddest medium band)",
        "16.60 mag"
      ],
      [
        "Sloan g",
        "20.59 mag"
      ],
      [
        "Sloan r",
        "20.25 mag"
      ],
      [
        "Sloan i",
        "19.17 mag"
      ]
    ]
  },
  performance: [
    {
      value: "1.4\u20132.2",
      unit: "\u2033",
      label: "PSF FWHM at center"
    },
    {
      value: "2.0",
      unit: "\u2033",
      label: "Array median FWHM"
    },
    {
      value: "0.2",
      unit: "\u2033",
      label: "Unit-to-unit scatter"
    },
    {
      value: "< 0.1",
      unit: "",
      label: "PSF ellipticity"
    },
    {
      value: "15\u201325",
      unit: "mmag",
      label: "Zero-point uncertainty"
    }
  ]
};

// app/content/pages/telescope/overview.json
var overview_default = {
  meta: {
    title: "Telescope \xB7 7-Dimensional Telescope",
    description: "The 7-Dimensional Telescope: twenty 50-cm units on direct-drive mounts with CMOS cameras and medium-band filter wheels, operated as one instrument."
  },
  hero: {
    eyebrow: "Facilities",
    title: "The *7DT* array",
    lede: "Twenty 50-cm telescopes on direct-drive mounts, each with its own camera and filter wheel, operated as a single instrument.",
    image: "/img/hero/telescope.jpg",
    meta: [
      {
        value: "20",
        label: "Telescopes",
        note: "16 online",
        live: !0
      },
      {
        value: "50.8",
        unit: "cm",
        label: "Primary diameter"
      },
      {
        value: "f/3.0",
        label: "Focal ratio"
      },
      {
        value: "1.34 \xD7 0.90",
        unit: "\xB0",
        label: "Field per unit"
      }
    ]
  },
  hardware: {
    eyebrow: "Hardware",
    title: "What the array is made of",
    body: "7DT is an array of twenty 50-cm commercial off-the-shelf telescopes. Each unit is a PlaneWave DeltaRho 500 optical tube assembly on an L-500 direct-drive mount in equatorial configuration, paired with a Moravian Instruments C3-61000 PRO CMOS camera. Units are identical except for the filters they carry. Sixteen of the twenty are deployed and operational as of June 2026; the remaining four complete the array. All operational units share a common configuration and show consistent optical performance in routine use.",
    table: {
      caption: "Unit telescope, at a glance",
      rows: [
        [
          "Optical tube",
          "PlaneWave DeltaRho 500 \u2014 508 mm corrected Cassegrain, f/3.0"
        ],
        [
          "Mount",
          "PlaneWave L-500 direct drive, equatorial, 20 deg s\u207B\xB9 slew"
        ],
        [
          "Camera",
          "Moravian C3-61000 PRO \u2014 SONY IMX455 CMOS, 9576 \xD7 6388 px"
        ],
        [
          "Filter wheel",
          "9 slots per unit \u2014 Sloan broad bands and a share of 35 medium bands"
        ],
        [
          "Field of view",
          "1.34\xB0 \xD7 0.90\xB0 at 0.5\u2033 per pixel, 1.25 deg\xB2 per pointing"
        ]
      ]
    },
    note: "Each subsystem is described in full under [instrument](/telescope/instrument). Measured on-sky performance is reported on the [performance page](/users/performance).",
    figure: {
      src: "/img/images/Figure2_7DT.jpg",
      alt: "The 7-Dimensional Telescope array seen from the front",
      label: "DeltaRho 500",
      caption: "Each unit is a 508 mm corrected Cassegrain on an L-500 direct-drive mount, with its own camera and filter wheel."
    }
  },
  design: {
    eyebrow: "Design",
    title: "Why an array rather than one telescope",
    body: [
      "Twenty commercial 50-cm units, each carrying a different share of the forty-filter medium-band set, cost a fraction of a purpose-built instrument, can be brought on line in stages, and can be reconfigured between science goals without hardware changes. Pointed together the units build a spectrum of one field; pointed apart they cover 25 square degrees at once.",
      "Other multi-telescope arrays \u2014 GOTO, BlackGEM, LAST \u2014 take the same approach to off-the-shelf optics. What distinguishes 7DT is the filter set placed in front of them: 40 medium bands of about 25 nm width spanning 375 to 900 nm, distributed across the array so that the full set is covered in a small number of exposures."
    ],
    figure: {
      src: "/img/images/Figure1_7DT.jpeg",
      alt: "The 7-Dimensional Telescope array at El Sauce Observatory",
      label: "The array",
      caption: "DeltaRho 500 units installed at El Sauce Observatory, R\xEDo Hurtado Valley, Chile."
    }
  },
  specs: {
    eyebrow: "Specifications",
    title: "System summary",
    caption: "7DT system specifications \u2014 June 2026",
    next: {
      title: "In detail",
      links: [
        {
          label: "Instrument",
          href: "/telescope/instrument"
        },
        {
          label: "Location",
          href: "/telescope/location"
        },
        {
          label: "Computational resources",
          href: "/telescope/computer"
        },
        {
          label: "Measured performance",
          href: "/users/performance"
        }
      ]
    }
  }
};

// app/routes/telescope.overview.tsx
import { jsx as jsx16, jsxs as jsxs13 } from "react/jsx-runtime";
var meta6 = () => metaOf(overview_default), Index6 = () => {
  let { hero: hero3, hardware, design, specs: summary } = overview_default;
  return /* @__PURE__ */ jsxs13(PageLayout, { menu: "manu7dt", children: [
    /* @__PURE__ */ jsx16(
      PageHero,
      {
        eyebrow: hero3.eyebrow,
        title: /* @__PURE__ */ jsx16(Md, { children: hero3.title }),
        lede: hero3.lede,
        image: hero3.image,
        meta: hero3.meta
      }
    ),
    /* @__PURE__ */ jsx16(Section, { eyebrow: hardware.eyebrow, title: hardware.title, children: /* @__PURE__ */ jsxs13("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsxs13("div", { children: [
        /* @__PURE__ */ jsx16("p", { className: "prose", children: /* @__PURE__ */ jsx16(Md, { children: hardware.body }) }),
        /* @__PURE__ */ jsx16("div", { className: "table-wrap", style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsxs13("table", { className: "spec-table", children: [
          /* @__PURE__ */ jsx16("caption", { children: hardware.table.caption }),
          /* @__PURE__ */ jsx16("tbody", { children: hardware.table.rows.map((row) => /* @__PURE__ */ jsxs13("tr", { children: [
            /* @__PURE__ */ jsx16("th", { scope: "row", children: row[0] }),
            /* @__PURE__ */ jsx16("td", { children: /* @__PURE__ */ jsx16(Md, { children: row[1] }) })
          ] }, row[0])) })
        ] }) }),
        /* @__PURE__ */ jsx16("p", { className: "note", style: { marginTop: "1rem" }, children: /* @__PURE__ */ jsx16(Md, { children: hardware.note }) })
      ] }),
      /* @__PURE__ */ jsx16(ContentFigure, { fig: hardware.figure })
    ] }) }),
    /* @__PURE__ */ jsx16(Section, { eyebrow: design.eyebrow, title: design.title, alt: !0, children: /* @__PURE__ */ jsxs13("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsx16("div", { children: /* @__PURE__ */ jsx16(Paras, { className: "prose", children: design.body }) }),
      /* @__PURE__ */ jsx16(ContentFigure, { fig: design.figure })
    ] }) }),
    /* @__PURE__ */ jsxs13(Section, { eyebrow: summary.eyebrow, title: summary.title, children: [
      /* @__PURE__ */ jsx16(SpecTable, { caption: summary.caption, groups: specs_default.groups }),
      /* @__PURE__ */ jsx16("div", { style: { marginTop: "2.5rem" }, children: /* @__PURE__ */ jsx16(NextLinks, { title: summary.next.title, links: summary.next.links }) })
    ] })
  ] });
}, telescope_overview_default = Index6;

// app/routes/science.cosmology.tsx
var science_cosmology_exports = {};
__export(science_cosmology_exports, {
  default: () => science_cosmology_default,
  meta: () => meta7
});
import { jsx as jsx17 } from "react/jsx-runtime";
var meta7 = () => topicMeta("cosmology"), Index7 = () => /* @__PURE__ */ jsx17(ScienceTopic, { id: "cosmology" }), science_cosmology_default = Index7;

// app/routes/users.performance.tsx
var users_performance_exports = {};
__export(users_performance_exports, {
  default: () => users_performance_default,
  meta: () => meta8
});
import { Link as Link7 } from "@remix-run/react";

// app/content/data/surveys.json
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
      body: "The default mode. Units rotate through every available medium and broad band, covering the full spectral range in as few exposures as the filter distribution allows. This is the mode in which 7DT delivers low-resolution spectroscopy over 1.25 square degrees. With the 16 telescopes currently in operation and the default 32-filter set used for Open Time proposals, this takes two sequential exposures, 16 filters at a time."
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

// app/content/pages/users/performance.json
var performance_default = {
  meta: {
    title: "Performance \xB7 7DT for users",
    description: "What a 7DT observation delivers: filter transmission, delivered PSF, photometric zero points, the depth of a 100-second exposure and the depth each survey reaches."
  },
  hero: {
    eyebrow: "For users",
    title: "Performance",
    lede: "What one 7DT exposure delivers: which bands it can be taken in, how sharp it is, how well it is calibrated, and how deep it goes \u2014 the five numbers an observing plan starts from.",
    image: "/img/hero/telescope.jpg",
    meta: [
      {
        value: "35",
        label: "Medium bands installed"
      },
      {
        value: "2.0",
        unit: "\u2033",
        label: "Median PSF FWHM"
      },
      {
        value: "15\u201325",
        unit: "mmag",
        label: "Zero-point uncertainty"
      },
      {
        value: "19.6",
        unit: "mag",
        label: "Best 100 s depth"
      }
    ]
  },
  filters: {
    eyebrow: "Filters",
    title: "Filter transmission",
    figure: {
      src: "/img/images/filter-transmission.png",
      alt: "System response of the 7DT medium bands in two panels, the original twenty above and the fifteen added in 2025 below, each shown against detector quantum efficiency, sky transmission and telescope throughput",
      label: "Total system response, decomposed",
      caption: "What actually reaches the detector: filter transmission multiplied by CMOS quantum efficiency, atmospheric transmission and telescope throughput. The original twenty bands are in the upper panel, the fifteen added in 2025 in the lower one, each drawn against the three curves that shape it. Peak system response is about 65 percent near 475 nm and falls away redward of 775 nm as quantum efficiency drops \u2014 which is why the reddest bands are the shallowest and the least well calibrated."
    },
    footnote: "The same response is shipped as reference data with [`supy`](/users/software) and is what its simulator module computes with, so a response derived there matches this figure. Which bands exist on a particular tile is reported on the [data access page](/users/access), and how much of the sky each band has reached is on the [status page](/users/status), which draws the same curves."
  },
  psf: {
    eyebrow: "Image quality",
    title: "Point-spread function",
    body: "Across the sixteen operational units the point-spread function measured at field center on good nights ranges from 1.4 to 2.2 arcseconds FWHM, with an array median of 2.0 arcseconds closely tracking the median site seeing. Unit-to-unit scatter in delivered FWHM is 0.2 arcseconds, and the PSF grows by 0.3 arcseconds from field center to corner while ellipticity stays below 0.1 over the central 80 percent of the field. Delivered image quality is therefore consistent across the array. Median delivered FWHM has held stable to within 0.3 arcseconds since routine survey operations began in July 2024.",
    footnote: "Measured from the point-spread function across the field of view by the Py7DT pipeline as part of routine astrometric and photometric processing, so the figures are delivered image quality in survey operation rather than a specification. Image quality is monitored continuously; units are re-aligned individually as needed.",
    table: {
      caption: "Delivered image quality",
      rows: [
        [
          "Pixel scale",
          "0.505\u2033 per pixel"
        ],
        [
          "Field of view per unit",
          "1.34\xB0 \xD7 0.90\xB0 (1.25 deg\xB2)"
        ],
        [
          "PSF FWHM at field center",
          "{spec:PSF FWHM at center}"
        ],
        [
          "Array median FWHM",
          "{spec:Array median FWHM}"
        ],
        [
          "Unit-to-unit scatter",
          "{spec:Unit-to-unit scatter}"
        ],
        [
          "Center-to-corner growth",
          "+0.3\u2033"
        ],
        [
          "Ellipticity, central 80% of field",
          "{spec:PSF ellipticity}"
        ],
        [
          "Median site seeing",
          "1.5\u2033"
        ]
      ]
    },
    figures: [
      {
        src: "/img/images/Seeing_2025-2026.png",
        alt: "Violin plot of the delivered seeing distribution in each 7DT band over 2025 and 2026, with the median marked for each",
        label: "Delivered seeing, by band",
        caption: "Distribution of measured seeing in every band over the 2025\u20132026 seasons, with the median marked on each. Medians run from 2.0 arcseconds in r, m700 and m775 to 2.7 in m575: the variation is the observing conditions the band happened to be taken in, not a property of the filter. The width of each violin is the number of exposures reaching that seeing."
      },
      {
        src: "/img/images/Seeing_by_unit_2025-2026.png",
        alt: "Violin plot of the delivered seeing distribution for each of the sixteen operational 7DT units over 2025 and 2026",
        label: "Delivered seeing, by unit",
        caption: "The same measurements grouped by telescope rather than by band, over all sixteen operational units. Medians lie between 2.0 and 2.8 arcseconds, so the array behaves as a coherent set of instruments rather than sixteen separate ones \u2014 which is what makes coadding across units sound."
      }
    ]
  },
  photometry: {
    eyebrow: "Photometry",
    title: "Photometric zero point",
    body: "Photometric calibration runs against synthetic photometry derived from Gaia DR3 BP/RP spectra, homogenized to correct the color- and magnitude-dependent residuals reported by the Gaia collaboration. The procedure was established during commissioning on 68 spectrophotometric standard stars, including CALSPEC sources, with non-variable point sources selected following criteria adapted from SkyMapper DR4. Zero-point uncertainty across the twenty medium bands in operational use is 15 to 25 mmag, with the larger values redward of 775 nm where detector quantum efficiency falls and signal-to-noise drops accordingly.",
    table: {
      caption: "Calibration",
      rows: [
        [
          "Reference",
          "Gaia DR3 BP/RP synthetic photometry"
        ],
        [
          "Homogenization",
          "Color- and magnitude-dependent residuals corrected"
        ],
        [
          "Established on",
          "68 spectrophotometric standards, incl. CALSPEC"
        ],
        [
          "Zero-point uncertainty",
          "{spec:Zero-point uncertainty}"
        ],
        [
          "Redward of 775 nm",
          "Toward the upper end of that range"
        ],
        [
          "Calibrated set",
          "The original 20 medium bands"
        ]
      ]
    },
    figure: {
      src: "/img/images/zeropoint.png",
      alt: "Violin plot of the spatial zero-point RMSE in each band across 1167 deep-stack tiles, rising from about 0.010 magnitudes in the blue to 0.064 in m875",
      label: "Zero-point uniformity across a stack",
      caption: "Spatial zero-point RMSE within DP2 deep stacks, measured in a 5-arcsecond aperture over 1,167 tiles \u2014 how much the calibration varies from place to place inside one image, which is a different quantity from the overall zero-point uncertainty quoted above. Medians run from 0.010 mag in r to 0.064 mag in m875, flat across the blue and green bands and climbing steadily redward of 775 nm with falling detector quantum efficiency."
    },
    footnote: "Zero points are determined per image by Py7DT with 3\u03C3 clipping across multiple aperture sizes, against corrected synthetic photometry of matched Gaia sources. The fifteen filters installed in late 2025 are not yet spectrophotometrically calibrated and are excluded from the figures above; a calibration campaign following the same procedure is planned. Full methodology is in preparation (Paek et al.)."
  },
  depth: {
    eyebrow: "Depth",
    title: "A 100-second exposure",
    body: "For the canonical 100-second exposure the 5-sigma point-source depth reaches 19.06 mag in the bluest medium band (m400) and 16.60 mag at the longest wavelength (m875), peaking at 19.61 mag in m475 near maximum system throughput. The Sloan broad bands reach 20.59, 20.25 and 19.17 mag in g, r and i. These are nominal-condition figures: seeing better than 2.0 arcseconds, airmass below 1.5, and non-bright nights.",
    notes: [
      "One hundred seconds is the fiducial 7DS exposure: every survey visit is built from it, so a depth quoted for any program is this number scaled by the number of frames coadded. Background-limited, so four frames buy 0.75 mag.",
      "Nominal conditions: seeing better than 2.0 arcseconds, airmass below 1.5, and a non-bright night. The spread around each figure on a real night is the width of the violins below."
    ],
    figure: {
      src: "/img/images/depth-distribution.png",
      alt: "Violin plot of the 5-sigma limiting magnitude distribution for each 7DT band in a 100-second exposure",
      label: "Measured depth per band",
      caption: "Distribution of single-exposure 5\u03C3 point-source depths for the twenty original medium bands and Sloan g, r, i and z, measured from individual 100-second exposures taken in routine survey operation, with the median marked on each. They run from 20.59 mag in Sloan g down to 16.60 in m875, following the system response above. The width of each violin is the number of exposures reaching that magnitude; the spread within a band is the variation in seeing, airmass and sky brightness across real nights. The fifteen filters added in late 2025 are not included, their spectrophotometric calibration being incomplete."
    }
  },
  surveys: {
    eyebrow: "Depth",
    title: "What each survey reaches",
    body: "The three surveys spend that fiducial exposure differently \u2014 over the whole southern sky once, over a smaller area every ten to fourteen days, or on one field every night \u2014 so they arrive at very different depths from the same instrument.",
    table: {
      caption: "Depth reached by each survey, 5\u03C3 in m600",
      columns: [
        "Survey",
        "Area",
        "Cadence",
        "Depth"
      ]
    },
    footnote: "The RIS figure is one visit of 3 \xD7 100 s. Figures marked with an asterisk are cumulative over the planned operation rather than the depth of any single visit, and are targets: [status and overview](/users/status) reports what has actually been observed, and the coverage map on the [data access page](/users/access) gives the integration time and estimated depth reached on any individual tile."
  },
  next: {
    eyebrow: "Next",
    title: "Planning an observation",
    body: "To turn these figures into an expected signal-to-noise, combine the depths with the response curves: the `supy` package has a simulator module that generates filter and detector response for the 7DT bands, and an observer module for target visibility from El Sauce.",
    buttons: [
      {
        label: "Current status",
        href: "/users/status"
      },
      {
        label: "Software",
        href: "/users/software"
      },
      {
        label: "How to propose",
        href: "/users/propose"
      },
      {
        label: "Instrument specification",
        href: "/telescope/instrument"
      }
    ]
  }
};

// app/routes/users.performance.tsx
import { jsx as jsx18, jsxs as jsxs14 } from "react/jsx-runtime";
var meta8 = () => metaOf(performance_default), fillSpecs = (rows) => rows.map(
  (row) => row.map(
    (cell) => cell.replace(/\{spec:([^}]+)\}/g, (_, label) => {
      let it = specs_default.performance.find((r) => r.label === label);
      return it ? `${it.value}${it.unit ?? ""}` : "\u2014";
    })
  )
), Index8 = () => {
  let { hero: hero3, filters, psf, photometry, depth, surveys: reach, next } = performance_default;
  return /* @__PURE__ */ jsxs14(PageLayout, { menu: "manuUsers", rail: !0, children: [
    /* @__PURE__ */ jsx18(
      PageHero,
      {
        eyebrow: hero3.eyebrow,
        title: hero3.title,
        lede: hero3.lede,
        image: hero3.image,
        meta: hero3.meta
      }
    ),
    /* @__PURE__ */ jsxs14(Section, { eyebrow: filters.eyebrow, title: filters.title, wide: !0, children: [
      /* @__PURE__ */ jsxs14("div", { className: "prose", style: { maxWidth: "68ch" }, children: [
        /* @__PURE__ */ jsx18("p", { children: /* @__PURE__ */ jsx18(Md, { children: shared_default.filterSet.body }) }),
        /* @__PURE__ */ jsx18("p", { children: /* @__PURE__ */ jsx18(Md, { children: shared_default.filterSet.caveat }) })
      ] }),
      /* @__PURE__ */ jsx18("div", { style: { marginTop: "2.5rem" }, children: /* @__PURE__ */ jsx18(ContentFigure, { fig: filters.figure }) }),
      /* @__PURE__ */ jsx18("p", { className: "footnote", style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsx18(Md, { children: filters.footnote }) })
    ] }),
    /* @__PURE__ */ jsxs14(Section, { eyebrow: psf.eyebrow, title: psf.title, alt: !0, children: [
      /* @__PURE__ */ jsxs14("div", { className: "split split--wide-text", children: [
        /* @__PURE__ */ jsxs14("div", { children: [
          /* @__PURE__ */ jsx18("p", { className: "prose", children: /* @__PURE__ */ jsx18(Md, { children: psf.body }) }),
          /* @__PURE__ */ jsx18("p", { className: "footnote", style: { marginTop: "1rem" }, children: /* @__PURE__ */ jsx18(Md, { children: psf.footnote }) })
        ] }),
        /* @__PURE__ */ jsx18(SimpleTable, { caption: psf.table.caption, rows: fillSpecs(psf.table.rows) })
      ] }),
      psf.figures.map((fig) => /* @__PURE__ */ jsx18("div", { style: { marginTop: "2.5rem" }, children: /* @__PURE__ */ jsx18(ContentFigure, { fig }) }, fig.src)),
      /* @__PURE__ */ jsx18("div", { style: { marginTop: "2rem" }, children: /* @__PURE__ */ jsx18(StatGrid, { items: specs_default.performance }) })
    ] }),
    /* @__PURE__ */ jsxs14(Section, { eyebrow: photometry.eyebrow, title: photometry.title, children: [
      /* @__PURE__ */ jsxs14("div", { className: "split split--wide-text", children: [
        /* @__PURE__ */ jsx18("p", { className: "prose", children: /* @__PURE__ */ jsx18(Md, { children: photometry.body }) }),
        /* @__PURE__ */ jsx18(SimpleTable, { caption: photometry.table.caption, rows: fillSpecs(photometry.table.rows) })
      ] }),
      /* @__PURE__ */ jsx18("div", { style: { marginTop: "2.5rem" }, children: /* @__PURE__ */ jsx18(ContentFigure, { fig: photometry.figure }) }),
      /* @__PURE__ */ jsx18("p", { className: "footnote", style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsx18(Md, { children: photometry.footnote }) })
    ] }),
    /* @__PURE__ */ jsxs14(Section, { eyebrow: depth.eyebrow, title: depth.title, alt: !0, children: [
      /* @__PURE__ */ jsx18("p", { className: "prose", children: /* @__PURE__ */ jsx18(Md, { children: depth.body }) }),
      /* @__PURE__ */ jsxs14("div", { className: "split split--wide-text", style: { marginTop: "2rem" }, children: [
        /* @__PURE__ */ jsx18(SimpleTable, { caption: specs_default.depths.caption, rows: specs_default.depths.rows }),
        /* @__PURE__ */ jsx18("div", { children: depth.notes.map((note, k) => /* @__PURE__ */ jsx18("p", { className: "footnote", style: k ? { marginTop: "1rem" } : void 0, children: /* @__PURE__ */ jsx18(Md, { children: note }) }, k)) })
      ] }),
      /* @__PURE__ */ jsx18("div", { style: { marginTop: "2.5rem" }, children: /* @__PURE__ */ jsx18(ContentFigure, { fig: depth.figure }) })
    ] }),
    /* @__PURE__ */ jsxs14(Section, { eyebrow: reach.eyebrow, title: reach.title, children: [
      /* @__PURE__ */ jsx18("p", { className: "prose", children: /* @__PURE__ */ jsx18(Md, { children: reach.body }) }),
      /* @__PURE__ */ jsx18("div", { className: "table-wrap", style: { marginTop: "2rem" }, children: /* @__PURE__ */ jsxs14("table", { className: "spec-table", children: [
        /* @__PURE__ */ jsx18("caption", { children: reach.table.caption }),
        /* @__PURE__ */ jsx18("thead", { children: /* @__PURE__ */ jsx18("tr", { children: reach.table.columns.map((col) => /* @__PURE__ */ jsx18("th", { scope: "col", children: col }, col)) }) }),
        /* @__PURE__ */ jsx18("tbody", { children: surveys_default.tiers.map((tier4) => /* @__PURE__ */ jsxs14("tr", { children: [
          /* @__PURE__ */ jsx18("th", { scope: "row", children: /* @__PURE__ */ jsx18(Link7, { to: `/survey/${tier4.code.toLowerCase()}`, children: tier4.code }) }),
          /* @__PURE__ */ jsx18("td", { children: tier4.area }),
          /* @__PURE__ */ jsx18("td", { children: tier4.cadence }),
          /* @__PURE__ */ jsx18("td", { children: tier4.depth })
        ] }, tier4.code)) })
      ] }) }),
      /* @__PURE__ */ jsx18("p", { className: "footnote", style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsx18(Md, { children: reach.footnote }) })
    ] }),
    /* @__PURE__ */ jsxs14(Section, { eyebrow: next.eyebrow, title: next.title, alt: !0, children: [
      /* @__PURE__ */ jsx18("p", { className: "prose", children: /* @__PURE__ */ jsx18(Md, { children: next.body }) }),
      /* @__PURE__ */ jsx18(ButtonRow, { buttons: next.buttons, style: { marginTop: "1.5rem" } })
    ] })
  ] });
}, users_performance_default = Index8;

// app/routes/publication.list.tsx
var publication_list_exports = {};
__export(publication_list_exports, {
  default: () => publication_list_default,
  meta: () => meta9
});
import { useMemo, useState as useState4 } from "react";
import { Pagination } from "flowbite-react";

// app/content/data/news.json
var news_default = {
  _note: "Publication entries: 'abstract' holds the author's published abstract, quoted verbatim. 'summary' holds a site-written description and is labeled as such where no published abstract is available. Never put a paraphrase in 'abstract'. 'imgName' for a publication should be a figure from that publication (pub-*.jpg, see public/img/news). Three entries have no obtainable paper figure \u2014 Chang et al., Ko et al. and Lim et al. \u2014 and fall back to a 7DT project figure instead; do not describe those as figures from the paper. Drafted entries awaiting approval live in news-pending.json, which nothing imports; move them into 'news' (top, newest first) to publish.",
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

// app/content/pages/publication/list.json
var list_default = {
  meta: {
    title: "Publications \xB7 7-Dimensional Telescope",
    description: "Refereed papers and conference proceedings from the 7DT collaboration."
  },
  hero: {
    eyebrow: "Publications",
    title: "Papers & proceedings",
    lede: "Instrument, operations and science papers from the 7DT collaboration.",
    image: "/img/hero/publications.jpg",
    countLabel: "Listed works"
  },
  notice: "Publishing with 7DT data? Please read the [publication policy](/publication/policy) first.",
  list: {
    eyebrow: "Bibliography",
    title: "Meet our work",
    toolbar: "{count} publications \xB7 page {page} of {pages}",
    showAbstracts: "Show abstracts",
    hideAbstracts: "Hide abstracts",
    labels: {
      journal: "Journal",
      date: "Date",
      doi: "doi",
      preprint: "Preprint",
      ref: "Ref"
    }
  }
};

// app/routes/publication.list.tsx
import { jsx as jsx19, jsxs as jsxs15 } from "react/jsx-runtime";
var meta9 = () => metaOf(list_default), PER_PAGE = 6, Index9 = () => {
  let { hero: hero3, notice, list } = list_default, { labels } = list, [currentPage, setCurrentPage] = useState4(1), [showAbstract, setShowAbstract] = useState4(!1), pubs = useMemo(
    () => news_default.news.filter((item) => item.type === "publication"),
    []
  ), totalPages = Math.max(1, Math.ceil(pubs.length / PER_PAGE)), page = Math.min(currentPage, totalPages), shown = pubs.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  return /* @__PURE__ */ jsxs15(PageLayout, { menu: "manuPaper", children: [
    /* @__PURE__ */ jsx19(
      PageHero,
      {
        eyebrow: hero3.eyebrow,
        title: hero3.title,
        lede: hero3.lede,
        image: hero3.image,
        meta: [{ value: String(pubs.length), label: hero3.countLabel }]
      }
    ),
    /* @__PURE__ */ jsxs15("div", { className: "notice", children: [
      /* @__PURE__ */ jsxs15("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx19("circle", { cx: "12", cy: "12", r: "9" }),
        /* @__PURE__ */ jsx19("path", { d: "M12 8h.01M11 12h1v5h1", strokeLinecap: "round" })
      ] }),
      /* @__PURE__ */ jsx19("span", { children: /* @__PURE__ */ jsx19(Md, { children: notice }) })
    ] }),
    /* @__PURE__ */ jsxs15(Section, { eyebrow: list.eyebrow, title: list.title, children: [
      /* @__PURE__ */ jsxs15("div", { className: "toolbar", children: [
        /* @__PURE__ */ jsx19("span", { className: "toolbar__label", children: fill(list.toolbar, { count: pubs.length, page, pages: totalPages }) }),
        /* @__PURE__ */ jsx19(
          "button",
          {
            type: "button",
            className: "toggle-btn",
            "aria-pressed": showAbstract,
            onClick: () => setShowAbstract(!showAbstract),
            children: showAbstract ? list.hideAbstracts : list.showAbstracts
          }
        )
      ] }),
      /* @__PURE__ */ jsx19("ul", { className: "pub-list", children: shown.map((pub, index) => /* @__PURE__ */ jsxs15("li", { className: "pub", children: [
        /* @__PURE__ */ jsx19("h2", { className: "pub__title", children: pub.webpage ? /* @__PURE__ */ jsx19("a", { href: pub.webpage, target: "_blank", rel: "noreferrer", children: pub.title }) : pub.title }),
        /* @__PURE__ */ jsx19("p", { className: "pub__authors", children: pub.author }),
        /* @__PURE__ */ jsxs15("div", { className: "pub__meta", children: [
          pub.journal && /* @__PURE__ */ jsxs15("span", { children: [
            /* @__PURE__ */ jsx19("b", { children: labels.journal }),
            pub.journal
          ] }),
          pub.date && /* @__PURE__ */ jsxs15("span", { children: [
            /* @__PURE__ */ jsx19("b", { children: labels.date }),
            pub.date
          ] }),
          pub.doi && /* @__PURE__ */ jsxs15("span", { children: [
            /* @__PURE__ */ jsx19("b", { children: labels.doi }),
            /* @__PURE__ */ jsx19("a", { href: pub.webpage, target: "_blank", rel: "noreferrer", children: pub.doi })
          ] }),
          pub.preprint && /* @__PURE__ */ jsxs15("span", { children: [
            /* @__PURE__ */ jsx19("b", { children: labels.preprint }),
            /* @__PURE__ */ jsx19("a", { href: pub.webpage2, target: "_blank", rel: "noreferrer", children: pub.preprint })
          ] }),
          !pub.doi && !pub.preprint && pub.ref && /* @__PURE__ */ jsxs15("span", { children: [
            /* @__PURE__ */ jsx19("b", { children: labels.ref }),
            pub.ref
          ] })
        ] }),
        showAbstract && pub.abstract && /* @__PURE__ */ jsx19("p", { className: "pub__abstract", children: pub.abstract })
      ] }, `${pub.title}-${index}`)) }),
      totalPages > 1 && /* @__PURE__ */ jsx19("div", { className: "pagination-wrap", children: /* @__PURE__ */ jsx19(Pagination, { currentPage: page, totalPages, onPageChange: setCurrentPage }) })
    ] })
  ] });
}, publication_list_default = Index9;

// app/routes/science.galactic.tsx
var science_galactic_exports = {};
__export(science_galactic_exports, {
  default: () => science_galactic_default,
  meta: () => meta10
});
import { jsx as jsx20 } from "react/jsx-runtime";
var meta10 = () => topicMeta("galactic"), Index10 = () => /* @__PURE__ */ jsx20(ScienceTopic, { id: "galactic" }), science_galactic_default = Index10;

// app/routes/science.galaxies.tsx
var science_galaxies_exports = {};
__export(science_galaxies_exports, {
  default: () => science_galaxies_default,
  meta: () => meta11
});
import { jsx as jsx21 } from "react/jsx-runtime";
var meta11 = () => topicMeta("galaxies"), Index11 = () => /* @__PURE__ */ jsx21(ScienceTopic, { id: "galaxies" }), science_galaxies_default = Index11;

// app/routes/science.overview.tsx
var science_overview_exports = {};
__export(science_overview_exports, {
  default: () => science_overview_default,
  meta: () => meta12
});
import { Link as Link8 } from "@remix-run/react";

// app/content/pages/science/overview.json
var overview_default2 = {
  meta: {
    title: "Science \xB7 7-Dimensional Telescope",
    description: "What 7DS is built to measure: spectral mapping and the time domain, and the science themes that follow from them."
  },
  hero: {
    eyebrow: "Science",
    title: "Motivation",
    lede: "7DS measures two things a conventional survey does not measure together: the spectrum of every source in the field, and how that spectrum changes with time.",
    image: "/img/hero/science.jpg",
    meta: [
      {
        value: "30\u201370",
        label: "Spectral resolution R"
      },
      {
        value: "375\u2013875",
        unit: "nm",
        label: "Wavelength range"
      },
      {
        value: "1",
        unit: "d",
        label: "Fastest cadence"
      }
    ]
  },
  spectral: {
    eyebrow: "Spectral mapping",
    title: "A spectrum for every source in the field",
    body: [
      "Two capabilities define what 7DS can answer. The first is spectral mapping: every visit samples the spectrum of every source in the field at R = 30-70 across 375 to 875 nm. That is coarse compared with a spectrograph, but it resolves the 4000 Angstrom break, strong emission lines and broad continuum features, and it applies to every object in 1.25 square degrees at once rather than to the few that fit on a slit.",
      "The practical consequence is that classification does not depend on follow-up. A source detected in a 7DS image already carries the information needed to estimate a photometric redshift, separate a quasar from a star, or distinguish a kilonova from the supernovae and detector artifacts that outnumber it \u2014 at the moment of detection, for every object in 1.25 square degrees. The filter set that makes this possible, and which bands exist on a given tile, are described under [status and overview](/users/status)."
    ]
  },
  time: {
    eyebrow: "Time domain",
    title: "Repeating the measurement",
    body: [
      "The second is the time domain. Because the spectral measurement is made by imaging, it can be repeated: the same field is revisited on cadences from one night to two weeks, so what is measured is not a spectrum but its evolution. Questions that need both at once \u2014 what a transient is while it is still bright, how an active galactic nucleus responds to its own variability, how a young star changes from night to night \u2014 are the ones this survey is built for.",
      "The three surveys exist to put that repetition at different cadences: one visit everywhere, a revisit every 10 to 14 days over a smaller area, and nightly observation of a single deep field. Which cadence a question needs is what determines which survey serves it \u2014 set out under [survey design](/survey/overview)."
    ]
  },
  reach: {
    eyebrow: "Reach",
    title: "What the questions require",
    body: [
      "Spectral information is only useful as far out as the survey can detect a source, and the depth reached at each wavelength is what decides which of the questions below are answerable. Sampling the spectrum in many narrow steps costs depth per band relative to a broadband survey of the same aperture, and the survey design trades that against the three cadences.",
      "The comparison below also shows why 7DS and SPHEREx are complementary rather than redundant: they reach similar depth over overlapping wavelengths, but 7DS resolves the sky roughly ten times more finely, so a 7DS pixel is a measurement of one source where a SPHEREx pixel is a blend of several. Measured per-band depths for the current filter set are on the [performance page](/users/performance)."
    ],
    figure: {
      src: "/img/science/survey-depth.jpg",
      alt: "Five-sigma depth against wavelength for 7DT single exposures, the wide-area time-domain survey and the intensive monitoring survey, compared with SPHEREx, Pan-STARRS 1 and SkyMapper",
      label: "Depth against wavelength",
      caption: "5\u03C3 depth for a single 7DT exposure and for the accumulated wide-area and intensive-monitoring surveys, against SPHEREx, Pan-STARRS 1 and SkyMapper. 7DS covers the optical at medium-band resolution where SPHEREx continues into the infrared."
    }
  },
  program: {
    eyebrow: "Program",
    title: "Seven science themes",
    body: "Each theme below draws on the same data product: a medium-band spectral energy distribution for every source in the field, measured repeatedly.",
    button: {
      label: "Publications",
      href: "/publication/list"
    }
  }
};

// app/routes/science.overview.tsx
import { jsx as jsx22, jsxs as jsxs16 } from "react/jsx-runtime";
var meta12 = () => metaOf(overview_default2), Index12 = () => {
  let { hero: hero3, spectral, time: time2, reach, program } = overview_default2;
  return /* @__PURE__ */ jsxs16(PageLayout, { menu: "manuScience", rail: !0, children: [
    /* @__PURE__ */ jsx22(
      PageHero,
      {
        eyebrow: hero3.eyebrow,
        title: hero3.title,
        lede: hero3.lede,
        image: hero3.image,
        meta: hero3.meta
      }
    ),
    /* @__PURE__ */ jsx22(Section, { eyebrow: spectral.eyebrow, title: spectral.title, children: /* @__PURE__ */ jsx22(Paras, { className: "prose", children: spectral.body }) }),
    /* @__PURE__ */ jsx22(Section, { eyebrow: time2.eyebrow, title: time2.title, alt: !0, children: /* @__PURE__ */ jsx22(Paras, { className: "prose", children: time2.body }) }),
    /* @__PURE__ */ jsxs16(Section, { eyebrow: reach.eyebrow, title: reach.title, children: [
      /* @__PURE__ */ jsx22("div", { className: "prose", children: /* @__PURE__ */ jsx22(Paras, { children: reach.body }) }),
      /* @__PURE__ */ jsx22("div", { style: { marginTop: "2.5rem" }, children: /* @__PURE__ */ jsx22(ContentFigure, { fig: reach.figure }) })
    ] }),
    /* @__PURE__ */ jsxs16(Section, { eyebrow: program.eyebrow, title: program.title, alt: !0, children: [
      /* @__PURE__ */ jsx22("p", { className: "prose", children: /* @__PURE__ */ jsx22(Md, { children: program.body }) }),
      /* @__PURE__ */ jsx22("div", { className: "grid grid-cols-2", style: { marginTop: "2rem" }, children: science_default.themes.map((theme) => /* @__PURE__ */ jsxs16(Link8, { className: "theme-card", to: `/science/${theme.id}`, children: [
        /* @__PURE__ */ jsx22("span", { className: "theme-card__index", children: theme.n }),
        /* @__PURE__ */ jsx22("h3", { className: "theme-card__title", children: theme.title }),
        /* @__PURE__ */ jsx22("p", { className: "theme-card__body", children: theme.question ?? theme.summary })
      ] }, theme.id)) }),
      /* @__PURE__ */ jsx22("div", { className: "btn-row", style: { marginTop: "2rem" }, children: /* @__PURE__ */ jsx22(Link8, { className: "btn btn--secondary", to: program.button.href, children: program.button.label }) })
    ] })
  ] });
}, science_overview_default = Index12;

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
  meta: () => meta13
});
import { Link as Link9 } from "@remix-run/react";

// app/content/pages/survey/overview.json
var overview_default3 = {
  meta: {
    title: "7-Dimensional Sky Survey \xB7 7DT",
    description: "The 7-Dimensional Sky Survey: three surveys covering the southern sky in medium bands, from a single-visit reference map to nightly deep monitoring, on one tiling."
  },
  hero: {
    eyebrow: "Survey",
    title: "The 7-Dimensional *Sky Survey*",
    lede: "7DS is the science program of 7DT. It comprises three surveys that differ in area, cadence and depth, and that share one tiling of the sky.",
    image: "/img/hero/survey.jpg",
    meta: [
      {
        value: "3",
        label: "Surveys"
      },
      {
        value: "23,000",
        unit: "deg\xB2",
        label: "Widest survey"
      },
      {
        value: "1",
        unit: "d",
        label: "Fastest cadence"
      },
      {
        value: "23.6",
        unit: "mag",
        label: "Deepest planned"
      }
    ]
  },
  overview: {
    eyebrow: "Overview",
    title: "Three surveys on one tiling",
    body: "7DS is the science program of 7DT. It comprises three surveys distinguished by area, cadence and depth: the Reference Imaging Survey (RIS), the Wide-area Time-domain Survey (WTS) and the Intensive Monitoring Survey (IMS). Across the three, area decreases and depth increases \u2014 from a single visit to the whole southern sky, to nightly observation of one field \u2014 while all three use the same instrument and the same tiling.",
    table: {
      caption: "Design parameters of the three surveys",
      corner: "Property",
      rows: {
        area: "Survey area",
        region: "Target region",
        cadence: "Cadence",
        depth: "Depth",
        statusLabel: "Status"
      }
    },
    footnote: "Depths are 5\u03C3 point-source limits in the m600 band. The RIS figure is the depth of one visit (3 \xD7 100 s); the WTS and IMS figures are cumulative over the planned five-year operation. Measured performance is reported on the [performance page](/users/performance), and current progress on each survey page."
  },
  tiling: {
    eyebrow: "Tiling",
    title: "One tile pattern for the whole program",
    body: [
      "All 7DS observations use a common set of fixed pointings, generated from a HEALPix pixelization of the celestial sphere. Adjacent pointings overlap by about 5 arcminutes in right ascension and 4 arcminutes in declination near the celestial equator, and by more toward the poles. Tiles are numbered T00000 to T28519 in order of increasing declination, covering everything accessible to the array from the south celestial pole to +30 degrees.",
      "This tiling is the operational reference for the whole program. WTS and IMS point at the same tile centers, and target-of-opportunity observations use them wherever the field allows. Because all three surveys share it, data from any of them coadd directly with data from the others and difference imaging always runs against a consistent reference. A visit is three consecutive 100-second exposures coadded to a 300-second frame; the exposure length is set by the unguided tracking capability of the mount and the read noise of the detector."
    ],
    table: {
      caption: "Tiling and exposure",
      rows: [
        [
          "Tile centers",
          "HEALPix pixelization of the celestial sphere"
        ],
        [
          "Tile numbering",
          "T00000 \u2013 T28519, by increasing declination"
        ],
        [
          "Sky coverage",
          "South celestial pole to Dec +30\xB0"
        ],
        [
          "Overlap near equator",
          "\u2248 5\u2032 in right ascension, 4\u2032 in declination"
        ],
        [
          "Standard visit",
          "3 \xD7 100 s, coadded to 300 s"
        ],
        [
          "Field of view per tile",
          "1.34\xB0 \xD7 0.90\xB0, 1.25 deg\xB2"
        ]
      ]
    }
  },
  rationale: {
    eyebrow: "Rationale",
    title: "Why three surveys and not one",
    note: "Each survey page carries its own strategy, sky map, coverage and current status."
  }
};

// app/routes/survey.overview.tsx
import { jsx as jsx23, jsxs as jsxs17 } from "react/jsx-runtime";
var meta13 = () => metaOf(overview_default3), pageOf = (tier4) => `/survey/${tier4.code.toLowerCase()}`, Index13 = () => {
  let { hero: hero3, overview, tiling, rationale } = overview_default3, rows = Object.entries(overview.table.rows);
  return /* @__PURE__ */ jsxs17(PageLayout, { menu: "manu7ds", children: [
    /* @__PURE__ */ jsx23(
      PageHero,
      {
        eyebrow: hero3.eyebrow,
        title: /* @__PURE__ */ jsx23(Md, { children: hero3.title }),
        lede: hero3.lede,
        image: hero3.image,
        meta: hero3.meta
      }
    ),
    /* @__PURE__ */ jsxs17(Section, { eyebrow: overview.eyebrow, title: overview.title, children: [
      /* @__PURE__ */ jsx23("p", { className: "prose", children: /* @__PURE__ */ jsx23(Md, { children: overview.body }) }),
      /* @__PURE__ */ jsx23("div", { className: "table-wrap", style: { marginTop: "2rem" }, children: /* @__PURE__ */ jsxs17("table", { className: "tier-table", children: [
        /* @__PURE__ */ jsx23("caption", { children: overview.table.caption }),
        /* @__PURE__ */ jsx23("thead", { children: /* @__PURE__ */ jsxs17("tr", { children: [
          /* @__PURE__ */ jsx23("th", { scope: "col", children: overview.table.corner }),
          surveys_default.tiers.map((tier4) => /* @__PURE__ */ jsx23("th", { scope: "col", children: /* @__PURE__ */ jsx23(Link9, { to: pageOf(tier4), children: tier4.code }) }, tier4.code))
        ] }) }),
        /* @__PURE__ */ jsx23("tbody", { children: rows.map(([field, label]) => /* @__PURE__ */ jsxs17("tr", { children: [
          /* @__PURE__ */ jsx23("th", { scope: "row", children: label }),
          surveys_default.tiers.map((tier4) => /* @__PURE__ */ jsx23("td", { children: String(tier4[field]) }, tier4.code))
        ] }, String(field))) })
      ] }) }),
      /* @__PURE__ */ jsx23("p", { className: "footnote", style: { marginTop: "0.75rem" }, children: /* @__PURE__ */ jsx23(Md, { children: overview.footnote }) })
    ] }),
    /* @__PURE__ */ jsx23(Section, { eyebrow: tiling.eyebrow, title: tiling.title, alt: !0, children: /* @__PURE__ */ jsxs17("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsx23("div", { children: /* @__PURE__ */ jsx23(Paras, { className: "prose", children: tiling.body }) }),
      /* @__PURE__ */ jsx23("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs17("table", { className: "spec-table", children: [
        /* @__PURE__ */ jsx23("caption", { children: tiling.table.caption }),
        /* @__PURE__ */ jsx23("tbody", { children: tiling.table.rows.map((row) => /* @__PURE__ */ jsxs17("tr", { children: [
          /* @__PURE__ */ jsx23("th", { scope: "row", children: row[0] }),
          /* @__PURE__ */ jsx23("td", { children: row[1] })
        ] }, row[0])) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs17(Section, { eyebrow: rationale.eyebrow, title: rationale.title, children: [
      /* @__PURE__ */ jsx23("p", { className: "prose", children: /* @__PURE__ */ jsx23(Md, { children: surveys_default.designNote }) }),
      /* @__PURE__ */ jsx23("div", { className: "grid grid-cols-3", style: { marginTop: "2rem" }, children: surveys_default.tiers.map((tier4) => /* @__PURE__ */ jsxs17(Link9, { className: "tier-card tier-card--link", to: pageOf(tier4), children: [
        /* @__PURE__ */ jsx23("span", { className: "tier-card__code", children: tier4.code }),
        /* @__PURE__ */ jsx23("h3", { className: "tier-card__name", children: tier4.name }),
        /* @__PURE__ */ jsx23("p", { className: "rationale__tradeoff", style: { marginBottom: "0.75rem" }, children: tier4.tradeoff }),
        /* @__PURE__ */ jsx23("p", { className: "tier-card__note", children: tier4.goal }),
        /* @__PURE__ */ jsx23("span", { className: `pill pill--${tier4.status}`, children: tier4.statusLabel })
      ] }, tier4.code)) }),
      /* @__PURE__ */ jsx23("p", { className: "note", style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsx23(Md, { children: rationale.note }) })
    ] })
  ] });
}, survey_overview_default = Index13;

// app/routes/telescope.mode.tsx
var telescope_mode_exports = {};
__export(telescope_mode_exports, {
  loader: () => loader2
});
import { redirect as redirect2 } from "@remix-run/node";
function loader2() {
  return redirect2("/users/propose", 301);
}

// app/routes/users.overview.tsx
var users_overview_exports = {};
__export(users_overview_exports, {
  loader: () => loader3
});
import { redirect as redirect3 } from "@remix-run/node";
function loader3() {
  return redirect3("/users/performance", 301);
}

// app/routes/users.software.tsx
var users_software_exports = {};
__export(users_software_exports, {
  default: () => users_software_default,
  meta: () => meta14
});

// app/content/pages/users/software.json
var software_default = {
  meta: {
    title: "Software \xB7 7DT for users",
    description: "Software available to 7DT users: supy for analysis, Py7DT for reprocessing, and the operational systems that produce the data."
  },
  hero: {
    eyebrow: "For users",
    title: "Software",
    lede: "What to install to plan an observation or work with 7DT data, and what produced the data in the first place.",
    image: "/img/hero/computer.jpg"
  },
  packages: {
    eyebrow: "Start here",
    title: "The three packages",
    caption: "What each one is for",
    columns: [
      "Package",
      "What it does",
      "Who installs it"
    ],
    rows: [
      {
        name: "[supy](#supy)",
        what: "Target visibility from El Sauce, tile lookup by coordinate, and filter and detector response simulation for the 7DT bands.",
        who: "Anyone planning an observation or interpreting a band"
      },
      {
        name: "[Py7DT](#py7dt)",
        what: "The reduction pipeline: preprocessing, astrometry, photometric calibration, coaddition and difference imaging, at survey throughput.",
        who: "Anyone reprocessing data rather than using the products"
      },
      {
        name: "uniphot",
        what: "Not yet described here. It is not in the project\u2019s public GitHub organization, and this page will carry it once its purpose and repository are confirmed.",
        who: "\u2014"
      }
    ]
  },
  supy: {
    id: "supy",
    eyebrow: "Analysis",
    title: "supy",
    body: [
      "`supy` is a collection of Python utilities for members and users of the 7DT survey. It covers the tasks that come up before and after an observation rather than the reduction itself: working out whether a target is observable, finding which tiles cover a position or a gravitational-wave localization region, and simulating the response of the filter set.",
      "It is installed from source. Documentation, including worked examples for each module, is published at `sdt-supy.readthedocs.io`."
    ],
    install: {
      title: "Install",
      lines: [
        "git clone https://github.com/7DimensionalTelescope/supy.git",
        "cd supy",
        "pip install ."
      ]
    },
    buttons: [
      {
        label: "Documentation",
        href: "https://sdt-supy.readthedocs.io/en/latest/"
      },
      {
        label: "Source",
        href: "https://github.com/7DimensionalTelescope/supy"
      }
    ],
    modules: {
      caption: "Modules",
      rows: [
        [
          "Observer",
          "Target visibility and altitude from El Sauce, including StarAlt-style plots"
        ],
        [
          "Tiles",
          "Tile lookup by coordinate, matching against a localization region, and tile plotting"
        ],
        [
          "Simulator",
          "Filter and detector response simulation for the 7DT bands"
        ],
        [
          "const",
          "Instrument and site constants used by the other modules"
        ]
      ]
    }
  },
  py7dt: {
    id: "py7dt",
    eyebrow: "Reprocessing",
    title: "Py7DT: running the pipeline yourself",
    body: "Beyond its pipeline role, Py7DT is structured for offline reuse. Researchers inside and outside the 7DT team can run the same codebase to reprocess data with custom configurations, resuming from any stage of the reduction, and choose for themselves how far to trust the standard products. Images are passed through the pipeline as string paths with metadata in FITS headers and YAML files, rather than wrapped in a bespoke data model, which keeps products inspectable outside the pipeline and lowers the cost of learning to process 7DT data.",
    notes: [
      "Py7DT uses a rolling-release version scheme in which the last digit is incremented whenever a scientific decision changes how data are processed. That version is recorded in every configuration file and in the process status database, so any product can be traced to the code that made it and reprocessed in bulk when the code changes. What a reduced file contains, keyword by keyword, is on the [data format page](/users/format).",
      "The full technical description is in Hyun et al., _Py7DT: Data Reduction Pipeline of the 7-Dimensional Telescope_ (Proc. SPIE 14155-12) \u2014 see [publications](/publication/list)."
    ]
  }
};

// app/routes/users.software.tsx
import { jsx as jsx24, jsxs as jsxs18 } from "react/jsx-runtime";
var meta14 = () => metaOf(software_default), Index14 = () => {
  let { hero: hero3, packages, supy, py7dt } = software_default;
  return /* @__PURE__ */ jsxs18(PageLayout, { menu: "manuUsers", children: [
    /* @__PURE__ */ jsx24(PageHero, { eyebrow: hero3.eyebrow, title: hero3.title, lede: hero3.lede, image: hero3.image }),
    /* @__PURE__ */ jsx24(Section, { eyebrow: packages.eyebrow, title: packages.title, children: /* @__PURE__ */ jsx24("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs18("table", { className: "spec-table", children: [
      /* @__PURE__ */ jsx24("caption", { children: packages.caption }),
      /* @__PURE__ */ jsx24("thead", { children: /* @__PURE__ */ jsx24("tr", { children: packages.columns.map((col) => /* @__PURE__ */ jsx24("th", { scope: "col", children: col }, col)) }) }),
      /* @__PURE__ */ jsx24("tbody", { children: packages.rows.map((row) => /* @__PURE__ */ jsxs18("tr", { children: [
        /* @__PURE__ */ jsx24("th", { scope: "row", children: /* @__PURE__ */ jsx24(Md, { children: row.name }) }),
        /* @__PURE__ */ jsx24("td", { children: /* @__PURE__ */ jsx24(Md, { children: row.what }) }),
        /* @__PURE__ */ jsx24("td", { children: /* @__PURE__ */ jsx24(Md, { children: row.who }) })
      ] }, row.name)) })
    ] }) }) }),
    /* @__PURE__ */ jsx24(Section, { id: supy.id, eyebrow: supy.eyebrow, title: supy.title, children: /* @__PURE__ */ jsxs18("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsxs18("div", { children: [
        /* @__PURE__ */ jsx24(Paras, { className: "prose", children: supy.body }),
        /* @__PURE__ */ jsxs18("div", { className: "panel panel--alt", style: { marginTop: "1.5rem" }, children: [
          /* @__PURE__ */ jsx24("div", { className: "panel__title", children: supy.install.title }),
          /* @__PURE__ */ jsx24(
            "pre",
            {
              style: {
                margin: 0,
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                lineHeight: 1.7,
                overflowX: "auto"
              },
              children: /* @__PURE__ */ jsx24("code", { children: supy.install.lines.join(`
`) })
            }
          )
        ] }),
        /* @__PURE__ */ jsx24(ButtonRow, { buttons: supy.buttons, style: { marginTop: "1.25rem" } })
      ] }),
      /* @__PURE__ */ jsx24("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs18("table", { className: "spec-table", children: [
        /* @__PURE__ */ jsx24("caption", { children: supy.modules.caption }),
        /* @__PURE__ */ jsx24("tbody", { children: supy.modules.rows.map((row) => /* @__PURE__ */ jsxs18("tr", { children: [
          /* @__PURE__ */ jsx24("th", { scope: "row", style: { fontFamily: "var(--font-mono)" }, children: row[0] }),
          /* @__PURE__ */ jsx24("td", { children: /* @__PURE__ */ jsx24(Md, { children: row[1] }) })
        ] }, row[0])) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs18(Section, { id: py7dt.id, eyebrow: py7dt.eyebrow, title: py7dt.title, alt: !0, children: [
      /* @__PURE__ */ jsx24("p", { className: "prose", children: /* @__PURE__ */ jsx24(Md, { children: py7dt.body }) }),
      /* @__PURE__ */ jsx24(Paras, { className: "note", style: { marginTop: "1rem" }, children: py7dt.notes })
    ] })
  ] });
}, users_software_default = Index14;

// app/routes/about.funding.tsx
var about_funding_exports = {};
__export(about_funding_exports, {
  default: () => about_funding_default,
  meta: () => meta15
});

// app/content/pages/about/funding.json
var funding_default = {
  meta: {
    title: "Funding \xB7 7-Dimensional Telescope",
    description: "Grants and institutions supporting the 7-Dimensional Telescope and Sky Survey."
  },
  hero: {
    eyebrow: "About",
    title: "Funding sources",
    lede: "The bodies that fund the facility, its operation, and the network that carries its data.",
    image: "/img/hero/about.jpg"
  },
  host: {
    eyebrow: "Host center",
    title: "Center for the Gravitational-wave Universe",
    body: "The 7-Dimensional Telescope is designed, built and operated by the Center for the Gravitational-wave Universe at Seoul National University. The Center is supported by National Research Foundation of Korea (MSIT).",
    logo: {
      src: "/img/institutes/gwuniv.png",
      alt: "Center for the Gravitational-wave Universe"
    }
  },
  agencies: {
    eyebrow: "Agencies",
    title: "Project support",
    body: [
      "Further project support is provided by the National Research Foundation of Korea (MSIT). Several members of the collaboration are additionally supported by individual NRF awards; those grants support the researchers rather than the facility, and are acknowledged in their own papers.",
      "7DT is operated in part with support from special funding of the Korea Astronomy and Space Science Institute (KASI)."
    ],
    logo: {
      src: "/img/institutes/nrf.jpg",
      alt: "National Research Foundation of Korea"
    }
  },
  network: {
    eyebrow: "Infrastructure",
    title: "KREONET / KISTI",
    body: "Nightly transfer of roughly 350 GB of raw data from Chile to the processing facility in Seoul is carried by KREONET, the Korea Research Environment Open NETwork, operated by KISTI, the Korea Institute of Science and Technology Information. The 7DT project gratefully acknowledges this support, without which same-day reduction of survey and target-of-opportunity data would not be possible."
  }
};

// app/routes/about.funding.tsx
import { jsx as jsx25, jsxs as jsxs19 } from "react/jsx-runtime";
var meta15 = () => metaOf(funding_default), Logo = ({ logo }) => /* @__PURE__ */ jsx25("figure", { className: "figure", children: /* @__PURE__ */ jsx25(
  "img",
  {
    src: logo.src,
    alt: logo.alt,
    style: { padding: "2rem", background: "#fff" },
    loading: "lazy"
  }
) }), Index15 = () => {
  let { hero: hero3, host, agencies, network } = funding_default;
  return /* @__PURE__ */ jsxs19(PageLayout, { menu: "manuAbout", children: [
    /* @__PURE__ */ jsx25(PageHero, { eyebrow: hero3.eyebrow, title: hero3.title, lede: hero3.lede, image: hero3.image }),
    /* @__PURE__ */ jsx25(Section, { eyebrow: host.eyebrow, title: host.title, children: /* @__PURE__ */ jsxs19("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsx25("p", { className: "prose", children: /* @__PURE__ */ jsx25(Md, { children: host.body }) }),
      /* @__PURE__ */ jsx25(Logo, { logo: host.logo })
    ] }) }),
    /* @__PURE__ */ jsx25(Section, { eyebrow: agencies.eyebrow, title: agencies.title, alt: !0, children: /* @__PURE__ */ jsxs19("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsx25("div", { children: /* @__PURE__ */ jsx25(Paras, { className: "prose", children: agencies.body }) }),
      /* @__PURE__ */ jsx25(Logo, { logo: agencies.logo })
    ] }) }),
    /* @__PURE__ */ jsx25(Section, { eyebrow: network.eyebrow, title: network.title, children: /* @__PURE__ */ jsx25("p", { className: "prose", children: /* @__PURE__ */ jsx25(Md, { children: network.body }) }) })
  ] });
}, about_funding_default = Index15;

// app/routes/science.solar.tsx
var science_solar_exports = {};
__export(science_solar_exports, {
  default: () => science_solar_default,
  meta: () => meta16
});
import { jsx as jsx26 } from "react/jsx-runtime";
var meta16 = () => topicMeta("solar"), Index16 = () => /* @__PURE__ */ jsx26(ScienceTopic, { id: "solar" }), science_solar_default = Index16;

// app/routes/survey.design.tsx
var survey_design_exports = {};
__export(survey_design_exports, {
  loader: () => loader4
});
import { redirect as redirect4 } from "@remix-run/node";
function loader4() {
  return redirect4("/survey/overview", 301);
}

// app/routes/survey.status.tsx
var survey_status_exports = {};
__export(survey_status_exports, {
  loader: () => loader5
});
import { redirect as redirect5 } from "@remix-run/node";
function loader5() {
  return redirect5("/users/status", 301);
}

// app/routes/users.propose.tsx
var users_propose_exports = {};
__export(users_propose_exports, {
  default: () => users_propose_default,
  meta: () => meta17
});

// app/content/pages/users/propose.json
var propose_default = {
  meta: {
    title: "How to propose \xB7 7DT for users",
    description: "Who may propose for 7DT time, how much is available and when: team membership through the science working groups, the KASI and KAS allocations, the data policy, and how an observation is specified."
  },
  hero: {
    eyebrow: "For users",
    title: "How to *Propose*",
    lede: "Who may ask for time on 7DT, how much of it there is, and what the array can be asked to do with it.",
    image: "/img/hero/telescope.jpg"
  },
  general: {
    id: "general",
    eyebrow: "Before you start",
    title: "General information",
    openCall: {
      id: "open-call",
      title: "The open call",
      body: "Proposals are being accepted for observations between {call.observingPeriod}. The deadline is **{call.deadline}**, {call.deadlineNote}. The dates, the documents to download and the rules that apply to this particular call are on the [call for proposals](/users/call) page. This page is about writing the proposal, and does not change between calls.",
      buttons: [
        {
          label: "Dates and documents",
          href: "/users/call"
        },
        {
          label: "Proposal Form",
          href: "/proposal/7DT_Phase1_Proposal_Form.docx"
        }
      ]
    },
    who: {
      id: "who",
      title: "Who may propose",
      body: [
        "The 7DS team is being formally constituted. Anyone taking part in a 7DS Science Working Group becomes a member of the team automatically, without having to ask \u2014 opting out is the action that requires notice, not joining. The working groups follow the [seven science themes](/science/overview).",
        "Team membership carries two rights. The first is early access to 7DS data during its proprietary period, before it is released more widely. The second is the right to propose an independent observing program of your own on 7DT, rather than working only from what the surveys happen to collect."
      ]
    },
    time: {
      id: "time",
      title: "Time available, and when",
      rail: "Time available",
      body: [
        "Two hundred hours of 7DT time are allocated to the Korea Astronomy and Space Science Institute, and a further two hundred hours to the Korean Astronomical Society \u2014 four hundred hours in total. How a proposal is assigned to a pool and reviewed is set by each call, and is given in its [Call for Proposals](/users/call). This is time on the array outside the three surveys, which otherwise occupy the night.",
        "The current call, its dates and its documents are on the [call for proposals](/users/call) page. The [observation calculators](/users/links#calculators) are available for costing a program. Target-of-opportunity requests are handled separately and continuously, and do not wait for a call."
      ]
    },
    dataRights: {
      id: "data-rights",
      title: "Data rights and authorship",
      body: [
        "Data taken for the surveys and for approved programs carry a proprietary period during which they are available to the 7DS team before wider release. Team membership is what grants that access, which is the practical reason the working groups matter as much as the allocations do.",
        "Any paper, conference contribution, thesis or other public output that uses 7DT data not yet in a 7DS public release must include the core members of the 7DS team as co-authors. They are named in the [Call for Proposals](/proposal/7DT_Call_for_Proposals.docx), along with the reference to cite and the acknowledgment to include. Anyone intending to publish is asked to contact the principal investigator first, so that authors and acknowledgments are agreed before submission rather than after.",
        "The wider publication policy of the 7DS collaboration \u2014 the public release schedule among it \u2014 is being finalized, and will be posted under [publication policy](/publication/policy) once ratified."
      ]
    }
  },
  guidelines: {
    id: "guidelines",
    eyebrow: "Writing",
    title: "Guidelines",
    intro: "A request is a program type, an observation mode, a target or an area, the exposures that reach the signal-to-noise the science needs, and the constraints under which the array may take them. Positions on the survey tiling are preferred wherever the science allows: data taken on a tile coadd directly with the survey data already there, and difference against the existing reference image without a separate calibration step.",
    programType: {
      id: "program-type",
      title: "Program type",
      caption: "Program types",
      types: [
        {
          code: "ToO",
          name: "Target of opportunity",
          body: "Observations triggered by an unpredictable event \u2014 a gamma-ray burst, a gravitational-wave counterpart, a newly discovered supernova. The trigger condition is described in prose; the response time is a separate field."
        },
        {
          code: "Target",
          name: "Pre-selected targets",
          body: "One or more targets observed on a planned schedule. A custom tiling may be used. Every target has to be listed with its coordinates \u2014 a representative subset is not enough, since each is judged on its own visibility and priority."
        },
        {
          code: "Survey",
          name: "Wide area or many tiles",
          body: "Systematic coverage of an area. Carried out on the existing 7DS tiling grid, the same one RIS, WTS and IMS use, rather than a tiling of your own. Give the coordinate range and the area in square degrees rather than a tile list."
        }
      ]
    },
    observationMode: {
      id: "observation-mode",
      title: "Observation mode",
      body: "Because each unit carries its own filter complement, the array can be reconfigured between science goals without changing hardware. The full spectral range is covered by assigning different filter combinations to individual units and rotating through them during an observation. Four modes are in routine use; the choice between them trades spectral sampling, depth and sky coverage against one another."
    },
    beforeYouWrite: {
      id: "before-you-write",
      title: "Before you write",
      body: "Four things are worth settling first, because each of them can make a program unnecessary or unworkable, and all four can be checked from this site.",
      steps: [
        {
          title: "Check the target is observable",
          body: "Visibility from El Sauce in the intended window, and the filter response over the wavelengths that matter, can both be computed with [supy](/users/software), or with the 7DT [Visibility Tool](/visibility)"
        },
        {
          title: "Check what already exists",
          body: "Much of the southern sky already has a medium-band reference image, and the tile under your position may already carry the bands you need. The [data access page](/users/access) reports the bands and frame counts held for any position, and the 7DT [Tile Matcher](/tile) shows which survey tile covers it."
        },
        {
          title: "Estimate depth from measurements, not aperture",
          body: "The measured [limiting magnitudes](/users/performance) per band, for the fiducial 100-second exposure, are what a coadded depth should be scaled from. The 7DT [Exposure Time Calculator](/exptime) uses these same measurements to compute the exposure needed for a target SNR, or the SNR for a given exposure."
        },
        {
          title: "Calculate the total observing time",
          body: "Once the exposure time per filter is set, the 7DT [Overhead Calculator](/overhead) adds the per-frame and per-target overheads, such as filter exchange, autofocus, slewing, setup, and readout, to give the total requested hours."
        }
      ]
    },
    technical: {
      id: "technical-justification",
      title: "Technical justification",
      caption: "Fields of the Phase 1 form",
      columns: [
        "Field",
        "What to give"
      ],
      fields: [
        {
          field: "Total requested hours",
          what: "The whole request, overheads included \u2014 slewing, filter changes, readout \u2014 not time on source. The [overhead calculator](/overhead) gives the difference."
        },
        {
          field: "Minimum acceptable hours",
          what: "The smallest allocation that still meets the core objective. Used when a partial allocation is considered."
        },
        {
          field: "Program type",
          what: "ToO, Target or Survey, as above."
        },
        {
          field: "Observation mode",
          what: "Spec, Deep, Color or Search. More than one may be listed, with the time allocated to each explained."
        },
        {
          field: "Proprietary period",
          what: "None, 12 months or 18 months, counted from the date the data products are delivered rather than from the observation."
        },
        {
          field: "Observing window",
          what: "Any constraint on when the observations may happen \u2014 a seasonal visibility window, coordination with another facility, a deadline for a fading object. \u201CNone\u201D if there is none. The [visibility calculator](/visibility) gives the window a target actually has."
        },
        {
          field: "Moon phase",
          what: "Dark, gray or bright; more than one if the program tolerates a range."
        },
        {
          field: "Required response time",
          what: "ToO programs only: the longest acceptable delay between trigger and the start of observation."
        },
        {
          field: "Exposure time justification",
          what: "The exposure per target or tile and how it was derived, the target signal-to-noise and the calculation or calculator used to reach it, the filters and the time on each, and the arithmetic that adds up to the total requested hours. The [exposure calculator](/exptime) works in either direction."
        },
        {
          field: "Target coordinates",
          what: "Target programs: every target in RA and Dec, J2000. Survey programs: the coordinate range and the area in deg\xB2. The [tile matcher](/tile) shows which tiles cover a position, and how they overlap."
        },
        {
          field: "Duplication with existing 7DS data",
          what: "Whether the targets or area overlap [RIS](/survey/ris), [IMS](/survey/ims) or [WTS](/survey/wts). \u201CNone\u201D, or why the existing data are not sufficient \u2014 greater depth, a different cadence, a different filter set. What exists on a given tile is on the [status page](/users/status)."
        }
      ],
      body: "Two limits shape the exposure time before the science does. A single frame should be at least 100 seconds, which is what it takes to reach background-limited conditions, and no more than 180, beyond which tracking accuracy starts to elongate the PSF. Depth comes from taking frames in series, not from lengthening one. Bright targets can use shorter frames at the cost of more overhead, and any frame time other than 100 seconds adds overhead for its own calibration frames. Survey observations use 100 seconds as standard.",
      footnote: "Of the observing conditions, only Moon phase can be requested \u2014 seeing and cloud cover cannot be specified, though observations are made under nominal conditions wherever possible. A unit may also be out of service on the night, in which case the delivered data lack whatever that telescope was carrying."
    }
  }
};

// app/components/obsmodes.tsx
import { useState as useState5 } from "react";

// app/data/obsmodes.json
var obsmodes_default = { note: "Generated by scripts/snapshot_obsmodes.py from the live TCSpy configuration and the 7DT_calculator transmission curves. Do not edit by hand; re-run the script.", units: ["7DT01", "7DT02", "7DT03", "7DT04", "7DT05", "7DT06", "7DT07", "7DT08", "7DT09", "7DT10", "7DT11", "7DT12", "7DT13", "7DT14", "7DT15", "7DT16"], modes: [{ key: "spec", name: "Spec", source: "20260523/specall.specmode", fields: 1, example: !1, units: { "7DT01": ["m650", "m769w"], "7DT02": ["m675", "m832w"], "7DT03": ["m700", "r"], "7DT04": ["m725", "m438"], "7DT05": ["m750", "m483"], "7DT06": ["m775", "m512"], "7DT07": ["m800", "m534"], "7DT08": ["m825", "m561"], "7DT09": ["m850", "m586"], "7DT10": ["m875", "m615"], "7DT11": ["m500", "m640"], "7DT12": ["m525", "m661"], "7DT13": ["m400", "m550"], "7DT14": ["m425", "m575"], "7DT15": ["m450", "m600"], "7DT16": ["m475", "m625"] }, note: "Every unit takes its first filter, then its second: two sets of sixteen, one after the other." }, { key: "deep", name: "Deep", source: "example", fields: 1, example: !0, units: { "7DT01": ["r"], "7DT02": ["r"], "7DT03": ["r"], "7DT04": ["r"], "7DT05": ["r"], "7DT06": ["r"], "7DT07": ["r"], "7DT08": ["r"], "7DT09": ["r"], "7DT10": ["r"], "7DT11": ["r"], "7DT12": ["r"], "7DT13": ["r"], "7DT14": ["r"], "7DT15": ["r"], "7DT16": ["r"] }, note: "Example: all sixteen units through r on one field \u2014 the light grasp of a single 2-m aperture. The proposer chooses the filter." }, { key: "color", name: "Color", source: "20260227/gri.colormode", fields: 1, example: !1, units: { "7DT01": ["g"], "7DT02": ["g"], "7DT03": ["g"], "7DT04": ["g"], "7DT05": ["g"], "7DT06": ["r"], "7DT07": ["r"], "7DT08": ["r"], "7DT09": ["r"], "7DT10": ["r"], "7DT11": ["i"], "7DT12": ["i"], "7DT13": ["i"], "7DT14": ["i"], "7DT15": ["i"], "7DT16": ["i"] }, note: "The gri combination: the array split across three broad bands on one field, for simultaneous colors." }, { key: "search", name: "Search", source: "example", fields: 16, example: !0, units: { "7DT01": ["r"], "7DT02": ["r"], "7DT03": ["r"], "7DT04": ["r"], "7DT05": ["r"], "7DT06": ["r"], "7DT07": ["r"], "7DT08": ["r"], "7DT09": ["r"], "7DT10": ["r"], "7DT11": ["r"], "7DT12": ["r"], "7DT13": ["r"], "7DT14": ["r"], "7DT15": ["r"], "7DT16": ["r"] }, note: "Example: each unit on a different, adjacent field through r, covering sixteen fields in one exposure at single-unit depth." }], curves: { m400: { nm: 400, pts: [[386, 9e-3], [387, 0.053], [388, 0.32], [389, 0.65], [390, 0.666], [391, 0.688], [392, 0.714], [393, 0.73], [394, 0.743], [395, 0.765], [396, 0.777], [397, 0.8], [398, 0.813], [399, 0.835], [400, 0.85], [401, 0.862], [402, 0.877], [403, 0.887], [404, 0.902], [405, 0.915], [406, 0.934], [407, 0.949], [408, 0.966], [409, 0.969], [410, 0.982], [411, 1], [412, 0.872], [413, 0.342], [414, 0.084], [415, 0.023], [416, 7e-3]] }, m425: { nm: 425, pts: [[410, 3e-3], [411, 0.014], [412, 0.108], [413, 0.562], [414, 0.745], [415, 0.758], [416, 0.78], [417, 0.791], [418, 0.803], [419, 0.818], [420, 0.828], [421, 0.845], [422, 0.854], [423, 0.866], [424, 0.877], [425, 0.889], [426, 0.9], [427, 0.91], [428, 0.922], [429, 0.933], [430, 0.937], [431, 0.949], [432, 0.96], [433, 0.973], [434, 0.979], [435, 0.977], [436, 0.996], [437, 0.542], [438, 0.108], [439, 0.023], [440, 5e-3]] }, m438: { nm: 438, pts: [[422, 2e-3], [423, 0.075], [424, 0.758], [425, 0.766], [426, 0.786], [427, 0.796], [428, 0.812], [429, 0.82], [430, 0.824], [431, 0.835], [432, 0.853], [433, 0.861], [434, 0.866], [435, 0.879], [436, 0.887], [437, 0.9], [438, 0.909], [439, 0.915], [440, 0.923], [441, 0.925], [442, 0.937], [443, 0.948], [444, 0.941], [445, 0.943], [446, 0.961], [447, 0.973], [448, 0.973], [449, 0.974], [450, 0.977], [451, 0.976], [452, 0.604], [453, 0.02], [454, 1e-3]] }, m450: { nm: 450, pts: [[433, 5e-3], [434, 0.01], [435, 0.025], [436, 0.064], [437, 0.172], [438, 0.418], [439, 0.722], [440, 0.855], [441, 0.877], [442, 0.881], [443, 0.887], [444, 0.896], [445, 0.901], [446, 0.908], [447, 0.916], [448, 0.921], [449, 0.928], [450, 0.934], [451, 0.941], [452, 0.949], [453, 0.953], [454, 0.961], [455, 0.968], [456, 0.974], [457, 0.982], [458, 0.986], [459, 0.994], [460, 0.999], [461, 0.955], [462, 0.768], [463, 0.45], [464, 0.206], [465, 0.089], [466, 0.039], [467, 0.018], [468, 9e-3]] }, m475: { nm: 475, pts: [[461, 2e-3], [462, 0.028], [463, 0.488], [464, 0.904], [465, 0.908], [466, 0.912], [467, 0.913], [468, 0.918], [469, 0.926], [470, 0.93], [471, 0.929], [472, 0.938], [473, 0.94], [474, 0.945], [475, 0.952], [476, 0.955], [477, 0.961], [478, 0.965], [479, 0.971], [480, 0.979], [481, 0.983], [482, 0.987], [483, 0.979], [484, 0.993], [485, 0.992], [486, 0.992], [487, 0.661], [488, 0.061], [489, 6e-3]] }, g: { nm: 477, pts: [[395, 2e-3], [396, 0.063], [397, 0.298], [398, 0.371], [399, 0.426], [400, 0.439], [401, 0.448], [402, 0.456], [403, 0.464], [404, 0.472], [405, 0.479], [406, 0.487], [407, 0.495], [408, 0.502], [409, 0.509], [410, 0.517], [411, 0.525], [412, 0.533], [413, 0.542], [414, 0.55], [415, 0.559], [416, 0.569], [417, 0.578], [418, 0.586], [419, 0.593], [420, 0.601], [421, 0.611], [422, 0.62], [423, 0.629], [424, 0.636], [425, 0.644], [426, 0.651], [427, 0.659], [428, 0.667], [429, 0.674], [430, 0.682], [431, 0.69], [432, 0.696], [433, 0.703], [434, 0.709], [435, 0.716], [436, 0.722], [437, 0.73], [438, 0.737], [439, 0.744], [440, 0.752], [441, 0.759], [442, 0.764], [443, 0.769], [444, 0.775], [445, 0.78], [446, 0.786], [447, 0.791], [448, 0.797], [449, 0.803], [450, 0.809], [451, 0.815], [452, 0.821], [453, 0.826], [454, 0.832], [455, 0.838], [456, 0.842], [457, 0.848], [458, 0.855], [459, 0.861], [460, 0.866], [461, 0.87], [462, 0.873], [463, 0.876], [464, 0.879], [465, 0.882], [466, 0.886], [467, 0.889], [468, 0.893], [469, 0.897], [470, 0.9], [471, 0.903], [472, 0.907], [473, 0.911], [474, 0.915], [475, 0.92], [476, 0.924], [477, 0.93], [478, 0.936], [479, 0.942], [480, 0.948], [481, 0.953], [482, 0.957], [483, 0.961], [484, 0.964], [485, 0.968], [486, 0.971], [487, 0.974], [488, 0.977], [489, 0.98], [490, 0.984], [491, 0.986], [492, 0.988], [493, 0.989], [494, 0.99], [495, 0.992], [496, 0.994], [497, 0.995], [498, 0.997], [499, 0.999], [500, 1], [501, 0.996], [502, 0.991], [503, 0.985], [504, 0.985], [505, 0.987], [506, 0.993], [507, 0.996], [508, 0.999], [509, 1], [510, 0.999], [511, 0.997], [512, 0.994], [513, 0.993], [514, 0.993], [515, 0.992], [516, 0.991], [517, 0.989], [518, 0.988], [519, 0.986], [520, 0.982], [521, 0.975], [522, 0.969], [523, 0.966], [524, 0.967], [525, 0.968], [526, 0.969], [527, 0.967], [528, 0.966], [529, 0.964], [530, 0.961], [531, 0.956], [532, 0.954], [533, 0.954], [534, 0.953], [535, 0.951], [536, 0.951], [537, 0.951], [538, 0.948], [539, 0.942], [540, 0.933], [541, 0.928], [542, 0.928], [543, 0.931], [544, 0.931], [545, 0.928], [546, 0.917], [547, 0.901], [548, 0.901], [549, 0.694], [550, 0.234], [551, 0.047], [552, 0.011], [553, 3e-3]] }, m483: { nm: 483, pts: [[464, 3e-3], [465, 0.111], [466, 0.867], [467, 0.882], [468, 0.88], [469, 0.889], [470, 0.9], [471, 0.903], [472, 0.91], [473, 0.915], [474, 0.919], [475, 0.923], [476, 0.924], [477, 0.93], [478, 0.937], [479, 0.944], [480, 0.952], [481, 0.956], [482, 0.959], [483, 0.962], [484, 0.966], [485, 0.968], [486, 0.963], [487, 0.965], [488, 0.976], [489, 0.985], [490, 0.987], [491, 0.987], [492, 0.992], [493, 0.996], [494, 0.996], [495, 0.997], [496, 0.994], [497, 1], [498, 0.977], [499, 0.651], [500, 0.028], [501, 2e-3]] }, m500: { nm: 500, pts: [[484, 6e-3], [485, 0.031], [486, 0.213], [487, 0.474], [488, 0.565], [489, 0.77], [490, 0.943], [491, 0.982], [492, 0.981], [493, 0.986], [494, 0.989], [495, 0.992], [496, 0.994], [497, 0.996], [498, 0.996], [499, 0.997], [500, 0.998], [501, 0.996], [502, 0.995], [503, 0.994], [504, 0.994], [505, 0.994], [506, 0.997], [507, 0.998], [508, 1], [509, 0.998], [510, 0.988], [511, 0.933], [512, 0.705], [513, 0.366], [514, 0.175], [515, 0.117], [516, 0.179], [517, 0.115], [518, 6e-3]] }, m512: { nm: 512, pts: [[496, 1e-3], [497, 0.028], [498, 0.646], [499, 0.994], [500, 0.997], [501, 0.99], [502, 0.984], [503, 0.987], [504, 0.994], [505, 0.995], [506, 0.996], [507, 0.994], [508, 0.996], [509, 1], [510, 0.998], [511, 0.999], [512, 1], [513, 0.996], [514, 0.993], [515, 0.993], [516, 0.99], [517, 0.985], [518, 0.986], [519, 0.986], [520, 0.977], [521, 0.971], [522, 0.974], [523, 0.973], [524, 0.97], [525, 0.971], [526, 0.697], [527, 0.056], [528, 4e-3]] }, m525: { nm: 525, pts: [[510, 2e-3], [511, 0.02], [512, 0.216], [513, 0.962], [514, 0.994], [515, 0.998], [516, 0.994], [517, 0.996], [518, 0.996], [519, 0.993], [520, 0.989], [521, 0.99], [522, 0.989], [523, 0.986], [524, 0.983], [525, 0.981], [526, 0.979], [527, 0.977], [528, 0.975], [529, 0.972], [530, 0.97], [531, 0.969], [532, 0.968], [533, 0.961], [534, 0.964], [535, 0.954], [536, 0.947], [537, 0.901], [538, 0.202], [539, 0.023], [540, 4e-3]] }, m534: { nm: 534, pts: [[521, 1e-3], [522, 0.032], [523, 0.893], [524, 0.994], [525, 0.983], [526, 0.998], [527, 1], [528, 0.996], [529, 0.995], [530, 0.993], [531, 0.989], [532, 0.99], [533, 0.99], [534, 0.987], [535, 0.984], [536, 0.984], [537, 0.982], [538, 0.98], [539, 0.981], [540, 0.979], [541, 0.976], [542, 0.967], [543, 0.954], [544, 0.962], [545, 0.581], [546, 0.015], [547, 1e-3]] }, m550: { nm: 550, pts: [[532, 6e-3], [533, 0.011], [534, 0.023], [535, 0.05], [536, 0.108], [537, 0.257], [538, 0.558], [539, 0.848], [540, 0.991], [541, 0.995], [542, 0.992], [543, 0.99], [544, 0.986], [545, 0.988], [546, 0.987], [547, 0.984], [548, 0.978], [549, 0.973], [550, 0.974], [551, 0.973], [552, 0.968], [553, 0.966], [554, 0.969], [555, 0.969], [556, 0.966], [557, 0.965], [558, 0.961], [559, 0.96], [560, 0.928], [561, 0.829], [562, 0.628], [563, 0.36], [564, 0.189], [565, 0.098], [566, 0.048], [567, 0.025], [568, 0.014], [569, 8e-3]] }, m561: { nm: 561, pts: [[550, 1e-3], [551, 0.108], [552, 0.844], [553, 1], [554, 0.949], [555, 0.99], [556, 0.992], [557, 0.986], [558, 0.987], [559, 0.988], [560, 0.987], [561, 0.986], [562, 0.983], [563, 0.975], [564, 0.968], [565, 0.966], [566, 0.967], [567, 0.953], [568, 0.915], [569, 0.952], [570, 0.814], [571, 0.128], [572, 2e-3]] }, m575: { nm: 575, pts: [[559, 5e-3], [560, 0.016], [561, 0.056], [562, 0.219], [563, 0.667], [564, 0.97], [565, 0.999], [566, 0.992], [567, 0.989], [568, 0.987], [569, 0.985], [570, 0.976], [571, 0.973], [572, 0.972], [573, 0.967], [574, 0.964], [575, 0.961], [576, 0.957], [577, 0.956], [578, 0.956], [579, 0.955], [580, 0.954], [581, 0.951], [582, 0.949], [583, 0.95], [584, 0.948], [585, 0.946], [586, 0.922], [587, 0.665], [588, 0.236], [589, 0.068], [590, 0.021], [591, 7e-3]] }, m586: { nm: 586, pts: [[572, 2e-3], [573, 0.041], [574, 0.81], [575, 0.987], [576, 0.998], [577, 0.996], [578, 0.998], [579, 1], [580, 0.997], [581, 0.995], [582, 0.997], [583, 0.998], [584, 0.995], [585, 0.991], [586, 0.99], [587, 0.988], [588, 0.985], [589, 0.98], [590, 0.968], [591, 0.969], [592, 0.957], [593, 0.954], [594, 0.959], [595, 0.955], [596, 0.939], [597, 0.917], [598, 0.834], [599, 0.067], [600, 4e-3]] }, m600: { nm: 600, pts: [[582, 8e-3], [583, 0.016], [584, 0.031], [585, 0.061], [586, 0.132], [587, 0.291], [588, 0.528], [589, 0.799], [590, 0.967], [591, 0.997], [592, 0.984], [593, 0.98], [594, 0.985], [595, 0.984], [596, 0.971], [597, 0.966], [598, 0.973], [599, 0.965], [600, 0.961], [601, 0.958], [602, 0.956], [603, 0.95], [604, 0.946], [605, 0.943], [606, 0.938], [607, 0.93], [608, 0.93], [609, 0.928], [610, 0.908], [611, 0.836], [612, 0.637], [613, 0.397], [614, 0.224], [615, 0.114], [616, 0.056], [617, 0.029], [618, 0.017], [619, 0.01], [620, 6e-3]] }, m615: { nm: 615, pts: [[601, 2e-3], [602, 0.02], [603, 0.254], [604, 0.978], [605, 0.969], [606, 0.992], [607, 0.991], [608, 0.989], [609, 0.983], [610, 0.982], [611, 0.978], [612, 0.973], [613, 0.968], [614, 0.964], [615, 0.962], [616, 0.959], [617, 0.954], [618, 0.949], [619, 0.944], [620, 0.941], [621, 0.938], [622, 0.934], [623, 0.931], [624, 0.912], [625, 0.903], [626, 0.916], [627, 0.269], [628, 0.024], [629, 4e-3]] }, r: { nm: 623, pts: [[552, 1e-3], [553, 0.014], [554, 0.255], [555, 0.97], [556, 0.998], [557, 0.994], [558, 0.991], [559, 1], [560, 0.986], [561, 0.987], [562, 0.988], [563, 0.981], [564, 0.968], [565, 0.974], [566, 0.971], [567, 0.959], [568, 0.956], [569, 0.957], [570, 0.955], [571, 0.95], [572, 0.941], [573, 0.936], [574, 0.94], [575, 0.939], [576, 0.933], [577, 0.928], [578, 0.929], [579, 0.931], [580, 0.924], [581, 0.918], [582, 0.921], [583, 0.922], [584, 0.92], [585, 0.911], [586, 0.901], [587, 0.899], [588, 0.906], [589, 0.908], [590, 0.902], [591, 0.891], [592, 0.873], [593, 0.871], [594, 0.88], [595, 0.873], [596, 0.852], [597, 0.842], [598, 0.848], [599, 0.848], [600, 0.852], [601, 0.845], [602, 0.84], [603, 0.836], [604, 0.836], [605, 0.839], [606, 0.834], [607, 0.832], [608, 0.825], [609, 0.82], [610, 0.818], [611, 0.818], [612, 0.815], [613, 0.805], [614, 0.796], [615, 0.797], [616, 0.796], [617, 0.799], [618, 0.799], [619, 0.793], [620, 0.784], [621, 0.779], [622, 0.781], [623, 0.782], [624, 0.781], [625, 0.775], [626, 0.772], [627, 0.772], [628, 0.706], [629, 0.776], [630, 0.747], [631, 0.766], [632, 0.756], [633, 0.752], [634, 0.75], [635, 0.749], [636, 0.745], [637, 0.742], [638, 0.733], [639, 0.725], [640, 0.72], [641, 0.717], [642, 0.721], [643, 0.717], [644, 0.713], [645, 0.705], [646, 0.702], [647, 0.699], [648, 0.703], [649, 0.7], [650, 0.703], [651, 0.694], [652, 0.681], [653, 0.677], [654, 0.675], [655, 0.674], [656, 0.672], [657, 0.671], [658, 0.662], [659, 0.655], [660, 0.651], [661, 0.651], [662, 0.653], [663, 0.653], [664, 0.651], [665, 0.64], [666, 0.627], [667, 0.619], [668, 0.616], [669, 0.619], [670, 0.62], [671, 0.619], [672, 0.618], [673, 0.612], [674, 0.607], [675, 0.604], [676, 0.606], [677, 0.605], [678, 0.6], [679, 0.59], [680, 0.584], [681, 0.581], [682, 0.581], [683, 0.583], [684, 0.575], [685, 0.563], [686, 0.553], [687, 0.273], [688, 0.533], [689, 0.519], [690, 0.498], [691, 0.463], [692, 0.388], [693, 0.488], [694, 0.469], [695, 0.486], [696, 0.272], [697, 0.128], [698, 0.016], [699, 4e-3]] }, m625: { nm: 625, pts: [[609, 3e-3], [610, 0.011], [611, 0.043], [612, 0.178], [613, 0.579], [614, 0.973], [615, 0.996], [616, 0.995], [617, 0.986], [618, 0.984], [619, 0.983], [620, 0.977], [621, 0.973], [622, 0.969], [623, 0.967], [624, 0.967], [625, 0.963], [626, 0.958], [627, 0.954], [628, 0.87], [629, 0.95], [630, 0.917], [631, 0.947], [632, 0.936], [633, 0.931], [634, 0.927], [635, 0.926], [636, 0.871], [637, 0.541], [638, 0.202], [639, 0.056], [640, 0.015], [641, 5e-3]] }, m640: { nm: 640, pts: [[629, 1e-3], [630, 0.021], [631, 0.763], [632, 0.997], [633, 0.994], [634, 0.986], [635, 0.984], [636, 0.984], [637, 0.977], [638, 0.971], [639, 0.967], [640, 0.96], [641, 0.952], [642, 0.955], [643, 0.954], [644, 0.945], [645, 0.933], [646, 0.93], [647, 0.934], [648, 0.92], [649, 0.085], [650, 3e-3]] }, m650: { nm: 650, pts: [[632, 5e-3], [633, 0.01], [634, 0.022], [635, 0.052], [636, 0.127], [637, 0.307], [638, 0.629], [639, 0.902], [640, 0.992], [641, 0.999], [642, 0.996], [643, 0.994], [644, 0.992], [645, 0.988], [646, 0.985], [647, 0.979], [648, 0.977], [649, 0.971], [650, 0.971], [651, 0.966], [652, 0.956], [653, 0.957], [654, 0.953], [655, 0.946], [656, 0.94], [657, 0.939], [658, 0.934], [659, 0.929], [660, 0.922], [661, 0.888], [662, 0.762], [663, 0.49], [664, 0.226], [665, 0.094], [666, 0.04], [667, 0.018], [668, 8e-3]] }, m661: { nm: 661, pts: [[648, 8e-3], [649, 0.143], [650, 0.993], [651, 0.981], [652, 0.983], [653, 0.982], [654, 0.989], [655, 0.976], [656, 0.97], [657, 0.965], [658, 0.97], [659, 0.967], [660, 0.961], [661, 0.955], [662, 0.951], [663, 0.941], [664, 0.936], [665, 0.92], [666, 0.902], [667, 0.917], [668, 0.906], [669, 0.898], [670, 0.9], [671, 0.883], [672, 0.846], [673, 0.08], [674, 5e-3]] }, m675: { nm: 675, pts: [[658, 5e-3], [659, 0.014], [660, 0.045], [661, 0.163], [662, 0.567], [663, 0.961], [664, 0.999], [665, 0.987], [666, 0.975], [667, 0.977], [668, 0.976], [669, 0.969], [670, 0.961], [671, 0.955], [672, 0.952], [673, 0.95], [674, 0.947], [675, 0.943], [676, 0.938], [677, 0.933], [678, 0.93], [679, 0.927], [680, 0.925], [681, 0.918], [682, 0.908], [683, 0.9], [684, 0.895], [685, 0.885], [686, 0.885], [687, 0.401], [688, 0.446], [689, 0.16], [690, 0.05], [691, 0.015], [692, 4e-3]] }, m700: { nm: 700, pts: [[683, 8e-3], [684, 0.016], [685, 0.034], [686, 0.084], [687, 0.112], [688, 0.502], [689, 0.819], [690, 0.985], [691, 0.963], [692, 0.8], [693, 0.99], [694, 0.961], [695, 0.972], [696, 0.964], [697, 0.951], [698, 0.944], [699, 0.938], [700, 0.93], [701, 0.932], [702, 0.927], [703, 0.903], [704, 0.902], [705, 0.901], [706, 0.896], [707, 0.89], [708, 0.879], [709, 0.873], [710, 0.855], [711, 0.778], [712, 0.532], [713, 0.243], [714, 0.103], [715, 0.048], [716, 0.024], [717, 0.01], [718, 5e-3]] }, m725: { nm: 725, pts: [[707, 6e-3], [708, 0.012], [709, 0.025], [710, 0.054], [711, 0.117], [712, 0.265], [713, 0.573], [714, 0.887], [715, 0.988], [716, 1], [717, 0.907], [718, 0.952], [719, 0.96], [720, 0.889], [721, 0.94], [722, 0.917], [723, 0.92], [724, 0.918], [725, 0.921], [726, 0.852], [727, 0.897], [728, 0.855], [729, 0.823], [730, 0.884], [731, 0.88], [732, 0.843], [733, 0.858], [734, 0.849], [735, 0.825], [736, 0.76], [737, 0.535], [738, 0.288], [739, 0.138], [740, 0.061], [741, 0.027], [742, 0.013], [743, 7e-3]] }, m750: { nm: 750, pts: [[732, 6e-3], [733, 0.012], [734, 0.023], [735, 0.049], [736, 0.122], [737, 0.3], [738, 0.593], [739, 0.884], [740, 0.996], [741, 0.986], [742, 0.975], [743, 0.976], [744, 0.973], [745, 0.965], [746, 0.959], [747, 0.949], [748, 0.936], [749, 0.929], [750, 0.927], [751, 0.922], [752, 0.914], [753, 0.908], [754, 0.9], [755, 0.889], [756, 0.881], [757, 0.876], [758, 0.867], [759, 0.858], [760, 0.515], [761, 0.042], [762, 0.526], [763, 0.107], [764, 0.148], [765, 0.067], [766, 0.03], [767, 0.014], [768, 7e-3]] }, i: { nm: 762, pts: [[697, 5e-3], [698, 0.024], [699, 0.135], [700, 0.539], [701, 0.937], [702, 1], [703, 0.987], [704, 0.986], [705, 0.977], [706, 0.971], [707, 0.967], [708, 0.954], [709, 0.942], [710, 0.947], [711, 0.941], [712, 0.925], [713, 0.91], [714, 0.903], [715, 0.898], [716, 0.893], [717, 0.811], [718, 0.852], [719, 0.855], [720, 0.793], [721, 0.84], [722, 0.822], [723, 0.82], [724, 0.819], [725, 0.824], [726, 0.762], [727, 0.806], [728, 0.766], [729, 0.733], [730, 0.78], [731, 0.777], [732, 0.744], [733, 0.759], [734, 0.755], [735, 0.738], [736, 0.741], [737, 0.73], [738, 0.715], [739, 0.714], [740, 0.706], [741, 0.702], [742, 0.697], [743, 0.692], [744, 0.688], [745, 0.684], [746, 0.676], [747, 0.673], [748, 0.666], [749, 0.661], [750, 0.658], [751, 0.653], [752, 0.648], [753, 0.641], [754, 0.636], [755, 0.629], [756, 0.624], [757, 0.618], [758, 0.612], [759, 0.607], [760, 0.366], [761, 0.033], [762, 0.577], [763, 0.196], [764, 0.532], [765, 0.544], [766, 0.556], [767, 0.558], [768, 0.473], [769, 0.546], [770, 0.542], [771, 0.536], [772, 0.533], [773, 0.529], [774, 0.527], [775, 0.519], [776, 0.516], [777, 0.512], [778, 0.508], [779, 0.504], [780, 0.498], [781, 0.497], [782, 0.493], [783, 0.487], [784, 0.482], [785, 0.475], [786, 0.471], [787, 0.467], [788, 0.462], [789, 0.459], [790, 0.451], [791, 0.449], [792, 0.44], [793, 0.438], [794, 0.432], [795, 0.422], [796, 0.424], [797, 0.415], [798, 0.412], [799, 0.41], [800, 0.403], [801, 0.389], [802, 0.397], [803, 0.393], [804, 0.393], [805, 0.392], [806, 0.39], [807, 0.385], [808, 0.382], [809, 0.381], [810, 0.376], [811, 0.369], [812, 0.371], [813, 0.371], [814, 0.369], [815, 0.359], [816, 0.314], [817, 0.356], [818, 0.31], [819, 0.349], [820, 0.273], [821, 0.347], [822, 0.33], [823, 0.285], [824, 0.325], [825, 0.324], [826, 0.316], [827, 0.313], [828, 0.307], [829, 0.234], [830, 0.296], [831, 0.292], [832, 0.291], [833, 0.297], [834, 0.297], [835, 0.299], [836, 0.295], [837, 0.295], [838, 0.302], [839, 0.3], [840, 0.303], [841, 0.306], [842, 0.297], [843, 0.292], [844, 0.29], [845, 0.287], [846, 0.28], [847, 0.274], [848, 0.272], [849, 0.271], [850, 0.265], [851, 0.259], [852, 0.253], [853, 0.249], [854, 0.235], [855, 0.202], [856, 0.086], [857, 0.046], [858, 0.013], [859, 5e-3]] }, m769w: { nm: 769, pts: [[745, 7e-3], [746, 0.056], [747, 0.509], [748, 1], [749, 0.98], [750, 0.989], [751, 0.967], [752, 0.963], [753, 0.966], [754, 0.955], [755, 0.943], [756, 0.929], [757, 0.925], [758, 0.923], [759, 0.913], [760, 0.552], [761, 0.05], [762, 0.862], [763, 0.294], [764, 0.799], [765, 0.819], [766, 0.841], [767, 0.841], [768, 0.716], [769, 0.826], [770, 0.817], [771, 0.809], [772, 0.804], [773, 0.798], [774, 0.791], [775, 0.785], [776, 0.777], [777, 0.771], [778, 0.768], [779, 0.759], [780, 0.748], [781, 0.743], [782, 0.74], [783, 0.734], [784, 0.725], [785, 0.71], [786, 0.702], [787, 0.704], [788, 0.684], [789, 0.674], [790, 0.626], [791, 0.145], [792, 0.018], [793, 3e-3]] }, m775: { nm: 775, pts: [[757, 7e-3], [758, 0.012], [759, 0.023], [760, 0.03], [761, 6e-3], [762, 0.257], [763, 0.181], [764, 0.773], [765, 0.948], [766, 1], [767, 0.992], [768, 0.847], [769, 0.982], [770, 0.973], [771, 0.964], [772, 0.957], [773, 0.949], [774, 0.941], [775, 0.933], [776, 0.925], [777, 0.919], [778, 0.914], [779, 0.907], [780, 0.899], [781, 0.889], [782, 0.881], [783, 0.872], [784, 0.864], [785, 0.845], [786, 0.741], [787, 0.503], [788, 0.27], [789, 0.132], [790, 0.062], [791, 0.029], [792, 0.014], [793, 7e-3]] }, m800: { nm: 800, pts: [[783, 6e-3], [784, 0.015], [785, 0.044], [786, 0.146], [787, 0.46], [788, 0.872], [789, 1], [790, 0.98], [791, 0.964], [792, 0.959], [793, 0.961], [794, 0.948], [795, 0.926], [796, 0.929], [797, 0.912], [798, 0.91], [799, 0.898], [800, 0.887], [801, 0.856], [802, 0.873], [803, 0.863], [804, 0.86], [805, 0.858], [806, 0.855], [807, 0.846], [808, 0.836], [809, 0.83], [810, 0.826], [811, 0.802], [812, 0.68], [813, 0.311], [814, 0.101], [815, 0.035], [816, 0.012], [817, 6e-3]] }, m825: { nm: 825, pts: [[803, 8e-3], [804, 0.012], [805, 0.018], [806, 0.026], [807, 0.04], [808, 0.062], [809, 0.1], [810, 0.166], [811, 0.27], [812, 0.438], [813, 0.642], [814, 0.834], [815, 0.942], [816, 0.869], [817, 0.994], [818, 0.859], [819, 0.966], [820, 0.755], [821, 0.967], [822, 0.914], [823, 0.787], [824, 0.9], [825, 0.904], [826, 0.878], [827, 0.871], [828, 0.851], [829, 0.648], [830, 0.817], [831, 0.803], [832, 0.806], [833, 0.817], [834, 0.798], [835, 0.754], [836, 0.676], [837, 0.555], [838, 0.392], [839, 0.238], [840, 0.14], [841, 0.084], [842, 0.053], [843, 0.034], [844, 0.022], [845, 0.014], [846, 9e-3]] }, m832w: { nm: 832, pts: [[809, 2e-3], [810, 0.013], [811, 0.096], [812, 0.664], [813, 1], [814, 0.986], [815, 0.973], [816, 0.851], [817, 0.972], [818, 0.846], [819, 0.952], [820, 0.742], [821, 0.949], [822, 0.896], [823, 0.77], [824, 0.879], [825, 0.882], [826, 0.86], [827, 0.855], [828, 0.837], [829, 0.64], [830, 0.808], [831, 0.793], [832, 0.791], [833, 0.804], [834, 0.807], [835, 0.809], [836, 0.806], [837, 0.809], [838, 0.817], [839, 0.818], [840, 0.823], [841, 0.826], [842, 0.812], [843, 0.799], [844, 0.786], [845, 0.776], [846, 0.762], [847, 0.747], [848, 0.736], [849, 0.726], [850, 0.7], [851, 0.701], [852, 0.465], [853, 0.077], [854, 0.011], [855, 2e-3]] }, m850: { nm: 850, pts: [[829, 8e-3], [830, 0.016], [831, 0.025], [832, 0.041], [833, 0.068], [834, 0.114], [835, 0.191], [836, 0.309], [837, 0.475], [838, 0.667], [839, 0.828], [840, 0.938], [841, 0.994], [842, 1], [843, 0.989], [844, 0.973], [845, 0.96], [846, 0.944], [847, 0.929], [848, 0.915], [849, 0.903], [850, 0.89], [851, 0.875], [852, 0.859], [853, 0.844], [854, 0.828], [855, 0.812], [856, 0.798], [857, 0.784], [858, 0.767], [859, 0.743], [860, 0.701], [861, 0.637], [862, 0.541], [863, 0.418], [864, 0.294], [865, 0.194], [866, 0.123], [867, 0.077], [868, 0.048], [869, 0.031], [870, 0.02], [871, 0.013], [872, 9e-3]] }, m875: { nm: 875, pts: [[853, 9e-3], [854, 0.013], [855, 0.018], [856, 0.025], [857, 0.036], [858, 0.055], [859, 0.093], [860, 0.163], [861, 0.283], [862, 0.446], [863, 0.617], [864, 0.773], [865, 0.9], [866, 0.976], [867, 1], [868, 0.995], [869, 0.987], [870, 0.983], [871, 0.979], [872, 0.972], [873, 0.965], [874, 0.958], [875, 0.95], [876, 0.942], [877, 0.933], [878, 0.922], [879, 0.911], [880, 0.898], [881, 0.885], [882, 0.868], [883, 0.849], [884, 0.806], [885, 0.717], [886, 0.582], [887, 0.449], [888, 0.319], [889, 0.209], [890, 0.125], [891, 0.071], [892, 0.041], [893, 0.025], [894, 0.016], [895, 0.011], [896, 8e-3]] } } };

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
function sample(stops, t) {
  let clamped = Math.max(0, Math.min(1, t)), i = 0;
  for (; i < stops.length - 2 && clamped > stops[i + 1][0]; )
    i += 1;
  let [t0, a] = stops[i], [t1, b] = stops[i + 1], f = t1 === t0 ? 0 : (clamped - t0) / (t1 - t0);
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f)
  ];
}
var RAMP_LIGHT = [
  [0, [199, 219, 243]],
  [0.25, [143, 182, 231]],
  [0.5, [79, 139, 214]],
  [0.75, [32, 92, 178]],
  [1, [12, 47, 106]]
], RAMP_DARK = [
  [0, [28, 55, 92]],
  [0.25, [42, 94, 156]],
  [0.5, [74, 138, 219]],
  [0.75, [124, 184, 255]],
  [1, [206, 228, 255]]
];
function sequential(t, dark = !1) {
  return sample(dark ? RAMP_DARK : RAMP_LIGHT, t);
}
var isDark = (c) => 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2] < 140;
function wavelengthColor(nm) {
  return rgb(sample(SPECTRUM, (nm - 400) / 500));
}

// app/components/obsmodes.tsx
import { jsx as jsx27, jsxs as jsxs20 } from "react/jsx-runtime";
var MODES = obsmodes_default.modes, UNITS = obsmodes_default.units, CURVES = obsmodes_default.curves, W = 960, H = 230, L = 34, R = 12, T = 58, B = 30, NM_MIN = 350, NM_MAX = 950, sx = (nm) => L + (nm - NM_MIN) / (NM_MAX - NM_MIN) * (W - L - R), sy = (v) => T + (1 - v) * (H - T - B);
function inkOn(rgbString) {
  let m = rgbString.match(/\d+/g);
  if (!m)
    return "#0a101c";
  let [r, g, b] = m.map(Number);
  return 0.299 * r + 0.587 * g + 0.114 * b < 150 ? "#ffffff" : "#0a101c";
}
function Coverage({ mode: mode2 }) {
  let count = {};
  Object.values(mode2.units).forEach(
    (filters2) => filters2.forEach((f) => {
      count[f] = (count[f] ?? 0) + 1;
    })
  );
  let filters = Object.keys(count).sort((a, b) => CURVES[a].nm - CURVES[b].nm), line = (pts) => pts.map((p, i) => `${i ? "L" : "M"}${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(" "), area = (pts) => `${line(pts)} L${sx(pts[pts.length - 1][0]).toFixed(1)},${sy(0)} L${sx(pts[0][0]).toFixed(1)},${sy(0)} Z`, peak = (pts) => pts.reduce((best, p) => p[1] > best[1] ? p : best, pts[0]);
  return /* @__PURE__ */ jsxs20(
    "svg",
    {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      role: "img",
      "aria-label": `Wavelength coverage of the ${mode2.name} mode: ${filters.map((f) => count[f] > 1 ? `${f} on ${count[f]} units` : f).join(", ")}.`,
      children: [
        /* @__PURE__ */ jsx27("g", { stroke: "var(--slate-200)", strokeWidth: "1", children: [400, 500, 600, 700, 800, 900].map((t) => /* @__PURE__ */ jsx27("line", { x1: sx(t), x2: sx(t), y1: T, y2: sy(0) }, t)) }),
        filters.map((f) => {
          let pts = CURVES[f].pts;
          if (!pts.length)
            return null;
          let color = wavelengthColor(CURVES[f].nm);
          return /* @__PURE__ */ jsxs20("g", { children: [
            /* @__PURE__ */ jsx27("path", { d: area(pts), fill: color, opacity: "0.2" }),
            /* @__PURE__ */ jsx27("path", { d: line(pts), fill: "none", stroke: color, strokeWidth: "1.4" })
          ] }, f);
        }),
        filters.map((f) => {
          let pts = CURVES[f].pts;
          if (!pts.length)
            return null;
          let [x] = peak(pts);
          return /* @__PURE__ */ jsx27(
            "text",
            {
              x: sx(x),
              y: T - 6,
              transform: `rotate(-90 ${sx(x)} ${T - 6})`,
              fontSize: "10",
              fontFamily: "var(--font-mono)",
              fill: wavelengthColor(CURVES[f].nm),
              children: count[f] > 1 ? `${f} \xD7${count[f]}` : f
            },
            `l-${f}`
          );
        }),
        /* @__PURE__ */ jsx27("line", { x1: L, x2: W - R, y1: sy(0), y2: sy(0), stroke: "var(--ink-900)", strokeWidth: "1" }),
        /* @__PURE__ */ jsx27("g", { fontSize: "10", fill: "var(--slate-500)", fontFamily: "var(--font-mono)", textAnchor: "middle", children: [400, 500, 600, 700, 800, 900].map((t) => /* @__PURE__ */ jsx27("text", { x: sx(t), y: H - 12, children: t }, t)) }),
        /* @__PURE__ */ jsx27("text", { x: W - R, y: H - 1, fontSize: "10", fill: "var(--slate-500)", textAnchor: "end", children: "wavelength, nm" })
      ]
    }
  );
}
function UnitGrid({ mode: mode2 }) {
  let depth = Math.max(...UNITS.map((u) => (mode2.units[u] ?? []).length), 1);
  return /* @__PURE__ */ jsxs20("div", { className: "modegrid", role: "table", "aria-label": `Filter carried by each unit in the ${mode2.name} mode`, children: [
    /* @__PURE__ */ jsxs20("div", { className: "modegrid__row", role: "row", children: [
      /* @__PURE__ */ jsx27("span", { className: "modegrid__head", role: "rowheader" }),
      UNITS.map((u) => /* @__PURE__ */ jsx27("span", { className: "modegrid__unit", role: "columnheader", children: u.replace("7DT", "") }, u))
    ] }),
    Array.from({ length: depth }).map((_, order) => /* @__PURE__ */ jsxs20("div", { className: "modegrid__row", role: "row", children: [
      /* @__PURE__ */ jsx27("span", { className: "modegrid__head", role: "rowheader", children: depth > 1 ? `Set ${order + 1}` : "Filter" }),
      UNITS.map((u) => {
        let f = (mode2.units[u] ?? [])[order];
        if (!f)
          return /* @__PURE__ */ jsx27("span", { className: "modegrid__cell modegrid__cell--empty", role: "cell", "aria-label": "none" }, u);
        let color = wavelengthColor(CURVES[f].nm);
        return /* @__PURE__ */ jsx27(
          "span",
          {
            className: "modegrid__cell",
            role: "cell",
            style: { background: color, color: inkOn(color) },
            children: f
          },
          u
        );
      })
    ] }, order))
  ] });
}
function Fields({ n }) {
  let side = Math.round(Math.sqrt(n));
  return /* @__PURE__ */ jsxs20("div", { className: "modefields", children: [
    /* @__PURE__ */ jsx27(
      "div",
      {
        className: "modefields__grid",
        style: { gridTemplateColumns: `repeat(${side}, 1fr)` },
        "aria-hidden": "true",
        children: Array.from({ length: n }).map((_, i) => /* @__PURE__ */ jsx27("span", {}, i))
      }
    ),
    /* @__PURE__ */ jsx27("span", { className: "modefields__label", children: n === 1 ? "one field" : `${n} fields` })
  ] });
}
function ObsModes() {
  let [key, setKey] = useState5(MODES[0].key), mode2 = MODES.find((m) => m.key === key) ?? MODES[0];
  return /* @__PURE__ */ jsxs20("div", { className: "obsmodes", children: [
    /* @__PURE__ */ jsxs20("fieldset", { className: "obsmodes__pick", children: [
      /* @__PURE__ */ jsx27("legend", { children: "Show the coverage of" }),
      MODES.map((m) => /* @__PURE__ */ jsxs20("label", { className: "obsmodes__option", children: [
        /* @__PURE__ */ jsx27(
          "input",
          {
            type: "radio",
            name: "obsmode",
            value: m.key,
            checked: m.key === key,
            onChange: () => setKey(m.key)
          }
        ),
        /* @__PURE__ */ jsx27("span", { children: m.name })
      ] }, m.key))
    ] }),
    /* @__PURE__ */ jsxs20("div", { className: "obsmodes__figure", children: [
      /* @__PURE__ */ jsx27(Coverage, { mode: mode2 }),
      /* @__PURE__ */ jsxs20("div", { className: "obsmodes__layout", children: [
        /* @__PURE__ */ jsx27(UnitGrid, { mode: mode2 }),
        /* @__PURE__ */ jsx27(Fields, { n: mode2.fields })
      ] }),
      /* @__PURE__ */ jsxs20("p", { className: "footnote", style: { marginTop: "1rem" }, children: [
        mode2.note,
        " ",
        mode2.example ? "The filter is illustrative: this mode is defined by the proposal." : `From the array's configuration, ${mode2.source}.`
      ] })
    ] })
  ] });
}

// app/routes/users.propose.tsx
import { jsx as jsx28, jsxs as jsxs21 } from "react/jsx-runtime";
var meta17 = () => metaOf(propose_default), { hero: hero2, general, guidelines } = propose_default, { openCall, who, time, dataRights } = general, { programType, observationMode, beforeYouWrite, technical } = guidelines, railItem = (block, level) => ({
  id: block.id,
  label: block.rail ?? block.title,
  level
}), RAIL = [
  railItem(general, 2),
  ...call_default.active ? [railItem(openCall, 3)] : [],
  railItem(who, 3),
  railItem(time, 3),
  railItem(dataRights, 3),
  railItem(guidelines, 2),
  railItem(programType, 3),
  railItem(observationMode, 3),
  railItem(beforeYouWrite, 3),
  railItem(technical, 3)
], Index17 = () => /* @__PURE__ */ jsxs21(PageLayout, { menu: "manuUsers", rail: { items: RAIL, tools: !0 }, children: [
  /* @__PURE__ */ jsx28(PageHero, { eyebrow: hero2.eyebrow, title: /* @__PURE__ */ jsx28(Md, { children: hero2.title }), lede: hero2.lede, image: hero2.image }),
  /* @__PURE__ */ jsxs21(Section, { id: general.id, eyebrow: general.eyebrow, title: general.title, children: [
    call_default.active && /* @__PURE__ */ jsxs21("div", { className: "subsection", children: [
      /* @__PURE__ */ jsx28("h3", { id: openCall.id, children: openCall.title }),
      /* @__PURE__ */ jsx28("p", { className: "prose", children: /* @__PURE__ */ jsx28(Md, { children: fill(openCall.body, { call: call_default }) }) }),
      /* @__PURE__ */ jsx28(ButtonRow, { buttons: openCall.buttons, style: { marginTop: "1.5rem" } })
    ] }),
    /* @__PURE__ */ jsxs21("div", { className: "subsection", children: [
      /* @__PURE__ */ jsx28("h3", { id: who.id, children: who.title }),
      /* @__PURE__ */ jsx28("div", { className: "prose", children: /* @__PURE__ */ jsx28(Paras, { children: who.body }) })
    ] }),
    /* @__PURE__ */ jsxs21("div", { className: "subsection", children: [
      /* @__PURE__ */ jsx28("h3", { id: time.id, children: time.title }),
      /* @__PURE__ */ jsx28("div", { className: "prose", children: /* @__PURE__ */ jsx28(Paras, { children: time.body }) })
    ] }),
    /* @__PURE__ */ jsxs21("div", { className: "subsection", children: [
      /* @__PURE__ */ jsx28("h3", { id: dataRights.id, children: dataRights.title }),
      /* @__PURE__ */ jsx28("div", { className: "split split--wide-text", children: /* @__PURE__ */ jsx28("div", { className: "prose", children: /* @__PURE__ */ jsx28(Paras, { children: dataRights.body }) }) })
    ] })
  ] }),
  /* @__PURE__ */ jsxs21(Section, { id: guidelines.id, eyebrow: guidelines.eyebrow, title: guidelines.title, alt: !0, children: [
    /* @__PURE__ */ jsx28("p", { className: "prose", children: /* @__PURE__ */ jsx28(Md, { children: guidelines.intro }) }),
    /* @__PURE__ */ jsxs21("div", { className: "subsection", children: [
      /* @__PURE__ */ jsx28("h3", { id: programType.id, children: programType.title }),
      /* @__PURE__ */ jsx28("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs21("table", { className: "spec-table spec-table--key", children: [
        /* @__PURE__ */ jsx28("caption", { children: programType.caption }),
        /* @__PURE__ */ jsx28("tbody", { children: programType.types.map((row) => /* @__PURE__ */ jsxs21("tr", { children: [
          /* @__PURE__ */ jsxs21("th", { scope: "row", style: { whiteSpace: "nowrap" }, children: [
            row.code,
            /* @__PURE__ */ jsx28("span", { className: "tier-card__code", style: { display: "block", fontSize: "0.6875rem" }, children: row.name })
          ] }),
          /* @__PURE__ */ jsx28("td", { children: /* @__PURE__ */ jsx28(Md, { children: row.body }) })
        ] }, row.code)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs21("div", { className: "subsection", children: [
      /* @__PURE__ */ jsx28("h3", { id: observationMode.id, children: observationMode.title }),
      /* @__PURE__ */ jsx28("p", { className: "prose", children: /* @__PURE__ */ jsx28(Md, { children: observationMode.body }) }),
      /* @__PURE__ */ jsx28("div", { className: "modebox-grid", children: surveys_default.modes.map((mode2, index) => /* @__PURE__ */ jsxs21("div", { className: "modebox", children: [
        /* @__PURE__ */ jsx28("span", { className: "modebox__n", children: String(index + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsx28("h4", { className: "modebox__name", children: mode2.name }),
        /* @__PURE__ */ jsx28("span", { className: "modebox__tag", children: mode2.tagline }),
        /* @__PURE__ */ jsx28("p", { className: "modebox__body", children: mode2.body })
      ] }, mode2.name)) }),
      /* @__PURE__ */ jsx28("div", { style: { marginTop: "2.5rem" }, children: /* @__PURE__ */ jsx28(ObsModes, {}) })
    ] }),
    /* @__PURE__ */ jsxs21("div", { className: "subsection", children: [
      /* @__PURE__ */ jsx28("h3", { id: beforeYouWrite.id, children: beforeYouWrite.title }),
      /* @__PURE__ */ jsx28("p", { className: "prose", children: /* @__PURE__ */ jsx28(Md, { children: beforeYouWrite.body }) }),
      /* @__PURE__ */ jsx28("ul", { className: "feature-list", style: { marginTop: "1.5rem" }, children: beforeYouWrite.steps.map((step2, index) => /* @__PURE__ */ jsxs21("li", { children: [
        /* @__PURE__ */ jsx28("span", { className: "feature-list__key", children: String(index + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxs21("div", { children: [
          /* @__PURE__ */ jsx28("h4", { className: "feature-list__title", style: { fontSize: "1rem" }, children: step2.title }),
          /* @__PURE__ */ jsx28("p", { className: "feature-list__body", style: { maxWidth: "68ch" }, children: /* @__PURE__ */ jsx28(Md, { children: step2.body }) })
        ] })
      ] }, step2.title)) })
    ] }),
    /* @__PURE__ */ jsxs21("div", { className: "subsection", children: [
      /* @__PURE__ */ jsx28("h3", { id: technical.id, children: technical.title }),
      /* @__PURE__ */ jsx28("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs21("table", { className: "spec-table spec-table--key", children: [
        /* @__PURE__ */ jsx28("caption", { children: technical.caption }),
        /* @__PURE__ */ jsx28("thead", { children: /* @__PURE__ */ jsx28("tr", { children: technical.columns.map((col) => /* @__PURE__ */ jsx28("th", { scope: "col", children: col }, col)) }) }),
        /* @__PURE__ */ jsx28("tbody", { children: technical.fields.map((row) => /* @__PURE__ */ jsxs21("tr", { children: [
          /* @__PURE__ */ jsx28("th", { scope: "row", children: row.field }),
          /* @__PURE__ */ jsx28("td", { children: /* @__PURE__ */ jsx28(Md, { children: row.what }) })
        ] }, row.field)) })
      ] }) }),
      /* @__PURE__ */ jsx28("p", { className: "prose", style: { marginTop: "2rem" }, children: /* @__PURE__ */ jsx28(Md, { children: technical.body }) }),
      /* @__PURE__ */ jsx28("p", { className: "footnote", style: { marginTop: "1.25rem" }, children: /* @__PURE__ */ jsx28(Md, { children: technical.footnote }) })
    ] })
  ] })
] }), users_propose_default = Index17;

// app/routes/users.access.tsx
var users_access_exports = {};
__export(users_access_exports, {
  default: () => users_access_default,
  meta: () => meta18
});

// app/content/pages/users/access.json
var access_default = {
  meta: {
    title: "Data access \xB7 7DT for users",
    description: "How 7DS data will be obtained. A public query and download service is being built; until it opens, data are requested from the project directly."
  },
  hero: {
    eyebrow: "For users",
    title: "Data access",
    lede: "How 7DS data are obtained: search, query and download. The service is being built; this page will describe it when it opens.",
    image: "/img/hero/data.jpg"
  },
  status: {
    eyebrow: "Status",
    title: "Being built",
    panelTitle: "To be determined",
    body: [
      "There is no public interface for querying or downloading 7DS data yet. How data will be searched, what may be retrieved at once, how bulk transfers are handled and what authentication is required are all still being decided, and this page will set them out once they are.",
      "Data taken for the surveys carry a proprietary period during which they are available to the 7DS team. Membership, and the data rights that come with it, are described under [how to propose](/users/propose). Until the service opens, requests \u2014 from team members and from anyone else \u2014 go to the project directly."
    ],
    button: {
      label: "Request data",
      href: "mailto:mim@astro.snu.ac.kr?subject=7DS%20data%20request"
    }
  },
  query: {
    eyebrow: "Query",
    title: "Data query",
    panelTitle: "TBD",
    body: "A query interface \u2014 search by position, tile, band, date or depth, and retrieve the matching images and catalogs \u2014 is to be determined. It will be described here."
  }
};

// app/routes/users.access.tsx
import { jsx as jsx29, jsxs as jsxs22 } from "react/jsx-runtime";
var meta18 = () => metaOf(access_default), Index18 = () => {
  let { hero: hero3, status, query } = access_default;
  return /* @__PURE__ */ jsxs22(PageLayout, { menu: "manuUsers", children: [
    /* @__PURE__ */ jsx29(PageHero, { eyebrow: hero3.eyebrow, title: hero3.title, lede: hero3.lede, image: hero3.image }),
    /* @__PURE__ */ jsx29(Section, { eyebrow: status.eyebrow, title: status.title, children: /* @__PURE__ */ jsxs22("div", { className: "panel", style: { maxWidth: "68ch" }, children: [
      /* @__PURE__ */ jsx29("div", { className: "panel__title", children: status.panelTitle }),
      /* @__PURE__ */ jsx29(Paras, { className: "feature-list__body", style: { marginBottom: "1rem" }, children: status.body }),
      /* @__PURE__ */ jsx29(SmartLink, { className: "btn btn--primary", href: status.button.href, children: status.button.label })
    ] }) }),
    /* @__PURE__ */ jsx29(Section, { eyebrow: query.eyebrow, title: query.title, alt: !0, children: /* @__PURE__ */ jsxs22("div", { className: "panel", style: { maxWidth: "68ch" }, children: [
      /* @__PURE__ */ jsx29("div", { className: "panel__title", children: query.panelTitle }),
      /* @__PURE__ */ jsx29("p", { className: "feature-list__body", style: { marginBottom: 0 }, children: /* @__PURE__ */ jsx29(Md, { children: query.body }) })
    ] }) })
  ] });
}, users_access_default = Index18;

// app/routes/users.format.tsx
var users_format_exports = {};
__export(users_format_exports, {
  default: () => users_format_default,
  meta: () => meta19
});

// app/content/data/dataformat.json
var dataformat_default = {
  note: "7DT data format, from the '7DT Data Format Specification for Science Working Groups'. Structured rather than written into the page so a revision of the specification is a change to this file. Every row is quoted from the specification; nothing here is inferred.",
  products: [
    [
      "Calibrated single exposure",
      "*_100s.fits",
      "FITS image, 32-bit float, 9576 \xD7 6388 px, ~234 MB, image in HDU 0",
      "Bias, dark and flat corrected single exposure. Pixel values remain in instrumental ADU."
    ],
    [
      "Coadd",
      "*_coadd.fits",
      "FITS image, 32-bit float, standard grid 10200 \xD7 6800 px, ~265 MB, image in HDU 0",
      "Resampled stack on a common grid. Pixel values are flux-scaled to approximately \xB5Jy per pixel."
    ]
  ],
  basename: [
    [
      "T08147",
      "RIS tile number, or a free target"
    ],
    [
      "m650",
      "Filter"
    ],
    [
      "7DT02",
      "Telescope unit"
    ],
    [
      "20251126_043413",
      "UTC date and time"
    ],
    [
      "100s",
      "Exposure time"
    ]
  ],
  suffixes: [
    [
      "_coadd",
      "Coadded image. May be a nightly stack or a longer multi-epoch one."
    ],
    [
      "_cat",
      "Source catalog for the preceding image product. Empty primary HDU 0, source binary table in HDU 1."
    ],
    [
      "_weight",
      "Coadd inverse-variance weight map, in the primary image HDU."
    ],
    [
      "_footprint",
      "Per-pixel contributing-frame information, where produced. Availability depends on the processing route."
    ]
  ],
  conventions: [
    [
      "WCS",
      "Single-frame distortion is represented with TPV (TAN--TPV), not SIP. Coadds are resampled onto a TAN grid."
    ],
    [
      "Single-frame units",
      "Instrumental detector values in ADU after basic calibration."
    ],
    [
      "Coadd units",
      "Flux-scaled to \xB5Jy per pixel."
    ],
    [
      "Pixel scale",
      "0.505 arcsec per pixel, so a single exposure covers about 1.34\xB0 \xD7 0.90\xB0."
    ],
    [
      "Filter identifier",
      "Medium bands are prefixed m, from m400 to m875, with some wider bands suffixed w as in m466w. Broad bands are u, g, r, i and z."
    ],
    [
      "Dates",
      "The observing-night date and the UTC date encoded in a basename may differ by one calendar day."
    ]
  ],
  headerGroups: [
    {
      title: "What the observation was",
      rows: [
        [
          "OBJECT",
          "Target or survey-tile identifier."
        ],
        [
          "FILTER",
          "Filter used for the observation."
        ],
        [
          "TELESCOP",
          "7DT telescope unit identifier."
        ],
        [
          "EXPTIME",
          "Exposure time. For a coadd, the sum of the contributing exposure times."
        ],
        [
          "DATE-OBS",
          "UTC observation timestamp. For a coadd, the mean time of the contributing frames."
        ],
        [
          "MJD",
          "Observation time as Modified Julian Date. For a coadd, the mean of the inputs."
        ],
        [
          "AIRMASS",
          "Airmass of the observation."
        ],
        [
          "MOONSEP",
          "Angular separation from the Moon, degrees."
        ],
        [
          "IMAGEID",
          "Unique image identifier."
        ],
        [
          "PIPE_VER",
          "Py7DT pipeline version stamp."
        ]
      ]
    },
    {
      title: "How good it is",
      rows: [
        [
          "RSEP_Q2",
          "Astrometric quality: representative separation of sources from Gaia DR3, arcsec. Variants RMS, MIN, MAX, Q1, Q2, Q3, P95, P99."
        ],
        [
          "ISEP_Q2",
          "Astrometric quality: representative separation within 7DT images taken together, arcsec. Same set of variants."
        ],
        [
          "BIN0FWHM",
          "PSF size as it varies across the field. BIN0, BIN1, BIN2 run from center to corner, equally spaced in squared radial distance."
        ],
        [
          "SEEING, PEEING",
          "PSF FWHM, corners excluded, in arcsec and in pixels."
        ],
        [
          "ELLIP, ELONG",
          "PSF ellipticity and elongation, corners excluded."
        ],
        [
          "SKYVAL, SKYSIG",
          "Median and sigma of the sky background."
        ],
        [
          "SATURATE",
          "Pixel saturation level. Read per image, since it can differ between products."
        ],
        [
          "SANITY",
          "Pipeline quality control. False marks a frame that should normally be excluded."
        ],
        [
          "REJ_PROC",
          "Processing stage at which the image was rejected, where a rejection was recorded."
        ]
      ]
    },
    {
      title: "How to turn counts into magnitudes",
      rows: [
        [
          "APER, APER_1\u2013APER_5",
          "Fixed aperture definitions used for photometry. The SExtractor AUTO aperture is not among them."
        ],
        [
          "ZP_AUTO, ZP_0\u2013ZP_5",
          "AB magnitude zero points for AUTO and for each fixed aperture."
        ],
        [
          "EZP_*",
          "Uncertainty on the corresponding zero point."
        ],
        [
          "UL5_*, UL3_*",
          "5\u03C3 and 3\u03C3 limiting magnitudes for the corresponding aperture. Not defined for AUTO."
        ],
        [
          "EGAIN",
          "Effective gain in e\u207B per ADU. Not the same as the camera keyword GAIN."
        ]
      ]
    },
    {
      title: "Where it came from",
      rows: [
        [
          "PPFLAG",
          "Bitwise-OR calibration provenance: 0 same-date raw calibration, 1 nearby-date calibration, 2 manually generated master, 4 a SANITY=False input was used, 8 masters matched by ignoring lenient keys, 16 masters matched by ignoring temporal bounds, 32 masters matched by ignoring hard keys."
        ],
        [
          "IMCMB###, IMCID###",
          "Input master frame identifiers, recorded in single-image headers."
        ],
        [
          "IMG#####, IID#####",
          "Input image identifiers, recorded in coadd headers."
        ]
      ]
    }
  ],
  catalogExample: [
    [
      "MAG_APER",
      "Instrumental aperture magnitude."
    ],
    [
      "MAG_APER_m650",
      "Calibrated aperture magnitude in m650."
    ],
    [
      "FLUX_APER",
      "Instrumental aperture flux."
    ],
    [
      "FLUX_APER_m650",
      "Calibrated aperture flux in m650."
    ]
  ],
  catalogGroups: [
    {
      title: "Position and shape",
      rows: [
        [
          "ALPHA_J2000, DELTA_J2000",
          "Source sky position, J2000."
        ],
        [
          "X_IMAGE, Y_IMAGE",
          "Source position in image pixel coordinates."
        ],
        [
          "FWHM_IMAGE",
          "Source FWHM in pixels."
        ],
        [
          "ELLIPTICITY",
          "Source ellipticity."
        ],
        [
          "CLASS_STAR",
          "SExtractor stellarity, for star/galaxy separation."
        ],
        [
          "FLAGS",
          "Source-extraction quality flags."
        ]
      ]
    },
    {
      title: "Instrumental measurements",
      rows: [
        [
          "MAG_AUTO",
          "Instrumental SExtractor AUTO magnitude."
        ],
        [
          "MAG_APER\u2013MAG_APER_5",
          "Instrumental fixed-aperture magnitudes. Apertures are defined in the image header."
        ],
        [
          "MAGERR_*",
          "Uncertainty on the corresponding instrumental magnitude."
        ],
        [
          "FLUX_AUTO, FLUX_APER*",
          "Instrumental flux measurements."
        ],
        [
          "FLUXERR_*",
          "Uncertainty on the corresponding instrumental flux."
        ],
        [
          "SNR_*",
          "Signal-to-noise ratio for the corresponding measurement."
        ]
      ]
    },
    {
      title: "Calibrated photometry",
      rows: [
        [
          "MAG_*_<filter>",
          "Calibrated magnitude in the observed 7DT filter."
        ],
        [
          "MAGERR_*_<filter>",
          "Uncertainty on the calibrated magnitude."
        ],
        [
          "FLUX_*_<filter>",
          "Calibrated flux in the observed 7DT filter."
        ],
        [
          "FLUXERR_*_<filter>",
          "Uncertainty on the calibrated flux."
        ]
      ]
    },
    {
      title: "Gaia cross-match",
      rows: [
        [
          "source_id",
          "Identifier of the matched Gaia reference source."
        ],
        [
          "ra, dec",
          "Gaia reference-source position."
        ],
        [
          "phot_g_mean_mag, bp_rp",
          "Gaia broad-band photometry."
        ],
        [
          "separation",
          "Angular separation between the detected source and its Gaia match."
        ],
        [
          "mag_m400 \u2026 mag_m875, mag_u\u2013mag_z",
          "Gaia-XP synthetic reference magnitudes across the 7DS filter set, wide bands included."
        ]
      ]
    }
  ]
};

// app/content/pages/users/format.json
var format_default = {
  meta: {
    title: "Data format \xB7 7DT for users",
    description: "What a 7DT data product is: image and catalog products, the filename convention, WCS and unit conventions, the FITS header keywords, and the columns of a Py7DT source catalog."
  },
  hero: {
    eyebrow: "For users",
    title: "Data format",
    lede: "What arrives when you obtain 7DT data: two image products and a catalog, a filename that tells you what a file is, and headers that carry everything needed to turn counts into calibrated magnitudes.",
    image: "/img/hero/data.jpg",
    meta: [
      {
        value: "2",
        label: "Image products"
      },
      {
        value: "9576\xD76388",
        label: "Single-exposure pixels"
      },
      {
        value: "0.505",
        unit: "\u2033",
        label: "Per pixel"
      },
      {
        value: "\xB5Jy",
        label: "Coadd pixel units"
      }
    ]
  },
  products: {
    eyebrow: "Products",
    title: "What a data product is",
    images: {
      title: "Images",
      body: "A calibrated single exposure and a coadd are the two primary image products. Coadds may be nightly stacks, commonly around 300 seconds, or longer multi-epoch stacks.",
      caption: "Primary image products",
      columns: [
        "Product",
        "Filename",
        "Format and size",
        "Contents"
      ]
    },
    filename: {
      title: "What a filename tells you",
      body: "A basename identifies the observation completely, so a file can be placed without opening it. A typical single exposure:",
      example: "T08147_m650_7DT02_20251126_043413_100s.fits",
      caption: "Elements of a basename",
      suffixBody: "The same stem carries through to everything derived from that image, distinguished by a suffix.",
      suffixCaption: "Suffixes on the same stem"
    },
    conventions: {
      title: "Conventions",
      caption: "Coordinate, unit and naming conventions"
    }
  },
  headers: {
    eyebrow: "Headers",
    title: "FITS header keywords",
    body: "Beyond the standard keywords, a 7DT header carries what the observation was, how good it turned out, what is needed to calibrate it, and where every input came from. Quality metrics are written by the pipeline for every image it produces and are also ingested into the observation database.",
    footnote: "Two keywords are worth reading before any analysis. `SANITY` is the pipeline's own verdict on the frame, and `False` means it should normally be excluded. `PPFLAG` records every compromise made in finding calibration masters, so a frame calibrated against something less than ideal always says so."
  },
  catalogs: {
    eyebrow: "Catalogs",
    title: "Source catalogs",
    naming: {
      title: "The naming rule",
      body: "Py7DT source catalogs are FITS binary tables following SExtractor conventions, holding instrumental measurements, calibrated photometry, source morphology and reference-catalog cross-matches. One rule explains most of the column names: an unsuffixed photometric column is an instrumental measurement, and a column suffixed with a filter name is the calibrated quantity in that filter.",
      caption: "The same measurement, in an m650 catalog",
      footnote: "The suffix convention extends to the corresponding errors and related quantities wherever filter-specific columns are provided."
    }
  },
  next: {
    eyebrow: "Next",
    title: "Working with it",
    body: "The pipeline that produces these files, and the packages for reading and analyzing them, are described under [software](/users/software). How the data are obtained is on [data access](/users/access). Measured depths, zero-point accuracy and delivered image quality \u2014 the numbers behind the header keywords above \u2014 are on the [performance page](/users/performance).",
    buttons: [
      {
        label: "Software",
        href: "/users/software"
      },
      {
        label: "Data access",
        href: "/users/access"
      },
      {
        label: "Measured performance",
        href: "/users/performance"
      }
    ]
  }
};

// app/routes/users.format.tsx
import { jsx as jsx30, jsxs as jsxs23 } from "react/jsx-runtime";
var meta19 = () => metaOf(format_default), Mono = ({ children }) => /* @__PURE__ */ jsx30("span", { style: { fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }, children }), keyword = (text, key) => /* @__PURE__ */ jsx30(Mono, { children: text }, key);
function KeywordTable({ caption, rows }) {
  return /* @__PURE__ */ jsx30("div", { className: "table-wrap", style: { marginTop: "1.25rem" }, children: /* @__PURE__ */ jsxs23("table", { className: "spec-table", children: [
    /* @__PURE__ */ jsx30("caption", { children: caption }),
    /* @__PURE__ */ jsx30("tbody", { children: rows.map((row) => /* @__PURE__ */ jsxs23("tr", { children: [
      /* @__PURE__ */ jsx30("th", { scope: "row", style: { whiteSpace: "nowrap" }, children: /* @__PURE__ */ jsx30(Mono, { children: row[0] }) }),
      /* @__PURE__ */ jsx30("td", { children: row[1] })
    ] }, row[0])) })
  ] }) });
}
var Index19 = () => {
  let { hero: hero3, products, headers: headers6, catalogs, next } = format_default, { images, filename, conventions } = products;
  return /* @__PURE__ */ jsxs23(PageLayout, { menu: "manuUsers", rail: !0, children: [
    /* @__PURE__ */ jsx30(PageHero, { eyebrow: hero3.eyebrow, title: hero3.title, lede: hero3.lede, image: hero3.image, meta: hero3.meta }),
    /* @__PURE__ */ jsxs23(Section, { eyebrow: products.eyebrow, title: products.title, children: [
      /* @__PURE__ */ jsxs23("div", { className: "subsection", children: [
        /* @__PURE__ */ jsx30("h3", { children: images.title }),
        /* @__PURE__ */ jsx30("p", { className: "prose", children: /* @__PURE__ */ jsx30(Md, { children: images.body }) }),
        /* @__PURE__ */ jsx30("div", { className: "table-wrap", style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsxs23("table", { className: "spec-table", children: [
          /* @__PURE__ */ jsx30("caption", { children: images.caption }),
          /* @__PURE__ */ jsx30("thead", { children: /* @__PURE__ */ jsx30("tr", { children: images.columns.map((col) => /* @__PURE__ */ jsx30("th", { scope: "col", children: col }, col)) }) }),
          /* @__PURE__ */ jsx30("tbody", { children: dataformat_default.products.map((row) => /* @__PURE__ */ jsxs23("tr", { children: [
            /* @__PURE__ */ jsx30("th", { scope: "row", children: row[0] }),
            /* @__PURE__ */ jsx30("td", { children: /* @__PURE__ */ jsx30(Mono, { children: row[1] }) }),
            /* @__PURE__ */ jsx30("td", { children: row[2] }),
            /* @__PURE__ */ jsx30("td", { children: row[3] })
          ] }, row[0])) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs23("div", { className: "subsection", children: [
        /* @__PURE__ */ jsx30("h3", { children: filename.title }),
        /* @__PURE__ */ jsx30("p", { className: "prose", children: /* @__PURE__ */ jsx30(Md, { children: filename.body }) }),
        /* @__PURE__ */ jsx30(
          "p",
          {
            style: {
              marginTop: "1.25rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.9375rem",
              overflowX: "auto"
            },
            children: filename.example
          }
        ),
        /* @__PURE__ */ jsx30("div", { className: "table-wrap", style: { marginTop: "1.25rem" }, children: /* @__PURE__ */ jsxs23("table", { className: "spec-table", children: [
          /* @__PURE__ */ jsx30("caption", { children: filename.caption }),
          /* @__PURE__ */ jsx30("tbody", { children: dataformat_default.basename.map((row) => /* @__PURE__ */ jsxs23("tr", { children: [
            /* @__PURE__ */ jsx30("th", { scope: "row", style: { whiteSpace: "nowrap" }, children: /* @__PURE__ */ jsx30(Mono, { children: row[0] }) }),
            /* @__PURE__ */ jsx30("td", { children: row[1] })
          ] }, row[0])) })
        ] }) }),
        /* @__PURE__ */ jsx30("p", { className: "prose", style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsx30(Md, { children: filename.suffixBody }) }),
        /* @__PURE__ */ jsx30(KeywordTable, { caption: filename.suffixCaption, rows: dataformat_default.suffixes })
      ] }),
      /* @__PURE__ */ jsxs23("div", { className: "subsection", children: [
        /* @__PURE__ */ jsx30("h3", { children: conventions.title }),
        /* @__PURE__ */ jsx30(KeywordTable, { caption: conventions.caption, rows: dataformat_default.conventions })
      ] })
    ] }),
    /* @__PURE__ */ jsxs23(Section, { eyebrow: headers6.eyebrow, title: headers6.title, alt: !0, children: [
      /* @__PURE__ */ jsx30("p", { className: "prose", children: /* @__PURE__ */ jsx30(Md, { children: headers6.body }) }),
      dataformat_default.headerGroups.map((group) => /* @__PURE__ */ jsxs23("div", { className: "subsection", children: [
        /* @__PURE__ */ jsx30("h3", { children: group.title }),
        /* @__PURE__ */ jsx30(KeywordTable, { caption: group.title, rows: group.rows })
      ] }, group.title)),
      /* @__PURE__ */ jsx30("p", { className: "footnote", style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsx30(Md, { code: keyword, children: headers6.footnote }) })
    ] }),
    /* @__PURE__ */ jsxs23(Section, { eyebrow: catalogs.eyebrow, title: catalogs.title, children: [
      /* @__PURE__ */ jsxs23("div", { className: "subsection", children: [
        /* @__PURE__ */ jsx30("h3", { children: catalogs.naming.title }),
        /* @__PURE__ */ jsx30("p", { className: "prose", children: /* @__PURE__ */ jsx30(Md, { children: catalogs.naming.body }) }),
        /* @__PURE__ */ jsx30(KeywordTable, { caption: catalogs.naming.caption, rows: dataformat_default.catalogExample }),
        /* @__PURE__ */ jsx30("p", { className: "footnote", style: { marginTop: "1rem" }, children: /* @__PURE__ */ jsx30(Md, { children: catalogs.naming.footnote }) })
      ] }),
      dataformat_default.catalogGroups.map((group) => /* @__PURE__ */ jsxs23("div", { className: "subsection", children: [
        /* @__PURE__ */ jsx30("h3", { children: group.title }),
        /* @__PURE__ */ jsx30(KeywordTable, { caption: group.title, rows: group.rows })
      ] }, group.title))
    ] }),
    /* @__PURE__ */ jsxs23(Section, { eyebrow: next.eyebrow, title: next.title, alt: !0, children: [
      /* @__PURE__ */ jsx30("p", { className: "prose", children: /* @__PURE__ */ jsx30(Md, { children: next.body }) }),
      /* @__PURE__ */ jsx30(ButtonRow, { buttons: next.buttons, style: { marginTop: "1.5rem" } })
    ] })
  ] });
}, users_format_default = Index19;

// app/routes/users.status.tsx
var users_status_exports = {};
__export(users_status_exports, {
  default: () => users_status_default,
  headers: () => headers,
  loader: () => loader6,
  meta: () => meta20
});
import { useMemo as useMemo4, useState as useState8 } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// app/content/pages/users/status.json
var status_default = {
  meta: {
    title: "Status & overview \xB7 7DT for users",
    description: "What 7DT can observe now and what data exist: telescopes and filters available, survey coverage, measured depths and processing status."
  },
  hero: {
    eyebrow: "For users",
    title: "Status",
    lede: "What the array can observe at the moment, and what data already exist. Start here before planning an observation or a data request.",
    image: "/img/hero/data.jpg",
    meta: [
      {
        value: "{telescopes.online}",
        label: "Telescopes available",
        note: "of {telescopes.total}",
        live: !0
      },
      {
        value: "35",
        label: "Filters installed",
        note: "of 40 medium bands"
      },
      {
        value: "{ris.coverage_pct}",
        unit: "%",
        label: "Sky referenced"
      },
      {
        value: "{nightly.last_night|day}",
        label: "Last night observed"
      }
    ]
  },
  tonight: {
    eyebrow: "Availability",
    title: "What is on sky tonight",
    updated: "every 30 minutes",
    body: "{telescopes.online} of {telescopes.total} telescopes are in routine operation. Units not listed as online are either awaiting installation or out of service for maintenance. Each operational unit carries a nine-slot filter wheel holding Sloan broad bands and a share of the medium-band set, so the number of distinct bands available on a given night depends on how many units are observing.",
    stats: [
      {
        value: "{telescopes.online}",
        label: "Telescopes online",
        note: "of {telescopes.total}",
        live: !0
      },
      {
        value: "35",
        label: "Filters installed",
        note: "of 40 medium bands"
      },
      {
        value: "{nightly.n_nights|num}",
        label: "Nights observed"
      },
      {
        value: "{nightly.last_night|day}",
        label: "Most recent night"
      }
    ]
  },
  night: {
    eyebrow: "Operations",
    title: "What a night produces",
    body: "Over {nightly.n_nights|num} observing nights since {nightly.first_night|day}, the array has recorded {totals.science_frames|num} science frames in {totals.exposure_hours|num} hours of open shutter. A typical night covers {nightly.tiles_per_night.median} tiles in {nightly.exposures_per_night.median|num} exposures and writes {nightly.raw_gb_per_night.median|num} GB of raw data, calibration frames included.",
    stats: [
      {
        value: "{nightly.tiles_per_night.median|num}",
        label: "Tiles per night",
        note: "median"
      },
      {
        value: "{nightly.exposures_per_night.median|num}",
        label: "Exposures per night",
        note: "median"
      },
      {
        value: "{nightly.raw_gb_per_night.median|num}",
        unit: "GB",
        label: "Raw data per night",
        note: "median"
      },
      {
        value: "{totals.science_frames|num}",
        label: "Science frames",
        note: "to date"
      },
      {
        value: "{totals.exposure_hours|num}",
        unit: "hr",
        label: "Open shutter",
        note: "to date"
      }
    ],
    footnote: "Medians rather than means: target-of-opportunity nights run to {nightly.exposures_per_night.max|num} exposures and would otherwise dominate the figure. Progress of each survey is on its own page \u2014 [RIS](/survey/ris), [WTS](/survey/wts) and [IMS](/survey/ims)."
  },
  bands: {
    eyebrow: "Filters",
    title: "Bands available",
    body: [
      "The filter set is what distinguishes 7DT from other survey arrays. Twenty medium bands of 25 nm width are spaced regularly at 25 nm from 400 to 875 nm. Fifteen further filters, installed in late 2025, fall between them with central wavelengths from 375 to 832 nm and bandwidths of 14 to 41 nm. Sloan g, r and i are carried by every unit; u is carried by one and z by three.",
      "The original twenty are the calibrated set in operational use. Spectrophotometric calibration of the fifteen added filters is in preparation, and their central wavelengths are not aligned to a regular grid \u2014 check which bands a given tile actually carries on the [data access page](/users/access), which reports the medium bands observed on any tile."
    ],
    table: {
      caption: "Medium bands, central wavelength in nm",
      rows: [
        {
          label: "Original set (25 nm spacing)",
          bands: [
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
          ]
        },
        {
          label: "Added 2025 (irregular)",
          bands: [
            375,
            386,
            412,
            438,
            462,
            483,
            512,
            534,
            561,
            586,
            615,
            640,
            661,
            769,
            832
          ]
        },
        {
          label: "Broad bands",
          bands: [
            "u",
            "g",
            "r",
            "i",
            "z"
          ]
        }
      ]
    }
  },
  perBand: {
    eyebrow: "Availability",
    title: "How much sky each band has reached",
    body: "A band is only useful where it has been taken. Because each unit carries nine slots out of the {bandsInUse} bands in use, the array works through the set over many nights, and coverage runs well ahead in some bands and behind in others. The count below is tiles with at least one science frame in that band.",
    caption: "Tiles observed per band, of {ris.tiles_defined|num} in the reference grid",
    columns: [
      "Band",
      "Central \u03BB",
      "Tiles in the grid",
      "Of the grid",
      "Frames"
    ],
    footnote: "Counted over the original reference grid, so the percentages are comparable with the {ris.coverage_pct}% figure above. Broad bands are listed at their effective wavelength. Which bands a particular tile carries is reported on the [data access page](/users/access)."
  },
  response: {
    eyebrow: "Response",
    title: "Filter response curves",
    footnote: "Curves are read from the reference data shipped with [`supy`](/users/software), which is also what its simulator module uses, so a response computed there matches this figure exactly."
  },
  coverage: {
    eyebrow: "Coverage",
    title: "What has been observed",
    updated: "daily",
    body: "{ris.coverage_pct} percent of the reference tiling has been observed at least once: {ris.tiles_observed|num} of {ris.tiles_defined|num} tiles, or {ris.tiles_observed_extended|num} of {ris.tiles_extended|num} counting the northern extension. A tile with data has calibrated images and a source catalog.",
    layers: [
      {
        key: "grid",
        label: "RIS reference grid",
        note: "{risTiles|num} tiles"
      },
      {
        key: "ext",
        label: "Northern extension",
        note: "to Dec +30\xB0"
      },
      {
        key: "observed",
        label: "Observed",
        note: "colored by the scale below"
      },
      {
        key: "ims",
        label: "IMS field",
        note: "{imsTileCount} tiles"
      }
    ],
    unavailable: [
      {
        label: "WTS",
        note: "not started",
        aria: "WTS layer, unavailable: not started"
      },
      {
        label: "Target of opportunity",
        note: "positions not published",
        aria: "Target of opportunity layer, unavailable: positions not published"
      }
    ],
    footnote: "The reference grid is the survey as designed \u2014 every tile the array intends to reach \u2014 reconstructed from the tiling rule rather than published as a list, and checked against every observed tile. WTS has not begun and has no footprint to draw yet. Target-of- opportunity observations are made across the whole grid, and the portal publishes their counts but not their positions, so they cannot be drawn as a layer; the {too.followup_events|num} follow-up campaigns to date are summarized under [how to propose](/users/propose).",
    query: "Is this position observed?",
    buttons: [
      {
        label: "What the files look like",
        href: "/users/format"
      },
      {
        label: "Measured depths",
        href: "/users/performance"
      },
      {
        label: "Obtaining data",
        href: "/users/access"
      }
    ]
  },
  processing: {
    eyebrow: "Processing",
    title: "Processing status",
    body: "Data are reduced the same day they are taken. Raw frames are transferred from Chile overnight and a typical night clears the pipeline in about five hours of wall-clock time after transfer completes, so survey data are normally available the following day. Target-of-opportunity data skip compression and the wait for sunrise, which brings latency down to tens of minutes. What the pipeline produces, and the quality metrics attached to each product, are described under [using the data](/users/format)."
  }
};

// app/data/filters.json
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
import { jsx as jsx31, jsxs as jsxs24 } from "react/jsx-runtime";
var W2 = 960, H2 = 300, L2 = 46, R2 = 12, T2 = 12, B2 = 34;
function FilterCurves({
  showBroad = !0
}) {
  let medium = filters_default.medium, broad = filters_default.broad, shown = showBroad ? [...broad, ...medium] : medium, lamMin = 300, lamMax = 950, respMax = 0.62, sx2 = (nm) => L2 + (nm - lamMin) / (lamMax - lamMin) * (W2 - L2 - R2), sy2 = (r) => T2 + (1 - r / respMax) * (H2 - T2 - B2), line = (pts) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${sx2(p[0]).toFixed(1)},${sy2(p[1]).toFixed(1)}`).join(" "), area = (pts) => `${line(pts)} L${sx2(pts[pts.length - 1][0]).toFixed(1)},${sy2(0).toFixed(1)} L${sx2(
    pts[0][0]
  ).toFixed(1)},${sy2(0).toFixed(1)} Z`, xTicks = [400, 500, 600, 700, 800, 900], yTicks = [0, 0.2, 0.4, 0.6];
  return /* @__PURE__ */ jsxs24("figure", { className: "curves", children: [
    /* @__PURE__ */ jsxs24(
      "svg",
      {
        viewBox: `0 0 ${W2} ${H2}`,
        width: "100%",
        role: "img",
        "aria-label": "Response curves of the 7DT filter set, from 300 to 950 nanometers.",
        children: [
          /* @__PURE__ */ jsx31("g", { stroke: "var(--slate-200)", strokeWidth: "1", children: yTicks.map((t) => /* @__PURE__ */ jsx31("line", { x1: L2, x2: W2 - R2, y1: sy2(t), y2: sy2(t) }, t)) }),
          showBroad && broad.map((f) => /* @__PURE__ */ jsx31(
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
          medium.map((f) => /* @__PURE__ */ jsxs24("g", { children: [
            /* @__PURE__ */ jsx31("path", { d: area(f.pts), fill: wavelengthColor(f.center), opacity: "0.22" }),
            /* @__PURE__ */ jsx31("path", { d: line(f.pts), fill: "none", stroke: wavelengthColor(f.center), strokeWidth: "1.5" })
          ] }, f.name)),
          /* @__PURE__ */ jsxs24(
            "g",
            {
              fill: "var(--slate-500)",
              fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
              fontSize: "11",
              children: [
                xTicks.map((t) => /* @__PURE__ */ jsx31("text", { x: sx2(t), y: H2 - B2 + 18, textAnchor: "middle", children: t }, t)),
                yTicks.map((t) => /* @__PURE__ */ jsx31("text", { x: L2 - 8, y: sy2(t) + 3.5, textAnchor: "end", children: t.toFixed(1) }, t)),
                /* @__PURE__ */ jsx31("text", { x: (L2 + W2 - R2) / 2, y: H2 - 2, textAnchor: "middle", children: "Wavelength (nm)" }),
                /* @__PURE__ */ jsx31(
                  "text",
                  {
                    x: -(T2 + (H2 - T2 - B2) / 2),
                    y: 12,
                    textAnchor: "middle",
                    transform: "rotate(-90)",
                    children: "Response"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx31("line", { x1: L2, x2: W2 - R2, y1: sy2(0), y2: sy2(0), stroke: "var(--ink-900)", strokeWidth: "1" }),
          /* @__PURE__ */ jsx31("line", { x1: L2, x2: L2, y1: T2, y2: sy2(0), stroke: "var(--ink-900)", strokeWidth: "1" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs24("figcaption", { children: [
      /* @__PURE__ */ jsx31("b", { children: "Filter response" }),
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

// app/components/skymap.tsx
import { useCallback, useEffect as useEffect5, useMemo as useMemo2, useRef as useRef4, useState as useState6 } from "react";

// app/components/tiledetail.tsx
import { Fragment as Fragment4, jsx as jsx32, jsxs as jsxs25 } from "react/jsx-runtime";
var DAY_MS = 24 * 60 * 60 * 1e3, degLabel = (value) => `${value >= 0 ? "+" : "\u2212"}${Math.abs(value).toFixed(1)}\xB0`;
function dayLabel(index, epochDate) {
  return new Date(Date.parse(`${epochDate}T00:00:00Z`) + index * DAY_MS).toISOString().slice(0, 10);
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
  return /* @__PURE__ */ jsxs25(Fragment4, { children: [
    /* @__PURE__ */ jsxs25("div", { className: "skymap__tip-head", children: [
      /* @__PURE__ */ jsx32("span", { className: "skymap__tip-name", children: name }),
      /* @__PURE__ */ jsx32("span", { className: "skymap__tip-badge", children: "Observed" })
    ] }),
    /* @__PURE__ */ jsxs25("dl", { className: "skymap__tip-grid", children: [
      /* @__PURE__ */ jsx32("dt", { children: "RA, Dec" }),
      /* @__PURE__ */ jsxs25("dd", { children: [
        ra.toFixed(1),
        "\xB0, ",
        degLabel(dec)
      ] }),
      /* @__PURE__ */ jsx32("dt", { children: "l, b" }),
      /* @__PURE__ */ jsxs25("dd", { children: [
        l.toFixed(1),
        "\xB0, ",
        degLabel(b)
      ] }),
      /* @__PURE__ */ jsx32("dt", { children: "Visits" }),
      /* @__PURE__ */ jsxs25("dd", { children: [
        tiles.visits[index].toLocaleString("en-US"),
        " ",
        tiles.visits[index] === 1 ? "night" : "nights"
      ] }),
      /* @__PURE__ */ jsx32("dt", { children: "Frames" }),
      /* @__PURE__ */ jsx32("dd", { children: frames.toLocaleString("en-US") }),
      exposureSec ? /* @__PURE__ */ jsxs25(Fragment4, { children: [
        /* @__PURE__ */ jsx32("dt", { children: "Exposure" }),
        /* @__PURE__ */ jsxs25("dd", { children: [
          "\u2248 ",
          duration(frames * exposureSec)
        ] })
      ] }) : null,
      detail && /* @__PURE__ */ jsxs25(Fragment4, { children: [
        /* @__PURE__ */ jsx32("dt", { children: "Filters" }),
        /* @__PURE__ */ jsx32("dd", { children: detail.count })
      ] }),
      /* @__PURE__ */ jsx32("dt", { children: "Dates" }),
      /* @__PURE__ */ jsxs25("dd", { children: [
        dayLabel(tiles.lastDay[index] - span, tiles.epochDate),
        span > 0 && /* @__PURE__ */ jsxs25(Fragment4, { children: [
          " \u2013 ",
          dayLabel(tiles.lastDay[index], tiles.epochDate)
        ] })
      ] })
    ] }),
    detail && /* @__PURE__ */ jsxs25(Fragment4, { children: [
      /* @__PURE__ */ jsx32("div", { className: "skymap__tip-bands", children: detail.strip.map((band) => /* @__PURE__ */ jsx32(
        "span",
        {
          className: "skymap__tip-band",
          title: `${band.name}: ${band.frames} frames`,
          children: /* @__PURE__ */ jsx32(
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
      /* @__PURE__ */ jsxs25("div", { className: "skymap__tip-scale", children: [
        /* @__PURE__ */ jsx32("span", { children: "400 nm" }),
        /* @__PURE__ */ jsx32("span", { children: "frames per medium band" }),
        /* @__PURE__ */ jsx32("span", { children: "875 nm" })
      ] }),
      detail.broad.length > 0 && /* @__PURE__ */ jsx32("p", { className: "skymap__tip-broad", children: detail.broad.map((band) => /* @__PURE__ */ jsxs25("span", { children: [
        /* @__PURE__ */ jsx32("b", { children: band.name }),
        " ",
        band.frames.toLocaleString("en-US")
      ] }, band.name)) })
    ] })
  ] });
}

// app/lib/tilegrid.ts
var DEC_STEP = 0.8490566037735849, RING = [
  1,
  7,
  11,
  15,
  19,
  23,
  27,
  31,
  36,
  40,
  44,
  48,
  52,
  56,
  60,
  64,
  68,
  72,
  76,
  80,
  84,
  88,
  92,
  96,
  100,
  103,
  107,
  111,
  115,
  119,
  122,
  126,
  130,
  133,
  137,
  141,
  144,
  148,
  151,
  155,
  158,
  162,
  165,
  168,
  171,
  175,
  178,
  181,
  184,
  187,
  190,
  193,
  196,
  199,
  202,
  205,
  208,
  211,
  213,
  216,
  219,
  221,
  224,
  226,
  228,
  231,
  233,
  235,
  238,
  240,
  242,
  244,
  246,
  248,
  250,
  252,
  253,
  255,
  257,
  258,
  260,
  261,
  263,
  264,
  266,
  267,
  268,
  269,
  270,
  271,
  272,
  273,
  274,
  275,
  276,
  276,
  277,
  277,
  278,
  278,
  279,
  279,
  279,
  279,
  280,
  280,
  280,
  280,
  280,
  279,
  279,
  279,
  279,
  278,
  278,
  277,
  277,
  276,
  276,
  275,
  274,
  273,
  272,
  271,
  270,
  269,
  268,
  267,
  266,
  264,
  263,
  261,
  260,
  258,
  257,
  255,
  253,
  252,
  250,
  248,
  246,
  244
], RING_START = (() => {
  let out = [], at = 0;
  for (let n of RING)
    out.push(at), at += n;
  return out;
})(), GRID_TILES = RING_START[RING.length - 1] + RING[RING.length - 1], EXTENSION_FROM = 25472, RIS_TILES = EXTENSION_FROM;
function tileGrid(from = 0, to = GRID_TILES) {
  let start = Math.max(0, from), end = Math.min(GRID_TILES, to), count = Math.max(0, end - start), ra = new Float64Array(count), dec = new Float64Array(count), ring = 0;
  for (; ring < RING.length - 1 && RING_START[ring + 1] <= start; )
    ring += 1;
  for (let i = 0; i < count; i += 1) {
    let id = start + i;
    for (; ring < RING.length - 1 && RING_START[ring + 1] <= id; )
      ring += 1;
    ra[i] = (id - RING_START[ring]) * 360 / RING[ring], dec[i] = -90 + ring * DEC_STEP;
  }
  return { ra, dec, count };
}

// app/components/skymap.tsx
import { Fragment as Fragment5, jsx as jsx33, jsxs as jsxs26 } from "react/jsx-runtime";
var DEG = Math.PI / 180, FOV_LON = 1.34, FOV_LAT = 0.9, RATIO = 0.52, TABLE_STEP = 0.1, TABLE = (() => {
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
var DAY_MS2 = 24 * 60 * 60 * 1e3;
function shortDuration(seconds) {
  return seconds >= 3600 ? `${(seconds / 3600).toFixed(seconds >= 36e3 ? 0 : 1)} h` : seconds >= 60 ? `${Math.round(seconds / 60)} min` : `${Math.round(seconds)} s`;
}
function SkyMap({
  tiles,
  exposureSec,
  emphasize,
  interactive = !0,
  planned,
  showObserved = !0,
  modeToggle,
  depthRef,
  defaultMode,
  caption,
  theme = "light"
}) {
  let dark = theme === "dark", canvasRef = useRef4(null), wrapRef = useRef4(null), hasExposure = Boolean(exposureSec && exposureSec > 0 && tiles.frames), canDepth = Boolean(depthRef && hasExposure && tiles.filters && tiles.patterns), [mode2, setMode] = useState6(
    defaultMode ?? (canDepth ? "depth" : hasExposure ? "exposure" : "visits")
  ), [frame, setFrame] = useState6("equatorial"), [width, setWidth] = useState6(960), [probe, setProbe] = useState6(null), hover = probe?.tile ?? null, ids2 = useMemo2(() => {
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
      let at = new Date(epochMs + tiles.lastDay[i] * DAY_MS2), m = (at.getUTCFullYear() - Number(tiles.epochDate.slice(0, 4))) * 12 + (at.getUTCMonth() + 1 - Number(tiles.epochDate.slice(5, 7)));
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
  }, [frame, tiles]), plannedProjected = useMemo2(() => {
    if (!planned)
      return null;
    let grid = tileGrid(planned.from ?? 0, planned.to ?? GRID_TILES), xs = new Float64Array(grid.count), ys = new Float64Array(grid.count), lat = new Float64Array(grid.count);
    for (let i = 0; i < grid.count; i += 1) {
      let lon = grid.ra[i], b = grid.dec[i];
      frame === "galactic" && ([lon, b] = equatorialToGalactic(lon, b));
      let [x, y] = project(lon, b);
      xs[i] = x, ys[i] = y, lat[i] = b;
    }
    return { xs, ys, lat, count: grid.count };
  }, [planned?.from, planned?.to, frame]), projected = useMemo2(() => {
    let xs = new Float64Array(tiles.count), ys = new Float64Array(tiles.count);
    for (let i = 0; i < tiles.count; i += 1) {
      let [x, y] = project(coords.lon[i], coords.lat[i]);
      xs[i] = x, ys[i] = y;
    }
    return { xs, ys };
  }, [coords, tiles.count]), visitScale = useMemo2(() => Math.log(tiles.visitsMax + 1), [tiles.visitsMax]), exposureScale = useMemo2(
    () => hasExposure ? Math.log(tiles.framesMax * exposureSec + 1) : 1,
    [hasExposure, tiles.framesMax, exposureSec]
  ), bandFrames = useMemo2(() => {
    if (!depthRef || !tiles.filters || !tiles.pattern || !tiles.patterns)
      return null;
    let band = tiles.filters.indexOf(depthRef.band);
    if (band < 0)
      return null;
    let perPattern = tiles.patterns.map((flat) => {
      for (let k = 0; k < flat.length; k += 2)
        if (flat[k] === band)
          return flat[k + 1];
      return 0;
    }), out = new Int32Array(tiles.count);
    for (let i = 0; i < tiles.count; i += 1)
      out[i] = perPattern[tiles.pattern[i]] ?? 0;
    return out;
  }, [depthRef, tiles]), depthOf = useCallback(
    (i) => {
      if (!depthRef || !hasExposure || !bandFrames)
        return NaN;
      let seconds = bandFrames[i] * depthRef.frameSec;
      return seconds <= 0 ? NaN : depthRef.mag + 1.25 * Math.log10(seconds / depthRef.sec);
    },
    [depthRef, hasExposure, bandFrames, exposureSec]
  ), depthRange = useMemo2(() => {
    if (!depthRef || !hasExposure || !bandFrames)
      return null;
    let lo = 1 / 0, hi = -1 / 0;
    for (let i = 0; i < tiles.count; i += 1) {
      let d = depthOf(i);
      Number.isFinite(d) && (d < lo && (lo = d), d > hi && (hi = d));
    }
    return Number.isFinite(lo) ? hi - lo < 0.05 ? { lo: lo - 0.25, hi: hi + 0.25 } : { lo, hi } : null;
  }, [depthRef, hasExposure, bandFrames, tiles.count, depthOf]), modes = useMemo2(() => {
    let out = [];
    return depthRange && out.push({ key: "depth", label: "Depth" }), hasExposure && out.push({ key: "exposure", label: "Exposure time" }), out.push({ key: "visits", label: "Visits" }), out.push({ key: "date", label: "Last visit" }), out;
  }, [depthRange, hasExposure]);
  useEffect5(() => {
    modes.some((m) => m.key === mode2) || setMode(modes[0].key);
  }, [modes, mode2]);
  let value = useCallback(
    (i) => {
      if (mode2 === "depth" && depthRange) {
        let d = depthOf(i);
        return Number.isFinite(d) ? (d - depthRange.lo) / (depthRange.hi - depthRange.lo) : 0;
      }
      if (mode2 === "exposure" && hasExposure) {
        let seconds = (tiles.frames?.[i] ?? 0) * exposureSec;
        return Math.log(seconds + 1) / exposureScale;
      }
      return mode2 === "date" ? months.max > 0 ? months.index[i] / months.max : 1 : Math.log(tiles.visits[i] + 1) / visitScale;
    },
    [mode2, tiles, visitScale, months, depthRange, depthOf, hasExposure, exposureSec, exposureScale]
  );
  useEffect5(() => {
    let element = wrapRef.current;
    if (!element)
      return;
    let measure = () => setWidth(element.clientWidth || 960);
    if (measure(), typeof ResizeObserver > "u")
      return window.addEventListener("resize", measure), () => window.removeEventListener("resize", measure);
    let observer = new ResizeObserver(measure);
    return observer.observe(element), () => observer.disconnect();
  }, []), useEffect5(() => {
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
    if (ctx.save(), ctx.beginPath(), ctx.ellipse(cx, cy, 2 * scale, scale, 0, 0, Math.PI * 2), ctx.clip(), ctx.fillStyle = dark ? "rgba(255,255,255,0.05)" : "#eceff4", ctx.fillRect(0, 0, width, height), plannedProjected) {
      ctx.fillStyle = dark ? "rgba(255,255,255,0.13)" : "rgba(10,16,28,0.13)";
      for (let i = 0; i < plannedProjected.count; i += 1) {
        let lat = plannedProjected.lat[i], t = theta(lat), dLon = FOV_LON / Math.max(0.02, Math.cos(lat * DEG)), w = Math.max(1.1, 2 / Math.PI * dLon * DEG * Math.cos(t) * scale), hi = Math.min(90, lat + FOV_LAT / 2), lo = Math.max(-90, lat - FOV_LAT / 2), h = Math.max(1.1, (Math.sin(theta(hi)) - Math.sin(theta(lo))) * scale);
        ctx.fillRect(
          px(plannedProjected.xs[i]) - w / 2,
          py(plannedProjected.ys[i]) - h / 2,
          w,
          h
        );
      }
    }
    for (let i = 0; showObserved && i < tiles.count; i += 1) {
      let lat = coords.lat[i], t = theta(lat), [x, y] = project(coords.lon[i], lat), dLon = FOV_LON / Math.max(0.02, Math.cos(lat * DEG)), w = Math.max(1.1, 2 / Math.PI * dLon * DEG * Math.cos(t) * scale), hi = Math.min(90, lat + FOV_LAT / 2), lo = Math.max(-90, lat - FOV_LAT / 2), h = Math.max(1.1, (Math.sin(theta(hi)) - Math.sin(theta(lo))) * scale);
      ctx.fillStyle = emphasized && !emphasized[i] ? dark ? "rgba(255,255,255,0.12)" : "rgba(10,16,28,0.10)" : rgb(sequential(value(i), dark)), ctx.fillRect(px(x) - w / 2, py(y) - h / 2, w, h);
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
  }, [tiles, coords, projected, plannedProjected, showObserved, frame, width, value, emphasized, dark]);
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
      let dx = rect.width / 2 + projected.xs[i] * scale - mx, dy = height / 2 - projected.ys[i] * scale - my, distance = dx * dx + dy * dy;
      distance < bestDistance && (bestDistance = distance, best = i);
    }
    let [lon, lat] = sky, equatorial = best >= 0 ? [tiles.ra[best], tiles.dec[best]] : frame === "equatorial" ? [lon, lat] : galacticToEquatorial(lon, lat), galactic = best >= 0 ? frame === "galactic" ? [coords.lon[best], coords.lat[best]] : equatorialToGalactic(tiles.ra[best], tiles.dec[best]) : frame === "galactic" ? [lon, lat] : equatorialToGalactic(lon, lat), mark = null;
    if (best >= 0) {
      let lat2 = coords.lat[best], t = theta(lat2), dLon = FOV_LON / Math.max(0.02, Math.cos(lat2 * DEG)), hiLat = Math.min(90, lat2 + FOV_LAT / 2), loLat = Math.max(-90, lat2 - FOV_LAT / 2);
      mark = {
        x: rect.width / 2 + projected.xs[best] * scale,
        y: height / 2 - projected.ys[best] * scale,
        w: Math.max(5, 2 / Math.PI * dLon * DEG * Math.cos(t) * scale),
        h: Math.max(5, (Math.sin(theta(hiLat)) - Math.sin(theta(loLat))) * scale)
      };
    }
    setProbe({
      x: mx,
      y: my,
      tile: best >= 0 ? best : null,
      mark,
      ra: equatorial[0],
      dec: equatorial[1],
      l: galactic[0],
      b: galactic[1]
    });
  }, showModes = (modeToggle ?? interactive) && modes.length > 1, legendStops = useMemo2(
    () => Array.from({ length: 12 }, (_, i) => rgb(sequential(i / 11, dark))).join(", "),
    []
  ), legendTicks = useMemo2(() => mode2 === "depth" && depthRange ? [0, 0.5, 1].map((t) => (depthRange.lo + t * (depthRange.hi - depthRange.lo)).toFixed(1)) : mode2 === "exposure" ? [0, 0.5, 1].map((t) => shortDuration(Math.exp(t * exposureScale) - 1)) : mode2 === "date" ? [0, 0.5, 1].map((t) => monthLabel(Math.round(t * months.max), epoch)) : [0, 0.5, 1].map((t) => `${Math.round(Math.exp(t * visitScale) - 1).toLocaleString("en-US")}`), [mode2, tiles, visitScale, months, epoch, depthRange, exposureScale]), legendTitle = mode2 === "depth" ? `Estimated 5\u03C3 depth${depthRef ? ` \xB7 ${depthRef.band}` : ""}` : mode2 === "exposure" ? "Estimated integration time" : mode2 === "date" ? "Last observed" : "Visits per tile";
  return /* @__PURE__ */ jsxs26("div", { className: `skymap${dark ? " skymap--dark" : ""}`, children: [
    (interactive || showModes) && /* @__PURE__ */ jsxs26("div", { className: "skymap__controls", children: [
      interactive && /* @__PURE__ */ jsxs26("div", { className: "skymap__modes", role: "group", "aria-label": "Coordinate system", children: [
        /* @__PURE__ */ jsx33(
          "button",
          {
            type: "button",
            className: "toggle-btn",
            "aria-pressed": frame === "equatorial",
            onClick: () => setFrame("equatorial"),
            children: "RA / Dec"
          }
        ),
        /* @__PURE__ */ jsx33(
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
      showModes && /* @__PURE__ */ jsx33("div", { className: "skymap__modes", role: "group", "aria-label": "Color the map by", children: modes.map((option) => /* @__PURE__ */ jsx33(
        "button",
        {
          type: "button",
          className: "toggle-btn",
          "aria-pressed": mode2 === option.key,
          onClick: () => setMode(option.key),
          children: option.label
        },
        option.key
      )) }),
      interactive && /* @__PURE__ */ jsx33("span", { className: "skymap__readout", role: "status", children: probe === null ? caption ?? `${tiles.count.toLocaleString("en-US")} tiles observed` : hover === null ? /* @__PURE__ */ jsxs26(Fragment5, { children: [
        "RA ",
        probe.ra.toFixed(1),
        "\xB0 Dec ",
        degLabel(probe.dec),
        " \xB7 not observed"
      ] }) : /* @__PURE__ */ jsxs26(Fragment5, { children: [
        /* @__PURE__ */ jsx33("b", { children: nameAt(hover) }),
        " \xB7",
        " ",
        frame === "equatorial" ? /* @__PURE__ */ jsxs26(Fragment5, { children: [
          "RA ",
          probe.ra.toFixed(1),
          "\xB0 Dec ",
          degLabel(probe.dec)
        ] }) : /* @__PURE__ */ jsxs26(Fragment5, { children: [
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
    /* @__PURE__ */ jsxs26("div", { className: "skymap__canvas", ref: wrapRef, children: [
      /* @__PURE__ */ jsx33(
        "canvas",
        {
          ref: canvasRef,
          style: { width: "100%", display: "block" },
          onPointerMove: interactive ? onMove : void 0,
          onPointerLeave: interactive ? () => setProbe(null) : void 0,
          role: "img",
          "aria-label": `Mollweide all-sky map of ${tiles.count.toLocaleString(
            "en-US"
          )} observed 7DS tiles in ${frame === "equatorial" ? "equatorial" : "galactic"} coordinates, colored by ${mode2 === "depth" ? "the estimated depth reached on each" : mode2 === "exposure" ? "the estimated integration time on each" : mode2 === "date" ? "the date each was last observed" : "the number of visits to each"}. Longitude increases to the left.`
        }
      ),
      probe?.mark && /* @__PURE__ */ jsx33(
        "span",
        {
          className: "skymap__mark",
          "aria-hidden": "true",
          style: {
            left: probe.mark.x,
            top: probe.mark.y,
            width: probe.mark.w,
            height: probe.mark.h
          }
        }
      ),
      probe && /* @__PURE__ */ jsx33(
        "div",
        {
          className: `skymap__tip${probe.x > width * 0.55 ? " skymap__tip--left" : ""}${probe.y > width * RATIO * 0.55 ? " skymap__tip--up" : ""}`,
          style: { left: probe.x, top: probe.y },
          "aria-hidden": "true",
          children: hover === null ? /* @__PURE__ */ jsxs26(Fragment5, { children: [
            /* @__PURE__ */ jsxs26("div", { className: "skymap__tip-head", children: [
              /* @__PURE__ */ jsx33("span", { className: "skymap__tip-name", children: "No observation" }),
              /* @__PURE__ */ jsx33("span", { className: "skymap__tip-badge skymap__tip-badge--none", children: "Not observed" })
            ] }),
            /* @__PURE__ */ jsxs26("dl", { className: "skymap__tip-grid", children: [
              /* @__PURE__ */ jsx33("dt", { children: "RA" }),
              /* @__PURE__ */ jsxs26("dd", { children: [
                probe.ra.toFixed(1),
                "\xB0"
              ] }),
              /* @__PURE__ */ jsx33("dt", { children: "Dec" }),
              /* @__PURE__ */ jsx33("dd", { children: degLabel(probe.dec) }),
              /* @__PURE__ */ jsx33("dt", { children: "l, b" }),
              /* @__PURE__ */ jsxs26("dd", { children: [
                probe.l.toFixed(1),
                "\xB0, ",
                degLabel(probe.b)
              ] })
            ] }),
            /* @__PURE__ */ jsx33("p", { className: "skymap__tip-note", children: "No science frames recorded at this position." })
          ] }) : /* @__PURE__ */ jsx33(
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
    /* @__PURE__ */ jsxs26("div", { className: "skymap__legend", children: [
      /* @__PURE__ */ jsx33("span", { className: "skymap__legend-title", children: legendTitle }),
      /* @__PURE__ */ jsx33("div", { className: "skymap__ramp", style: { background: `linear-gradient(to right, ${legendStops})` } }),
      /* @__PURE__ */ jsx33("div", { className: "skymap__ticks", children: legendTicks.map((tick, index) => /* @__PURE__ */ jsx33("span", { children: tick }, tick + index)) })
    ] })
  ] });
}

// app/components/tilequery.tsx
import React9, { useMemo as useMemo3, useState as useState7 } from "react";
import { Fragment as Fragment6, jsx as jsx34, jsxs as jsxs27 } from "react/jsx-runtime";
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
  let [ra, setRa] = useState7(""), [dec, setDec] = useState7(""), [query, setQuery] = useState7(null), [error, setError] = useState7(null), ids2 = useMemo3(() => {
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
  return /* @__PURE__ */ jsxs27("div", { className: "tilequery", children: [
    /* @__PURE__ */ jsxs27("div", { children: [
      /* @__PURE__ */ jsxs27("form", { className: "tilequery__form", onSubmit: submit, children: [
        /* @__PURE__ */ jsxs27("div", { className: "tilequery__field", children: [
          /* @__PURE__ */ jsx34("label", { htmlFor: "q-ra", children: "Right ascension" }),
          /* @__PURE__ */ jsx34(
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
        /* @__PURE__ */ jsxs27("div", { className: "tilequery__field", children: [
          /* @__PURE__ */ jsx34("label", { htmlFor: "q-dec", children: "Declination" }),
          /* @__PURE__ */ jsx34(
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
        /* @__PURE__ */ jsx34("button", { className: "btn btn--primary", type: "submit", children: "Check coverage" })
      ] }),
      error && /* @__PURE__ */ jsx34("p", { className: "tilequery__error", children: error }),
      /* @__PURE__ */ jsxs27("p", { className: "tilequery__examples", children: [
        "Try",
        " ",
        EXAMPLES.map((example, index) => /* @__PURE__ */ jsxs27(React9.Fragment, { children: [
          index > 0 && ", ",
          /* @__PURE__ */ jsx34("button", { type: "button", onClick: () => useExample(example), children: example.label })
        ] }, example.label)),
        ". Right ascension is read as hours when written with colons or spaces, and as degrees when written as a single number."
      ] }),
      query && /* @__PURE__ */ jsxs27("p", { className: "note", style: { marginTop: "1rem" }, children: [
        "Queried RA ",
        query.ra.toFixed(3),
        "\xB0, Dec ",
        degLabel(query.dec),
        galactic && /* @__PURE__ */ jsxs27(Fragment6, { children: [
          " ",
          "\xB7 l ",
          galactic[0].toFixed(2),
          "\xB0, b ",
          degLabel(galactic[1])
        ] }),
        hit !== null ? " \u2014 this position falls on an observed tile." : " \u2014 no observed tile covers this position."
      ] })
    ] }),
    /* @__PURE__ */ jsx34("div", { className: "tilequery__result", "aria-live": "polite", children: query === null ? /* @__PURE__ */ jsx34("p", { className: "tilequery__empty", children: "Enter a position to see whether it has been observed and what exists for it." }) : hit !== null && galactic ? /* @__PURE__ */ jsx34(
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
    ) : /* @__PURE__ */ jsxs27(Fragment6, { children: [
      /* @__PURE__ */ jsxs27("div", { className: "skymap__tip-head", children: [
        /* @__PURE__ */ jsx34("span", { className: "skymap__tip-name", children: "No observation" }),
        /* @__PURE__ */ jsx34("span", { className: "skymap__tip-badge skymap__tip-badge--none", children: "Not observed" })
      ] }),
      /* @__PURE__ */ jsxs27("dl", { className: "skymap__tip-grid", children: [
        /* @__PURE__ */ jsx34("dt", { children: "RA" }),
        /* @__PURE__ */ jsxs27("dd", { children: [
          query.ra.toFixed(3),
          "\xB0"
        ] }),
        /* @__PURE__ */ jsx34("dt", { children: "Dec" }),
        /* @__PURE__ */ jsx34("dd", { children: degLabel(query.dec) }),
        galactic && /* @__PURE__ */ jsxs27(Fragment6, { children: [
          /* @__PURE__ */ jsx34("dt", { children: "l, b" }),
          /* @__PURE__ */ jsxs27("dd", { children: [
            galactic[0].toFixed(1),
            "\xB0, ",
            degLabel(galactic[1])
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx34("p", { className: "skymap__tip-note", children: "No science frames are recorded on the tile at this position. It may be outside the observable declination range, or not yet reached by the survey." })
    ] }) })
  ] });
}

// app/lib/portal.server.ts
import fs from "node:fs";
import path from "node:path";

// app/data/status-snapshot.json
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
var DAY_MS3 = 24 * 60 * 60 * 1e3, dayIndex = (iso, epochMs) => Math.round((Date.parse(`${iso}T00:00:00Z`) - epochMs) / DAY_MS3), BROADBAND_NM = { u: 355, g: 477, r: 623, i: 762, z: 913 };
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
      perFilter: Object.entries(raw.per_filter ?? {}).map(([name, v]) => ({
        name,
        nm: filterWavelength(name),
        tiles: v.tiles_observed,
        tilesRis: v.tiles_observed_ris,
        frames: v.n_frames
      })).sort((a, b) => a.nm - b.nm),
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
  let { span, pattern, filters, filterWave, patterns, name, nameDelta, ...rest } = full.data, data = withNames ? { ...rest, name, nameDelta } : rest, value = { ...full, data };
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

// app/routes/users.status.tsx
import { Fragment as Fragment7, jsx as jsx35, jsxs as jsxs28 } from "react/jsx-runtime";
var meta20 = () => metaOf(status_default), CACHE = "public, max-age=900, stale-while-revalidate=86400", headers = () => ({ "Cache-Control": CACHE });
async function loader6() {
  let [status, tiles] = await Promise.all([getStatus(), getTileMap()]), totals = status.data.totals, exposureSec = totals && totals.science_frames > 0 ? totals.exposure_hours * 3600 / totals.science_frames : null;
  return json(
    { ...status, tiles: tiles.data, tilesLive: tiles.live, exposureSec },
    { headers: { "Cache-Control": CACHE } }
  );
}
function CoverageMap({
  tiles,
  exposureSec,
  imsTiles,
  text
}) {
  let [on, setOn] = useState8({ grid: !0, ext: !1, observed: !0, ims: !1 }), toggle = (key) => setOn((was) => ({ ...was, [key]: !was[key] })), planned = useMemo4(() => on.grid && on.ext ? { from: 0, to: GRID_TILES } : on.grid ? { to: RIS_TILES } : on.ext ? { from: RIS_TILES, to: GRID_TILES } : null, [on.grid, on.ext]), BOXES = text.layers;
  return /* @__PURE__ */ jsxs28(Fragment7, { children: [
    /* @__PURE__ */ jsxs28("div", { className: "map-layers", children: [
      BOXES.map((box) => /* @__PURE__ */ jsxs28("label", { className: "map-layers__item", children: [
        /* @__PURE__ */ jsx35("input", { type: "checkbox", checked: on[box.key], onChange: () => toggle(box.key) }),
        /* @__PURE__ */ jsxs28("span", { children: [
          box.label,
          /* @__PURE__ */ jsx35("span", { className: "map-layers__note", children: box.note })
        ] })
      ] }, box.key)),
      text.unavailable.map((layer) => /* @__PURE__ */ jsxs28("span", { className: "map-layers__item map-layers__item--off", "aria-disabled": "true", children: [
        /* @__PURE__ */ jsx35("input", { type: "checkbox", disabled: !0, "aria-label": layer.aria }),
        /* @__PURE__ */ jsxs28("span", { children: [
          layer.label,
          /* @__PURE__ */ jsx35("span", { className: "map-layers__note", children: layer.note })
        ] })
      ] }, layer.label))
    ] }),
    /* @__PURE__ */ jsx35(
      SkyMap,
      {
        tiles,
        planned,
        showObserved: on.observed,
        emphasize: on.ims ? imsTiles : null,
        exposureSec
      }
    )
  ] });
}
var num = (value, digits = 0) => value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }), day = (iso) => new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }), FORMATS = { num: (v) => num(v), day: (v) => day(v) }, Index20 = () => {
  let { data, live, generatedAt, tiles, tilesLive, exposureSec } = useLoaderData(), { ris } = data, imsTiles = Object.keys(data.ims.cycles_per_tile ?? {}), vars = {
    ...data,
    bandsInUse: tiles.perFilter?.length ?? 37,
    imsTileCount: imsTiles.length,
    risTiles: RIS_TILES
  }, t = fillAll(status_default, vars, FORMATS), { hero: hero3, tonight, night, bands, perBand, response, coverage, processing } = t;
  return /* @__PURE__ */ jsxs28(PageLayout, { menu: "manuUsers", rail: !0, children: [
    /* @__PURE__ */ jsx35(PageHero, { eyebrow: hero3.eyebrow, title: hero3.title, lede: hero3.lede, image: hero3.image, meta: hero3.meta }),
    /* @__PURE__ */ jsxs28(Section, { eyebrow: tonight.eyebrow, title: tonight.title, children: [
      /* @__PURE__ */ jsx35("div", { style: { marginBottom: "1.5rem" }, children: /* @__PURE__ */ jsx35(LiveBadge, { live, updated: generatedAt, interval: tonight.updated }) }),
      /* @__PURE__ */ jsx35("p", { className: "prose", children: /* @__PURE__ */ jsx35(Md, { children: tonight.body }) }),
      /* @__PURE__ */ jsx35("div", { style: { marginTop: "2rem" }, children: /* @__PURE__ */ jsx35(StatGrid, { items: tonight.stats }) })
    ] }),
    /* @__PURE__ */ jsxs28(Section, { eyebrow: night.eyebrow, title: night.title, alt: !0, children: [
      /* @__PURE__ */ jsx35("p", { className: "prose", children: /* @__PURE__ */ jsx35(Md, { children: night.body }) }),
      /* @__PURE__ */ jsx35("div", { style: { marginTop: "2rem" }, children: /* @__PURE__ */ jsx35(StatGrid, { items: night.stats }) }),
      /* @__PURE__ */ jsx35("p", { className: "footnote", style: { marginTop: "1.25rem" }, children: /* @__PURE__ */ jsx35(Md, { children: night.footnote }) })
    ] }),
    /* @__PURE__ */ jsx35(Section, { eyebrow: bands.eyebrow, title: bands.title, children: /* @__PURE__ */ jsx35("div", { className: "split split--wide-text", children: /* @__PURE__ */ jsxs28("div", { children: [
      /* @__PURE__ */ jsx35(Paras, { className: "prose", children: bands.body }),
      /* @__PURE__ */ jsx35("div", { className: "table-wrap", style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsxs28("table", { className: "spec-table", children: [
        /* @__PURE__ */ jsx35("caption", { children: bands.table.caption }),
        /* @__PURE__ */ jsx35("tbody", { children: bands.table.rows.map((row) => /* @__PURE__ */ jsxs28("tr", { children: [
          /* @__PURE__ */ jsx35("th", { scope: "row", children: row.label }),
          /* @__PURE__ */ jsx35("td", { style: { fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }, children: row.bands.join(", ") })
        ] }, row.label)) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs28(Section, { eyebrow: perBand.eyebrow, title: perBand.title, alt: !0, wide: !0, children: [
      /* @__PURE__ */ jsx35("p", { className: "prose", children: /* @__PURE__ */ jsx35(Md, { children: perBand.body }) }),
      /* @__PURE__ */ jsx35("div", { className: "table-wrap", style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsxs28("table", { className: "spec-table", children: [
        /* @__PURE__ */ jsx35("caption", { children: perBand.caption }),
        /* @__PURE__ */ jsx35("thead", { children: /* @__PURE__ */ jsx35("tr", { children: perBand.columns.map((col) => /* @__PURE__ */ jsx35("th", { scope: "col", children: col }, col)) }) }),
        /* @__PURE__ */ jsx35("tbody", { children: (tiles.perFilter ?? []).map((f) => /* @__PURE__ */ jsxs28("tr", { children: [
          /* @__PURE__ */ jsx35("th", { scope: "row", style: { fontFamily: "var(--font-mono)" }, children: f.name }),
          /* @__PURE__ */ jsx35("td", { children: Number.isFinite(f.nm) ? `${f.nm} nm` : "\u2014" }),
          /* @__PURE__ */ jsx35("td", { children: num(f.tilesRis) }),
          /* @__PURE__ */ jsxs28("td", { children: [
            (f.tilesRis / ris.tiles_defined * 100).toFixed(1),
            "%"
          ] }),
          /* @__PURE__ */ jsx35("td", { children: num(f.frames) })
        ] }, f.name)) })
      ] }) }),
      /* @__PURE__ */ jsx35("p", { className: "footnote", style: { marginTop: "1rem" }, children: /* @__PURE__ */ jsx35(Md, { children: perBand.footnote }) })
    ] }),
    /* @__PURE__ */ jsxs28(Section, { eyebrow: response.eyebrow, title: response.title, wide: !0, children: [
      /* @__PURE__ */ jsx35(FilterCurves, {}),
      /* @__PURE__ */ jsx35("p", { className: "footnote", style: { marginTop: "1rem" }, children: /* @__PURE__ */ jsx35(Md, { children: response.footnote }) })
    ] }),
    /* @__PURE__ */ jsxs28(Section, { eyebrow: coverage.eyebrow, title: coverage.title, wide: !0, children: [
      /* @__PURE__ */ jsx35("p", { className: "prose", children: /* @__PURE__ */ jsx35(Md, { children: coverage.body }) }),
      /* @__PURE__ */ jsx35("div", { style: { margin: "1.5rem 0" }, children: /* @__PURE__ */ jsx35(LiveBadge, { live: tilesLive, updated: generatedAt, interval: coverage.updated }) }),
      /* @__PURE__ */ jsx35(CoverageMap, { tiles, exposureSec, imsTiles, text: coverage }),
      /* @__PURE__ */ jsx35("p", { className: "footnote", style: { marginTop: "1rem" }, children: /* @__PURE__ */ jsx35(Md, { children: coverage.footnote }) }),
      /* @__PURE__ */ jsxs28("div", { style: { marginTop: "2.5rem" }, children: [
        /* @__PURE__ */ jsx35("h3", { children: coverage.query }),
        /* @__PURE__ */ jsx35(TileQuery, { tiles, exposureSec })
      ] }),
      /* @__PURE__ */ jsx35(ButtonRow, { buttons: coverage.buttons, style: { marginTop: "2rem" } })
    ] }),
    /* @__PURE__ */ jsx35(Section, { eyebrow: processing.eyebrow, title: processing.title, alt: !0, children: /* @__PURE__ */ jsx35("p", { className: "prose", children: /* @__PURE__ */ jsx35(Md, { children: processing.body }) }) })
  ] });
}, users_status_default = Index20;

// app/routes/about.intro.tsx
var about_intro_exports = {};
__export(about_intro_exports, {
  default: () => about_intro_default,
  meta: () => meta21
});

// app/content/pages/about/intro.json
var intro_default = {
  meta: {
    title: "What is 7DS \xB7 7-Dimensional Telescope",
    description: "The 7-Dimensional Sky Survey: what it measures, why it is built as a medium-band survey, and how it has developed since first light in October 2023."
  },
  hero: {
    eyebrow: "About",
    title: "What is *7DS*?",
    lede: "A medium-band survey of the southern sky that measures a low-resolution spectrum for every source it observes, and repeats the measurement over time.",
    image: "/img/hero/about.jpg",
    meta: [
      {
        value: "23,000",
        unit: "deg\xB2",
        label: "Survey area"
      },
      {
        value: "40",
        label: "Medium bands",
        note: "35 installed"
      },
      {
        value: "30\u201370",
        label: "Spectral resolution R"
      },
      {
        value: "2023",
        label: "First light"
      }
    ]
  },
  motivation: {
    eyebrow: "Motivation",
    title: "Why a medium-band survey",
    body: [
      "Most optical surveys measure a source in a few broad bands, which constrains its spectrum only weakly. Identifying what a source is \u2014 and, for anything that varies, what is changing about it \u2014 then requires spectroscopic follow-up on a larger telescope, which is expensive and cannot be applied to more than a small fraction of detections. The result is a large gap between the number of sources a survey finds and the number it can characterize.",
      "7DS closes that gap by putting the spectral information into the survey itself. Imaging through a set of medium bands rather than a few broad ones gives every source a low-resolution spectrum at the moment it is detected, for the whole field at once and without follow-up. The immediate motivation was the search for optical counterparts to gravitational-wave events, where candidates must be classified quickly and in large numbers; the same capability applies to any survey question that depends on knowing what a source is rather than only how bright it is."
    ],
    figure: {
      src: "/img/overview.png",
      alt: "Sky areas compared: a gravitational-wave localization region set against the fields of view of 7DT and other survey telescopes",
      label: "Scale of the problem",
      caption: "A gravitational-wave localization region set against the field of view of 7DT and of other survey telescopes."
    }
  },
  name: {
    eyebrow: "The name",
    title: "Seven dimensions",
    body: "The name counts the measured axes of the data. Two of position on the sky, one of brightness, one of wavelength and one of time come directly from the observations; distance and radial velocity are derived from the medium-band spectral energy distribution. A single visit therefore records where a source is, how bright it is, what its spectrum looks like, and how both change with time."
  },
  approach: {
    eyebrow: "Approach",
    title: "Spectral mapping and the time domain",
    body: [
      "7DS is a spectral-mapping survey of the southern sky. Rather than measuring a few broadband colors, it images through medium-band filters of about 25 nm width, so each visit yields a spectral energy distribution at R = 30-70 for every source in the field. Applied over 23,000 square degrees, this produces a homogeneous low-resolution spectroscopic map of the southern sky, and applied repeatedly it measures how those spectra change with time.",
      "The survey combines two capabilities that are usually separate. Spectral mapping: each visit samples the spectrum of every source in a 1.25 square-degree field at R = 30-70 between 375 and 875 nm, which is enough to locate the 4000 Angstrom break and strong emission lines, and so to estimate redshifts and stellar populations directly from imaging. Time domain: the same field can be revisited on cadences from one day to two weeks, so the spectral measurement becomes a time series rather than a single epoch.",
      "Sampling a spectrum at this resolution costs exposures: a full medium-band set is many more frames than a broadband survey takes for the same field. The array is what makes that affordable, and the trade is set out under the telescope and the survey design."
    ],
    detail: {
      title: "Where the detail is",
      items: [
        "How the three surveys divide area, cadence and depth \u2014 [survey design](/survey/overview).",
        "What the array is and why it is built as an array \u2014 [the telescope](/telescope/overview).",
        "What the measurement is used for \u2014 [science](/science/overview)."
      ]
    }
  },
  history: {
    eyebrow: "History",
    title: "From first light to survey operation",
    milestones: [
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
    ],
    next: {
      title: "Continue",
      links: [
        {
          label: "Survey design",
          href: "/survey/overview"
        },
        {
          label: "Team",
          href: "/about/team"
        },
        {
          label: "Funding",
          href: "/about/funding"
        },
        {
          label: "For users",
          href: "/users/status"
        }
      ]
    }
  }
};

// app/routes/about.intro.tsx
import { jsx as jsx36, jsxs as jsxs29 } from "react/jsx-runtime";
var meta21 = () => metaOf(intro_default), Index21 = () => {
  let { hero: hero3, motivation, name, approach, history } = intro_default;
  return /* @__PURE__ */ jsxs29(PageLayout, { menu: "manuAbout", rail: !0, children: [
    /* @__PURE__ */ jsx36(
      PageHero,
      {
        eyebrow: hero3.eyebrow,
        title: /* @__PURE__ */ jsx36(Md, { children: hero3.title }),
        lede: hero3.lede,
        image: hero3.image,
        meta: hero3.meta
      }
    ),
    /* @__PURE__ */ jsx36(Section, { id: "motivation", eyebrow: motivation.eyebrow, title: motivation.title, children: /* @__PURE__ */ jsxs29("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsx36("div", { children: /* @__PURE__ */ jsx36(Paras, { className: "prose", children: motivation.body }) }),
      /* @__PURE__ */ jsxs29("figure", { className: "figure", children: [
        /* @__PURE__ */ jsx36("img", { src: motivation.figure.src, alt: motivation.figure.alt, loading: "lazy" }),
        /* @__PURE__ */ jsxs29("figcaption", { children: [
          /* @__PURE__ */ jsx36("b", { children: motivation.figure.label }),
          " ",
          /* @__PURE__ */ jsx36(Md, { children: motivation.figure.caption })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx36(Section, { eyebrow: name.eyebrow, title: name.title, alt: !0, children: /* @__PURE__ */ jsxs29("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsx36("p", { className: "prose", children: /* @__PURE__ */ jsx36(Md, { children: name.body }) }),
      /* @__PURE__ */ jsx36("ul", { className: "feature-list", style: { margin: 0 }, children: surveys_default.dimensions.map((dim) => /* @__PURE__ */ jsxs29("li", { style: { padding: "0.6rem 0" }, children: [
        /* @__PURE__ */ jsx36("span", { className: "feature-list__key", children: dim.n }),
        /* @__PURE__ */ jsx36("div", { children: /* @__PURE__ */ jsx36("h3", { className: "feature-list__title", style: { margin: 0, fontSize: "1rem" }, children: dim.label }) })
      ] }, dim.n)) })
    ] }) }),
    /* @__PURE__ */ jsx36(Section, { eyebrow: approach.eyebrow, title: approach.title, children: /* @__PURE__ */ jsxs29("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsx36("div", { children: /* @__PURE__ */ jsx36(Paras, { className: "prose", children: approach.body }) }),
      /* @__PURE__ */ jsxs29("div", { className: "panel", children: [
        /* @__PURE__ */ jsx36("div", { className: "panel__title", children: approach.detail.title }),
        /* @__PURE__ */ jsx36("ul", { className: "feature-list", style: { borderTop: 0, margin: 0 }, children: approach.detail.items.map((item) => /* @__PURE__ */ jsx36("li", { style: { gridTemplateColumns: "minmax(0, 1fr)" }, children: /* @__PURE__ */ jsx36("div", { children: /* @__PURE__ */ jsx36("p", { className: "feature-list__body", style: { margin: 0 }, children: /* @__PURE__ */ jsx36(Md, { children: item }) }) }) }, item)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs29(Section, { id: "history", eyebrow: history.eyebrow, title: history.title, alt: !0, children: [
      /* @__PURE__ */ jsx36("ol", { className: "timeline", children: history.milestones.map((item) => /* @__PURE__ */ jsxs29("li", { children: [
        /* @__PURE__ */ jsx36("span", { className: "timeline__when", children: item.when }),
        /* @__PURE__ */ jsxs29("div", { className: "timeline__body", children: [
          /* @__PURE__ */ jsx36("h3", { children: item.what }),
          /* @__PURE__ */ jsx36("p", { children: /* @__PURE__ */ jsx36(Md, { children: item.body }) })
        ] })
      ] }, item.when)) }),
      /* @__PURE__ */ jsx36("div", { style: { marginTop: "2.5rem" }, children: /* @__PURE__ */ jsx36(NextLinks, { title: history.next.title, links: history.next.links }) })
    ] })
  ] });
}, about_intro_default = Index21;

// app/routes/science.agn.tsx
var science_agn_exports = {};
__export(science_agn_exports, {
  default: () => science_agn_default,
  meta: () => meta22
});
import { jsx as jsx37 } from "react/jsx-runtime";
var meta22 = () => topicMeta("agn"), Index22 = () => /* @__PURE__ */ jsx37(ScienceTopic, { id: "agn" }), science_agn_default = Index22;

// app/routes/science.mma.tsx
var science_mma_exports = {};
__export(science_mma_exports, {
  default: () => science_mma_default,
  meta: () => meta23
});
import { jsx as jsx38 } from "react/jsx-runtime";
var meta23 = () => topicMeta("mma"), Index23 = () => /* @__PURE__ */ jsx38(ScienceTopic, { id: "mma" }), science_mma_default = Index23;

// app/routes/science.sci.tsx
var science_sci_exports = {};
__export(science_sci_exports, {
  loader: () => loader7
});
import { redirect as redirect6 } from "@remix-run/node";
function loader7() {
  return redirect6("/science/overview", 301);
}

// app/routes/users.links.tsx
var users_links_exports = {};
__export(users_links_exports, {
  default: () => users_links_default,
  headers: () => headers2,
  loader: () => loader8,
  meta: () => meta24
});
import { json as json2 } from "@remix-run/node";
import { useLoaderData as useLoaderData2 } from "@remix-run/react";

// app/content/pages/users/links.json
var links_default = {
  meta: {
    title: "Useful links \xB7 7DT for users",
    description: "Project services and observation calculators for users of the 7-Dimensional Telescope."
  },
  hero: {
    eyebrow: "For users",
    title: "Useful *links*",
    lede: "The services that support work with 7DT data. For partner surveys, vendors and institutions, see the site-wide links page.",
    image: "/img/hero/computer.jpg"
  },
  services: {
    eyebrow: "Services",
    title: "Project services",
    list: [
      {
        url: "https://proton.snu.ac.kr",
        name: "Project wiki",
        note: "User manuals, quality-assurance criteria and operating procedures for internal and external users of 7DT data."
      },
      {
        url: "https://proton.snu.ac.kr/pipeline",
        name: "Pipeline status",
        note: "Real-time progress of the nightly reduction, with quality-assurance summaries per night and per unit."
      },
      {
        url: "https://proton.snu.ac.kr/too",
        name: "Target-of-opportunity page",
        note: "Observation requests and the history of follow-up campaigns, including gravitational-wave events."
      },
      {
        key: "LINK_PORTAL",
        name: "Data server",
        note: "The observation database of record: images, catalogs, processing state and data quality."
      },
      {
        url: "https://github.com/7DimensionalTelescope",
        name: "7DT on GitHub",
        note: "The project organization. Every repository listed below lives here, including the pipeline, the control system and supy."
      }
    ],
    noneLinked: {
      title: "Not publicly linked",
      body: [
        "Four services support work with 7DT data \u2014 a project wiki carrying user manuals and quality-assurance criteria, a pipeline status page with per-night progress, a target-of-opportunity page holding observation requests and campaign history, and the observation database itself. They run on project infrastructure and are reached through the collaboration rather than from this page.",
        "Ask the project for access, or see [data access](/users/access) for what can be obtained without it."
      ]
    },
    someUnlinked: "Services not listed here are reached through the collaboration rather than from this page."
  },
  calculators: {
    id: "calculators",
    eyebrow: "Calculators",
    title: "Observation calculators"
  }
};

// app/routes/users.links.tsx
import { jsx as jsx39, jsxs as jsxs30 } from "react/jsx-runtime";
var meta24 = () => metaOf(links_default), CACHE2 = "public, max-age=3600", headers2 = () => ({ "Cache-Control": CACHE2 }), SERVICES = links_default.services.list, configured = (key) => key && key.startsWith("LINK_") ? readEnv(key) : void 0;
async function loader8() {
  return json2(
    {
      services: SERVICES.map((service) => ({
        ...service,
        url: service.url ?? configured(service.key) ?? null
      }))
    },
    { headers: { "Cache-Control": CACHE2 } }
  );
}
var Index24 = () => {
  let { services } = useLoaderData2(), linked = services.filter((service) => service.url), { hero: hero3, services: section, calculators } = links_default;
  return /* @__PURE__ */ jsxs30(PageLayout, { menu: "manuUsers", children: [
    /* @__PURE__ */ jsx39(PageHero, { eyebrow: hero3.eyebrow, title: /* @__PURE__ */ jsx39(Md, { children: hero3.title }), lede: hero3.lede, image: hero3.image }),
    /* @__PURE__ */ jsxs30(Section, { eyebrow: section.eyebrow, title: section.title, children: [
      linked.length > 0 ? /* @__PURE__ */ jsx39("ul", { className: "feature-list", children: linked.map((service) => /* @__PURE__ */ jsxs30("li", { children: [
        /* @__PURE__ */ jsx39("span", { className: "feature-list__key", children: "\u2197" }),
        /* @__PURE__ */ jsxs30("div", { children: [
          /* @__PURE__ */ jsx39("h3", { className: "feature-list__title", children: /* @__PURE__ */ jsx39("a", { href: service.url ?? "#", target: "_blank", rel: "noreferrer", children: service.name }) }),
          /* @__PURE__ */ jsx39("p", { className: "feature-list__body", children: /* @__PURE__ */ jsx39(Md, { children: service.note }) })
        ] })
      ] }, service.name)) }) : /* @__PURE__ */ jsxs30("div", { className: "panel", style: { maxWidth: "68ch" }, children: [
        /* @__PURE__ */ jsx39("div", { className: "panel__title", children: section.noneLinked.title }),
        section.noneLinked.body.map((para, k, all) => /* @__PURE__ */ jsx39(
          "p",
          {
            className: "feature-list__body",
            style: { marginBottom: k === all.length - 1 ? 0 : "0.75rem" },
            children: /* @__PURE__ */ jsx39(Md, { children: para })
          },
          k
        ))
      ] }),
      linked.length > 0 && linked.length < services.length && /* @__PURE__ */ jsx39("p", { className: "footnote", style: { marginTop: "1rem" }, children: /* @__PURE__ */ jsx39(Md, { children: section.someUnlinked }) })
    ] }),
    /* @__PURE__ */ jsx39(Section, { id: calculators.id, eyebrow: calculators.eyebrow, title: calculators.title, alt: !0, children: /* @__PURE__ */ jsx39("div", { className: "grid grid-cols-2", children: tools.map((tool) => /* @__PURE__ */ jsxs30(
      "a",
      {
        className: "theme-card",
        href: tool.path,
        target: "_blank",
        rel: "noreferrer",
        children: [
          /* @__PURE__ */ jsx39("span", { className: "theme-card__index", children: tool.n }),
          /* @__PURE__ */ jsx39("h3", { className: "theme-card__title", children: tool.name }),
          /* @__PURE__ */ jsx39("p", { className: "theme-card__body", children: tool.question })
        ]
      },
      tool.slug
    )) }) })
  ] });
}, users_links_default = Index24;

// app/routes/about.team.tsx
var about_team_exports = {};
__export(about_team_exports, {
  default: () => about_team_default,
  meta: () => meta25
});

// app/content/data/team.json
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
      role: "Database Coordinator",
      title: "Associate Research Professor",
      affiliation: "Seoul National University",
      email: "seowon.chang@snu.ac.kr",
      imgName: "ChangSW.jpeg"
    },
    {
      name: "Prof. Donggeun Tak",
      role: "Software Coordinator",
      title: "Assistant Professor",
      affiliation: "Kyung Hee University",
      email: "donggeun.tak@gmail.com",
      webpage: "https://sites.google.com/view/khu-mma/",
      imgName: "TakDG.jpeg"
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

// app/content/data/collabs.json
var collabs_default = {
  collabs: [
    {
      id: 1,
      firstName: "Myungshin",
      lastName: "Im",
      affiliation: "Seoul National University",
      workingGroup: "Science, Multi-messenger",
      email: "myungshin.im@gmail.com"
    },
    {
      id: 2,
      firstName: "Ji Hoon",
      lastName: "Kim",
      affiliation: "Seoul National University",
      workingGroup: "Operations",
      email: "jhkim.astrosnu@gmail.com"
    },
    {
      id: 3,
      firstName: "Hyung Mok",
      lastName: "Lee",
      affiliation: "Seoul National University",
      workingGroup: "Science",
      email: ""
    },
    {
      id: 4,
      firstName: "Seo-Won",
      lastName: "Chang",
      affiliation: "Seoul National University",
      workingGroup: "Database",
      email: "seowon.chang@snu.ac.kr"
    },
    {
      id: 5,
      firstName: "Donggeun",
      lastName: "Tak",
      affiliation: "Kyung Hee University",
      workingGroup: "MMA, Transients",
      email: "donggeun.tak@gmail.com"
    },
    {
      id: 6,
      firstName: "Gregory S. H.",
      lastName: "Paek",
      affiliation: "University of Hawaii",
      workingGroup: "Photometric Calibration",
      email: "gregorypaek94@gmail.com"
    },
    {
      id: 7,
      firstName: "Hyeonho",
      lastName: "Choi",
      affiliation: "Seoul National University",
      workingGroup: "Telescope Control",
      email: "hhchoi1022@gmail.com"
    },
    {
      id: 8,
      firstName: "Donghwan",
      lastName: "Hyun",
      affiliation: "Seoul National University",
      workingGroup: "Data Pipeline",
      email: ""
    },
    {
      id: 9,
      firstName: "Chang-wan",
      lastName: "Kim",
      affiliation: "Seoul National University",
      workingGroup: "Operations",
      email: ""
    },
    {
      id: 10,
      firstName: "Won-Hyeong",
      lastName: "Lee",
      affiliation: "Seoul National University",
      workingGroup: "Data Pipeline",
      email: ""
    },
    {
      id: 11,
      firstName: "Danhyeuk",
      lastName: "Seol",
      affiliation: "Seoul National University",
      workingGroup: "Data Pipeline",
      email: ""
    },
    {
      id: 12,
      firstName: "Jangho",
      lastName: "Bae",
      affiliation: "Seoul National University",
      workingGroup: "Data Pipeline",
      email: ""
    }
  ]
};

// app/content/pages/about/team.json
var team_default2 = {
  meta: {
    title: "Team \xB7 7-Dimensional Telescope",
    description: "The people who build, operate and analyze 7DT and the 7-Dimensional Sky Survey."
  },
  hero: {
    eyebrow: "About",
    title: "The team",
    lede: "7DT is designed, built and operated by the Center for the Gravitational-wave Universe at Seoul National University, with collaborators across Korea and abroad.",
    image: "/img/hero/team.jpg",
    countLabel: "Core Members",
    meta: [
      {
        value: "7",
        label: "Science Groups"
      },
      {
        value: "SNU",
        label: "Host institution"
      }
    ]
  },
  core: {
    eyebrow: "Core team",
    title: "Who does what",
    homepage: "Homepage"
  },
  collaboration: {
    eyebrow: "Collaboration",
    title: "7DT/7DS team members",
    lede: "Members of the 7DT collaboration contributing to the instrument, operations, pipeline and science working groups.",
    caption: "7DT collaboration \u2014 {count} members",
    columns: [
      "Name",
      "Affiliation",
      "Working group",
      "Contact"
    ],
    note: "To join a working group or propose a collaboration, contact the principal investigator at [mim@astro.snu.ac.kr](mailto:mim@astro.snu.ac.kr)."
  }
};

// app/routes/about.team.tsx
import { Fragment as Fragment8, jsx as jsx40, jsxs as jsxs31 } from "react/jsx-runtime";
var meta25 = () => metaOf(team_default2), initials = (name) => name.replace(/^(Prof\.|Dr\.)\s+/, "").split(/\s+/).map((part) => part[0]).slice(0, 2).join(""), Index25 = () => {
  let { hero: hero3, core, collaboration } = team_default2;
  return /* @__PURE__ */ jsxs31(PageLayout, { menu: "manuAbout", children: [
    /* @__PURE__ */ jsx40(
      PageHero,
      {
        eyebrow: hero3.eyebrow,
        title: hero3.title,
        lede: hero3.lede,
        image: hero3.image,
        meta: [{ value: String(team_default.members.length), label: hero3.countLabel }, ...hero3.meta]
      }
    ),
    /* @__PURE__ */ jsx40(Section, { eyebrow: core.eyebrow, title: core.title, children: /* @__PURE__ */ jsx40("div", { className: "people-grid", children: team_default.members.map((member) => /* @__PURE__ */ jsxs31("div", { className: "person", children: [
      /* @__PURE__ */ jsx40(
        "div",
        {
          className: "person__portrait",
          style: member.imgName ? { backgroundImage: `url(/img/team/${member.imgName})` } : void 0,
          children: !member.imgName && initials(member.name)
        }
      ),
      /* @__PURE__ */ jsxs31("div", { children: [
        /* @__PURE__ */ jsx40("h3", { className: "person__name", children: member.name }),
        /* @__PURE__ */ jsx40("p", { className: "person__role", children: member.role }),
        /* @__PURE__ */ jsxs31("p", { className: "person__meta", children: [
          member.title && /* @__PURE__ */ jsxs31(Fragment8, { children: [
            member.title,
            /* @__PURE__ */ jsx40("br", {})
          ] }),
          member.affiliation
        ] }),
        /* @__PURE__ */ jsxs31("div", { className: "person__links", children: [
          member.webpage && /* @__PURE__ */ jsx40("a", { href: member.webpage, title: core.homepage, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsx40("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx40(
            "path",
            {
              fillRule: "evenodd",
              d: "M11.3 3.3a1 1 0 0 1 1.4 0l6 6 2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2 6-6Z",
              clipRule: "evenodd"
            }
          ) }) }),
          member.email && /* @__PURE__ */ jsx40("a", { href: `mailto:${member.email}`, title: member.email, children: /* @__PURE__ */ jsxs31(
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
                /* @__PURE__ */ jsx40("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
                /* @__PURE__ */ jsx40("path", { d: "m3 7 9 6 9-6" })
              ]
            }
          ) })
        ] })
      ] })
    ] }, member.name)) }) }),
    /* @__PURE__ */ jsxs31(Section, { eyebrow: collaboration.eyebrow, title: collaboration.title, alt: !0, wide: !0, children: [
      /* @__PURE__ */ jsx40("p", { className: "lede", children: /* @__PURE__ */ jsx40(Md, { children: collaboration.lede }) }),
      /* @__PURE__ */ jsx40("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs31("table", { className: "tier-table", children: [
        /* @__PURE__ */ jsx40("caption", { children: fill(collaboration.caption, { count: collabs_default.collabs.length }) }),
        /* @__PURE__ */ jsx40("thead", { children: /* @__PURE__ */ jsx40("tr", { children: collaboration.columns.map((col) => /* @__PURE__ */ jsx40("th", { scope: "col", children: col }, col)) }) }),
        /* @__PURE__ */ jsx40("tbody", { children: collabs_default.collabs.map((person) => /* @__PURE__ */ jsxs31("tr", { children: [
          /* @__PURE__ */ jsxs31("th", { scope: "row", style: { fontWeight: 600, color: "var(--ink-900)" }, children: [
            person.firstName,
            " ",
            person.lastName
          ] }),
          /* @__PURE__ */ jsx40("td", { style: { fontFamily: "var(--font-sans)" }, children: person.affiliation }),
          /* @__PURE__ */ jsx40("td", { style: { fontFamily: "var(--font-sans)" }, children: person.workingGroup }),
          /* @__PURE__ */ jsx40("td", { children: person.email ? /* @__PURE__ */ jsx40("a", { href: `mailto:${person.email}`, children: person.email }) : /* @__PURE__ */ jsx40("span", { style: { color: "var(--slate-400)" }, children: "\u2014" }) })
        ] }, person.id)) })
      ] }) }),
      /* @__PURE__ */ jsx40("p", { className: "note", style: { marginTop: "1rem" }, children: /* @__PURE__ */ jsx40(Md, { children: collaboration.note }) })
    ] })
  ] });
}, about_team_default = Index25;

// app/routes/survey.ims.tsx
var survey_ims_exports = {};
__export(survey_ims_exports, {
  default: () => survey_ims_default,
  headers: () => headers3,
  loader: () => loader9,
  meta: () => meta26
});
import { json as json3 } from "@remix-run/node";
import { useLoaderData as useLoaderData3 } from "@remix-run/react";

// app/components/surveypage.tsx
import { jsx as jsx41, jsxs as jsxs32 } from "react/jsx-runtime";
var T3 = shared_default.surveyPage;
function SurveyPage({
  content,
  tier: tier4,
  live,
  generatedAt,
  mapNode,
  percent,
  children
}) {
  let { hero: hero3, parameters, map, coverage, progress } = content, code = hero3.code;
  return /* @__PURE__ */ jsxs32(PageLayout, { menu: "manu7ds", children: [
    /* @__PURE__ */ jsx41(
      PageHero,
      {
        eyebrow: fill(T3.eyebrow, { code }),
        title: hero3.name,
        lede: hero3.lede,
        image: hero3.image,
        meta: hero3.meta
      }
    ),
    /* @__PURE__ */ jsx41(Section, { eyebrow: T3.strategy.eyebrow, title: T3.strategy.title, children: /* @__PURE__ */ jsxs32("div", { className: "split split--wide-text", children: [
      /* @__PURE__ */ jsxs32("div", { children: [
        /* @__PURE__ */ jsx41("p", { className: "rationale__goal", children: /* @__PURE__ */ jsx41(Md, { children: tier4.goal }) }),
        /* @__PURE__ */ jsx41("p", { className: "prose", children: /* @__PURE__ */ jsx41(Md, { children: tier4.rationale }) })
      ] }),
      /* @__PURE__ */ jsxs32("div", { children: [
        /* @__PURE__ */ jsxs32("div", { className: "panel", children: [
          /* @__PURE__ */ jsx41("div", { className: "panel__title", children: T3.strategy.trade }),
          /* @__PURE__ */ jsx41("p", { className: "feature-list__body", style: { margin: 0 }, children: /* @__PURE__ */ jsx41(Md, { children: tier4.tradeoff }) })
        ] }),
        /* @__PURE__ */ jsx41("div", { className: "table-wrap", style: { marginTop: "1.25rem" }, children: /* @__PURE__ */ jsxs32("table", { className: "spec-table", children: [
          /* @__PURE__ */ jsx41("caption", { children: T3.strategy.parameters }),
          /* @__PURE__ */ jsx41("tbody", { children: parameters.map((row) => /* @__PURE__ */ jsxs32("tr", { children: [
            /* @__PURE__ */ jsx41("th", { scope: "row", children: row[0] }),
            /* @__PURE__ */ jsx41("td", { children: row[1] })
          ] }, row[0])) })
        ] }) })
      ] })
    ] }) }),
    map && mapNode && /* @__PURE__ */ jsxs32(Section, { eyebrow: T3.map.eyebrow, title: map.title ?? T3.map.title, alt: !0, wide: !0, children: [
      /* @__PURE__ */ jsx41("div", { style: { marginBottom: "1.25rem" }, children: /* @__PURE__ */ jsx41(LiveBadge, { live, updated: generatedAt, interval: T3.map.updated }) }),
      mapNode,
      /* @__PURE__ */ jsxs32("p", { className: "footnote", style: { marginTop: "1rem" }, children: [
        /* @__PURE__ */ jsx41(Md, { children: map.note }),
        " ",
        /* @__PURE__ */ jsx41(Md, { children: T3.map.footnote })
      ] })
    ] }),
    coverage && /* @__PURE__ */ jsxs32(Section, { eyebrow: T3.coverage.eyebrow, title: T3.coverage.title, children: [
      /* @__PURE__ */ jsx41("div", { style: { marginBottom: "1.5rem" }, children: /* @__PURE__ */ jsx41(LiveBadge, { live, updated: generatedAt, interval: T3.coverage.updated }) }),
      /* @__PURE__ */ jsx41(StatGrid, { items: coverage }),
      progress && percent !== void 0 && /* @__PURE__ */ jsxs32("div", { className: "panel", style: { marginTop: "2rem" }, children: [
        /* @__PURE__ */ jsx41("div", { className: "panel__title", children: T3.coverage.status }),
        /* @__PURE__ */ jsx41("div", { className: "meter", role: "img", "aria-label": fill(T3.coverage.meter, { code, percent }), children: /* @__PURE__ */ jsx41("span", { className: "meter__fill meter__fill--spectrum", style: { width: `${percent}%` } }) }),
        /* @__PURE__ */ jsx41("p", { className: "note", style: { marginTop: "0.75rem", marginBottom: 0 }, children: /* @__PURE__ */ jsx41(Md, { children: progress.label }) }),
        progress.note && /* @__PURE__ */ jsx41("p", { className: "footnote", style: { marginTop: "0.5rem", marginBottom: 0 }, children: /* @__PURE__ */ jsx41(Md, { children: progress.note }) })
      ] })
    ] }),
    children,
    /* @__PURE__ */ jsx41(Section, { eyebrow: T3.related.eyebrow, title: T3.related.title, alt: !0, children: /* @__PURE__ */ jsx41("div", { className: "chip-row", children: T3.related.links.map((link) => /* @__PURE__ */ jsx41(SmartLink, { className: "chip", href: link.href, children: link.label }, link.href)) }) })
  ] });
}

// app/components/fieldmap.tsx
import { jsx as jsx42, jsxs as jsxs33 } from "react/jsx-runtime";
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
  }, shapes = tiles.map((t) => ({ tile: t, points: corners(t) })), xs = shapes.flatMap((s) => s.points.map((p) => p[0])).filter(Number.isFinite), ys = shapes.flatMap((s) => s.points.map((p) => p[1])).filter(Number.isFinite), pad = Math.max(fovLon, fovLat) * 0.45, minX = Math.min(...xs) - pad, maxX = Math.max(...xs) + pad, minY = Math.min(...ys) - pad, maxY = Math.max(...ys) + pad, PPD = 150, L3 = 52, B3 = 34, T4 = 10, R3 = 12, plotW = (maxX - minX) * PPD, plotH = (maxY - minY) * PPD, W3 = plotW + L3 + R3, H3 = plotH + T4 + B3, sx2 = (x) => L3 + (x - minX) * PPD, sy2 = (y) => T4 + (maxY - y) * PPD, maxValue = Math.max(...focus.map((t) => t.value), 1), minValue = Math.min(...focus.map((t) => t.value)), decs = [], ras = [], decSpan = fovLat + Math.abs(maxY - minY), decStep = step(decSpan), raStep = step((maxX - minX) / Math.cos(dec0 * DEG3));
  for (let d = Math.ceil((dec0 - 6) / decStep) * decStep; d <= dec0 + 6; d += decStep)
    decs.push(d);
  for (let r = Math.ceil((ra0 - 12) / raStep) * raStep; r <= ra0 + 12; r += raStep)
    ras.push(r);
  let path2 = (points) => points.filter((p) => Number.isFinite(p[0]) && Number.isFinite(p[1])).map((p, i) => `${i === 0 ? "M" : "L"}${sx2(p[0]).toFixed(1)},${sy2(p[1]).toFixed(1)}`).join(" "), decLine = (d) => {
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
  return /* @__PURE__ */ jsxs33("div", { className: "fieldmap", children: [
    /* @__PURE__ */ jsxs33(
      "svg",
      {
        viewBox: `0 0 ${W3.toFixed(0)} ${H3.toFixed(0)}`,
        width: "100%",
        role: "img",
        "aria-label": `Map of ${tiles.length} survey tiles centered on right ascension ${ra0.toFixed(
          1
        )} degrees, declination ${dec0.toFixed(1)} degrees.`,
        children: [
          /* @__PURE__ */ jsx42("rect", { x: L3, y: T4, width: plotW, height: plotH, fill: "#f2f5fa" }),
          /* @__PURE__ */ jsxs33("g", { stroke: "rgba(10,16,28,0.16)", strokeWidth: "0.7", fill: "none", strokeDasharray: "2 3", children: [
            decs.map((d) => /* @__PURE__ */ jsx42("path", { d: path2(decLine(d)) }, `d${d}`)),
            ras.map((r) => /* @__PURE__ */ jsx42("path", { d: path2(raLine(r)) }, `r${r}`))
          ] }),
          /* @__PURE__ */ jsxs33(
            "g",
            {
              fill: "#4d5b71",
              fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
              fontSize: "11",
              children: [
                decs.map((d) => {
                  let p = project2(ra0, d, ra0, dec0), y = sy2(p[1]);
                  return y < T4 + 6 || y > T4 + plotH - 2 ? null : /* @__PURE__ */ jsxs33("text", { x: L3 - 8, y: y + 3.5, textAnchor: "end", children: [
                    d > 0 ? "+" : "\u2212",
                    Math.abs(d).toFixed(decStep < 1 ? 2 : 0),
                    "\xB0"
                  ] }, `dl${d}`);
                }),
                ras.map((r) => {
                  let p = project2(r, dec0, ra0, dec0), x = sx2(p[0]);
                  return x < L3 + 14 || x > L3 + plotW - 14 ? null : /* @__PURE__ */ jsx42("text", { x, y: T4 + plotH + 16, textAnchor: "middle", children: raLabel(r) }, `rl${r}`);
                }),
                /* @__PURE__ */ jsx42("text", { x: L3 - 8, y: T4 + plotH + 16, textAnchor: "end", fill: "#8090a6", children: "Dec" }),
                /* @__PURE__ */ jsx42("text", { x: L3 + plotW / 2, y: T4 + plotH + 30, textAnchor: "middle", fill: "#8090a6", children: "RA (deg) \u2014 increasing to the left" })
              ]
            }
          ),
          /* @__PURE__ */ jsx42("g", { children: [...shapes].sort((a, b) => Number(Boolean(a.tile.highlight)) - Number(Boolean(b.tile.highlight))).map(({ tile, points }) => {
            let active = tile.highlight !== !1, color = sequential(
              maxValue === minValue ? 0.65 : (tile.value - minValue) / (maxValue - minValue) * 0.75 + 0.2
            ), center = project2(tile.ra, tile.dec, ra0, dec0), cx = sx2(center[0]), cy = sy2(center[1]), text = active ? isDark(color) ? "#ffffff" : "#0a101c" : "#5b6b82";
            return /* @__PURE__ */ jsxs33("g", { children: [
              /* @__PURE__ */ jsx42(
                "polygon",
                {
                  points: points.filter((p) => Number.isFinite(p[0])).map((p) => `${sx2(p[0]).toFixed(1)},${sy2(p[1]).toFixed(1)}`).join(" "),
                  fill: active ? rgb(color) : "rgba(10,16,28,0.03)",
                  stroke: active ? "rgba(255,255,255,0.75)" : "rgba(10,16,28,0.22)",
                  strokeWidth: active ? 2.5 : 0.8,
                  strokeDasharray: active ? "7 4" : void 0
                }
              ),
              /* @__PURE__ */ jsx42(
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
              active && /* @__PURE__ */ jsxs33(
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
          /* @__PURE__ */ jsx42(
            "rect",
            {
              x: L3,
              y: T4,
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
    caption && /* @__PURE__ */ jsx42("p", { className: "fieldmap__caption", children: caption })
  ] });
}

// app/content/pages/survey/ims.json
var ims_default = {
  meta: {
    title: "Intensive Monitoring Survey \xB7 7DT",
    description: "The deep, nightly survey of 7DS: seven tiles at the south ecliptic pole, overlapping the SPHEREx Deep Field South."
  },
  hero: {
    code: "IMS",
    name: "Intensive Monitoring Survey",
    lede: "Seven tiles at the south ecliptic pole, observed every available night with the full medium-band set.",
    image: "/img/hero/status.jpg",
    meta: [
      {
        value: "{median|num}",
        label: "Cycles, median tile",
        live: !0
      },
      {
        value: "8.5",
        unit: "deg\xB2",
        label: "Survey area"
      },
      {
        value: "1",
        unit: "d",
        label: "Cadence"
      },
      {
        value: "April 2025",
        label: "Started"
      }
    ]
  },
  parameters: [
    [
      "Area",
      "{tier.area}"
    ],
    [
      "Field",
      "{tier.region}"
    ],
    [
      "Field center",
      "RA 05h13m07.4s, Dec \u221260\xB028\u203212\u2033"
    ],
    [
      "Cadence",
      "{tier.cadence}"
    ],
    [
      "Tiles",
      "{ims.n_tiles}"
    ],
    [
      "Time budget",
      "20,000 minutes per year"
    ],
    [
      "Cumulative depth",
      "23.6 mag over five years"
    ]
  ],
  map: {
    title: "The monitored field",
    valueLabel: "cycles",
    caption: "The {ims.n_tiles} monitored tiles, dashed, against their neighbors on the survey tiling. Shading and the figure inside each monitored tile give the observing cycles completed on it, read from the observation database.",
    note: "The field covers about 8.5 square degrees near the south ecliptic pole and is drawn at its own scale, on a tangent plane, rather than on an all-sky map where it would be a few pixels across."
  },
  coverage: [
    {
      value: "{ims.n_tiles}",
      label: "Tiles monitored"
    },
    {
      value: "{median|num}",
      label: "Cycles, median tile"
    },
    {
      value: "{ims.min_cycles_per_tile|num}",
      label: "Fewest cycles"
    },
    {
      value: "{ims.max_cycles_per_tile|num}",
      label: "Most cycles"
    }
  ],
  progress: {
    label: "{ims.min_cycles_per_tile}\u2013{ims.max_cycles_per_tile} observing cycles across {ims.n_tiles} tiles",
    note: "Progress is the median tile against a nominal five years of observable nights. Cycle counts differ between tiles because the field sets at different times through the season and because weather does not fall evenly."
  }
};

// app/routes/survey.ims.tsx
import { jsx as jsx43 } from "react/jsx-runtime";
var meta26 = () => metaOf(ims_default), CACHE3 = "public, max-age=900, stale-while-revalidate=86400", headers3 = () => ({ "Cache-Control": CACHE3 }), CENTER = { ra: 78.28, dec: -60.47 };
async function loader9() {
  let status = await getStatus(), field = await getTilesNear(CENTER.ra, CENTER.dec, 3.4);
  return json3(
    {
      field: field.data,
      ims: status.data.ims,
      live: status.live && field.live,
      generatedAt: status.generatedAt
    },
    { headers: { "Cache-Control": CACHE3 } }
  );
}
var FORMATS2 = { num: (value) => value.toLocaleString("en-US") }, tier = surveys_default.tiers.find((t) => t.code === "IMS"), Index26 = () => {
  let { field, ims, live, generatedAt } = useLoaderData3(), cycles = Object.values(ims.cycles_per_tile), median = [...cycles].sort((a, b) => a - b)[Math.floor(cycles.length / 2)], planned = 5 * 250, content = fillAll(ims_default, { ims, tier, median }, FORMATS2);
  return /* @__PURE__ */ jsx43(
    SurveyPage,
    {
      content,
      tier,
      live,
      generatedAt,
      mapNode: /* @__PURE__ */ jsx43(
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
          valueLabel: content.map.valueLabel,
          caption: content.map.caption
        }
      ),
      percent: Math.min(100, Math.round(median / planned * 100))
    }
  );
}, survey_ims_default = Index26;

// app/routes/survey.ris.tsx
var survey_ris_exports = {};
__export(survey_ris_exports, {
  default: () => survey_ris_default,
  headers: () => headers4,
  loader: () => loader10,
  meta: () => meta27
});
import { json as json4 } from "@remix-run/node";
import { useLoaderData as useLoaderData4 } from "@remix-run/react";

// app/content/pages/survey/ris.json
var ris_default = {
  meta: {
    title: "Reference Imaging Survey \xB7 7DT",
    description: "The wide-area survey of 7DS: one medium-band visit to every tile of the southern sky, with live coverage from the observation database."
  },
  hero: {
    code: "RIS",
    name: "Reference Imaging Survey",
    lede: "One medium-band visit to every tile the array can reach, to give the southern sky a reference image against which anything that changes can be found.",
    image: "/img/hero/survey.jpg",
    meta: [
      {
        value: "{ris.coverage_pct}",
        unit: "%",
        label: "Tiles observed",
        live: !0
      },
      {
        value: "23,000",
        unit: "deg\xB2",
        label: "Survey area"
      },
      {
        value: "Single visit",
        label: "Cadence"
      },
      {
        value: "July 2024",
        label: "Started"
      }
    ]
  },
  parameters: [
    [
      "Area",
      "{tier.area}"
    ],
    [
      "Region",
      "{tier.region}"
    ],
    [
      "Cadence",
      "{tier.cadence}"
    ],
    [
      "Visit",
      "3 \xD7 100 s, coadded to 300 s"
    ],
    [
      "Single-visit depth",
      "19.1 mag, 5\u03C3 in m600"
    ],
    [
      "Tile range",
      "T00000 \u2013 T25471, plus northern extension"
    ]
  ],
  map: {
    caption: "{ris.tiles_observed|num} of {ris.tiles_defined|num} tiles observed",
    depthRef: {
      mag: 19.1,
      sec: 300,
      frameSec: 100,
      band: "m600"
    },
    note: "The survey as designed: all 25,472 tiles of the reference grid are drawn in gray, and the ones with science exposures are colored over them, so what is left to observe is the gray. Because RIS covers everything the array can reach, this grid is also the footprint of the survey as a whole. Hover a tile for its own figures. Depth and integration time are estimates: open-shutter time is recorded for the survey rather than per tile, so integration time on a tile is its frame count times the survey mean. Depth is counted differently, against the RIS visit itself: frames in m600 at the fiducial 100 s each, measured against the 19.1 mag reached by one 3 \xD7 100 s visit \u2014 background-limited, so the 5\u03C3 limit improves as the square root of the time. Depth counts only the frames taken in m600, since a tile visited in many filters is no deeper in any one of them."
  },
  coverage: [
    {
      value: "{ris.tiles_observed|num}",
      label: "Tiles observed",
      note: "original grid"
    },
    {
      value: "{ris.tiles_defined|num}",
      label: "Tiles defined"
    },
    {
      value: "{ris.coverage_pct}",
      unit: "%",
      label: "Complete"
    },
    {
      value: "{ris.tiles_observed_extended|num}",
      label: "Including extension",
      note: "of {ris.tiles_extended|num}"
    }
  ],
  progress: {
    label: "{ris.tiles_observed|num} of {ris.tiles_defined|num} tiles observed",
    note: "Counted over the original grid, T00000\u2013T25471. The northern extension carries the tiling to Dec +30\xB0 and is counted separately. A full cycle is anticipated by the end of 2027."
  }
};

// app/routes/survey.ris.tsx
import { jsx as jsx44 } from "react/jsx-runtime";
var meta27 = () => metaOf(ris_default), CACHE4 = "public, max-age=900, stale-while-revalidate=86400", headers4 = () => ({ "Cache-Control": CACHE4 });
async function loader10() {
  let [tiles, status] = await Promise.all([getTileMap(), getStatus()]), totals = status.data.totals, exposureSec = totals && totals.science_frames > 0 ? totals.exposure_hours * 3600 / totals.science_frames : null;
  return json4(
    {
      tiles: tiles.data,
      ris: status.data.ris,
      exposureSec,
      live: status.live && tiles.live,
      generatedAt: status.generatedAt
    },
    { headers: { "Cache-Control": CACHE4 } }
  );
}
var FORMATS3 = { num: (value) => value.toLocaleString("en-US") }, tier2 = surveys_default.tiers.find((t) => t.code === "RIS"), Index27 = () => {
  let { tiles, ris, exposureSec, live, generatedAt } = useLoaderData4(), content = fillAll(ris_default, { ris, tier: tier2 }, FORMATS3);
  return /* @__PURE__ */ jsx44(
    SurveyPage,
    {
      content,
      tier: tier2,
      live,
      generatedAt,
      mapNode: /* @__PURE__ */ jsx44(
        SkyMap,
        {
          tiles,
          planned: { to: RIS_TILES },
          exposureSec,
          depthRef: content.map.depthRef,
          caption: content.map.caption
        }
      ),
      percent: ris.coverage_pct
    }
  );
}, survey_ris_default = Index27;

// app/routes/survey.wts.tsx
var survey_wts_exports = {};
__export(survey_wts_exports, {
  default: () => survey_wts_default,
  meta: () => meta28
});

// app/content/pages/survey/wts.json
var wts_default = {
  meta: {
    title: "Wide-area Time-domain Survey \xB7 7DT",
    description: "The time-domain survey of 7DS: 800\u20131,200 deg\xB2 revisited every 10\u201314 days over five years, in fields with existing near-infrared coverage."
  },
  hero: {
    code: "WTS",
    name: "Wide-area Time-domain Survey",
    lede: "A moderately wide area revisited every 10 to 14 days for five years, in fields where near-infrared data already exist.",
    image: "/img/hero/survey.jpg",
    meta: [
      {
        value: "800\u20131,200",
        unit: "deg\xB2",
        label: "Survey area"
      },
      {
        value: "10\u201314",
        unit: "d",
        label: "Cadence"
      },
      {
        value: "90\u2013100",
        label: "Visits per tile"
      },
      {
        value: "2026",
        label: "Commencing"
      }
    ]
  },
  parameters: [
    [
      "Area",
      "{tier.area}"
    ],
    [
      "Field selection",
      "{tier.region}"
    ],
    [
      "Cadence",
      "{tier.cadence}"
    ],
    [
      "Visits per tile",
      "90\u2013100 over five years"
    ],
    [
      "Cumulative depth",
      "22.0\u201322.5 mag in most medium bands"
    ],
    [
      "Status",
      "{tier.statusLabel}"
    ]
  ],
  status: {
    eyebrow: "Status",
    title: "Not yet started",
    panelTitle: "Field selection under consideration",
    body: "WTS is scheduled to commence in 2026. Fields are being selected to overlap existing near-infrared coverage \u2014 the VISTA Kilo-degree Infrared Galaxy survey footprint and the Vera C. Rubin Observatory Deep Drilling Fields are the leading candidates \u2014 so that 7DT medium-band photometry is complemented at wavelengths the array cannot reach. Until observations begin there is no coverage to report; tiles observed under the Reference Imaging Survey in these fields already exist and are shown on the [data access page](/users/access)."
  },
  science: {
    eyebrow: "Science",
    title: "What the cadence is chosen for",
    body: [
      "{tier.depthRange}",
      "Stacking 90 to 100 visits also reaches 22.0\u201322.5 mag across most of the medium bands, deep enough for photometric redshifts on galaxies well below the single-visit limit. Forecast redshift precision for the stacked survey is given under [cosmology and photometric redshifts](/science/cosmology)."
    ]
  }
};

// app/routes/survey.wts.tsx
import { jsx as jsx45, jsxs as jsxs34 } from "react/jsx-runtime";
var meta28 = () => metaOf(wts_default), tier3 = surveys_default.tiers.find((t) => t.code === "WTS"), Index28 = () => {
  let content = fillAll(wts_default, { tier: tier3 }), { status, science } = content;
  return /* @__PURE__ */ jsxs34(SurveyPage, { content, tier: tier3, live: !1, children: [
    /* @__PURE__ */ jsx45(Section, { eyebrow: status.eyebrow, title: status.title, children: /* @__PURE__ */ jsxs34("div", { className: "panel", style: { maxWidth: "68ch" }, children: [
      /* @__PURE__ */ jsx45("div", { className: "panel__title", children: status.panelTitle }),
      /* @__PURE__ */ jsx45("p", { className: "feature-list__body", style: { marginBottom: 0 }, children: /* @__PURE__ */ jsx45(Md, { children: status.body }) })
    ] }) }),
    /* @__PURE__ */ jsx45(Section, { eyebrow: science.eyebrow, title: science.title, alt: !0, children: /* @__PURE__ */ jsx45(Paras, { className: "prose", children: science.body }) })
  ] });
}, survey_wts_default = Index28;

// app/routes/users.call.tsx
var users_call_exports = {};
__export(users_call_exports, {
  default: () => users_call_default,
  meta: () => meta29
});

// app/content/pages/users/call.json
var call_default2 = {
  meta: {
    title: "Call for Proposals \xB7 7DT for users",
    description: "The open call for 7DT observing time: key dates, the documents to download, and where the rules are set out."
  },
  hero: {
    eyebrow: "For users",
    title: "Call for Proposals",
    image: "/img/hero/telescope.jpg",
    ledeOpen: "{call.title} \u2014 proposals are being accepted for observations between {call.observingPeriod}.",
    ledeClosed: "No call is open at present. This page carries the dates and documents while one is.",
    deadlineLabel: "Phase 1 deadline",
    meta: [
      {
        value: "400",
        unit: "hr",
        label: "Time available"
      },
      {
        value: "9",
        unit: "mo",
        label: "Observing period"
      },
      {
        value: "2",
        label: "Allocation pools"
      }
    ]
  },
  open: {
    documents: {
      eyebrow: "Documents",
      title: "What to download",
      body: "Read the first, fill in the second, and keep the third beside you while you do. This page is where the call directs proposers for the current versions, so use the copies here rather than a forwarded attachment.",
      tag: "docx"
    },
    schedule: {
      eyebrow: "Schedule",
      title: "Key dates",
      caption: "Milestones of this call",
      footnote: "Unless stated otherwise, deadlines are {call.deadlineNote}."
    },
    time: {
      eyebrow: "Time",
      title: "What is being offered",
      body: [
        "{call.hours}. {call.pools} A proposal is counted against one pool on the basis of the PI\u2019s affiliation alone; the Call for Proposals gives the rule in full, including what happens to a proposal that is not selected in the first pool it is considered in.",
        "{call.nextCall}"
      ],
      buttons: [
        {
          label: "How to write the proposal",
          href: "/users/propose"
        },
        {
          label: "Calculators",
          href: "/users/links#calculators"
        },
        {
          label: "Measured performance",
          href: "/users/performance"
        }
      ]
    },
    submit: {
      eyebrow: "Submitting",
      title: "Where to send it",
      panelTitle: "By e-mail, before {call.deadline}",
      body: "Send the completed Proposal Form together with the Scientific Justification, the Technical Justification and any accompanying files \u2014 a target list, for example \u2014 to [{call.submit.email}](mailto:{call.submit.email}?subject=7DT%20Phase%201%20proposal). There is no submission portal; e-mail is the route.",
      button: {
        label: "Submit a proposal",
        href: "mailto:{call.submit.email}?subject=7DT%20Phase%201%20proposal"
      }
    },
    questions: {
      eyebrow: "Questions",
      title: "Who to ask",
      body: "Questions about this call, the submission process or 7DS collaboration policies go to {call.contact.name} at [{call.contact.email}](mailto:{call.contact.email}?subject=7DT%20Call%20for%20Proposals)."
    }
  },
  closed: {
    eyebrow: "Status",
    title: "No call is open",
    panelTitle: "Nothing to submit at present",
    body: "When a call opens, its dates and documents appear here and a notice goes up across the site. How proposals are written does not change between calls, and is set out under [how to propose](/users/propose)."
  }
};

// app/routes/users.call.tsx
import { Fragment as Fragment9, jsx as jsx46, jsxs as jsxs35 } from "react/jsx-runtime";
var meta29 = () => metaOf(call_default2), md = (text) => fill(text, { call: call_default }), Index29 = () => {
  let { hero: hero3, open, closed } = call_default2, [day2, month] = call_default.deadline.split(" ");
  return /* @__PURE__ */ jsxs35(PageLayout, { menu: "manuUsers", children: [
    /* @__PURE__ */ jsx46(
      PageHero,
      {
        eyebrow: hero3.eyebrow,
        title: hero3.title,
        lede: call_default.active ? md(hero3.ledeOpen) : hero3.ledeClosed,
        image: hero3.image,
        meta: call_default.active ? [{ value: day2, unit: month, label: hero3.deadlineLabel }, ...hero3.meta] : void 0
      }
    ),
    call_default.active ? /* @__PURE__ */ jsxs35(Fragment9, { children: [
      /* @__PURE__ */ jsxs35(Section, { eyebrow: open.documents.eyebrow, title: open.documents.title, children: [
        /* @__PURE__ */ jsx46("p", { className: "prose", children: /* @__PURE__ */ jsx46(Md, { children: md(open.documents.body) }) }),
        /* @__PURE__ */ jsx46("ul", { className: "feature-list", style: { marginTop: "2rem" }, children: call_default.files.map((file, index) => /* @__PURE__ */ jsxs35("li", { children: [
          /* @__PURE__ */ jsx46("span", { className: "feature-list__key", children: String(index + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsxs35("div", { children: [
            /* @__PURE__ */ jsxs35("h3", { className: "feature-list__title", style: { fontSize: "1.0625rem" }, children: [
              /* @__PURE__ */ jsx46(SmartLink, { href: file.href, children: file.name }),
              " ",
              /* @__PURE__ */ jsx46("span", { className: "tag-docx", children: open.documents.tag })
            ] }),
            /* @__PURE__ */ jsx46("p", { className: "feature-list__body", style: { maxWidth: "68ch" }, children: /* @__PURE__ */ jsx46(Md, { children: file.note }) })
          ] })
        ] }, file.href)) })
      ] }),
      /* @__PURE__ */ jsxs35(Section, { eyebrow: open.schedule.eyebrow, title: open.schedule.title, alt: !0, children: [
        /* @__PURE__ */ jsx46("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs35("table", { className: "spec-table", children: [
          /* @__PURE__ */ jsx46("caption", { children: open.schedule.caption }),
          /* @__PURE__ */ jsx46("tbody", { children: call_default.dates.map((row) => /* @__PURE__ */ jsxs35("tr", { children: [
            /* @__PURE__ */ jsx46("th", { scope: "row", children: row[0] }),
            /* @__PURE__ */ jsx46("td", { children: row[1] })
          ] }, row[0])) })
        ] }) }),
        /* @__PURE__ */ jsx46("p", { className: "footnote", style: { marginTop: "1.25rem" }, children: /* @__PURE__ */ jsx46(Md, { children: md(open.schedule.footnote) }) })
      ] }),
      /* @__PURE__ */ jsxs35(Section, { eyebrow: open.time.eyebrow, title: open.time.title, children: [
        /* @__PURE__ */ jsx46(Paras, { className: "prose", children: open.time.body.map(md) }),
        /* @__PURE__ */ jsx46(ButtonRow, { buttons: open.time.buttons, style: { marginTop: "2rem" } })
      ] }),
      /* @__PURE__ */ jsx46(Section, { eyebrow: open.submit.eyebrow, title: open.submit.title, children: /* @__PURE__ */ jsxs35("div", { className: "panel", style: { maxWidth: "68ch" }, children: [
        /* @__PURE__ */ jsx46("div", { className: "panel__title", children: md(open.submit.panelTitle) }),
        /* @__PURE__ */ jsx46("p", { className: "feature-list__body", style: { marginBottom: "1rem" }, children: /* @__PURE__ */ jsx46(Md, { children: md(open.submit.body) }) }),
        /* @__PURE__ */ jsx46(SmartLink, { className: "btn btn--primary", href: md(open.submit.button.href), children: open.submit.button.label })
      ] }) }),
      /* @__PURE__ */ jsx46(Section, { eyebrow: open.questions.eyebrow, title: open.questions.title, alt: !0, children: /* @__PURE__ */ jsx46("p", { className: "prose", children: /* @__PURE__ */ jsx46(Md, { children: md(open.questions.body) }) }) })
    ] }) : /* @__PURE__ */ jsx46(Section, { eyebrow: closed.eyebrow, title: closed.title, children: /* @__PURE__ */ jsxs35("div", { className: "panel", style: { maxWidth: "68ch" }, children: [
      /* @__PURE__ */ jsx46("div", { className: "panel__title", children: closed.panelTitle }),
      /* @__PURE__ */ jsx46("p", { className: "feature-list__body", style: { marginBottom: "1rem" }, children: /* @__PURE__ */ jsx46(Md, { children: closed.body }) })
    ] }) })
  ] });
}, users_call_default = Index29;

// app/routes/users.data.tsx
var users_data_exports = {};
__export(users_data_exports, {
  loader: () => loader11
});
import { redirect as redirect7 } from "@remix-run/node";
function loader11() {
  return redirect7("/users/format", 301);
}

// app/routes/visibility.tsx
var visibility_exports = {};
__export(visibility_exports, {
  loader: () => loader12
});
import { redirect as redirect8 } from "@remix-run/node";
function loader12() {
  let tool = tools.find((t) => t.slug === "visibility");
  return redirect8(tool ? tool.url : "/users/links#calculators", 302);
}

// app/routes/users.faq.tsx
var users_faq_exports = {};
__export(users_faq_exports, {
  loader: () => loader13
});
import { redirect as redirect9 } from "@remix-run/node";
function loader13() {
  return redirect9("/users/status", 301);
}

// app/routes/overhead.tsx
var overhead_exports = {};
__export(overhead_exports, {
  loader: () => loader14
});
import { redirect as redirect10 } from "@remix-run/node";
function loader14() {
  let tool = tools.find((t) => t.slug === "overhead");
  return redirect10(tool ? tool.url : "/users/links#calculators", 302);
}

// app/routes/overview.tsx
var overview_exports = {};
__export(overview_exports, {
  loader: () => loader15
});
import { redirect as redirect11 } from "@remix-run/node";
function loader15() {
  return redirect11("/survey/overview", 301);
}

// app/routes/exptime.tsx
var exptime_exports = {};
__export(exptime_exports, {
  loader: () => loader16
});
import { redirect as redirect12 } from "@remix-run/node";
function loader16() {
  let tool = tools.find((t) => t.slug === "exptime");
  return redirect12(tool ? tool.url : "/users/links#calculators", 302);
}

// app/routes/gallery.tsx
var gallery_exports = {};
__export(gallery_exports, {
  default: () => gallery_default2,
  meta: () => meta30
});
import { useState as useState9 } from "react";
import { Pagination as Pagination2 } from "flowbite-react";

// app/content/data/images.json
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

// app/content/pages/gallery.json
var gallery_default = {
  meta: {
    title: "Gallery \xB7 7-Dimensional Telescope",
    description: "Images of the 7-Dimensional Telescope and of the sky it observes."
  },
  hero: {
    eyebrow: "Gallery",
    title: "Our Universe, seen in seven dimensions",
    lede: "Pictures of the array, and of what it returns.",
    image: "/img/hero/gallery.jpg"
  },
  images: {
    eyebrow: "Images",
    title: "Gallery",
    opens: " (opens the full-resolution image in a new tab)"
  }
};

// app/routes/gallery.tsx
import { jsx as jsx47, jsxs as jsxs36 } from "react/jsx-runtime";
var meta30 = () => metaOf(gallery_default), PER_PAGE2 = 6, Index30 = () => {
  let { hero: hero3, images: section } = gallery_default, [currentPage, setCurrentPage] = useState9(1), totalPages = Math.max(1, Math.ceil(images_default.length / PER_PAGE2)), page = Math.min(currentPage, totalPages), shown = images_default.slice((page - 1) * PER_PAGE2, page * PER_PAGE2);
  return /* @__PURE__ */ jsxs36(PageLayout, { menu: "manuGallery", children: [
    /* @__PURE__ */ jsx47(PageHero, { eyebrow: hero3.eyebrow, title: hero3.title, lede: hero3.lede, image: hero3.image }),
    /* @__PURE__ */ jsxs36(Section, { eyebrow: section.eyebrow, title: section.title, wide: !0, children: [
      /* @__PURE__ */ jsx47("div", { className: "gallery", children: /* @__PURE__ */ jsx47("ul", { children: shown.map((img) => /* @__PURE__ */ jsx47("li", { children: /* @__PURE__ */ jsxs36("a", { href: `/img/images/${img.file}`, target: "_blank", rel: "noreferrer", children: [
        /* @__PURE__ */ jsxs36("figure", { children: [
          /* @__PURE__ */ jsx47(
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
          /* @__PURE__ */ jsx47("figcaption", { children: img.name })
        ] }),
        /* @__PURE__ */ jsx47("span", { className: "sr-only", children: section.opens })
      ] }) }, img.file)) }) }),
      totalPages > 1 && /* @__PURE__ */ jsx47("div", { className: "pagination-wrap", children: /* @__PURE__ */ jsx47(Pagination2, { currentPage: page, totalPages, onPageChange: setCurrentPage }) })
    ] })
  ] });
}, gallery_default2 = Index30;

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  headers: () => headers5,
  loader: () => loader17,
  meta: () => meta31
});
import { json as json5 } from "@remix-run/node";
import { useLoaderData as useLoaderData5 } from "@remix-run/react";

// app/routes/main.tsx
import { useEffect as useEffect6, useState as useState10, useRef as useRef5, useCallback as useCallback2 } from "react";
import { Link as Link10 } from "@remix-run/react";

// app/content/pages/home.json
var home_default = {
  meta: {
    title: "7-Dimensional Telescope",
    description: "The 7-Dimensional Telescope: a twenty-unit medium-band array at El Sauce Observatory, Chile, and the 7-Dimensional Sky Survey of the southern sky."
  },
  sections: [
    "Introduction",
    "About 7DT",
    "Science",
    "Sky survey",
    "Telescope",
    "News",
    "Contact and partners"
  ],
  backToTop: "Back to top",
  hero: {
    eyebrow: "Center for the Gravitational-wave Universe \xB7 Seoul National University",
    title: "7-Dimensional Sky Survey",
    lede: "A medium-band survey of the southern sky, measuring a low-resolution spectrum for every source it observes and repeating the measurement over time. It is carried out with the 7-Dimensional Telescope, an array of twenty 50-cm telescopes in Chile.",
    image: "/img/hero/home.jpg",
    scroll: "Scroll"
  },
  intro: {
    eyebrow: "Introduction",
    title: "A survey that measures spectra, not colors",
    body: "The 7-Dimensional Sky Survey (7DS) is a medium-band survey of the southern sky. It is carried out with the 7-Dimensional Telescope (7DT), an array of twenty 50-cm telescopes at El Sauce Observatory in Chile, built and operated by the Center for the Gravitational-wave Universe at Seoul National University. Each unit carries a share of a forty-filter medium-band set, so a single visit records a low-resolution spectrum of every source in 1.25 square degrees. As of now, sixteen units and thirty-five filters are in routine operation.",
    link: {
      label: "What is 7DS",
      href: "/about/intro"
    },
    figure: {
      src: "/img/NGC0253.gif",
      alt: "The Sculptor Galaxy, NGC 253, scanned through the 7DT medium-band filter set",
      caption: "**NGC 253** The Sculptor Galaxy seen through successive medium bands from 400 to 875 nm \u2014 each frame a different slice of the spectrum."
    }
  },
  science: {
    eyebrow: "Science",
    title: "Broad science topics",
    body: "A medium-band spectral energy distribution for every source in the field supports a wide range of science from one data product: how galaxies assemble and cease forming stars, where the heavy elements are produced, the expansion rate of the Universe, accretion onto black holes, the variability of young stars, and the composition of small solar-system bodies. 7DS was designed to identify gravitational-wave counterparts; the same images serve the rest.",
    image: "/img/hero/science.jpg",
    link: {
      label: "Science program",
      href: "/science/overview"
    }
  },
  survey: {
    eyebrow: "7-Dimensional Sky Survey",
    title: "Three surveys over the southern sky",
    body: "7DS comprises three surveys that trade area against depth and cadence: a single-visit reference map of the southern sky, a time-domain survey on a 10-14 day cadence, and nightly monitoring of a deep field at the south ecliptic pole. All three use the same tiling of the sky, so their data coadd directly.",
    tilesObserved: "{count} tiles observed",
    link: {
      label: "Explore the coverage map",
      href: "/users/access"
    },
    observed: "{percent}% observed"
  },
  facility: {
    eyebrow: "The facility",
    title: "Twenty telescopes, one system",
    body: "Twenty DeltaRho 500 units on direct-drive mounts, sixteen currently observing, one control computer per operational telescope, a scheduler that can interrupt the night and begin a follow-up exposure in under a minute, and a pipeline that reduces a 3,000-image night the same day. The array is built to observe a transient while it is still bright.",
    image: "/img/hero/survey.jpg",
    link: {
      label: "Telescope & site",
      href: "/telescope/overview"
    },
    offline: {
      total: 20,
      online: 16
    },
    stats: [
      {
        value: "{total}",
        label: "Telescopes in the array",
        note: "{online} online",
        live: !0
      },
      {
        value: "40",
        label: "Medium-band filters",
        note: "35 installed"
      },
      {
        value: "30\u201370",
        label: "Spectral resolution R"
      },
      {
        value: "1.25",
        unit: "deg\xB2",
        label: "Per pointing"
      }
    ]
  },
  news: {
    eyebrow: "Latest",
    title: "News & publications",
    links: [
      {
        label: "All news",
        href: "/news"
      },
      {
        label: "Publications",
        href: "/publication/list"
      }
    ]
  }
};

// app/routes/main.tsx
import { Fragment as Fragment10, jsx as jsx48, jsxs as jsxs37 } from "react/jsx-runtime";
var SECTION_IS_DARK = [!0, !1, !0, !1, !0, !1, !0], SECTION_COUNT = SECTION_IS_DARK.length, SECTION_NAMES = home_default.sections;
function ScrollChrome() {
  let [current, setCurrent] = useState10(0), [showTop, setShowTop] = useState10(!1), sectionsRef = useRef5([]), wrapperRef = useRef5(null), frame = useRef5(0), scrollToSection = useCallback2((index) => {
    let target = sectionsRef.current[index];
    if (!target)
      return;
    let reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, []);
  return useEffect6(() => {
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
  }, []), useEffect6(() => {
    let onKey = (e) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.target?.closest("input, textarea, select, [contenteditable]") || !["ArrowDown", "PageDown", "ArrowUp", "PageUp", "Home", "End"].includes(e.key))
        return;
      let wrapper = wrapperRef.current, section = sectionsRef.current[current];
      wrapper && section && section.getBoundingClientRect().height > wrapper.clientHeight + 2 && (e.key === "ArrowDown" || e.key === "ArrowUp") || (e.preventDefault(), e.key === "ArrowDown" || e.key === "PageDown" ? scrollToSection(Math.min(current + 1, SECTION_COUNT - 1)) : e.key === "ArrowUp" || e.key === "PageUp" ? scrollToSection(Math.max(current - 1, 0)) : e.key === "Home" ? scrollToSection(0) : scrollToSection(SECTION_COUNT - 1));
    };
    return window.addEventListener("keydown", onKey), () => window.removeEventListener("keydown", onKey);
  }, [current, scrollToSection]), /* @__PURE__ */ jsxs37(Fragment10, { children: [
    /* @__PURE__ */ jsx48("div", { className: "fullpage-progress" }),
    /* @__PURE__ */ jsx48("div", { className: "fullpage-nav", children: Array.from({ length: SECTION_COUNT }).map((_, index) => /* @__PURE__ */ jsx48(
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
    /* @__PURE__ */ jsx48(
      "button",
      {
        type: "button",
        className: `scroll-to-top${showTop ? " visible" : ""}`,
        onClick: () => scrollToSection(0),
        "aria-label": home_default.backToTop,
        children: "\u2191"
      }
    )
  ] });
}
var MainPage = ({ tiles, tilesLive, generatedAt, telescopes, risCoverage, exposureSec }) => {
  let latest = news_default.news.filter((item) => item.type !== "update").slice(0, 3), { hero: hero3, intro, science: sci, survey, facility, news: latestNews } = home_default, counts = {
    total: telescopes?.total ?? facility.offline.total,
    online: telescopes?.online ?? facility.offline.online
  };
  return /* @__PURE__ */ jsxs37("div", { className: "fullpage-container", children: [
    /* @__PURE__ */ jsx48(ScrollChrome, {}),
    /* @__PURE__ */ jsxs37("div", { className: "fullpage-wrapper", children: [
      /* @__PURE__ */ jsxs37(
        "section",
        {
          className: "fullpage-section fullpage-section--dark fullpage-hero",
          style: { backgroundImage: `url('${hero3.image}')`, backgroundSize: "cover", backgroundPosition: "center" },
          children: [
            /* @__PURE__ */ jsx48("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs37("div", { className: "reveal", children: [
              /* @__PURE__ */ jsx48("p", { className: "fullpage-hero__eyebrow", children: hero3.eyebrow }),
              /* @__PURE__ */ jsx48("h1", { children: /* @__PURE__ */ jsx48(Md, { children: hero3.title }) }),
              /* @__PURE__ */ jsx48("p", { className: "fullpage-hero__lede", children: /* @__PURE__ */ jsx48(Md, { children: hero3.lede }) }),
              /* @__PURE__ */ jsx48("div", { className: "dimension-row", style: { marginTop: "2rem" }, children: surveys_default.dimensions.map((dim) => /* @__PURE__ */ jsxs37("span", { className: "dimension-item", children: [
                /* @__PURE__ */ jsx48("span", { className: "dimension-item__n", children: dim.n }),
                dim.label
              ] }, dim.n)) })
            ] }) }),
            /* @__PURE__ */ jsxs37(
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
                  /* @__PURE__ */ jsx48("span", { children: hero3.scroll }),
                  /* @__PURE__ */ jsx48("span", { className: "scroll-cue__line" })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx48("section", { className: "fullpage-section", children: /* @__PURE__ */ jsx48("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs37("div", { className: "split split--wide-text split--middle reveal", children: [
        /* @__PURE__ */ jsxs37("div", { children: [
          /* @__PURE__ */ jsx48("span", { className: "eyebrow", children: intro.eyebrow }),
          /* @__PURE__ */ jsx48("h2", { children: intro.title }),
          /* @__PURE__ */ jsx48("p", { className: "prose", children: /* @__PURE__ */ jsx48(Md, { children: intro.body }) }),
          /* @__PURE__ */ jsx48("p", { style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsx48(Link10, { className: "link-arrow", to: intro.link.href, children: intro.link.label }) })
        ] }),
        /* @__PURE__ */ jsxs37("figure", { className: "figure", children: [
          /* @__PURE__ */ jsx48(
            "img",
            {
              src: intro.figure.src,
              alt: intro.figure.alt,
              width: 900,
              height: 929,
              loading: "lazy",
              decoding: "async"
            }
          ),
          /* @__PURE__ */ jsx48("figcaption", { children: /* @__PURE__ */ jsx48(Md, { children: intro.figure.caption }) })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx48(
        "section",
        {
          className: "fullpage-section fullpage-section--dark",
          style: { backgroundImage: `url('${sci.image}')`, backgroundSize: "cover", backgroundPosition: "center" },
          children: /* @__PURE__ */ jsx48("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs37("div", { className: "split split--middle reveal", children: [
            /* @__PURE__ */ jsxs37("div", { children: [
              /* @__PURE__ */ jsx48("span", { className: "eyebrow eyebrow--on-dark", children: sci.eyebrow }),
              /* @__PURE__ */ jsx48("h2", { children: sci.title }),
              /* @__PURE__ */ jsx48("p", { className: "prose", style: { color: "rgba(255,255,255,.78)" }, children: /* @__PURE__ */ jsx48(Md, { children: sci.body }) }),
              /* @__PURE__ */ jsx48("p", { style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsx48(Link10, { className: "link-arrow", to: sci.link.href, style: { color: "var(--accent-on-dark)" }, children: sci.link.label }) })
            ] }),
            /* @__PURE__ */ jsx48("ul", { className: "theme-chips theme-chips--panel", children: science_default.themes.map((theme) => /* @__PURE__ */ jsx48("li", { children: /* @__PURE__ */ jsxs37(Link10, { to: `/science/${theme.id}`, children: [
              /* @__PURE__ */ jsx48("span", { className: "theme-chips__hash", "aria-hidden": "true", children: "#" }),
              theme.title
            ] }) }, theme.id)) })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxs37("section", { className: "fullpage-section home-survey-panel", children: [
        tiles && tiles.count > 0 ? /* @__PURE__ */ jsx48("div", { className: "home-survey__bg", "aria-hidden": "true", children: /* @__PURE__ */ jsx48(
          SkyMap,
          {
            tiles,
            exposureSec,
            interactive: !1,
            defaultMode: "exposure"
          }
        ) }) : null,
        tiles && tiles.count > 0 ? /* @__PURE__ */ jsxs37("div", { className: "home-survey__stamp", children: [
          /* @__PURE__ */ jsx48(LiveBadge, { live: tilesLive, updated: generatedAt }),
          /* @__PURE__ */ jsx48("span", { className: "home-survey__count", children: fill(survey.tilesObserved, { count: tiles.count.toLocaleString("en-US") }) })
        ] }) : null,
        /* @__PURE__ */ jsx48("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs37("div", { className: "reveal", children: [
          /* @__PURE__ */ jsx48("span", { className: "eyebrow", children: survey.eyebrow }),
          /* @__PURE__ */ jsx48("h2", { children: survey.title }),
          /* @__PURE__ */ jsx48("p", { className: "prose", style: { maxWidth: "62ch" }, children: /* @__PURE__ */ jsx48(Md, { children: survey.body }) }),
          tiles && tiles.count > 0 ? /* @__PURE__ */ jsx48("div", { className: "home-survey__meta", children: /* @__PURE__ */ jsx48(Link10, { className: "link-arrow", to: survey.link.href, children: survey.link.label }) }) : null,
          /* @__PURE__ */ jsx48("div", { className: "home-survey__tiers", children: surveys_default.tiers.map((tier4) => /* @__PURE__ */ jsxs37(
            Link10,
            {
              className: "tier-card tier-card--link",
              to: `/survey/${tier4.code.toLowerCase()}`,
              children: [
                /* @__PURE__ */ jsx48("span", { className: "tier-card__code", children: tier4.code }),
                /* @__PURE__ */ jsx48("h3", { className: "tier-card__name", children: tier4.name }),
                /* @__PURE__ */ jsxs37("p", { className: "home-survey__spec", children: [
                  tier4.area,
                  " \xB7 ",
                  tier4.cadence
                ] }),
                /* @__PURE__ */ jsx48("span", { className: `pill pill--${tier4.status}`, children: tier4.status === "live" && risCoverage !== null && tier4.code === "RIS" ? fill(survey.observed, { percent: risCoverage }) : tier4.statusLabel })
              ]
            },
            tier4.code
          )) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx48(
        "section",
        {
          className: "fullpage-section fullpage-section--dark",
          style: { backgroundImage: `url('${facility.image}')`, backgroundSize: "cover", backgroundPosition: "center" },
          children: /* @__PURE__ */ jsx48("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs37("div", { className: "split split--middle reveal", children: [
            /* @__PURE__ */ jsxs37("div", { children: [
              /* @__PURE__ */ jsx48("span", { className: "eyebrow eyebrow--on-dark", children: facility.eyebrow }),
              /* @__PURE__ */ jsx48("h2", { children: facility.title }),
              /* @__PURE__ */ jsx48("p", { className: "prose", style: { color: "rgba(255,255,255,.78)" }, children: /* @__PURE__ */ jsx48(Md, { children: facility.body }) }),
              /* @__PURE__ */ jsx48("p", { style: { marginTop: "1.5rem" }, children: /* @__PURE__ */ jsx48(Link10, { className: "link-arrow", to: facility.link.href, style: { color: "var(--accent-on-dark)" }, children: facility.link.label }) })
            ] }),
            /* @__PURE__ */ jsx48("div", { className: "stat-grid stat-grid--2x2 stat-grid--on-dark", children: facility.stats.map((stat) => /* @__PURE__ */ jsxs37("div", { className: "stat", children: [
              /* @__PURE__ */ jsxs37("span", { className: "stat__value", children: [
                fill(stat.value, counts),
                stat.unit && /* @__PURE__ */ jsx48("span", { className: "stat__unit", children: stat.unit })
              ] }),
              /* @__PURE__ */ jsx48("span", { className: "stat__label", children: stat.label }),
              stat.note && /* @__PURE__ */ jsx48("span", { className: `stat__note${stat.live ? " stat__note--live" : ""}`, children: fill(stat.note, counts) })
            ] }, stat.label)) })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsx48("section", { className: "fullpage-section section--alt", children: /* @__PURE__ */ jsx48("div", { className: "container container--wide", children: /* @__PURE__ */ jsxs37("div", { className: "reveal", children: [
        /* @__PURE__ */ jsxs37("div", { className: "section-title", children: [
          /* @__PURE__ */ jsx48("span", { className: "eyebrow", children: latestNews.eyebrow }),
          /* @__PURE__ */ jsx48("h2", { children: latestNews.title })
        ] }),
        /* @__PURE__ */ jsx48("div", { className: "grid grid-cols-3", children: latest.map((item, index) => /* @__PURE__ */ jsxs37("article", { className: "card", children: [
          /* @__PURE__ */ jsx48("img", { src: `/img/news/${item.imgName}`, alt: "", loading: "lazy" }),
          /* @__PURE__ */ jsxs37("div", { className: "card-info", children: [
            /* @__PURE__ */ jsxs37("div", { className: "card-about", children: [
              /* @__PURE__ */ jsx48(
                "span",
                {
                  className: `card-tag ${item.type === "meeting" ? "tag-news" : item.type === "publication" ? "tag-publication" : item.type === "press" ? "tag-press" : "tag-update"}`,
                  children: item.type
                }
              ),
              /* @__PURE__ */ jsx48("span", { className: "card-time", children: item.date })
            ] }),
            /* @__PURE__ */ jsx48("h3", { className: "card-title", children: item.title }),
            /* @__PURE__ */ jsx48("div", { className: "card-creator", children: item.type === "meeting" ? item.place : item.type === "publication" ? item.shortAuthor : item.source })
          ] })
        ] }, index)) }),
        /* @__PURE__ */ jsx48("div", { className: "btn-row", style: { marginTop: "2rem" }, children: latestNews.links.map((link) => /* @__PURE__ */ jsx48(Link10, { className: "btn btn--secondary", to: link.href, children: link.label }, link.href)) })
      ] }) }) }),
      /* @__PURE__ */ jsx48("div", { className: "fullpage-section fullpage-section--footer", children: /* @__PURE__ */ jsx48(footer_default, {}) })
    ] })
  ] });
}, main_default = MainPage;

// app/routes/_index.tsx
import { jsx as jsx49, jsxs as jsxs38 } from "react/jsx-runtime";
var meta31 = () => metaOf(home_default), CACHE5 = "public, max-age=1800, stale-while-revalidate=86400", headers5 = () => ({ "Cache-Control": CACHE5 });
async function loader17() {
  let [tiles, status] = await Promise.all([
    getTileMapLite().catch(() => null),
    getStatus().catch(() => null)
  ]), totals = status?.data.totals, exposureSec = totals && totals.science_frames > 0 ? totals.exposure_hours * 3600 / totals.science_frames : null;
  return json5(
    {
      tiles: tiles?.data ?? null,
      tilesLive: tiles?.live ?? !1,
      generatedAt: tiles?.generatedAt ?? "",
      telescopes: status?.data.telescopes ?? null,
      risCoverage: status?.data.ris.coverage_pct ?? null,
      exposureSec
    },
    { headers: { "Cache-Control": CACHE5 } }
  );
}
var Index31 = () => {
  let data = useLoaderData5();
  return /* @__PURE__ */ jsxs38("div", { className: "page", children: [
    /* @__PURE__ */ jsx49("a", { className: "skip-link", href: "#content", children: "Skip to content" }),
    /* @__PURE__ */ jsx49(CallBanner, {}),
    /* @__PURE__ */ jsx49(navigate_default, { manu: "manuHome" }),
    /* @__PURE__ */ jsx49("main", { id: "content", style: { height: "100%" }, children: /* @__PURE__ */ jsx49(main_default, { ...data }) })
  ] });
}, index_default = Index31;

// app/routes/data.$.tsx
var data_exports = {};
__export(data_exports, {
  loader: () => loader18
});
import { redirect as redirect13 } from "@remix-run/node";
var MOVED = {
  overview: "/users/status",
  coverage: "/users/access",
  data: "/users/access",
  software: "/users/software"
};
function loader18({ params }) {
  let rest = params["*"] ?? "";
  return redirect13(MOVED[rest.split("/")[0]] ?? "/users/status", 301);
}

// app/routes/links.tsx
var links_exports = {};
__export(links_exports, {
  default: () => links_default4,
  meta: () => meta32
});

// app/content/data/links.json
var links_default2 = {
  groups: [
    {
      title: "Site & host",
      items: [
        {
          name: "El Sauce Observatory / ObsTech",
          url: "https://www.obstech.cl",
          note: "Host of the 7DT array, R\xEDo Hurtado Valley, Chile"
        },
        {
          name: "KREONET",
          url: "https://www.kreonet.net",
          note: "Research network carrying nightly data from Chile to Seoul"
        },
        {
          name: "KISTI",
          url: "https://www.kisti.re.kr/eng",
          note: "Korea Institute of Science and Technology Information"
        }
      ]
    },
    {
      title: "Partner surveys & facilities",
      items: [
        {
          name: "SPHEREx",
          url: "https://spherex.caltech.edu",
          note: "All-sky near-infrared spectral survey; its Deep Field South overlaps the 7DS IMS field"
        },
        {
          name: "Vera C. Rubin Observatory",
          url: "https://rubinobservatory.org",
          note: "Neighbouring site; Deep Drilling Fields inform WTS field selection"
        },
        {
          name: "VISTA / VIKING survey",
          url: "https://www.eso.org/public/teles-instr/paranal-observatory/surveytelescopes/vista/surveys",
          note: "Near-infrared ancillary coverage for the time-domain survey"
        },
        {
          name: "PHANGS",
          url: "https://sites.google.com/view/phangs/home",
          note: "Nearby-galaxy sample used for 7DT science verification"
        },
        {
          name: "Gaia mission",
          url: "https://www.cosmos.esa.int/web/gaia",
          note: "DR3 astrometry and XP spectra underpin 7DT calibration"
        }
      ]
    },
    {
      title: "Gravitational-wave network",
      items: [
        {
          name: "LIGO",
          url: "https://www.ligo.caltech.edu",
          note: "Advanced Laser Interferometer Gravitational-wave Observatory"
        },
        {
          name: "Virgo",
          url: "https://www.virgo-gw.eu",
          note: "Advanced Virgo interferometer"
        },
        {
          name: "KAGRA",
          url: "https://gwcenter.icrr.u-tokyo.ac.jp/en",
          note: "Kamioka Gravitational Wave Detector"
        },
        {
          name: "GraceDB",
          url: "https://gracedb.ligo.org",
          note: "Gravitational-wave candidate event database"
        }
      ]
    },
    {
      title: "Instrument vendors",
      items: [
        {
          name: "PlaneWave Instruments",
          url: "https://planewave.com",
          note: "DeltaRho 500 optical tube assemblies and L-500 mounts"
        },
        {
          name: "Moravian Instruments",
          url: "https://www.gxccd.com",
          note: "C3-61000 PRO CMOS cameras"
        },
        {
          name: "Edmund Optics",
          url: "https://www.edmundoptics.com",
          note: "Medium-band filters"
        },
        {
          name: "Chroma Technology",
          url: "https://www.chroma.com",
          note: "Sloan broad-band filters"
        },
        {
          name: "ASCOM Alpaca",
          url: "https://www.ascom-alpaca.org",
          note: "Device control standard used by the 7DT control layer"
        }
      ]
    },
    {
      title: "Institutions",
      items: [
        {
          name: "Center for the Gravitational-wave Universe",
          url: "http://gwuniverse.snu.ac.kr",
          note: "Designs, builds and operates 7DT"
        },
        {
          name: "SNU Astronomy Program",
          url: "http://astro.snu.ac.kr",
          note: "Department of Physics and Astronomy, Seoul National University"
        },
        {
          name: "National Research Foundation of Korea",
          url: "https://www.nrf.re.kr/eng",
          note: "Principal funding agency"
        }
      ]
    }
  ]
};

// app/content/pages/links.json
var links_default3 = {
  meta: {
    title: "Links \xB7 7-Dimensional Telescope",
    description: "Partner surveys, facilities, vendors and institutions related to 7DT."
  },
  hero: {
    eyebrow: "Resources",
    title: "Links",
    lede: "The surveys, facilities, networks and suppliers that 7DT depends on or works alongside.",
    image: "/img/hero/links.jpg"
  }
};

// app/routes/links.tsx
import { jsx as jsx50, jsxs as jsxs39 } from "react/jsx-runtime";
var meta32 = () => metaOf(links_default3), Index32 = () => {
  let { hero: hero3 } = links_default3;
  return /* @__PURE__ */ jsxs39(PageLayout, { menu: "manuLinks", children: [
    /* @__PURE__ */ jsx50(PageHero, { eyebrow: hero3.eyebrow, title: hero3.title, lede: hero3.lede, image: hero3.image }),
    links_default2.groups.map((group, index) => /* @__PURE__ */ jsx50(Section, { eyebrow: String(index + 1).padStart(2, "0"), title: group.title, alt: index % 2 === 1, children: /* @__PURE__ */ jsx50("ul", { className: "feature-list", children: group.items.map((item) => /* @__PURE__ */ jsxs39("li", { children: [
      /* @__PURE__ */ jsx50("span", { className: "feature-list__key", children: "\u2197" }),
      /* @__PURE__ */ jsxs39("div", { children: [
        /* @__PURE__ */ jsx50("h3", { className: "feature-list__title", children: /* @__PURE__ */ jsx50("a", { href: item.url, target: "_blank", rel: "noreferrer", children: item.name }) }),
        /* @__PURE__ */ jsx50("p", { className: "feature-list__body", children: /* @__PURE__ */ jsx50(Md, { children: item.note }) })
      ] })
    ] }, item.name)) }) }, group.title))
  ] });
}, links_default4 = Index32;

// app/routes/news.tsx
var news_exports = {};
__export(news_exports, {
  default: () => news_default3,
  meta: () => meta33
});
import { useMemo as useMemo5, useState as useState11 } from "react";
import { Pagination as Pagination3 } from "flowbite-react";

// app/content/pages/news.json
var news_default2 = {
  meta: {
    title: "News \xB7 7-Dimensional Telescope",
    description: "Updates, publications, meetings and press from the 7DT project."
  },
  hero: {
    eyebrow: "News",
    title: "Latest from 7DT",
    lede: "Survey milestones, instrument changes, publications and meetings.",
    image: "/img/hero/news.jpg"
  },
  updates: {
    eyebrow: "Updates",
    title: "A bunch of intriguing updates",
    filter: "Filter",
    empty: "No items match the selected categories. Tick a category above to see updates.",
    details: "Details \u2192"
  }
};

// app/routes/news.tsx
import { jsx as jsx51, jsxs as jsxs40 } from "react/jsx-runtime";
var meta33 = () => metaOf(news_default2), TYPES = ["press", "publication", "meeting", "update"], PER_PAGE3 = 6, tagClass = (type) => type === "meeting" ? "tag-news" : type === "publication" ? "tag-publication" : type === "press" ? "tag-press" : "tag-update", Index33 = () => {
  let { hero: hero3, updates } = news_default2, [currentPage, setCurrentPage] = useState11(1), [selected, setSelected] = useState11([...TYPES]), toggle = (type) => {
    setSelected(
      (prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    ), setCurrentPage(1);
  }, items = news_default.news, filtered = useMemo5(
    () => items.filter((item) => selected.includes(item.type)),
    [items, selected]
  ), totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE3)), page = Math.min(currentPage, totalPages), shown = filtered.slice((page - 1) * PER_PAGE3, page * PER_PAGE3);
  return /* @__PURE__ */ jsxs40(PageLayout, { menu: "manuNews", children: [
    /* @__PURE__ */ jsx51(PageHero, { eyebrow: hero3.eyebrow, title: hero3.title, lede: hero3.lede, image: hero3.image }),
    /* @__PURE__ */ jsxs40(Section, { eyebrow: updates.eyebrow, title: updates.title, children: [
      /* @__PURE__ */ jsxs40("div", { className: "toolbar", children: [
        /* @__PURE__ */ jsxs40("div", { className: "toolbar__group", children: [
          /* @__PURE__ */ jsx51("span", { className: "toolbar__label", children: updates.filter }),
          TYPES.map((type) => /* @__PURE__ */ jsxs40("label", { className: "checkbox", htmlFor: `filter-${type}`, children: [
            /* @__PURE__ */ jsx51(
              "input",
              {
                id: `filter-${type}`,
                type: "checkbox",
                checked: selected.includes(type),
                onChange: () => toggle(type)
              }
            ),
            /* @__PURE__ */ jsx51("span", { style: { textTransform: "capitalize" }, children: type })
          ] }, type))
        ] }),
        /* @__PURE__ */ jsxs40("span", { className: "toolbar__label", role: "status", "aria-live": "polite", children: [
          filtered.length,
          " item",
          filtered.length === 1 ? "" : "s"
        ] })
      ] }),
      filtered.length === 0 && /* @__PURE__ */ jsx51("p", { className: "note", style: { padding: "2rem 0" }, children: updates.empty }),
      /* @__PURE__ */ jsx51("div", { className: "news-list", children: shown.map((item, index) => /* @__PURE__ */ jsx51("article", { className: "news", children: /* @__PURE__ */ jsxs40("div", { className: "news-content", children: [
        /* @__PURE__ */ jsx51("div", { className: "news-img-container", children: /* @__PURE__ */ jsx51("img", { src: `/img/news/${item.imgName}`, alt: "", loading: "lazy", width: 640, height: 480 }) }),
        /* @__PURE__ */ jsxs40("div", { className: "news-info", children: [
          /* @__PURE__ */ jsxs40("div", { className: "news-about", children: [
            /* @__PURE__ */ jsx51("span", { className: `news-tag ${tagClass(item.type)}`, children: item.type }),
            /* @__PURE__ */ jsx51("span", { className: "news-time", children: item.date })
          ] }),
          /* @__PURE__ */ jsx51("h2", { className: "news-title", children: item.title }),
          /* @__PURE__ */ jsx51("div", { className: "news-creator", children: item.type === "meeting" ? item.place : item.type === "publication" ? item.shortAuthor : item.source }),
          item.content && /* @__PURE__ */ jsx51("p", { className: "feature-list__body", style: { marginTop: "0.75rem", maxWidth: "64ch" }, children: item.content }),
          item.webpage && /* @__PURE__ */ jsx51(
            "a",
            {
              className: "details-button",
              href: item.webpage,
              target: item.webpage.startsWith("http") ? "_blank" : void 0,
              rel: "noreferrer",
              children: updates.details
            }
          )
        ] })
      ] }) }, `${item.title}-${index}`)) }),
      totalPages > 1 && /* @__PURE__ */ jsx51("div", { className: "pagination-wrap", children: /* @__PURE__ */ jsx51(Pagination3, { currentPage: page, totalPages, onPageChange: setCurrentPage }) })
    ] })
  ] });
}, news_default3 = Index33;

// app/routes/tile.tsx
var tile_exports = {};
__export(tile_exports, {
  loader: () => loader19
});
import { redirect as redirect14 } from "@remix-run/node";
function loader19() {
  let tool = tools.find((t) => t.slug === "tile");
  return redirect14(tool ? tool.url : "/users/links#calculators", 302);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-P23GZZ35.js", imports: ["/build/_shared/chunk-ZTWSWTDU.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-BQKCGNKD.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-4KLPID6Z.js", imports: ["/build/_shared/chunk-SMY7AP5K.js", "/build/_shared/chunk-KA23V6VM.js", "/build/_shared/chunk-OJF6NVWS.js", "/build/_shared/chunk-QCBR3XQK.js", "/build/_shared/chunk-P5CCIMJA.js", "/build/_shared/chunk-ZNOS42HK.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/about.funding": { id: "routes/about.funding", parentId: "root", path: "about/funding", index: void 0, caseSensitive: void 0, module: "/build/routes/about.funding-NXVYP4IM.js", imports: ["/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/about.intro": { id: "routes/about.intro", parentId: "root", path: "about/intro", index: void 0, caseSensitive: void 0, module: "/build/routes/about.intro-TT42SBHV.js", imports: ["/build/_shared/chunk-P5CCIMJA.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/about.team": { id: "routes/about.team", parentId: "root", path: "about/team", index: void 0, caseSensitive: void 0, module: "/build/routes/about.team-KNC7YNZI.js", imports: ["/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/data.$": { id: "routes/data.$", parentId: "root", path: "data/*", index: void 0, caseSensitive: void 0, module: "/build/routes/data.$-3AZXDCRW.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/exptime": { id: "routes/exptime", parentId: "root", path: "exptime", index: void 0, caseSensitive: void 0, module: "/build/routes/exptime-B66677KU.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/gallery": { id: "routes/gallery", parentId: "root", path: "gallery", index: void 0, caseSensitive: void 0, module: "/build/routes/gallery-IDHOR2KC.js", imports: ["/build/_shared/chunk-CANRWFSK.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/links": { id: "routes/links", parentId: "root", path: "links", index: void 0, caseSensitive: void 0, module: "/build/routes/links-772GMXIE.js", imports: ["/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/news": { id: "routes/news", parentId: "root", path: "news", index: void 0, caseSensitive: void 0, module: "/build/routes/news-GHAHM52B.js", imports: ["/build/_shared/chunk-CANRWFSK.js", "/build/_shared/chunk-QCBR3XQK.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/overhead": { id: "routes/overhead", parentId: "root", path: "overhead", index: void 0, caseSensitive: void 0, module: "/build/routes/overhead-GDOVE2UB.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/overview": { id: "routes/overview", parentId: "root", path: "overview", index: void 0, caseSensitive: void 0, module: "/build/routes/overview-KJQASMSO.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/publication.list": { id: "routes/publication.list", parentId: "root", path: "publication/list", index: void 0, caseSensitive: void 0, module: "/build/routes/publication.list-PEIBNE33.js", imports: ["/build/_shared/chunk-CANRWFSK.js", "/build/_shared/chunk-QCBR3XQK.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/publication.policy": { id: "routes/publication.policy", parentId: "root", path: "publication/policy", index: void 0, caseSensitive: void 0, module: "/build/routes/publication.policy-DWF3YRV7.js", imports: ["/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/science.agn": { id: "routes/science.agn", parentId: "root", path: "science/agn", index: void 0, caseSensitive: void 0, module: "/build/routes/science.agn-232JLJJP.js", imports: ["/build/_shared/chunk-KZQM3DQZ.js", "/build/_shared/chunk-ZNOS42HK.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/science.cosmology": { id: "routes/science.cosmology", parentId: "root", path: "science/cosmology", index: void 0, caseSensitive: void 0, module: "/build/routes/science.cosmology-K6YDDHYR.js", imports: ["/build/_shared/chunk-KZQM3DQZ.js", "/build/_shared/chunk-ZNOS42HK.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/science.galactic": { id: "routes/science.galactic", parentId: "root", path: "science/galactic", index: void 0, caseSensitive: void 0, module: "/build/routes/science.galactic-M4MUNPZW.js", imports: ["/build/_shared/chunk-KZQM3DQZ.js", "/build/_shared/chunk-ZNOS42HK.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/science.galaxies": { id: "routes/science.galaxies", parentId: "root", path: "science/galaxies", index: void 0, caseSensitive: void 0, module: "/build/routes/science.galaxies-MITSTF54.js", imports: ["/build/_shared/chunk-KZQM3DQZ.js", "/build/_shared/chunk-ZNOS42HK.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/science.mma": { id: "routes/science.mma", parentId: "root", path: "science/mma", index: void 0, caseSensitive: void 0, module: "/build/routes/science.mma-W7NYWKYY.js", imports: ["/build/_shared/chunk-KZQM3DQZ.js", "/build/_shared/chunk-ZNOS42HK.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/science.overview": { id: "routes/science.overview", parentId: "root", path: "science/overview", index: void 0, caseSensitive: void 0, module: "/build/routes/science.overview-4OSPKZQD.js", imports: ["/build/_shared/chunk-ZNOS42HK.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/science.sci": { id: "routes/science.sci", parentId: "root", path: "science/sci", index: void 0, caseSensitive: void 0, module: "/build/routes/science.sci-HXBHTJRO.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/science.solar": { id: "routes/science.solar", parentId: "root", path: "science/solar", index: void 0, caseSensitive: void 0, module: "/build/routes/science.solar-6ZE57VO4.js", imports: ["/build/_shared/chunk-KZQM3DQZ.js", "/build/_shared/chunk-ZNOS42HK.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/science.transients": { id: "routes/science.transients", parentId: "root", path: "science/transients", index: void 0, caseSensitive: void 0, module: "/build/routes/science.transients-N4KMTGYD.js", imports: ["/build/_shared/chunk-KZQM3DQZ.js", "/build/_shared/chunk-ZNOS42HK.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.coverage": { id: "routes/survey.coverage", parentId: "root", path: "survey/coverage", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.coverage-K4PDY3QT.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.design": { id: "routes/survey.design", parentId: "root", path: "survey/design", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.design-JMRJ3FWA.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.ims": { id: "routes/survey.ims", parentId: "root", path: "survey/ims", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.ims-ZZKVUTM4.js", imports: ["/build/_shared/chunk-PDPVQFGJ.js", "/build/_shared/chunk-KA23V6VM.js", "/build/_shared/chunk-OJF6NVWS.js", "/build/_shared/chunk-P5CCIMJA.js", "/build/_shared/chunk-7JETEBX5.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.overview": { id: "routes/survey.overview", parentId: "root", path: "survey/overview", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.overview-ZPNVTL5Y.js", imports: ["/build/_shared/chunk-P5CCIMJA.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.ris": { id: "routes/survey.ris", parentId: "root", path: "survey/ris", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.ris-YI5FLAXY.js", imports: ["/build/_shared/chunk-PDPVQFGJ.js", "/build/_shared/chunk-SMY7AP5K.js", "/build/_shared/chunk-KA23V6VM.js", "/build/_shared/chunk-OJF6NVWS.js", "/build/_shared/chunk-P5CCIMJA.js", "/build/_shared/chunk-7JETEBX5.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.status": { id: "routes/survey.status", parentId: "root", path: "survey/status", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.status-XAJRC3BA.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.wts": { id: "routes/survey.wts", parentId: "root", path: "survey/wts", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.wts-NLSGIEHI.js", imports: ["/build/_shared/chunk-PDPVQFGJ.js", "/build/_shared/chunk-P5CCIMJA.js", "/build/_shared/chunk-7JETEBX5.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/telescope.computer": { id: "routes/telescope.computer", parentId: "root", path: "telescope/computer", index: void 0, caseSensitive: void 0, module: "/build/routes/telescope.computer-TBVUSB3S.js", imports: ["/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/telescope.instrument": { id: "routes/telescope.instrument", parentId: "root", path: "telescope/instrument", index: void 0, caseSensitive: void 0, module: "/build/routes/telescope.instrument-XGTKVCZ7.js", imports: ["/build/_shared/chunk-7JETEBX5.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/telescope.location": { id: "routes/telescope.location", parentId: "root", path: "telescope/location", index: void 0, caseSensitive: void 0, module: "/build/routes/telescope.location-DE4GACZD.js", imports: ["/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/telescope.mode": { id: "routes/telescope.mode", parentId: "root", path: "telescope/mode", index: void 0, caseSensitive: void 0, module: "/build/routes/telescope.mode-MCZ2PIML.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/telescope.overview": { id: "routes/telescope.overview", parentId: "root", path: "telescope/overview", index: void 0, caseSensitive: void 0, module: "/build/routes/telescope.overview-6IMACGLE.js", imports: ["/build/_shared/chunk-3LTHRCGQ.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/tile": { id: "routes/tile", parentId: "root", path: "tile", index: void 0, caseSensitive: void 0, module: "/build/routes/tile-VYWTWX2U.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.access": { id: "routes/users.access", parentId: "root", path: "users/access", index: void 0, caseSensitive: void 0, module: "/build/routes/users.access-NTENCS7P.js", imports: ["/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.call": { id: "routes/users.call", parentId: "root", path: "users/call", index: void 0, caseSensitive: void 0, module: "/build/routes/users.call-XMUIHZII.js", imports: ["/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.data": { id: "routes/users.data", parentId: "root", path: "users/data", index: void 0, caseSensitive: void 0, module: "/build/routes/users.data-4BTPHAGG.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.faq": { id: "routes/users.faq", parentId: "root", path: "users/faq", index: void 0, caseSensitive: void 0, module: "/build/routes/users.faq-DNO3SIOE.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.format": { id: "routes/users.format", parentId: "root", path: "users/format", index: void 0, caseSensitive: void 0, module: "/build/routes/users.format-EKHPLDT4.js", imports: ["/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.links": { id: "routes/users.links", parentId: "root", path: "users/links", index: void 0, caseSensitive: void 0, module: "/build/routes/users.links-BXEW476C.js", imports: ["/build/_shared/chunk-KA23V6VM.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.overview": { id: "routes/users.overview", parentId: "root", path: "users/overview", index: void 0, caseSensitive: void 0, module: "/build/routes/users.overview-TJJZS57D.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.performance": { id: "routes/users.performance", parentId: "root", path: "users/performance", index: void 0, caseSensitive: void 0, module: "/build/routes/users.performance-MWYGEALS.js", imports: ["/build/_shared/chunk-P5CCIMJA.js", "/build/_shared/chunk-7JETEBX5.js", "/build/_shared/chunk-3LTHRCGQ.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.propose": { id: "routes/users.propose", parentId: "root", path: "users/propose", index: void 0, caseSensitive: void 0, module: "/build/routes/users.propose-CR3OLNQH.js", imports: ["/build/_shared/chunk-OJF6NVWS.js", "/build/_shared/chunk-P5CCIMJA.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.software": { id: "routes/users.software", parentId: "root", path: "users/software", index: void 0, caseSensitive: void 0, module: "/build/routes/users.software-GMSHKYYJ.js", imports: ["/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/users.status": { id: "routes/users.status", parentId: "root", path: "users/status", index: void 0, caseSensitive: void 0, module: "/build/routes/users.status-XBDZ56NL.js", imports: ["/build/_shared/chunk-SMY7AP5K.js", "/build/_shared/chunk-KA23V6VM.js", "/build/_shared/chunk-OJF6NVWS.js", "/build/_shared/chunk-IY3BG56Y.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/visibility": { id: "routes/visibility", parentId: "root", path: "visibility", index: void 0, caseSensitive: void 0, module: "/build/routes/visibility-3OHETBRR.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "85b95634", hmr: void 0, url: "/build/manifest-85B95634.js" };

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
  "routes/science.transients": {
    id: "routes/science.transients",
    parentId: "root",
    path: "science/transients",
    index: void 0,
    caseSensitive: void 0,
    module: science_transients_exports
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
  "routes/science.cosmology": {
    id: "routes/science.cosmology",
    parentId: "root",
    path: "science/cosmology",
    index: void 0,
    caseSensitive: void 0,
    module: science_cosmology_exports
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
  "routes/science.galactic": {
    id: "routes/science.galactic",
    parentId: "root",
    path: "science/galactic",
    index: void 0,
    caseSensitive: void 0,
    module: science_galactic_exports
  },
  "routes/science.galaxies": {
    id: "routes/science.galaxies",
    parentId: "root",
    path: "science/galaxies",
    index: void 0,
    caseSensitive: void 0,
    module: science_galaxies_exports
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
  "routes/users.overview": {
    id: "routes/users.overview",
    parentId: "root",
    path: "users/overview",
    index: void 0,
    caseSensitive: void 0,
    module: users_overview_exports
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
  "routes/science.solar": {
    id: "routes/science.solar",
    parentId: "root",
    path: "science/solar",
    index: void 0,
    caseSensitive: void 0,
    module: science_solar_exports
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
  "routes/science.agn": {
    id: "routes/science.agn",
    parentId: "root",
    path: "science/agn",
    index: void 0,
    caseSensitive: void 0,
    module: science_agn_exports
  },
  "routes/science.mma": {
    id: "routes/science.mma",
    parentId: "root",
    path: "science/mma",
    index: void 0,
    caseSensitive: void 0,
    module: science_mma_exports
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
  "routes/users.call": {
    id: "routes/users.call",
    parentId: "root",
    path: "users/call",
    index: void 0,
    caseSensitive: void 0,
    module: users_call_exports
  },
  "routes/users.data": {
    id: "routes/users.data",
    parentId: "root",
    path: "users/data",
    index: void 0,
    caseSensitive: void 0,
    module: users_data_exports
  },
  "routes/visibility": {
    id: "routes/visibility",
    parentId: "root",
    path: "visibility",
    index: void 0,
    caseSensitive: void 0,
    module: visibility_exports
  },
  "routes/users.faq": {
    id: "routes/users.faq",
    parentId: "root",
    path: "users/faq",
    index: void 0,
    caseSensitive: void 0,
    module: users_faq_exports
  },
  "routes/overhead": {
    id: "routes/overhead",
    parentId: "root",
    path: "overhead",
    index: void 0,
    caseSensitive: void 0,
    module: overhead_exports
  },
  "routes/overview": {
    id: "routes/overview",
    parentId: "root",
    path: "overview",
    index: void 0,
    caseSensitive: void 0,
    module: overview_exports
  },
  "routes/exptime": {
    id: "routes/exptime",
    parentId: "root",
    path: "exptime",
    index: void 0,
    caseSensitive: void 0,
    module: exptime_exports
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
  },
  "routes/tile": {
    id: "routes/tile",
    parentId: "root",
    path: "tile",
    index: void 0,
    caseSensitive: void 0,
    module: tile_exports
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
