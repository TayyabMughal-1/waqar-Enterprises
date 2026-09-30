import { CONFIG } from "../config";

// Brand lock-up: the WE logo (public/logo-mark.png) + company name.
export default function Logo({ sub }) {
  return (
    <a className="logo" href="/" aria-label={`${CONFIG.companyName} home`}>
      <img className="mark" src="/logo-mark.png" alt="" width="90" height="40" />
      <span className="logo-txt">
        <b>{CONFIG.companyName}</b>
        <small>{sub || CONFIG.tagline}</small>
      </span>
    </a>
  );
}
