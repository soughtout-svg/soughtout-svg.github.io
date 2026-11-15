import type { TimelineEvent } from "@/types/mission";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Vertical "signal path" timeline. The line glows while the machine was active,
 * turns dashed after its final signal, and ends on a "Today" marker.
 */
export function MissionTimeline({ events, accent }: { events: TimelineEvent[]; accent: "moon" | "mars" }) {
  const finalIndex = events.findIndex((e) => e.isFinalSignal);
  const color = accent === "mars" ? "bg-mars-400" : "bg-moon-400";
  const glow = accent === "mars" ? "shadow-[0_0_12px_rgba(255,138,82,0.7)]" : "shadow-[0_0_12px_rgba(122,168,255,0.7)]";

  return (
    <ol className="relative">
      {events.map((e, i) => {
        const afterSilence = finalIndex !== -1 && i > finalIndex;
        const isToday = e.date === "Today";
        const isLast = i === events.length - 1;
        return (
          <li key={i} className="relative grid grid-cols-[7.5rem_1.5rem_1fr] gap-3 pb-8 sm:grid-cols-[9rem_1.5rem_1fr]">
            <p className="pt-0.5 text-right font-mono text-xs uppercase tracking-[0.12em] text-silver-400">{e.date}</p>
            <div className="relative flex justify-center">
              {!isLast && (
                <span
                  aria-hidden
                  className={`absolute top-4 h-full w-px ${
                    afterSilence || e.isFinalSignal ? "border-l border-dashed border-silver-600" : `${color} opacity-50`
                  }`}
                />
              )}
              <span
                aria-hidden
                className={`relative mt-1 h-3 w-3 rounded-full ${
                  e.isFinalSignal
                    ? "bg-signal shadow-[0_0_14px_rgba(230,255,74,0.8)]"
                    : isToday
                      ? "border border-silver-200 bg-space-950"
                      : afterSilence
                        ? "bg-silver-600"
                        : `${color} ${glow}`
                }`}
              />
            </div>
            <Reveal>
              <p className={`text-base ${e.isFinalSignal ? "text-signal" : isToday ? "text-silver-50" : "text-silver-200"}`}>
                {e.title}
              </p>
              {e.isFinalSignal && (
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-signal/70">Final signal</p>
              )}
              {e.description && <p className="mt-1 text-sm text-silver-400">{e.description}</p>}
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
