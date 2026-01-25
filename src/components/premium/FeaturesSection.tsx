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
    <section className="relative min-h-screen py-32 overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50 mb-6 block">
            Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8 leading-tight">
            <span className="text-foreground">A living system</span>
            <br />
            <span className="text-muted-foreground/50">that grows with you</span>
          </h2>
        </div>
        
        {/* Feature visualization */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-transparent border border-border/30 flex items-center justify-center">
              <div className="w-8 h-8 bg-primary/30 rounded-full animate-pulse" />
            </div>
          </div>
          
          {/* Feature nodes grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 relative">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`
                    group relative p-8 rounded-2xl text-left
                    border border-border/20 hover:border-border/40
                    bg-gradient-to-br from-card/20 to-transparent
                    transition-all duration-500 ease-out
                    hover:bg-card/30
                  `}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2.5 rounded-xl bg-muted/20 group-hover:bg-primary/10 transition-colors duration-500">
                      <Icon className="h-5 w-5 text-muted-foreground/60 group-hover:text-primary transition-colors duration-500" />
                    </div>
                  </div>
                  
                  <h3 className="text-base font-medium text-foreground mb-2 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground/50 leading-relaxed">
                    {feature.subtitle}
                  </p>
                  
                  {/* Connection line to center */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                      <line
                        x1="50%"
                        y1="50%"
                        x2="calc(50vw - 50%)"
                        y2="50%"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-border/30"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Feature detail panel */}
      {selectedFeature && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-end"
          onClick={() => setActiveFeature(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in" />
          
          {/* Panel */}
          <div 
            className="relative w-full max-w-lg h-full bg-card/95 backdrop-blur-xl border-l border-border/30 p-12 overflow-y-auto animate-slide-in-right"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveFeature(null)}
              className="absolute top-8 right-8 p-2 text-muted-foreground/50 hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-8">
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-6">
                <selectedFeature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-light text-foreground mb-3 tracking-tight">
                {selectedFeature.title}
              </h3>
              <p className="text-muted-foreground/60">
                {selectedFeature.subtitle}
              </p>
            </div>
            
            <p className="text-muted-foreground/70 leading-relaxed mb-8">
              {selectedFeature.description}
            </p>
            
            <div className="space-y-4">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/40">
                Key Capabilities
              </p>
              {selectedFeature.details.map((detail, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                  <span className="text-sm text-muted-foreground/70">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default FeaturesSection;
