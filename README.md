# Waqar Enterprises — Website (React + Vite)

## Run it

You need Node.js 20 or newer (https://nodejs.org).

```bash
npm install      # first time only
npm run dev      # opens a live preview at http://localhost:5173
npm run build    # makes the final website in the dist/ folder
```

The site has separate pages, each in its own folder:
`/`, `/services/`, `/estimator/`, `/projects/`, `/about/`, `/testimonials/`, `/faq/`, `/contact/`, `/quote/`.
To add a page: copy one of those folders, change `data-page` in its `index.html`, then add it to
`vite.config.js` and `src/pages.jsx`.

Upload the contents of `dist/` to your hosting (e.g. `public_html` for WaqarSteel.com).
It also works on Netlify, Vercel or Cloudflare Pages: build command `npm run build`, output folder `dist`.

## Where to change things

| What you want to change | File |
| --- | --- |
| Phone, WhatsApp, email, address, hours | `src/config.js` |
| Service categories, services, specs | `src/data/services.js` |
| Facts, process steps, audiences, values | `src/data/content.js` |
| Gallery projects (add real photos) | `src/data/content.js` → `PROJECTS` |
| Testimonials | `src/data/content.js` → `TESTIMONIALS` |
| FAQ | `src/data/content.js` → `FAQS` |
| Order form questions | `src/data/orderForm.js` |
| Price estimator rates (Rs per sq ft / running ft) | `src/data/pricing.js` |
| Colours, fonts, spacing | `src/styles/global.css` (top `:root` block: `--brand` navy, `--amber` amber) |
| Logo | `public/logo-mark.png` (also used as the browser-tab icon) |
| What each page shows | `src/pages.jsx` |
| Menu links | `src/data/content.js` → `NAV_LINKS` |
| Page titles / descriptions (Google) | the page’s HTML file, e.g. `services/index.html` |

### Adding real project photos
1. Put photos in `public/projects/` (e.g. `public/projects/main-gate.jpg`).
2. In `src/data/content.js`, add `image: "/projects/main-gate.jpg"` to that project.
   Service photos are listed in `src/data/photos.js`.

### WhatsApp
Set `whatsapp` in `src/config.js` to the number in international format, digits only
(e.g. `923001234567`). The order form, floating button and "WhatsApp us" buttons all use it.

### Before going live
- Replace the placeholder phone, WhatsApp and address in `src/config.js`.
- Replace the sample testimonials with real ones and set `sample: false`.

## Project structure

```
src/
  main.jsx              picks the page from data-page
  pages.jsx             what each page shows
  config.js             business contact details
  data/                 all text & lists
  components/           one file per section
    Header.jsx  Hero.jsx  Services.jsx  ServiceModal.jsx  Gallery.jsx
    Testimonials.jsx  OrderForm.jsx  Sections.jsx  Contact.jsx
    Logo.jsx  SectionHead.jsx  Photo.jsx  Modal.jsx  Icons.jsx
  styles/global.css     all styles
```

## SEO (search engines)

`npm run build` pre-renders every page to full HTML (`scripts/prerender.mjs`), so search engines
see all the text without running JavaScript. It also writes `sitemap.xml` and `robots.txt`.

| What | Where |
| --- | --- |
| Page titles and descriptions | `src/data/seo.js` → `PAGE_SEO` |
| Business details for Google (schema.org) | `src/data/seo.js` → `businessSchema()` (uses `src/config.js`) |
| Live site address (canonical links, sitemap) | `src/config.js` → `siteUrl` |
| Your city (added to titles for local search) | `src/config.js` → `city` |
| Social share image (1200×630) | `public/images/og-image.jpg` |

After going live:
1. Add the site to Google Search Console and submit `https://<your-site>/sitemap.xml`.
2. Create or claim your Google Business Profile with the same name, phone and address.
3. If you connect your own domain, set `siteUrl` to it and redeploy.
