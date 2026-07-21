import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Github, Linkedin, Play, Volume2, VolumeX, Code, Terminal, Cpu } from "lucide-react";
import { socials } from "../data/portfolioData";

function useMagnetic() {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.4}px)`;
  };
  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };
  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave, style: { transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)" } };
}

export function ParticleBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let rafId;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      const count = window.innerWidth < 700 ? 30 : 60;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(34,211,238,${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(59,130,246,0.5)";
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-screen pointer-events-none z-[1]" />;
}

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); 
  const [roleIndex, setRoleIndex] = useState(0);
  const videoRef = useRef(null);

  const magneticWork = useMagnetic();
  const magneticContact = useMagnetic();

  const roles = [
    "AI/ML Enthusiast",
    "Full-Stack Developer",
    "Web Developer",
    "Open Source Contributor"
  ];

  // Role Text Animation Loop Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  // Video Autoplay Logic
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.currentTime = 0;
    vid.muted = true; 
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const handlePlayWithSound = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.currentTime = 0;
    vid.muted = false;
    setIsMuted(false);
    vid
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.error("Video play failed:", err));
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  const handleEnded = () => {
    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.pause();
    }
    setIsPlaying(false);
  };


  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      
      <ParticleBackground />

      {/* Background video/photo */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          poster="/profile.png"
          playsInline
          muted={isMuted}
          onEnded={handleEnded}
          className="w-full h-full object-cover object-[80%_15%] md:object-[75%_10%]"
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-bg/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg" />
      </div>

      {/* Video Controls - Adjusted for mobile view visibility above the fold */}
      <div className="absolute z-20 bottom-44 right-6 sm:bottom-32 sm:right-16 flex gap-4 items-center">
        {isPlaying && (
          <motion.button
            onClick={toggleMute}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-xl hover:bg-white/20 transition-all cursor-hover"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>
        )}
        
        {!isPlaying && (
          <motion.button
            onClick={handlePlayWithSound}
            aria-label="Play intro video"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-hover w-14 h-14 rounded-full gradient-btn flex items-center justify-center shadow-xl ring-4 ring-bg"
          >
            <Play size={20} className="text-white fill-white ml-0.5" />
          </motion.button>
        )}
      </div>

      {/* Extreme Left Vertical "SCROLL" Indicator */}
      <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20">
        <div className="text-gray-500 text-xs font-mono tracking-[0.3em] uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Scroll Down
        </div>
        <div className="w-[1px] h-20 bg-gradient-to-b from-gray-500 to-transparent"></div>
      </div>

      {/* Foreground text content */}
      <div className="relative z-10 w-full px-12 sm:px-16 md:px-24 xl:px-40 -mt-12 md:-mt-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium px-4 py-1.5 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for opportunities
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-3 flex flex-wrap gap-x-[0.35em]"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="inline-block"
            >
              Hi,
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="inline-block"
            >
              I'm
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="inline-block gradient-text"
            >
              Ankesh
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="inline-block gradient-text"
            >
              Kumar
            </motion.span>
          </motion.h1>

          {/* Dynamic Animated Roles Container */}
          <div className="min-h-[40px] mb-6 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="text-xl sm:text-2xl text-emerald-400 font-medium whitespace-nowrap"
              >
                {roles[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 text-lg leading-relaxed mb-4 max-w-xl"
          >
            I build smart, scalable and user-friendly web applications with modern technologies and AI-powered solutions.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-gray-400 leading-relaxed mb-6 max-w-xl"
          >
            Focused on blending intelligent algorithms with seamless user experiences. Actively exploring the boundaries of AI research and practical application.
          </motion.p>

          {/* Tech Stack Quick Look */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-gray-300">
              <Code size={14} className="text-blue-400"/> React/Next.js
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-gray-300">
              <Terminal size={14} className="text-yellow-400"/> Python
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-sm text-gray-300">
              <Cpu size={14} className="text-emerald-400"/> Machine Learning
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <Link
              ref={magneticWork.ref}
              onMouseMove={magneticWork.onMouseMove}
              onMouseLeave={magneticWork.onMouseLeave}
              style={magneticWork.style}
              to="/projects"
              className="cursor-hover inline-flex items-center gap-2 gradient-btn text-white font-medium px-7 py-3.5 rounded-full shadow-lg shadow-emerald-500/20"
            >
              View My Work
              <ArrowRight size={18} />
            </Link>
            <Link
              ref={magneticContact.ref}
              onMouseMove={magneticContact.onMouseMove}
              onMouseLeave={magneticContact.onMouseLeave}
              style={magneticContact.style}
              to="/contact"
              className="cursor-hover inline-flex items-center gap-2 border border-white/20 text-white font-medium px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors"
            >
              Contact Me
              <Mail size={18} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-3"
          >
            {[
              { icon: Github, href: socials.github },
              { icon: Linkedin, href: socials.linkedin },
              { icon: Mail, href: socials.email },
            ].map(({ icon: Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                className="cursor-hover w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-[#2563EB]/50 hover:bg-[#2563EB]/10 transition-all shadow-sm"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}