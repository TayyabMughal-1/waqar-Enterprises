import { useEffect, useRef, useState } from "react";
import { CONFIG } from "../config";
import { CONTACT_FIELDS, FORM_GROUPS, groupFor } from "../data/orderForm";
import { CATEGORIES, CATEGORY_BY_KEY } from "../data/services";
import { copyText, whatsappLink } from "../utils/links";
import Reveal from "./Reveal";
import { ArrowIcon, ArrowLeftIcon, CheckIcon, UploadIcon, WhatsAppIcon } from "./Icons";

// 4-step requirement form: service → details → contact → review & send on WhatsApp.
// `prefill` = { cat, name, nonce } set when a visitor clicks "Get a quote for this".

const STEPS = [
  ["Service", "Choose what you need. The form adapts to it."],
  ["Details", "Sizes, material and finish preferences."],
  ["Contact", "Where the site is and how to reach you."],
  ["Send", "Review, then send it on WhatsApp."],
];

function Field({ f, value, onChange, error }) {
  const id = `f_${f.id}`;
  const err = error ? <span className="field-msg">{error}</span> : null;

  if (f.type === "pills") {
    return (
      <div className="field">
        <span className="field-label">{f.label}</span>
        <div className="pills" role="radiogroup" aria-label={f.label}>
          {f.opts.map((o, i) => (
            <label key={o}>
              <input type="radio" name={id} id={`${id}_${i}`} value={o} checked={value === o} onChange={() => onChange(o)} />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }
  if (f.type === "sel") {
    return (
      <div className={`field${error ? " has-error" : ""}`}>
        <label className="field-label" htmlFor={id}>{f.label}</label>
        <select id={id} value={value || ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select</option>
          {f.opts.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        {err}
      </div>
    );
  }
  if (f.type === "num") {
    return (
      <div className="field">
        <label className="field-label" htmlFor={id}>{f.label}</label>
        <div className="unit">
          <input id={id} type="number" inputMode="decimal" min="0" step="0.5" value={value || ""} onChange={(e) => onChange(e.target.value)} />
          {f.unit && <span>{f.unit}</span>}
        </div>
      </div>
    );
  }
  return (
    <div className={`field${error ? " has-error" : ""}`}>
      <label className="field-label" htmlFor={id}>{f.label}</label>
      <input id={id} type="text" placeholder={f.placeholder} value={value || ""} onChange={(e) => onChange(e.target.value)} />
      {err}
    </div>
  );
}

export default function OrderForm({ prefill, toast }) {
  const [step, setStep] = useState(0);
  const [cat, setCat] = useState("");
  const [svc, setSvc] = useState("");
  const [vals, setVals] = useState({});
  const [file, setFile] = useState("");
  const [errors, setErrors] = useState({});
  const [dragOver, setDragOver] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (!prefill) return;
    setCat(prefill.cat);
    setSvc(prefill.name);
    setVals({});
    setStep(1);
  }, [prefill]);

  const set = (id) => (v) => setVals((s) => ({ ...s, [id]: v }));
  const group = cat && svc ? FORM_GROUPS[groupFor(cat, svc)] : null;

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!cat) e.cat = "Choose a category";
      else if (!svc) e.svc = "Choose a service";
    }
    if (step === 2) {
      if (!vals.name?.trim()) e.name = "Enter your name";
      else if (!/^[+\d][\d\s-]{9,}$/.test(vals.phone?.trim() || "")) e.phone = "Enter a phone number, e.g. 0300 1234567";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    setStep((s) => s + 1);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  const back = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const summary = () => {
    const lines = [`New requirement – ${CONFIG.companyName}`, "", `Service: ${svc} (${CATEGORY_BY_KEY[cat].name})`];
    group.fields.forEach((f) => vals[f.id] && lines.push(`${f.label}: ${vals[f.id]}${f.unit ? " " + f.unit : ""}`));
    if (file) lines.push(`Photo/drawing: ${file} (attached separately)`);
    lines.push("", `Name: ${vals.name}`, `Phone: ${vals.phone}`);
    if (vals.city) lines.push(`Site: ${vals.city}`);
    if (vals.when) lines.push(`Timeline: ${vals.when}`);
    if (vals.notes) lines.push(`Notes: ${vals.notes}`);
    return lines.join("\n");
  };

  const catObj = CATEGORY_BY_KEY[cat];

  return (
    <section className="section section-soft" id="order">
      <div className="wrap order">
        <Reveal className="order-side">
          <p className="kicker">Get a quote</p>
          <h2>Tell us what you need</h2>
          <p className="sec-intro">
            Answer a few quick questions about your job. Your details are sent to us on WhatsApp, ready to quote. No
            back-and-forth calls.
          </p>
          <ul className="order-points">
            {["Takes about 2 minutes", "Only the questions your service needs", "Free site visit for measurement"].map((t) => (
              <li key={t}>
                <CheckIcon width="16" height="16" /> {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <form className="form-card" ref={formRef} noValidate onSubmit={(e) => { e.preventDefault(); next(); }}>
          <div className="form-top">
            <span className="form-step">Step {step + 1} of 4 · {STEPS[step][0]}</span>
            <span className="form-bar" aria-hidden="true">
              <i style={{ width: `${((step + 1) / 4) * 100}%` }} />
            </span>
          </div>

          {step === 0 && (
            <>
              <fieldset className="fieldset">
                <legend>Choose a service</legend>
                <div className={`field${errors.cat ? " has-error" : ""}`}>
                  <label className="field-label" htmlFor="f_cat">Service category</label>
                  <select id="f_cat" value={cat} onChange={(e) => { setCat(e.target.value); setSvc(""); setVals({}); }}>
                    <option value="">Select a category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.key} value={c.key}>{c.name}</option>
                    ))}
                  </select>
                  {errors.cat && <span className="field-msg">{errors.cat}</span>}
                </div>
                <div className={`field${errors.svc ? " has-error" : ""}`}>
                  <label className="field-label" htmlFor="f_svc">Specific service</label>
                  <select id="f_svc" value={svc} disabled={!catObj} onChange={(e) => { setSvc(e.target.value); setVals({}); }}>
                    <option value="">{catObj ? "Select a service" : "Choose a category first"}</option>
                    {catObj?.items.map(([n]) => <option key={n}>{n}</option>)}
                  </select>
                  {errors.svc && <span className="field-msg">{errors.svc}</span>}
                </div>
                {group && <p className="hint">Next we ask about {group.title.toLowerCase()}.</p>}
              </fieldset>
              <div className="form-nav">
                <span />
                <button type="submit" className="btn btn-primary">Continue <ArrowIcon width="16" height="16" /></button>
              </div>
            </>
          )}

          {step === 1 && group && (
            <>
              <fieldset className="fieldset">
                <legend>{svc}</legend>
                {(() => {
                  const nums = group.fields.filter((f) => f.type === "num");
                  return (
                    <div className={`field-row${nums.length === 3 ? " cols-3" : ""}`}>
                      {nums.map((f) => <Field key={f.id} f={f} value={vals[f.id]} onChange={set(f.id)} />)}
                    </div>
                  );
                })()}
                {group.fields.filter((f) => f.type !== "num").map((f) => (
                  <Field key={f.id} f={f} value={vals[f.id]} onChange={set(f.id)} />
                ))}
                <div className="field">
                  <span className="field-label">Photo or drawing (optional)</span>
                  <label
                    className={`drop${dragOver ? " is-over" : ""}`}
                    htmlFor="f_file"
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); e.dataTransfer.files[0] && setFile(e.dataTransfer.files[0].name); }}
                  >
                    <input type="file" id="f_file" accept="image/*,.pdf" hidden onChange={(e) => e.target.files[0] && setFile(e.target.files[0].name)} />
                    <UploadIcon width="20" height="20" />
                    {file ? <span>Selected: <b>{file}</b></span> : <span><b>Choose a file</b> or drop it here</span>}
                  </label>
                </div>
              </fieldset>
              <div className="form-nav">
                <button type="button" className="btn btn-outline" onClick={back}><ArrowLeftIcon width="16" height="16" /> Back</button>
                <button type="submit" className="btn btn-primary">Continue <ArrowIcon width="16" height="16" /></button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <fieldset className="fieldset">
                <legend>Your details</legend>
                <div className="field-row">
                  <Field f={{ id: "name", label: "Your name", type: "text" }} value={vals.name} onChange={set("name")} error={errors.name} />
                  <Field f={{ id: "phone", label: "Phone / WhatsApp", type: "text", placeholder: "03XX XXXXXXX" }} value={vals.phone} onChange={set("phone")} error={errors.phone} />
                </div>
                <div className="field-row">
                  <Field f={{ id: "city", label: "Site city / area", type: "text", placeholder: "e.g. DHA Phase 5, Lahore" }} value={vals.city} onChange={set("city")} />
                  <Field f={CONTACT_FIELDS.when} value={vals.when} onChange={set("when")} />
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="f_notes">Anything else?</label>
                  <textarea id="f_notes" placeholder="Design ideas, reference, access notes" value={vals.notes || ""} onChange={(e) => set("notes")(e.target.value)} />
                </div>
              </fieldset>
              <div className="form-nav">
                <button type="button" className="btn btn-outline" onClick={back}><ArrowLeftIcon width="16" height="16" /> Back</button>
                <button type="submit" className="btn btn-primary">Review request <ArrowIcon width="16" height="16" /></button>
              </div>
            </>
          )}

          {step === 3 && (() => {
            const txt = summary();
            return (
              <>
                <div className="fieldset">
                  <div className="ready">
                    <span><CheckIcon width="18" height="18" /></span>
                    Your requirement is ready to send
                  </div>
                  <p className="muted">
                    Send it on WhatsApp and our team will reply with a quotation. {file && "Attach your photo in the chat as well."}
                  </p>
                  <pre className="summary">{txt}</pre>
                </div>
                <div className="form-nav">
                  <button type="button" className="btn btn-outline" onClick={back}><ArrowLeftIcon width="16" height="16" /> Edit</button>
                  <span className="btn-row">
                    <button type="button" className="btn btn-outline" onClick={() => copyText(txt, toast)}>Copy details</button>
                    <a className="btn btn-wa" target="_blank" rel="noopener" href={whatsappLink(txt)}>
                      <WhatsAppIcon width="16" height="16" /> Send on WhatsApp
                    </a>
                  </span>
                </div>
                <p className="hint">Prefer email? Copy the details and send them to {CONFIG.email}.</p>
              </>
            );
          })()}
        </form>
      </div>
    </section>
  );
}
