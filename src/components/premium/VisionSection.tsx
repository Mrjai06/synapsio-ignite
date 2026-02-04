import { motion } from "framer-motion";

const VisionSection = () => {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section label */}
          <motion.p 
            className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Vision
          </motion.p>
          
          {/* Main statement */}
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] mb-8 text-foreground/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            A world where supply chains{" "}
            <span className="text-primary">adapt, predict, and optimize</span>{" "}
            themselves — freeing businesses to focus on what matters most.
          </motion.h2>
          
          {/* Supporting text */}
          <motion.p 
            className="text-sm md:text-base text-muted-foreground/60 font-light leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We believe the future of supply chain management is autonomous, intelligent, 
            and seamlessly integrated — creating resilience and efficiency at every level.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
