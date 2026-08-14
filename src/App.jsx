import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import ParticleBackground from "./components/ParticleBackground";
import CustomCursor from "./components/CustomCursor";
import FloatingDockCyber from "./components/cyber/FloatingDockCyber";
import CulturalPatternCanvas from "./components/CulturalPatternCanvas";
import CommandPalette from "./components/CommandPalette";
import HeroCyber from "./components/cyber/HeroCyber";
import ProjectsCyber from "./components/cyber/ProjectsCyber";
import CulturalCraftCyber from "./components/cyber/CulturalCraftCyber";
import SkillsCyber from "./components/cyber/SkillsCyber";
import ContactCyber from "./components/cyber/ContactCyber";
import Footer from "./components/Footer";
import "./index.css";

// Standalone 3D Floating Glass Orb Theme Switcher with 100% Crisp High-Contrast Tooltip
function FloatingOrbThemeToggle({ theme, toggleTheme }) {
  const isLight = theme === "light";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-8 right-8 z-[70] group"
    >
      <motion.button
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        aria-label="Toggle Light/Dark Theme (Press T)"
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-xl shadow-2xl transition-all duration-300 cursor-pointer ${
          isLight
            ? "bg-white/95 border-slate-300 text-indigo-600 shadow-slate-900/15 hover:shadow-indigo-500/30"
            : "bg-[#0b0f17]/95 border-white/20 text-amber-300 shadow-black/90 hover:shadow-cyan-500/30"
        }`}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-amber-500/20 animate-pulse-slow pointer-events-none" />
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {isLight ? <Moon className="h-6 w-6 text-indigo-600" /> : <Sun className="h-6 w-6 text-amber-300" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* 100% Crisp High-Contrast Floating Tooltip Badge on Hover */}
      <span
        className={`absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-4 py-2 font-mono text-xs font-extrabold shadow-2xl transition-all pointer-events-none opacity-0 group-hover:opacity-100 ${
          isLight
            ? "bg-white text-slate-900 border-slate-300 shadow-slate-900/20"
            : "bg-[#090d16] text-white border-white/20 shadow-black/90"
        }`}
      >
        Toggle Theme{" "}
        <kbd
          className={`ml-1.5 rounded px-1.5 py-0.5 text-[10px] font-bold ${
            isLight ? "bg-indigo-100 text-indigo-700 border border-indigo-200" : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
          }`}
        >
          T
        </kbd>
      </span>
    </motion.div>
  );
}

export default function App() {
  // Theme state persisted via localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio_theme") || "dark";
  });

  const [culturalTheme, setCulturalTheme] = useState(() => {
    return localStorage.getItem("portfolio_cultural_theme") || "dumbara";
  });

  const [cmdOpen, setCmdOpen] = useState(false);

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

  // Sync cultural motif theme with localStorage
  useEffect(() => {
    localStorage.setItem("portfolio_cultural_theme", culturalTheme);
  }, [culturalTheme]);

  // Idea 3: Global Keyboard Shortcut ('T' key listener) for instant Theme Toggle
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
      grad.addColorStop(1, "#6366f1");

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

  return (
    <div className="min-h-screen mesh-bg text-slate-200 font-body selection:bg-indigo-500/30 selection:text-white relative">
      {/* Full-Page Real-time Procedural HTML5 Cultural Motif Canvas */}
      <CulturalPatternCanvas theme={culturalTheme} />

      {/* STITCH Particle Background & Custom Glow Cursor */}
      <ParticleBackground />
      <CustomCursor />

      {/* Floating Apple macOS Navigation Dock with True 3D Tilt Physics */}
      <FloatingDockCyber
        theme={theme}
        toggleTheme={toggleTheme}
        activePattern={culturalTheme}
        setActivePattern={setCulturalTheme}
      />

      {/* Standalone Fixed 3D Floating Glass Orb Theme Switcher */}
      <FloatingOrbThemeToggle theme={theme} toggleTheme={toggleTheme} />

      {/* Command Palette (Ctrl + K) */}
      <CommandPalette
        theme={theme}
        toggleTheme={toggleTheme}
        activePattern={culturalTheme}
        setActivePattern={setCulturalTheme}
        open={cmdOpen}
        setOpen={setCmdOpen}
      />

      {/* Main Portfolio Page Content */}
      <main className="relative z-10 flex flex-col bg-transparent">
        <HeroCyber culturalTheme={culturalTheme} />
        <ProjectsCyber />
        <CulturalCraftCyber
          theme={theme}
          toggleTheme={toggleTheme}
          activePattern={culturalTheme}
          setActivePattern={setCulturalTheme}
        />
        <SkillsCyber />
        <ContactCyber />
      </main>

      {/* Parallax Uncover Curtain Footer */}
      <Footer onOpenCommandPalette={() => setCmdOpen(true)} />
    </div>
  );
}
