import { useState } from "react";

// A photo that fills its frame. If the file is missing, a plain grey panel is shown instead.
export default function Photo({ src, alt = "" }) {
  const [failed, setFailed] = useState(!src);
  if (failed) return <span className="photo-missing" role="img" aria-label={alt} />;
  return (
    <img className="cover photo" src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
  );
}
