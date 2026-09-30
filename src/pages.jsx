// One component per page. Each page has its own HTML file (see vite.config.js)
// whose <div id="root" data-page="..."> picks the component below.
import { useState } from "react";
import { CONFIG } from "./config";
import { CATEGORY_BY_KEY } from "./data/services";
import { whatsappLink } from "./utils/links";
import { CtaBand, PageHero } from "./components/Layout";
import Hero from "./components/Hero";
import Services, { CategoryGrid } from "./components/Services";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import OrderForm from "./components/OrderForm";
import { About, Audiences, Faq, Process } from "./components/Sections";
import { ContactCards, FollowUs } from "./components/Contact";
import SectionHead from "./components/SectionHead";
import Reveal from "./components/Reveal";
import { ArrowIcon, WhatsAppIcon } from "./components/Icons";

function MoreLink({ href, children }) {
  return (
    <Reveal className="more">
      <a className="btn btn-outline" href={href}>
        {children} <ArrowIcon width="16" height="16" />
      </a>
    </Reveal>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <section className="section">
        <div className="wrap">
          <SectionHead kicker="Our services" title="Everything in metal and glass">
            Ten categories, 50 services, one team from measurement to installation.
          </SectionHead>
          <CategoryGrid />
        </div>
      </section>
      <Process />
      <section className="section">
        <div className="wrap">
          <SectionHead kicker="Projects" title="The kind of work we do" />
          <Gallery limit={6} />
          <MoreLink href="/projects/">View all projects</MoreLink>
        </div>
      </section>
      <section className="section section-soft">
        <div className="wrap">
          <SectionHead kicker="Testimonials" title="What clients say" />
          <Testimonials limit={3} />
          <MoreLink href="/testimonials/">Read all reviews</MoreLink>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero title="Our services">
        Iron, steel, aluminium, glass and fiber glass work. Choose a category, then open any service for typical
        options and a quote.
      </PageHero>
      <Services />
      <Process />
      <CtaBand />
    </>
  );
}

function ProjectsPage() {
  return (
    <>
      <PageHero title="Projects">A look at the kind of gates, windows, glass, shutters and structures we build.</PageHero>
      <section className="section">
        <div className="wrap">
          <Gallery />
          <p className="note">
            Illustrations show the project types we handle. Add real photos in src/data/content.js (the image field).
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero title="About us">
        {CONFIG.companyName} designs, fabricates and installs metal and glass work for homes, shops, offices and
        factories.
      </PageHero>
      <About />
      <Process />
      <Audiences />
      <CtaBand />
    </>
  );
}

function TestimonialsPage() {
  return (
    <>
      <PageHero title="Testimonials">What our clients say about the work and the team.</PageHero>
      <section className="section">
        <div className="wrap">
          <Testimonials />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function FaqPage() {
  return (
    <>
      <PageHero title="Frequently asked questions">
        Answers about measurements, materials, timelines and automation.
      </PageHero>
      <section className="section">
        <div className="wrap narrow">
          <Faq />
          <Reveal className="ask-card">
            <div>
              <b>Still have a question?</b>
              <p>Send a photo of the space and we will suggest the right material and finish.</p>
            </div>
            <a className="btn btn-outline" href={whatsappLink(CONFIG.whatsappGreeting)} target="_blank" rel="noopener">
              <WhatsAppIcon width="16" height="16" /> Ask on WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function ContactPage({ toast }) {
  return (
    <>
      <PageHero title="Contact us">Visit the workshop, call, or message us on WhatsApp.</PageHero>
      <section className="section">
        <div className="wrap">
          <ContactCards toast={toast} />
          <SectionHead kicker="Follow us" title="See our work on social media" />
          <FollowUs />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

// Reads ?cat=iron&service=Iron%20Gates so a service's "Get a quote" button can pre-fill the form
function QuotePage({ toast }) {
  const [prefill] = useState(() => {
    const q = new URLSearchParams(window.location.search);
    const cat = q.get("cat");
    const name = q.get("service");
    const ok = CATEGORY_BY_KEY[cat]?.items.some(([n]) => n === name);
    return ok ? { cat, name, nonce: 1 } : null;
  });

  return (
    <>
      <PageHero title="Get a free quote">
        Tell us about your job and we will reply on WhatsApp with a clear, written quotation.
      </PageHero>
      <OrderForm prefill={prefill} toast={toast} />
    </>
  );
}

export const PAGES = {
  home: HomePage,
  services: ServicesPage,
  projects: ProjectsPage,
  about: AboutPage,
  testimonials: TestimonialsPage,
  faq: FaqPage,
  contact: ContactPage,
  quote: QuotePage,
};
