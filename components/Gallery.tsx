"use client";

import { useState } from "react";
import SafeImage from "./SafeImage";

export default function Gallery({ photos, title }: { photos: string[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <SafeImage
        key={active}
        src={photos[active]}
        alt={`${title}, photo ${active + 1} of ${photos.length}`}
        eager
        className="aspect-[16/10] w-full rounded-2xl"
      />
      <div className="mt-3 grid grid-cols-4 gap-3">
        {photos.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-pressed={active === i}
            className={`overflow-hidden rounded-lg ring-2 ring-offset-2 transition ${
              active === i ? "ring-forest" : "ring-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <SafeImage src={src.replace("w=1200", "w=400")} alt="" className="aspect-[4/3] w-full" />
          </button>
        ))}
      </div>
    </div>
  );
}
