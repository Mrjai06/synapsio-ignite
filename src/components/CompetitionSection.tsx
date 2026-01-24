import { Check, X } from "lucide-react";

const competitors = [
  { name: "Legacy ERP", ai: false, realtime: false, integration: true, time: "18+ months" },
  { name: "Point Solutions", ai: true, realtime: false, integration: false, time: "3-6 months" },
  { name: "Control Towers", ai: false, realtime: true, integration: false, time: "6-12 months" },
];

const synapsio = { name: "Synapsio", ai: true, realtime: true, integration: true, time: "4-6 weeks" };

const CompetitionSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Competitive Landscape</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Why <span className="text-gradient">Synapsio</span> Wins
          </h2>
        </div>
        
        {/* Comparison table */}
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 text-muted-foreground font-medium"></th>
                <th className="text-center py-4 px-4 text-muted-foreground font-medium text-sm">Native AI</th>
                <th className="text-center py-4 px-4 text-muted-foreground font-medium text-sm">Real-Time</th>
                <th className="text-center py-4 px-4 text-muted-foreground font-medium text-sm">Unified Platform</th>
                <th className="text-center py-4 px-4 text-muted-foreground font-medium text-sm">Time to Value</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((comp, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-4 px-4 text-muted-foreground">{comp.name}</td>
                  <td className="py-4 px-4 text-center">
                    {comp.ai ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-destructive mx-auto" />}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {comp.realtime ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-destructive mx-auto" />}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {comp.integration ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-destructive mx-auto" />}
                  </td>
                  <td className="py-4 px-4 text-center text-muted-foreground text-sm">{comp.time}</td>
                </tr>
              ))}
              
              {/* Synapsio row - highlighted */}
              <tr className="bg-primary/10 border border-primary/30 rounded-xl">
                <td className="py-4 px-4 font-semibold text-primary">{synapsio.name}</td>
                <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                <td className="py-4 px-4 text-center font-semibold text-primary">{synapsio.time}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CompetitionSection;
