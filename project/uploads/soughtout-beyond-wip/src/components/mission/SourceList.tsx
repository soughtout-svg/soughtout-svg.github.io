import type { Source } from "@/types/mission";

export function SourceList({ sources }: { sources: Source[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {sources.map((s, i) => (
        <li key={s.url}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full gap-4 rounded-xl border border-white/10 p-4 transition-colors hover:border-white/30 hover:bg-white/5"
          >
            <span className="font-mono text-xs text-silver-600">{String(i + 1).padStart(2, "0")}</span>
            <span>
              <span className="block text-silver-50 group-hover:underline group-hover:underline-offset-4">{s.label}</span>
              <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.15em] text-silver-400">{s.publisher} ↗</span>
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}
