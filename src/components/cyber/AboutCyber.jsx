import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, Sparkles, Code2, Database, Layout, ShieldCheck, Terminal } from "lucide-react";

const PILLARS = [
  {
    icon: Code2,
    tag: "01 // FULL-STACK ARCHITECTURE",
    title: "End-to-End Modern Engineering",
    description:
      "Crafting production-ready applications across React 19, Next.js, Node.js, and FastAPI. Focused on decoupled microservices, sub-30ms API responses, and clean modular codebases.",
    gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    accent: "text-cyan-400",
  },
  {
    icon: Database,
    tag: "02 // DATA MODELING & INTEGRITY",
    title: "Certified Database Optimization",
    description:
      "Official MongoDB Certified Data Modeler (ID: MDBwsxpdpul98). Expertise in document schemas, compound indexes, aggregation pipelines, and ACID transaction reliability.",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accent: "text-emerald-400",
  },
  {
    icon: Layout,
    tag: "03 // UI/UX & CREATIVE MOTION",
    title: "Visually Stunning Spatial Interfaces",
    description:
      "Obsessed with 60–120 FPS fluid micro-interactions, responsive ergonomics, and subtle glassmorphism. Bridging futuristic spatial design with Sri Lankan cultural heritage.",
    gradient: "from-indigo-500/20 via-cyan-500/10 to-transparent",
    accent: "text-indigo-400",
  },
  {
    icon: ShieldCheck,
    tag: "04 // PRODUCTION-GRADE RIGOR",
    title: "Zero-Compromise Resiliency",
    description:
      "Defensive programming at all external boundaries. Type-safe contracts, structured observability, automated verification, and strict adherence to modern security practices.",
    gradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
    accent: "text-teal-400",
  },
];

export default function AboutCyber() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full py-24 sm:py-32 overflow-hidden bg-transparent"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.12),transparent_70%)] blur-3xl pointer-events-none"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center lg:text-left max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 font-mono text-xs font-bold text-cyan-500 dark:text-cyan-300 mb-4"
          >
            <Compass className="h-3.5 w-3.5 text-cyan-400 animate-spin-slow" />
            <span>ABOUT ME // CRAFT & PHILOSOPHY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
          >
            Engineering at the intersection of{" "}
            <span className="text-gradient">aesthetic precision</span> and system scalability.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed mt-5"
          >
            I am a full-stack software engineer and 3rd-year Information Technology undergraduate at SLIIT,
            driven by the belief that high-performance software and world-class visual design belong together.
          </motion.p>
        </div>

        {/* Editorial Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Narrative & Values */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-normal"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 dark:border-white/10 shadow-xl space-y-5">
              <div className="flex items-center gap-3 text-cyan-500 dark:text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Terminal className="h-4 w-4" />
                <span>The Engineering Philosophy</span>
              </div>
              <p>
                To me, code is not merely a means to pass acceptance criteria. It is craftsmanship. I build
                web architectures where every component has a single purpose, state mutations are predictable,
                and user experiences feel instantaneous.
              </p>
              <p>
                From architecting real-time edge AI computer vision feeds with YOLOv11 and FastAPI to engineering
                editorial e-commerce platforms like Movi Coffee, I ensure that frontends are fluid and backends
                are resilient under load.
              </p>
              <div className="pt-2 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap gap-4 font-mono text-xs text-slate-800 dark:text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>SLIIT Malabe</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>MongoDB Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  <span>React 19 & Next.js</span>
                </div>
              </div>
            </div>

            {/* Cultural Tech Accent Card */}
            <div className="relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-cyan-950/20 via-slate-900/40 to-slate-950/80 p-6 sm:p-7 backdrop-blur-xl">
              <div className="flex items-center gap-2.5 font-mono text-xs font-bold text-cyan-400 mb-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>Cultural Tech Synthesis</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Drawing inspiration from the architectural geometry of Sigiriya and Sri Lankan Dumbara craftsmanship,
                I infuse modern digital spaces with subtle organic balance, rhythm, and timeless identity.
              </p>
            </div>
          </motion.div>

          {/* Right Column: 4 Core Pillars Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.tag}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 * idx + 0.3 }}
                  className="group relative flex flex-col justify-between rounded-3xl border border-white/20 dark:border-white/10 bg-white/80 dark:bg-[#0c1424]/75 p-6 sm:p-7 backdrop-blur-xl shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Top Hover Gradient Layer */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 ${pillar.accent}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-white pt-1">
                      {pillar.title}
                    </h3>

                    <p className="font-body text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 mt-2 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between font-mono text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore Standards</span>
                    <span>→</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
