import NetworkCanvas from "./NetworkCanvas";

const SolutionSection = () => {
  return (
    <section className="relative min-h-screen py-32 overflow-hidden">
      {/* Calm, organized network */}
      <NetworkCanvas 
        nodeCount={30} 
        chaos={0} 
        className="absolute inset-0 opacity-40"
      />
      
      {/* Subtle center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[70vh]">
          {/* Text content */}
          <div className="max-w-xl">
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50 mb-6 block">
              The Solution
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8 leading-tight">
              <span className="text-foreground">A unified intelligence</span>
              <br />
              <span className="text-muted-foreground/50">layer for your operations</span>
            </h2>
            <div className="space-y-6 text-muted-foreground/60 text-lg font-light leading-relaxed">
              <p>
                Synapsio connects every node of your supply chain into a single, 
                coherent system. Real-time data flows seamlessly between procurement, 
                logistics, and fulfillment.
              </p>
              <p>
                Our AI engine doesn't just monitor—it anticipates. Pattern recognition 
                across millions of data points enables proactive decision-making before 
                disruptions cascade.
              </p>
            </div>
            
            {/* Key metrics */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border/20">
              <div>
                <p className="text-3xl font-light text-foreground mb-1">40%</p>
                <p className="text-xs text-muted-foreground/50 tracking-wide">Cost reduction</p>
              </div>
              <div>
                <p className="text-3xl font-light text-foreground mb-1">3.2×</p>
                <p className="text-xs text-muted-foreground/50 tracking-wide">Faster response</p>
              </div>
              <div>
                <p className="text-3xl font-light text-foreground mb-1">99.7%</p>
                <p className="text-xs text-muted-foreground/50 tracking-wide">Accuracy</p>
              </div>
            </div>
          </div>
          
          {/* Visual representation */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Central core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Outer ring */}
                  <div className="w-64 h-64 rounded-full border border-border/20 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-[spin_60s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary/40 rounded-full" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-muted-foreground/30 rounded-full" />
                  </div>
                  
                  {/* Middle ring */}
                  <div className="w-40 h-40 rounded-full border border-border/30 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-[spin_40s_linear_infinite_reverse]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-muted-foreground/40 rounded-full" />
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary/30 rounded-full" />
                  </div>
                  
                  {/* Inner core */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                    <div className="w-4 h-4 bg-primary/60 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
              
              {/* Floating labels */}
              <div className="absolute top-8 right-8 text-xs text-muted-foreground/40 tracking-wide">
                Procurement
              </div>
              <div className="absolute bottom-16 left-4 text-xs text-muted-foreground/40 tracking-wide">
                Logistics
              </div>
              <div className="absolute bottom-8 right-16 text-xs text-muted-foreground/40 tracking-wide">
                Fulfillment
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default SolutionSection;
