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
  scenario: "Protecting Margins During Global Price Shocks",
  description:
    "A global manufacturer sources critical components from multiple suppliers across regions. Sudden raw material price increases, currency fluctuations, and supplier price adjustments threaten margins — without causing a visible operational crisis.",
  without: {
    title: "Without Synapsio",
    steps: [
      { icon: FileSpreadsheet, text: "Price changes received via emails and supplier portals", tooltip: "Fragmented information across dozens of inboxes and platforms delays awareness." },
      { icon: Eye, text: "Manual contract and pricing review by procurement teams", tooltip: "Teams spend days cross-referencing contracts, often missing critical clauses." },
      { icon: BarChart3, text: "Excel-based scenario simulations across suppliers", tooltip: "Static models can't capture real-time market dynamics or supplier interdependencies." },
      { icon: RefreshCw, text: "Limited visibility into alternative supplier capacity", tooltip: "Without live data, switching suppliers is guesswork — not strategy." },
      { icon: TrendingDown, text: "No real-time optimization across price, risk, and lead time", tooltip: "Decisions are sequential and siloed, leaving margin on the table." },
    ],
    outcome: {
      title: "Outcome",
      points: [
        "6–9% margin erosion",
        "Slow response to market shifts",
        "Missed optimization opportunities",
        "Decisions dependent on human coordination",
      ],
      sentiment: "negative",
    },
  },
  with: {
    title: "With Synapsio",
    steps: [
      { icon: Activity, text: "AI continuously monitors price, demand, and capacity signals", tooltip: "Thousands of data points ingested in real time from markets, suppliers, and logistics." },
      { icon: Shield, text: "Contracts, supplier risk, and logistics data evaluated automatically", tooltip: "Every variable — from payment terms to geopolitical risk — is scored and weighted." },
      { icon: Gauge, text: "47 sourcing scenarios simulated in real time", tooltip: "Parallel simulations evaluate cost, risk, lead time, and quality trade-offs instantly." },
      { icon: Zap, text: "Orders dynamically rebalanced across suppliers", tooltip: "Allocation shifts automatically to the optimal supplier mix as conditions change." },
      { icon: Lock, text: "AI locks optimal conditions before price escalation spreads", tooltip: "Autonomous execution secures the best terms before competitors can react." },
    ],
    outcome: {
      title: "Outcome",
      points: [
        "4.2% cost reduction despite price shock",
        "0% supply disruption",
        "Margins stabilized automatically",
        "Decisions executed without human intervention",
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
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-6">Real-World Example</p>

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

      {/* Morphing transition */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
    </section>
  );
};

export default ProductSection;
