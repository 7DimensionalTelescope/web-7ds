import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  createHotContext
} from "/build/_shared/chunk-IFJMOQTG.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/navigate.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/navigate.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/navigate.tsx"
  );
  import.meta.hot.lastModified = "1712985825572.5776";
}
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
  if (valid) {
    return `font-bold border-transparent sm:mx-6 transition duration-300 ease-in-out transform border-default-500 text-orange`;
  } else {
    return `font-bold border-transparent sm:mx-6 transition duration-300 ease-in-out transform hover:border-default-500 hover:text-white`;
  }
}
function NavBar(props) {
  _s();
  const [onMouse, setOnMouse] = (0, import_react.useState)(false);
  const [isTop, setIsTop] = (0, import_react.useState)(!props.fixed);
  const [activeMenu, setActiveMenu] = (0, import_react.useState)(null);
  const [showMenu, setShowMenu] = (0, import_react.useState)(false);
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const isTop2 = scrollPosition === 0;
    setIsTop(isTop2 && !props.fixed);
  };
  const handleManu = (manu, onMouse2) => {
    setActiveMenu(manu);
    setOnMouse(onMouse2);
  };
  (0, import_react.useEffect)(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  (0, import_react.useEffect)(() => {
    setActiveMenu(props.manu);
  }, []);
  const navbarClass = "justify-center mx-auto shadow fixed w-full top-0 z-1000 text-white";
  const navbarStyle = {
    backgroundColor: `rgba(7, 28, 48, ${isTop ? 0.5 : 1})`,
    margin: "0 auto"
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { className: navbarClass, style: navbarStyle, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container flex mx-auto capitalize", style: {
    maxWidth: "1440px",
    color: "#fff",
    margin: "0 auto"
  }, onMouseLeave: () => handleManu(props.manu, false), children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowMenu(!showMenu), "data-collapse-toggle": "navbar-dropdown", type: "button", className: "inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600", "aria-controls": "navbar-dropdown", "aria-expanded": "false", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "sr-only", children: "Open main menu" }, void 0, false, {
        fileName: "app/routes/navigate.tsx",
        lineNumber: 80,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-10 h-10", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 17 14", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M1 1h15M1 7h15M1 13h15" }, void 0, false, {
        fileName: "app/routes/navigate.tsx",
        lineNumber: 82,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/routes/navigate.tsx",
        lineNumber: 81,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { className: "logo-container", href: "/", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/logo_name.png", alt: "Logo", className: " h-10" }, void 0, false, {
        fileName: "app/routes/navigate.tsx",
        lineNumber: 85,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/navigate.tsx",
        lineNumber: 84,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/navigate.tsx",
      lineNumber: 79,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/navigate.tsx",
      lineNumber: 78,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `w-full md:block md:w-auto ${showMenu ? "block pt-5 justify-start" : "hidden"}`, id: "navbar-dropdown", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "flex flex-col font-medium py-2 md:p-0 mt-0 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 mx-auto", style: {
        margin: "0 auto"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: `$(showMenu) ? pb-2 : ''`, style: {
          textAlign: showMenu ? "left" : "center"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { onMouseEnter: () => handleManu("manuHome", true), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { id: "home", "data-dropdown-toggle": "manuHome", className: menuClass(activeMenu === "manuHome"), style: {
          marginRight: "1rem",
          marginLeft: "1rem"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/", children: "Home" }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 102,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 98,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 97,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 94,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: `$(showMenu) ? pb-2 : ''`, style: {
          textAlign: showMenu ? "left" : "center"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { onMouseEnter: () => handleManu("manuAbout", true), children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { id: "team", "data-dropdown-toggle": "manuAbout", className: menuClass(activeMenu === "manuAbout"), style: {
            marginRight: "1.5rem",
            marginLeft: "1.5rem"
          }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/about/intro", children: "About" }, void 0, false, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 114,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 110,
            columnNumber: 17
          }, this),
          onMouse && !showMenu ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: buttonStyle(activeMenu === "manuAbout"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/about/intro", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: "What is 7DS" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 119,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 118,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/about/team", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: "Team" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 124,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 123,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/about/funding", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: [
              "Funding",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 131,
                columnNumber: 31
              }, this),
              "Sources"
            ] }, void 0, true, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 129,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 128,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 117,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 116,
            columnNumber: 41
          }, this) : showMenu ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/about/intro", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- What is 7DS" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 136,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 135,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/about/team", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Team" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 141,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 140,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/about/funding", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Funding Sources" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 146,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 145,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 134,
            columnNumber: 37
          }, this) : null
        ] }, void 0, true, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 109,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 106,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: `$(showMenu) ? pb-2 : ''`, style: {
          textAlign: showMenu ? "left" : "center"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { onMouseEnter: () => handleManu("manuScience", true), children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { id: "home", "data-dropdown-toggle": "manuScience", className: menuClass(activeMenu === "manuScience"), style: {
            marginRight: "2rem",
            marginLeft: "2rem"
          }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/overview", children: "Science" }, void 0, false, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 161,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 157,
            columnNumber: 17
          }, this),
          onMouse && !showMenu ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: buttonStyle(activeMenu === "manuScience"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/overview", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: "Overview" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 166,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 165,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/sci", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: [
              "Multi-messenger",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 173,
                columnNumber: 39
              }, this),
              "Astronomy"
            ] }, void 0, true, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 171,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 170,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/sci", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: [
              "Galaxy Formation",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 178,
                columnNumber: 40
              }, this),
              "& Evolution"
            ] }, void 0, true, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 176,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 175,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/sci", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: "Cosmology" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 181,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 180,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/sci", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: [
              "Active Galactic",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 188,
                columnNumber: 39
              }, this),
              "Nuclei"
            ] }, void 0, true, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 186,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 185,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/sci", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: "Galactic Science" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 191,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 190,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/sci", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: [
              "Solar System",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 198,
                columnNumber: 36
              }, this),
              "Objects"
            ] }, void 0, true, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 196,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 195,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/sci", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: "Transients" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 201,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 200,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 164,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 163,
            columnNumber: 41
          }, this) : showMenu ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/sci", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Multi-messenger Astronomy" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 208,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 207,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/sci", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Galaxy Formation & Evolution" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 213,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 212,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/sci", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Cosmology" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 218,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 217,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/sci", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Active Galactic Nuclei" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 223,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 222,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/sci", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Galactic Science" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 228,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 227,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/sci", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Solar System Objects" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 233,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 232,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/science/sci", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Transients" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 238,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 237,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 206,
            columnNumber: 37
          }, this) : null
        ] }, void 0, true, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 156,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 153,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: `$(showMenu) ? pb-2 : ''`, style: {
          textAlign: showMenu ? "left" : "center"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { onMouseEnter: () => handleManu("manu7ds", true), children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { id: "7ds", "data-dropdown-toggle": "manu7ds", className: menuClass(activeMenu === "manu7ds"), style: {
            marginRight: "1rem",
            marginLeft: "1rem"
          }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/survey/overview", children: "Survey" }, void 0, false, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 254,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 250,
            columnNumber: 17
          }, this),
          onMouse && !showMenu ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: buttonStyle(activeMenu === "manu7ds"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/survey/overview", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: "Overview" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 259,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 258,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/survey/design", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: "Design" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 264,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 263,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/survey/status", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: "Status" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 269,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 268,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 257,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 256,
            columnNumber: 41
          }, this) : showMenu ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/survey/overview", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Overview" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 276,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 275,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/survey/survey", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Design" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 281,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 280,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/survey/status", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Status" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 286,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 285,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 274,
            columnNumber: 37
          }, this) : null
        ] }, void 0, true, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 249,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 246,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: `$(showMenu) ? pb-2 : ''`, style: {
          textAlign: showMenu ? "left" : "center"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { onMouseEnter: () => handleManu("manu7dt", true), children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { id: "7dt", "data-dropdown-toggle": "manu7dt", className: menuClass(activeMenu === "manu7dt"), style: {
            marginRight: "1rem",
            marginLeft: "1rem"
          }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/telescope/overview", children: "Facilities" }, void 0, false, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 301,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 297,
            columnNumber: 17
          }, this),
          onMouse && !showMenu ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: buttonStyle(activeMenu === "manu7dt"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "text-xs", style: {
            margin: "0 auto"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/telescope/overview", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: "Overview" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 308,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 307,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/telescope/location", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: "Location" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 313,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 312,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/telescope/instrument", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: "Instrument" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 318,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 317,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/telescope/computer", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: [
              "Computational",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 325,
                columnNumber: 37
              }, this),
              "Resources"
            ] }, void 0, true, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 323,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 322,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/telescope/mode", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: [
              "Observing",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                fileName: "app/routes/navigate.tsx",
                lineNumber: 330,
                columnNumber: 33
              }, this),
              "Mode"
            ] }, void 0, true, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 328,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 327,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 304,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 303,
            columnNumber: 41
          }, this) : showMenu ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "text-sm", style: {
            margin: "0 auto"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/telescope/overview", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Overview" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 337,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 336,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/telescope/location", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Location" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 342,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 341,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/telescope/instrument", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Instrument" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 347,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 346,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/telescope/computer", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Computational Resources" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 352,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 351,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/telescope/mode", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Observing Mode" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 357,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 356,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 333,
            columnNumber: 37
          }, this) : null
        ] }, void 0, true, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 296,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 293,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: `$(showMenu) ? pb-2 : ''`, style: {
          textAlign: showMenu ? "left" : "center"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { onMouseEnter: () => handleManu("manuData", true), children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { id: "data", "data-dropdown-toggle": "manuData", className: menuClass(activeMenu === "manuData"), style: {
            marginRight: "1rem",
            marginLeft: "1rem"
          }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/data/overview", children: "Data" }, void 0, false, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 372,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 368,
            columnNumber: 17
          }, this),
          onMouse && !showMenu ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: buttonStyle(activeMenu === "manuData"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/data/overview", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: "Overview" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 377,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 376,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/data/data", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: "Data" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 382,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 381,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/data/software", className: "block py-2 hover:bg-oran-100", style: {
              padding: "0.5rem"
            }, children: "Software" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 387,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 386,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 375,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 374,
            columnNumber: 41
          }, this) : showMenu ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/data/overview", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Overview" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 394,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 393,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/data/data", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Data" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 399,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 398,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/data/software", className: "block py-0 ml-5 hover:text-bluewood-600", style: {
              padding: "0.5rem"
            }, children: "- Software" }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 404,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/navigate.tsx",
              lineNumber: 403,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/navigate.tsx",
            lineNumber: 392,
            columnNumber: 37
          }, this) : null
        ] }, void 0, true, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 367,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 364,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: `$(showMenu) ? pb-2 : ''`, style: {
          textAlign: showMenu ? "left" : "center"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { onMouseEnter: () => handleManu("manuPaper", true), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { id: "publication", "data-dropdown-toggle": "manuPaper", className: menuClass(activeMenu === "manuPaper"), style: {
          marginRight: "1rem",
          marginLeft: "1rem"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/publication/list", children: "Publications" }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 419,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 415,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 414,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 411,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: `$(showMenu) ? pb-2 : ''`, style: {
          textAlign: showMenu ? "left" : "center"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { onMouseEnter: () => handleManu("manuNews", true), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { id: "news", "data-dropdown-toggle": "manuNews", className: menuClass(activeMenu === "manuNews"), style: {
          marginRight: "2rem",
          marginLeft: "2rem"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/news", children: "News" }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 431,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 427,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 426,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 423,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: `$(showMenu) ? pb-2 : ''`, style: {
          textAlign: showMenu ? "left" : "center"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { onMouseEnter: () => handleManu("manuImages", true), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { id: "news", "data-dropdown-toggle": "manuImages", className: menuClass(activeMenu === "manuImages"), style: {
          marginRight: "1rem",
          marginLeft: "1rem"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/gallery", children: "Gallery" }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 443,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 439,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 438,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 435,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: `$(showMenu) ? pb-2 : ''`, style: {
          textAlign: showMenu ? "left" : "center"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { onMouseEnter: () => handleManu("manuLinks", true), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { id: "links", "data-dropdown-toggle": "manuLinks", className: menuClass(activeMenu === "manuLinks"), style: {
          marginRight: "1rem",
          marginLeft: "1rem"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/links", children: "Useful Links" }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 455,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 451,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 450,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/navigate.tsx",
          lineNumber: 447,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/navigate.tsx",
        lineNumber: 91,
        columnNumber: 11
      }, this),
      showMenu ? null : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { className: "logo-container", href: "/", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/logo.png", alt: "Logo", className: "h-10 items-center", style: {
        top: "50%",
        transform: "translateY(0%)"
      } }, void 0, false, {
        fileName: "app/routes/navigate.tsx",
        lineNumber: 462,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/navigate.tsx",
        lineNumber: 461,
        columnNumber: 30
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/navigate.tsx",
      lineNumber: 90,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/navigate.tsx",
    lineNumber: 71,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/navigate.tsx",
    lineNumber: 68,
    columnNumber: 10
  }, this);
}
_s(NavBar, "WHPotDeepxBJSRCb+HVT9r8vrGk=");
_c = NavBar;
var navigate_default = NavBar;
var _c;
$RefreshReg$(_c, "NavBar");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  navigate_default
};
//# sourceMappingURL=/build/_shared/chunk-3GTQRJLG.js.map
