import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks } from "../data/portfolioData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors ${scrolled ? "bg-bg/95 backdrop-blur border-border" : "bg-bg border-transparent"}`}>
      <div className="section-container flex items-center justify-between h-20">
        <Link to="/" className="cursor-hover flex items-center gap-2 shrink-0" onClick={() => setIsOpen(false)}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center font-bold text-white">AK</div>
          <span className="text-white font-semibold text-lg">Ankesh Kumar</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} end={link.path === "/"} className={({ isActive }) => `cursor-hover relative text-sm font-medium pb-1 transition-colors ${isActive ? "text-accent-blue" : "text-gray-300 hover:text-white"}`}>
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-blue" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <motion.a href="/resume.pdf" download whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="cursor-hover hidden md:inline-flex items-center gap-2 gradient-btn text-white text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
          Download CV
          <Download size={16} />
        </motion.a>

        <button className="cursor-hover md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="md:hidden border-t border-border bg-bg overflow-hidden">
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink key={link.name} to={link.path} end={link.path === "/"} onClick={() => setIsOpen(false)} className={({ isActive }) => `cursor-hover text-sm font-medium ${isActive ? "text-accent-blue" : "text-gray-300"}`}>
                  {link.name}
                </NavLink>
              ))}
              <a href="/resume.pdf" download className="cursor-hover gradient-btn text-white text-sm font-medium px-5 py-2.5 rounded-full text-center">
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}