import { useEffect, useState } from "react";

const ProgressNavbar = () => {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  
  const sections = [
    { id: "hero", label: "Intro" },
    { id: "problem", label: "Challenge" },
    { id: "solution", label: "Solution" },
    { id: "process", label: "Process" },
    { id: "product", label: "Product" },
    { id: "opportunity", label: "Opportunity" },
    { id: "roadmap", label: "Roadmap" },
    { id: "team", label: "Team" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setProgress(scrolled);
      
      const sectionElements = sections.map(s => document.getElementById(s.id));
      let currentSection = 0;
      
      for (let i = 0; i < sectionElements.length; i++) {
        const el = sectionElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            currentSection = i;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="relative flex flex-col items-center">
        {/* Background track */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/15" />
        
        {/* Filled progress */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-primary/40 transition-all duration-200 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
        
        {/* Section indicators */}
        <div className="relative flex flex-col gap-6">
          {sections.map((section, index) => {
            const isActive = index === activeSection;
            const isPast = index < activeSection;
            
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group flex items-center gap-3 relative"
              >
                {/* Label - appears on hover */}
                <span 
                  className={`
                    text-[10px] tracking-wide uppercase transition-all duration-300 whitespace-nowrap
                    absolute right-full mr-3
                    ${isActive 
                      ? "opacity-50 text-foreground" 
                      : "opacity-0 group-hover:opacity-40 text-muted-foreground"
                    }
                  `}
                >
                  {section.label}
                </span>
                
                {/* Dot indicator */}
                <div 
                  className={`
                    rounded-full transition-all duration-500
                    ${isActive 
                      ? "w-2 h-2 bg-primary/70" 
                      : isPast 
                        ? "w-1.5 h-1.5 bg-muted-foreground/25" 
                        : "w-1.5 h-1.5 bg-border/30 group-hover:bg-muted-foreground/20"
                    }
                  `}
                />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default ProgressNavbar;
