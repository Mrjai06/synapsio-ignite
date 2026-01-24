import { Building2, Layers, Zap } from "lucide-react";

const tiers = [
  {
    icon: Building2,
    name: "Enterprise",
    price: "$150K",
    period: "/year",
    description: "Full platform access with dedicated support",
    features: ["Unlimited users", "All integrations", "Custom workflows", "24/7 support", "SLA guarantee"]
  },
  {
    icon: Layers,
    name: "Platform",
    price: "$75K",
    period: "/year",
    description: "Core SCM capabilities for mid-market",
    features: ["Up to 50 users", "Standard integrations", "Pre-built templates", "Business hours support"]
  },
  {
    icon: Zap,
    name: "Usage-Based",
    price: "$0.02",
    period: "/transaction",
    description: "Pay only for what you use",
    features: ["Unlimited users", "API access", "Basic support", "Self-service"]
  }
];

const BusinessModelSection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Business Model</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Predictable <span className="text-gradient">Revenue</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            SaaS + usage-based pricing with 90% gross margins and strong expansion revenue.
          </p>
        </div>
        
        {/* Pricing tiers */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className={`glass rounded-2xl p-8 card-interactive ${index === 0 ? 'ring-2 ring-primary' : ''}`}
            >
              <tier.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-muted-foreground text-sm">{tier.period}</span>
              </div>
              <p className="text-muted-foreground text-sm mb-6">{tier.description}</p>
              <ul className="space-y-2">
                {tier.features.map((feature, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Unit economics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">140%</p>
            <p className="text-muted-foreground text-sm mt-1">Net Revenue Retention</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">$85K</p>
            <p className="text-muted-foreground text-sm mt-1">Average ACV</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">12mo</p>
            <p className="text-muted-foreground text-sm mt-1">CAC Payback</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">4.5x</p>
            <p className="text-muted-foreground text-sm mt-1">LTV:CAC</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModelSection;
