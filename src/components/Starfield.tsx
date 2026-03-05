import { useMemo } from "react";
import { motion } from "framer-motion";

const STAR_COUNT = 80;

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Starfield() {
  const stars = useMemo<Star[]>(() =>
    Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 5,
      opacity: 0.3 + Math.random() * 0.7,
    })), []
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Nebula layers */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, hsl(270 60% 20% / 0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, hsl(220 60% 15% / 0.5) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, hsl(310 50% 15% / 0.4) 0%, transparent 50%)",
        }}
      />

      {/* Slow drifting nebula overlay */}
      <motion.div
        className="absolute inset-0 opacity-15"
        style={{
          background: "radial-gradient(ellipse at 60% 40%, hsl(280 70% 25% / 0.5) 0%, transparent 55%)",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Stars */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-foreground"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [s.opacity * 0.3, s.opacity, s.opacity * 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
