import type { StoryChapter } from "@/types/mission";
import { Reveal } from "@/components/ui/Reveal";

export function StoryChapterSection({
  chapter,
  index,
  accent,
}: {
  chapter: StoryChapter;
  index: number;
  accent: "moon" | "mars";
}) {
  const accentText = accent === "mars" ? "text-mars-400" : "text-moon-400";
  const isFinal = chapter.id === "final-signal";

  return (
    <section id={chapter.id} className="scroll-mt-24 py-14 first:pt-0" aria-labelledby={`${chapter.id}-title`}>
      <Reveal>
        <p className={`font-mono text-xs uppercase tracking-[0.3em] ${accentText}`}>
          Chapter {String(index + 1).padStart(2, "0")}
        </p>
        <h2 id={`${chapter.id}-title`} className="mt-2 font-display text-4xl sm:text-5xl">
          {chapter.title}
        </h2>
      </Reveal>

      <div className={`mt-6 space-y-5 text-lg leading-relaxed text-silver-200 ${isFinal ? "border-l-2 border-signal/40 pl-6" : ""}`}>
        {chapter.body.map((p, i) => (
          <Reveal key={i} delay={0.05 * i}>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>

      {chapter.stats && (
        <Reveal delay={0.1}>
          <dl className="mt-8 grid grid-cols-2 gap-4">
            {chapter.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-space-900/60 p-5">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-3xl sm:text-4xl">{s.value}</span>
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.18em] text-silver-400">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}
    </section>
  );
}
