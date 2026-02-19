import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Zap, Brain, TrendingDown, FileSpreadsheet, Eye, BarChart3, RefreshCw, Lock, Activity, Shield, Gauge } from "lucide-react";
import { FloatingSurface, GlassPanel, AmbientGlow } from "./DepthSystem";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import FeaturesSection from "./FeaturesSection";

interface ComparisonStep {
  icon: React.ElementType;
  text: string;
  tooltip: string;
}

interface ComparisonSide {
  title: string;
  steps: ComparisonStep[];
  outcome: {
    title: string;
    points: string[];
    sentiment: "negative" | "positive";
  };
}

const comparisonData: { scenario: string; description: string; without: ComparisonSide; with: ComparisonSide } = {
  scenario: "Inside a Modern Supply Network",
  description:
    "A global manufacturer operates across 19 production sites, 520 suppliers, and 5 distribution centers. Every day, demand shifts, suppliers delay, capacity fluctuates, and new partners enter the network.",
  without: {
    title: "Traditional Operating Model",
    steps: [
      { icon: FileSpreadsheet, text: "Demand increase handled by separate planning team", tooltip: "Planning operates in silos, reacting to signals days after they occur." },
      { icon: Eye, text: "Supplier delay escalated via email and meetings", tooltip: "Manual escalation chains slow down response and fragment accountability." },
      { icon: BarChart3, text: "Production schedule adjusted manually", tooltip: "Planners reconcile spreadsheets across sites without real-time visibility." },
      { icon: RefreshCw, text: "Logistics re-optimizes routes independently", tooltip: "Transport planning operates detached from production and procurement decisions." },
      { icon: TrendingDown, text: "New supplier onboarding requires weeks of coordination", tooltip: "Qualification, compliance, and integration processes run sequentially across departments." },
      { icon: FileSpreadsheet, text: "Decisions made sequentially across departments", tooltip: "Each function optimizes locally, missing network-wide opportunities." },
    ],
    outcome: {
      title: "Outcome",
      points: [
        "Local optimizations instead of network optimization",
        "Slower response to change",
        "Capital inefficiencies",
        "High coordination overhead",
      ],
      sentiment: "negative",
    },
  },
  with: {
    title: "Autonomous Operating Model (Synapsio)",
    steps: [
      { icon: Activity, text: "AI continuously monitors demand, capacity, pricing, and risk", tooltip: "Thousands of signals ingested in real time across all network nodes." },
      { icon: Shield, text: "Supplier delays automatically re-simulated across network", tooltip: "Every disruption triggers instant scenario analysis across the full supply graph." },
      { icon: Gauge, text: "Production dynamically rebalanced across sites", tooltip: "Capacity allocation shifts automatically based on real-time constraints." },
      { icon: Zap, text: "Transport plans adjusted in real time", tooltip: "Logistics adapts continuously to production and demand changes." },
      { icon: Lock, text: "New suppliers integrated directly into optimization model", tooltip: "Onboarding feeds directly into the decision engine — no manual handoffs." },
      { icon: Brain, text: "Orders prioritized by margin, SLA, and risk exposure", tooltip: "Multi-objective optimization balances competing priorities autonomously." },
    ],
    outcome: {
      title: "Outcome",
      points: [
        "11% lower inventory exposure",
        "0% unplanned production interruptions",
        "18% faster response to network changes",
        "Coordinated, real-time autonomous execution",
      ],
      sentiment: "positive",
    },
  },
};

