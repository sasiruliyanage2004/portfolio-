import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Radio, ExternalLink, Activity, Database, ShieldCheck } from "lucide-react";

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
    span: "lg:col-span-2 lg:row-span-2",
    featured: true,
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
    blurb: "Real-time data platform processing 2M+ events/day with sub-100ms query latency.",
    category: "Web Apps",
    tech: ["React", "Node.js", "PostgreSQL", "Redis"],
    span: "lg:col-span-1 lg:row-span-1",
    featured: false,
    live: true,
    github: "https://github.com/sasiruliyanage2004",
    demo: "#",
    metrics: [
      { label: "Events/Day", val: "2M+" },
      { label: "Query Latency", val: "<100ms" },
      { label: "Uptime", val: "99.9%" },
    ],
    status: "v1.8.2 • STREAMING",
  },
  {
    id: "aria",
    title: "Aria AI Writing Copilot",
    blurb: "LLM-powered writing assistant with contextual tone matching.",
    category: "AI Solutions",
    tech: ["Python", "PyTorch", "FastAPI"],
    span: "lg:col-span-1 lg:row-span-1",
    featured: false,
    live: true,
    github: "https://github.com/sasiruliyanage2004",
    demo: "#",
  },
  {
    id: "vertex",
    title: "Vertex Token Design System",
    blurb: "Token-driven component library adopted across 6 product teams.",
    category: "UI/UX",
    tech: ["Figma", "Storybook", "Tailwind"],
    span: "lg:col-span-2 lg:row-span-1",
    featured: false,
    live: true,
    github: "https://github.com/sasiruliyanage2004",
    demo: "#",
  },
  {
    id: "pulse",
    title: "Pulse AI Predictive CRM",
    blurb: "Sales pipeline tool with predictive lead scoring.",
    category: "AI Solutions",
    tech: ["Next.js", "TensorFlow.js"],
    span: "lg:col-span-1 lg:row-span-1",
    featured: false,
    live: true,
    github: "https://github.com/sasiruliyanage2004",
    demo: "#",
  },
];

function Card3D({ project }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });

  const isFeatured = project.featured || (project.span && project.span.includes("row-span-2"));

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 12);
    rx.set((0.5 - py) * 12);
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className={`group relative [perspective:1000px] ${project.span}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
        className="project-card-obsidian noise-overlay relative flex h-full min-h-[250px] flex-col justify-between overflow-hidden rounded-3xl p-7 sm:p-8 group-hover:border-cyan-400 transition-all duration-300 shadow-2xl z-10"
      >
        {/* Top Header Block */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl font-bold transition-colors">
              {project.title}
            </h3>
            {project.live && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-3 py-1 font-mono text-xs font-semibold text-emerald-300 shrink-0">
                <Radio className="h-3 w-3" />
                LIVE
              </span>
            )}
          </div>

          <p className="mt-4 text-base leading-relaxed font-normal">
            {project.blurb}
          </p>

          {/* Featured Bento Hero UI Preview Frame */}
          {isFeatured && (
            <div className="bento-ui-preview-frame my-6 rounded-2xl p-5 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <Activity className="h-4 w-4 animate-pulse text-cyan-300" />
                  <span>Ayurvedic Herbal Portal UI Engine</span>
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
          )}

          {/* Mini Metrics Preview for Nimbus Analytics Card */}
          {!isFeatured && project.metrics && (
            <div className="bento-ui-preview-frame my-4 rounded-2xl p-3.5 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-[11px]">
                  <Activity className="h-3.5 w-3.5 animate-pulse text-cyan-300" />
                  <span>Nimbus Stream Engine</span>
                </div>
                <span className="text-[10px] opacity-70">{project.status}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 my-2 text-center">
                {project.metrics.map((m, i) => (
                  <div key={i} className="rounded-xl bg-white/5 p-2 border border-white/10">
                    <div className="text-cyan-400 font-bold text-xs sm:text-sm">{m.val}</div>
                    <div className="text-[9px] opacity-70 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Block (Anchored cleanly to bottom) */}
        <div className="mt-auto pt-4">
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Awwwards Signature Scroll Zoom-In & Zoom-Out Parallax Effect
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.88, 1, 1, 0.88]);
  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [60, 0, 0, -60]);

  const list = useMemo(() => {
    if (cat === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === cat);
  }, [cat]);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden bg-transparent px-6 py-28 lg:px-10 scroll-mt-24">
      <motion.div style={{ scale, y }} className="mx-auto max-w-7xl relative">
        {/* Clean Section Header (Smudge-free in Light Mode) */}
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="relative z-10">
            <p className="font-mono text-xs tracking-[0.3em] text-cyan-400 font-extrabold uppercase dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              SELECTED WORK
            </p>
            <h2 className="mt-2 text-5xl font-extrabold text-slate-900 dark:text-white sm:text-6xl dark:drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Projects &amp; <span className="text-gradient">Builds</span>
            </h2>
          </div>

          {/* Theme-Aware Sliding Category Tab Switcher Indicator */}
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

        {/* Bento Grid Layout */}
        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 relative z-10">
          <AnimatePresence mode="popLayout">
            {list.map((project) => (
              <Card3D key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
