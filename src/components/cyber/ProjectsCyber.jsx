import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Radio, ExternalLink, Activity, Database, ShieldCheck, Cpu, Layers, Sparkles } from "lucide-react";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const CATEGORIES = ["All", "Web Apps", "AI Solutions", "UI/UX"];

const PROJECTS = [
  {
    id: "ayurlife",
    title: "AyurLife — Ayurvedic Health Platform",
    blurb: "Integrated Ayurvedic Herbal Medicine Platform combining smart diagnostic search, doctor appointments, and personalized herbal remedies tailored for traditional wellness.",
    category: "Web Apps",
    tech: ["React 19", "Node.js", "Express", "MongoDB", "Tailwind v4"],
    live: true,
    github: "https://github.com/sasiruliyanage2004",
    demo: "#",
    metrics: [
      { label: "Herbal Remedies", val: "50+" },
      { label: "Query Latency", val: "<80ms" },
      { label: "Doc Booking", val: "24/7" },
    ],
    status: "v2.4.0 • ONLINE",
    sync: "MongoDB Atlas Sync",
    badge: "HIPAA Compliant",
  },
  {
    id: "nimbus",
    title: "Nimbus Analytics Engine",
    blurb: "High-throughput real-time streaming analytics engine processing 2M+ telemetry events/day with automated anomaly detection alerts.",
    category: "Web Apps",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "WebSockets"],
    live: true,
    github: "https://github.com/sasiruliyanage2004",
    demo: "#",
    metrics: [
      { label: "Events / Day", val: "2M+" },
      { label: "P99 Latency", val: "42ms" },
      { label: "Uptime SLA", val: "99.99%" },
    ],
    status: "v1.8.2 • STREAMING",
    sync: "TimescaleDB Pipeline",
    badge: "Sub-100ms Ingestion",
  },
  {
    id: "aria",
    title: "Aria AI Writing Copilot",
    blurb: "Context-aware LLM writing assistant with real-time tone adaptation, semantic document search, and instant automated summarization.",
    category: "AI Solutions",
    tech: ["Python", "PyTorch", "FastAPI", "React", "Tailwind"],
    live: true,
    github: "https://github.com/sasiruliyanage2004",
    demo: "#",
    metrics: [
      { label: "Model Parameters", val: "7B" },
      { label: "Tokens / Sec", val: "120" },
      { label: "Accuracy Score", val: "98.4%" },
    ],
    status: "v3.1.0 • INFERENCING",
    sync: "Pinecone Vector Index",
    badge: "Zero Data Logging",
  },
  {
    id: "vertex",
    title: "Vertex Token Design System",
    blurb: "Multi-brand, token-driven component architecture adopted across 6 cross-functional engineering teams for unified UI consistency.",
    category: "UI/UX",
    tech: ["Figma", "Storybook", "Tailwind CSS", "React"],
    live: true,
    github: "https://github.com/sasiruliyanage2004",
    demo: "#",
    metrics: [
      { label: "UI Tokens", val: "450+" },
      { label: "Product Teams", val: "6" },
      { label: "A11y Score", val: "100/100" },
    ],
    status: "v4.0.0 • PRODUCTION",
    sync: "Figma Tokens API",
    badge: "WCAG AAA Compliant",
  },
  {
    id: "pulse",
    title: "Pulse AI Predictive CRM",
    blurb: "Sales pipeline automation suite leveraging TensorFlow.js client-side inference for real-time lead conversion scoring.",
    category: "AI Solutions",
    tech: ["Next.js", "TensorFlow.js", "Prisma", "Tailwind"],
    live: true,
    github: "https://github.com/sasiruliyanage2004",
    demo: "#",
    metrics: [
      { label: "Lead Scoring Acc", val: "94%" },
      { label: "Client Model Size", val: "4.2MB" },
      { label: "Active Deals", val: "12k+" },
    ],
    status: "v2.0.1 • ACTIVE",
    sync: "Edge Workers Sync",
    badge: "Client-Side ML Engine",
  },
];

