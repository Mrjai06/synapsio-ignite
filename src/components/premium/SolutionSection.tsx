import NetworkCanvas from "./NetworkCanvas";

const SolutionSection = () => {
  return (
    <section className="relative py-40">
      {/* Calm, organized network - system stabilizing */}
      <NetworkCanvas 
        nodeCount={30} 
        chaos={0.1} 
        className="absolute inset-0 opacity-30"
        colorScheme="primary"
      />
      
      {/* Subtle center ambient light */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-primary/3 rounded-full blur-[200px]" />
      </div>
      
      {/* Top transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Text content */}
          <div className="max-w-lg">
            <p className="text-xs tracking-[0.3em] uppercase text-primary/60 mb-8">
              The Solution
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] mb-10 leading-[1.05]">
              <span className="text-foreground">A unified</span>
              <br />
              <span className="text-foreground">intelligence layer</span>
            </h2>
            <div className="space-y-8 text-lg text-muted-foreground/50 font-light leading-relaxed">
              <p>
                Synapsio connects every node of your supply chain into a single, 
                coherent system. Real-time data flows seamlessly between procurement, 
                logistics, and fulfillment.
              </p>
              <p>
                Our AI engine doesn't just monitor—it anticipates. Pattern recognition 
                across millions of data points enables proactive decisions.
              </p>
            </div>
            
            {/* Key metrics - clean, minimal */}
            <div className="flex gap-16 mt-16 pt-16 border-t border-border/10">
              <div>
                <p className="text-4xl font-light text-foreground mb-2">40%</p>
                <p className="text-sm text-muted-foreground/40">Cost reduction</p>
              </div>
              <div>
                <p className="text-4xl font-light text-foreground mb-2">3.2×</p>
                <p className="text-sm text-muted-foreground/40">Faster response</p>
              </div>
              <div>
                <p className="text-4xl font-light text-foreground mb-2">99.7%</p>
                <p className="text-sm text-muted-foreground/40">Accuracy</p>
              </div>
            </div>
          </div>
          
          {/* Visual - orbital system */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Outer orbit */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-72 h-72 rounded-full border border-border/15 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-[spin_80s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary/50 rounded-full" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-muted-foreground/20 rounded-full" />
                  </div>
                  
                  {/* Middle orbit */}
                  <div className="w-48 h-48 rounded-full border border-border/20 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-[spin_50s_linear_infinite_reverse]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-muted-foreground/30 rounded-full" />
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary/40 rounded-full" />
                  </div>
                  
                  {/* Inner orbit */}
                  <div className="w-24 h-24 rounded-full border border-border/25 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-[spin_30s_linear_infinite]">
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary/30 rounded-full" />
                  </div>
                  
                  {/* Core */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center border border-primary/15">
                    <div className="w-3 h-3 bg-primary/60 rounded-full" />
                  </div>
                </div>
              </div>
              
              {/* Floating labels */}
              <div className="absolute top-4 right-4 text-xs text-muted-foreground/30 tracking-wider">
                Procurement
              </div>
              <div className="absolute bottom-20 left-0 text-xs text-muted-foreground/30 tracking-wider">
                Logistics
              </div>
              <div className="absolute bottom-4 right-8 text-xs text-muted-foreground/30 tracking-wider">
                Fulfillment
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Morphing transition to Features */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>
    </section>
  );
};

export default SolutionSection;