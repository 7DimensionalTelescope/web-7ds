import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import CSS from "./css/app_modified.css"
import CustomCSS from "./css/custom.css"
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: bootstrap},
  { rel: "stylesheet", href: CSS },
  { rel: "stylesheet", href: CustomCSS},
  { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"},
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];


 
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"></script>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
