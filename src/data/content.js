// Text content for the smaller sections. Edit freely.

export const FACTS = [
  { value: "10", label: "Service categories" },
  { value: "50", label: "Individual services" },
  { value: "5", label: "Materials in one workshop" },
  { value: "1", label: "Team from measurement to installation" },
];

export const MATERIALS = ["MS & Wrought Iron", "SS 304 / 316", "Aluminium", "Tempered Glass", "Fiber Glass"];

export const PROCESS = [
  { title: "Tell us the need", text: "Send sizes, a photo or a rough sketch through the order form or WhatsApp." },
  { title: "Site measurement", text: "Our team visits, takes exact measurements and confirms material, finish and design." },
  { title: "Fabrication", text: "Cutting, welding, grinding and finishing in our workshop, with primer and paint or powder coat." },
  { title: "Installation", text: "Fitted on site, aligned, sealed and cleaned up. You check it before we hand over." },
];

export const AUDIENCES = [
  { tag: "Homeowners", title: "Houses & families", text: "Main gates, window grills, stair railings, doors, sliding windows and shower cabins." },
  { tag: "Builders", title: "Contractors", text: "Bulk fabrication for housing projects with steady quality and delivery on schedule." },
  { tag: "Designers", title: "Architects", text: "Glass facades, frameless partitions and custom steel and aluminium details." },
  { tag: "Commercial", title: "Shops & offices", text: "Rolling and automatic shutters, glass shop fronts and office partitions." },
  { tag: "Industrial", title: "Factories", text: "Steel structures, sheds, trusses, racks and fiber glass roofing." },
];

export const VALUES = [
  { title: "Measured", text: "Every job starts with a site visit and exact measurements, so parts fit the first time." },
  { title: "Finished", text: "Ground welds, rust-proof primer and clean paint or powder coat that holds up in heat and rain." },
  { title: "Clear", text: "Written quotation with material, size and finish listed, so you know what you are paying for." },
  { title: "Installed", text: "We fit what we make, and we come back if anything needs adjusting." },
];

// Gallery items. image: points to a photo in public/images/. These are stock photos
// (see public/images/CREDITS.txt); replace them with photos of your own finished jobs.
export const PROJECTS = [
  { cat: "wrought", title: "Double-leaf main gate", meta: "MS gate · brick pillars", image: "/images/services/iron.jpg" },
  { cat: "glass", title: "Frameless shower cabin", meta: "10 mm tempered · black fittings", image: "/images/services/shower.jpg" },
  { cat: "aluwin", title: "Sliding windows", meta: "Aluminium · large sliding panels", image: "/images/services/items/sliding-windows.jpg" },
  { cat: "shutter", title: "Rolling shutter", meta: "Galvanised slats · grey finish", image: "/images/services/shutter.jpg" },
  { cat: "steel", title: "Steel structure", meta: "MS I-beam frame · industrial shed", image: "/images/services/steel.jpg" },
  { cat: "grills", title: "Decorative grill screen", meta: "Laser-cut steel · black finish", image: "/images/services/grills.jpg" },
  { cat: "iron", title: "Stair railing", meta: "MS flat bar · black enamel", image: "/images/projects/stair-railing.jpg" },
  { cat: "fiber", title: "Translucent roof canopy", meta: "Fiber glass sheet · steel frame", image: "/images/services/fiber.jpg" },
  { cat: "aludoor", title: "Sliding glass doors", meta: "Aluminium · slim black frame", image: "/images/services/aludoor.jpg" },
  { cat: "allsteel", title: "Warehouse racking", meta: "Pallet racking · bolted steel", image: "/images/projects/store-racking.jpg" },
  { cat: "glass", title: "Office glass partition", meta: "Tempered glass · black grid frame", image: "/images/services/glass.jpg" },
  { cat: "wrought", title: "Designer gate", meta: "Ornate scrollwork · black finish", image: "/images/projects/designer-gate.jpg" },
];

export const GALLERY_FILTERS = [
  ["all", "All"], ["iron", "Iron"], ["steel", "Steel"], ["aluwin", "Windows"], ["aludoor", "Doors"],
  ["glass", "Glass"], ["shutter", "Shutters"], ["wrought", "Gates"], ["grills", "Grills"],
  ["allsteel", "Racks"], ["fiber", "Fiber glass"],
];

// SAMPLE reviews — replace with real client feedback, then set `sample: false`.
export const TESTIMONIALS = [
  { job: "Main gate", text: "They measured twice, showed us the design on paper and the gate fitted exactly. The welding is clean and the paint still looks new.", who: "Example: Homeowner", sample: true },
  { job: "Shop shutters", text: "Our two shop shutters were installed in a day. Smooth rolling and strong locks.", who: "Example: Shop owner", sample: true },
  { job: "Aluminium windows", text: "All 14 windows in our house were replaced with sliders. No gaps, no rattling, and the team cleaned up after.", who: "Example: Homeowner", sample: true },
  { job: "Steel shed", text: "Good communication on the quotation and they finished the warehouse shed on the agreed date.", who: "Example: Factory manager", sample: true },
  { job: "Glass partition", text: "Frameless partitions for our office look very professional. Fittings are solid.", who: "Example: Office admin", sample: true },
];

export const FAQS = [
  { q: "Do you visit the site to take measurements?", a: "Yes. After you send your requirement we arrange a site visit, take exact measurements and confirm the design and finish before fabrication starts." },
  { q: "What is the difference between MS and SS?", a: "MS (mild steel) is strong and economical and is protected with primer and paint. SS (stainless steel) does not rust and keeps its shine; SS 304 suits most homes, while SS 316 is better near the sea or for heavy-use areas." },
  { q: "How long does a typical job take?", a: "Small jobs like grills or a single gate usually take a few days after measurement. Larger work such as sheds, facades or full-house windows is scheduled in the quotation." },
  { q: "Can you automate an existing gate or shutter?", a: "In most cases, yes. We check the gate or shutter on site and fit a suitable sliding, swing or shutter motor." },
  { q: "Which glass should I choose for a shower cabin or railing?", a: "Use tempered (toughened) glass, usually 8–12 mm. It is several times stronger than normal glass and breaks into small blunt pieces if it ever breaks." },
  { q: "Do you work outside the city?", a: "Send your location with the order form. We confirm coverage and any travel cost in the quotation." },
];

// Site pages shown in the menu: [page id, URL, label].
// Each page has its own HTML file (e.g. services/index.html) listed in vite.config.js.
export const NAV_LINKS = [
  ["services", "/services/", "Services"],
  ["estimator", "/estimator/", "Price Estimate"],
  ["projects", "/projects/", "Projects"],
  ["about", "/about/", "About"],
  ["testimonials", "/testimonials/", "Testimonials"],
  ["faq", "/faq/", "FAQ"],
  ["contact", "/contact/", "Contact"],
];
