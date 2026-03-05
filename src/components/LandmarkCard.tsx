import { useState } from "react";
import { motion } from "framer-motion";
import { LandmarkData, CITY_THEMES } from "@/data/landmarks";
import LandmarkDetail from "./LandmarkDetail";

interface LandmarkCardProps {
  landmark: LandmarkData;
  flipIn?: boolean;
}

export default function LandmarkCard({ landmark, flipIn = false }: LandmarkCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const [flipped, setFlipped] = useState(flipIn);
  const theme = CITY_THEMES[landmark.city] || CITY_THEMES.default;
  const stars = "★".repeat(landmark.rarity) + "☆".repeat(5 - landmark.rarity);

  const particleCount = landmark.rarityTier === "SSR" ? 12 : landmark.rarityTier === "SR" ? 7 : 4;

  // Trigger flip after mount if flipIn
  const handleFlipComplete = () => {
    if (flipIn && !flipped) return;
  };

  return (
    <>
      <motion.div
        className="relative w-72 cursor-pointer"
        style={{ perspective: 1200, aspectRatio: "2/3" }}
        onClick={() => !flipIn || flipped ? setShowDetail(true) : null}
        initial={flipIn ? { rotateY: 180 } : {}}
        animate={{ rotateY: 0 }}
        transition={flipIn ? { duration: 0.8, delay: 0.2, type: "spring", stiffness: 80, damping: 15 } : {}}
        onAnimationComplete={handleFlipComplete}
      >
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden"
          style={{
            boxShadow: `0 0 40px ${theme.glowColor}80, 0 0 80px ${theme.glowColor}30`,
            backfaceVisibility: "hidden",
          }}
        >
          {/* Landscape background with slow zoom & city filter */}
          <motion.img
            src={landmark.image}
            alt={`${landmark.name} landscape`}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            style={{ filter: theme.filter }}
            initial={{ scale: 1.2 }}
            animate={{ scale: [1.2, 1.05, 1.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Animated themed border */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            style={{
              border: `2px solid ${theme.glowColor}80`,
              boxShadow: `inset 0 0 20px ${theme.glowColor}25`,
            }}
            animate={{
              boxShadow: [
                `inset 0 0 20px ${theme.glowColor}15`,
                `inset 0 0 40px ${theme.glowColor}35`,
                `inset 0 0 20px ${theme.glowColor}15`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Floating particles — density by rarity */}
          {[...Array(particleCount)].map((_, i) => {
            const hueMin = theme.particleHueRange[0];
            const hueMax = theme.particleHueRange[1];
            const hue = hueMin + Math.random() * (hueMax - hueMin + (hueMax < hueMin ? 360 : 0));
            return (
              <motion.div
                key={i}
                className="absolute rounded-full z-20"
                style={{
                  width: 3 + Math.random() * 3,
                  height: 3 + Math.random() * 3,
                  left: `${10 + Math.random() * 80}%`,
                  background: `hsl(${hue} 80% 70%)`,
                  boxShadow: `0 0 6px hsl(${hue} 80% 70% / 0.6)`,
                  filter: "blur(0.5px)",
                }}
                initial={{ bottom: "-5%", opacity: 0 }}
                animate={{ bottom: "105%", opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* Rarity badge */}
          <div className="absolute top-3 left-3 z-20">
            <motion.span
              className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider backdrop-blur-sm"
              style={{
                background: landmark.rarityTier === "SSR"
                  ? "linear-gradient(135deg, hsl(45 90% 55% / 0.9), hsl(30 90% 50% / 0.9))"
                  : landmark.rarityTier === "SR"
                  ? "linear-gradient(135deg, hsl(270 70% 60% / 0.8), hsl(280 80% 50% / 0.8))"
                  : "hsl(210 30% 40% / 0.7)",
                color: "white",
                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {landmark.rarityTier}
            </motion.span>
          </div>

          {/* City theme tag */}
          <div className="absolute top-3 right-3 z-20">
            <span
              className="font-mono text-[9px] px-2 py-0.5 rounded-md tracking-wider backdrop-blur-sm"
              style={{
                background: `${theme.glowColor}40`,
                color: "white",
                border: `1px solid ${theme.glowColor}60`,
                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              {theme.tag}
            </span>
          </div>

          {/* Stars */}
          <motion.div
            className="absolute top-10 right-3 z-20"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-xs font-display tracking-widest text-accent drop-shadow-[0_0_6px_hsl(var(--gold)/0.8)]">
              {stars}
            </span>
          </motion.div>

          {/* Info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-background/90 via-background/50 to-transparent">
            <motion.h3
              className="font-display text-lg text-foreground leading-tight"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {landmark.name}
            </motion.h3>
            <motion.p
              className="text-xs text-muted-foreground mt-0.5 font-body"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {landmark.subtitle}
            </motion.p>
          </div>

          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              background: `linear-gradient(105deg, transparent 40%, ${theme.glowColor}30 48%, hsl(var(--gold) / 0.1) 52%, transparent 60%)`,
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2.5 }}
          />
        </div>
      </motion.div>

      {/* Detail modal */}
      {showDetail && (
        <LandmarkDetail landmark={landmark} onClose={() => setShowDetail(false)} />
      )}
    </>
  );
}
