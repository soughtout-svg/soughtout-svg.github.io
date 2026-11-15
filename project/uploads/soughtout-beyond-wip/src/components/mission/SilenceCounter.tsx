"use client";

import { useEffect, useState } from "react";

/**
 * Counts the days since a machine's last signal, live, in the visitor's browser.
 * Computed after mount so the server render and browser render always match.
 */
export function SilenceCounter({
  sinceISO,
  label,
  accent,
}: {
  sinceISO: string;
  label: string;
  accent: "moon" | "mars";
}) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setDays(Math.floor((Date.now() - new Date(sinceISO).getTime()) / 86_400_000));
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, [sinceISO]);

  return (
    <div>
      <p
        className={`font-display text-5xl tabular-nums sm:text-6xl ${accent === "mars" ? "text-mars-300" : "text-moon-300"}`}
        aria-live="polite"
      >
        {days === null ? "—" : days.toLocaleString("en-US")}
      </p>
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-silver-400">{label}</p>
    </div>
  );
}
