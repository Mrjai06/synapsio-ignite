import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FloatingSurface, GlassPanel, AmbientGlow } from "./DepthSystem";

const marketData = {
  tam: { value: "$847B", label: "Total Addressable Market", description: "Global supply chain management software and services" },
  sam: { value: "$124B", label: "Serviceable Available Market", description: "Enterprise SCM platforms for mid-to-large organizations" },
  som: { value: "$8.2B", label: "Serviceable Obtainable Market", description: "AI-native SCM solutions in target verticals" }
};

const competitors = [
  { name: "SAP SCM", position: "Legacy leader", differentiation: "30-year-old architecture, 18+ month implementations" },
  { name: "Oracle SCM", position: "Enterprise incumbent", differentiation: "Complex pricing, siloed modules" },
  { name: "Blue Yonder", position: "Planning specialist", differentiation: "Limited real-time capabilities" },
  { name: "Kinaxis", position: "Concurrent planning", differentiation: "Narrow focus on planning only" },
  { name: "Coupa", position: "Procurement focus", differentiation: "Limited end-to-end visibility" }
];

const businessSteps = [
  { label: "Transaction", delay: 0 },
  { label: "Platform Fee", delay: 400 },
  { label: "Recurring Revenue", delay: 800, highlight: true }
];

const MarketSection = () => {
  const [activeMarket, setActiveMarket] = useState<"tam" | "sam" | "som">("sam");
  const [competitorIndex, setCompetitorIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [businessAnimated, setBusinessAnimated] = useState(false);
  const [marketHover, setMarketHover] = useState<"tam" | "sam" | "som" | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);

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

  // Trigger business model animation on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBusinessAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (businessRef.current) {
      observer.observe(businessRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextCompetitor = () => {
    setCompetitorIndex((i) => (i + 1) % competitors.length);
  };
  
  const prevCompetitor = () => {
    setCompetitorIndex((i) => (i - 1 + competitors.length) % competitors.length);
  };

  // Touch/drag handlers for swipeable deck
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = clientX - dragStart;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        prevCompetitor();
      } else {
        nextCompetitor();
      }
    }
  };

  // Get ring sizes and styles based on active/hover state
  const getRingStyle = (ring: "tam" | "sam" | "som") => {
    const isActive = activeMarket === ring;
    const isHovered = marketHover === ring;
    
    const baseScale = isActive ? 1.02 : isHovered ? 1.01 : 1;
    const borderOpacity = isActive ? 0.4 : isHovered ? 0.3 : 0.15;
    const bgOpacity = isActive ? 0.08 : isHovered ? 0.04 : 0;
    
    return {
      transform: `scale(${baseScale})`,
      borderColor: `hsl(var(--primary) / ${borderOpacity})`,
      backgroundColor: `hsl(var(--primary) / ${bgOpacity})`,
    };
  };

  return (
    <section className="relative py-32 md:py-48">
      {/* Layered ambient depth */}
      <AmbientGlow color="secondary" size="xl" intensity="medium" position="center" />
      <AmbientGlow color="primary" size="md" intensity="subtle" position="right" className="top-1/4" />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-20 xl:px-28">
        {/* Section header */}
        <div ref={headerRef} className="max-w-2xl mb-28 md:mb-36">
          <p 
            className={`text-[0.625rem] tracking-[0.4em] uppercase text-primary/50 mb-10 transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Opportunity
          </p>
          <h2 
            className={`text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[-0.02em] mb-12 leading-[1.08] transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="text-foreground">A market ready</span>
            <br />
            <span className="text-muted-foreground/30">for transformation</span>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-24 lg:gap-40">
          {/* TAM/SAM/SOM - interactive concentric circles */}
          <div>
            <div className="relative flex items-center justify-center py-16">
              <div className="relative">
                {/* TAM - outermost */}
                <button
                  onClick={() => setActiveMarket("tam")}
                  onMouseEnter={() => setMarketHover("tam")}
                  onMouseLeave={() => setMarketHover(null)}
                  className="w-80 h-80 rounded-full border-2 flex items-center justify-center transition-all duration-1000 ease-out"
                  style={getRingStyle("tam")}
                >
                  {/* SAM - middle */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveMarket("sam"); }}
                    onMouseEnter={(e) => { e.stopPropagation(); setMarketHover("sam"); }}
                    onMouseLeave={() => setMarketHover(null)}
                    className="w-56 h-56 rounded-full border-2 flex items-center justify-center transition-all duration-1000 ease-out"
                    style={getRingStyle("sam")}
                  >
                    {/* SOM - innermost */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveMarket("som"); }}
                      onMouseEnter={(e) => { e.stopPropagation(); setMarketHover("som"); }}
                      onMouseLeave={() => setMarketHover(null)}
                      className="w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all duration-1000 ease-out"
                      style={getRingStyle("som")}
                    >
                      <span className={`text-xs tracking-wider transition-all duration-700 ${activeMarket === "som" ? "text-foreground scale-110" : "text-muted-foreground/40"}`}>
                        SOM
                      </span>
                    </button>
                  </button>
                </button>
                
                {/* Labels with fade based on selection */}
                <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-xs tracking-wider transition-all duration-700 ${activeMarket === "tam" ? "text-primary/80" : "text-muted-foreground/25"}`}>
                  TAM
                </span>
                <span className={`absolute top-8 left-1/2 -translate-x-1/2 text-xs tracking-wider transition-all duration-700 ${activeMarket === "sam" ? "text-primary/80" : "text-muted-foreground/25"}`}>
                  SAM
                </span>
                
                {/* Pulse ring on active */}
                <div 
                  className="absolute inset-0 rounded-full pointer-events-none transition-all duration-1000"
                  style={{
                    width: activeMarket === "tam" ? "320px" : activeMarket === "sam" ? "224px" : "128px",
                    height: activeMarket === "tam" ? "320px" : activeMarket === "sam" ? "224px" : "128px",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: `0 0 60px -20px hsl(var(--primary) / 0.3)`,
                  }}
                />
              </div>
            </div>
            
            {/* Active market info with smooth transitions */}
            <div className="text-center mt-8">
              <p 
                className="text-5xl font-light text-foreground mb-3 transition-all duration-700"
                key={activeMarket}
              >
                {marketData[activeMarket].value}
              </p>
              <p className="text-sm text-muted-foreground/50 mb-4 transition-all duration-500">
                {marketData[activeMarket].label}
              </p>
              <p className="text-sm text-muted-foreground/35 max-w-sm mx-auto transition-all duration-500">
                {marketData[activeMarket].description}
              </p>
            </div>
          </div>
          
          {/* Competitors and Business Model */}
          <div className="space-y-20">
            {/* Swipeable competitor cards */}
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-8">
                Competitive Landscape
              </p>
              
              <div className="relative">
                {/* Stacked card deck effect */}
                <div className="relative h-[12.5rem]">
                  {competitors.map((competitor, i) => {
                    const offset = i - competitorIndex;
                    const isActive = i === competitorIndex;
                    const isPrev = offset === -1 || (competitorIndex === 0 && i === competitors.length - 1);
                    const isNext = offset === 1 || (competitorIndex === competitors.length - 1 && i === 0);
                    
                    // Calculate z-index and transforms for deck effect
                    let zIndex = 10 - Math.abs(offset);
                    let translateX = 0;
                    let scale = 1;
                    let opacity = 0;
                    
                    if (isActive) {
                      zIndex = 20;
                      opacity = 1;
                    } else if (isPrev) {
                      translateX = -20;
                      scale = 0.95;
                      opacity = 0.3;
                      zIndex = 15;
                    } else if (isNext) {
                      translateX = 20;
                      scale = 0.95;
                      opacity = 0.3;
                      zIndex = 15;
                    }
                    
                    return (
                      <FloatingSurface
                        key={competitor.name}
                        elevation={isActive ? "high" : "low"}
                        glow={isActive}
                        glowColor="primary"
                        className={`
                          absolute inset-0 rounded-3xl
                          transition-all duration-700 ease-out cursor-grab
                          ${isDragging && isActive ? "cursor-grabbing" : ""}
                        `}
                        style={{
                          zIndex,
                          transform: `translateX(${translateX}px) scale(${scale})`,
                          opacity,
                          pointerEvents: isActive ? "auto" : "none",
                        }}
                      >
                        <GlassPanel
                          ref={isActive ? cardRef : undefined}
                          intensity={isActive ? "medium" : "subtle"}
                          bordered
                          className="h-full p-10 rounded-3xl"
                          onMouseDown={handleDragStart}
                          onMouseUp={handleDragEnd}
                          onMouseLeave={() => isDragging && handleDragEnd}
                          onTouchStart={handleDragStart}
                          onTouchEnd={handleDragEnd}
                        >
                          <div className="flex items-center justify-between mb-8">
                            <h4 className="text-2xl font-light text-foreground">
                              {competitor.name}
                            </h4>
                            <span className="text-xs text-muted-foreground/40 tracking-wide">
                              {i + 1} / {competitors.length}
                            </span>
                          </div>
                          <p className="text-sm text-primary/70 mb-4">{competitor.position}</p>
                          <p className="text-base text-muted-foreground/45 leading-relaxed">
                            {competitor.differentiation}
                          </p>
                        </GlassPanel>
                      </FloatingSurface>
                    );
                  })}
                </div>
                
                {/* Navigation dots and arrows */}
                <div className="flex items-center justify-center gap-6 mt-8">
                  <button
                    onClick={prevCompetitor}
                    className="p-3 rounded-full border border-border/15 hover:border-border/40 transition-all duration-500 hover:scale-105"
                  >
                    <ChevronLeft className="h-4 w-4 text-muted-foreground/40" />
                  </button>
                  
                  <div className="flex gap-2">
                    {competitors.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCompetitorIndex(i)}
                        className={`
                          w-2 h-2 rounded-full transition-all duration-500
                          ${i === competitorIndex ? "bg-primary/60 w-6" : "bg-border/30 hover:bg-border/50"}
                        `}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={nextCompetitor}
                    className="p-3 rounded-full border border-border/15 hover:border-border/40 transition-all duration-500 hover:scale-105"
                  >
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Animated business model flow */}
            <div ref={businessRef}>
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-8">
                Business Model
              </p>
              
              <div className="flex items-center gap-4 text-sm flex-wrap">
                {businessSteps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-4">
                    <FloatingSurface
                      elevation={step.highlight ? "medium" : "low"}
                      glow={step.highlight}
                      glowColor="primary"
                      className={`
                        rounded-2xl
                        transition-all duration-1000 ease-out
                        ${businessAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                      `}
                      style={{ transitionDelay: `${step.delay}ms` }}
                    >
                      <GlassPanel
                        intensity={step.highlight ? "medium" : "subtle"}
                        bordered
                        className={`
                          px-6 py-4 rounded-2xl
                          ${step.highlight ? "border-primary/20" : "border-border/10"}
                        `}
                      >
                        <span className={step.highlight ? "text-foreground font-medium" : "text-muted-foreground/50"}>
                          {step.label}
                        </span>
                      </GlassPanel>
                    </FloatingSurface>
                    
                    {i < businessSteps.length - 1 && (
                      <div 
                        className={`transition-all duration-700 ${businessAnimated ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                        style={{ transitionDelay: `${step.delay + 200}ms` }}
                      >
                        <svg width="24" height="12" viewBox="0 0 24 12" className="text-muted-foreground/20">
                          <path 
                            d="M0 6 L18 6 M14 2 L18 6 L14 10" 
                            stroke="currentColor" 
                            strokeWidth="1.5" 
                            fill="none"
                            className={`transition-all duration-1000 ${businessAnimated ? "stroke-dashoffset-0" : ""}`}
                            strokeDasharray="30"
                            style={{ 
                              strokeDashoffset: businessAnimated ? 0 : 30,
                              transition: `stroke-dashoffset 800ms ease-out ${step.delay + 300}ms`
                            }}
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <p 
                className={`text-sm text-muted-foreground/35 mt-6 leading-relaxed transition-all duration-700 ${businessAnimated ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: "1200ms" }}
              >
                SaaS subscription + transaction-based fees aligned with customer value.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Morphing transition to Team */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
    </section>
  );
};

export default MarketSection;