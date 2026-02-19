import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Database, Users, ShieldAlert, TrendingUp } from "lucide-react";

interface ProblemNode {
  id: string;
  icon: typeof Database;
  title: string;
  shortTitle: string;
  description: string;
  impacts: string[];
  position: { x: number; y: number };
}

const problemNodes: ProblemNode[] = [
  {
    id: "communication",
    icon: Users,
    title: "Restricted Communication",
    shortTitle: "Communication",
    description: "Restricted communication between stakeholders in supply chains increases the risk of the bullwhip-effect.",
    impacts: [
      "Bullwhip-effect amplifies demand distortions",
      "Stakeholders operate in information silos",
      "Poor coordination leads to overproduction or shortages"
    ],
    position: { x: 0, y: 0 },
  },
  {
    id: "fragmented",
    icon: Database,
    title: "Fragmented Digitalization",
    shortTitle: "Fragmented",
    description: "Fragmented digitalization and no end-to-end visibility make it harder to tackle complex and transparent supply chains.",
    impacts: [
      "No end-to-end visibility across the chain",
      "More manual work required to plan supply chains",
      "Supply chain inefficiencies increase operational costs by up to 20%"
    ],
    position: { x: 1, y: 0 },
  },
  {
    id: "inflexible",
    icon: ShieldAlert,
    title: "Inflexible Supply Chains",
    shortTitle: "Inflexible",
    description: "Inflexible supply chains lead to slow reaction times and unnecessary costs when market conditions shift.",
    impacts: [
      "Slow reaction times to demand changes",
      "Unnecessary costs from rigid processes",
      "Poor supply-chain visibility and excess inventory"
    ],
    position: { x: 0, y: 1 },
  },
  {
    id: "geopolitical",
    icon: TrendingUp,
    title: "Geopolitical Tensions",
    shortTitle: "Geopolitical",
    description: "Increasing geopolitical and economical tension creates higher volatility, supply disruptions, and planning uncertainty.",
    impacts: [
      "Higher volatility in global trade",
      "Supply disruptions and planning uncertainty",
      "The Economist Intelligence Unit estimates poor supply-chain management costs $1 Trillion annually"
    ],
    position: { x: 1, y: 1 },
  },
];

const connections = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 0, to: 3 },
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 3 },
];