function LandscapeCard3D({ project }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group relative [perspective:1000px] w-[580px] sm:w-[680px] lg:w-[720px] shrink-0"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
        className="project-card-obsidian noise-overlay relative flex h-full min-h-[460px] flex-col justify-between overflow-hidden rounded-3xl p-7 sm:p-8 group-hover:border-cyan-400 transition-all duration-300 shadow-2xl z-10"
      >
        {/* Card Header */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold transition-colors">
              {project.title}
            </h3>
            {project.live && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-3 py-1 font-mono text-xs font-semibold text-emerald-300 shrink-0">
                <Radio className="h-3 w-3" />
                LIVE
              </span>
            )}
          </div>

          <p className="mt-4 text-base sm:text-lg leading-relaxed font-normal">
            {project.blurb}
          </p>

          {/* Interactive Widescreen UI Engine Preview Mockup */}
          <div className="bento-ui-preview-frame my-6 rounded-2xl p-5 font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <Activity className="h-4 w-4 animate-pulse text-cyan-300" />
                <span>{project.title.split("—")[0]} Architecture Engine</span>
              </div>
              <span className="text-[10px] opacity-70">{project.status}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 my-4 text-center">
              {project.metrics.map((m, i) => (
                <div key={i} className="rounded-xl bg-white/5 p-3 border border-white/10">
                  <div className="text-cyan-400 font-bold text-base sm:text-lg">{m.val}</div>
                  <div className="text-[10px] sm:text-xs opacity-70 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] opacity-80 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-indigo-400" /> {project.sync}
              </span>
              <span className="flex items-center gap-1.5 text-emerald-500">
                <ShieldCheck className="h-3.5 w-3.5" /> {project.badge}
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer Anchored to Bottom */}
        <div className="mt-auto pt-2">
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="tech-badge rounded-lg px-3 py-1 font-mono text-xs font-semibold"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a
              href={project.demo}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-400 hover:text-indigo-500 transition-colors"
            >
              Demo Preview <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold opacity-80 hover:text-cyan-400 transition-colors"
            >
              <GithubIcon className="h-4 w-4" /> Source Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsCyber() {
  const [cat, setCat] = useState("All");
  const sectionRef = useRef(null);

  // Framer Motion Scroll-Driven Horizontal Track Transformation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Transform 0 -> 1 vertical scroll progress to 0% -> -72% horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  const list = useMemo(() => {
    if (cat === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === cat);
  }, [cat]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative h-[280vh] bg-transparent scroll-mt-24"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden py-8 px-6 lg:px-12">
        {/* Theme-Aware Section Header Bar */}
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-6 shrink-0 max-w-7xl mx-auto w-full">
          {/* Theme-Aware Absorber Aura directly behind text */}
          <div className="heading-absorber-aura pointer-events-none absolute -top-10 -left-10 w-[550px] h-[180px] rounded-full blur-2xl z-0" />

          <div className="relative z-10">
            <p className="font-mono text-xs tracking-[0.3em] text-cyan-400 font-extrabold drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] uppercase flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              HORIZONTAL LANDSCAPE SHOWCASE
            </p>
            <h2 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
              Projects &amp; <span className="text-gradient">Builds</span>
            </h2>
          </div>

          {/* Theme-Aware Category Filter Tabs */}
          <div className="theme-switcher-bar relative z-10 flex flex-wrap gap-1 rounded-full p-1.5 backdrop-blur-md shadow-lg border">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="relative rounded-full px-4 py-1.5 font-mono text-xs font-medium transition-colors cursor-pointer"
              >
                {cat === c && (
                  <motion.span
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${cat === c ? "text-white font-semibold" : "opacity-70 hover:opacity-100"}`}>
                  {c}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Motion Track Container */}
        <div className="relative w-full max-w-7xl mx-auto flex items-center overflow-hidden py-4">
          <motion.div
            style={{ x }}
            className="flex gap-7 sm:gap-8 items-stretch min-w-max"
          >
            <AnimatePresence mode="popLayout">
              {list.map((project) => (
                <LandscapeCard3D key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Scroll Progress Bar & Horizontal Navigation Indicator */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="caret inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-300">SCROLL DOWN TO EXPLORE LANDSCAPE TRACK</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-cyan-400 font-bold">{list.length} FEATURED BUILDS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
