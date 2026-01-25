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
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <MarketSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
