import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { ArrowRight, FileText, Sparkles, Activity, CheckCircle2, GraduationCap, ChevronDown } from "lucide-react";

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
  const projects = useCountUp(10, inView);
  const commits = useCountUp(50, inView);
  const techs = useCountUp(12, inView);
  const years = useCountUp(2, inView);

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
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">{s.label}</span>
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

  const rx = useSpring(y, { stiffness: 200, damping: 20 });
  const ry = useSpring(x, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set((px - 0.5) * 14);
    y.set((0.5 - py) * 14);
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
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const LIVE_STATUSES = [
  { text: "Available for Hire", icon: CheckCircle2, color: "text-emerald-400 dark:text-emerald-400 light-theme:text-emerald-600", dot: "bg-emerald-500" },
  { text: "Coding: React 19 + Node", icon: Activity, color: "text-cyan-400 dark:text-cyan-400 light-theme:text-cyan-600", dot: "bg-cyan-500" },
  { text: "50+ Commits This Month", icon: Sparkles, color: "text-indigo-400 dark:text-indigo-400 light-theme:text-indigo-600", dot: "bg-indigo-500" },
];

function UnifiedStatusBadge() {
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % LIVE_STATUSES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const current = LIVE_STATUSES[statusIdx];
  const IconComponent = current.icon;

  return (
    <div className="absolute bottom-4 right-4 z-20 overflow-hidden rounded-full border border-white/20 dark:border-white/20 light-theme:border-slate-300 bg-[#090d16]/90 dark:bg-[#090d16]/90 light-theme:bg-white/95 px-4 py-2 backdrop-blur-md shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.text}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex items-center gap-2.5 font-mono text-xs font-bold whitespace-nowrap"
        >
          <span className="relative flex h-2 w-2">
            <span className={`pulse-dot absolute inline-flex h-full w-full rounded-full ${current.dot}`} />
            <span className={`relative inline-flex h-2 w-2 rounded-full ${current.dot}`} />
          </span>
          <IconComponent className={`h-3.5 w-3.5 ${current.color}`} />
          <span className={current.color}>{current.text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function HeroCyber() {
  const targetRef = useRef(null);

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
      className="relative min-h-screen w-full overflow-hidden bg-transparent pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-32 flex items-center justify-center"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column — Text & CTAs */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left"
          >
            {/* High-Contrast Crisp Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-[#090d16] dark:bg-[#090d16] light-theme:bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 font-mono text-[11px] sm:text-xs font-bold text-cyan-400 dark:text-cyan-300 light-theme:text-cyan-700 shadow-xl backdrop-blur-md max-w-full">
              <GraduationCap className="h-4 w-4 text-cyan-400 shrink-0" />
              <span className="truncate">SLIIT Undergraduate • Full-Stack Engineer</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl leading-[1.1] sm:leading-[1.08]">
              Building interfaces for the <span className="text-gradient">next web</span>
            </h1>

            {/* Bio Subtitle */}
            <p className="text-base text-slate-600 dark:text-slate-300 sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Full-stack engineer crafting fast, precise, and quietly futuristic products — fusing modern WebGL architecture with Sri Lankan cultural motifs.
            </p>

            {/* Magnetic Call To Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
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

              <MagneticButton
                href="/resume.pdf"
                download="Sasiru_Liyanage_CV.pdf"
                className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-3 sm:px-5 sm:py-3.5 font-mono text-xs font-medium text-slate-600 dark:text-slate-400 transition-all hover:border-cyan-400/50 hover:text-white cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5 text-cyan-400" />
                <span>Resume</span>
              </MagneticButton>
            </div>

            {/* Animated Count-Up Stats */}
            <div className="flex justify-center lg:justify-start">
              <StatsRow />
            </div>
          </motion.div>

          {/* Right Column — Portrait Image Card */}
          <motion.div
            style={{ scale: avatarScale, y: avatarY, opacity: avatarOpacity }}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 group relative flex justify-center [perspective:1000px] py-2 px-2 sm:px-4"
          >
            {/* Main 3D Card Container */}
            <TiltCard className="hero-portrait-card noise-overlay relative w-full max-w-[340px] sm:max-w-[420px] rounded-[1.75rem] sm:rounded-[2rem] p-3 sm:p-5 shadow-2xl transition-all duration-500">
              <span className="border-beam" aria-hidden="true" />

              {/* Profile Image Frame */}
              <div className="hero-portrait-frame relative h-[320px] sm:h-[440px] lg:h-[480px] w-full overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] shadow-inner">
                <img
                  src="/profile.png"
                  alt="Developer Portrait"
                  className="h-full w-full object-cover object-top filter grayscale contrast-110 brightness-115 group-hover:grayscale-0 group-hover:brightness-110 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16]/80 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-700" />
              </div>

              {/* Unified Single Dynamic Status Badge */}
              <UnifiedStatusBadge />
            </TiltCard>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs opacity-50 text-slate-900 dark:text-white">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 opacity-50 text-slate-900 dark:text-white" />
        </motion.div>
      </motion.div>
    </section>
  );
}
