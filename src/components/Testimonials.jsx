import { TESTIMONIALS } from "../data/content";
import Reveal from "./Reveal";

// Review cards. `limit` shows only the first N (Home page).
export default function Testimonials({ limit }) {
  return (
    <div className="reviews">
      {TESTIMONIALS.slice(0, limit || undefined).map((r, i) => (
        <Reveal as="figure" className="review" key={r.text} delay={(i % 3) * 90}>
          <div className="stars" role="img" aria-label="5 out of 5">
            ★★★★★
          </div>
          <blockquote>“{r.text}”</blockquote>
          <figcaption>
            <b>{r.job}</b>
            <span>{r.who}</span>
            {r.sample && <span className="badge">Sample</span>}
          </figcaption>
        </Reveal>
      ))}
    </div>
  );
}
