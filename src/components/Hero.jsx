import { CONFIG } from "../config";
import { FACTS } from "../data/content";
import { whatsappLink } from "../utils/links";
import Photo from "./Photo";
import Reveal, { CountUp } from "./Reveal";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "./Icons";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="pill-label anim-up">
            <span className="dot" /> Free site visit for measurement
          </p>
          <h1 className="anim-up" style={{ animationDelay: "80ms" }}>
            Steel gates, grills &amp; glass, <span className="accent">made to measure.</span>
          </h1>
          <p className="hero-lede anim-up" style={{ animationDelay: "160ms" }}>
            We design, fabricate and install iron, steel, aluminium, glass and fiber glass work for homes, shops and
            factories. Send us your size and style, and we send you a clear quotation.
          </p>
          <div className="hero-cta anim-up" style={{ animationDelay: "240ms" }}>
            <a className="btn btn-primary btn-lg" href="/quote/">
              Get a free quote <ArrowIcon width="18" height="18" />
            </a>
            <a className="btn btn-outline btn-lg" href={whatsappLink(CONFIG.whatsappGreeting)} target="_blank" rel="noopener">
              <WhatsAppIcon width="18" height="18" /> WhatsApp us
            </a>
          </div>
          <ul className="hero-checks anim-up" style={{ animationDelay: "320ms" }}>
            {["Measured on site", "Written quotation", "Installed by our team"].map((t) => (
              <li key={t}>
                <CheckIcon width="16" height="16" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-art anim-fade" aria-hidden="true">
          <Photo src="/images/hero.jpg" alt="Welder cutting steel box section in the workshop" eager />
          <div className="float-tag">
            <b>Our own workshop</b>
            <span>Cut · Weld · Finish · Install</span>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="stats">
          {FACTS.map((f, i) => (
            <Reveal className="stat" key={f.label} delay={i * 90}>
              <b>
                <CountUp value={f.value} />
              </b>
              <span>{f.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
