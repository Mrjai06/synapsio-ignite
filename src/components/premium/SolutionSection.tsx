import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Database, Brain, Zap, TrendingUp } from "lucide-react";
import { AmbientGlow } from "./DepthSystem";
import { Button } from "@/components/ui/button";

// Carousel slides data
const slides = [
  {
    id: "what",
    label: "What It Is",
    title: "The Intelligence Layer",
    subtitle: "for Supply Chains",
    description: "Synapsio is an AI-powered platform that connects every node of your supply chain—ERP systems, warehouses, carriers, and our internal marketplace —into a unified, self-optimizing network.",
    diagram: {
      type: "connect",
      elements: ["ERP", "WMS", "TMS", "Marketplace"],
      center: "Synapsio"
    },
    icon: Database,
  },
  {
    id: "how",
    label: "What It Does",
    title: "Predict. Optimize.",
    subtitle: "Create. Execute.",
    description: "Continuously analyzes millions of data points to forecast demand, optimize inventory placement, orchestrate fulfillment and create new supply-chains — all in real-time, without manual intervention.",
    diagram: {
      type: "flow",
      steps: ["Data In", "AI Analysis", "Decision", "Action"]
    },
    icon: Brain,
  },
  {
    id: "why",
    label: "Why It Matters",
    title: "From Reactive",
    subtitle: "to Proactive",
    description: "Reduces stockouts by 40%, cuts logistics costs by 25%, and transforms supply chain from a cost center into a competitive advantage.",
    diagram: {
      type: "impact",
      metrics: [
        { value: "-40%", label: "Stockouts" },
        { value: "-25%", label: "Logistics Cost" },
        { value: "+15%", label: "Margin" }
      ]
    },
    icon: TrendingUp,
  },
];

// Simple connection diagram
const ConnectionDiagram = ({ elements, center }: { elements: string[]; center: string }) => {
  const centerX = 200;
  const centerY = 180;
  const radius = 140;

  const positions = elements.map((_, i) => {
    const angle = (i * 90 - 45) * (Math.PI / 180);
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  });

  return (
    <div className="relative w-full h-[360px] mx-auto" style={{ maxWidth: 420 }}>
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {positions.map((pos, i) => (
          <motion.line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={pos.x}
            y2={pos.y}
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth={1}
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
          />
        ))}
      </svg>

      {/* Center node - glass card style matching Problem section */}
      <motion.div
        className="absolute z-10 rounded-3xl bg-card/40 backdrop-blur-xl border border-primary/30 flex flex-col items-center justify-center gap-2"
        style={{ left: centerX - 72, top: centerY - 72, width: 144, height: 144, 
          boxShadow: '0 0 40px hsl(var(--primary) / 0.15), 0 8px 32px hsl(var(--background) / 0.5)'
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Database className="w-7 h-7 text-primary" />
        <span className="text-sm font-medium text-primary">{center}</span>
      </motion.div>

      {/* Surrounding nodes - glass card style matching Problem section */}
      {elements.map((el, i) => {
        const nodeIcons = [Database, Brain, Zap, TrendingUp];
        const Icon = nodeIcons[i % nodeIcons.length];
        return (
          <motion.div
            key={el}
            className="absolute rounded-2xl bg-card/30 backdrop-blur-xl border border-border/20 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/40 transition-colors duration-300 group"
            style={{ 
              left: positions[i].x - 52, top: positions[i].y - 52, width: 104, height: 104,
              boxShadow: '0 8px 24px hsl(var(--background) / 0.6)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            whileHover={{ scale: 1.06, y: -4 }}
          >
            <Icon className="w-5 h-5 text-muted-foreground/60 group-hover:text-primary transition-colors duration-300" />
            <span className="text-xs font-medium text-muted-foreground/70 group-hover:text-foreground transition-colors duration-300">{el}</span>
          </motion.div>
        );
      })}
    </div>
  );
};

// Flow diagram
const FlowDiagram = ({ steps }: { steps: string[] }) => (
  <div className="relative w-full h-64 flex items-center justify-center">
    <div className="flex items-center gap-4">
      {steps.map((step, i) => (
        <motion.div
          key={step}
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
        >
          <div className="w-24 h-24 rounded-2xl bg-card/30 backdrop-blur-xl border border-border/20 flex items-center justify-center"
            style={{ boxShadow: '0 8px 24px hsl(var(--background) / 0.6)' }}>
            <span className="text-xs font-medium text-muted-foreground/70 text-center px-2">{step}</span>
          </div>
          {i < steps.length - 1 && (
            <motion.div
              className="mx-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.15 }}
            >
              <ChevronRight className="w-4 h-4 text-primary/40" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  </div>
);

// Impact metrics diagram
const ImpactDiagram = ({ metrics }: { metrics: { value: string; label: string }[] }) => (
  <div className="relative w-full h-64 flex items-center justify-center">
    <div className="flex items-center gap-8 md:gap-12">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          className="text-center rounded-2xl bg-card/30 backdrop-blur-xl border border-border/20 px-8 py-6"
          style={{ boxShadow: '0 8px 24px hsl(var(--background) / 0.6)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
          whileHover={{ scale: 1.05, y: -4 }}
        >
          <div className="text-3xl md:text-4xl font-light text-primary mb-2">
            {metric.value}
          </div>
          <div className="text-xs text-muted-foreground/60 uppercase tracking-wider">
            {metric.label}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const SolutionSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      <AmbientGlow color="primary" size="xl" intensity="medium" position="center" />
      
      <div className="relative z-10 container mx-auto px-6 lg:px-20 xl:px-28">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <motion.p 
            className="text-[10px] tracking-[0.4em] uppercase text-primary/50 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            The Solution
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[-0.02em] mb-8 leading-[1.08]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-foreground">A unified</span>
            <br />
            <span className="text-foreground">intelligence layer</span>
          </motion.h2>
        </div>

        {/* Carousel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Slide indicators */}
          <div className="flex items-center gap-6 mb-12">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(i)}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  i === currentSlide 
                    ? "opacity-100" 
                    : "opacity-40 hover:opacity-60"
                }`}
              >
                <span className={`w-8 h-px transition-all duration-300 ${
                  i === currentSlide ? "bg-primary" : "bg-border"
                }`} />
                <span className="text-xs tracking-wider uppercase">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Slide content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[400px]">
            {/* Text content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-3 text-primary/60">
                  <Icon className="w-5 h-5" />
                  <span className="text-xs tracking-widest uppercase">{slide.label}</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-light leading-tight">
                  {slide.title}
                  <br />
                  <span className="text-muted-foreground/60">{slide.subtitle}</span>
                </h3>
                
                <p className="text-lg text-muted-foreground/70 font-light leading-relaxed max-w-lg">
                  {slide.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Diagram */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`diagram-${slide.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative bg-card/30 backdrop-blur-xl border border-border/20 rounded-3xl p-8 md:p-10"
                style={{ boxShadow: '0 8px 32px hsl(var(--background) / 0.5)' }}
              >
                {slide.diagram.type === "connect" && (
                  <ConnectionDiagram 
                    elements={slide.diagram.elements!} 
                    center={slide.diagram.center!} 
                  />
                )}
                {slide.diagram.type === "flow" && (
                  <FlowDiagram steps={slide.diagram.steps!} />
                )}
                {slide.diagram.type === "impact" && (
                  <ImpactDiagram metrics={slide.diagram.metrics!} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-4 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/5"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/5"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <span className="ml-4 text-xs text-muted-foreground/50">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
