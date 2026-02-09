"use client";

import React, { useEffect, useRef } from 'react';

// Cosmic Synapse Canvas Component - adapted for brand colors
const CosmicSynapseCanvas = ({ className }: { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let animationFrameId: number;
        let neurons: Neuron[] = [];
        let pulses: Pulse[] = [];
        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, radius: 150 };
        const perspective = 400;

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
            activation: number;
            neighbors: Neuron[];

            constructor(x: number, y: number, z: number) {
                this.x = x;
                this.y = y;
                this.z = z;
                this.baseX = x;
                this.baseY = y;
                this.baseZ = z;
                this.radius = Math.random() * 2 + 1;
                this.activation = 0;
                this.neighbors = [];
            }

            project() {
                // Apply mouse-based rotation for parallax
                const rotX = (mouse.y - canvas.height / 2) * 0.0001;
                const rotY = (mouse.x - canvas.width / 2) * 0.0001;

                const cosY = Math.cos(rotY);
                const sinY = Math.sin(rotY);
                const cosX = Math.cos(rotX);
                const sinX = Math.sin(rotX);

                const x1 = this.x * cosY - this.z * sinY;
                const z1 = this.z * cosY + this.x * sinY;
                const y1 = this.y * cosX - z1 * sinX;
                const z2 = z1 * cosX + this.y * sinX;

                const scale = perspective / (perspective + z2);
                const projectedX = (x1 * scale) + canvas.width / 2;
                const projectedY = (y1 * scale) + canvas.height / 2;
                return { x: projectedX, y: projectedY, scale };
            }

            draw() {
                const { x, y, scale } = this.project();
                ctx!.beginPath();
                ctx!.arc(x, y, this.radius * scale, 0, Math.PI * 2);
                // Whiter nodes for better visibility
                const alpha = 0.3 + this.activation * 0.7;
                ctx!.fillStyle = `rgba(180, 210, 220, ${alpha})`; // Light teal-white
                ctx!.fill();
            }

            update() {
                // Gravitational pull towards mouse
                const { x: projectedX, y: projectedY } = this.project();
                const dx = mouse.x - projectedX;
                const dy = mouse.y - projectedY;
                const dist = Math.hypot(dx, dy);
                const force = Math.max(0, (mouse.radius - dist) / mouse.radius);
                
                this.x += (dx / dist) * force * 0.5;
                this.y += (dy / dist) * force * 0.5;

                // Return to base position
                this.x += (this.baseX - this.x) * 0.01;
                this.y += (this.baseY - this.y) * 0.01;

                if (this.activation > 0) {
                    this.activation -= 0.01;
                }
                this.draw();
            }
            
            fire(depth: number = 0, visited: Set<Neuron> = new Set(), maxDepth: number = -1) {
                if (maxDepth === -1) maxDepth = Math.floor(Math.random() * 9) + 1; // 1 to 9 layers deep
                if (this.activation > 0.5 || depth > maxDepth || visited.has(this)) return;
                visited.add(this);
                this.activation = 1 - depth * 0.1;
                
                // Propagate like an electric signal — wide at origin, narrows with distance
                const maxPropagations = Math.max(2, 6 - depth);
                // Shuffle neighbors randomly so each cascade takes a unique path
                const shuffled = [...this.neighbors].sort(() => Math.random() - 0.5);
                const neighborsToFire = shuffled.slice(0, maxPropagations);
                
                neighborsToFire.forEach((neighbor, idx) => {
                    const randomDelay = 120 + Math.random() * 200 + depth * (80 + Math.random() * 100);
                    pulses.push(new Pulse(this, neighbor));
                    setTimeout(() => {
                        neighbor.fire(depth + 1, visited, maxDepth);
                    }, randomDelay);
                });
            }
        }

        class Pulse {
            start: Neuron;
            end: Neuron;
            progress: number;
            speed: number;

            constructor(startNeuron: Neuron, endNeuron: Neuron) {
                this.start = startNeuron;
                this.end = endNeuron;
                this.progress = 0;
                this.speed = 0.03; // Slower for elegance
            }

            update() {
                this.progress += this.speed;
                if (this.progress >= 1) {
                    this.end.activation = Math.min(1, this.end.activation + 0.5);
                    return true;
                }
                return false;
            }

            draw() {
                const startPos = this.start.project();
                const endPos = this.end.project();

                const x = startPos.x + (endPos.x - startPos.x) * this.progress;
                const y = startPos.y + (endPos.y - startPos.y) * this.progress;
                const scale = startPos.scale + (endPos.scale - startPos.scale) * this.progress;

                ctx!.beginPath();
                ctx!.arc(x, y, 2 * scale, 0, Math.PI * 2);
                // Accent color for pulses
                ctx!.fillStyle = `rgba(218, 138, 103, ${0.8 - this.progress * 0.6})`; // Brand accent
                ctx!.shadowColor = 'rgba(218, 138, 103, 0.5)';
                ctx!.shadowBlur = 8;
                ctx!.fill();
                ctx!.shadowBlur = 0;
            }
        }

        const init = () => {
            neurons = [];
            const numNeurons = 600; // Reduced for performance
            const radius = 280;
            for (let i = 0; i < numNeurons; i++) {
                const phi = Math.acos(-1 + (2 * i) / numNeurons);
                const theta = Math.sqrt(numNeurons * Math.PI) * phi;
                const x = radius * Math.cos(theta) * Math.sin(phi);
                const y = radius * Math.sin(phi) * Math.sin(theta);
                const z = radius * Math.cos(phi);
                neurons.push(new Neuron(x, y, z));
            }
            
            neurons.forEach(neuron => {
                neurons.forEach(other => {
                    if (neuron !== other) {
                        const dist = Math.hypot(neuron.x - other.x, neuron.y - other.y, neuron.z - other.z);
                        if (dist < 50) {
                            neuron.neighbors.push(other);
                        }
                    }
                });
            });
        };

        const animate = () => {
            ctx!.clearRect(0, 0, canvas.width, canvas.height);
            
            // Rare but dramatic cascading signal — like neural electricity
            if (Math.random() > 0.997) {
                const neuron = neurons[Math.floor(Math.random() * neurons.length)];
                neuron.fire(0, new Set());
            }

            neurons.forEach(neuron => neuron.update());
            
            pulses = pulses.filter(pulse => !pulse.update());
            pulses.forEach(pulse => pulse.draw());

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        
        resizeCanvas();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className={className}
            style={{ background: 'transparent' }}
        />
    );
};

export { CosmicSynapseCanvas };
export default CosmicSynapseCanvas;
