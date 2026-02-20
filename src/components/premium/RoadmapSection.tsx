import { useState, useRef, useEffect } from "react";
import { Check, Clock, ArrowRight } from "lucide-react";
import { FloatingSurface, GlassPanel, AmbientGlow } from "./DepthSystem";
import { Timeline } from "@/components/ui/timeline";

const roadmapData = [
  {
    title: "Q1 2025",
    content: (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs tracking-wider px-3 py-1 rounded-full border bg-primary/10 text-primary border-primary/20">
            In Progress
          </span>
          <span className="flex items-center gap-1.5 text-xs text-primary/70">
            <Clock className="w-3 h-3" />
            Current Phase
          </span>
        </div>
        <FloatingSurface elevation="medium" glow glowColor="primary" className="rounded-2xl">
          <GlassPanel intensity="medium" bordered className="rounded-2xl p-6 md:p-8">
            <h4 className="text-xl font-medium text-foreground mb-3">Foundation</h4>
            <p className="text-sm text-muted-foreground/60 leading-relaxed mb-6">
              Core platform architecture and investor-ready traction.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <ArrowRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                <span className="text-muted-foreground/40">Platform MVP launch</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ArrowRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                <span className="text-muted-foreground/40">ERP connectors</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ArrowRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                <span className="text-muted-foreground/40">Pilot customer deployments</span>
              </div>
            </div>
          </GlassPanel>
        </FloatingSurface>
      </div>
    ),
  },
  {
    title: "Q2 2025",
    content: (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs tracking-wider px-3 py-1 rounded-full border bg-muted/50 text-muted-foreground/50 border-border/20">
            Upcoming
          </span>
        </div>
        <FloatingSurface elevation="low" className="rounded-2xl">
          <GlassPanel intensity="subtle" bordered className="rounded-2xl p-6 md:p-8 opacity-60">
            <h4 className="text-xl font-medium text-foreground mb-3">Intelligence Layer</h4>
            <p className="text-sm text-muted-foreground/60 leading-relaxed mb-6">
              Advanced ML models for demand forecasting, risk detection, and anomaly identification.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <ArrowRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                <span className="text-muted-foreground/40">Predictive analytics engine</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ArrowRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                <span className="text-muted-foreground/40">Real-time alerting system</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ArrowRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                <span className="text-muted-foreground/40">Custom model training</span>
              </div>
            </div>
          </GlassPanel>
        </FloatingSurface>
      </div>
    ),
  },
  {
    title: "Q3 2025",
    content: (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs tracking-wider px-3 py-1 rounded-full border bg-muted/50 text-muted-foreground/50 border-border/20">
            Upcoming
          </span>
        </div>
        <FloatingSurface elevation="low" className="rounded-2xl">
          <GlassPanel intensity="subtle" bordered className="rounded-2xl p-6 md:p-8 opacity-60">
            <h4 className="text-xl font-medium text-foreground mb-3">Automation Suite</h4>
            <p className="text-sm text-muted-foreground/60 leading-relaxed mb-6">
              End-to-end workflow automation, autonomous decision-making, and supplier management.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <ArrowRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                <span className="text-muted-foreground/40">Workflow automation builder</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ArrowRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                <span className="text-muted-foreground/40">Autonomous reordering</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ArrowRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                <span className="text-muted-foreground/40">Supplier portal launch</span>
              </div>
            </div>
          </GlassPanel>
        </FloatingSurface>
      </div>
    ),
  },
  {
    title: "Q4 2025",
    content: (
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs tracking-wider px-3 py-1 rounded-full border bg-muted/50 text-muted-foreground/50 border-border/20">
            Upcoming
          </span>
        </div>
        <FloatingSurface elevation="low" className="rounded-2xl">
          <GlassPanel intensity="subtle" bordered className="rounded-2xl p-6 md:p-8 opacity-60">
            <h4 className="text-xl font-medium text-foreground mb-3">Scale & Expand</h4>
            <p className="text-sm text-muted-foreground/60 leading-relaxed mb-6">
              Multi-region deployment, advanced analytics, and ecosystem partnerships.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <ArrowRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                <span className="text-muted-foreground/40">Global infrastructure</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ArrowRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                <span className="text-muted-foreground/40">Advanced BI dashboards</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ArrowRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                <span className="text-muted-foreground/40">Partner marketplace</span>
              </div>
            </div>
          </GlassPanel>
        </FloatingSurface>
      </div>
    ),
  },
];

const RoadmapSection = () => {
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
      <AmbientGlow color="primary" size="lg" intensity="subtle" position="left" className="top-1/4" />
      <AmbientGlow color="secondary" size="md" intensity="subtle" position="right" className="bottom-1/3" />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-20 xl:px-28">
        {/* Section header */}
        <div ref={headerRef} className="max-w-2xl mb-16 md:mb-24">
          <p 
            className={`text-[10px] tracking-[0.4em] uppercase text-primary/50 mb-10 transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Roadmap
          </p>
          <h2 
            className={`text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[-0.02em] mb-12 leading-[1.08] transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="text-foreground">The path</span>
            <br />
            <span className="text-muted-foreground/30">ahead</span>
          </h2>
        </div>
        
        {/* Scroll-animated Timeline */}
        <Timeline data={roadmapData} />
      </div>
      
    </section>
  );
};

export default RoadmapSection;
