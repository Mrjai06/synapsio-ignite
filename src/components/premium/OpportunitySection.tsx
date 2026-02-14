import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Layers, Zap, Check, X, ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { FloatingSurface, GlassPanel, AmbientGlow } from "./DepthSystem";
import sapLogo from "@/assets/logos/sap.png";
import odooLogo from "@/assets/logos/odoo.png";
import coupaLogo from "@/assets/logos/coupa.png";
import tactoLogo from "@/assets/logos/tacto.png";
import jaggaerLogo from "@/assets/logos/jaggaer.png";

const companyLogos: Record<string, string> = {
  SAP: sapLogo,
  Odoo: odooLogo,
  Coupa: coupaLogo,
  Tacto: tactoLogo,
  Jaggaer: jaggaerLogo,
};

// Market Opportunity Data (Pyramid)
const marketLayers = [
  { 
    id: "tam", 
    label: "TAM", 
    title: "Global AI-powered supply-chain market",
    value: "$50B+",
    description: "Revenue potential",
    opportunityPoints: [
      {
        category: "Global AI demand",
        points: [
          "Enterprise AI spending projected to exceed $500B by 2028",
          "Supply chain digitization is the largest untapped vertical",
          "Every Fortune 500 company is actively investing in AI-driven operations"
        ]
      },
      {
        category: "Market dynamics",
        points: [
          "Legacy systems create $50B+ replacement opportunity",
          "Cross-border complexity drives demand for intelligent orchestration"
        ]
      }
    ]
  },
  { 
    id: "sam", 
    label: "SAM", 
    title: "Initial target market (EU)",
    value: "$7B-20B",
    description: "Revenue potential",
    opportunityPoints: [
      {
        category: "European advantage",
        points: [
          "EU regulatory environment (CSRD, CBAM) demands supply chain transparency",
          "Strong manufacturing base with complex multi-tier supplier networks",
          "Underserved by US-centric AI platforms — localization gap"
        ]
      },
      {
        category: "Adoption readiness",
        points: [
          "70% of EU enterprises plan AI integration in supply chain by 2027"
        ]
      }
    ]
  },
  { 
    id: "som", 
    label: "SOM", 
    title: "Local market (DACH)",
    value: "$25-60M",
    description: "5 Year revenue potential: ARR",
    opportunityPoints: [
      {
        category: "Focused entry",
        points: [
          "DACH combines industrial density, logistics leadership, and early AI adoption"
        ]
      },
      {
        category: "AI momentum",
        points: [
          "Supply chain spend on AI is growing with a ~35% CAGR increase",
          "Shifting from pilots to core infrastructure in various industries",
          "Operational budgets reallocating from legacy tools into AI platforms"
        ]
      },
      {
        category: "Global scalability",
        points: [
          "Asset-light SaaS model enables global expansion without proportional cost growth"
        ]
      }
    ]
  }
];

// Why Now Data
const whyNowData = {
  technology: [
    "SMEs can now access enterprise-grade AI capabilities at low cost",
    "AI has reached production-level reliability for operational automation",
    "Significant advances in model stability, infrastructure and tooling"
  ],
  technologyHighlight: "Foundation model performance doubled in the last 3 years",
  technologySource: "Stanford AI Index, 2025",
  
  shift: [
    "SCM-Budgets are shifting toward AI-Based Solutions",
    "Early Platforms move toward AI-native architectures"
  ],
  shiftHighlight: "Global AI spend in supply chain expected to grow >35% CAGR until 2030",
  shiftSource: "Gartner, IDC, 2025",
  
  pressure: [
    "Increasing operational complexity in global supply chains",
    "Geopolitical disruptions and rising supplier risk lead to fragmented supply chains",
    "Strong cost pressure and margin compression for SMEs"
  ],
  pressureHighlight: "63% of businesses report higher-than-expected losses",
  pressureSource: "WTW, 2025"
};

// (marketGrowthData kept for reference but slope chart uses slopeSegments directly)

