import React, { useEffect, useRef } from "react";

export default function AboutBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let shapes = [];
    let gridOffset = { x: 0, y: 0 };

    let mouse = { x: -1000, y: -1000 };
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;
    let targetScrollSpeed = 0;

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
      targetScrollSpeed = (currentScrollY - lastScrollY) * 0.4;
      lastScrollY = currentScrollY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    resize();

    // Initialize tiny glowing particles (very subtle, low quantity)
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -(Math.random() * 0.3 + 0.15),
        color: i % 2 === 0 ? "rgba(37, 99, 235, 0.25)" : "rgba(124, 58, 237, 0.25)",
        glow: Math.random() * 4 + 2,
      });
    }

    // Initialize floating geometric outlines (extremely subtle)
    const shapeCount = 10;
    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 16 + 10,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: -(Math.random() * 0.25 + 0.1),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
        type: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)],
        color: i % 2 === 0 ? "rgba(37, 99, 235, 0.06)" : "rgba(124, 58, 237, 0.06)",
        strokeColor: i % 2 === 0 ? "rgba(37, 99, 235, 0.15)" : "rgba(124, 58, 237, 0.15)",
      });
    }

    const draw = () => {
      // Background gradient
      ctx.fillStyle = "#080B12";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Radial background glows for stripe/vercel styling
      const radialGradient = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.3, 10,
        canvas.width * 0.8, canvas.height * 0.3, Math.max(canvas.width, canvas.height) * 0.45
      );
      radialGradient.addColorStop(0, "rgba(37, 99, 235, 0.05)");
      radialGradient.addColorStop(1, "rgba(8, 11, 18, 0)");
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const radialGradient2 = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.7, 10,
        canvas.width * 0.2, canvas.height * 0.7, Math.max(canvas.width, canvas.height) * 0.45
      );
      radialGradient2.addColorStop(0, "rgba(124, 58, 237, 0.04)");
      radialGradient2.addColorStop(1, "rgba(8, 11, 18, 0)");
      ctx.fillStyle = radialGradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Decaying scroll speed
      scrollSpeed += (targetScrollSpeed - scrollSpeed) * 0.08;
      targetScrollSpeed *= 0.9;

      // 1. Draw Grid Lines (moving slightly on scroll and mouse)
      ctx.strokeStyle = "rgba(30, 41, 59, 0.16)";
      ctx.lineWidth = 1;
      const gridSize = 80;

      // Calculate interactive shift for grid
      let mouseShiftX = 0;
      let mouseShiftY = 0;
      if (mouse.x > -500) {
        mouseShiftX = (mouse.x - canvas.width / 2) * 0.015;
        mouseShiftY = (mouse.y - canvas.height / 2) * 0.015;
      }
      gridOffset.y += scrollSpeed * 0.1;

      const offsetX = mouseShiftX % gridSize;
      const offsetY = (mouseShiftY + gridOffset.y) % gridSize;

      // Vertical lines
      for (let x = offsetX; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      // Horizontal lines
      for (let y = offsetY; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 2. Draw Tiny Floating Outline Shapes
      shapes.forEach((shape) => {
        shape.y += shape.speedY - scrollSpeed * 0.15;
        shape.x += shape.speedX;
        shape.rotation += shape.rotationSpeed;

        // Wrap boundaries
        if (shape.y < -shape.size) {
          shape.y = canvas.height + shape.size;
          shape.x = Math.random() * canvas.width;
        } else if (shape.y > canvas.height + shape.size) {
          shape.y = -shape.size;
          shape.x = Math.random() * canvas.width;
        }
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
        else if (shape.x > canvas.width + shape.size) shape.x = -shape.size;

        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.strokeStyle = shape.strokeColor;
        ctx.lineWidth = 1;

        ctx.beginPath();
        if (shape.type === "circle") {
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
        } else if (shape.type === "square") {
          ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
        } else if (shape.type === "triangle") {
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.lineTo(-shape.size / 2, shape.size / 2);
          ctx.closePath();
        }
        ctx.stroke();
        ctx.restore();
      });

      // 3. Draw Small Glowing Particles
      particles.forEach((p) => {
        p.y += p.speedY - scrollSpeed * 0.08;
        p.x += p.speedX;

        // Mouse displacement
        if (mouse.x > -500) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            // Push away subtly
            p.x -= (dx / dist) * force * 0.35;
            p.y -= (dy / dist) * force * 0.35;
          }
        }

        // Wrap boundaries
        if (p.y < -p.radius) {
          p.y = canvas.height + p.radius;
          p.x = Math.random() * canvas.width;
        } else if (p.y > canvas.height + p.radius) {
          p.y = -p.radius;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -p.radius) p.x = canvas.width + p.radius;
        else if (p.x > canvas.width + p.radius) p.x = -p.radius;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.glow;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
