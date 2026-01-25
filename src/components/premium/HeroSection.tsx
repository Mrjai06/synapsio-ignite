import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NetworkCanvas from "./NetworkCanvas";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated network background */}
      <NetworkCanvas 
        nodeCount={50} 
        chaos={0} 
        className="absolute inset-0 opacity-60"
      />
      
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Branding */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground/80 font-light">
              Synapsio
            </span>
          </div>
          
          {/* Headline */}
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 animate-fade-in leading-[1.1]"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="text-foreground">Intelligent orchestration</span>
            <br />
            <span className="text-muted-foreground/70">for modern supply chains</span>
          </h1>
          
          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground/60 max-w-2xl mx-auto mb-16 font-light leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            We transform fragmented operations into adaptive, self-optimizing networks. 
            Real-time coordination. Predictive intelligence. Seamless execution.
          </p>
          
          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Button 
              size="lg" 
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-sm tracking-wide font-normal transition-all duration-500 hover:scale-[1.02]"
            >
              View Pitchdeck
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="ghost"
              className="text-muted-foreground hover:text-foreground hover:bg-transparent rounded-full px-8 py-6 text-sm tracking-wide font-normal border border-border/30 hover:border-border/60 transition-all duration-500"
            >
              Explore Product
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <div className="flex flex-col items-center gap-3 text-muted-foreground/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" style={{ animationDuration: "2s" }} />
        </div>
      </div>
      
      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
