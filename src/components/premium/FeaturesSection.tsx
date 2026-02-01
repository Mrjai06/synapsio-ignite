import { useState, useRef, useEffect } from "react";
import { 
  Store, Cog, MessageSquare, 
  ArrowRight, DollarSign, Clock, AlertTriangle,
  TrendingDown, Zap, Users
} from "lucide-react";
import { AmbientGlow } from "./DepthSystem";
import { motion, AnimatePresence } from "framer-motion";

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
      metrics: [
        { icon: DollarSign, value: "23%", label: "procurement savings" },
        { icon: Clock, value: "95%", label: "faster qualification" },
        { icon: AlertTriangle, value: "3x", label: "earlier risk detection" }
      ]
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
        cost: "Reduces safety stock by 30% through precision forecasting",
        risk: "Prevents stockouts before they happen",
        time: "Continuous optimization vs. weekly planning cycles"
      },
      metrics: [
        { icon: TrendingDown, value: "40%", label: "fewer stockouts" },
        { icon: Zap, value: "85%", label: "automation rate" },
        { icon: DollarSign, value: "18%", label: "inventory reduction" }
      ]
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
      metrics: [
        { icon: Users, value: "70%", label: "fewer manual touchpoints" },
        { icon: Clock, value: "<1s", label: "cross-company sync" },
        { icon: Zap, value: "24/7", label: "autonomous operation" }
      ]
    }
  }
];

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState<string>("marketplace");
  const [headerVisible, setHeaderVisible] = useState(false);
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

  const activeData = features.find(f => f.id === activeFeature)!;

  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <AmbientGlow color="primary" size="xl" intensity="medium" position="center" />
      <AmbientGlow color="accent" size="md" intensity="subtle" position="right" className="top-1/3" />

      <div className="relative z-10 container mx-auto px-8 lg:px-16 xl:px-24">
        {/* Section header */}
        <div ref={headerRef} className="max-w-2xl mb-20 md:mb-28">
          <p
            className={`text-[10px] tracking-[0.4em] uppercase text-primary/50 mb-8 transition-all duration-1000 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            How It Works
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

        {/* 2-Column Layout: Cards + Details */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 xl:gap-16 items-start mb-12">
          
          {/* LEFT: Feature Cards - Horizontal on desktop */}
          <div className="grid sm:grid-cols-3 gap-4">
            {features.map((feature) => {
              const isActive = activeFeature === feature.id;
              const Icon = feature.icon;
              
              return (
                <motion.button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-500 ${
                    isActive 
                      ? "bg-accent/10 border-accent/40 ring-2 ring-accent/20" 
                      : "bg-background/40 border-border/20 hover:border-border/40"
                  }`}
                  whileHover={{ scale: isActive ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                      isActive ? "bg-accent/20" : "bg-primary/10"
                    }`}>
                      <Icon className={`w-5 h-5 transition-colors duration-500 ${
                        isActive ? "text-accent" : "text-primary/60"
                      }`} />
                    </div>
                    <h3 className={`font-medium text-base transition-colors duration-500 ${
                      isActive ? "text-accent" : "text-foreground"
                    }`}>
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground/50 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 mt-3 pt-3 border-t border-accent/20"
                      >
                        <span className="text-xs text-accent/70 uppercase tracking-wider">Viewing</span>
                        <ArrowRight className="w-3 h-3 text-accent/70" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT: Decision-Focused Explanation */}
          <div className="lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                {/* Headline */}
                <h3 className="text-xl md:text-2xl font-light text-foreground leading-tight">
                  {activeData.content.headline}
                </h3>

                {/* Decision automated */}
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                  <p className="text-xs uppercase tracking-wider text-accent/70 mb-2">
                    Decision Automated
                  </p>
                  <p className="text-foreground/90 leading-relaxed text-sm">
                    {activeData.content.decision}
                  </p>
                </div>

                {/* Constraint optimized */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-xs uppercase tracking-wider text-primary/70 mb-2">
                    Constraint Optimized
                  </p>
                  <p className="text-foreground/80 leading-relaxed text-sm">
                    {activeData.content.constraint}
                  </p>
                </div>

                {/* Metrics - horizontal */}
                <div className="grid grid-cols-3 gap-2">
                  {activeData.content.metrics.map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="text-center p-3 rounded-xl bg-background/50 border border-border/10"
                      >
                        <Icon className="w-4 h-4 text-accent mx-auto mb-1" />
                        <p className="text-lg font-medium text-accent">{metric.value}</p>
                        <p className="text-[9px] text-muted-foreground/50 uppercase tracking-wider">
                          {metric.label}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* VISUALIZATION - Full width below cards */}
        <div className="relative w-full aspect-[16/9] max-h-[600px] rounded-3xl border border-border/20 bg-background/40 backdrop-blur-sm overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {activeFeature === "marketplace" && <MarketplaceVisualization />}
              {activeFeature === "operations" && <OperationsVisualization />}
              {activeFeature === "communication" && <CommunicationVisualization />}
            </motion.div>
          </AnimatePresence>
          
          {/* What's eliminated - overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 via-background/60 to-transparent">
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
      </div>
    </section>
  );
};

// ============================================================
// MARKETPLACE VISUALIZATION
// Shows: Multiple suppliers → AI evaluation → Optimal path selection
// ============================================================
const MarketplaceVisualization = () => {
  const suppliers = [
    { id: 1, x: 60, y: 80, score: 92, optimal: true },
    { id: 2, x: 60, y: 160, score: 78, optimal: false },
    { id: 3, x: 60, y: 240, score: 65, optimal: false },
    { id: 4, x: 60, y: 320, score: 84, optimal: false },
  ];
  
  const aiEngine = { x: 275, y: 200 };
  const procurement = { x: 490, y: 200 };

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 550 400" preserveAspectRatio="xMidYMid meet">
      {/* Background grid */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Supply Chain Labels */}
      <text x="60" y="40" textAnchor="middle" className="fill-muted-foreground/40 text-[10px] uppercase tracking-widest">
        Suppliers
      </text>
      <text x="275" y="40" textAnchor="middle" className="fill-accent/60 text-[10px] uppercase tracking-widest">
        AI Engine
      </text>
      <text x="490" y="40" textAnchor="middle" className="fill-muted-foreground/40 text-[10px] uppercase tracking-widest">
        Procurement
      </text>

      {/* Supplier nodes with evaluation lines */}
      {suppliers.map((supplier, idx) => (
        <g key={supplier.id}>
          {/* Connection to AI */}
          <motion.line
            x1={supplier.x + 30}
            y1={supplier.y}
            x2={aiEngine.x - 45}
            y2={aiEngine.y}
            stroke={supplier.optimal ? "hsl(var(--accent))" : "hsl(var(--border))"}
            strokeWidth={supplier.optimal ? 2 : 1}
            strokeDasharray={supplier.optimal ? "0" : "4 4"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: supplier.optimal ? 0.8 : 0.3 }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
          />
          
          {/* Data flow on optimal path */}
          {supplier.optimal && (
            <motion.circle
              r="6"
              fill="hsl(var(--accent))"
              animate={{
                cx: [supplier.x + 30, aiEngine.x - 45],
                cy: [supplier.y, aiEngine.y],
                opacity: [0, 1, 0.8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
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
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
          />
          
          {/* Supplier score */}
          <motion.text
            x={supplier.x}
            y={supplier.y + 5}
            textAnchor="middle"
            className={`text-sm font-medium ${supplier.optimal ? "fill-accent" : "fill-muted-foreground/60"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.1 + 0.2 }}
          >
            {supplier.score}
          </motion.text>
          
          {/* Score label */}
          <motion.text
            x={supplier.x}
            y={supplier.y - 10}
            textAnchor="middle"
            className="fill-muted-foreground/40 text-[8px] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.1 + 0.3 }}
          >
            Rating
          </motion.text>
          
          {/* Optimal badge */}
          {supplier.optimal && (
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
            >
              <rect x={supplier.x + 20} y={supplier.y - 30} width="36" height="16" rx="8" fill="hsl(var(--accent))" />
              <text x={supplier.x + 38} y={supplier.y - 19} textAnchor="middle" className="fill-background text-[8px] font-medium">
                BEST
              </text>
            </motion.g>
          )}
        </g>
      ))}

      {/* AI Engine - Central Decision Point */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <motion.rect
          x={aiEngine.x - 45}
          y={aiEngine.y - 55}
          width="90"
          height="110"
          rx="12"
          fill="hsl(var(--background))"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          animate={{
            boxShadow: [
              "0 0 20px hsl(var(--accent) / 0.2)",
              "0 0 40px hsl(var(--accent) / 0.4)",
              "0 0 20px hsl(var(--accent) / 0.2)",
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* AI processing indicators */}
        <text x={aiEngine.x} y={aiEngine.y - 30} textAnchor="middle" className="fill-accent text-[10px] font-medium uppercase tracking-wider">
          Evaluating
        </text>
        
        {/* Processing bars */}
        {["Price", "Lead", "Risk"].map((label, i) => (
          <g key={label}>
            <text x={aiEngine.x - 35} y={aiEngine.y + i * 22} className="fill-muted-foreground/50 text-[9px]">
              {label}
            </text>
            <rect x={aiEngine.x - 5} y={aiEngine.y - 8 + i * 22} width="40" height="6" rx="3" fill="hsl(var(--border))" opacity="0.3" />
            <motion.rect
              x={aiEngine.x - 5}
              y={aiEngine.y - 8 + i * 22}
              height="6"
              rx="3"
              fill="hsl(var(--accent))"
              initial={{ width: 0 }}
              animate={{ width: [0, 40, 35, 40][i] || 30 }}
              transition={{ duration: 1, delay: 0.8 + i * 0.2 }}
            />
          </g>
        ))}
      </motion.g>

      {/* Optimal path to Procurement */}
      <motion.line
        x1={aiEngine.x + 45}
        y1={aiEngine.y}
        x2={procurement.x - 35}
        y2={procurement.y}
        stroke="hsl(var(--accent))"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      />
      
      {/* Decision flow to procurement */}
      <motion.circle
        r="8"
        fill="hsl(var(--accent))"
        animate={{
          cx: [aiEngine.x + 45, procurement.x - 35],
          cy: [aiEngine.y, procurement.y],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 1.5,
          delay: 1.5,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />

      {/* Procurement node */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <rect
          x={procurement.x - 35}
          y={procurement.y - 35}
          width="70"
          height="70"
          rx="12"
          fill="hsl(var(--background))"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
        />
        <text x={procurement.x} y={procurement.y - 8} textAnchor="middle" className="fill-primary/80 text-[10px] uppercase tracking-wider">
          Order
        </text>
        <text x={procurement.x} y={procurement.y + 10} textAnchor="middle" className="fill-foreground text-lg font-medium">
          ✓
        </text>
      </motion.g>
    </svg>
  );
};

// ============================================================
// OPERATIONS VISUALIZATION  
// Shows: Continuous planning/execution loop, human steps faded
// ============================================================
const OperationsVisualization = () => {
  const chainNodes = [
    { id: "demand", label: "Demand", x: 80, automated: true },
    { id: "plan", label: "Planning", x: 180, automated: true },
    { id: "procure", label: "Procure", x: 280, automated: true },
    { id: "fulfill", label: "Fulfill", x: 380, automated: true },
    { id: "deliver", label: "Deliver", x: 480, automated: true },
  ];
  
  const humanSteps = [
    { label: "Review", x: 130, y: 280 },
    { label: "Approve", x: 230, y: 280 },
    { label: "Escalate", x: 330, y: 280 },
  ];

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 550 400" preserveAspectRatio="xMidYMid meet">
      {/* Background grid */}
      <defs>
        <pattern id="ops-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
        </pattern>
        <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
          <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#ops-grid)" />

      {/* Autonomous Operation Label */}
      <text x="275" y="60" textAnchor="middle" className="fill-accent/70 text-[11px] uppercase tracking-widest font-medium">
        Autonomous Execution Loop
      </text>

      {/* Main flow line */}
      <motion.rect
        x="60"
        y="125"
        width="430"
        height="4"
        rx="2"
        fill="url(#flow-gradient)"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2 }}
        style={{ transformOrigin: "60px 127px" }}
      />

      {/* Chain nodes */}
      {chainNodes.map((node, idx) => (
        <motion.g
          key={node.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.15 }}
        >
          {/* Node */}
          <rect
            x={node.x - 35}
            y={100}
            width="70"
            height="55"
            rx="10"
            fill="hsl(var(--background))"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
          />
          <text x={node.x} y={133} textAnchor="middle" className="fill-foreground text-[11px] font-medium">
            {node.label}
          </text>
          
          {/* Automation indicator */}
          <motion.circle
            cx={node.x}
            cy={170}
            r="8"
            fill="hsl(var(--accent))"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              delay: idx * 0.3,
              repeat: Infinity,
            }}
          />
          <text x={node.x} y={174} textAnchor="middle" className="fill-background text-[8px] font-bold">
            ✓
          </text>
        </motion.g>
      ))}

      {/* Flow particles */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          r="5"
          fill="hsl(var(--accent))"
          animate={{
            cx: [60, 500],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 1,
            repeat: Infinity,
            ease: "linear",
          }}
          cy={127}
        />
      ))}

      {/* Feedback loop arrow */}
      <motion.path
        d="M 480 160 Q 520 200 480 240 Q 400 280 275 280 Q 150 280 70 240 Q 30 200 70 160"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        strokeDasharray="8 4"
        opacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
      <text x="275" y="300" textAnchor="middle" className="fill-accent/50 text-[9px] uppercase tracking-wider">
        Continuous Learning Loop
      </text>

      {/* Human steps - faded/disabled */}
      <text x="230" y="340" textAnchor="middle" className="fill-muted-foreground/30 text-[9px] uppercase tracking-wider line-through">
        Manual Steps Eliminated
      </text>
      
      {humanSteps.map((step, idx) => (
        <motion.g
          key={step.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 1.5 + idx * 0.2 }}
        >
          <rect
            x={step.x - 25}
            y={step.y + 20}
            width="50"
            height="30"
            rx="6"
            fill="none"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text x={step.x} y={step.y + 40} textAnchor="middle" className="fill-muted-foreground/40 text-[9px]">
            {step.label}
          </text>
          {/* Strike through */}
          <line x1={step.x - 30} y1={step.y + 35} x2={step.x + 30} y2={step.y + 35} stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.4" />
        </motion.g>
      ))}
    </svg>
  );
};

