import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import Lenis from "lenis";
import CustomCursor from "./components/CustomCursor";
import IntroLoader from "./components/IntroLoader";
import ScrollProgressBar from "./components/ScrollProgressBar";
import FloatingDockCyber from "./components/cyber/FloatingDockCyber";
import SwitchModeToggle from "./components/SwitchModeToggle";
import CulturalPatternCanvas from "./components/CulturalPatternCanvas";
import BackToTop from "./components/BackToTop";
import NoiseOverlay from "./components/NoiseOverlay";
import HeroCyber from "./components/cyber/HeroCyber";
import ProjectsCyber from "./components/cyber/ProjectsCyber";
import EducationCyber from "./components/cyber/EducationCyber";
import SkillsCyber from "./components/cyber/SkillsCyber";
import ContactCyber from "./components/cyber/ContactCyber";
import Footer from "./components/Footer";
import "./index.css";

// Lazy-load non-critical heavy modals & easter eggs for instantaneous initial page load
const EasterEggs = lazy(() => import("./components/EasterEggs"));
const CommandPalette = lazy(() => import("./components/CommandPalette"));
const ResumeModal = lazy(() => import("./components/ResumeModal"));

export default function App() {
  // Theme state persisted via localStorage (defaults to modern luminous light theme)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio_theme_v2") || "light";
  });

  const [cmdOpen, setCmdOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Show loader once per session (snappy on mobile, cinematic on desktop)
  const [loaderDone, setLoaderDone] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("intro_shown_v2") === "true";
    }
    return false;
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
    localStorage.setItem("portfolio_theme_v2", theme);
  }, [theme]);

  // Global Keyboard Shortcuts (Ctrl/Cmd+K for Command Palette, 'T' for Theme Toggle)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Intercept Ctrl+K or Cmd+K so browser search bar doesn't open
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
        return;
      }

      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
      if (e.key === "t" || e.key === "T") {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lenis smooth scroll — buttery-smooth inertia scroll on desktop, native on mobile
  useEffect(() => {
    // Check if mobile / touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (isTouch) return; // Allow native 120Hz mobile compositor scrolling with zero overhead

    const lenis = new Lenis({
      duration: 1.1,
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
    sessionStorage.setItem("intro_shown_v2", "true");
    setLoaderDone(true);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 font-body selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-white relative">
      {/* Ambient Radiant Aurora Mesh Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-gradient-to-b from-cyan-400/20 via-indigo-400/12 to-transparent rounded-full blur-[120px] dark:from-cyan-600/10 dark:via-indigo-600/5 dark:to-transparent" />
        <div className="absolute top-[30%] -left-32 w-[550px] h-[550px] bg-emerald-400/15 rounded-full blur-[140px] dark:bg-emerald-600/5" />
        <div className="absolute top-[55%] -right-32 w-[600px] h-[600px] bg-cyan-400/15 rounded-full blur-[140px] dark:bg-cyan-600/5" />
        <div className="absolute bottom-10 left-1/3 w-[550px] h-[550px] bg-indigo-400/12 rounded-full blur-[130px] dark:bg-indigo-600/5" />
      </div>

      {/* Global SVG Noise Overlay (Film Grain for Matte Pitch-Black Texture in Dark Mode) */}
      <NoiseOverlay />

      {/* Cinematic Intro Loader — shown once per session */}
      {!loaderDone && <IntroLoader onComplete={handleLoaderComplete} />}

      {/* Full-Page Real-time Procedural HTML5 Signature Dumbara Canvas */}
      <CulturalPatternCanvas />

      {/* Custom Glow Cursor (Auto-disabled on mobile) */}
      <CustomCursor />

      {/* Scroll Progress Bar — thin brand gradient at top */}
      <ScrollProgressBar />

      {/* Suspense Container for Lazy-Loaded Modals & Widgets */}
      <Suspense fallback={null}>
        {/* Easter Eggs: tab title + Konami code confetti */}
        <EasterEggs />

        {/* Command Palette (Ctrl + K) */}
        {cmdOpen && (
          <CommandPalette
            theme={theme}
            toggleTheme={toggleTheme}
            open={cmdOpen}
            setOpen={setCmdOpen}
          />
        )}

        {/* Interactive Resume Preview Modal */}
        {resumeOpen && (
          <ResumeModal
            isOpen={resumeOpen}
            onClose={() => setResumeOpen(false)}
          />
        )}
      </Suspense>

      {/* Magic UI Gradient Button Group Dock (Unified Navigation & Theme Switcher) */}
      <FloatingDockCyber
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenCommandPalette={() => setCmdOpen(true)}
      />

      {/* Back To Top Floating Button */}
      <BackToTop />

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
