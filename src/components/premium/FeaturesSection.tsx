import { useState, useRef, useEffect } from "react";
import { Brain, Network, Zap, Code, FileText } from "lucide-react";
import { FloatingSurface, GlassPanel, AmbientGlow } from "./DepthSystem";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

// Timeline data for the orbital visualization
const timelineData = [
  {
    id: 1,
    title: "Data Ingestion",
    date: "Real-time",
    content: "Our intelligent data ingestion layer connects seamlessly to your existing infrastructure. It pulls from ERPs, IoT sensors, logistics APIs, and third-party data sources to create a unified view of your entire supply chain in real-time.",
    category: "Input",
    icon: FileText,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Processing",
    date: "< 50ms",
    content: "Advanced machine learning models analyze millions of data points in milliseconds. Pattern recognition algorithms detect anomalies, while predictive models identify emerging trends before they become visible to traditional analytics.",
    category: "Analysis",
    icon: Code,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Prediction",
    date: "Ongoing",
    content: "Forecast potential disruptions days or weeks before they occur. Our prediction engine accounts for weather patterns, geopolitical events, supplier health, and demand fluctuations to give you actionable foresight.",
    category: "Intelligence",
    icon: Brain,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 4,
    title: "Optimization",
    date: "Continuous",
    content: "Dynamic resource allocation that adapts in real-time. Automatically rebalance inventory, reroute shipments, and adjust procurement strategies based on current conditions and predicted future states.",
    category: "Action",
    icon: Zap,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 5,
    title: "Execution",
    date: "Automated",
    content: "Seamlessly implement optimized decisions across your network. Integrations with warehouse management, transportation systems, and supplier portals ensure changes propagate instantly and accurately.",
    category: "Output",
    icon: Network,
    relatedIds: [4],
    status: "pending" as const,
    energy: 40,
  },
];

const FeaturesSection = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Header observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-32 md:py-48">
      {/* Layered ambient depth */}
      <AmbientGlow color="secondary" size="xl" intensity="medium" position="center" />
      <AmbientGlow color="primary" size="md" intensity="subtle" position="right" className="top-1/4" />
      <AmbientGlow color="accent" size="md" intensity="subtle" position="left" className="bottom-1/4" />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-20 xl:px-28">
        {/* Section header */}
        <div ref={headerRef} className="max-w-2xl mb-28 md:mb-36">
          <p 
            className={`text-[10px] tracking-[0.4em] uppercase text-primary/50 mb-10 transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Capabilities
          </p>
          <h2 
            className={`text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[-0.02em] mb-12 leading-[1.08] transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="text-foreground">A living system</span>
            <br />
            <span className="text-muted-foreground/30">that grows with you</span>
          </h2>
        </div>
        
        {/* Feature nodes - connected system visualization */}
        <div className="relative max-w-5xl mx-auto">
          {/* Orbital Timeline Visualization - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:block mb-16">
            <FloatingSurface elevation="medium" glow glowColor="primary" className="rounded-3xl">
              <GlassPanel intensity="subtle" bordered className="rounded-3xl p-6">
                <RadialOrbitalTimeline 
                  timelineData={timelineData} 
                  centerIcon={Brain}
                  centerLabel="AI Core"
                />
              </GlassPanel>
            </FloatingSurface>
          </div>
          
        </div>
      </div>
      
      {/* Morphing transition to Market */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
    </section>
  );
};

export default FeaturesSection;