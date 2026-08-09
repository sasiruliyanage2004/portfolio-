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
    title: "AyurLife — Ayurvedic Health Platform",
    blurb: "Integrated Ayurvedic Herbal Medicine Platform combining smart diagnostic search, doctor appointments, and personalized herbal remedies tailored for traditional wellness.",
    category: "Web Apps",
    tech: ["React 19", "Node.js", "Express", "MongoDB", "Tailwind v4"],
    span: "lg:col-span-2 lg:row-span-2",
    featured: true,
    live: true,
    github: "https://github.com/sasiruliyanage2004",
    demo: "#",
  },
  {
    title: "Nimbus Analytics",
    blurb: "Real-time data platform processing 2M+ events/day with sub-100ms query latency.",
    category: "Web Apps",
    tech: ["React", "Node.js", "PostgreSQL", "Redis"],
    span: "lg:col-span-1 lg:row-span-1",
    featured: false,
    live: true,
    github: "https://github.com/sasiruliyanage2004",
    demo: "#",
  },
  {
    title: "Aria Copilot",
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
    title: "Vertex Design System",
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
    title: "Pulse CRM",
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

  const isFeatured = project.featured || project.span.includes("row-span-2");

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
        className="project-card-obsidian noise-overlay relative flex h-full min-h-[250px] flex-col justify-between overflow-hidden rounded-2xl p-7 group-hover:border-cyan-400 transition-all duration-300 shadow-2xl z-10"
      >
        {/* Animated Border Beam Spinning Accent */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-[-100%] animate-border-spin bg-[conic-gradient(from_0deg,transparent_0%,#6366F1_10%,#06B6D4_25%,transparent_40%)] opacity-40" />
        </div>

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

          {/* Featured Bento Hero UI Preview Frame (Only rendered on 2-row hero cards) */}
          {isFeatured && (
            <div className="my-6 rounded-xl border border-white/15 bg-black/50 p-4 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <Activity className="h-4 w-4 animate-pulse text-cyan-300" />
                  <span>Ayurvedic Herbal Portal UI Engine</span>
                </div>
                <span className="text-slate-500 text-[10px]">v2.4.0 • ONLINE</span>
              </div>

              <div className="grid grid-cols-3 gap-3 my-3 text-center">
                <div className="rounded-lg bg-white/5 p-2.5 border border-white/10">
                  <div className="text-cyan-300 font-bold text-sm">50+</div>
                  <div className="text-slate-400 text-[10px] mt-0.5">Herbal Remedies</div>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5 border border-white/10">
                  <div className="text-emerald-400 font-bold text-sm">&lt;80ms</div>
                  <div className="text-slate-400 text-[10px] mt-0.5">Query Latency</div>
                </div>
                <div className="rounded-lg bg-white/5 p-2.5 border border-white/10">
                  <div className="text-indigo-400 font-bold text-sm">24/7</div>
                  <div className="text-slate-400 text-[10px] mt-0.5">Doc Booking</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5">
                <span className="flex items-center gap-1">
                  <Database className="h-3 w-3 text-indigo-400" /> MongoDB Atlas Sync
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="h-3 w-3" /> HIPAA Compliant
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Block (Anchored to bottom) */}
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

          <div className="flex items-center gap-5">
            <a
              href={project.demo}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-300 hover:text-white transition-colors"
            >
              Demo <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-slate-300 hover:text-cyan-300 transition-colors"
            >
              <GithubIcon className="h-4 w-4" /> Code
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

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.5, 1, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -40]);

  const list = useMemo(() => {
    if (cat === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === cat);
  }, [cat]);

  return (
    <section id="projects" className="relative overflow-hidden bg-transparent px-6 py-28 lg:px-10 scroll-mt-24">
      <motion.div style={{ scale, opacity, y }} className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-cyan-400 font-semibold">SELECTED WORK</p>
            <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl">
              Projects &amp; <span className="text-gradient">Builds</span>
            </h2>
          </div>

          {/* Sliding Category Tab Switcher Indicator */}
          <div className="relative flex flex-wrap gap-1 rounded-full border border-white/15 bg-[#0e1422] p-1.5 backdrop-blur-md">
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
                <span className={`relative z-10 ${cat === c ? "text-white font-semibold" : "text-slate-400 hover:text-white"}`}>
                  {c}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((project) => (
              <Card3D key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
