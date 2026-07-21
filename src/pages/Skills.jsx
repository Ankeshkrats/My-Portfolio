import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, Terminal, Database, Cpu, Layers, Globe, Zap, Server, 
  HardDrive, Palette, BrainCircuit, MessageSquareCode, LineChart, 
  Bot, GitBranch, Cloud 
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import SectionHeading from "../components/SectionHeading";
import SkillsBackground from "../components/SkillsBackground";
import { skillGroups } from "../data/portfolioData";

// Icon mapping for each specific technology
const skillIconMap = {
  Python: Terminal,
  JavaScript: Cpu,
  "C++": Code2,
  SQL: Database,
  React: Layers,
  "Next.js": Globe,
  "Node.js": Server,
  "Express.js": HardDrive,
  "Tailwind CSS": Palette,
  TensorFlow: BrainCircuit,
  NLP: MessageSquareCode,
  "Scikit-learn": LineChart,
  "LLMs / Groq API": Bot,
  MongoDB: Database,
  "Git & GitHub": GitBranch,
  Vercel: Cloud,
  Render: Server,
};

// Premium Neon accents (Emerald, Blue, Purple, Cyan) based on data tags
const themeColorMap = {
  blue: {
    spotlight: "rgba(59, 130, 246, 0.12)",
    borderHover: "hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.08)]",
    iconColor: "text-blue-400",
    indicatorColor: "bg-blue-500",
    stroke: "#3b82f6",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.25)]",
    text: "text-blue-400"
  },
  cyan: {
    spotlight: "rgba(34, 211, 238, 0.12)",
    borderHover: "hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]",
    iconColor: "text-cyan-400",
    indicatorColor: "bg-cyan-400",
    stroke: "#22d3ee",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.25)]",
    text: "text-cyan-400"
  },
  purple: {
    spotlight: "rgba(139, 92, 246, 0.12)",
    borderHover: "hover:border-purple-500/30 hover:shadow-[0_0_25px_rgba(139,92,246,0.08)]",
    iconColor: "text-purple-400",
    indicatorColor: "bg-purple-500",
    stroke: "#8b5cf6",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.25)]",
    text: "text-purple-400"
  },
  emerald: {
    spotlight: "rgba(16, 185, 129, 0.12)",
    borderHover: "hover:border-emerald-500/30 hover:shadow-[0_0_25px_rgba(16,185,129,0.08)]",
    iconColor: "text-emerald-400",
    indicatorColor: "bg-emerald-500",
    stroke: "#10b981",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    text: "text-emerald-400"
  }
};

function getRating(level) {
  if (level >= 90) return "EXPERT";
  if (level >= 80) return "ADVANCED";
  if (level >= 70) return "PROFICIENT";
  return "COMPETENT";
}

