import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import Lenis from "lenis";
import ParticleBackground from "./components/ParticleBackground";
import CustomCursor from "./components/CustomCursor";
import CursorTrail from "./components/CursorTrail";
import IntroLoader from "./components/IntroLoader";
import EasterEggs from "./components/EasterEggs";
import ScrollProgressBar from "./components/ScrollProgressBar";
import FloatingDockCyber from "./components/cyber/FloatingDockCyber";
import SwitchModeToggle from "./components/SwitchModeToggle";
import CulturalPatternCanvas from "./components/CulturalPatternCanvas";
import CommandPalette from "./components/CommandPalette";
import ResumeModal from "./components/ResumeModal";
import BackToTop from "./components/BackToTop";
import HeroCyber from "./components/cyber/HeroCyber";
import ProjectsCyber from "./components/cyber/ProjectsCyber";
import EducationCyber from "./components/cyber/EducationCyber";
import SkillsCyber from "./components/cyber/SkillsCyber";
import ContactCyber from "./components/cyber/ContactCyber";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  // Theme state persisted via localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio_theme") || "dark";
  });

  const [cmdOpen, setCmdOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Show loader only once per session
  const [loaderDone, setLoaderDone] = useState(() => {
    return sessionStorage.getItem("intro_shown") === "true";
  });

  // Sync theme changes with DOM documentElement & localStorage
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light-theme");
      document.body.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
      document.body.classList.remove("light-theme");
    }
    localStorage.setItem("portfolio_theme", theme);
  }, [theme]);

  // Global Keyboard Shortcut ('T' key listener) for instant Theme Toggle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
      if (e.key === "t" || e.key === "T") {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lenis smooth scroll — buttery-smooth inertia scroll with modal lock support
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      prevent: (node) => Boolean(node.hasAttribute?.("data-lenis-prevent") || node.closest?.("[data-lenis-prevent]")),
    });

    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // Dynamically generate 100% crisp circular portrait photo favicon in browser tab
  useEffect(() => {
    const img = new Image();
    img.src = "/profile.png";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const grad = ctx.createLinearGradient(0, 0, 64, 64);
      grad.addColorStop(0, "#06b6d4");
      grad.addColorStop(1, "#10b981");

      ctx.beginPath();
      ctx.arc(32, 32, 31, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fillStyle = "#05080f";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(32, 32, 26, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(img, 3, 3, 58, 58);

      const dataUrl = canvas.toDataURL("image/png");
      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.type = "image/png";
      link.href = dataUrl;
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLoaderComplete = () => {
    sessionStorage.setItem("intro_shown", "true");
    setLoaderDone(true);
  };

  return (
    <div className="min-h-screen mesh-bg text-slate-200 font-body selection:bg-cyan-500/30 selection:text-white relative">
      {/* Cinematic Intro Loader — shown once per session */}
      {!loaderDone && <IntroLoader onComplete={handleLoaderComplete} />}

      {/* Full-Page Real-time Procedural HTML5 Signature Dumbara Canvas */}
      <CulturalPatternCanvas />

      {/* STITCH Particle Background & Custom Glow Cursor */}
      <ParticleBackground />
      <CustomCursor />
      <CursorTrail />

      {/* Scroll Progress Bar — thin brand gradient at top */}
      <ScrollProgressBar />

      {/* Easter Eggs: tab title + Konami code confetti */}
      <EasterEggs />

      {/* Magic UI Gradient Button Group Dock (Unified Navigation & Theme Switcher) */}
      <FloatingDockCyber theme={theme} toggleTheme={toggleTheme} />

      {/* Back To Top Floating Button */}
      <BackToTop />

      {/* Command Palette (Ctrl + K) */}
      <CommandPalette
        theme={theme}
        toggleTheme={toggleTheme}
        open={cmdOpen}
        setOpen={setCmdOpen}
      />

      {/* Interactive Resume Preview Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      {/* Main Portfolio Page Content — Streamlined, Ultra-Clean & Fast Flow */}
      <main className="relative z-10 flex flex-col bg-transparent">
        <HeroCyber onOpenResume={() => setResumeOpen(true)} />
        <ProjectsCyber />
        <EducationCyber />
        <SkillsCyber />
        <ContactCyber />
      </main>

      {/* Parallax Uncover Curtain Footer */}
      <Footer onOpenCommandPalette={() => setCmdOpen(true)} />
    </div>
  );
}
