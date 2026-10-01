import { useState } from "react";
import { PHOTO_VERSION } from "../data/photos";

// A photo that fills its frame. The version tag makes browsers fetch replaced photos
// instead of an old cached copy. A failed load (e.g. an interrupted request) is retried
// once; only then is a plain panel shown.
export default function Photo({ src, alt = "", eager = false }) {
  const [tries, setTries] = useState(0);
  if (!src || tries > 1) return <span className="photo-missing" role="img" aria-label={alt} />;
  const url = `${src}?v=${PHOTO_VERSION}${tries ? "&r=1" : ""}`;
  return (
    <img
      key={url}
      className="cover photo"
      src={url}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      onError={() => setTries((t) => t + 1)}
    />
  );
}
