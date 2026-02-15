import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingSurface } from "./DepthSystem";
import synapsioLogo from "@/assets/synapsio-logo.png";

const VisionSection = () => {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src={synapsioLogo} alt="Synapsio" className="h-12 w-auto opacity-50" />
          </motion.div>
          
          {/* CTA content */}
          <motion.h2
            className="text-3xl md:text-4xl font-light text-foreground mb-8 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ready to transform your supply chain?
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground/40 mb-14 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Join forward-thinking enterprises building resilient, intelligent operations.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-5 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FloatingSurface elevation="high" glow glowColor="primary" className="rounded-full">
              <a href="/Synapsio_Pitch.pdf" download>
                <Button 
                  size="lg" 
                  className="group bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-7 text-sm tracking-wide font-normal transition-all duration-1000 hover:scale-[1.02]"
                >
                  View Pitchdeck
                  <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-700 group-hover:translate-x-1" />
                </Button>
              </a>
            </FloatingSurface>
            <FloatingSurface elevation="medium" className="rounded-full">
              <Button 
                size="lg" 
                variant="ghost"
                className="text-foreground/90 hover:text-foreground hover:bg-card/50 rounded-full px-10 py-7 text-sm tracking-wide font-normal border border-border/60 hover:border-border/80 transition-all duration-1000 backdrop-blur-md bg-card/20"
              >
                Get in Touch
              </Button>
            </FloatingSurface>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
