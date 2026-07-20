import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
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

// Premium Neon accents (Emerald, Blue, Purple) based on data tags
const themeColorMap = {
  blue: {
    spotlight: "rgba(37, 99, 235, 0.12)",
    borderHover: "hover:border-[#2563EB]/40 hover:shadow-[0_0_25px_rgba(37,99,235,0.08)]",
    pillHover: "hover:border-[#2563EB]/50 hover:shadow-[0_0_15px_rgba(37,99,235,0.25)] hover:bg-[#2563EB]/10 hover:text-white",
    iconColor: "text-[#2563EB]",
    indicatorColor: "bg-[#2563EB]"
  },
  cyan: {
    spotlight: "rgba(6, 182, 212, 0.12)",
    borderHover: "hover:border-[#06B6D4]/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.08)]",
    pillHover: "hover:border-[#06B6D4]/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:bg-[#06B6D4]/10 hover:text-white",
    iconColor: "text-[#06B6D4]",
    indicatorColor: "bg-[#06B6D4]"
  },
  purple: {
    spotlight: "rgba(124, 58, 237, 0.12)",
    borderHover: "hover:border-[#7C3AED]/40 hover:shadow-[0_0_25px_rgba(124,58,237,0.08)]",
    pillHover: "hover:border-[#7C3AED]/50 hover:shadow-[0_0_15px_rgba(124,58,237,0.25)] hover:bg-[#7C3AED]/10 hover:text-white",
    iconColor: "text-[#7C3AED]",
    indicatorColor: "bg-[#7C3AED]"
  },
  emerald: {
    spotlight: "rgba(16, 185, 129, 0.12)",
    borderHover: "hover:border-[#10B981]/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.08)]",
    pillHover: "hover:border-[#10B981]/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:bg-[#10B981]/10 hover:text-white",
    iconColor: "text-[#10B981]",
    indicatorColor: "bg-[#10B981]"
  }
};

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
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-[#0F172A]/30 backdrop-blur-xl transition-all duration-300 group ${groupColorClass}`}
    >
      {/* Dynamic Cursor Spotlight Radial Background */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 rounded-2xl z-0"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}

export default function Skills() {
  // Stagger entry configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const pillVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    }
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
        viewport={{ once: true, amount: 0.15 }}
        className="grid md:grid-cols-2 gap-6 md:gap-8"
      >
        {skillGroups.map((group) => {
          const c = themeColorMap[group.color] || themeColorMap.blue;
          
          return (
            <motion.div key={group.title} variants={cardVariants}>
              <SpotlightCard
                groupColorClass={c.borderHover}
                spotlightColor={c.spotlight}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className={`w-2.5 h-2.5 rounded-full ${c.indicatorColor} shadow-[0_0_10px_rgba(255,255,255,0.15)]`} />
                  <h3 className="text-white font-bold text-lg tracking-tight">
                    {group.title}
                  </h3>
                </div>

                {/* Skill Badges (Pills) Grid */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                  }}
                  className="flex flex-wrap gap-2.5"
                >
                  {group.skills.map((skill) => {
                    const Icon = skillIconMap[skill.name] || Code2;
                    return (
                      <motion.div
                        key={skill.name}
                        variants={pillVariants}
                        whileHover={{ scale: 1.05 }}
                        className={`cursor-hover flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/5 bg-[#0F172A]/50 text-sm text-gray-300 font-medium transition-all duration-300 ${c.pillHover}`}
                      >
                        <Icon size={15} className={`${c.iconColor} transition-colors`} />
                        <span>{skill.name}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </motion.div>
    </PageWrapper>
  );
}