function SpotlightCard({ children, groupColorClass, spotlightColor }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-[#0b0f19]/35 backdrop-blur-xl transition-all duration-300 group ${groupColorClass}`}
    >
      {/* Dynamic Cursor Spotlight Radial Background */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 rounded-2xl z-0"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full justify-between">
        {children}
      </div>
    </div>
  );
}

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Stagger entry configurations for the cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" }
    }
  };

  // Stagger entry configuration for the grid of skill circles
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 140,
        damping: 14
      }
    }
  };

  const circleVariants = {
    hidden: { strokeDashoffset: 201.06 },
    visible: (level) => ({
      strokeDashoffset: 201.06 - (201.06 * level) / 100,
      transition: {
        duration: 1.1,
        ease: "easeOut",
        delay: 0.1
      }
    })
  };

  return (
    <PageWrapper>
      <SkillsBackground />

      <SectionHeading
        title="Skills"
        subtitle="Technologies and tools I work with regularly."
        color="cyan"
      />

      {/* Categories Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid md:grid-cols-2 gap-6 md:gap-8"
      >
        {skillGroups.map((group) => {
          const c = themeColorMap[group.color] || themeColorMap.blue;
          const activeSkillInGroup = hoveredSkill && hoveredSkill.groupTitle === group.title ? hoveredSkill : null;

          return (
            <motion.div key={group.title} variants={cardVariants} className="h-full flex flex-col">
              <SpotlightCard
                groupColorClass={c.borderHover}
                spotlightColor={c.spotlight}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-8">
                    <div className={`w-2.5 h-2.5 rounded-full ${c.indicatorColor} shadow-[0_0_10px_rgba(255,255,255,0.15)]`} />
                    <h3 className="text-white font-bold text-lg tracking-tight">
                      {group.title}
                    </h3>
                  </div>

                  {/* Skills Grid */}
                  <motion.div
                    variants={gridVariants}
                    className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-3 gap-y-8 gap-x-4 justify-items-center py-4"
                  >
                    {group.skills.map((skill) => {
                      const Icon = skillIconMap[skill.name] || Code2;
                      const isCurrentHovered = hoveredSkill?.name === skill.name;
                      const isAnyHovered = hoveredSkill !== null;

                      // Dim styling if another node is hovered
                      const dimClass = isAnyHovered && !isCurrentHovered 
                        ? "opacity-35 scale-[0.93] blur-[0.4px]" 
                        : "opacity-100 scale-100";

                      return (
                        <motion.div
                          key={skill.name}
                          variants={nodeVariants}
                          className={`flex flex-col items-center gap-3 w-full cursor-pointer relative transition-all duration-300 ${dimClass}`}
                          onMouseEnter={() => setHoveredSkill({
                            name: skill.name,
                            level: skill.level,
                            groupTitle: group.title
                          })}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          {/* Radial Progress Ring wrapper */}
                          <div className="relative w-20 h-20 flex items-center justify-center">
                            {/* SVG Outer Rings */}
                            <svg className="absolute inset-0 w-20 h-20 transform -rotate-90">
                              {/* Background track circle */}
                              <circle
                                cx="40"
                                cy="40"
                                r="32"
                                className="stroke-white/5 fill-none"
                                strokeWidth="4.5"
                              />
                              {/* Foreground progress circle */}
                              <motion.circle
                                cx="40"
                                cy="40"
                                r="32"
                                className="fill-none"
                                stroke={c.stroke}
                                strokeWidth="4.5"
                                strokeLinecap="round"
                                custom={skill.level}
                                variants={circleVariants}
                                style={{ strokeDasharray: 201.06 }}
                              />
                            </svg>

                            {/* Inner Circle displaying Icon or Percentage on hover */}
                            <div className={`z-10 flex items-center justify-center w-13 h-13 rounded-full bg-[#05070d]/80 border border-white/5 backdrop-blur-sm transition-all duration-300 ${isCurrentHovered ? `${c.glow} border-${group.color}-500/25` : ""}`}>
                              <AnimatePresence mode="wait">
                                {isCurrentHovered ? (
                                  <motion.span
                                    key="percentage"
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    className={`text-xs font-mono font-bold ${c.text}`}
                                  >
                                    {skill.level}%
                                  </motion.span>
                                ) : (
                                  <motion.div
                                    key="icon"
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                  >
                                    <Icon size={19} className={`${c.iconColor} transition-colors`} />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          {/* Skill Name */}
                          <span className={`text-xs font-semibold tracking-wide text-gray-300 transition-colors duration-300 text-center truncate max-w-full px-1 ${isCurrentHovered ? "text-white" : ""}`}>
                            {skill.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Monospace Telemetry Diagnostic Panel */}
                <div className={`mt-8 pt-4 border-t border-white/5 font-mono text-[10px] sm:text-xs tracking-wider transition-colors duration-300 ${activeSkillInGroup ? c.text : 'text-gray-500/70'}`}>
                  <div className="flex items-center justify-between min-h-[16px]">
                    <span>
                      {activeSkillInGroup ? (
                        <span>
                          SYS STATUS: <span className="text-white font-semibold">ACTIVE</span> // TECH: {activeSkillInGroup.name.toUpperCase()} // LEVEL: {activeSkillInGroup.level}% // CLASS: {getRating(activeSkillInGroup.level)}
                        </span>
                      ) : (
                        <span>
                          SYS STATUS: <span className="opacity-70">ONLINE</span> // PORTFOLIO_CORE // READY_DIAGNOSTICS
                        </span>
                      )}
                    </span>
                    <span className="w-1.5 h-3 bg-current animate-pulse ml-2 shrink-0" />
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </motion.div>
    </PageWrapper>
  );
}
