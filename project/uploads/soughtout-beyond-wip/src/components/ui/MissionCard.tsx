import Link from "next/link";
import type { Mission } from "@/types/mission";
import { NasaImage } from "./NasaImage";
import { StatusBadge } from "./StatusBadge";

/** Museum placard style card used on destination pages and the home page. */
export function MissionCard({ mission }: { mission: Mission }) {
  const isMars = mission.destination === "mars";
  return (
    <Link
      href={`/mission/${mission.id}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-space-900/70 backdrop-blur-sm transition-colors ${
        isMars ? "hover:border-mars-400/60" : "hover:border-moon-400/60"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <NasaImage
          image={mission.heroImage}
          accent={isMars ? "mars" : "moon"}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-space-900/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded bg-space-950/70 px-2 py-1 font-mono text-[11px] tracking-[0.25em] text-silver-200">
          {mission.code}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <StatusBadge status={mission.status} />
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-silver-400">{mission.missionName}</p>
          <h3 className="mt-1 font-display text-3xl leading-tight">{mission.hardwareName}</h3>
          <p className="mt-3 text-silver-200">{mission.tagline}</p>
        </div>
        <span
          className={`mt-auto font-mono text-xs uppercase tracking-[0.2em] text-silver-200 transition-colors ${
            isMars ? "group-hover:text-mars-300" : "group-hover:text-moon-300"
          }`}
        >
          Open the story →
        </span>
      </div>
    </Link>
  );
}
