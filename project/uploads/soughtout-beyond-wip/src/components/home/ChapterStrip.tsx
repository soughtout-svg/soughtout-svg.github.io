import { Reveal } from "@/components/ui/Reveal";
import { CHAPTERS } from "@/data/archive/machines";

export function ChapterStrip() {
  return (
    <section id="chapters" className="flex flex-col gap-7 border-b border-ink px-[clamp(20px,4vw,56px)] py-12">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="m-0 text-[28px] font-medium tracking-[-.02em]">Every story has five chapters</h2>
        <span className="font-mono text-[13px] text-muted">Then a 3-question quiz</span>
      </div>
      <ol className="m-0 flex list-none flex-wrap gap-px border border-ink bg-ink p-0">
        {CHAPTERS.map(([title, q], i) => (
          <li key={title} className="flex flex-[1_1_160px] bg-paper">
            <Reveal delay={i * 0.08} className="flex flex-col gap-2 p-5">
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <span className="text-[19px] font-medium tracking-[-.01em]">{title}</span>
              <span className="text-[15px] leading-[1.45] text-ink-2">{q}</span>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
