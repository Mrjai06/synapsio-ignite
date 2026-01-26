import { useState, useRef, useEffect } from "react";
import { Brain, Network, Zap, Code, FileText, Lightbulb, Package, TrendingUp } from "lucide-react";
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

const examples = [
  {
    icon: Package,
    title: "Inventory Rebalancing",
    description: "When a storm threatens a distribution center, Synapsio automatically redistributes inventory to nearby facilities before impact—maintaining service levels without manual intervention."
  },
  {
    icon: TrendingUp,
    title: "Demand Surge Response",
    description: "Detect social media trends and purchase patterns to predict demand spikes 72 hours early, giving your team time to adjust production and logistics accordingly."
  },
  {
    icon: Lightbulb,
    title: "Supplier Risk Mitigation",
    description: "Continuous monitoring of supplier health indicators alerts you to potential disruptions. Alternative sourcing recommendations appear instantly when risk thresholds are exceeded."
  }
];

const ProductSection = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [explanationVisible, setExplanationVisible] = useState(false);
  const [examplesVisible, setExamplesVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);

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

  // Explanation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setExplanationVisible(true);
      },
      { threshold: 0.2 }
    );
    if (explanationRef.current) observer.observe(explanationRef.current);
    return () => observer.disconnect();
  }, []);

  // Examples observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setExamplesVisible(true);
      },
      { threshold: 0.2 }
    );
    if (examplesRef.current) observer.observe(examplesRef.current);
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
            Our Product
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
        
        {/* Subcategory 1: Explanation */}
        <div ref={explanationRef} className="mb-32 md:mb-48">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-12">
            Explanation
          </p>
          <div 
            className={`max-w-3xl transition-all duration-1000 ${explanationVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="text-xl md:text-2xl text-muted-foreground/70 leading-relaxed mb-8">
              Synapsio is an AI-native supply chain intelligence platform that transforms fragmented data into actionable insights. Unlike legacy systems that require months of integration, our platform connects to your existing infrastructure in weeks.
            </p>
            <p className="text-lg text-muted-foreground/50 leading-relaxed">
              By continuously analyzing patterns across your entire supply network, we predict disruptions before they occur, optimize inventory in real-time, and automate routine decisions—freeing your team to focus on strategic initiatives.
            </p>
          </div>
        </div>
        
        {/* Subcategory 2: Key Features */}
        <div className="mb-32 md:mb-48">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-12">
            Key Features
          </p>
          <div className="relative max-w-5xl mx-auto">
            {/* Orbital Timeline Visualization - Hidden on mobile, shown on larger screens */}
            <div className="hidden lg:block">
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
            
            {/* Mobile fallback - simple list */}
            <div className="lg:hidden space-y-6">
              {timelineData.map((item, index) => (
                <FloatingSurface key={item.id} elevation="low" className="rounded-2xl">
                  <GlassPanel intensity="subtle" bordered className="rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-foreground mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground/60 leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  </GlassPanel>
                </FloatingSurface>
              ))}
            </div>
          </div>
        </div>
        
        {/* Subcategory 3: Everyday Examples */}
        <div ref={examplesRef}>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-12">
            Everyday Examples
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <FloatingSurface 
                key={index} 
                elevation="low" 
                className={`rounded-2xl transition-all duration-1000 ${examplesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <GlassPanel intensity="subtle" bordered className="rounded-2xl p-8 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <example.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-medium text-foreground mb-4">{example.title}</h4>
                  <p className="text-sm text-muted-foreground/60 leading-relaxed">{example.description}</p>
                </GlassPanel>
              </FloatingSurface>
            ))}
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
