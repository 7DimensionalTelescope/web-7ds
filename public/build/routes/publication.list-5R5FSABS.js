import {
  Alert,
  Pagination
} from "/build/_shared/chunk-Z2BYYI2L.js";
import {
  news_default
} from "/build/_shared/chunk-G7TFR7IJ.js";
import "/build/_shared/chunk-NMZL6IDN.js";
import "/build/_shared/chunk-GIAAE3CH.js";
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
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/publication.list.tsx
var import_react3 = __toESM(require_react(), 1);

// node_modules/react-icons/lib/iconBase.mjs
var import_react2 = __toESM(require_react(), 1);

// node_modules/react-icons/lib/iconContext.mjs
var import_react = __toESM(require_react(), 1);
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = import_react.default.createContext && /* @__PURE__ */ import_react.default.createContext(DefaultContext);

// node_modules/react-icons/lib/iconBase.mjs
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /* @__PURE__ */ import_react2.default.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return (props) => /* @__PURE__ */ import_react2.default.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = (conf) => {
    var {
      attr,
      size,
      title
    } = props, svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className)
      className = conf.className;
    if (props.className)
      className = (className ? className + " " : "") + props.className;
    return /* @__PURE__ */ import_react2.default.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /* @__PURE__ */ import_react2.default.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? /* @__PURE__ */ import_react2.default.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}

// node_modules/react-icons/hi/index.mjs
function HiInformationCircle(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 20 20", "fill": "currentColor", "aria-hidden": "true" }, "child": [{ "tag": "path", "attr": { "fillRule": "evenodd", "d": "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", "clipRule": "evenodd" }, "child": [] }] })(props);
}

