import { useEffect, useMemo, useRef, useState } from "react";
import { CONFIG } from "../config";
import { ESTIMATES, MEASURE_LABELS, MIN_JOB, PRICES_UPDATED } from "../data/pricing";
import { quoteLink, whatsappLink } from "../utils/links";
import Photo from "./Photo";
import { ArrowIcon, CheckIcon, PlusIcon, WhatsAppIcon } from "./Icons";

const FT_PER_M = 3.28084;
const SAVE_KEY = "we-estimate-items";
const fmt = (n) => "Rs " + Math.round(n).toLocaleString("en-PK");
// A price range that only breaks between the two amounts, never inside one
const Range = ({ lo, hi }) => (
  <>
    <span className="nowrap">{fmt(lo)}</span> <span className="dash">–</span> <span className="nowrap">{fmt(hi)}</span>
  </>
);
const round500 = (n) => Math.round(n / 500) * 500;
const trim = (n) => String(Math.round(n * 100) / 100);

// Smoothly animates a number towards its new value
function useTween(value, ms = 450) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = value;
      return setShown(value);
    }
    const start = performance.now();
    const a = from.current;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / ms);
      const v = a + (value - a) * (1 - Math.pow(1 - p, 3));
      setShown(v);
      from.current = v;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, ms]);
  return shown;
}

function NumberField({ id, label, unit, value, onChange }) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>{label}</label>
      <div className="unit">
        <input id={id} type="number" inputMode="decimal" min="0" step="0.5" value={value} onChange={(e) => onChange(e.target.value)} />
        <span>{unit}</span>
      </div>
    </div>
  );
}

// Price one configured job. Sizes a/b are in feet.
function priceJob(job, a, b, qty, opts, extras) {
  const size = job.measure === "length" ? a : a * b;
  const chosen = job.options.map((o) => o.choices[opts[o.id] ?? 0]);
  const mult = chosen.reduce((x, [, k]) => x * k, 1);
  const rateLow = job.rate[0] * mult;
  const rateHigh = job.rate[1] * mult;
  const picked = job.extras.filter((x) => extras[x.id]);
  const extraLow = picked.reduce((s, x) => s + x.price[0], 0);
  const extraHigh = picked.reduce((s, x) => s + x.price[1], 0);
  const unitLow = size * rateLow + extraLow;
  const unitHigh = size * rateHigh + extraHigh;
  const valid = size > 0 && qty > 0;
  return {
    size,
    chosen,
    rateLow,
    rateHigh,
    picked,
    unitLow,
    unitHigh,
    low: valid ? round500(unitLow * qty) : 0,
    high: valid ? round500(unitHigh * qty) : 0,
    valid,
  };
}

