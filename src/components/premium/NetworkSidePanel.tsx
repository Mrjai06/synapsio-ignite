import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Brain, Activity, Truck, Factory, UserPlus } from "lucide-react";
import { GlassPanel } from "./DepthSystem";

interface NetworkSidePanelProps {
  visible: boolean;
  activePhase: number; // 0=idle, 1=events, 2=recalculating, 3=rebalanced
}

const decisions = [
  { icon: Activity, text: "32 sourcing scenarios evaluated" },
  { icon: Factory, text: "Production rebalanced across 3 sites" },
  { icon: Truck, text: "Transport plan optimized" },
  { icon: UserPlus, text: "New supplier integrated automatically" },
];

const metrics = [
  { label: "Lower inventory exposure", value: "11%", suffix: "" },
  { label: "Service disruption", value: "0%", suffix: "" },
  { label: "Margin improvement", value: "6%", suffix: "" },
  { label: "Autonomous execution", value: "Enabled", suffix: "" },
];

const NetworkSidePanel = ({ visible, activePhase }: NetworkSidePanelProps) => {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, x: 20 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <GlassPanel intensity="subtle" bordered className="rounded-2xl p-6 lg:p-8 border-primary/20">
        {/* Status header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground/50">System Status</p>
          </div>
        </div>

        {/* Processing status */}
        <AnimatePresence mode="wait">
          {activePhase === 2 && (
            <motion.div
              key="recalculating"
              className="mb-6 flex items-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <p className="text-sm font-mono text-primary/80">AI recalculating network…</p>
            </motion.div>
          )}
          {activePhase === 3 && (
            <motion.div
              key="optimized"
              className="mb-6 flex items-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-2 h-2 rounded-full bg-chart-2" />
              <p className="text-sm font-mono text-chart-2/80">Network optimized</p>
            </motion.div>
          )}
          {activePhase <= 1 && (
            <motion.div
              key="monitoring"
              className="mb-6 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-muted-foreground/40"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p className="text-sm font-mono text-muted-foreground/50">Monitoring network…</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decisions */}
        <div className="space-y-3 mb-8">
          {decisions.map((decision, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 10 }}
              animate={activePhase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 0 }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
            >
              <decision.icon className={`w-4 h-4 flex-shrink-0 ${activePhase >= 2 ? "text-primary/70" : "text-muted-foreground/30"}`} />
              <p className={`text-sm ${activePhase >= 2 ? "text-foreground/80" : "text-muted-foreground/30"}`}>
                {decision.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Impact Metrics */}
        <div className="pt-6 border-t border-primary/15">
          <p className="text-xs tracking-[0.15em] uppercase text-primary/50 mb-4">Impact</p>
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={activePhase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              >
                <p className={`text-2xl font-light ${activePhase >= 3 ? "text-primary" : "text-muted-foreground/20"}`}>
                  {metric.value}
                </p>
                <p className="text-xs text-muted-foreground/50 mt-1">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subtle footer */}
        {activePhase >= 3 && (
          <motion.div
            className="mt-6 pt-4 border-t border-border/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-chart-2/60" />
              <p className="text-xs text-muted-foreground/40">All decisions executed autonomously</p>
            </div>
          </motion.div>
        )}
      </GlassPanel>
    </motion.div>
  );
};

export default NetworkSidePanel;
