import { motion } from "framer-motion";
import cardImage from "@/assets/landmark-card.png";

export default function LandmarkCard() {
  return (
    <motion.div
      className="relative w-72 rounded-2xl overflow-hidden"
      style={{
        boxShadow: "0 0 40px hsl(var(--gold) / 0.4), 0 0 80px hsl(var(--portal-glow) / 0.2)",
        aspectRatio: "2/3",
      }}
    >
      {/* Landscape background with slow zoom */}
      <motion.img
        src={cardImage}
        alt="Mount Fuji landscape with cherry blossoms"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        initial={{ scale: 1.2 }}
        animate={{ scale: [1.2, 1.05, 1.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated golden border */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{
          border: "2px solid hsl(var(--gold) / 0.5)",
          boxShadow: "inset 0 0 20px hsl(var(--gold) / 0.15)",
        }}
        animate={{ borderColor: ["hsl(45 90% 55% / 0.3)", "hsl(45 90% 55% / 0.7)", "hsl(45 90% 55% / 0.3)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Floating particles over the card */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent/60 z-20"
          style={{
            width: 3 + Math.random() * 3,
            height: 3 + Math.random() * 3,
            left: `${15 + Math.random() * 70}%`,
            filter: "blur(0.5px)",
          }}
          initial={{ bottom: "-5%", opacity: 0 }}
          animate={{ bottom: "105%", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Top rarity stars with glow */}
      <motion.div
        className="absolute top-3 right-3 z-20"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-sm font-display tracking-widest text-accent drop-shadow-[0_0_6px_hsl(var(--gold)/0.8)]">
          ★★★★★
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
          Fuji no Sakura
        </motion.h3>
        <motion.p
          className="text-xs text-muted-foreground mt-0.5"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Spirit of Mount Fuji
        </motion.p>
      </div>

      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background: "linear-gradient(105deg, transparent 40%, hsl(var(--flash) / 0.2) 48%, hsl(var(--gold) / 0.1) 52%, transparent 60%)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2.5 }}
      />
    </motion.div>
  );
}