const ProblemSection = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const getNodeCenter = (index: number) => {
    const node = problemNodes[index];
    const centerX = 200;
    const centerY = 200;
    const spreadX = 140;
    const spreadY = 120;
    
    const x = centerX + (node.position.x - 0.5) * spreadX * 2;
    const y = centerY + (node.position.y - 0.5) * spreadY * 2;
    return { x, y };
  };

  // Calculate edge intersection point for lines to dock on square sides
  const getEdgePoint = (fromIndex: number, toIndex: number) => {
    const from = getNodeCenter(fromIndex);
    const to = getNodeCenter(toIndex);
    const halfSize = 65; // Half of the 130x130 square
    
    // Direction vector from 'from' to 'to'
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    
    // Calculate intersection with the square edge
    // We need to find where the line exits the square around 'from'
    // and where it enters the square around 'to'
    
    const getIntersection = (center: { x: number; y: number }, dirX: number, dirY: number) => {
      // Normalize direction
      const len = Math.sqrt(dirX * dirX + dirY * dirY);
      if (len === 0) return center;
      
      const nx = dirX / len;
      const ny = dirY / len;
      
      // Find intersection with square edges
      // Check which edge we hit first
      let t = Infinity;
      
      if (nx !== 0) {
        const tRight = halfSize / Math.abs(nx);
        if (tRight < t) t = tRight;
      }
      if (ny !== 0) {
        const tBottom = halfSize / Math.abs(ny);
        if (tBottom < t) t = tBottom;
      }
      
      return {
        x: center.x + nx * t,
        y: center.y + ny * t
      };
    };
    
    const fromEdge = getIntersection(from, dx, dy);
    const toEdge = getIntersection(to, -dx, -dy);
    
    return { from: fromEdge, to: toEdge };
  };

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-primary/50 mb-6">
            The Challenge
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.02em] leading-[1.15] max-w-3xl mx-auto">
            <span className="text-foreground">Modern Supply Chains Are Built on</span>{" "}
            <span className="text-muted-foreground/40">Broken Connections</span>
          </h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-[minmax(300px,450px),1fr] gap-12 lg:gap-20 items-stretch">
          {/* Network visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-full max-w-[500px] mx-auto aspect-square">
              {/* Ambient glow behind network */}
              <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />
              
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full relative z-10"
                style={{ overflow: "visible" }}
              >
                {/* Connection lines - always visible with animation */}
                {connections.map((connection, index) => {
                  const edgePoints = getEdgePoint(connection.from, connection.to);
                  const from = edgePoints.from;
                  const to = edgePoints.to;
                  const isHighlighted = activeNode === connection.from || activeNode === connection.to;

                  return (
                    <g key={index}>
                      {/* Base line */}
                      <motion.line
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke={isHighlighted ? "hsl(var(--primary))" : "hsl(var(--border))"}
                        strokeWidth={isHighlighted ? 2 : 1}
                        strokeOpacity={isHighlighted ? 0.7 : 0.35}
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : {}}
                        transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
                      />
                      
                      {/* Animated pulse on ALL connections - always visible */}
                      <motion.circle
                        r={2.5}
                        fill={isHighlighted ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                        initial={{ opacity: 0 }}
                        animate={isInView ? {
                          opacity: [0, isHighlighted ? 0.9 : 0.5, 0],
                          cx: [from.x, to.x],
                          cy: [from.y, to.y],
                        } : {}}
                        transition={{
                          duration: 2.5 + index * 0.3,
                          delay: 1.5 + index * 0.4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </g>
                  );
                })}

                {/* Nodes */}
                {problemNodes.map((node, index) => {
                  const center = getNodeCenter(index);
                  const Icon = node.icon;
                  const isActive = activeNode === index;

                  return (
                    <motion.g
                      key={node.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { 
                        opacity: 1, 
                        scale: 1,
                      } : {}}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.4 + index * 0.15,
                        type: "spring",
                        stiffness: 200,
                      }}
                      onMouseEnter={() => setActiveNode(index)}
                      onMouseLeave={() => setActiveNode(null)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Glass card background */}
                      <motion.rect
                        x={center.x - 65}
                        y={center.y - 65}
                        width={130}
                        height={130}
                        rx={24}
                        fill="hsl(var(--card))"
                        fillOpacity={isActive ? 0.5 : 0.25}
                        stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--border))"}
                        strokeWidth={isActive ? 1.5 : 1}
                        strokeOpacity={isActive ? 0.7 : 0.2}
                        style={{
                          filter: isActive 
                            ? "drop-shadow(0 0 30px hsl(var(--primary) / 0.25))" 
                            : "drop-shadow(0 8px 24px hsl(var(--background) / 0.6))",
                        }}
                        animate={{
                          scale: isActive ? 1.05 : 1,
                          y: isActive ? -5 : [0, -3, 0],
                        }}
                        transition={{ 
                          scale: { duration: 0.3 },
                          y: isActive ? { duration: 0.3 } : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
                        }}
                      />

                      {/* Icon */}
                      <foreignObject
                        x={center.x - 24}
                        y={center.y - 35}
                        width={48}
                        height={48}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon 
                            className={`w-8 h-8 transition-all duration-500 ${
                              isActive ? "text-primary" : "text-muted-foreground/60"
                            }`} 
                          />
                        </div>
                      </foreignObject>

                      {/* Node title */}
                      <text
                        x={center.x}
                        y={center.y + 30}
                        textAnchor="middle"
                        className={`text-xs font-medium fill-current transition-colors duration-300 ${
                          isActive ? "text-foreground" : "text-muted-foreground/70"
                        }`}
                        style={{ fontSize: "11px" }}
                      >
                        {node.shortTitle}
                      </text>
                    </motion.g>
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="order-1 lg:order-2 lg:ml-12 xl:ml-20 flex flex-col"
          >
            <div className="relative flex-1 flex flex-col">
              {/* Glass panel background */}
              <div className="absolute inset-0 bg-card/30 backdrop-blur-xl rounded-3xl border border-border/20" />
              
              <div className="relative p-8 md:p-10 flex-1 flex flex-col">
                {/* Intro text when no node is hovered */}
                <AnimatePresence mode="wait">
                  {activeNode === null ? (
                    <motion.div
                      key="intro"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <p className="text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-4">
                        Explore the problems
                      </p>
                      <h3 className="text-xl font-medium text-foreground mb-4">
                        Hover over a node
                      </h3>
                      <p className="text-muted-foreground/60 text-base leading-relaxed">
                        Fragmented systems, manual coordination, and disconnected data create hidden risk, 
                        cost, and operational drag at scale.
                      </p>
                      
                      {/* Quick overview list */}
                      <ul className="mt-8 space-y-3">
                        {problemNodes.map((node, i) => (
                          <li
                            key={node.id}
                            className="flex items-center gap-3 text-sm text-muted-foreground/50"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-border" />
                            {node.title}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeNode}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          {(() => {
                            const Icon = problemNodes[activeNode].icon;
                            return <Icon className="w-6 h-6 text-primary" />;
                          })()}
                        </div>
                        <div>
                          <p className="text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-1">
                            Problem {activeNode + 1} of 4
                          </p>
                          <h3 className="text-xl font-medium text-foreground">
                            {problemNodes[activeNode].title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground/70 text-base md:text-lg leading-relaxed mb-8">
                        {problemNodes[activeNode].description}
                      </p>

                      {/* Impacts */}
                      <div className="space-y-4">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50">
                          Business Impact
                        </p>
                        <ul className="space-y-3">
                          {problemNodes[activeNode].impacts.map((impact, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.1 }}
                              className="flex items-start gap-3 text-base text-muted-foreground/60"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2 shrink-0" />
                              {impact}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;
