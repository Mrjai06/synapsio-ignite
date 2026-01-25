import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  baseX: number;
  baseY: number;
  phase: number;
}

interface NetworkCanvasProps {
  nodeCount?: number;
  chaos?: number;
  className?: string;
  colorScheme?: "primary" | "accent" | "neutral";
  scrollReactive?: boolean;
  parallaxFactor?: number;
}

const NetworkCanvas = ({ 
  nodeCount = 40, 
  chaos = 0, 
  className = "",
  colorScheme = "neutral",
  scrollReactive = false,
  parallaxFactor = 0.3
}: NetworkCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    nodesRef.current = Array.from({ length: nodeCount }, (_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 120 + Math.random() * 280;
      const baseX = centerX + Math.cos(angle) * radius;
      const baseY = centerY + Math.sin(angle) * radius;
      
      return {
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        vx: 0,
        vy: 0,
        radius: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2,
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleScroll = () => {
      targetScrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const getColor = (opacity: number) => {
      switch (colorScheme) {
        case "primary":
          return `rgba(218, 138, 103, ${opacity})`;
        case "accent":
          return `rgba(14, 75, 88, ${opacity})`;
        default:
          return `rgba(255, 255, 255, ${opacity})`;
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth scroll interpolation (very slow, 2% per frame)
      scrollRef.current += (targetScrollRef.current - scrollRef.current) * 0.02;

      const nodes = nodesRef.current;
      const time = Date.now() * 0.0006; // Slower time progression
      
      const chaosMultiplier = chaos * 3;
      const connectionDistance = 200 - chaos * 90;
      const organizationStrength = 1 - chaos * 0.7;

      // Scroll-based parallax offset
      const scrollOffset = scrollReactive ? scrollRef.current * parallaxFactor : 0;

      nodes.forEach((node, i) => {
        // Very slow, organic movement
        const waveX = Math.sin(time + node.phase) * (15 + chaosMultiplier * 60);
        const waveY = Math.cos(time * 0.7 + node.phase * 1.3) * (15 + chaosMultiplier * 60);
        
        const targetX = node.baseX + waveX;
        const targetY = node.baseY + waveY - scrollOffset;
        
        // Ultra-slow interpolation (1.5% per frame) for calm movement
        node.vx = (targetX - node.x) * 0.015 * organizationStrength;
        node.vy = (targetY - node.y) * 0.015 * organizationStrength;
        
        if (chaos > 0.4) {
          node.vx += (Math.random() - 0.5) * chaosMultiplier * 0.3;
          node.vy += (Math.random() - 0.5) * chaosMultiplier * 0.3;
        }
        
        // Heavy damping for smooth deceleration
        node.vx *= 0.92;
        node.vy *= 0.92;

        // Very subtle mouse attraction
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300 && dist > 0) {
          const force = (300 - dist) / 300 * 0.004;
          node.vx += dx * force;
          node.vy += dy * force;
        }

        node.x += node.vx;
        node.y += node.vy;

        // Soft boundary
        const margin = 80;
        if (node.x < margin) node.vx += 0.05;
        if (node.x > canvas.width - margin) node.vx -= 0.05;
        if (node.y < margin) node.vy += 0.05;
        if (node.y > canvas.height - margin) node.vy -= 0.05;

        const nodeOpacity = node.opacity * (1 - chaos * 0.15);
        
        // Subtle outer glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 5
        );
        gradient.addColorStop(0, getColor(nodeOpacity * 0.2));
        gradient.addColorStop(1, getColor(0));
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = getColor(nodeOpacity);
        ctx.fill();

        // Draw connections with subtle pulse
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const connDx = other.x - node.x;
          const connDy = other.y - node.y;
          const distance = Math.sqrt(connDx * connDx + connDy * connDy);

          if (distance < connectionDistance) {
            const pulse = 0.8 + Math.sin(time * 2 + i * 0.1) * 0.2;
            const lineOpacity = (1 - distance / connectionDistance) * 0.1 * (1 - chaos * 0.3) * pulse;
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = getColor(lineOpacity);
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodeCount, chaos, colorScheme, scrollReactive, parallaxFactor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
    />
  );
};

export default NetworkCanvas;