import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  
  const sections = [
    { id: "hero", label: "Introduction" },
    { id: "problem", label: "Challenge" },
    { id: "solution", label: "Solution" },
    { id: "product", label: "Product" },
    { id: "opportunity", label: "Opportunity" },
    { id: "roadmap", label: "Roadmap" },
    { id: "team", label: "Team" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / scrollHeight;
      setProgress(scrolled);
      
      // Determine active section
      const sectionIndex = Math.min(
        Math.floor(scrolled * sections.length),
        sections.length - 1
      );
      setActiveSection(sectionIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-4">
      {sections.map((section, index) => (
        <div 
          key={section.id}
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => {
            const element = document.getElementById(section.id);
            element?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {/* Label - appears on hover */}
          <span 
            className={`
              text-sm tracking-wide transition-all duration-500
              ${index === activeSection 
                ? "opacity-60 text-foreground" 
                : "opacity-0 group-hover:opacity-40 text-muted-foreground"
              }
            `}
          >
            {section.label}
          </span>
          
          {/* Dot indicator */}
          <div 
            className={`
              rounded-full transition-all duration-700
              ${index === activeSection 
                ? "w-3 h-3 bg-primary/80" 
                : index < activeSection 
                  ? "w-2 h-2 bg-muted-foreground/30" 
                  : "w-2 h-2 bg-border/40 group-hover:bg-muted-foreground/20"
              }
            `}
          />
        </div>
      ))}
      
      {/* Progress line */}
      <div className="absolute right-[6px] top-0 w-0.5 h-full bg-border/10">
        <div 
          className="w-full bg-primary/30 transition-all duration-300"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ScrollProgress;