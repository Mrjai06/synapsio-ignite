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
    <section className="relative py-40">
      {/* Subtle ambient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] bg-secondary/15 rounded-full blur-[200px]" />
      </div>
      
      {/* Top transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className="max-w-2xl mb-24">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/60 mb-8">
            Opportunity
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] mb-10 leading-[1.05]">
            <span className="text-foreground">A market ready</span>
            <br />
            <span className="text-muted-foreground/35">for transformation</span>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          {/* TAM/SAM/SOM - concentric circles */}
          <div>
            <div className="relative flex items-center justify-center py-16">
              <div className="relative">
                {/* TAM */}
                <button
                  onClick={() => setActiveMarket("tam")}
                  className={`
                    w-80 h-80 rounded-full border transition-all duration-700 flex items-center justify-center
                    ${activeMarket === "tam" 
                      ? "border-primary/30 bg-primary/3" 
                      : "border-border/15 hover:border-border/25"
                    }
                  `}
                >
                  {/* SAM */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveMarket("sam"); }}
                    className={`
                      w-56 h-56 rounded-full border transition-all duration-700 flex items-center justify-center
                      ${activeMarket === "sam" 
                        ? "border-primary/40 bg-primary/5" 
                        : "border-border/20 hover:border-border/30"
                      }
                    `}
                  >
                    {/* SOM */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveMarket("som"); }}
                      className={`
                        w-32 h-32 rounded-full border transition-all duration-700 flex items-center justify-center
                        ${activeMarket === "som" 
                          ? "border-primary/50 bg-primary/10" 
                          : "border-border/25 hover:border-border/40"
                        }
                      `}
                    >
                      <span className={`text-xs tracking-wider transition-colors duration-500 ${activeMarket === "som" ? "text-foreground" : "text-muted-foreground/40"}`}>
                        SOM
                      </span>
                    </button>
                  </button>
                </button>
                
                {/* Labels */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/30 tracking-wider">TAM</span>
                <span className="absolute top-10 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/30 tracking-wider">SAM</span>
              </div>
            </div>
            
            {/* Active market info */}
            <div className="text-center mt-8">
              <p className="text-5xl font-light text-foreground mb-3">{marketData[activeMarket].value}</p>
              <p className="text-sm text-muted-foreground/50 mb-4">{marketData[activeMarket].label}</p>
              <p className="text-sm text-muted-foreground/35 max-w-sm mx-auto">{marketData[activeMarket].description}</p>
            </div>
          </div>
          
          {/* Competitors and Business Model */}
          <div className="space-y-20">
            {/* Competitor cards */}
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-8">
                Competitive Landscape
              </p>
              
              <div className="relative">
                <div className="p-10 rounded-3xl border border-border/10 bg-gradient-to-br from-card/20 to-transparent">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-2xl font-light text-foreground">
                      {competitors[competitorIndex].name}
                    </h4>
                    <span className="text-xs text-muted-foreground/40 tracking-wide">
                      {competitorIndex + 1} / {competitors.length}
                    </span>
                  </div>
                  <p className="text-sm text-primary/70 mb-4">{competitors[competitorIndex].position}</p>
                  <p className="text-base text-muted-foreground/45 leading-relaxed">
                    {competitors[competitorIndex].differentiation}
                  </p>
                </div>
                
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={prevCompetitor}
                    className="p-3 rounded-full border border-border/15 hover:border-border/40 transition-colors duration-500"
                  >
                    <ChevronLeft className="h-4 w-4 text-muted-foreground/40" />
                  </button>
                  <button
                    onClick={nextCompetitor}
                    className="p-3 rounded-full border border-border/15 hover:border-border/40 transition-colors duration-500"
                  >
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Business model */}
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/35 mb-8">
                Business Model
              </p>
              
              <div className="flex items-center gap-5 text-sm flex-wrap">
                <div className="px-5 py-3 rounded-2xl bg-card/20 border border-border/10">
                  <span className="text-muted-foreground/50">Transaction</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/20" />
                <div className="px-5 py-3 rounded-2xl bg-card/20 border border-border/10">
                  <span className="text-muted-foreground/50">Platform Fee</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/20" />
                <div className="px-5 py-3 rounded-2xl bg-primary/8 border border-primary/15">
                  <span className="text-foreground">Recurring Revenue</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground/35 mt-6 leading-relaxed">
                SaaS subscription + transaction-based fees aligned with customer value.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Morphing transition to Team */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
    </section>
  );
};

export default MarketSection;