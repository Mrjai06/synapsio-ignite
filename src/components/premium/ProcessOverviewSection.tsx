import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Zap, TrendingUp, Package, DollarSign, 
  Truck, BarChart3, Clock, Globe
} from "lucide-react";
import { AmbientGlow } from "./DepthSystem";

interface SignalNode {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  angle: number; // Position in degrees
  input: string;
  decision: string;
  outcome: string;
}

const signalNodes: SignalNode[] = [
  {
    id: "demand",
    label: "Demand Signals",
    icon: TrendingUp,
    angle: 0,
    input: "Real-time sales velocity",
    decision: "Forecast adjustment",
    outcome: "Optimized stock levels"
  },
  {
    id: "inventory",
    label: "Inventory State",
    icon: Package,
    angle: 45,
    input: "Current stock positions",
    decision: "Reorder triggers",
    outcome: "Zero stockouts"
  },
  {
    id: "pricing",
    label: "Market Prices",
    icon: DollarSign,
    angle: 90,
    input: "Competitive pricing data",
    decision: "Supplier selection",
    outcome: "Cost reduction"
  },
  {
    id: "logistics",
    label: "Logistics Data",
    icon: Truck,
    angle: 135,
    input: "Transit & capacity",
    decision: "Route optimization",
    outcome: "Faster delivery"
  },
  {
    id: "suppliers",
    label: "Supplier Feed",
    icon: Globe,
    angle: 180,
    input: "Availability updates",
    decision: "Dynamic sourcing",
    outcome: "Supply continuity"
  },
  {
    id: "performance",
    label: "Performance",
    icon: BarChart3,
    angle: 225,
    input: "KPI metrics",
    decision: "Process tuning",
    outcome: "Efficiency gains"
  },
  {
    id: "timing",
    label: "Time Constraints",
    icon: Clock,
    angle: 270,
    input: "Deadlines & SLAs",
    decision: "Priority ranking",
    outcome: "On-time execution"
  },
  {
    id: "events",
    label: "External Events",
    icon: Zap,
    angle: 315,
    input: "Market disruptions",
    decision: "Risk mitigation",
    outcome: "Business resilience"
  }
];

const ProcessOverviewSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<SignalNode | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const radius = 200; // Orbit radius
  const centerX = 250;
  const centerY = 250;

  const getNodePosition = (angle: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad)
    };
  };

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48">
      <AmbientGlow color="primary" size="lg" intensity="subtle" position="center" />
      <AmbientGlow color="accent" size="md" intensity="subtle" position="right" className="top-1/3" />

      <div className="relative z-10 container mx-auto px-8 lg:px-16 xl:px-24">
        {/* Section header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <p
            className={`text-[0.625rem] tracking-[0.4em] uppercase text-primary/50 mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            System Architecture
          </p>
          <h2
            className={`text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[-0.02em] mb-6 leading-[1.08] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="text-foreground">Always-on</span>
            <br />
            <span className="text-muted-foreground/30">intelligence</span>
          </h2>
          <p
            className={`text-sm text-muted-foreground/60 max-w-md transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Continuous decision loops process live signals, optimizing every supply chain action in real-time.
          </p>
        </div>

        {/* Main visualization container */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Circular System Diagram */}
          <div 
            className={`relative flex-shrink-0 transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <svg 
              viewBox="0 0 500 500" 
              className="w-[20rem] h-[20rem] md:w-[28.125rem] md:h-[28.125rem] lg:w-[31.25rem] lg:h-[31.25rem]"
            >
              <defs>
                {/* Gradient for orbit path */}
                <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                </linearGradient>

                {/* Glow filter for center */}
                <filter id="centerGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                {/* Pulse animation for connections */}
                <filter id="connectionGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Outer orbit ring */}
              <motion.circle
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke="url(#orbitGradient)"
                strokeWidth="1"
                strokeDasharray="8 4"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1, rotate: 360 } : {}}
                transition={{ 
                  opacity: { duration: 1 },
                  rotate: { duration: 120, repeat: Infinity, ease: "linear" }
                }}
                style={{ transformOrigin: `${centerX}px ${centerY}px` }}
              />

              {/* Inner orbit ring */}
              <motion.circle
                cx={centerX}
                cy={centerY}
                r={radius * 0.6}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
                strokeDasharray="4 8"
                opacity="0.2"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 0.2, rotate: -360 } : {}}
                transition={{ 
                  opacity: { duration: 1 },
                  rotate: { duration: 80, repeat: Infinity, ease: "linear" }
                }}
                style={{ transformOrigin: `${centerX}px ${centerY}px` }}
              />

              {/* Connection lines from nodes to center */}
              {signalNodes.map((node, idx) => {
                const pos = getNodePosition(node.angle);
                const isHovered = hoveredNode === node.id;
                
                return (
                  <g key={node.id}>
                    {/* Static connection line */}
                    <line
                      x1={centerX}
                      y1={centerY}
                      x2={pos.x}
                      y2={pos.y}
                      stroke={isHovered ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                      strokeWidth={isHovered ? 2 : 1}
                      opacity={isHovered ? 0.8 : 0.15}
                      className="transition-all duration-300"
                    />
                    
                    {/* Animated pulse traveling along the line */}
                    <motion.circle
                      r={isHovered ? 4 : 2}
                      fill={isHovered ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                      filter="url(#connectionGlow)"
                      initial={{ opacity: 0 }}
                      animate={isVisible ? {
                        cx: [pos.x, centerX],
                        cy: [pos.y, centerY],
                        opacity: [0.8, 0]
                      } : {}}
                      transition={{
                        duration: 2,
                        delay: idx * 0.3,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                        ease: "easeIn"
                      }}
                    />
                  </g>
                );
              })}

              {/* Central Decision Engine */}
              <g filter="url(#centerGlow)">
                <motion.circle
                  cx={centerX}
                  cy={centerY}
                  r={50}
                  fill="hsl(var(--background))"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
                />
                
                {/* Pulsing inner ring */}
                <motion.circle
                  cx={centerX}
                  cy={centerY}
                  r={35}
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { 
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ transformOrigin: `${centerX}px ${centerY}px` }}
                />
              </g>

              {/* Signal Nodes */}
              {signalNodes.map((node, idx) => {
                const pos = getNodePosition(node.angle);
                const isHovered = hoveredNode === node.id;
                const IconComponent = node.icon;
                
                return (
                  <motion.g
                    key={node.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: idx * 0.1 + 0.8, type: "spring" }}
                    onMouseEnter={() => {
                      setHoveredNode(node.id);
                      setActiveNode(node);
                    }}
                    onMouseLeave={() => {
                      setHoveredNode(null);
                    }}
                    className="cursor-pointer"
                  >
                    {/* Node background */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isHovered ? 32 : 28}
                      fill="hsl(var(--background))"
                      stroke={isHovered ? "hsl(var(--accent))" : "hsl(var(--border))"}
                      strokeWidth={isHovered ? 2 : 1}
                      className="transition-all duration-300"
                    />
                    
                    {/* Node icon - using foreignObject for React components */}
                    <foreignObject
                      x={pos.x - 12}
                      y={pos.y - 12}
                      width={24}
                      height={24}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <IconComponent 
                          className={`w-5 h-5 transition-colors duration-300 ${
                            isHovered ? "text-accent" : "text-primary/60"
                          }`} 
                        />
                      </div>
                    </foreignObject>

                    {/* Node label */}
                    <text
                      x={pos.x}
                      y={pos.y + 48}
                      textAnchor="middle"
                      className={`text-[10px] uppercase tracking-wider transition-all duration-300 ${
                        isHovered ? "fill-accent" : "fill-muted-foreground/50"
                      }`}
                    >
                      {node.label}
                    </text>
                  </motion.g>
                );
              })}

              {/* Center label */}
              <text
                x={centerX}
                y={centerY - 8}
                textAnchor="middle"
                className="fill-foreground text-[10px] font-medium uppercase tracking-wider"
              >
                Decision
              </text>
              <text
                x={centerX}
                y={centerY + 8}
                textAnchor="middle"
                className="fill-foreground text-[10px] font-medium uppercase tracking-wider"
              >
                Engine
              </text>
            </svg>

            {/* Ambient glow behind diagram */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Decision Flow Panel */}
          <div 
            className={`flex-1 max-w-md transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className={`p-8 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${
              activeNode 
                ? "border-accent/30 bg-accent/5" 
                : "border-border/20 bg-background/40"
            }`}>
              {activeNode ? (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Node title */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                      <activeNode.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground">
                      {activeNode.label}
                    </h3>
                  </div>

                  {/* Decision flow visualization */}
                  <div className="space-y-4">
                    {/* Input */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-primary">IN</span>
                      </div>
                      <div>
                        <p className="text-[0.625rem] uppercase tracking-wider text-muted-foreground/50 mb-1">
                          Input Signal
                        </p>
                        <p className="text-sm text-foreground/80">{activeNode.input}</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center gap-4 pl-3">
                      <div className="w-px h-6 bg-gradient-to-b from-primary/20 to-accent/20" />
                    </div>

                    {/* Decision */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-[0.625rem] uppercase tracking-wider text-muted-foreground/50 mb-1">
                          Decision Made
                        </p>
                        <p className="text-sm text-foreground/80">{activeNode.decision}</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center gap-4 pl-3">
                      <div className="w-px h-6 bg-gradient-to-b from-accent/20 to-emerald-500/20" />
                    </div>

                    {/* Outcome */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-emerald-500">OUT</span>
                      </div>
                      <div>
                        <p className="text-[0.625rem] uppercase tracking-wider text-muted-foreground/50 mb-1">
                          Business Outcome
                        </p>
                        <p className="text-sm text-foreground/80">{activeNode.outcome}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-primary/40" />
                  </div>
                  <p className="text-sm text-muted-foreground/50">
                    Hover over a signal node
                  </p>
                  <p className="text-xs text-muted-foreground/30 mt-1">
                    to explore the decision flow
                  </p>
                </div>
              )}
            </div>

            {/* Stats below panel */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { value: "24/7", label: "Active" },
                { value: "<50ms", label: "Latency" },
                { value: "∞", label: "Decisions" }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className="text-center"
                >
                  <p className="text-lg font-light text-accent">{stat.value}</p>
                  <p className="text-[0.625rem] uppercase tracking-wider text-muted-foreground/40">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessOverviewSection;
