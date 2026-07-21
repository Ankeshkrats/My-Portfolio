import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { FileText, Bot, TrendingUp, Shield, Home as HomeIcon, Github } from "lucide-react";

const iconMap = {
  file: FileText,
  bot: Bot,
  "trending-up": TrendingUp,
  shield: Shield,
  home: HomeIcon,
};

export default function ProjectCard({ project, index = 0, isFeatured = false }) {
  const Icon = iconMap[project.icon] || FileText;

  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 260, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 260, damping: 25 });

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // 3D Tilt calculation
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);

    // Spotlight cursor tracking
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsFocused(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsFocused(false);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Determine theme settings based on category
  const isAI = project.category === "AI/ML";
  const theme = isAI
    ? {
        accent: "#3b82f6",
        spotlightBg: "rgba(59, 130, 246, 0.05)",
        borderColor: "rgba(59, 130, 246, 0.25)",
        textClass: "text-blue-400 hover:text-blue-300",
        badgeGlow: "bg-blue-950/10 border-white/5 text-gray-400",
        badgeActive: "bg-blue-500/10 border-blue-400/30 text-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.15)]",
        glowShadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.12)] hover:border-blue-500/35",
        headerOrb: "bg-blue-500",
        badgeText: "AI/ML"
      }
    : {
        accent: "#10b981",
        spotlightBg: "rgba(16, 185, 129, 0.05)",
        borderColor: "rgba(16, 185, 129, 0.25)",
        textClass: "text-emerald-400 hover:text-emerald-300",
        badgeGlow: "bg-emerald-950/10 border-white/5 text-gray-400",
        badgeActive: "bg-emerald-500/10 border-emerald-400/30 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.15)]",
        glowShadow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.12)] hover:border-emerald-500/35",
        headerOrb: "bg-emerald-500",
        badgeText: "Web Dev"
      };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{ perspective: 1200 }}
      className={`w-full ${isFeatured ? "md:col-span-2" : "col-span-1"}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -6 }}
        className={`tilt-card relative overflow-hidden rounded-2xl bg-white/5 border border-white/5 flex transition-all duration-300 group ${theme.glowShadow} ${
          isFeatured ? "flex-col md:flex-row md:min-h-[290px]" : "flex-col"
        }`}
      >
        {/* Cursor-Tracking Spotlight Border Gradient */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, ${theme.borderColor}, transparent 80%)`,
          }}
        />

        {/* Inner Card Background Mask */}
        <div
          className="absolute inset-[1px] rounded-[15px] bg-[#0c101d]/95 backdrop-blur-xl z-10 pointer-events-none transition-all duration-300"
          style={{
            background: isFocused
              ? `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, ${theme.spotlightBg}, #0c101d 75%)`
              : "#0c101d",
          }}
        />

        {/* Featured Pulse Badge */}
        {isFeatured && (
          <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase text-amber-400 bg-amber-400/10 border border-amber-400/20 shadow-[0_0_10px_rgba(245,158,11,0.15)] animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Featured
          </div>
        )}

        {/* Top/Left Half: Image Thumbnail Mesh Showcase */}
        <div
          className={`overflow-hidden relative z-20 border-white/5 bg-[#090d16] flex items-center justify-center ${
            isFeatured
              ? "w-full md:w-[42%] h-[170px] md:h-auto border-b md:border-b-0 md:border-r"
              : "w-full h-[170px] border-b"
          }`}
        >
          {/* Zooming container on hover */}
          <div className="w-full h-full absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105 flex items-center justify-center">
            
            {/* Tech grid texture pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] z-20 pointer-events-none" />
            
            {/* Liquid Gradient Mesh Orbs */}
            <motion.div
              animate={{
                x: [0, 15, -10, 0],
                y: [0, -10, 15, 0],
                scale: [1, 1.15, 0.9, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`absolute w-36 h-36 rounded-full blur-2xl opacity-20 ${theme.headerOrb} z-10`}
            />
            <motion.div
              animate={{
                x: [0, -15, 10, 0],
                y: [0, 15, -10, 0],
                scale: [1, 0.9, 1.15, 1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute w-36 h-36 rounded-full blur-2xl opacity-15 bg-[#8b5cf6] z-10"
            />
            
            {/* Floating Icon showcase panel */}
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-[#05070d]/85 border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-300 z-30 ${
                isHovered
                  ? "scale-110 rotate-3 shadow-[0_8px_24px_rgba(0,0,0,0.5)] border-white/20"
                  : ""
              }`}
            >
              <Icon size={24} className={`${isAI ? "text-blue-400" : "text-emerald-400"}`} />
            </div>
            
          </div>
        </div>

        {/* Bottom/Right Half: Details */}
        <div className="p-6 flex flex-col flex-1 z-20 relative">
          {/* Card Category Header */}
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${isAI ? "text-blue-400/80" : "text-emerald-400/80"}`}>
              {theme.badgeText}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-white font-bold text-lg mb-3 tracking-tight group-hover:text-white transition-colors">
            {project.title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[9px] font-mono font-semibold px-2.5 py-1 rounded-md border transition-all duration-300 ${
                  isHovered ? theme.badgeActive : theme.badgeGlow
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex items-center justify-between mt-auto pt-2">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className={`cursor-hover inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${theme.textClass}`}
            >
              <span className="inline-flex items-center gap-1">
                Live Demo
                <span className="relative overflow-hidden w-3 h-3 flex items-center">
                  <motion.span
                    className="absolute"
                    animate={isHovered ? { x: 12, opacity: 0 } : { x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    ↗
                  </motion.span>
                  <motion.span
                    className="absolute"
                    initial={{ x: -12, opacity: 0 }}
                    animate={isHovered ? { x: 0, opacity: 1 } : { x: -12, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </span>
              </span>
            </a>
            
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              title="Source Code"
              className="cursor-hover text-gray-400 hover:text-white transition-colors p-1"
            >
              <Github size={19} className="transition-transform duration-300 hover:scale-110" />
            </a>
          </div>

        </div>

      </motion.div>
    </motion.div>
  );
}