export default function Estimator() {
  const [typeId, setTypeId] = useState(ESTIMATES[0].id);
  const job = ESTIMATES.find((e) => e.id === typeId);
  const m = MEASURE_LABELS[job.measure];

  const [units, setUnits] = useState("ft"); // "ft" | "m"
  const [a, setA] = useState(String(job.presets[1][1]));
  const [b, setB] = useState(String(job.presets[1][2]));
  const [qty, setQty] = useState(1);
  const [opts, setOpts] = useState({});
  const [extras, setExtras] = useState({});
  const [items, setItems] = useState([]);
  const [added, setAdded] = useState(false);

  // After loading: job type from the URL (?type=ms-gate or ?cat=iron) and any saved list
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const start = ESTIMATES.find((e) => e.id === q.get("type")) || ESTIMATES.find((e) => e.cat === q.get("cat"));
    if (start) applyType(start, "ft");
    try {
      const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || "[]");
      if (Array.isArray(saved)) setItems(saved);
    } catch {
      /* storage unavailable */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const toUnits = (ft, u) => (u === "m" ? trim(ft / FT_PER_M) : String(ft));
  const toFeet = (v) => {
    const n = Math.max(0, parseFloat(v) || 0);
    return units === "m" ? n * FT_PER_M : n;
  };

  function applyType(next, u = units) {
    const [, pa, pb] = next.presets[1];
    setTypeId(next.id);
    setA(toUnits(pa, u));
    setB(toUnits(pb, u));
    setQty(1);
    setOpts({});
    setExtras({});
  }

  const chooseType = (id) => {
    applyType(ESTIMATES.find((e) => e.id === id));
    window.history.replaceState(null, "", `/estimator/?type=${id}`);
  };

  const switchUnits = (u) => {
    if (u === units) return;
    const fa = toFeet(a);
    const fb = toFeet(b);
    setUnits(u);
    setA(toUnits(Math.round(fa * 100) / 100, u));
    setB(toUnits(Math.round(fb * 100) / 100, u));
  };

  const usePreset = ([, pa, pb]) => {
    setA(toUnits(pa, units));
    setB(toUnits(pb, units));
  };

  const fa = toFeet(a);
  const fb = toFeet(b);
  const result = useMemo(() => priceJob(job, fa, fb, qty, opts, extras), [job, fa, fb, qty, opts, extras]);

  const sizeText =
    job.measure === "length"
      ? `${trim(fa)} running ft`
      : `${trim(fa)} × ${trim(fb)} ft = ${trim(result.size)} sq ft`;
  const sizeMetric =
    job.measure === "length" ? `${trim(fa / FT_PER_M)} m` : `${trim(result.size / (FT_PER_M * FT_PER_M))} m²`;

  const summaryLines = [
    `${job.label}${qty > 1 ? ` × ${qty}` : ""}`,
    `Size: ${sizeText}`,
    ...job.options.map((o, i) => `${o.label}: ${result.chosen[i][0]}`),
    ...result.picked.map((x) => `+ ${x.label}`),
  ];

  const addItem = () => {
    if (!result.valid) return;
    setItems((list) => [
      ...list,
      { id: Date.now(), title: summaryLines[0], lines: summaryLines.slice(1), low: result.low, high: result.high },
    ]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };
  const removeItem = (id) => setItems((list) => list.filter((it) => it.id !== id));

  // Totals: the saved list, or just the current item if the list is empty
  const listLow = items.reduce((s, it) => s + it.low, 0);
  const listHigh = items.reduce((s, it) => s + it.high, 0);
  const hasList = items.length > 0;
  const totalLow = Math.max(hasList ? listLow : result.low, result.valid || hasList ? MIN_JOB : 0);
  const totalHigh = Math.max(hasList ? listHigh : result.high, result.valid || hasList ? MIN_JOB : 0);
  const belowMin = (hasList ? listHigh : result.high) > 0 && (hasList ? listHigh : result.high) < MIN_JOB;

  const low = useTween(totalLow);
  const high = useTween(totalHigh);

  const message = [
    `Price estimate – ${CONFIG.companyName}`,
    "",
    ...(hasList
      ? items.flatMap((it, i) => [`${i + 1}. ${it.title}`, ...it.lines.map((l) => `   ${l}`), `   ${fmt(it.low)} – ${fmt(it.high)}`, ""])
      : [...summaryLines, ""]),
    `Estimated total: ${fmt(totalLow)} – ${fmt(totalHigh)}`,
    "",
    "Please confirm the price and arrange a site visit.",
  ].join("\n");

  return (
    <section className="section section-soft">
      <div className="wrap estimator">
        <div className="est-form">
          <div className="est-step">
            <h2><span>1</span> What do you need?</h2>
            <div className="est-types" role="radiogroup" aria-label="Type of work">
              {ESTIMATES.map((e) => (
                <button key={e.id} type="button" role="radio" aria-checked={e.id === typeId} className="est-type" onClick={() => chooseType(e.id)}>
                  {e.label}
                </button>
              ))}
            </div>
          </div>

          <div className="est-step">
            <div className="est-step-head">
              <h2><span>2</span> Size</h2>
              <div className="est-units" role="radiogroup" aria-label="Units">
                {[["ft", "Feet"], ["m", "Metres"]].map(([u, label]) => (
                  <button key={u} type="button" role="radio" aria-checked={units === u} onClick={() => switchUnits(u)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="est-presets">
              <span className="field-label">Common sizes</span>
              <div className="chip-row">
                {job.presets.map((p) => (
                  <button key={p[0]} type="button" className="chip" onClick={() => usePreset(p)}>
                    {p[0]} <small>{job.measure === "length" ? `${p[1]} ft` : `${p[1]}×${p[2]} ft`}</small>
                  </button>
                ))}
              </div>
            </div>
            <div className={`field-row${job.measure === "length" ? "" : " cols-3"}`}>
              <NumberField id="est-a" label={m.a} unit={units} value={a} onChange={setA} />
              {job.measure !== "length" && <NumberField id="est-b" label={m.b} unit={units} value={b} onChange={setB} />}
              <div className="field">
                <span className="field-label">Quantity</span>
                <div className="stepper">
                  <button type="button" aria-label="Fewer" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                  <output aria-live="polite">{qty}</output>
                  <button type="button" aria-label="More" onClick={() => setQty((q) => Math.min(99, q + 1))}>+</button>
                </div>
              </div>
            </div>
            <p className="hint">
              {result.valid ? `${sizeText} (${sizeMetric}). ` : ""}Rough sizes are fine; we measure exactly on site.
            </p>
          </div>

          <div className="est-step" key={job.id}>
            <h2><span>3</span> Options</h2>
            {job.options.map((o) => (
              <div className="field" key={o.id}>
                <span className="field-label">{o.label}</span>
                <div className="pills" role="radiogroup" aria-label={o.label}>
                  {o.choices.map(([name], i) => (
                    <label key={name}>
                      <input type="radio" name={`${job.id}-${o.id}`} checked={(opts[o.id] ?? 0) === i} onChange={() => setOpts((s) => ({ ...s, [o.id]: i }))} />
                      <span>{name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            {job.extras.map((x) => (
              <label className="est-extra" key={x.id}>
                <input type="checkbox" checked={!!extras[x.id]} onChange={(e) => setExtras((s) => ({ ...s, [x.id]: e.target.checked }))} />
                <span className="est-check"><CheckIcon width="14" height="14" /></span>
                <span>
                  <b>{x.label}</b>
                  <small>+ {fmt(x.price[0])} – {fmt(x.price[1])} each</small>
                </span>
              </label>
            ))}
          </div>
        </div>

        <aside className="est-result" aria-live="polite">
          <div className="est-photo" key={job.id}>
            <Photo src={job.photo} alt={job.label} />
            <span>{job.label}</span>
          </div>

          <div className="est-body">
            <div className="est-this">
              <div>
                <p className="est-label">{hasList ? "This item" : "Building a bigger job?"}</p>
                {hasList ? (
                  <p className="est-item-price">{result.valid ? <Range lo={result.low} hi={result.high} /> : "Enter a size"}</p>
                ) : (
                  <p className="est-each">Add this item, then add more (gate, windows, grills…) for one total.</p>
                )}
                {result.valid && qty > 1 && (
                  <p className="est-each">
                    <Range lo={result.unitLow} hi={result.unitHigh} /> each
                  </p>
                )}
              </div>
              <button type="button" className={`est-add${added ? " is-added" : ""}`} onClick={addItem} disabled={!result.valid}>
                {added ? <><CheckIcon width="16" height="16" /> Added</> : <><PlusIcon width="16" height="16" /> Add to estimate</>}
              </button>
            </div>

            {result.valid && (
              <dl className="est-lines">
                <div><dt>Size</dt><dd>{sizeText}{qty > 1 ? ` × ${qty}` : ""}</dd></div>
                <div>
                  <dt>Rate</dt>
                  <dd>{fmt(result.rateLow)} – {fmt(result.rateHigh)} / {job.measure === "length" ? "running ft" : "sq ft"}</dd>
                </div>
                {result.picked.map((x) => (
                  <div key={x.id}><dt>{x.label}</dt><dd>{fmt(x.price[0])} – {fmt(x.price[1])}</dd></div>
                ))}
              </dl>
            )}

            {hasList && (
              <div className="est-list">
                <div className="est-list-head">
                  <p className="est-label">Your estimate · {items.length} item{items.length > 1 ? "s" : ""}</p>
                  <button type="button" onClick={() => setItems([])}>Clear</button>
                </div>
                <ul>
                  {items.map((it) => (
                    <li key={it.id}>
                      <span>
                        <b>{it.title}</b>
                        <small>{fmt(it.low)} – {fmt(it.high)}</small>
                      </span>
                      <button type="button" aria-label={`Remove ${it.title}`} onClick={() => removeItem(it.id)}>×</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="est-total-box">
              <p className="est-label">{hasList ? "Estimated total" : "Estimated price"}</p>
              <p className="est-total">
                {totalHigh > 0 ? (
                  <Range lo={low} hi={high} />
                ) : (
                  "—"
                )}
              </p>
              <p className="est-sub">
                Fabrication + installation{belowMin ? ` · minimum job ${fmt(MIN_JOB)}` : ""}
              </p>
            </div>

            <div className="est-actions">
              <a className="btn btn-primary" href={quoteLink(job.cat, job.service)}>
                Get exact quote <ArrowIcon width="16" height="16" />
              </a>
              <a className="btn btn-wa" href={whatsappLink(message)} target="_blank" rel="noopener">
                <WhatsAppIcon width="16" height="16" /> Send {hasList ? "estimate" : "this"} on WhatsApp
              </a>
            </div>
            <p className="est-note">
              A rough guide based on typical {PRICES_UPDATED} rates. The final price depends on exact measurements,
              design and site conditions, and is confirmed in writing after a free site visit.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
