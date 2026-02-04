import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Brain, Database, Cpu, Truck, RefreshCw, Zap, BarChart3, Network, Box, Globe, Building2, Bot, ShoppingCart, ArrowRightLeft } from "lucide-react";
import { FloatingSurface, GlassPanel, AmbientGlow } from "./DepthSystem";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

// System map nodes - percentage-based positioning
const systemNodes = [
  {
    id: "ai-core",
    label: "AI Core",
    icon: Brain,
    x: 50,
    y: 50,
    size: "lg" as const,
    description: "The autonomous decision engine at the heart of Synapsio. Orchestrates planning, execution, and continuous learning across the entire supply network.",
    details: [
      "Real-time multi-objective optimization",
      "Predictive disruption detection (14-day lookahead)",
      "Autonomous decision execution with human oversight",
      "Continuous learning from 10B+ transaction patterns",
    ],
    connections: ["marketplace", "enterprise-a", "enterprise-b", "agent-1", "agent-2"],
  },
  {
    id: "marketplace",
    label: "Marketplace",
    icon: ShoppingCart,
    x: 50,
    y: 12,
    size: "md" as const,
    description: "Unified commerce layer connecting demand signals from all sales channels in real-time.",
    details: [
      "Multi-channel inventory synchronization",
      "Dynamic pricing optimization",
      "Demand sensing from 200+ marketplaces",
      "Flash sale detection and auto-allocation",
    ],
    connections: ["ai-core", "enterprise-a", "enterprise-b"],
  },
  {
    id: "enterprise-a",
    label: "Enterprise A",
    icon: Building2,
    x: 18,
    y: 32,
    size: "md" as const,
    description: "Enterprise resource integration for manufacturing and procurement operations.",
    details: [
      "SAP/Oracle ERP connectors",
      "Bill of materials synchronization",
      "Supplier capacity monitoring",
      "Production schedule optimization",
    ],
    connections: ["ai-core", "marketplace", "data-1", "agent-1"],
  },
  {
    id: "enterprise-b",
    label: "Enterprise B",
    icon: Building2,
    x: 82,
    y: 32,
    size: "md" as const,
    description: "Distribution and logistics management across global warehouse networks.",
    details: [
      "WMS integration layer",
      "Cross-dock optimization",
      "Carrier capacity management",
      "Last-mile orchestration",
    ],
    connections: ["ai-core", "marketplace", "data-2", "agent-2"],
  },
  {
    id: "agent-1",
    label: "AI Agent 1",
    icon: Bot,
    x: 22,
    y: 72,
    size: "sm" as const,
    description: "Autonomous procurement agent handling supplier negotiations and order placement.",
    details: [
      "Automated RFQ generation",
      "Supplier risk scoring",
      "Contract compliance monitoring",
      "Dynamic reorder optimization",
    ],
    connections: ["ai-core", "enterprise-a", "data-1"],
  },
  {
    id: "agent-2",
    label: "AI Agent 2",
    icon: Bot,
    x: 78,
    y: 72,
    size: "sm" as const,
    description: "Fulfillment optimization agent managing order routing and carrier selection.",
    details: [
      "Intelligent order routing",
      "Carrier rate optimization",
      "Delivery promise management",
      "Exception handling automation",
    ],
    connections: ["ai-core", "enterprise-b", "data-2"],
  },
  {
    id: "data-1",
    label: "Data Pipeline 1",
    icon: Database,
    x: 8,
    y: 52,
    size: "sm" as const,
    description: "Real-time data ingestion from IoT sensors and upstream systems.",
    details: [
      "Event streaming (2.4M events/hour)",
      "IoT sensor integration",
      "Quality metrics aggregation",
      "Anomaly detection pipeline",
    ],
    connections: ["enterprise-a", "agent-1"],
  },
  {
    id: "data-2",
    label: "Data Pipeline 2",
    icon: Database,
    x: 92,
    y: 52,
    size: "sm" as const,
    description: "Downstream data flows for analytics and customer-facing systems.",
    details: [
      "Real-time analytics feeds",
      "Customer visibility APIs",
      "Reporting data warehouse",
      "ML training data curation",
    ],
    connections: ["enterprise-b", "agent-2"],
  },
];

