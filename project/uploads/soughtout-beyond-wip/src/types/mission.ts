/**
 * Mission data model for SoughtOut Beyond.
 *
 * Every page reads from this shape. Components never hardcode mission facts;
 * they only render what lives in src/data/missions.ts.
 *
 * Rule: every fact in a mission must be backed by one of its `sources`.
 * Coordinates are only filled in when a cited NASA source gives them.
 */

export type DestinationId = "moon" | "mars";

export type MissionStatus =
  | "silent" // contact lost, never recovered
  | "retired" // mission formally ended, hardware intact
  | "still-working" // passive hardware still used by scientists today
  | "visited"; // humans came back and took pieces home

export interface Source {
  label: string;
  url: string;
  publisher: string;
}

export interface MissionImage {
  src: string;
  alt: string;
  caption: string;
  credit: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface StoryChapter {
  id: "mission" | "journey" | "discovery" | "final-signal" | "legacy";
  title: string;
  /** Short paragraphs, written for school age readers. */
  body: string[];
  stats?: Stat[];
  image?: MissionImage;
}

export interface TimelineEvent {
  /** Display date, e.g. "Jul 7, 2003" or "Today". */
  date: string;
  title: string;
  description?: string;
  /** Marks the moment the machine went quiet. */
  isFinalSignal?: boolean;
}

export interface Location {
  region: string;
  /** Only from a cited source. Never estimated. */
  latitude?: number;
  longitude?: number;
  coordinateSource?: string;
}

export interface QuizQuestion {
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Mission {
  id: string;
  missionName: string;
  hardwareName: string;
  destination: DestinationId;
  /** One line hook shown on cards. */
  tagline: string;
  /** A first person line in the machine's voice. Only verified facts. */
  voice: string;
  /** Short catalog code shown like a museum placard. */
  code: string;

  launchDate: string;
  arrivalDate: string;
  /**
   * ISO date that drives the live day counter. For silent or retired hardware it is
   * the last signal; for still-working hardware it is the day it went to work.
   */
  lastSignalISO?: string;
  lastSignalLabel: string;
  status: MissionStatus;
  statusNote: string;

  /** Design expectation, only when a source states one. */
  plannedLife?: string;
  actualLife: string;

  heroImage: MissionImage;
  story: StoryChapter[];
  timeline: TimelineEvent[];
  location: Location;
  funFacts: string[];
  quiz: QuizQuestion[];
  sources: Source[];
}

export interface Destination {
  id: DestinationId;
  name: string;
  tagline: string;
  description: string;
  distanceFromEarth: string;
}
