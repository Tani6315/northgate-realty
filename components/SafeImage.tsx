"use client";

import { useEffect, useRef, useState } from "react";

// An <img> that never shows a broken picture:
// - `src` can be one URL or a list; if one fails, the next is tried.
// - When every URL fails, it shows the `initials` (if given) or a soft tinted block.
export default function SafeImage({
  src,
  alt,
  className = "",
  eager = false,
  initials,
  initialsClass = "text-5xl",
}: {
  src: string | string[];
  alt: string;
  className?: string;
  eager?: boolean;
  initials?: string;
  initialsClass?: string;
}) {
  const sources = Array.isArray(src) ? src : [src];
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLImageElement>(null);
  const current = sources[index];
  const failed = index >= sources.length;
  const next = () => setIndex((i) => i + 1);

  // Start again if the image list changes (e.g. switching gallery photos).
  const key = sources.join("|");
  useEffect(() => setIndex(0), [key]);

  // The page is pre-rendered as HTML, so a photo can fail before React is
  // ready to hear about it. Check on mount and whenever the source changes.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) next();
  }, [current]);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-sage to-line font-display font-bold text-forest ${className}`}
      >
        {initials && <span className={initialsClass}>{initials}</span>}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      key={current}
      src={current}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onError={next}
      className={`object-cover ${className}`}
    />
  );
}
