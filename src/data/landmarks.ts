import cnTowerImg from "@/assets/landmark-cn-tower.png";
import banffImg from "@/assets/landmark-banff.png";
import niagaraImg from "@/assets/landmark-niagara.png";
import quebecImg from "@/assets/landmark-quebec.png";
import fujiImg from "@/assets/landmark-card.png";

export type CityTheme = "victoria" | "tokyo" | "vancouver" | "montreal" | "toronto" | "default";
export type RarityTier = "SSR" | "SR" | "R";

export interface CityThemeData {
  glowColor: string;
  glowHsl: string;
  filter: string;
  tag: string;
  particleHueRange: [number, number];
}

export const CITY_THEMES: Record<CityTheme, CityThemeData> = {
  victoria: {
    glowColor: "hsl(40 90% 50%)",
    glowHsl: "40 90% 50%",
    filter: "sepia(0.3) saturate(1.2) brightness(0.95)",
    tag: "Royal District",
    particleHueRange: [30, 50],
  },
  tokyo: {
    glowColor: "hsl(310 90% 60%)",
    glowHsl: "310 90% 60%",
    filter: "contrast(1.2) saturate(1.4) brightness(1.05)",
    tag: "Neon Sector",
    particleHueRange: [280, 330],
  },
  vancouver: {
    glowColor: "hsl(170 70% 45%)",
    glowHsl: "170 70% 45%",
    filter: "saturate(1.1) brightness(1.05)",
    tag: "Rainy Forest",
    particleHueRange: [150, 190],
  },
  montreal: {
    glowColor: "hsl(220 80% 55%)",
    glowHsl: "220 80% 55%",
    filter: "saturate(1.2) brightness(1.0)",
    tag: "Old Quarter",
    particleHueRange: [200, 240],
  },
  toronto: {
    glowColor: "hsl(0 80% 55%)",
    glowHsl: "0 80% 55%",
    filter: "saturate(1.15) contrast(1.1)",
    tag: "Metro Core",
    particleHueRange: [350, 20],
  },
  default: {
    glowColor: "hsl(270 80% 60%)",
    glowHsl: "270 80% 60%",
    filter: "none",
    tag: "Mystic Zone",
    particleHueRange: [260, 300],
  },
};

export interface LandmarkData {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  rarity: number; // 1-5 stars
  rarityTier: RarityTier;
  city: CityTheme;
  vibeDescription: string;
  travelGear: string[];
  microItinerary: string[];
}

function getRarityTier(rarity: number): RarityTier {
  if (rarity >= 5) return "SSR";
  if (rarity >= 4) return "SR";
  return "R";
}

