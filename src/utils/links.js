import { CONFIG } from "../config";

export const whatsappLink = (text) =>
  `https://wa.me/${CONFIG.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const telLink = () => `tel:${CONFIG.phone.replace(/\s/g, "")}`;

export const mapLink = () =>
  `https://www.google.com/maps/search/${encodeURIComponent(CONFIG.mapQuery)}`;

// Order form page, optionally pre-filled with a service
export const quoteLink = (cat, service) =>
  cat ? `/quote/?cat=${encodeURIComponent(cat)}&service=${encodeURIComponent(service)}` : "/quote/";

export const servicesLink = (cat) => (cat && cat !== "all" ? `/services/?cat=${cat}` : "/services/");

export async function copyText(text, toast) {
  try {
    await navigator.clipboard.writeText(text);
    toast?.("Copied");
  } catch {
    toast?.("Select the text and copy it manually");
  }
}
