import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Layers, Zap, Check, X } from "lucide-react";
import { FloatingSurface, GlassPanel, AmbientGlow } from "./DepthSystem";

// Market Opportunity Data (Pyramid)
const marketLayers = [
  { 
    id: "tam", 
    label: "TAM", 
    title: "Global AI-powered supply-chain market",
    value: "$50B+",
    description: "Revenue potential"
  },
  { 
    id: "sam", 
    label: "SAM", 
    title: "Initial target market (EU)",
    value: "$7B-20B",
    description: "Revenue potential"
  },
  { 
    id: "som", 
    label: "SOM", 
    title: "Local market (DACH)",
    value: "$25-60M",
    description: "5 Year revenue potential: ARR"
  }
];

const opportunityPoints = [
  {
    category: "AI",
    color: "primary",
    points: [
      "Supply chain spend on AI is growing with a ~35% CAGR increase",
      "Shifting from pilots to core infrastructure in various industries",
      "Operational budgets reallocating from legacy tools into AI platforms"
    ]
  },
  {
    category: "Focused entry",
    color: "primary",
    points: [
      "DACH combines industrial density, logistics leadership, and early AI adoption"
    ]
  },
  {
    category: "Global scalability",
    color: "primary",
    points: [
      "Asset-light SaaS model enables global expansion without proportional cost growth"
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

// Market Pyramid Component
const MarketPyramid = ({ activeLayer, onLayerClick }: { activeLayer: string; onLayerClick: (id: string) => void }) => {
  // Calculate centroid of each trapezoid/triangle layer
  // TAM band: between full pyramid and SAM line (y: 220-280)
  // SAM band: between SAM line and SOM line (y: 160-220)
  // SOM: the top triangle (y: 100-160)
  
  return (
    <svg viewBox="0 0 400 320" className="w-full max-w-xl mx-auto">
      <defs>
        {/* Gradient for depth effect */}
        <linearGradient id="pyramidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="pyramidGradientActive" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      
      {/* TAM - Bottom band (trapezoid between outer and SAM) */}
      <motion.g
        onClick={() => onLayerClick("tam")}
        className="cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.01 }}
      >
        {/* TAM trapezoid shape */}
        <motion.path
          d="M20 290 L200 50 L380 290 L20 290 M70 230 L200 95 L330 230 Z"
          fillRule="evenodd"
          fill={activeLayer === "tam" ? "url(#pyramidGradientActive)" : "hsl(var(--secondary) / 0.2)"}
          className="transition-all duration-500"
        />
        <motion.path
          d="M20 290 L200 50 L380 290 Z"
          fill="none"
          stroke={activeLayer === "tam" ? "hsl(var(--primary))" : "hsl(var(--border) / 0.5)"}
          strokeWidth={activeLayer === "tam" ? 2 : 1}
          className="transition-all duration-500"
        />
        {/* TAM label - centered in the band */}
        <text 
          x="200" 
          y="268" 
          textAnchor="middle" 
          className={`text-base font-medium transition-all duration-500 ${activeLayer === "tam" ? "fill-primary" : "fill-muted-foreground/60"}`}
        >
          TAM
        </text>
      </motion.g>
      
      {/* SAM - Middle band (trapezoid between SAM and SOM) */}
      <motion.g
        onClick={() => onLayerClick("sam")}
        className="cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.01 }}
      >
        {/* SAM trapezoid shape */}
        <motion.path
          d="M70 230 L200 95 L330 230 L70 230 M130 170 L200 120 L270 170 Z"
          fillRule="evenodd"
          fill={activeLayer === "sam" ? "url(#pyramidGradientActive)" : "hsl(var(--secondary) / 0.35)"}
          className="transition-all duration-500"
        />
        <motion.path
          d="M70 230 L200 95 L330 230 Z"
          fill="none"
          stroke={activeLayer === "sam" ? "hsl(var(--primary))" : "hsl(var(--border) / 0.5)"}
          strokeWidth={activeLayer === "sam" ? 2 : 1}
          className="transition-all duration-500"
        />
        {/* SAM label - centered in the band */}
        <text 
          x="200" 
          y="205" 
          textAnchor="middle" 
          className={`text-base font-medium transition-all duration-500 ${activeLayer === "sam" ? "fill-primary" : "fill-muted-foreground/60"}`}
        >
          SAM
        </text>
      </motion.g>
      
      {/* SOM - Top triangle */}
      <motion.g
        onClick={() => onLayerClick("som")}
        className="cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.path
          d="M130 170 L200 120 L270 170 Z"
          fill={activeLayer === "som" ? "url(#pyramidGradientActive)" : "hsl(var(--secondary) / 0.5)"}
          className="transition-all duration-500"
        />
        <motion.path
          d="M130 170 L200 120 L270 170 Z"
          fill="none"
          stroke={activeLayer === "som" ? "hsl(var(--primary))" : "hsl(var(--border) / 0.5)"}
          strokeWidth={activeLayer === "som" ? 2 : 1}
          className="transition-all duration-500"
        />
        {/* SOM label - centered in triangle */}
        <text 
          x="200" 
          y="155" 
          textAnchor="middle" 
          className={`text-sm font-medium transition-all duration-500 ${activeLayer === "som" ? "fill-primary" : "fill-muted-foreground/60"}`}
        >
          SOM
        </text>
      </motion.g>
      
      {/* Callout lines to the right */}
      <AnimatePresence mode="wait">
        {activeLayer === "tam" && (
          <motion.g
            key="tam-callout"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <line x1="320" y1="260" x2="380" y2="260" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 2" />
            <circle cx="385" cy="260" r="3" fill="hsl(var(--primary))" />
          </motion.g>
        )}
        {activeLayer === "sam" && (
          <motion.g
            key="sam-callout"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <line x1="290" y1="200" x2="380" y2="200" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 2" />
            <circle cx="385" cy="200" r="3" fill="hsl(var(--primary))" />
          </motion.g>
        )}
        {activeLayer === "som" && (
          <motion.g
            key="som-callout"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <line x1="260" y1="145" x2="380" y2="145" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 2" />
            <circle cx="385" cy="145" r="3" fill="hsl(var(--primary))" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
};

// Circle Visualization for Why Now
const GrowthCircles = ({ year, values }: { year: string; values: number[] }) => {
  const maxRadius = 100;
  const total = values.reduce((a, b) => a + b, 0);
  
  return (
    <div className="relative">
      <p className="text-2xl font-light text-foreground mb-6 text-center">{year}</p>
      <div className="relative w-48 h-48 mx-auto">
        {/* Background circle */}
        <motion.div
          className="absolute rounded-full bg-muted-foreground/20"
          style={{
            width: `${(values[3] / 100) * 200}px`,
            height: `${(values[3] / 100) * 200}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        />
        {/* Primary circle (AI spend) */}
        <motion.div
          className="absolute rounded-full bg-primary/40"
          style={{
            width: `${(values[2] / 100) * 200}px`,
            height: `${(values[2] / 100) * 200}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        />
        {/* Germany circle */}
        <motion.div
          className="absolute rounded-full bg-muted/60"
          style={{
            width: `${(values[1] / 100) * 200}px`,
            height: `${(values[1] / 100) * 200}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        />
        {/* Inner circle */}
        <motion.div
          className="absolute rounded-full bg-foreground"
          style={{
            width: `${Math.max((values[0] / 100) * 200, 16)}px`,
            height: `${Math.max((values[0] / 100) * 200, 16)}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        />
      </div>
      {/* Labels */}
      <div className="mt-6 space-y-1">
        {values.map((val, i) => (
          <motion.div 
            key={i}
            className="flex items-center justify-between text-xs"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <span className="text-muted-foreground/50">
              {i === 2 ? `${val.toFixed(2)} %, ~ +35 % CAGR` : `${val.toFixed(2)} %`}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
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
            
            {/* Opportunity points */}
            <div className="space-y-8">
              <h3 className="text-xl text-primary/80 mb-6">Opportunity:</h3>
              {opportunityPoints.map((section, i) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, x: 20 }}
                  animate={marketVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  <h4 className="text-primary text-sm mb-3">{section.category}:</h4>
                  <ul className="space-y-2">
                    {section.points.map((point, j) => (
                      <li key={j} className="text-sm text-muted-foreground/60 flex items-start gap-3">
                        <span className="text-muted-foreground/40 mt-1">-</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* === WHY NOW === */}
        <div ref={whyNowRef} className="mb-40 md:mb-56">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-16">
            Why now – AI as the operating system of supply-chains
          </p>
          
          <div className={`grid lg:grid-cols-2 gap-16 transition-all duration-1000 ${whyNowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Left: Text content */}
            <div className="space-y-10">
              {/* Technology */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={whyNowVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                <GlassPanel intensity="subtle" bordered className="p-6 rounded-xl">
                  <h4 className="text-foreground text-sm mb-4">Technology:</h4>
                  <ul className="space-y-2 mb-4">
                    {whyNowData.technology.map((point, i) => (
                      <li key={i} className="text-xs text-muted-foreground/60 flex items-start gap-3">
                        <span className="text-muted-foreground/40 mt-0.5">-</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs">
                    <span className="text-primary">{whyNowData.technologyHighlight}</span>
                    <span className="text-muted-foreground/40 ml-2">({whyNowData.technologySource})</span>
                  </p>
                </GlassPanel>
              </motion.div>
              
              {/* Shift/Future */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={whyNowVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <GlassPanel intensity="subtle" bordered className="p-6 rounded-xl">
                  <h4 className="text-foreground text-sm mb-4">Shift/Future:</h4>
                  <ul className="space-y-2 mb-4">
                    {whyNowData.shift.map((point, i) => (
                      <li key={i} className="text-xs text-muted-foreground/60 flex items-start gap-3">
                        <span className="text-muted-foreground/40 mt-0.5">-</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs">
                    <span className="text-primary">{whyNowData.shiftHighlight}</span>
                    <span className="text-muted-foreground/40 ml-2">({whyNowData.shiftSource})</span>
                  </p>
                </GlassPanel>
              </motion.div>
              
              {/* Market Pressure */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={whyNowVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <GlassPanel intensity="subtle" bordered className="p-6 rounded-xl">
                  <h4 className="text-foreground text-sm mb-4">Market Pressure:</h4>
                  <ul className="space-y-2 mb-4">
                    {whyNowData.pressure.map((point, i) => (
                      <li key={i} className="text-xs text-muted-foreground/60 flex items-start gap-3">
                        <span className="text-muted-foreground/40 mt-0.5">-</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs">
                    <span className="text-primary">{whyNowData.pressureHighlight}</span>
                    <span className="text-muted-foreground/40 ml-2">({whyNowData.pressureSource})</span>
                  </p>
                </GlassPanel>
              </motion.div>
              
              {/* Conclusion */}
              <motion.p
                className="text-sm text-muted-foreground/70"
                initial={{ opacity: 0 }}
                animate={whyNowVisible ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                AI is becoming the dominating operating system of supply chains by 2030 – <span className="text-primary">Now is the time to act!</span>
              </motion.p>
            </div>
            
            {/* Right: Circle visualizations */}
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={whyNowVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                <GlassPanel intensity="subtle" bordered className="p-6 rounded-xl h-full">
                  <GrowthCircles year="2023/24" values={[0.67, 6.42, 15.27, 77.64]} />
                </GlassPanel>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={whyNowVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                <GlassPanel intensity="subtle" bordered className="p-6 rounded-xl h-full">
                  <GrowthCircles year="2029/2030" values={[1.94, 3.45, 48.51, 46.11]} />
                </GlassPanel>
              </motion.div>
            </div>
          </div>
          
          {/* Legend */}
          <motion.div 
            className="flex flex-wrap gap-6 justify-center mt-10"
            initial={{ opacity: 0 }}
            animate={whyNowVisible ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-foreground" />
              <span className="text-xs text-muted-foreground/50">AI-SCM-solution spend | Germany</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <span className="text-xs text-muted-foreground/50">AI-SCM-solution spend | Global</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted/60" />
              <span className="text-xs text-muted-foreground/50">SCM-solution spend | Germany</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
              <span className="text-xs text-muted-foreground/50">SCM-solution spend | Global</span>
            </div>
          </motion.div>
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
          
          <div className={`space-y-16 transition-all duration-1000 ${landscapeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {marketLandscapeSystems.map((system, sysIndex) => (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 30 }}
                animate={landscapeVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + sysIndex * 0.2 }}
              >
                {/* System Type Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-light text-foreground mb-2">{system.systemType}</h3>
                  <p className="text-sm text-muted-foreground/50">{system.description}</p>
                </div>
                
                {/* Business Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {system.businesses.map((business, bizIndex) => (
                    <motion.div
                      key={business.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={landscapeVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + sysIndex * 0.2 + bizIndex * 0.1 }}
                    >
                      <FloatingSurface elevation="low" className="rounded-xl h-full">
                        <GlassPanel intensity="subtle" bordered className="rounded-xl p-6 h-full">
                          {/* Business Name */}
                          <h4 className="text-lg font-medium text-primary mb-4">{business.name}</h4>
                          
                          {/* Facts */}
                          <div className="mb-4">
                            <p className="text-xs uppercase tracking-wider text-muted-foreground/40 mb-2">Facts</p>
                            <ul className="space-y-1.5">
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
                            <p className="text-xs uppercase tracking-wider text-muted-foreground/40 mb-2">Arguments</p>
                            <ul className="space-y-1.5">
                              {business.arguments.map((arg, i) => (
                                <li key={i} className="text-xs text-muted-foreground/60 flex items-start gap-2">
                                  <span className="text-destructive/60 mt-0.5">-</span>
                                  {arg}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </GlassPanel>
                      </FloatingSurface>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
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
