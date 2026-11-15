import type { MissionStatus } from "@/types/mission";

const LABELS: Record<MissionStatus, { text: string; dot: string; alive?: boolean }> = {
  "still-working": { text: "Still working", dot: "bg-signal", alive: true },
  silent: { text: "Silent", dot: "bg-mars-400" },
  retired: { text: "Retired", dot: "bg-silver-400" },
  visited: { text: "Visited by astronauts", dot: "bg-moon-400" },
};

export function StatusBadge({ status }: { status: MissionStatus }) {
  const { text, dot, alive } = LABELS[status];
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-silver-200">
      <span className="relative flex h-1.5 w-1.5" aria-hidden>
        {alive && (
          <span className={`absolute inset-0 rounded-full ${dot} [animation:ping-soft_1.8s_ease-out_infinite]`} />
        )}
        <span className={`relative h-1.5 w-1.5 rounded-full ${dot}`} />
      </span>
      {text}
    </span>
  );
}
