import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { Briefcase, Brain, Code2, Radio, Calendar } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import SectionHeading from "../components/SectionHeading";
import ExperienceBackground from "../components/ExperienceBackground";
import { experience } from "../data/portfolioData";

function ExperienceCard({ exp, isLeft }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 250, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 250, damping: 20 });

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

  const isML = exp.role.includes("ML") || exp.role.includes("Machine");
  const isWeb = exp.role.includes("Full-Stack") || exp.role.includes("Web") || exp.role.includes("Developer");
  
  const accentColor = isML ? "#2563EB" : isWeb ? "#7C3AED" : "#10B981";
  const glowStyle = isML 
    ? "hover:border-[#2563EB]/40 hover:shadow-[0_0_25px_rgba(37,99,235,0.06)]"
    : isWeb 
      ? "hover:border-[#7C3AED]/40 hover:shadow-[0_0_25px_rgba(124,58,237,0.06)]"
      : "hover:border-[#10B981]/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.06)]";

  const pillHover = isML
    ? "hover:border-[#2563EB]/30 hover:bg-[#2563EB]/10 hover:text-white"
    : isWeb
      ? "hover:border-[#7C3AED]/30 hover:bg-[#7C3AED]/10 hover:text-white"
      : "hover:border-[#10B981]/30 hover:bg-[#10B981]/10 hover:text-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      style={{ perspective: 1200 }}
      className="w-full text-left"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -6 }}
        className={`bg-[#0F172A]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 transition-colors duration-300 group ${glowStyle}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h4 className="text-white font-bold text-lg md:text-xl tracking-tight">
            {exp.role}
          </h4>
          <span className="text-xs text-gray-400 bg-white/5 border border-white/5 px-3 py-1 rounded-full font-mono flex items-center gap-1.5 shrink-0">
            <Calendar size={12} style={{ color: accentColor }} />
            {exp.duration}
          </span>
        </div>

        <p className="text-sm font-semibold mb-4" style={{ color: accentColor }}>
          {exp.company}
        </p>

        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {exp.description}
        </p>

        {/* Tech Stack pills with stagger/glow hovers */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {exp.tech && exp.tech.map((t) => (
            <motion.span
              key={t}
              whileHover={{ scale: 1.04 }}
              className={`text-[10px] md:text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-white/5 bg-[#080B12]/60 text-gray-400 hover:text-white transition-all duration-300 ${pillHover}`}
            >
              {t}
            </motion.span>
          ))}
        </div>

      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);

  // Scroll tracking on the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <PageWrapper>
      <ExperienceBackground />

      {/* Floating Ambient Auroras */}
      <div className="absolute top-[25%] left-[-15%] w-[400px] h-[400px] bg-[#2563EB]/5 rounded-full blur-[110px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[20%] right-[-15%] w-[400px] h-[400px] bg-[#7C3AED]/4 rounded-full blur-[110px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }} />

      <SectionHeading title="Experience" color="blue" />

      {/* Timeline Section Container */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto py-12 px-2 sm:px-6">
        
        {/* Dynamic scroll-driven timeline vertical line */}
        <div className="absolute left-[15px] md:left-1/2 top-4 bottom-4 w-[2px] bg-white/5 -translate-x-[1px]">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute inset-0 bg-gradient-to-b from-[#2563EB] via-[#7C3AED] to-[#10B981] shadow-[0_0_10px_rgba(124,58,237,0.5)]"
          />
        </div>

        {/* Timeline rows */}
        <div className="flex flex-col gap-16 md:gap-20">
          {experience.map((exp, i) => {
            const isLeft = i % 2 === 0;
            
            // Assign domain specific icons
            const Icon = exp.role.includes("ML") 
              ? Brain 
              : exp.role.includes("Full-Stack") 
                ? Code2 
                : Radio;

            const isML = exp.role.includes("ML") || exp.role.includes("Machine");
            const isWeb = exp.role.includes("Full-Stack") || exp.role.includes("Web") || exp.role.includes("Developer");
            
            const nodeStyles = isML
              ? "border-[#2563EB] text-[#2563EB] shadow-[0_0_12px_rgba(37,99,235,0.2)] bg-[#080B12]"
              : isWeb
                ? "border-[#7C3AED] text-[#7C3AED] shadow-[0_0_12px_rgba(124,58,237,0.2)] bg-[#080B12]"
                : "border-[#10B981] text-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.2)] bg-[#080B12]";

            return (
              <div 
                key={i} 
                className="grid grid-cols-[30px_1fr] md:grid-cols-[1fr_80px_1fr] items-center relative gap-6 md:gap-0"
              >
                
                {/* Left Column Card (Desktop Lefts only) */}
                <div className={`hidden md:block ${isLeft ? "opacity-100" : "pointer-events-none opacity-0"}`}>
                  {isLeft && <ExperienceCard exp={exp} isLeft={isLeft} />}
                </div>

                {/* Center Column Floating/Pulsing Node */}
                <div className="flex justify-center z-10">
                  <motion.div
                    whileInView={{
                      scale: [1, 1.08, 1],
                    }}
                    viewport={{ once: false, margin: "-120px" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center ${nodeStyles}`}
                  >
                    <Icon size={15} />
                  </motion.div>
                </div>

                {/* Right Column Card (Desktop Rights, and Mobile ALWAYS) */}
                <div className={`${isLeft ? "md:hidden" : "block"}`}>
                  <ExperienceCard exp={exp} isLeft={false} />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </PageWrapper>
  );
}
