import HeroSection from "@/components/premium/HeroSection";
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
        
        {/* Narrative bridge: From order to chaos */}
        <div className="relative h-32 -mt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>
        
        {/* Act 2: The Challenge - Friction Emerges */}
        <section id="problem">
          <ProblemSection />
        </section>
        
        {/* Narrative bridge: From chaos to resolution */}
        <div className="relative py-20 md:py-28">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-lg">
              <p className="text-sm text-muted-foreground/40 font-light leading-relaxed italic">
                "There has to be a better way..."
              </p>
            </div>
          </div>
        </div>
        
        {/* Act 3: The Solution - Order Restored */}
        <section id="solution">
          <SolutionSection />
        </section>
        
        {/* Narrative bridge: From solution to process */}
        <div className="relative py-20 md:py-28">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-lg ml-auto text-right">
              <p className="text-sm text-muted-foreground/40 font-light leading-relaxed">
                A unified workflow
              </p>
              <div className="mt-4 flex justify-end">
                <svg width="40" height="20" viewBox="0 0 40 20" className="text-border/40">
                  <path 
                    d="M0 10 L30 10 M25 5 L30 10 L25 15" 
                    stroke="currentColor" 
                    strokeWidth="1" 
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Process Overview - Interactive workflow diagram */}
        <section id="process">
          <ProcessOverviewSection />
        </section>
        
        {/* Narrative bridge: From process to product */}
        <div className="relative py-20 md:py-28">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-lg">
              <p className="text-sm text-muted-foreground/40 font-light leading-relaxed">
                Powered by intelligent capabilities
              </p>
            </div>
          </div>
        </div>
        
        {/* Act 4: Our Product - Explanation, Key Features, Examples */}
        <section id="product">
          <ProductSection />
        </section>
        
        {/* Narrative bridge: From product to opportunity */}
        <div className="relative py-20 md:py-28">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-lg">
              <p className="text-sm text-muted-foreground/40 font-light leading-relaxed">
                Addressing a massive, underserved market
              </p>
            </div>
          </div>
        </div>
        
        {/* Act 5: Opportunity - Market, Competition, Business Model */}
        <section id="opportunity">
          <OpportunitySection />
        </section>
        
        {/* Narrative bridge: From opportunity to roadmap */}
        <div className="relative py-20 md:py-28">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-lg ml-auto text-right">
              <p className="text-sm text-muted-foreground/40 font-light leading-relaxed">
                Where we're headed
              </p>
            </div>
          </div>
        </div>
        
        {/* Act 6: Roadmap */}
        <section id="roadmap">
          <RoadmapSection />
        </section>
        
        {/* Narrative bridge: From roadmap to team */}
        <div className="relative py-20 md:py-28">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="max-w-lg mx-auto text-center">
              <p className="text-sm text-muted-foreground/40 font-light leading-relaxed">
                Built by people who've lived this problem
              </p>
            </div>
          </div>
        </div>
        
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
