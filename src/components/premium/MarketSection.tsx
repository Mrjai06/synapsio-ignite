import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const marketData = {
  tam: { value: "$847B", label: "Total Addressable Market", description: "Global supply chain management software and services" },
  sam: { value: "$124B", label: "Serviceable Available Market", description: "Enterprise SCM platforms for mid-to-large organizations" },
  som: { value: "$8.2B", label: "Serviceable Obtainable Market", description: "AI-native SCM solutions in target verticals" }
};

const competitors = [
  { name: "SAP SCM", position: "Legacy leader", differentiation: "30-year-old architecture, 18+ month implementations" },
  { name: "Oracle SCM", position: "Enterprise incumbent", differentiation: "Complex pricing, siloed modules" },
  { name: "Blue Yonder", position: "Planning specialist", differentiation: "Limited real-time capabilities" },
  { name: "Kinaxis", position: "Concurrent planning", differentiation: "Narrow focus on planning only" },
  { name: "Coupa", position: "Procurement focus", differentiation: "Limited end-to-end visibility" }
];

const MarketSection = () => {
  const [activeMarket, setActiveMarket] = useState<"tam" | "sam" | "som">("sam");
  const [competitorIndex, setCompetitorIndex] = useState(0);

  const nextCompetitor = () => setCompetitorIndex((i) => (i + 1) % competitors.length);
  const prevCompetitor = () => setCompetitorIndex((i) => (i - 1 + competitors.length) % competitors.length);

  return (
    <section className="relative min-h-screen py-32 overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50 mb-6 block">
            Opportunity
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8 leading-tight">
            <span className="text-foreground">A market ready</span>
            <br />
            <span className="text-muted-foreground/50">for transformation</span>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* TAM/SAM/SOM visualization */}
          <div>
            <div className="relative flex items-center justify-center py-12">
              {/* Concentric circles */}
              <div className="relative">
                {/* TAM */}
                <button
                  onClick={() => setActiveMarket("tam")}
                  className={`
                    w-80 h-80 rounded-full border-2 transition-all duration-500 flex items-center justify-center
                    ${activeMarket === "tam" 
                      ? "border-primary/40 bg-primary/5" 
                      : "border-border/20 hover:border-border/40"
                    }
                  `}
                >
                  {/* SAM */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveMarket("sam"); }}
                    className={`
                      w-56 h-56 rounded-full border-2 transition-all duration-500 flex items-center justify-center
                      ${activeMarket === "sam" 
                        ? "border-primary/50 bg-primary/10" 
                        : "border-border/30 hover:border-border/50"
                      }
                    `}
                  >
                    {/* SOM */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveMarket("som"); }}
                      className={`
                        w-32 h-32 rounded-full border-2 transition-all duration-500 flex items-center justify-center
                        ${activeMarket === "som" 
                          ? "border-primary/60 bg-primary/20" 
                          : "border-border/40 hover:border-border/60"
                        }
                      `}
                    >
                      <span className={`text-xs tracking-wider ${activeMarket === "som" ? "text-foreground" : "text-muted-foreground/50"}`}>
                        SOM
                      </span>
                    </button>
                  </button>
                </button>
                
                {/* Labels */}
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/40 tracking-wider">TAM</span>
                <span className="absolute top-12 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/40 tracking-wider">SAM</span>
              </div>
            </div>
            
            {/* Active market info */}
            <div className="text-center mt-8">
              <p className="text-4xl font-light text-foreground mb-2">{marketData[activeMarket].value}</p>
              <p className="text-sm text-muted-foreground/60 mb-4">{marketData[activeMarket].label}</p>
              <p className="text-sm text-muted-foreground/40 max-w-sm mx-auto">{marketData[activeMarket].description}</p>
            </div>
          </div>
          
          {/* Competitors and Business Model */}
          <div className="space-y-16">
            {/* Competitor cards */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/40 mb-6">
                Competitive Landscape
              </p>
              
              <div className="relative">
                <div className="p-8 rounded-2xl border border-border/20 bg-card/20">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-medium text-foreground">
                      {competitors[competitorIndex].name}
                    </h4>
                    <span className="text-xs text-muted-foreground/50 tracking-wide">
                      {competitorIndex + 1} / {competitors.length}
                    </span>
                  </div>
                  <p className="text-sm text-primary/80 mb-3">{competitors[competitorIndex].position}</p>
                  <p className="text-sm text-muted-foreground/50 leading-relaxed">
                    {competitors[competitorIndex].differentiation}
                  </p>
                </div>
                
                <div className="flex justify-center gap-3 mt-6">
                  <button
                    onClick={prevCompetitor}
                    className="p-2 rounded-full border border-border/30 hover:border-border/60 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 text-muted-foreground/50" />
                  </button>
                  <button
                    onClick={nextCompetitor}
                    className="p-2 rounded-full border border-border/30 hover:border-border/60 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Business model */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/40 mb-6">
                Business Model
              </p>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="px-4 py-2 rounded-lg bg-card/30 border border-border/20">
                  <span className="text-muted-foreground/60">Transaction</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/30" />
                <div className="px-4 py-2 rounded-lg bg-card/30 border border-border/20">
                  <span className="text-muted-foreground/60">Platform Fee</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/30" />
                <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-foreground">Recurring Revenue</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground/40 mt-4 leading-relaxed">
                SaaS subscription + transaction-based fees aligned with customer value creation.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default MarketSection;
