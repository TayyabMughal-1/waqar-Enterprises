# Waqar Enterprises — Website (React + Vite)

## Run it

You need Node.js 20 or newer (https://nodejs.org).

```bash
npm install      # first time only
npm run dev      # opens a live preview at http://localhost:5173
npm run build    # makes the final website in the dist/ folder
```

The site has separate pages, each in its own folder:
`/`, `/services/`, `/projects/`, `/about/`, `/testimonials/`, `/faq/`, `/contact/`, `/quote/`.
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
| Colours, fonts, spacing | `src/styles/global.css` (top `:root` block: `--brand` navy, `--amber` amber) |
| Logo | `public/logo-mark.png` (also used as the browser-tab icon) |
| What each page shows | `src/pages.jsx` |
| Menu links | `src/data/content.js` → `NAV_LINKS` |
| Page titles / descriptions (Google) | the page’s HTML file, e.g. `services/index.html` |

### Adding real project photos
1. Put photos in `public/projects/` (e.g. `public/projects/main-gate.jpg`).
2. In `src/data/content.js`, add `image: "/projects/main-gate.jpg"` to that project.
   The illustration is replaced by your photo automatically.

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
    Logo.jsx  SectionHead.jsx  Illustration.jsx (placeholder scenes)  Modal.jsx  Icons.jsx
  styles/global.css     all styles
```
