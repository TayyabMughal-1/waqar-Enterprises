// Content blocks: Process, About, Audiences, FAQ.
import { CONFIG } from "../config";
import { AUDIENCES, FAQS, PROCESS, VALUES } from "../data/content";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { CheckIcon, PlusIcon } from "./Icons";

export function Process() {
  return (
    <section className="section section-soft">
      <div className="wrap">
        <SectionHead kicker="How we work" title="From your sketch to your site" />
        <ol className="steps">
          {PROCESS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 110}>
              <span className="step-num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section">
      <div className="wrap about">
        <Reveal className="about-copy">
          <p className="kicker">Who we are</p>
          <h2>Quality you can see from the street</h2>
          <p>
            A gate, a railing or a glass partition is judged with the eyes. That is why we take care over every weld,
            joint and finish, and why we measure on site before we cut anything.
          </p>
          <p>
            {CONFIG.companyName} works across iron, steel, aluminium, glass and fiber glass, so one team can handle the
            whole job: the main gate, the window grills, the balcony railing and the shower cabin.
          </p>
        </Reveal>
        <div className="values">
          {VALUES.map((v, i) => (
            <Reveal className="value" key={v.title} delay={i * 90}>
              <span className="value-icon">
                <CheckIcon width="18" height="18" />
              </span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Audiences() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead kicker="Who we work for" title="From homes to warehouses" />
        <div className="aud-grid">
          {AUDIENCES.map((a, i) => (
            <Reveal className="aud" key={a.tag} delay={(i % 5) * 80}>
              <span className="aud-tag">{a.tag}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <Reveal className="faq">
      {FAQS.map((f, i) => (
        <details key={f.q} open={i === 0}>
          <summary>
            {f.q}
            <PlusIcon width="20" height="20" />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </Reveal>
  );
}
