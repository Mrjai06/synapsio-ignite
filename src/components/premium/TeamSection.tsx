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
    <section className="relative py-40">
      {/* Warm, human ambient light */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-primary/4 rounded-full blur-[200px]" />
      </div>
      
      {/* Top transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className="max-w-2xl mb-24">
          <p className="text-xs tracking-[0.3em] uppercase text-primary/60 mb-8">
            Team
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] mb-10 leading-[1.05]">
            <span className="text-foreground">Built by operators</span>
            <br />
            <span className="text-muted-foreground/35">who understand the problem</span>
          </h2>
        </div>
        
        {/* Team grid - elegant cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-32">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative p-10 rounded-3xl border border-border/10 hover:border-border/25 bg-gradient-to-br from-card/15 to-transparent transition-all duration-700"
            >
              {/* Avatar placeholder */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-card/50 to-card/20 mb-8 flex items-center justify-center">
                <span className="text-xl text-muted-foreground/30 font-light">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              
              <h3 className="text-lg font-normal text-foreground mb-2 tracking-tight">
                {member.name}
              </h3>
              <p className="text-sm text-primary/60 mb-5">{member.role}</p>
              <p className="text-sm text-muted-foreground/40 leading-relaxed mb-8">
                {member.bio}
              </p>
              
              <a
                href={member.linkedin}
                className="inline-flex items-center gap-2 text-xs text-muted-foreground/30 hover:text-foreground transition-colors duration-500"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          ))}
        </div>
        
        {/* Final CTA - warm and inviting */}
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-light text-foreground mb-8 tracking-tight leading-tight">
            Ready to transform your supply chain?
          </h3>
          <p className="text-lg text-muted-foreground/40 mb-14 leading-relaxed">
            Join forward-thinking enterprises building resilient, intelligent operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-7 text-sm tracking-wide font-normal transition-all duration-700 hover:scale-[1.02]"
            >
              View Pitchdeck
              <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="ghost"
              className="text-muted-foreground/60 hover:text-foreground hover:bg-transparent rounded-full px-10 py-7 text-sm tracking-wide font-normal border border-border/20 hover:border-border/40 transition-all duration-700"
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