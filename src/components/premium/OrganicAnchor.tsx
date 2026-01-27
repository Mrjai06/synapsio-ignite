"use client";
import { useEffect, useRef, useMemo } from "react";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  speed: number;
}

interface OrganicAnchorProps {
  className?: string;
}

// Helper to get computed CSS variable and convert to usable color
const getCSSColor = (variable: string, alpha: number = 1): string => {
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(variable).trim();
  if (!value) return `hsla(19, 62%, 63%, ${alpha})`; // fallback to primary
  return `hsla(${value}, ${alpha})`;
};

const OrganicAnchor = ({ className = "" }: OrganicAnchorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const timeRef = useRef(0);
  const colorsRef = useRef<{ primary: string; muted: string }>({ primary: "", muted: "" });

  const config = useMemo(() => ({
    nodeCount: 12,
    connectionDistance: 180,
    nodeRadius: { min: 2, max: 5 },
    orbitRadius: { min: 80, max: 200 },
    speed: 0.0003,
    breathSpeed: 0.001,
    breathIntensity: 15,
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cache the computed CSS colors
    const root = document.documentElement;
    const primaryHSL = getComputedStyle(root).getPropertyValue("--primary").trim() || "19 62% 63%";
    const mutedHSL = getComputedStyle(root).getPropertyValue("--muted-foreground").trim() || "200 20% 65%";
    colorsRef.current = { primary: primaryHSL, muted: mutedHSL };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const initNodes = () => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      nodesRef.current = [];
      
      // Create nodes in organic orbital patterns
      for (let i = 0; i < config.nodeCount; i++) {
        const angle = (i / config.nodeCount) * Math.PI * 2;
        const orbitRadius = config.orbitRadius.min + 
          Math.random() * (config.orbitRadius.max - config.orbitRadius.min);
        
        const baseX = centerX + Math.cos(angle) * orbitRadius;
        const baseY = centerY + Math.sin(angle) * orbitRadius;
        
        nodesRef.current.push({
          x: baseX,
          y: baseY,
          baseX,
          baseY,
          vx: 0,
          vy: 0,
          radius: config.nodeRadius.min + Math.random() * (config.nodeRadius.max - config.nodeRadius.min),
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 0.5,
        });
      }
      
      // Add a few central nodes
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const orbitRadius = 30 + Math.random() * 40;
        
        nodesRef.current.push({
          x: centerX + Math.cos(angle) * orbitRadius,
          y: centerY + Math.sin(angle) * orbitRadius,
          baseX: centerX + Math.cos(angle) * orbitRadius,
          baseY: centerY + Math.sin(angle) * orbitRadius,
          vx: 0,
          vy: 0,
          radius: 3 + Math.random() * 3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.3,
        });
      }
    };

    const updateNodes = () => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      nodesRef.current.forEach((node, i) => {
        // Gentle orbital motion
        const orbitAngle = timeRef.current * config.speed * node.speed + node.phase;
        const breathOffset = Math.sin(timeRef.current * config.breathSpeed + node.phase) * config.breathIntensity;
        
        // Calculate distance from center for this node's base position
        const dx = node.baseX - centerX;
        const dy = node.baseY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Rotate around center with breathing
        const angle = Math.atan2(dy, dx) + orbitAngle;
        const newDist = dist + breathOffset;
        
        node.x = centerX + Math.cos(angle) * newDist;
        node.y = centerY + Math.sin(angle) * newDist;
      });
    };

    const drawConnections = (ctx: CanvasRenderingContext2D) => {
      const nodes = nodesRef.current;
      const { primary, muted } = colorsRef.current;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < config.connectionDistance) {
            const opacity = (1 - distance / config.connectionDistance) * 0.25;
            
            // Create gradient line with computed colors
            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y,
              nodes[j].x, nodes[j].y
            );
            gradient.addColorStop(0, `hsla(${primary}, ${opacity})`);
            gradient.addColorStop(0.5, `hsla(${muted}, ${opacity * 0.5})`);
            gradient.addColorStop(1, `hsla(${primary}, ${opacity})`);
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const drawNodes = (ctx: CanvasRenderingContext2D) => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const { primary } = colorsRef.current;
      
      nodesRef.current.forEach((node, i) => {
        // Calculate distance from center for glow intensity
        const dx = node.x - centerX;
        const dy = node.y - centerY;
        const distFromCenter = Math.sqrt(dx * dx + dy * dy);
        const maxDist = config.orbitRadius.max;
        const glowIntensity = 1 - (distFromCenter / maxDist) * 0.5;
        
        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 6
        );
        glowGradient.addColorStop(0, `hsla(${primary}, ${0.15 * glowIntensity})`);
        glowGradient.addColorStop(1, `hsla(${primary}, 0)`);
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 6, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
        
        // Core node
        const coreGradient = ctx.createRadialGradient(
          node.x - node.radius * 0.3, node.y - node.radius * 0.3, 0,
          node.x, node.y, node.radius
        );
        coreGradient.addColorStop(0, `hsla(${primary}, ${0.6 * glowIntensity})`);
        coreGradient.addColorStop(0.7, `hsla(${primary}, ${0.4 * glowIntensity})`);
        coreGradient.addColorStop(1, `hsla(${primary}, ${0.2 * glowIntensity})`);
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
      });
    };

    const drawCentralCore = (ctx: CanvasRenderingContext2D) => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const { primary } = colorsRef.current;
      
      // Breathing effect for core
      const breathScale = 1 + Math.sin(timeRef.current * config.breathSpeed * 0.5) * 0.1;
      const coreRadius = 8 * breathScale;
      
      // Outer ambient glow
      const outerGlow = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 120
      );
      outerGlow.addColorStop(0, `hsla(${primary}, 0.08)`);
      outerGlow.addColorStop(0.5, `hsla(${primary}, 0.03)`);
      outerGlow.addColorStop(1, `hsla(${primary}, 0)`);
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();
      
      // Inner glow
      const innerGlow = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 40
      );
      innerGlow.addColorStop(0, `hsla(${primary}, 0.2)`);
      innerGlow.addColorStop(1, `hsla(${primary}, 0)`);
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
      ctx.fillStyle = innerGlow;
      ctx.fill();
      
      // Core
      const coreGradient = ctx.createRadialGradient(
        centerX - 2, centerY - 2, 0,
        centerX, centerY, coreRadius
      );
      coreGradient.addColorStop(0, `hsla(${primary}, 0.7)`);
      coreGradient.addColorStop(0.6, `hsla(${primary}, 0.5)`);
      coreGradient.addColorStop(1, `hsla(${primary}, 0.3)`);
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      timeRef.current += 16; // Approximate 60fps
      
      updateNodes();
      drawConnections(ctx);
      drawCentralCore(ctx);
      drawNodes(ctx);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initNodes();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      initNodes();
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default OrganicAnchor;
