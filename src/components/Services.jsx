import { useState } from "react";
import { CATEGORIES, CATEGORY_BY_KEY } from "../data/services";
import { quoteLink, servicesLink } from "../utils/links";
import { CATEGORY_PHOTOS, photoFor } from "../data/photos";
import Photo from "./Photo";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";
import ServiceModal from "./ServiceModal";

function CategoryCard({ c, onClick, href }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag className="card" href={href} onClick={onClick}>
      <span className="card-art">
        <Photo src={CATEGORY_PHOTOS[c.key]} alt={c.name} />
      </span>
      <span className="card-body">
        <b>{c.name}</b>
        <small>{c.summary}</small>
        <span className="card-link">
          {c.items.length} services <ArrowIcon width="16" height="16" />
        </span>
      </span>
    </Tag>
  );
}

// Grid of the 10 categories, each linking to the services page (used on Home)
export function CategoryGrid() {
  return (
    <div className="card-grid cats">
      {CATEGORIES.map((c, i) => (
        <Reveal key={c.key} delay={(i % 5) * 80}>
          <CategoryCard c={c} href={servicesLink(c.key)} />
        </Reveal>
      ))}
    </div>
  );
}

// Full services browser (Services page). The chosen category is kept in the URL (?cat=iron).
export default function Services() {
  const [category, setCat] = useState(() => {
    const cat = new URLSearchParams(window.location.search).get("cat");
    return CATEGORY_BY_KEY[cat] ? cat : "all";
  });
  const [open, setOpen] = useState(null); // { cat, index }
  const current = CATEGORY_BY_KEY[category];

  const setCategory = (key) => {
    setCat(key);
    window.history.replaceState(null, "", servicesLink(key));
  };

  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="chips" role="toolbar" aria-label="Filter by category">
          <button className="chip" aria-pressed={!current} onClick={() => setCategory("all")}>
            All
          </button>
          {CATEGORIES.map((c) => (
            <button key={c.key} className="chip" aria-pressed={category === c.key} onClick={() => setCategory(c.key)}>
              {c.name}
            </button>
          ))}
        </Reveal>

        {!current ? (
          <div className="card-grid cats">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.key} delay={(i % 5) * 80}>
                <CategoryCard c={c} onClick={() => setCategory(c.key)} />
              </Reveal>
            ))}
          </div>
        ) : (
          <>
            <Reveal className="cat-intro" key={current.key + "-intro"}>
              <h2>{current.name}</h2>
              <p>{current.summary}</p>
            </Reveal>
            <div className="card-grid" key={current.key}>
              {current.items.map(([name, desc], index) => (
                <Reveal key={name} delay={(index % 3) * 90}>
                  <button className="card" onClick={() => setOpen({ cat: current.key, index })}>
                    <span className="card-art">
                      <Photo src={photoFor(current.key, name)} alt={name} />
                    </span>
                    <span className="card-body">
                      <b>{name}</b>
                      <small>{desc}</small>
                      <span className="card-link">
                        View details <ArrowIcon width="16" height="16" />
                      </span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>

      {open && (
        <ServiceModal
          cat={open.cat}
          index={open.index}
          onSelect={(index) => setOpen({ cat: open.cat, index })}
          onClose={() => setOpen(null)}
          onQuote={(cat, name) => {
            window.location.href = quoteLink(cat, name);
          }}
        />
      )}
    </section>
  );
}
