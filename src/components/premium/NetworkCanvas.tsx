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
}

interface NetworkCanvasProps {
  nodeCount?: number;
  chaos?: number; // 0 = calm/organized, 1 = chaotic/fragmented
  className?: string;
  colorScheme?: "primary" | "accent" | "neutral";
}

const NetworkCanvas = ({ 
  nodeCount = 40, 
  chaos = 0, 
  className = "",
  colorScheme = "neutral"
}: NetworkCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

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

    // Initialize nodes in an organized pattern (will disperse based on chaos)
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    nodesRef.current = Array.from({ length: nodeCount }, (_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 150 + Math.random() * 200;
      const baseX = centerX + Math.cos(angle) * radius;
      const baseY = centerY + Math.sin(angle) * radius;
      
      return {
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        vx: 0,
        vy: 0,
        radius: Math.random() * 2 + 1.5,
        opacity: Math.random() * 0.4 + 0.3,
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Color based on scheme
    const getColor = (opacity: number) => {
      switch (colorScheme) {
        case "primary":
          return `rgba(218, 138, 103, ${opacity})`; // #DA8A67
        case "accent":
          return `rgba(14, 75, 88, ${opacity})`; // #0E4B58
        default:
          return `rgba(255, 255, 255, ${opacity})`;
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const time = Date.now() * 0.001;
      
      // Chaos affects behavior
      const chaosMultiplier = chaos * 4;
      const connectionDistance = 180 - chaos * 80;
      const organizationStrength = 1 - chaos;

      nodes.forEach((node, i) => {
        // Calculate target position based on chaos level
        const targetX = node.baseX + Math.sin(time + i * 0.5) * (20 + chaosMultiplier * 100);
        const targetY = node.baseY + Math.cos(time + i * 0.3) * (20 + chaosMultiplier * 100);
        
        // Add random jitter based on chaos
        const jitterX = (Math.random() - 0.5) * chaosMultiplier * 2;
        const jitterY = (Math.random() - 0.5) * chaosMultiplier * 2;
        
        // Smooth interpolation towards target
        node.vx = (targetX - node.x) * 0.02 * organizationStrength + jitterX;
        node.vy = (targetY - node.y) * 0.02 * organizationStrength + jitterY;
        
        // When chaotic, allow more free movement
        if (chaos > 0.5) {
          node.vx += (Math.random() - 0.5) * chaosMultiplier * 0.5;
          node.vy += (Math.random() - 0.5) * chaosMultiplier * 0.5;
        }
        
        // Damping
        node.vx *= 0.95;
        node.vy *= 0.95;

        // Subtle mouse interaction
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          const force = (250 - dist) / 250 * 0.008;
          node.vx += dx * force;
          node.vy += dy * force;
        }

        node.x += node.vx;
        node.y += node.vy;

        // Soft boundary bounce
        const margin = 50;
        if (node.x < margin) node.vx += 0.1;
        if (node.x > canvas.width - margin) node.vx -= 0.1;
        if (node.y < margin) node.vy += 0.1;
        if (node.y > canvas.height - margin) node.vy -= 0.1;

        // Draw node with glow
        const nodeOpacity = node.opacity * (1 - chaos * 0.2);
        
        // Subtle outer glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 4
        );
        gradient.addColorStop(0, getColor(nodeOpacity * 0.3));
        gradient.addColorStop(1, getColor(0));
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = getColor(nodeOpacity);
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const connDx = other.x - node.x;
          const connDy = other.y - node.y;
          const distance = Math.sqrt(connDx * connDx + connDy * connDy);

          if (distance < connectionDistance) {
            const lineOpacity = (1 - distance / connectionDistance) * 0.12 * (1 - chaos * 0.4);
            
            // Create subtle gradient line
            const lineGradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
            lineGradient.addColorStop(0, getColor(lineOpacity));
            lineGradient.addColorStop(0.5, getColor(lineOpacity * 1.5));
            lineGradient.addColorStop(1, getColor(lineOpacity));
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 0.8;
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
  }, [nodeCount, chaos, colorScheme]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
    />
  );
};

export default NetworkCanvas;