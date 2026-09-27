"use client";

import { useEffect, useRef, useState } from "react";

// Shows a real photo from /public/images. If the file is missing or
// fails to load, shows the fallback instead (a drawing or an emoji),
// so the page never shows a broken-image icon.
export default function Photo({ src, alt, style, fallback }) {
  const [ok, setOk] = useState(true);
  const imgRef = useRef(null);

  // The image can fail before React is ready to hear about it,
  // so check once after the page loads as well.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setOk(false);
  }, []);

  if (!ok) return fallback;
  return <img ref={imgRef} src={src} alt={alt} style={style} onError={() => setOk(false)} />;
}
