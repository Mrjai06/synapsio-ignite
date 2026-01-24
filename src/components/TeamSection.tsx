const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    background: "Ex-McKinsey, Stanford MBA",
    expertise: "10+ years in supply chain consulting"
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO & Co-founder",
    background: "Ex-Google, MIT CS",
    expertise: "Built ML infra at scale"
  },
  {
    name: "Dr. Emily Nakamura",
    role: "Chief Data Scientist",
    background: "Ex-Amazon, PhD Stanford",
    expertise: "Demand forecasting pioneer"
  },
  {
    name: "James O'Brien",
    role: "VP Sales",
    background: "Ex-Salesforce, SAP",
    expertise: "$50M+ enterprise deals closed"
  }
];

const TeamSection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Leadership</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Built by <span className="text-gradient">Experts</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Deep domain expertise meets world-class engineering talent.
          </p>
        </div>
        
        {/* Team grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <div 
              key={index}
              className="glass rounded-2xl p-6 text-center card-interactive group"
            >
              {/* Avatar placeholder */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4 flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors">
                <span className="text-2xl font-bold text-gradient">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <h3 className="font-semibold mb-1">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
              <p className="text-muted-foreground text-xs mb-1">{member.background}</p>
              <p className="text-muted-foreground text-xs">{member.expertise}</p>
            </div>
          ))}
        </div>
        
        {/* Investors */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground text-sm mb-6">Backed by leading investors</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            <div className="text-xl font-bold tracking-tight">Sequoia</div>
            <div className="text-xl font-bold tracking-tight">a16z</div>
            <div className="text-xl font-bold tracking-tight">Accel</div>
            <div className="text-xl font-bold tracking-tight">Tiger Global</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
