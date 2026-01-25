import { useState, useRef, useEffect } from "react";
import { X, Activity, Brain, Network, Shield, Zap, LineChart } from "lucide-react";
import { FloatingSurface, GlassPanel, AmbientGlow } from "./DepthSystem";

const features = [
  {
    id: "intelligence",
    icon: Brain,
    title: "Predictive Intelligence",
    subtitle: "Anticipate before disruptions occur",
    description: "Machine learning models trained on millions of supply chain events identify patterns and predict disruptions 2-3 weeks before they impact operations.",
    details: [
      "Multi-variable demand forecasting",
      "Supplier risk scoring in real-time",
      "Automated scenario planning"
    ]
  },
  {
    id: "visibility",
    icon: Activity,
    title: "End-to-End Visibility",
    subtitle: "Single source of truth",
    description: "Unified data layer connects every system, partner, and process into a coherent view. No more data silos or reconciliation gaps.",
    details: [
      "Real-time inventory positions",
      "Live shipment tracking",
      "Cross-functional dashboards"
    ]
  },
  {
    id: "orchestration",
    icon: Network,
    title: "Dynamic Orchestration",
    subtitle: "Adaptive coordination at scale",
    description: "Autonomous workflows adjust in real-time based on changing conditions. Resources reallocate automatically to optimize outcomes.",
    details: [
      "Event-driven automation",
      "Multi-tier supplier coordination",
      "Intelligent routing optimization"
    ]
  },
  {
    id: "resilience",
    icon: Shield,
    title: "Operational Resilience",
    subtitle: "Built for uncertainty",
    description: "Redundancy mapping, alternative sourcing, and contingency planning ensure operations continue even when disruptions occur.",
    details: [
      "Dual-sourcing recommendations",
      "Buffer inventory optimization",
      "Recovery time simulation"
    ]
  },
  {
    id: "speed",
    icon: Zap,
    title: "Decision Velocity",
    subtitle: "From insight to action in seconds",
    description: "Reduce decision cycles from days to minutes. Automated recommendations with human-in-the-loop controls for critical choices.",
    details: [
      "One-click decision execution",
      "Approval workflow automation",
      "Impact simulation before action"
    ]
  },
  {
    id: "analytics",
    icon: LineChart,
    title: "Performance Analytics",
    subtitle: "Measure what matters",
    description: "Comprehensive KPI tracking across every dimension of supply chain performance. Benchmark against industry peers.",
    details: [
      "Custom metric definitions",
      "Root cause analysis",
      "Trend identification"
    ]
  }
];

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(features.length).fill(false));
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  
  const selectedFeature = features.find(f => f.id === activeFeature);

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

  // Staggered reveal on scroll
  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      if (!card) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards(prev => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }, index * 120);
          }
        },
        { threshold: 0.2 }
      );
      
      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, []);

  // Handle panel open/close with animation delay
  useEffect(() => {
    if (activeFeature) {
      setPanelVisible(true);
    }
  }, [activeFeature]);

  const handleClosePanel = () => {
    setPanelVisible(false);
    setTimeout(() => setActiveFeature(null), 500);
  };

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
          {/* Central core with pulse */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:flex">
            <div className="relative">
              <div 
                className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-transparent border border-border/20 flex items-center justify-center transition-all duration-1000"
                style={{
                  boxShadow: hoveredFeature ? "0 0 60px -15px hsl(var(--primary) / 0.4)" : "none"
                }}
              >
                <div className="w-8 h-8 bg-primary/30 rounded-full animate-pulse" style={{ animationDuration: "3s" }} />
              </div>
              
              {/* Connection lines to hovered card */}
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible', width: '400px', height: '400px', left: '-188px', top: '-188px' }}>
                {features.map((feature, i) => {
                  const isHovered = hoveredFeature === feature.id;
                  const angle = ((i / features.length) * Math.PI * 2) - Math.PI / 2;
                  const radius = 180;
                  const endX = 200 + Math.cos(angle) * radius;
                  const endY = 200 + Math.sin(angle) * radius;
                  
                  return (
                    <line
                      key={feature.id}
                      x1="200"
                      y1="200"
                      x2={endX}
                      y2={endY}
                      stroke={`hsl(var(--primary) / ${isHovered ? 0.4 : 0.08})`}
                      strokeWidth={isHovered ? 2 : 1}
                      strokeDasharray={isHovered ? "none" : "4 4"}
                      className="transition-all duration-700"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
          
          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isHovered = hoveredFeature === feature.id;
              const isVisible = visibleCards[index];
              
              return (
                <FloatingSurface
                  key={feature.id}
                  elevation={isHovered ? "high" : "low"}
                  glow={isHovered}
                  glowColor="primary"
                  className={`
                    rounded-3xl
                    transition-all ease-out
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                    ${isHovered ? "scale-[1.03]" : ""}
                  `}
                  style={{ transitionDuration: "800ms" }}
                >
                  <button
                    ref={el => cardsRef.current[index] = el}
                    onClick={() => setActiveFeature(feature.id)}
                    onMouseEnter={() => setHoveredFeature(feature.id)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className="w-full"
                  >
                    <GlassPanel
                      intensity={isHovered ? "medium" : "subtle"}
                      bordered
                      className={`
                        p-10 rounded-3xl text-left
                        border-border/10
                        transition-all duration-700
                        ${isHovered ? "border-border/30 bg-card/30" : "hover:border-border/20"}
                      `}
                    >
                      <div className="relative flex items-center gap-4 mb-5">
                        <div className={`
                          p-3 rounded-2xl transition-all duration-700
                          ${isHovered ? "bg-primary/12 scale-110" : "bg-card/30"}
                        `}>
                          <Icon className={`
                            h-5 w-5 transition-all duration-700
                            ${isHovered ? "text-primary" : "text-muted-foreground/50"}
                          `} />
                        </div>
                      </div>
                      
                      <h3 className="relative text-lg font-normal text-foreground mb-3 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="relative text-sm text-muted-foreground/40 leading-relaxed">
                        {feature.subtitle}
                      </p>
                      
                      {/* Click hint */}
                      <div className={`
                        relative mt-6 text-xs text-primary/50 transition-all duration-700
                        ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                      `}>
                        Click to explore →
                      </div>
                    </GlassPanel>
                  </button>
                </FloatingSurface>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Feature detail panel - layered overlay with slow animation */}
      {activeFeature && selectedFeature && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-end"
          onClick={handleClosePanel}
        >
          {/* Frosted backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-xl transition-opacity duration-700"
            style={{ opacity: panelVisible ? 1 : 0 }}
          />
          
          {/* Floating panel with elevation */}
          <FloatingSurface
            elevation="floating"
            glow
            glowColor="secondary"
            className="relative w-full max-w-lg h-full transition-all duration-700 ease-out"
            style={{ 
              transform: panelVisible ? "translateX(0)" : "translateX(100%)",
              opacity: panelVisible ? 1 : 0
            }}
            onClick={e => e.stopPropagation()}
          >
            <GlassPanel
              intensity="strong"
              bordered
              className="h-full border-l border-border/15 p-14 overflow-y-auto"
            >
            <button
              onClick={handleClosePanel}
              className="absolute top-10 right-10 p-3 rounded-full border border-border/10 text-muted-foreground/40 hover:text-foreground hover:border-border/30 transition-all duration-500"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-12">
              <div 
                className="p-4 rounded-2xl bg-primary/8 w-fit mb-10 transition-all duration-700"
                style={{ 
                  opacity: panelVisible ? 1 : 0,
                  transform: panelVisible ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: "200ms"
                }}
              >
                <selectedFeature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 
                className="text-3xl font-light text-foreground mb-4 tracking-tight transition-all duration-700"
                style={{ 
                  opacity: panelVisible ? 1 : 0,
                  transform: panelVisible ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: "300ms"
                }}
              >
                {selectedFeature.title}
              </h3>
              <p 
                className="text-muted-foreground/50 text-lg transition-all duration-700"
                style={{ 
                  opacity: panelVisible ? 1 : 0,
                  transform: panelVisible ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: "400ms"
                }}
              >
                {selectedFeature.subtitle}
              </p>
            </div>
            
            <p 
              className="text-muted-foreground/60 leading-relaxed mb-12 text-lg transition-all duration-700"
              style={{ 
                opacity: panelVisible ? 1 : 0,
                transform: panelVisible ? "translateY(0)" : "translateY(10px)",
                transitionDelay: "500ms"
              }}
            >
              {selectedFeature.description}
            </p>
            
            <div 
              className="space-y-5 transition-all duration-700"
              style={{ 
                opacity: panelVisible ? 1 : 0,
                transform: panelVisible ? "translateY(0)" : "translateY(10px)",
                transitionDelay: "600ms"
              }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-6">
                Key Capabilities
              </p>
              {selectedFeature.details.map((detail, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-4 transition-all duration-700"
                  style={{ 
                    opacity: panelVisible ? 1 : 0,
                    transform: panelVisible ? "translateX(0)" : "translateX(10px)",
                    transitionDelay: `${700 + i * 100}ms`
                  }}
                >
                  <div className="w-2 h-2 bg-primary/50 rounded-full" />
                  <span className="text-base text-muted-foreground/60">{detail}</span>
                </div>
              ))}
            </div>
            </GlassPanel>
          </FloatingSurface>
        </div>
      )}
      
      {/* Morphing transition to Market */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
    </section>
  );
};

export default FeaturesSection;