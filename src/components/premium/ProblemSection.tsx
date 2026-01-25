import { useState } from "react";
import { AlertTriangle, Clock, DollarSign, Users } from "lucide-react";
import NetworkCanvas from "./NetworkCanvas";

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Fragmented Visibility",
    preview: "Disconnected systems create blind spots.",
    detail: "Enterprise supply chains operate through 12+ disconnected systems, creating critical blind spots that delay decision-making by 48-72 hours."
  },
  {
    icon: Clock,
    title: "Reactive Response",
    preview: "Disruptions detected too late.",
    detail: "Traditional systems detect disruptions after cascade, resulting in 3-5x higher mitigation costs and 2-3 week recovery cycles."
  },
  {
    icon: DollarSign,
    title: "Capital Lock-up",
    preview: "Excess inventory ties up capital.",
    detail: "Companies hold 15-25% more inventory than necessary due to demand uncertainty, locking up billions in working capital."
  },
  {
    icon: Users,
    title: "Coordination Gaps",
    preview: "Teams operate from different truths.",
    detail: "Cross-functional teams waste 40% of time reconciling data discrepancies, leading to suboptimal decisions."
  }
];

const ProblemSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative py-40">
      {/* Chaotic network - fragmented state */}
      <NetworkCanvas 
        nodeCount={35} 
        chaos={0.75} 
        className="absolute inset-0 opacity-25"
        colorScheme="neutral"
      />
      
      {/* Subtle top connection from Hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-16">
        {/* Section intro - editorial style */}
        <div className="max-w-2xl mb-32">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/60 mb-8">
            The Challenge
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] mb-10 leading-[1.05]">
            <span className="text-foreground">Modern supply chains</span>
            <br />
            <span className="text-muted-foreground/35">weren't built for uncertainty</span>
          </h2>
          <p className="text-lg text-muted-foreground/45 font-light leading-relaxed">
            Legacy architectures fragment visibility, delay response, and lock up capital. 
            Enterprises navigate complexity with outdated tools.
          </p>
        </div>
        
        {/* Pain points - flowing cards without grid lines */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            const isActive = activeIndex === index;
            
            return (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div
                  className={`
                    relative p-10 lg:p-12 rounded-3xl cursor-pointer
                    bg-gradient-to-br from-card/25 via-card/10 to-transparent
                    border border-border/10 
                    transition-all duration-700 ease-out
                    ${isActive ? "border-border/25 from-card/35" : "hover:border-border/20"}
                  `}
                >
                  <div className="flex items-start gap-6">
                    <div className={`
                      p-4 rounded-2xl transition-all duration-500
                      ${isActive ? "bg-primary/8" : "bg-card/30"}
                    `}>
                      <Icon className={`
                        h-5 w-5 transition-colors duration-500
                        ${isActive ? "text-primary" : "text-muted-foreground/40"}
                      `} />
                    </div>
                    
                    <div className="flex-1 pt-1">
                      <h3 className="text-xl font-normal text-foreground mb-4 tracking-tight">
                        {point.title}
                      </h3>
                      <p className={`
                        text-base leading-relaxed transition-all duration-700
                        ${isActive ? "text-muted-foreground/70" : "text-muted-foreground/40"}
                      `}>
                        {isActive ? point.detail : point.preview}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Morphing transition to Solution - chaos dissolving */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
    </section>
  );
};

export default ProblemSection;