// Orbit layer data for the visualization
const orbitLayers = [
  {
    id: "ingestion",
    name: "Data Ingestion",
    radius: 100,
    speed: 60,
    color: "primary",
    primaryAngleOffset: 0,
    nodes: [
      { id: "erp", name: "ERP Systems", icon: Database, relativeAngle: 0, isPrimary: true },
      { id: "iot", name: "IoT Sensors", icon: Cpu, relativeAngle: 120, isPrimary: false },
      { id: "api", name: "External APIs", icon: Globe, relativeAngle: 240, isPrimary: false },
    ],
    description: "Real-time data streams from across your entire supply network feed into a unified intelligence layer.",
    example: "Warehouse sensors detect inventory shifts and trigger immediate rebalancing across 50+ locations.",
    metric: { value: "2.4M", label: "Events/hour" },
  },
  {
    id: "planning",
    name: "Planning & Optimization",
    radius: 160,
    speed: 80,
    color: "secondary",
    primaryAngleOffset: 90,
    nodes: [
      { id: "demand", name: "Demand Forecasting", icon: BarChart3, relativeAngle: 0, isPrimary: true },
      { id: "inventory", name: "Inventory AI", icon: Box, relativeAngle: 120, isPrimary: false },
      { id: "routing", name: "Route Optimization", icon: Network, relativeAngle: 240, isPrimary: false },
    ],
    description: "Advanced ML models continuously optimize allocation, routing, and procurement decisions.",
    example: "Predictive algorithms reroute 200 shipments ahead of a port delay, saving $1.2M in expedited costs.",
    metric: { value: "94%", label: "Forecast accuracy" },
  },
  {
    id: "execution",
    name: "Execution & Marketplace",
    radius: 220,
    speed: 100,
    color: "accent",
    primaryAngleOffset: 180,
    nodes: [
      { id: "fulfillment", name: "Fulfillment", icon: Truck, relativeAngle: 0, isPrimary: true },
      { id: "marketplace", name: "Marketplace Sync", icon: Globe, relativeAngle: 120, isPrimary: false },
      { id: "delivery", name: "Last Mile", icon: Zap, relativeAngle: 240, isPrimary: false },
    ],
    description: "Seamless execution layer connects warehouses, carriers, and marketplaces in real-time.",
    example: "Flash sale detected → inventory auto-allocated → carrier capacity secured within 3 minutes.",
    metric: { value: "99.7%", label: "On-time delivery" },
  },
  {
    id: "learning",
    name: "Learning & Feedback",
    radius: 280,
    speed: 120,
    color: "muted",
    primaryAngleOffset: 270,
    nodes: [
      { id: "analytics", name: "Analytics Engine", icon: BarChart3, relativeAngle: 0, isPrimary: true },
      { id: "feedback", name: "Feedback Loop", icon: RefreshCw, relativeAngle: 120, isPrimary: false },
      { id: "adaptation", name: "Self-Adaptation", icon: Brain, relativeAngle: 240, isPrimary: false },
    ],
    description: "Continuous learning from outcomes refines predictions and decisions autonomously.",
    example: "System identified a carrier underperformance pattern and automatically redistributed 15% of volume.",
    metric: { value: "3.2×", label: "Faster adaptation" },
  },
];

// Get unique connections from system nodes
const getUniqueConnections = () => {
  const connections: { from: string; to: string }[] = [];
  const seen = new Set<string>();
  
  systemNodes.forEach(node => {
    node.connections.forEach(targetId => {
      const key = [node.id, targetId].sort().join("-");
      if (!seen.has(key)) {
        seen.add(key);
        connections.push({ from: node.id, to: targetId });
      }
    });
  });
  
  return connections;
};

const systemConnections = getUniqueConnections();

