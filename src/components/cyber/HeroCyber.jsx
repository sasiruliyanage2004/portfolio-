import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileDown, Code2, Star } from "lucide-react";
import CulturalPatternCanvas from "../CulturalPatternCanvas";

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

export default function HeroCyber({ culturalTheme = "dumbara" }) {
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
      className="relative min-h-screen w-full overflow-hidden mesh-bg flex items-center pt-24 sm:pt-28 lg:pt-32 pb-12"
    >
      {/* Real-time Procedural HTML5 Canvas Cultural Motif Engine */}
      <CulturalPatternCanvas theme={culturalTheme} />

      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px] float-slow pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-violet-500/15 blur-[130px] pointer-events-none" />

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
            className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300"
          >
            Full-stack engineer crafting fast, precise, and quietly futuristic
            products — fusing modern WebGL architecture with Sri Lankan cultural motifs.
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
          {/* Ambient Glow Aura */}
          <div className="absolute inset-4 bg-gradient-to-r from-cyan-500/25 via-indigo-500/25 to-blue-500/25 rounded-3xl blur-3xl scale-105 pointer-events-none" />

          {/* Main 3D Card Container */}
          <TiltCard className="glass-panel noise-overlay relative w-full max-w-[420px] rounded-3xl p-3 shadow-2xl border-2 border-white/20 transition-all duration-500">
            <span className="border-beam" aria-hidden="true" />

            {/* Profile Image Frame */}
            <div className="relative h-[380px] sm:h-[440px] lg:h-[480px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-950/20 via-cyan-950/20 to-[#0b0f17]">
              <img
                src="/profile.png"
                alt="Developer Portrait"
                className="h-full w-full object-cover object-top filter grayscale contrast-110 brightness-115 group-hover:grayscale-0 group-hover:brightness-110 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-700" />
            </div>

            {/* Floating Badge 1 */}
            <div className="glass-panel noise-overlay absolute -top-3 -right-3 p-3.5 rounded-2xl shadow-xl border border-cyan-400/30 bg-[#0b0f17]/90 backdrop-blur-md">
              <Star className="h-5 w-5 text-cyan-300 fill-cyan-300/30" />
            </div>

            {/* Floating Badge 2 */}
            <div className="glass-panel noise-overlay absolute -bottom-3 -left-3 p-3.5 rounded-2xl shadow-xl border border-indigo-400/30 bg-[#0b0f17]/90 backdrop-blur-md">
              <Code2 className="h-5 w-5 text-indigo-300" />
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
