import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import SectionHeading from "../components/SectionHeading";
import ContactBackground from "../components/ContactBackground";
import { socials } from "../data/portfolioData";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    window.location.href = `${socials.email}?subject=${subject}&body=${body}`;
  };

  return (
    <PageWrapper>
      <ContactBackground />
      
      <SectionHeading
        title="Get In Touch"
        subtitle="Have an opportunity, project, or just want to say hi? My inbox is always open."
        color="purple"
      />

      <div className="grid md:grid-cols-5 gap-8 relative z-10">
        
        {/* Left Side: Contact Cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2 flex flex-col gap-4"
        >
          {/* Email Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-[#0F172A]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-[#2563EB]/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.08)] transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-[#2563EB]">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <a href="mailto:kumarankesh921@gmail.com" className="cursor-hover text-white text-sm font-medium hover:text-[#2563EB] transition-colors">
                kumarankesh921@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-[#0F172A]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-[#7C3AED]/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.08)] transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 text-[#7C3AED]">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="text-white text-sm font-medium">Bhagalpur, India</p>
            </div>
          </motion.div>

          {/* Socials Card */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-[#0F172A]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-[#2563EB]/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.08)] transition-all duration-300"
          >
            <p className="text-xs text-gray-400 mb-3.5">Find me on</p>
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: socials.github, tooltip: "GitHub", hoverColor: "hover:border-[#2563EB] hover:text-[#2563EB]" },
                { icon: Linkedin, href: socials.linkedin, tooltip: "LinkedIn", hoverColor: "hover:border-[#7C3AED] hover:text-[#7C3AED]" },
              ].map(({ icon: Icon, href, tooltip, hoverColor }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  title={tooltip}
                  whileHover={{ y: -3, scale: 1.08 }}
                  className={`cursor-hover w-10 h-10 flex items-center justify-center rounded-xl border border-white/5 bg-[#080B12]/60 text-gray-300 transition-colors ${hoverColor}`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="md:col-span-3 bg-[#0F172A]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col gap-5 shadow-2xl hover:border-[#7C3AED]/20 transition-colors duration-300"
        >
          <div>
            <label className="text-sm text-gray-300 mb-2 block font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full bg-[#080B12]/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:border-[#2563EB]/60 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] focus:outline-none transition-all duration-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-[#080B12]/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:border-[#2563EB]/60 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] focus:outline-none transition-all duration-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block font-medium">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project or opportunity..."
              className="w-full bg-[#080B12]/40 border border-white/5 rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:border-[#2563EB]/60 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] focus:outline-none resize-none transition-all duration-300"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02, shadow: "0px 0px 20px rgba(124,58,237,0.3)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="cursor-hover inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-semibold px-6 py-3.5 rounded-xl hover:opacity-95 transition-all duration-300 mt-2"
          >
            Send Message
            <Send size={16} />
          </motion.button>
        </motion.form>
        
      </div>
    </PageWrapper>
  );
}
