/**
 * The NASA, JPL and NSSDCA pages each machine's facts were checked against.
 * Shown at the end of every story, as the footer promises.
 */
export interface Source {
  label: string;
  url: string;
  publisher: string;
}

const S = (publisher: string, label: string, url: string): Source => ({ publisher, label, url });

export const SOURCES: Record<string, Source[]> = {
  "LUN-001": [
    S("NASA", "The Apollo Experiment That Keeps on Giving", "https://www.nasa.gov/missions/apollo/apollo-11/the-apollo-experiment-that-keeps-on-giving/"),
    S("NASA JPL", "Apollo 11 Experiment Still Going Strong after 35 Years", "https://www.jpl.nasa.gov/news/apollo-11-experiment-still-going-strong-after-35-years/"),
    S("NASA GSFC", "Lunar Laser Ranging", "https://ilrs.gsfc.nasa.gov/science/scienceContributions/lunar.html"),
  ],
  "LUN-002": [
    S("NSSDCA", "The Apollo Lunar Roving Vehicle", "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html"),
    S("NASA", "Apollo 15: Mission Details", "https://www.nasa.gov/missions/apollo/apollo-15-mission-details/"),
    S("NSSDCA", "Apollo 15 Lunar Module / ALSEP", "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C"),
  ],
  "LUN-003": [
    S("NASA Science", "Surveyor 3", "https://science.nasa.gov/mission/surveyor-3/"),
    S("NSSDCA", "Surveyor 3 spacecraft details", "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A"),
    S("NASA JPL", "Surveyor 3 Camera Returned from the Moon", "https://www.jpl.nasa.gov/blog/2012/1/surveyor-3-camera-returned-from-the-moon"),
  ],
  "LUN-004": [S("NSSDCA", "Apollo 11 Lunar Module / EASEP", "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C")],
  "LUN-005": [S("NSSDCA", "Apollo 15 Lunar Module / ALSEP", "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C")],
  "MRS-001": [
    S("NASA Science", "Opportunity mission page", "https://science.nasa.gov/mission/mer-opportunity/"),
    S("NASA JPL", "NASA's Opportunity Rover Mission on Mars Comes to End", "https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/"),
  ],
  "MRS-002": [
    S("NASA Science", "Ingenuity Mars Helicopter", "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/"),
    S("NASA JPL", "After Three Years on Mars, NASA's Ingenuity Helicopter Mission Ends", "https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/"),
  ],
  "MRS-003": [S("NASA Science", "InSight", "https://science.nasa.gov/mission/insight/")],
  "MRS-004": [S("NASA Science", "Mars Pathfinder", "https://science.nasa.gov/mission/mars-pathfinder/")],
  "MRS-005": [
    S("NASA Science", "Mars Exploration Rovers: Spirit and Opportunity", "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/"),
  ],
  "MRS-006": [S("NASA Science", "Viking 1", "https://science.nasa.gov/mission/viking-1/")],
  "MRS-007": [S("NASA Science", "Phoenix", "https://science.nasa.gov/mission/mars-phoenix/")],
  "DSP-001": [S("NASA Science", "Kepler / K2", "https://science.nasa.gov/mission/kepler/")],
  "DSP-002": [S("NASA Science", "Dawn", "https://science.nasa.gov/mission/dawn/")],
  "DSP-003": [S("NASA Science", "NEAR Shoemaker", "https://science.nasa.gov/mission/near-shoemaker/")],
  "DSP-004": [S("NASA Science", "Pioneer 10", "https://science.nasa.gov/mission/pioneer-10/")],
};
