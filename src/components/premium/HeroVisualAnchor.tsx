import { useEffect, useRef } from "react";

interface HeroVisualAnchorProps {
  className?: string;
  neuronColor?: string;
  pulseColor?: string;
}

// Brain shape generator - creates points within a brain-like volume
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

const HeroVisualAnchor = ({ 
  className = "",
  neuronColor = "14, 75, 88",    // Teal from brand palette
  pulseColor = "218, 138, 103",  // Copper accent
}: HeroVisualAnchorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const perspective = 420;
    const mouse = { x: 0, y: 0, radius: 120 };

    interface Neuron {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      radius: number;
      activation: number;
      neighbors: Neuron[];
    }

    interface Pulse {
      start: Neuron;
      end: Neuron;
      progress: number;
      speed: number;
    }

    let neurons: Neuron[] = [];
    let pulses: Pulse[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Reset mouse position to center
      mouse.x = rect.width / 2;
      mouse.y = rect.height / 2;
      
      init();
    };

    const projectNeuron = (neuron: Neuron, canvasWidth: number, canvasHeight: number) => {
      const rotX = (mouse.y - canvasHeight / 2) * 0.00008;
      const rotY = (mouse.x - canvasWidth / 2) * 0.00008;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const x1 = neuron.x * cosY - neuron.z * sinY;
      const z1 = neuron.z * cosY + neuron.x * sinY;
      const y1 = neuron.y * cosX - z1 * sinX;
      const z2 = z1 * cosX + neuron.y * sinX;

      const scale = perspective / (perspective + z2);
      return {
        x: x1 * scale + canvasWidth / 2,
        y: y1 * scale + canvasHeight / 2,
        scale,
      };
    };

    const init = () => {
      neurons = [];
      pulses = [];
      const count = 600; // Reduced for performance

      for (let i = 0; i < count; i++) {
        const p = generateBrainPoint();
        neurons.push({
          x: p.x,
          y: p.y,
          z: p.z,
          baseX: p.x,
          baseY: p.y,
          baseZ: p.z,
          radius: Math.random() * 1.5 + 0.6,
          activation: 0,
          neighbors: [],
        });
      }

      // Build neighbor connections
      neurons.forEach(a => {
        neurons.forEach(b => {
          if (a !== b) {
            const d = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
            if (d < 28) a.neighbors.push(b);
          }
        });
      });
    };

    const fireNeuron = (neuron: Neuron) => {
      if (neuron.activation > 0.6) return;
      neuron.activation = 1;
      neuron.neighbors.forEach(n => {
        pulses.push({
          start: neuron,
          end: n,
          progress: 0,
          speed: 0.025,
        });
      });
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Subtle fade for trail effect
      ctx.fillStyle = "rgba(5, 24, 36, 0.12)";
      ctx.fillRect(0, 0, w, h);

      // Randomly fire neurons (less frequent for calm effect)
      if (Math.random() > 0.985) {
        fireNeuron(neurons[Math.floor(Math.random() * neurons.length)]);
      }

      // Update and draw neurons
      neurons.forEach(neuron => {
        const proj = projectNeuron(neuron, w, h);

        // Subtle attraction to mouse
        const dx = mouse.x - proj.x;
        const dy = mouse.y - proj.y;
        const dist = Math.hypot(dx, dy);
        const force = Math.max(0, (mouse.radius - dist) / mouse.radius);

        if (dist > 0) {
          neuron.x += (dx / dist) * force * 0.15;
          neuron.y += (dy / dist) * force * 0.15;
        }

        // Return to base position
        neuron.x += (neuron.baseX - neuron.x) * 0.015;
        neuron.y += (neuron.baseY - neuron.y) * 0.015;
        neuron.z += (neuron.baseZ - neuron.z) * 0.015;

        // Decay activation
        if (neuron.activation > 0) neuron.activation -= 0.012;

        // Draw neuron
        const { x, y, scale } = projectNeuron(neuron, w, h);
        ctx.beginPath();
        ctx.arc(x, y, neuron.radius * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${neuronColor}, ${0.2 + neuron.activation * 0.6})`;
        ctx.fill();

        // Subtle glow when activated
        if (neuron.activation > 0.3) {
          ctx.beginPath();
          ctx.arc(x, y, neuron.radius * scale * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, neuron.radius * scale * 3);
          gradient.addColorStop(0, `rgba(${pulseColor}, ${neuron.activation * 0.15})`);
          gradient.addColorStop(1, "rgba(218, 138, 103, 0)");
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      // Update and draw pulses
      pulses = pulses.filter(pulse => {
        pulse.progress += pulse.speed;
        
        if (pulse.progress >= 1) {
          pulse.end.activation = Math.min(1, pulse.end.activation + 0.5);
          return false;
        }

        const s = projectNeuron(pulse.start, w, h);
        const e = projectNeuron(pulse.end, w, h);
        const x = s.x + (e.x - s.x) * pulse.progress;
        const y = s.y + (e.y - s.y) * pulse.progress;
        const scale = s.scale + (e.scale - s.scale) * pulse.progress;

        // Draw pulse with glow
        ctx.beginPath();
        ctx.arc(x, y, 2 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pulseColor}, ${0.8 - pulse.progress * 0.6})`;
        ctx.shadowColor = `rgba(${pulseColor}, 0.6)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        return true;
      });

      // Draw subtle connections between nearby neurons
      ctx.strokeStyle = `rgba(${neuronColor}, 0.06)`;
      ctx.lineWidth = 0.5;
      neurons.forEach((neuron, i) => {
        const proj = projectNeuron(neuron, w, h);
        neuron.neighbors.slice(0, 2).forEach(neighbor => {
          const neighborProj = projectNeuron(neighbor, w, h);
          ctx.beginPath();
          ctx.moveTo(proj.x, proj.y);
          ctx.lineTo(neighborProj.x, neighborProj.y);
          ctx.stroke();
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [neuronColor, pulseColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default HeroVisualAnchor;