// ============================================================
// COMMUNICATION VISUALIZATION
// Shows: Two companies with AI agents exchanging decisions directly
// ============================================================
const CommunicationVisualization = () => {
  const companyA = { x: 100, y: 200 };
  const companyB = { x: 450, y: 200 };
  const center = { x: 275, y: 200 };

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 550 400" preserveAspectRatio="xMidYMid meet">
      {/* Background grid */}
      <defs>
        <pattern id="comm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#comm-grid)" />

      {/* Labels */}
      <text x={companyA.x} y="60" textAnchor="middle" className="fill-primary/60 text-[10px] uppercase tracking-widest">
        Your Company
      </text>
      <text x={companyB.x} y="60" textAnchor="middle" className="fill-accent/60 text-[10px] uppercase tracking-widest">
        Partner Company
      </text>

      {/* Connection line */}
      <motion.line
        x1={companyA.x + 60}
        y1={center.y}
        x2={companyB.x - 60}
        y2={center.y}
        stroke="hsl(var(--border))"
        strokeWidth="2"
        strokeDasharray="8 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Bidirectional data flow */}
      {[0, 1].map((i) => (
        <motion.g key={`flow-${i}`}>
          {/* Outbound */}
          <motion.circle
            r="6"
            fill="hsl(var(--primary))"
            animate={{
              cx: [companyA.x + 60, companyB.x - 60],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 1.5,
              repeat: Infinity,
            }}
            cy={center.y - 8}
          />
          {/* Inbound */}
          <motion.circle
            r="6"
            fill="hsl(var(--accent))"
            animate={{
              cx: [companyB.x - 60, companyA.x + 60],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 1.5 + 0.5,
              repeat: Infinity,
            }}
            cy={center.y + 8}
          />
        </motion.g>
      ))}

      {/* Company A - Your System */}
      <motion.g
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Company container */}
        <rect
          x={companyA.x - 55}
          y={companyA.y - 70}
          width="110"
          height="140"
          rx="12"
          fill="hsl(var(--background))"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        
        {/* AI Agent */}
        <rect x={companyA.x - 40} y={companyA.y - 55} width="80" height="50" rx="8" fill="hsl(var(--primary))" opacity="0.15" />
        <text x={companyA.x} y={companyA.y - 35} textAnchor="middle" className="fill-primary text-[10px] font-medium uppercase">
          Your AI
        </text>
        <motion.circle
          cx={companyA.x}
          cy={companyA.y - 15}
          r="6"
          fill="hsl(var(--primary))"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Business rules */}
        <text x={companyA.x} y={companyA.y + 20} textAnchor="middle" className="fill-muted-foreground/50 text-[8px] uppercase">
          Rules Engine
        </text>
        <rect x={companyA.x - 30} y={companyA.y + 28} width="60" height="4" rx="2" fill="hsl(var(--primary))" opacity="0.3" />
        <rect x={companyA.x - 30} y={companyA.y + 36} width="45" height="4" rx="2" fill="hsl(var(--primary))" opacity="0.3" />
        <rect x={companyA.x - 30} y={companyA.y + 44} width="55" height="4" rx="2" fill="hsl(var(--primary))" opacity="0.3" />
      </motion.g>

      {/* Company B - Partner System */}
      <motion.g
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Company container */}
        <rect
          x={companyB.x - 55}
          y={companyB.y - 70}
          width="110"
          height="140"
          rx="12"
          fill="hsl(var(--background))"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
        />
        
        {/* AI Agent */}
        <rect x={companyB.x - 40} y={companyB.y - 55} width="80" height="50" rx="8" fill="hsl(var(--accent))" opacity="0.15" />
        <text x={companyB.x} y={companyB.y - 35} textAnchor="middle" className="fill-accent text-[10px] font-medium uppercase">
          Their AI
        </text>
        <motion.circle
          cx={companyB.x}
          cy={companyB.y - 15}
          r="6"
          fill="hsl(var(--accent))"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        
        {/* Business rules */}
        <text x={companyB.x} y={companyB.y + 20} textAnchor="middle" className="fill-muted-foreground/50 text-[8px] uppercase">
          Rules Engine
        </text>
        <rect x={companyB.x - 30} y={companyB.y + 28} width="50" height="4" rx="2" fill="hsl(var(--accent))" opacity="0.3" />
        <rect x={companyB.x - 30} y={companyB.y + 36} width="60" height="4" rx="2" fill="hsl(var(--accent))" opacity="0.3" />
        <rect x={companyB.x - 30} y={companyB.y + 44} width="40" height="4" rx="2" fill="hsl(var(--accent))" opacity="0.3" />
      </motion.g>

      {/* Negotiation events */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        {/* Event labels */}
        <rect x={center.x - 50} y="90" width="100" height="24" rx="12" fill="hsl(var(--background))" stroke="hsl(var(--border))" />
        <text x={center.x} y="106" textAnchor="middle" className="fill-foreground/70 text-[9px]">
          Negotiating...
        </text>
        
        {/* Decision confirmations */}
        <motion.g
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        >
          <rect x={center.x - 45} y="310" width="90" height="28" rx="8" fill="hsl(var(--accent))" opacity="0.2" />
          <text x={center.x} y="328" textAnchor="middle" className="fill-accent text-[10px] font-medium">
            ✓ Agreed
          </text>
        </motion.g>
      </motion.g>

      {/* No human in the loop indicator */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
      >
        <text x={center.x} y="380" textAnchor="middle" className="fill-muted-foreground/40 text-[9px] uppercase tracking-wider">
          No Manual Intervention Required
        </text>
      </motion.g>
    </svg>
  );
};

export default FeaturesSection;
