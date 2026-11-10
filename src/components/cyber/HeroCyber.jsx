import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { ArrowRight, FileText, Sparkles, Activity, CheckCircle2, GraduationCap, ChevronDown, Code2, Atom, Layers3, Zap } from "lucide-react";

// Animated count-up hook
function useCountUp(target, inView, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.floor(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

// Stats row with count-up
function StatsRow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const projects = useCountUp(15, inView);
  const commits = useCountUp(100, inView);
  const techs = useCountUp(18, inView);
  const years = useCountUp(3, inView);

  const stats = [
    { value: projects, suffix: "+", label: "Projects" },
    { value: commits, suffix: "+", label: "Commits" },
    { value: techs, suffix: "+", label: "Technologies" },
    { value: years, suffix: "Y", label: "Experience" },
  ];

  return (
    <div ref={ref} className="flex flex-wrap gap-6 pt-2">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col">
          <span className="font-mono text-2xl font-extrabold" style={{ background: "linear-gradient(135deg, var(--grad-start), var(--grad-mid), var(--grad-end))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {s.value}{s.suffix}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-800 dark:text-slate-200 font-bold mt-0.5">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function MagneticButton({ children, className = "", href, download, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rx = useSpring(y, { stiffness: 220, damping: 22 });
  const ry = useSpring(x, { stiffness: 220, damping: 22 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set((px - 0.5) * 12);
    y.set((0.5 - py) * 12);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const LIVE_STATUSES = [
  { text: "Available for Hire", icon: CheckCircle2, color: "text-emerald-500 dark:text-emerald-400", dot: "bg-emerald-500" },
  { text: "MongoDB Certified (ID: MDBwsxpdpul98)", icon: Sparkles, color: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
  { text: "Building: React 19 • Next.js • FastAPI", icon: Activity, color: "text-cyan-600 dark:text-cyan-400", dot: "bg-cyan-500" },
  { text: "15+ High-Impact Production Projects", icon: Sparkles, color: "text-indigo-600 dark:text-indigo-300", dot: "bg-indigo-400" },
];

function UnifiedStatusBadge() {
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % LIVE_STATUSES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const current = LIVE_STATUSES[statusIdx];
  const IconComponent = current.icon;

  return (
    <div className="inline-flex items-center overflow-hidden rounded-full border border-slate-200/90 dark:border-white/15 bg-white/90 dark:bg-slate-900/85 backdrop-blur-xl px-4 py-2 shadow-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex items-center gap-2.5 font-mono text-xs font-semibold whitespace-nowrap text-slate-800 dark:text-slate-100"
        >
          <span className="relative flex h-2 w-2">
            <span className={`pulse-dot absolute inline-flex h-full w-full rounded-full ${current.dot}`} />
            <span className={`relative inline-flex h-2 w-2 rounded-full ${current.dot}`} />
          </span>
          <IconComponent className={`h-3.5 w-3.5 ${current.color}`} />
          <span>{current.text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function HeroCyber({ onOpenResume }) {
  const targetRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 70, damping: 22, mass: 0.7 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 70, damping: 22, mass: 0.7 });

  const handleHeroPointer = (event) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left - rect.width / 2) * 0.035);
    pointerY.set((event.clientY - rect.top - rect.height / 2) * 0.035);
  };

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const avatarY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const avatarScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const avatarOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section
      ref={targetRef}
      id="home"
      onPointerMove={handleHeroPointer}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
      className="hero-cinematic relative min-h-screen w-full overflow-hidden bg-transparent pt-24 pb-20 sm:pt-32 sm:pb-24 lg:pt-32 lg:pb-28 flex items-center justify-center"
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-spotlight" aria-hidden="true" />
      <motion.div className="hero-ambient hero-ambient-one" style={{ x: smoothPointerX, y: smoothPointerY }} aria-hidden="true" />
      <motion.div className="hero-ambient hero-ambient-two" style={{ x: smoothPointerX, y: smoothPointerY }} aria-hidden="true" />
      <div className="hero-scanline" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column — Text & CTAs */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-copy lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left"
          >
            {/* High-Contrast Crisp Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 0.18 }}
              className="hero-kicker inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 font-mono text-[11px] sm:text-xs font-bold max-w-full"
            >
              <GraduationCap className="h-4 w-4 text-cyan-400 shrink-0" />
              <span className="truncate">SLIIT Undergraduate <span className="hero-kicker-dot">•</span> Full-Stack Engineer</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="hero-title text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-[5.15rem] leading-[1.06] sm:leading-[1.04]">
              <span className="sr-only">Sasiru Liyanage — </span>
              <span className="hero-title-line"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>Building interfaces</motion.span></span>
              <span className="hero-title-line"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}>for the <span className="hero-gradient-text">next web<span className="hero-title-underline" /></span></motion.span></span>
            </h1>

            {/* Bio Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.62 }}
              className="hero-description text-base text-slate-600 dark:text-slate-300 sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Full-stack engineer crafting fast, precise, and quietly futuristic products — fusing modern WebGL architecture with Sri Lankan cultural motifs.
            </motion.p>

            {/* Magnetic Call To Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.78 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4"
            >
              <MagneticButton
                href="#projects"
                style={{ background: "linear-gradient(135deg, var(--grad-start), var(--grad-mid), var(--grad-end))" }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-3 sm:px-7 sm:py-3.5 font-mono text-xs font-bold text-white shadow-xl transition-all hover:shadow-cyan-500/25 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              <MagneticButton
                href="#contact"
                className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-3 sm:px-6 sm:py-3.5 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 transition-all hover:border-cyan-400/50 hover:text-cyan-400 cursor-pointer"
              >
                <span>Get in Touch</span>
              </MagneticButton>

              <button
                type="button"
                onClick={onOpenResume}
                className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-3 sm:px-5 sm:py-3.5 font-mono text-xs font-medium text-slate-700 dark:text-slate-300 transition-all hover:border-cyan-400/50 hover:text-cyan-400 cursor-pointer shadow-lg active:scale-95"
              >
                <FileText className="h-3.5 w-3.5 text-cyan-400" />
                <span>Download Resume</span>
              </button>
            </motion.div>

            {/* Animated Count-Up Stats */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.92 }} className="flex justify-center lg:justify-start">
              <StatsRow />
            </motion.div>
          </motion.div>

          {/* Right Column — 3D Pop-Out Subject with Expansive Diffused Atmosphere */}
          <motion.div
            style={{ scale: avatarScale, y: avatarY, opacity: avatarOpacity }}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-visual lg:col-span-5 group relative flex flex-col items-center justify-center [perspective:1000px] py-4 px-2 sm:px-4"
          >
            {/* 3 Orbiting Planetary Rings */}
            <div className="hero-orbit hero-orbit-a" aria-hidden="true"><span /></div>
            <div className="hero-orbit hero-orbit-b" aria-hidden="true"><span /></div>
            <div className="hero-orbit hero-orbit-c" aria-hidden="true"><span /></div>

            {/* 5 Floating Tech Satellite Chips */}
            <motion.div className="hero-tech-chip hero-chip-code" animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}>
              <Code2 /><span><b>Clean Code</b><small>Architecture</small></span>
            </motion.div>
            <motion.div className="hero-tech-chip hero-chip-react" animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}>
              <Atom /><span><b>React</b><small>Interactive UI</small></span>
            </motion.div>
            <motion.div className="hero-tech-chip hero-chip-ts hidden sm:flex" animate={{ y: [0, 8, 0], rotate: [0, 2, 0] }} transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
              <Sparkles /><span><b>TypeScript</b><small>Strict Types</small></span>
            </motion.div>
            <motion.div className="hero-tech-chip hero-chip-uiux hidden sm:flex" animate={{ y: [0, -10, 0], rotate: [0, -2, 0] }} transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
              <Zap /><span><b>UI/UX</b><small>Spatial Design</small></span>
            </motion.div>
            <motion.div className="hero-tech-chip hero-chip-stack" animate={{ y: [0, -8, 0], x: [0, 4, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
              <Layers3 /><span><b>Full Stack</b><small>End-to-end craft</small></span>
            </motion.div>

            {/* Expansive Ambient Radial Glow Spreading into the Hero Canvas */}
            <div 
              aria-hidden="true" 
              className="absolute w-[440px] sm:w-[560px] lg:w-[620px] h-[440px] sm:h-[560px] lg:h-[620px] -top-8 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(6,182,212,0.28),rgba(16,185,129,0.16),rgba(99,102,241,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_45%,rgba(6,182,212,0.38),rgba(16,185,129,0.22),rgba(99,102,241,0.14),transparent_70%)] blur-3xl opacity-80 dark:opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
            />

            {/* Subtle Futuristic Orbital Tech Halos */}
            <div 
              aria-hidden="true"
              className="absolute w-[340px] sm:w-[420px] lg:w-[460px] h-[340px] sm:h-[420px] lg:h-[460px] -top-4 rounded-full border border-cyan-500/20 dark:border-cyan-400/25 [stroke-dasharray:6_6] pointer-events-none animate-[spin_60s_linear_infinite]"
            />
            <div 
              aria-hidden="true"
              className="absolute w-[260px] sm:w-[330px] lg:w-[370px] h-[260px] sm:h-[330px] lg:h-[370px] top-4 rounded-full border border-emerald-500/20 dark:border-emerald-400/20 pointer-events-none"
            />
            <motion.div className="hero-image-aura" animate={{ scale: [0.96, 1.04, 0.96], opacity: [0.55, 0.9, 0.55] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

            {/* 3D Pop-Out Tilt Wrapper — No Card Box/Frame */}
            <TiltCard className="relative flex flex-col items-center justify-end w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[480px]">
              {/* Freely Popping Out Cutout with Natural Torso Bottom Melt */}
              <div className="relative z-10 w-full flex justify-center">
                <picture className="block select-none pointer-events-none">
                  <source srcSet="/profile-cutout.webp" type="image/webp" />
                  <img
                    src="/profile-cutout.png"
                    alt="Sasiru Nethvidu Liyanage"
                    width={440}
                    height={472}
                    loading="eager"
                    fetchPriority="high"
                    className="hero-portrait w-auto max-h-[380px] sm:max-h-[460px] lg:max-h-[500px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] filter group-hover:scale-[1.035] transition-transform duration-700 ease-out"
                    style={{
                      maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                    }}
                  />
                </picture>
              </div>

              {/* Floating Dynamic Status Badge — Free in Space */}
              <div className="relative -mt-6 sm:-mt-8 z-20 hero-status-wrap">
                <UnifiedStatusBadge />
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
      
      <div className="hero-bottom-note" aria-hidden="true"><span className="hero-bottom-line" /><Zap size={13} /> Designed to feel different</div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-slate-700 dark:text-slate-200 font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        </motion.div>
      </motion.div>
    </section>
  );
}
