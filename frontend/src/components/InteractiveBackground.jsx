import React, { useEffect, useRef, useState } from 'react';

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef();
  const particlesRef = useRef([]);
  const circlesRef = useRef([]);
  const explosionTriggeredRef = useRef(false);
  const hideConnectionsRef = useRef(false);

  // for constellation lines
  const constellationRef = useRef(null);
  const constellationActiveRef = useRef(false);

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

    // ✅ Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(
        600,
        Math.floor((dimensions.width * dimensions.height) / 7000)
      );
      for (let i = 0; i < particleCount; i++) {
        // Change: Much slower random movement (0.15 instead of 0.6)
        let vx = (Math.random() - 0.5) * 0.15; 
        let vy = (Math.random() - 0.5) * 0.15;
        
        // Ensure they aren't completely stationary
        if (Math.abs(vx) < 0.01) vx = 0.01 * (Math.random() < 0.5 ? -1 : 1);
        if (Math.abs(vy) < 0.01) vy = 0.01 * (Math.random() < 0.5 ? -1 : 1);

        particlesRef.current.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx,
          vy,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: ['cyan', 'green', 'purple', 'orange'][Math.floor(Math.random() * 4)],
          pulse: Math.random() * Math.PI * 2,
          history: [] // Change: Add history for trails
        });
      }
    };

    // ✅ Initialize circles
    const initCircles = () => {
      circlesRef.current = [];
      const circleCount = Math.min(40, Math.floor(dimensions.width / 70));
      for (let i = 0; i < circleCount; i++) {
        // Change: Very slow movement for circles (0.05 instead of 0.3)
        let vx = (Math.random() - 0.5) * 0.05;
        let vy = (Math.random() - 0.5) * 0.05;

        circlesRef.current.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx,
          vy,
          size: Math.random() * 8 + 4,
          opacity: Math.random() * 0.15 + 0.05,
          color: ['cyan', 'green', 'purple', 'orange'][Math.floor(Math.random() * 4)],
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulse: Math.random() * Math.PI * 2,
          history: [] // Change: Add history for trails
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

    const createConstellation = (cluster) => {
      const pairs = [];
      for (let i = 0; i < cluster.length; i++) {
        for (let j = i + 1; j < cluster.length; j++) {
          if (Math.random() < 0.5) pairs.push([cluster[i], cluster[j]]);
        }
      }
      if (pairs.length === 0) return;
      constellationRef.current = {
        pairs,
        startTime: Date.now(),
        duration: 4000
      };
      constellationActiveRef.current = true;
      setTimeout(() => {
        constellationActiveRef.current = false;
      }, 5000);
    };

    // Helper to draw comet trail
    const drawTrail = (ctx, obj, speedThreshold) => {
      const speed = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy);
      
      // Update history
      obj.history.push({ x: obj.x, y: obj.y });
      // Keep trailing length shorter or longer depending on preference
      if (obj.history.length > 8) obj.history.shift();

      // Only draw trail if moving fast (bursting)
      if (speed > speedThreshold) {
        for (let i = 0; i < obj.history.length; i++) {
          const point = obj.history[i];
          const progress = i / obj.history.length; // 0 to 1
          const trailSize = obj.size * progress; // Tapers from 0 to full size
          const trailOpacity = obj.opacity * progress * 0.5; // Fades out at the tail

          ctx.fillStyle = getColorRGBA(obj.color, trailOpacity);
          ctx.beginPath();
          ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // --- detect cluster near cursor ---
      let clusterCount = 0;
      const cluster = [];
      
      // Check distance for particles
      particlesRef.current.forEach((p) => {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          clusterCount++;
          cluster.push(p);
        }
      });
      // Check distance for circles
      circlesRef.current.forEach((c) => {
        const dx = mouseRef.current.x - c.x;
        const dy = mouseRef.current.y - c.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          clusterCount++;
          cluster.push(c);
        }
      });

      // --- explosion when 10 nearby ---
      if (clusterCount >= 10 && !explosionTriggeredRef.current) {
        explosionTriggeredRef.current = true;
        hideConnectionsRef.current = true;
        const cx = mouseRef.current.x;
        const cy = mouseRef.current.y;
        
        particlesRef.current.forEach((p) => {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const angle = Math.atan2(dy, dx);
            const force = 4 + Math.random() * 2;
            p.vx = Math.cos(angle) * force;
            p.vy = Math.sin(angle) * force;
          }
        });
        circlesRef.current.forEach((c) => {
          const dx = c.x - cx;
          const dy = c.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const angle = Math.atan2(dy, dx);
            const force = 3 + Math.random() * 2;
            c.vx = Math.cos(angle) * force;
            c.vy = Math.sin(angle) * force;
          }
        });
        setTimeout(() => {
          explosionTriggeredRef.current = false;
          hideConnectionsRef.current = false;
        }, 2000);
      }

      // --- constellation logic ---
      if (clusterCount >= 8 && !constellationActiveRef.current && !hideConnectionsRef.current) {
        createConstellation(cluster);
      }

      // --- update circles ---
      circlesRef.current.forEach((c) => {
        c.pulse += c.pulseSpeed;
        const dx = mouseRef.current.x - c.x;
        const dy = mouseRef.current.y - c.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Attraction logic
        if (dist < 150) {
          const force = (150 - dist) / 150;
          c.vx += (dx / dist) * force * 0.003;
          c.vy += (dy / dist) * force * 0.003;
          c.opacity = Math.min(0.4, c.opacity + force * 0.008);
        }

        // Apply movement
        c.x += c.vx;
        c.y += c.vy;

        // Wrap around screen
        if (c.x < -c.size) c.x = dimensions.width + c.size;
        if (c.x > dimensions.width + c.size) c.x = -c.size;
        if (c.y < -c.size) c.y = dimensions.height + c.size;
        if (c.y > dimensions.height + c.size) c.y = -c.size;

        // Friction
        c.vx *= 0.995;
        c.vy *= 0.995;

        // Change: Draw Comet Trail if fast (threshold 1.0)
        drawTrail(ctx, c, 1.0);

        // Draw Main Circle
        ctx.fillStyle = getColorRGBA(c.color, c.opacity);
        ctx.beginPath();
        // Change: Reduced pulse effect from 0.3 to 0.08 (subtle breathing)
        const pulseSize = c.size * (1 + Math.sin(c.pulse) * 0.08); 
        ctx.arc(c.x, c.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- update particles ---
      particlesRef.current.forEach((p) => {
        p.pulse += 0.02;
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.vx += (dx / dist) * force * 0.015;
          p.vy += (dy / dist) * force * 0.015;
          p.opacity = Math.min(1, p.opacity + force * 0.03);
        }
        
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = dimensions.width;
        if (p.x > dimensions.width) p.x = 0;
        if (p.y < 0) p.y = dimensions.height;
        if (p.y > dimensions.height) p.y = 0;

        p.vx *= 0.995;
        p.vy *= 0.995;

        // Change: Draw Comet Trail if fast (threshold 1.5)
        drawTrail(ctx, p, 1.5);

        ctx.fillStyle = getColorRGBA(p.color, p.opacity);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + Math.sin(p.pulse) * 0.3), 0, Math.PI * 2);
        ctx.fill();
      });

      // --- normal particle connections ---
      if (!hideConnectionsRef.current) {
        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const dx = particlesRef.current[i].x - particlesRef.current[j].x;
            const dy = particlesRef.current[i].y - particlesRef.current[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              const opacity = (120 - dist) / 120 * 0.1;
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
      }

      // --- constellation lines ---
      if (constellationRef.current && !hideConnectionsRef.current) {
        const now = Date.now();
        const elapsed = now - constellationRef.current.startTime;
        if (elapsed < constellationRef.current.duration) {
          const progress = elapsed / constellationRef.current.duration;
          let opacityFactor = 0;
          if (progress < 0.25) opacityFactor = progress / 0.25;
          else if (progress < 0.75) opacityFactor = 1;
          else opacityFactor = 1 - (progress - 0.75) / 0.25;

          constellationRef.current.pairs.forEach(([p1, p2]) => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
              const opacity = 0.15 * opacityFactor;
              const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
              gradient.addColorStop(0, getColorRGBA(p1.color, opacity));
              gradient.addColorStop(1, getColorRGBA(p2.color, opacity));
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1.2;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });
        } else {
          constellationRef.current = null;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [dimensions.width, dimensions.height]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        // Change: Ultrablack background
        backgroundColor: '#000000'
      }}
    />
  );
};

export default InteractiveBackground;