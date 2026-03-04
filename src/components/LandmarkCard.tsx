import { motion } from "framer-motion";
import cardImage from "@/assets/landmark-card.png";

export default function LandmarkCard() {
  return (
    <motion.div
      className="relative w-64 rounded-xl overflow-hidden shadow-2xl"
      style={{
        boxShadow: "0 0 40px hsl(var(--gold) / 0.4), 0 0 80px hsl(var(--portal-glow) / 0.2)",
      }}
    >
      {/* Card image */}
      <img
        src={cardImage}
        alt="Mount Fuji Spirit - Legendary Landmark Character"
        className="w-full h-auto block"
        draggable={false}
      />

      {/* Info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/95 via-background/60 to-transparent">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-display tracking-widest text-accent uppercase">★★★★★</span>
        </div>
        <h3 className="font-display text-lg text-foreground leading-tight">Fuji no Sakura</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Spirit of Mount Fuji</p>
      </div>

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, hsl(var(--flash) / 0.15) 50%, transparent 60%)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />
    </motion.div>
  );
}
