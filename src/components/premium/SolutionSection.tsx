import { useRef, useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Brain, Database, Cpu, Truck, RefreshCw, Zap, BarChart3, Network, Box, Globe } from "lucide-react";
import { FloatingSurface, GlassPanel, AmbientGlow } from "./DepthSystem";

// Orbit layer data
// Orbit layer data - primary nodes spaced 90° apart for clean orbits
const orbitLayers = [
  {
    id: "ingestion",
    name: "Data Ingestion",
    radius: 100,
    speed: 45,
    color: "primary",
    nodes: [
      { id: "erp", name: "ERP Systems", icon: Database, angle: 0, isPrimary: true },
      { id: "iot", name: "IoT Sensors", icon: Cpu, angle: 120, isPrimary: false },
      { id: "api", name: "External APIs", icon: Globe, angle: 240, isPrimary: false },
    ],
    description: "Real-time data streams from across your entire supply network feed into a unified intelligence layer.",
    example: "Warehouse sensors detect inventory shifts and trigger immediate rebalancing across 50+ locations.",
    metric: { value: "2.4M", label: "Events/hour" },
  },
  {
    id: "planning",
    name: "Planning & Optimization",
    radius: 160,
    speed: 60,
    color: "secondary",
    nodes: [
      { id: "demand", name: "Demand Forecasting", icon: BarChart3, angle: 90, isPrimary: true },
      { id: "inventory", name: "Inventory AI", icon: Box, angle: 210, isPrimary: false },
      { id: "routing", name: "Route Optimization", icon: Network, angle: 330, isPrimary: false },
    ],
    description: "Advanced ML models continuously optimize allocation, routing, and procurement decisions.",
    example: "Predictive algorithms reroute 200 shipments ahead of a port delay, saving $1.2M in expedited costs.",
    metric: { value: "94%", label: "Forecast accuracy" },
  },
  {
    id: "execution",
    name: "Execution & Marketplace",
    radius: 220,
    speed: 80,
    color: "accent",
    nodes: [
      { id: "fulfillment", name: "Fulfillment", icon: Truck, angle: 180, isPrimary: true },
      { id: "marketplace", name: "Marketplace Sync", icon: Globe, angle: 300, isPrimary: false },
      { id: "delivery", name: "Last Mile", icon: Zap, angle: 60, isPrimary: false },
    ],
    description: "Seamless execution layer connects warehouses, carriers, and marketplaces in real-time.",
    example: "Flash sale detected → inventory auto-allocated → carrier capacity secured within 3 minutes.",
    metric: { value: "99.7%", label: "On-time delivery" },
  },
  {
    id: "learning",
    name: "Learning & Feedback",
    radius: 280,
    speed: 100,
    color: "muted",
    nodes: [
      { id: "analytics", name: "Analytics Engine", icon: BarChart3, angle: 270, isPrimary: true },
      { id: "feedback", name: "Feedback Loop", icon: RefreshCw, angle: 30, isPrimary: false },
      { id: "adaptation", name: "Self-Adaptation", icon: Brain, angle: 150, isPrimary: false },
    ],
    description: "Continuous learning from outcomes refines predictions and decisions autonomously.",
    example: "System identified a carrier underperformance pattern and automatically redistributed 15% of volume.",
    metric: { value: "3.2×", label: "Faster adaptation" },
  },
];

// Get primary nodes for dynamic connections
const getPrimaryNodes = () => {
  return orbitLayers.map(orbit => {
    const primaryNode = orbit.nodes.find(n => n.isPrimary)!;
    return {
      id: primaryNode.id,
      radius: orbit.radius,
      baseAngle: primaryNode.angle,
      speed: orbit.speed,
    };
  });
};

