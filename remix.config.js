/** @type {import('@remix-run/dev').AppConfig} */
export default {
  // navigate/footer/main/plot live under app/routes for historical reasons but
  // are shared components, not pages. Without this they are served as bare,
  // title-less URLs — /footer published the contact block on its own, and
  // /main was a full duplicate of the home page for search engines.
  ignoredRouteFiles: [
    "**/.*",
    "**/navigate.tsx",
    "**/footer.tsx",
    "**/main.tsx",
    "**/plot.tsx",
  ],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
};