const StepItem = ({
  step,
  index,
  visible,
  side,
}: {
  step: ComparisonStep;
  index: number;
  visible: boolean;
  side: "left" | "right";
}) => {
  const isLeft = side === "left";
  const baseDelay = isLeft ? 0.4 : 0.5;
  const stepDelay = isLeft ? 0.15 : 0.1;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="flex items-start gap-4 cursor-default group"
            initial={{ opacity: 0, x: isLeft ? -10 : 10 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: baseDelay + index * stepDelay, duration: isLeft ? 0.5 : 0.35 }}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                isLeft
                  ? "bg-destructive/10 group-hover:bg-destructive/20"
                  : "bg-primary/15 group-hover:bg-primary/25"
              }`}
            >
              <step.icon className={`w-4 h-4 ${isLeft ? "text-destructive/70" : "text-primary"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${isLeft ? "text-foreground/80" : "text-foreground/90"}`}>{step.text}</p>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side={isLeft ? "right" : "left"} className="max-w-xs text-xs">
          {step.tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const OutcomeList = ({
  outcome,
  visible,
  delay,
}: {
  outcome: ComparisonSide["outcome"];
  visible: boolean;
  delay: number;
}) => {
  const isPositive = outcome.sentiment === "positive";
  return (
    <div className={`pt-6 border-t ${isPositive ? "border-primary/20" : "border-border/20"}`}>
      <p className={`text-xs uppercase tracking-wider mb-3 ${isPositive ? "text-primary/70" : "text-destructive/60"}`}>
        {outcome.title}
      </p>
      <ul className="space-y-2">
        {outcome.points.map((point, i) => (
          <motion.li
            key={i}
            className={`text-sm flex items-center gap-2 ${isPositive ? "text-primary" : "text-destructive/70"}`}
            initial={{ opacity: 0, y: 6 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: delay + i * 0.08, duration: 0.4 }}
          >
            {isPositive ? (
              <CheckCircle className="w-4 h-4 text-primary/70 flex-shrink-0" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-destructive/50 flex-shrink-0" />
            )}
            {point}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

const ProductSection = () => {
  const [comparisonVisible, setComparisonVisible] = useState(false);
  const comparisonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setComparisonVisible(true);
      },
      { threshold: 0.15 }
    );
    if (comparisonRef.current) observer.observe(comparisonRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-32 md:py-48">
      <AmbientGlow color="secondary" size="xl" intensity="medium" position="center" />
      <AmbientGlow color="primary" size="md" intensity="subtle" position="right" className="top-1/4" />
      <AmbientGlow color="accent" size="md" intensity="subtle" position="left" className="bottom-1/4" />

      <FeaturesSection />

      {/* Before/After Comparison */}
      <div className="relative z-10 container mx-auto px-8 lg:px-20 xl:px-28">
        <div ref={comparisonRef}>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-6">Real-World Operations</p>

          {/* Scenario Header */}
          <motion.div
            className={`mb-12 transition-all duration-1000 ${comparisonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h3 className="text-2xl md:text-3xl font-light text-foreground mb-3">{comparisonData.scenario}</h3>
            <p className="text-sm text-muted-foreground/60 max-w-3xl">{comparisonData.description}</p>
          </motion.div>

          {/* Side by Side Comparison */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Without Synapsio */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={comparisonVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <FloatingSurface elevation="low" className="rounded-2xl h-full">
                <GlassPanel intensity="subtle" bordered className="rounded-2xl p-8 h-full border-destructive/20">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-destructive" />
                    </div>
                    <h4 className="text-xl font-medium text-foreground">{comparisonData.without.title}</h4>
                  </div>

                  <div className="space-y-4 mb-8">
                    {comparisonData.without.steps.map((step, i) => (
                      <StepItem key={i} step={step} index={i} visible={comparisonVisible} side="left" />
                    ))}
                  </div>

                  <OutcomeList outcome={comparisonData.without.outcome} visible={comparisonVisible} delay={1.2} />
                </GlassPanel>
              </FloatingSurface>
            </motion.div>

            {/* With Synapsio */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={comparisonVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <FloatingSurface elevation="medium" glow glowColor="primary" className="rounded-2xl h-full">
                <GlassPanel intensity="medium" bordered className="rounded-2xl p-8 h-full border-primary/30">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="text-xl font-medium text-foreground">{comparisonData.with.title}</h4>
                  </div>

                  <div className="space-y-4 mb-8">
                    {comparisonData.with.steps.map((step, i) => (
                      <StepItem key={i} step={step} index={i} visible={comparisonVisible} side="right" />
                    ))}
                  </div>

                  <OutcomeList outcome={comparisonData.with.outcome} visible={comparisonVisible} delay={1.0} />
                </GlassPanel>
              </FloatingSurface>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ProductSection;
