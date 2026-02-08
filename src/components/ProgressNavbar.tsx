import { useEffect, useState, useRef } from "react";

const ProgressNavbar = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [dotPositions, setDotPositions] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const sections = [
    { id: "hero", label: "Intro" },
    { id: "preface", label: "Preface" },
    { id: "problem", label: "Challenge" },
    { id: "solution", label: "Solution" },
    { id: "process", label: "Process" },
    { id: "product", label: "Product" },
    { id: "opportunity", label: "Opportunity" },
    { id: "roadmap", label: "Roadmap" },
    { id: "team", label: "Team & Vision" },
  ];

  // Calculate dot positions after mount
  useEffect(() => {
    const calculatePositions = () => {
      if (containerRef.current) {
        const buttons = containerRef.current.querySelectorAll('button');
        const positions: number[] = [];
        buttons.forEach((btn) => {
          const dot = btn.querySelector('.dot-indicator');
          if (dot) {
            const rect = dot.getBoundingClientRect();
            const containerRect = containerRef.current!.getBoundingClientRect();
            // Get center of dot relative to container
            positions.push(rect.top - containerRect.top + rect.height / 2);
          }
        });
        setDotPositions(positions);
      }
    };

    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    return () => window.removeEventListener('resize', calculatePositions);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      let currentSection = 0;
      
      for (let i = 0; i < sectionElements.length; i++) {
        const el = sectionElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          // Section is active when its top is above the middle of viewport
          if (rect.top <= window.innerHeight / 2) {
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
      setActiveSection(index);
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Calculate progress bar height to reach exactly the current active dot
  const getProgressHeight = () => {
    if (dotPositions.length === 0) return 0;
    return dotPositions[activeSection] || 0;
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="relative" ref={containerRef}>
        {/* Background track */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-[3px] rounded-full bg-border/20"
          style={{ 
            top: dotPositions[0] || 0,
            height: dotPositions.length > 0 
              ? (dotPositions[dotPositions.length - 1] - dotPositions[0]) 
              : '100%'
          }}
        />
        
        {/* Filled progress bar - reaches exactly to the active dot */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-[3px] rounded-full bg-gradient-to-b from-primary/80 to-primary transition-all duration-300 ease-out"
          style={{ 
            top: dotPositions[0] || 0,
            height: Math.max(0, getProgressHeight() - (dotPositions[0] || 0))
          }}
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
                {/* Label - appears on hover or when active */}
                <span 
                  className={`
                    text-[10px] tracking-wide uppercase transition-all duration-300 whitespace-nowrap
                    absolute right-full mr-4
                    ${isActive 
                      ? "opacity-70 text-primary font-medium" 
                      : isPast
                        ? "opacity-0 group-hover:opacity-50 text-primary/70"
                        : "opacity-0 group-hover:opacity-40 text-muted-foreground"
                    }
                  `}
                >
                  {section.label}
                </span>
                
                {/* Dot indicator */}
                <div 
                  className={`
                    dot-indicator rounded-full transition-all duration-300 relative z-10
                    ${isActive 
                      ? "w-3 h-3 bg-primary shadow-[0_0_12px_2px_hsl(var(--primary)/0.5)]" 
                      : isPast 
                        ? "w-2 h-2 bg-primary/70" 
                        : "w-2 h-2 bg-border/40 group-hover:bg-muted-foreground/40"
                    }
                  `}
                />
                
                {/* Active ring indicator */}
                {isActive && (
                  <div 
                    className="absolute left-0 w-3 h-3 rounded-full border-2 border-primary/30 animate-ping"
                    style={{ animationDuration: '2s' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default ProgressNavbar;
