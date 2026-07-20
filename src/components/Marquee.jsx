import React from "react";
import { motion } from "framer-motion";

const items = [
  "Python", "React", "Node.js", "MongoDB", "Groq API",
  "Gemini API", "scikit-learn", "Express", "Vite", "Git",
];

export default function Marquee() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 border-t border-b border-border py-5 overflow-hidden"
    >
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-sm text-gray-400 font-mono">
            <b className="text-accent-cyan mr-2">&bull;</b>
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}