"use client";

import { useEffect, useState } from "react";
import type { StoryChapter } from "@/types/mission";

/** Sticky chapter rail. Highlights the chapter currently on screen. */
export function ChapterNav({ chapters, accent }: { chapters: StoryChapter[]; accent: "moon" | "mars" }) {
  const [active, setActive] = useState(chapters[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as StoryChapter["id"]);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [chapters]);

  const activeColor = accent === "mars" ? "text-mars-300 border-mars-400" : "text-moon-300 border-moon-400";

  return (
    <nav aria-label="Story chapters" className="sticky top-24 hidden lg:block">
      <ol className="space-y-1 border-l border-white/10">
        {chapters.map((c, i) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              aria-current={active === c.id ? "step" : undefined}
              className={`-ml-px block border-l-2 py-2 pl-4 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                active === c.id ? activeColor : "border-transparent text-silver-600 hover:text-silver-200"
              }`}
            >
              <span className="mr-2 opacity-60">{String(i + 1).padStart(2, "0")}</span>
              {c.title.replace(/^The /, "")}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#timeline"
            className="-ml-px block border-l-2 border-transparent py-2 pl-4 font-mono text-xs uppercase tracking-[0.18em] text-silver-600 hover:text-silver-200"
          >
            <span className="mr-2 opacity-60">→</span>Timeline
          </a>
        </li>
        <li>
          <a
            href="#quiz"
            className="-ml-px block border-l-2 border-transparent py-2 pl-4 font-mono text-xs uppercase tracking-[0.18em] text-silver-600 hover:text-silver-200"
          >
            <span className="mr-2 opacity-60">→</span>Quiz
          </a>
        </li>
      </ol>
    </nav>
  );
}