// Particle component for data flow
const DataParticle = ({ 
  fromRadius, 
  toRadius, 
  angle, 
  delay,
  toCenter = false 
}: { 
  fromRadius: number; 
  toRadius: number; 
  angle: number; 
  delay: number;
  toCenter?: boolean;
}) => {
  const startX = Math.cos((angle * Math.PI) / 180) * fromRadius;
  const startY = Math.sin((angle * Math.PI) / 180) * fromRadius;
  const endX = toCenter ? 0 : Math.cos((angle * Math.PI) / 180) * toRadius;
  const endY = toCenter ? 0 : Math.sin((angle * Math.PI) / 180) * toRadius;

  return (
    <motion.circle
      r={2}
      fill="hsl(var(--primary))"
      initial={{ cx: startX, cy: startY, opacity: 0 }}
      animate={{
        cx: [startX, endX],
        cy: [startY, endY],
        opacity: [0, 0.8, 0.8, 0],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 2,
        ease: "easeInOut",
      }}
    />
  );
};

// Core pulse effect
const CorePulse = ({ delay }: { delay: number }) => (
  <motion.circle
    cx={0}
    cy={0}
    r={30}
    fill="none"
    stroke="hsl(var(--primary))"
    strokeWidth={1}
    initial={{ r: 30, opacity: 0.6 }}
    animate={{ r: 100, opacity: 0 }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      repeatDelay: 4,
      ease: "easeOut",
    }}
  />
);

