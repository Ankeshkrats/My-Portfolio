import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import ProjectCard from "../components/ProjectCard";
import ProjectsBackground from "../components/ProjectsBackground";
import { allProjects } from "../data/portfolioData";

const filters = ["All", "AI/ML", "Web"];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === active);

  // Compute dynamic project counts per filter
  const filterCounts = {
    All: allProjects.length,
    "AI/ML": allProjects.filter((p) => p.category === "AI/ML").length,
    Web: allProjects.filter((p) => p.category === "Web").length,
  };

  // Count active live deployment urls (links that are not '#')
  const liveCount = allProjects.filter((p) => p.link && p.link !== "#").length;

  return (
    <PageWrapper>
      <ProjectsBackground />

      {/* Polish Hero Area */}
      <div className="mb-12 relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            {/* Glowing Category Marker */}
            <div className="flex items-center gap-2 mb-2 text-xs font-bold font-mono tracking-wider uppercase text-purple-400">
              <span className="w-2 h-2 rounded-full bg-accent-purple shadow-[0_0_8px_rgba(139,92,246,0.65)]" />
              Showcase
            </div>
            
            {/* Page Title with Animated Underline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight relative mb-3">
              All Projects
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "130px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
                className="h-1.5 rounded-full bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan mt-2 shadow-[0_2px_10px_rgba(139,92,246,0.35)]"
              />
            </h1>
            
            {/* Subtitle */}
            <p className="text-gray-400 max-w-xl text-sm sm:text-base leading-relaxed">
              A collection of things I've built — from AI-powered neural networks to full-stack applications.
            </p>
          </div>

          {/* Floating HUD Statistics Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex gap-5 shrink-0 bg-[#0c101d]/65 border border-white/5 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.35)] font-mono text-xs text-gray-400 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
            
            <div className="flex flex-col border-r border-white/5 pr-5">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Projects</span>
              <span className="text-xl font-bold text-white tracking-tight">{allProjects.length}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Live Deploys</span>
              <span className="text-xl font-bold text-accent-cyan tracking-tight flex items-center gap-1.5">
                {liveCount}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Filter Tabs Container */}
      <div className="flex items-center gap-3 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`relative text-sm font-medium px-4 py-2 rounded-full border transition-all duration-300 flex items-center group ${
              active === f
                ? "text-white border-accent-blue/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                : "text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
            }`}
          >
            {active === f && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-accent-blue/15 -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
            <span>{f}</span>
            {/* Filter Count Indicator Badge */}
            <span
              className={`text-[9px] font-mono ml-2 px-1.5 py-0.5 rounded-full transition-colors duration-300 ${
                active === f
                  ? "bg-accent-blue/25 text-blue-300 font-bold"
                  : "bg-white/5 text-gray-500 group-hover:text-gray-300"
              }`}
            >
              {filterCounts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* Monospace Diagnostics Panel */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8 p-3.5 rounded-xl bg-[#0b0f19]/45 border border-white/5 backdrop-blur-md font-mono text-[10px] sm:text-xs tracking-wider text-gray-500 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
          <span>SYS_STATUS: ONLINE // INTERFACE: REPOS_PORTFOLIO</span>
        </div>
        <div className="flex items-center gap-4">
          <span>ACTIVE_FILTER: <span className="text-accent-purple font-semibold uppercase">{active}</span></span>
          <span className="hidden sm:inline text-white/10">|</span>
          <span>DISPLAYING: <span className="text-white">{filtered.length} OF {allProjects.length}</span></span>
        </div>
      </motion.div>

      {/* Project Cards Grid with Framer Motion Reflow */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isFeatured={i === 0} // Dynamically feature the first card in the filtered list
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </PageWrapper>
  );
}
