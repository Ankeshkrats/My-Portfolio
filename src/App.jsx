import React, { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";

function PageCurtain() {
  const location = useLocation();
  const controls = useAnimationControls();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    let cancelled = false;

    async function run() {
      controls.set({ scaleY: 0, transformOrigin: "bottom" });
      await controls.start({ scaleY: 1, transition: { duration: 0.28, ease: [0.6, 0, 0.8, 0.2] } });
      if (cancelled) return;
      controls.set({ transformOrigin: "top" });
      controls.start({ scaleY: 0, transition: { duration: 0.38, ease: [0.2, 1, 0.4, 1] } });
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [location.pathname, controls]);

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={controls}
      style={{ transformOrigin: "bottom" }}
      className="fixed inset-0 z-[200] pointer-events-none gradient-btn"
    />
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-bg flex flex-col relative">
      <CustomCursor />
      <ScrollProgress />
      <PageCurtain />

      <div className="bg-orb" style={{ width: 480, height: 480, background: "#3b82f6", top: -120, right: -120 }} />
      <div className="bg-orb" style={{ width: 420, height: 420, background: "#22d3ee", bottom: -140, left: -140 }} />

      <Navbar />
      <main className="flex-1 relative z-[2]">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}