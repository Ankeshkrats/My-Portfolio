import React, { useEffect, useRef } from "react";

export default function ExperienceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let scrollSpeed = 0;
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
      scrollSpeed = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    resize();

    // Initialize flowing streams
    const count = Math.min(30, Math.floor(canvas.width / 40));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 1.5 + 0.8,
        width: Math.random() * 1.2 + 0.6,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Decaying scroll influence
      scrollSpeed *= 0.93;

      particles.forEach((p) => {
        // Vertical movement affected by scroll velocity
        const velocity = p.speed + scrollSpeed * 0.15;
        p.y += velocity;

        // Wrap around top/bottom
        if (p.y - p.length > canvas.height) {
          p.y = -p.length;
          p.x = Math.random() * canvas.width;
        } else if (p.y < -p.length) {
          p.y = canvas.height + p.length;
          p.x = Math.random() * canvas.width;
        }

        // Draw bend path if cursor is active and close
        ctx.beginPath();
        ctx.lineWidth = p.width;
        ctx.strokeStyle = `rgba(59, 130, 246, ${p.opacity})`;

        const steps = 10;
        const segmentHeight = p.length / steps;

        for (let j = 0; j <= steps; j++) {
          const sy = p.y + j * segmentHeight;
          let sx = p.x;

          // Apply mouse gravitational bend
          if (mouse.x > -500) {
            const dx = mouse.x - sx;
            const dy = mouse.y - sy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220) {
              const bendFactor = (220 - dist) / 220;
              // Pull or push stream horizontally
              sx += (dx / dist) * bendFactor * 45;
            }
          }

          if (j === 0) {
            ctx.moveTo(sx, sy);
          } else {
            ctx.lineTo(sx, sy);
          }
        }

        ctx.stroke();
      });

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
