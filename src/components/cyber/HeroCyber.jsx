import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileDown, Sparkles, Code2, Star, Cpu } from "lucide-react";

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
    rotateY.set((px - 0.5) * 12);
    rotateX.set((0.5 - py) * 12);
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
          background: `radial-gradient(360px circle at ${spot.x}% ${spot.y}%, rgba(6,182,212,0.18), transparent 65%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

export default function HeroCyber() {
  const { scrollY } = useScroll();
  const avatarScale = useTransform(scrollY, [0, 400], [1, 0.88]);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden mesh-bg flex items-center"
    >
      {/* Ambient grid + glow orbs */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px] float-slow pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-violet-500/15 blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">
        {/* Left Column — Text Intro */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-panel noise-overlay relative inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-[11px] tracking-wide text-cyan-300/90 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            [SYSTEM_STATUS: ONLINE // AVAILABLE_FOR_HIRE]
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Building interfaces
            <br />
            for the <span className="text-gradient">next web</span>
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

        {/* Right Column — Lahiru Liyanage Style Portrait Card with Floating Badges */}
        <motion.div
          style={{ scale: avatarScale }}
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group relative flex justify-center [perspective:1000px] py-6 px-4"
        >
          {/* Ambient Glow Aura */}
          <div className="absolute inset-4 bg-gradient-to-r from-cyan-500/25 via-indigo-500/25 to-violet-500/25 rounded-3xl blur-3xl scale-105 pointer-events-none" />

          {/* Main 3D Card Container */}
          <TiltCard className="glass-panel noise-overlay relative w-full max-w-[420px] rounded-3xl p-3 shadow-2xl border-2 border-white/20">
            <span className="border-beam" aria-hidden="true" />

            {/* Profile Image Frame */}
            <div className="relative h-[380px] sm:h-[440px] lg:h-[480px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-950/40 via-cyan-950/30 to-[#0b0f17]">
              <img
                src="/profile.png"
                alt="Developer Portrait"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent opacity-85" />
            </div>

            {/* Floating Badge 1 (Top-Right Star Badge) */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-400 to-cyan-500 p-3.5 rounded-2xl shadow-xl shadow-cyan-500/20 border border-white/20">
              <Star className="h-5 w-5 text-white fill-white" />
            </div>

            {/* Floating Badge 2 (Bottom-Left Code Badge) */}
            <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-indigo-500 to-violet-600 p-3.5 rounded-2xl shadow-xl shadow-indigo-500/20 border border-white/20">
              <Code2 className="h-5 w-5 text-white" />
            </div>

            {/* Floating Badge 3 (Bottom-Right Info Card) */}
            <div className="absolute -bottom-6 -right-3 sm:-right-6 glass-panel noise-overlay p-4 rounded-2xl shadow-2xl border border-cyan-400/40 backdrop-blur-md max-w-[220px]">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-semibold text-white">Architecture → Code</h4>
                  <p className="font-mono text-[10px] text-cyan-300/80">Scalable Systems</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
                </div>
                <span className="font-mono text-[10px] text-emerald-400 font-semibold">100%</span>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

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
