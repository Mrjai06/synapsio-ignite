import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AmbientGlow } from "./DepthSystem";
import FeaturesSection from "./FeaturesSection";
import NetworkVisualization from "./NetworkVisualization";
import NetworkSidePanel from "./NetworkSidePanel";

const ProductSection = () => {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Phase progression: idle → events → recalculating → rebalanced
  useEffect(() => {
    if (!sectionVisible) return;
    const timers = [
      setTimeout(() => setActivePhase(1), 1500),   // events appear
      setTimeout(() => setActivePhase(2), 4000),    // recalculating
      setTimeout(() => setActivePhase(3), 7000),    // rebalanced
    ];
    return () => timers.forEach(clearTimeout);
  }, [sectionVisible]);

  return (
    <section className="relative py-32 md:py-48">
      <AmbientGlow color="secondary" size="xl" intensity="medium" position="center" />
      <AmbientGlow color="primary" size="md" intensity="subtle" position="right" className="top-1/4" />
      <AmbientGlow color="accent" size="md" intensity="subtle" position="left" className="bottom-1/4" />

      <FeaturesSection />

      {/* Autonomous Network Visualization */}
      <div className="relative z-10 container mx-auto px-8 lg:px-20 xl:px-28">
        <div ref={sectionRef}>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-6">
            Autonomous Network in Action
          </p>

          {/* Header */}
          <motion.div
            className={`mb-12 transition-all duration-1000 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h3 className="text-2xl md:text-3xl font-light text-foreground mb-3">
              A Day Inside an Autonomous Supply Chain
            </h3>
            <p className="text-sm text-muted-foreground/60 max-w-3xl">
              Demand shifts, supplier delays, capacity constraints, and cost changes happen simultaneously.
              Synapsio continuously re-optimizes the entire network.
            </p>
          </motion.div>

          {/* Network + Side Panel */}
          <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
            <NetworkVisualization visible={sectionVisible} activePhase={activePhase} />
            <NetworkSidePanel visible={sectionVisible} activePhase={activePhase} />
          </div>
        </div>
      </div>

      {/* Morphing transition */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
    </section>
  );
};

export default ProductSection;
