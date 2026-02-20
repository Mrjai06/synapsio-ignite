import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Layers, Zap, Check, X, ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { FloatingSurface, GlassPanel, AmbientGlow } from "./DepthSystem";
import sapLogo from "@/assets/logos/sap.png";
import odooLogo from "@/assets/logos/odoo.png";
import oracleLogo from "@/assets/logos/oracle.png";
import microsoftLogo from "@/assets/logos/microsoft.png";
import inforLogo from "@/assets/logos/infor.png";
import coupaLogo from "@/assets/logos/coupa.png";
import tactoLogo from "@/assets/logos/tacto.png";
import jaggaerLogo from "@/assets/logos/jaggaer.png";
import kinaxisLogo from "@/assets/logos/kinaxis.png";
import blueyonderLogo from "@/assets/logos/blueyonder.png";
import o9Logo from "@/assets/logos/o9.png";

const companyLogos: Record<string, string> = {
  SAP: sapLogo,
  Odoo: odooLogo,
  Oracle: oracleLogo,
  Microsoft: microsoftLogo,
  Infor: inforLogo,
  Coupa: coupaLogo,
  Tacto: tactoLogo,
  Jaggaer: jaggaerLogo,
  Kinaxis: kinaxisLogo,
  "Blue Yonder": blueyonderLogo,
  "o9 Solutions": o9Logo,
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
      },
      {
        name: "Oracle",
        facts: [
          "Comprehensive cloud ERP and SCM suite",
          "Strong in financials, manufacturing, and logistics",
          "Deep integration across Oracle Cloud applications"
        ],
        arguments: [
          "Complex and costly implementation",
          "Vendor lock-in with Oracle ecosystem",
          "Limited flexibility for SMEs"
        ]
      },
      {
        name: "Microsoft",
        facts: [
          "Dynamics 365 covers ERP, CRM, and supply chain",
          "Strong Azure cloud and AI integration",
          "Large partner ecosystem and enterprise adoption"
        ],
        arguments: [
          "Fragmented product suite across modules",
          "Limited autonomous supply chain capabilities",
          "Requires significant partner customization"
        ]
      },
      {
        name: "Infor",
        facts: [
          "Industry-specific cloud ERP solutions",
          "Strong in manufacturing and distribution verticals",
          "AI/ML capabilities via Coleman platform"
        ],
        arguments: [
          "Smaller ecosystem compared to SAP/Oracle",
          "Limited cross-company intelligence",
          "Niche focus limits broader SCM coverage"
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
  },
  {
    id: "planning",
    systemType: "Planning & Orchestration",
    description: "Advanced supply chain planning and decision intelligence platforms",
    businesses: [
      {
        name: "Kinaxis",
        facts: [
          "Leader in concurrent planning and S&OP",
          "Real-time scenario analysis capabilities",
          "Strong in complex multi-tier supply chains"
        ],
        arguments: [
          "High cost and long implementation timelines",
          "Planning-focused — limited execution capabilities",
          "No integrated marketplace or autonomous agents"
        ]
      },
      {
        name: "Blue Yonder",
        facts: [
          "End-to-end supply chain platform (Panasonic-backed)",
          "Strong demand forecasting and warehouse management",
          "Large enterprise customer base"
        ],
        arguments: [
          "Legacy architecture limits agility",
          "Slow AI adoption compared to cloud-native players",
          "Complex integration across modules"
        ]
      },
      {
        name: "o9 Solutions",
        facts: [
          "AI-native decision intelligence platform",
          "Strong integrated business planning capabilities",
          "Modern cloud architecture with knowledge graph"
        ],
        arguments: [
          "Enterprise-focused with high price point",
          "Limited SME accessibility",
          "No autonomous execution or marketplace layer"
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

// ====== STACKED AREA CHART ======

const areaSegments = [
  { key: "aiScmGermany", label: "AI-SCM (Germany)", color: "hsl(var(--foreground))", isHighlight: true },
  { key: "scmGermany", label: "SCM (Germany)", color: "hsl(var(--muted-foreground))" },
  { key: "aiScmGlobal", label: "AI-SCM (Global)", color: "hsl(var(--primary))" },
  { key: "scmGlobal", label: "SCM (Global)", color: "hsl(var(--secondary))" },
];

const stackedData = [
  { year: "2023", aiScmGermany: 0.67, scmGermany: 6.42, aiScmGlobal: 15.27, scmGlobal: 77.64 },
  { year: "2024", aiScmGermany: 0.85, scmGermany: 6.10, aiScmGlobal: 18.50, scmGlobal: 74.55 },
  { year: "2025", aiScmGermany: 1.00, scmGermany: 5.70, aiScmGlobal: 22.00, scmGlobal: 71.30 },
  { year: "2026", aiScmGermany: 1.18, scmGermany: 5.20, aiScmGlobal: 26.50, scmGlobal: 67.12 },
  { year: "2027", aiScmGermany: 1.38, scmGermany: 4.70, aiScmGlobal: 31.50, scmGlobal: 62.42 },
  { year: "2028", aiScmGermany: 1.58, scmGermany: 4.15, aiScmGlobal: 37.00, scmGlobal: 57.27 },
  { year: "2029", aiScmGermany: 1.78, scmGermany: 3.75, aiScmGlobal: 43.00, scmGlobal: 51.47 },
  { year: "2030", aiScmGermany: 1.94, scmGermany: 3.45, aiScmGlobal: 48.51, scmGlobal: 46.11 },
];

const StackedAreaChart = ({ whyNowVisible }: { whyNowVisible: boolean }) => {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);

  const selectedMeta = activeSegment ? areaSegments.find(s => s.key === activeSegment) : null;
  const selectedData = activeSegment ? {
    label: selectedMeta?.label || "",
    val2023: stackedData[0][activeSegment as keyof typeof stackedData[0]] as number,
    val2030: stackedData[stackedData.length - 1][activeSegment as keyof typeof stackedData[0]] as number,
  } : null;

  const growth = selectedData ? ((selectedData.val2030 - selectedData.val2023) / selectedData.val2023) * 100 : 0;
  const abs = selectedData ? selectedData.val2030 - selectedData.val2023 : 0;

  // SVG-based stacked area chart
  const width = 700;
  const height = 340;
  const padL = 48;
  const padR = 20;
  const padT = 20;
  const padB = 40;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;
  const n = stackedData.length;

  // Compute cumulative stacks (bottom to top: scmGlobal, aiScmGlobal, scmGermany, aiScmGermany)
  const stackOrder = ["scmGlobal", "aiScmGlobal", "scmGermany", "aiScmGermany"] as const;
  const cumulative = stackedData.map(d => {
    let cum = 0;
    const result: Record<string, { y0: number; y1: number }> = {};
    for (const key of stackOrder) {
      const val = d[key] as number;
      result[key] = { y0: cum, y1: cum + val };
      cum += val;
    }
    return result;
  });

  const xScale = (i: number) => padL + (i / (n - 1)) * chartW;
  const yScale = (v: number) => padT + chartH - (v / 100) * chartH;

  const buildAreaPath = (key: string) => {
    const top = cumulative.map((c, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(c[key].y1)}`).join(" ");
    const bottom = [...cumulative].reverse().map((c, i) => `${i === 0 ? "L" : "L"} ${xScale(n - 1 - i)} ${yScale(c[key].y0)}`).join(" ");
    return `${top} ${bottom} Z`;
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_17.5rem] gap-10 items-start">
        <div className="flex flex-col items-center">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full" onClick={() => setActiveSegment(null)}>
            <defs>
              <filter id="areaGlow">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feFlood floodColor="hsl(var(--foreground))" floodOpacity="0.15" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Subtle grid lines */}
            {[0, 25, 50, 75, 100].map(v => (
              <g key={v}>
                <line x1={padL} y1={yScale(v)} x2={padL + chartW} y2={yScale(v)} stroke="hsl(var(--border) / 0.08)" strokeWidth="0.5" />
                <text x={padL - 8} y={yScale(v)} textAnchor="end" dominantBaseline="central" className="fill-muted-foreground/20 text-[9px]">{v}%</text>
              </g>
            ))}

            {/* Year labels */}
            {stackedData.map((d, i) => (
              <text key={d.year} x={xScale(i)} y={height - 8} textAnchor="middle" className="fill-muted-foreground/30 text-[10px]">{d.year}</text>
            ))}

            {/* Stacked areas with dark outlines */}
            {stackOrder.map(key => {
              const seg = areaSegments.find(s => s.key === key)!;
              const isActive = activeSegment === key;
              const isOther = activeSegment !== null && activeSegment !== key;
              const baseOpacity = seg.isHighlight ? 1 : 0.45;

              return (
                <motion.path
                  key={key}
                  d={buildAreaPath(key)}
                  fill={seg.color}
                  stroke="hsl(var(--background))"
                  strokeWidth="3"
                  paintOrder="stroke fill"
                  className="cursor-pointer"
                  filter={seg.isHighlight && !isOther ? "url(#areaGlow)" : undefined}
                  animate={{ opacity: isOther ? 0.08 : isActive ? 1 : baseOpacity }}
                  transition={{ duration: 0.4 }}
                  onClick={(e) => { e.stopPropagation(); setActiveSegment(isActive ? null : key); }}
                  whileHover={{ opacity: isOther ? 0.15 : 0.95 }}
                />
              );
            })}
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap gap-5 justify-center mt-4">
            {areaSegments.map(seg => {
              const isGrowing = (stackedData[stackedData.length - 1][seg.key as keyof typeof stackedData[0]] as number) > (stackedData[0][seg.key as keyof typeof stackedData[0]] as number);
              return (
                <button
                  key={seg.key}
                  className={`flex items-center gap-2 transition-all duration-300 group ${activeSegment !== null && activeSegment !== seg.key ? "opacity-25" : "opacity-100"} hover:opacity-100`}
                  onClick={() => setActiveSegment(activeSegment === seg.key ? null : seg.key)}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-transform duration-200 ${activeSegment === seg.key ? "scale-125" : "group-hover:scale-110"}`}
                    style={{ background: seg.color, boxShadow: seg.isHighlight ? "0 0 0.375rem hsl(var(--foreground) / 0.25)" : "none" }}
                  />
                  <span className={`text-[0.625rem] transition-colors duration-200 ${activeSegment === seg.key ? "text-foreground/75" : "text-muted-foreground/35 group-hover:text-muted-foreground/55"}`}>
                    {seg.label}
                  </span>
                  <span className={`text-[0.5625rem] ${isGrowing ? "text-primary/40" : "text-destructive/35"}`}>
                    {isGrowing ? "↑" : "↓"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Side panel */}
        <div className="flex flex-col gap-6 lg:pt-8">
          <AnimatePresence mode="wait">
            {selectedData && selectedMeta ? (
              <motion.div
                key={activeSegment}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3 }}
              >
                <GlassPanel intensity="subtle" bordered className="p-6 rounded-xl">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: selectedMeta.color, boxShadow: selectedMeta.isHighlight ? "0 0 0.375rem hsl(var(--foreground) / 0.25)" : "none" }} />
                    <p className="text-xs text-foreground/65 font-medium">{selectedData.label}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.6875rem] text-muted-foreground/40">2023/24</span>
                      <span className="text-sm font-light text-foreground/55">{selectedData.val2023.toFixed(2)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[0.6875rem] text-muted-foreground/40">2029/30</span>
                      <span className="text-sm font-light text-foreground">{selectedData.val2030.toFixed(2)}%</span>
                    </div>
                    <div className="h-px bg-border/12 my-1" />
                    <div className="flex items-center justify-between">
                      <span className="text-[0.6875rem] text-muted-foreground/40">Abs. change</span>
                      <span className={`text-sm font-medium ${abs >= 0 ? "text-primary" : "text-destructive/65"}`}>
                        {abs >= 0 ? "+" : ""}{abs.toFixed(2)}pp
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[0.6875rem] text-muted-foreground/40">Rel. growth</span>
                      <span className={`text-sm font-semibold ${growth >= 0 ? "text-primary" : "text-destructive/65"}`}>
                        {growth >= 0 ? "↑" : "↓"} {Math.abs(growth).toFixed(0)}%
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
          <p className={`text-[0.625rem] tracking-[0.4em] uppercase text-primary/50 mb-10 transition-all duration-1000 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
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
                            <p className="text-[0.625rem] uppercase tracking-[0.3em] text-primary/60 mb-3">
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
                <StackedAreaChart whyNowVisible={whyNowVisible} />
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
                          <div className="absolute top-4 right-4 w-12 h-12 rounded-lg bg-background/80 border border-border/20 flex items-center justify-center p-1.5">
                            <img
                              src={companyLogos[business.name]}
                              alt={`${business.name} logo`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-[0.625rem] tracking-[0.2em] uppercase text-muted-foreground/40 px-3 py-1 rounded-full border border-border/20 bg-secondary/20">
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
