import type { ReactNode } from "react";

interface Props {
  /** Small mono label above the title, like a museum placard code. */
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2";
  accent?: "moon" | "mars" | "signal";
}

const accentClass = {
  moon: "text-moon-400",
  mars: "text-mars-400",
  signal: "text-signal",
};

export function SectionHeading({ eyebrow, title, intro, as = "h2", accent = "moon" }: Props) {
  const Tag = as;
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className={`mb-3 font-mono text-xs uppercase tracking-[0.3em] ${accentClass[accent]}`}>{eyebrow}</p>
      )}
      <Tag className={`font-display leading-[0.95] ${as === "h1" ? "text-5xl sm:text-7xl" : "text-4xl sm:text-5xl"}`}>
        {title}
      </Tag>
      {intro && <p className="mt-5 text-lg leading-relaxed text-silver-200">{intro}</p>}
    </div>
  );
}
