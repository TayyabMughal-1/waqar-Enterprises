import { useCallback } from "react";
import { CATEGORY_BY_KEY } from "../data/services";
import { whatsappLink } from "../utils/links";
import { sceneFor } from "./Illustration";
import Photo, { scenePhoto } from "./Photo";
import Modal, { CloseButton } from "./Modal";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "./Icons";

export default function ServiceModal({ cat, index, onSelect, onClose, onQuote }) {
  const c = CATEGORY_BY_KEY[cat];
  const [name, desc] = c.items[index];
  const close = useCallback(() => onClose(), [onClose]);

  return (
    <Modal onClose={close}>
      <div className="dialog" role="dialog" aria-modal="true" aria-label={name}>
        <CloseButton onClick={close} />
        <div className="dialog-art">
          <Photo key={name} src={scenePhoto(sceneFor(cat, name))} alt={name} kind={sceneFor(cat, name)} />
        </div>
        <div className="dialog-body">
          <p className="mono accent-text">{c.name}</p>
          <h3>{name}</h3>
          <p className="muted">{desc} Every piece is made to measure after a site visit.</p>

          <div>
            <p className="label">Typical options</p>
            <ul className="check-list">
              {c.spec.map((s) => (
                <li key={s}>
                  <CheckIcon width="16" height="16" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="btn-row">
            <button className="btn btn-primary" onClick={() => onQuote(cat, name)}>
              Get a quote for this <ArrowIcon width="16" height="16" />
            </button>
            <a
              className="btn btn-outline"
              target="_blank"
              rel="noopener"
              href={whatsappLink(`Assalam o Alaikum, I am interested in ${name} (${c.name}). Please share details and price.`)}
            >
              <WhatsAppIcon width="16" height="16" /> Ask on WhatsApp
            </a>
          </div>

          {c.items.length > 1 && (
            <div>
              <p className="label">More in {c.name}</p>
              <div className="chip-row">
                {c.items.map(([n], j) =>
                  j === index ? null : (
                    <button key={n} className="chip" onClick={() => onSelect(j)}>
                      {n}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
