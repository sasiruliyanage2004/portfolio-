import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileDown, Code2, Star, Sparkles, Terminal, Atom, Zap, Layers } from "lucide-react";

function MagneticButton({ children, className = "", ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.25);
    y.set(relY * 0.25);
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
      whileTap={{ scale: 0.96 }}
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

const TECH_STACK = [
  { label: "React 19", icon: Atom },
  { label: "Vite 8", icon: Zap },
  { label: "Tailwind v4", icon: Layers },
  { label: "Framer Motion", icon: Sparkles },
  { label: "Node.js", icon: Terminal },
];

function CyclingTechBadge() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TECH_STACK.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const CurrentIcon = TECH_STACK[index].icon;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="glass-panel noise-overlay absolute -top-3 -left-3 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl shadow-xl animate-float-chip cursor-pointer select-none z-20 border border-white/20"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={TECH_STACK[index].label}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="flex items-center gap-1.5"
        >
          <CurrentIcon className="h-4 w-4 text-cyan-400 fill-cyan-400/20" />
          <span className="font-mono text-xs font-semibold whitespace-nowrap">
            {TECH_STACK[index].label}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const HERO_STATUSES = [
  { label: "Available for Hire", icon: "🟢", color: "text-emerald-300" },
  { label: "Coding: React 19 + Node", icon: "⚡", color: "text-cyan-300" },
  { label: "50+ Commits This Month", icon: "🚀", color: "text-indigo-300" },
];

function CyclingStatusBadge() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_STATUSES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_STATUSES[index];

  return (
    <div className="glass-panel noise-overlay absolute -bottom-3 -right-3 flex items-center gap-2 px-3.5 py-2 rounded-2xl shadow-xl z-20 border border-white/20 select-none">
      <span className="text-xs">{current.icon}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={current.label}
          initial={{ y: 6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -6, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`font-mono text-xs font-semibold whitespace-nowrap ${current.color}`}
        >
          {current.label}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function HeroCyber() {
  const { scrollY } = useScroll();

  // Scroll-driven transforms for Portrait Image Card
  const avatarScale = useTransform(scrollY, [0, 500], [1, 0.84]);
  const avatarY = useTransform(scrollY, [0, 500], [0, 45]);
  const avatarOpacity = useTransform(scrollY, [0, 500], [1, 0.8]);

  // Scroll-driven transforms for Hero Text Column
  const heroTextScale = useTransform(scrollY, [0, 500], [1, 0.88]);
  const heroTextY = useTransform(scrollY, [0, 500], [0, 40]);
  const heroTextOpacity = useTransform(scrollY, [0, 500], [1, 0.75]);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-transparent flex items-center pt-24 sm:pt-28 lg:pt-32 pb-16"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-6 py-4 sm:py-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">
        {/* Left Column — Text Intro */}
        <motion.div style={{ scale: heroTextScale, y: heroTextY, opacity: heroTextOpacity }}>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Building interfaces
            <br />
            for the <span className="text-gradient">next web</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 max-w-lg text-lg leading-relaxed text-slate-300"
          >
            Full-stack engineer crafting fast, precise, and quietly futuristic
            products — fusing modern WebGL architecture with Sri Lankan cultural motifs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            {/* Primary CTA (Gradient Sheen Sweep) */}
            <MagneticButton className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_30px_rgba(99,102,241,0.35)] transition-shadow hover:shadow-[0_0_45px_rgba(99,102,241,0.55)] cursor-pointer">
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            </MagneticButton>

            {/* Secondary CTA (Ghost/Outline Style) */}
            <MagneticButton className="glass-panel inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-slate-200 border border-slate-300/30 dark:border-white/20 hover:bg-indigo-500/10 hover:border-indigo-500/40 hover:text-cyan-300 transition-all cursor-pointer bg-transparent">
              Get in Touch
            </MagneticButton>

            <a
              href="/resume.pdf"
              download="Sasiru_Liyanage_CV.pdf"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 underline-offset-4 transition-colors hover:text-cyan-300 hover:underline"
            >
              <FileDown className="h-4 w-4" />
              Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column — Portrait Image Card */}
        <motion.div
          style={{ scale: avatarScale, y: avatarY, opacity: avatarOpacity }}
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group relative flex justify-center [perspective:1000px] py-2 px-4"
        >
          {/* Soft Outer Embedded Halo Glow Aura */}
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-violet-500/30 rounded-[2.2rem] blur-2xl opacity-70 scale-105 pointer-events-none" />

          {/* Main 3D Card Container */}
          <TiltCard className="hero-portrait-card noise-overlay relative w-full max-w-[420px] rounded-[2rem] p-4 sm:p-5 shadow-2xl transition-all duration-500">
            <span className="border-beam" aria-hidden="true" />

            {/* Profile Image Frame */}
            <div className="hero-portrait-frame relative h-[380px] sm:h-[440px] lg:h-[480px] w-full overflow-hidden rounded-[1.5rem] shadow-inner">
              <img
                src="/profile.png"
                alt="Developer Portrait"
                className="h-full w-full object-cover object-top filter grayscale contrast-110 brightness-115 group-hover:grayscale-0 group-hover:brightness-110 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17]/80 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-700" />
            </div>

            {/* Cycling Tech Stack Badge */}
            <CyclingTechBadge />

            {/* Orbiting Glass Chip Badge 2 — Live Status Badge */}
            <CyclingStatusBadge />
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