// Competition Data
const competitionTable = {
  headers: ["Feature", "ERP-Systems", "SCM-Tools", "Synapsio"],
  rows: [
    { feature: "Automation", values: ["Low", "Medium", "High"] },
    { feature: "AI-native", values: ["No", "Partially", "Yes"] },
    { feature: "Marketplace", values: ["No", "No", "Yes"] },
    { feature: "SME Focus", values: ["Medium", "Low", "High"] },
    { feature: "End-to-End", values: ["Partial", "Partial", "Yes"] },
    { feature: "Autonomous", values: ["No", "No", "Yes"] }
  ]
};

// Market Landscape Data
const marketLandscapeSystems = [
  {
    id: "erp",
    systemType: "ERP Systems",
    description: "Enterprise Resource Planning solutions focused on internal operations",
    businesses: [
      {
        name: "SAP",
        facts: [
          "Market leader with 24% global ERP market share",
          "Strong internal planning and accounting capabilities",
          "Long implementation cycles (12-24+ months)",
          "High total cost of ownership"
        ],
        arguments: [
          "Limited automation and flexibility for SMEs",
          "No cross-company intelligence or marketplace",
          "Closed ecosystem with proprietary integrations"
        ]
      },
      {
        name: "Odoo",
        facts: [
          "Open-source ERP with modular architecture",
          "Lower cost of entry for SMEs",
          "Growing community and marketplace"
        ],
        arguments: [
          "Limited AI-native capabilities",
          "Requires significant customization",
          "No autonomous execution features"
        ]
      }
    ]
  },
  {
    id: "scm",
    systemType: "SCM Software",
    description: "Supply Chain Management platforms focused on procurement and logistics",
    businesses: [
      {
        name: "Coupa",
        facts: [
          "Leader in Business Spend Management (BSM)",
          "Strong procurement and invoice automation",
          "AI-forward platform with analytics"
        ],
        arguments: [
          "Limited autonomy and closed ecosystem",
          "Human-driven approval workflows",
          "Focus on spend management over full SCM"
        ]
      },
      {
        name: "Tacto",
        facts: [
          "German-based SME-focused platform",
          "Strong supplier management features",
          "Growing AI capabilities"
        ],
        arguments: [
          "Limited marketplace liquidity",
          "Regional focus limits supplier network",
          "Partial end-to-end coverage"
        ]
      },
      {
        name: "Jaggaer",
        facts: [
          "Enterprise procurement platform",
          "Process optimization and analytics",
          "Established supplier network"
        ],
        arguments: [
          "Complex implementation requirements",
          "Limited SME focus",
          "Traditional human-driven workflows"
        ]
      }
    ]
  }
];

// Business Model Data
const tiers = [
  {
    icon: Building2,
    name: "Enterprise",
    price: "$150K",
    period: "/year",
    description: "Full platform access with dedicated support",
    features: ["Unlimited users", "All integrations", "Custom workflows", "24/7 support", "SLA guarantee"]
  },
  {
    icon: Layers,
    name: "Platform",
    price: "$75K",
    period: "/year",
    description: "Core SCM capabilities for mid-market",
    features: ["Up to 50 users", "Standard integrations", "Pre-built templates", "Business hours support"]
  },
  {
    icon: Zap,
    name: "Usage-Based",
    price: "$0.02",
    period: "/transaction",
    description: "Pay only for what you use",
    features: ["Unlimited users", "API access", "Basic support", "Self-service"]
  }
];