// app/routes/publication.list.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/publication.list.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/publication.list.tsx"
  );
  import.meta.hot.lastModified = "1712818518531.211";
}
var Index = () => {
  _s();
  const backgroundImage = {
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    backgroundImage: 'url("./img/news.png")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px"
  };
  const [currentPage, setCurrentPage] = (0, import_react3.useState)(1);
  const [showAbstract, setShowAbstract] = (0, import_react3.useState)(false);
  const pubPerPage = 5;
  const pub = news_default.news.filter((item) => item.type === "publication");
  const totalPages = Math.ceil(pub.length / pubPerPage);
  const indexOfLastPubs = currentPage * pubPerPage;
  const indexOfFirstPubs = indexOfLastPubs - pubPerPage;
  const currentPub = pub.slice(indexOfFirstPubs, indexOfLastPubs);
  const onPageChange = (page) => setCurrentPage(page);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
    background: "#fff"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(navigate_default, { manu: "manuPaper", fixed: true }, void 0, false, {
      fileName: "app/routes/publication.list.tsx",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      paddingTop: "80px"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert, { color: "warning", icon: HiInformationCircle, className: "p-3", children: [
      "See our ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "./policy", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
        textDecoration: "underline"
      }, children: "publication policy" }, void 0, false, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 55,
        columnNumber: 38
      }, this) }, void 0, false, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 55,
        columnNumber: 19
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/publication.list.tsx",
      lineNumber: 54,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/publication.list.tsx",
      lineNumber: 51,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto w-full main-container", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "justify-between mb-5", style: {
        maxWidth: "1200px",
        margin: "0 auto"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: {
          textAlign: "center"
        }, children: "Meet our works" }, void 0, false, {
          fileName: "app/routes/publication.list.tsx",
          lineNumber: 67,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: {
          textAlign: "center",
          fontWeight: "700",
          color: "var(--pickled-bluewood-900)"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
          color: "var(--pickled-bluewood-600)"
        }, children: "Publications" }, void 0, false, {
          fileName: "app/routes/publication.list.tsx",
          lineNumber: 77,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/publication.list.tsx",
          lineNumber: 72,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 63,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { className: "w-full", href: "./policy", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { style: {
        textAlign: "right"
      }, children: "Publication Policy" }, void 0, false, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 84,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 83,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full", style: {
        display: "flex",
        justifyContent: "flex-end"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { style: {
        textAlign: "right"
      }, onClick: () => setShowAbstract(!showAbstract), children: showAbstract ? "Hide Abstract" : "Show Abstract" }, void 0, false, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 93,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 89,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap items-center justify-center", style: {
        maxWidth: "1200px",
        margin: "0 auto",
        marginBottom: "5rem",
        textAlign: "center",
        color: "black"
      }, children: [
        pub.map((p, index) => {
          index = index + 1;
          return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full pub-container p-6 m-3", style: {
            boxShadow: "0px 15px 35px rgba(227, 252, 239, 0.1), 0px 5px 15px rgba(0, 0, 0, 0.07)"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pr-5 p-cont-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "pb-3", style: {
                fontSize: "24px",
                lineHeight: "1.2",
                color: "var(--pickled-bluewood-600)",
                fontWeight: 500
              }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: p.webpage, target: "_blank", children: p.title }, void 0, false, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 116,
                columnNumber: 20
              }, this) }, void 0, false, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 111,
                columnNumber: 21
              }, this),
              showAbstract && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-content", style: {
                fontSize: "12pt"
              }, children: p.abstract }, void 0, false, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 117,
                columnNumber: 38
              }, this),
              !showAbstract && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "pb-3", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-bluewood-900", style: {
                  fontWeight: 700
                }, children: "Authors:" }, void 0, false, {
                  fileName: "app/routes/publication.list.tsx",
                  lineNumber: 120,
                  columnNumber: 59
                }, this),
                " ",
                p.author
              ] }, void 0, true, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 120,
                columnNumber: 39
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/publication.list.tsx",
              lineNumber: 110,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-cont-2", style: {
              textAlign: "left"
            }, children: [
              showAbstract && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "pb-3", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-bluewood-900", style: {
                  fontWeight: 700
                }, children: "Authors:" }, void 0, false, {
                  fileName: "app/routes/publication.list.tsx",
                  lineNumber: 127,
                  columnNumber: 58
                }, this),
                " ",
                p.author
              ] }, void 0, true, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 127,
                columnNumber: 38
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "pb-3", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-bluewood-900", style: {
                  fontWeight: 700
                }, children: "Journal:" }, void 0, false, {
                  fileName: "app/routes/publication.list.tsx",
                  lineNumber: 130,
                  columnNumber: 41
                }, this),
                " ",
                p.journal
              ] }, void 0, true, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 130,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "pb-3", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-bluewood-900", style: {
                  fontWeight: 700
                }, children: "Date:" }, void 0, false, {
                  fileName: "app/routes/publication.list.tsx",
                  lineNumber: 133,
                  columnNumber: 41
                }, this),
                " ",
                p.date
              ] }, void 0, true, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 133,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "pb-3", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-bluewood-900", style: {
                  fontWeight: 700
                }, children: "doi:" }, void 0, false, {
                  fileName: "app/routes/publication.list.tsx",
                  lineNumber: 136,
                  columnNumber: 41
                }, this),
                " ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: p.webpage, target: "_blank", children: p.doi }, void 0, false, {
                  fileName: "app/routes/publication.list.tsx",
                  lineNumber: 138,
                  columnNumber: 34
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 136,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "pb-3", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-bluewood-900", style: {
                  fontWeight: 700
                }, children: "preprint:" }, void 0, false, {
                  fileName: "app/routes/publication.list.tsx",
                  lineNumber: 139,
                  columnNumber: 41
                }, this),
                " ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: p.webpage2, target: "_blank", children: p.preprint }, void 0, false, {
                  fileName: "app/routes/publication.list.tsx",
                  lineNumber: 141,
                  columnNumber: 39
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/publication.list.tsx",
                lineNumber: 139,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/publication.list.tsx",
              lineNumber: 124,
              columnNumber: 19
            }, this)
          ] }, index, true, {
            fileName: "app/routes/publication.list.tsx",
            lineNumber: 107,
            columnNumber: 20
          }, this);
        }),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center mt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pagination, { currentPage, totalPages, onPageChange }, void 0, false, {
          fileName: "app/routes/publication.list.tsx",
          lineNumber: 146,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/publication.list.tsx",
          lineNumber: 145,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/publication.list.tsx",
        lineNumber: 98,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/publication.list.tsx",
      lineNumber: 62,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/publication.list.tsx",
      lineNumber: 61,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(footer_default, {}, void 0, false, {
      fileName: "app/routes/publication.list.tsx",
      lineNumber: 151,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/publication.list.tsx",
    lineNumber: 47,
    columnNumber: 10
  }, this);
};
_s(Index, "owkoNN6y6mdH7qNcrq1Vs590qO0=");
_c = Index;
var publication_list_default = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  publication_list_default as default
};
//# sourceMappingURL=/build/routes/publication.list-5R5FSABS.js.map
