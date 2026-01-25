import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingSurface, AmbientGlow } from "./DepthSystem";
import { TestimonialCarousel } from "@/components/ui/profile-card-testimonial-carousel";

const team = [
  {
    name: "Alex Chen",
    title: "CEO & Co-founder",
    description: "Former VP of Operations at Scale AI. Stanford MBA. 15 years in supply chain optimization.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    linkedinUrl: "#"
  },
  {
    name: "Maria Santos",
    title: "CTO & Co-founder",
    description: "Ex-Google AI researcher. PhD in distributed systems. Led ML infrastructure for Google Cloud.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    linkedinUrl: "#"
  },
  {
    name: "James Park",
    title: "VP of Product",
    description: "Former Director at Flexport. Built products serving Fortune 500 logistics operations.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    linkedinUrl: "#"
  },
  {
    name: "Sarah Mitchell",
    title: "VP of Sales",
    description: "20 years enterprise SaaS. Former SVP at SAP. Deep relationships across manufacturing.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    linkedinUrl: "#"
  }
];

const TeamSection = () => {
  const [ctaVisible, setCtaVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [carouselVisible, setCarouselVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

  // Carousel and CTA observers
  useEffect(() => {
    const carouselObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCarouselVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setCtaVisible(true), 400);
        }
      },
      { threshold: 0.3 }
    );

    if (carouselRef.current) {
      carouselObserver.observe(carouselRef.current);
    }

    if (ctaRef.current) {
      ctaObserver.observe(ctaRef.current);
    }

    return () => {
      carouselObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  return (
    <section className="relative py-32 md:py-48">
      {/* Warm ambient light - layered depth */}
      <AmbientGlow color="primary" size="xl" intensity="subtle" position="center" />
      <AmbientGlow color="accent" size="md" intensity="subtle" position="left" className="bottom-1/4" />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-20 xl:px-28">
        {/* Section header */}
        <div ref={headerRef} className="max-w-2xl mx-auto text-center mb-20 md:mb-28">
          <p 
            className={`text-[10px] tracking-[0.4em] uppercase text-primary/50 mb-10 transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Team
          </p>
          <h2 
            className={`text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[-0.02em] mb-12 leading-[1.08] transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="text-foreground">Built by operators</span>
            <br />
            <span className="text-muted-foreground/30">who understand the problem</span>
          </h2>
        </div>
        
        {/* Team carousel */}
        <div 
          ref={carouselRef}
          className={`mb-40 transition-all duration-1000 ${carouselVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <TestimonialCarousel testimonials={team} />
        </div>
        
        {/* Final CTA - warm and inviting with staggered animation */}
        <div 
          ref={ctaRef}
          className="max-w-2xl mx-auto text-center"
        >
          <h3 
            className="text-3xl md:text-4xl font-light text-foreground mb-8 tracking-tight leading-tight transition-all duration-1000"
            style={{ 
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "translateY(0)" : "translateY(20px)"
            }}
          >
            Ready to transform your supply chain?
          </h3>
          <p 
            className="text-lg text-muted-foreground/40 mb-14 leading-relaxed transition-all duration-1000"
            style={{ 
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "200ms"
            }}
          >
            Join forward-thinking enterprises building resilient, intelligent operations.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-5 justify-center transition-all duration-1000"
            style={{ 
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "400ms"
            }}
          >
            <FloatingSurface elevation="high" glow glowColor="primary" className="rounded-full">
              <Button 
                size="lg" 
                className="group bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-7 text-sm tracking-wide font-normal transition-all duration-1000 hover:scale-[1.02]"
              >
                View Pitchdeck
                <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-700 group-hover:translate-x-1" />
              </Button>
            </FloatingSurface>
            <FloatingSurface elevation="medium" className="rounded-full">
              <Button 
                size="lg" 
                variant="ghost"
                className="text-muted-foreground/60 hover:text-foreground hover:bg-card/20 rounded-full px-10 py-7 text-sm tracking-wide font-normal border border-border/20 hover:border-border/40 transition-all duration-1000 backdrop-blur-sm"
              >
                Get in Touch
              </Button>
            </FloatingSurface>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;