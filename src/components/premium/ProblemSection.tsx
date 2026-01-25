import { useState } from "react";
import { AlertTriangle, Clock, DollarSign, Users } from "lucide-react";
import NetworkCanvas from "./NetworkCanvas";

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Fragmented Visibility",
    preview: "Disconnected systems create blind spots across operations.",
    detail: "Enterprise supply chains operate through an average of 12+ disconnected systems, creating critical blind spots that delay decision-making by 48-72 hours."
  },
  {
    icon: Clock,
    title: "Reactive Response",
    preview: "Disruptions are detected too late to prevent impact.",
    detail: "Traditional systems detect disruptions after they've already cascaded, resulting in 3-5x higher mitigation costs and 2-3 week recovery cycles."
  },
  {
    icon: DollarSign,
    title: "Capital Lock-up",
    preview: "Excess inventory ties up working capital unnecessarily.",
    detail: "Companies hold 15-25% more inventory than necessary due to demand uncertainty, locking up billions in working capital across global operations."
  },
  {
    icon: Users,
    title: "Coordination Gaps",
    preview: "Stakeholders operate from different versions of truth.",
    detail: "Cross-functional teams waste 40% of their time reconciling data discrepancies, leading to suboptimal decisions and missed opportunities."
  }
];

const ProblemSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen py-32 overflow-hidden">
      {/* Chaotic network background */}
      <NetworkCanvas 
        nodeCount={35} 
        chaos={0.7} 
        className="absolute inset-0 opacity-30"
      />
      
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="max-w-3xl mb-24">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50 mb-6 block">
            The Challenge
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8 leading-tight">
            <span className="text-foreground">Modern supply chains</span>
            <br />
            <span className="text-muted-foreground/50">weren't built for uncertainty</span>
          </h2>
          <p className="text-muted-foreground/60 text-lg font-light leading-relaxed max-w-2xl">
            Legacy architectures fragment visibility, delay response, and lock up capital. 
            The result: enterprises navigate complexity with outdated tools.
          </p>
        </div>
        
        {/* Pain point cards in flowing layout */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            const isActive = activeIndex === index;
            
            return (
              <div
                key={index}
                className={`
                  group relative p-8 lg:p-10 rounded-2xl cursor-pointer
                  border border-border/20 hover:border-border/40
                  bg-gradient-to-br from-card/30 to-transparent
                  transition-all duration-700 ease-out
                  ${isActive ? "border-border/50 bg-card/40" : ""}
                `}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Connecting line visual */}
                <div className="absolute -right-3 lg:-right-4 top-1/2 w-6 lg:w-8 h-px bg-gradient-to-r from-border/40 to-transparent hidden md:block" />
                
                <div className="flex items-start gap-5">
                  <div className={`
                    p-3 rounded-xl transition-all duration-500
                    ${isActive ? "bg-primary/10" : "bg-muted/20"}
                  `}>
                    <Icon className={`
                      h-5 w-5 transition-colors duration-500
                      ${isActive ? "text-primary" : "text-muted-foreground/50"}
                    `} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-foreground mb-3 tracking-tight">
                      {point.title}
                    </h3>
                    <p className={`
                      text-sm leading-relaxed transition-all duration-500
                      ${isActive ? "text-muted-foreground/80" : "text-muted-foreground/50"}
                    `}>
                      {isActive ? point.detail : point.preview}
                    </p>
                  </div>
                </div>
                
                {/* Subtle glow on hover */}
                <div className={`
                  absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-700
                  bg-gradient-to-br from-primary/5 via-transparent to-transparent
                  ${isActive ? "opacity-100" : "opacity-0"}
                `} />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Transition gradient to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default ProblemSection;
