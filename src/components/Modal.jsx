import { useEffect, useRef } from "react";

// Full-screen overlay. Closes on Escape, backdrop click or the × button.
// `onKey` receives other key presses (used for arrow keys in the lightbox).
export default function Modal({ onClose, onKey, children }) {
  const ref = useRef(null);
  const handlers = useRef({ onClose, onKey });
  handlers.current = { onClose, onKey };

  useEffect(() => {
    const prevFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector("button, a")?.focus();
    const handler = (e) => {
      if (e.key === "Escape") handlers.current.onClose();
      else handlers.current.onKey?.(e.key);
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handler);
      prevFocus?.focus?.();
    };
  }, []);

  return (
    <div className="overlay" ref={ref} onClick={(e) => e.target === e.currentTarget && onClose()}>
      {children}
    </div>
  );
}

export function CloseButton({ onClick }) {
  return (
    <button className="close" aria-label="Close" onClick={onClick}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    </button>
  );
}