export const landmarks: LandmarkData[] = [
  {
    id: "cn-tower",
    name: "Sky Needle",
    subtitle: "Spirit of Toronto",
    image: cnTowerImg,
    rarity: 4,
    rarityTier: "SR",
    city: "toronto",
    vibeDescription: "A blade of light piercing the endless sky — the city's heartbeat made manifest. From its crown, the world below becomes a mosaic of dreams, shimmering like scattered jewels at twilight.",
    travelGear: ["Comfortable walking shoes", "Camera with wide-angle lens", "Light jacket for observation deck wind", "Booking confirmation for EdgeWalk"],
    microItinerary: [
      "0:00 – Arrive at base, take in the tower's impossible height",
      "0:30 – Ascend to LookOut Level, gaze across Lake Ontario",
      "1:15 – Glass Floor experience — walk on air",
      "2:00 – 360 Restaurant for skyline dining",
      "3:00 – Explore the Ripley's Aquarium nearby",
      "3:45 – Sunset viewing from outdoor SkyTerrace",
    ],
  },
  {
    id: "banff",
    name: "Emerald Summit",
    subtitle: "Heart of the Rockies",
    image: banffImg,
    rarity: 5,
    rarityTier: "SSR",
    city: "vancouver",
    vibeDescription: "Where heaven meets earth in a cathedral of stone and pine. The air itself tastes of ancient glaciers, and every reflection in the turquoise lakes holds a thousand years of silence.",
    travelGear: ["Hiking boots with ankle support", "Layers for alpine weather", "Bear spray", "Trail map & compass", "Thermos with hot cocoa"],
    microItinerary: [
      "0:00 – Arrive at Lake Louise, breathe in the impossible blue",
      "0:45 – Hike the shoreline trail to the far end",
      "1:30 – Gondola ride up Sulphur Mountain",
      "2:15 – Summit boardwalk with 360° panoramic views",
      "3:00 – Hot springs soak at Banff Upper Hot Springs",
      "3:45 – Stroll Banff Avenue as golden hour paints the peaks",
    ],
  },
  {
    id: "niagara",
    name: "Thunder Cascade",
    subtitle: "Roar of Niagara",
    image: niagaraImg,
    rarity: 5,
    rarityTier: "SSR",
    city: "toronto",
    vibeDescription: "A titan's voice made of water and fury — the earth splits open and the sky weeps in magnificent surrender. Stand at the edge, and you'll feel the planet's raw, untamed pulse through your bones.",
    travelGear: ["Waterproof poncho", "Waterproof phone case", "Comfortable non-slip shoes", "Change of dry clothes"],
    microItinerary: [
      "0:00 – Hornblower cruise into the mist basin",
      "0:45 – Journey Behind the Falls tunnel experience",
      "1:30 – Walk along the Niagara Parkway scenic trail",
      "2:15 – White Water Walk along the rapids",
      "3:00 – Skylon Tower observation deck",
      "3:30 – Clifton Hill entertainment strip",
    ],
  },
  {
    id: "quebec",
    name: "Château d'Érable",
    subtitle: "Soul of Old Québec",
    image: quebecImg,
    rarity: 4,
    rarityTier: "SR",
    city: "montreal",
    vibeDescription: "Cobblestones whisper tales of New France beneath your feet. Every lantern-lit corner hides a poem, and the scent of fresh crêpes drifts through streets that remember centuries of love and revolution.",
    travelGear: ["Walking shoes for cobblestones", "Camera for architecture", "French phrasebook", "Afternoon tea reservation", "Warm scarf for river breezes"],
    microItinerary: [
      "0:00 – Enter through Porte Saint-Louis gate",
      "0:30 – Wander Rue du Petit-Champlain, the narrowest street",
      "1:15 – Ride the Funiculaire to Upper Town",
      "2:00 – Explore Château Frontenac terrace & Dufferin boardwalk",
      "2:45 – Crêperie stop on Rue Sainte-Anne",
      "3:15 – Plains of Abraham — where history was forged",
    ],
  },
  {
    id: "fuji",
    name: "Fuji no Sakura",
    subtitle: "Spirit of Mount Fuji",
    image: fujiImg,
    rarity: 5,
    rarityTier: "SSR",
    city: "tokyo",
    vibeDescription: "The sacred mountain stands in eternal meditation, crowned with snow and ringed by blossoms that fall like pink snow. At dawn, its shadow stretches across a sleeping world, whispering of impermanence and beauty.",
    travelGear: ["Layered hiking clothing", "Onigiri & water", "Camera for golden hour", "Train pass (JR)", "Portable fan for lower trails"],
    microItinerary: [
      "0:00 – Arrive at Chureito Pagoda for the iconic framing",
      "0:45 – Walk through sakura-lined paths at Arakurayama Sengen Park",
      "1:30 – Lake Kawaguchiko shoreline with reflections",
      "2:15 – Ropeway up Mt. Kachi Kachi for aerial views",
      "3:00 – Lakeside onsen with Fuji-view bath",
      "3:45 – Sunset photography from Oishi Park lavender fields",
    ],
  },
];

export function getRandomLandmark(): LandmarkData {
  return landmarks[Math.floor(Math.random() * landmarks.length)];
}
