const MarketSection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Market Opportunity</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            A <span className="text-gradient">$28B</span> Opportunity
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* TAM */}
          <div className="glass rounded-2xl p-8 text-center card-interactive">
            <p className="text-5xl font-bold text-gradient mb-2">$28B</p>
            <p className="text-primary font-medium mb-4">TAM</p>
            <p className="text-muted-foreground text-sm">
              Global supply chain management software market by 2028
            </p>
          </div>
          
          {/* SAM */}
          <div className="glass rounded-2xl p-8 text-center card-interactive">
            <p className="text-5xl font-bold text-gradient mb-2">$8.4B</p>
            <p className="text-primary font-medium mb-4">SAM</p>
            <p className="text-muted-foreground text-sm">
              AI-powered SCM solutions for enterprise ($1B+ revenue)
            </p>
          </div>
          
          {/* SOM */}
          <div className="glass rounded-2xl p-8 text-center card-interactive">
            <p className="text-5xl font-bold text-gradient mb-2">$840M</p>
            <p className="text-primary font-medium mb-4">SOM</p>
            <p className="text-muted-foreground text-sm">
              Achievable market share within 5 years (10% penetration)
            </p>
          </div>
        </div>
        
        {/* Growth drivers */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Market growing at <span className="text-foreground font-semibold">11.2% CAGR</span> driven by 
            digital transformation mandates, supply chain resilience post-COVID, and 
            AI adoption in enterprise operations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketSection;
