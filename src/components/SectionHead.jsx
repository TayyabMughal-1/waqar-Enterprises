import Reveal from "./Reveal";

// Shared centred section heading: small label, title, optional intro line.
export default function SectionHead({ kicker, title, children }) {
  return (
    <Reveal className="sec-head">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {children && <p className="sec-intro">{children}</p>}
    </Reveal>
  );
}
