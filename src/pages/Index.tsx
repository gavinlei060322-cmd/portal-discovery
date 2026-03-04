import Portal from "@/components/Portal";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Title */}
      <div className="absolute top-8 left-0 right-0 z-30 text-center">
        <h1 className="font-display text-2xl tracking-[0.2em] text-foreground/80 uppercase">
          Wanderlust
        </h1>
        <p className="text-xs text-muted-foreground tracking-widest mt-1">Gacha Travel</p>
      </div>

      <Portal />
    </div>
  );
};

export default Index;
