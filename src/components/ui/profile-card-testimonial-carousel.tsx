"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Twitter,
  Youtube,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
}

export interface TestimonialCarouselProps {
  className?: string;
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ className, testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % testimonials.length);
  const handlePrevious = () =>
    setCurrentIndex(
      (index) => (index - 1 + testimonials.length) % testimonials.length
    );

  const currentTestimonial = testimonials[currentIndex];

  const socialIcons = [
    { icon: Github, url: currentTestimonial.githubUrl, label: "GitHub" },
    { icon: Twitter, url: currentTestimonial.twitterUrl, label: "Twitter" },
    { icon: Youtube, url: currentTestimonial.youtubeUrl, label: "YouTube" },
    { icon: Linkedin, url: currentTestimonial.linkedinUrl, label: "LinkedIn" },
  ].filter(item => item.url);

  return (
    <div className={cn("w-full max-w-4xl mx-auto px-4", className)}>
      {/* Desktop layout */}
      <div className="hidden md:flex items-center gap-6 lg:gap-12">
        {/* Avatar */}
        <div className="relative shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-48 h-48 lg:w-64 lg:h-64 rounded-3xl overflow-hidden border border-border/20 shadow-xl"
            >
              <img
                src={currentTestimonial.imageUrl}
                alt={currentTestimonial.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card/30 backdrop-blur-md border border-border/20 rounded-3xl p-8 lg:p-10"
            >
              <h3 className="text-2xl lg:text-3xl font-light text-foreground mb-2 tracking-tight">
                {currentTestimonial.name}
              </h3>

              <p className="text-sm lg:text-base text-primary/70 mb-6">
                {currentTestimonial.title}
              </p>

              <p className="text-base lg:text-lg text-muted-foreground/70 leading-relaxed mb-8 whitespace-pre-line">
                {currentTestimonial.description}
              </p>

              <div className="flex items-center gap-4">
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2.5 rounded-xl border border-border/20 text-muted-foreground/50 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col items-center md:hidden">
        {/* Avatar */}
        <div className="relative mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 rounded-2xl overflow-hidden border border-border/20 shadow-lg"
            >
              <img
                src={currentTestimonial.imageUrl}
                alt={currentTestimonial.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card content */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card/30 backdrop-blur-md border border-border/20 rounded-2xl p-6 text-center"
            >
              <h3 className="text-xl font-light text-foreground mb-1 tracking-tight">
                {currentTestimonial.name}
              </h3>
              
              <p className="text-sm text-primary/70 mb-4">
                {currentTestimonial.title}
              </p>
              
              <p className="text-sm text-muted-foreground/70 leading-relaxed mb-6 whitespace-pre-line">
                {currentTestimonial.description}
              </p>
              
              <div className="flex items-center justify-center gap-3">
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2 rounded-lg border border-border/20 text-muted-foreground/50 hover:text-primary hover:border-primary/30 transition-all duration-300"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-center gap-6 mt-10">
        {/* Previous */}
        <button
          onClick={handlePrevious}
          aria-label="Previous testimonial"
          className="p-3 rounded-full border border-border/20 text-muted-foreground/50 hover:text-foreground hover:border-border/40 hover:bg-card/30 transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, testimonialIndex) => (
            <button
              key={testimonialIndex}
              onClick={() => setCurrentIndex(testimonialIndex)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                testimonialIndex === currentIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to testimonial ${testimonialIndex + 1}`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          className="p-3 rounded-full border border-border/20 text-muted-foreground/50 hover:text-foreground hover:border-border/40 hover:bg-card/30 transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