// Traditional Pyramid Component with rounded edges
const MarketPyramid = ({ activeLayer, onLayerClick }: { activeLayer: string; onLayerClick: (id: string) => void }) => {
  const xAt = (y: number) => {
    const t = (y - 30) / 280;
    const halfW = t * 160;
    return { left: 200 - halfW, right: 200 + halfW };
  };

  const gap = 6;
  const layers = [
    { id: "som", y1: 30, y2: 120 },
    { id: "sam", y1: 120 + gap, y2: 210 },
    { id: "tam", y1: 210 + gap, y2: 310 },
  ];

  const buildPath = (y1: number, y2: number, isTop: boolean) => {
    const bot = xAt(y2);
    const r = 5;

    if (isTop) {
      const apex = { x: 200, y: y1 };
      const bl = { x: bot.left, y: y2 };
      const br = { x: bot.right, y: y2 };
      return `
        M ${apex.x} ${apex.y}
        L ${br.x - r * 0.3} ${br.y - r * 0.5}
        Q ${br.x} ${br.y}, ${br.x - r} ${br.y}
        L ${bl.x + r} ${bl.y}
        Q ${bl.x} ${bl.y}, ${bl.x + r * 0.3} ${bl.y - r * 0.5}
        Z
      `;
    }
    const top = xAt(y1);
    const tl = { x: top.left, y: y1 };
    const tr = { x: top.right, y: y1 };
    const bl = { x: bot.left, y: y2 };
    const br = { x: bot.right, y: y2 };
    return `
      M ${tl.x} ${tl.y}
      L ${tr.x} ${tr.y}
      L ${br.x - r * 0.3} ${br.y - r * 0.5}
      Q ${br.x} ${br.y}, ${br.x - r} ${br.y}
      L ${bl.x + r} ${bl.y}
      Q ${bl.x} ${bl.y}, ${bl.x + r * 0.3} ${bl.y - r * 0.5}
      Z
    `;
  };

  return (
    <svg viewBox="0 0 400 340" className="w-full max-w-xl mx-auto">
      <defs>
        <linearGradient id="pyramidFillActive" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
        </linearGradient>
        <filter id="pyramidGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {layers.map((layer, i) => {
        const isActive = activeLayer === layer.id;
        const isTop = i === 0;
        const path = buildPath(layer.y1, layer.y2, isTop);
        const labelY = (layer.y1 + layer.y2) / 2 + (isTop ? 4 : 0);

        return (
          <motion.g
            key={layer.id}
            onClick={() => onLayerClick(layer.id)}
            className="cursor-pointer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.12 }}
            whileHover={{ scale: 1.012 }}
            style={{ transformOrigin: "200px 170px" }}
          >
            <motion.path
              d={path}
              fill={isActive ? "url(#pyramidFillActive)" : `hsl(var(--secondary) / ${0.12 + i * 0.1})`}
              stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--border) / 0.35)"}
              strokeWidth={isActive ? 1.5 : 0.7}
              className="transition-all duration-500"
              filter={isActive ? "url(#pyramidGlow)" : undefined}
            />
            <text
              x={200}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="central"
              className={`text-sm font-medium transition-all duration-300 ${isActive ? "fill-primary" : "fill-muted-foreground/45"}`}
            >
              {layer.id.toUpperCase()}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
};

// ====== RADIAL GROWTH BANDS ======

const radialSegments = [
  { label: "AI-SCM (Germany)", color: "hsl(var(--foreground))", values: [0.67, 1.94], isHighlight: true },
  { label: "SCM (Germany)", color: "hsl(var(--muted-foreground) / 0.4)", values: [6.42, 3.45], isHighlight: false },
  { label: "AI-SCM (Global)", color: "hsl(var(--primary) / 0.7)", values: [15.27, 48.51], isHighlight: false },
  { label: "SCM (Global)", color: "hsl(var(--secondary) / 0.5)", values: [77.64, 46.11], isHighlight: false },
];

