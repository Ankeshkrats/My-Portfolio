import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

function TimelineCard({ item, index }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon || GraduationCap;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative pl-10 md:pl-12 last:mb-0 mb-8 group"
    >
      {/* Timeline Indicator Node */}
      <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-[#080B12] border-2 border-[#2563EB] group-hover:border-[#7C3AED] flex items-center justify-center transition-colors shadow-[0_0_10px_rgba(37,99,235,0.2)] z-10">
        <Icon size={13} className="text-[#2563EB] group-hover:text-[#7C3AED] transition-colors" />
      </div>

      {/* Card Content */}
      <div className="bg-[#0F172A]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-[#2563EB]/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.06)] transition-all">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h4 className="text-white font-semibold text-lg group-hover:text-[#7C3AED] transition-colors">
              {item.degree}
            </h4>
            <p className="text-sm text-gray-400 mt-0.5">{item.place}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full flex items-center gap-1.5 shrink-0">
              <Calendar size={12} className="text-[#2563EB]" />
              {item.duration}
            </span>
            {item.score && (
              <span className="text-xs font-mono font-semibold text-[#7C3AED] bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-2.5 py-1 rounded-full shrink-0">
                {item.score}
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-4">{item.description}</p>

        {/* Collapsible Action Button */}
        <button
          onClick={() => setOpen(!open)}
          className="cursor-hover inline-flex items-center gap-1.5 text-xs text-[#2563EB] hover:text-[#7C3AED] transition-colors font-medium"
        >
          {open ? "Hide Coursework & Highlights" : "View Coursework & Highlights"}
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={13} />
          </motion.div>
        </button>

        {/* Collapsible Content */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-white/5">
                <p className="text-xs text-[#7C3AED] uppercase tracking-wider font-mono mb-2">Key Coursework</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.coursework.map((c) => (
                    <span
                      key={c}
                      className="text-xs text-gray-300 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-[#2563EB] uppercase tracking-wider font-mono mb-2">Academic Highlights</p>
                <ul className="flex flex-col gap-2">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="text-sm text-gray-400 flex gap-2">
                      <span className="text-[#2563EB] shrink-0">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function About() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

      {/* Education Timeline */}
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <span className="text-[#2563EB] font-mono text-sm font-semibold">01</span>
        <div className="flex-1 h-px bg-white/5" />
        <h3 className="text-white font-bold text-xl tracking-tight whitespace-nowrap">Education Timeline</h3>
      </div>

      <div className="relative mb-16 z-10">
        {/* Central timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ transformOrigin: "top" }}
          className="absolute left-3.5 top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#2563EB] via-[#7C3AED] to-white/5"
        />

        <div className="flex flex-col">
          {educationList.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} />
          ))}
        </div>
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