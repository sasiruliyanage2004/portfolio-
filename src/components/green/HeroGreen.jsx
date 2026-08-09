import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileDown, Sparkles, Star, Code2, Cpu } from "lucide-react";

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
          background: `radial-gradient(360px circle at ${spot.x}% ${spot.y}%, rgba(16,185,129,0.22), transparent 65%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

export default function HeroGreen() {
  const { scrollY } = useScroll();
  const avatarScale = useTransform(scrollY, [0, 400], [1, 0.88]);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#040d08] flex items-center"
    >
      {/* Ambient Green Glowing Orbs */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-[120px] float-slow pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-teal-500/15 blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">
        {/* Left Column */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-panel noise-overlay relative inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-[11px] tracking-wide text-emerald-300 border border-emerald-500/30 bg-emerald-950/40 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            [SYSTEM_STATUS: ONLINE // GREEN_MATRIX_ACTIVE]
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Building systems
            <br />
            with <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent">emerald precision</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-emerald-100/70"
          >
            Full-stack engineer & system architect crafting high-performance,
            visually commanding digital solutions with green matrix aesthetic.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 px-7 py-3.5 text-sm font-medium text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-shadow hover:shadow-[0_0_45px_rgba(16,185,129,0.65)] font-semibold">
              View Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton className="glass-panel inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-emerald-200 border border-emerald-500/30">
              Get in Touch
            </MagneticButton>

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline-offset-4 transition-colors hover:text-emerald-200 hover:underline"
            >
              <FileDown className="h-4 w-4" />
              Resume
            </a>
          </motion.div>
        </div>

        {/* Right Column */}
        <motion.div
          style={{ scale: avatarScale }}
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group relative flex justify-center [perspective:1000px] py-6 px-4"
        >
          {/* Ambient Emerald Glow */}
          <div className="absolute inset-4 bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-green-500/30 rounded-3xl blur-3xl scale-105 pointer-events-none" />

          {/* Card Frame */}
          <TiltCard className="glass-panel relative w-full max-w-[420px] rounded-3xl p-3 shadow-2xl border-2 border-emerald-500/40 bg-[#06140e]/90 transition-all duration-500">
            <span className="border-beam" aria-hidden="true" />

            {/* Profile Image Frame with Dark Grayscale -> Vibrant Color Hover */}
            <div className="relative h-[380px] sm:h-[440px] lg:h-[480px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-950/60 via-teal-950/40 to-[#040d08]">
              <img
                src="/profile.png"
                alt="Developer Portrait"
                className="h-full w-full object-cover object-top filter grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040d08] via-transparent to-transparent opacity-85 group-hover:opacity-40 transition-opacity duration-700" />
            </div>

            {/* Floating Badge 1 */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-400 to-green-500 p-3.5 rounded-2xl shadow-xl shadow-emerald-500/30 border border-emerald-300">
              <Star className="h-5 w-5 text-slate-950 fill-slate-950" />
            </div>

            {/* Floating Badge 2 */}
            <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-teal-500 to-emerald-600 p-3.5 rounded-2xl shadow-xl shadow-teal-500/30 border border-emerald-300 text-slate-950">
              <Code2 className="h-5 w-5" />
            </div>

            {/* Floating Badge 3 */}
            <div className="absolute -bottom-6 -right-3 sm:-right-6 glass-panel p-4 rounded-2xl shadow-2xl border border-emerald-400/50 backdrop-blur-md max-w-[220px] bg-[#04120a]/95">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-semibold text-emerald-200">Architecture → Code</h4>
                  <p className="font-mono text-[10px] text-emerald-400/80">Green Matrix Engine</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" />
                </div>
                <span className="font-mono text-[10px] text-emerald-300 font-semibold">100%</span>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-emerald-500/60"
      >
        SCROLL
      </motion.div>
    </section>
  );
}
