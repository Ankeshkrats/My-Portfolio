import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { socials, navLinks } from "../data/portfolioData";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-8">
      <div className="section-container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center font-bold text-white text-sm">
              AK
            </div>
            <span className="text-white font-semibold">Ankesh Kumar</span>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: socials.github },
              { icon: Linkedin, href: socials.linkedin },
              { icon: Mail, href: socials.email },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-gray-400 hover:text-white hover:border-[#2563EB] hover:shadow-[0_0_10px_rgba(37,99,235,0.15)] transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-gray-500 flex items-center justify-center gap-1.5">
          © {year} Ankesh Kumar. Built with
          <Heart size={14} className="text-red-400 fill-red-400" />
          using React, Tailwind CSS &amp; Framer Motion.
        </div>
      </div>
    </footer>
  );
}
