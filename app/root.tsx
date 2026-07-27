import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import CSS from "./css/app.css";
import CustomCSS from "./css/custom.css";

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "stylesheet", href: CSS },
  { rel: "stylesheet", href: CustomCSS },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
  },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="The 7-Dimensional Telescope: a medium-band multi-telescope array at El Sauce Observatory, Chile, and the 7-Dimensional Sky Survey of the southern sky."
        />
        <meta
          name="keywords"
          content="7DT, 7DS, telescope, astronomy, medium-band, gravitational waves, multi-messenger, survey, Chile, El Sauce"
        />
        <meta name="author" content="Center for the Gravitational-wave Universe, Seoul National University" />
        <meta name="theme-color" content="#05080f" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://7dt.org/" />
        <meta property="og:title" content="7-Dimensional Telescope" />
        <meta
          property="og:description"
          content="Twenty 50-cm telescopes carrying forty medium-band filters — imaging that reads like spectroscopy, over the whole southern sky."
        />
        <meta property="og:image" content="/img/title.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://7dt.org/" />
        <meta property="twitter:title" content="7-Dimensional Telescope" />
        <meta
          property="twitter:description"
          content="Twenty 50-cm telescopes carrying forty medium-band filters — imaging that reads like spectroscopy, over the whole southern sky."
        />
        <meta property="twitter:image" content="/img/title.png" />

        <Meta />
        <Links />
      </head>
      <body className="antialiased">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

/* A 404 or a thrown error otherwise renders Remix's unbranded fallback. */
export function ErrorBoundary() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{is404 ? "Page not found · 7DT" : "Something went wrong · 7DT"}</title>
        <Meta />
        <Links />
      </head>
      <body className="antialiased">
        <main
          id="content"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            background: "var(--ink-950, #05080f)",
            color: "#fff",
          }}
        >
          <div className="container container--wide">
            <span className="eyebrow eyebrow--on-dark">
              {is404 ? "404" : "Error"}
            </span>
            <h1 className="hero__title">
              {is404 ? "That page is not here" : "Something went wrong"}
            </h1>
            <p className="hero__lede">
              {is404
                ? "The page you asked for does not exist. It may have moved, or the link may be out of date."
                : "An unexpected error occurred while rendering this page."}
            </p>
            <div className="btn-row">
              <a className="btn btn--on-dark" href="/">
                Return home
              </a>
              <a className="btn btn--on-dark" href="/telescope/overview">
                The telescope
              </a>
              <a className="btn btn--on-dark" href="/news">
                News
              </a>
            </div>
          </div>
        </main>
        <Scripts />
      </body>
    </html>
  );
}
