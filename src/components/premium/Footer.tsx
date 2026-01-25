import { Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-border/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand */}
          <div>
            <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground/60 font-light">
              Synapsio
            </span>
            <p className="text-xs text-muted-foreground/30 mt-2">
              © 2024 Synapsio Inc. All rights reserved.
            </p>
          </div>
          
          {/* Links */}
          <nav className="flex flex-wrap gap-6 md:gap-10">
            <a href="#" className="text-sm text-muted-foreground/40 hover:text-foreground transition-colors">
              Imprint
            </a>
            <a href="#" className="text-sm text-muted-foreground/40 hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground/40 hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground/40 hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>
          
          {/* Social */}
          <div className="flex gap-4">
            <a 
              href="#" 
              className="p-2 rounded-full border border-border/20 hover:border-border/40 transition-colors"
            >
              <Linkedin className="h-4 w-4 text-muted-foreground/40" />
            </a>
            <a 
              href="#" 
              className="p-2 rounded-full border border-border/20 hover:border-border/40 transition-colors"
            >
              <Twitter className="h-4 w-4 text-muted-foreground/40" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