const RadialGrowthBands = ({ whyNowVisible }: { whyNowVisible: boolean }) => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const cx = 220;
  const cy = 220;
  const maxVal = Math.max(...radialSegments.flatMap(s => s.values));
  const minRadius = 45;
  const maxRadius = 185;

  const valToR = (val: number) => minRadius + (val / maxVal) * (maxRadius - minRadius);

  const segCount = radialSegments.length;
  const gapAngle = 4;
  const sliceAngle = (360 - gapAngle * segCount) / segCount;

  const describeArc = (startAngle: number, endAngle: number, innerR: number, outerR: number) => {
    const toRad = (a: number) => ((a - 90) * Math.PI) / 180;
    const s1 = toRad(startAngle);
    const e1 = toRad(endAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    const outerStart = { x: cx + outerR * Math.cos(s1), y: cy + outerR * Math.sin(s1) };
    const outerEnd = { x: cx + outerR * Math.cos(e1), y: cy + outerR * Math.sin(e1) };
    const innerStart = { x: cx + innerR * Math.cos(e1), y: cy + innerR * Math.sin(e1) };
    const innerEnd = { x: cx + innerR * Math.cos(s1), y: cy + innerR * Math.sin(s1) };

    return [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerStart.x} ${innerStart.y}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
      `Z`,
    ].join(" ");
  };

  const selectedSegment = activeSegment !== null ? {
    label: radialSegments[activeSegment].label,
    val2023: radialSegments[activeSegment].values[0],
    val2029: radialSegments[activeSegment].values[1],
    growth: ((radialSegments[activeSegment].values[1] - radialSegments[activeSegment].values[0]) / radialSegments[activeSegment].values[0]) * 100,
    abs: radialSegments[activeSegment].values[1] - radialSegments[activeSegment].values[0],
  } : null;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 440 440" className="w-full max-w-[440px]" onClick={() => setActiveSegment(null)}>
            <defs>
              <filter id="bandGlowOuter">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feFlood floodColor="hsl(var(--foreground))" floodOpacity="0.12" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Guide rings */}
            {[0.25, 0.5, 0.75, 1].map((frac, i) => (
              <circle key={i} cx={cx} cy={cy} r={minRadius + frac * (maxRadius - minRadius)} fill="none" stroke="hsl(var(--border) / 0.07)" strokeWidth="0.5" />
            ))}

            <circle cx={cx} cy={cy} r="3" fill="hsl(var(--muted-foreground) / 0.12)" />

            {radialSegments.map((seg, i) => {
              const startAngle = i * (sliceAngle + gapAngle);
              const endAngle = startAngle + sliceAngle;

              const r2023 = valToR(seg.values[0]);
              const r2029 = valToR(seg.values[1]);
              const innerR = Math.min(r2023, r2029);
              const outerR = Math.max(r2023, r2029);
              const effectiveInnerR = Math.max(minRadius, innerR);
              const effectiveOuterR = Math.max(effectiveInnerR + 6, outerR);

              const isActive = activeSegment === i;
              const isOther = activeSegment !== null && activeSegment !== i;
              const isGrowing = seg.values[1] > seg.values[0];

              const midAngle = (startAngle + endAngle) / 2;
              const labelR = effectiveOuterR + 18;
              const labelRad = ((midAngle - 90) * Math.PI) / 180;
              const labelX = cx + labelR * Math.cos(labelRad);
              const labelY = cy + labelR * Math.sin(labelRad);

              const baselineR = r2023;
              const baselinePath = describeArc(startAngle, endAngle, Math.max(minRadius, baselineR - 1.5), baselineR);

              return (
                <motion.g key={i}>
                  <motion.path
                    d={describeArc(startAngle, endAngle, effectiveInnerR, effectiveOuterR)}
                    fill={seg.color}
                    className="cursor-pointer"
                    filter={seg.isHighlight && !isOther ? "url(#bandGlowOuter)" : undefined}
                    animate={{ opacity: isOther ? 0.1 : isActive ? 1 : 0.6, scale: isActive ? 1.02 : 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                    onClick={(e) => { e.stopPropagation(); setActiveSegment(isActive ? null : i); }}
                    whileHover={{ opacity: 0.85 }}
                  />

                  <motion.path
                    d={baselinePath}
                    fill="none"
                    stroke={isGrowing ? "hsl(var(--foreground) / 0.2)" : "hsl(var(--destructive) / 0.25)"}
                    strokeWidth="0.8"
                    strokeDasharray="3 3"
                    className="pointer-events-none"
                    animate={{ opacity: isOther ? 0.04 : 0.45 }}
                  />

                  <path
                    d={describeArc(startAngle - 3, endAngle + 3, Math.max(minRadius - 12, 18), effectiveOuterR + 22)}
                    fill="transparent"
                    className="cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); setActiveSegment(isActive ? null : i); }}
                  />

                  <motion.text
                    x={labelX} y={labelY}
                    textAnchor="middle" dominantBaseline="central"
                    className={`pointer-events-none select-none text-[9px] ${seg.isHighlight ? "fill-foreground/70 font-medium" : "fill-muted-foreground/30"}`}
                    animate={{ opacity: isOther ? 0.06 : 0.75 }}
                  >
                    {seg.label.split(" (")[0]}
                  </motion.text>
                </motion.g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap gap-5 justify-center mt-4">
            {radialSegments.map((seg, i) => {
              const isGrowing = seg.values[1] > seg.values[0];
              return (
                <button
                  key={i}
                  className={`flex items-center gap-2 transition-all duration-300 group ${activeSegment !== null && activeSegment !== i ? "opacity-25" : "opacity-100"} hover:opacity-100`}
                  onClick={() => setActiveSegment(activeSegment === i ? null : i)}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-transform duration-200 ${activeSegment === i ? "scale-125" : "group-hover:scale-110"}`}
                    style={{ background: seg.color, boxShadow: seg.isHighlight ? "0 0 6px hsl(var(--foreground) / 0.25)" : "none" }}
                  />
                  <span className={`text-[10px] transition-colors duration-200 ${activeSegment === i ? "text-foreground/75" : "text-muted-foreground/35 group-hover:text-muted-foreground/55"}`}>
                    {seg.label}
                  </span>
                  <span className={`text-[9px] ${isGrowing ? "text-primary/40" : "text-destructive/35"}`}>
                    {isGrowing ? "↑" : "↓"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-6 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-0.5 border-t border-dashed border-muted-foreground/25" />
              <span className="text-[8px] text-muted-foreground/25">2023/24 baseline</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-2.5 rounded-sm bg-muted-foreground/12" />
              <span className="text-[8px] text-muted-foreground/25">Band = shift</span>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="flex flex-col gap-6 lg:pt-8">
          <AnimatePresence mode="wait">
            {selectedSegment ? (
              <motion.div
                key={activeSegment}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3 }}
              >
                <GlassPanel intensity="subtle" bordered className="p-6 rounded-xl">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: radialSegments[activeSegment!].color, boxShadow: radialSegments[activeSegment!].isHighlight ? "0 0 6px hsl(var(--foreground) / 0.25)" : "none" }} />
                    <p className="text-xs text-foreground/65 font-medium">{selectedSegment.label}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground/40">2023/24</span>
                      <span className="text-sm font-light text-foreground/55">{selectedSegment.val2023.toFixed(2)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground/40">2029/30</span>
                      <span className="text-sm font-light text-foreground">{selectedSegment.val2029.toFixed(2)}%</span>
                    </div>
                    <div className="h-px bg-border/12 my-1" />
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground/40">Abs. change</span>
                      <span className={`text-sm font-medium ${selectedSegment.abs >= 0 ? "text-primary" : "text-destructive/65"}`}>
                        {selectedSegment.abs >= 0 ? "+" : ""}{selectedSegment.abs.toFixed(2)}pp
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground/40">Rel. growth</span>
                      <span className={`text-sm font-semibold ${selectedSegment.growth >= 0 ? "text-primary" : "text-destructive/65"}`}>
                        {selectedSegment.growth >= 0 ? "↑" : "↓"} {Math.abs(selectedSegment.growth).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GlassPanel intensity="subtle" bordered className="p-6 rounded-xl">
                  <p className="text-xs text-muted-foreground/25 text-center py-4">Select a segment to compare</p>
                </GlassPanel>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
// Why Now Carousel Component
const whyNowCards = [
  { key: "technology", title: "Technology", dataKey: "technology" as const, highlightKey: "technologyHighlight" as const, sourceKey: "technologySource" as const },
  { key: "shift", title: "Shift / Future", dataKey: "shift" as const, highlightKey: "shiftHighlight" as const, sourceKey: "shiftSource" as const },
  { key: "pressure", title: "Market Pressure", dataKey: "pressure" as const, highlightKey: "pressureHighlight" as const, sourceKey: "pressureSource" as const },
];

const WhyNowCarousel = ({ whyNowData: data, whyNowVisible }: { whyNowData: typeof whyNowData; whyNowVisible: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => { setDirection(1); setCurrentIndex((p) => (p + 1) % whyNowCards.length); };
  const prev = () => { setDirection(-1); setCurrentIndex((p) => (p - 1 + whyNowCards.length) % whyNowCards.length); };

  const card = whyNowCards[currentIndex];
  const points = data[card.dataKey] as string[];
  const highlight = data[card.highlightKey] as string;
  const source = data[card.sourceKey] as string;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={whyNowVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
      <div className="max-w-2xl mx-auto">
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div key={card.key} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: [0.23, 0.86, 0.39, 0.96] }}>
              <GlassPanel intensity="subtle" bordered className="p-8 md:p-10 rounded-xl">
                <h4 className="text-foreground text-base font-medium mb-6">{card.title}</h4>
                <ul className="space-y-3 mb-6">
                  {points.map((point, i) => (
                    <li key={i} className="text-sm text-muted-foreground/70 flex items-start gap-3">
                      <span className="text-muted-foreground/40 mt-0.5">–</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="text-xs">
                  <span className="text-primary">{highlight}</span>
                  <span className="text-muted-foreground/40 ml-2">({source})</span>
                </p>
              </GlassPanel>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button onClick={prev} aria-label="Previous" className="p-2.5 rounded-full border border-border/20 text-muted-foreground/50 hover:text-foreground hover:border-border/40 hover:bg-card/30 transition-all duration-300">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            {whyNowCards.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"}`}
                aria-label={`Go to ${whyNowCards[i].title}`} />
            ))}
          </div>
          <button onClick={next} aria-label="Next" className="p-2.5 rounded-full border border-border/20 text-muted-foreground/50 hover:text-foreground hover:border-border/40 hover:bg-card/30 transition-all duration-300">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <motion.p className="text-sm text-muted-foreground/70 text-center mt-8" initial={{ opacity: 0 }} animate={whyNowVisible ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
          AI is becoming the dominating operating system of supply chains by 2030 – <span className="text-primary">Now is the time to act!</span>
        </motion.p>
      </div>
    </motion.div>
  );
};

const OpportunitySection = () => {
  const [activeLayer, setActiveLayer] = useState("som");
  const [headerVisible, setHeaderVisible] = useState(false);
  const [marketVisible, setMarketVisible] = useState(false);
  const [whyNowVisible, setWhyNowVisible] = useState(false);
  const [competitionVisible, setCompetitionVisible] = useState(false);
  const [landscapeVisible, setLandscapeVisible] = useState(false);
  const [businessVisible, setBusinessVisible] = useState(false);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const whyNowRef = useRef<HTMLDivElement>(null);
  const competitionRef = useRef<HTMLDivElement>(null);
  const landscapeRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createObserver = (ref: React.RefObject<HTMLDivElement>, setter: (v: boolean) => void, threshold = 0.2) => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setter(true); },
        { threshold }
      );
      if (ref.current) observer.observe(ref.current);
      return observer;
    };
    
    const observers = [
      createObserver(headerRef, setHeaderVisible, 0.3),
      createObserver(marketRef, setMarketVisible),
      createObserver(whyNowRef, setWhyNowVisible),
      createObserver(competitionRef, setCompetitionVisible),
      createObserver(landscapeRef, setLandscapeVisible),
      createObserver(businessRef, setBusinessVisible)
    ];
    
    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const activeMarketData = marketLayers.find(l => l.id === activeLayer);

  return (
    <section className="relative py-32 md:py-48">
      <AmbientGlow color="secondary" size="xl" intensity="medium" position="center" />
      <AmbientGlow color="primary" size="md" intensity="subtle" position="right" className="top-1/4" />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-20 xl:px-28">
        {/* Section header */}
        <div ref={headerRef} className="max-w-2xl mb-28 md:mb-36">
          <p className={`text-[10px] tracking-[0.4em] uppercase text-primary/50 mb-10 transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Opportunity
          </p>
          <h2 
            className={`text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-[-0.02em] mb-12 leading-[1.08] transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="text-foreground">A market ready</span>
            <br />
            <span className="text-muted-foreground/30">for transformation</span>
          </h2>
        </div>
        
        {/* === MARKET OPPORTUNITY === */}
        <div ref={marketRef} className="mb-40 md:mb-56">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-16">
            Market Opportunity
          </p>
          
          <div className={`grid lg:grid-cols-2 gap-16 transition-all duration-1000 ${marketVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Pyramid */}
            <div>
              <MarketPyramid activeLayer={activeLayer} onLayerClick={setActiveLayer} />
              
              <AnimatePresence mode="wait">
                {activeMarketData && (
                  <motion.div
                    key={activeMarketData.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-8 text-center"
                  >
                    <GlassPanel intensity="subtle" bordered className="inline-block px-6 py-4 rounded-xl">
                      <p className="text-xs text-primary mb-1">• {activeMarketData.title}</p>
                      <p className="text-xs text-muted-foreground/60">• {activeMarketData.description}: <span className="text-foreground font-medium">{activeMarketData.value}</span></p>
                    </GlassPanel>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Opportunity points */}
            <div>
              <AnimatePresence mode="wait">
                {activeMarketData && (
                  <motion.div
                    key={activeMarketData.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-light text-foreground mb-2">
                      <span className="text-primary">{activeMarketData.label}</span> Opportunity
                    </h3>
                    <p className="text-xs text-muted-foreground/40 mb-6">
                      {activeMarketData.title}
                    </p>
                    <div className="space-y-4">
                      {activeMarketData.opportunityPoints.map((section: { category: string; points: string[] }, i: number) => (
                        <motion.div
                          key={section.category}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.08 }}
                        >
                          <GlassPanel intensity="subtle" bordered className="rounded-xl p-5">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60 mb-3">
                              {section.category}
                            </p>
                            <ul className="space-y-2.5">
                              {section.points.map((point: string, j: number) => (
                                <li key={j} className="text-sm text-muted-foreground/70 flex items-start gap-3">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0 mt-1.5" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </GlassPanel>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* === WHY NOW === */}
        <div ref={whyNowRef} className="mb-40 md:mb-56">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-6">
            Why now – AI as the operating system of supply-chains
          </p>
          <h3 className={`text-2xl md:text-3xl font-light text-foreground/80 mb-16 transition-all duration-1000 ${whyNowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Structural Shift in Supply Chain Technology Spend
          </h3>
          
          <div className={`transition-all duration-1000 ${whyNowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Slope chart */}
            <div className="max-w-5xl mx-auto mb-16">
              <GlassPanel intensity="subtle" bordered className="p-10 md:p-14 rounded-xl">
                <RadialGrowthBands whyNowVisible={whyNowVisible} />
              </GlassPanel>
            </div>
            
            {/* Carousel cards */}
            <WhyNowCarousel whyNowData={whyNowData} whyNowVisible={whyNowVisible} />
          </div>
        </div>
        
        {/* === COMPETITION === */}
        <div ref={competitionRef} className="mb-40 md:mb-56">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-16">
            Competition
          </p>
          
          <div className={`max-w-3xl mx-auto transition-all duration-1000 ${competitionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={competitionVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <GlassPanel intensity="subtle" bordered className="p-8 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30">
                      {competitionTable.headers.map((header, i) => (
                        <th 
                          key={header} 
                          className={`py-4 px-4 text-left text-sm font-medium ${i === 3 ? "text-primary" : "text-muted-foreground/60"}`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {competitionTable.rows.map((row, rowIndex) => (
                      <motion.tr 
                        key={row.feature}
                        className="border-b border-border/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={competitionVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 + rowIndex * 0.08 }}
                      >
                        <td className="py-4 px-4 text-sm text-foreground">{row.feature}</td>
                        {row.values.map((value, i) => (
                          <td key={i} className={`py-4 px-4 text-sm ${i === 2 ? "text-primary" : "text-muted-foreground/60"}`}>
                            {value === "Yes" ? (
                              <Check className="w-5 h-5 text-primary" />
                            ) : value === "No" ? (
                              <X className="w-5 h-5 text-destructive/50" />
                            ) : (
                              value
                            )}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </GlassPanel>
              
              <motion.p
                className="mt-8 text-sm text-foreground/80 text-center"
                initial={{ opacity: 0 }}
                animate={competitionVisible ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                Synapsio combines marketplace liquidity, autonomous execution and AI-native orchestration in <span className="text-primary">one platform</span>
              </motion.p>
            </motion.div>
          </div>
        </div>
        
        {/* === MARKET LANDSCAPE === */}
        <div ref={landscapeRef} className="mb-40 md:mb-56">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-16">
            Market Landscape
          </p>
          
          <div className={`max-w-3xl mx-auto transition-all duration-1000 ${landscapeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={landscapeVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <AnimatedTabs
                tabs={marketLandscapeSystems.flatMap((system) =>
                  system.businesses.map((business) => ({
                    id: `${system.id}-${business.name.toLowerCase()}`,
                    label: business.name,
                    content: (
                      <GlassPanel intensity="subtle" bordered className="rounded-xl p-6 md:p-8 relative">
                        {companyLogos[business.name] && (
                          <img
                            src={companyLogos[business.name]}
                            alt={`${business.name} logo`}
                            className="absolute top-4 right-4 w-8 h-8 object-contain rounded-md opacity-60"
                          />
                        )}
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/40 px-3 py-1 rounded-full border border-border/20 bg-secondary/20">
                            {system.systemType}
                          </span>
                        </div>
                        
                        <h4 className="text-xl font-medium text-primary mb-1">{business.name}</h4>
                        <p className="text-xs text-muted-foreground/40 mb-6">{system.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground/40 mb-3">Facts</p>
                            <ul className="space-y-2">
                              {business.facts.map((fact, i) => (
                                <li key={i} className="text-xs text-muted-foreground/60 flex items-start gap-2">
                                  <span className="text-primary/60 mt-0.5">•</span>
                                  {fact}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground/40 mb-3">Arguments</p>
                            <ul className="space-y-2">
                              {business.arguments.map((arg, i) => (
                                <li key={i} className="text-xs text-muted-foreground/60 flex items-start gap-2">
                                  <span className="text-destructive/60 mt-0.5">-</span>
                                  {arg}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </GlassPanel>
                    ),
                  }))
                )}
                defaultTab="erp-sap"
              />
            </motion.div>
          </div>
        </div>
        
        {/* === BUSINESS MODEL === */}
        <div ref={businessRef}>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-12">
            Business Model
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier, index) => (
              <FloatingSurface 
                key={index}
                elevation={index === 0 ? "medium" : "low"}
                glow={index === 0}
                glowColor="primary"
                className={`rounded-2xl transition-all duration-1000 ${businessVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <GlassPanel 
                  intensity={index === 0 ? "medium" : "subtle"} 
                  bordered 
                  className={`rounded-2xl p-8 h-full ${index === 0 ? "border-primary/20" : ""}`}
                >
                  <tier.icon className="w-10 h-10 text-primary mb-6" />
                  <h4 className="text-xl font-medium text-foreground mb-2">{tier.name}</h4>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-3xl font-light text-foreground">{tier.price}</span>
                    <span className="text-muted-foreground/50 text-sm">{tier.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground/50 mb-6">{tier.description}</p>
                  <ul className="space-y-2">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="text-sm text-muted-foreground/40 flex items-center gap-3">
                        <span className="w-1 h-1 rounded-full bg-primary/50" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </GlassPanel>
              </FloatingSurface>
            ))}
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

export default OpportunitySection;
