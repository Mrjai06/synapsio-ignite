import { useRef, useEffect, useState } from "react";
import NetworkCanvas from "./NetworkCanvas";

const SolutionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [metricsVisible, setMetricsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const metricsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (metricsRef.current) metricsObserver.observe(metricsRef.current);

    return () => {
      observer.disconnect();
      metricsObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48">
      {/* Calm network */}
      <NetworkCanvas 
        nodeCount={30} 
        chaos={0.1} 
        className="absolute inset-0 opacity-25"
        colorScheme="primary"
        scrollReactive={true}
        parallaxFactor={0.08}
      />
      
      {/* Ambient light */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] bg-primary/4 rounded-full blur-[250px]" />
      </div>
      
      <div className="relative z-10 container mx-auto px-8 lg:px-20 xl:px-28">
        <div className="grid lg:grid-cols-2 gap-24 lg:gap-40 items-center">
          {/* Text content */}
          <div className="max-w-xl">
            <p 
              className={`text-[10px] tracking-[0.4em] uppercase text-primary/50 mb-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              The Solution
            </p>
            <h2 
              className={`text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[-0.02em] mb-12 leading-[1.08] transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "100ms" }}
            >
              <span className="text-foreground">A unified</span>
              <br />
              <span className="text-foreground">intelligence layer</span>
            </h2>
            <div 
              className={`space-y-8 text-lg lg:text-[1.15rem] text-muted-foreground/45 font-light leading-[1.8] transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "200ms" }}
            >
              <p>
                Synapsio connects every node of your supply chain into a single, 
                coherent system. Real-time data flows seamlessly between procurement, 
                logistics, and fulfillment.
              </p>
              <p>
                Our AI engine doesn't just monitor—it anticipates. Pattern recognition 
                across millions of data points enables proactive decisions.
              </p>
            </div>
            
            {/* Key metrics */}
            <div 
              ref={metricsRef}
              className="flex gap-12 lg:gap-16 mt-20 pt-16 border-t border-border/8"
            >
              {[
                { value: "40%", label: "Cost reduction", delay: 0 },
                { value: "3.2×", label: "Faster response", delay: 100 },
                { value: "99.7%", label: "Accuracy", delay: 200 },
              ].map((metric, i) => (
                <div 
                  key={metric.label}
                  className={`transition-all duration-1000 ${metricsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${metric.delay}ms` }}
                >
                  <p className="text-3xl lg:text-4xl font-light text-foreground mb-2 tracking-tight">{metric.value}</p>
                  <p className="text-xs text-muted-foreground/35 tracking-wide">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Orbital system visual */}
          <div 
            className={`relative flex items-center justify-center transition-all duration-1200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Outer orbit */}
                  <div className="w-80 h-80 rounded-full border border-border/12 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-[spin_90s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary/40 rounded-full" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-muted-foreground/15 rounded-full" />
                  </div>
                  
                  {/* Middle orbit */}
                  <div className="w-52 h-52 rounded-full border border-border/18 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-[spin_55s_linear_infinite_reverse]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-muted-foreground/25 rounded-full" />
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary/35 rounded-full" />
                  </div>
                  
                  {/* Inner orbit */}
                  <div className="w-28 h-28 rounded-full border border-border/22 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-[spin_35s_linear_infinite]">
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary/25 rounded-full" />
                  </div>
                  
                  {/* Core */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/12 to-primary/4 flex items-center justify-center border border-primary/12">
                    <div className="w-4 h-4 bg-primary/50 rounded-full" />
                  </div>
                </div>
              </div>
              
              {/* Labels */}
              <div className="absolute top-2 right-2 text-[10px] text-muted-foreground/25 tracking-widest uppercase">
                Procurement
              </div>
              <div className="absolute bottom-24 -left-4 text-[10px] text-muted-foreground/25 tracking-widest uppercase">
                Logistics
              </div>
              <div className="absolute bottom-2 right-6 text-[10px] text-muted-foreground/25 tracking-widest uppercase">
                Fulfillment
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;