import HeroSection from "@/components/premium/HeroSection";
import PrefaceSection from "@/components/premium/PrefaceSection";
import ProblemSection from "@/components/premium/ProblemSection";
import SolutionSection from "@/components/premium/SolutionSection";
import ProcessOverviewSection from "@/components/premium/ProcessOverviewSection";
import ProductSection from "@/components/premium/ProductSection";
import OpportunitySection from "@/components/premium/OpportunitySection";
import RoadmapSection from "@/components/premium/RoadmapSection";
import TeamSection from "@/components/premium/TeamSection";
import VisionSection from "@/components/premium/VisionSection";
import Footer from "@/components/premium/Footer";
import ProgressNavbar from "@/components/ProgressNavbar";
import BackgroundSystem from "@/components/premium/BackgroundSystem";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Progress navbar */}
      <ProgressNavbar />
      
      {/* Persistent animated background system */}
      <BackgroundSystem />
      
      {/* Continuous narrative flow - sits above background */}
      <main className="relative" style={{ zIndex: 1 }}>
        {/* Act 1: Introduction - System Awakening */}
        <section id="hero">
          <HeroSection />
        </section>
        
        {/* Narrative bridge: From intro to preface */}
        <div className="relative h-32 -mt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>
        
        {/* Preface: What Synapsio is */}
        <section id="preface">
          <PrefaceSection />
        </section>
        
        {/* Narrative bridge: From preface to challenge */}
        <div className="relative h-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30" />
        </div>
        
        {/* Act 2: The Challenge - Friction Emerges */}
        <section id="problem">
          <ProblemSection />
        </section>
        
        
        {/* Act 3: The Solution - Order Restored */}
        <section id="solution">
          <SolutionSection />
        </section>
        
        
        {/* Act 4: Our Product - Process Overview + Features + Comparison */}
        <section id="product">
          <ProcessOverviewSection />
          <ProductSection />
        </section>
        
        
        {/* Act 5: Opportunity - Market, Competition, Business Model */}
        <section id="opportunity">
          <OpportunitySection />
        </section>
        
        
        {/* Act 6: Roadmap */}
        <section id="roadmap">
          <RoadmapSection />
        </section>
        
        
        {/* Act 7: The Team - Human Trust */}
        <section id="team">
          <TeamSection />
          <VisionSection />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
