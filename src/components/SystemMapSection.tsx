import { useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const nodes = [
  { 
    id: "ingest", 
    label: "Data Ingestion", 
    x: 15, 
    y: 50,
    executive: "Unified data layer connecting 200+ enterprise systems with zero-latency sync.",
    product: "Real-time connectors for SAP, Oracle, Salesforce, and IoT sensors. 5-minute average integration time.",
    technical: "Apache Kafka-based event streaming with exactly-once semantics. GraphQL API layer with auto-generated schemas."
  },
  { 
    id: "predict", 
    label: "Predictive Engine", 
    x: 35, 
    y: 30,
    executive: "AI models trained on 10B+ transactions predict disruptions 14 days ahead.",
    product: "Demand forecasting, supplier risk scoring, and anomaly detection in a single inference pipeline.",
    technical: "Transformer-based time series models on PyTorch. Distributed training on 8x A100 clusters. Sub-100ms inference."
  },
  { 
    id: "optimize", 
    label: "Optimization Core", 
    x: 55, 
    y: 50,
    executive: "Autonomous decision-making that reduces costs by 40% while maintaining SLAs.",
    product: "Multi-objective optimization for inventory, routing, and supplier allocation.",
    technical: "Constraint programming with OR-Tools. Reinforcement learning for dynamic rebalancing. MILP solvers for NP-hard problems."
  },
  { 
    id: "orchestrate", 
    label: "Orchestration Hub", 
    x: 75, 
    y: 30,
    executive: "End-to-end workflow automation across your entire supply chain ecosystem.",
    product: "Visual workflow builder with 500+ pre-built automation templates.",
    technical: "Temporal.io for durable execution. Event-driven architecture with saga patterns for distributed transactions."
  },
  { 
    id: "insights", 
    label: "Intelligence Layer", 
    x: 85, 
    y: 60,
    executive: "Real-time dashboards and alerts that surface what matters most.",
    product: "Customizable KPI tracking with natural language queries and automated reporting.",
    technical: "Columnar storage on ClickHouse. Materialized views for sub-second aggregations. LLM-powered query interface."
  }
];

const connections = [
  { from: "ingest", to: "predict" },
  { from: "predict", to: "optimize" },
  { from: "optimize", to: "orchestrate" },
  { from: "orchestrate", to: "insights" },
  { from: "ingest", to: "optimize" },
  { from: "predict", to: "insights" }
];

const SystemMapSection = () => {
  const [selectedNode, setSelectedNode] = useState<typeof nodes[0] | null>(null);

  const getNodePosition = (id: string) => {
    const node = nodes.find(n => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="container mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Architecture</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            The Synapsio <span className="text-gradient">System</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Click any node to explore our modular architecture. 
            Each component designed for enterprise-scale performance.
          </p>
        </div>
        
        {/* Interactive Map */}
        <div className="relative aspect-[16/9] max-w-5xl mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Connections */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            {connections.map((conn, i) => {
              const from = getNodePosition(conn.from);
              const to = getNodePosition(conn.to);
              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="url(#lineGradient)"
                  strokeWidth="0.3"
                  className="animate-glow-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              );
            })}
            
            {/* Nodes */}
            {nodes.map((node) => (
              <g
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer"
              >
                {/* Glow effect */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="5"
                  fill="hsl(var(--primary))"
                  opacity="0.2"
                  className="animate-glow-pulse"
                />
                {/* Node circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="3"
                  fill="hsl(var(--card))"
                  stroke="hsl(var(--primary))"
                  strokeWidth="0.4"
                  className="transition-all duration-300 hover:stroke-[0.6]"
                />
                {/* Label */}
                <text
                  x={node.x}
                  y={node.y + 7}
                  textAnchor="middle"
                  fill="hsl(var(--foreground))"
                  fontSize="2.5"
                  fontWeight="500"
                  className="pointer-events-none"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
        
        {/* Node Detail Drawer */}
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
            <div className="glass rounded-2xl w-full max-w-2xl p-6 relative animate-scale-in">
              <button 
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <h3 className="text-2xl font-bold">{selectedNode.label}</h3>
              </div>
              
              <Tabs defaultValue="executive" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
                  <TabsTrigger value="executive" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Executive</TabsTrigger>
                  <TabsTrigger value="product" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Product</TabsTrigger>
                  <TabsTrigger value="technical" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Technical</TabsTrigger>
                </TabsList>
                <TabsContent value="executive" className="mt-4">
                  <p className="text-muted-foreground leading-relaxed">{selectedNode.executive}</p>
                </TabsContent>
                <TabsContent value="product" className="mt-4">
                  <p className="text-muted-foreground leading-relaxed">{selectedNode.product}</p>
                </TabsContent>
                <TabsContent value="technical" className="mt-4">
                  <p className="text-muted-foreground font-mono text-sm leading-relaxed">{selectedNode.technical}</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SystemMapSection;
