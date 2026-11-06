export interface Faction {
  id: string;
  tabLabel: string;
  name: string;
  subtitle?: string;
  classification: string;
  hq: string;
  motto: string;
  summary: string[];
  dossier: {
    label: string;
    value: string;
  }[];
  intel: string[];
}

export interface TimelineEntry {
  id: string;
  year: string;
  title?: string;
  summary: string;
  details?: string;
  tag?: string;
  isCurrentEpoch?: boolean;
}

export const FACTIONS_DATA: Faction[] = [
  {
    id: "vischem",
    tabLabel: "Vischem",
    name: "VISCHEM",
    subtitle: "INTEGRATED BIOSYSTEMS",
    classification: "Swiss Biomedical Component Manufacturer",
    hq: "Basel, Switzerland (Secondary: Bengaluru, India)",
    motto: "We are not the cure. We are the reason the cure is possible.",
    summary: [
      "Vischem does not make drugs. It does not make devices. It makes the parts that make the parts that save lives — microfluidic chips, bioreactor membranes, precision-cast surgical instrument components, pharmaceutical-grade polymer compounds. If a hospital is running dialysis, a lab is culturing cells, or a factory is filling vaccine vials, there is a reasonable chance a Vischem component is somewhere in that chain.",
      "This invisibility is not accidental. It is the company's greatest strategic asset — and, from 2011 onward, the Covenant Group's most important protection."
    ],
    dossier: [
      { label: "FOUNDED", value: "1987, Basel (Ernst Vischer)" },
      { label: "STOCK TICKER", value: "VIB (SIX Swiss Exchange)" },
      { label: "SUBSIDIARIES", value: "Vischem India Ltd (Hosur Rd, Bengaluru)" },
      { label: "KEY ASSET", value: "Lipid Nanoparticle Delivery Platform (VIB-C19T)" }
    ],
    intel: [
      "Their COVID-19 therapeutic trial in Bengaluru was never solely a medical programme. It was a field test for a nutritional payload delivery platform.",
      "Its catastrophic failure in early 2022 produced the mutated B.1.VIB variant that now sweeps across South India.",
      "Design language: monochrome black and white, cold, institutional, permanent."
    ]
  },
  {
    id: "covenant",
    tabLabel: "Covenant",
    name: "THE COVENANT GROUP",
    classification: "Transnational Strategic Syndicate",
    hq: "Decentralized (Constituted in Geneva, 1994)",
    motto: "The most durable form of control is dependency.",
    summary: [
      "The Covenant Group is not an organisation. It has no legal existence, no headquarters, no employees, no bank account, no registered name. What it has is a portfolio of relationships — between companies, between governments, between academic institutions — managed the way a conductor manages an orchestra. No single instrument knows the full score.",
      "It was formed in 1994 by seven individuals who shared a worldview, a reading of history, and a patience that most people who want power do not have. Their thesis was simple, cold, and in their own estimation, correct: the most durable form of control is not force. It is dependency. And the most durable form of dependency is one the dependent population actively welcomes.",
      "They have never been wrong about anything that mattered. That is the most important thing to understand about them."
    ],
    dossier: [
      { label: "ORIGIN", value: "Geneva, October 14, 1994" },
      { label: "CORE MEMBERS", value: "Seven European individuals (Finance, BioTech, Intelligence)" },
      { label: "FRONT ENTITIES", value: "Alivar Lifesciences, Vischer Family Trust" },
      { label: "OBJECTIVE", value: "Transition global food consumption to synthetic supplement monopoly" }
    ],
    intel: [
      "The Huxleyan antagonist — they are not trying to hurt anyone. They are trying to make everyone comfortable enough to stop asking questions.",
      "They watched the Soviet Union collapse and extracted the blueprint: institutional replacement at population scale under the banner of modernity and efficiency."
    ]
  },
  {
    id: "meridian",
    tabLabel: "Meridian",
    name: "MERIDIAN",
    classification: "Covert Counter-Syndicate Network",
    hq: "Classified / Dispersed Cells across Kerala & Bengaluru",
    motto: "acknowledge. overcome.",
    summary: [
      "MERIDIAN has no public name. No registered entity. No official existence of any kind. It appears in the world only as a pattern — a series of events that should not be connected but are, a series of people who should not know each other but do, a series of outcomes that should not have been possible but happened anyway.",
      "It is a small, extraordinarily well-resourced covert network that has spent the better part of a decade mapping the Covenant Group's infrastructure — its shell companies, its funding routes, its facility locations, its human assets — and is now, in 2022, in a position to act."
    ],
    dossier: [
      { label: "CLASSIFICATION", value: "Autonomous Non-State Intelligence Network" },
      { label: "SYMBOLOGY", value: "Ghost Bull, Deep Crimson & Tactical Carbon" },
      { label: "PRIMARY TARGET", value: "Covenant Group infrastructure & Vischem BSL-2 Labs" },
      { label: "SPECIAL ASSETS", value: "Wrist-Mounted Time-Navigators (Asterisk Prototype)" }
    ],
    intel: [
      "Not a government agency; not a humanitarian NGO. They act directly through asymmetric strikes and covert extraction.",
      "Their protagonists refuse to stop moving inside a world that has decided to stay bad."
    ]
  },
  {
    id: "asterisk",
    tabLabel: "Asterisk",
    name: "ASTERISK INCORPORATED",
    classification: "Off-World Resource & Materials Conglomerate",
    hq: "Houston, Texas (Registered: Luxembourg, 2016)",
    motto: "Resources for the next era.",
    summary: [
      "Asterisk Incorporated is the world's leading private off-world materials extraction and resource prospecting company. It is what SpaceX would be if SpaceX was not interested in taking people to space — only in what space contains and what it is worth.",
      "Publicly: a Luxembourg-incorporated megacorp with a majority ownership consortium of American, Japanese, and Indian sovereign wealth vehicles, an operational partnership with ISRO's commercial arm, and a rapidly growing portfolio of off-world extraction patents, prospecting licences, and resource claims across near-Earth asteroids, the lunar surface, and Mars.",
      "Privately: the entity whose 2019 lunar south pole finding changed the Covenant Group's timeline and, by chain of consequence, produced B.1.VIB, destabilised Kerala, and set the events of this game in motion."
    ],
    dossier: [
      { label: "FOUNDED", value: "2016, Luxembourg / Houston" },
      { label: "LUNAR BASE", value: "Shackleton Crater Rim, Lunar South Pole (2021)" },
      { label: "MARS OUTPOST", value: "Hellas Planitia Basin (2022)" },
      { label: "KEY ALLIANCE", value: "ISRO Commercial Arm (Antrix / NSIL)" }
    ],
    intel: [
      "Asterisk did not intend the catastrophe in Kerala. What it found at the lunar south pole remains the central classified secret.",
      "Design language: warm blue gradient, approachable, optimistic — the visual camouflage of an off-world monopoly."
    ]
  }
];

