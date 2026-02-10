import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CosmicSynapseCanvas } from "@/components/ui/neurons-hero";
import { FloatingSurface, AmbientGlow } from "./DepthSystem";
import synapsioLogo from "@/assets/synapsio-logo.png";

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
  return <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Neural synapse animated background */}
      <CosmicSynapseCanvas className="absolute inset-0 opacity-60" />
      
      {/* Ambient depth glows */}
      <AmbientGlow color="primary" size="xl" intensity="subtle" position="right" className="top-1/4" />
      <AmbientGlow color="secondary" size="lg" intensity="subtle" position="left" className="top-2/3" />
      
      {/* Depth layers */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000" style={{
      background: `radial-gradient(ellipse at 50% 40%, transparent 0%, hsl(var(--background) / ${0.2 + scrollProgress * 0.5}) 70%)`
    }} />
      
      
      {/* Content */}
       <div className="relative z-10 container mx-auto px-6 lg:px-12 xl:px-20 2xl:px-28 transition-all duration-700" style={{
      opacity: Math.max(0, contentOpacity),
      transform: `translateY(${contentTranslate}px)`
    }}>
        <div className="max-w-5xl lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
          {/* Branding */}
          <div className="mb-10 lg:mb-12 xl:mb-16 2xl:mb-20 animate-fade-in flex items-center gap-3" style={{
          animationDelay: "0.2s",
          animationDuration: "1.2s"
        }}>
            <img src={synapsioLogo} alt="Synapsio" className="h-7 lg:h-8 xl:h-9 2xl:h-10 w-auto opacity-60" />
            <span className="tracking-[0.5em] uppercase text-muted-foreground/40 font-light text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl font-mono">
              Synapsio
            </span>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light tracking-[-0.03em] mb-8 lg:mb-10 xl:mb-12 2xl:mb-14 animate-fade-in leading-[0.92]" style={{
          animationDelay: "0.4s",
          animationDuration: "1.4s"
        }}>
            <span className="text-foreground">Connections</span>
            <br />
            <span className="text-primary">you can rely </span>
            <br />
            <span className="text-primary">on</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl max-w-xl mb-10 lg:mb-12 xl:mb-16 2xl:mb-20 font-light leading-[1.7] animate-fade-in text-primary" style={{
          animationDelay: "0.6s",
          animationDuration: "1.4s"
        }}>A fully automated AI-based SCM-solution used for the management and creation of supply-chains</p>
          
          {/* CTAs - floating surfaces */}
          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in" style={{
          animationDelay: "0.8s",
          animationDuration: "1.4s"
        }}>
            <FloatingSurface elevation="high" glow glowColor="primary" className="rounded-full">
               <Button size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-5 lg:px-10 lg:py-6 xl:px-12 xl:py-7 2xl:px-12 2xl:py-8 text-sm tracking-wide font-normal transition-all duration-1000 hover:scale-[1.02]">
                View Pitchdeck
                <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-700 group-hover:translate-x-1" />
              </Button>
            </FloatingSurface>
            <FloatingSurface elevation="medium" className="rounded-full">
              <Button size="lg" variant="ghost" className="text-muted-foreground/50 hover:text-foreground hover:bg-card/20 rounded-full px-8 py-5 lg:px-10 lg:py-6 xl:px-12 xl:py-7 2xl:px-12 2xl:py-8 text-sm tracking-wide font-normal border border-border/15 hover:border-border/35 transition-all duration-1000 backdrop-blur-sm">
                Explore Product
              </Button>
            </FloatingSurface>
          </div>
        </div>
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