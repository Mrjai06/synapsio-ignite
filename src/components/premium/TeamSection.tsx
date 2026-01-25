import { useState, useRef, useEffect } from "react";
import { Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Alex Chen",
    role: "CEO & Co-founder",
    bio: "Former VP of Operations at Scale AI. Stanford MBA. 15 years in supply chain optimization.",
    linkedin: "#"
  },
  {
    name: "Maria Santos",
    role: "CTO & Co-founder",
    bio: "Ex-Google AI researcher. PhD in distributed systems. Led ML infrastructure for Google Cloud.",
    linkedin: "#"
  },
  {
    name: "James Park",
    role: "VP of Product",
    bio: "Former Director at Flexport. Built products serving Fortune 500 logistics operations.",
    linkedin: "#"
  },
  {
    name: "Sarah Mitchell",
    role: "VP of Sales",
    bio: "20 years enterprise SaaS. Former SVP at SAP. Deep relationships across manufacturing.",
    linkedin: "#"
  }
];

const TeamSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(team.length).fill(false));
  const [ctaVisible, setCtaVisible] = useState(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Staggered reveal on scroll
  useEffect(() => {
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
            }, index * 120);
          }
        },
        { threshold: 0.2 }
      );
      
      observer.observe(card);
      return observer;
    });

    // CTA observer
    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setCtaVisible(true), 400);
        }
      },
      { threshold: 0.3 }
    );

    if (ctaRef.current) {
      ctaObserver.observe(ctaRef.current);
    }

    return () => {
      observers.forEach(obs => obs?.disconnect());
      ctaObserver.disconnect();
    };
  }, []);

  return (
    <section className="relative py-40">
      {/* Warm, human ambient light */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-primary/4 rounded-full blur-[200px]" />
      </div>
      
      {/* Top transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className="max-w-2xl mb-24">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/60 mb-8">
            Team
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] mb-10 leading-[1.05]">
            <span className="text-foreground">Built by operators</span>
            <br />
            <span className="text-muted-foreground/35">who understand the problem</span>
          </h2>
        </div>
        
        {/* Team grid - elegant cards with hover states */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-32">
          {team.map((member, index) => {
            const isHovered = hoveredIndex === index;
            const isVisible = visibleCards[index];
            
            return (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className={`
                  group relative p-10 rounded-3xl border border-border/10
                  bg-gradient-to-br from-card/15 to-transparent
                  transition-all ease-out
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  ${isHovered ? "border-border/30 from-card/30 scale-[1.02]" : "hover:border-border/20"}
                `}
                style={{ 
                  transitionDuration: "900ms",
                  transitionProperty: "opacity, transform, border-color, background"
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Subtle glow on hover */}
                <div 
                  className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-1000"
                  style={{ 
                    opacity: isHovered ? 1 : 0,
                    background: "radial-gradient(ellipse at 50% 30%, hsl(var(--primary) / 0.06) 0%, transparent 70%)"
                  }}
                />
                
                {/* Avatar with hover animation */}
                <div className={`
                  relative w-16 h-16 rounded-full mb-8 flex items-center justify-center
                  bg-gradient-to-br from-card/60 to-card/20
                  transition-all duration-700
                  ${isHovered ? "scale-110 from-primary/10 to-card/30" : ""}
                `}>
                  <span className={`
                    text-xl font-light transition-colors duration-700
                    ${isHovered ? "text-primary/70" : "text-muted-foreground/30"}
                  `}>
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                
                <h3 className="relative text-lg font-normal text-foreground mb-2 tracking-tight">
                  {member.name}
                </h3>
                <p className={`
                  relative text-sm mb-5 transition-colors duration-700
                  ${isHovered ? "text-primary" : "text-primary/60"}
                `}>
                  {member.role}
                </p>
                <p className={`
                  relative text-sm leading-relaxed mb-8 transition-colors duration-700
                  ${isHovered ? "text-muted-foreground/60" : "text-muted-foreground/40"}
                `}>
                  {member.bio}
                </p>
                
                <a
                  href={member.linkedin}
                  className={`
                    relative inline-flex items-center gap-2 text-xs transition-all duration-700
                    ${isHovered ? "text-foreground translate-x-1" : "text-muted-foreground/30"}
                  `}
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            );
          })}
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
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;