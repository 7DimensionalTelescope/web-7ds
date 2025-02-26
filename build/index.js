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
import { jsxDEV } from "react/jsx-dev-runtime";
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
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 51,
          columnNumber: 7
        },
        this
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
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 101,
          columnNumber: 7
        },
        this
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
  default: () => App,
  links: () => links
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

// app/css/app_modified.css
var app_modified_default = "/build/_assets/app_modified-VMFOEVZZ.css";

// app/css/custom.css
var custom_default = "/build/_assets/custom-BWSDPYOC.css";

// node_modules/bootstrap/dist/css/bootstrap.min.css
var bootstrap_min_default = "/build/_assets/bootstrap.min-43MNHBU2.css";

// app/root.tsx
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", href: bootstrap_min_default },
  { rel: "stylesheet", href: app_modified_default },
  { rel: "stylesheet", href: custom_default },
  { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
  ...void 0 ? [{ rel: "stylesheet", href: void 0 }] : []
];
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("script", { src: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 31,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 32,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 38,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 39,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 35,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}

// app/routes/telescope.instrument.tsx
var telescope_instrument_exports = {};
__export(telescope_instrument_exports, {
  default: () => telescope_instrument_default
});

// app/routes/navigate.tsx
var navigate_exports = {};
__export(navigate_exports, {
  default: () => navigate_default
});
import { useState, useEffect } from "react";
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
function buttonStyle(valid) {
  return {
    height: "380px",
    backgroundColor: valid ? "#fff" : null,
    color: valid ? "#000" : null,
    borderTop: valid ? "2px solid var(--pickled-bluewood-900)" : null,
    transition: "all 0.3s ease"
  };
}
function menuClass(valid) {
  return valid ? "font-bold border-transparent sm:mx-6 transition duration-300 ease-in-out transform border-default-500 text-orange" : "font-bold border-transparent sm:mx-6 transition duration-300 ease-in-out transform hover:border-default-500 hover:text-white";
}
function NavBar(props) {
  let [onMouse, setOnMouse] = useState(!1), [isTop, setIsTop] = useState(!props.fixed), [activeMenu, setActiveMenu] = useState(null), [showMenu, setShowMenu] = useState(!1), handleScroll = () => {
    let isTop2 = window.scrollY === 0;
    setIsTop(isTop2 && !props.fixed);
  }, handleManu = (manu, onMouse2) => {
    setActiveMenu(manu), setOnMouse(onMouse2);
  };
  return useEffect(() => (window.addEventListener("scroll", handleScroll), () => {
    window.removeEventListener("scroll", handleScroll);
  }), []), useEffect(() => {
    setActiveMenu(props.manu);
  }, []), /* @__PURE__ */ jsxDEV3("nav", { className: "justify-center mx-auto shadow fixed w-full top-0 z-1000 text-white", style: {
    backgroundColor: `rgba(7, 28, 48, ${isTop ? 0.5 : 1})`,
    margin: "0 auto"
  }, children: /* @__PURE__ */ jsxDEV3(
    "div",
    {
      className: "container flex mx-auto capitalize",
      style: { maxWidth: "1440px", color: "#fff", margin: "0 auto" },
      onMouseLeave: () => handleManu(props.manu, !1),
      children: [
        /* @__PURE__ */ jsxDEV3("div", { children: /* @__PURE__ */ jsxDEV3("button", { onClick: () => setShowMenu(!showMenu), "data-collapse-toggle": "navbar-dropdown", type: "button", className: "inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600", "aria-controls": "navbar-dropdown", "aria-expanded": "false", children: [
          /* @__PURE__ */ jsxDEV3("span", { className: "sr-only", children: "Open main menu" }, void 0, !1, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 68,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV3("svg", { className: "w-10 h-10", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 17 14", children: /* @__PURE__ */ jsxDEV3("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M1 1h15M1 7h15M1 13h15" }, void 0, !1, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 70,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 69,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV3("a", { className: "logo-container", href: "/", children: /* @__PURE__ */ jsxDEV3("img", { src: "/logo_name.png", alt: "Logo", className: " h-10" }, void 0, !1, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 73,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 72,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 67,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 66,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV3("div", { className: `w-full md:block md:w-auto ${showMenu ? "block pt-5 justify-start" : "hidden"}`, id: "navbar-dropdown", children: [
          /* @__PURE__ */ jsxDEV3("ul", { className: "flex flex-col font-medium py-2 md:p-0 mt-0 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 mx-auto", style: { margin: "0 auto" }, children: [
            /* @__PURE__ */ jsxDEV3("li", { className: "$(showMenu) ? pb-2 : ''", style: { textAlign: showMenu ? "left" : "center" }, children: /* @__PURE__ */ jsxDEV3(
              "div",
              {
                onMouseEnter: () => handleManu("manuHome", !0),
                children: /* @__PURE__ */ jsxDEV3(
                  "button",
                  {
                    id: "home",
                    "data-dropdown-toggle": "manuHome",
                    className: menuClass(activeMenu === "manuHome"),
                    style: { marginRight: "1rem", marginLeft: "1rem" },
                    children: /* @__PURE__ */ jsxDEV3("a", { href: "/", children: "Home" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 90,
                      columnNumber: 19
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 84,
                    columnNumber: 17
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 81,
                columnNumber: 15
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 80,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV3("li", { className: "$(showMenu) ? pb-2 : ''", style: { textAlign: showMenu ? "left" : "center" }, children: /* @__PURE__ */ jsxDEV3(
              "div",
              {
                onMouseEnter: () => handleManu("manuAbout", !0),
                children: [
                  /* @__PURE__ */ jsxDEV3(
                    "button",
                    {
                      id: "team",
                      "data-dropdown-toggle": "manuAbout",
                      className: menuClass(activeMenu === "manuAbout"),
                      style: { marginRight: "1.5rem", marginLeft: "1.5rem" },
                      children: /* @__PURE__ */ jsxDEV3("a", { href: "/about/intro", children: "About" }, void 0, !1, {
                        fileName: "app/routes/navigate.tsx",
                        lineNumber: 104,
                        columnNumber: 19
                      }, this)
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 98,
                      columnNumber: 17
                    },
                    this
                  ),
                  onMouse && !showMenu ? /* @__PURE__ */ jsxDEV3("div", { style: buttonStyle(activeMenu === "manuAbout"), children: /* @__PURE__ */ jsxDEV3("ul", { className: "text-xs", children: [
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/about/intro", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: "What is 7DS" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 110,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 109,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/about/team", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: "Team" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 113,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 112,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/about/funding", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: [
                      "Funding",
                      /* @__PURE__ */ jsxDEV3("br", {}, void 0, !1, {
                        fileName: "app/routes/navigate.tsx",
                        lineNumber: 116,
                        columnNumber: 123
                      }, this),
                      "Sources"
                    ] }, void 0, !0, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 116,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 115,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 108,
                    columnNumber: 19
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 107,
                    columnNumber: 17
                  }, this) : showMenu ? /* @__PURE__ */ jsxDEV3("ul", { className: "text-sm", children: [
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/about/intro", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- What is 7DS" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 122,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 121,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/about/team", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Team" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 125,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 124,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/about/funding", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Funding Sources" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 128,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 127,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 120,
                    columnNumber: 17
                  }, this) : null
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 95,
                columnNumber: 15
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 94,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV3("li", { className: "$(showMenu) ? pb-2 : ''", style: { textAlign: showMenu ? "left" : "center" }, children: /* @__PURE__ */ jsxDEV3(
              "div",
              {
                onMouseEnter: () => handleManu("manuScience", !0),
                children: [
                  /* @__PURE__ */ jsxDEV3(
                    "button",
                    {
                      id: "home",
                      "data-dropdown-toggle": "manuScience",
                      className: menuClass(activeMenu === "manuScience"),
                      style: { marginRight: "2rem", marginLeft: "2rem" },
                      children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/overview", children: "Science" }, void 0, !1, {
                        fileName: "app/routes/navigate.tsx",
                        lineNumber: 143,
                        columnNumber: 19
                      }, this)
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 137,
                      columnNumber: 17
                    },
                    this
                  ),
                  onMouse && !showMenu ? /* @__PURE__ */ jsxDEV3("div", { style: buttonStyle(activeMenu === "manuScience"), children: /* @__PURE__ */ jsxDEV3("ul", { className: "text-xs", children: [
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/overview", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: "Overview" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 149,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 148,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/sci", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: [
                      "Multi-messenger",
                      /* @__PURE__ */ jsxDEV3("br", {}, void 0, !1, {
                        fileName: "app/routes/navigate.tsx",
                        lineNumber: 152,
                        columnNumber: 129
                      }, this),
                      "Astronomy"
                    ] }, void 0, !0, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 152,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 151,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/sci", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: [
                      "Galaxy Formation",
                      /* @__PURE__ */ jsxDEV3("br", {}, void 0, !1, {
                        fileName: "app/routes/navigate.tsx",
                        lineNumber: 155,
                        columnNumber: 130
                      }, this),
                      "& Evolution"
                    ] }, void 0, !0, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 155,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 154,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/sci", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: "Cosmology" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 158,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 157,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/sci", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: [
                      "Active Galactic",
                      /* @__PURE__ */ jsxDEV3("br", {}, void 0, !1, {
                        fileName: "app/routes/navigate.tsx",
                        lineNumber: 161,
                        columnNumber: 129
                      }, this),
                      "Nuclei"
                    ] }, void 0, !0, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 161,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 160,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/sci", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: "Galactic Science" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 164,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 163,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/sci", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: [
                      "Solar System",
                      /* @__PURE__ */ jsxDEV3("br", {}, void 0, !1, {
                        fileName: "app/routes/navigate.tsx",
                        lineNumber: 167,
                        columnNumber: 126
                      }, this),
                      "Objects"
                    ] }, void 0, !0, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 167,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 166,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/sci", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: "Transients" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 170,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 169,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 147,
                    columnNumber: 19
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 146,
                    columnNumber: 17
                  }, this) : showMenu ? /* @__PURE__ */ jsxDEV3("ul", { className: "text-sm", children: [
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/sci", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Multi-messenger Astronomy" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 176,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 175,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/sci", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Galaxy Formation & Evolution" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 179,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 178,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/sci", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Cosmology" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 182,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 181,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/sci", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Active Galactic Nuclei" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 185,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 184,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/sci", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Galactic Science" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 188,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 187,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/sci", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Solar System Objects" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 191,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 190,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/science/sci", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Transients" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 194,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 193,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 174,
                    columnNumber: 17
                  }, this) : null
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 134,
                columnNumber: 15
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 133,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV3("li", { className: "$(showMenu) ? pb-2 : ''", style: { textAlign: showMenu ? "left" : "center" }, children: /* @__PURE__ */ jsxDEV3(
              "div",
              {
                onMouseEnter: () => handleManu("manu7ds", !0),
                children: [
                  /* @__PURE__ */ jsxDEV3(
                    "button",
                    {
                      id: "7ds",
                      "data-dropdown-toggle": "manu7ds",
                      className: menuClass(activeMenu === "manu7ds"),
                      style: { marginRight: "1rem", marginLeft: "1rem" },
                      children: /* @__PURE__ */ jsxDEV3("a", { href: "/survey/overview", children: "Survey" }, void 0, !1, {
                        fileName: "app/routes/navigate.tsx",
                        lineNumber: 210,
                        columnNumber: 19
                      }, this)
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 204,
                      columnNumber: 17
                    },
                    this
                  ),
                  onMouse && !showMenu ? /* @__PURE__ */ jsxDEV3("div", { style: buttonStyle(activeMenu === "manu7ds"), children: /* @__PURE__ */ jsxDEV3("ul", { className: "text-xs", children: [
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/survey/overview", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: "Overview" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 216,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 215,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/survey/design", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: "Design" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 219,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 218,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/survey/status", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: "Status" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 222,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 221,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 214,
                    columnNumber: 19
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 213,
                    columnNumber: 17
                  }, this) : showMenu ? /* @__PURE__ */ jsxDEV3("ul", { className: "text-sm", children: [
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/survey/overview", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Overview" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 228,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 227,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/survey/survey", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Design" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 231,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 230,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/survey/status", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Status" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 234,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 233,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 226,
                    columnNumber: 17
                  }, this) : null
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 201,
                columnNumber: 15
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 200,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV3("li", { className: "$(showMenu) ? pb-2 : ''", style: { textAlign: showMenu ? "left" : "center" }, children: /* @__PURE__ */ jsxDEV3(
              "div",
              {
                onMouseEnter: () => handleManu("manu7dt", !0),
                children: [
                  /* @__PURE__ */ jsxDEV3(
                    "button",
                    {
                      id: "7dt",
                      "data-dropdown-toggle": "manu7dt",
                      className: menuClass(activeMenu === "manu7dt"),
                      style: { marginRight: "1rem", marginLeft: "1rem" },
                      children: /* @__PURE__ */ jsxDEV3("a", { href: "/telescope/overview", children: "Facilities" }, void 0, !1, {
                        fileName: "app/routes/navigate.tsx",
                        lineNumber: 249,
                        columnNumber: 19
                      }, this)
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 243,
                      columnNumber: 17
                    },
                    this
                  ),
                  onMouse && !showMenu ? /* @__PURE__ */ jsxDEV3("div", { style: buttonStyle(activeMenu === "manu7dt"), children: /* @__PURE__ */ jsxDEV3("ul", { className: "text-xs", style: { margin: "0 auto" }, children: [
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/telescope/overview", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: "Overview" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 255,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 254,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/telescope/location", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: "Location" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 258,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 257,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/telescope/instrument", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: "Instrument" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 261,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 260,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/telescope/computer", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: [
                      "Computational",
                      /* @__PURE__ */ jsxDEV3("br", {}, void 0, !1, {
                        fileName: "app/routes/navigate.tsx",
                        lineNumber: 264,
                        columnNumber: 134
                      }, this),
                      "Resources"
                    ] }, void 0, !0, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 264,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 263,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/telescope/mode", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: [
                      "Observing",
                      /* @__PURE__ */ jsxDEV3("br", {}, void 0, !1, {
                        fileName: "app/routes/navigate.tsx",
                        lineNumber: 267,
                        columnNumber: 126
                      }, this),
                      "Mode"
                    ] }, void 0, !0, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 267,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 266,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 253,
                    columnNumber: 19
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 252,
                    columnNumber: 17
                  }, this) : showMenu ? /* @__PURE__ */ jsxDEV3("ul", { className: "text-sm", style: { margin: "0 auto" }, children: [
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/telescope/overview", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Overview" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 273,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 272,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/telescope/location", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Location" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 276,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 275,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/telescope/instrument", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Instrument" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 279,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 278,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/telescope/computer", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Computational Resources" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 282,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 281,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/telescope/mode", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Observing Mode" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 285,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 284,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 271,
                    columnNumber: 17
                  }, this) : null
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 240,
                columnNumber: 15
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 239,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV3("li", { className: "$(showMenu) ? pb-2 : ''", style: { textAlign: showMenu ? "left" : "center" }, children: /* @__PURE__ */ jsxDEV3(
              "div",
              {
                onMouseEnter: () => handleManu("manuData", !0),
                children: [
                  /* @__PURE__ */ jsxDEV3(
                    "button",
                    {
                      id: "data",
                      "data-dropdown-toggle": "manuData",
                      className: menuClass(activeMenu === "manuData"),
                      style: { marginRight: "1rem", marginLeft: "1rem" },
                      children: /* @__PURE__ */ jsxDEV3("a", { href: "/data/overview", children: "Data" }, void 0, !1, {
                        fileName: "app/routes/navigate.tsx",
                        lineNumber: 300,
                        columnNumber: 19
                      }, this)
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 294,
                      columnNumber: 17
                    },
                    this
                  ),
                  onMouse && !showMenu ? /* @__PURE__ */ jsxDEV3("div", { style: buttonStyle(activeMenu === "manuData"), children: /* @__PURE__ */ jsxDEV3("ul", { className: "text-xs", children: [
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/data/overview", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: "Overview" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 306,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 305,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/data/data", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: "Data" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 309,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 308,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/data/software", className: "block py-2 hover:bg-oran-100", style: { padding: "0.5rem" }, children: "Software" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 312,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 311,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 304,
                    columnNumber: 19
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 303,
                    columnNumber: 17
                  }, this) : showMenu ? /* @__PURE__ */ jsxDEV3("ul", { className: "text-sm", children: [
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/data/overview", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Overview" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 318,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 317,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/data/data", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Data" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 321,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 320,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV3("li", { children: /* @__PURE__ */ jsxDEV3("a", { href: "/data/software", className: "block py-0 ml-5 hover:text-bluewood-600", style: { padding: "0.5rem" }, children: "- Software" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 324,
                      columnNumber: 23
                    }, this) }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 323,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 316,
                    columnNumber: 19
                  }, this) : null
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 291,
                columnNumber: 15
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 290,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV3("li", { className: "$(showMenu) ? pb-2 : ''", style: { textAlign: showMenu ? "left" : "center" }, children: /* @__PURE__ */ jsxDEV3(
              "div",
              {
                onMouseEnter: () => handleManu("manuPaper", !0),
                children: /* @__PURE__ */ jsxDEV3(
                  "button",
                  {
                    id: "publication",
                    "data-dropdown-toggle": "manuPaper",
                    className: menuClass(activeMenu === "manuPaper"),
                    style: { marginRight: "1rem", marginLeft: "1rem" },
                    children: /* @__PURE__ */ jsxDEV3("a", { href: "/publication/list", children: "Publications" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 339,
                      columnNumber: 19
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 333,
                    columnNumber: 17
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 330,
                columnNumber: 15
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 329,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV3("li", { className: "$(showMenu) ? pb-2 : ''", style: { textAlign: showMenu ? "left" : "center" }, children: /* @__PURE__ */ jsxDEV3(
              "div",
              {
                onMouseEnter: () => handleManu("manuNews", !0),
                children: /* @__PURE__ */ jsxDEV3(
                  "button",
                  {
                    id: "news",
                    "data-dropdown-toggle": "manuNews",
                    className: menuClass(activeMenu === "manuNews"),
                    style: { marginRight: "2rem", marginLeft: "2rem" },
                    children: /* @__PURE__ */ jsxDEV3("a", { href: "/news", children: "News" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 353,
                      columnNumber: 19
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 347,
                    columnNumber: 17
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 344,
                columnNumber: 15
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 343,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV3("li", { className: "$(showMenu) ? pb-2 : ''", style: { textAlign: showMenu ? "left" : "center" }, children: /* @__PURE__ */ jsxDEV3(
              "div",
              {
                onMouseEnter: () => handleManu("manuImages", !0),
                children: /* @__PURE__ */ jsxDEV3(
                  "button",
                  {
                    id: "news",
                    "data-dropdown-toggle": "manuImages",
                    className: menuClass(activeMenu === "manuImages"),
                    style: { marginRight: "1rem", marginLeft: "1rem" },
                    children: /* @__PURE__ */ jsxDEV3("a", { href: "/gallery", children: "Gallery" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 367,
                      columnNumber: 19
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 361,
                    columnNumber: 17
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 358,
                columnNumber: 15
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 357,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV3("li", { className: "$(showMenu) ? pb-2 : ''", style: { textAlign: showMenu ? "left" : "center" }, children: /* @__PURE__ */ jsxDEV3(
              "div",
              {
                onMouseEnter: () => handleManu("manuLinks", !0),
                children: /* @__PURE__ */ jsxDEV3(
                  "button",
                  {
                    id: "links",
                    "data-dropdown-toggle": "manuLinks",
                    className: menuClass(activeMenu === "manuLinks"),
                    style: { marginRight: "1rem", marginLeft: "1rem" },
                    children: /* @__PURE__ */ jsxDEV3("a", { href: "/links", children: "Useful Links" }, void 0, !1, {
                      fileName: "app/routes/navigate.tsx",
                      lineNumber: 381,
                      columnNumber: 19
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/navigate.tsx",
                    lineNumber: 375,
                    columnNumber: 17
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 372,
                columnNumber: 15
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 371,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 79,
            columnNumber: 11
          }, this),
          showMenu ? null : /* @__PURE__ */ jsxDEV3("a", { className: "logo-container", href: "/", children: /* @__PURE__ */ jsxDEV3("img", { src: "/logo.png", alt: "Logo", className: "h-10 items-center", style: { top: "50%", transform: "translateY(0%)" } }, void 0, !1, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 388,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 387,
            columnNumber: 26
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 78,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/navigate.tsx",
      lineNumber: 61,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/routes/navigate.tsx",
    lineNumber: 58,
    columnNumber: 5
  }, this);
}
var navigate_default = NavBar;

// app/routes/footer.tsx
var footer_exports = {};
__export(footer_exports, {
  default: () => footer_default
});
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var FooterBar = () => /* @__PURE__ */ jsxDEV4("footer", { style: { backgroundColor: "black", zIndex: 1e3, position: "relative" }, children: /* @__PURE__ */ jsxDEV4("div", { className: "mx-auto w-full flex", style: { maxWidth: "1440px", margin: "0 auto" }, children: /* @__PURE__ */ jsxDEV4("div", { className: "grid grid-cols-2 gap-8 py-6 lg:py-8 md:grid-cols-5", children: [
  /* @__PURE__ */ jsxDEV4("div", { children: [
    /* @__PURE__ */ jsxDEV4("h2", { className: "text-sm font-semibold text-gray-900 uppercase text-white", children: "Contact" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 8,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("hr", { className: "mb-2" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 9,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("p", { className: "text-gray-500", children: " Myungshin Im " }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 10,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV4("p", { className: "text-gray-500", children: " Professor, Dept. of Physics & Astronomy, Seoul National University," }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 11,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV4("p", { className: "text-gray-500", children: " 56-1 San, Shillim-dong, Kwanak-gu, Seoul, KOREA " }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 12,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV4("p", { className: "text-gray-500", children: " +82-2-880-6585/6761 " }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 13,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV4("p", { className: "text-gray-500 mb-2", children: [
      " ",
      /* @__PURE__ */ jsxDEV4("a", { href: "mailto:mim@astro.snu.ac.kr", children: "mim@astro.snu.ac.kr" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 14,
        columnNumber: 48
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 14,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV4("hr", {}, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 15,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/footer.tsx",
    lineNumber: 7,
    columnNumber: 9
  }, this),
  /* @__PURE__ */ jsxDEV4("div", { children: [
    /* @__PURE__ */ jsxDEV4("h2", { className: "text-sm font-semibold text-gray-900 uppercase text-white", children: "About" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 18,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("hr", { className: "mb-2" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 19,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("ul", { className: "text-gray-500 dark:text-gray-400 font-medium", children: [
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/about/intro", className: "hover:color-org", children: "What is 7DS" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 22,
        columnNumber: 19
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 21,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/about/team", className: "hover:color-org", children: "Team" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 25,
        columnNumber: 19
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 24,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 20,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV4("hr", { className: "mb-6" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 29,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("h2", { className: "text-sm font-semibold text-gray-900 uppercase text-white", children: "Survey" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 30,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("hr", { className: "mb-2" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 31,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("ul", { className: "text-gray-500 dark:text-gray-400 font-medium", children: [
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/survey/overview", className: "hover:color-org", children: "Overview" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 34,
        columnNumber: 19
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 33,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/survey/design", className: "hover:color-org", children: "Design" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 37,
        columnNumber: 19
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 36,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/survey/status", className: "hover:color-org", children: "Status" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 40,
        columnNumber: 19
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 39,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 32,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/footer.tsx",
    lineNumber: 17,
    columnNumber: 9
  }, this),
  /* @__PURE__ */ jsxDEV4("div", { children: [
    /* @__PURE__ */ jsxDEV4("h2", { className: "text-sm font-semibold text-gray-900 uppercase text-white", children: "Science" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 45,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("hr", { className: "mb-2" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 46,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("ul", { className: "text-gray-500 dark:text-gray-400 font-medium", children: [
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/science/sci", className: "hover:color-org", children: "Multi-messenger Astronomy" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 49,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 48,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/science/sci", className: "hover:color-org", children: "Galaxy Formation & Evolution" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 52,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 51,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/science/sci", className: "hover:color-org", children: "Cosmology" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 55,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 54,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/science/sci", className: "hover:color-org", children: "Active Galactic Nuclei" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 58,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 57,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/science/sci", className: "hover:color-org", children: "Galactic Science" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 61,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 60,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/science/sci", className: "hover:color-org", children: "Solar System Objects" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 64,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 63,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/science/sci", className: "hover:color-org", children: "Transients" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 67,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 66,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 47,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/footer.tsx",
    lineNumber: 44,
    columnNumber: 9
  }, this),
  /* @__PURE__ */ jsxDEV4("div", { children: [
    /* @__PURE__ */ jsxDEV4("h2", { className: "text-sm font-semibold text-gray-900 uppercase text-white", children: "Facilities" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 73,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("hr", { className: "mb-2" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 74,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("ul", { className: "text-gray-500 dark:text-gray-400 font-medium", children: [
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/telescope/overview", className: "hover:color-org", children: "Overview" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 77,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 76,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/telescope/location", className: "hover:color-org", children: "Location" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 80,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 79,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/telescope/instrument", className: "hover:color-org", children: "Instrument" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 83,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 82,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/telescope/computer", className: "hover:color-org", children: [
        "Computational",
        /* @__PURE__ */ jsxDEV4("br", {}, void 0, !1, {
          fileName: "app/routes/footer.tsx",
          lineNumber: 86,
          columnNumber: 86
        }, this),
        "Resources"
      ] }, void 0, !0, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 86,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 85,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/telescope/mode", className: "hover:color-org", children: [
        "Observing",
        /* @__PURE__ */ jsxDEV4("br", {}, void 0, !1, {
          fileName: "app/routes/footer.tsx",
          lineNumber: 89,
          columnNumber: 78
        }, this),
        "Mode"
      ] }, void 0, !0, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 89,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 88,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 75,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/footer.tsx",
    lineNumber: 72,
    columnNumber: 9
  }, this),
  /* @__PURE__ */ jsxDEV4("div", { children: [
    /* @__PURE__ */ jsxDEV4("h2", { className: "text-sm font-semibold text-gray-900 uppercase text-white", children: "Data" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 94,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("hr", { className: "mb-2" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 95,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("ul", { className: "text-gray-500 dark:text-gray-400 font-medium", children: [
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/data/overview", className: "hover:color-org", children: "Overview" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 98,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 97,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/data/data", className: "hover:color-org", children: "Data" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 101,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 100,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV4("li", { className: "mb-2", children: /* @__PURE__ */ jsxDEV4("a", { href: "/data/science", className: "hover:color-org", children: "Software" }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 104,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/footer.tsx",
        lineNumber: 103,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 96,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("hr", { className: "mb-4" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 107,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("h2", { className: "text-sm font-semibold text-gray-900 uppercase text-white", children: /* @__PURE__ */ jsxDEV4("a", { href: "/publication", children: "Publications" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 108,
      columnNumber: 84
    }, this) }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 108,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("hr", { className: "mb-4" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 109,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("h2", { className: "text-sm font-semibold text-gray-900 uppercase text-white", children: /* @__PURE__ */ jsxDEV4("a", { href: "/news", children: "News" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 110,
      columnNumber: 84
    }, this) }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 110,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("hr", { className: "mb-4" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 111,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV4("h2", { className: "text-sm font-semibold text-gray-900 uppercase text-white", children: /* @__PURE__ */ jsxDEV4("a", { href: "/gallery", children: "Gallery" }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 112,
      columnNumber: 84
    }, this) }, void 0, !1, {
      fileName: "app/routes/footer.tsx",
      lineNumber: 112,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/footer.tsx",
    lineNumber: 93,
    columnNumber: 9
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/footer.tsx",
  lineNumber: 6,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/routes/footer.tsx",
  lineNumber: 5,
  columnNumber: 5
}, this) }, void 0, !1, {
  fileName: "app/routes/footer.tsx",
  lineNumber: 4,
  columnNumber: 3
}, this), footer_default = FooterBar;

// app/routes/content/text.tsx
var mainText1 = "A research team from the Department of Physics &   Astronomy at Seoul National has revealed first-light images of the 7-Dimensional   Telescope (7DT). The released images show colorful views of several celestial   bodies and demonstrate scientific capabilities of 7DT", mainText2 = "Through meticulous observations and advanced analysis,   our goal is to shed light on unraveling mysterious objects in the universe such   as gravitational-wave sources, supermassive black holes, new transient sources,   peculiar stellar phenomena, and small bodies of the solar system.", mainText3 = "Leveraging both wide-area and high-cadence observation   strategies, the 7 Dimensional Survey (7DS) delves into previously unexplored   cosmic realms by dedicated working groups.", mainText4 = "The 7-Dimensional Telescope (7DT), a pioneering   multi-telescope system, comprises 20 individual telescopes, each with a 50cm   diameter, strategically positioned at Chile.", overviewText = "The 7-Dimensional Telsceope (7DT) is a multi-telescope array that consists of 20  50-cm commercial off-the-shelf (COTS) telescopes. Equipped with 40 medium-  band filters of 25 nm FWHM, 7DT can obtain low-resolution spectra with the wavelength  range of 400 nm and 900 nm for all the objects within a large field of  view (~1.2 square degrees) by taking 2 exposures with each telescope.", locationText = "7DT is located at El Sauce Observatory   (The Willow tree in Spanish) in Chilean Rio Hurdato Valley, in the south of the  Atacama desert. Just south of the sites of the World\u2019s leading astronomical   observatories, such as the Vera C. Rubin Observatory and the Cerro Tololo   Inter-American Observatory, El Sauce Observatory provide excellent seeing   conditions and clear nights (up to 320 nights per year).", opticText = "We deploy 20 units of the DeltaRho 500 manufactured by  PlaneWave. Utilizing an ellipsoidal primary mirror of 508 mm and a spherical  secondary mirror of 286 mm, the DeltaRho offers fast optics (f/3) with a very large  field of view.", mountText = "The L-500 mount, which is also manufactured by PlaneWave, handles the  DeltraRho 500. Utilizing a direct-drive motor system, the L-500 mount offers fast  slewing speed, stable pointing, and tracking accuracies.  Camera Each DeltaRho 500 is equipped with a C3-61000 PRO camera.  Manufactured by Moravian Instruments, a Czech company, the C3-61000 PRO  employs SONY IMX455 sCMOS sensors that have a dimension of 9576 by 6488  with a pixel size of 3.76 by 3.76 microns. Attached to the DeltaRho 500, the  C3-61000 PRO offers a field of view of 1.2 square degrees with pixel scales of 0.5  by 0.5 arcseconds.", filterText = "7DT utilizes 40 medium-band filters of 25 FWHM along with Sloan broad-  band filters. These medium-band filters cover from 400 nm through 900 nm with a  25 nm gap between their central wavelengths. At the moment, however, 20 out of  40 filters are available. These 20 filters still cover the wavelength range between  400 nm through 900 nm with a 50 nm gap between their central wavelengths.", storageText = "The data inflow rate of 7DT is up to 1TB per night and 1PB per year.  A data storage server of 1PB, named \u2018Lyman\u2019 copes with such inflow. \u2018Balmer\u2019 and  \u2018Paschen\u2019 will follow suit.", protonText = "To carry out real-time data reduction and analysis, 7DT requires high-  performance computing. Equipped with 2 NVIDIA A100 GPUs, Proton handles the  job.";

// app/routes/telescope.instrument.tsx
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var Index = () => /* @__PURE__ */ jsxDEV5("div", { children: [
  /* @__PURE__ */ jsxDEV5(navigate_default, { manu: "manu7dt", fixed: !0 }, void 0, !1, {
    fileName: "app/routes/telescope.instrument.tsx",
    lineNumber: 13,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV5("div", { className: "p-10 max-w-screen-lg mx-auto", style: { paddingTop: "150px", paddingBottom: "100px" }, children: /* @__PURE__ */ jsxDEV5("div", { className: "p-10 max-w-screen-lg mx-auto", children: /* @__PURE__ */ jsxDEV5("div", { className: "justify-between", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
    /* @__PURE__ */ jsxDEV5("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "The Biggest Ground-based Multi-telescope System" }, void 0, !1, {
      fileName: "app/routes/telescope.instrument.tsx",
      lineNumber: 18,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV5("h3", { className: "text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
      "Specifcation of ",
      /* @__PURE__ */ jsxDEV5("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "7DT" }, void 0, !1, {
        fileName: "app/routes/telescope.instrument.tsx",
        lineNumber: 22,
        columnNumber: 31
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/telescope.instrument.tsx",
      lineNumber: 21,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/telescope.instrument.tsx",
    lineNumber: 17,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.instrument.tsx",
    lineNumber: 16,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.instrument.tsx",
    lineNumber: 15,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV5("div", { style: { backgroundColor: "#f9f9f9" }, children: /* @__PURE__ */ jsxDEV5("div", { className: "mx-auto w-full", style: { maxWidth: "1440px", margin: "0 auto", padding: "0 10vw 0 10vw" }, children: /* @__PURE__ */ jsxDEV5("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
    /* @__PURE__ */ jsxDEV5("h3", { className: "text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight", style: { fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: "Optical Tube Assembly" }, void 0, !1, {
      fileName: "app/routes/telescope.instrument.tsx",
      lineNumber: 33,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV5("p", { className: "text-content", children: opticText }, void 0, !1, {
      fileName: "app/routes/telescope.instrument.tsx",
      lineNumber: 36,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/telescope.instrument.tsx",
    lineNumber: 32,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.instrument.tsx",
    lineNumber: 31,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.instrument.tsx",
    lineNumber: 30,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV5("div", { style: { backgroundColor: "#fff" }, children: /* @__PURE__ */ jsxDEV5("div", { className: "mx-auto w-full", style: { maxWidth: "1440px", margin: "0 auto", padding: "0 10vw 0 10vw" }, children: /* @__PURE__ */ jsxDEV5("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
    /* @__PURE__ */ jsxDEV5("h3", { className: "text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight", style: { fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: "Mount" }, void 0, !1, {
      fileName: "app/routes/telescope.instrument.tsx",
      lineNumber: 44,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV5("p", { className: "text-content", children: mountText }, void 0, !1, {
      fileName: "app/routes/telescope.instrument.tsx",
      lineNumber: 47,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/telescope.instrument.tsx",
    lineNumber: 43,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.instrument.tsx",
    lineNumber: 42,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.instrument.tsx",
    lineNumber: 41,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV5("div", { style: { backgroundColor: "#f9f9f9" }, children: /* @__PURE__ */ jsxDEV5("div", { className: "mx-auto w-full", style: { maxWidth: "1440px", margin: "0 auto", padding: "0 10vw 0 10vw" }, children: /* @__PURE__ */ jsxDEV5("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
    /* @__PURE__ */ jsxDEV5("h3", { className: "mb-3 text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight", style: { fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: "Filter" }, void 0, !1, {
      fileName: "app/routes/telescope.instrument.tsx",
      lineNumber: 56,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV5("p", { className: "text-content", children: filterText }, void 0, !1, {
      fileName: "app/routes/telescope.instrument.tsx",
      lineNumber: 60,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV5("img", { className: "p-6", src: "/img/filter.png" }, void 0, !1, {
      fileName: "app/routes/telescope.instrument.tsx",
      lineNumber: 62,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV5("p", { className: "text-content", children: "Here are two examples: NGC7293(left) and NGC0253(right)" }, void 0, !1, {
      fileName: "app/routes/telescope.instrument.tsx",
      lineNumber: 64,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV5("div", { className: "flex flex-wrap justify-between p-10", style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxDEV5("img", { src: "/img/NGC7293.gif", width: "40%" }, void 0, !1, {
        fileName: "app/routes/telescope.instrument.tsx",
        lineNumber: 67,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV5("img", { src: "/img/NGC0253.gif", width: "40%" }, void 0, !1, {
        fileName: "app/routes/telescope.instrument.tsx",
        lineNumber: 68,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/telescope.instrument.tsx",
      lineNumber: 66,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/telescope.instrument.tsx",
    lineNumber: 55,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.instrument.tsx",
    lineNumber: 54,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.instrument.tsx",
    lineNumber: 52,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV5(footer_default, {}, void 0, !1, {
    fileName: "app/routes/telescope.instrument.tsx",
    lineNumber: 75,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/telescope.instrument.tsx",
  lineNumber: 12,
  columnNumber: 5
}, this), telescope_instrument_default = Index;

// app/routes/publication.policy.tsx
var publication_policy_exports = {};
__export(publication_policy_exports, {
  default: () => publication_policy_default
});
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var Index2 = () => /* @__PURE__ */ jsxDEV6("div", { style: { background: "#fff" }, children: [
  /* @__PURE__ */ jsxDEV6(navigate_default, { manu: "manuPaper", fixed: !0 }, void 0, !1, {
    fileName: "app/routes/publication.policy.tsx",
    lineNumber: 9,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV6("div", { className: "mx-auto w-full main-container", style: { paddingTop: "300px" }, children: /* @__PURE__ */ jsxDEV6("div", { className: "p-10 max-w-screen-lg mx-auto", children: /* @__PURE__ */ jsxDEV6("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: /* @__PURE__ */ jsxDEV6("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "To be determined." }, void 0, !1, {
    fileName: "app/routes/publication.policy.tsx",
    lineNumber: 14,
    columnNumber: 13
  }, this) }, void 0, !1, {
    fileName: "app/routes/publication.policy.tsx",
    lineNumber: 13,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/publication.policy.tsx",
    lineNumber: 12,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/publication.policy.tsx",
    lineNumber: 11,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV6(footer_default, {}, void 0, !1, {
    fileName: "app/routes/publication.policy.tsx",
    lineNumber: 20,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/publication.policy.tsx",
  lineNumber: 8,
  columnNumber: 5
}, this), publication_policy_default = Index2;

// app/routes/telescope.computer.tsx
var telescope_computer_exports = {};
__export(telescope_computer_exports, {
  default: () => telescope_computer_default
});
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var Index3 = () => /* @__PURE__ */ jsxDEV7("div", { children: [
  /* @__PURE__ */ jsxDEV7(navigate_default, { manu: "manu7dt", fixed: !0 }, void 0, !1, {
    fileName: "app/routes/telescope.computer.tsx",
    lineNumber: 13,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV7("div", { className: "p-10 max-w-screen-lg mx-auto", style: { paddingTop: "150px", paddingBottom: "100px" }, children: /* @__PURE__ */ jsxDEV7("div", { className: "p-10 max-w-screen-lg mx-auto", children: /* @__PURE__ */ jsxDEV7("div", { className: "justify-between", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
    /* @__PURE__ */ jsxDEV7("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "Center for Machine Learning Viability" }, void 0, !1, {
      fileName: "app/routes/telescope.computer.tsx",
      lineNumber: 18,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV7("h3", { className: "text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
      /* @__PURE__ */ jsxDEV7("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "Computational" }, void 0, !1, {
        fileName: "app/routes/telescope.computer.tsx",
        lineNumber: 22,
        columnNumber: 15
      }, this),
      " Resorces"
    ] }, void 0, !0, {
      fileName: "app/routes/telescope.computer.tsx",
      lineNumber: 21,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/telescope.computer.tsx",
    lineNumber: 17,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.computer.tsx",
    lineNumber: 16,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.computer.tsx",
    lineNumber: 15,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV7("div", { style: { backgroundColor: "#f9f9f9" }, children: /* @__PURE__ */ jsxDEV7("div", { className: "mx-auto w-full", style: { maxWidth: "1440px", margin: "0 auto", padding: "0 10vw 0 10vw" }, children: /* @__PURE__ */ jsxDEV7("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
    /* @__PURE__ */ jsxDEV7("h3", { className: "text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight", style: { fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: "Data Storage" }, void 0, !1, {
      fileName: "app/routes/telescope.computer.tsx",
      lineNumber: 31,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV7("p", { className: "text-content", children: storageText }, void 0, !1, {
      fileName: "app/routes/telescope.computer.tsx",
      lineNumber: 34,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/telescope.computer.tsx",
    lineNumber: 30,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.computer.tsx",
    lineNumber: 29,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.computer.tsx",
    lineNumber: 28,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV7("div", { style: { backgroundColor: "#fff" }, children: /* @__PURE__ */ jsxDEV7("div", { className: "mx-auto w-full", style: { maxWidth: "1440px", margin: "0 auto", padding: "0 10vw 0 10vw" }, children: /* @__PURE__ */ jsxDEV7("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
    /* @__PURE__ */ jsxDEV7("h3", { className: "text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight", style: { fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: "Proton" }, void 0, !1, {
      fileName: "app/routes/telescope.computer.tsx",
      lineNumber: 42,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV7("p", { className: "text-content", children: protonText }, void 0, !1, {
      fileName: "app/routes/telescope.computer.tsx",
      lineNumber: 45,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/telescope.computer.tsx",
    lineNumber: 41,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.computer.tsx",
    lineNumber: 40,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.computer.tsx",
    lineNumber: 39,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV7("div", { style: { backgroundColor: "#f9f9f9" }, children: /* @__PURE__ */ jsxDEV7("p", { className: "flex", style: { margin: "0 auto", justifyContent: "center", padding: "50px" }, children: /* @__PURE__ */ jsxDEV7("img", { src: "../img/computer.jpeg", width: "30%" }, void 0, !1, {
    fileName: "app/routes/telescope.computer.tsx",
    lineNumber: 51,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.computer.tsx",
    lineNumber: 50,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.computer.tsx",
    lineNumber: 49,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV7(footer_default, {}, void 0, !1, {
    fileName: "app/routes/telescope.computer.tsx",
    lineNumber: 56,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/telescope.computer.tsx",
  lineNumber: 12,
  columnNumber: 5
}, this), telescope_computer_default = Index3;

// app/routes/telescope.location.tsx
var telescope_location_exports = {};
__export(telescope_location_exports, {
  default: () => telescope_location_default
});
import { useState as useState2 } from "react";
import { Carousel } from "react-bootstrap";
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
var Index4 = () => {
  let [index, setIndex] = useState2(0);
  return /* @__PURE__ */ jsxDEV8("div", { children: [
    /* @__PURE__ */ jsxDEV8(navigate_default, { manu: "manu7dt", fixed: !0 }, void 0, !1, {
      fileName: "app/routes/telescope.location.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV8("div", { className: "p-10 max-w-screen-lg mx-auto", style: { paddingTop: "300px", paddingBottom: "200px" }, children: [
      /* @__PURE__ */ jsxDEV8("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxDEV8("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "Build the Telescope" }, void 0, !1, {
          fileName: "app/routes/telescope.location.tsx",
          lineNumber: 26,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV8("h3", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
          "7DT in ",
          /* @__PURE__ */ jsxDEV8("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "Chile" }, void 0, !1, {
            fileName: "app/routes/telescope.location.tsx",
            lineNumber: 30,
            columnNumber: 20
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/telescope.location.tsx",
          lineNumber: 29,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/telescope.location.tsx",
        lineNumber: 25,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV8("p", { className: "text-content", children: locationText }, void 0, !1, {
        fileName: "app/routes/telescope.location.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/telescope.location.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV8(Carousel, { activeIndex: index, onSelect: (selectedIndex, e) => {
      setIndex(selectedIndex);
    }, interval: 3e3, style: { zIndex: 100 }, children: ["c1.jpg", "c2.jpg", "c3.jpg", "c4.jpg", "c5.jpg", "c6.jpg", "c7.jpg"].map((image, idx) => /* @__PURE__ */ jsxDEV8(Carousel.Item, { children: /* @__PURE__ */ jsxDEV8(
      "div",
      {
        className: "d-block w-100",
        style: {
          backgroundImage: `url(../img/carousel/${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "700px",
          overflow: "hidden"
        }
      },
      void 0,
      !1,
      {
        fileName: "app/routes/telescope.location.tsx",
        lineNumber: 39,
        columnNumber: 13
      },
      this
    ) }, idx, !1, {
      fileName: "app/routes/telescope.location.tsx",
      lineNumber: 38,
      columnNumber: 11
    }, this)) }, void 0, !1, {
      fileName: "app/routes/telescope.location.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV8(footer_default, {}, void 0, !1, {
      fileName: "app/routes/telescope.location.tsx",
      lineNumber: 54,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/telescope.location.tsx",
    lineNumber: 21,
    columnNumber: 5
  }, this);
}, telescope_location_default = Index4;

// app/routes/telescope.overview.tsx
var telescope_overview_exports = {};
__export(telescope_overview_exports, {
  default: () => telescope_overview_default
});
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
var Index5 = () => {
  let backgroundImageStyle = {
    backgroundSize: "cover",
    backgroundImage: 'url("../img/telescope.jpg")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px",
    position: "relative"
    // Add this line
  }, transparentBoxStyle = {
    position: "absolute",
    top: "30%",
    // Adjust this value as per your requirement
    left: "50%",
    // Adjust this value as per your requirement
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    // Adjust the transparency here
    padding: "50px",
    borderRadius: "10px",
    maxWidth: "90%",
    marginTop: "200px"
  }, buttonStyle2 = {
    backgroundColor: "var(--pickled-bluewood-900)",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 10px",
    cursor: "pointer",
    borderRadius: "10px"
  }, buttonHoverStyle = {
    backgroundColor: "var(--pickled-bluewood-600)"
  }, handleMouseOver = (e) => {
    e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
  }, handleMouseOut = (e) => {
    e.target.style.backgroundColor = buttonStyle2.backgroundColor;
  };
  return /* @__PURE__ */ jsxDEV9("div", { style: { background: "#fff" }, children: [
    /* @__PURE__ */ jsxDEV9(navigate_default, { manu: "manu7dt" }, void 0, !1, {
      fileName: "app/routes/telescope.overview.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9("div", { style: backgroundImageStyle, children: [
      /* @__PURE__ */ jsxDEV9("div", { style: { height: "100vh" } }, void 0, !1, {
        fileName: "app/routes/telescope.overview.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV9("div", { style: transparentBoxStyle, children: /* @__PURE__ */ jsxDEV9("div", { className: "mx-auto w-full", children: /* @__PURE__ */ jsxDEV9("div", { className: "max-w-screen-lg mx-auto", children: /* @__PURE__ */ jsxDEV9("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxDEV9("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "7-Dimensional Telescope (7DT)" }, void 0, !1, {
          fileName: "app/routes/telescope.overview.tsx",
          lineNumber: 66,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV9("h3", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
          "Overview of ",
          /* @__PURE__ */ jsxDEV9("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "7DT" }, void 0, !1, {
            fileName: "app/routes/telescope.overview.tsx",
            lineNumber: 70,
            columnNumber: 31
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/telescope.overview.tsx",
          lineNumber: 69,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV9("p", { className: "text-content", children: overviewText }, void 0, !1, {
          fileName: "app/routes/telescope.overview.tsx",
          lineNumber: 72,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV9("br", {}, void 0, !1, {
          fileName: "app/routes/telescope.overview.tsx",
          lineNumber: 73,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV9("p", { className: "mt-4 text-gray-900 font-regular", children: "To explore further,  " }, void 0, !1, {
          fileName: "app/routes/telescope.overview.tsx",
          lineNumber: 74,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV9("div", { className: "flex justify-center", children: [
          /* @__PURE__ */ jsxDEV9("a", { href: "./location", children: /* @__PURE__ */ jsxDEV9("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Location" }, void 0, !1, {
            fileName: "app/routes/telescope.overview.tsx",
            lineNumber: 77,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/telescope.overview.tsx",
            lineNumber: 76,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV9("a", { href: "./instrument", children: /* @__PURE__ */ jsxDEV9("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Instrument" }, void 0, !1, {
            fileName: "app/routes/telescope.overview.tsx",
            lineNumber: 82,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/telescope.overview.tsx",
            lineNumber: 81,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV9("a", { href: "./computer", children: /* @__PURE__ */ jsxDEV9("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Computational Resorces" }, void 0, !1, {
            fileName: "app/routes/telescope.overview.tsx",
            lineNumber: 87,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/telescope.overview.tsx",
            lineNumber: 86,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV9("a", { href: "./mode", children: /* @__PURE__ */ jsxDEV9("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Observing Mode" }, void 0, !1, {
            fileName: "app/routes/telescope.overview.tsx",
            lineNumber: 92,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/telescope.overview.tsx",
            lineNumber: 91,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/telescope.overview.tsx",
          lineNumber: 75,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/telescope.overview.tsx",
        lineNumber: 65,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/telescope.overview.tsx",
        lineNumber: 64,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/telescope.overview.tsx",
        lineNumber: 63,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/telescope.overview.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/telescope.overview.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV9(footer_default, {}, void 0, !1, {
      fileName: "app/routes/telescope.overview.tsx",
      lineNumber: 102,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/telescope.overview.tsx",
    lineNumber: 57,
    columnNumber: 5
  }, this);
}, telescope_overview_default = Index5;

// app/routes/publication.list.tsx
var publication_list_exports = {};
__export(publication_list_exports, {
  default: () => publication_list_default
});
import { useState as useState3 } from "react";
import { Pagination } from "flowbite-react";

// app/routes/content/news.json
var news_default = {
  news: [
    {
      type: "press",
      title: "First Release of Images Taken with 7-Dimensional Telescope",
      webpage: "https://sites.google.com/view/7dtfirstimages",
      date: "Feb. 14, 2024",
      source: "Center for the GW universe",
      content: "",
      imgName: "news-4.png"
    },
    {
      type: "meeting",
      title: "2024 SPHEREx-7DT Joint Workshop",
      place: "Grand Hall in Forest Resom",
      webpage: "https://sites.google.com/view/spherex-7ds-workshop/home",
      date: "Jan. 24-26, 2024",
      content: "",
      imgName: "news-3.png"
    },
    {
      type: "publication",
      author: "Paek, Gregory S. H.; Im, Myungshin; Kim, Joonho; Lim, Gu; Park, Bomi; Choi, Changsu; Kim, Sophia; Barbieri, Claudio; Salafia, Om Sharan ; Paek, Insu; Shin, Suhyun; Seo, Jinguk ; Lee, Hyung Mok; Lee, Chung-Uk; Kim, Seung-Lee; Sung, Hyun-Il",
      title: "Gravitational-wave Electromagnetic Counterpart Korean Observatory (GECKO): GECKO Follow-up Observation of GW190425",
      journal: "ApJ",
      date: "Jan. 2024",
      doi: "10.3847/1538-4357/ad0238",
      preprint: "arXiv:2310.19593",
      ref: "2024ApJ...960..113P",
      shortAuthor: "Paek et al.",
      abstract: "One of the keys to the success of multimessenger astronomy is the rapid identification of the electromagnetic wave counterpart, kilonova (KN), of the gravitational-wave (GW) event. Despite its importance, it is hard to find a KN associated with a GW event, due to a poorly constrained GW localization map and numerous signals that could be confused as a KN. Here, we present the Gravitational-wave Electromagnetic wave Counterpart Korean Observatory (GECKO) project, the GECKO observation of GW190425, and prospects of GECKO in the fourth observing run (O4) of the GW detectors. We outline our follow-up observation strategies during O3. In particular, we describe our galaxy-targeted observation criteria that prioritize based on galaxy properties. Armed with this strategy, we performed an optical and/or near-infrared follow-up observation of GW190425, the first binary neutron star merger event during the O3 run. Despite a vast localization area of 7460 deg2, we observed 621 host galaxy candidates, corresponding to 29.5% of the scores we assigned, with most of them observed within the first 3 days of the GW event. Ten transients were discovered during this search, including a new transient with a host galaxy. No plausible KN was found, but we were still able to constrain the properties of potential KNe using upper limits. The GECKO observation demonstrates that GECKO can possibly uncover a GW170817-like KN at a distance <200 Mpc if the localization area is of the order of hundreds of square degrees, providing a bright prospect for the identification of GW electromagnetic wave counterparts during the O4 run.",
      imgName: "news-2.png",
      webpage: "https://iopscience.iop.org/article/10.3847/1538-4357/ad0238",
      webpage2: "https://arxiv.org/abs/2310.19593"
    },
    {
      type: "publication",
      author: "Tak, Donggeun; Uhm, Z. Lucas; Gillanders, James H.",
      title: "Exploring the Impact of the Ejecta Velocity Profile on the Evolution of Kilonova: Diversity of the Kilonova Lightcurves",
      journal: "ApJ",
      date: "Dec. 2023",
      doi: "10.3847/1538-4357/ad06b0",
      preprint: "arXiv:2310.15608",
      ref: "2023ApJ...958..121T",
      shortAuthor: "Tak et al.",
      abstract: "A kilonova is a short-lived explosive event in the Universe, resulting from the merger of two compact objects. Despite its importance as a primary source of heavy elements through r-process nucleosynthesis, its nature is not well understood due to its rarity. In this work, we introduce a model that determines the density of a radially stratified relativistic ejecta. We apply the model to kilonova ejecta and explore several hypothesized velocity profiles as a function of the merger's ejection time. These velocity profiles result in diverse density profiles of the ejecta, for which we conduct radiative transfer simulations using TARDIS with the solar r-process composition. Consequently, we investigate the impact of the ejecta velocity profile on the resulting evolution of the lightcurve and spectra through the line transitions of heavy elements. The change in the rate at which these elements accumulate in the line-forming region leaves its imprint on the kilonova lightcurve at specific wavelengths, causing the lightcurves to decay at different rates. Furthermore, in several profiles, plateau-like behaviors (slow and/or flat decline) are also observed. In conclusion, this work proposes potential scenarios of the evolution of kilonova due to the ejecta velocity profile.",
      imgName: "news-1.png",
      webpage: "https://iopscience.iop.org/article/10.3847/1538-4357/ad06b0",
      webpage2: "https://arxiv.org/abs/2310.15608"
    }
  ]
};

// app/routes/publication.list.tsx
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
var Index6 = () => {
  let backgroundImage = {
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    backgroundImage: 'url("./img/news.png")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px"
  }, [currentPage, setCurrentPage] = useState3(1), [showAbstract, setShowAbstract] = useState3(!1), pubPerPage = 5, pub = news_default.news.filter((item) => item.type === "publication"), totalPages = Math.ceil(pub.length / pubPerPage), indexOfLastPubs = currentPage * pubPerPage, indexOfFirstPubs = indexOfLastPubs - pubPerPage, currentPub = pub.slice(indexOfFirstPubs, indexOfLastPubs), onPageChange = (page) => setCurrentPage(page);
  return /* @__PURE__ */ jsxDEV10("div", { style: { background: "#fff" }, children: [
    /* @__PURE__ */ jsxDEV10(navigate_default, { manu: "manuPaper", fixed: !0 }, void 0, !1, {
      fileName: "app/routes/publication.list.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV10("div", { style: { paddingTop: "80px" }, children: /* @__PURE__ */ jsxDEV10(Alert, { color: "warning", icon: HiInformationCircle, className: "p-3", children: [
      "See our ",
      /* @__PURE__ */ jsxDEV10("a", { href: "./policy", children: /* @__PURE__ */ jsxDEV10("span", { style: { textDecoration: "underline" }, children: "publication policy" }, void 0, !1, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 39,
        columnNumber: 38
      }, this) }, void 0, !1, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 39,
        columnNumber: 19
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/publication.list.tsx",
      lineNumber: 38,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/publication.list.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV10("div", { className: "mx-auto w-full main-container", children: /* @__PURE__ */ jsxDEV10("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
      /* @__PURE__ */ jsxDEV10("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxDEV10("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "Meet our works" }, void 0, !1, {
          fileName: "app/routes/publication.list.tsx",
          lineNumber: 46,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV10("h3", { className: "text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: /* @__PURE__ */ jsxDEV10("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "Publications" }, void 0, !1, {
          fileName: "app/routes/publication.list.tsx",
          lineNumber: 50,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/publication.list.tsx",
          lineNumber: 49,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 45,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV10("a", { className: "w-full", href: "./policy", children: /* @__PURE__ */ jsxDEV10("button", { style: { textAlign: "right" }, children: "Publication Policy" }, void 0, !1, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 55,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 54,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV10("div", { className: "w-full", style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsxDEV10("button", { style: { textAlign: "right" }, onClick: () => setShowAbstract(!showAbstract), children: showAbstract ? "Hide Abstract" : "Show Abstract" }, void 0, !1, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 59,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 58,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV10("div", { className: "flex flex-wrap items-center justify-center", style: { maxWidth: "1200px", margin: "0 auto", marginBottom: "5rem", textAlign: "center", color: "black" }, children: [
        pub.map((p, index) => (index = index + 1, /* @__PURE__ */ jsxDEV10("div", { className: "w-full pub-container p-6 m-3", style: { boxShadow: "0px 15px 35px rgba(227, 252, 239, 0.1), 0px 5px 15px rgba(0, 0, 0, 0.07)" }, children: [
          /* @__PURE__ */ jsxDEV10("div", { className: "pr-5 p-cont-1", children: [
            /* @__PURE__ */ jsxDEV10("p", { className: "pb-3", style: { fontSize: "24px", lineHeight: "1.2", color: "var(--pickled-bluewood-600)", fontWeight: 500 }, children: /* @__PURE__ */ jsxDEV10("a", { href: p.webpage, target: "_blank", children: p.title }, void 0, !1, {
              fileName: "app/routes/publication.list.tsx",
              lineNumber: 68,
              columnNumber: 140
            }, this) }, void 0, !1, {
              fileName: "app/routes/publication.list.tsx",
              lineNumber: 68,
              columnNumber: 21
            }, this),
            showAbstract && /* @__PURE__ */ jsxDEV10("p", { className: "text-content", style: { fontSize: "12pt" }, children: p.abstract }, void 0, !1, {
              fileName: "app/routes/publication.list.tsx",
              lineNumber: 69,
              columnNumber: 38
            }, this),
            !showAbstract && /* @__PURE__ */ jsxDEV10("p", { className: "pb-3", children: [
              /* @__PURE__ */ jsxDEV10("span", { className: "text-bluewood-900", style: { fontWeight: 700 }, children: "Authors:" }, void 0, !1, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 70,
                columnNumber: 59
              }, this),
              " ",
              p.author
            ] }, void 0, !0, {
              fileName: "app/routes/publication.list.tsx",
              lineNumber: 70,
              columnNumber: 39
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/publication.list.tsx",
            lineNumber: 67,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV10("div", { className: "p-cont-2", style: { textAlign: "left" }, children: [
            showAbstract && /* @__PURE__ */ jsxDEV10("p", { className: "pb-3", children: [
              /* @__PURE__ */ jsxDEV10("span", { className: "text-bluewood-900", style: { fontWeight: 700 }, children: "Authors:" }, void 0, !1, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 73,
                columnNumber: 58
              }, this),
              " ",
              p.author
            ] }, void 0, !0, {
              fileName: "app/routes/publication.list.tsx",
              lineNumber: 73,
              columnNumber: 38
            }, this),
            /* @__PURE__ */ jsxDEV10("p", { className: "pb-3", children: [
              /* @__PURE__ */ jsxDEV10("span", { className: "text-bluewood-900", style: { fontWeight: 700 }, children: "Journal:" }, void 0, !1, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 74,
                columnNumber: 41
              }, this),
              " ",
              p.journal
            ] }, void 0, !0, {
              fileName: "app/routes/publication.list.tsx",
              lineNumber: 74,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV10("p", { className: "pb-3", children: [
              /* @__PURE__ */ jsxDEV10("span", { className: "text-bluewood-900", style: { fontWeight: 700 }, children: "Date:" }, void 0, !1, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 75,
                columnNumber: 41
              }, this),
              " ",
              p.date
            ] }, void 0, !0, {
              fileName: "app/routes/publication.list.tsx",
              lineNumber: 75,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV10("p", { className: "pb-3", children: [
              /* @__PURE__ */ jsxDEV10("span", { className: "text-bluewood-900", style: { fontWeight: 700 }, children: "doi:" }, void 0, !1, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 76,
                columnNumber: 41
              }, this),
              " ",
              /* @__PURE__ */ jsxDEV10("a", { href: p.webpage, target: "_blank", children: p.doi }, void 0, !1, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 76,
                columnNumber: 114
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/publication.list.tsx",
              lineNumber: 76,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV10("p", { className: "pb-3", children: [
              /* @__PURE__ */ jsxDEV10("span", { className: "text-bluewood-900", style: { fontWeight: 700 }, children: "preprint:" }, void 0, !1, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 77,
                columnNumber: 41
              }, this),
              " ",
              /* @__PURE__ */ jsxDEV10("a", { href: p.webpage2, target: "_blank", children: p.preprint }, void 0, !1, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 77,
                columnNumber: 119
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/publication.list.tsx",
              lineNumber: 77,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/publication.list.tsx",
            lineNumber: 72,
            columnNumber: 19
          }, this)
        ] }, index, !0, {
          fileName: "app/routes/publication.list.tsx",
          lineNumber: 66,
          columnNumber: 17
        }, this))),
        /* @__PURE__ */ jsxDEV10("div", { className: "flex justify-center mt-4", children: /* @__PURE__ */ jsxDEV10(Pagination, { currentPage, totalPages, onPageChange }, void 0, !1, {
          fileName: "app/routes/publication.list.tsx",
          lineNumber: 82,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/routes/publication.list.tsx",
          lineNumber: 81,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 62,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/publication.list.tsx",
      lineNumber: 44,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/publication.list.tsx",
      lineNumber: 43,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV10(footer_default, {}, void 0, !1, {
      fileName: "app/routes/publication.list.tsx",
      lineNumber: 87,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/publication.list.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, this);
}, publication_list_default = Index6;

// app/routes/science.overview.tsx
var science_overview_exports = {};
__export(science_overview_exports, {
  default: () => science_overview_default
});
import { jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
var Index7 = () => {
  let backgroundImageStyle = {
    backgroundSize: "cover",
    backgroundImage: 'url("../img/science.jpg")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px",
    position: "relative"
    // Add this line
  }, transparentBoxStyle = {
    position: "absolute",
    top: "30%",
    // Adjust this value as per your requirement
    left: "50%",
    // Adjust this value as per your requirement
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    // Adjust the transparency here
    padding: "50px",
    borderRadius: "10px",
    maxWidth: "90%",
    marginTop: "200px"
  }, buttonStyle2 = {
    backgroundColor: "var(--pickled-bluewood-900)",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 5px",
    cursor: "pointer",
    borderRadius: "10px"
  }, buttonHoverStyle = {
    backgroundColor: "var(--pickled-bluewood-600)"
  }, handleMouseOver = (e) => {
    e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
  }, handleMouseOut = (e) => {
    e.target.style.backgroundColor = buttonStyle2.backgroundColor;
  };
  return /* @__PURE__ */ jsxDEV11("div", { style: { background: "#fff" }, children: [
    /* @__PURE__ */ jsxDEV11(navigate_default, { manu: "manuScience" }, void 0, !1, {
      fileName: "app/routes/science.overview.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV11("div", { style: backgroundImageStyle, children: [
      /* @__PURE__ */ jsxDEV11("div", { style: { height: "100vh" } }, void 0, !1, {
        fileName: "app/routes/science.overview.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV11("div", { style: transparentBoxStyle, children: /* @__PURE__ */ jsxDEV11("div", { className: "mx-auto w-full", children: /* @__PURE__ */ jsxDEV11("div", { className: "max-w-screen-lg mx-auto", children: /* @__PURE__ */ jsxDEV11("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxDEV11("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "Shed light on the physics of the Universe" }, void 0, !1, {
          fileName: "app/routes/science.overview.tsx",
          lineNumber: 66,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV11("h3", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
          "Overview of ",
          /* @__PURE__ */ jsxDEV11("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "Science" }, void 0, !1, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 70,
            columnNumber: 31
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/science.overview.tsx",
          lineNumber: 69,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV11("p", { className: "text-content", children: overviewText }, void 0, !1, {
          fileName: "app/routes/science.overview.tsx",
          lineNumber: 72,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV11("br", {}, void 0, !1, {
          fileName: "app/routes/science.overview.tsx",
          lineNumber: 73,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV11("p", { className: "mt-4 text-gray-900 font-regular", children: "To explore further,  " }, void 0, !1, {
          fileName: "app/routes/science.overview.tsx",
          lineNumber: 74,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV11("div", { className: "flex justify-center", children: [
          /* @__PURE__ */ jsxDEV11("a", { href: "/sci", children: /* @__PURE__ */ jsxDEV11("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Multi-Messenger Astronomy" }, void 0, !1, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 77,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 76,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV11("a", { href: "/sci", children: /* @__PURE__ */ jsxDEV11("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Galaxy Formation Evolution" }, void 0, !1, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 82,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 81,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV11("a", { href: "/sci", children: /* @__PURE__ */ jsxDEV11("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Cosmology" }, void 0, !1, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 87,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 86,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/science.overview.tsx",
          lineNumber: 75,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV11("div", { className: "flex justify-center", children: [
          /* @__PURE__ */ jsxDEV11("a", { href: "/sci", children: /* @__PURE__ */ jsxDEV11("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Active Galactic Nuclei" }, void 0, !1, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 95,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 94,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV11("a", { href: "/sci", children: /* @__PURE__ */ jsxDEV11("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Galactic Science" }, void 0, !1, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 100,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 99,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV11("a", { href: "/sci", children: /* @__PURE__ */ jsxDEV11("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Solar System Objects" }, void 0, !1, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 105,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 104,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV11("a", { href: "/sci", children: /* @__PURE__ */ jsxDEV11("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Transients" }, void 0, !1, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 110,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 109,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/science.overview.tsx",
          lineNumber: 92,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/science.overview.tsx",
        lineNumber: 65,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/science.overview.tsx",
        lineNumber: 64,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/science.overview.tsx",
        lineNumber: 63,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/science.overview.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/science.overview.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV11(footer_default, {}, void 0, !1, {
      fileName: "app/routes/science.overview.tsx",
      lineNumber: 120,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/science.overview.tsx",
    lineNumber: 57,
    columnNumber: 5
  }, this);
}, science_overview_default = Index7;

// app/routes/survey.overview.tsx
var survey_overview_exports = {};
__export(survey_overview_exports, {
  default: () => survey_overview_default
});
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
var Index8 = () => {
  let backgroundImageStyle = {
    backgroundSize: "cover",
    backgroundImage: 'url("../img/survey.jpg")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px",
    position: "relative"
    // Add this line
  }, transparentBoxStyle = {
    position: "absolute",
    top: "30%",
    // Adjust this value as per your requirement
    left: "50%",
    // Adjust this value as per your requirement
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    // Adjust the transparency here
    padding: "50px",
    borderRadius: "10px",
    maxWidth: "90%",
    marginTop: "200px"
  }, buttonStyle2 = {
    backgroundColor: "var(--pickled-bluewood-900)",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 50px",
    cursor: "pointer",
    borderRadius: "10px"
  }, buttonHoverStyle = {
    backgroundColor: "var(--pickled-bluewood-600)"
  }, handleMouseOver = (e) => {
    e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
  }, handleMouseOut = (e) => {
    e.target.style.backgroundColor = buttonStyle2.backgroundColor;
  };
  return /* @__PURE__ */ jsxDEV12("div", { style: { background: "#fff" }, children: [
    /* @__PURE__ */ jsxDEV12(navigate_default, { manu: "manu7ds" }, void 0, !1, {
      fileName: "app/routes/survey.overview.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV12("div", { style: backgroundImageStyle, children: [
      /* @__PURE__ */ jsxDEV12("div", { style: { height: "100vh" } }, void 0, !1, {
        fileName: "app/routes/survey.overview.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV12("div", { style: transparentBoxStyle, children: /* @__PURE__ */ jsxDEV12("div", { className: "mx-auto w-full", children: /* @__PURE__ */ jsxDEV12("div", { className: "max-w-screen-lg mx-auto", children: /* @__PURE__ */ jsxDEV12("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxDEV12("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "Wide-area and High-cadence Survey" }, void 0, !1, {
          fileName: "app/routes/survey.overview.tsx",
          lineNumber: 66,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV12("h3", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
          "Overview of ",
          /* @__PURE__ */ jsxDEV12("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "7DS" }, void 0, !1, {
            fileName: "app/routes/survey.overview.tsx",
            lineNumber: 70,
            columnNumber: 31
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/survey.overview.tsx",
          lineNumber: 69,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV12("p", { className: "text-content", children: overviewText }, void 0, !1, {
          fileName: "app/routes/survey.overview.tsx",
          lineNumber: 72,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV12("br", {}, void 0, !1, {
          fileName: "app/routes/survey.overview.tsx",
          lineNumber: 73,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV12("p", { className: "mt-4 text-gray-900 font-regular", children: "To explore further,  " }, void 0, !1, {
          fileName: "app/routes/survey.overview.tsx",
          lineNumber: 74,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV12("div", { className: "flex justify-center", children: [
          /* @__PURE__ */ jsxDEV12("a", { href: "./design", children: /* @__PURE__ */ jsxDEV12("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Survey" }, void 0, !1, {
            fileName: "app/routes/survey.overview.tsx",
            lineNumber: 77,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/survey.overview.tsx",
            lineNumber: 76,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV12("a", { href: "./status", children: /* @__PURE__ */ jsxDEV12("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Status" }, void 0, !1, {
            fileName: "app/routes/survey.overview.tsx",
            lineNumber: 82,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/survey.overview.tsx",
            lineNumber: 81,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/survey.overview.tsx",
          lineNumber: 75,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/survey.overview.tsx",
        lineNumber: 65,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/survey.overview.tsx",
        lineNumber: 64,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/survey.overview.tsx",
        lineNumber: 63,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/survey.overview.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/survey.overview.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV12(footer_default, {}, void 0, !1, {
      fileName: "app/routes/survey.overview.tsx",
      lineNumber: 92,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/survey.overview.tsx",
    lineNumber: 57,
    columnNumber: 5
  }, this);
}, survey_overview_default = Index8;

// app/routes/telescope.mode.tsx
var telescope_mode_exports = {};
__export(telescope_mode_exports, {
  default: () => telescope_mode_default
});
import { jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
var Index9 = () => /* @__PURE__ */ jsxDEV13("div", { style: { background: "#fff" }, children: [
  /* @__PURE__ */ jsxDEV13(navigate_default, { manu: "manu7dt", fixed: !0 }, void 0, !1, {
    fileName: "app/routes/telescope.mode.tsx",
    lineNumber: 12,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV13("div", { className: "p-10 max-w-screen-lg mx-auto", style: { paddingTop: "300px", paddingBottom: "100px" }, children: /* @__PURE__ */ jsxDEV13("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
    /* @__PURE__ */ jsxDEV13("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "Diverse Strategy, Dynamic Science" }, void 0, !1, {
      fileName: "app/routes/telescope.mode.tsx",
      lineNumber: 16,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV13("h3", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
      /* @__PURE__ */ jsxDEV13("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "Observing" }, void 0, !1, {
        fileName: "app/routes/telescope.mode.tsx",
        lineNumber: 20,
        columnNumber: 13
      }, this),
      " Mode"
    ] }, void 0, !0, {
      fileName: "app/routes/telescope.mode.tsx",
      lineNumber: 19,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/telescope.mode.tsx",
    lineNumber: 15,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.mode.tsx",
    lineNumber: 14,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV13("div", { style: { display: "flex", justifyContent: "center", paddingBottom: "100px" }, children: /* @__PURE__ */ jsxDEV13("img", { width: "50%", src: "../img/overview.png" }, void 0, !1, {
    fileName: "app/routes/telescope.mode.tsx",
    lineNumber: 26,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/telescope.mode.tsx",
    lineNumber: 25,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV13(footer_default, {}, void 0, !1, {
    fileName: "app/routes/telescope.mode.tsx",
    lineNumber: 29,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/telescope.mode.tsx",
  lineNumber: 11,
  columnNumber: 5
}, this), telescope_mode_default = Index9;

// app/routes/about.funding.tsx
var about_funding_exports = {};
__export(about_funding_exports, {
  default: () => about_funding_default
});
import { jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
var Index10 = () => /* @__PURE__ */ jsxDEV14("div", { style: { background: "#fff" }, children: [
  /* @__PURE__ */ jsxDEV14(navigate_default, { manu: "manuAbout", fixed: !0 }, void 0, !1, {
    fileName: "app/routes/about.funding.tsx",
    lineNumber: 16,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV14("div", { className: "mx-auto w-full m,main-container", style: { paddingTop: "100px" }, children: [
    /* @__PURE__ */ jsxDEV14("div", { className: "p-10 max-w-screen-lg mx-auto", children: /* @__PURE__ */ jsxDEV14("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
      /* @__PURE__ */ jsxDEV14("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "Gratitude" }, void 0, !1, {
        fileName: "app/routes/about.funding.tsx",
        lineNumber: 21,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV14("h3", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
        /* @__PURE__ */ jsxDEV14("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "Funding" }, void 0, !1, {
          fileName: "app/routes/about.funding.tsx",
          lineNumber: 25,
          columnNumber: 14
        }, this),
        " Sources"
      ] }, void 0, !0, {
        fileName: "app/routes/about.funding.tsx",
        lineNumber: 24,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/about.funding.tsx",
      lineNumber: 20,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/about.funding.tsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV14("div", { style: { backgroundColor: "#fff" }, children: /* @__PURE__ */ jsxDEV14("div", { className: "mx-auto w-full", style: { maxWidth: "1440px", margin: "0 auto", padding: "0 10vw 0 10vw" }, children: /* @__PURE__ */ jsxDEV14("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
      /* @__PURE__ */ jsxDEV14("h3", { className: "text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight", style: { fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: "Center for the Gravitational-Wave Universe" }, void 0, !1, {
        fileName: "app/routes/about.funding.tsx",
        lineNumber: 33,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV14("p", { className: "flex", style: { margin: "0 auto", justifyContent: "center" }, children: /* @__PURE__ */ jsxDEV14("img", { src: "../img/institutes/gwuniv.png", width: "60%", style: { padding: "10px" } }, void 0, !1, {
        fileName: "app/routes/about.funding.tsx",
        lineNumber: 36,
        columnNumber: 87
      }, this) }, void 0, !1, {
        fileName: "app/routes/about.funding.tsx",
        lineNumber: 36,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV14("p", { className: "text-content", children: overviewText }, void 0, !1, {
        fileName: "app/routes/about.funding.tsx",
        lineNumber: 37,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/about.funding.tsx",
      lineNumber: 32,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/about.funding.tsx",
      lineNumber: 31,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/about.funding.tsx",
      lineNumber: 30,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV14("div", { style: { backgroundColor: "#fff" }, children: /* @__PURE__ */ jsxDEV14("div", { className: "mx-auto w-full", style: { maxWidth: "1440px", margin: "0 auto", padding: "0 10vw 0 10vw" }, children: /* @__PURE__ */ jsxDEV14("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
      /* @__PURE__ */ jsxDEV14("h3", { className: "text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight", style: { fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: "National Research Foundation of Korea" }, void 0, !1, {
        fileName: "app/routes/about.funding.tsx",
        lineNumber: 46,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV14("p", { className: "flex", style: { margin: "0 auto", justifyContent: "center" }, children: /* @__PURE__ */ jsxDEV14("img", { src: "../img/institutes/nrf.jpg", width: "50%" }, void 0, !1, {
        fileName: "app/routes/about.funding.tsx",
        lineNumber: 49,
        columnNumber: 87
      }, this) }, void 0, !1, {
        fileName: "app/routes/about.funding.tsx",
        lineNumber: 49,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV14("p", { className: "text-content", children: overviewText }, void 0, !1, {
        fileName: "app/routes/about.funding.tsx",
        lineNumber: 50,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/about.funding.tsx",
      lineNumber: 45,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/about.funding.tsx",
      lineNumber: 44,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/about.funding.tsx",
      lineNumber: 43,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV14("div", { style: { backgroundColor: "#fff" }, children: /* @__PURE__ */ jsxDEV14("div", { className: "mx-auto w-full", style: { maxWidth: "1440px", margin: "0 auto", padding: "0 10vw 0 10vw" }, children: /* @__PURE__ */ jsxDEV14("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
      /* @__PURE__ */ jsxDEV14("h3", { className: "text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight", style: { fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: "Consolidator Grants" }, void 0, !1, {
        fileName: "app/routes/about.funding.tsx",
        lineNumber: 58,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV14("p", { className: "text-content", children: overviewText }, void 0, !1, {
        fileName: "app/routes/about.funding.tsx",
        lineNumber: 61,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/about.funding.tsx",
      lineNumber: 57,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/about.funding.tsx",
      lineNumber: 56,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/about.funding.tsx",
      lineNumber: 55,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/about.funding.tsx",
    lineNumber: 18,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV14(footer_default, {}, void 0, !1, {
    fileName: "app/routes/about.funding.tsx",
    lineNumber: 66,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/about.funding.tsx",
  lineNumber: 15,
  columnNumber: 5
}, this), about_funding_default = Index10;

// app/routes/data.overview.tsx
var data_overview_exports = {};
__export(data_overview_exports, {
  default: () => data_overview_default
});
import { jsxDEV as jsxDEV15 } from "react/jsx-dev-runtime";
var Index11 = () => {
  let backgroundImageStyle = {
    backgroundSize: "cover",
    backgroundImage: 'url("../img/data.png")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px",
    position: "relative"
    // Add this line
  }, transparentBoxStyle = {
    position: "absolute",
    top: "30%",
    // Adjust this value as per your requirement
    left: "50%",
    // Adjust this value as per your requirement
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    // Adjust the transparency here
    padding: "50px",
    borderRadius: "10px",
    maxWidth: "90%",
    marginTop: "200px"
  }, buttonStyle2 = {
    backgroundColor: "var(--pickled-bluewood-900)",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 50px",
    cursor: "pointer",
    borderRadius: "10px"
  }, buttonHoverStyle = {
    backgroundColor: "var(--pickled-bluewood-600)"
  }, handleMouseOver = (e) => {
    e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
  }, handleMouseOut = (e) => {
    e.target.style.backgroundColor = buttonStyle2.backgroundColor;
  };
  return /* @__PURE__ */ jsxDEV15("div", { style: { background: "#fff" }, children: [
    /* @__PURE__ */ jsxDEV15(navigate_default, { manu: "manuData" }, void 0, !1, {
      fileName: "app/routes/data.overview.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV15("div", { style: backgroundImageStyle, children: [
      /* @__PURE__ */ jsxDEV15("div", { style: { height: "100vh" } }, void 0, !1, {
        fileName: "app/routes/data.overview.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV15("div", { style: transparentBoxStyle, children: /* @__PURE__ */ jsxDEV15("div", { className: "mx-auto w-full", children: /* @__PURE__ */ jsxDEV15("div", { className: "max-w-screen-lg mx-auto", children: /* @__PURE__ */ jsxDEV15("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxDEV15("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "7DS data center" }, void 0, !1, {
          fileName: "app/routes/data.overview.tsx",
          lineNumber: 66,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV15("h3", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
          "Overview of ",
          /* @__PURE__ */ jsxDEV15("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "Data" }, void 0, !1, {
            fileName: "app/routes/data.overview.tsx",
            lineNumber: 70,
            columnNumber: 31
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/data.overview.tsx",
          lineNumber: 69,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV15("p", { className: "text-content", children: overviewText }, void 0, !1, {
          fileName: "app/routes/data.overview.tsx",
          lineNumber: 72,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV15("br", {}, void 0, !1, {
          fileName: "app/routes/data.overview.tsx",
          lineNumber: 73,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV15("p", { className: "mt-4 text-gray-900 font-regular", children: "To explore further,  " }, void 0, !1, {
          fileName: "app/routes/data.overview.tsx",
          lineNumber: 74,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV15("div", { className: "flex justify-center", children: [
          /* @__PURE__ */ jsxDEV15("a", { href: "./data", children: /* @__PURE__ */ jsxDEV15("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Data" }, void 0, !1, {
            fileName: "app/routes/data.overview.tsx",
            lineNumber: 77,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/data.overview.tsx",
            lineNumber: 76,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV15("a", { href: "./software", children: /* @__PURE__ */ jsxDEV15("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Software" }, void 0, !1, {
            fileName: "app/routes/data.overview.tsx",
            lineNumber: 82,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/data.overview.tsx",
            lineNumber: 81,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/data.overview.tsx",
          lineNumber: 75,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/data.overview.tsx",
        lineNumber: 65,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/data.overview.tsx",
        lineNumber: 64,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/data.overview.tsx",
        lineNumber: 63,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/data.overview.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/data.overview.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV15(footer_default, {}, void 0, !1, {
      fileName: "app/routes/data.overview.tsx",
      lineNumber: 92,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/data.overview.tsx",
    lineNumber: 57,
    columnNumber: 5
  }, this);
}, data_overview_default = Index11;

// app/routes/data.software.tsx
var data_software_exports = {};
__export(data_software_exports, {
  default: () => data_software_default
});
import { jsxDEV as jsxDEV16 } from "react/jsx-dev-runtime";
var Index12 = () => /* @__PURE__ */ jsxDEV16("div", { style: { background: "#fff" }, children: [
  /* @__PURE__ */ jsxDEV16(navigate_default, { manu: "manuData", fixed: !0 }, void 0, !1, {
    fileName: "app/routes/data.software.tsx",
    lineNumber: 9,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV16("div", { className: "mx-auto w-full main-container", style: { paddingTop: "300px" }, children: /* @__PURE__ */ jsxDEV16("div", { className: "p-10 max-w-screen-lg mx-auto", children: /* @__PURE__ */ jsxDEV16("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: /* @__PURE__ */ jsxDEV16("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "To be determined." }, void 0, !1, {
    fileName: "app/routes/data.software.tsx",
    lineNumber: 14,
    columnNumber: 13
  }, this) }, void 0, !1, {
    fileName: "app/routes/data.software.tsx",
    lineNumber: 13,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/data.software.tsx",
    lineNumber: 12,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/data.software.tsx",
    lineNumber: 11,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV16(footer_default, {}, void 0, !1, {
    fileName: "app/routes/data.software.tsx",
    lineNumber: 20,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/data.software.tsx",
  lineNumber: 8,
  columnNumber: 5
}, this), data_software_default = Index12;

// app/routes/survey.design.tsx
var survey_design_exports = {};
__export(survey_design_exports, {
  default: () => survey_design_default
});
import { jsxDEV as jsxDEV17 } from "react/jsx-dev-runtime";
var Index13 = () => /* @__PURE__ */ jsxDEV17("div", { style: { background: "#fff" }, children: [
  /* @__PURE__ */ jsxDEV17(navigate_default, { manu: "manu7ds", fixed: !0 }, void 0, !1, {
    fileName: "app/routes/survey.design.tsx",
    lineNumber: 10,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV17("div", { className: "mx-auto w-full main-container", style: { paddingTop: "300px" }, children: /* @__PURE__ */ jsxDEV17("div", { className: "p-10 max-w-screen-lg mx-auto", children: /* @__PURE__ */ jsxDEV17("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
    /* @__PURE__ */ jsxDEV17("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "....?" }, void 0, !1, {
      fileName: "app/routes/survey.design.tsx",
      lineNumber: 15,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV17("h3", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
      "Design of ",
      /* @__PURE__ */ jsxDEV17("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "7DS" }, void 0, !1, {
        fileName: "app/routes/survey.design.tsx",
        lineNumber: 19,
        columnNumber: 25
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/survey.design.tsx",
      lineNumber: 18,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV17("p", { className: "text-content", children: overviewText }, void 0, !1, {
      fileName: "app/routes/survey.design.tsx",
      lineNumber: 21,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/survey.design.tsx",
    lineNumber: 14,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/survey.design.tsx",
    lineNumber: 13,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/survey.design.tsx",
    lineNumber: 12,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV17(footer_default, {}, void 0, !1, {
    fileName: "app/routes/survey.design.tsx",
    lineNumber: 25,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/survey.design.tsx",
  lineNumber: 9,
  columnNumber: 5
}, this), survey_design_default = Index13;

// app/routes/survey.status.tsx
var survey_status_exports = {};
__export(survey_status_exports, {
  default: () => survey_status_default
});
import { jsxDEV as jsxDEV18 } from "react/jsx-dev-runtime";
var Index14 = () => /* @__PURE__ */ jsxDEV18("div", { style: { background: "#fff" }, children: [
  /* @__PURE__ */ jsxDEV18(navigate_default, { manu: "manu7ds", fixed: !0 }, void 0, !1, {
    fileName: "app/routes/survey.status.tsx",
    lineNumber: 16,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV18("div", { className: "mx-auto w-full main-container", style: { paddingTop: "300px" }, children: /* @__PURE__ */ jsxDEV18("div", { className: "p-10 max-w-screen-lg mx-auto", children: /* @__PURE__ */ jsxDEV18("div", { className: "justify-between", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
    /* @__PURE__ */ jsxDEV18("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "Observational Conditions" }, void 0, !1, {
      fileName: "app/routes/survey.status.tsx",
      lineNumber: 21,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV18("h3", { className: "text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
      "7DT ",
      /* @__PURE__ */ jsxDEV18("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "Status" }, void 0, !1, {
        fileName: "app/routes/survey.status.tsx",
        lineNumber: 25,
        columnNumber: 19
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/survey.status.tsx",
      lineNumber: 24,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/survey.status.tsx",
    lineNumber: 20,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/survey.status.tsx",
    lineNumber: 19,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/survey.status.tsx",
    lineNumber: 18,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV18(footer_default, {}, void 0, !1, {
    fileName: "app/routes/survey.status.tsx",
    lineNumber: 30,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/survey.status.tsx",
  lineNumber: 15,
  columnNumber: 5
}, this), survey_status_default = Index14;

// app/routes/about.intro.tsx
var about_intro_exports = {};
__export(about_intro_exports, {
  default: () => about_intro_default
});
import { jsxDEV as jsxDEV19 } from "react/jsx-dev-runtime";
var Index15 = () => {
  let backgroundImageStyle = {
    backgroundSize: "cover",
    backgroundImage: 'url("../img/about.png")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px",
    position: "relative"
    // Add this line
  }, transparentBoxStyle = {
    position: "absolute",
    top: "30%",
    // Adjust this value as per your requirement
    left: "50%",
    // Adjust this value as per your requirement
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    // Adjust the transparency here
    padding: "50px",
    borderRadius: "10px",
    maxWidth: "90%",
    marginTop: "200px"
  }, buttonStyle2 = {
    backgroundColor: "var(--pickled-bluewood-900)",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 50px",
    cursor: "pointer",
    borderRadius: "10px"
  }, buttonHoverStyle = {
    backgroundColor: "var(--pickled-bluewood-600)"
  }, handleMouseOver = (e) => {
    e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
  }, handleMouseOut = (e) => {
    e.target.style.backgroundColor = buttonStyle2.backgroundColor;
  };
  return /* @__PURE__ */ jsxDEV19("div", { style: { background: "#fff" }, children: [
    /* @__PURE__ */ jsxDEV19(navigate_default, { manu: "manuAbout" }, void 0, !1, {
      fileName: "app/routes/about.intro.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV19("div", { style: backgroundImageStyle, children: [
      /* @__PURE__ */ jsxDEV19("div", { style: { height: "100vh" } }, void 0, !1, {
        fileName: "app/routes/about.intro.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV19("div", { style: transparentBoxStyle, children: /* @__PURE__ */ jsxDEV19("div", { className: "mx-auto w-full", children: /* @__PURE__ */ jsxDEV19("div", { className: "max-w-screen-lg mx-auto", children: /* @__PURE__ */ jsxDEV19("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxDEV19("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "Welcome" }, void 0, !1, {
          fileName: "app/routes/about.intro.tsx",
          lineNumber: 66,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV19("h3", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
          "What is ",
          /* @__PURE__ */ jsxDEV19("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "7DS" }, void 0, !1, {
            fileName: "app/routes/about.intro.tsx",
            lineNumber: 70,
            columnNumber: 27
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/about.intro.tsx",
          lineNumber: 69,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV19("p", { className: "text-content", children: overviewText }, void 0, !1, {
          fileName: "app/routes/about.intro.tsx",
          lineNumber: 72,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV19("br", {}, void 0, !1, {
          fileName: "app/routes/about.intro.tsx",
          lineNumber: 73,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV19("div", { className: "flex justify-center", children: [
          /* @__PURE__ */ jsxDEV19("a", { href: "./team", children: /* @__PURE__ */ jsxDEV19("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Meet our Team" }, void 0, !1, {
            fileName: "app/routes/about.intro.tsx",
            lineNumber: 76,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/about.intro.tsx",
            lineNumber: 75,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV19("a", { href: "./funding", children: /* @__PURE__ */ jsxDEV19("button", { style: buttonStyle2, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Funding Sources" }, void 0, !1, {
            fileName: "app/routes/about.intro.tsx",
            lineNumber: 81,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/about.intro.tsx",
            lineNumber: 80,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/about.intro.tsx",
          lineNumber: 74,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/about.intro.tsx",
        lineNumber: 65,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/about.intro.tsx",
        lineNumber: 64,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/about.intro.tsx",
        lineNumber: 63,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/about.intro.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/about.intro.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV19(footer_default, {}, void 0, !1, {
      fileName: "app/routes/about.intro.tsx",
      lineNumber: 92,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/about.intro.tsx",
    lineNumber: 57,
    columnNumber: 5
  }, this);
}, about_intro_default = Index15;

// app/routes/science.sci.tsx
var science_sci_exports = {};
__export(science_sci_exports, {
  default: () => science_sci_default
});
import { useState as useState4, useEffect as useEffect4 } from "react";
import { jsxDEV as jsxDEV20 } from "react/jsx-dev-runtime";
var Index16 = () => {
  let backgroundImage = {
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    backgroundImage: 'url("./img/science.jpg")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px"
  }, [submenuTop, setSubmenuTop] = useState4("750px"), [smallWindow, setSmallWindow] = useState4(!0);
  return useEffect4(() => {
    let updateWindow = () => {
      window.innerWidth < 1500 ? setSmallWindow(!1) : setSmallWindow(!0);
    };
    return updateWindow(), window.addEventListener("resize", updateWindow), () => {
      window.removeEventListener("resize", updateWindow);
    };
  }, []), useEffect4(() => {
    let handleScroll = () => {
      let scrollPosition = window.scrollY, windowHeight = window.innerHeight, newTop = `calc(750px - ${scrollPosition * 0.5 / windowHeight * 100}%)`;
      setSubmenuTop(newTop);
    };
    return window.addEventListener("scroll", handleScroll), () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []), /* @__PURE__ */ jsxDEV20("div", { style: { background: "#fff" }, children: [
    /* @__PURE__ */ jsxDEV20(navigate_default, { manu: "manuScience", fixed: !0 }, void 0, !1, {
      fileName: "app/routes/science.sci.tsx",
      lineNumber: 62,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV20("div", { className: "mx-auto w-full main-container", style: { paddingTop: "100px" }, children: /* @__PURE__ */ jsxDEV20("div", { className: "p-10 max-w-screen-lg mx-auto", children: /* @__PURE__ */ jsxDEV20("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
      /* @__PURE__ */ jsxDEV20("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "questions" }, void 0, !1, {
        fileName: "app/routes/science.sci.tsx",
        lineNumber: 67,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV20("h3", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
        "Templates ",
        /* @__PURE__ */ jsxDEV20("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "ASD" }, void 0, !1, {
          fileName: "app/routes/science.sci.tsx",
          lineNumber: 71,
          columnNumber: 25
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/science.sci.tsx",
        lineNumber: 70,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/science.sci.tsx",
      lineNumber: 66,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/science.sci.tsx",
      lineNumber: 65,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/science.sci.tsx",
      lineNumber: 64,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV20(footer_default, {}, void 0, !1, {
      fileName: "app/routes/science.sci.tsx",
      lineNumber: 76,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/science.sci.tsx",
    lineNumber: 61,
    columnNumber: 5
  }, this);
}, science_sci_default = Index16;

// app/routes/about.team.tsx
var about_team_exports = {};
__export(about_team_exports, {
  default: () => about_team_default
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
      name: "Dr. Jihoon Kim",
      role: "Project Manager",
      title: "Associate Research Professor",
      affiliation: "Seoul National University",
      email: "jhkim.astrosnu@gmail.com",
      imgName: "KimJH.jpeg"
    },
    {
      name: "Dr. Seo-won Chang",
      role: "Database Manager",
      title: "Associate Research Professor",
      affiliation: "Seoul National University",
      email: "seowon.chang@snu.ac.kr",
      imgName: "ChangSW.jpeg"
    },
    {
      name: "Gregory S.H. Paek",
      role: "Data Reduction Pipeline",
      title: "PhD Candidate",
      affiliation: "Seoul National University",
      email: "gregorypaek94@gmail.com",
      imgName: "PaekG.jpeg"
    },
    {
      name: "Hyeonho Choi",
      role: "Science Operation Development",
      title: "PhD Student",
      affiliation: "Seoul National University",
      email: "hhchoi1022@gmail.com",
      imgName: "ChoiHH.jpeg"
    }
  ]
};

// app/routes/about.team.tsx
import { DataGrid } from "@mui/x-data-grid";

// app/routes/content/collabs.json
var collabs_default = {
  collabs: [
    {
      id: 1,
      firstName: "Donggeun",
      lastName: "Tak",
      affiliation: "Seoul National University",
      workingGroup: "MMA, Transients",
      email: "donggeun.tak@gmail.com"
    }
  ]
};

// app/routes/about.team.tsx
import { jsxDEV as jsxDEV21 } from "react/jsx-dev-runtime";
var Index17 = () => {
  let backgroundImage = {
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    backgroundImage: 'url("./img/team.jpeg")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px"
  }, columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "affiliation", headerName: "Affiliation", flex: 1 },
    { field: "workingGroup", headerName: "Working Group", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 }
  ];
  return /* @__PURE__ */ jsxDEV21("div", { style: { background: "#fff" }, children: [
    /* @__PURE__ */ jsxDEV21(navigate_default, { manu: "manuAbout", fixed: !0 }, void 0, !1, {
      fileName: "app/routes/about.team.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV21("div", { className: "mx-auto w-full m,main-container", style: { paddingTop: "100px" }, children: /* @__PURE__ */ jsxDEV21("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
      /* @__PURE__ */ jsxDEV21("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxDEV21("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "Introducing" }, void 0, !1, {
          fileName: "app/routes/about.team.tsx",
          lineNumber: 37,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV21("h3", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
          "Our ",
          /* @__PURE__ */ jsxDEV21("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "Team" }, void 0, !1, {
            fileName: "app/routes/about.team.tsx",
            lineNumber: 41,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/about.team.tsx",
          lineNumber: 40,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/about.team.tsx",
        lineNumber: 36,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV21("div", { className: "sm:grid grid-cols-2 gap-6 my-10", children: team_default.members.map((member, index) => /* @__PURE__ */ jsxDEV21("div", { className: "max-w-sm w-full lg:max-w-full lg:flex mx-auto my-10", children: [
        /* @__PURE__ */ jsxDEV21(
          "div",
          {
            className: "h-96 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden",
            style: { backgroundImage: `url(../img/team/${member.imgName})`, backgroundPosition: "center" }
          },
          void 0,
          !1,
          {
            fileName: "app/routes/about.team.tsx",
            lineNumber: 48,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV21("div", { className: "border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4", children: /* @__PURE__ */ jsxDEV21("div", { children: [
          /* @__PURE__ */ jsxDEV21(
            "a",
            {
              href: "mailto:" + member.email,
              className: "text-gray-900 font-bold text-xl mb-2 hover:text-bluewood-600 transition duration-500 ease-in-out",
              children: member.name
            },
            void 0,
            !1,
            {
              fileName: "app/routes/about.team.tsx",
              lineNumber: 53,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV21("p", { className: "text-sm text-gray-600", children: member.title }, void 0, !1, {
            fileName: "app/routes/about.team.tsx",
            lineNumber: 56,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV21("p", { className: "text-gray-900 font-bold text-base mt-4", children: member.role }, void 0, !1, {
            fileName: "app/routes/about.team.tsx",
            lineNumber: 59,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV21("p", { className: "text-gray-900 font-bold text-base mt-4", children: "Affiliation" }, void 0, !1, {
            fileName: "app/routes/about.team.tsx",
            lineNumber: 62,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV21("p", { className: "text-sm text-gray-600", children: member.affiliation }, void 0, !1, {
            fileName: "app/routes/about.team.tsx",
            lineNumber: 65,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV21("div", { className: "my-4 flex", children: [
            member.webpage && /* @__PURE__ */ jsxDEV21("a", { className: "mr-3", href: member.webpage, children: /* @__PURE__ */ jsxDEV21("svg", { className: "w-6 h-6 text-gray-800 dark:text-white", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDEV21("path", { fillRule: "evenodd", d: "M11.3 3.3a1 1 0 0 1 1.4 0l6 6 2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2 6-6Z", clipRule: "evenodd" }, void 0, !1, {
              fileName: "app/routes/about.team.tsx",
              lineNumber: 72,
              columnNumber: 27
            }, this) }, void 0, !1, {
              fileName: "app/routes/about.team.tsx",
              lineNumber: 71,
              columnNumber: 25
            }, this) }, void 0, !1, {
              fileName: "app/routes/about.team.tsx",
              lineNumber: 70,
              columnNumber: 41
            }, this),
            /* @__PURE__ */ jsxDEV21("a", { className: "mr-3", href: "mailto:" + member.email, children: /* @__PURE__ */ jsxDEV21("i", { className: "fa fa-envelope" }, void 0, !1, {
              fileName: "app/routes/about.team.tsx",
              lineNumber: 77,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "app/routes/about.team.tsx",
              lineNumber: 76,
              columnNumber: 21
            }, this),
            member.orcid && /* @__PURE__ */ jsxDEV21("a", { className: "mr-3 flex items-center", href: member.orcid, children: /* @__PURE__ */ jsxDEV21("img", { alt: "ORCID logo", src: "https://info.orcid.org/wp-content/uploads/2019/11/orcid_16x16.png", width: "16px", height: "16px" }, void 0, !1, {
              fileName: "app/routes/about.team.tsx",
              lineNumber: 81,
              columnNumber: 25
            }, this) }, void 0, !1, {
              fileName: "app/routes/about.team.tsx",
              lineNumber: 80,
              columnNumber: 39
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/about.team.tsx",
            lineNumber: 68,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/about.team.tsx",
          lineNumber: 52,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/about.team.tsx",
          lineNumber: 51,
          columnNumber: 15
        }, this)
      ] }, index, !0, {
        fileName: "app/routes/about.team.tsx",
        lineNumber: 47,
        columnNumber: 17
      }, this)) }, void 0, !1, {
        fileName: "app/routes/about.team.tsx",
        lineNumber: 44,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV21("h3", { className: "mb-10 sm:text-2xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", color: "var(--pickled-bluewood-900)" }, children: "List of Fine Collaborators" }, void 0, !1, {
        fileName: "app/routes/about.team.tsx",
        lineNumber: 90,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV21("section", { id: "DataGrid", style: { height: 350, width: "100%", marginLeft: "auto", marginRight: "auto" }, children: /* @__PURE__ */ jsxDEV21(DataGrid, { rows: collabs_default.collabs, columns, sx: { backgroundColor: "white" } }, void 0, !1, {
        fileName: "app/routes/about.team.tsx",
        lineNumber: 94,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/about.team.tsx",
        lineNumber: 93,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/about.team.tsx",
      lineNumber: 35,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/about.team.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV21(footer_default, {}, void 0, !1, {
      fileName: "app/routes/about.team.tsx",
      lineNumber: 98,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/about.team.tsx",
    lineNumber: 31,
    columnNumber: 5
  }, this);
}, about_team_default = Index17;

// app/routes/data.data.tsx
var data_data_exports = {};
__export(data_data_exports, {
  default: () => data_data_default
});
import { useState as useState5 } from "react";
import { Table } from "flowbite-react";
import { Pagination as Pagination2 } from "flowbite-react";

// app/routes/plot.tsx
var plot_exports = {};
__export(plot_exports, {
  default: () => plot_default
});
import { useRef, useEffect as useEffect5 } from "react";
import * as d3 from "d3";
import { geoAitoff } from "d3-geo-projection";
import { jsxDEV as jsxDEV22 } from "react/jsx-dev-runtime";
var ScatterGeoPlot = ({ data, width, height }) => {
  let svgRef = useRef();
  return useEffect5(() => {
    let svg = d3.select(svgRef.current), projection = geoAitoff().scale(100).translate([width / 2, height / 2]), graticule = d3.geoGraticule();
    svg.append("path").datum(graticule).attr("class", "graticule").attr("d", d3.geoPath().projection(projection)).attr("fill", "none").attr("stroke", "#ccc").attr("stroke-width", 0.5).attr("stroke-opacity", 0.5);
    let circles = svg.selectAll("circle").data(data.filter((d) => typeof d.ra == "number" && typeof d.dec == "number")).enter().append("circle").attr("cx", (d) => projection([parseFloat(d.ra), parseFloat(d.dec)])[0]).attr("cy", (d) => projection([parseFloat(d.ra), parseFloat(d.dec)])[1]).attr("r", 5).attr("fill", "blue").attr("stroke", "black").attr("stroke-width", 1), tooltip = d3.select(svgRef.current.parentNode).append("div").style("position", "absolute").style("background-color", "white").style("border", "1px solid black").style("padding", "5px").style("visibility", "hidden");
    return circles.on("mouseover", (event, d) => {
      tooltip.html(`
        <strong>Name:</strong> ${d.name}<br>
        <strong>Exposure:</strong> ${d.exposure}<br>
        <strong>Sigma:</strong> ${d.sigma}
      `).style`
          visibility: visible;
          left: ${event.pageX + 10}px;
          top: ${event.pageY - 30}px;
        `;
    }), circles.on("mouseout", () => {
      tooltip.style`
        visibility: hidden;
      `;
    }), () => {
      tooltip.remove();
    };
  }, [data, height, width]), /* @__PURE__ */ jsxDEV22("svg", { ref: svgRef, width, height }, void 0, !1, {
    fileName: "app/routes/plot.tsx",
    lineNumber: 70,
    columnNumber: 10
  }, this);
}, plot_default = ScatterGeoPlot;

// app/routes/content/data.json
var data_default = [
  {
    name: "Crab Nebula",
    ra: 83.633208,
    dec: 22.014472,
    exposure: 0.333,
    sigma: 7.8,
    ref: !1
  },
  {
    name: "Andromeda Galaxy",
    ra: 10.685542,
    dec: 41.269278,
    exposure: 0.5,
    sigma: 6.5,
    ref: !1
  },
  {
    name: "Orion Nebula",
    ra: 83.82208,
    dec: -5.391111,
    exposure: 0.25,
    sigma: 8.2,
    ref: !1
  },
  {
    name: "Whirlpool Galaxy",
    ra: 197.470375,
    dec: 47.195278,
    exposure: 0.41666667,
    sigma: 6.9,
    ref: !1
  },
  {
    name: "Pleiades Cluster",
    ra: 56.85,
    dec: 24.116667,
    exposure: 0.16666667,
    sigma: 9.1,
    ref: !1
  },
  {
    name: "Eagle Nebula",
    ra: 274.8,
    dec: -13.783333,
    exposure: 0.27777778,
    sigma: 7.3,
    ref: !1
  },
  {
    name: "Horsehead Nebula",
    ra: 85.246875,
    dec: -2.458333,
    exposure: 0.22222222,
    sigma: 8.5,
    ref: !1
  },
  {
    name: "Ring Nebula",
    ra: 283.39775,
    dec: 33.029167,
    exposure: 0.30555556,
    sigma: 7.2,
    ref: !1
  },
  {
    name: "Sombrero Galaxy",
    ra: 185.728708,
    dec: -11.629167,
    exposure: 0.36111111,
    sigma: 6.7,
    ref: !1
  },
  {
    name: "Lagoon Nebula",
    ra: 271.57125,
    dec: -24.386667,
    exposure: 0.26388889,
    sigma: 8,
    ref: !1
  },
  {
    name: "Helix Nebula",
    ra: 337.410375,
    dec: -20.836667,
    exposure: 0.23611111,
    sigma: 8.7,
    ref: !1
  },
  {
    name: "Antennae Galaxies",
    ra: 180.471167,
    dec: -18.869528,
    exposure: 0.47222222,
    sigma: 7.1,
    ref: !1
  },
  {
    name: "Boomerang Nebula",
    ra: 191.20625,
    dec: -54.517222,
    exposure: 0.33333333,
    sigma: 9.3,
    ref: !1
  },
  {
    name: "Omega Nebula",
    ra: 271.57125,
    dec: -24.386667,
    exposure: 0.26388889,
    sigma: 8,
    ref: !1
  },
  {
    name: "Tarantula Nebula",
    ra: 89.658675,
    dec: -69.085,
    exposure: 0.38888889,
    sigma: 7.4,
    ref: !1
  },
  {
    name: "Cat's Eye Nebula",
    ra: 137.389583,
    dec: 13.226667,
    exposure: 0.27777778,
    sigma: 8.4,
    ref: !1
  },
  {
    name: "Veil Nebula",
    ra: 311.40925,
    dec: 30.721389,
    exposure: 0.23611111,
    sigma: 7.6,
    ref: !1
  },
  {
    name: "North America Nebula",
    ra: 344.48875,
    dec: 44.51,
    exposure: 0.26388889,
    sigma: 7.9,
    ref: !1
  },
  {
    name: "Trifid Nebula",
    ra: 270.59125,
    dec: -23.03,
    exposure: 0.33333333,
    sigma: 7,
    ref: !1
  },
  {
    name: "Andromeda Galaxy",
    ra: 10.685542,
    dec: 41.269278,
    exposure: 0.5,
    sigma: 6.5,
    ref: !1
  }
];

// app/routes/data.data.tsx
import { jsxDEV as jsxDEV23 } from "react/jsx-dev-runtime";
var Index18 = () => {
  let [currentPage, setCurrentPage] = useState5(1), rowsPerPage = 10, totalRows = data_default.length, totalPages = Math.ceil(totalRows / rowsPerPage), onPageChange = (page) => {
    setCurrentPage(page);
  }, paginatedData = data_default.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  return /* @__PURE__ */ jsxDEV23("div", { style: { background: "#fff" }, children: [
    /* @__PURE__ */ jsxDEV23(navigate_default, { manu: "manuData", fixed: !0 }, void 0, !1, {
      fileName: "app/routes/data.data.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV23("div", { className: "mx-auto w-full main-container", style: { paddingTop: "200px" }, children: /* @__PURE__ */ jsxDEV23("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
      /* @__PURE__ */ jsxDEV23("div", { className: "justify-between", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxDEV23("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "Invaluable Observations" }, void 0, !1, {
          fileName: "app/routes/data.data.tsx",
          lineNumber: 35,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV23("h3", { className: "text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
          /* @__PURE__ */ jsxDEV23("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "Data" }, void 0, !1, {
            fileName: "app/routes/data.data.tsx",
            lineNumber: 39,
            columnNumber: 15
          }, this),
          " Archive"
        ] }, void 0, !0, {
          fileName: "app/routes/data.data.tsx",
          lineNumber: 38,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/data.data.tsx",
        lineNumber: 34,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV23("div", { className: "flex w-full justify-center", children: /* @__PURE__ */ jsxDEV23(plot_default, { data: data_default, height: "400", width: "800" }, void 0, !1, {
        fileName: "app/routes/data.data.tsx",
        lineNumber: 43,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/data.data.tsx",
        lineNumber: 42,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV23(Table, { striped: !0, children: [
        /* @__PURE__ */ jsxDEV23(Table.Head, { children: [
          /* @__PURE__ */ jsxDEV23(Table.HeadCell, { children: "Target" }, void 0, !1, {
            fileName: "app/routes/data.data.tsx",
            lineNumber: 48,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV23(Table.HeadCell, { children: "R.A." }, void 0, !1, {
            fileName: "app/routes/data.data.tsx",
            lineNumber: 49,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV23(Table.HeadCell, { children: "Dec." }, void 0, !1, {
            fileName: "app/routes/data.data.tsx",
            lineNumber: 50,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV23(Table.HeadCell, { children: "Exposure" }, void 0, !1, {
            fileName: "app/routes/data.data.tsx",
            lineNumber: 51,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV23(Table.HeadCell, { children: "Significance" }, void 0, !1, {
            fileName: "app/routes/data.data.tsx",
            lineNumber: 52,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV23(Table.HeadCell, { children: "Details" }, void 0, !1, {
            fileName: "app/routes/data.data.tsx",
            lineNumber: 53,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/data.data.tsx",
          lineNumber: 47,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV23(Table.Body, { className: "divide-y", children: paginatedData.map((d, index) => /* @__PURE__ */ jsxDEV23(Table.Row, { className: "bg-white dark:border-gray-700 dark:bg-gray-800", children: [
          /* @__PURE__ */ jsxDEV23(Table.Cell, { className: "whitespace-nowrap font-medium text-gray-900 dark:text-white", children: d.name }, void 0, !1, {
            fileName: "app/routes/data.data.tsx",
            lineNumber: 59,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV23(Table.Cell, { children: d.ra }, void 0, !1, {
            fileName: "app/routes/data.data.tsx",
            lineNumber: 62,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV23(Table.Cell, { children: d.dec }, void 0, !1, {
            fileName: "app/routes/data.data.tsx",
            lineNumber: 63,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV23(Table.Cell, { children: d.exposure }, void 0, !1, {
            fileName: "app/routes/data.data.tsx",
            lineNumber: 64,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV23(Table.Cell, { children: d.sigma }, void 0, !1, {
            fileName: "app/routes/data.data.tsx",
            lineNumber: 65,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV23(Table.Cell, { children: d.ref === !1 ? /* @__PURE__ */ jsxDEV23("a", { href: "mailto:mim@astro.snu.ac.kr", className: "font-medium text-cyan-600 hover:underline dark:text-cyan-500", children: "Contact" }, void 0, !1, {
            fileName: "app/routes/data.data.tsx",
            lineNumber: 68,
            columnNumber: 25
          }, this) : /* @__PURE__ */ jsxDEV23("a", { href: d.ref, className: "font-medium text-cyan-600 hover:underline dark:text-cyan-500", children: "Link" }, void 0, !1, {
            fileName: "app/routes/data.data.tsx",
            lineNumber: 71,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "app/routes/data.data.tsx",
            lineNumber: 66,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/data.data.tsx",
          lineNumber: 58,
          columnNumber: 19
        }, this)) }, void 0, !1, {
          fileName: "app/routes/data.data.tsx",
          lineNumber: 55,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/data.data.tsx",
        lineNumber: 46,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV23("div", { className: "flex justify-center mt-4", children: /* @__PURE__ */ jsxDEV23(Pagination2, { currentPage, totalPages, onPageChange }, void 0, !1, {
        fileName: "app/routes/data.data.tsx",
        lineNumber: 82,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/data.data.tsx",
        lineNumber: 81,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/data.data.tsx",
      lineNumber: 33,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/data.data.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV23(footer_default, {}, void 0, !1, {
      fileName: "app/routes/data.data.tsx",
      lineNumber: 86,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/data.data.tsx",
    lineNumber: 29,
    columnNumber: 5
  }, this);
}, data_data_default = Index18;

// app/routes/gallery.tsx
var gallery_exports = {};
__export(gallery_exports, {
  default: () => gallery_default
});
import { useState as useState6, useEffect as useEffect7 } from "react";
import { Pagination as Pagination3 } from "flowbite-react";

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
    name: "Pseudo-color Images of the Helix Nebula taken at wavelengths of 370 nm, 500 nm, and 650 nm, corresponding to blue, green, and red.",
    file: "Figure8a(lowres)_u-500-650_asinh.png"
  },
  {
    name: "Pseudo-color image of the Trifid Nebula.",
    file: "Figure9(lowres)_NGC6514_RGB.jpg"
  }
];

// app/routes/gallery.tsx
import { jsxDEV as jsxDEV24 } from "react/jsx-dev-runtime";
var Index19 = () => {
  let backgroundImage = {
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    backgroundImage: 'url("./img/data.jpg")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px"
  }, [submenuTop, setSubmenuTop] = useState6("200px"), [smallWindow, setSmallWindow] = useState6(!0), [currentPage, setCurrentPage] = useState6(1), imagesPerPage = 6, totalPages = Math.ceil(images_default.length / imagesPerPage), paginatedImages = images_default.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage), onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return useEffect7(() => {
    let updateWindow = () => {
      window.innerWidth < 1500 ? setSmallWindow(!1) : setSmallWindow(!0);
    };
    return updateWindow(), window.addEventListener("resize", updateWindow), () => {
      window.removeEventListener("resize", updateWindow);
    };
  }, []), useEffect7(() => {
    let handleScroll = () => {
      let scrollPosition = window.scrollY, windowHeight = window.innerHeight, newTop = `calc(200px - ${scrollPosition * -0.1 / windowHeight * 100}%)`;
      setSubmenuTop(newTop);
    };
    return window.addEventListener("scroll", handleScroll), () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []), /* @__PURE__ */ jsxDEV24("div", { style: { background: "#fff" }, children: [
    /* @__PURE__ */ jsxDEV24(navigate_default, { manu: "manuGallery", fixed: !0 }, void 0, !1, {
      fileName: "app/routes/gallery.tsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV24("div", { className: "mx-auto w-full main-container", style: { paddingTop: "150px" }, children: /* @__PURE__ */ jsxDEV24("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
      /* @__PURE__ */ jsxDEV24("div", { className: "justify-between", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxDEV24("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "Pictures of our Universe from 7DS" }, void 0, !1, {
          fileName: "app/routes/gallery.tsx",
          lineNumber: 75,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV24("h3", { className: "text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: /* @__PURE__ */ jsxDEV24("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "Gallery" }, void 0, !1, {
          fileName: "app/routes/gallery.tsx",
          lineNumber: 79,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/gallery.tsx",
          lineNumber: 78,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/gallery.tsx",
        lineNumber: 74,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV24("div", { className: "gallery", style: { paddingTop: "100px" }, children: /* @__PURE__ */ jsxDEV24("ul", { children: paginatedImages.map((img, index) => /* @__PURE__ */ jsxDEV24("li", { children: /* @__PURE__ */ jsxDEV24("a", { href: `./img/images/${img.file}`, children: /* @__PURE__ */ jsxDEV24("figure", { children: [
        /* @__PURE__ */ jsxDEV24("img", { src: `./img/images/${img.file}` }, void 0, !1, {
          fileName: "app/routes/gallery.tsx",
          lineNumber: 90,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV24("figcaption", { children: img.name }, void 0, !1, {
          fileName: "app/routes/gallery.tsx",
          lineNumber: 91,
          columnNumber: 21
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/gallery.tsx",
        lineNumber: 89,
        columnNumber: 19
      }, this) }, void 0, !1, {
        fileName: "app/routes/gallery.tsx",
        lineNumber: 88,
        columnNumber: 17
      }, this) }, index, !1, {
        fileName: "app/routes/gallery.tsx",
        lineNumber: 87,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "app/routes/gallery.tsx",
        lineNumber: 84,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/gallery.tsx",
        lineNumber: 83,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV24("div", { className: "flex justify-center mt-4", children: /* @__PURE__ */ jsxDEV24(Pagination3, { currentPage, totalPages, onPageChange }, void 0, !1, {
        fileName: "app/routes/gallery.tsx",
        lineNumber: 99,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/gallery.tsx",
        lineNumber: 98,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/gallery.tsx",
      lineNumber: 73,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/gallery.tsx",
      lineNumber: 72,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV24(footer_default, {}, void 0, !1, {
      fileName: "app/routes/gallery.tsx",
      lineNumber: 103,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/gallery.tsx",
    lineNumber: 69,
    columnNumber: 5
  }, this);
}, gallery_default = Index19;

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default,
  meta: () => meta
});

// app/routes/main.tsx
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
import { useEffect as useEffect8, useState as useState7, useRef as useRef2 } from "react";
import { jsxDEV as jsxDEV25 } from "react/jsx-dev-runtime";
var MainPage = () => {
  let [smallWindow, setSmallWindow] = useState7(!0), [backgroudImageSet, setBackgroudImageSet] = useState7("fixed"), [scrollPos, setScrollPos] = useState7(0), rulerImageRef = useRef2(!1), rulerImageRefFixed = useRef2(!1), [hovered, setHovered] = useState7(0), handleHover = (val) => {
    setHovered(val);
  };
  useEffect8(() => {
    let updateWindow = () => {
      window.innerWidth < 1200 ? setSmallWindow(!1) : setSmallWindow(!0);
    }, handleScroll = () => {
      let scrollY = window.scrollY;
      setScrollPos(scrollY);
    };
    return updateWindow(), window.addEventListener("scroll", handleScroll), window.addEventListener("resize", updateWindow), () => {
      window.removeEventListener("resize", updateWindow), window.removeEventListener("scroll", handleScroll);
    };
  }, []), useEffect8(() => {
    let handleScroll = () => {
      if (rulerImageRef.current) {
        let scrollX = window.scrollY || window.pageYOffset;
        rulerImageRef.current.style.backgroundPositionX = `-${scrollX}px`;
      }
      if (rulerImageRefFixed.current) {
        let scrollX = window.scrollY || window.pageYOffset;
        rulerImageRefFixed.current.style.backgroundPositionX = `-${scrollX}px`;
      }
    };
    return window.addEventListener("scroll", handleScroll), () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  let backgroundImage = {
    backgroundSize: "cover",
    backgroundImage: 'url("./img/main.jpg")',
    backgroundAttachment: backgroudImageSet,
    backgroundPosition: "50% 0px"
  }, backgroundImage2 = {
    backgroundSize: "cover",
    backgroundImage: 'url("./img/science.jpg")',
    backgroundAttachment: backgroudImageSet,
    backgroundPosition: "50% 0px"
  }, backgroundImage3 = {
    backgroundSize: "cover",
    backgroundImage: 'url("./img/survey.jpg")',
    backgroundAttachment: backgroudImageSet,
    backgroundPosition: "50% 0px"
  }, backgroundImage4 = {
    backgroundSize: "cover",
    backgroundImage: 'url("./img/telescope.jpg")',
    backgroundAttachment: backgroudImageSet,
    backgroundPosition: "50% 0px"
  }, rulerImage = {
    backgroundSize: "cover",
    backgroundImage: 'url("./img/ruler.jpg")',
    backgroundRepeat: "none repeat-x",
    backgroundPosition: "50% 0px",
    width: "100%",
    height: "40px",
    zIndex: 200
  };
  return useEffect8(() => {
    window.innerWidth < 768 && setBackgroudImageSet("scroll");
  }, []), /* @__PURE__ */ jsxDEV25("div", { children: [
    /* @__PURE__ */ jsxDEV25("div", { style: backgroundImage, children: /* @__PURE__ */ jsxDEV25("div", { className: "w-full", style: { height: "100vh" }, children: /* @__PURE__ */ jsxDEV25("img", { src: "./img/title.png", style: { width: "max(1000px, 70%)", paddingTop: "120px", paddingLeft: "15%" }, alt: "7DT telescope" }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 118,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 117,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 116,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV25("div", { style: { backgroundColor: "#fff" }, children: /* @__PURE__ */ jsxDEV25("a", { href: "./about/intro", children: /* @__PURE__ */ jsxDEV25("div", { className: "main w-full", children: /* @__PURE__ */ jsxDEV25("div", { className: "w-full mx-auto", children: /* @__PURE__ */ jsxDEV25("p", { style: { maxWidth: "1440px" }, children: [
      /* @__PURE__ */ jsxDEV25("h2", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700" }, children: "Introduction" }, void 0, !1, {
        fileName: "app/routes/main.tsx",
        lineNumber: 128,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV25("img", { className: "inline-flex", src: "/img/NGC0253.gif", width: "40%" }, void 0, !1, {
        fileName: "app/routes/main.tsx",
        lineNumber: 131,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV25("h4", { style: { paddingTop: "20px" }, children: mainText1 }, void 0, !1, {
        fileName: "app/routes/main.tsx",
        lineNumber: 133,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/main.tsx",
      lineNumber: 127,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 126,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 125,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 124,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 123,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV25("div", { style: { backgroundColor: "#f9f9f9" }, children: /* @__PURE__ */ jsxDEV25("a", { href: "./science/overview", children: /* @__PURE__ */ jsxDEV25("div", { className: "main w-full main-style", children: /* @__PURE__ */ jsxDEV25(
      "div",
      {
        className: "w-full mx-auto",
        onMouseEnter: () => handleHover(1),
        onMouseLeave: () => handleHover(0),
        style: hovered === 1 ? backgroundImage2 : { backgroundColor: "#f9f9f9" },
        children: /* @__PURE__ */ jsxDEV25("p", { style: { maxWidth: "1440px" }, children: [
          /* @__PURE__ */ jsxDEV25("h2", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700" }, children: /* @__PURE__ */ jsxDEV25("span", { children: "7 Scientific Goals" }, void 0, !1, {
            fileName: "app/routes/main.tsx",
            lineNumber: 151,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/main.tsx",
            lineNumber: 150,
            columnNumber: 15
          }, this),
          hovered != 1 ? /* @__PURE__ */ jsxDEV25("img", { className: "inline-flex", src: "/img/science.jpg", style: { height: "350px", width: "600px" } }, void 0, !1, {
            fileName: "app/routes/main.tsx",
            lineNumber: 153,
            columnNumber: 29
          }, this) : "",
          /* @__PURE__ */ jsxDEV25("h4", { style: hovered === 1 ? { paddingTop: "400px" } : { paddingTop: "50px" }, children: mainText2 }, void 0, !1, {
            fileName: "app/routes/main.tsx",
            lineNumber: 154,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/main.tsx",
          lineNumber: 149,
          columnNumber: 13
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/main.tsx",
        lineNumber: 145,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 144,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 143,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 142,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV25("div", { style: { backgroundColor: "#fff" }, children: /* @__PURE__ */ jsxDEV25("a", { href: "./survey/overview", children: /* @__PURE__ */ jsxDEV25("div", { className: "main w-full main-style", children: /* @__PURE__ */ jsxDEV25(
      "div",
      {
        className: "w-full mx-auto",
        onMouseEnter: () => handleHover(2),
        onMouseLeave: () => handleHover(0),
        style: hovered === 2 ? backgroundImage3 : {},
        children: /* @__PURE__ */ jsxDEV25("p", { style: { maxWidth: "1440px" }, children: [
          /* @__PURE__ */ jsxDEV25("h2", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700" }, children: /* @__PURE__ */ jsxDEV25("span", { children: "7 Dimensional Sky Survey" }, void 0, !1, {
            fileName: "app/routes/main.tsx",
            lineNumber: 172,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/main.tsx",
            lineNumber: 171,
            columnNumber: 15
          }, this),
          hovered != 2 ? /* @__PURE__ */ jsxDEV25("img", { className: "inline-flex", src: "/img/survey.jpg", style: { height: "350px", width: "600px" } }, void 0, !1, {
            fileName: "app/routes/main.tsx",
            lineNumber: 174,
            columnNumber: 29
          }, this) : "",
          /* @__PURE__ */ jsxDEV25("h4", { style: hovered === 2 ? { paddingTop: "400px" } : { paddingTop: "50px" }, children: mainText3 }, void 0, !1, {
            fileName: "app/routes/main.tsx",
            lineNumber: 175,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/main.tsx",
          lineNumber: 170,
          columnNumber: 13
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/main.tsx",
        lineNumber: 166,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 165,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 164,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 163,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV25("div", { style: { backgroundColor: "#f9f9f9" }, children: /* @__PURE__ */ jsxDEV25("a", { href: "./telescope/overview", children: /* @__PURE__ */ jsxDEV25("div", { className: "main w-full main-style", children: /* @__PURE__ */ jsxDEV25(
      "div",
      {
        className: "w-full mx-auto",
        onMouseEnter: () => handleHover(3),
        onMouseLeave: () => handleHover(0),
        style: hovered === 3 ? backgroundImage4 : { backgroundColor: "#f9f9f9" },
        children: /* @__PURE__ */ jsxDEV25("p", { style: { maxWidth: "1440px" }, children: [
          /* @__PURE__ */ jsxDEV25("h2", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700" }, children: /* @__PURE__ */ jsxDEV25("span", { children: "7 Dimensional Telescope" }, void 0, !1, {
            fileName: "app/routes/main.tsx",
            lineNumber: 193,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/main.tsx",
            lineNumber: 192,
            columnNumber: 15
          }, this),
          hovered != 3 ? /* @__PURE__ */ jsxDEV25("img", { className: "inline-flex", src: "/img/telescope.jpg", style: { height: "350px", width: "600px" } }, void 0, !1, {
            fileName: "app/routes/main.tsx",
            lineNumber: 195,
            columnNumber: 29
          }, this) : "",
          /* @__PURE__ */ jsxDEV25("h4", { style: hovered === 3 ? { paddingTop: "400px" } : { paddingTop: "50px" }, children: mainText4 }, void 0, !1, {
            fileName: "app/routes/main.tsx",
            lineNumber: 196,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/main.tsx",
          lineNumber: 191,
          columnNumber: 13
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/main.tsx",
        lineNumber: 187,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 186,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 185,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 184,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV25("div", { style: { backgroundColor: "#fff", paddingTop: "100px" }, children: /* @__PURE__ */ jsxDEV25("div", { className: "mx-auto w-full", style: { maxWidth: "1440px" }, children: [
      /* @__PURE__ */ jsxDEV25("div", { className: "justify-center mb-5", style: { maxWidth: "1200px", margin: "0 auto", color: "--pickled-bluewood-900" }, children: /* @__PURE__ */ jsxDEV25("p", { children: /* @__PURE__ */ jsxDEV25("h2", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700" }, children: "Meet Our Latest News" }, void 0, !1, {
        fileName: "app/routes/main.tsx",
        lineNumber: 209,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/main.tsx",
        lineNumber: 208,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/main.tsx",
        lineNumber: 207,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV25("div", { className: "flex flex-wrap items-center justify-center", style: { maxWidth: "1200px", margin: "0 auto", marginBottom: "5rem", textAlign: "center" }, children: news_default.news.map((news, index) => {
        if (index = index + 1, index <= 3)
          return /* @__PURE__ */ jsxDEV25("div", { className: `card card-${index}`, children: [
            /* @__PURE__ */ jsxDEV25("img", { src: `./img/news/${news.imgName}` }, void 0, !1, {
              fileName: "app/routes/main.tsx",
              lineNumber: 220,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV25("a", { href: news.webpage, target: "_blank", children: /* @__PURE__ */ jsxDEV25("div", { className: "card-img-hovered", style: { backgroundImage: `var(--card-img-hovered-overlay), url(./img/news/${news.imgName})` } }, void 0, !1, {
              fileName: "app/routes/main.tsx",
              lineNumber: 222,
              columnNumber: 21
            }, this) }, void 0, !1, {
              fileName: "app/routes/main.tsx",
              lineNumber: 221,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV25("div", { className: "card-info", children: [
              /* @__PURE__ */ jsxDEV25("div", { className: "card-about", children: [
                /* @__PURE__ */ jsxDEV25("a", { className: `card-tag ${news.type === "meeting" ? "tag-news" : news.type === "publication" ? "tag-publication" : news.type === "press" ? "tag-press" : null}`, children: news.type }, void 0, !1, {
                  fileName: "app/routes/main.tsx",
                  lineNumber: 226,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV25("div", { className: "card-time", children: news.date }, void 0, !1, {
                  fileName: "app/routes/main.tsx",
                  lineNumber: 227,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/main.tsx",
                lineNumber: 225,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV25("h1", { className: "card-title", children: news.title }, void 0, !1, {
                fileName: "app/routes/main.tsx",
                lineNumber: 229,
                columnNumber: 21
              }, this),
              news.type === "meeting" ? /* @__PURE__ */ jsxDEV25("div", { className: "card-creator", children: [
                "in ",
                /* @__PURE__ */ jsxDEV25("a", { href: "", children: news.place }, void 0, !1, {
                  fileName: "app/routes/main.tsx",
                  lineNumber: 231,
                  columnNumber: 56
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/main.tsx",
                lineNumber: 231,
                columnNumber: 23
              }, this) : news.type === "publication" ? /* @__PURE__ */ jsxDEV25("div", { className: "card-creator", children: [
                "by ",
                /* @__PURE__ */ jsxDEV25("a", { href: "", children: news.shortAuthor }, void 0, !1, {
                  fileName: "app/routes/main.tsx",
                  lineNumber: 233,
                  columnNumber: 56
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/main.tsx",
                lineNumber: 233,
                columnNumber: 23
              }, this) : /* @__PURE__ */ jsxDEV25("div", { className: "card-creator", children: [
                "by ",
                /* @__PURE__ */ jsxDEV25("a", { href: "", children: news.source }, void 0, !1, {
                  fileName: "app/routes/main.tsx",
                  lineNumber: 234,
                  columnNumber: 56
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/main.tsx",
                lineNumber: 234,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/main.tsx",
              lineNumber: 224,
              columnNumber: 19
            }, this)
          ] }, `card-${index}`, !0, {
            fileName: "app/routes/main.tsx",
            lineNumber: 219,
            columnNumber: 17
          }, this);
      }) }, void 0, !1, {
        fileName: "app/routes/main.tsx",
        lineNumber: 214,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/main.tsx",
      lineNumber: 206,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 205,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV25("div", { style: { backgroundColor: "#fff" }, children: /* @__PURE__ */ jsxDEV25("div", { className: "mx-auto w-full", style: { maxWidth: "1200px" }, children: [
      /* @__PURE__ */ jsxDEV25("div", { className: "flex flex-wrap justify-between", children: [
        /* @__PURE__ */ jsxDEV25("a", { href: "https://www.nrf.re.kr/eng/index", target: "_blank", children: /* @__PURE__ */ jsxDEV25("img", { src: "./img/institutes/nrf.jpg", style: { height: "100px", padding: "20px" } }, void 0, !1, {
          fileName: "app/routes/main.tsx",
          lineNumber: 245,
          columnNumber: 71
        }, this) }, void 0, !1, {
          fileName: "app/routes/main.tsx",
          lineNumber: 245,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV25("a", { href: "https://gwuniverse.snu.ac.kr/", target: "_blank", children: /* @__PURE__ */ jsxDEV25("img", { src: "./img/institutes/gwuniv.png", style: { height: "100px", padding: "20px" } }, void 0, !1, {
          fileName: "app/routes/main.tsx",
          lineNumber: 246,
          columnNumber: 69
        }, this) }, void 0, !1, {
          fileName: "app/routes/main.tsx",
          lineNumber: 246,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV25("a", { href: "https://en.snu.ac.kr/", target: "_blank", children: /* @__PURE__ */ jsxDEV25("img", { src: "./img/institutes/snu.jpeg", style: { height: "100px", padding: "20px" } }, void 0, !1, {
          fileName: "app/routes/main.tsx",
          lineNumber: 247,
          columnNumber: 61
        }, this) }, void 0, !1, {
          fileName: "app/routes/main.tsx",
          lineNumber: 247,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/main.tsx",
        lineNumber: 244,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV25("div", { className: "flex flex-wrap justify-between", children: [
        /* @__PURE__ */ jsxDEV25("a", { href: "https://www.kasi.re.kr/eng/index", target: "_blank", children: /* @__PURE__ */ jsxDEV25("img", { src: "./img/institutes/kasi.gif", style: { height: "100px", padding: "20px" } }, void 0, !1, {
          fileName: "app/routes/main.tsx",
          lineNumber: 250,
          columnNumber: 72
        }, this) }, void 0, !1, {
          fileName: "app/routes/main.tsx",
          lineNumber: 250,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV25("a", { href: "https://www.ewha.ac.kr/ewhaen/index.do", target: "_blank", children: /* @__PURE__ */ jsxDEV25("img", { src: "./img/institutes/ewha.png", style: { height: "100px", padding: "20px" } }, void 0, !1, {
          fileName: "app/routes/main.tsx",
          lineNumber: 251,
          columnNumber: 78
        }, this) }, void 0, !1, {
          fileName: "app/routes/main.tsx",
          lineNumber: 251,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV25("a", { href: "https://www.postech.ac.kr/eng/", target: "_blank", children: /* @__PURE__ */ jsxDEV25("img", { src: "./img/institutes/postech.png", style: { height: "100px", padding: "20px" } }, void 0, !1, {
          fileName: "app/routes/main.tsx",
          lineNumber: 252,
          columnNumber: 70
        }, this) }, void 0, !1, {
          fileName: "app/routes/main.tsx",
          lineNumber: 252,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/main.tsx",
        lineNumber: 249,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/main.tsx",
      lineNumber: 243,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 242,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV25("div", { ref: rulerImageRef, style: { ...rulerImage, position: "fixed", bottom: "0" } }, void 0, !1, {
      fileName: "app/routes/main.tsx",
      lineNumber: 256,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/main.tsx",
    lineNumber: 115,
    columnNumber: 5
  }, this);
}, main_default = MainPage;

// app/routes/_index.tsx
import { jsxDEV as jsxDEV26 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "7-dimensional telescope" },
  { name: "description", content: "7-dimensional telescope" }
], Index20 = () => /* @__PURE__ */ jsxDEV26("div", { style: { background: "#fff" }, children: [
  /* @__PURE__ */ jsxDEV26(navigate_default, { manu: "manuHome" }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 18,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV26(main_default, {}, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 19,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV26(footer_default, {}, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 20,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/_index.tsx",
  lineNumber: 17,
  columnNumber: 5
}, this), index_default = Index20;

// app/routes/links.tsx
var links_exports = {};
__export(links_exports, {
  default: () => links_default
});
import { jsxDEV as jsxDEV27 } from "react/jsx-dev-runtime";
var Index21 = () => /* @__PURE__ */ jsxDEV27("div", { style: { background: "#fff" }, children: [
  /* @__PURE__ */ jsxDEV27(navigate_default, { manu: "manuLinks", fixed: !0 }, void 0, !1, {
    fileName: "app/routes/links.tsx",
    lineNumber: 9,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV27("div", { className: "mx-auto w-full main-container", style: { paddingTop: "300px" }, children: /* @__PURE__ */ jsxDEV27("div", { className: "p-10 max-w-screen-lg mx-auto", children: /* @__PURE__ */ jsxDEV27("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: /* @__PURE__ */ jsxDEV27("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "To be determined." }, void 0, !1, {
    fileName: "app/routes/links.tsx",
    lineNumber: 14,
    columnNumber: 13
  }, this) }, void 0, !1, {
    fileName: "app/routes/links.tsx",
    lineNumber: 13,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/links.tsx",
    lineNumber: 12,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/links.tsx",
    lineNumber: 11,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV27(footer_default, {}, void 0, !1, {
    fileName: "app/routes/links.tsx",
    lineNumber: 20,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/links.tsx",
  lineNumber: 8,
  columnNumber: 5
}, this), links_default = Index21;

// app/routes/news.tsx
var news_exports = {};
__export(news_exports, {
  default: () => news_default2
});
import { useState as useState8 } from "react";
import { Pagination as Pagination4 } from "flowbite-react";
import { jsxDEV as jsxDEV28 } from "react/jsx-dev-runtime";
var Index22 = () => {
  let backgroundImage = {
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    backgroundImage: 'url("./img/news.png")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px"
  }, [currentPage, setCurrentPage] = useState8(1), [selectedTypes, setSelectedTypes] = useState8(["press", "publication", "meeting", "update"]), newsPerPage = 3, toggleType = (type) => {
    selectedTypes.includes(type) ? setSelectedTypes(selectedTypes.filter((t) => t !== type)) : setSelectedTypes([...selectedTypes, type]);
  }, filteredNews = selectedTypes.length > 0 ? news_default.news.filter((item) => selectedTypes.includes(item.type)) : news_default.news, totalPages = Math.ceil(filteredNews.length / newsPerPage), indexOfLastNews = currentPage * newsPerPage, indexOfFirstNews = indexOfLastNews - newsPerPage, currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews), onPageChange = (page) => setCurrentPage(page);
  return /* @__PURE__ */ jsxDEV28("div", { style: { background: "#fff" }, children: [
    /* @__PURE__ */ jsxDEV28(navigate_default, { manu: "manuNews", fixed: !0 }, void 0, !1, {
      fileName: "app/routes/news.tsx",
      lineNumber: 43,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV28("div", { className: "mx-auto w-full main-container", style: { paddingTop: "150px" }, children: /* @__PURE__ */ jsxDEV28("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
      /* @__PURE__ */ jsxDEV28("div", { className: "justify-between mb-5", style: { maxWidth: "1200px", margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxDEV28("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: { textAlign: "center" }, children: "A Bunch of Intriguing Updates" }, void 0, !1, {
          fileName: "app/routes/news.tsx",
          lineNumber: 48,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV28("h3", { className: "text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: { textAlign: "center", fontWeight: "700", color: "var(--pickled-bluewood-900)" }, children: [
          "Latest ",
          /* @__PURE__ */ jsxDEV28("span", { style: { color: "var(--pickled-bluewood-600)" }, children: "News" }, void 0, !1, {
            fileName: "app/routes/news.tsx",
            lineNumber: 52,
            columnNumber: 22
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/news.tsx",
          lineNumber: 51,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/news.tsx",
        lineNumber: 47,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV28("div", { className: "flex justify-center mr-7 ml-7", children: /* @__PURE__ */ jsxDEV28("ul", { className: "items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex ", children: ["press", "publication", "meeting", "update"].map((type, index) => /* @__PURE__ */ jsxDEV28("li", { className: "w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600", children: /* @__PURE__ */ jsxDEV28("div", { className: "flex items-center ps-3", children: [
        /* @__PURE__ */ jsxDEV28("input", { id: `${type}-checkbox-list`, type: "checkbox", value: "1", className: `w-4 h-4 text-${type}-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500`, checked: selectedTypes.includes(type), onChange: () => toggleType(type) }, void 0, !1, {
          fileName: "app/routes/news.tsx",
          lineNumber: 60,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV28("label", { htmlFor: `${type}-checkbox-list`, className: "w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300", style: { textTransform: "uppercase" }, children: type }, void 0, !1, {
          fileName: "app/routes/news.tsx",
          lineNumber: 61,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/news.tsx",
        lineNumber: 59,
        columnNumber: 17
      }, this) }, index, !1, {
        fileName: "app/routes/news.tsx",
        lineNumber: 58,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "app/routes/news.tsx",
        lineNumber: 56,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/news.tsx",
        lineNumber: 55,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV28("div", { className: "flex flex-wrap items-center justify-center", style: { maxWidth: "1200px", margin: "0 auto", marginBottom: "5rem", textAlign: "center" }, children: [
        currentNews.map((news, index) => (index = index + 1, /* @__PURE__ */ jsxDEV28("div", { className: `news news-${index}`, children: /* @__PURE__ */ jsxDEV28("div", { className: "news-content", children: [
          /* @__PURE__ */ jsxDEV28("div", { className: "news-img-container", children: [
            /* @__PURE__ */ jsxDEV28("img", { src: `./img/news/${news.imgName}`, alt: "News Image" }, void 0, !1, {
              fileName: "app/routes/news.tsx",
              lineNumber: 75,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV28("a", { href: "", className: "news-img-hovered", style: { backgroundImage: `var(--news-img-hovered-overlay), url(./img/news/${news.imgName})` } }, void 0, !1, {
              fileName: "app/routes/news.tsx",
              lineNumber: 76,
              columnNumber: 23
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/news.tsx",
            lineNumber: 74,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV28("div", { className: "news-info", children: [
            /* @__PURE__ */ jsxDEV28("div", { className: "news-about", children: [
              /* @__PURE__ */ jsxDEV28("a", { className: `news-tag ${news.type === "meeting" ? "tag-news" : news.type === "publication" ? "tag-publication" : news.type === "press" ? "tag-press" : null}`, children: news.type }, void 0, !1, {
                fileName: "app/routes/news.tsx",
                lineNumber: 80,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV28("div", { className: "news-time", children: news.date }, void 0, !1, {
                fileName: "app/routes/news.tsx",
                lineNumber: 81,
                columnNumber: 25
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/news.tsx",
              lineNumber: 79,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV28("h1", { className: "news-title", children: news.title }, void 0, !1, {
              fileName: "app/routes/news.tsx",
              lineNumber: 83,
              columnNumber: 23
            }, this),
            news.type === "meeting" ? /* @__PURE__ */ jsxDEV28("div", { className: "news-creator", children: [
              "in ",
              /* @__PURE__ */ jsxDEV28("a", { href: "", children: news.place }, void 0, !1, {
                fileName: "app/routes/news.tsx",
                lineNumber: 85,
                columnNumber: 58
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/news.tsx",
              lineNumber: 85,
              columnNumber: 25
            }, this) : news.type === "publication" ? /* @__PURE__ */ jsxDEV28("div", { className: "news-creator", children: [
              "by ",
              /* @__PURE__ */ jsxDEV28("a", { href: "", children: news.shortAuthor }, void 0, !1, {
                fileName: "app/routes/news.tsx",
                lineNumber: 87,
                columnNumber: 58
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/news.tsx",
              lineNumber: 87,
              columnNumber: 25
            }, this) : /* @__PURE__ */ jsxDEV28("div", { className: "news-creator", children: [
              "by ",
              /* @__PURE__ */ jsxDEV28("a", { href: "", children: news.source }, void 0, !1, {
                fileName: "app/routes/news.tsx",
                lineNumber: 88,
                columnNumber: 58
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/news.tsx",
              lineNumber: 88,
              columnNumber: 25
            }, this),
            news.webpage ? /* @__PURE__ */ jsxDEV28("a", { href: news.webpage, className: "details-button", target: "_blank", children: "Details \u25B6" }, void 0, !1, {
              fileName: "app/routes/news.tsx",
              lineNumber: 90,
              columnNumber: 39
            }, this) : null
          ] }, void 0, !0, {
            fileName: "app/routes/news.tsx",
            lineNumber: 78,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/news.tsx",
          lineNumber: 73,
          columnNumber: 19
        }, this) }, `news-${index}`, !1, {
          fileName: "app/routes/news.tsx",
          lineNumber: 72,
          columnNumber: 17
        }, this))),
        /* @__PURE__ */ jsxDEV28("div", { className: "flex justify-center mt-4", children: /* @__PURE__ */ jsxDEV28(Pagination4, { currentPage, totalPages, onPageChange }, void 0, !1, {
          fileName: "app/routes/news.tsx",
          lineNumber: 96,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/routes/news.tsx",
          lineNumber: 95,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/news.tsx",
        lineNumber: 68,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/news.tsx",
      lineNumber: 46,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/news.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV28(footer_default, {}, void 0, !1, {
      fileName: "app/routes/news.tsx",
      lineNumber: 101,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/news.tsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
}, news_default2 = Index22;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-MCGG2PRW.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-SYCA6SCI.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-IFJMOQTG.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-654ZYIML.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-MTQMKAL5.js", imports: ["/build/_shared/chunk-JBQD3T7G.js", "/build/_shared/chunk-FYOAFX4F.js", "/build/_shared/chunk-G7TFR7IJ.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/about.funding": { id: "routes/about.funding", parentId: "root", path: "about/funding", index: void 0, caseSensitive: void 0, module: "/build/routes/about.funding-TRDHTZDK.js", imports: ["/build/_shared/chunk-FYOAFX4F.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/about.intro": { id: "routes/about.intro", parentId: "root", path: "about/intro", index: void 0, caseSensitive: void 0, module: "/build/routes/about.intro-SHRJC36C.js", imports: ["/build/_shared/chunk-FYOAFX4F.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/about.team": { id: "routes/about.team", parentId: "root", path: "about/team", index: void 0, caseSensitive: void 0, module: "/build/routes/about.team-LGCS2JUW.js", imports: ["/build/_shared/chunk-MHLBSK2Z.js", "/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/data.data": { id: "routes/data.data", parentId: "root", path: "data/data", index: void 0, caseSensitive: void 0, module: "/build/routes/data.data-JOIW7ZWY.js", imports: ["/build/_shared/chunk-QKLUKKVU.js", "/build/_shared/chunk-Z2BYYI2L.js", "/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/data.overview": { id: "routes/data.overview", parentId: "root", path: "data/overview", index: void 0, caseSensitive: void 0, module: "/build/routes/data.overview-EWFDQOZ7.js", imports: ["/build/_shared/chunk-FYOAFX4F.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/data.software": { id: "routes/data.software", parentId: "root", path: "data/software", index: void 0, caseSensitive: void 0, module: "/build/routes/data.software-SFH35YOO.js", imports: ["/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/footer": { id: "routes/footer", parentId: "root", path: "footer", index: void 0, caseSensitive: void 0, module: "/build/routes/footer-MIS6JXLK.js", imports: ["/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/gallery": { id: "routes/gallery", parentId: "root", path: "gallery", index: void 0, caseSensitive: void 0, module: "/build/routes/gallery-4F65DZTH.js", imports: ["/build/_shared/chunk-Z2BYYI2L.js", "/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/links": { id: "routes/links", parentId: "root", path: "links", index: void 0, caseSensitive: void 0, module: "/build/routes/links-AAX5TRPK.js", imports: ["/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/main": { id: "routes/main", parentId: "root", path: "main", index: void 0, caseSensitive: void 0, module: "/build/routes/main-DHMV5NYP.js", imports: ["/build/_shared/chunk-JBQD3T7G.js", "/build/_shared/chunk-FYOAFX4F.js", "/build/_shared/chunk-G7TFR7IJ.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/navigate": { id: "routes/navigate", parentId: "root", path: "navigate", index: void 0, caseSensitive: void 0, module: "/build/routes/navigate-RRK2TAJQ.js", imports: ["/build/_shared/chunk-3GTQRJLG.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/news": { id: "routes/news", parentId: "root", path: "news", index: void 0, caseSensitive: void 0, module: "/build/routes/news-DQ7QHLMM.js", imports: ["/build/_shared/chunk-Z2BYYI2L.js", "/build/_shared/chunk-G7TFR7IJ.js", "/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/plot": { id: "routes/plot", parentId: "root", path: "plot", index: void 0, caseSensitive: void 0, module: "/build/routes/plot-ANXUG3QZ.js", imports: ["/build/_shared/chunk-QKLUKKVU.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/publication.list": { id: "routes/publication.list", parentId: "root", path: "publication/list", index: void 0, caseSensitive: void 0, module: "/build/routes/publication.list-5R5FSABS.js", imports: ["/build/_shared/chunk-Z2BYYI2L.js", "/build/_shared/chunk-G7TFR7IJ.js", "/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/publication.policy": { id: "routes/publication.policy", parentId: "root", path: "publication/policy", index: void 0, caseSensitive: void 0, module: "/build/routes/publication.policy-LNMDK627.js", imports: ["/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/science.overview": { id: "routes/science.overview", parentId: "root", path: "science/overview", index: void 0, caseSensitive: void 0, module: "/build/routes/science.overview-ECG3BR7O.js", imports: ["/build/_shared/chunk-FYOAFX4F.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/science.sci": { id: "routes/science.sci", parentId: "root", path: "science/sci", index: void 0, caseSensitive: void 0, module: "/build/routes/science.sci-HTLCGIGB.js", imports: ["/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.design": { id: "routes/survey.design", parentId: "root", path: "survey/design", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.design-J2CFJTIZ.js", imports: ["/build/_shared/chunk-FYOAFX4F.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.overview": { id: "routes/survey.overview", parentId: "root", path: "survey/overview", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.overview-PUOE5JNV.js", imports: ["/build/_shared/chunk-FYOAFX4F.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/survey.status": { id: "routes/survey.status", parentId: "root", path: "survey/status", index: void 0, caseSensitive: void 0, module: "/build/routes/survey.status-25ZOGSSJ.js", imports: ["/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/telescope.computer": { id: "routes/telescope.computer", parentId: "root", path: "telescope/computer", index: void 0, caseSensitive: void 0, module: "/build/routes/telescope.computer-CC3M4AN3.js", imports: ["/build/_shared/chunk-FYOAFX4F.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/telescope.instrument": { id: "routes/telescope.instrument", parentId: "root", path: "telescope/instrument", index: void 0, caseSensitive: void 0, module: "/build/routes/telescope.instrument-VQFYDFXK.js", imports: ["/build/_shared/chunk-FYOAFX4F.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/telescope.location": { id: "routes/telescope.location", parentId: "root", path: "telescope/location", index: void 0, caseSensitive: void 0, module: "/build/routes/telescope.location-LPGDIBJK.js", imports: ["/build/_shared/chunk-MHLBSK2Z.js", "/build/_shared/chunk-FYOAFX4F.js", "/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/telescope.mode": { id: "routes/telescope.mode", parentId: "root", path: "telescope/mode", index: void 0, caseSensitive: void 0, module: "/build/routes/telescope.mode-FP5CULDG.js", imports: ["/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/telescope.overview": { id: "routes/telescope.overview", parentId: "root", path: "telescope/overview", index: void 0, caseSensitive: void 0, module: "/build/routes/telescope.overview-XT5RR3CK.js", imports: ["/build/_shared/chunk-FYOAFX4F.js", "/build/_shared/chunk-3GTQRJLG.js", "/build/_shared/chunk-ES5GI7YV.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "d7bb51d0", hmr: { runtime: "/build/_shared/chunk-IFJMOQTG.js", timestamp: 1714626927166 }, url: "/build/manifest-D7BB51D0.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
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
  "routes/about.funding": {
    id: "routes/about.funding",
    parentId: "root",
    path: "about/funding",
    index: void 0,
    caseSensitive: void 0,
    module: about_funding_exports
  },
  "routes/data.overview": {
    id: "routes/data.overview",
    parentId: "root",
    path: "data/overview",
    index: void 0,
    caseSensitive: void 0,
    module: data_overview_exports
  },
  "routes/data.software": {
    id: "routes/data.software",
    parentId: "root",
    path: "data/software",
    index: void 0,
    caseSensitive: void 0,
    module: data_software_exports
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
  "routes/about.team": {
    id: "routes/about.team",
    parentId: "root",
    path: "about/team",
    index: void 0,
    caseSensitive: void 0,
    module: about_team_exports
  },
  "routes/data.data": {
    id: "routes/data.data",
    parentId: "root",
    path: "data/data",
    index: void 0,
    caseSensitive: void 0,
    module: data_data_exports
  },
  "routes/navigate": {
    id: "routes/navigate",
    parentId: "root",
    path: "navigate",
    index: void 0,
    caseSensitive: void 0,
    module: navigate_exports
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
  "routes/footer": {
    id: "routes/footer",
    parentId: "root",
    path: "footer",
    index: void 0,
    caseSensitive: void 0,
    module: footer_exports
  },
  "routes/links": {
    id: "routes/links",
    parentId: "root",
    path: "links",
    index: void 0,
    caseSensitive: void 0,
    module: links_exports
  },
  "routes/main": {
    id: "routes/main",
    parentId: "root",
    path: "main",
    index: void 0,
    caseSensitive: void 0,
    module: main_exports
  },
  "routes/news": {
    id: "routes/news",
    parentId: "root",
    path: "news",
    index: void 0,
    caseSensitive: void 0,
    module: news_exports
  },
  "routes/plot": {
    id: "routes/plot",
    parentId: "root",
    path: "plot",
    index: void 0,
    caseSensitive: void 0,
    module: plot_exports
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
//# sourceMappingURL=index.js.map
