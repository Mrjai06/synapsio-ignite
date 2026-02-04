import { useRef, useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Brain, Database, Cpu, Truck, RefreshCw, Zap, BarChart3, Network, Box, Globe } from "lucide-react";
import { FloatingSurface, GlassPanel, AmbientGlow } from "./DepthSystem";

// Orbit layer data
// Orbit layer data - primary nodes positioned to never overlap (different quadrants)
const orbitLayers = [
  {
    id: "ingestion",
    name: "Data Ingestion",
    radius: 100,
    speed: 60, // seconds per rotation
    color: "primary",
    primaryAngleOffset: 0, // Primary at 0° (right)
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
    primaryAngleOffset: 90, // Primary at 90° (bottom)
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
    primaryAngleOffset: 180, // Primary at 180° (left)
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
    primaryAngleOffset: 270, // Primary at 270° (top)
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

const SolutionSection = () => {
  const [selectedOrbit, setSelectedOrbit] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [rotationAngles, setRotationAngles] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const animationRef = useRef<number>();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

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

  // Generate particles - use primary angle offset + relative angle
  const particles = useMemo(() => {
    const items: JSX.Element[] = [];
    orbitLayers.forEach((orbit, orbitIndex) => {
      orbit.nodes.forEach((node, nodeIndex) => {
        const nodeAngle = orbit.primaryAngleOffset + node.relativeAngle;
        // Particles flowing to center
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

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Layered ambient depth */}
      <AmbientGlow color="primary" size="xl" intensity="medium" position="center" />
      <AmbientGlow color="secondary" size="md" intensity="subtle" position="left" className="top-1/3" />
      
      <div className="relative z-10 container mx-auto px-6 lg:px-20 xl:px-28">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <motion.p 
            className="text-[10px] tracking-[0.4em] uppercase text-primary/50 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            The Solution
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[-0.02em] mb-8 leading-[1.08]"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-foreground">A unified</span>
            <br />
            <span className="text-foreground">intelligence layer</span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground/50 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Synapsio connects every node of your supply chain into a living, 
            self-optimizing system. Explore the intelligence engine.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1fr,400px] gap-12 lg:gap-16 items-start">
          {/* Orbital System */}
          <motion.div
            className="relative flex items-center justify-center min-h-[500px] md:min-h-[600px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <svg
              viewBox="-320 -320 640 640"
              className="w-full max-w-[640px] h-auto"
              style={{ overflow: "visible" }}
            >
              {/* Orbit path rings - visible circular paths for nodes */}
              {orbitLayers.map((orbit, index) => (
                <g key={`orbit-ring-${orbit.id}`}>
                  {/* Main orbit path */}
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
                  
                  {/* Accent arc segment following primary node */}
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

              {/* Dynamic curved bezier connections between primary nodes */}
              <g className="pointer-events-none">
                {orbitLayers.map((orbit, i) => {
                  // Get the primary node's current position
                  const currentAngle = orbit.primaryAngleOffset + rotationAngles[i];
                  const x1 = Math.cos((currentAngle * Math.PI) / 180) * orbit.radius;
                  const y1 = Math.sin((currentAngle * Math.PI) / 180) * orbit.radius;
                  
                  // Connect to next layer's primary node
                  const nextIndex = (i + 1) % orbitLayers.length;
                  const nextOrbit = orbitLayers[nextIndex];
                  const nextAngle = nextOrbit.primaryAngleOffset + rotationAngles[nextIndex];
                  const x2 = Math.cos((nextAngle * Math.PI) / 180) * nextOrbit.radius;
                  const y2 = Math.sin((nextAngle * Math.PI) / 180) * nextOrbit.radius;
                  
                  // Calculate bezier control point - curve toward center for organic feel
                  const midX = (x1 + x2) / 2;
                  const midY = (y1 + y2) / 2;
                  // Pull control point toward center
                  const controlX = midX * 0.3;
                  const controlY = midY * 0.3;
                  
                  // Create curved path
                  const curvePath = `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;
                  
                  // Curved path to core
                  const coreControlX = x1 * 0.4;
                  const coreControlY = y1 * 0.4;
                  const corePath = `M ${x1} ${y1} Q ${coreControlX * 0.5} ${coreControlY * 0.5} 0 0`;
                  
                  return (
                    <g key={`primary-conn-${i}`}>
                      {/* Curved connection between adjacent primary nodes */}
                      <path
                        d={curvePath}
                        fill="none"
                        stroke="hsl(var(--primary) / 0.35)"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                      />
                      
                      {/* Curved connection to core */}
                      <path
                        d={corePath}
                        fill="none"
                        stroke="hsl(var(--primary) / 0.15)"
                        strokeWidth={1}
                        strokeLinecap="round"
                      />
                      
                      {/* Animated pulse along curved connection - approximated with keyframes */}
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
                      
                      {/* Animated pulse to core along curve */}
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

              {/* Orbit nodes - using state-based rotation for sync with lines */}
              {orbitLayers.map((orbit, orbitIndex) => {
                const orbitRotation = rotationAngles[orbitIndex];
                
                return (
                  <g key={orbit.id}>
                    {orbit.nodes.map((node, nodeIndex) => {
                      // Calculate position using state-based rotation
                      const nodeAngle = orbit.primaryAngleOffset + node.relativeAngle + orbitRotation;
                      const x = Math.cos((nodeAngle * Math.PI) / 180) * orbit.radius;
                      const y = Math.sin((nodeAngle * Math.PI) / 180) * orbit.radius;
                      const isSelected = selectedNode === node.id;
                      const isOrbitSelected = selectedOrbit === orbit.id;
                      const isDimmed = selectedOrbit && !isOrbitSelected;
                      const Icon = node.icon;
                      
                      // Primary nodes are larger and more prominent
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
                          {/* Node glow - larger for primary */}
                          <circle
                            cx={x}
                            cy={y}
                            r={isSelected ? glowRadius + 8 : glowRadius}
                            fill={`hsl(var(--primary) / ${isSelected ? 0.25 : (isPrimary ? 0.12 : 0.02)})`}
                            style={{ transition: "r 0.3s ease, fill 0.3s ease" }}
                          />
                          
                          {/* Node background - primary nodes are bigger with accent border */}
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
                {/* Core glow */}
                <circle
                  cx={0}
                  cy={0}
                  r={45}
                  fill="url(#coreGradient)"
                  style={{
                    filter: "drop-shadow(0 0 30px hsl(var(--primary) / 0.4))",
                  }}
                />
                
                {/* Core border */}
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
                
                {/* Core inner */}
                <circle
                  cx={0}
                  cy={0}
                  r={20}
                  fill="hsl(var(--primary) / 0.3)"
                />
                
                {/* Core icon */}
                <foreignObject x={-14} y={-14} width={28} height={28}>
                  <div className="w-full h-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                </foreignObject>
              </motion.g>

              {/* Gradient definitions */}
              <defs>
                <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
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
                    {/* Layer indicator */}
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] tracking-[0.3em] uppercase text-primary/60">
                        Layer Active
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-light text-foreground">
                      {currentDetail.name}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground/60 font-light leading-relaxed">
                      {currentDetail.description}
                    </p>

                    {/* Example */}
                    <div className="pt-4 border-t border-border/10">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-3">
                        Example
                      </p>
                      <p className="text-sm text-muted-foreground/70 italic leading-relaxed">
                        "{currentDetail.example}"
                      </p>
                    </div>

                    {/* Dynamic Metric */}
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

                    {/* Default metrics */}
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

      {/* Transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
    </section>
  );
};

export default SolutionSection;
