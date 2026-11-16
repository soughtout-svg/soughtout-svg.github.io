/**
 * Scout's parts and the real machine each one is borrowed from.
 * Used by the 3D model's labels and the list beside it.
 */
export interface ScoutPart {
  id: string;
  name: string;
  /** Code of the machine in the catalog this part comes from. */
  from: string;
  text: string;
}

export const SCOUT_PARTS: ScoutPart[] = [
  { id: "eyes", name: "Camera eyes", from: "MRS-001", text: "Two cameras side by side, like Opportunity’s panoramic camera." },
  { id: "prisms", name: "Prism forehead", from: "LUN-001", text: "Mirror prisms, like the 100 on the Apollo 11 laser reflector." },
  { id: "foil", name: "Gold foil cheeks", from: "LUN-004", text: "Gold-colored foil, like the blankets wrapped around Eagle’s descent stage." },
  { id: "dish", name: "Dish antenna", from: "DSP-004", text: "A dish for talking to Earth, like Pioneer 10’s big antenna." },
  { id: "whip", name: "Whip antenna", from: "MRS-004", text: "A thin antenna, like the one on the little Sojourner rover." },
  { id: "solar", name: "Round solar panel", from: "MRS-003", text: "A round solar panel, like InSight’s two round solar arrays." },
  { id: "mast", name: "Camera-mast neck", from: "MRS-005", text: "A tall mast that lifts the cameras up high, like Spirit’s." },
];
