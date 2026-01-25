import { useState, useRef, useEffect } from "react";
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

// Card positions for flowing network layout
const cardPositions = [
  { row: 0, col: 0 },
  { row: 0, col: 1 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
];

const ProblemSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection observer for staggered card reveal
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
            }, index * 150); // Stagger by 150ms
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

  return (
    <section ref={sectionRef} className="relative py-40">
      {/* Chaotic network */}
      <NetworkCanvas 
        nodeCount={35} 
        chaos={0.7} 
        className="absolute inset-0 opacity-20"
        colorScheme="neutral"
        scrollReactive={true}
        parallaxFactor={0.1}
      />
      
      {/* Top transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-16">
        {/* Section intro */}
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
        
        {/* Pain points - flowing network layout with connections */}
        <div className="relative max-w-5xl">
          {/* SVG connection lines between cards */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--border))" stopOpacity="0.1" />
                <stop offset="50%" stopColor="hsl(var(--border))" stopOpacity="0.25" />
                <stop offset="100%" stopColor="hsl(var(--border))" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Horizontal connections */}
            <line x1="48%" y1="25%" x2="52%" y2="25%" stroke="url(#lineGradient)" strokeWidth="1" className="transition-opacity duration-1000" style={{ opacity: visibleCards[0] && visibleCards[1] ? 1 : 0 }} />
            <line x1="48%" y1="75%" x2="52%" y2="75%" stroke="url(#lineGradient)" strokeWidth="1" className="transition-opacity duration-1000" style={{ opacity: visibleCards[2] && visibleCards[3] ? 1 : 0 }} />
            {/* Vertical connections */}
            <line x1="25%" y1="48%" x2="25%" y2="52%" stroke="url(#lineGradient)" strokeWidth="1" className="transition-opacity duration-1000" style={{ opacity: visibleCards[0] && visibleCards[2] ? 1 : 0 }} />
            <line x1="75%" y1="48%" x2="75%" y2="52%" stroke="url(#lineGradient)" strokeWidth="1" className="transition-opacity duration-1000" style={{ opacity: visibleCards[1] && visibleCards[3] ? 1 : 0 }} />
          </svg>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              const isActive = activeIndex === index;
              const isVisible = visibleCards[index];
              
              return (
                <div
                  key={index}
                  ref={el => cardsRef.current[index] = el}
                  className="group relative"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div
                    className={`
                      relative p-10 lg:p-12 rounded-3xl cursor-pointer
                      bg-gradient-to-br from-card/25 via-card/10 to-transparent
                      border border-border/10 
                      transition-all ease-out
                      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                      ${isActive ? "border-border/30 from-card/40 scale-[1.02]" : "hover:border-border/20"}
                    `}
                    style={{ 
                      transitionDuration: "900ms",
                      transitionProperty: "opacity, transform, border-color, background"
                    }}
                  >
                    {/* Subtle glow on hover */}
                    <div 
                      className="absolute inset-0 rounded-3xl transition-opacity duration-1000 pointer-events-none"
                      style={{ 
                        opacity: isActive ? 0.5 : 0,
                        background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.05) 0%, transparent 70%)"
                      }}
                    />
                    
                    <div className="relative flex items-start gap-6">
                      <div className={`
                        p-4 rounded-2xl transition-all duration-700
                        ${isActive ? "bg-primary/10 scale-110" : "bg-card/30"}
                      `}>
                        <Icon className={`
                          h-5 w-5 transition-all duration-700
                          ${isActive ? "text-primary" : "text-muted-foreground/40"}
                        `} />
                      </div>
                      
                      <div className="flex-1 pt-1">
                        <h3 className="text-xl font-normal text-foreground mb-4 tracking-tight">
                          {point.title}
                        </h3>
                        <div className="relative overflow-hidden">
                          <p 
                            className={`
                              text-base leading-relaxed transition-all duration-700
                              ${isActive ? "text-muted-foreground/70" : "text-muted-foreground/40"}
                            `}
                          >
                            {isActive ? point.detail : point.preview}
                          </p>
                        </div>
                      </div>
                    </div>
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

export default ProblemSection;