/** Five chapters and a 3-question quiz for each machine, keyed by code. */
export interface Story {
  ch: string[];
  /** Question, options, index of the right option, explanation. */
  quiz: [q: string, options: string[], right: number, why: string][];
}

const STORIES: Record<string, Story> = {
  "LUN-001": {
    ch: [
      "Scientists wanted to measure the exact distance from Earth to the Moon. So Apollo 11 carried a panel of 100 small mirror prisms that bounce light straight back to where it came from.",
      "It launched on a Saturn V rocket on July 16, 1969. Neil Armstrong and Buzz Aldrin set it up near Tranquility Base on July 21, during humanity’s first moonwalk.",
      "Observatories on Earth fire lasers at it and time how long the light takes to return, about 2.5 seconds. That showed the Moon drifts about 3.8 cm farther from Earth every year, and that it has a fluid core.",
      "There isn’t one. The reflector has no power, no electronics and nothing to wear out, so it has never stopped working.",
      "It is one of the only Apollo experiments still in use. Scientists still bounce lasers off it to study the Moon and to test Einstein’s theory of gravity.",
    ],
    quiz: [
      ["How many mirror prisms are on the panel?", ["10", "100", "1,000"], 1, "There are 100 prisms, each one bounces light straight back toward Earth."],
      ["How fast is the Moon drifting away from Earth?", ["About 3.8 cm a year", "About 3.8 m a year", "It isn’t moving"], 0, "About 3.8 cm a year, roughly as fast as your fingernails grow."],
      ["Why does it still work after more than 50 years?", ["It has a nuclear battery", "It needs no power at all", "Astronauts repair it"], 1, "It’s just mirrors. No power means nothing to run out."],
    ],
  },
  "LUN-002": {
    ch: [
      "Walking on the Moon is slow and tiring. The rover let astronauts travel much farther from their lander and carry more tools and rock samples.",
      "It rode to the Moon folded up against the side of the lunar module Falcon. After landing at Hadley–Apennine in July 1971, the astronauts pulled a few straps and it unfolded, ready to drive. It ran on batteries.",
      "Dave Scott and Jim Irwin drove it 27.8 km over three trips. It took them to the edge of Hadley Rille, a long winding valley, and to the Genesis Rock, a piece of the Moon’s ancient crust.",
      "On August 2, 1971, the crew parked it a short distance from Falcon. Its TV camera filmed the lander blasting off, then the rover stayed behind for good.",
      "It was the first car driven on another world. Apollo 16 and 17 brought rovers too, so three of them are still parked on the Moon today.",
    ],
    quiz: [
      ["Who drove the Apollo 15 rover?", ["Armstrong and Aldrin", "Scott and Irwin", "Conrad and Bean"], 1, "Dave Scott and Jim Irwin of Apollo 15."],
      ["What powered the rover?", ["Batteries", "Gasoline", "Solar panels"], 0, "Batteries. There’s no air on the Moon, so a gas engine couldn’t run."],
      ["Why was it parked away from the lander at the end?", ["It ran out of power", "So its camera could film liftoff", "It got stuck in dust"], 1, "Its TV camera sent back pictures of Falcon launching."],
    ],
  },
  "LUN-003": {
    ch: [
      "Before astronauts could land on the Moon, NASA had to prove a spacecraft could touch down gently, and that the ground wouldn’t swallow it.",
      "It launched on April 17, 1967 and landed on April 20 in the Ocean of Storms. Its engines didn’t shut off in time, so it bounced twice before settling.",
      "It had a little scoop that dug trenches in the soil. The soil behaved like wet sand, firm enough to hold up a lander. Surveyor 3 also sent back 6,326 TV pictures.",
      "It stopped working at the start of the cold lunar night in May 1967. In November 1969, Apollo 12 astronauts Pete Conrad and Alan Bean landed nearby, walked over and cut off its camera and other parts.",
      "Those parts came back to Earth so scientists could study what two and a half years on the Moon does to a machine.",
    ],
    quiz: [
      ["What was Surveyor 3 trying to prove?", ["Spacecraft could land softly", "The Moon has water", "People could breathe there"], 0, "That a soft landing was possible and the soil could hold a lander."],
      ["What did its scoop show about Moon soil?", ["It’s like quicksand", "It’s like wet sand", "It’s solid rock"], 1, "Firm, like wet sand. Safe for Apollo."],
      ["Who came to visit it?", ["Apollo 11", "Apollo 12", "Apollo 15"], 1, "Apollo 12’s Conrad and Bean, in 1969."],
    ],
  },
  "LUN-004": {
    ch: [
      "Eagle was the lunar module that carried Neil Armstrong and Buzz Aldrin down to the Moon. Its bottom half, the descent stage, had the landing engine and legs.",
      "Apollo 11 launched on July 16, 1969. Eagle separated from the command module Columbia, and Armstrong flew it past a field of boulders, landing on July 20 with only seconds of fuel to spare.",
      "It proved people could land on the Moon, walk on it and get home. The crew collected 21.55 kg of Moon rock and soil.",
      "On July 21, the top half of Eagle fired its engine and lifted off, using the descent stage as a launch pad. The bottom half stayed behind, carrying a plaque from the crew.",
      "It still stands at Tranquility Base, near the laser reflector and the first footprints on another world.",
    ],
    quiz: [
      ["What was the descent stage used for when the crew left?", ["A launch pad", "A fuel tank for Earth", "A radio tower"], 0, "The top half launched from it, like a pad."],
      ["Who flew Eagle to the landing?", ["Michael Collins", "Neil Armstrong", "Jim Irwin"], 1, "Armstrong steered it past the boulders. Collins stayed in orbit."],
      ["How much Moon rock did Apollo 11 bring home?", ["About 2 kg", "About 21.5 kg", "About 200 kg"], 1, "21.55 kg of rock and soil."],
    ],
  },
  "LUN-005": {
    ch: [
      "Apollo 15 was the first of the longer “J missions”. The astronauts stayed three days and left behind a science station called ALSEP to keep working after they flew home.",
      "It launched on July 26, 1971 and Falcon landed on July 30 at Hadley–Apennine, between tall mountains and a deep winding valley called Hadley Rille.",
      "The station measured moonquakes, the heat leaking out of the Moon and its magnetic field. The crew brought home 77.31 kg of samples, including the Genesis Rock.",
      "The astronauts left on August 2, 1971. The science station kept sending data until September 30, 1977, when NASA switched off all the Apollo stations.",
      "Moonquake recordings from Apollo stations helped scientists work out what the inside of the Moon is made of.",
    ],
    quiz: [
      ["What is ALSEP?", ["A Moon car", "A science station", "A space suit"], 1, "A set of instruments left to keep doing science."],
      ["What did its seismometer measure?", ["Moonquakes", "Wind", "Rain"], 0, "Moonquakes, which reveal the Moon’s insides."],
      ["When did the station stop sending data?", ["1971", "1977", "2001"], 1, "1977, six years after the astronauts left."],
    ],
  },
  "MRS-001": {
    ch: [
      "Orbiters had spotted hematite on a flat Martian plain. On Earth that mineral usually forms in water, so Opportunity and its twin Spirit were sent to read the rocks.",
      "It launched on July 7, 2003, flew for about seven months and fell to Mars inside airbags on January 24, 2004. It bounced and rolled into a tiny crater: a hole in one.",
      "It found tiny hematite balls nicknamed blueberries, and layered rocks that formed in water. Later it found gypsum veins and clay, signs of milder water friendlier to life.",
      "A planet-wide dust storm blocked the Sun in 2018. Its last message arrived on June 10, 2018. After more than 1,000 wake-up commands, NASA ended the mission on February 13, 2019.",
      "Built for 90 sols, it worked 5,111 and drove 45.16 km. Its discoveries helped choose where later rovers would look for ancient life.",
    ],
    quiz: [
      ["How long was Opportunity supposed to work?", ["90 sols", "1 year", "15 years"], 0, "90 sols. It kept going for 5,111."],
      ["What were the “blueberries” made of?", ["Ice", "Hematite", "Volcanic glass"], 1, "Hematite that formed in water."],
      ["What ended its mission?", ["It fell into a crater", "It ran out of fuel", "A dust storm blocked the Sun"], 2, "It was solar-powered, and the storm cut off its light."],
    ],
  },
  "MRS-002": {
    ch: [
      "Nobody knew if a helicopter could fly on Mars, where the air is about 1% as thick as Earth’s. Ingenuity was a test to find out.",
      "It rode to Mars tucked under the belly of the Perseverance rover, launching July 30, 2020 and landing in Jezero Crater on February 18, 2021. Its name came from Vaneeza Rupani, a high school student.",
      "On April 19, 2021 it made the first powered, controlled flight on another planet. It was planned for five flights and made 72, flying 17 km in total and climbing as high as 24 m.",
      "On its 72nd flight in January 2024, a rotor blade was damaged during landing. It could no longer fly, and the mission ended.",
      "It proved flying on Mars works. Future missions can use helicopters to scout ahead for rovers and astronauts.",
    ],
    quiz: [
      ["How thick is Mars’ air compared with Earth’s?", ["About the same", "About half", "About 1%"], 2, "About 1%, so the blades had to spin very fast."],
      ["How many flights did Ingenuity make?", ["5", "72", "500"], 1, "72, after being planned for just five."],
      ["What ended its flying days?", ["A damaged rotor blade", "A dust storm", "It ran out of fuel"], 0, "A blade was damaged on flight 72."],
    ],
  },
  "MRS-003": {
    ch: [
      "InSight was sent to study the deep inside of Mars: its crust, mantle and core. It carried a super-sensitive seismometer and a heat probe nicknamed “the mole”.",
      "It launched on May 5, 2018, the first interplanetary mission to launch from America’s West Coast, and landed on the flat plain of Elysium Planitia on November 26, 2018.",
      "It recorded 1,319 marsquakes. Those showed Mars has a large liquid core, a crust in layers, and a mantle full of lumps left by ancient impacts.",
      "Dust slowly covered its solar panels until it couldn’t make enough power. Its last contact was in December 2022, and NASA ended the mission.",
      "It gave us the first map of what the inside of another planet looks like.",
    ],
    quiz: [
      ["What was InSight’s heat probe nicknamed?", ["The mole", "The drill", "The worm"], 0, "“The mole”, because it tried to dig itself in."],
      ["How many marsquakes did it detect?", ["13", "1,319", "1 million"], 1, "1,319 quakes."],
      ["What ended its mission?", ["A crash", "Dust on its solar panels", "Ice"], 1, "Dust blocked the sunlight it needed."],
    ],
  },
  "MRS-004": {
    ch: [
      "Mars Pathfinder was a test: could NASA land on Mars cheaply and drive a small rover around? Sojourner was that rover, about the size of a microwave oven, and it became the first rover ever to drive on Mars.",
      "It launched on December 4, 1996 and landed on July 4, 1997 in Ares Vallis, an old flood channel. The lander bounced on giant airbags, then Sojourner rolled down a ramp.",
      "It studied rocks the team nicknamed Barnacle Bill and Yogi. Rounded pebbles hinted that water once flowed here. The mission sent home more than 17,000 images.",
      "Sojourner talked to Earth through its lander. When the lander’s last transmission came on September 27, 1997, the rover went silent too.",
      "It was designed to work for 7 sols and lasted about 83. Every Mars rover since then follows in its tracks.",
    ],
    quiz: [
      ["What was Sojourner the first of?", ["Rovers on Mars", "Helicopters on Mars", "Moon cars"], 0, "The first rover on Mars, in 1997."],
      ["How did it land?", ["With legs", "Inside airbags", "On a parachute only"], 1, "The lander bounced on airbags."],
      ["Why did Sojourner go silent?", ["It flipped over", "Its lander stopped talking to Earth", "A sandstorm buried it"], 1, "It relayed through the lander, which went quiet."],
    ],
  },
  "MRS-005": {
    ch: [
      "Spirit was Opportunity’s identical twin. It was sent to Gusev Crater, which looked from orbit like it might once have held a lake.",
      "It launched on June 10, 2003 and landed on January 3, 2004, three weeks before its twin, bouncing in on airbags.",
      "The crater floor turned out to be volcanic rock. But in the Columbia Hills it found minerals changed by water. Dragging a broken wheel, it scraped up almost pure silica, a sign of ancient hot springs.",
      "In 2009 it got stuck in soft sand. Its last communication came on March 22, 2010, and NASA ended the mission in 2011.",
      "Its broken wheel led to one of its best discoveries. Together, the twins proved water lasted on ancient Mars.",
    ],
    quiz: [
      ["Who was Spirit’s twin?", ["Curiosity", "Opportunity", "Sojourner"], 1, "Opportunity, landed on the other side of Mars."],
      ["What did its broken wheel dig up?", ["Silica", "Gold", "Ice"], 0, "Nearly pure silica, from ancient hot springs."],
      ["What trapped Spirit?", ["A crater", "Soft sand", "A rockslide"], 1, "It got stuck in soft sand in 2009."],
    ],
  },
  "MRS-006": {
    ch: [
      "Viking 1 and 2 were NASA’s first Mars landers. Each one carried experiments to test the soil for signs of life.",
      "Viking 1 landed on Chryse Planitia on July 20, 1976. Viking 2 landed on Utopia Planitia on September 3, 1976. Each arrived with an orbiter that mapped the planet from above. Minutes after landing, Viking 1 took the first picture ever made on the surface of Mars.",
      "The life experiments gave puzzling results, and most scientists decided they found no life. The landers found soil rich in sulfur and sent back 4,500 photos and years of weather reports.",
      "Viking 2’s lander stopped in April 1980. Viking 1 kept going until November 1982, when a faulty command cut its contact with Earth.",
      "When Phoenix found perchlorate in 2008, scientists went back and looked at Viking’s life experiments again. Its data is still being studied.",
    ],
    quiz: [
      ["What did the Viking landers look for?", ["Signs of life", "Gold", "Aliens’ radio signals"], 0, "Signs of microbes in the soil."],
      ["What was the first thing Viking 1 did after landing?", ["Drove away", "Took a picture", "Dug a hole"], 1, "It took the first photo ever made on Mars’ surface."],
      ["Which mission made scientists revisit Viking’s results?", ["Phoenix", "Kepler", "Apollo 11"], 0, "Phoenix’s perchlorate discovery."],
    ],
  },
  "MRS-007": {
    ch: [
      "Phoenix was sent to the Martian arctic to study water and search for complex organic molecules. Polar regions are where ice is found.",
      "It launched on August 4, 2007 and entered Mars’ atmosphere at nearly 21,000 km/h, landing on May 25, 2008. An orbiter photographed it hanging from its parachute.",
      "Its robotic arm dug trenches. Bright clumps in one trench vanished into the air four days later: they were water ice. It confirmed ice under the surface and found perchlorate, a chemical that could power microbes or help future astronauts.",
      "Phoenix ran on sunlight. As arctic winter arrived and the Sun sank, it lost power. Its mission ended on November 2, 2008.",
      "It proved Mars has ice right under its surface, a resource future explorers could use.",
    ],
    quiz: [
      ["Where on Mars did Phoenix land?", ["Near the equator", "The arctic", "Inside a volcano"], 1, "Farther north than any mission before it."],
      ["What happened to the bright clumps in its trench?", ["They melted into puddles", "They vanished into the air", "They turned red"], 1, "The ice vaporized after four days."],
      ["What ended its mission?", ["Arctic winter", "A crash", "A dust devil"], 0, "Winter cut off its sunlight."],
    ],
  },
  "DSP-001": {
    ch: [
      "Kepler was built to answer one question: how common are planets like Earth around other stars?",
      "It launched on March 6, 2009 and went into orbit around the Sun, slowly trailing behind Earth so Earth wouldn’t block its view.",
      "It stared at about 150,000 stars, watching for tiny dips in light when a planet passed in front. It found more than 2,600 planets, and showed there are more planets than stars in our galaxy.",
      "In 2013 a part that helped it point broke. Engineers invented a new mission, K2, using sunlight to help steady it. In 2018 it ran out of fuel and was switched off.",
      "Because of Kepler, we know planets are everywhere. Newer telescopes keep hunting where it left off.",
    ],
    quiz: [
      ["How did Kepler find planets?", ["Watching stars dim", "Listening for radio", "Taking photos of them"], 0, "A planet passing in front makes its star blink dimmer."],
      ["About how many planets did it find?", ["26", "2,600+", "26 million"], 1, "More than 2,600 confirmed planets."],
      ["What finally ended Kepler’s work?", ["It ran out of fuel", "It hit an asteroid", "It fell to Earth"], 0, "No fuel meant it couldn’t point anymore."],
    ],
  },
  "DSP-002": {
    ch: [
      "Dawn was sent to the asteroid belt to study its two biggest worlds, Vesta and Ceres, which are leftovers from when the planets formed.",
      "It launched on September 27, 2007 and used ion engines: gentle, super-efficient thrusters. It orbited Vesta in 2011 and 2012, then flew on to Ceres in 2015.",
      "Vesta turned out to have layers like a small planet. Ceres has bright salty spots, and may once have had enough inner heat to be a possible home for life.",
      "In 2018 Dawn ran out of fuel and could no longer point its antenna at Earth. NASA ended the mission, leaving it circling Ceres.",
      "It was the first spacecraft to orbit two different worlds beyond Earth.",
    ],
    quiz: [
      ["Which two worlds did Dawn orbit?", ["Mars and the Moon", "Vesta and Ceres", "Jupiter and Saturn"], 1, "Vesta and Ceres in the asteroid belt."],
      ["What kind of engine did it use?", ["Ion engines", "Jet engines", "Steam"], 0, "Ion engines: weak push, but they never quit."],
      ["Where is Dawn now?", ["Back on Earth", "Orbiting Ceres", "Outside the solar system"], 1, "Silently circling Ceres."],
    ],
  },
  "DSP-003": {
    ch: [
      "NEAR Shoemaker was sent to spend a year orbiting an asteroid named Eros and study it up close.",
      "It launched on February 17, 1996 and flew past asteroid Mathilde on the way. It went into orbit around Eros on February 14, 2000, Valentine’s Day.",
      "It found Eros has no magnetic field, and sent home 10 times more data than planned, including 160,000 images.",
      "It was never built to land, but on February 12, 2001 the team gently set it down on Eros. It kept talking for about two more weeks.",
      "It was the first spacecraft to orbit an asteroid and the first to land on one. It was named after scientist Eugene Shoemaker.",
    ],
    quiz: [
      ["What asteroid did NEAR land on?", ["Ceres", "Eros", "Vesta"], 1, "433 Eros."],
      ["On what holiday did it reach orbit?", ["Halloween", "Valentine’s Day", "New Year’s Day"], 1, "February 14, 2000."],
      ["Was it designed to land?", ["Yes", "No"], 1, "No, the team tried it at the end anyway, and it worked."],
    ],
  },
  "DSP-004": {
    ch: [
      "Pioneer 10 was sent to find out if a spacecraft could survive crossing the asteroid belt and to take the first close look at Jupiter.",
      "It launched in March 1972, crossed the asteroid belt and flew past Jupiter in December 1973. Its twin, Pioneer 11, followed and became the first to visit Saturn in 1979.",
      "They sent back the first close-up pictures of Jupiter, including the Great Red Spot, and measured its powerful radiation.",
      "Pioneer 10 was built for 21 months and lasted more than 30 years. Its last faint signal reached Earth in January 2003. Pioneer 11 went quiet in 1995.",
      "Both carry a metal plaque with a drawing of people and a map showing where Earth is, a message for anyone who might find them.",
    ],
    quiz: [
      ["Which planet did Pioneer 10 visit?", ["Mars", "Jupiter", "Neptune"], 1, "Jupiter, in 1973."],
      ["Which was first to visit Saturn?", ["Pioneer 11", "Kepler", "Dawn"], 0, "Pioneer 11, in 1979."],
      ["What do the Pioneers carry?", ["A golden plaque", "A flag", "A rock from Earth"], 0, "A plaque showing people and Earth’s location."],
    ],
  },
};

export default STORIES;
