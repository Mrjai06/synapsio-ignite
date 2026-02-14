'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Linkedin, Mail, Globe } from 'lucide-react';
import synapsioLogo from "@/assets/synapsio-logo.png";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Product',
    links: [
      { title: 'Solution', href: '#solution' },
      { title: 'Roadmap', href: '#roadmap' },
      { title: 'Demo', href: '#demo' },
    ],
  },
  {
    label: 'Company',
    links: [
      { title: 'About Us', href: '#team' },
      { title: 'Privacy Policy', href: '#' },
      { title: 'Terms of Service', href: '#' },
      { title: 'Imprint', href: '#' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { title: 'Documentation', href: '#' },
      { title: 'API Reference', href: '#' },
      { title: 'Case Studies', href: '#' },
      { title: 'Contact', href: '#contact' },
    ],
  },
  {
    label: 'Connect',
    links: [
      { title: 'LinkedIn', href: '#', icon: Linkedin },
      { title: 'Email', href: '#', icon: Mail },
      { title: 'Website', href: '#', icon: Globe },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-border/10 bg-black">
      {/* Upward glow effect */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent pointer-events-none" />
      <div className="absolute -top-24 left-1/4 right-1/4 h-24 bg-gradient-to-t from-primary/30 to-transparent blur-2xl pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Divider */}
        <AnimatedContainer delay={0}>
          <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </AnimatedContainer>

        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Brand Section */}
          <AnimatedContainer delay={0.1}>
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <img src={synapsioLogo} alt="Synapsio" className="h-10 w-auto" />
                <span className="text-lg font-medium tracking-tight text-foreground uppercase">
                  Synapsio
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Intelligent orchestration for modern supply chains. Transforming complexity into clarity.
              </p>
              <p className="mt-6 text-xs text-muted-foreground/60">
                © {new Date().getFullYear()} Synapsio Inc. All rights reserved.
              </p>
            </div>
          </AnimatedContainer>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.2 + index * 0.1}>
                <div className="space-y-4">
                  <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
                    {section.label}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                        >
                          {link.icon && (
                            <link.icon className="h-4 w-4 text-muted-foreground/50 transition-colors duration-300 group-hover:text-primary" />
                          )}
                          <span className="relative">
                            {link.title}
                            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        {/* Bottom Divider */}
        <AnimatedContainer delay={0.6}>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-border/20 to-transparent" />
        </AnimatedContainer>
      </div>
    </footer>
  );
};

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<'div'>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Footer;
