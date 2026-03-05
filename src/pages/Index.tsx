import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Portal from "@/components/Portal";
import Starfield from "@/components/Starfield";
import TravelerJournal from "@/components/TravelerJournal";

const Index = () => {
  const [journalOpen, setJournalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <Starfield />

      {/* Title */}
      <div className="absolute top-8 left-0 right-0 z-30 text-center">
        <h1 className="font-display text-2xl tracking-[0.2em] text-foreground/80 uppercase">
          Wanderlust
        </h1>
        <p className="font-mono text-[10px] text-muted-foreground tracking-[0.3em] mt-1">GACHA TRAVEL</p>
      </div>

      {/* Floating journal button */}
      <motion.button
        className="fixed top-6 right-6 z-50 p-3 rounded-full glass-panel border border-accent/30 hover:border-accent/60 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setJournalOpen(true)}
      >
        <BookOpen size={18} className="text-accent" />
      </motion.button>

      <Portal />

      <TravelerJournal open={journalOpen} onClose={() => setJournalOpen(false)} />
    </div>
  );
};

export default Index;