const primaryNodes = getPrimaryNodes();

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

  // Generate particles
  const particles = useMemo(() => {
    const items: JSX.Element[] = [];
    orbitLayers.forEach((orbit, orbitIndex) => {
      orbit.nodes.forEach((node, nodeIndex) => {
        // Particles flowing to center
        items.push(
          <DataParticle
            key={`${orbit.id}-${node.id}-in`}
            fromRadius={orbit.radius}
            toRadius={0}
            angle={node.angle}
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
              {/* Orbit rings */}
              {orbitLayers.map((orbit, index) => (
                <motion.circle
                  key={orbit.id}
                  cx={0}
                  cy={0}
                  r={orbit.radius}
                  fill="none"
                  stroke={`hsl(var(--border))`}
                  strokeWidth={1}
                  strokeDasharray="4 8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { 
                    opacity: selectedOrbit && selectedOrbit !== orbit.id ? 0.1 : 0.2,
                    scale: 1 
                  } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  style={{
                    filter: selectedOrbit === orbit.id ? "drop-shadow(0 0 8px hsl(var(--primary) / 0.3))" : "none"
                  }}
                />
              ))}

              {/* Dynamic network connections between primary nodes - follows rotation */}
              <g className="pointer-events-none">
                {primaryNodes.map((node, i) => {
                  // Calculate current position based on rotation
                  const currentAngle = node.baseAngle + rotationAngles[i];
                  const x1 = Math.cos((currentAngle * Math.PI) / 180) * node.radius;
                  const y1 = Math.sin((currentAngle * Math.PI) / 180) * node.radius;
                  
                  // Connect to next primary node
                  const nextIndex = (i + 1) % primaryNodes.length;
                  const nextNode = primaryNodes[nextIndex];
                  const nextAngle = nextNode.baseAngle + rotationAngles[nextIndex];
                  const x2 = Math.cos((nextAngle * Math.PI) / 180) * nextNode.radius;
                  const y2 = Math.sin((nextAngle * Math.PI) / 180) * nextNode.radius;
                  
                  // Also connect to center
                  return (
                    <g key={`primary-conn-${i}`}>
                      {/* Connection between adjacent primary nodes */}
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="hsl(var(--primary) / 0.3)"
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                      />
                      
                      {/* Connection to core */}
                      <line
                        x1={x1}
                        y1={y1}
                        x2={0}
                        y2={0}
                        stroke="hsl(var(--primary) / 0.15)"
                        strokeWidth={1}
                      />
                      
                      {/* Animated pulse along connection to next node */}
                      <motion.circle
                        r={2.5}
                        fill="hsl(var(--primary))"
                        initial={{ opacity: 0 }}
                        animate={{
                          cx: [x1, x2],
                          cy: [y1, y2],
                          opacity: [0, 0.9, 0.9, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          delay: i * 0.6,
                          repeat: Infinity,
                          repeatDelay: 1.5,
                          ease: "easeInOut",
                        }}
                      />
                      
                      {/* Animated pulse to core */}
                      <motion.circle
                        r={2}
                        fill="hsl(var(--primary) / 0.7)"
                        initial={{ opacity: 0 }}
                        animate={{
                          cx: [x1, 0],
                          cy: [y1, 0],
                          opacity: [0, 0.7, 0.7, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.4 + 0.5,
                          repeat: Infinity,
                          repeatDelay: 2,
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
              {orbitLayers.map((orbit, orbitIndex) => (
                <g key={orbit.id}>
                  <motion.g
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: orbit.speed,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      animationPlayState: selectedOrbit === orbit.id ? "paused" : "running",
                    }}
                  >
                    {orbit.nodes.map((node, nodeIndex) => {
                      const x = Math.cos((node.angle * Math.PI) / 180) * orbit.radius;
                      const y = Math.sin((node.angle * Math.PI) / 180) * orbit.radius;
                      const isSelected = selectedNode === node.id;
                      const isOrbitSelected = selectedOrbit === orbit.id;
                      const isDimmed = selectedOrbit && !isOrbitSelected;
                      const Icon = node.icon;
                      
                      // Primary nodes are larger and more prominent
                      const isPrimary = node.isPrimary;
                      const baseRadius = isPrimary ? 32 : 18;
                      const glowRadius = isPrimary ? 40 : 22;
                      const iconSize = isPrimary ? 20 : 12;

                      return (
                        <motion.g
                          key={node.id}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isVisible ? { 
                            opacity: isDimmed ? 0.3 : (isPrimary ? 1 : 0.6), 
                            scale: 1 
                          } : {}}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.6 + orbitIndex * 0.15 + nodeIndex * 0.1 
                          }}
                          onMouseEnter={() => {
                            setSelectedOrbit(orbit.id);
                            setSelectedNode(node.id);
                          }}
                          onMouseLeave={() => {
                            setSelectedOrbit(null);
                            setSelectedNode(null);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {/* Node glow - larger for primary */}
                          <motion.circle
                            cx={x}
                            cy={y}
                            r={glowRadius}
                            fill={`hsl(var(--primary) / ${isSelected ? 0.25 : (isPrimary ? 0.1 : 0.03)})`}
                            animate={{
                              r: isSelected ? glowRadius + 10 : glowRadius,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          {/* Node background - primary nodes are bigger with accent border */}
                          <motion.circle
                            cx={x}
                            cy={y}
                            r={baseRadius}
                            fill={isPrimary ? "hsl(var(--card) / 0.8)" : "hsl(var(--card) / 0.4)"}
                            stroke={isSelected 
                              ? "hsl(var(--primary))" 
                              : isPrimary 
                                ? "hsl(var(--primary) / 0.5)" 
                                : "hsl(var(--border) / 0.3)"
                            }
                            strokeWidth={isPrimary ? 2 : 1}
                            style={{
                              filter: isSelected 
                                ? "drop-shadow(0 0 25px hsl(var(--primary) / 0.6))" 
                                : isPrimary 
                                  ? "drop-shadow(0 0 15px hsl(var(--primary) / 0.3))"
                                  : "drop-shadow(0 2px 8px hsl(var(--background) / 0.3))",
                              backdropFilter: "blur(8px)",
                            }}
                            animate={{
                              scale: isSelected ? 1.15 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          {/* Counter-rotation for icon to stay upright */}
                          <motion.g
                            animate={{ rotate: -360 }}
                            transition={{
                              duration: orbit.speed,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            style={{ transformOrigin: `${x}px ${y}px` }}
                          >
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
                                        : 'text-muted-foreground/40'
                                  }`}
                                  style={{ width: iconSize, height: iconSize }}
                                />
                              </div>
                            </foreignObject>
                          </motion.g>
                        </motion.g>
                      );
                    })}
                  </motion.g>
                </g>
              ))}

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
