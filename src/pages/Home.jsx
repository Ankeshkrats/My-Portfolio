import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import Marquee from "../components/Marquee";
import ProjectCard from "../components/ProjectCard";
import { featuredProjects } from "../data/portfolioData";

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <Hero />
      <div className="section-container">
        <Marquee />
      </div>
      <TechStack />

      <div className="section-container py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
            <span className="w-2 h-2 rounded-full bg-accent-purple" />
            Featured Projects
          </h2>
          <Link to="/projects" className="cursor-hover hidden sm:inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}