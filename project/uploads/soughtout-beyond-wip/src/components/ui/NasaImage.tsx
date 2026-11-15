"use client";

import { useState } from "react";
import type { MissionImage } from "@/types/mission";

/**
 * Hotlinked NASA image with a graceful fallback. If the image can't load
 * (offline, blocked network), we show a styled panel with the caption instead
 * of a broken image icon.
 */
export function NasaImage({
  image,
  accent,
  className = "",
  priority = false,
}: {
  image: MissionImage;
  accent: "moon" | "mars";
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={`flex items-end bg-gradient-to-br p-6 ${
          accent === "mars" ? "from-mars-500/30 via-space-800 to-space-900" : "from-moon-500/25 via-space-800 to-space-900"
        } ${className}`}
      >
        <p className="max-w-sm font-mono text-xs text-silver-400">{image.alt}</p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image.src}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
