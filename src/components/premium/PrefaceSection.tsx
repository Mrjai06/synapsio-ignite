import { useState, useRef, useEffect } from "react";
import { AmbientGlow } from "./DepthSystem";

const PrefaceSection = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-32 md:py-48">
      <AmbientGlow color="primary" size="lg" intensity="subtle" position="left" />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-20 xl:px-28">
        <div ref={sectionRef} className="max-w-3xl mx-auto text-center">
          <p 
            className={`text-[0.625rem] tracking-[0.4em] uppercase text-primary/50 mb-10 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Intro
          </p>
          
          <p 
            className={`text-xl md:text-2xl text-muted-foreground/70 leading-relaxed mb-8 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "100ms" }}
          >
            Synapsio is an AI-based supply chain management and marketplace platform, aiming to revolutionize the way supply chains operate. The service turns fragmented networks, into intelligent, connected ecosystems.
          </p>
          
          <p 
            className={`text-lg text-muted-foreground/50 leading-relaxed transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "200ms" }}
          >
            By continuously analyzing patterns across your entire supply network, we predict disruptions before they occur, optimize inventory in real-time, and automate routine decisions—freeing your team to focus on strategic initiatives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrefaceSection;
