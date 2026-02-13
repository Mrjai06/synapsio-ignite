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

interface Signal {
  fromIdx: number;
  toIdx: number;
  progress: number; // 0 to 1
  speed: number;
  opacity: number;
  color: string;
  chain: number; // how many more hops this signal can make
}

interface Burst {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
  life: number; // 0 to 1
}

const BackgroundSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const signalsRef = useRef<Signal[]>([]);
  const burstsRef = useRef<Burst[]>([]);
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const lastSignalTime = useRef(0);

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
      switch (layer) {
        case "background":
          return `rgba(14, 75, 88, ${opacity})`;
        case "midground":
          return `rgba(255, 255, 255, ${opacity * 0.8})`;
        case "foreground":
          return `rgba(218, 138, 103, ${opacity * 0.6})`;
        default:
          return `rgba(255, 255, 255, ${opacity})`;
      }
    };

    // Find nearby particles for signal propagation
    const findNearbyParticles = (particleIdx: number, maxDist: number): number[] => {
      const particle = particlesRef.current[particleIdx];
      const nearby: number[] = [];
      const scroll = scrollRef.current;
      const { height } = dimensionsRef.current;
      const pFactor = getParallaxFactor(particle.layer);
      const pVisY = particle.y - scroll * pFactor;
      
      if (pVisY < -200 || pVisY > height + 200) return nearby;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        if (i === particleIdx) continue;
        const other = particlesRef.current[i];
        if (other.layer !== particle.layer) continue;
        
        const oFactor = getParallaxFactor(other.layer);
        const oVisY = other.y - scroll * oFactor;
        
        const dx = other.x - particle.x;
        const dy = oVisY - pVisY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < maxDist) nearby.push(i);
      }
      return nearby;
    };

    // Spawn a new signal cascade
    const spawnSignal = () => {
      const particles = particlesRef.current;
      if (particles.length === 0) return;
      
      const { height } = dimensionsRef.current;
      const scroll = scrollRef.current;
      
      // Pick a random visible particle
      const visibleIndices: number[] = [];
      particles.forEach((p, i) => {
        const pf = getParallaxFactor(p.layer);
        const vy = p.y - scroll * pf;
        if (vy > -100 && vy < height + 100) visibleIndices.push(i);
      });
      
      if (visibleIndices.length < 2) return;
      
      const fromIdx = visibleIndices[Math.floor(Math.random() * visibleIndices.length)];
      const from = particles[fromIdx];
      const maxDist = from.layer === "background" ? 300 : from.layer === "midground" ? 200 : 150;
      const nearby = findNearbyParticles(fromIdx, maxDist);
      
      if (nearby.length === 0) return;
      
      const toIdx = nearby[Math.floor(Math.random() * nearby.length)];
      const chainLength = Math.floor(Math.random() * 3) + 1; // 1-3 hops
      
      const colorChoices = [
        "rgba(218, 138, 103,",  // terracotta
        "rgba(14, 75, 88,",     // teal
        "rgba(255, 255, 255,",  // white
      ];
      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      
      signalsRef.current.push({
        fromIdx,
        toIdx,
        progress: 0,
        speed: 0.008 + Math.random() * 0.006, // slow travel
        opacity: 0.15 + Math.random() * 0.15,
        color,
        chain: chainLength,
      });
    };

    const animate = () => {
      const { width, height } = dimensionsRef.current;
      if (!canvas || !ctx || width === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth scroll interpolation
      scrollRef.current += (targetScrollRef.current - scrollRef.current) * 0.015;

      const time = Date.now() * 0.0003;
      const now = Date.now();
      const particles = particlesRef.current;

      // Spawn signals periodically (every 3-6 seconds)
      if (now - lastSignalTime.current > 3000 + Math.random() * 3000) {
        spawnSignal();
        lastSignalTime.current = now;
      }

      // Sort by layer
      const sortedParticles = [...particles].sort((a, b) => {
        const layerOrder = { background: 0, midground: 1, foreground: 2 };
        return layerOrder[a.layer] - layerOrder[b.layer];
      });

      // Draw connections
      sortedParticles.forEach((particle, i) => {
        const parallax = getParallaxFactor(particle.layer);
        const visibleY = particle.y - scrollRef.current * parallax;
        
        if (visibleY < -100 || visibleY > height + 100) return;

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

      // Update and draw signals
      const signals = signalsRef.current;
      for (let i = signals.length - 1; i >= 0; i--) {
        const sig = signals[i];
        sig.progress += sig.speed;
        
        if (sig.progress >= 1) {
          // Signal arrived — create a small burst at destination
          const dest = particles[sig.toIdx];
          const destParallax = getParallaxFactor(dest.layer);
          const destVisY = dest.y - scrollRef.current * destParallax;
          
          if (destVisY > -100 && destVisY < height + 100) {
            burstsRef.current.push({
              x: dest.x,
              y: destVisY,
              radius: 0,
              maxRadius: 8 + Math.random() * 12,
              opacity: sig.opacity * 0.6,
              color: sig.color,
              life: 0,
            });
          }
          
          // Chain to next particle
          if (sig.chain > 0) {
            const maxDist = dest.layer === "background" ? 300 : dest.layer === "midground" ? 200 : 150;
            const nearby = findNearbyParticles(sig.toIdx, maxDist);
            const filtered = nearby.filter(n => n !== sig.fromIdx);
            if (filtered.length > 0) {
              const nextIdx = filtered[Math.floor(Math.random() * filtered.length)];
              signals.push({
                fromIdx: sig.toIdx,
                toIdx: nextIdx,
                progress: 0,
                speed: sig.speed,
                opacity: sig.opacity * 0.8,
                color: sig.color,
                chain: sig.chain - 1,
              });
            }
          }
          
          signals.splice(i, 1);
          continue;
        }
        
        // Draw signal dot traveling along the connection
        const from = particles[sig.fromIdx];
        const to = particles[sig.toIdx];
        const fromParallax = getParallaxFactor(from.layer);
        const toParallax = getParallaxFactor(to.layer);
        const fromVisY = from.y - scrollRef.current * fromParallax;
        const toVisY = to.y - scrollRef.current * toParallax;
        
        const sx = from.x + (to.x - from.x) * sig.progress;
        const sy = fromVisY + (toVisY - fromVisY) * sig.progress;
        
        // Pulse opacity peaks in the middle of travel
        const pulseOpacity = sig.opacity * Math.sin(sig.progress * Math.PI);
        
        // Glow
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 6);
        glow.addColorStop(0, `${sig.color} ${pulseOpacity})`);
        glow.addColorStop(1, `${sig.color} 0)`);
        ctx.beginPath();
        ctx.arc(sx, sy, 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        
        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `${sig.color} ${pulseOpacity * 1.5})`;
        ctx.fill();
      }

      // Update and draw bursts
      const bursts = burstsRef.current;
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.life += 0.015; // slow expansion
        
        if (b.life >= 1) {
          bursts.splice(i, 1);
          continue;
        }
        
        b.radius = b.maxRadius * b.life;
        const burstOpacity = b.opacity * (1 - b.life) * (1 - b.life);
        
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${b.color} ${burstOpacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Inner glow
        const burstGlow = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        burstGlow.addColorStop(0, `${b.color} ${burstOpacity * 0.3})`);
        burstGlow.addColorStop(1, `${b.color} 0)`);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = burstGlow;
        ctx.fill();
      }

      // Draw nodes
      sortedParticles.forEach((particle) => {
        const parallax = getParallaxFactor(particle.layer);
        const visibleY = particle.y - scrollRef.current * parallax;
        
        if (visibleY < -100 || visibleY > height + 100) return;

        const waveX = Math.sin(time * particle.speed + particle.phase) * 20;
        const waveY = Math.cos(time * particle.speed * 0.7 + particle.phase * 1.3) * 15;
        
        const targetX = particle.baseX + waveX;
        const targetY = particle.baseY + waveY;
        
        particle.vx = (targetX - particle.x) * 0.008;
        particle.vy = (targetY - particle.y) * 0.008;
        
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
        
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        
        particle.x += particle.vx;
        particle.y += particle.vy;

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

        ctx.beginPath();
        ctx.arc(particle.x, visibleY, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = getLayerColor(particle.layer, particle.opacity);
        ctx.fill();
      });

      // Ambient light gradients
      const warmGradient = ctx.createRadialGradient(
        width * 0.1, height * 0.2, 0,
        width * 0.1, height * 0.2, width * 0.5
      );
      warmGradient.addColorStop(0, "rgba(218, 138, 103, 0.015)");
      warmGradient.addColorStop(0.5, "rgba(218, 138, 103, 0.005)");
      warmGradient.addColorStop(1, "transparent");
      ctx.fillStyle = warmGradient;
      ctx.fillRect(0, 0, width, height);

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
