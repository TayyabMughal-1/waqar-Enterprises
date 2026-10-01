import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/content";
import Logo from "./Logo";
import { ArrowIcon } from "./Icons";

// Header built as a row of bordered cells. `page` highlights the current page.
export default function Header({ page }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="header-row">
        <div className="header-logo">
          <Logo />
        </div>
        <nav className="nav" aria-label="Main">
          {NAV_LINKS.map(([id, href, label]) => (
            <a key={id} href={href} className={page === id ? "is-active" : undefined} aria-current={page === id ? "page" : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="/quote/">
          Get a quote
          <ArrowIcon width="16" height="16" />
        </a>
        <button className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile">
          {NAV_LINKS.map(([id, href, label], i) => (
            <a key={id} href={href} className={page === id ? "is-active" : undefined}>
              <span className="mono">[{String(i + 1).padStart(2, "0")}]</span>
              {label}
            </a>
          ))}
          <a className="btn btn-primary" href="/quote/">
            Get a free quote <ArrowIcon width="16" height="16" />
          </a>
        </nav>
      )}
    </header>
  );
}
