import {
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

// app/routes/news.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/news.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/news.tsx"
  );
  import.meta.hot.lastModified = "1712818562407.2925";
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
  const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
  const [selectedTypes, setSelectedTypes] = (0, import_react.useState)(["press", "publication", "meeting", "update"]);
  const newsPerPage = 3;
  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  const filteredNews = selectedTypes.length > 0 ? news_default.news.filter((item) => selectedTypes.includes(item.type)) : news_default.news;
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const onPageChange = (page) => setCurrentPage(page);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
    background: "#fff"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(navigate_default, { manu: "manuNews", fixed: true }, void 0, false, {
      fileName: "app/routes/news.tsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto w-full main-container", style: {
      paddingTop: "150px"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "justify-between mb-5", style: {
        maxWidth: "1200px",
        margin: "0 auto"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: {
          textAlign: "center"
        }, children: "A Bunch of Intriguing Updates" }, void 0, false, {
          fileName: "app/routes/news.tsx",
          lineNumber: 65,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: {
          textAlign: "center",
          fontWeight: "700",
          color: "var(--pickled-bluewood-900)"
        }, children: [
          "Latest ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
            color: "var(--pickled-bluewood-600)"
          }, children: "News" }, void 0, false, {
            fileName: "app/routes/news.tsx",
            lineNumber: 75,
            columnNumber: 22
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/news.tsx",
          lineNumber: 70,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/news.tsx",
        lineNumber: 61,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center mr-7 ml-7", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex ", children: ["press", "publication", "meeting", "update"].map((type, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center ps-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: `${type}-checkbox-list`, type: "checkbox", value: "1", className: `w-4 h-4 text-${type}-color bg-gray-100 border-gray-300 rounded focus:ring-blue-500`, checked: selectedTypes.includes(type), onChange: () => toggleType(type) }, void 0, false, {
          fileName: "app/routes/news.tsx",
          lineNumber: 84,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: `${type}-checkbox-list`, className: "w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300", style: {
          textTransform: "uppercase"
        }, children: type }, void 0, false, {
          fileName: "app/routes/news.tsx",
          lineNumber: 85,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/news.tsx",
        lineNumber: 83,
        columnNumber: 17
      }, this) }, index, false, {
        fileName: "app/routes/news.tsx",
        lineNumber: 82,
        columnNumber: 83
      }, this)) }, void 0, false, {
        fileName: "app/routes/news.tsx",
        lineNumber: 81,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/news.tsx",
        lineNumber: 80,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap items-center justify-center", style: {
        maxWidth: "1200px",
        margin: "0 auto",
        marginBottom: "5rem",
        textAlign: "center"
      }, children: [
        currentNews.map((news, index) => {
          index = index + 1;
          return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `news news-${index}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "news-content", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "news-img-container", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: `./img/news/${news.imgName}`, alt: "News Image" }, void 0, false, {
                fileName: "app/routes/news.tsx",
                lineNumber: 104,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "", className: "news-img-hovered", style: {
                backgroundImage: `var(--news-img-hovered-overlay), url(./img/news/${news.imgName})`
              } }, void 0, false, {
                fileName: "app/routes/news.tsx",
                lineNumber: 105,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/news.tsx",
              lineNumber: 103,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "news-info", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "news-about", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { className: `news-tag ${news.type === "meeting" ? "tag-news" : news.type === "publication" ? "tag-publication" : news.type === "press" ? "tag-press" : null}`, children: news.type }, void 0, false, {
                  fileName: "app/routes/news.tsx",
                  lineNumber: 111,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "news-time", children: news.date }, void 0, false, {
                  fileName: "app/routes/news.tsx",
                  lineNumber: 112,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/news.tsx",
                lineNumber: 110,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "news-title", children: news.title }, void 0, false, {
                fileName: "app/routes/news.tsx",
                lineNumber: 114,
                columnNumber: 23
              }, this),
              news.type === "meeting" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "news-creator", children: [
                "in ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "", children: news.place }, void 0, false, {
                  fileName: "app/routes/news.tsx",
                  lineNumber: 115,
                  columnNumber: 83
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/news.tsx",
                lineNumber: 115,
                columnNumber: 50
              }, this) : news.type === "publication" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "news-creator", children: [
                "by ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "", children: news.shortAuthor }, void 0, false, {
                  fileName: "app/routes/news.tsx",
                  lineNumber: 115,
                  columnNumber: 182
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/news.tsx",
                lineNumber: 115,
                columnNumber: 149
              }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "news-creator", children: [
                "by ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "", children: news.source }, void 0, false, {
                  fileName: "app/routes/news.tsx",
                  lineNumber: 115,
                  columnNumber: 257
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/news.tsx",
                lineNumber: 115,
                columnNumber: 224
              }, this),
              news.webpage ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: news.webpage, className: "details-button", target: "_blank", children: "Details \u25B6" }, void 0, false, {
                fileName: "app/routes/news.tsx",
                lineNumber: 116,
                columnNumber: 39
              }, this) : null
            ] }, void 0, true, {
              fileName: "app/routes/news.tsx",
              lineNumber: 109,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/news.tsx",
            lineNumber: 102,
            columnNumber: 19
          }, this) }, `news-${index}`, false, {
            fileName: "app/routes/news.tsx",
            lineNumber: 101,
            columnNumber: 20
          }, this);
        }),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center mt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pagination, { currentPage, totalPages, onPageChange }, void 0, false, {
          fileName: "app/routes/news.tsx",
          lineNumber: 122,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/news.tsx",
          lineNumber: 121,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/news.tsx",
        lineNumber: 93,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/news.tsx",
      lineNumber: 60,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/news.tsx",
      lineNumber: 57,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(footer_default, {}, void 0, false, {
      fileName: "app/routes/news.tsx",
      lineNumber: 127,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/news.tsx",
    lineNumber: 52,
    columnNumber: 10
  }, this);
};
_s(Index, "6sJHd3ClchCk/wtZ/fE3lURQfMM=");
_c = Index;
var news_default2 = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  news_default2 as default
};
//# sourceMappingURL=/build/routes/news-DQ7QHLMM.js.map
