import {
  Pagination
} from "/build/_shared/chunk-Z2BYYI2L.js";
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

// app/routes/gallery.tsx
var import_react = __toESM(require_react(), 1);

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
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/gallery.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/gallery.tsx"
  );
  import.meta.hot.lastModified = "1712818890159.3503";
}
var Index = () => {
  _s();
  const backgroundImage = {
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    backgroundImage: 'url("./img/data.jpg")',
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 0px"
  };
  const [submenuTop, setSubmenuTop] = (0, import_react.useState)("200px");
  const [smallWindow, setSmallWindow] = (0, import_react.useState)(true);
  const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
  const imagesPerPage = 6;
  const totalPages = Math.ceil(images_default.length / imagesPerPage);
  const paginatedImages = images_default.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage);
  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  (0, import_react.useEffect)(() => {
    const updateWindow = () => {
      if (window.innerWidth < 1500) {
        setSmallWindow(false);
      } else {
        setSmallWindow(true);
      }
    };
    updateWindow();
    window.addEventListener("resize", updateWindow);
    return () => {
      window.removeEventListener("resize", updateWindow);
    };
  }, []);
  (0, import_react.useEffect)(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const slowFactor = -0.1;
      const newTop = `calc(200px - ${scrollPosition * slowFactor / windowHeight * 100}%)`;
      setSubmenuTop(newTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
    background: "#fff"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(navigate_default, { manu: "manuGallery", fixed: true }, void 0, false, {
      fileName: "app/routes/gallery.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto w-full main-container", style: {
      paddingTop: "150px"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-10 max-w-screen-lg mx-auto", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "justify-between", style: {
        maxWidth: "1200px",
        margin: "0 auto"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-4 text-sm leading-7 text-gray-500 font-regular", style: {
          textAlign: "center"
        }, children: "Pictures of our Universe from 7DS" }, void 0, false, {
          fileName: "app/routes/gallery.tsx",
          lineNumber: 85,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900", style: {
          textAlign: "center",
          fontWeight: "700",
          color: "var(--pickled-bluewood-900)"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
          color: "var(--pickled-bluewood-600)"
        }, children: "Gallery" }, void 0, false, {
          fileName: "app/routes/gallery.tsx",
          lineNumber: 95,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/gallery.tsx",
          lineNumber: 90,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/gallery.tsx",
        lineNumber: 81,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "gallery", style: {
        paddingTop: "100px"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { children: paginatedImages.map((img, index) => {
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: `./img/images/${img.file}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("figure", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: `./img/images/${img.file}` }, void 0, false, {
            fileName: "app/routes/gallery.tsx",
            lineNumber: 109,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("figcaption", { children: img.name }, void 0, false, {
            fileName: "app/routes/gallery.tsx",
            lineNumber: 110,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/gallery.tsx",
          lineNumber: 108,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/gallery.tsx",
          lineNumber: 107,
          columnNumber: 17
        }, this) }, index, false, {
          fileName: "app/routes/gallery.tsx",
          lineNumber: 106,
          columnNumber: 22
        }, this);
      }) }, void 0, false, {
        fileName: "app/routes/gallery.tsx",
        lineNumber: 104,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/gallery.tsx",
        lineNumber: 101,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center mt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pagination, { currentPage, totalPages, onPageChange }, void 0, false, {
        fileName: "app/routes/gallery.tsx",
        lineNumber: 118,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/gallery.tsx",
        lineNumber: 117,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/gallery.tsx",
      lineNumber: 80,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/gallery.tsx",
      lineNumber: 77,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(footer_default, {}, void 0, false, {
      fileName: "app/routes/gallery.tsx",
      lineNumber: 122,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/gallery.tsx",
    lineNumber: 72,
    columnNumber: 10
  }, this);
};
_s(Index, "AJxxO5eOiuHxJT1KYLEPL0QoLVM=");
_c = Index;
var gallery_default = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  gallery_default as default
};
//# sourceMappingURL=/build/routes/gallery-4F65DZTH.js.map
