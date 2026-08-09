import { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import FloatingDockCyber from './components/cyber/FloatingDockCyber';
import CulturalPatternCanvas from './components/CulturalPatternCanvas';
import HeroCyber from './components/cyber/HeroCyber';
import ProjectsCyber from './components/cyber/ProjectsCyber';
import SkillsCyber from './components/cyber/SkillsCyber';
import ContactCyber from './components/cyber/ContactCyber';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  const [culturalTheme] = useState('dumbara');

  return (
    <div className="min-h-screen mesh-bg text-slate-200 font-body selection:bg-indigo-500/30 selection:text-white relative">
      {/* Full-Page Real-time Procedural HTML5 Cultural Motif Canvas */}
      <CulturalPatternCanvas theme={culturalTheme} />

      {/* STITCH Particle Background & Custom Glow Cursor */}
      <ParticleBackground />
      <CustomCursor />

      {/* Floating Apple macOS Navigation Dock */}
      <FloatingDockCyber />

      {/* Main Portfolio Page Sections — Single Unified Seamless Canvas */}
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