export const TIMELINE_DATA: TimelineEntry[] = [
  {
    id: "1987",
    year: "1987",
    title: "FOUNDATION OF VISCHEM",
    summary: "Ernst Vischer, polymer chemist, founds Vischem GmbH in Basel, Switzerland. First products: medical-grade tubing, bioreactor seals, dialysis membranes. Genuine scientific idealism. No political agenda."
  },
  {
    id: "1991",
    year: "1987",
    title: "THE LESSON OF COLLAPSE",
    summary: "Soviet Union collapses. Western economists and investment bankers pour into Moscow to advise on privatisation. A small number of them watch the process closely and draw a different conclusion than most about the mechanics of institutional collapse and population dependency."
  },
  {
    id: "1996",
    year: "1996",
    title: "THE BIOCHEMICAL PIVOT",
    summary: "Vischem pivots into biochemical compounds. Renames to Vischem Integrated BioSystems. Begins supplying pharmaceutical-grade polymer substrates and microfluidic diagnostic components to major pharmaceutical manufacturers globally. Becomes quietly essential to multiple supply chains."
  },
  {
    id: "1999",
    year: "1999",
    title: "THE NUTRITION TRANSITION THESIS",
    summary: "A foundational private paper that was never published, never leaked was circulated around the world — outlining the nutrition transition thesis: synthetic supplement dependency as the endpoint of a controlled, patient, multi-decade programme targeting emerging market populations."
  },
  {
    id: "1999-b",
    year: "1999",
    title: "CONSOLIDATION OF INFLUENCE",
    summary: "Decades were spent building positions — in pharmaceutical investment, agricultural commodity trading, European sovereign wealth management, and intelligence-adjacent policy advisory. Purpose: complete infrastructure building without public exposure."
  },
  {
    id: "2011",
    year: "2011",
    title: "CO-OPTION OF VISCHEM",
    summary: "The Covenant Group identifies Vischem Integrated BioSystems as the ideal vehicle for its delivery platform programme. The Vischer Family Trust's outside board is quietly acquired through Geneva nominee accounts."
  },
  {
    id: "2016",
    year: "2016",
    title: "BENGALURU EXPANSION & ASTERISK",
    summary: "Vischem opens its high-containment facility on Hosur Road in Bengaluru. Simultaneously, Asterisk Incorporated is formally established in Luxembourg, partnering with ISRO for deep-space resource extraction."
  },
  {
    id: "2019",
    year: "2019",
    title: "THE LUNAR ANOMALY",
    summary: "Asterisk crew at Shackleton Crater Rim makes an unannounced discovery at the Lunar South Pole. Covenant Group accelerates its schedule by a decade, forcing rapid live trials of the VIB-C19T platform."
  },
  {
    id: "2021",
    year: "2021",
    title: "THE OUTBREAK: B.1.VIB",
    summary: "A leak from the VIB-C19T trial in Bengaluru mutates into SARS-CoV-2 strain B.1.VIB. Pharmaceutical supply chains shatter across South India as Colombo port halts operations."
  },
  {
    id: "2022",
    year: "2022",
    title: "CRISIS IN KERALA — GAME BEGINS",
    summary: "Kerala collapses across seven districts. Tamil Nadu seals borders. In Varkala, a suspended cop, a frightened bureaucrat, and an unnamed MERIDIAN operative intersect to expose the architecture of dependency.",
    isCurrentEpoch: true
  }
];

