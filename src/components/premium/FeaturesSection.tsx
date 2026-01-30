import { useState, useRef, useEffect, useCallback } from "react";
import { 
  Brain, TrendingUp, Eye, AlertTriangle, 
  RefreshCw, Route, ShieldAlert,
  Store, DollarSign, BadgeCheck,
  MessageSquare, Building2, Zap,
  ChevronRight, ArrowRight
} from "lucide-react";
import { AmbientGlow } from "./DepthSystem";
import { motion, AnimatePresence } from "framer-motion";

// Cluster and node definitions
const clusters = [
  {
    id: "intelligence",
    title: "Intelligence Layer",
    angle: 0, // Right
    color: "accent",
    description: "Predictive analytics and pattern recognition that turns raw data into actionable foresight.",
    nodes: [
      { 
        id: "forecast", 
        label: "Demand Forecasting", 
        icon: TrendingUp,
        detail: "ML models analyze 500+ signals to predict demand with 94% accuracy up to 12 weeks ahead.",
        before: "Manual spreadsheet forecasts updated weekly",
        after: "Real-time AI predictions adjusting every hour"
      },
      { 
        id: "pattern", 
        label: "Pattern Recognition", 
        icon: Eye,
        detail: "Identifies hidden correlations across suppliers, logistics, and market conditions.",
        before: "Reactive response to visible trends",
        after: "Proactive detection of emerging patterns"
      },
      { 
        id: "anomaly", 
        label: "Anomaly Detection", 
        icon: AlertTriangle,
        detail: "Flags unusual activity across the network before it becomes a problem.",
        before: "Issues discovered after impact",
        after: "Anomalies caught within milliseconds"
      },
    ],
  },
  {
    id: "execution",
    title: "Execution Layer",
    angle: 90, // Bottom
    color: "primary",
    description: "Autonomous operations that execute decisions without human bottlenecks.",
    nodes: [
      { 
        id: "replenishment", 
        label: "Auto Replenishment", 
        icon: RefreshCw,
        detail: "Automatically triggers orders based on real-time inventory and predicted demand.",
        before: "Manual reorder point monitoring",
        after: "Zero-touch inventory optimization"
      },
      { 
        id: "routing", 
        label: "Dynamic Routing", 
        icon: Route,
        detail: "Continuously optimizes shipment paths based on traffic, weather, and capacity.",
        before: "Static routes planned days ahead",
        after: "Routes adapt in real-time"
      },
      { 
        id: "exception", 
        label: "Exception Handling", 
        icon: ShieldAlert,
        detail: "Automatically resolves common issues and escalates edge cases intelligently.",
        before: "All exceptions require human review",
        after: "85% of exceptions auto-resolved"
      },
    ],
  },
  {
    id: "marketplace",
    title: "Marketplace Layer",
    angle: 180, // Left
    color: "secondary",
    description: "AI-powered supplier ecosystem that matches, prices, and validates autonomously.",
    nodes: [
      { 
        id: "matching", 
        label: "AI Supplier Matching", 
        icon: Store,
        detail: "Finds optimal suppliers based on capability, reliability, and cost efficiency.",
        before: "Manual RFQ processes taking weeks",
        after: "Instant supplier recommendations"
      },
      { 
        id: "pricing", 
        label: "Dynamic Pricing", 
        icon: DollarSign,
        detail: "Real-time price optimization based on market conditions and demand signals.",
        before: "Quarterly price negotiations",
        after: "Continuous price optimization"
      },
      { 
        id: "trust", 
        label: "Trust & Validation", 
        icon: BadgeCheck,
        detail: "Continuous supplier scoring and automated compliance verification.",
        before: "Annual supplier audits",
        after: "Real-time trust scoring"
      },
    ],
  },
  {
    id: "communication",
    title: "Communication Layer",
    angle: 270, // Top
    color: "accent",
    description: "Seamless AI-to-AI coordination that enables true multi-party automation.",
    nodes: [
      { 
        id: "negotiation", 
        label: "AI-to-AI Negotiation", 
        icon: MessageSquare,
        detail: "Autonomous agents negotiate terms, prices, and schedules across company boundaries.",
        before: "Humans negotiate every deal",
        after: "AI handles routine negotiations"
      },
      { 
        id: "sync", 
        label: "Cross-Company Sync", 
        icon: Building2,
        detail: "Real-time data sharing and state synchronization between trading partners.",
        before: "Batch EDI updates daily",
        after: "Sub-second data propagation"
      },
      { 
        id: "events", 
        label: "Event-Driven Messaging", 
        icon: Zap,
        detail: "Instant notifications and automated responses to supply chain events.",
        before: "Email-based communication",
        after: "Real-time event streams"
      },
    ],
  },
];

