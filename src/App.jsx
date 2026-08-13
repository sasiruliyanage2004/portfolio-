import { useState, useEffect } from "react";
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

      // Outer cyan/indigo gradient glow ring
      const grad = ctx.createLinearGradient(0, 0, 64, 64);
      grad.addColorStop(0, "#06b6d4");
      grad.addColorStop(1, "#6366f1");

      ctx.beginPath();
      ctx.arc(32, 32, 31, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Dark background inner circle
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fillStyle = "#05080f";
      ctx.fill();

      // Circular crop clip for profile portrait photo
      ctx.beginPath();
      ctx.arc(32, 32, 26, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // Draw profile photo inside the circle
      ctx.drawImage(img, 3, 3, 58, 58);

      // Attach generated PNG Data URL to browser favicon
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
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <div className="min-h-screen mesh-bg text-slate-200 font-body selection:bg-indigo-500/30 selection:text-white relative">
      {/* Full-Page Real-time Procedural HTML5 Cultural Motif Canvas */}
      <CulturalPatternCanvas theme={culturalTheme} />

      {/* STITCH Particle Background & Custom Glow Cursor */}
      <ParticleBackground />
      <CustomCursor />

      {/* Floating Apple macOS Navigation Dock */}
      <FloatingDockCyber
        theme={theme}
        toggleTheme={toggleTheme}
        activePattern={culturalTheme}
        setActivePattern={setCulturalTheme}
      />

      {/* Command Palette (Ctrl + K) */}
      <CommandPalette
        theme={theme}
        toggleTheme={toggleTheme}
        activePattern={culturalTheme}
        setActivePattern={setCulturalTheme}
        open={cmdOpen}
        setOpen={setCmdOpen}
      />

      {/* Main Portfolio Page Content — 100% Crisp Transparent Canvas View without backdrop blur smudges */}
      <main className="relative z-10 flex flex-col bg-transparent">
        <HeroCyber culturalTheme={culturalTheme} />
        <ProjectsCyber />
        <CulturalCraftCyber />
        <SkillsCyber />
        <ContactCyber />
      </main>

      {/* Parallax Uncover Curtain Footer */}
      <Footer onOpenCommandPalette={() => setCmdOpen(true)} />
    </div>
  );
}
