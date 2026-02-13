import HeroSection from "@/components/premium/HeroSection";
import PrefaceSection from "@/components/premium/PrefaceSection";
import ProblemSection from "@/components/premium/ProblemSection";
import SolutionSection from "@/components/premium/SolutionSection";

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
        
        {/* Preface: What Synapsio is */}
        <section id="preface" className="relative">
          <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-b from-background via-background/60 to-transparent" />
          <PrefaceSection />
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-background via-background/60 to-transparent" />
        </section>
        
        {/* Act 2: The Challenge - Friction Emerges */}
        <section id="problem" className="relative">
          <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-b from-background via-background/40 to-transparent" />
          <ProblemSection />
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-background via-background/40 to-transparent" />
        </section>
        
        {/* Act 3: The Solution - Order Restored */}
        <section id="solution" className="relative">
          <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-b from-background via-background/40 to-transparent" />
          <SolutionSection />
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-background via-background/40 to-transparent" />
        </section>
        
        {/* Act 4: Our Product - Process Overview + Features + Comparison */}
        <section id="product" className="relative">
          <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-b from-background via-background/40 to-transparent" />
          <ProductSection />
        </section>
        
        {/* Act 5: Opportunity - Market, Competition, Business Model */}
        <section id="opportunity" className="relative">
          <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-b from-background via-background/40 to-transparent" />
          <OpportunitySection />
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-background via-background/40 to-transparent" />
        </section>
        
        {/* Act 6: Roadmap */}
        <section id="roadmap" className="relative">
          <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-b from-background via-background/40 to-transparent" />
          <RoadmapSection />
        </section>
        
        {/* Act 7: The Team - Human Trust */}
        <section id="team" className="relative">
          <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-b from-background via-background/40 to-transparent" />
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
