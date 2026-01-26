import { useState, useRef, useEffect } from "react";
import { Check, Clock, ArrowRight } from "lucide-react";
import { FloatingSurface, GlassPanel, AmbientGlow } from "./DepthSystem";

const roadmapItems = [
  {
    phase: "Q1 2025",
    status: "completed" as const,
    title: "Foundation",
    description: "Core platform architecture, initial integrations with major ERPs, and pilot customer deployments.",
    milestones: ["Platform MVP launch", "SAP & Oracle connectors", "3 pilot customers live"]
  },
  {
    phase: "Q2 2025",
    status: "in-progress" as const,
    title: "Intelligence Layer",
    description: "Advanced ML models for demand forecasting, risk detection, and anomaly identification.",
    milestones: ["Predictive analytics engine", "Real-time alerting system", "Custom model training"]
  },
  {
    phase: "Q3 2025",
    status: "upcoming" as const,
    title: "Automation Suite",
    description: "End-to-end workflow automation, autonomous decision-making, and supplier management.",
    milestones: ["Workflow automation builder", "Autonomous reordering", "Supplier portal launch"]
  },
  {
    phase: "Q4 2025",
    status: "upcoming" as const,
    title: "Scale & Expand",
    description: "Multi-region deployment, advanced analytics, and ecosystem partnerships.",
    milestones: ["Global infrastructure", "Advanced BI dashboards", "Partner marketplace"]
  }
];

const RoadmapSection = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

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

  // Items observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setItemsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (itemsRef.current) observer.observe(itemsRef.current);
    return () => observer.disconnect();
  }, []);

  const getStatusStyles = (status: "completed" | "in-progress" | "upcoming") => {
    switch (status) {
      case "completed":
        return {
          dot: "bg-primary",
          line: "bg-primary/40",
          badge: "bg-primary/10 text-primary border-primary/20"
        };
      case "in-progress":
        return {
          dot: "bg-primary animate-pulse",
          line: "bg-gradient-to-b from-primary/40 to-border/20",
          badge: "bg-primary/10 text-primary border-primary/20"
        };
      case "upcoming":
        return {
          dot: "bg-border/40",
          line: "bg-border/20",
          badge: "bg-muted/50 text-muted-foreground/50 border-border/20"
        };
    }
  };

  return (
    <section className="relative py-32 md:py-48">
      {/* Layered ambient depth */}
      <AmbientGlow color="primary" size="lg" intensity="subtle" position="left" className="top-1/4" />
      <AmbientGlow color="secondary" size="md" intensity="subtle" position="right" className="bottom-1/3" />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-20 xl:px-28">
        {/* Section header */}
        <div ref={headerRef} className="max-w-2xl mb-28 md:mb-36">
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
        
        {/* Timeline */}
        <div ref={itemsRef} className="max-w-4xl mx-auto">
          <div className="relative">
            {roadmapItems.map((item, index) => {
              const styles = getStatusStyles(item.status);
              const isLast = index === roadmapItems.length - 1;
              
              return (
                <div 
                  key={item.phase}
                  className={`relative flex gap-8 md:gap-12 pb-16 last:pb-0 transition-all duration-1000 ${itemsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Timeline line and dot */}
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full ${styles.dot} flex-shrink-0 flex items-center justify-center`}>
                      {item.status === "completed" && (
                        <Check className="w-2.5 h-2.5 text-background" />
                      )}
                    </div>
                    {!isLast && (
                      <div className={`w-px flex-1 mt-4 ${styles.line}`} />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 -mt-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`text-xs tracking-wider px-3 py-1 rounded-full border ${styles.badge}`}>
                        {item.phase}
                      </span>
                      {item.status === "in-progress" && (
                        <span className="flex items-center gap-1.5 text-xs text-primary/70">
                          <Clock className="w-3 h-3" />
                          In Progress
                        </span>
                      )}
                    </div>
                    
                    <FloatingSurface 
                      elevation={item.status === "in-progress" ? "medium" : "low"}
                      glow={item.status === "in-progress"}
                      glowColor="primary"
                      className="rounded-2xl"
                    >
                      <GlassPanel 
                        intensity={item.status === "in-progress" ? "medium" : "subtle"} 
                        bordered 
                        className={`rounded-2xl p-8 ${item.status === "upcoming" ? "opacity-60" : ""}`}
                      >
                        <h3 className="text-xl font-medium text-foreground mb-3">{item.title}</h3>
                        <p className="text-sm text-muted-foreground/60 leading-relaxed mb-6">
                          {item.description}
                        </p>
                        <div className="space-y-2">
                          {item.milestones.map((milestone, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm">
                              <ArrowRight className="w-3 h-3 text-primary/50 flex-shrink-0" />
                              <span className={item.status === "completed" ? "text-muted-foreground/50" : "text-muted-foreground/40"}>
                                {milestone}
                              </span>
                            </div>
                          ))}
                        </div>
                      </GlassPanel>
                    </FloatingSurface>
                  </div>
                </div>
              );
            })}
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

export default RoadmapSection;
