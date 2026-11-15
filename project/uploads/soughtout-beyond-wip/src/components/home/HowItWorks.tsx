import { Reveal } from "@/components/ui/Reveal";

const POINTS = [
  [
    "01 · The idea",
    "Robots and hardware are still sitting on the Moon, Mars and out in space. Most people don’t know they’re there.",
  ],
  [
    "02 · How it connects",
    "Each machine tells its own story in five chapters: why it went, how it got there, what it found, how it ended and why it still matters.",
  ],
  [
    "03 · Who it’s for",
    "Students and curious readers. Short chapters, a map of where each one rests and a quick quiz make the science easy to remember.",
  ],
  ["04 · Why trust it", "Every fact is checked against NASA, JPL or NSSDCA mission pages, and the sources are listed."],
];

export function HowItWorks() {
  return (
    <section id="how" className="flex scroll-mt-0 flex-wrap gap-px border-b border-ink bg-ink">
      <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-2.5 bg-paper px-[clamp(20px,4vw,56px)] py-[clamp(32px,4vw,48px)]">
        <span className="font-mono text-[13px] text-muted">How it works</span>
        <h2 className="m-0 text-[clamp(28px,3vw,40px)] leading-[1.05] font-medium tracking-[-.03em]">
          Looked for, not forgotten.
        </h2>
        <a href="#about" className="font-mono text-[13px] underline underline-offset-[3px]">
          ↑ Read the prologue
        </a>
      </div>
      <div className="grid min-w-0 flex-[2_1_480px] grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-px bg-ink">
        {POINTS.map(([label, text], i) => (
          <div key={label} className="bg-paper">
            <Reveal delay={i * 0.08} className="flex flex-col gap-2 p-7">
              <span className="font-mono text-xs text-muted">{label}</span>
              <span className="text-[17px] leading-normal">{text}</span>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
