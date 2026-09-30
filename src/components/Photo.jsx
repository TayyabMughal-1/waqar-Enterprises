import { useState } from "react";
import Illustration from "./Illustration";

// Shows a real photo; if the file is missing it falls back to the illustration for `kind`.
// Photos live in public/images/ (see public/images/README.txt for the file names).
export const scenePhoto = (scene) => `/images/services/${scene}.jpg`;

export default function Photo({ src, alt = "", kind }) {
  const [failed, setFailed] = useState(!src);
  if (failed) return <Illustration kind={kind} />;
  return <img className="cover photo" src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}
