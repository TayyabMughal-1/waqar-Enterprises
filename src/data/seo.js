// Search-engine details for every page: titles, descriptions, social previews and
// structured data (schema.org JSON-LD). Used when the site is built (scripts/prerender.mjs).
import { CONFIG } from "../config";
import { FAQS } from "./content";
import { CATEGORIES } from "./services";

export const SITE_URL = CONFIG.siteUrl.replace(/\/$/, "");
const where = CONFIG.city ? ` in ${CONFIG.city}` : " in Pakistan";
const place = CONFIG.city ? `${CONFIG.city}, Pakistan` : "Pakistan";
const OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

// title: under ~65 characters · description: under ~160 characters
export const PAGE_SEO = {
  home: {
    path: "/",
    title: `Steel Gates & Aluminium Windows${where} | ${CONFIG.companyName}`,
    description: `Iron & steel gates, grills, railings, aluminium windows and doors, glass partitions, shower cabins, rolling shutters and steel sheds${where}. Free site visit and written quote.`,
    priority: "1.0",
  },
  services: {
    path: "/services/",
    title: `Gates, Grills, Aluminium, Glass & Shutter Services | ${CONFIG.companyName}`,
    description: `50 fabrication and installation services${where}: MS, SS and wrought iron gates, window grills, aluminium sliding windows, glass work, shutters, steel sheds and fiber glass.`,
    priority: "0.9",
  },
  estimator: {
    path: "/estimator/",
    title: `Gate, Window & Shutter Price Calculator | ${CONFIG.companyName}`,
    description: `Estimate the price of a steel gate, grill, railing, aluminium window or door, glass partition, shutter or shed${where}. Enter the size and get an instant price range.`,
    priority: "0.9",
  },
  projects: {
    path: "/projects/",
    title: `Gate, Grill, Window & Glass Work Projects | ${CONFIG.companyName}`,
    description: `See the kind of gates, grills, railings, aluminium windows and doors, glass partitions, shutters and steel structures we build${where}.`,
    priority: "0.7",
  },
  about: {
    path: "/about/",
    title: `About Us – Steel & Aluminium Fabricators | ${CONFIG.companyName}`,
    description: `${CONFIG.companyName} measures, fabricates and installs iron, steel, aluminium, glass and fiber glass work for homes, shops, offices and factories${where}.`,
    priority: "0.6",
  },
  testimonials: {
    path: "/testimonials/",
    title: `Customer Reviews | ${CONFIG.companyName}`,
    description: `What customers say about ${CONFIG.companyName} gates, shutters, aluminium windows, steel sheds and glass partitions.`,
    priority: "0.5",
  },
  faq: {
    path: "/faq/",
    title: `Gates, Windows & Glass Work FAQ | ${CONFIG.companyName}`,
    description: `Answers on site measurement, MS vs SS steel, job timelines, gate and shutter automation and choosing glass for shower cabins and railings.`,
    priority: "0.6",
  },
  contact: {
    path: "/contact/",
    title: `Contact Us – Call or WhatsApp ${CONFIG.phone} | ${CONFIG.companyName}`,
    description: `Call or WhatsApp ${CONFIG.phone} for gates, grills, aluminium windows, glass and shutter work${where}. Open ${CONFIG.hours.replace("·", "")}.`,
    priority: "0.7",
  },
  quote: {
    path: "/quote/",
    title: `Get a Free Quote | ${CONFIG.companyName}`,
    description: `Tell us the size and style you need and get a written quotation on WhatsApp for gates, windows, glass, shutters or steel work${where}.`,
    priority: "0.8",
  },
};

const NAMES = {
  home: "Home",
  services: "Services",
  estimator: "Price estimator",
  projects: "Projects",
  about: "About us",
  testimonials: "Testimonials",
  faq: "FAQ",
  contact: "Contact",
  quote: "Get a quote",
};

const isPlaceholder = (s) => !s || /workshop address|3XX|X{3,}/i.test(s);

// The business itself — shown on every page
export function businessSchema() {
  const address = { "@type": "PostalAddress", addressCountry: "PK" };
  if (CONFIG.city) address.addressLocality = CONFIG.city;
  if (!isPlaceholder(CONFIG.address)) address.streetAddress = CONFIG.address;
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: CONFIG.companyName,
    description:
      "Design, fabrication and installation of iron, steel, aluminium, glass and fiber glass work: gates, grills, railings, windows, doors, shutters, sheds and glass partitions.",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo-mark.png`,
    image: OG_IMAGE,
    telephone: CONFIG.phone.replace(/\s/g, ""),
    email: CONFIG.email,
    address,
    areaServed: place,
    priceRange: "Rs",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    sameAs: [CONFIG.facebook, CONFIG.instagram].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fabrication and installation services",
      itemListElement: CATEGORIES.map((c) => ({
        "@type": "OfferCatalog",
        name: c.name,
        itemListElement: c.items.map(([name, desc]) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, description: desc, areaServed: place },
        })),
      })),
    },
  };
}

function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: CONFIG.companyName,
    publisher: { "@id": `${SITE_URL}/#business` },
    inLanguage: "en-PK",
  };
}

function breadcrumbSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: NAMES[page], item: `${SITE_URL}${PAGE_SEO[page].path}` },
    ],
  };
}

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// All <head> tags for one page (title, description, canonical, social preview, JSON-LD)
export function headTags(page) {
  const seo = PAGE_SEO[page];
  const url = `${SITE_URL}${seo.path}`;
  const schemas = [businessSchema()];
  if (page === "home") schemas.push(websiteSchema());
  else schemas.push(breadcrumbSchema(page));
  if (page === "faq") schemas.push(faqSchema());

  return [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(CONFIG.companyName)}" />`,
    `<meta property="og:locale" content="en_PK" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<link rel="apple-touch-icon" href="/logo-mark.png" />`,
    `<noscript><style>.reveal{opacity:1!important;transform:none!important}</style></noscript>`,
    ...schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, "\\u003c")}</script>`),
  ].join("\n    ");
}
