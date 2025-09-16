import React, { useEffect, useRef, useState } from 'react';

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef();
  const particlesRef = useRef([]);
  const circlesRef = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(120, Math.floor((dimensions.width * dimensions.height) / 12000));
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: ['cyan', 'green', 'purple', 'orange'][Math.floor(Math.random() * 4)],
          pulse: Math.random() * Math.PI * 2
        });
      }
    };

    // Initialize small floating circles
    const initCircles = () => {
      circlesRef.current = [];
      const circleCount = Math.min(25, Math.floor(dimensions.width / 100));
      
      for (let i = 0; i < circleCount; i++) {
        circlesRef.current.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          size: Math.random() * 8 + 4, // Small circles (4-12px)
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.15 + 0.05,
          color: ['cyan', 'green', 'purple', 'orange'][Math.floor(Math.random() * 4)],
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulse: Math.random() * Math.PI * 2
        });
      }
    };

    initParticles();
    initCircles();

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);

    const getColorRGBA = (color, alpha) => {
      const colors = {
        cyan: `rgba(6, 182, 212, ${alpha})`,
        green: `rgba(34, 197, 94, ${alpha})`,
        purple: `rgba(168, 85, 247, ${alpha})`,
        orange: `rgba(251, 146, 60, ${alpha})`
      };
      return colors[color] || colors.cyan;
    };

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw animated grid
      const time = Date.now() * 0.001;
      ctx.strokeStyle = `rgba(6, 182, 212, ${0.05 + Math.sin(time) * 0.02})`;
      ctx.lineWidth = 1;
      
      const gridSize = 60;
      for (let x = 0; x < dimensions.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, dimensions.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < dimensions.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(dimensions.width, y);
        ctx.stroke();
      }

      // Update and draw small floating circles
      circlesRef.current.forEach((circle) => {
        // Update pulse
        circle.pulse += circle.pulseSpeed;
        const pulseFactor = 1 + Math.sin(circle.pulse) * 0.3;
        
        // Mouse interaction
        const dx = mouseRef.current.x - circle.x;
        const dy = mouseRef.current.y - circle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          circle.vx += (dx / distance) * force * 0.003;
          circle.vy += (dy / distance) * force * 0.003;
          circle.opacity = Math.min(0.4, circle.opacity + force * 0.008);
        } else {
          circle.opacity = Math.max(0.05, circle.opacity - 0.001);
        }

        circle.x += circle.vx;
        circle.y += circle.vy;
        
        // Boundary wrapping
        if (circle.x < -circle.size) circle.x = dimensions.width + circle.size;
        if (circle.x > dimensions.width + circle.size) circle.x = -circle.size;
        if (circle.y < -circle.size) circle.y = dimensions.height + circle.size;
        if (circle.y > dimensions.height + circle.size) circle.y = -circle.size;
        
        // Friction
        circle.vx *= 0.998;
        circle.vy *= 0.998;

        // Draw circle with pulse
        const currentSize = circle.size * pulseFactor;
        ctx.fillStyle = getColorRGBA(circle.color, circle.opacity);
        ctx.strokeStyle = getColorRGBA(circle.color, circle.opacity * 0.5);
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Add subtle glow
        if (distance < 120) {
          ctx.fillStyle = getColorRGBA(circle.color, circle.opacity * 0.2);
          ctx.beginPath();
          ctx.arc(circle.x, circle.y, currentSize * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Update and draw particles (keep existing particle system)
      particlesRef.current.forEach((particle) => {
        // Pulse effect
        particle.pulse += 0.02;
        const pulseFactor = 1 + Math.sin(particle.pulse) * 0.3;
        
        // Mouse interaction with enhanced effects
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 180) {
          const force = (180 - distance) / 180;
          particle.vx += (dx / distance) * force * 0.015;
          particle.vy += (dy / distance) * force * 0.015;
          particle.opacity = Math.min(1, particle.opacity + force * 0.03);
          
          // Create trail effect
          if (distance < 100) {
            ctx.fillStyle = getColorRGBA(particle.color, 0.1);
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          particle.opacity = Math.max(0.2, particle.opacity - 0.01);
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Boundary wrapping
        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.y < 0) particle.y = dimensions.height;
        if (particle.y > dimensions.height) particle.y = 0;
        
        // Friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle with pulse
        const currentSize = particle.size * pulseFactor;
        ctx.fillStyle = getColorRGBA(particle.color, particle.opacity);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect for nearby particles
        if (distance < 120) {
          ctx.fillStyle = getColorRGBA(particle.color, particle.opacity * 0.3);
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, currentSize * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw enhanced connections between particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.15;
            const gradient = ctx.createLinearGradient(
              particlesRef.current[i].x, particlesRef.current[i].y,
              particlesRef.current[j].x, particlesRef.current[j].y
            );
            gradient.addColorStop(0, getColorRGBA(particlesRef.current[i].color, opacity));
            gradient.addColorStop(1, getColorRGBA(particlesRef.current[j].color, opacity));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }

      // Enhanced mouse glow with multiple layers
      if (mouseRef.current.x && mouseRef.current.y) {
        // Outer glow
        const gradient1 = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 150
        );
        gradient1.addColorStop(0, 'rgba(6, 182, 212, 0.1)');
        gradient1.addColorStop(0.5, 'rgba(34, 197, 94, 0.05)');
        gradient1.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient1;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 150, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner glow
        const gradient2 = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 50
        );
        gradient2.addColorStop(0, 'rgba(168, 85, 247, 0.15)');
        gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient2;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 50, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions.width, dimensions.height]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)'
      }}
    />
  );
};

export default InteractiveBackground;