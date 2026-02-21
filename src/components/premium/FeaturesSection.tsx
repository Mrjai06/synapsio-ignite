import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Store, Cog, MessageSquare, 
  ArrowRight, Clock, AlertTriangle,
  TrendingDown, Zap, Users, Circle, Play, CheckCircle, Plus, X
} from "lucide-react";
import { AmbientGlow } from "./DepthSystem";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";

// System states for the animation
type SystemState = "idle" | "decision" | "execution";

// Investor-focused feature data - emphasizing decisions, not abstract AI
const features = [
  {
    id: "marketplace",
    title: "AI Marketplace",
    icon: Store,
    description: "Autonomous supplier discovery and qualification",
    content: {
      headline: "Every sourcing decision optimized automatically",
      decision: "Which supplier to use for each order",
      constraint: "Balance cost, lead time, quality, and risk exposure",
      removal: {
        cost: "Eliminates 40+ hours/week of manual RFQ processing",
        risk: "Real-time supplier health monitoring vs. quarterly reviews",
        time: "Seconds to match vs. weeks of evaluation"
      },
      keyFeatures: [
        "Direct producer-to-business trading",
        "Reduced procurement costs and faster sourcing",
        "AI-optimized supplier matching and contract negotiation (price, availability, lead time)",
        "Transaction-based scalability"
      ]
    },
    semantics: {
      input: "Incoming purchase request with specs, quantity, deadline",
      decision: "AI evaluates 47 suppliers on cost, risk, capacity in 0.3s",
      action: "Selected supplier receives automated PO, logistics triggered"
    }
  },
  {
    id: "operations",
    title: "Autonomous Operations",
    icon: Cog,
    description: "Self-running supply chain execution",
    content: {
      headline: "Zero-touch from order to delivery",
      decision: "When to replenish, how much, and which route",
      constraint: "Optimize service levels while minimizing working capital",
      removal: {
        risk: "Prevents stockouts before they happen",
        time: "Continuous optimization vs. weekly planning cycles"
      },
      keyFeatures: [
        "24/7 AI-driven operational decision-making",
        "Demand forecasting and auto-replenishment",
        "Dynamic safety stock optimization"
      ]
    },
    semantics: {
      input: "Inventory drops below dynamic threshold at DC-West",
      decision: "AI calculates optimal reorder: qty, timing, routing",
      action: "Orders placed, trucks dispatched, ETAs confirmed"
    }
  },
  {
    id: "communication",
    title: "AI-to-AI Communication",
    icon: MessageSquare,
    description: "Cross-company autonomous coordination",
    content: {
      headline: "Your system negotiates with their system",
      decision: "Contract terms, delivery windows, and exception handling",
      constraint: "Align partner incentives with your business objectives",
      removal: {
        cost: "Eliminates manual coordination across 50+ partner touchpoints",
        risk: "Instant exception handling vs. email escalation chains",
        time: "Sub-second sync vs. days of back-and-forth"
      },
      keyFeatures: [
        "Automated supplier communication",
        "Intelligent P2B & B2B-negotiations",
        "Cross-company data synchronisation",
        "Reduced friction and lower bullwhip effect"
      ]
    },
    semantics: {
      input: "Partner's AI signals capacity constraint on order #4721",
      decision: "Your AI evaluates alternatives, negotiates new terms",
      action: "Agreement reached, contracts updated, production rescheduled"
    }
  }
];

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState<string>("");
  const [systemState, setSystemState] = useState<SystemState>("idle");
  const [isLoopPaused, setIsLoopPaused] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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

  // Listen for external feature selection events
  useEffect(() => {
    const handleSetActiveFeature = (event: CustomEvent<string>) => {
      if (features.find(f => f.id === event.detail)) {
        setActiveFeature(event.detail);
      }
    };

    window.addEventListener('setActiveFeature', handleSetActiveFeature as EventListener);
    return () => {
      window.removeEventListener('setActiveFeature', handleSetActiveFeature as EventListener);
    };
  }, []);

  // Cycle through system states for the animation (only when not paused)
  useEffect(() => {
    if (isLoopPaused) return;
    
    const stateSequence: SystemState[] = ["idle", "decision", "execution"];
    let currentIndex = stateSequence.indexOf(systemState);
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % stateSequence.length;
      setSystemState(stateSequence[currentIndex]);
    }, 3200);

    return () => clearInterval(interval);
  }, [activeFeature, isLoopPaused, systemState]);

  // Handler for clicking a state
  const handleStateClick = (clickedState: SystemState) => {
    setSystemState(clickedState);
    setIsLoopPaused(true);
  };

  // Reset state when feature changes
  useEffect(() => {
    setSystemState("idle");
    setIsLoopPaused(false);
  }, [activeFeature]);

  const activeData = features.find(f => f.id === activeFeature) || features[0];

  return (
    <section data-features-section className="relative py-32 md:py-48">
      

      <div className="relative z-10 container mx-auto px-8 lg:px-16 xl:px-24">
        {/* Section header */}
        <div ref={headerRef} className="max-w-2xl mb-20 md:mb-28">
          <p
            className={`text-[0.625rem] tracking-[0.4em] uppercase text-primary/50 mb-8 transition-all duration-1000 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            The Product
          </p>
          <h2
            className={`text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[-0.02em] mb-8 leading-[1.08] transition-all duration-1000 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="text-foreground">Decisions automated,</span>
            <br />
            <span className="text-muted-foreground/30">not delegated</span>
          </h2>
        </div>

        {/* Feature Cards - Default 3-column, expands on click */}
        <div className="relative mb-12" ref={cardsRef}>
          <motion.div 
            className="flex gap-4 items-stretch"
            layout
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {features.map((feature) => {
              const isActive = activeFeature === feature.id;
              const isAnyActive = activeFeature !== "";
              const isInactive = isAnyActive && !isActive;
              const Icon = feature.icon;
              
              return (
                <motion.div
                  key={feature.id}
                  layout
                  initial={false}
                  animate={{ 
                    flex: isActive ? "1 1 auto" : isInactive ? "0 0 60px" : "1 1 0%",
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  onClick={() => {
                    if (cardsRef.current) {
                      const rect = cardsRef.current.getBoundingClientRect();
                      const offsetBefore = rect.top;
                      setActiveFeature(isActive ? "" : feature.id);
                      requestAnimationFrame(() => {
                        const newRect = cardsRef.current!.getBoundingClientRect();
                        const offsetAfter = newRect.top;
                        const diff = offsetAfter - offsetBefore;
                        if (diff !== 0) {
                          window.scrollBy({ top: diff, behavior: "instant" as ScrollBehavior });
                        }
                      });
                    } else {
                      setActiveFeature(isActive ? "" : feature.id);
                    }
                  }}
                  className={`rounded-2xl border overflow-hidden cursor-pointer ${
                    isActive 
                      ? "bg-accent/10 border-accent/40 ring-2 ring-accent/20" 
                      : isInactive
                        ? "bg-background/20 border-border/10 hover:border-border/30"
                        : "bg-background/40 border-border/20 hover:border-border/40"
                  }`}
                  style={{ transition: "background-color 0.5s, border-color 0.5s, box-shadow 0.5s" }}
                >
                  {/* Card Header - Always visible */}
                  <motion.div 
                    layout="position"
                    className={`${isInactive ? "p-3" : "p-5"}`}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <motion.div 
                      layout="position"
                      className={`flex items-center ${isInactive ? "flex-col gap-2" : "gap-3 mb-3"}`}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <motion.div 
                        layout
                        className={`rounded-xl flex items-center justify-center shrink-0 ${
                          isActive ? "bg-accent/20" : isInactive ? "bg-primary/5" : "bg-primary/10"
                        }`}
                        animate={{
                          width: isInactive ? 32 : 40,
                          height: isInactive ? 32 : 40
                        }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        style={{ transition: "background-color 0.5s" }}
                      >
                        <Icon className={`transition-all duration-400 ${
                          isActive ? "text-accent w-5 h-5" : isInactive ? "text-primary/40 w-4 h-4" : "text-primary/60 w-5 h-5"
                        }`} />
                      </motion.div>
                      
                      <AnimatePresence mode="wait">
                        {!isInactive && (
                          <motion.h3 
                            key="title"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={`font-medium text-base whitespace-nowrap ${
                              isActive ? "text-accent" : "text-foreground"
                            }`}
                            style={{ transition: "color 0.5s" }}
                          >
                            {feature.title}
                          </motion.h3>
                        )}
                      </AnimatePresence>
                      
                      {/* Plus / Close indicator */}
                      {!isInactive && (
                        <div className="ml-auto shrink-0">
                          {isActive ? (
                            <X className="w-4 h-4 text-foreground" />
                          ) : (
                            <Plus className="w-4 h-4 text-foreground" />
                          )}
                        </div>
                      )}
                    </motion.div>
                    
                      <AnimatePresence mode="wait">
                      {!isInactive && (
                        <motion.p 
                          key="description"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
                          className="text-sm text-muted-foreground/50 leading-relaxed"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  {/* Expanded Content - Only when active */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <div className="grid md:grid-cols-[1fr_1fr_1fr] gap-6 border-t border-accent/20 pt-4">
                            {/* Left: Headline & Details */}
                            <div className="space-y-4">
                              <p className="text-base text-foreground/90 leading-relaxed font-light">
                                {feature.content.headline}
                              </p>

                              <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                                <p className="text-[0.625rem] uppercase tracking-wider text-accent/70 mb-1">
                                  Decision Automated
                                </p>
                                <p className="text-foreground/80 leading-relaxed text-sm">
                                  {feature.content.decision}
                                </p>
                              </div>

                              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                                <p className="text-[0.625rem] uppercase tracking-wider text-primary/70 mb-1">
                                  Constraint Optimized
                                </p>
                                <p className="text-foreground/70 leading-relaxed text-sm">
                                  {feature.content.constraint}
                                </p>
                              </div>
                            </div>

                            {/* Middle: What's Eliminated */}
                            <div className="space-y-3">
                              <p className="text-[0.625rem] uppercase tracking-wider text-muted-foreground/50">
                                What's Eliminated
                              </p>
                              {Object.entries(feature.content.removal).map(([key, value], idx) => (
                                <motion.div
                                  key={key}
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 + idx * 0.08 }}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0 mt-1.5" />
                                  <span className="text-muted-foreground/70">{value}</span>
                                </motion.div>
                              ))}
                            </div>

                            {/* Right: Key Features */}
                            <div className="space-y-3">
                              <p className="text-[0.625rem] uppercase tracking-wider text-muted-foreground/50">
                                Key Features
                              </p>
                              {feature.content.keyFeatures.map((item, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.15 + idx * 0.06 }}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5" />
                                  <span className="text-muted-foreground/70">{item}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Animation Interface - Only visible when a card is selected */}
        <AnimatePresence>
          {activeFeature !== "" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              {/* Live Explanation Panel - Above visualization */}
              <div className="mb-4">
                <LiveExplanationPanel 
                  semantics={activeData.semantics} 
                  state={systemState} 
                />
              </div>

              {/* VISUALIZATION - Full width below cards */}
              <div className="relative w-full aspect-[16/9] max-h-[37.5rem] rounded-3xl border border-border/20 bg-background/40 backdrop-blur-sm overflow-hidden">
                {/* System State Indicator - Top Right */}
                <SystemStateIndicator state={systemState} onStateClick={handleStateClick} isPaused={isLoopPaused} />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    {activeFeature === "marketplace" && <MarketplaceVisualization state={systemState} />}
                    {activeFeature === "operations" && <OperationsVisualization state={systemState} />}
                    {activeFeature === "communication" && <CommunicationVisualization state={systemState} />}
                  </motion.div>
                </AnimatePresence>
                
                {/* What's eliminated - overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 pt-16 pb-6 px-6 bg-gradient-to-t from-background/90 via-background/60 to-transparent">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="max-w-2xl mx-auto"
                    >
                      <p className="text-xs uppercase tracking-wider text-muted-foreground/50 mb-3 text-center">
                        What's Eliminated
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        {Object.entries(activeData.content.removal).map(([key, value], idx) => (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-2 text-sm bg-background/60 px-3 py-1.5 rounded-full border border-border/20"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
                            <span className="text-muted-foreground/70">{value}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// ============================================================
// SYSTEM STATE INDICATOR
// Shows current state: Idle, Decision, Execution
// ============================================================
const SystemStateIndicator = ({ 
  state, 
  onStateClick, 
  isPaused 
}: { 
  state: SystemState; 
  onStateClick: (state: SystemState) => void;
  isPaused: boolean;
}) => {
  const states: { id: SystemState; label: string; icon: typeof Circle }[] = [
    { id: "idle", label: "Idle", icon: Circle },
    { id: "decision", label: "Decision", icon: Play },
    { id: "execution", label: "Execution", icon: CheckCircle },
  ];

  return (
    <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border/30">
      <span className="text-[0.5625rem] uppercase tracking-wider text-muted-foreground/50 mr-2">State</span>
      {states.map((s) => {
        const isActive = state === s.id;
        const Icon = s.icon;
        return (
          <motion.button
            key={s.id}
            onClick={() => onStateClick(s.id)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-full transition-all duration-300 cursor-pointer ${
              isActive 
                ? s.id === "idle" 
                  ? "bg-muted-foreground/20 text-foreground" 
                  : s.id === "decision" 
                    ? "bg-accent/20 text-accent" 
                    : "bg-primary/20 text-primary"
                : "text-muted-foreground/30 hover:text-muted-foreground/60 hover:bg-muted-foreground/10"
            }`}
            animate={isActive ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className={`w-3 h-3 ${isActive && s.id === "execution" ? "animate-pulse" : ""}`} />
            <span className="text-[0.625rem] font-medium">{s.label}</span>
          </motion.button>
        );
      })}
      {isPaused && (
        <span className="text-[8px] uppercase tracking-wider text-accent/70 ml-1">Paused</span>
      )}
    </div>
  );
};

// ============================================================
// LIVE EXPLANATION PANEL
// Shows Input → Decision → Action synced to animation state
// ============================================================
const LiveExplanationPanel = ({ 
  semantics, 
  state 
}: { 
  semantics: { input: string; decision: string; action: string }; 
  state: SystemState;
}) => {
  const steps = [
    { id: "idle", label: "Input", text: semantics.input, color: "muted-foreground" },
    { id: "decision", label: "Decision", text: semantics.decision, color: "accent" },
    { id: "execution", label: "Action", text: semantics.action, color: "primary" },
  ];

  return (
    <div className="w-full bg-background/90 backdrop-blur-sm rounded-xl border border-border/30 overflow-hidden">
      <div className="flex items-center gap-4 px-4 py-3">
        {/* Title */}
        <p className="text-[0.5625rem] uppercase tracking-widest text-muted-foreground/50 whitespace-nowrap shrink-0">
          Live System Activity
        </p>
        
        {/* Steps in horizontal layout */}
        <div className="flex-1 flex items-center gap-2 min-w-0 overflow-hidden">
          {steps.map((step, idx) => {
            const isActive = 
              (state === "idle" && step.id === "idle") ||
              (state === "decision" && (step.id === "idle" || step.id === "decision")) ||
              (state === "execution");
            const isCurrent = step.id === state;
            
            return (
              <motion.div
                key={step.id}
                className={`flex items-center gap-2 flex-1 min-w-0 transition-all duration-500 ${
                  isActive ? "opacity-100" : "opacity-30"
                }`}
                animate={isCurrent ? { x: [0, 2, 0] } : {}}
                transition={{ duration: 0.6 }}
              >
                {/* Step indicator */}
                <motion.div 
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isCurrent 
                      ? step.id === "idle" 
                        ? "bg-foreground" 
                        : step.id === "decision" 
                          ? "bg-accent" 
                          : "bg-primary"
                      : "bg-border"
                  }`}
                  animate={isCurrent ? { scale: [1, 1.5, 1] } : {}}
                  transition={{ duration: 0.75, repeat: isCurrent ? Infinity : 0, repeatDelay: 1.25 }}
                />
                
                {/* Content */}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className={`text-[0.5625rem] uppercase tracking-wider truncate ${
                    isCurrent 
                      ? step.id === "idle" 
                        ? "text-foreground/70" 
                        : step.id === "decision" 
                          ? "text-accent/70" 
                          : "text-primary/70"
                      : "text-muted-foreground/40"
                  }`}>
                    {step.label}
                  </p>
                  <p className={`text-[0.625rem] leading-tight truncate ${
                    isCurrent ? "text-foreground/90" : "text-muted-foreground/50"
                  }`} title={step.text}>
                    {step.text}
                  </p>
                </div>
                
                {/* Connector arrow */}
                {idx < 2 && (
                  <div className={`text-[0.625rem] ${isActive ? "text-border" : "text-border/30"}`}>→</div>
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Progress bar */}
        <div className="w-24 h-1 bg-border/20 rounded-full overflow-hidden shrink-0">
          <motion.div
            className={`h-full ${
              state === "idle" 
                ? "bg-foreground/30" 
                : state === "decision" 
                  ? "bg-accent" 
                  : "bg-primary"
            }`}
            animate={{
              width: state === "idle" ? "33%" : state === "decision" ? "66%" : "100%"
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MARKETPLACE VISUALIZATION
// Input → Decision → Action with visual signals
// Directional motion = action, Acceleration = decision, Pulses = execution
// ============================================================
const MarketplaceVisualization = ({ state }: { state: SystemState }) => {
  const suppliers = [
    { id: 1, x: 80, y: 100, score: 92, optimal: true },
    { id: 2, x: 80, y: 175, score: 78, optimal: false },
    { id: 3, x: 80, y: 250, score: 65, optimal: false },
    { id: 4, x: 80, y: 325, score: 84, optimal: false },
  ];
  
  const aiEngine = { x: 275, y: 210 };
  const procurement = { x: 475, y: 210 };

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 550 400" preserveAspectRatio="xMidYMid meet">
      {/* Background grid */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
        </pattern>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Phase labels */}
      <text x="80" y="55" textAnchor="middle" className="fill-muted-foreground/40 text-[9px] uppercase tracking-widest">
        Input
      </text>
      <text x="275" y="55" textAnchor="middle" className={`text-[9px] uppercase tracking-widest transition-all duration-300 ${state === "decision" ? "fill-accent" : "fill-muted-foreground/40"}`}>
        Decision
      </text>
      <text x="475" y="55" textAnchor="middle" className={`text-[9px] uppercase tracking-widest transition-all duration-300 ${state === "execution" ? "fill-primary" : "fill-muted-foreground/40"}`}>
        Action
      </text>

      {/* INPUT PHASE: Supplier data flows in */}
      {suppliers.map((supplier, idx) => (
        <g key={supplier.id}>
          {/* Connection to AI - directional motion during input */}
          <motion.line
            x1={supplier.x + 30}
            y1={supplier.y}
            x2={aiEngine.x - 50}
            y2={aiEngine.y}
            stroke={supplier.optimal ? "hsl(var(--accent))" : "hsl(var(--border))"}
            strokeWidth={supplier.optimal ? 2 : 1}
            strokeDasharray={supplier.optimal ? "0" : "4 4"}
            opacity={state === "idle" ? 0.8 : state === "decision" ? 0.4 : 0.2}
          />
          
          {/* Data flow particles - DIRECTIONAL MOTION during idle (input flowing) */}
          {state === "idle" && (
            <motion.circle
              r="4"
              fill="hsl(var(--muted-foreground))"
              animate={{
                cx: [supplier.x + 30, aiEngine.x - 50],
                cy: [supplier.y, aiEngine.y],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 1.5,
                delay: idx * 0.2,
                repeat: Infinity,
                ease: "linear", // Linear = steady input flow
              }}
            />
          )}
          
          {/* Supplier node */}
          <motion.rect
            x={supplier.x - 28}
            y={supplier.y - 24}
            width="56"
            height="48"
            rx="8"
            fill="hsl(var(--background))"
            stroke={supplier.optimal ? "hsl(var(--accent))" : "hsl(var(--border))"}
            strokeWidth={supplier.optimal ? 2 : 1}
            animate={state === "idle" ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
            transition={{ duration: 2, repeat: state === "idle" ? Infinity : 0 }}
          />
          
          {/* Supplier score */}
          <text
            x={supplier.x}
            y={supplier.y + 5}
            textAnchor="middle"
            className={`text-sm font-medium ${supplier.optimal ? "fill-accent" : "fill-muted-foreground/60"}`}
          >
            {supplier.score}
          </text>
          
          <text
            x={supplier.x}
            y={supplier.y - 10}
            textAnchor="middle"
            className="fill-muted-foreground/40 text-[8px] uppercase"
          >
            Rating
          </text>
        </g>
      ))}

      {/* DECISION PHASE: AI Engine evaluates with ACCELERATION */}
      <motion.g
        animate={state === "decision" ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, repeat: state === "decision" ? Infinity : 0 }}
      >
        <motion.rect
          x={aiEngine.x - 50}
          y={aiEngine.y - 60}
          width="100"
          height="120"
          rx="12"
          fill="hsl(var(--background))"
          stroke="hsl(var(--accent))"
          strokeWidth={state === "decision" ? 3 : 2}
          filter={state === "decision" ? "url(#glow)" : "none"}
        />
        
        <text x={aiEngine.x} y={aiEngine.y - 40} textAnchor="middle" className={`text-[10px] font-medium uppercase tracking-wider ${state === "decision" ? "fill-accent" : "fill-muted-foreground/50"}`}>
          {state === "idle" ? "Awaiting" : state === "decision" ? "Evaluating" : "Complete"}
        </text>
        
        {/* Processing bars with ACCELERATION during decision */}
        {["Price", "Lead", "Risk"].map((label, i) => (
          <g key={label}>
            <text x={aiEngine.x - 40} y={aiEngine.y - 5 + i * 25} className="fill-muted-foreground/50 text-[9px]">
              {label}
            </text>
            <rect x={aiEngine.x - 5} y={aiEngine.y - 13 + i * 25} width="45" height="8" rx="4" fill="hsl(var(--border))" opacity="0.3" />
            <motion.rect
              x={aiEngine.x - 5}
              y={aiEngine.y - 13 + i * 25}
              height="8"
              rx="4"
              fill="hsl(var(--accent))"
              animate={
                state === "decision" 
                  ? { 
                      width: [0, 45, 30, 45, 38, 45], // Accelerating evaluation
                    }
                  : state === "execution"
                    ? { width: [35, 40, 42][i] }
                    : { width: 0 }
              }
              transition={
                state === "decision"
                  ? { 
                      duration: 1.8, 
                      repeat: Infinity,
                      ease: [0.4, 0, 0.2, 1], // Ease = acceleration feel
                    }
                  : { duration: 0.5 }
              }
            />
          </g>
        ))}
        
        
      </motion.g>

      {/* EXECUTION PHASE: Winner selected, order flows with PULSES */}
      {state === "execution" && (
        <>
          {/* Optimal selection highlight */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <rect x={suppliers[0].x + 20} y={suppliers[0].y - 30} width="40" height="18" rx="9" fill="hsl(var(--accent))" />
            <text x={suppliers[0].x + 40} y={suppliers[0].y - 17} textAnchor="middle" className="fill-background text-[9px] font-medium">
              BEST
            </text>
          </motion.g>
          
          {/* Output line to procurement */}
          <motion.line
            x1={aiEngine.x + 50}
            y1={aiEngine.y}
            x2={procurement.x - 40}
            y2={procurement.y}
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Execution PULSES - action in motion */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              r="8"
              fill="hsl(var(--primary))"
              filter="url(#glow)"
              animate={{
                cx: [aiEngine.x + 50, procurement.x - 40],
                cy: [aiEngine.y, procurement.y],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.5], // Pulse effect
              }}
              transition={{
                duration: 1,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </>
      )}

      {/* Procurement node */}
      <motion.g
        animate={state === "execution" ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 0.8, repeat: state === "execution" ? Infinity : 0 }}
      >
        <rect
          x={procurement.x - 40}
          y={procurement.y - 40}
          width="80"
          height="80"
          rx="12"
          fill="hsl(var(--background))"
          stroke={state === "execution" ? "hsl(var(--primary))" : "hsl(var(--border))"}
          strokeWidth={state === "execution" ? 2 : 1}
        />
        <text x={procurement.x} y={procurement.y - 12} textAnchor="middle" className={`text-[10px] uppercase tracking-wider ${state === "execution" ? "fill-primary" : "fill-muted-foreground/50"}`}>
          Order
        </text>
        
        {state === "execution" ? (
          <motion.text 
            x={procurement.x} 
            y={procurement.y + 15} 
            textAnchor="middle" 
            className="fill-primary text-2xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            ✓
          </motion.text>
        ) : (
          <text x={procurement.x} y={procurement.y + 15} textAnchor="middle" className="fill-muted-foreground/30 text-xl">
            ○
          </text>
        )}
      </motion.g>
    </svg>
  );
};

// ============================================================
// OPERATIONS VISUALIZATION  
// Input → Decision → Action with visual signals
// ============================================================
const OperationsVisualization = ({ state }: { state: SystemState }) => {
  const chainNodes = [
    { id: "demand", label: "Demand", x: 80 },
    { id: "plan", label: "Planning", x: 180 },
    { id: "procure", label: "Procure", x: 280 },
    { id: "fulfill", label: "Fulfill", x: 380 },
    { id: "deliver", label: "Deliver", x: 480 },
  ];

  // Map state to active node
  const activeNodeIndex = state === "idle" ? 0 : state === "decision" ? 2 : 4;

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 550 400" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="ops-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
        </pattern>
        <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
          <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
        </linearGradient>
        <filter id="ops-glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#ops-grid)" />

      {/* Phase labels */}
      <text x="130" y="70" textAnchor="middle" className={`text-[9px] uppercase tracking-widest ${state === "idle" ? "fill-foreground/70" : "fill-muted-foreground/30"}`}>
        Input Signal
      </text>
      <text x="275" y="70" textAnchor="middle" className={`text-[9px] uppercase tracking-widest ${state === "decision" ? "fill-accent" : "fill-muted-foreground/30"}`}>
        Decision Loop
      </text>
      <text x="430" y="70" textAnchor="middle" className={`text-[9px] uppercase tracking-widest ${state === "execution" ? "fill-primary" : "fill-muted-foreground/30"}`}>
        Execution
      </text>

      {/* Main flow line - progresses with state */}
      <rect x="60" y="147" width="430" height="6" rx="3" fill="hsl(var(--border))" opacity="0.2" />
      <motion.rect
        x="60"
        y="147"
        height="6"
        rx="3"
        fill={state === "idle" ? "hsl(var(--foreground))" : state === "decision" ? "hsl(var(--accent))" : "hsl(var(--primary))"}
        animate={{
          width: state === "idle" ? 40 : state === "decision" ? 220 : 430
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Chain nodes */}
      {chainNodes.map((node, idx) => {
        const isActive = idx <= activeNodeIndex;
        const isCurrent = idx === activeNodeIndex;
        
        return (
          <motion.g
            key={node.id}
            animate={isCurrent ? { y: [0, -3, 0] } : {}}
            transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
          >
            <rect
              x={node.x - 35}
              y={165}
              width="70"
              height="50"
              rx="10"
              fill="hsl(var(--background))"
              stroke={isCurrent ? (state === "decision" ? "hsl(var(--accent))" : "hsl(var(--primary))") : isActive ? "hsl(var(--border))" : "hsl(var(--border))"}
              strokeWidth={isCurrent ? 2 : 1}
              opacity={isActive ? 1 : 0.4}
            />
            
            {/* Status indicator - positioned above text */}
            <motion.circle
              cx={node.x}
              cy={183}
              r="8"
              fill={isCurrent ? (state === "decision" ? "hsl(var(--accent))" : "hsl(var(--primary))") : isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
              opacity={isActive ? 1 : 0.2}
              animate={isCurrent ? {
                scale: [1, 1.4, 1],
                opacity: [0.6, 1, 0.6],
              } : {}}
              transition={{
                duration: state === "decision" ? 0.5 : 1,
                repeat: isCurrent ? Infinity : 0,
              }}
            />
            {isActive && idx < activeNodeIndex && (
              <text x={node.x + 43} y={195} textAnchor="middle" className="fill-primary text-[10px] font-bold">✓</text>
            )}
            
            {/* Label text - positioned below indicator */}
            <text 
              x={node.x} 
              y={203} 
              textAnchor="middle" 
              className={`text-[11px] font-medium ${isActive ? "fill-foreground" : "fill-muted-foreground/40"}`}
            >
              {node.label}
            </text>
          </motion.g>
        );
      })}

      {/* Flow particles - move only within current phase's bar segment */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          r="6"
          fill={state === "idle" ? "hsl(var(--foreground))" : state === "decision" ? "hsl(var(--accent))" : "hsl(var(--primary))"}
          filter="url(#ops-glow)"
          animate={{
            cx: state === "idle" ? [60, 100] : state === "decision" ? [140, 280] : [280, 490],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: state === "decision" ? 1 : 1.5,
            delay: i * 0.4,
            repeat: Infinity,
            ease: state === "decision" ? "easeIn" : "linear",
          }}
          cy={150}
        />
      ))}

      {/* Decision processing visual during decision state */}
      {state === "decision" && (
        <motion.g>
          <motion.rect
            x={225}
            y={220}
            width="100"
            height="40"
            rx="8"
            fill="hsl(var(--accent))"
            opacity={0.1}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <text x={275} y={245} textAnchor="middle" className="fill-accent text-[10px] uppercase tracking-wider">
            Optimizing...
          </text>
        </motion.g>
      )}

      {/* Execution checkmark at end */}
      {state === "execution" && (
        <text x={500} y={155} textAnchor="start" className="fill-primary text-xl">✓</text>
      )}

    </svg>
  );
};

// ============================================================
// COMMUNICATION VISUALIZATION
// Two companies with AI agents - Input → Decision → Action
// ============================================================
const CommunicationVisualization = ({ state }: { state: SystemState }) => {
  const companyA = { x: 110, y: 210 };
  const companyB = { x: 440, y: 210 };
  const center = { x: 275, y: 210 };

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 550 400" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="comm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
        </pattern>
        <filter id="comm-glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#comm-grid)" />

      {/* Phase labels at top */}
      <text x={companyA.x} y="60" textAnchor="middle" className={`text-[9px] uppercase tracking-widest ${state === "idle" ? "fill-primary/80" : "fill-muted-foreground/30"}`}>
        Input Received
      </text>
      <text x={center.x} y="60" textAnchor="middle" className={`text-[9px] uppercase tracking-widest ${state === "decision" ? "fill-accent" : "fill-muted-foreground/30"}`}>
        Negotiating
      </text>
      <text x={companyB.x} y="60" textAnchor="middle" className={`text-[9px] uppercase tracking-widest ${state === "execution" ? "fill-primary" : "fill-muted-foreground/30"}`}>
        Agreement Executed
      </text>

      {/* Connection line */}
      <line
        x1={companyA.x + 60}
        y1={center.y}
        x2={companyB.x - 60}
        y2={center.y}
        stroke="hsl(var(--border))"
        strokeWidth="2"
        strokeDasharray="8 4"
        opacity={0.4}
      />

      {/* INPUT PHASE: Signal comes from partner - DIRECTIONAL MOTION */}
      {state === "idle" && (
        <motion.g>
          {/* Incoming signal from partner */}
          <motion.circle
            r="8"
            fill="hsl(var(--accent))"
            animate={{
              cx: [companyB.x - 60, companyA.x + 60],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            cy={center.y}
          />
          
          {/* Alert indicator on Company A */}
          <motion.circle
            cx={companyA.x + 40}
            cy={companyA.y - 50}
            r="8"
            fill="hsl(var(--accent))"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <text x={companyA.x + 40} y={companyA.y - 47} textAnchor="middle" className="fill-background text-[9px] font-bold">!</text>
        </motion.g>
      )}

      {/* DECISION PHASE: Bidirectional negotiation with ACCELERATION */}
      {state === "decision" && (
        <motion.g>
          {/* Rapid back-and-forth - accelerating speed */}
          {[0, 1].map((i) => (
            <motion.g key={`decision-flow-${i}`}>
              <motion.circle
                r="6"
                fill="hsl(var(--primary))"
                filter="url(#comm-glow)"
                animate={{
                  cx: [companyA.x + 60, companyB.x - 60],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 0.8, // Fast = acceleration
                  delay: i * 0.4,
                  repeat: Infinity,
                  ease: "easeIn",
                }}
                cy={center.y - 10}
              />
              <motion.circle
                r="6"
                fill="hsl(var(--accent))"
                filter="url(#comm-glow)"
                animate={{
                  cx: [companyB.x - 60, companyA.x + 60],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.4 + 0.2,
                  repeat: Infinity,
                  ease: "easeIn",
                }}
                cy={center.y + 10}
              />
            </motion.g>
          ))}
          
          {/* Negotiation indicator */}
          <motion.rect
            x={center.x - 50}
            y={center.y - 60}
            width="100"
            height="30"
            rx="15"
            fill="hsl(var(--accent))"
            opacity={0.15}
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          <text x={center.x} y={center.y - 40} textAnchor="middle" className="fill-accent text-[10px] uppercase tracking-wider">
            Negotiating
          </text>
        </motion.g>
      )}

      {/* EXECUTION PHASE: Agreement - PULSES */}
      {state === "execution" && (
        <motion.g>
          {/* Agreement pulse at center */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={center.x}
              cy={center.y}
              r="20"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              animate={{
                r: [20, 50, 80],
                opacity: [0.8, 0.4, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.6,
                repeat: Infinity,
              }}
            />
          ))}
          
          {/* Agreement badge */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <rect x={center.x - 50} y={center.y - 20} width="100" height="40" rx="20" fill="hsl(var(--primary))" />
            <text x={center.x} y={center.y + 6} textAnchor="middle" className="fill-background text-sm font-medium">
              ✓ Agreed
            </text>
          </motion.g>
          
          {/* Confirmation flows to both */}
          <motion.circle
            r="8"
            fill="hsl(var(--primary))"
            animate={{
              cx: [center.x, companyA.x + 60],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
            cy={center.y}
          />
          <motion.circle
            r="8"
            fill="hsl(var(--primary))"
            animate={{
              cx: [center.x, companyB.x - 60],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1, delay: 0.2 }}
            cy={center.y}
          />
        </motion.g>
      )}

      {/* Company A - Your System */}
      <motion.g
        animate={state === "idle" ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 2, repeat: state === "idle" ? Infinity : 0 }}
      >
        <rect
          x={companyA.x - 55}
          y={companyA.y - 70}
          width="110"
          height="140"
          rx="12"
          fill="hsl(var(--background))"
          stroke={state === "idle" ? "hsl(var(--primary))" : "hsl(var(--border))"}
          strokeWidth={state === "idle" ? 2 : 1}
        />
        
        <rect x={companyA.x - 40} y={companyA.y - 55} width="80" height="50" rx="8" fill="hsl(var(--primary))" opacity="0.15" />
        <text x={companyA.x} y={companyA.y - 35} textAnchor="middle" className="fill-primary text-[10px] font-medium uppercase">
          Synapsio Instance 1
        </text>
        <motion.circle
          cx={companyA.x}
          cy={companyA.y - 15}
          r="6"
          fill="hsl(var(--primary))"
          animate={state !== "execution" ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 1.5, repeat: state !== "execution" ? Infinity : 0 }}
        />
        
        <text x={companyA.x} y={companyA.y + 20} textAnchor="middle" className="fill-muted-foreground/50 text-[8px] uppercase">
          Rules Engine
        </text>
        <rect x={companyA.x - 30} y={companyA.y + 28} width="60" height="4" rx="2" fill="hsl(var(--primary))" opacity="0.3" />
        <rect x={companyA.x - 30} y={companyA.y + 36} width="45" height="4" rx="2" fill="hsl(var(--primary))" opacity="0.3" />
        
        {/* Execution checkmark */}
        {state === "execution" && (
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <circle cx={companyA.x + 45} cy={companyA.y - 60} r="12" fill="hsl(var(--primary))" />
            <text x={companyA.x + 45} y={companyA.y - 56} textAnchor="middle" className="fill-background text-[10px]">✓</text>
          </motion.g>
        )}
      </motion.g>

      {/* Company B - Partner System */}
      <motion.g
        animate={state === "execution" ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 1, repeat: state === "execution" ? Infinity : 0 }}
      >
        <rect
          x={companyB.x - 55}
          y={companyB.y - 70}
          width="110"
          height="140"
          rx="12"
          fill="hsl(var(--background))"
          stroke={state === "execution" ? "hsl(var(--primary))" : "hsl(var(--border))"}
          strokeWidth={state === "execution" ? 2 : 1}
        />
        
        <rect x={companyB.x - 40} y={companyB.y - 55} width="80" height="50" rx="8" fill="hsl(var(--accent))" opacity="0.15" />
        <text x={companyB.x} y={companyB.y - 35} textAnchor="middle" className="fill-accent text-[10px] font-medium uppercase">
          Synapsio Instance 2
        </text>
        <motion.circle
          cx={companyB.x}
          cy={companyB.y - 15}
          r="6"
          fill="hsl(var(--accent))"
          animate={state !== "execution" ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 1.5, repeat: state !== "execution" ? Infinity : 0, delay: 0.5 }}
        />
        
        <text x={companyB.x} y={companyB.y + 20} textAnchor="middle" className="fill-muted-foreground/50 text-[8px] uppercase">
          Rules Engine
        </text>
        <rect x={companyB.x - 30} y={companyB.y + 28} width="50" height="4" rx="2" fill="hsl(var(--accent))" opacity="0.3" />
        <rect x={companyB.x - 30} y={companyB.y + 36} width="60" height="4" rx="2" fill="hsl(var(--accent))" opacity="0.3" />
        
        {/* Execution checkmark */}
        {state === "execution" && (
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <circle cx={companyB.x + 45} cy={companyB.y - 60} r="12" fill="hsl(var(--primary))" />
            <text x={companyB.x + 45} y={companyB.y - 56} textAnchor="middle" className="fill-background text-[10px]">✓</text>
          </motion.g>
        )}
      </motion.g>

      {/* No human indicator */}
      <text x={center.x} y="380" textAnchor="middle" className={`text-[9px] uppercase tracking-wider ${state === "execution" ? "fill-primary/60" : "fill-muted-foreground/30"}`}>
        No Manual Intervention Required
      </text>
    </svg>
  );
};

export default FeaturesSection;
