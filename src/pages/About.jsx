import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "framer-motion";
import { Download, ExternalLink, Calendar, ChevronDown, GraduationCap, BookOpen, School, Award, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import AboutBackground from "../components/AboutBackground";

const skillPills = ["React", "Next.js", "Node.js", "Python", "MongoDB", "AI/ML", "GenAI", "LLMs"];

const educationList = [
  {
    degree: "B.Tech, Computer Science (Artificial Intelligence)",
    place: "Purnea College of Engineering",
    duration: "2023 - 2026",
    score: "8.17 CGPA",
    icon: GraduationCap,
    description:
      "Core specialization in Artificial Intelligence within the Computer Science curriculum, covering foundational computer science alongside machine learning, deep learning, and natural language processing.",
    coursework: ["Data Structures & Algorithms", "Machine Learning", "Deep Learning", "Natural Language Processing", "DBMS", "Operating Systems", "Computer Networks"],
    highlights: [
      "Maintained a strong academic record of 8.17 CGPA.",
      "Developed an automated AI Assignment Evaluator leveraging Groq, Llama-3, and OCR.",
      "Built multiple full-stack applications with AI prediction engines integrated into custom React frontends."
    ],
  },
  {
    degree: "Diploma, Mechanical Engineering",
    place: "Government Polytechnic, Banka",
    duration: "2020 - 2023",
    score: "First Class",
    icon: Award,
    description:
      "A solid foundation in mechanics, engineering thermodynamics, and CAD modeling. Transitioned to Computer Science, bringing a systems-level design philosophy and analytical problem-solving to software engineering.",
    coursework: ["Engineering Mechanics", "Thermodynamics", "CAD/CAM", "Manufacturing Processes"],
    highlights: [
      "Acquired strong mathematical and engineering physics concepts.",
      "Transitioned to software development through self-directed study, coding personal projects alongside diploma requirements."
    ],
  },
  {
    degree: "Intermediate (Class XII)",
    place: "Sabour College, Sabour",
    duration: "2018 - 2020",
    score: "Completed",
    icon: BookOpen,
    description:
      "Higher secondary schooling focused on Science stream subjects (Physics, Chemistry, Mathematics), developing strong quantitative reasoning foundations.",
    coursework: ["Physics", "Chemistry", "Mathematics", "English"],
    highlights: [
      "Developed high proficiency in calculus, linear algebra, and mechanics.",
      "Active participant in science seminars and school level events."
    ],
  },
  {
    degree: "Secondary School (Class X)",
    place: "M S L K Saraswati Vidya Mandir",
    duration: "Completed 2018",
    score: "Completed",
    icon: School,
    description:
      "General secondary school education covering science, mathematics, and humanities with a high academic standard.",
    coursework: ["Science", "Mathematics", "Social Studies", "Languages"],
    highlights: [
      "Secured top scores in mathematics and physical sciences.",
      "Participated in regional science competitions and co-curricular programs."
    ],
  },
];

const experienceList = [
  {
    role: "ML Research Intern",
    company: "iHub DivyaSampark, IIT Roorkee",
    duration: "Summer 2024",
    description: "Worked on applied machine learning research, building and evaluating models as part of the hub's research initiatives. Contributed to experimentation, data preparation, and model evaluation workflows.",
    tech: ["Python", "ML Research", "Model Evaluation"],
  },
  {
    role: "Full-Stack Development Intern",
    company: "Invigo Infotech",
    duration: "Winter 2023",
    description: "Built and shipped features across the stack, working with real production codebases and client requirements — from UI implementation to backend API work.",
    tech: ["React", "Node.js", "REST APIs"],
  },
  {
    role: "Telecommunications Intern",
    company: "East Central Railway",
    duration: "Summer 2023",
    description: "Gained hands-on exposure to telecom systems and infrastructure in a large-scale operational environment, observing signal and communication systems in practice.",
    tech: ["Telecom Systems", "Infrastructure"],
  },
];

const learningTopics = [
  { title: "Agentic Workflows", hint: "LangGraph, CrewAI & AutoGen" },
  { title: "System Design", hint: "Scalable APIs & Microservices" },
  { title: "Cloud Deployment", hint: "Docker, Kubernetes & AWS" },
];

function HelixTimelineCard({ item, index, parentRotation, isMobile }) {
  const cardRef = useRef(null);
  const [open, setOpen] = useState(false);
  const Icon = item.icon || GraduationCap;

  // Track local scroll progress for reveal animations (unfurling focus)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.45, 0.5, 0.55, 1], [0.85, 0.98, 1.0, 0.98, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.55, 0.8, 1], [0.25, 0.7, 1.0, 1.0, 0.7, 0.3]);
  
  // Local reveal rotation (creates the unfurling spiral effect)
  const localRotateY = useTransform(scrollYProgress, [0.2, 0.5], [45, 0]);

  // Alternates between 0 (Right) and 180 (Left) degrees in 3D
  const angleDeg = index % 2 === 0 ? 0 : 180;
  const radius = isMobile ? 0 : 255;
  const angleRad = (angleDeg * Math.PI) / 180;
  const x = radius * Math.cos(angleRad);
  const z = radius * Math.sin(angleRad);

  // Counter-rotation value: cancels out parent rotation
  const counterRotation = useTransform(parentRotation, (val) => -val);

  return (
    <div
      ref={cardRef}
      className={isMobile ? "relative w-full flex justify-center z-20" : `absolute left-1/2 -translate-x-1/2 flex items-center justify-center transform-gpu`}
      style={isMobile ? {} : {
        top: `${index * 270 + 80}px`,
        transformStyle: "preserve-3d",
        transform: `translate3d(${x}px, 0px, ${z}px)`
      }}
    >
      {/* Billboarding Counter-Rotation Wrapper */}
      <motion.div
        style={{
          rotateY: isMobile ? 0 : counterRotation,
          transformStyle: "preserve-3d"
        }}
        className="relative z-20"
      >
        {/* Unfurling details card */}
        <motion.div
          style={{
            scale: scale,
            opacity: opacity,
            rotateY: isMobile ? 0 : localRotateY,
            transformStyle: "preserve-3d"
          }}
          className={`w-[90vw] max-w-[340px] sm:max-w-[400px] bg-[#090d16] border border-white/5 rounded-2xl p-6 transition-all duration-300 relative z-20 ${
            index % 2 === 0 
              ? "hover:border-accent-blue/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.06)]" 
              : "hover:border-accent-purple/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.06)]"
          }`}
        >
          {/* Subtle internal gradient highlight */}
          <div className={`absolute -inset-px bg-gradient-to-r ${
            index % 2 === 0 ? "from-accent-blue/5 to-transparent" : "from-accent-purple/5 to-transparent"
          } opacity-50 blur-sm rounded-2xl pointer-events-none`} />

          {/* Card Title & Dates */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3 relative z-10">
            <div>
              <h4 className={`font-semibold text-lg transition-colors ${
                index % 2 === 0 ? "text-blue-400" : "text-purple-400"
              }`}>
                {item.degree}
              </h4>
              <p className="text-sm text-gray-400 mt-0.5">{item.place}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-medium text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full flex items-center gap-1.5 shrink-0">
                <Calendar size={12} className={index % 2 === 0 ? "text-[#3b82f6]" : "text-[#8b5cf6]"} />
                {item.duration}
              </span>
              {item.score && (
                <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                  index % 2 === 0 
                    ? "text-[#3b82f6] bg-[#3b82f6]/10 border border-[#3b82f6]/20" 
                    : "text-[#8b5cf6] bg-[#8b5cf6]/10 border border-[#8b5cf6]/20"
                }`}>
                  {item.score}
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed mb-4 relative z-10">{item.description}</p>

          {/* Toggle Button */}
          <button
            onClick={() => setOpen(!open)}
            className={`cursor-hover inline-flex items-center gap-1.5 text-xs font-medium transition-colors relative z-10 ${
              index % 2 === 0 ? "text-blue-400 hover:text-blue-300" : "text-purple-400 hover:text-purple-300"
            }`}
          >
            {open ? "Hide Coursework & Highlights" : "View Coursework & Highlights"}
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={13} />
            </motion.div>
          </button>

          {/* Coursework Details */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden relative z-10"
              >
                <div className="pt-4 mt-4 border-t border-white/5">
                  <p className={`text-xs uppercase tracking-wider font-mono mb-2 ${index % 2 === 0 ? "text-blue-400" : "text-purple-400"}`}>Key Coursework</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.coursework.map((c) => (
                      <span key={c} className="text-xs text-gray-300 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
                        {c}
                      </span>
                    ))}
                  </div>

                  <p className={`text-xs uppercase tracking-wider font-mono mb-2 ${index % 2 === 0 ? "text-blue-400" : "text-purple-400"}`}>Academic Highlights</p>
                  <ul className="flex flex-col gap-2">
                    {item.highlights.map((h, hidx) => (
                      <li key={hidx} className="text-sm text-gray-400 flex gap-2">
                        <span className={`shrink-0 ${index % 2 === 0 ? "text-blue-400" : "text-purple-400"}`}>▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const forceMobile = isMobile || prefersReducedMotion;

  // Track parent scroll progress for 3D spinning
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const rotationY = forceMobile
    ? useMotionValue(0)
    : useTransform(scrollYProgress, [0, 1], [-30, 480]); // 510-degree twist

  // 15 Floating atoms in the deep timeline background
  const backgroundParticles = Array.from({ length: 15 });

  return (
    <PageWrapper>
      <AboutBackground />

      {/* Main SaaS Two Column Header Container */}
      <div className="grid lg:grid-cols-10 gap-12 lg:gap-16 items-center mb-20 relative z-10">
        
        {/* Left Side Content - 60% equivalent span */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-fit inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F172A]/80 border border-[#2563EB]/30 text-[#2563EB] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(37,99,235,0.1)]"
          >
            👋 ABOUT ME
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4"
          >
            Hi, I'm{" "}
            <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] bg-[length:200%_auto] text-transparent bg-clip-text">
              Ankesh Kumar
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-mono text-gray-400 mb-8"
          >
            <span className="text-[#2563EB] font-semibold">Full Stack Developer</span>
            <span className="text-white/20">•</span>
            <span className="text-[#7C3AED] font-semibold">AI/ML Engineer</span>
            <span className="text-white/20">•</span>
            <span className="text-gray-300">Problem Solver</span>
          </motion.div>

          {/* Bio Panel with glowing line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative pl-6 border-l-2 border-transparent mb-8"
          >
            {/* Glowing vertical accent line */}
            <div className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#2563EB] to-[#7C3AED] shadow-[0_0_12px_rgba(124,58,237,0.6)]" />

            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
              I am a software engineer dedicated to building scalable digital architectures that blend modern software design with applied{" "}
              <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] font-semibold text-transparent bg-clip-text">
                Artificial Intelligence
              </span>{" "}
              and{" "}
              <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] font-semibold text-transparent bg-clip-text">
                Machine Learning
              </span>{" "}
              capabilities.
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
              Specializing in full-stack ecosystems, I configure interactive platforms using{" "}
              <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] font-semibold text-transparent bg-clip-text">
                React
              </span>
              ,{" "}
              <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] font-semibold text-transparent bg-clip-text">
                Next.js
              </span>
              , and{" "}
              <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] font-semibold text-transparent bg-clip-text">
                Node.js
              </span>{" "}
              as frontend/API layers.
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              On the data and model pipeline level, I employ{" "}
              <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] font-semibold text-transparent bg-clip-text">
                Python
              </span>{" "}
              and{" "}
              <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] font-semibold text-transparent bg-clip-text">
                MongoDB
              </span>{" "}
              to wire up advanced semantic orchestrations with{" "}
              <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] font-semibold text-transparent bg-clip-text">
                Generative AI
              </span>
              , custom{" "}
              <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] font-semibold text-transparent bg-clip-text">
                LLMs
              </span>
              , and high-performance serverless{" "}
              <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB] font-semibold text-transparent bg-clip-text">
                Cloud
              </span>{" "}
              deployments.
            </p>
          </motion.div>

          {/* Animated Skill Pills */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
            }}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2.5 mb-8"
          >
            {skillPills.map((pill) => (
              <motion.div
                key={pill}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(37, 99, 235, 0.25)",
                  borderColor: "rgba(124, 58, 237, 0.5)",
                  backgroundColor: "rgba(30, 41, 59, 0.5)"
                }}
                className="cursor-hover text-xs font-semibold px-4 py-2 rounded-full border border-white/5 bg-[#0F172A]/40 text-gray-300 hover:text-white transition-all duration-300"
              >
                {pill}
              </motion.div>
            ))}
          </motion.div>

          {/* Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative bg-[#0F172A]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-5 mb-8 overflow-hidden group hover:border-[#2563EB]/35 transition-colors"
          >
            {/* Subtle card radial glow */}
            <div className="absolute -inset-px bg-gradient-to-r from-[#2563EB]/5 to-[#7C3AED]/5 opacity-40 blur-sm rounded-2xl pointer-events-none" />
            <p className="relative text-gray-300 italic text-sm md:text-base leading-relaxed">
              "Building intelligent digital products that combine modern engineering with practical AI."
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="/resume.pdf"
              download
              className="cursor-hover inline-flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-medium text-sm px-6 py-3 rounded-full hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Download Resume
              <Download size={15} />
            </a>
            <Link
              to="/projects"
              className="cursor-hover inline-flex items-center gap-2 border border-white/10 text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-gradient-to-r hover:from-[#2563EB]/10 hover:to-[#7C3AED]/10 hover:border-[#2563EB]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              View Projects
              <ExternalLink size={15} />
            </Link>
          </motion.div>

        </div>

        {/* Right Side Content - 40% equivalent span */}
        <div className="lg:col-span-4 flex items-center justify-center lg:justify-end relative min-h-[500px] lg:min-h-[600px] overflow-visible">
          
          {/* Radial Blue/Purple Glow behind character */}
          <motion.div
            animate={{
              scale: [0.95, 1.05, 0.95],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] rounded-full blur-[100px] -z-10 pointer-events-none"
          />

          {/* Static Character Image (No floating, rotation, or parallax) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="w-[550px] md:w-[750px] lg:w-[950px] xl:w-[1100px] max-w-none flex items-center justify-center relative lg:absolute lg:-right-[16%] xl:-right-[22%] pointer-events-none select-none"
          >
            <img
              src="/character.png"
              alt="Ankesh Kumar 3D Character"
              className="w-full h-auto object-contain select-none pointer-events-none filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
            />
          </motion.div>

        </div>

      </div>

      {/* Education Timeline Heading */}
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <span className="text-[#2563EB] font-mono text-sm font-semibold">01</span>
        <div className="flex-1 h-px bg-white/5" />
        <h3 className="text-white font-bold text-xl tracking-tight whitespace-nowrap">Education Timeline</h3>
      </div>

      {/* Timeline Wrapper */}
      <div
        ref={timelineRef}
        className="relative mb-24 z-10 w-full overflow-visible flex flex-col items-center justify-center pt-8 pb-12"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 30%",
          transformStyle: "preserve-3d"
        }}
      >
        {/* BACKGROUND LAYER (z-0): Ambient particles */}
        <div className="absolute inset-0 z-0 overflow-visible pointer-events-none flex items-center justify-center">
          {/* Ambient molecule particles in background */}
          <div className="absolute inset-0 overflow-hidden">
            {backgroundParticles.map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full blur-[1px] ${
                  i % 2 === 0 ? "bg-[#3b82f6]/5" : "bg-[#8b5cf6]/5"
                }`}
                style={{
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: ["0px", `${(Math.random() - 0.5) * 80}px`, "0px"],
                  x: ["0px", `${(Math.random() - 0.5) * 80}px`, "0px"],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        {/* FOREGROUND LAYER (z-10): 3D Revolving Cards */}
        <motion.div
          style={{
            rotateY: forceMobile ? 0 : rotationY,
            transformStyle: "preserve-3d"
          }}
          className={`relative w-full ${forceMobile ? "h-auto flex flex-col gap-8" : "h-[1160px]"} transform-gpu`}
        >
          {forceMobile ? (
            // Mobile fallback timeline structure (no vertical lines or markers)
            <div className="flex flex-col gap-8 w-full px-4">
              {educationList.map((item, i) => (
                <HelixTimelineCard key={i} item={item} index={i} parentRotation={rotationY} isMobile={true} />
              ))}
            </div>
          ) : (
            // Desktop 3D revolving carousel (no background strands or lines)
            educationList.map((item, i) => (
              <HelixTimelineCard key={i} item={item} index={i} parentRotation={rotationY} isMobile={false} />
            ))
          )}
        </motion.div>
      </div>

      {/* Experience Timeline */}
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <span className="text-[#7C3AED] font-mono text-sm font-semibold">02</span>
        <div className="flex-1 h-px bg-white/5" />
        <h3 className="text-white font-bold text-xl tracking-tight whitespace-nowrap">Experience</h3>
      </div>

      <div className="relative pl-8 sm:pl-10 mb-16 z-10">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ transformOrigin: "top" }}
          className="absolute left-3 sm:left-4 top-2 bottom-2 w-px bg-white/5"
        />

        <div className="flex flex-col gap-6">
          {experienceList.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              <div className="absolute -left-8 sm:-left-10 top-6 w-6 h-6 rounded-full bg-[#080B12] border-2 border-[#7C3AED] flex items-center justify-center shadow-[0_0_10px_rgba(124,58,237,0.2)]">
                <Briefcase size={11} className="text-[#7C3AED]" />
              </div>
              <div className="bg-[#0F172A]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-[#7C3AED]/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.06)] transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className="text-white font-semibold text-lg">{exp.role}</h4>
                  <span className="text-xs text-gray-400 bg-white/5 border border-white/5 px-3 py-1 rounded-full font-mono flex items-center gap-1">
                    <Calendar size={12} className="text-[#7C3AED]" />
                    {exp.duration}
                  </span>
                </div>
                <p className="text-gray-400 text-sm font-medium mb-3">{exp.company}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs text-gray-300 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Currently Exploring Grid */}
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <span className="text-[#2563EB] font-mono text-sm font-semibold">03</span>
        <div className="flex-1 h-px bg-white/5" />
        <h3 className="text-white font-bold text-xl tracking-tight whitespace-nowrap">Currently Exploring</h3>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 relative z-10">
        {learningTopics.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-[#0F172A]/40 backdrop-blur-xl border border-dashed border-white/5 rounded-2xl p-6 text-center hover:border-[#2563EB]/40 hover:border-solid hover:shadow-[0_0_15px_rgba(37,99,235,0.06)] transition-all"
          >
            <div className="text-[#2563EB] text-lg mb-2">◆</div>
            <h4 className="text-white font-semibold text-sm mb-1">{t.title}</h4>
            <p className="text-gray-500 text-xs">{t.hint}</p>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
}