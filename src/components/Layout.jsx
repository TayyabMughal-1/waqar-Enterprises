import { useCallback, useRef, useState } from "react";
import Header from "./Header";
import { Footer, WhatsAppFab } from "./Contact";
import Reveal from "./Reveal";

// Shared frame for every page. `children` is a function that receives `toast`
// so a page can show short messages ("Copied").
export default function Layout({ page, children }) {
  const [toastMsg, setToastMsg] = useState("");
  const timer = useRef();

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(""), 2400);
  }, []);

  return (
    <>
      <Header page={page} />
      <main className="page">{children(toast)}</main>
      <Footer />
      <WhatsAppFab />
      {toastMsg && (
        <div className="toast" role="status">
          {toastMsg}
        </div>
      )}
    </>
  );
}

// Title band at the top of every inner page
export function PageHero({ title, children }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <nav className="crumbs anim-up" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <h1 className="anim-up" style={{ animationDelay: "80ms" }}>
          {title}
        </h1>
        {children && (
          <p className="anim-up" style={{ animationDelay: "160ms" }}>
            {children}
          </p>
        )}
      </div>
    </section>
  );
}

// Navy call-to-action band used near the bottom of most pages
export function CtaBand() {
  return (
    <section className="section cta-section">
      <div className="wrap">
        <Reveal className="cta-band">
          <div>
            <h2>Have a size in mind?</h2>
            <p>Send us the measurements, or book a free site visit, and we will send you a written quotation.</p>
          </div>
          <a className="btn btn-primary btn-lg" href="/quote/">
            Get a free quote →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
