import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NetworkNode {
  id: string;
  label: string;
  type: "supplier" | "production" | "distribution" | "customer";
  x: number;
  y: number;
  capacity?: number;
}

interface NetworkConnection {
  from: string;
  to: string;
  flow: number; // 0-1 intensity
  active: boolean;
}

interface NetworkEvent {
  id: string;
  label: string;
  nodeId: string;
  type: "demand" | "delay" | "new" | "capacity" | "cost";
  color: string;
}

const nodes: NetworkNode[] = [
  // Suppliers (left)
  { id: "s1", label: "Supplier A", type: "supplier", x: 8, y: 18 },
  { id: "s2", label: "Supplier B", type: "supplier", x: 5, y: 38 },
  { id: "s3", label: "Supplier C", type: "supplier", x: 8, y: 58 },
  { id: "s4", label: "New Supplier", type: "supplier", x: 5, y: 78 },
  // Production (center-left)
  { id: "p1", label: "Site EU", type: "production", x: 32, y: 25 },
  { id: "p2", label: "Site APAC", type: "production", x: 32, y: 50 },
  { id: "p3", label: "Site NA", type: "production", x: 32, y: 75 },
  // Distribution (center-right)
  { id: "d1", label: "DC North", type: "distribution", x: 60, y: 22 },
  { id: "d2", label: "DC Central", type: "distribution", x: 60, y: 50 },
  { id: "d3", label: "DC South", type: "distribution", x: 60, y: 78 },
  // Customers (right)
  { id: "c1", label: "Region A", type: "customer", x: 88, y: 15 },
  { id: "c2", label: "Region B", type: "customer", x: 92, y: 40 },
  { id: "c3", label: "Region C", type: "customer", x: 88, y: 65 },
  { id: "c4", label: "Region D", type: "customer", x: 92, y: 85 },
];

const baseConnections: NetworkConnection[] = [
  { from: "s1", to: "p1", flow: 0.7, active: true },
  { from: "s1", to: "p2", flow: 0.3, active: true },
  { from: "s2", to: "p1", flow: 0.5, active: true },
  { from: "s2", to: "p2", flow: 0.6, active: true },
  { from: "s3", to: "p2", flow: 0.4, active: true },
  { from: "s3", to: "p3", flow: 0.7, active: true },
  { from: "s4", to: "p3", flow: 0, active: false },
  { from: "p1", to: "d1", flow: 0.8, active: true },
  { from: "p1", to: "d2", flow: 0.4, active: true },
  { from: "p2", to: "d2", flow: 0.7, active: true },
  { from: "p2", to: "d3", flow: 0.3, active: true },
  { from: "p3", to: "d2", flow: 0.3, active: true },
  { from: "p3", to: "d3", flow: 0.8, active: true },
  { from: "d1", to: "c1", flow: 0.9, active: true },
  { from: "d1", to: "c2", flow: 0.3, active: true },
  { from: "d2", to: "c2", flow: 0.6, active: true },
  { from: "d2", to: "c3", flow: 0.5, active: true },
  { from: "d3", to: "c3", flow: 0.4, active: true },
  { from: "d3", to: "c4", flow: 0.8, active: true },
];

const events: NetworkEvent[] = [
  { id: "e1", label: "+14% demand spike", nodeId: "c1", type: "demand", color: "hsl(19 62% 63%)" },
  { id: "e2", label: "Tier-2 delay (3 days)", nodeId: "s2", type: "delay", color: "hsl(0 65% 55%)" },
  { id: "e3", label: "New supplier added", nodeId: "s4", type: "new", color: "hsl(150 60% 45%)" },
  { id: "e4", label: "92% capacity", nodeId: "p2", type: "capacity", color: "hsl(45 80% 55%)" },
  { id: "e5", label: "Transport cost +8%", nodeId: "d3", type: "cost", color: "hsl(19 62% 63%)" },
];

const nodeStyles: Record<string, { bg: string; border: string; size: number }> = {
  supplier: { bg: "hsl(189 72% 20% / 0.6)", border: "hsl(189 72% 35%)", size: 10 },
  production: { bg: "hsl(200 75% 12% / 0.8)", border: "hsl(19 62% 63%)", size: 13 },
  distribution: { bg: "hsl(189 72% 16% / 0.7)", border: "hsl(189 72% 40%)", size: 11 },
  customer: { bg: "hsl(200 50% 12% / 0.6)", border: "hsl(200 20% 50%)", size: 9 },
};

