import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import SectionHeading from "../components/SectionHeading";
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

  return (
    <PageWrapper>
      <ProjectsBackground />
      <SectionHeading
        title="All Projects"
        subtitle="A collection of things I've built — from AI-powered tools to full-stack apps."
        color="purple"
      />

      <div className="flex items-center gap-3 mb-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`relative text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
              active === f
                ? "text-white border-accent-blue"
                : "text-gray-400 border-border hover:text-white"
            }`}
          >
            {active === f && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-accent-blue/15 -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid md:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </PageWrapper>
  );
}
