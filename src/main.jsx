import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout";
import { PAGES } from "./pages";
import "./styles/global.css";

// Each HTML file sets data-page on #root to choose which page to render.
const root = document.getElementById("root");
const page = PAGES[root.dataset.page] ? root.dataset.page : "home";
const Page = PAGES[page];

createRoot(root).render(
  <StrictMode>
    <Layout page={page}>{(toast) => <Page toast={toast} />}</Layout>
  </StrictMode>
);
