import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, X } from 'lucide-react';
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
  const [showCaseStudy, setShowCaseStudy] = useState(false);

  // Dynamic Case Study Descriptions per Active Tab
  const themeConfig = {
    dumbara: {
      title: "Dumbara Geometric Mat Weave Algorithm",
      motif: "18th-Century Sri Lankan Dumbara Mat Weaving Motif",
      technique: "HTML5 Canvas 2D Procedural Lattice Rendering",
      algorithmText: "This background pattern is procedurally generated in real-time using HTML5 Canvas 2D vector pathing. Trigonometric sine-wave functions simulate the physical mechanical tension of traditional Dumbara weaving looms at 60fps. Concentric rhombus diamonds and geometric lotus cross motifs are dynamically calculated with zero static image assets.",
    },
    liyawela: {
      title: "Liyawela Bio-Organic Vine Flow Algorithm",
      motif: "Traditional Sri Lankan Liyawel (Leaf & Vine) Carving",
      technique: "Parametric Sinusoidal Bezier Curve Math",
      algorithmText: "This background pattern is procedurally rendered in real-time using parametric sinusoidal Bezier curves and quadratic leaf-tendril node spirals. Employs 60fps fluid wave mathematics to simulate weightless organic energy forms drifting across the screen without scroll latency.",
    },
    palapethi: {
      title: "Pala Pethi Floral Petal Lattice Algorithm",
      motif: "Traditional Sri Lankan Pala Pethi (Petal) Border Motif",
      technique: "Polar Coordinate Dual-Arc Flower Parametrics",
      algorithmText: "This background pattern is procedurally constructed using polar coordinate transformations and dual-concentric arc pathing. Interlocking 4-petal lotus flower lattices are rendered with an antigravity floating drift calculation at 60fps.",
    },
  }[culturalTheme] || {
    title: "Dumbara Geometric Mat Weave Algorithm",
    motif: "Dumbara Mat Weave Motif",
    technique: "HTML5 Canvas 2D Vector Geometry",
    algorithmText: "Procedurally generated HTML5 Canvas 2D vector geometry.",
  };

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
        <HeroCyber culturalTheme={culturalTheme} onOpenCaseStudy={() => setShowCaseStudy(true)} />
        <ProjectsCyber />
        <SkillsCyber />
        <ContactCyber />
      </main>

      <Footer />

      {/* Root Priority "HOW IT'S MADE" Algorithmic Case Study Modal */}
      <AnimatePresence>
        {showCaseStudy && (
          <div
            onClick={() => setShowCaseStudy(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel noise-overlay relative w-full max-w-lg rounded-2xl p-6 border border-cyan-400/40 bg-[#0b0f17]/95 shadow-2xl text-left"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-cyan-400" />
                  <h3 className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
                    Engineering Case Study // {culturalTheme.toUpperCase()}
                  </h3>
                </div>
                <button
                  onClick={() => setShowCaseStudy(false)}
                  className="rounded-full p-1 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 font-mono text-xs text-slate-300 leading-relaxed">
                <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/30 p-3.5">
                  <span className="text-cyan-300 font-semibold uppercase block mb-1">{themeConfig.title}</span>
                  <p className="text-[11px] text-slate-200 leading-relaxed">
                    {themeConfig.algorithmText}
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2 text-[11px] uppercase tracking-wider text-cyan-400">
                    // Technical Specifications
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-400 text-[11px]">
                    <li><strong className="text-slate-200">Cultural Motif:</strong> {themeConfig.motif}</li>
                    <li><strong className="text-slate-200">Technique:</strong> {themeConfig.technique}</li>
                    <li><strong className="text-slate-200">Engine Stack:</strong> React 19 + HTML5 Canvas 2D Context API</li>
                    <li><strong className="text-slate-200">Performance:</strong> 60fps GPU-accelerated requestAnimationFrame loop with zero scroll lag</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowCaseStudy(false)}
                  className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2 text-xs font-medium text-white shadow-lg hover:shadow-cyan-500/25 transition-shadow"
                >
                  Close Technical Briefing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
