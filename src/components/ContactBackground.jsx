import React, { useEffect, useRef } from "react";

export default function ContactBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;
    let mouse = { x: -1000, y: -1000 };
    let scrollY = window.scrollY;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

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
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    resize();

    const spacing = 50;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.015;
      scrollVelocity *= 0.94; // decay scroll force

      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * spacing;
          const y = r * spacing;

          // Calculate angle to mouse
          let angle = 0;
          let activeGlow = 0;

          if (mouse.x > -500) {
            const dx = mouse.x - x;
            const dy = mouse.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            angle = Math.atan2(dy, dx);

            if (dist < 200) {
              activeGlow = (200 - dist) / 200;
            }
          } else {
            // Idle movement (wave pattern)
            angle = Math.sin(x * 0.01 + y * 0.01 + time) * Math.PI;
          }

          // Apply wavy offset from scrolling
          const scrollOffset = Math.sin(c * 0.2 + time) * scrollVelocity * 0.15;

          ctx.save();
          ctx.translate(x, y + scrollOffset);
          ctx.rotate(angle);

          // Draw a needle
          ctx.strokeStyle = activeGlow > 0.05
            ? `rgba(16, 185, 129, ${0.1 + activeGlow * 0.45})`
            : "rgba(16, 185, 129, 0.07)";
          ctx.lineWidth = activeGlow > 0.05 ? 1.5 : 1;

          ctx.beginPath();
          ctx.moveTo(-6 - activeGlow * 4, 0);
          ctx.lineTo(6 + activeGlow * 4, 0);
          ctx.stroke();

          // Arrow tip on the needle pointing at the target
          if (activeGlow > 0.1) {
            ctx.fillStyle = `rgba(16, 185, 129, ${0.2 + activeGlow * 0.6})`;
            ctx.beginPath();
            ctx.moveTo(4 + activeGlow * 4, -3);
            ctx.lineTo(8 + activeGlow * 6, 0);
            ctx.lineTo(4 + activeGlow * 4, 3);
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
