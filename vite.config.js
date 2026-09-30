import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Every page is its own HTML file. To add a page: create <name>/index.html
// (copy an existing one, change data-page), add it here and in src/pages.jsx.
const PAGES = ["index.html", "services", "projects", "about", "testimonials", "faq", "contact", "quote"];

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        PAGES.map((p) => [p.replace(".html", ""), resolve(import.meta.dirname, p.endsWith(".html") ? p : `${p}/index.html`)])
      ),
    },
  },
});
