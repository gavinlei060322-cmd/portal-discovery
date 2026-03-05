import { motion } from "framer-motion";
import { X, Footprints, Map, Sparkles, CheckSquare } from "lucide-react";
import { LandmarkData, CITY_THEMES } from "@/data/landmarks";

interface LandmarkDetailProps {
  landmark: LandmarkData;
  onClose: () => void;
}

export default function LandmarkDetail({ landmark, onClose }: LandmarkDetailProps) {
  const theme = CITY_THEMES[landmark.city] || CITY_THEMES.default;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl glass-panel"
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 120 }}
      >
        {/* Header image */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <img
            src={landmark.image}
            alt={landmark.name}
            className="w-full h-full object-cover"
            style={{ filter: theme.filter }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full glass-panel hover:bg-foreground/10 transition-colors"
          >
            <X size={16} className="text-foreground" />
          </button>
          <div className="absolute bottom-3 left-4">
            <span
              className="font-mono text-[9px] px-2 py-0.5 rounded-md tracking-wider"
              style={{
                background: `${theme.glowColor}60`,
                color: "white",
                border: `1px solid ${theme.glowColor}60`,
              }}
            >
              {theme.tag}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          <div>
            <h2 className="font-display text-xl text-foreground">{landmark.name}</h2>
            <p className="text-xs text-muted-foreground font-body">{landmark.subtitle}</p>
          </div>

          {/* Vibe Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent">
              <Sparkles size={14} />
              <span className="font-mono text-xs tracking-wider uppercase">Vibe</span>
            </div>
            <p className="text-sm text-foreground/80 font-body leading-relaxed italic">
              "{landmark.vibeDescription}"
            </p>
          </div>

          {/* Travel Gear */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent">
              <CheckSquare size={14} />
              <span className="font-mono text-xs tracking-wider uppercase">Travel Gear</span>
            </div>
            <ul className="space-y-1.5">
              {landmark.travelGear.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70 font-body">
                  <Footprints size={12} className="mt-1 text-muted-foreground shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* AI Micro-Itinerary */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent">
              <Map size={14} />
              <span className="font-mono text-xs tracking-wider uppercase">4-Hour Route</span>
            </div>
            <div className="space-y-2">
              {landmark.microItinerary.map((step, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 glass-panel rounded-lg p-2.5"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <span className="font-mono text-[10px] text-accent shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-xs text-foreground/80 font-body">{step}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
