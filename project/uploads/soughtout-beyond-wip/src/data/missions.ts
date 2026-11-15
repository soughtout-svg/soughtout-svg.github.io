/**
 * Mission content for SoughtOut Beyond.
 *
 * Every number and claim here comes from a NASA, JPL or NSSDCA page listed in
 * that mission's `sources`. If you add a fact, add the page it came from.
 * Images are hotlinked from NASA servers and are public domain NASA imagery.
 */
import type { Mission } from "@/types/mission";

const JPL_IMG = "https://d2pn8kiwq2w21t.cloudfront.net/original_images";

export const missions: Mission[] = [
  // ───────────────────────────── MOON ─────────────────────────────
  {
    id: "apollo-11-retroreflector",
    missionName: "Apollo 11",
    hardwareName: "Laser Ranging Retroreflector",
    destination: "moon",
    code: "LUN-001",
    tagline: "A mirror on the Moon that scientists still shoot lasers at today.",
    voice:
      "I have no batteries, no motors, and no computer. I just sit here and bounce light back to Earth. I've been doing it since 1969.",
    launchDate: "Jul 16, 1969",
    arrivalDate: "Jul 20, 1969",
    lastSignalISO: "1969-07-21",
    lastSignalLabel: "Still reflecting lasers today",
    status: "still-working",
    statusNote: "Needs no power. Still used by observatories on Earth.",
    plannedLife: "No power, so no expiration date",
    actualLife: "57+ years and counting",
    heroImage: {
      src: "https://www.nasa.gov/wp-content/uploads/2020/03/aldrin20190724.jpg",
      alt: "Astronaut Buzz Aldrin walking on the Moon carrying two science instruments",
      caption:
        "Buzz Aldrin carries the seismometer in his left hand and the laser reflector in his right. Neil Armstrong took the photo.",
      credit: "NASA",
    },
    story: [
      {
        id: "mission",
        title: "The Mission",
        body: [
          "Apollo 11 was the first time humans landed on the Moon. Neil Armstrong and Buzz Aldrin only had a few hours outside, so there was barely time for science. They set up a small package of experiments, and one of them was a flat panel about 2 feet wide.",
          "That panel holds 100 special glass prisms called corner cubes. A corner cube sends light straight back in the exact direction it came from. It's the same idea as the reflectors on a bike or a car's tail lights.",
        ],
        stats: [
          { value: "100", label: "glass prisms" },
          { value: "3.8 cm", label: "width of each prism" },
        ],
      },
      {
        id: "journey",
        title: "The Journey",
        body: [
          "Apollo 11 launched on July 16, 1969 and landed in the Sea of Tranquility on July 20. On July 21, about an hour before the end of their moonwalk, Armstrong and Aldrin placed the reflector on the ground facing Earth.",
          "Then they climbed back into their lander and left. The reflector stayed behind, surrounded by their footprints.",
        ],
      },
      {
        id: "discovery",
        title: "The Discovery",
        body: [
          "Observatories on Earth fire laser pulses at the reflector and time how long the light takes to bounce back. Because light travels at a known speed, that time tells us the distance to the Moon within a few millimeters.",
          "Those measurements showed something amazing: the Moon is slowly drifting away from Earth, about 3.8 centimeters every year. That's roughly as fast as your fingernails grow.",
          "The laser data also revealed that the Moon has a fluid core, which surprised scientists who expected a solid one. And it helped test Einstein's theory of gravity. So far, Einstein keeps passing.",
        ],
        stats: [
          { value: "3.8 cm", label: "the Moon drifts away each year" },
          { value: "385,000 km", label: "average Earth to Moon distance" },
        ],
      },
      {
        id: "final-signal",
        title: "The Final Signal",
        body: [
          "This machine has no final signal, because it never needed to send one. It has no power at all. It just reflects.",
          "The hard part is on Earth's side. Even in good conditions, only about one photon of laser light makes it all the way back every few seconds. Telescopes in New Mexico, France, Italy, and Germany keep trying, and they keep catching them.",
        ],
      },
      {
        id: "legacy",
        title: "The Legacy",
        body: [
          "Almost every other experiment left on the Moon ran out of power long ago. This one is the Apollo experiment that keeps on giving. Apollo 14 and Apollo 15 left reflectors too, and the data from all of them is still being studied.",
          "NASA has approved a new generation of reflectors to be placed on the Moon. So the idea Armstrong and Aldrin set down in 1969 is still being built on today.",
        ],
      },
    ],
    timeline: [
      { date: "Jul 16, 1969", title: "Apollo 11 launches" },
      { date: "Jul 20, 1969", title: "Lands in the Sea of Tranquility" },
      { date: "Jul 21, 1969", title: "Armstrong and Aldrin set up the reflector" },
      { date: "1994", title: "25 years of data show the Moon has a liquid core and is drifting away" },
      { date: "Today", title: "Still reflecting lasers back to Earth", isFinalSignal: false },
    ],
    location: { region: "Sea of Tranquility (Tranquility Base), the Moon" },
    funFacts: [
      "It's about 100 feet away from Neil Armstrong's famous footprints.",
      "The reflector doesn't use any electricity. That's why it outlived almost everything else on the Moon.",
      "The Moon drifts away from Earth at about the same speed your fingernails grow.",
    ],
    quiz: [
      {
        prompt: "How does the reflector still work after more than 50 years?",
        options: [
          "It has a nuclear battery",
          "It needs no power. It just reflects light",
          "Astronauts replace its batteries",
          "It uses solar panels",
        ],
        answerIndex: 1,
        explanation: "The reflector is just glass prisms. No power, nothing to run out.",
      },
      {
        prompt: "What did scientists learn by timing laser pulses to the Moon?",
        options: [
          "The Moon is getting closer",
          "The Moon is made of iron",
          "The Moon is drifting away about 3.8 cm per year",
          "The Moon stopped spinning",
        ],
        answerIndex: 2,
        explanation: "Laser ranging showed the Moon moves about 3.8 cm (1.5 inches) farther from Earth every year.",
      },
      {
        prompt: "How many glass prisms are in the Apollo 11 reflector?",
        options: ["10", "50", "100", "1,000"],
        answerIndex: 2,
        explanation: "It's a 10 by 10 grid, so 100 corner cube prisms.",
      },
    ],
    sources: [
      {
        label: "The Apollo Experiment That Keeps on Giving",
        url: "https://www.nasa.gov/missions/apollo/apollo-11/the-apollo-experiment-that-keeps-on-giving/",
        publisher: "NASA",
      },
      {
        label: "Apollo 11 Science Experiment Still Running",
        url: "https://www.nasa.gov/vision/space/features/21jul_llr_prt.htm",
        publisher: "NASA",
      },
      {
        label: "Apollo 11 Experiment Still Going Strong after 35 Years",
        url: "https://www.jpl.nasa.gov/news/apollo-11-experiment-still-going-strong-after-35-years/",
        publisher: "NASA JPL",
      },
      {
        label: "Lunar Laser Ranging technical details",
        url: "https://funphysics.jpl.nasa.gov/technical/grp/lunar-laser.html",
        publisher: "NASA JPL",
      },
      {
        label: "Laser Beams Reflected Between Earth and Moon Boost Science",
        url: "https://www.nasa.gov/missions/laser-beams-reflected-between-earth-and-moon-boost-science/",
        publisher: "NASA",
      },
      {
        label: "Lunar Laser Ranging",
        url: "https://ilrs.gsfc.nasa.gov/science/scienceContributions/lunar.html",
        publisher: "NASA Goddard / ILRS",
      },
    ],
  },

  {
    id: "apollo-15-lrv",
    missionName: "Apollo 15",
    hardwareName: "Lunar Roving Vehicle",
    destination: "moon",
    code: "LUN-002",
    tagline: "The first car ever driven on another world.",
    voice:
      "They folded me up like a lawn chair, strapped me to the side of their lander, and drove me 27.8 kilometers across the Moon. Then they parked me so I could film them leaving.",
    launchDate: "Jul 26, 1971",
    arrivalDate: "Jul 30, 1971",
    lastSignalISO: "1971-08-02",
    lastSignalLabel: "Filmed Falcon's liftoff on Aug 2, 1971",
    status: "retired",
    statusNote: "Parked near the Hadley-Apennine landing site. Its tracks are visible from orbit.",
    actualLife: "3 drives over 3 days",
    heroImage: {
      src: "https://nssdc.gsfc.nasa.gov/planetary/image/as15_88_11901.jpg",
      alt: "The Apollo 15 Lunar Roving Vehicle on the gray lunar surface",
      caption: "The Apollo 15 Lunar Roving Vehicle at the Hadley-Apennine landing site.",
      credit: "NASA",
    },
    story: [
      {
        id: "mission",
        title: "The Mission",
        body: [
          "On the first Moon landings, astronauts could only walk. That meant they couldn't go very far from their lander. Apollo 15 changed that by bringing a car.",
          "The Lunar Roving Vehicle was an electric car built for the Moon. It weighed 210 kg but could carry 490 kg of astronauts, tools, and rocks. Every wheel had its own motor, and the tires were made of woven steel strands with titanium treads, because rubber tires would not survive up there.",
        ],
        stats: [
          { value: "210 kg", label: "mass of the rover" },
          { value: "17 months", label: "to design and build it" },
        ],
      },
      {
        id: "journey",
        title: "The Journey",
        body: [
          "Apollo 15 launched on July 26, 1971. The rover rode to the Moon folded up and tucked into the side of the lunar module Falcon.",
          "Falcon landed on July 30 near Hadley Rille, a long canyon at the foot of the Apennine Mountains. One astronaut released the rover from the ladder while the other lowered it with reels and tapes. The wheels folded out, it dropped to the ground, and David Scott took it for a test drive. He became the first human to drive on the Moon.",
        ],
      },
      {
        id: "discovery",
        title: "The Discovery",
        body: [
          "Over three days, Scott and Jim Irwin drove the rover 27.8 km. The longest drive was 12.5 km, and they got as far as 5 km from their lander. Walking astronauts on earlier missions could never have reached that far.",
          "That range let them explore the edge of Hadley Rille and the slopes of Mount Hadley Delta. At Spur Crater they found a piece of very old white rock that became famous as the Genesis Rock. In all, Apollo 15 brought about 76 kg of Moon rocks home.",
        ],
        stats: [
          { value: "27.8 km", label: "total distance driven" },
          { value: "76 kg", label: "of Moon rocks brought home" },
        ],
      },
      {
        id: "final-signal",
        title: "The Final Signal",
        body: [
          "Before leaving, Scott parked the rover about 500 feet from Falcon, pointing its TV camera at the lander. On August 2, 1971, people on Earth watched a Moon liftoff live for the very first time, filmed by the rover that stayed behind.",
          "Engineers in Mission Control could even steer that camera remotely from Houston.",
        ],
      },
      {
        id: "legacy",
        title: "The Legacy",
        body: [
          "The rover is still parked where Scott left it. In 2011, NASA's Lunar Reconnaissance Orbiter dropped lower in its orbit and photographed the landing site. You can see the rover and even its wheel tracks from space.",
          "Three rovers drove on the Moon, on Apollo 15, 16, and 17. All of them are still up there. Every future Moon car, including the ones planned for new missions, starts from what this one proved.",
        ],
      },
    ],
    timeline: [
      { date: "Jul 26, 1971", title: "Apollo 15 launches" },
      { date: "Jul 30, 1971", title: "Falcon lands at Hadley-Apennine" },
      { date: "Jul 31, 1971", title: "First drive on the Moon" },
      { date: "Aug 2, 1971", title: "Rover camera broadcasts liftoff live", isFinalSignal: true },
      { date: "2011", title: "Lunar Reconnaissance Orbiter photographs the rover and its tracks" },
      { date: "Today", title: "Still parked at Hadley-Apennine" },
    ],
    location: {
      region: "Hadley-Apennine, the Moon",
      latitude: 26.08,
      longitude: 3.66,
      coordinateSource: "Apollo 15 landing site coordinates from NASA's Apollo 15 Mission Details page",
    },
    funFacts: [
      "Its batteries were not rechargeable. They only had to last three days.",
      "Four rovers were built. Three went to the Moon and one was used for spare parts.",
      "Its tracks are still visible because there is no wind on the Moon to erase them.",
    ],
    quiz: [
      {
        prompt: "Why did Apollo 15 bring a car to the Moon?",
        options: [
          "To race other astronauts",
          "So astronauts could explore much farther than they could walk",
          "To carry the lander",
          "To dig for water",
        ],
        answerIndex: 1,
        explanation: "The rover let astronauts travel up to 5 km from their lander and explore far more ground.",
      },
      {
        prompt: "What were the rover's tires made of?",
        options: ["Rubber", "Plastic", "Woven steel strands", "Wood"],
        answerIndex: 2,
        explanation: "The tires were woven steel strands with titanium treads, built for the airless Moon.",
      },
      {
        prompt: "What was the rover's last big job?",
        options: [
          "Driving back to Earth",
          "Filming the lander's liftoff live on TV",
          "Collecting the Genesis Rock alone",
          "Towing the lander",
        ],
        answerIndex: 1,
        explanation: "Its TV camera broadcast the first live view of a liftoff from the Moon.",
      },
    ],
    sources: [
      {
        label: "The Apollo Lunar Roving Vehicle",
        url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html",
        publisher: "NASA NSSDCA",
      },
      {
        label: "Apollo 15: Mission Details",
        url: "https://www.nasa.gov/missions/apollo/apollo-15-mission-details/",
        publisher: "NASA",
      },
      {
        label: "50 Years Ago: Apollo 15 on the Moon at Hadley-Apennine",
        url: "https://www.nasa.gov/history/50-years-ago-apollo-15-on-the-moon-at-hadley-apennine/",
        publisher: "NASA",
      },
      {
        label: "50 Years Ago: Apollo 15 Heads Home to Earth",
        url: "https://www.nasa.gov/history/50-years-ago-apollo-15-heads-home-to-earth/",
        publisher: "NASA",
      },
      {
        label: "LRO Sees Apollo 15 Rover Tracks",
        url: "https://lunarscience.nasa.gov/articles/lro-sees-apollo-15-rover-tracks/",
        publisher: "NASA SSERVI",
      },
      {
        label: "APOD: Apollo 15 Panorama",
        url: "https://apod.nasa.gov/apod/ap160805.html",
        publisher: "NASA APOD",
      },
    ],
  },

  {
    id: "surveyor-3",
    missionName: "Surveyor",
    hardwareName: "Surveyor 3",
    destination: "moon",
    code: "LUN-003",
    tagline: "The only robot on the Moon that astronauts came back to visit.",
    voice:
      "I bounced three times when I landed. Then I waited two and a half years in silence, until two astronauts walked over and took my camera home.",
    launchDate: "Apr 17, 1967",
    arrivalDate: "Apr 20, 1967",
    lastSignalISO: "1967-05-04",
    lastSignalLabel: "Last data on May 4, 1967",
    status: "visited",
    statusNote: "Visited by Apollo 12 astronauts in 1969. Its camera is now in a museum on Earth.",
    actualLife: "About 2 weeks of work",
    heroImage: {
      src: "https://nssdc.gsfc.nasa.gov/planetary/news/image/conrad_19990709_c.jpg",
      alt: "Astronaut standing beside the Surveyor 3 robotic lander, with the Apollo 12 lunar module in the distance",
      caption: "Pete Conrad inspects Surveyor 3 on November 20, 1969. Apollo 12's lander Intrepid sits in the background.",
      credit: "NASA",
    },
    story: [
      {
        id: "mission",
        title: "The Mission",
        body: [
          "Before NASA sent people to the Moon, it needed to answer a simple but scary question: is the ground solid enough to land on? Robot landers called Surveyors went first to find out.",
          "Surveyor 3 carried a TV camera and a small mechanical scoop to dig into the lunar soil and test how strong it was.",
        ],
        stats: [
          { value: "1,026 kg", label: "mass at launch" },
          { value: "296 kg", label: "mass when it landed" },
        ],
      },
      {
        id: "journey",
        title: "The Journey",
        body: [
          "Surveyor 3 launched on April 17, 1967. Its landing on April 20 did not go as planned. Bright reflections from the ground confused its radar, so its engines kept firing instead of shutting off.",
          "It touched down, bounced up, touched down again, bounced again, and touched down a third time. Controllers on Earth finally sent a command to shut off the engines. It came to rest on a 14 degree slope inside a crater about 200 meters wide.",
        ],
      },
      {
        id: "discovery",
        title: "The Discovery",
        body: [
          "Surveyor 3 sent back 6,326 pictures. Its scoop dug trenches as deep as 18 cm, giving NASA new data on how strong and solid the lunar soil was. That helped engineers design landers that could carry people safely.",
          "It even photographed an eclipse of the Sun by Earth, as seen from the Moon.",
        ],
        stats: [
          { value: "6,326", label: "pictures sent to Earth" },
          { value: "18 cm", label: "deepest trench it dug" },
        ],
      },
      {
        id: "final-signal",
        title: "The Final Signal",
        body: [
          "A day on the Moon lasts about two Earth weeks, followed by a two week night. Surveyor 3 worked until just after sunset on May 3, 1967. Its last data arrived on May 4. When the Sun rose again, it never woke up.",
          "Then something happened that has never happened to any other robot on the Moon. On November 19, 1969, Apollo 12 landed about 180 meters away. The next day, astronauts Pete Conrad and Alan Bean walked over to it.",
        ],
      },
      {
        id: "legacy",
        title: "The Legacy",
        body: [
          "The astronauts removed about 10 kg of parts, including the TV camera and the scoop, and brought them home. Scientists studied how two and a half years on the Moon had affected the metal, glass, and wiring.",
          "Scientists also found living bacteria in one of 33 samples they tested. NASA linked it to the camera not being sterilized before launch, and scientists have argued for years about whether the germs really survived on the Moon or got in after the camera came home. Checking surprising results carefully is how good science works.",
          "The camera is now on display at the Smithsonian National Air and Space Museum. The rest of Surveyor 3 is still in its crater, which was named Surveyor Crater.",
        ],
      },
    ],
    timeline: [
      { date: "Apr 17, 1967", title: "Surveyor 3 launches" },
      { date: "Apr 20, 1967", title: "Bounces three times and lands in Oceanus Procellarum" },
      { date: "May 4, 1967", title: "Last data received", isFinalSignal: true },
      { date: "Nov 19, 1969", title: "Apollo 12 lands about 180 m away" },
      { date: "Nov 20, 1969", title: "Astronauts visit and take its camera home" },
      { date: "Today", title: "Camera in a museum. Lander still in Surveyor Crater" },
    ],
    location: {
      region: "Surveyor Crater, Oceanus Procellarum (Ocean of Storms), the Moon",
      latitude: -3.0162,
      longitude: 336.582,
      coordinateSource: "NASA NSSDCA, from Lunar Reconnaissance Orbiter images",
    },
    funFacts: [
      "Surveyor 3 is the only robotic spacecraft on another world that humans have visited in person.",
      "Apollo 12 picked its landing spot near Surveyor 3 on purpose, to prove astronauts could land precisely.",
      "The astronauts used bolt cutters to remove the camera.",
    ],
    quiz: [
      {
        prompt: "What was Surveyor 3's main job?",
        options: [
          "Carry astronauts",
          "Test if the Moon's ground was safe to land on",
          "Look for water",
          "Build a base",
        ],
        answerIndex: 1,
        explanation: "Surveyors tested the lunar soil so NASA knew a crewed lander wouldn't sink.",
      },
      {
        prompt: "What went wrong during the landing?",
        options: [
          "It crashed",
          "It landed on the far side",
          "Its engines didn't shut off, so it bounced three times",
          "Its parachute failed",
        ],
        answerIndex: 2,
        explanation: "Reflections confused its radar, so it bounced until Earth commanded the engines off.",
      },
      {
        prompt: "Who visited Surveyor 3 in 1969?",
        options: ["Apollo 11", "Apollo 12 astronauts", "A Soviet rover", "Nobody"],
        answerIndex: 1,
        explanation: "Pete Conrad and Alan Bean walked over during their second moonwalk.",
      },
    ],
    sources: [
      {
        label: "Surveyor 3 spacecraft details",
        url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A",
        publisher: "NASA NSSDCA",
      },
      {
        label: "Footpads and Footprints: Humans and Machine Meet on the Moon",
        url: "https://science.nasa.gov/solar-system/moon/footpads-and-footprints-humans-and-machine-meet-on-the-moon/",
        publisher: "NASA Science",
      },
      {
        label: "Surveyor 3 Camera Returned from the Moon",
        url: "https://www.jpl.nasa.gov/blog/2012/1/surveyor-3-camera-returned-from-the-moon",
        publisher: "NASA JPL",
      },
      {
        label: "Astronauts Pay a Visit to Surveyor 3",
        url: "https://www.nasa.gov/image-article/astronauts-pay-visit-surveyor-3/",
        publisher: "NASA",
      },
      {
        label: "Surveyor 3 Streptococcus mitis",
        url: "https://nlsp.nasa.gov/search/data/details/da777f29-568a-5be6-a2ea-c6836788d376?dataType=EXPERIMENTS",
        publisher: "NASA Life Sciences Portal",
      },
      {
        label: "APOD: Apollo 12, Surveyor 3 and Intrepid",
        url: "https://science.nasa.gov/image-article/apod-1999-april-08-apollo-12-surveyor-3-and-intrepid/",
        publisher: "NASA Science",
      },
    ],
  },

  // ───────────────────────────── MARS ─────────────────────────────
  {
    id: "opportunity",
    missionName: "Mars Exploration Rover",
    hardwareName: "Opportunity",
    destination: "mars",
    code: "MRS-001",
    tagline: "Built to last 90 days. It kept going for almost 15 years.",
    voice:
      "My job was 90 days and about one kilometer. I drove 45. I was still exploring when the dust storm came.",
    launchDate: "Jul 7, 2003",
    arrivalDate: "Jan 24, 2004",
    lastSignalISO: "2018-06-10",
    lastSignalLabel: "Last signal on Jun 10, 2018",
    status: "silent",
    statusNote: "Went quiet in a planet wide dust storm. Resting in Perseverance Valley.",
    plannedLife: "90 Martian days",
    actualLife: "Almost 15 years",
    heroImage: {
      src: `${JPL_IMG}/jpegPIA06739.jpg`,
      alt: "Opportunity's own shadow stretched across Martian ground inside a crater",
      caption: "Opportunity photographed its own shadow as it drove deeper into Endurance Crater in 2004.",
      credit: "NASA/JPL",
    },
    story: [
      {
        id: "mission",
        title: "The Mission",
        body: [
          "Opportunity and its twin, Spirit, were sent to Mars with one big question: was Mars ever wet enough for life?",
          "Opportunity was about the size of a golf cart and weighed 174 kg. It ran on solar power. NASA designed it to drive about 1 kilometer and work for 90 Martian days.",
        ],
        stats: [
          { value: "90 sols", label: "planned mission" },
          { value: "1 km", label: "planned driving distance" },
        ],
      },
      {
        id: "journey",
        title: "The Journey",
        body: [
          "Opportunity launched from Florida on July 7, 2003. About seven months later, on January 24, 2004, it arrived at Mars wrapped in giant airbags.",
          "It hit the ground and bounced at least 26 times before rolling to a stop. By pure luck it ended up inside a small crater, later named Eagle Crater, right next to a strip of exposed rock that scientists badly wanted to study.",
        ],
      },
      {
        id: "discovery",
        title: "The Discovery",
        body: [
          "Right at its landing site, Opportunity found hematite, a mineral that forms in water. It gave definitive proof that liquid water once existed on ancient Mars.",
          "Years later, at the rim of the 22 km wide Endeavour Crater, it found signs of ancient water that might have been similar to a drinkable pond or lake on Earth. That means this part of Mars may once have been habitable.",
          "Along the way it set records: the first to drive a marathon on another world, the steepest slope ever driven on Mars at 32 degrees, and more than 217,000 images sent home.",
        ],
        stats: [
          { value: "45.16 km", label: "total distance driven" },
          { value: "217,000+", label: "images sent to Earth" },
        ],
      },
      {
        id: "final-signal",
        title: "The Final Signal",
        body: [
          "In June 2018, a dust storm grew until it covered the entire planet. The sky went so dark that Opportunity's solar panels couldn't make enough power.",
          "Its last message reached Earth on June 10, 2018. The final image it sent was dark, noisy, and incomplete. Engineers sent more than 1,000 commands over eight months trying to wake it up. On February 12, 2019, they made one last attempt. NASA declared the mission complete the next day.",
        ],
      },
      {
        id: "legacy",
        title: "The Legacy",
        body: [
          "Opportunity outlived its planned mission about 60 times over. It rests on the western rim of Endeavour Crater, in a place called Perseverance Valley. JPL's director said he couldn't think of a more appropriate place for it to stay.",
          "Its driving record stood for years. In October 2026, NASA's Perseverance rover finally drove farther. The rover that broke the record was named Perseverance, and the old record holder rests in Perseverance Valley.",
        ],
      },
    ],
    timeline: [
      { date: "Jul 7, 2003", title: "Launches from Cape Canaveral" },
      { date: "Jan 24, 2004", title: "Bounces into Eagle Crater, Meridiani Planum" },
      { date: "Aug 9, 2011", title: "Reaches Endeavour Crater" },
      { date: "Mar 2015", title: "Becomes the first to drive a marathon on another world" },
      { date: "Jun 10, 2018", title: "Last signal during a planet wide dust storm", isFinalSignal: true },
      { date: "Feb 13, 2019", title: "NASA declares the mission complete" },
      { date: "Today", title: "Resting in Perseverance Valley" },
    ],
    location: { region: "Perseverance Valley, western rim of Endeavour Crater, Meridiani Planum, Mars" },
    funFacts: [
      "Opportunity's twin Spirit landed 20 days earlier on the other side of Mars.",
      "Winds on Mars sometimes blew the dust off its solar panels, giving it surprise power boosts.",
      "Its longest single day drive was 220 meters.",
    ],
    quiz: [
      {
        prompt: "How long was Opportunity supposed to last?",
        options: ["9 days", "90 Martian days", "9 years", "90 years"],
        answerIndex: 1,
        explanation: "It was built for 90 sols. It lasted almost 15 years, about 60 times longer.",
      },
      {
        prompt: "Which mineral did Opportunity find that proves Mars once had water?",
        options: ["Gold", "Hematite", "Diamond", "Salt"],
        answerIndex: 1,
        explanation: "Hematite forms in water, so finding it showed liquid water once existed there.",
      },
      {
        prompt: "What ended Opportunity's mission?",
        options: [
          "It fell into a crater",
          "A dust storm blocked sunlight from its solar panels",
          "It ran out of fuel",
          "A meteor hit it",
        ],
        answerIndex: 1,
        explanation: "A planet wide dust storm in 2018 cut off its solar power.",
      },
    ],
    sources: [
      { label: "Opportunity mission page", url: "https://science.nasa.gov/mission/mer-opportunity/", publisher: "NASA Science" },
      {
        label: "NASA's Opportunity Rover Mission on Mars Comes to End",
        url: "https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/",
        publisher: "NASA JPL",
      },
      {
        label: "Opportunity's Final Traverse Map",
        url: "https://www.nasa.gov/image-article/opportunitys-final-traverse-map/",
        publisher: "NASA",
      },
      {
        label: "Opportunity's Last Message",
        url: "https://www.jpl.nasa.gov/images/pia22929-opportunitys-last-message/",
        publisher: "NASA JPL",
      },
      {
        label: "NASA's Opportunity Rover Logs 15 Years on Mars",
        url: "https://www.jpl.nasa.gov/news/nasas-opportunity-rover-logs-15-years-on-mars/",
        publisher: "NASA JPL",
      },
    ],
  },

  {
    id: "ingenuity",
    missionName: "Mars 2020",
    hardwareName: "Ingenuity Helicopter",
    destination: "mars",
    code: "MRS-002",
    tagline: "The first aircraft to fly on another planet. Named by a high school student.",
    voice:
      "I was supposed to fly five times. I flew 72. I carry a tiny piece of the Wright brothers' airplane under my solar panel.",
    launchDate: "Jul 30, 2020",
    arrivalDate: "Feb 18, 2021",
    lastSignalISO: "2024-01-18",
    lastSignalLabel: "Last flight on Jan 18, 2024",
    status: "retired",
    statusNote: "Grounded by a damaged rotor blade at its final airfield in Jezero Crater.",
    plannedLife: "Up to 5 flights in 30 days",
    actualLife: "72 flights in almost 3 years",
    heroImage: {
      src: `${JPL_IMG}/1-PIA25968-Fig-A-crop.jpg`,
      alt: "The small Ingenuity helicopter standing on reddish Martian ground",
      caption: "Ingenuity seen by the Perseverance rover's Mastcam-Z camera on August 2, 2023.",
      credit: "NASA/JPL-Caltech/ASU/MSSS",
    },
    story: [
      {
        id: "mission",
        title: "The Mission",
        body: [
          "Flying on Mars is really hard. The air there is so thin that a normal helicopter couldn't lift itself. Ingenuity was a test: could anything fly there at all?",
          "To pull it off, it had to be tiny. It weighs about 4 pounds (1.8 kg) on Earth, with two rotors that spin in opposite directions at about 2,400 rpm, many times faster than a helicopter on Earth. Its body is about the size of a tissue box.",
          "Its name came from a naming contest. Vaneeza Rupani, a high school student from Alabama, suggested Ingenuity.",
        ],
        stats: [
          { value: "1.8 kg", label: "mass on Earth" },
          { value: "2,400 rpm", label: "rotor speed" },
        ],
      },
      {
        id: "journey",
        title: "The Journey",
        body: [
          "Ingenuity launched on July 30, 2020, tucked under the belly of the Perseverance rover. They landed together in Jezero Crater on February 18, 2021.",
          "On April 19, 2021, it lifted off and hovered. That was the first powered, controlled flight on another planet. NASA called it a Wright brothers moment, and the helicopter was even carrying a postage stamp sized piece of fabric from the Wright brothers' 1903 Flyer.",
        ],
      },
      {
        id: "discovery",
        title: "The Discovery",
        body: [
          "Ingenuity only had to fly five times to succeed. Instead it flew 72 times. It became a scout for Perseverance, flying ahead to look at the ground the rover might drive over.",
          "Over almost three years it flew 128.8 minutes in total, covered 17 km, reached 24 meters high, and hit 10 meters per second. It used 48 different airfields and even survived a Martian winter.",
        ],
        stats: [
          { value: "72", label: "flights (5 were planned)" },
          { value: "17 km", label: "total distance flown" },
        ],
      },
      {
        id: "final-signal",
        title: "The Final Signal",
        body: [
          "On January 18, 2024, Ingenuity made its 72nd flight. It was flying over smooth, featureless sand ripples that were hard for its navigation camera to track.",
          "About 1 meter above the ground it lost contact with Perseverance. When pictures came back days later, they showed the shadow of a broken rotor blade. It could never fly again. NASA announced the end of the mission on January 25, 2024.",
        ],
      },
      {
        id: "legacy",
        title: "The Legacy",
        body: [
          "NASA then did something new: the first aircraft accident investigation on another world. It found that the navigation system likely lost track of the ground, which led to a hard landing.",
          "Ingenuity is still standing upright at its final airfield, with a piece of one blade lying on the sand nearby. It proved that flying on other worlds is possible, just like the Wright brothers proved it on Earth. Every future Mars aircraft will build on it.",
        ],
      },
    ],
    timeline: [
      { date: "Jul 30, 2020", title: "Launches attached to Perseverance" },
      { date: "Feb 18, 2021", title: "Lands in Jezero Crater" },
      { date: "Apr 19, 2021", title: "First powered, controlled flight on another planet" },
      { date: "2023", title: "Flight tests push its speed and altitude limits" },
      { date: "Jan 18, 2024", title: "Flight 72 ends with a damaged rotor blade", isFinalSignal: true },
      { date: "Jan 25, 2024", title: "NASA announces the end of the mission" },
      { date: "Today", title: "Standing at its final airfield in Jezero Crater" },
    ],
    location: { region: "Final airfield, Jezero Crater, Mars" },
    funFacts: [
      "On Mars, Ingenuity weighs only about 1.5 pounds because Mars has weaker gravity.",
      "It flew more than 14 times farther than its original plan.",
      "It once recovered from a dead sensor and cleaned itself off after dust storms.",
    ],
    quiz: [
      {
        prompt: "How many flights was Ingenuity originally planned to make?",
        options: ["1", "Up to 5", "50", "72"],
        answerIndex: 1,
        explanation: "It was planned for up to five test flights. It made 72.",
      },
      {
        prompt: "What special item does Ingenuity carry?",
        options: [
          "A gold coin",
          "A piece of the Wright brothers' Flyer fabric",
          "A photo of Earth",
          "A Moon rock",
        ],
        answerIndex: 1,
        explanation: "A tiny swatch of muslin from the 1903 Wright Flyer is wrapped under its solar panel.",
      },
      {
        prompt: "Why did Ingenuity stop flying?",
        options: [
          "It ran out of fuel",
          "A rotor blade was damaged during a landing",
          "Perseverance ran over it",
          "Its battery froze",
        ],
        answerIndex: 1,
        explanation: "A hard landing on Flight 72 broke at least one rotor blade.",
      },
    ],
    sources: [
      {
        label: "Ingenuity Mars Helicopter",
        url: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/",
        publisher: "NASA Science",
      },
      {
        label: "After Three Years on Mars, NASA's Ingenuity Helicopter Mission Ends",
        url: "https://www.jpl.nasa.gov/news/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/",
        publisher: "NASA JPL",
      },
      {
        label: "NASA Performs First Aircraft Accident Investigation on Another World",
        url: "https://www.nasa.gov/missions/mars-2020-perseverance/nasa-performs-first-aircraft-accident-investigation-on-another-world/",
        publisher: "NASA",
      },
      {
        label: "Ingenuity Landing Press Kit: Quick Facts",
        url: "https://www.jpl.nasa.gov/news/press_kits/ingenuity/landing/quick_facts/",
        publisher: "NASA JPL",
      },
      {
        label: "Mars Report: The Most Extreme Flights of Ingenuity",
        url: "https://science.nasa.gov/resource/mars-report-the-most-extreme-flights-of-nasas-ingenuity-mars-helicopter/",
        publisher: "NASA Science",
      },
      {
        label: "Swatch of Wright Brothers Flyer 1 Attached to Mars Helicopter",
        url: "https://science.nasa.gov/photojournal/swatch-of-wright-brothers-flyer-1-attached-to-mars-helicopter/",
        publisher: "NASA Science",
      },
    ],
  },

  {
    id: "insight",
    missionName: "InSight",
    hardwareName: "InSight Lander",
    destination: "mars",
    code: "MRS-003",
    tagline: "The lander that listened to the heartbeat of Mars.",
    voice:
      "I never moved an inch. I just listened. I heard Mars shake 1,319 times, and that told us what's inside it.",
    launchDate: "May 5, 2018",
    arrivalDate: "Nov 26, 2018",
    lastSignalISO: "2022-12-15",
    lastSignalLabel: "Last contact on Dec 15, 2022",
    status: "retired",
    statusNote: "Solar panels covered in dust. Resting on the plains of Elysium Planitia.",
    actualLife: "More than 4 years",
    heroImage: {
      src: `${JPL_IMG}/jpegPIA25287.jpg`,
      alt: "The InSight lander, covered in reddish dust, photographed by its own arm camera",
      caption: "InSight's final selfie, April 24, 2022. It is far dustier than in its first selfie from 2018.",
      credit: "NASA/JPL-Caltech",
    },
    story: [
      {
        id: "mission",
        title: "The Mission",
        body: [
          "Every rover before InSight studied the surface of Mars. InSight was the first robot built to study the inside: the crust, the mantle, and the core.",
          "How do you look inside a planet? You listen. InSight carried the first seismometer ever placed on the surface of Mars. When Mars shakes, the waves travel through the planet and change depending on what they pass through.",
        ],
      },
      {
        id: "journey",
        title: "The Journey",
        body: [
          "InSight launched from California on May 5, 2018. After an almost seven month, 458 million kilometer trip, it landed on November 26, 2018 on Elysium Planitia, a flat, smooth plain near Mars' equator.",
          "Its robotic arm then carefully lifted its instruments off its deck and set them on the ground.",
        ],
        stats: [
          { value: "458 million km", label: "journey to Mars" },
          { value: "~7 months", label: "travel time" },
        ],
      },
      {
        id: "discovery",
        title: "The Discovery",
        body: [
          "InSight detected 1,319 marsquakes. The biggest, about magnitude 5, came on May 4, 2022. It also felt the ground shake from meteoroids slamming into Mars.",
          "Those quakes revealed what's inside. Mars has a liquid core about 1,830 km in radius, bigger than scientists expected. Its crust is thinner than expected and has three layers, a little like Earth's.",
          "Not everything worked. A heat probe nicknamed the mole was supposed to dig 5 meters down, but the soil was firmer than expected and it could never get deep. Sometimes space science means trying hard and learning from what didn't work.",
        ],
        stats: [
          { value: "1,319", label: "marsquakes detected" },
          { value: "1,830 km", label: "radius of the liquid core" },
        ],
      },
      {
        id: "final-signal",
        title: "The Final Signal",
        body: [
          "InSight ran on solar power. Year after year, Martian dust settled on its panels, and its power slowly dropped. Its final selfie in April 2022 shows a lander coated in red dust.",
          "Its last contact with Earth was on December 15, 2022. When it missed two calls in a row, NASA concluded its batteries had run out. The mission officially ended on December 21, 2022.",
        ],
      },
      {
        id: "legacy",
        title: "The Legacy",
        body: [
          "Scientists are still making discoveries from InSight's data years later. They've found giant lumps of debris from ancient impacts buried deep in the Martian mantle.",
          "InSight gave us the first map of another planet's insides. It showed that Mars is still an active, shaking world.",
        ],
      },
    ],
    timeline: [
      { date: "May 5, 2018", title: "Launches from Vandenberg, California" },
      { date: "Nov 26, 2018", title: "Lands on Elysium Planitia" },
      { date: "Sep 5, 2021", title: "First meteoroid impact detected by sound" },
      { date: "May 4, 2022", title: "Records a magnitude 5 marsquake, its biggest" },
      { date: "Dec 15, 2022", title: "Last contact with Earth", isFinalSignal: true },
      { date: "Dec 21, 2022", title: "NASA retires the mission" },
      { date: "Today", title: "Resting on Elysium Planitia" },
    ],
    location: { region: "Elysium Planitia, near the Martian equator" },
    funFacts: [
      "France's space agency CNES built a big part of its seismometer.",
      "It photographed clouds drifting over Mars and sunsets from the surface.",
      "Almost all of the strongest quakes came from a volcanic region called Cerberus Fossae.",
    ],
    quiz: [
      {
        prompt: "What made InSight different from Mars rovers?",
        options: [
          "It could fly",
          "It studied the inside of Mars instead of the surface",
          "It carried astronauts",
          "It drove faster",
        ],
        answerIndex: 1,
        explanation: "InSight was the first mission to study another planet's crust, mantle, and core.",
      },
      {
        prompt: "How many marsquakes did InSight detect?",
        options: ["13", "131", "1,319", "13,190"],
        answerIndex: 2,
        explanation: "Its seismometer picked up 1,319 marsquakes.",
      },
      {
        prompt: "Why did InSight stop working?",
        options: [
          "A marsquake knocked it over",
          "Dust covered its solar panels",
          "It ran out of fuel",
          "It was turned off on purpose",
        ],
        answerIndex: 1,
        explanation: "Dust on its solar panels slowly reduced its power until its batteries ran out.",
      },
    ],
    sources: [
      { label: "InSight Lander mission page", url: "https://science.nasa.gov/mission/insight/", publisher: "NASA Science" },
      {
        label: "NASA Retires InSight Mars Lander Mission After Years of Science",
        url: "https://www.jpl.nasa.gov/news/nasa-retires-insight-mars-lander-mission-after-years-of-science/",
        publisher: "NASA JPL",
      },
      {
        label: "How InSight Revealed the Heart of Mars",
        url: "https://www.jpl.nasa.gov/edu/resources/teachable-moment/how-insight-revealed-the-heart-of-mars/",
        publisher: "NASA JPL Education",
      },
      {
        label: "NASA InSight Lander Arrives on Martian Surface",
        url: "https://solarsystem.nasa.gov/news/772/nasa-insight-lander-arrives-on-martian-surface/",
        publisher: "NASA",
      },
      {
        label: "NASA Marsquake Data Reveals Lumpy Nature of Red Planet's Interior",
        url: "https://www.jpl.nasa.gov/news/nasa-marsquake-data-reveals-lumpy-nature-of-red-planets-interior/",
        publisher: "NASA JPL",
      },
    ],
  },
];
