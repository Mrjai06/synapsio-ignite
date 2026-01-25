import HeroSection from "@/components/premium/HeroSection";
import ProblemSection from "@/components/premium/ProblemSection";
import SolutionSection from "@/components/premium/SolutionSection";
import FeaturesSection from "@/components/premium/FeaturesSection";
import MarketSection from "@/components/premium/MarketSection";
import TeamSection from "@/components/premium/TeamSection";
import Footer from "@/components/premium/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Continuous narrative flow - no navigation, no hard breaks */}
      <main className="relative">
        {/* 1. Hero - System Awakening */}
        <HeroSection />
        
        {/* 2. Problem - Friction Emerges (chaos increases) */}
        <ProblemSection />
        
        {/* 3. Solution - System Reorganizes (order returns) */}
        <SolutionSection />
        
        {/* 4. Features - Living System */}
        <FeaturesSection />
        
        {/* 5. Market & Competition - Scale */}
        <MarketSection />
        
        {/* 6. Team - Human Trust */}
        <TeamSection />
      </main>
      
      {/* 7. Footer - Minimal, unobtrusive */}
      <Footer />
    </div>
  );
};

export default Index;