export const GAME_DETAILS = {
  title: "FORWARD MERIDIAN",
  logline: "A sci-fi first person shooter set in a collapsing Kerala — Marathon-inspired retro-futurism, tactile gunplay, and time-navigation stealth.",
  engine: "Godot 4 Engine",
  setting: "Kochi, Varkala & Aravinda-1 Space Elevator, Kerala (2022 - 2041)",
  playUrl: "https://drive.google.com/drive/folders/1ev6FK1xuq88BIPYJkV__uL-1AZV_Cbu0?usp=sharing",
  githubUrl: "https://github.com/itcodehery/Forward-Meridian-Game",
  weapons: [
    { name: "G17 Laser Pistol", faction: "Amperdune Tech", type: "Energy Sidearm", note: "High-cadence pulse pistol issued to private corporate security." },
    { name: "F30 Xenia Assault Rifle", faction: "Misriah Armory", type: "Kinetic Assault", note: "Standard issue military rifle chambered in high-velocity rounds." },
    { name: "BR20 Switcher Rifle", faction: "Misriah Armory", type: "Burst DMR", note: "Modular selective-fire rifle with dual optics." },
    { name: "RPR Combat Shotgun", faction: "Misriah Armory", type: "Close Quarters", note: "Tear-down breaching weapon effective against armored drones." }
  ]
};
