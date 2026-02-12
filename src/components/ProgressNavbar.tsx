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
        {/* Background track - anchored to dot column center (right-[5.5px] = center of 12px dot wrapper) */}
        <div 
          className="absolute right-[3px] w-[6px] rounded-full bg-border/20"
          style={{ 
            top: dotPositions[0] || 0,
            height: dotPositions.length > 0 
              ? (dotPositions[dotPositions.length - 1] - dotPositions[0]) 
              : '100%'
          }}
        />
        
        {/* Filled progress */}
        <div 
          className="absolute right-[3px] w-[6px] rounded-full bg-primary/50 transition-all duration-500 ease-out"
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
            const isFirst = index === 0;
            const isLast = index === sections.length - 1;
            const isEndpoint = isFirst || isLast;
            const isPrev = index === activeSection - 1;
            const isNext = index === activeSection + 1;
            const isAdjacent = isPrev || isNext;
            
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id, index)}
                className="group flex items-center justify-end gap-3 relative"
              >
                {/* Label */}
                <span 
                  className={`
                    text-[10px] tracking-wide uppercase transition-all duration-300 whitespace-nowrap
                    ${isActive 
                      ? "opacity-50 text-foreground" 
                      : isAdjacent
                        ? "opacity-25 text-muted-foreground"
                        : "opacity-0 group-hover:opacity-40 text-muted-foreground"
                    }
                  `}
                >
                  {section.label}
                </span>
                
                {/* Dot wrapper - fixed size keeps all dots centered on the track axis */}
                <div className="w-3 flex items-center justify-center flex-shrink-0">
                  <div 
                    className={`
                      dot-indicator rounded-full transition-all duration-500 relative z-10
                      ${isEndpoint
                        ? "w-3 h-3 bg-primary"
                        : isActive 
                          ? "w-2.5 h-2.5 bg-primary" 
                          : isPast 
                            ? "w-2 h-2 bg-primary/50" 
                            : "w-2 h-2 bg-border/30 group-hover:bg-muted-foreground/30"
                      }
                    `}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default ProgressNavbar;
