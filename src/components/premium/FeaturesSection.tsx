import { useState } from "react";
import { X, Activity, Brain, Network, Shield, Zap, LineChart } from "lucide-react";

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
  const selectedFeature = features.find(f => f.id === activeFeature);

  return (
    <section className="relative py-40">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[180px]" />
      </div>
      
      {/* Top transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className="max-w-2xl mb-24">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/60 mb-8">
            Capabilities
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] mb-10 leading-[1.05]">
            <span className="text-foreground">A living system</span>
            <br />
            <span className="text-muted-foreground/35">that grows with you</span>
          </h2>
        </div>
        
        {/* Feature nodes - connected system visualization */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central core indicator */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:flex">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/8 to-transparent border border-border/15 flex items-center justify-center">
              <div className="w-6 h-6 bg-primary/25 rounded-full" />
            </div>
          </div>
          
          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className="group relative p-10 rounded-3xl text-left
                    bg-gradient-to-br from-card/20 via-card/10 to-transparent
                    border border-border/10 hover:border-border/25
                    transition-all duration-700 ease-out
                    hover:from-card/30"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-3 rounded-2xl bg-card/30 group-hover:bg-primary/8 transition-colors duration-500">
                      <Icon className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary transition-colors duration-500" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-normal text-foreground mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground/40 leading-relaxed">
                    {feature.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Feature detail panel - layered overlay */}
      {selectedFeature && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-end"
          onClick={() => setActiveFeature(null)}
        >
          <div className="absolute inset-0 bg-background/85 backdrop-blur-sm animate-fade-in" />
          
          <div 
            className="relative w-full max-w-lg h-full bg-card/95 backdrop-blur-xl border-l border-border/20 p-14 overflow-y-auto animate-slide-in-right"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveFeature(null)}
              className="absolute top-10 right-10 p-2 text-muted-foreground/40 hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-10">
              <div className="p-4 rounded-2xl bg-primary/8 w-fit mb-8">
                <selectedFeature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-light text-foreground mb-4 tracking-tight">
                {selectedFeature.title}
              </h3>
              <p className="text-muted-foreground/50">
                {selectedFeature.subtitle}
              </p>
            </div>
            
            <p className="text-muted-foreground/60 leading-relaxed mb-10">
              {selectedFeature.description}
            </p>
            
            <div className="space-y-5">
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35">
                Key Capabilities
              </p>
              {selectedFeature.details.map((detail, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                  <span className="text-sm text-muted-foreground/60">{detail}</span>
                </div>
              ))}
            </div>
          </div>
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