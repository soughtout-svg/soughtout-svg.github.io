/**
 * Data access layer. Pages call these helpers instead of importing data
 * directly, so swapping the local data for an API later only touches this file.
 */
import { missions } from "@/data/missions";
import { destinations } from "@/data/destinations";
import type { Destination, DestinationId, Mission } from "@/types/mission";

export function getAllMissions(): Mission[] {
  return missions;
}

export function getMission(id: string): Mission | undefined {
  return missions.find((m) => m.id === id);
}

export function getMissionsByDestination(destination: DestinationId): Mission[] {
  return missions.filter((m) => m.destination === destination);
}

export function getDestinations(): Destination[] {
  return destinations;
}

export function getDestination(id: string): Destination | undefined {
  return destinations.find((d) => d.id === id);
}

export function isDestinationId(id: string): id is DestinationId {
  return destinations.some((d) => d.id === id);
}

/** The next mission in the list, wrapping around. Used for "Explore another machine". */
export function getNextMission(id: string): Mission {
  const i = missions.findIndex((m) => m.id === id);
  return missions[(i + 1) % missions.length];
}

/** Every source across all missions, de-duplicated by URL. Used on the About page. */
export function getAllSources() {
  const seen = new Map<string, { label: string; url: string; publisher: string; missions: string[] }>();
  for (const m of missions) {
    for (const s of m.sources) {
      const entry = seen.get(s.url) ?? { ...s, missions: [] };
      entry.missions.push(m.hardwareName);
      seen.set(s.url, entry);
    }
  }
  return [...seen.values()];
}
