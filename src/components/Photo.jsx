import { useState } from "react";
import { PHOTO_VERSION } from "../data/photos";

// A photo that fills its frame. If the file is missing, a plain grey panel is shown instead.
// The version tag makes browsers fetch replaced photos instead of showing an old cached copy.
export default function Photo({ src, alt = "", eager = false }) {
  const url = src ? `${src}?v=${PHOTO_VERSION}` : src;
  const [failed, setFailed] = useState(!src);
  if (failed) return <span className="photo-missing" role="img" aria-label={alt} />;
  return (
    <img
      className="cover photo"
      src={url}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