const FeaturesSection = () => {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [corePhase, setCorePhase] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  // Core pulse animation phase
  useEffect(() => {
    const interval = setInterval(() => {
      setCorePhase((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Header observer
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

  const handleClusterClick = useCallback((clusterId: string) => {
    setActiveCluster((prev) => (prev === clusterId ? null : clusterId));
    setActiveNode(null);
  }, []);

  const handleNodeHover = useCallback((nodeId: string | null, clusterId: string | null) => {
    setActiveNode(nodeId);
    if (nodeId && clusterId) {
      setActiveCluster(clusterId);
    }
  }, []);

  // Get active node data
  const getActiveNodeData = () => {
    if (!activeNode || !activeCluster) return null;
    const cluster = clusters.find((c) => c.id === activeCluster);
    return cluster?.nodes.find((n) => n.id === activeNode);
  };

  const activeNodeData = getActiveNodeData();
  const activeClusterData = clusters.find((c) => c.id === activeCluster);

  // Calculate cluster positions
  const getClusterPosition = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius,
    };
  };

  // Calculate node positions within cluster
  const getNodePosition = (clusterAngle: number, nodeIndex: number, clusterRadius: number, nodeRadius: number) => {
    const clusterPos = getClusterPosition(clusterAngle, clusterRadius);
    const nodeAngle = clusterAngle + (nodeIndex - 1) * 25; // Spread nodes around cluster center
    const rad = (nodeAngle * Math.PI) / 180;
    return {
      x: clusterPos.x + Math.cos(rad) * nodeRadius,
      y: clusterPos.y + Math.sin(rad) * nodeRadius,
    };
  };

  const clusterRadius = 200;
  const nodeRadius = 70;

  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Ambient glows */}
      <AmbientGlow color="secondary" size="xl" intensity="medium" position="center" />
      <AmbientGlow color="primary" size="md" intensity="subtle" position="right" className="top-1/4" />
      <AmbientGlow color="accent" size="sm" intensity="subtle" position="left" className="bottom-1/3" />

      <div className="relative z-10 container mx-auto px-8 lg:px-16 xl:px-24">
        {/* Section header */}
        <div ref={headerRef} className="max-w-2xl mb-16 md:mb-24">
          <p
            className={`text-[10px] tracking-[0.4em] uppercase text-primary/50 mb-8 transition-all duration-1000 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            System Architecture
          </p>
          <h2
            className={`text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[-0.02em] mb-8 leading-[1.08] transition-all duration-1000 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="text-foreground">An autonomous</span>
            <br />
            <span className="text-muted-foreground/30">intelligence network</span>
          </h2>
          <p
            className={`text-muted-foreground/60 text-base md:text-lg font-light max-w-xl transition-all duration-1000 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Each capability reinforces the others, creating a defensible system that grows smarter with every decision.
          </p>
        </div>

        {/* Main interactive area */}
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-start">
          {/* Graph visualization */}
          <div className="relative w-full xl:w-[60%] aspect-square max-w-[700px] mx-auto xl:mx-0">
            {/* SVG for connections */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="-350 -350 700 700"
              style={{ overflow: "visible" }}
            >
              {/* Background orbit ring */}
              <circle
                cx="0"
                cy="0"
                r={clusterRadius}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                strokeDasharray="6 12"
                opacity="0.2"
              />

              {/* Core to cluster connections */}
              {clusters.map((cluster, idx) => {
                const pos = getClusterPosition(cluster.angle, clusterRadius);
                const isActive = activeCluster === cluster.id;
                const isDimmed = activeCluster && activeCluster !== cluster.id;

                return (
                  <g key={`cluster-conn-${cluster.id}`}>
                    {/* Main connection line */}
                    <motion.line
                      x1="0"
                      y1="0"
                      x2={pos.x}
                      y2={pos.y}
                      stroke={isActive ? "hsl(var(--accent))" : "hsl(var(--border))"}
                      strokeWidth={isActive ? 2 : 1}
                      opacity={isDimmed ? 0.1 : isActive ? 0.8 : 0.3}
                      animate={{
                        opacity: isDimmed ? 0.1 : isActive ? 0.8 : 0.3,
                      }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Decision burst from core */}
                    {corePhase === idx && !activeCluster && (
                      <motion.circle
                        r="4"
                        fill="hsl(var(--accent))"
                        initial={{ cx: 0, cy: 0, opacity: 0 }}
                        animate={{
                          cx: [0, pos.x],
                          cy: [0, pos.y],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          ease: "easeOut",
                        }}
                      />
                    )}

                    {/* Active cluster data flow */}
                    {isActive && (
                      <>
                        {[0, 1, 2].map((i) => (
                          <motion.circle
                            key={`flow-${i}`}
                            r="3"
                            fill="hsl(var(--accent))"
                            initial={{ opacity: 0 }}
                            animate={{
                              cx: [0, pos.x * 0.5, pos.x],
                              cy: [0, pos.y * 0.5, pos.y],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </>
                    )}
                  </g>
                );
              })}

              {/* Inter-cluster connections (showing interdependence) */}
              {clusters.map((cluster, idx) => {
                const nextCluster = clusters[(idx + 1) % clusters.length];
                const pos1 = getClusterPosition(cluster.angle, clusterRadius);
                const pos2 = getClusterPosition(nextCluster.angle, clusterRadius);
                const midX = (pos1.x + pos2.x) / 2 * 0.6;
                const midY = (pos1.y + pos2.y) / 2 * 0.6;

                return (
                  <motion.path
                    key={`inter-${cluster.id}-${nextCluster.id}`}
                    d={`M ${pos1.x} ${pos1.y} Q ${midX} ${midY} ${pos2.x} ${pos2.y}`}
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    strokeDasharray="3 6"
                    opacity={activeCluster ? 0.05 : 0.15}
                    animate={{
                      opacity: activeCluster ? 0.05 : 0.15,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}

              {/* Node connections within clusters */}
              {clusters.map((cluster) => {
                const isActive = activeCluster === cluster.id;
                
                return cluster.nodes.map((node, nodeIdx) => {
                  const clusterPos = getClusterPosition(cluster.angle, clusterRadius);
                  const nodePos = getNodePosition(cluster.angle, nodeIdx, clusterRadius, nodeRadius);
                  const isNodeActive = activeNode === node.id;

                  return (
                    <g key={`node-conn-${node.id}`}>
                      <motion.line
                        x1={clusterPos.x}
                        y1={clusterPos.y}
                        x2={nodePos.x}
                        y2={nodePos.y}
                        stroke={isNodeActive ? "hsl(var(--accent))" : "hsl(var(--border))"}
                        strokeWidth={isNodeActive ? 1.5 : 0.5}
                        opacity={isActive ? (isNodeActive ? 1 : 0.4) : 0}
                        animate={{
                          opacity: isActive ? (isNodeActive ? 1 : 0.4) : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Node pulse */}
                      {isNodeActive && (
                        <motion.circle
                          r="2"
                          fill="hsl(var(--accent))"
                          initial={{ opacity: 0 }}
                          animate={{
                            cx: [clusterPos.x, nodePos.x],
                            cy: [clusterPos.y, nodePos.y],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </g>
                  );
                });
              })}
            </svg>

            {/* Central core */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
              animate={{
                scale: activeCluster ? 0.85 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`relative w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center transition-all duration-500 ${
                  activeCluster
                    ? "bg-background/50 border border-border/20"
                    : "bg-background/70 border border-accent/30"
                }`}
                style={{
                  boxShadow: activeCluster
                    ? "none"
                    : "0 0 80px hsl(var(--accent) / 0.15), inset 0 0 40px hsl(var(--accent) / 0.05)",
                }}
              >
                {/* Pulse rings */}
                {!activeCluster && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full border border-accent/20"
                      animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-accent/20"
                      animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                      transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  </>
                )}

                <div className="text-center px-2">
                  <Brain
                    className={`w-8 h-8 md:w-10 md:h-10 mx-auto mb-1 transition-colors duration-500 ${
                      activeCluster ? "text-muted-foreground/40" : "text-accent"
                    }`}
                  />
                  <p
                    className={`text-[8px] md:text-[10px] font-medium leading-tight transition-colors duration-500 ${
                      activeCluster ? "text-muted-foreground/40" : "text-foreground/70"
                    }`}
                  >
                    Synapsio
                    <br />
                    Intelligence Core
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Cluster nodes */}
            {clusters.map((cluster) => {
              const pos = getClusterPosition(cluster.angle, clusterRadius);
              const isActive = activeCluster === cluster.id;
              const isDimmed = activeCluster && activeCluster !== cluster.id;

              return (
                <motion.div
                  key={cluster.id}
                  className="absolute z-20"
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{
                    scale: isActive ? 1.05 : isDimmed ? 0.85 : 1,
                    opacity: isDimmed ? 0.3 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <button
                    onClick={() => handleClusterClick(cluster.id)}
                    className={`relative w-24 h-24 md:w-32 md:h-32 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 cursor-pointer backdrop-blur-sm ${
                      isActive
                        ? "bg-accent/10 border-2 border-accent"
                        : "bg-background/40 border border-border/40 hover:border-accent/40"
                    }`}
                    style={{
                      boxShadow: isActive
                        ? "0 0 50px hsl(var(--accent) / 0.2), inset 0 0 25px hsl(var(--accent) / 0.05)"
                        : "0 4px 30px hsl(var(--background) / 0.5)",
                    }}
                  >
                    <p
                      className={`text-[9px] md:text-[11px] font-medium text-center px-2 leading-tight transition-colors duration-300 ${
                        isActive ? "text-accent" : "text-foreground/60"
                      }`}
                    >
                      {cluster.title}
                    </p>
                  </button>
                </motion.div>
              );
            })}

            {/* Individual nodes (appear when cluster is active) */}
            <AnimatePresence>
              {activeCluster && (
                <>
                  {clusters
                    .find((c) => c.id === activeCluster)
                    ?.nodes.map((node, nodeIdx) => {
                      const cluster = clusters.find((c) => c.id === activeCluster)!;
                      const nodePos = getNodePosition(cluster.angle, nodeIdx, clusterRadius, nodeRadius);
                      const isNodeActive = activeNode === node.id;
                      const Icon = node.icon;

                      return (
                        <motion.div
                          key={node.id}
                          className="absolute z-10"
                          style={{
                            left: `calc(50% + ${nodePos.x}px)`,
                            top: `calc(50% + ${nodePos.y}px)`,
                          }}
                          initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
                          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                          exit={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
                          transition={{ duration: 0.3, delay: nodeIdx * 0.08 }}
                        >
                          <button
                            onMouseEnter={() => handleNodeHover(node.id, activeCluster)}
                            onMouseLeave={() => handleNodeHover(null, null)}
                            onClick={() => handleNodeHover(node.id, activeCluster)}
                            className={`w-20 h-20 md:w-24 md:h-24 rounded-xl flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                              isNodeActive
                                ? "bg-accent/15 border border-accent"
                                : "bg-background/50 border border-border/30 hover:border-accent/50"
                            }`}
                            style={{
                              boxShadow: isNodeActive
                                ? "0 0 30px hsl(var(--accent) / 0.15)"
                                : "none",
                            }}
                          >
                            <Icon
                              className={`w-5 h-5 md:w-6 md:h-6 mb-1 transition-colors duration-300 ${
                                isNodeActive ? "text-accent" : "text-foreground/50"
                              }`}
                            />
                            <p
                              className={`text-[8px] md:text-[9px] text-center px-1 leading-tight transition-colors duration-300 ${
                                isNodeActive ? "text-foreground" : "text-foreground/50"
                              }`}
                            >
                              {node.label}
                            </p>
                          </button>
                        </motion.div>
                      );
                    })}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Detail panel */}
          <div className="w-full xl:w-[40%] xl:sticky xl:top-24">
            <AnimatePresence mode="wait">
              {activeNodeData ? (
                <motion.div
                  key={activeNodeData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="bg-background/30 backdrop-blur-md border border-border/30 rounded-2xl p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <activeNodeData.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-light text-foreground">
                        {activeNodeData.label}
                      </h3>
                      <p className="text-[10px] text-accent/60 uppercase tracking-wider">
                        {activeClusterData?.title}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/70 mb-8 leading-relaxed">
                    {activeNodeData.detail}
                  </p>

                  {/* Before/After comparison */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-muted-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[9px] text-muted-foreground/60">Before</span>
                      </div>
                      <p className="text-xs text-muted-foreground/50 leading-relaxed">
                        {activeNodeData.before}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pl-8">
                      <ArrowRight className="w-4 h-4 text-accent/50" />
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[9px] text-accent">After</span>
                      </div>
                      <p className="text-xs text-accent/80 leading-relaxed font-medium">
                        {activeNodeData.after}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : activeClusterData ? (
                <motion.div
                  key={activeClusterData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="bg-background/30 backdrop-blur-md border border-border/30 rounded-2xl p-6 md:p-8"
                >
                  <h3 className="text-xl md:text-2xl font-light text-foreground mb-4">
                    {activeClusterData.title}
                  </h3>
                  <p className="text-sm text-foreground/60 mb-8 leading-relaxed">
                    {activeClusterData.description}
                  </p>

                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/50 mb-3">
                      Hover a node to explore
                    </p>
                    {activeClusterData.nodes.map((node) => (
                      <button
                        key={node.id}
                        onMouseEnter={() => handleNodeHover(node.id, activeClusterData.id)}
                        onClick={() => handleNodeHover(node.id, activeClusterData.id)}
                        className="flex items-center gap-3 w-full text-left group"
                      >
                        <node.icon className="w-4 h-4 text-muted-foreground/40 group-hover:text-accent transition-colors" />
                        <span className="text-sm text-muted-foreground/60 group-hover:text-foreground/80 transition-colors">
                          {node.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-accent/50 ml-auto transition-colors" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-background/20 border border-border/20 rounded-2xl p-6 md:p-8"
                >
                  <p className="text-muted-foreground/40 text-sm font-light mb-6">
                    Click a layer to explore how each capability contributes to the autonomous system.
                  </p>
                  <div className="space-y-4">
                    {clusters.map((cluster) => (
                      <button
                        key={cluster.id}
                        onClick={() => handleClusterClick(cluster.id)}
                        className="flex items-center gap-3 text-left w-full group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-border/10 group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/30 group-hover:bg-accent transition-colors" />
                        </div>
                        <span className="text-sm text-muted-foreground/50 group-hover:text-foreground/70 transition-colors">
                          {cluster.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Seamless transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[25vh] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    </section>
  );
};

export default FeaturesSection;
