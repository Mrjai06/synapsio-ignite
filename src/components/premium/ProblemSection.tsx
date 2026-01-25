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

const ProblemSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false]);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Header observer
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);

    // Cards observers
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
            }, index * 180);
          }
        },
        { threshold: 0.2 }
      );
      
      observer.observe(card);
      return observer;
    });

    return () => {
      headerObserver.disconnect();
      observers.forEach(obs => obs?.disconnect());
    };
  }, []);

  return (
    <section className="relative py-32 md:py-48">
      {/* Chaotic network */}
      <NetworkCanvas 
        nodeCount={35} 
        chaos={0.7} 
        className="absolute inset-0 opacity-15"
        colorScheme="neutral"
        scrollReactive={true}
        parallaxFactor={0.1}
      />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-20 xl:px-28">
        {/* Section header */}
        <div ref={headerRef} className="max-w-2xl mb-28 md:mb-36">
          <p 
            className={`text-[10px] tracking-[0.4em] uppercase text-primary/50 mb-10 transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            The Challenge
          </p>
          <h2 
            className={`text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[-0.02em] mb-12 leading-[1.08] transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="text-foreground">Modern supply chains</span>
            <br />
            <span className="text-muted-foreground/30">weren't built for uncertainty</span>
          </h2>
          <p 
            className={`text-lg lg:text-[1.15rem] text-muted-foreground/40 font-light leading-[1.8] transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "200ms" }}
          >
            Legacy architectures fragment visibility, delay response, and lock up capital. 
            Enterprises navigate complexity with outdated tools.
          </p>
        </div>
        
        {/* Pain points grid */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 max-w-5xl">
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
                    relative p-10 lg:p-14 rounded-[2rem] cursor-pointer
                    bg-gradient-to-br from-card/20 via-card/8 to-transparent
                    border border-border/8 
                    transition-all ease-out
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                    ${isActive ? "border-border/25 from-card/35 scale-[1.015]" : "hover:border-border/15"}
                  `}
                  style={{ 
                    transitionDuration: "1000ms",
                    transitionProperty: "opacity, transform, border-color, background"
                  }}
                >
                  {/* Glow */}
                  <div 
                    className="absolute inset-0 rounded-[2rem] pointer-events-none transition-opacity duration-1000"
                    style={{ 
                      opacity: isActive ? 0.6 : 0,
                      background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.04) 0%, transparent 70%)"
                    }}
                  />
                  
                  <div className="relative flex items-start gap-7">
                    <div className={`
                      p-4 rounded-2xl transition-all duration-800
                      ${isActive ? "bg-primary/8 scale-110" : "bg-card/25"}
                    `}>
                      <Icon className={`
                        h-5 w-5 transition-all duration-800
                        ${isActive ? "text-primary" : "text-muted-foreground/35"}
                      `} />
                    </div>
                    
                    <div className="flex-1 pt-1">
                      <h3 className="text-xl lg:text-[1.35rem] font-normal text-foreground mb-5 tracking-tight leading-tight">
                        {point.title}
                      </h3>
                      <p className={`
                        text-base lg:text-[1.05rem] leading-[1.7] transition-all duration-800
                        ${isActive ? "text-muted-foreground/60" : "text-muted-foreground/35"}
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
    </section>
  );
};

export default ProblemSection;