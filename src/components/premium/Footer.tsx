import { Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-20 border-t border-border/8">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          {/* Brand */}
          <div>
            <span className="text-sm tracking-[0.25em] uppercase text-muted-foreground/50 font-light">
              Synapsio
            </span>
            <p className="text-xs text-muted-foreground/25 mt-3">
              © 2024 Synapsio Inc. All rights reserved.
            </p>
          </div>
          
          {/* Links */}
          <nav className="flex flex-wrap gap-8 md:gap-12">
            <a href="#" className="text-sm text-muted-foreground/35 hover:text-foreground transition-colors duration-500">
              Imprint
            </a>
            <a href="#" className="text-sm text-muted-foreground/35 hover:text-foreground transition-colors duration-500">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground/35 hover:text-foreground transition-colors duration-500">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground/35 hover:text-foreground transition-colors duration-500">
              Contact
            </a>
          </nav>
          
          {/* Social */}
          <div className="flex gap-4">
            <a 
              href="#" 
              className="p-2.5 rounded-full border border-border/10 hover:border-border/30 transition-colors duration-500"
            >
              <Linkedin className="h-4 w-4 text-muted-foreground/35" />
            </a>
            <a 
              href="#" 
              className="p-2.5 rounded-full border border-border/10 hover:border-border/30 transition-colors duration-500"
            >
              <Twitter className="h-4 w-4 text-muted-foreground/35" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;