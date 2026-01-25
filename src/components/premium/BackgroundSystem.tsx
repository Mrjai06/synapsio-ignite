import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  phase: number;
  layer: "background" | "midground" | "foreground";
  speed: number;
}

const BackgroundSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const pageHeight = Math.max(document.documentElement.scrollHeight, height * 3);
    
    // Background layer - large, slow, sparse
    const bgCount = 25;
    for (let i = 0; i < bgCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * pageHeight;
      particles.push({
        x, y, baseX: x, baseY: y,
        vx: 0, vy: 0,
        radius: Math.random() * 3 + 2,
        opacity: Math.random() * 0.08 + 0.03,
        phase: Math.random() * Math.PI * 2,
        layer: "background",
        speed: 0.15 + Math.random() * 0.1,
      });
    }
    
    // Midground layer - medium density
    const midCount = 45;
    for (let i = 0; i < midCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * pageHeight;
      particles.push({
        x, y, baseX: x, baseY: y,
        vx: 0, vy: 0,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.12 + 0.05,
        phase: Math.random() * Math.PI * 2,
        layer: "midground",
        speed: 0.25 + Math.random() * 0.15,
      });
    }
    
    // Foreground layer - small, subtle, closer
    const fgCount = 35;
    for (let i = 0; i < fgCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * pageHeight;
      particles.push({
        x, y, baseX: x, baseY: y,
        vx: 0, vy: 0,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.15 + 0.08,
        phase: Math.random() * Math.PI * 2,
        layer: "foreground",
        speed: 0.4 + Math.random() * 0.2,
      });
    }
    
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      dimensionsRef.current = { width: window.innerWidth, height: window.innerHeight };
      
      if (particlesRef.current.length === 0) {
        particlesRef.current = initParticles(window.innerWidth, window.innerHeight);
      }
    };
    
    resize();
    window.addEventListener("resize", resize);

    const handleScroll = () => {
      targetScrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const getParallaxFactor = (layer: string) => {
      switch (layer) {
        case "background": return 0.1;
        case "midground": return 0.3;
        case "foreground": return 0.5;
        default: return 0.3;
      }
    };

    const getLayerColor = (layer: string, opacity: number) => {
      // Using the brand palette - warm terracotta accent mixed with cool teal
      switch (layer) {
        case "background":
          return `rgba(14, 75, 88, ${opacity})`; // Teal surface
        case "midground":
          return `rgba(255, 255, 255, ${opacity * 0.8})`;
        case "foreground":
          return `rgba(218, 138, 103, ${opacity * 0.6})`; // Terracotta accent
        default:
          return `rgba(255, 255, 255, ${opacity})`;
      }
    };

    const animate = () => {
      const { width, height } = dimensionsRef.current;
      if (!canvas || !ctx || width === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear with transparency
      ctx.clearRect(0, 0, width, height);

      // Smooth scroll interpolation (very slow - 1.5% per frame)
      scrollRef.current += (targetScrollRef.current - scrollRef.current) * 0.015;

      const time = Date.now() * 0.0003; // Very slow time progression
      const particles = particlesRef.current;

      // Sort by layer for proper depth rendering
      const sortedParticles = [...particles].sort((a, b) => {
        const layerOrder = { background: 0, midground: 1, foreground: 2 };
        return layerOrder[a.layer] - layerOrder[b.layer];
      });

      // Draw connections first (behind nodes)
      sortedParticles.forEach((particle, i) => {
        const parallax = getParallaxFactor(particle.layer);
        const visibleY = particle.y - scrollRef.current * parallax;
        
        // Only process visible particles
        if (visibleY < -100 || visibleY > height + 100) return;

        // Draw connections to nearby particles of same or adjacent layer
        for (let j = i + 1; j < sortedParticles.length; j++) {
          const other = sortedParticles[j];
          const otherParallax = getParallaxFactor(other.layer);
          const otherVisibleY = other.y - scrollRef.current * otherParallax;
          
          if (otherVisibleY < -100 || otherVisibleY > height + 100) continue;

          const dx = other.x - particle.x;
          const dy = otherVisibleY - visibleY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const maxDist = particle.layer === "background" ? 300 : particle.layer === "midground" ? 200 : 150;
          
          if (distance < maxDist && particle.layer === other.layer) {
            const lineOpacity = (1 - distance / maxDist) * particle.opacity * 0.3;
            
            ctx.beginPath();
            ctx.moveTo(particle.x, visibleY);
            ctx.lineTo(other.x, otherVisibleY);
            ctx.strokeStyle = getLayerColor(particle.layer, lineOpacity);
            ctx.lineWidth = particle.layer === "background" ? 1 : 0.5;
            ctx.stroke();
          }
        }
      });

      // Draw nodes
      sortedParticles.forEach((particle) => {
        const parallax = getParallaxFactor(particle.layer);
        const visibleY = particle.y - scrollRef.current * parallax;
        
        if (visibleY < -100 || visibleY > height + 100) return;

        // Organic floating motion - very slow
        const waveX = Math.sin(time * particle.speed + particle.phase) * 20;
        const waveY = Math.cos(time * particle.speed * 0.7 + particle.phase * 1.3) * 15;
        
        const targetX = particle.baseX + waveX;
        const targetY = particle.baseY + waveY;
        
        // Ultra-slow interpolation for calm movement
        particle.vx = (targetX - particle.x) * 0.008;
        particle.vy = (targetY - particle.y) * 0.008;
        
        // Subtle mouse influence (only foreground)
        if (particle.layer === "foreground") {
          const mouseX = mouseRef.current.x;
          const mouseY = mouseRef.current.y - scrollRef.current * parallax + scrollRef.current;
          const dx = mouseX - particle.x;
          const dy = mouseY - visibleY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 200 && dist > 0) {
            const force = (200 - dist) / 200 * 0.002;
            particle.vx += dx * force;
            particle.vy += dy * force;
          }
        }
        
        // Heavy damping
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Soft glow (subtle, not neon)
        const glowSize = particle.radius * (particle.layer === "background" ? 8 : particle.layer === "midground" ? 5 : 3);
        const gradient = ctx.createRadialGradient(
          particle.x, visibleY, 0,
          particle.x, visibleY, glowSize
        );
        gradient.addColorStop(0, getLayerColor(particle.layer, particle.opacity * 0.15));
        gradient.addColorStop(0.5, getLayerColor(particle.layer, particle.opacity * 0.05));
        gradient.addColorStop(1, "transparent");
        
        ctx.beginPath();
        ctx.arc(particle.x, visibleY, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(particle.x, visibleY, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = getLayerColor(particle.layer, particle.opacity);
        ctx.fill();
      });

      // Ambient light gradients (depth/atmosphere)
      // Top-left warm gradient
      const warmGradient = ctx.createRadialGradient(
        width * 0.1, height * 0.2, 0,
        width * 0.1, height * 0.2, width * 0.5
      );
      warmGradient.addColorStop(0, "rgba(218, 138, 103, 0.015)");
      warmGradient.addColorStop(0.5, "rgba(218, 138, 103, 0.005)");
      warmGradient.addColorStop(1, "transparent");
      ctx.fillStyle = warmGradient;
      ctx.fillRect(0, 0, width, height);

      // Bottom-right cool gradient
      const coolGradient = ctx.createRadialGradient(
        width * 0.9, height * 0.8, 0,
        width * 0.9, height * 0.8, width * 0.6
      );
      coolGradient.addColorStop(0, "rgba(14, 75, 88, 0.02)");
      coolGradient.addColorStop(0.5, "rgba(14, 75, 88, 0.008)");
      coolGradient.addColorStop(1, "transparent");
      ctx.fillStyle = coolGradient;
      ctx.fillRect(0, 0, width, height);

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize particles after a brief delay to get accurate page height
    setTimeout(() => {
      particlesRef.current = initParticles(window.innerWidth, window.innerHeight);
      animate();
    }, 100);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default BackgroundSystem;
