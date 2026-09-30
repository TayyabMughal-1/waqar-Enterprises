import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/content";
import Logo from "./Logo";

// `page` is the current page id, used to highlight its menu link.
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
      <div className="wrap header-row">
        <Logo />
        <nav className="nav" aria-label="Main">
          {NAV_LINKS.map(([id, href, label]) => (
            <a key={id} href={href} className={page === id ? "is-active" : undefined} aria-current={page === id ? "page" : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <a className="btn btn-primary btn-sm header-cta" href="/quote/">
          Get a quote
        </a>
        <button
          className="burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile">
          {NAV_LINKS.map(([id, href, label]) => (
            <a key={id} href={href} className={page === id ? "is-active" : undefined}>
              {label}
            </a>
          ))}
          <a className="btn btn-primary" href="/quote/">
            Get a free quote
          </a>
        </nav>
      )}
    </header>
  );
}
