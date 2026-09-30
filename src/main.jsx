import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import Layout from "./components/Layout";
import { PAGES } from "./pages";
import "./styles/global.css";

// Each HTML file sets data-page on #root to choose which page to render.
const root = document.getElementById("root");
const page = PAGES[root.dataset.page] ? root.dataset.page : "home";
const Page = PAGES[page];

const app = (
  <StrictMode>
    <Layout page={page}>{(toast) => <Page toast={toast} />}</Layout>
  </StrictMode>
);

// Built pages arrive pre-rendered (scripts/prerender.mjs): take over that HTML.
// In development the root is empty, so render from scratch.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
