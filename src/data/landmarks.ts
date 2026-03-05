import cnTowerImg from "@/assets/landmark-cn-tower.png";
import banffImg from "@/assets/landmark-banff.png";
import niagaraImg from "@/assets/landmark-niagara.png";
import quebecImg from "@/assets/landmark-quebec.png";
import fujiImg from "@/assets/landmark-card.png";

export interface LandmarkData {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  rarity: number; // 1-5 stars
}

export const landmarks: LandmarkData[] = [
  {
    id: "cn-tower",
    name: "Sky Needle",
    subtitle: "Spirit of Toronto",
    image: cnTowerImg,
    rarity: 4,
  },
  {
    id: "banff",
    name: "Emerald Summit",
    subtitle: "Heart of the Rockies",
    image: banffImg,
    rarity: 5,
  },
  {
    id: "niagara",
    name: "Thunder Cascade",
    subtitle: "Roar of Niagara",
    image: niagaraImg,
    rarity: 5,
  },
  {
    id: "quebec",
    name: "Château d'Érable",
    subtitle: "Soul of Old Québec",
    image: quebecImg,
    rarity: 4,
  },
  {
    id: "fuji",
    name: "Fuji no Sakura",
    subtitle: "Spirit of Mount Fuji",
    image: fujiImg,
    rarity: 5,
  },
];

export function getRandomLandmark(): LandmarkData {
  return landmarks[Math.floor(Math.random() * landmarks.length)];
}
