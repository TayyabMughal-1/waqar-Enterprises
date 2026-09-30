// Build step (runs after `vite build`): fills every page in dist/ with its rendered HTML,
// its SEO <head> tags, and writes sitemap.xml and robots.txt.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const ssr = path.join(root, "dist-ssr");
const entry = fs.readdirSync(ssr).find((f) => /^entry-server\.m?js$/.test(f));
const { render, headTags, PAGE_SEO, SITE_URL } = await import(pathToFileURL(path.join(ssr, entry)).href);

const today = new Date().toISOString().slice(0, 10);
let count = 0;

for (const [page, seo] of Object.entries(PAGE_SEO)) {
  const file = path.join(dist, seo.path, "index.html");
  let html = fs.readFileSync(file, "utf8");

  const empty = `<div id="root" data-page="${page}"></div>`;
  if (!html.includes(empty)) throw new Error(`No empty root for "${page}" in ${file}`);
  html = html.replace(empty, `<div id="root" data-page="${page}">${render(page)}</div>`);

  // Replace the basic title/description with the full SEO head
  html = html
    .replace(/\s*<title>[\s\S]*?<\/title>/, "")
    .replace(/\s*<meta name="description"[^>]*>/, "")
    .replace("</head>", `    ${headTags(page)}\n  </head>`);

  fs.writeFileSync(file, html);
  count++;
}

const urls = Object.values(PAGE_SEO)
  .map(
    (s) =>
      `  <url>\n    <loc>${SITE_URL}${s.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${s.priority}</priority>\n  </url>`
  )
  .join("\n");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

fs.rmSync(ssr, { recursive: true, force: true });
console.log(`prerendered ${count} pages · sitemap.xml · robots.txt`);
