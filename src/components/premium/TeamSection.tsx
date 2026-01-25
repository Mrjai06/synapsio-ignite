import { Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Alex Chen",
    role: "CEO & Co-founder",
    bio: "Former VP of Operations at Scale AI. Stanford MBA. 15 years in supply chain optimization.",
    linkedin: "#"
  },
  {
    name: "Maria Santos",
    role: "CTO & Co-founder",
    bio: "Ex-Google AI researcher. PhD in distributed systems. Led ML infrastructure for Google Cloud.",
    linkedin: "#"
  },
  {
    name: "James Park",
    role: "VP of Product",
    bio: "Former Director at Flexport. Built products serving Fortune 500 logistics operations.",
    linkedin: "#"
  },
  {
    name: "Sarah Mitchell",
    role: "VP of Sales",
    bio: "20 years enterprise SaaS. Former SVP at SAP. Deep relationships across manufacturing.",
    linkedin: "#"
  }
];

const TeamSection = () => {
  return (
    <section className="relative min-h-screen py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-primary/3 rounded-full blur-[180px]" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50 mb-6 block">
            Team
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8 leading-tight">
            <span className="text-foreground">Built by operators</span>
            <br />
            <span className="text-muted-foreground/50">who understand the problem</span>
          </h2>
        </div>
        
        {/* Team grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-24">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl border border-border/20 hover:border-border/40 bg-gradient-to-br from-card/20 to-transparent transition-all duration-500"
            >
              {/* Avatar placeholder */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-muted/40 to-muted/20 mb-6 flex items-center justify-center">
                <span className="text-xl text-muted-foreground/40 font-light">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              
              <h3 className="text-lg font-medium text-foreground mb-1 tracking-tight">
                {member.name}
              </h3>
              <p className="text-sm text-primary/70 mb-4">{member.role}</p>
              <p className="text-sm text-muted-foreground/50 leading-relaxed mb-6">
                {member.bio}
              </p>
              
              <a
                href={member.linkedin}
                className="inline-flex items-center gap-2 text-xs text-muted-foreground/40 hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          ))}
        </div>
        
        {/* Final CTA */}
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-light text-foreground mb-6 tracking-tight">
            Ready to transform your supply chain?
          </h3>
          <p className="text-muted-foreground/50 mb-10 leading-relaxed">
            Join forward-thinking enterprises building resilient, intelligent operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-sm tracking-wide font-normal transition-all duration-500 hover:scale-[1.02]"
            >
              View Pitchdeck
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="ghost"
              className="text-muted-foreground hover:text-foreground hover:bg-transparent rounded-full px-8 py-6 text-sm tracking-wide font-normal border border-border/30 hover:border-border/60 transition-all duration-500"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
