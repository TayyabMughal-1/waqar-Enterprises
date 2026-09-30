import { useCallback, useMemo, useState } from "react";
import { GALLERY_FILTERS, PROJECTS } from "../data/content";
import { sceneFor } from "./Illustration";
import Photo from "./Photo";
import Modal, { CloseButton } from "./Modal";
import Reveal from "./Reveal";
import { ArrowIcon, ArrowLeftIcon } from "./Icons";

// Your own job photo (the project image field); the illustration shows until one is added
function Picture({ item }) {
  return <Photo key={item.image} src={item.image} alt={item.title} kind={sceneFor(item.cat, item.title)} />;
}

// Project grid with lightbox. `limit` shows only the first N projects and hides the filters (Home page).
export default function Gallery({ limit }) {
  const [filter, setFilter] = useState("all");
  const [openIdx, setOpenIdx] = useState(null);

  const items = useMemo(
    () =>
      PROJECTS.map((p, i) => ({ ...p, i }))
        .filter((p) => filter === "all" || p.cat === filter)
        .slice(0, limit || undefined),
    [filter, limit]
  );
  const filters = GALLERY_FILTERS.filter(([k]) => k === "all" || PROJECTS.some((p) => p.cat === k));

  const n = items.length;
  const go = useCallback((d) => setOpenIdx((j) => (j + d + n) % n), [n]);
  const onKey = useCallback((k) => (k === "ArrowLeft" ? go(-1) : k === "ArrowRight" ? go(1) : null), [go]);
  const close = useCallback(() => setOpenIdx(null), []);
  const current = openIdx !== null ? items[openIdx] : null;

  return (
    <>
      {!limit && (
        <Reveal className="chips" role="toolbar" aria-label="Filter projects">
          {filters.map(([k, label]) => (
            <button key={k} className="chip" aria-pressed={filter === k} onClick={() => setFilter(k)}>
              {label}
            </button>
          ))}
        </Reveal>
      )}

      <div className="project-grid" key={filter}>
        {items.map((p, j) => (
          <Reveal key={p.i} delay={(j % 3) * 90}>
            <button className="project" aria-label={`Open ${p.title}`} onClick={() => setOpenIdx(j)}>
              <span className="project-art">
                <Picture item={p} />
              </span>
              <span className="project-cap">
                <b>{p.title}</b>
                <small>{p.meta}</small>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {current && (
        <Modal onClose={close} onKey={onKey}>
          <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.title}>
            <CloseButton onClick={close} />
            <div className="lightbox-art">
              <Picture item={current} />
            </div>
            <div className="lightbox-bar">
              <button className="icon-btn" aria-label="Previous" onClick={() => go(-1)}>
                <ArrowLeftIcon width="18" height="18" />
              </button>
              <div>
                <b>{current.title}</b>
                <small>
                  {current.meta} · {openIdx + 1}/{n}
                </small>
              </div>
              <button className="icon-btn" aria-label="Next" onClick={() => go(1)}>
                <ArrowIcon width="18" height="18" />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
