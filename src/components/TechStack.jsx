import React from "react";
import { motion } from "framer-motion";
import { Atom, Wind, Hexagon, Server, Leaf, Code2, Cpu, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import { techStack } from "../data/portfolioData";

const iconMap = {
  nextjs: Hexagon,
  react: Atom,
  tailwind: Wind,
  nodejs: Server,
  express: Code2,
  mongodb: Leaf,
  python: Code2,
  tensorflow: Cpu,
};

const iconColor = {
  nextjs: "text-white",
  react: "text-cyan-400",
  tailwind: "text-cyan-400",
  nodejs: "text-emerald-400",
  express: "text-gray-300",
  mongodb: "text-emerald-400",
  python: "text-yellow-400",
  tensorflow: "text-orange-400",
};

export default function TechStack() {
  return (
    <section className="section-container pb-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="border border-border rounded-2xl bg-surface/50 p-6 sm:p-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
          <h3 className="text-white font-semibold text-lg shrink-0">
            Tech Stack
          </h3>

          <div className="flex flex-1 flex-wrap items-center justify-between gap-6">
            {techStack.map((tech, i) => {
              const Icon = iconMap[tech.icon] || Code2;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
                    <Icon size={20} className={iconColor[tech.icon]} />
                  </div>
                  <span className="text-xs text-gray-400">{tech.name}</span>
                </motion.div>
              );
            })}
          </div>

          <Link
            to="/skills"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-white bg-white/5 border border-border px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
          >
            View All
            <LayoutGrid size={16} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
