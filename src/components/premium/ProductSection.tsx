import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Clock, Users, PhoneCall, CheckCircle, Zap, Brain, ArrowRight } from "lucide-react";
import { FloatingSurface, GlassPanel, AmbientGlow } from "./DepthSystem";
import FeaturesSection from "./FeaturesSection";

// Before/After comparison data
const comparisonExample = {
  scenario: "Storm Approaching Distribution Center",
  description: "A major storm is forecasted to hit your East Coast distribution center in 48 hours, threatening $2.3M in inventory and service to 340 retail locations.",
  without: {
    title: "Without Synapsio",
    timeline: [
      { icon: AlertTriangle, text: "Weather alert received via email", time: "T-48h", status: "delayed" },
      { icon: Users, text: "Manual assessment of inventory at risk", time: "T-42h", status: "delayed" },
      { icon: PhoneCall, text: "Calls to logistics partners for capacity", time: "T-36h", status: "delayed" },
      { icon: Clock, text: "Spreadsheet analysis of redistribution options", time: "T-24h", status: "delayed" },
      { icon: Users, text: "Executive approval for emergency moves", time: "T-18h", status: "delayed" },
      { icon: AlertTriangle, text: "Partial inventory moved, service disruptions", time: "T-0h", status: "failed" },
    ],
    outcome: {
      title: "Outcome",
      points: [
        "32% of inventory still at risk",
        "47 stores experience stockouts",
        "$890K in lost sales",
        "3 days to recover operations"
      ],
      sentiment: "negative"
    }
  },
  with: {
    title: "With Synapsio",
    timeline: [
      { icon: Brain, text: "AI detects weather pattern & auto-assesses risk", time: "T-72h", status: "instant" },
      { icon: Zap, text: "Optimal redistribution plan generated", time: "T-71h", status: "instant" },
      { icon: CheckCircle, text: "Carrier capacity pre-booked automatically", time: "T-70h", status: "instant" },
      { icon: ArrowRight, text: "Inventory movement begins proactively", time: "T-68h", status: "instant" },
      { icon: CheckCircle, text: "All critical inventory safely redistributed", time: "T-24h", status: "success" },
      { icon: CheckCircle, text: "Storm arrives, operations unaffected", time: "T-0h", status: "success" },
    ],
    outcome: {
      title: "Outcome",
      points: [
        "100% of inventory protected",
        "Zero store stockouts",
        "Full service continuity",
        "24h ahead of schedule"
      ],
      sentiment: "positive"
    }
  }
};

const ProductSection = () => {
  const [comparisonVisible, setComparisonVisible] = useState(false);
  const comparisonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setComparisonVisible(true);
      },
      { threshold: 0.15 }
    );
    if (comparisonRef.current) observer.observe(comparisonRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-32 md:py-48">
      <AmbientGlow color="secondary" size="xl" intensity="medium" position="center" />
      <AmbientGlow color="primary" size="md" intensity="subtle" position="right" className="top-1/4" />
      <AmbientGlow color="accent" size="md" intensity="subtle" position="left" className="bottom-1/4" />
      

      <FeaturesSection />
      
      {/* Before/After Comparison */}
      <div className="relative z-10 container mx-auto px-8 lg:px-20 xl:px-28">
        <div ref={comparisonRef}>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-6">
            Real-World Example
          </p>
          
          {/* Scenario Header */}
          <motion.div
            className={`mb-12 transition-all duration-1000 ${comparisonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h3 className="text-2xl md:text-3xl font-light text-foreground mb-3">
              {comparisonExample.scenario}
            </h3>
            <p className="text-sm text-muted-foreground/60 max-w-3xl">
              {comparisonExample.description}
            </p>
          </motion.div>
          
          {/* Side by Side Comparison */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Without Synapsio */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={comparisonVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <FloatingSurface elevation="low" className="rounded-2xl h-full">
                <GlassPanel intensity="subtle" bordered className="rounded-2xl p-8 h-full border-destructive/20">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    </div>
                    <h4 className="text-xl font-medium text-foreground">{comparisonExample.without.title}</h4>
                  </div>
                  
                  {/* Timeline */}
                  <div className="space-y-4 mb-8">
                    {comparisonExample.without.timeline.map((step, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: -10 }}
                        animate={comparisonVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                          <step.icon className="w-4 h-4 text-destructive/70" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground/80">{step.text}</p>
                          <p className="text-xs text-muted-foreground/40">{step.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Outcome */}
                  <div className="pt-6 border-t border-border/20">
                    <p className="text-xs uppercase tracking-wider text-destructive/60 mb-3">{comparisonExample.without.outcome.title}</p>
                    <ul className="space-y-2">
                      {comparisonExample.without.outcome.points.map((point, i) => (
                        <li key={i} className="text-sm text-destructive/70 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive/50" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassPanel>
              </FloatingSurface>
            </motion.div>
            
            {/* With Synapsio */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={comparisonVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <FloatingSurface elevation="medium" glow glowColor="primary" className="rounded-2xl h-full">
                <GlassPanel intensity="medium" bordered className="rounded-2xl p-8 h-full border-primary/30">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="text-xl font-medium text-foreground">{comparisonExample.with.title}</h4>
                  </div>
                  
                  {/* Timeline */}
                  <div className="space-y-4 mb-8">
                    {comparisonExample.with.timeline.map((step, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: 10 }}
                        animate={comparisonVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                          <step.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground/90">{step.text}</p>
                          <p className="text-xs text-primary/60">{step.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Outcome */}
                  <div className="pt-6 border-t border-primary/20">
                    <p className="text-xs uppercase tracking-wider text-primary/70 mb-3">{comparisonExample.with.outcome.title}</p>
                    <ul className="space-y-2">
                      {comparisonExample.with.outcome.points.map((point, i) => (
                        <li key={i} className="text-sm text-primary flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary/70" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassPanel>
              </FloatingSurface>
            </motion.div>
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
