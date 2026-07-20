import React, { useEffect, useRef } from "react";

export default function ProjectsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let ripples = [];
    let mouse = { x: -1000, y: -1000 };
    let lastScrollY = window.scrollY;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const speed = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      // Spawn a ripple centered on screen if scrolling fast enough
      if (speed > 1.5 && ripples.length < 5) {
        ripples.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          radius: 0,
          maxRadius: Math.max(canvas.width, canvas.height) * 0.8,
          speed: 6 + speed * 0.2,
          opacity: 0.6,
        });
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    resize();

    const gridSize = 45;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update ripples
      ripples.forEach((ripple, rIdx) => {
        ripple.radius += ripple.speed;
        ripple.opacity *= 0.96; // fade out

        if (ripple.radius >= ripple.maxRadius || ripple.opacity < 0.01) {
          ripples.splice(rIdx, 1);
        }
      });

      // Draw grid
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const gx = c * gridSize + gridSize / 2;
          const gy = r * gridSize + gridSize / 2;

          let intensity = 0;

          // Mouse influence
          if (mouse.x > -500) {
            const dx = mouse.x - gx;
            const dy = mouse.y - gy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140) {
              intensity += (140 - dist) / 140 * 0.35;
            }
          }

          // Ripple influence
          ripples.forEach((ripple) => {
            const dx = gx - ripple.x;
            const dy = gy - ripple.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const rippleWidth = 120;
            const distFromWave = Math.abs(dist - ripple.radius);

            if (distFromWave < rippleWidth) {
              const rippleFactor = (1 - distFromWave / rippleWidth) * ripple.opacity;
              intensity += rippleFactor * 0.55;
            }
          });

          // Cap intensity
          intensity = Math.min(1, intensity);

          // Draw grid crosshair or dot
          ctx.save();
          ctx.translate(gx, gy);

          if (intensity > 0.02) {
            // Draw a glowing cross
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.05 + intensity * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-4 - intensity * 3, 0);
            ctx.lineTo(4 + intensity * 3, 0);
            ctx.moveTo(0, -4 - intensity * 3);
            ctx.lineTo(0, 4 + intensity * 3);
            ctx.stroke();

            // Draw a tiny center dot
            ctx.fillStyle = `rgba(139, 92, 246, ${0.1 + intensity * 0.5})`;
            ctx.beginPath();
            ctx.arc(0, 0, 1.2 + intensity * 1, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Static low-opacity background dot
            ctx.fillStyle = "rgba(255, 255, 255, 0.025)";
            ctx.beginPath();
            ctx.arc(0, 0, 1, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent"
    />
  );
}
