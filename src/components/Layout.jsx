import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Footer, WhatsAppFab } from "./Contact";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";

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
    <div className="frame">
      <Header page={page} />
      <main className="page">{children(toast)}</main>
      <Footer />
      <WhatsAppFab />
      {toastMsg && (
        <div className="toast" role="status">
          {toastMsg}
        </div>
      )}
    </div>
  );
}

// Title band at the top of every inner page
export function PageHero({ title, children }) {
  return (
    <section className="page-hero">
      <span className="ruler ruler-top" aria-hidden="true" />
      <div className="page-hero-row">
        <div className="page-hero-main">
          <nav className="crumbs anim-up" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </nav>
          <h1 className="anim-up" style={{ animationDelay: "80ms" }}>
            {title}
          </h1>
        </div>
        {children && (
          <p className="page-hero-side anim-up" style={{ animationDelay: "160ms" }}>
            {children}
          </p>
        )}
      </div>
    </section>
  );
}

// Large statement whose words darken one by one as it scrolls through the screen
export function Statement({ children, label }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(1);
  const words = String(children).split(" ");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const update = () => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const vh = window.innerHeight;
      setProgress(Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const lit = Math.round(progress * words.length);
  return (
    <section className="statement" ref={ref}>
      {label && <p className="kicker">{label}</p>}
      <p className="statement-text">
        {words.map((w, i) => (
          <span key={i} className={i < lit ? "on" : undefined}>
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}

// Closing call to action used near the bottom of most pages
export function CtaBand() {
  return (
    <section className="cta-section">
      <span className="coord c1" aria-hidden="true">[0,246]</span>
      <span className="coord c2" aria-hidden="true">[831,0]</span>
      <span className="coord c3" aria-hidden="true">[2303,0]</span>
      <Reveal className="cta-band">
        <h2>Have a size in mind?</h2>
        <p>Send us the measurements or book a free site visit, and we will send you a written quotation.</p>
        <div className="cta-buttons">
          <a className="btn btn-primary btn-split" href="/quote/">
            <span>Get a free quote</span>
            <ArrowIcon width="16" height="16" />
          </a>
          <a className="btn btn-outline" href="/estimator/">
            Estimate the price
          </a>
        </div>
      </Reveal>
    </section>
  );
}
