import React from "react";
import { motion } from "framer-motion";

const dotColors = {
  blue: "bg-accent-blue",
  purple: "bg-accent-purple",
  cyan: "bg-accent-cyan",
};

export default function SectionHeading({ title, subtitle, color = "blue" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-white mb-2">
        <span className={`w-2 h-2 rounded-full ${dotColors[color]}`} />
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}
