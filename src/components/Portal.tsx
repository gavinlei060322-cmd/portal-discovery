import { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandmarkCard from "./LandmarkCard";

const PARTICLE_COUNT = 28;

interface Particle {
  id: number;
  startX: number;
  startY: number;
  duration: number;
  delay: number;
  size: number;
  hue: number;
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + Math.random() * 0.5;
    const dist = 120 + Math.random() * 100;
    return {
      id: i,
      startX: Math.cos(angle) * dist,
      startY: Math.sin(angle) * dist,
      duration: 1.5 + Math.random() * 2,
      delay: Math.random() * 3,
      size: 2 + Math.random() * 4,
      hue: 260 + Math.random() * 60,
    };
  });
}

export default function Portal() {
  const [holding, setHolding] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [flash, setFlash] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const particles = useMemo(generateParticles, []);

  const startHold = useCallback(() => {
    if (revealed) return;
    setHolding(true);
    holdTimer.current = setTimeout(() => {
      setFlash(true);
      setTimeout(() => {
        setFlash(false);
        setRevealed(true);
        setHolding(false);
      }, 600);
    }, 1200);
  }, [revealed]);

  const endHold = useCallback(() => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    setHolding(false);
  }, []);

  const reset = useCallback(() => {
    setRevealed(false);
    setHolding(false);
    setFlash(false);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-portal-outer/20 via-background to-background" />

      {/* Flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            className="absolute inset-0 z-50 bg-primary-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Card reveal */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="absolute z-40 flex flex-col items-center gap-6"
            initial={{ scale: 0.3, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 100, duration: 0.8 }}
          >
            <LandmarkCard />
            <motion.button
              className="px-8 py-3 rounded-full bg-primary font-display text-primary-foreground text-sm tracking-widest uppercase hover:brightness-110 transition-all"
              whileTap={{ scale: 0.95 }}
              onClick={reset}
            >
              Summon Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portal area */}
      {!revealed && (
        <div className="relative flex items-center justify-center">
          {/* Swirl rings */}
          <div className="absolute w-72 h-72 rounded-full border border-portal-glow/20 animate-swirl-ring" />
          <div className="absolute w-56 h-56 rounded-full border border-portal-core/30 animate-swirl-ring-reverse" />
          <div className="absolute w-40 h-40 rounded-full border border-particle/20 animate-swirl-ring" style={{ animationDuration: "4s" }} />

          {/* Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full animate-particle"
              style={{
                width: p.size,
                height: p.size,
                background: `hsl(${p.hue} 80% 70%)`,
                boxShadow: `0 0 ${p.size * 2}px hsl(${p.hue} 80% 70% / 0.6)`,
                "--start-x": `${p.startX}px`,
                "--start-y": `${p.startY}px`,
                "--duration": `${p.duration}s`,
                "--delay": `${p.delay}s`,
              } as React.CSSProperties}
            />
          ))}

          {/* Core portal */}
          <motion.div
            className="relative z-10 w-36 h-36 rounded-full cursor-pointer animate-portal-pulse"
            style={{
              background: "radial-gradient(circle, hsl(var(--portal-glow)) 0%, hsl(var(--portal-core)) 40%, hsl(var(--portal-outer)) 80%, transparent 100%)",
            }}
            animate={holding ? { scale: 1.6 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 12 }}
            onPointerDown={startHold}
            onPointerUp={endHold}
            onPointerLeave={endHold}
          >
            {/* Inner bright spot */}
            <div
              className="absolute inset-4 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(var(--flash) / 0.8) 0%, hsl(var(--portal-glow) / 0.5) 50%, transparent 100%)",
              }}
            />
            {/* Swirl texture */}
            <div className="absolute inset-0 rounded-full animate-portal-swirl opacity-40"
              style={{
                background: "conic-gradient(from 0deg, transparent, hsl(var(--portal-glow) / 0.6), transparent, hsl(var(--portal-core) / 0.4), transparent)",
              }}
            />
          </motion.div>

          {/* Instruction text */}
          <motion.p
            className="absolute -bottom-20 text-muted-foreground font-body text-sm tracking-wider text-center"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Hold to summon
          </motion.p>
        </div>
      )}
    </div>
  );
}
