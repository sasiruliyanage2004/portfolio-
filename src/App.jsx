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
  const [theme, setTheme] = useState("dark");
  const [culturalTheme, setCulturalTheme] = useState("dumbara");
  const [cmdOpen, setCmdOpen] = useState(false);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
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

      {/* Main Portfolio Page Content — 100% Transparent Canvas View with Uncover Curtain Footer */}
      <main className="relative z-10 flex flex-col bg-transparent backdrop-blur-[2px]">
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
