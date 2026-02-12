import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Layers, Zap, Check, X, ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { FloatingSurface, GlassPanel, AmbientGlow } from "./DepthSystem";

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

const marketGrowthData = {
  years: ["2023/24", "2029/2030"],
  segments: [
    { label: "AI-SCM-solution spend | Germany", color: "muted", values: [0.67, 1.94] },
    { label: "SCM-solution spend | Germany", color: "muted-foreground", values: [6.42, 3.45] },
    { label: "AI-SCM-solution spend | Global", color: "primary", values: [15.27, 48.51] },
    { label: "SCM-solution spend | Global", color: "secondary", values: [77.64, 46.11] }
  ]
};

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

// Market Landscape Data - Separate system types with individual businesses
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

// Traditional Pyramid Component
const MarketPyramid = ({ activeLayer, onLayerClick }: { activeLayer: string; onLayerClick: (id: string) => void }) => {
  // Mathematically aligned pyramid: single apex, consistent slope, uniform gaps
  // Apex at (200, 30), base corners at (40, 310) and (360, 310)
  // Slope: dx/dy = (200-40)/(310-30) = 160/280
  const xAt = (y: number) => {
    const t = (y - 30) / 280;
    const halfW = t * 160;
    return { left: 200 - halfW, right: 200 + halfW };
  };

  const gap = 6; // vertical gap between layers
  const layers = [
    { id: "som", y1: 30, y2: 120 },   // top ~32%
    { id: "sam", y1: 120 + gap, y2: 210 }, // mid ~32%
    { id: "tam", y1: 210 + gap, y2: 310 }, // base ~36%
  ];

  const buildPoints = (y1: number, y2: number, isTop: boolean) => {
    const top = xAt(y1);
    const bot = xAt(y2);
    if (isTop) return `${200},${y1} ${bot.right},${y2} ${bot.left},${y2}`;
    return `${top.left},${y1} ${top.right},${y1} ${bot.right},${y2} ${bot.left},${y2}`;
  };

  return (
    <svg viewBox="0 0 400 340" className="w-full max-w-xl mx-auto">
      <defs>
        <linearGradient id="pyramidFillActive" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {layers.map((layer, i) => {
        const isActive = activeLayer === layer.id;
        const isTop = i === 0;
        const points = buildPoints(layer.y1, layer.y2, isTop);
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
            <motion.polygon
              points={points}
              fill={isActive ? "url(#pyramidFillActive)" : `hsl(var(--secondary) / ${0.12 + i * 0.1})`}
              stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--border) / 0.35)"}
              strokeWidth={isActive ? 1.5 : 0.7}
              strokeLinejoin="round"
              className="transition-all duration-300"
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

// Segment labels for the concentric circles
const segmentLabels = [
  "AI-SCM-solution spend | Germany",
  "SCM-solution spend | Germany", 
  "AI-SCM-solution spend | Global",
  "SCM-solution spend | Global"
];

const segmentColors = [
  "hsl(var(--foreground))",              // AI-SCM Germany - bright white
  "hsl(var(--muted-foreground) / 0.7)",  // SCM Germany - visible gray
  "hsl(var(--primary))",                 // AI-SCM Global - full teal
  "hsl(var(--secondary) / 0.7)",         // SCM Global - bronze
];

// Pie chart slice path generator
const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
  const start = {
    x: cx + r * Math.cos(startAngle),
    y: cy + r * Math.sin(startAngle),
  };
  const end = {
    x: cx + r * Math.cos(endAngle),
    y: cy + r * Math.sin(endAngle),
  };
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
};

// Interactive pie chart for a single year
const GrowthPieChart = ({ year, values, activeSegment, onSegmentClick }: { 
  year: string; 
  values: number[]; 
  activeSegment: number | null;
  onSegmentClick: (idx: number | null) => void;
}) => {
  const cx = 200;
  const cy = 200;
  const r = 160;
  const total = values.reduce((sum, v) => sum + v, 0);

  // Build slices
  let currentAngle = -Math.PI / 2; // start from top
  const slices = values.map((val, idx) => {
    const sliceAngle = (val / total) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;
    
    // Label position at midpoint of arc
    const midAngle = startAngle + sliceAngle / 2;
    const labelR = r * 0.6;
    const labelX = cx + labelR * Math.cos(midAngle);
    const labelY = cy + labelR * Math.sin(midAngle);

    return { val, idx, startAngle, endAngle, color: segmentColors[idx], labelX, labelY, midAngle };
  });

  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-light text-foreground mb-6">{year}</p>
      <svg viewBox="0 0 400 400" className="w-full max-w-[280px] md:max-w-[320px]">
        {slices.map((slice, i) => {
          const isActive = activeSegment === slice.idx;
          const isOther = activeSegment !== null && activeSegment !== slice.idx;
          // Explode active slice outward
          const explode = isActive ? 8 : 0;
          const midAngle = slice.startAngle + (slice.endAngle - slice.startAngle) / 2;
          const dx = explode * Math.cos(midAngle);
          const dy = explode * Math.sin(midAngle);

            return (
            <motion.g key={slice.idx}>
              <motion.path
                d={describeArc(cx + dx, cy + dy, isActive ? r + 4 : r, slice.startAngle, slice.endAngle)}
                fill={slice.color}
                stroke="hsl(var(--background))"
                strokeWidth={3}
                className="cursor-pointer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: isOther ? 0.25 : 1,
                }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSegmentClick(isActive ? null : slice.idx);
                }}
                whileHover={{ scale: 1.05 }}
              />
              {/* Outer stroke highlight for small or active slices */}
              {(slice.val / total < 0.05 || isActive) && (
                <motion.path
                  d={describeArc(cx + dx, cy + dy, isActive ? r + 4 : r, slice.startAngle, slice.endAngle)}
                  fill="none"
                  stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.6)"}
                  strokeWidth={1.5}
                  className="pointer-events-none"
                  animate={{ opacity: isOther ? 0.1 : 1 }}
                />
              )}
              {/* Percentage label inside slice if large enough */}
              {slice.val / total > 0.08 && (
                <motion.text
                  x={slice.labelX + dx}
                  y={slice.labelY + dy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-foreground text-xs font-medium pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isOther ? 0.2 : 0.9 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  {slice.val.toFixed(1)}%
                </motion.text>
              )}
            </motion.g>
          );
        })}
        {/* Center label */}
        <text x={cx} y={cx} textAnchor="middle" dominantBaseline="central" className="fill-muted-foreground/40 text-xs font-light pointer-events-none">
          {total.toFixed(0)}%
        </text>
      </svg>
      {/* Active segment tooltip below */}
      <div className="h-16 flex items-start justify-center mt-2">
        <AnimatePresence mode="wait">
          {activeSegment !== null && (
            <motion.div
              key={activeSegment}
              className="text-center"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xl font-light text-primary">
                {values[activeSegment] === 48.51 
                  ? `${values[activeSegment].toFixed(2)}%, ~+35% CAGR` 
                  : `${values[activeSegment].toFixed(2)}%`}
              </p>
              <p className="text-xs text-muted-foreground/50 mt-1">{segmentLabels[activeSegment]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Wrapper component that holds shared state
const MarketGrowthComparison = ({ whyNowVisible }: { whyNowVisible: boolean }) => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  return (
    <div>
      <div className="grid grid-cols-2 gap-8 md:gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={whyNowVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <GrowthPieChart year="2023/24" values={[0.67, 6.42, 15.27, 77.64]} activeSegment={activeSegment} onSegmentClick={setActiveSegment} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={whyNowVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <GrowthPieChart year="2029/2030" values={[1.94, 3.45, 48.51, 46.11]} activeSegment={activeSegment} onSegmentClick={setActiveSegment} />
        </motion.div>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-5 justify-center mt-8 pt-6 border-t border-border/20">
        {segmentLabels.map((label, i) => (
          <button
            key={i}
            className={`flex items-center gap-2 transition-opacity duration-200 ${activeSegment !== null && activeSegment !== i ? "opacity-40" : "opacity-100"}`}
            onClick={() => setActiveSegment(activeSegment === i ? null : i)}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: segmentColors[i] }} />
            <span className="text-xs text-muted-foreground/60">{label}</span>
          </button>
        ))}
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

  // Observers
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
              
              {/* Active layer info */}
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
            
            {/* Opportunity points - per segment */}
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                {activeMarketData && (
                  <motion.div
                    key={activeMarketData.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl text-primary/80 mb-6">
                      {activeMarketData.label} Opportunity:
                    </h3>
                    {activeMarketData.opportunityPoints.map((section: { category: string; points: string[] }, i: number) => (
                      <motion.div
                        key={section.category}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        className="mb-6"
                      >
                        <h4 className="text-primary text-sm mb-3">{section.category}:</h4>
                        <ul className="space-y-2">
                          {section.points.map((point: string, j: number) => (
                            <li key={j} className="text-sm text-muted-foreground/60 flex items-start gap-3">
                              <span className="text-muted-foreground/40 mt-1">-</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* === WHY NOW === */}
        <div ref={whyNowRef} className="mb-40 md:mb-56">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-16">
            Why now – AI as the operating system of supply-chains
          </p>
          
          <div className={`transition-all duration-1000 ${whyNowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Pie charts - centered and larger */}
            <div className="max-w-3xl mx-auto mb-16">
              <GlassPanel intensity="subtle" bordered className="p-10 md:p-14 rounded-xl">
                <MarketGrowthComparison whyNowVisible={whyNowVisible} />
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
            {/* Comparison Table */}
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
              
              {/* Synapsio tagline */}
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
        
        {/* === MARKET LANDSCAPE (new subsection) === */}
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
                      <GlassPanel intensity="subtle" bordered className="rounded-xl p-6 md:p-8">
                        {/* Company type badge */}
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/40 px-3 py-1 rounded-full border border-border/20 bg-secondary/20">
                            {system.systemType}
                          </span>
                        </div>
                        
                        <h4 className="text-xl font-medium text-primary mb-1">{business.name}</h4>
                        <p className="text-xs text-muted-foreground/40 mb-6">{system.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Facts */}
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
                          
                          {/* Arguments */}
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
        
        {/* === BUSINESS MODEL (unchanged) === */}
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
