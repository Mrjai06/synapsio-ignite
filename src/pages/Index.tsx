import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SystemMapSection from "@/components/SystemMapSection";
import FeaturesSection from "@/components/FeaturesSection";
import SimulatorSection from "@/components/SimulatorSection";
import MarketSection from "@/components/MarketSection";
import CompetitionSection from "@/components/CompetitionSection";
import BusinessModelSection from "@/components/BusinessModelSection";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroSection />
        
        <section id="problem">
          <ProblemSection />
        </section>
        
        <section id="system">
          <SystemMapSection />
        </section>
        
        <section id="features">
          <FeaturesSection />
        </section>
        
        <section id="simulator">
          <SimulatorSection />
        </section>
        
        <section id="market">
          <MarketSection />
        </section>
        
        <section id="competition">
          <CompetitionSection />
        </section>
        
        <section id="business">
          <BusinessModelSection />
        </section>
        
        <section id="team">
          <TeamSection />
        </section>
        
        <CTASection />
      </main>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Synapsio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
