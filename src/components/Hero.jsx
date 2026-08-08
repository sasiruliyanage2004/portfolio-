import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, FileDown, Sparkles } from "lucide-react";

/* ----------------------------------------------------------------
   Magnetic button — follows the cursor within a small radius,
   snaps back with a spring on leave.
   ---------------------------------------------------------------- */
function MagneticButton({ children, className = "", ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/* ----------------------------------------------------------------
   3D tilt wrapper — rotates on X/Y based on cursor position,
   drives a radial "spotlight" CSS var for the sheen effect.
   ---------------------------------------------------------------- */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 150, damping: 18 });
  const springRY = useSpring(rotateY, { stiffness: 150, damping: 18 });
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 14);
    rotateX.set((0.5 - py) * 14);
    setSpot({ x: px * 100, y: py * 100 });
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: springRX, rotateY: springRY, transformPerspective: 900 }}
      className={className}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at ${spot.x}% ${spot.y}%, rgba(6,182,212,0.14), transparent 65%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

const STACK_LINES = [
  { key: "const", text: "frontend", type: '["React", "TypeScript", "Tailwind"]' },
  { key: "const", text: "motion", type: '"Framer Motion"' },
  { key: "const", text: "backend", type: '["Node", "Postgres", "Redis"]' },
  { key: "const", text: "focus", type: '"Interfaces that feel alive"' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden mesh-bg flex items-center"
    >
      {/* Ambient grid + glow orbs */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px] float-slow pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-violet-500/15 blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-6 py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">
        {/* ---------------- Left column: copy ---------------- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-panel noise-overlay relative inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-[11px] tracking-wide text-cyan-300/90"
          >
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            [SYSTEM_STATUS: ONLINE&nbsp;//&nbsp;AVAILABLE_FOR_HIRE]
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Building interfaces
            <br />
            for the{" "}
            <span className="text-gradient">next web</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400"
          >
            Full-stack engineer crafting fast, precise, and quietly futuristic
            products — from motion systems to the architecture underneath
            them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_30px_rgba(99,102,241,0.35)] transition-shadow hover:shadow-[0_0_45px_rgba(99,102,241,0.55)]">
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton className="glass-panel inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-slate-200">
              Get in Touch
            </MagneticButton>

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 underline-offset-4 transition-colors hover:text-cyan-300 hover:underline"
            >
              <FileDown className="h-4 w-4" />
              Resume
            </a>
          </motion.div>
        </div>

        {/* ---------------- Right column: terminal card ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="group [perspective:1000px]"
        >
          <TiltCard className="glass-panel noise-overlay relative overflow-hidden rounded-2xl p-0 shadow-2xl">
            <span className="border-beam" aria-hidden="true" />

            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 font-mono text-[11px] text-slate-500">
                ~/portfolio/stack.ts
              </span>
              <Sparkles className="ml-auto h-3.5 w-3.5 text-violet-400/70" />
            </div>

            <div className="space-y-2.5 px-6 py-7 font-mono text-[13px] leading-relaxed">
              {STACK_LINES.map((line, i) => (
                <motion.div
                  key={line.key + i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.12 }}
                >
                  <span className="text-violet-400">const</span>{" "}
                  <span className="text-cyan-300">{line.text}</span>{" "}
                  <span className="text-slate-500">=</span>{" "}
                  <span className="text-indigo-300">{line.type}</span>
                  <span className="text-slate-500">;</span>
                </motion.div>
              ))}
              <div className="pt-2 text-slate-500">
                <span className="text-emerald-400">✓</span> ready to ship
                <span className="caret ml-1 text-cyan-300">▍</span>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-slate-600"
      >
        SCROLL
      </motion.div>
    </section>
  );
}
