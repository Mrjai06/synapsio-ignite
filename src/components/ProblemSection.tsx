import { AlertTriangle, TrendingDown, Clock, Layers } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "$1.8T",
    subtitle: "Annual Waste",
    description: "Lost to supply chain inefficiencies globally"
  },
  {
    icon: TrendingDown,
    title: "73%",
    subtitle: "No Visibility",
    description: "Of companies lack end-to-end supply chain visibility"
  },
  {
    icon: Clock,
    title: "21 Days",
    subtitle: "Avg. Delay",
    description: "Average disruption response time with legacy systems"
  },
  {
    icon: Layers,
    title: "47+",
    subtitle: "Point Solutions",
    description: "Average tools in enterprise supply chain tech stack"
  }
];

const ProblemSection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">The Problem</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Supply Chains Are <span className="text-destructive">Broken</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Legacy systems create silos. Manual processes create delays. 
            The cost of inaction is measured in billions.
          </p>
        </div>
        
        {/* Problem cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="card-interactive glass rounded-2xl p-6 text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-destructive/20 transition-colors">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <p className="text-3xl font-bold text-foreground">{problem.title}</p>
              <p className="text-primary font-medium text-sm mt-1">{problem.subtitle}</p>
              <p className="text-muted-foreground text-sm mt-3">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
