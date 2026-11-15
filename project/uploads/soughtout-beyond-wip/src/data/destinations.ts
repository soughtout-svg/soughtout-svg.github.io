import type { Destination } from "@/types/mission";

export const destinations: Destination[] = [
  {
    id: "moon",
    name: "The Moon",
    tagline: "Explore the machines humanity left on our nearest neighbor.",
    description:
      "A laser mirror that still works, a car with wire tires, and a robot that astronauts came back to visit. Three machines, all still sitting where they were left.",
    distanceFromEarth: "About 385,000 km away",
  },
  {
    id: "mars",
    name: "Mars",
    tagline: "Discover the robotic explorers resting on the Red Planet.",
    description:
      "A rover that was supposed to last 90 days, a helicopter that flew where no aircraft had flown, and a lander that listened to the planet's heartbeat.",
    distanceFromEarth: "About 7 months away by spacecraft",
  },
];
