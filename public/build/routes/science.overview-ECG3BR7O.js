import {
  overviewText
} from "/build/_shared/chunk-FYOAFX4F.js";
import {
  navigate_default
} from "/build/_shared/chunk-3GTQRJLG.js";
import {
  footer_default
} from "/build/_shared/chunk-ES5GI7YV.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  createHotContext
} from "/build/_shared/chunk-IFJMOQTG.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/science.overview.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/science.overview.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/science.overview.tsx"
  );
  import.meta.hot.lastModified = "1712905639413.9868";
}
var Index = () => {
  const backgroundImageStyle = {
    backgroundSize: "cover",
    backgroundImage: 'url("../img/science.jpg")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px",
    position: "relative"
    // Add this line
  };
  const transparentBoxStyle = {
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
  };
  const buttonStyle = {
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
  };
  const buttonHoverStyle = {
    backgroundColor: "var(--pickled-bluewood-600)"
  };
  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
  };
  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = buttonStyle.backgroundColor;
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
    background: "#fff"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(navigate_default, { manu: "manuScience" }, void 0, false, {
      fileName: "app/routes/science.overview.tsx",
      lineNumber: 72,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: backgroundImageStyle, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        height: "100vh"
      } }, void 0, false, {
        fileName: "app/routes/science.overview.tsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: transparentBoxStyle, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto w-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-screen-lg mx-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "justify-between mb-5", style: {
        maxWidth: "1200px",
        margin: "0 auto"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: {
          textAlign: "center"
        }, children: "Shed light on the physics of the Universe" }, void 0, false, {
          fileName: "app/routes/science.overview.tsx",
          lineNumber: 85,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: {
          textAlign: "center",
          fontWeight: "700",
          color: "var(--pickled-bluewood-900)"
        }, children: [
          "Overview of ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
            color: "var(--pickled-bluewood-600)"
          }, children: "Science" }, void 0, false, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 95,
            columnNumber: 31
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/science.overview.tsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-content", children: overviewText }, void 0, false, {
          fileName: "app/routes/science.overview.tsx",
          lineNumber: 99,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
          fileName: "app/routes/science.overview.tsx",
          lineNumber: 100,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-4 text-gray-900 font-regular", children: "To explore further,  " }, void 0, false, {
          fileName: "app/routes/science.overview.tsx",
          lineNumber: 101,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/sci", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { style: buttonStyle, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Multi-Messenger Astronomy" }, void 0, false, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 104,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 103,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/sci", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { style: buttonStyle, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Galaxy Formation Evolution" }, void 0, false, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 109,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 108,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/sci", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { style: buttonStyle, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Cosmology" }, void 0, false, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 114,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 113,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/science.overview.tsx",
          lineNumber: 102,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/sci", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { style: buttonStyle, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Active Galactic Nuclei" }, void 0, false, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 122,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 121,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/sci", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { style: buttonStyle, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Galactic Science" }, void 0, false, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 127,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 126,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/sci", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { style: buttonStyle, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Solar System Objects" }, void 0, false, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 132,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 131,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/sci", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { style: buttonStyle, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, children: "Transients" }, void 0, false, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 137,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/science.overview.tsx",
            lineNumber: 136,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/science.overview.tsx",
          lineNumber: 119,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/science.overview.tsx",
        lineNumber: 81,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/science.overview.tsx",
        lineNumber: 80,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/science.overview.tsx",
        lineNumber: 79,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/science.overview.tsx",
        lineNumber: 78,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/science.overview.tsx",
      lineNumber: 74,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(footer_default, {}, void 0, false, {
      fileName: "app/routes/science.overview.tsx",
      lineNumber: 147,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/science.overview.tsx",
    lineNumber: 69,
    columnNumber: 10
  }, this);
};
_c = Index;
var science_overview_default = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  science_overview_default as default
};
//# sourceMappingURL=/build/routes/science.overview-ECG3BR7O.js.map
