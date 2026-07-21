import React, { useEffect, useRef } from "react";

export default function SkillsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let segments = [];
    let adjacency = new Map();
    let signals = [];
    
    // Theme colors matching the 4 quadrants/categories
    const colors = [
      "rgb(59, 130, 246)",  // Blue
      "rgb(34, 211, 238)",  // Cyan
      "rgb(139, 92, 246)", // Purple
      "rgb(16, 185, 129)"  // Emerald
    ];

    let mouse = { x: -1000, y: -1000 };
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getPointKey = (pt) => `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;

    const getSegmentColor = (mx, my, w, h, alpha) => {
      const isLeft = mx < w / 2;
      const isTop = my < h / 2;
      if (isTop && isLeft) return `rgba(59, 130, 246, ${alpha})`;
      if (isTop && !isLeft) return `rgba(34, 211, 238, ${alpha})`;
      if (!isTop && isLeft) return `rgba(139, 92, 246, ${alpha})`;
      return `rgba(16, 185, 129, ${alpha})`;
    };

    const initGrid = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      const R = 75; // Hexagon radius
      const W = R * 1.5;
      const H = R * Math.sqrt(3);
      
      const cols = Math.ceil(width / W) + 2;
      const rows = Math.ceil(height / H) + 2;
      
      const segmentsMap = new Map();
      
      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const cx = col * W;
          const cy = row * H + (col % 2) * (H / 2);
          
          // Generate 6 vertices
          const vertices = [];
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            vertices.push({
              x: cx + R * Math.cos(angle),
              y: cy + R * Math.sin(angle)
            });
          }
          
          // Generate 6 segments
          for (let i = 0; i < 6; i++) {
            const v1 = vertices[i];
            const v2 = vertices[(i + 1) % 6];
            
            // Normalize segments to avoid duplicates
            let p1 = v1;
            let p2 = v2;
            if (p1.x > p2.x || (Math.abs(p1.x - p2.x) < 0.1 && p1.y > p2.y)) {
              p1 = v2;
              p2 = v1;
            }
            
            const segKey = `${getPointKey(p1)}_${getPointKey(p2)}`;
            if (!segmentsMap.has(segKey)) {
              segmentsMap.set(segKey, {
                p1,
                p2,
                key: segKey,
                mx: (p1.x + p2.x) / 2,
                my: (p1.y + p2.y) / 2
              });
            }
          }
        }
      }
      
      segments = Array.from(segmentsMap.values());
      
      // Build adjacency list
      adjacency = new Map();
      segments.forEach((seg) => {
        const k1 = getPointKey(seg.p1);
        const k2 = getPointKey(seg.p2);
        
        if (!adjacency.has(k1)) adjacency.set(k1, []);
        if (!adjacency.has(k2)) adjacency.set(k2, []);
        
        adjacency.get(k1).push(seg);
        adjacency.get(k2).push(seg);
      });

      // Clear existing signals when resizing
      signals = [];
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

    window.addEventListener("resize", initGrid);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    initGrid();

    const spawnSignal = () => {
      if (segments.length === 0 || prefersReducedMotion) return;
      
      const startSeg = segments[Math.floor(Math.random() * segments.length)];
      const startDir = Math.random() > 0.5;
      const p1 = startSeg.p1;
      const p2 = startSeg.p2;
      
      const from = startDir ? p1 : p2;
      const to = startDir ? p2 : p1;
      
      const speed = Math.random() * 0.015 + 0.015;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const maxSegments = Math.floor(Math.random() * 5) + 3; // Length of traversal path
      
      signals.push({
        segmentsVisited: [{ segment: startSeg, from, to }],
        progress: 0,
        speed,
        color,
        maxSegments,
        width: Math.random() * 1.5 + 1.2
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Decaying scroll speed booster
      scrollSpeed *= 0.95;

      // Draw the Hex Grid
      segments.forEach((seg) => {
        // Calculate distance to mouse for interactive highlight
        let alpha = 0.025;
        let glow = 0;
        
        if (mouse.x > -500) {
          const dx = mouse.x - seg.mx;
          const dy = mouse.y - seg.my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            glow = (180 - dist) / 180;
            alpha = 0.025 + glow * 0.12;
          }
        }
        
        ctx.strokeStyle = getSegmentColor(seg.mx, seg.my, width, height, alpha);
        ctx.lineWidth = 1 + glow * 0.5;
        ctx.beginPath();
        ctx.moveTo(seg.p1.x, seg.p1.y);
        ctx.lineTo(seg.p2.x, seg.p2.y);
        ctx.stroke();
      });

      // Update and Draw Signals
      if (!prefersReducedMotion) {
        // Spawn signals based on scrolling or baseline rate
        const spawnChance = 0.03 + (scrollSpeed * 0.02);
        if (Math.random() < spawnChance && signals.length < 25) {
          spawnSignal();
        }

        for (let i = signals.length - 1; i >= 0; i--) {
          const sig = signals[i];
          const scrollBoost = 1 + scrollSpeed * 0.15;
          sig.progress += sig.speed * scrollBoost;

          // Collect visited points for trail drawing
          const pathPoints = [];
          
          // Traverse through all completed segments in reverse order
          for (let j = sig.segmentsVisited.length - 1; j >= 0; j--) {
            const segData = sig.segmentsVisited[j];
            if (j === sig.segmentsVisited.length - 1) {
              // Current active segment: interpolate head
              const hx = segData.from.x + (segData.to.x - segData.from.x) * sig.progress;
              const hy = segData.from.y + (segData.to.y - segData.from.y) * sig.progress;
              pathPoints.push({ x: hx, y: hy });
              pathPoints.push({ x: segData.from.x, y: segData.from.y });
            } else {
              // Completed segments in history
              pathPoints.push({ x: segData.from.x, y: segData.from.y });
            }
          }

          // Check if segment is completed
          if (sig.progress >= 1) {
            const current = sig.segmentsVisited[sig.segmentsVisited.length - 1];
            const reachPt = current.to;
            const reachKey = getPointKey(reachPt);
            
            const options = adjacency.get(reachKey) || [];
            const filtered = options.filter(s => s.key !== current.segment.key);
            
            if (filtered.length > 0 && sig.segmentsVisited.length < sig.maxSegments) {
              const nextSeg = filtered[Math.floor(Math.random() * filtered.length)];
              const nextTo = (getPointKey(nextSeg.p1) === reachKey) ? nextSeg.p2 : nextSeg.p1;
              
              sig.segmentsVisited.push({
                segment: nextSeg,
                from: reachPt,
                to: nextTo
              });
              sig.progress = 0;
            } else {
              // Signal reached the end of its life, remove it
              signals.splice(i, 1);
              continue;
            }
          }

          // Draw Glowing Signal Trail
          if (pathPoints.length > 1) {
            ctx.beginPath();
            ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
            for (let k = 1; k < pathPoints.length; k++) {
              ctx.lineTo(pathPoints[k].x, pathPoints[k].y);
            }
            
            // Faint glow for the path line
            ctx.strokeStyle = sig.color;
            ctx.lineWidth = sig.width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();

            // Glowing head
            const head = pathPoints[0];
            ctx.beginPath();
            ctx.arc(head.x, head.y, sig.width * 1.6, 0, Math.PI * 2);
            ctx.fillStyle = sig.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = sig.color;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset canvas shadow
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // If motion is reduced, just draw a static grid once and freeze
    if (prefersReducedMotion) {
      draw();
    } else {
      draw();
    }

    return () => {
      window.removeEventListener("resize", initGrid);
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