// Connection line with animated particle
const ConnectionLine = ({ 
  from, 
  to, 
  isHighlighted, 
  particleActive,
  containerWidth,
  containerHeight 
}: { 
  from: { x: number; y: number }; 
  to: { x: number; y: number }; 
  isHighlighted: boolean;
  particleActive: boolean;
  containerWidth: number;
  containerHeight: number;
}) => {
  const x1 = (from.x / 100) * containerWidth;
  const y1 = (from.y / 100) * containerHeight;
  const x2 = (to.x / 100) * containerWidth;
  const y2 = (to.y / 100) * containerHeight;
  
  const pathId = `path-${from.x}-${from.y}-${to.x}-${to.y}`;
  
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={isHighlighted ? "hsl(var(--accent))" : "hsl(var(--primary) / 0.2)"}
        strokeWidth={isHighlighted ? 2 : 1}
        strokeOpacity={isHighlighted ? 0.8 : 0.3}
        style={{ transition: "all 0.3s ease" }}
      />
      {/* Path for particle animation */}
      <path
        id={pathId}
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        fill="none"
        stroke="none"
      />
      {/* Animated particle */}
      {particleActive && (
        <motion.circle
          r={4}
          fill="hsl(var(--accent))"
          style={{ filter: "drop-shadow(0 0 6px hsl(var(--accent)))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <animateMotion
            dur="1.5s"
            repeatCount="1"
            path={`M ${x1} ${y1} L ${x2} ${y2}`}
          />
        </motion.circle>
      )}
    </g>
  );
};

const SolutionSection = () => {
  const [selectedOrbit, setSelectedOrbit] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredSystemNode, setHoveredSystemNode] = useState<string | null>(null);
  const [selectedSystemNode, setSelectedSystemNode] = useState<typeof systemNodes[0] | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeParticles, setActiveParticles] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const [rotationAngles, setRotationAngles] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const animationRef = useRef<number>();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Container dimensions for system map
  const containerWidth = 800;
  const containerHeight = 600;

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  // Particle animation interval
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * systemConnections.length);
      const connection = systemConnections[randomIndex];
      const key = `${connection.from}-${connection.to}`;
      
      setActiveParticles(prev => new Set([...prev, key]));
      
      setTimeout(() => {
        setActiveParticles(prev => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }, 1500);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Track rotation angles for dynamic connections
  useEffect(() => {
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      setRotationAngles(prev => 
        prev.map((angle, i) => {
          const speed = orbitLayers[i].speed;
          return (angle + (360 / speed) * deltaTime) % 360;
        })
      );
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Get current detail data
  const currentDetail = useMemo(() => {
    if (selectedOrbit) {
      return orbitLayers.find(o => o.id === selectedOrbit);
    }
    return null;
  }, [selectedOrbit]);

  // Generate particles
  const particles = useMemo(() => {
    const items: JSX.Element[] = [];
    orbitLayers.forEach((orbit, orbitIndex) => {
      orbit.nodes.forEach((node, nodeIndex) => {
        const nodeAngle = orbit.primaryAngleOffset + node.relativeAngle;
        items.push(
          <DataParticle
            key={`${orbit.id}-${node.id}-in`}
            fromRadius={orbit.radius}
            toRadius={0}
            angle={nodeAngle}
            delay={orbitIndex * 0.5 + nodeIndex * 0.3}
            toCenter
          />
        );
      });
    });
    return items;
  }, []);

  const handleSystemNodeClick = useCallback((node: typeof systemNodes[0]) => {
    setSelectedSystemNode(node);
    setSheetOpen(true);
  }, []);

  const getNodeSize = (size: "lg" | "md" | "sm") => {
    switch (size) {
      case "lg": return { radius: 40, iconSize: 24 };
      case "md": return { radius: 28, iconSize: 18 };
      case "sm": return { radius: 20, iconSize: 14 };
    }
  };

  const getConnectedNodes = (nodeId: string) => {
    const node = systemNodes.find(n => n.id === nodeId);
    if (!node) return [];
    return node.connections.map(id => systemNodes.find(n => n.id === id)).filter(Boolean);
  };

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Layered ambient depth */}
      <AmbientGlow color="primary" size="xl" intensity="medium" position="center" />
      <AmbientGlow color="secondary" size="md" intensity="subtle" position="left" className="top-1/3" />
      
      <div className="relative z-10 container mx-auto px-6 lg:px-20 xl:px-28">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.p 
            className="text-[10px] tracking-[0.4em] uppercase text-primary/50 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            The Platform
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[-0.02em] mb-8 leading-[1.08]"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-foreground">Autonomous Supply Chain</span>
            <br />
            <span className="text-foreground">Intelligence</span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground/50 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A living system where AI agents orchestrate planning, execution, and commerce 
            across the global supply network.
          </motion.p>
        </div>

        {/* System Map Container */}
        <motion.div
          className="relative mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <GlassPanel intensity="medium" bordered className="rounded-2xl overflow-hidden">
            {/* Grid overlay */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />
            
            {/* Instruction text */}
            <div className="absolute top-4 right-6 z-10">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/40">
                Click any node to explore
              </p>
            </div>

            {/* SVG System Map */}
            <svg
              viewBox={`0 0 ${containerWidth} ${containerHeight}`}
              className="w-full h-[600px]"
              style={{ overflow: "visible" }}
            >
              {/* Glow filter */}
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Connection lines */}
              {systemConnections.map((conn, i) => {
                const fromNode = systemNodes.find(n => n.id === conn.from);
                const toNode = systemNodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;
                
                const isHighlighted = hoveredSystemNode === conn.from || hoveredSystemNode === conn.to;
                const particleKey = `${conn.from}-${conn.to}`;
                
                return (
                  <ConnectionLine
                    key={`conn-${i}`}
                    from={{ x: fromNode.x, y: fromNode.y }}
                    to={{ x: toNode.x, y: toNode.y }}
                    isHighlighted={isHighlighted}
                    particleActive={activeParticles.has(particleKey)}
                    containerWidth={containerWidth}
                    containerHeight={containerHeight}
                  />
                );
              })}

              {/* System nodes */}
              {systemNodes.map((node) => {
                const { radius, iconSize } = getNodeSize(node.size);
                const x = (node.x / 100) * containerWidth;
                const y = (node.y / 100) * containerHeight;
                const isHovered = hoveredSystemNode === node.id;
                const isCore = node.id === "ai-core";
                const Icon = node.icon;

                return (
                  <g
                    key={node.id}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoveredSystemNode(node.id)}
                    onMouseLeave={() => setHoveredSystemNode(null)}
                    onClick={() => handleSystemNodeClick(node)}
                  >
                    {/* Core pulse rings */}
                    {isCore && (
                      <>
                        <motion.circle
                          cx={x}
                          cy={y}
                          r={radius + 10}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth={1}
                          initial={{ r: radius + 10, opacity: 0.4 }}
                          animate={{ r: radius + 60, opacity: 0 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.circle
                          cx={x}
                          cy={y}
                          r={radius + 10}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth={1}
                          initial={{ r: radius + 10, opacity: 0.4 }}
                          animate={{ r: radius + 60, opacity: 0 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
                        />
                      </>
                    )}

                    {/* Hover glow */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={radius + 15}
                      fill={isCore ? "url(#coreGlow)" : "hsl(var(--accent) / 0.15)"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : (isCore ? 0.5 : 0) }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Node background */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={radius}
                      fill="hsl(var(--card))"
                      stroke={isCore ? "hsl(var(--primary))" : isHovered ? "hsl(var(--accent))" : "hsl(var(--border) / 0.5)"}
                      strokeWidth={isCore ? 2 : 1}
                      animate={{ 
                        scale: isHovered ? 1.1 : 1,
                      }}
                      style={{
                        transformOrigin: `${x}px ${y}px`,
                        filter: isHovered ? "drop-shadow(0 0 20px hsl(var(--accent) / 0.5))" : isCore ? "drop-shadow(0 0 15px hsl(var(--primary) / 0.4))" : "none",
                        transition: "filter 0.3s ease"
                      }}
                    />

                    {/* Icon */}
                    <foreignObject
                      x={x - iconSize / 2}
                      y={y - iconSize / 2}
                      width={iconSize}
                      height={iconSize}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon 
                          className={`transition-colors duration-300 ${
                            isCore ? 'text-primary' : isHovered ? 'text-accent' : 'text-muted-foreground/70'
                          }`}
                          style={{ width: iconSize, height: iconSize }}
                        />
                      </div>
                    </foreignObject>

                    {/* Label tooltip on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.g
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <rect
                            x={x - 50}
                            y={y + radius + 10}
                            width={100}
                            height={24}
                            rx={4}
                            fill="hsl(var(--popover))"
                            stroke="hsl(var(--border) / 0.5)"
                            strokeWidth={1}
                          />
                          <text
                            x={x}
                            y={y + radius + 26}
                            textAnchor="middle"
                            fill="hsl(var(--popover-foreground))"
                            fontSize={11}
                            fontWeight={500}
                          >
                            {node.label}
                          </text>
                        </motion.g>
                      )}
                    </AnimatePresence>
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-6 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] text-muted-foreground/50">Active Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-primary/30" />
                <span className="text-[10px] text-muted-foreground/50">Data Flow</span>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Orbital System with Detail Panel */}
        <div className="grid lg:grid-cols-[1fr,400px] gap-12 lg:gap-16 items-start">
          {/* Orbital System */}
          <motion.div
            className="relative flex items-center justify-center min-h-[500px] md:min-h-[600px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <svg
              viewBox="-320 -320 640 640"
              className="w-full max-w-[640px] h-auto"
              style={{ overflow: "visible" }}
            >
              {/* Orbit path rings */}
              {orbitLayers.map((orbit, index) => (
                <g key={`orbit-ring-${orbit.id}`}>
                  <motion.circle
                    cx={0}
                    cy={0}
                    r={orbit.radius}
                    fill="none"
                    stroke={`hsl(var(--border))`}
                    strokeWidth={1}
                    strokeDasharray="2 6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { 
                      opacity: selectedOrbit && selectedOrbit !== orbit.id ? 0.08 : 0.25,
                      scale: 1 
                    } : {}}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                    style={{
                      filter: selectedOrbit === orbit.id ? "drop-shadow(0 0 8px hsl(var(--primary) / 0.3))" : "none"
                    }}
                  />
                  
                  <motion.circle
                    cx={0}
                    cy={0}
                    r={orbit.radius}
                    fill="none"
                    stroke={`hsl(var(--primary) / 0.4)`}
                    strokeWidth={2}
                    strokeDasharray={`${orbit.radius * 0.5} ${orbit.radius * 6}`}
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 0.6 } : {}}
                    style={{
                      transform: `rotate(${orbit.primaryAngleOffset + rotationAngles[index] - 15}deg)`,
                      transformOrigin: 'center',
                    }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  />
                </g>
              ))}

              {/* Dynamic curved bezier connections */}
              <g className="pointer-events-none">
                {orbitLayers.map((orbit, i) => {
                  const currentAngle = orbit.primaryAngleOffset + rotationAngles[i];
                  const x1 = Math.cos((currentAngle * Math.PI) / 180) * orbit.radius;
                  const y1 = Math.sin((currentAngle * Math.PI) / 180) * orbit.radius;
                  
                  const nextIndex = (i + 1) % orbitLayers.length;
                  const nextOrbit = orbitLayers[nextIndex];
                  const nextAngle = nextOrbit.primaryAngleOffset + rotationAngles[nextIndex];
                  const x2 = Math.cos((nextAngle * Math.PI) / 180) * nextOrbit.radius;
                  const y2 = Math.sin((nextAngle * Math.PI) / 180) * nextOrbit.radius;
                  
                  const midX = (x1 + x2) / 2;
                  const midY = (y1 + y2) / 2;
                  const controlX = midX * 0.3;
                  const controlY = midY * 0.3;
                  
                  const curvePath = `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;
                  
                  const coreControlX = x1 * 0.4;
                  const coreControlY = y1 * 0.4;
                  const corePath = `M ${x1} ${y1} Q ${coreControlX * 0.5} ${coreControlY * 0.5} 0 0`;
                  
                  return (
                    <g key={`primary-conn-${i}`}>
                      <path
                        d={curvePath}
                        fill="none"
                        stroke="hsl(var(--primary) / 0.35)"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                      />
                      
                      <path
                        d={corePath}
                        fill="none"
                        stroke="hsl(var(--primary) / 0.15)"
                        strokeWidth={1}
                        strokeLinecap="round"
                      />
                      
                      <motion.circle
                        r={2.5}
                        fill="hsl(var(--primary))"
                        initial={{ opacity: 0 }}
                        animate={{
                          cx: [x1, controlX, x2],
                          cy: [y1, controlY, y2],
                          opacity: [0, 0.9, 0.9, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          delay: i * 0.6,
                          repeat: Infinity,
                          repeatDelay: 1.2,
                          ease: "easeInOut",
                        }}
                      />
                      
                      <motion.circle
                        r={2}
                        fill="hsl(var(--primary) / 0.7)"
                        initial={{ opacity: 0 }}
                        animate={{
                          cx: [x1, coreControlX * 0.5, 0],
                          cy: [y1, coreControlY * 0.5, 0],
                          opacity: [0, 0.7, 0.7, 0],
                        }}
                        transition={{
                          duration: 1.8,
                          delay: i * 0.4 + 0.3,
                          repeat: Infinity,
                          repeatDelay: 1.8,
                          ease: "easeInOut",
                        }}
                      />
                    </g>
                  );
                })}
              </g>

              {/* Data flow particles */}
              <g className="pointer-events-none">
                {particles}
              </g>

              {/* Core pulses */}
              <CorePulse delay={0} />
              <CorePulse delay={2} />
              <CorePulse delay={4} />

              {/* Orbit nodes */}
              {orbitLayers.map((orbit, orbitIndex) => {
                const orbitRotation = rotationAngles[orbitIndex];
                
                return (
                  <g key={orbit.id}>
                    {orbit.nodes.map((node) => {
                      const nodeAngle = orbit.primaryAngleOffset + node.relativeAngle + orbitRotation;
                      const x = Math.cos((nodeAngle * Math.PI) / 180) * orbit.radius;
                      const y = Math.sin((nodeAngle * Math.PI) / 180) * orbit.radius;
                      const isSelected = selectedNode === node.id;
                      const isOrbitSelected = selectedOrbit === orbit.id;
                      const isDimmed = selectedOrbit && !isOrbitSelected;
                      const Icon = node.icon;
                      
                      const isPrimary = node.isPrimary;
                      const baseRadius = isPrimary ? 32 : 16;
                      const glowRadius = isPrimary ? 42 : 20;
                      const iconSize = isPrimary ? 18 : 10;

                      return (
                        <g
                          key={node.id}
                          style={{ 
                            cursor: "pointer",
                            opacity: !isVisible ? 0 : isDimmed ? 0.3 : (isPrimary ? 1 : 0.5),
                            transition: "opacity 0.3s ease"
                          }}
                          onMouseEnter={() => {
                            setSelectedOrbit(orbit.id);
                            setSelectedNode(node.id);
                          }}
                          onMouseLeave={() => {
                            setSelectedOrbit(null);
                            setSelectedNode(null);
                          }}
                        >
                          <circle
                            cx={x}
                            cy={y}
                            r={isSelected ? glowRadius + 8 : glowRadius}
                            fill={`hsl(var(--primary) / ${isSelected ? 0.25 : (isPrimary ? 0.12 : 0.02)})`}
                            style={{ transition: "r 0.3s ease, fill 0.3s ease" }}
                          />
                          
                          <circle
                            cx={x}
                            cy={y}
                            r={isSelected ? baseRadius * 1.1 : baseRadius}
                            fill={isPrimary ? "hsl(var(--card) / 0.9)" : "hsl(var(--card) / 0.3)"}
                            stroke={isSelected 
                              ? "hsl(var(--primary))" 
                              : isPrimary 
                                ? "hsl(var(--primary) / 0.6)" 
                                : "hsl(var(--border) / 0.2)"
                            }
                            strokeWidth={isPrimary ? 2 : 1}
                            style={{
                              filter: isSelected 
                                ? "drop-shadow(0 0 25px hsl(var(--primary) / 0.6))" 
                                : isPrimary 
                                  ? "drop-shadow(0 0 15px hsl(var(--primary) / 0.3))"
                                  : "none",
                              transition: "r 0.3s ease, stroke 0.3s ease, filter 0.3s ease"
                            }}
                          />
                          
                          <foreignObject
                            x={x - iconSize / 2}
                            y={y - iconSize / 2}
                            width={iconSize}
                            height={iconSize}
                          >
                            <div className="w-full h-full flex items-center justify-center">
                              <Icon 
                                className={`transition-colors duration-300 ${
                                  isSelected 
                                    ? 'text-primary' 
                                    : isPrimary 
                                      ? 'text-primary/80' 
                                      : 'text-muted-foreground/30'
                                }`}
                                style={{ width: iconSize, height: iconSize }}
                              />
                            </div>
                          </foreignObject>
                        </g>
                      );
                    })}
                  </g>
                );
              })}

              {/* Center core */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <circle
                  cx={0}
                  cy={0}
                  r={45}
                  fill="url(#orbitCoreGradient)"
                  style={{
                    filter: "drop-shadow(0 0 30px hsl(var(--primary) / 0.4))",
                  }}
                />
                
                <circle
                  cx={0}
                  cy={0}
                  r={40}
                  fill="hsl(var(--card) / 0.8)"
                  stroke="hsl(var(--primary) / 0.5)"
                  strokeWidth={2}
                  style={{
                    filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))",
                  }}
                />
                
                <circle
                  cx={0}
                  cy={0}
                  r={20}
                  fill="hsl(var(--primary) / 0.3)"
                />
                
                <foreignObject x={-14} y={-14} width={28} height={28}>
                  <div className="w-full h-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                </foreignObject>
              </motion.g>

              {/* Gradient definitions */}
              <defs>
                <radialGradient id="orbitCoreGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--primary) / 0.3)" />
                  <stop offset="100%" stopColor="hsl(var(--primary) / 0.05)" />
                </radialGradient>
              </defs>
            </svg>

            {/* Center label */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="mt-[120px] md:mt-[140px] text-center">
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary/60">
                  Intelligence Core
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Detail Panel */}
          <motion.div
            className="lg:sticky lg:top-32"
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <GlassPanel intensity="medium" bordered className="rounded-2xl p-8">
              <AnimatePresence mode="wait">
                {currentDetail ? (
                  <motion.div
                    key={currentDetail.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] tracking-[0.3em] uppercase text-primary/60">
                        Layer Active
                      </span>
                    </div>

                    <h3 className="text-2xl font-light text-foreground">
                      {currentDetail.name}
                    </h3>

                    <p className="text-muted-foreground/60 font-light leading-relaxed">
                      {currentDetail.description}
                    </p>

                    <div className="pt-4 border-t border-border/10">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-3">
                        Example
                      </p>
                      <p className="text-sm text-muted-foreground/70 italic leading-relaxed">
                        "{currentDetail.example}"
                      </p>
                    </div>

                    <div className="pt-4">
                      <motion.div
                        className="flex items-baseline gap-3"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-4xl font-light text-primary">
                          {currentDetail.metric.value}
                        </span>
                        <span className="text-sm text-muted-foreground/50">
                          {currentDetail.metric.label}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                      <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/40">
                        Explore System
                      </span>
                    </div>

                    <h3 className="text-2xl font-light text-foreground/60">
                      Hover to explore
                    </h3>

                    <p className="text-muted-foreground/40 font-light leading-relaxed">
                      Interact with the orbital nodes to discover how each layer 
                      of the intelligence engine contributes to autonomous 
                      supply chain optimization.
                    </p>

                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/10">
                      {[
                        { value: "40%", label: "Cost reduction" },
                        { value: "3.2×", label: "Faster response" },
                        { value: "99.7%", label: "Accuracy" },
                      ].map((metric) => (
                        <div key={metric.label} className="text-center">
                          <p className="text-xl font-light text-foreground/80">
                            {metric.value}
                          </p>
                          <p className="text-[9px] text-muted-foreground/40 mt-1">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassPanel>

            {/* Orbit legend */}
            <motion.div
              className="mt-6 grid grid-cols-2 gap-3"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {orbitLayers.map((orbit) => (
                <button
                  key={orbit.id}
                  className={`
                    text-left p-3 rounded-lg border transition-all duration-300
                    ${selectedOrbit === orbit.id 
                      ? 'bg-primary/10 border-primary/30' 
                      : 'bg-card/20 border-border/10 hover:bg-card/30'
                    }
                  `}
                  onMouseEnter={() => setSelectedOrbit(orbit.id)}
                  onMouseLeave={() => setSelectedOrbit(null)}
                >
                  <p className={`text-xs font-medium transition-colors ${
                    selectedOrbit === orbit.id ? 'text-primary' : 'text-foreground/60'
                  }`}>
                    {orbit.name}
                  </p>
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Detail Sheet/Drawer for System Map nodes */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] bg-background/95 backdrop-blur-xl border-l border-border/30">
          {selectedSystemNode && (
            <div className="h-full flex flex-col">
              <SheetHeader className="pb-6 border-b border-border/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <selectedSystemNode.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <SheetTitle className="text-xl font-light">{selectedSystemNode.label}</SheetTitle>
                    <SheetDescription className="text-muted-foreground/50 text-sm mt-1">
                      System Component
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto py-6 space-y-8">
                {/* Description */}
                <div>
                  <p className="text-muted-foreground/70 leading-relaxed">
                    {selectedSystemNode.description}
                  </p>
                </div>

                {/* Capabilities */}
                <div>
                  <h4 className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/40 mb-4">
                    Capabilities
                  </h4>
                  <ul className="space-y-3">
                    {selectedSystemNode.details.map((detail, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground/60">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Connected To */}
                <div>
                  <h4 className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/40 mb-4">
                    Connected To
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {getConnectedNodes(selectedSystemNode.id).map((node) => node && (
                      <Badge 
                        key={node.id}
                        variant="secondary" 
                        className="bg-card/50 border-border/20 text-muted-foreground/70"
                      >
                        {node.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
    </section>
  );
};

export default SolutionSection;
