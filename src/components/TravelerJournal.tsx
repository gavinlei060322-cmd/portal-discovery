import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Globe, Star, Zap } from "lucide-react";
import { landmarks, CITY_THEMES } from "@/data/landmarks";
import { useCollection } from "@/hooks/useCollection";
import LandmarkDetail from "./LandmarkDetail";
import { LandmarkData } from "@/data/landmarks";

interface TravelerJournalProps {
  open: boolean;
  onClose: () => void;
}

export default function TravelerJournal({ open, onClose }: TravelerJournalProps) {
  const { isCollected, collectedCount, totalCards, citiesExplored, rareCardsFound, totalPulls } = useCollection();
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkData | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-background/85 backdrop-blur-lg" onClick={onClose} />

          <motion.div
            className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl glass-panel"
            initial={{ scale: 0.85, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 20, stiffness: 120 }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 p-4 pb-3 glass-panel rounded-t-2xl border-b border-border/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-accent" />
                  <h2 className="font-display text-lg text-foreground">Traveler Journal</h2>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-foreground/10 transition-colors">
                  <X size={16} className="text-foreground" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 p-4">
              <div className="glass-panel rounded-xl p-3 text-center">
                <Globe size={16} className="mx-auto text-accent mb-1" />
                <p className="font-mono text-lg text-foreground">{citiesExplored}</p>
                <p className="font-mono text-[9px] text-muted-foreground tracking-wider">CITIES</p>
              </div>
              <div className="glass-panel rounded-xl p-3 text-center">
                <Star size={16} className="mx-auto text-accent mb-1" />
                <p className="font-mono text-lg text-foreground">{rareCardsFound}</p>
                <p className="font-mono text-[9px] text-muted-foreground tracking-wider">RARE</p>
              </div>
              <div className="glass-panel rounded-xl p-3 text-center">
                <Zap size={16} className="mx-auto text-accent mb-1" />
                <p className="font-mono text-lg text-foreground">{totalPulls}</p>
                <p className="font-mono text-[9px] text-muted-foreground tracking-wider">PULLS</p>
              </div>
            </div>

            {/* Progress */}
            <div className="px-4 pb-2">
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
                <span>COLLECTION</span>
                <span>{collectedCount}/{totalCards}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${(collectedCount / totalCards) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
            </div>

            {/* Card grid */}
            <div className="grid grid-cols-2 gap-3 p-4">
              {landmarks.map((lm) => {
                const collected = isCollected(lm.id);
                const theme = CITY_THEMES[lm.city] || CITY_THEMES.default;
                return (
                  <motion.div
                    key={lm.id}
                    className="relative rounded-xl overflow-hidden cursor-pointer"
                    style={{
                      aspectRatio: "2/3",
                      boxShadow: collected ? `0 0 20px ${theme.glowColor}40` : "none",
                    }}
                    whileHover={collected ? { scale: 1.05 } : {}}
                    whileTap={collected ? { scale: 0.98 } : {}}
                    onClick={() => collected && setSelectedLandmark(lm)}
                  >
                    <img
                      src={lm.image}
                      alt={lm.name}
                      className="w-full h-full object-cover"
                      style={{
                        filter: collected ? theme.filter : "grayscale(1) brightness(0.3)",
                      }}
                    />
                    {collected && (
                      <div className="absolute top-1.5 left-1.5">
                        <span
                          className="font-mono text-[8px] font-bold px-1.5 py-0.5 rounded"
                          style={{
                            background: lm.rarityTier === "SSR"
                              ? "linear-gradient(135deg, hsl(45 90% 55% / 0.9), hsl(30 90% 50% / 0.9))"
                              : lm.rarityTier === "SR"
                              ? "linear-gradient(135deg, hsl(270 70% 60% / 0.8), hsl(280 80% 50% / 0.8))"
                              : "hsl(210 30% 40% / 0.7)",
                            color: "white",
                          }}
                        >
                          {lm.rarityTier}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-background/90 to-transparent">
                      <p className="font-display text-xs text-foreground truncate">
                        {collected ? lm.name : "???"}
                      </p>
                      <p className="font-mono text-[8px] text-muted-foreground">
                        {collected ? lm.subtitle : "Not discovered"}
                      </p>
                    </div>
                    {!collected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl opacity-30">?</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Sub-detail view */}
          {selectedLandmark && (
            <LandmarkDetail
              landmark={selectedLandmark}
              onClose={() => setSelectedLandmark(null)}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
