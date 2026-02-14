import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingSurface, AmbientGlow } from "./DepthSystem";
import { TestimonialCarousel } from "@/components/ui/profile-card-testimonial-carousel";

const team = [
  {
    name: "Jakob Ibrahim",
    title: "CEO & Co-founder",
    description: "• Student at TU Berlin - BSci in computer science\n• Sales and marketing advisor",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    linkedinUrl: "#"
  },
  {
    name: "Luis Boy",
    title: "CTO & Co-founder",
    description: "E-Commerce operations coordinator at Götze Gold.",
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
        
        {/* Vision statement */}
        <div 
          ref={ctaRef}
          className="max-w-3xl mx-auto text-center"
        >
          <p 
            className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 mb-6 transition-all duration-1000"
            style={{ 
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "translateY(0)" : "translateY(10px)"
            }}
          >
            Our Vision
          </p>
          <h3 
            className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground/90 mb-8 leading-[1.3] transition-all duration-1000"
            style={{ 
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "100ms"
            }}
          >
            A world where supply chains{" "}
            <span className="text-primary">adapt, predict, and optimize</span>{" "}
            themselves — freeing businesses to focus on what matters most.
          </h3>
          <p 
            className="text-sm md:text-base text-muted-foreground/60 font-light leading-relaxed max-w-xl mx-auto transition-all duration-1000"
            style={{ 
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "200ms"
            }}
          >
            We believe the future of supply chain management is autonomous, intelligent, 
            and seamlessly integrated — creating resilience and efficiency at every level.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;