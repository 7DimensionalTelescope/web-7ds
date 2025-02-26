import {
  mainText1,
  mainText2,
  mainText3,
  mainText4
} from "/build/_shared/chunk-FYOAFX4F.js";
import {
  news_default
} from "/build/_shared/chunk-G7TFR7IJ.js";
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

// app/routes/main.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/main.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/main.tsx"
  );
  import.meta.hot.lastModified = "1712979229995.2126";
}
var MainPage = () => {
  _s();
  const [smallWindow, setSmallWindow] = (0, import_react.useState)(true);
  const [backgroudImageSet, setBackgroudImageSet] = (0, import_react.useState)("fixed");
  const [scrollPos, setScrollPos] = (0, import_react.useState)(0);
  const rulerImageRef = (0, import_react.useRef)(false);
  const rulerImageRefFixed = (0, import_react.useRef)(false);
  const [hovered, setHovered] = (0, import_react.useState)(0);
  const handleHover = (val) => {
    setHovered(val);
  };
  (0, import_react.useEffect)(() => {
    const updateWindow = () => {
      if (window.innerWidth < 1200) {
        setSmallWindow(false);
      } else {
        setSmallWindow(true);
      }
    };
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPos(scrollY);
    };
    updateWindow();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateWindow);
    return () => {
      window.removeEventListener("resize", updateWindow);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  (0, import_react.useEffect)(() => {
    const handleScroll = () => {
      if (rulerImageRef.current) {
        const scrollX = window.scrollY || window.pageYOffset;
        rulerImageRef.current.style.backgroundPositionX = `-${scrollX}px`;
      }
      if (rulerImageRefFixed.current) {
        const scrollX = window.scrollY || window.pageYOffset;
        rulerImageRefFixed.current.style.backgroundPositionX = `-${scrollX}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const backgroundImage = {
    backgroundSize: "cover",
    backgroundImage: 'url("./img/main.jpg")',
    backgroundAttachment: backgroudImageSet,
    backgroundPosition: "50% 0px"
  };
  const backgroundImage2 = {
    backgroundSize: "cover",
    backgroundImage: 'url("./img/science.jpg")',
    backgroundAttachment: backgroudImageSet,
    backgroundPosition: "50% 0px"
  };
  const backgroundImage3 = {
    backgroundSize: "cover",
    backgroundImage: 'url("./img/survey.jpg")',
    backgroundAttachment: backgroudImageSet,
    backgroundPosition: "50% 0px"
  };
  const backgroundImage4 = {
    backgroundSize: "cover",
    backgroundImage: 'url("./img/telescope.jpg")',
    backgroundAttachment: backgroudImageSet,
    backgroundPosition: "50% 0px"
  };
  const rulerImage = {
    backgroundSize: "cover",
    backgroundImage: 'url("./img/ruler.jpg")',
    backgroundRepeat: "none repeat-x",
    backgroundPosition: "50% 0px",
    width: "100%",
    height: "40px",
    zIndex: 200
  };
  (0, import_react.useEffect)(() => {
    if (window.innerWidth < 768) {
      setBackgroudImageSet("scroll");
    }
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: backgroundImage, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full", style: {
      height: "100vh"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "./img/title.png", style: {
      width: "max(1000px, 70%)",
      paddingTop: "120px",
      paddingLeft: "15%"
    }, alt: "7DT telescope" }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 115,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 112,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 111,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      backgroundColor: "#fff"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "./about/intro", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "main w-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full mx-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
      maxWidth: "1440px"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: {
        textAlign: "center",
        fontWeight: "700"
      }, children: "Introduction" }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 133,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { className: "inline-flex", src: "/img/NGC0253.gif", width: "40%" }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 139,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: {
        paddingTop: "20px"
      }, children: mainText1 }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 141,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/main.tsx",
      lineNumber: 130,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 129,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 128,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 127,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 124,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      backgroundColor: "#f9f9f9"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "./science/overview", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "main w-full main-style", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full mx-auto", onMouseEnter: () => handleHover(1), onMouseLeave: () => handleHover(0), style: hovered === 1 ? backgroundImage2 : {
      backgroundColor: "#f9f9f9"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
      maxWidth: "1440px"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: {
        textAlign: "center",
        fontWeight: "700"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "7 Scientific Goals" }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 167,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 163,
        columnNumber: 15
      }, this),
      hovered != 1 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { className: "inline-flex", src: "/img/science.jpg", style: {
        height: "350px",
        width: "600px"
      } }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 169,
        columnNumber: 31
      }, this) : "",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: hovered === 1 ? {
        paddingTop: "400px"
      } : {
        paddingTop: "50px"
      }, children: mainText2 }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 173,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/main.tsx",
      lineNumber: 160,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 157,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 156,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 155,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 152,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      backgroundColor: "#fff"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "./survey/overview", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "main w-full main-style", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full mx-auto", onMouseEnter: () => handleHover(2), onMouseLeave: () => handleHover(0), style: hovered === 2 ? backgroundImage3 : {}, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
      maxWidth: "1440px"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: {
        textAlign: "center",
        fontWeight: "700"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "7 Dimensional Sky Survey" }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 199,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 195,
        columnNumber: 15
      }, this),
      hovered != 2 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { className: "inline-flex", src: "/img/survey.jpg", style: {
        height: "350px",
        width: "600px"
      } }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 201,
        columnNumber: 31
      }, this) : "",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: hovered === 2 ? {
        paddingTop: "400px"
      } : {
        paddingTop: "50px"
      }, children: mainText3 }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 205,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/main.tsx",
      lineNumber: 192,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 191,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 190,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 189,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 186,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      backgroundColor: "#f9f9f9"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "./telescope/overview", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "main w-full main-style", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full mx-auto", onMouseEnter: () => handleHover(3), onMouseLeave: () => handleHover(0), style: hovered === 3 ? backgroundImage4 : {
      backgroundColor: "#f9f9f9"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
      maxWidth: "1440px"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: {
        textAlign: "center",
        fontWeight: "700"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "7 Dimensional Telescope" }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 233,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 229,
        columnNumber: 15
      }, this),
      hovered != 3 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { className: "inline-flex", src: "/img/telescope.jpg", style: {
        height: "350px",
        width: "600px"
      } }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 235,
        columnNumber: 31
      }, this) : "",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: hovered === 3 ? {
        paddingTop: "400px"
      } : {
        paddingTop: "50px"
      }, children: mainText4 }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 239,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/main.tsx",
      lineNumber: 226,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 223,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 222,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 221,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 218,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      backgroundColor: "#fff",
      paddingTop: "100px"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto w-full", style: {
      maxWidth: "1440px"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "justify-center mb-5", style: {
        maxWidth: "1200px",
        margin: "0 auto",
        color: "--pickled-bluewood-900"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "mb-10 text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: {
        textAlign: "center",
        fontWeight: "700"
      }, children: "Meet Our Latest News" }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 265,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 264,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 259,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap items-center justify-center", style: {
        maxWidth: "1200px",
        margin: "0 auto",
        marginBottom: "5rem",
        textAlign: "center"
      }, children: news_default.news.map((news, index) => {
        index = index + 1;
        if (index <= 3) {
          return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `card card-${index}`, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: `./img/news/${news.imgName}` }, void 0, false, {
              fileName: "app/routes/main.tsx",
              lineNumber: 283,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: news.webpage, target: "_blank", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "card-img-hovered", style: {
              backgroundImage: `var(--card-img-hovered-overlay), url(./img/news/${news.imgName})`
            } }, void 0, false, {
              fileName: "app/routes/main.tsx",
              lineNumber: 285,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/main.tsx",
              lineNumber: 284,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "card-info", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "card-about", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { className: `card-tag ${news.type === "meeting" ? "tag-news" : news.type === "publication" ? "tag-publication" : news.type === "press" ? "tag-press" : null}`, children: news.type }, void 0, false, {
                  fileName: "app/routes/main.tsx",
                  lineNumber: 291,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "card-time", children: news.date }, void 0, false, {
                  fileName: "app/routes/main.tsx",
                  lineNumber: 292,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/main.tsx",
                lineNumber: 290,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "card-title", children: news.title }, void 0, false, {
                fileName: "app/routes/main.tsx",
                lineNumber: 294,
                columnNumber: 21
              }, this),
              news.type === "meeting" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "card-creator", children: [
                "in ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "", children: news.place }, void 0, false, {
                  fileName: "app/routes/main.tsx",
                  lineNumber: 295,
                  columnNumber: 81
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/main.tsx",
                lineNumber: 295,
                columnNumber: 48
              }, this) : news.type === "publication" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "card-creator", children: [
                "by ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "", children: news.shortAuthor }, void 0, false, {
                  fileName: "app/routes/main.tsx",
                  lineNumber: 295,
                  columnNumber: 180
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/main.tsx",
                lineNumber: 295,
                columnNumber: 147
              }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "card-creator", children: [
                "by ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "", children: news.source }, void 0, false, {
                  fileName: "app/routes/main.tsx",
                  lineNumber: 295,
                  columnNumber: 255
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/main.tsx",
                lineNumber: 295,
                columnNumber: 222
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/main.tsx",
              lineNumber: 289,
              columnNumber: 19
            }, this)
          ] }, `card-${index}`, true, {
            fileName: "app/routes/main.tsx",
            lineNumber: 282,
            columnNumber: 22
          }, this);
        }
      }) }, void 0, false, {
        fileName: "app/routes/main.tsx",
        lineNumber: 273,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/main.tsx",
      lineNumber: 256,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 252,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      backgroundColor: "#fff"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto w-full", style: {
      maxWidth: "1200px"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://www.nrf.re.kr/eng/index", target: "_blank", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "./img/institutes/nrf.jpg", style: {
          height: "100px",
          padding: "20px"
        } }, void 0, false, {
          fileName: "app/routes/main.tsx",
          lineNumber: 310,
          columnNumber: 71
        }, this) }, void 0, false, {
          fileName: "app/routes/main.tsx",
          lineNumber: 310,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://gwuniverse.snu.ac.kr/", target: "_blank", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "./img/institutes/gwuniv.png", style: {
          height: "100px",
          padding: "20px"
        } }, void 0, false, {
          fileName: "app/routes/main.tsx",
          lineNumber: 314,
          columnNumber: 69
        }, this) }, void 0, false, {
          fileName: "app/routes/main.tsx",
          lineNumber: 314,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://en.snu.ac.kr/", target: "_blank", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "./img/institutes/snu.jpeg", style: {
          height: "100px",
          padding: "20px"
        } }, void 0, false, {
          fileName: "app/routes/main.tsx",
          lineNumber: 318,
          columnNumber: 61
        }, this) }, void 0, false, {
          fileName: "app/routes/main.tsx",
          lineNumber: 318,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/main.tsx",
        lineNumber: 309,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://www.kasi.re.kr/eng/index", target: "_blank", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "./img/institutes/kasi.gif", style: {
          height: "100px",
          padding: "20px"
        } }, void 0, false, {
          fileName: "app/routes/main.tsx",
          lineNumber: 324,
          columnNumber: 72
        }, this) }, void 0, false, {
          fileName: "app/routes/main.tsx",
          lineNumber: 324,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://www.ewha.ac.kr/ewhaen/index.do", target: "_blank", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "./img/institutes/ewha.png", style: {
          height: "100px",
          padding: "20px"
        } }, void 0, false, {
          fileName: "app/routes/main.tsx",
          lineNumber: 328,
          columnNumber: 78
        }, this) }, void 0, false, {
          fileName: "app/routes/main.tsx",
          lineNumber: 328,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://www.postech.ac.kr/eng/", target: "_blank", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "./img/institutes/postech.png", style: {
          height: "100px",
          padding: "20px"
        } }, void 0, false, {
          fileName: "app/routes/main.tsx",
          lineNumber: 332,
          columnNumber: 70
        }, this) }, void 0, false, {
          fileName: "app/routes/main.tsx",
          lineNumber: 332,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/main.tsx",
        lineNumber: 323,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/main.tsx",
      lineNumber: 306,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 303,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { ref: rulerImageRef, style: {
      ...rulerImage,
      position: "fixed",
      bottom: "0"
    } }, void 0, false, {
      fileName: "app/routes/main.tsx",
      lineNumber: 339,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/main.tsx",
    lineNumber: 110,
    columnNumber: 10
  }, this);
};
_s(MainPage, "9Rjng4hn82aNTaQB07/AqWK24Qw=");
_c = MainPage;
var main_default = MainPage;
var _c;
$RefreshReg$(_c, "MainPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  main_default
};
//# sourceMappingURL=/build/_shared/chunk-JBQD3T7G.js.map
