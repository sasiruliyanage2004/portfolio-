import { useState } from 'react';
// Theme 1: Cyber Glassmorphism
import FloatingDockCyber from './components/cyber/FloatingDockCyber';
import HeroCyber from './components/cyber/HeroCyber';
import ProjectsCyber from './components/cyber/ProjectsCyber';
import SkillsCyber from './components/cyber/SkillsCyber';
import ContactCyber from './components/cyber/ContactCyber';

// Theme 2: Emerald Green Matrix (Green Theme)
import FloatingDockGreen from './components/green/FloatingDockGreen';
import HeroGreen from './components/green/HeroGreen';
import ProjectsGreen from './components/green/ProjectsGreen';
import SkillsGreen from './components/green/SkillsGreen';
import ContactGreen from './components/green/ContactGreen';

// Theme 3: v0 Minimalist Engineering Blueprint
import ShaderCanvas from './components/ShaderCanvas';
import HeaderMinimal from './components/minimal/HeaderMinimal';
import HeroMinimal from './components/minimal/HeroMinimal';
import ProjectsMinimal from './components/minimal/ProjectsMinimal';
import SkillsMinimal from './components/minimal/SkillsMinimal';
import ContactMinimal from './components/minimal/ContactMinimal';

// Theme 4: STITCH Particle Matrix
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';

import Footer from './components/Footer';
import './index.css';

export default function App() {
  const [theme, setTheme] = useState('cyber'); // 'cyber' | 'green' | 'minimal' | 'particle'
  const [briefingMode, setBriefingMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-200 font-body selection:bg-emerald-500/30 selection:text-white">
      {/* Top Floating Theme Switcher Bar */}
      <div className="fixed top-0 inset-x-0 z-[100] bg-black/90 backdrop-blur-md border-b border-white/10 py-2 px-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono">
        <span className="text-zinc-400 font-semibold uppercase tracking-wider hidden lg:inline">DESIGN THEME:</span>
        <button
          onClick={() => setTheme('cyber')}
          className={`px-3 py-1 rounded-full transition-all ${
            theme === 'cyber'
              ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium shadow-[0_0_15px_rgba(99,102,241,0.5)]'
              : 'text-zinc-400 hover:text-white border border-white/10'
          }`}
        >
          ✨ 1. Cyber Glassmorphism
        </button>
        <button
          onClick={() => setTheme('green')}
          className={`px-3 py-1 rounded-full transition-all ${
            theme === 'green'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.5)]'
              : 'text-emerald-400 hover:text-emerald-200 border border-emerald-500/30'
          }`}
        >
          🟢 2. Emerald Green Matrix
        </button>
        <button
          onClick={() => setTheme('minimal')}
          className={`px-3 py-1 rounded-full transition-all ${
            theme === 'minimal'
              ? 'bg-cyan-400 text-zinc-950 font-medium shadow-[0_0_15px_rgba(6,182,212,0.5)]'
              : 'text-zinc-400 hover:text-white border border-white/10'
          }`}
        >
          ⚡ 3. v0 Minimalist Blueprint
        </button>
        <button
          onClick={() => setTheme('particle')}
          className={`px-3 py-1 rounded-full transition-all ${
            theme === 'particle'
              ? 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-medium shadow-[0_0_15px_rgba(139,92,246,0.5)]'
              : 'text-zinc-400 hover:text-white border border-white/10'
          }`}
        >
          🌌 4. STITCH Particle Matrix
        </button>
      </div>

      {theme === 'cyber' && (
        <>
          <FloatingDockCyber />
          <main className="relative z-10 flex flex-col pt-4">
            <HeroCyber />
            <ProjectsCyber />
            <SkillsCyber />
            <ContactCyber />
          </main>
        </>
      )}

      {theme === 'green' && (
        <>
          <FloatingDockGreen />
          <main className="relative z-10 flex flex-col pt-4">
            <HeroGreen />
            <ProjectsGreen />
            <SkillsGreen />
            <ContactGreen />
          </main>
        </>
      )}

      {theme === 'minimal' && (
        <>
          <ShaderCanvas />
          <HeaderMinimal briefingMode={briefingMode} setBriefingMode={setBriefingMode} />
          <main className="relative z-10">
            <HeroMinimal briefingMode={briefingMode} />
            <ProjectsMinimal />
            <SkillsMinimal />
            <ContactMinimal />
          </main>
        </>
      )}

      {theme === 'particle' && (
        <>
          <ParticleBackground />
          <CustomCursor />
          <FloatingDockCyber />
          <main className="relative z-10 flex flex-col pt-6">
            <HeroCyber />
            <ProjectsCyber />
            <SkillsCyber />
            <ContactCyber />
          </main>
        </>
      )}

      <Footer />
    </div>
  );
}
