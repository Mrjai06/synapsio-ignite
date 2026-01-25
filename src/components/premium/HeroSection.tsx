import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NetworkCanvas from "./NetworkCanvas";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center">
      {/* Animated network background - calm and organized */}
      <NetworkCanvas 
        nodeCount={45} 
        chaos={0} 
        className="absolute inset-0 opacity-50"
        colorScheme="neutral"
      />
      
      {/* Depth layers */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/40 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 lg:px-16">
        <div className="max-w-4xl">
          {/* Branding - subtle */}
          <div className="mb-16 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="text-xs tracking-[0.4em] uppercase text-muted-foreground/50 font-light">
              Synapsio
            </span>
          </div>
          
          {/* Headline - large, confident */}
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[-0.02em] mb-10 animate-fade-in leading-[0.95]"
            style={{ animationDelay: "0.2s" }}
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
            style={{ animationDelay: "0.4s" }}
          >
            Transform fragmented operations into adaptive, self-optimizing networks. 
            Real-time coordination. Predictive intelligence.
          </p>
          
          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-5 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-7 text-sm tracking-wide font-normal transition-all duration-700 hover:scale-[1.02]"
            >
              View Pitchdeck
              <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="ghost"
              className="text-muted-foreground/60 hover:text-foreground hover:bg-transparent rounded-full px-10 py-7 text-sm tracking-wide font-normal border border-border/20 hover:border-border/40 transition-all duration-700"
            >
              Explore Product
            </Button>
          </div>
        </div>
      </div>
      
      {/* Morphing transition to Problem - gradual fade into chaos */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;