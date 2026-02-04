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
    { id: "team", label: "Team & Vision" },
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

  const scrollToSection = (sectionId: string, index: number) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Immediately update active section and progress for visual feedback
      setActiveSection(index);
      const targetProgress = index / (sections.length - 1);
      setProgress(targetProgress);
      
      // Then scroll to the section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="relative">
        {/* Background track - same width as dots */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 rounded-full bg-border/20" />
        
        {/* Filled progress - same width as dots */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-0 w-2 rounded-full bg-primary/50 transition-all duration-500 ease-out"
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
                onClick={() => scrollToSection(section.id, index)}
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
                
                {/* Dot indicator - blends with bar */}
                <div 
                  className={`
                    w-2 h-2 rounded-full transition-all duration-500 relative z-10
                    ${isActive 
                      ? "bg-primary scale-125" 
                      : isPast 
                        ? "bg-primary/50" 
                        : "bg-border/30 group-hover:bg-muted-foreground/30"
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
