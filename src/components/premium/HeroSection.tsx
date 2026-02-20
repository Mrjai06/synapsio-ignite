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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const contentOpacity = 1 - scrollProgress * 1.5;
  const contentTranslate = scrollProgress * 40;

  return (
    <section ref={sectionRef} className="relative min-h-[110vh] overflow-hidden" style={{ zIndex: 2 }}>
      {/* Deep background fill */}
      <div className="absolute inset-0 bg-background" style={{ 
        maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)"
      }} />
      
      {/* Neural synapse animated background */}
      <CosmicSynapseCanvas className="absolute inset-0 opacity-60" />
      
      {/* Ambient depth glows */}
      <AmbientGlow color="primary" size="xl" intensity="subtle" position="right" className="top-1/4" />
      <AmbientGlow color="secondary" size="lg" intensity="subtle" position="left" className="top-2/3" />
      
      {/* Depth layers */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000" style={{
        background: `radial-gradient(ellipse at 50% 40%, transparent 0%, hsl(var(--background) / ${0.2 + scrollProgress * 0.5}) 70%)`
      }} />

      {/* TOP: Branding + Headline centered */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 lg:px-8 pt-24 flex flex-col items-center text-center gap-4 transition-all duration-700" style={{
        opacity: Math.max(0, contentOpacity),
        transform: `translateY(${contentTranslate}px)`
      }}>
        <div className="animate-fade-in flex items-center gap-4" style={{
          animationDelay: "0.2s",
          animationDuration: "1.2s"
        }}>
          <img src={synapsioLogo} alt="Synapsio" className="h-12 w-auto opacity-60" />
          <span className="tracking-[0.5em] uppercase text-muted-foreground/40 font-light text-4xl font-mono">
            Synapsio
          </span>
        </div>

        <h1 className="w-full animate-fade-in leading-[0.85] text-center whitespace-nowrap" style={{
          fontSize: "clamp(1rem, 5.2vw, 8rem)",
          letterSpacing: "-0.04em",
          animationDelay: "0.4s",
          animationDuration: "1.4s"
        }}>
          <span className="text-foreground font-light">Connections </span>
          <span className="text-primary font-light">you can rely on</span>
        </h1>
      </div>

      {/* BOTTOM: Subtitle + CTA centered */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-8 pb-64 flex flex-col items-center gap-6 transition-all duration-700" style={{
        opacity: Math.max(0, contentOpacity),
        transform: `translateY(${contentTranslate}px)`
      }}>
        <p className="text-lg md:text-xl max-w-xl font-light leading-[1.7] animate-fade-in text-primary/70 text-center" style={{
          animationDelay: "0.6s",
          animationDuration: "1.4s"
        }}>A fully automated AI-based SCM-solution used for the management and creation of supply-chains</p>

        <div className="animate-fade-in" style={{
          animationDelay: "0.8s",
          animationDuration: "1.4s"
        }}>
          <FloatingSurface elevation="high" glow glowColor="primary" className="rounded-full">
            <a href="/Synapsio_Pitch.pdf" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-12 py-8 text-sm tracking-wide font-normal transition-all duration-1000 hover:scale-[1.02]">
                View Pitchdeck
                <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-700 group-hover:translate-x-1" />
              </Button>
            </a>
          </FloatingSurface>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 transition-opacity duration-1000 z-10" style={{
        opacity: 1 - scrollProgress * 4
      }}>
        <div className="flex flex-col items-center gap-4">
          <span className="text-[0.625rem] tracking-[0.3em] uppercase text-muted-foreground/25">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-border/15 flex justify-center pt-1.5">
            <div className="w-0.5 h-1.5 bg-muted-foreground/25 rounded-full animate-bounce" style={{
              animationDuration: "2.5s"
            }} />
          </div>
        </div>
      </div>
      
      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-[70vh] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent" />
      </div>
    </section>
  );
};
export default HeroSection;
