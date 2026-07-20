import React, { useEffect, useRef } from "react";

export default function SkillsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let nodes = [];
    let signals = [];

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
      scrollSpeed = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    resize();

    // Initialize nodes
    const count = Math.min(40, Math.floor(canvas.width / 35));
    for (let i = 0; i < count; i++) {
      nodes.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2 + 1.5,
        connections: [],
      });
    }

    // Build static connection topology (within 160px distance)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          nodes[i].connections.push(nodes[j]);
          nodes[j].connections.push(nodes[i]);
        }
      }
    }

    const spawnSignal = () => {
      if (nodes.length === 0) return;
      const startNode = nodes[Math.floor(Math.random() * nodes.length)];
      if (startNode.connections.length === 0) return;
      const endNode = startNode.connections[Math.floor(Math.random() * startNode.connections.length)];
      signals.push({
        startX: startNode.x,
        startY: startNode.y,
        endX: endNode.x,
        endY: endNode.y,
        progress: 0,
        speed: Math.random() * 0.015 + 0.005,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Decaying scroll speed
      scrollSpeed *= 0.95;

      // Spawn rate based on scrolling activity
      const baseChance = 0.02;
      const scrollChance = scrollSpeed * 0.01;
      if (Math.random() < baseChance + scrollChance && signals.length < 30) {
        spawnSignal();
      }

      // Update and draw nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        // Bounce from walls
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        // Interaction with mouse
        let nodeGlow = 0;
        if (mouse.x > -500) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            nodeGlow = (180 - dist) / 180;
            // subtle push away
            n.x -= (dx / dist) * nodeGlow * 0.2;
            n.y -= (dy / dist) * nodeGlow * 0.2;
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + nodeGlow * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = nodeGlow > 0.1 
          ? `rgba(34, 211, 238, ${0.2 + nodeGlow * 0.4})` 
          : "rgba(34, 211, 238, 0.12)";
        ctx.shadowBlur = nodeGlow * 10;
        ctx.shadowColor = "rgba(34, 211, 238, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw connection lines
      ctx.strokeStyle = "rgba(34, 211, 238, 0.04)";
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.connections.forEach((n2) => {
          // Check proximity of both to mouse
          let lineAlpha = 0.04;
          if (mouse.x > -500) {
            const d1 = Math.sqrt((mouse.x - n1.x) ** 2 + (mouse.y - n1.y) ** 2);
            const d2 = Math.sqrt((mouse.x - n2.x) ** 2 + (mouse.y - n2.y) ** 2);
            if (d1 < 150 || d2 < 150) {
              lineAlpha = 0.15 * (1 - Math.min(d1, d2) / 150);
            }
          }
          ctx.strokeStyle = `rgba(34, 211, 238, ${lineAlpha})`;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        });
      }

      // Update and draw signals
      signals.forEach((s, idx) => {
        // speed up signals when scrolling
        const currentSpeed = s.speed * (1 + scrollSpeed * 0.2);
        s.progress += currentSpeed;

        if (s.progress >= 1) {
          signals.splice(idx, 1);
          return;
        }

        const cx = s.startX + (s.endX - s.startX) * s.progress;
        const cy = s.startY + (s.endY - s.startY) * s.progress;

        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.85)";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgb(6, 182, 212)";
        ctx.fill();
        ctx.shadowBlur = 0;
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
