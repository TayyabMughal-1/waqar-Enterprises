import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Every page is its own HTML file. To add a page: create <name>/index.html
// (copy an existing one, change data-page), add it here, in src/pages.jsx and in src/data/seo.js.
const PAGES = ["index.html", "services", "estimator", "projects", "about", "testimonials", "faq", "contact", "quote"];

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  // The server build (used to pre-render pages for SEO) has a single entry: src/entry-server.jsx
  build: isSsrBuild
    ? {}
    : {
        rollupOptions: {
          input: Object.fromEntries(
            PAGES.map((p) => [p.replace(".html", ""), resolve(import.meta.dirname, p.endsWith(".html") ? p : `${p}/index.html`)])
          ),
        },
      },
}));
