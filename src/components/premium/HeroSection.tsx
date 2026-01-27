import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NetworkCanvas from "./NetworkCanvas";
import HeroVisualAnchor from "./HeroVisualAnchor";
import { FloatingSurface, AmbientGlow, GlassPanel } from "./DepthSystem";

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
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const contentOpacity = 1 - scrollProgress * 1.5;
  const contentTranslate = scrollProgress * 40;
  return <section ref={sectionRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
      {/* Animated network */}
      <NetworkCanvas nodeCount={50} chaos={scrollProgress * 0.3} className="absolute inset-0 opacity-40" colorScheme="neutral" scrollReactive={true} parallaxFactor={0.15} />
      
      {/* Ambient depth glows */}
      <AmbientGlow color="primary" size="xl" intensity="subtle" position="right" className="top-1/4" />
      <AmbientGlow color="secondary" size="lg" intensity="subtle" position="left" className="top-2/3" />
      
      {/* Depth layers */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000" style={{
      background: `radial-gradient(ellipse at 50% 40%, transparent 0%, hsl(var(--background) / ${0.2 + scrollProgress * 0.5}) 70%)`
    }} />
      
      {/* Visual Anchor - offset to the right */}
      <div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] opacity-60 transition-all duration-1000"
        style={{
          transform: `translateY(calc(-50% + ${contentTranslate * 0.5}px))`,
          opacity: Math.max(0, 0.6 - scrollProgress * 0.8),
        }}
      >
        <HeroVisualAnchor className="w-full h-full" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 lg:px-20 xl:px-28 transition-all duration-700" style={{
        opacity: Math.max(0, contentOpacity),
        transform: `translateY(${contentTranslate}px)`
      }}>
        {/* Floating Glass Panel */}
        <FloatingSurface elevation="floating" glow glowColor="primary" className="rounded-3xl">
          <GlassPanel 
            intensity="medium" 
            bordered 
            className="rounded-3xl px-10 py-12 md:px-14 md:py-16 lg:px-16 lg:py-20 max-w-2xl xl:max-w-3xl shadow-[0_8px_60px_-15px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.05)] border-border/15"
          >
            {/* Branding - very subtle */}
            <div className="mb-12 animate-fade-in" style={{
              animationDelay: "0.2s",
              animationDuration: "1.2s"
            }}>
              <span className="tracking-[0.5em] uppercase text-muted-foreground/50 font-light text-2xl md:text-3xl font-mono">
                Synapsio
              </span>
            </div>
            
            {/* Headline - larger, more breathing room */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[-0.03em] mb-10 animate-fade-in leading-[0.95]" style={{
              animationDelay: "0.4s",
              animationDuration: "1.4s"
            }}>
              <span className="text-foreground">Connections</span>
              <br />
              <span className="text-primary">you can rely </span>
              <br />
              <span className="text-primary">on</span>
            </h1>
            
            {/* Subheadline - more space */}
            <p className="text-base md:text-lg lg:text-xl max-w-lg mb-14 font-light leading-[1.7] animate-fade-in text-muted-foreground" style={{
              animationDelay: "0.6s",
              animationDuration: "1.4s"
            }}>
              A fully automated AI-based SCM-solution used for the management and creation of supply-chains
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{
              animationDelay: "0.8s",
              animationDuration: "1.4s"
            }}>
              <Button size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-7 text-sm tracking-wide font-normal transition-all duration-500 hover:scale-[1.02] shadow-lg shadow-primary/20">
                View Pitchdeck
                <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-full px-10 py-7 text-sm tracking-wide font-normal border border-border/20 hover:border-border/40 transition-all duration-500">
                Explore Product
              </Button>
            </div>
          </GlassPanel>
        </FloatingSurface>
      </div>
      
      {/* Scroll hint - more subtle */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 transition-opacity duration-1000" style={{
      opacity: 1 - scrollProgress * 4
    }}>
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/25">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-border/15 flex justify-center pt-1.5">
            <div className="w-0.5 h-1.5 bg-muted-foreground/25 rounded-full animate-bounce" style={{
            animationDuration: "2.5s"
          }} />
          </div>
        </div>
      </div>
      
      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-[50vh] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
    </section>;
};
export default HeroSection;