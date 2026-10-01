import Reveal from "./Reveal";

// Section heading row: label + big uppercase title on the left, intro on the right.
export default function SectionHead({ kicker, title, children }) {
  return (
    <Reveal className={`sec-head${children ? "" : " sec-head-solo"}`}>
      <div className="sec-head-main">
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      {children && (
        <div className="sec-head-side">
          <p className="sec-intro">{children}</p>
          <span className="mono muted">[ Scroll to continue ]</span>
        </div>
      )}
    </Reveal>
  );
}
