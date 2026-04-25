'use client';

import React, { useEffect, useRef } from 'react';

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Monochromatic / Black & White liquid colors
    const colors = ['#ffffff', '#e0e0e0', '#cccccc', '#a0a0a0', '#eeeeee'];
    
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      radius: number;
      color: string;
      mass: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = 0;
        this.vy = 0;
        this.radius = Math.random() * 200 + 150; // Large radius for smooth fluid blending
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.mass = this.radius / 100;
      }

      update(mouseX: number, mouseY: number) {
        // Smooth organic wandering motion
        const time = Date.now() * 0.0005;
        const wanderX = Math.sin(time + this.baseY * 0.01) * 100;
        const wanderY = Math.cos(time + this.baseX * 0.01) * 100;
        
        const targetX = this.baseX + wanderX;
        const targetY = this.baseY + wanderY;

        // Spring force towards target
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        this.vx += dx * 0.005;
        this.vy += dy * 0.005;

        // Push away from cursor (Fluid displacement)
        if (mouseX !== -1000) {
          const mdx = this.x - mouseX;
          const mdy = this.y - mouseY;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);
          const maxDist = 350; // Cursor influence radius
          if (dist < maxDist && dist > 0) {
            const force = Math.pow((maxDist - dist) / maxDist, 2); // Exponential falloff for smoothness
            this.vx += (mdx / dist) * force * 15 / this.mass;
            this.vy += (mdy / dist) * force * 15 / this.mass;
          }
        }

        // Fluid friction
        this.vx *= 0.88;
        this.vy *= 0.88;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color + 'aa'); // Alpha for smooth blending
        gradient.addColorStop(1, this.color + '00'); // Transparent edge
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const numParticles = Math.max(20, Math.min(Math.floor((width * height) / 40000), 50));
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Update bases without resetting entirely to keep transition smooth
      particles.forEach(p => {
        p.baseX = Math.random() * width;
        p.baseY = Math.random() * height;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Blend colors to create glowing vibrant fluid effect
      ctx.globalCompositeOperation = 'screen';
      
      particles.forEach(p => {
        p.update(mouseX, mouseY);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: '#050505', // Deep dark background to make colors pop
      overflow: 'hidden',
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          filter: 'blur(45px)',
          transform: 'scale(1.3)',
          opacity: 0.8,
        }}
      />
    </div>
  );
}
