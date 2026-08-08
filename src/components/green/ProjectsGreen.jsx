import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Radio } from "lucide-react";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const CATEGORIES = ["All", "Web Apps", "AI Solutions", "UI/UX"];

const PROJECTS = [
  {
    title: "Nimbus Analytics",
    blurb: "Real-time data platform processing 2M+ events/day with sub-100ms query latency.",
    category: "Web Apps",
    tech: ["React", "Node.js", "PostgreSQL", "Redis"],
    span: "lg:col-span-2 lg:row-span-2",
    live: true,
    github: "#",
    demo: "#",
  },
  {
    title: "Aria Copilot",
    blurb: "LLM-powered writing assistant with contextual tone matching.",
    category: "AI Solutions",
    tech: ["Python", "PyTorch", "FastAPI"],
    span: "lg:col-span-1 lg:row-span-1",
    live: true,
    github: "#",
    demo: "#",
  },
  {
    title: "Fieldnote",
    blurb: "Offline-first note capture for research teams in the field.",
    category: "Web Apps",
    tech: ["React Native", "SQLite"],
    span: "lg:col-span-1 lg:row-span-1",
    live: false,
    github: "#",
    demo: "#",
  },
  {
    title: "Vertex Design System",
    blurb: "Token-driven component library adopted across 6 product teams.",
    category: "UI/UX",
    tech: ["Figma", "Storybook", "Tailwind"],
    span: "lg:col-span-2 lg:row-span-1",
    live: true,
    github: "#",
    demo: "#",
  },
  {
    title: "Pulse CRM",
    blurb: "Sales pipeline tool with predictive lead scoring.",
    category: "AI Solutions",
    tech: ["Next.js", "TensorFlow.js"],
    span: "lg:col-span-1 lg:row-span-1",
    live: false,
    github: "#",
    demo: "#",
  },
];

function ProjectCard({ project }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
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
        className="glass-panel noise-overlay relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl p-6 border border-emerald-500/20 bg-[#06140e]/80"
      >
        <span className="border-beam opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          {project.live && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] tracking-wide text-emerald-300">
              <Radio className="h-2.5 w-2.5 text-emerald-400" />
              LIVE
            </span>
          )}
        </div>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-emerald-100/70">
          {project.blurb}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-emerald-400/20 bg-emerald-950/40 px-2.5 py-1 font-mono text-[10px] text-emerald-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 border-t border-emerald-500/15 pt-4">
          <a
            href={project.github}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300/70 transition-colors hover:text-white"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            Code
          </a>
          <a
            href={project.demo}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 transition-colors hover:text-emerald-200"
          >
            Live Demo
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsGreen() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="projects" className="relative bg-[#040d08] px-6 py-28 lg:px-10 border-t border-emerald-500/15">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-emerald-400">SELECTED WORK</p>
            <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
              Projects & <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Builds</span>
            </h2>
          </div>

          <div className="glass-panel inline-flex w-fit gap-1 rounded-full p-1 border border-emerald-500/20 bg-[#06140e]/90">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative rounded-full px-4 py-2 font-mono text-xs transition-colors ${
                  active === cat ? "text-slate-950 font-semibold" : "text-emerald-400/70 hover:text-emerald-200"
                }`}
              >
                {active === cat && (
                  <motion.span
                    layoutId="filter-pill-green"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
                <span className="relative">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
