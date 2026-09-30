import { CONFIG } from "../config";
import { NAV_LINKS } from "../data/content";
import { CATEGORIES } from "../data/services";
import { copyText, mapLink, servicesLink, telLink, whatsappLink } from "../utils/links";
import Logo from "./Logo";
import Reveal from "./Reveal";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";

// Round icon links to Facebook, Instagram and WhatsApp
export function SocialLinks() {
  const links = [
    [CONFIG.facebook, "Facebook", <FacebookIcon key="f" width="20" height="20" />],
    [CONFIG.instagram, "Instagram", <InstagramIcon key="i" width="20" height="20" />],
    [whatsappLink(CONFIG.whatsappGreeting), "WhatsApp", <WhatsAppIcon key="w" width="20" height="20" />],
  ];
  return (
    <div className="socials">
      {links.map(([href, label, icon]) => (
        <a key={label} href={href} target="_blank" rel="noopener" aria-label={label} title={label}>
          {icon}
        </a>
      ))}
    </div>
  );
}

// Large Facebook / Instagram cards for the Contact page
export function FollowUs() {
  return (
    <div className="follow">
      <Reveal>
        <a className="follow-card fb" href={CONFIG.facebook} target="_blank" rel="noopener">
          <span className="follow-icon"><FacebookIcon width="26" height="26" /></span>
          <span>
            <b>Facebook</b>
            <small>See our latest work and updates</small>
          </span>
          <span className="follow-go">Follow →</span>
        </a>
      </Reveal>
      <Reveal delay={90}>
        <a className="follow-card ig" href={CONFIG.instagram} target="_blank" rel="noopener">
          <span className="follow-icon"><InstagramIcon width="26" height="26" /></span>
          <span>
            <b>Instagram</b>
            <small>{CONFIG.instagramHandle}</small>
          </span>
          <span className="follow-go">Follow →</span>
        </a>
      </Reveal>
    </div>
  );
}

// Phone / WhatsApp / email / workshop cards
export function ContactCards({ toast }) {
  const cards = [
    {
      icon: <PhoneIcon width="22" height="22" />,
      label: "Phone",
      value: CONFIG.phone,
      actions: [
        <a key="c" href={telLink()}>Call</a>,
        <button key="p" type="button" onClick={() => copyText(CONFIG.phone, toast)}>Copy</button>,
      ],
    },
    {
      icon: <WhatsAppIcon width="22" height="22" />,
      label: "WhatsApp",
      value: CONFIG.whatsappLabel,
      actions: [<a key="w" href={whatsappLink(CONFIG.whatsappGreeting)} target="_blank" rel="noopener">Open chat</a>],
    },
    {
      icon: <MailIcon width="22" height="22" />,
      label: "Email",
      value: CONFIG.email,
      actions: [
        <a key="m" href={`mailto:${CONFIG.email}`}>Email</a>,
        <button key="p" type="button" onClick={() => copyText(CONFIG.email, toast)}>Copy</button>,
      ],
    },
    {
      icon: <PinIcon width="22" height="22" />,
      label: "Workshop",
      value: CONFIG.address,
      extra: CONFIG.hours,
      actions: [<a key="map" href={mapLink()} target="_blank" rel="noopener">Open in Maps</a>],
    },
  ];

  return (
    <div className="contact-grid">
      {cards.map((c, i) => (
        <Reveal className="contact-card" key={c.label} delay={i * 90}>
          <span className="contact-icon">{c.icon}</span>
          <span className="contact-label">{c.label}</span>
          <span className="contact-value">{c.value}</span>
          {c.extra && <span className="contact-extra">{c.extra}</span>}
          <span className="contact-actions">{c.actions}</span>
        </Reveal>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo sub={CONFIG.domain} />
            <p>Iron, steel, aluminium, glass and fiber glass fabrication and installation.</p>
            <SocialLinks />
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {CATEGORIES.slice(0, 5).map((c) => (
                <li key={c.key}>
                  <a href={servicesLink(c.key)}>{c.name}</a>
                </li>
              ))}
              <li>
                <a href="/services/">All services →</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              {NAV_LINKS.map(([id, href, label]) => (
                <li key={id}>
                  <a href={href}>{label}</a>
                </li>
              ))}
              <li>
                <a href="/quote/">Get a quote</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={telLink()}>{CONFIG.phone}</a></li>
              <li><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></li>
              <li>{CONFIG.address}</li>
              <li>{CONFIG.hours}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {CONFIG.companyName}. All rights reserved.</span>
          <span>{CONFIG.domain}</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a className="fab" href={whatsappLink(CONFIG.whatsappGreeting)} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <WhatsAppIcon width="26" height="26" />
    </a>
  );
}
