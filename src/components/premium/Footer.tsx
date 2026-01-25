import { Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-24 md:py-32 border-t border-border/6">
      <div className="container mx-auto px-8 lg:px-20 xl:px-28">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16">
          {/* Brand */}
          <div className="max-w-sm">
            <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground/40 font-light">
              Synapsio
            </span>
            <p className="text-sm text-muted-foreground/30 mt-4 leading-relaxed">
              Intelligent orchestration for modern supply chains.
            </p>
            <p className="text-xs text-muted-foreground/20 mt-6">
              © 2024 Synapsio Inc. All rights reserved.
            </p>
          </div>
          
          {/* Links */}
          <nav className="flex flex-wrap gap-10 lg:gap-14">
            <a href="#" className="text-sm text-muted-foreground/30 hover:text-foreground transition-colors duration-700">
              Imprint
            </a>
            <a href="#" className="text-sm text-muted-foreground/30 hover:text-foreground transition-colors duration-700">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground/30 hover:text-foreground transition-colors duration-700">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground/30 hover:text-foreground transition-colors duration-700">
              Contact
            </a>
          </nav>
          
          {/* Social */}
          <div className="flex gap-5">
            <a 
              href="#" 
              className="p-3 rounded-full border border-border/8 hover:border-border/25 transition-all duration-700 hover:scale-105"
            >
              <Linkedin className="h-4 w-4 text-muted-foreground/30" />
            </a>
            <a 
              href="#" 
              className="p-3 rounded-full border border-border/8 hover:border-border/25 transition-all duration-700 hover:scale-105"
            >
              <Twitter className="h-4 w-4 text-muted-foreground/30" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;