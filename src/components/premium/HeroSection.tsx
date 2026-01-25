import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NetworkCanvas from "./NetworkCanvas";

const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Content fades and rises slightly as user scrolls
  const contentOpacity = 1 - scrollProgress * 1.5;
  const contentTranslate = scrollProgress * 30;

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      {/* Animated network - reacts to scroll and cursor */}
      <NetworkCanvas 
        nodeCount={50} 
        chaos={scrollProgress * 0.3}
        className="absolute inset-0 opacity-50"
        colorScheme="neutral"
        scrollReactive={true}
        parallaxFactor={0.15}
      />
      
      {/* Depth layers */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{ 
          background: `radial-gradient(ellipse at 50% 40%, transparent 0%, hsl(var(--background) / ${0.3 + scrollProgress * 0.4}) 70%)` 
        }}
      />
      
      {/* Content */}
      <div 
        className="relative z-10 container mx-auto px-8 lg:px-16 transition-all duration-700"
        style={{ 
          opacity: Math.max(0, contentOpacity),
          transform: `translateY(${contentTranslate}px)`
        }}
      >
        <div className="max-w-4xl">
          {/* Branding */}
          <div className="mb-16 animate-fade-in" style={{ animationDelay: "0.1s", animationDuration: "1s" }}>
            <span className="text-xs tracking-[0.4em] uppercase text-muted-foreground/50 font-light">
              Synapsio
            </span>
          </div>
          
          {/* Headline */}
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[-0.02em] mb-10 animate-fade-in leading-[0.95]"
            style={{ animationDelay: "0.3s", animationDuration: "1.2s" }}
          >
            <span className="text-foreground">Intelligent</span>
            <br />
            <span className="text-foreground">orchestration</span>
            <br />
            <span className="text-muted-foreground/40">for supply chains</span>
          </h1>
          
          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground/50 max-w-xl mb-16 font-light leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.5s", animationDuration: "1.2s" }}
          >
            Transform fragmented operations into adaptive, self-optimizing networks. 
            Real-time coordination. Predictive intelligence.
          </p>
          
          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-5 animate-fade-in"
            style={{ animationDelay: "0.7s", animationDuration: "1.2s" }}
          >
            <Button 
              size="lg" 
              className="group bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-7 text-sm tracking-wide font-normal transition-all duration-1000 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
            >
              View Pitchdeck
              <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-700 group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="ghost"
              className="text-muted-foreground/60 hover:text-foreground hover:bg-transparent rounded-full px-10 py-7 text-sm tracking-wide font-normal border border-border/20 hover:border-border/40 transition-all duration-1000"
            >
              Explore Product
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll hint */}
      <div 
        className="absolute bottom-16 left-1/2 -translate-x-1/2 transition-opacity duration-1000"
        style={{ opacity: 1 - scrollProgress * 3 }}
      >
        <div className="w-6 h-10 rounded-full border border-border/20 flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground/30 rounded-full animate-bounce" style={{ animationDuration: "2s" }} />
        </div>
      </div>
      
      {/* Morphing transition */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;