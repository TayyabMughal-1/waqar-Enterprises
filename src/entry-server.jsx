// Used only at build time: renders each page to HTML so search engines (and visitors
// before JavaScript loads) get the full page content. See scripts/prerender.mjs.
import { renderToString } from "react-dom/server";
import Layout from "./components/Layout";
import { PAGES } from "./pages";

export { PAGE_SEO, SITE_URL, headTags } from "./data/seo";

export function render(page) {
  const Page = PAGES[page];
  return renderToString(<Layout page={page}>{(toast) => <Page toast={toast} />}</Layout>);
}
