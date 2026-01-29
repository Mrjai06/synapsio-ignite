"use client";

import React, { useEffect, useRef } from "react";

type BrainCanvasProps = {
  neuronColor?: string; // "r,g,b"
  pulseColor?: string;  // "r,g,b"
  className?: string;
};

function generateBrainPoint() {
  const width = 260;
  const height = 200;
  const depth = 180;

  let x = 0, y = 0, z = 0;
  let valid = false;

  while (!valid) {
    x = (Math.random() - 0.5) * width;
    y = (Math.random() - 0.5) * height;
    z = (Math.random() - 0.5) * depth;

    const nx = x / (width / 2);
    const ny = y / (height / 2);
    const nz = z / (depth / 2);

    const hemisphereOffset = Math.abs(nx) - 0.35;
    const brainShape =
      hemisphereOffset * hemisphereOffset +
      ny * ny * 1.2 +
      nz * nz * 0.9;

    if (brainShape < 1) valid = true;
  }

  return { x, y, z };
}

export default function BrainCanvas({
  neuronColor = "180,210,220",
  pulseColor = "218,138,103",
  className = "",
}: BrainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let animationFrameId: number;

    let neurons: Neuron[] = [];
    let pulses: Pulse[] = [];

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      radius: 160,
    };

    const perspective = 420;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    class Neuron {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      radius: number;
      activation = 0;
      neighbors: Neuron[] = [];

      constructor(x: number, y: number, z: number) {
        this.x = this.baseX = x;
        this.y = this.baseY = y;
        this.z = this.baseZ = z;
        this.radius = Math.random() * 1.8 + 0.8;
      }

      project() {
        const rotX = (mouse.y - canvas.height / 2) * 0.00015;
        const rotY = (mouse.x - canvas.width / 2) * 0.00015;

        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);

        const x1 = this.x * cosY - this.z * sinY;
        const z1 = this.z * cosY + this.x * sinY;
        const y1 = this.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + this.y * sinX;

        const scale = perspective / (perspective + z2);
        return {
          x: x1 * scale + canvas.width / 2,
          y: y1 * scale + canvas.height / 2,
          scale,
        };
      }

      draw() {
        const { x, y, scale } = this.project();
        ctx.beginPath();
        ctx.arc(x, y, this.radius * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${neuronColor}, ${0.25 + this.activation * 0.75})`;
        ctx.fill();
      }

      update() {
        const { x: px, y: py } = this.project();
        const dx = mouse.x - px;
        const dy = mouse.y - py;
        const dist = Math.hypot(dx, dy) || 1;

        const force = Math.max(0, (mouse.radius - dist) / mouse.radius);

        this.x += (dx / dist) * force * 0.35;
        this.y += (dy / dist) * force * 0.35;

        this.x += (this.baseX - this.x) * 0.02;
        this.y += (this.baseY - this.y) * 0.02;
        this.z += (this.baseZ - this.z) * 0.02;

        if (this.activation > 0) this.activation -= 0.015;
        this.draw();
      }

      fire() {
        if (this.activation > 0.6) return;
        this.activation = 1;
        this.neighbors.forEach(n => pulses.push(new Pulse(this, n)));
      }
    }

    class Pulse {
      start: Neuron;
      end: Neuron;
      progress = 0;
      speed = 0.04;

      constructor(start: Neuron, end: Neuron) {
        this.start = start;
        this.end = end;
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.end.activation = Math.min(1, this.end.activation + 0.6);
          return true;
        }
        return false;
      }

      draw() {
        const s = this.start.project();
        const e = this.end.project();

        const x = s.x + (e.x - s.x) * this.progress;
        const y = s.y + (e.y - s.y) * this.progress;
        const scale = s.scale + (e.scale - s.scale) * this.progress;

        ctx.beginPath();
        ctx.arc(x, y, 2.8 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pulseColor}, ${1 - this.progress})`;
        ctx.shadowColor = `rgba(${pulseColor}, 0.8)`;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      neurons = [];
      const count = 1100;

      for (let i = 0; i < count; i++) {
        const p = generateBrainPoint();
        neurons.push(new Neuron(p.x, p.y, p.z));
      }

      neurons.forEach(a => {
        neurons.forEach(b => {
          if (a !== b) {
            const d = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
            if (d < 32) a.neighbors.push(b);
          }
        });
      });
    };

    const animate = () => {
      ctx.fillStyle = "rgba(5, 24, 36, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() > 0.992) {
        neurons[Math.floor(Math.random() * neurons.length)]?.fire();
      }

      neurons.forEach(n => n.update());
      pulses = pulses.filter(p => !p.update());
      pulses.forEach(p => p.draw());

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [neuronColor, pulseColor]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ background: "transparent" }}
    />
  );
}
