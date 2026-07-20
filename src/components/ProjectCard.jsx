import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FileText, Bot, TrendingUp, Shield, Home as HomeIcon, Github } from "lucide-react";

const iconMap = {
  file: FileText,
  bot: Bot,
  "trending-up": TrendingUp,
  shield: Shield,
  home: HomeIcon,
};

export default function ProjectCard({ project, index = 0 }) {
  const Icon = iconMap[project.icon] || FileText;

  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 25 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Determine neon glow hover styles based on project category
  const glowStyle = project.category === "AI/ML"
    ? "hover:border-[#2563EB]/40 hover:shadow-[0_0_25px_rgba(37,99,235,0.12)]"
    : "hover:border-[#10B981]/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.12)]";

  const themeText = project.category === "AI/ML" ? "text-blue-400 hover:text-blue-300" : "text-emerald-400 hover:text-emerald-300";
  const badgeGlow = project.category === "AI/ML" ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -8 }}
        className={`tilt-card bg-[#0F172A]/40 backdrop-blur-xl border border-white/5 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 group ${glowStyle}`}
      >
        
        {/* Top Half: Image Thumbnail Placeholder */}
        <div className="w-full h-[170px] overflow-hidden relative border-b border-white/5 bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center">
          
          {/* Zooming background container on hover */}
          <div className="w-full h-full absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105 flex items-center justify-center">
            
            {/* Tech grid texture pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px]" />
            
            {/* Floating blur glow orb */}
            <div className={`absolute w-[120px] h-[120px] rounded-full blur-[35px] opacity-30 ${project.category === "AI/ML" ? "bg-[#2563EB]" : "bg-[#10B981]"}`} />
            
            {/* Icon showcase panel */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-[#080B12]/80 border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.35)] ${project.category === "AI/ML" ? "text-blue-400" : "text-emerald-400"}`}>
              <Icon size={24} />
            </div>
            
          </div>
          
        </div>

        {/* Bottom Half: Info Padding */}
        <div className="p-6 flex flex-col flex-1 z-10 relative">
          
          {/* Title */}
          <h3 className="text-white font-bold text-lg mb-3 tracking-tight group-hover:text-white transition-colors">
            {project.title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md border ${badgeGlow}`}
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
          <div className="flex items-center justify-between mt-auto">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className={`cursor-hover inline-flex items-center gap-1 text-sm font-semibold transition-colors ${themeText}`}
            >
              Live Demo ↗
            </a>
            
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              title="Source Code"
              className="cursor-hover text-gray-400 hover:text-white transition-colors p-1"
            >
              <Github size={19} />
            </a>
          </div>

        </div>

      </motion.div>
    </motion.div>
  );
}