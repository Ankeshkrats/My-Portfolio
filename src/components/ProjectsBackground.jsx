import React, { useEffect, useRef } from "react";

export default function ProjectsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let signals = [];
    let time = 0;

    let mouse = { x: -1000, y: -1000 };
    let scrollY = window.scrollY;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      signals = []; // reset signals on resize to keep count stable
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
      scrollY = window.scrollY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    resize();

    const gridSize = 65;

    const spawnSignal = (colsCount) => {
      if (prefersReducedMotion) return;
      
      const col = Math.floor(Math.random() * (colsCount - 4)) + 2;
      const dir = Math.random() > 0.5 ? 1 : -1;
      const speed = Math.random() * 0.02 + 0.02;
      const color = Math.random() > 0.5 
        ? "rgb(139, 92, 246)" // Purple
        : "rgb(34, 211, 238)"; // Cyan
      const maxSteps = Math.floor(Math.random() * 12) + 8;

      signals.push({
        col,
        row: 0,
        progress: 0,
        speed,
        dir,
        color,
        maxSteps,
        stepCount: 0,
        width: Math.random() * 1.5 + 1.2
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      if (!prefersReducedMotion) {
        time += 1;
      }

      const colsCount = Math.ceil(width / gridSize) + 4;
      const rowsCount = Math.ceil(height / gridSize) + 4;

      // 1. Precompute node coordinates with breathing float and parallax scroll
      const nodes = [];
      for (let col = 0; col < colsCount; col++) {
        nodes[col] = [];
        for (let row = 0; row < rowsCount; row++) {
          const bx = (col - 2) * gridSize;
          const by = (row - 2) * gridSize;
          
          let floatX = 0;
          let floatY = 0;
          if (!prefersReducedMotion) {
            floatX = Math.cos(time * 0.008 + col * 0.4 + row * 0.3) * 4;
            floatY = Math.sin(time * 0.008 + col * 0.3 + row * 0.4) * 4;
          }

          // Slow parallax relative to page scrolling
          const parallaxY = scrollY * 0.12;

          nodes[col][row] = {
            x: bx + floatX,
            y: by + floatY + parallaxY,
            glow: 0
          };

          // Mouse coordinate glow calculation
          if (mouse.x > -500) {
            const dx = mouse.x - nodes[col][row].x;
            const dy = mouse.y - nodes[col][row].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 185) {
              nodes[col][row].glow = (185 - dist) / 185;
            }
          }
        }
      }

      // 2. Draw Diagonal Grid Wireframe
      for (let col = 0; col < colsCount - 1; col++) {
        for (let row = 0; row < rowsCount - 1; row++) {
          const n1 = nodes[col][row];
          const n2 = nodes[col + 1][row + 1];
          const n3 = nodes[col + 1][row];
          const n4 = nodes[col][row + 1];

          // Down-Right lines
          let glow1 = Math.max(n1.glow, n2.glow);
          ctx.strokeStyle = glow1 > 0.1 
            ? `rgba(139, 92, 246, ${0.012 + glow1 * 0.08})`
            : "rgba(255, 255, 255, 0.012)";
          ctx.lineWidth = glow1 > 0.1 ? 1 + glow1 * 0.5 : 1;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();

          // Down-Left lines
          let glow2 = Math.max(n3.glow, n4.glow);
          ctx.strokeStyle = glow2 > 0.1
            ? `rgba(34, 211, 238, ${0.012 + glow2 * 0.08})`
            : "rgba(255, 255, 255, 0.012)";
          ctx.lineWidth = glow2 > 0.1 ? 1 + glow2 * 0.5 : 1;
          ctx.beginPath();
          ctx.moveTo(n3.x, n3.y);
          ctx.lineTo(n4.x, n4.y);
          ctx.stroke();
        }
      }

      // 3. Draw Grid Intersection Points
      for (let col = 0; col < colsCount; col++) {
        for (let row = 0; row < rowsCount; row++) {
          const node = nodes[col][row];
          ctx.beginPath();
          ctx.arc(node.x, node.y, 1.2 + node.glow * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = node.glow > 0
            ? `rgba(139, 92, 246, ${0.055 + node.glow * 0.35})`
            : "rgba(255, 255, 255, 0.02)";
          ctx.fill();
        }
      }

      // 4. Update and Draw Moving Data Packets
      if (!prefersReducedMotion) {
        if (Math.random() < 0.025 && signals.length < 20) {
          spawnSignal(colsCount);
        }

        for (let i = signals.length - 1; i >= 0; i--) {
          const sig = signals[i];
          sig.progress += sig.speed;

          // Out-of-bounds boundary safety checks
          if (
            sig.col < 0 || 
            sig.col >= colsCount - 1 || 
            sig.row < 0 || 
            sig.row >= rowsCount - 1 ||
            (sig.dir === -1 && sig.col === 0)
          ) {
            signals.splice(i, 1);
            continue;
          }

          const startNode = nodes[sig.col][sig.row];
          const endNode = nodes[sig.col + sig.dir][sig.row + 1];

          if (!startNode || !endNode) {
            signals.splice(i, 1);
            continue;
          }

          // Interpolated coordinate of packet head
          const px = startNode.x + (endNode.x - startNode.x) * sig.progress;
          const py = startNode.y + (endNode.y - startNode.y) * sig.progress;

          // Draw Glowing Packet Head
          ctx.beginPath();
          ctx.arc(px, py, sig.width * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = sig.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = sig.color;
          ctx.fill();
          ctx.shadowBlur = 0; // reset shadow

          // Draw small trail
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(startNode.x, startNode.y);
          ctx.strokeStyle = sig.color;
          ctx.lineWidth = sig.width;
          ctx.stroke();

          if (sig.progress >= 1) {
            sig.col += sig.dir;
            sig.row += 1;
            sig.progress = 0;
            sig.stepCount += 1;

            if (sig.stepCount >= sig.maxSteps) {
              signals.splice(i, 1);
            }
          }
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
      style={{ willChange: "transform" }}
    />
  );
}
