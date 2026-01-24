import { Brain, Zap, Shield, BarChart3, Truck, Globe } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Predictive Intelligence",
    description: "ML models analyze 500+ signals to forecast demand, detect risks, and recommend actions before issues arise."
  },
  {
    icon: Zap,
    title: "Real-Time Visibility",
    description: "Track every SKU, shipment, and supplier across your network with sub-second data freshness."
  },
  {
    icon: Shield,
    title: "Risk Mitigation",
    description: "Automated supplier scoring and alternative sourcing recommendations when disruptions occur."
  },
  {
    icon: BarChart3,
    title: "Dynamic Optimization",
    description: "Continuous inventory and routing optimization that adapts to changing conditions in real-time."
  },
  {
    icon: Truck,
    title: "Logistics Orchestration",
    description: "Unified control tower for multi-modal shipping with automated carrier selection and rate optimization."
  },
  {
    icon: Globe,
    title: "Global Scalability",
    description: "Multi-region deployment with compliance built-in. GDPR, SOC2, and ISO 27001 certified."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Built for <span className="text-gradient">Enterprise Scale</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every feature designed with Fortune 500 requirements in mind. 
            Deploy in weeks, not years.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card-interactive glass rounded-2xl p-8 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
