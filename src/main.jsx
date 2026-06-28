import "./styles/app.css";
import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { html } from "./lib/html.js";
import { startMotion, scrollToTop, stopMotion } from "./lib/animations.js";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { getProjectById, pageTitles } from "./data/portfolio.js";
import {
  AboutPage,
  CertificationsPage,
  HomePage,
  ProjectDetailPage,
  ProjectsPage,
  SkillsPage,
} from "./pages/PortfolioPages.jsx";

const routes = new Set(Object.keys(pageTitles));
const pageComponents = {
  "/": HomePage,
  "/about-me": AboutPage,
  "/aeronautical-projects": ProjectsPage,
  "/skills-experiences": SkillsPage,
  "/certifications": CertificationsPage,
};

function resolveRoute(pathname) {
  const path = pathname.replace(/\/$/, "") || "/";

  if (routes.has(path)) {
    return { path, project: null };
  }

  const match = path.match(/^\/aeronautical-projects\/([^/]+)$/);
  if (match) {
    const project = getProjectById(match[1]);
    if (project) return { path, project };
  }

  return { path: "/", project: null };
}

function App() {
  const [path, setPath] = useState(() => resolveRoute(window.location.pathname).path);
  const route = useMemo(() => resolveRoute(path), [path]);
  const CurrentPage = useMemo(() => pageComponents[route.path] || HomePage, [route.path]);

  useEffect(() => {
    document.title = route.project
      ? `${route.project.title} | Chitraksh's Portfolio`
      : pageTitles[route.path] || pageTitles["/"];
  }, [route]);

  useEffect(() => {
    const cleanup = startMotion();
    return cleanup;
  }, [path, route.project?.id]);

  useEffect(() => () => stopMotion(), []);

  useEffect(() => {
    const handlePopState = () => setPath(resolveRoute(window.location.pathname).path);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(nextPath) {
    const nextRoute = resolveRoute(nextPath);
    if (nextRoute.path === path && !nextRoute.project) return;
    if (nextRoute.path === path && nextRoute.project?.id === route.project?.id) return;
    window.history.pushState({}, "", nextRoute.project ? nextPath : nextRoute.path);
    setPath(nextRoute.path);
    scrollToTop();
  }

  function handleContentClick(event) {
    const anchor = event.target.closest?.("a[href]");
    if (!anchor) return;

    const url = new URL(anchor.href, window.location.origin);
    if (url.origin !== window.location.origin) return;

    const nextRoute = resolveRoute(url.pathname);
    if (!routes.has(nextRoute.path) && !nextRoute.project) return;

    event.preventDefault();
    navigate(url.pathname);
  }

  return html`
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <div className="site-shell" onClick=${handleContentClick}>
      <${Header} activePath=${path} onNavigate=${navigate} />
      ${route.project
        ? html`<${ProjectDetailPage} project=${route.project} onNavigate=${navigate} />`
        : html`<${CurrentPage} onNavigate=${navigate} />`}
      <${Footer} onNavigate=${navigate} />
    </div>
    <${Analytics} />
  `;
}

createRoot(document.getElementById("root")).render(React.createElement(App));
