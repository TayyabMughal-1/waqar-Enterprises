import { CONFIG } from "../config";
import { FACTS } from "../data/content";
import { whatsappLink } from "../utils/links";
import Photo from "./Photo";
import Reveal, { CountUp } from "./Reveal";
import { ArrowIcon, WhatsAppIcon } from "./Icons";

const TICKER = [
  "Measured on site",
  "Written quotation",
  "Own workshop",
  "MS · SS · Aluminium · Glass",
  "Installed by our team",
  "Free site visit",
];

export default function Hero() {
  return (
    <section className="hero">
      {/* Picture stage, framed like a drawing sheet */}
      <div className="stage">
        <span className="ruler ruler-top" aria-hidden="true" />
        <div className="stage-img">
          <Photo src="/images/hero.jpg" alt="Welder cutting steel box section in the workshop" eager />
          <span className="marker m1" aria-hidden="true" />
          <span className="marker m2" aria-hidden="true" />
        </div>
        <dl className="stage-meta" aria-hidden="true">
          <div><dt>Type</dt><dd>Steel · Aluminium · Glass</dd></div>
          <div><dt>Service</dt><dd>Measure · Fabricate · Install</dd></div>
          <div><dt>Contact</dt><dd>{CONFIG.phone}</dd></div>
        </dl>
        <span className="ruler ruler-bottom" aria-hidden="true" />
      </div>

      {/* Title bar */}
      <div className="hero-bar">
        <h1 className="anim-up">
          Steel gates, grills &amp; glass,
          <br />
          made to measure
        </h1>
        <div className="hero-bar-text anim-up" style={{ animationDelay: "120ms" }}>
          <p>
            We design, fabricate and install iron, steel, aluminium, glass and fiber glass work for homes, shops and
            factories. Send us your size and style, and we send you a clear written quotation.
          </p>
          <a className="text-link" href={whatsappLink(CONFIG.whatsappGreeting)} target="_blank" rel="noopener">
            <WhatsAppIcon width="14" height="14" /> WhatsApp {CONFIG.whatsappLabel}
          </a>
        </div>
        <a className="hero-bar-cta anim-up" style={{ animationDelay: "220ms" }} href="/quote/">
          <span>Get a free quote</span>
          <ArrowIcon width="18" height="18" />
        </a>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((k) => (
            <span key={k}>
              {TICKER.map((t) => (
                <span key={t}>
                  <i />
                  {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="stats">
        {FACTS.map((f, i) => (
          <Reveal className="stat" key={f.label} delay={i * 90}>
            <span className="mono">[{String(i + 1).padStart(2, "0")}]</span>
            <b>
              <CountUp value={f.value} />
            </b>
            <span>{f.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