const FlowParticle = ({ x1, y1, x2, y2, delay, flow }: { x1: number; y1: number; x2: number; y2: number; delay: number; flow: number }) => {
  if (flow < 0.1) return null;
  return (
    <motion.circle
      r={1.5}
      fill="hsl(19 62% 63%)"
      opacity={0.6 * flow}
      initial={{ cx: x1, cy: y1 }}
      animate={{ cx: x2, cy: y2 }}
      transition={{
        duration: 2.5 + Math.random(),
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

interface NetworkVisualizationProps {
  visible: boolean;
  activePhase: number; // 0=idle, 1=events, 2=recalculating, 3=rebalanced
}

const NetworkVisualization = ({ visible, activePhase }: NetworkVisualizationProps) => {
  const [connections, setConnections] = useState(baseConnections);
  const [activeEvents, setActiveEvents] = useState<string[]>([]);
  const [pulsingNodes, setPulsingNodes] = useState<string[]>([]);

  useEffect(() => {
    if (activePhase >= 1) {
      setActiveEvents(events.map((e) => e.id));
      setPulsingNodes(events.map((e) => e.nodeId));
    }
    if (activePhase >= 3) {
      // Rebalance: activate new supplier, shift flows
      setConnections((prev) =>
        prev.map((c) => {
          if (c.from === "s4") return { ...c, flow: 0.5, active: true };
          if (c.from === "s2" && c.to === "p1") return { ...c, flow: 0.2 };
          if (c.from === "s1" && c.to === "p1") return { ...c, flow: 0.9 };
          if (c.from === "p1" && c.to === "d1") return { ...c, flow: 1.0 };
          if (c.from === "p3" && c.to === "d2") return { ...c, flow: 0.6 };
          return c;
        })
      );
    }
  }, [activePhase]);

  const getNode = useCallback((id: string) => nodes.find((n) => n.id === id)!, []);

  return (
    <motion.div
      className="w-full aspect-[16/10] relative"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {connections.map((conn, i) => {
          const from = getNode(conn.from);
          const to = getNode(conn.to);
          if (!from || !to) return null;
          const isRebalanced = activePhase >= 3;
          const opacity = conn.active ? 0.15 + conn.flow * 0.35 : 0.05;
          const strokeWidth = 0.15 + conn.flow * 0.3;
          return (
            <g key={i}>
              <motion.line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isRebalanced && conn.flow > 0.6 ? "hsl(19 62% 63%)" : "hsl(189 72% 35%)"}
                strokeWidth={strokeWidth}
                initial={{ opacity: 0 }}
                animate={{ opacity }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.05 }}
              />
              {conn.active && (
                <FlowParticle
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  delay={i * 0.3}
                  flow={conn.flow}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const style = nodeStyles[node.type];
          const isPulsing = pulsingNodes.includes(node.id);
          const event = events.find((e) => e.nodeId === node.id);
          const isNewSupplier = node.id === "s4";
          const nodeOpacity = isNewSupplier && activePhase < 3 ? 0.25 : 1;

          return (
            <g key={node.id}>
              {/* Pulse ring */}
              {isPulsing && activePhase >= 1 && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={style.size / 2 + 2}
                  fill="none"
                  stroke={event?.color || style.border}
                  strokeWidth={0.3}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.3, 1.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              )}
              {/* Node circle */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={style.size / 2}
                fill={style.bg}
                stroke={style.border}
                strokeWidth={0.4}
                filter="url(#glow)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: nodeOpacity, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + Math.random() * 0.5, type: "spring" }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
              {/* Node label */}
              <motion.text
                x={node.x}
                y={node.y + style.size / 2 + 3}
                textAnchor="middle"
                fill="hsl(200 20% 65%)"
                fontSize="2.2"
                fontFamily="var(--font-sans)"
                initial={{ opacity: 0 }}
                animate={{ opacity: nodeOpacity * 0.7 }}
                transition={{ delay: 0.8 }}
              >
                {node.label}
              </motion.text>
            </g>
          );
        })}

        {/* Event labels */}
        <AnimatePresence>
          {activePhase >= 1 &&
            events.map((event) => {
              const node = getNode(event.nodeId);
              if (!node) return null;
              const offsetY = node.type === "customer" ? -7 : -8;
              return (
                <motion.g
                  key={event.id}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <rect
                    x={node.x - 12}
                    y={node.y + offsetY - 2}
                    width={24}
                    height={4}
                    rx={1}
                    fill="hsl(200 75% 8% / 0.85)"
                    stroke={event.color}
                    strokeWidth={0.2}
                  />
                  <text
                    x={node.x}
                    y={node.y + offsetY + 0.8}
                    textAnchor="middle"
                    fill={event.color}
                    fontSize="1.8"
                    fontFamily="var(--font-sans)"
                  >
                    {event.label}
                  </text>
                </motion.g>
              );
            })}
        </AnimatePresence>

        {/* Recalculation wave */}
        {activePhase === 2 && (
          <motion.circle
            cx={50}
            cy={50}
            r={5}
            fill="none"
            stroke="hsl(19 62% 63%)"
            strokeWidth={0.3}
            initial={{ r: 5, opacity: 0.5 }}
            animate={{ r: 55, opacity: 0 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        {/* Column labels */}
        {[
          { x: 7, label: "Suppliers" },
          { x: 32, label: "Production" },
          { x: 60, label: "Distribution" },
          { x: 90, label: "Customers" },
        ].map((col) => (
          <motion.text
            key={col.label}
            x={col.x}
            y={5}
            textAnchor="middle"
            fill="hsl(200 20% 45%)"
            fontSize="2.4"
            fontFamily="var(--font-sans)"
            letterSpacing="0.15em"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 0.5 } : {}}
            transition={{ delay: 0.4 }}
          >
            {col.label.toUpperCase()}
          </motion.text>
        ))}
      </svg>
    </motion.div>
  );
};

export default NetworkVisualization;
