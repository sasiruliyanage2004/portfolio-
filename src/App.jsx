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
  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-200 font-body selection:bg-indigo-500/30 selection:text-white">
      {/* STITCH Particle Background & Custom Glow Cursor */}
      <ParticleBackground />
      <CustomCursor />

      {/* Floating Apple macOS Navigation Dock */}
      <FloatingDockCyber />

      {/* Main Portfolio Page Sections */}
      <main className="relative z-10 flex flex-col">
        <HeroCyber />
        <ProjectsCyber />
        <SkillsCyber />
        <ContactCyber />
      </main>

      <Footer />
    </div>
  );
}
