import { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import FloatingDockCyber from './components/cyber/FloatingDockCyber';
import HeroCyber from './components/cyber/HeroCyber';
import ProjectsCyber from './components/cyber/ProjectsCyber';
import SkillsCyber from './components/cyber/SkillsCyber';
import ContactCyber from './components/cyber/ContactCyber';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  const [culturalTheme, setCulturalTheme] = useState('dumbara'); // 'dumbara' | 'liyawela' | 'palapethi'

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-200 font-body selection:bg-indigo-500/30 selection:text-white relative">
      {/* Top 1-Click Sri Lankan Cultural Tech Hybrid Theme Switcher Bar */}
      <div className="fixed top-2.5 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto glass-panel noise-overlay border border-white/20 bg-[#0b0f17]/90 backdrop-blur-xl px-3 py-1.5 rounded-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] font-mono shadow-2xl">
          <span className="text-cyan-400 font-semibold tracking-wider hidden sm:inline mr-1">CULTURAL TECH:</span>
          
          <button
            onClick={() => setCulturalTheme('dumbara')}
            className={`px-3 py-1 rounded-full transition-all ${
              culturalTheme === 'dumbara'
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)] ring-1 ring-cyan-300/40'
                : 'text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            🔷 1. Dumbara Geometric
          </button>

          <button
            onClick={() => setCulturalTheme('liyawela')}
            className={`px-3 py-1 rounded-full transition-all ${
              culturalTheme === 'liyawela'
                ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)] ring-1 ring-purple-300/40'
                : 'text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            🌿 2. Liyawela Bio-Flow
          </button>

          <button
            onClick={() => setCulturalTheme('palapethi')}
            className={`px-3 py-1 rounded-full transition-all ${
              culturalTheme === 'palapethi'
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold shadow-[0_0_15px_rgba(20,184,166,0.4)] ring-1 ring-teal-300/40'
                : 'text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            🌸 3. Pala Pethi Petals
          </button>
        </div>
      </div>

      {/* STITCH Particle Background & Custom Glow Cursor */}
      <ParticleBackground />
      <CustomCursor />

      {/* Floating Apple macOS Navigation Dock */}
      <FloatingDockCyber />

      {/* Main Portfolio Page Sections */}
      <main className="relative z-10 flex flex-col">
        <HeroCyber culturalTheme={culturalTheme} />
        <ProjectsCyber />
        <SkillsCyber />
        <ContactCyber />
      </main>

      <Footer />
    </div>
  );
}
