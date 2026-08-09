import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Boxes,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers,
  Palette,
  Server,
  Terminal,
  Wand2,
} from "lucide-react";

const GROUPS = [
  {
    label: "Frontend",
    accent: "from-indigo-500 to-violet-500",
    skills: [
      { name: "React / Next.js", level: 95, years: 5, icon: Code2 },
      { name: "TypeScript", level: 90, years: 4, icon: Boxes },
      { name: "Tailwind CSS", level: 92, years: 4, icon: Palette },
      { name: "Framer Motion", level: 85, years: 3, icon: Wand2 },
    ],
  },
  {
    label: "Backend",
    accent: "from-cyan-500 to-indigo-500",
    skills: [
      { name: "Node.js", level: 88, years: 5, icon: Server },
      { name: "PostgreSQL", level: 82, years: 4, icon: Database },
      { name: "GraphQL", level: 78, years: 3, icon: Layers },
    ],
  },
  {
    label: "AI / Cloud",
    accent: "from-violet-500 to-cyan-500",
    skills: [
      { name: "AWS", level: 80, years: 3, icon: Cloud },
      { name: "LLM Integration", level: 84, years: 2, icon: Wand2 },
    ],
  },
  {
    label: "Tools",
    accent: "from-indigo-500 to-cyan-500",
    skills: [
      { name: "Git / CI-CD", level: 90, years: 5, icon: GitBranch },
      { name: "Docker", level: 76, years: 3, icon: Terminal },
    ],
  },
];

export default function SkillsCyber() {
  const [activeGroup, setActiveGroup] = useState("Frontend");
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.5, 1, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -40]);

  const activeData = GROUPS.find((g) => g.label === activeGroup) || GROUPS[0];

  return (
    <section ref={sectionRef} id="skills" className="relative w-full mesh-bg overflow-hidden py-28 px-6 lg:px-10 scroll-mt-24">
      <motion.div style={{ scale, opacity, y }} className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-[11px] tracking-widest text-cyan-400 uppercase">
              // Capabilities
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Skills Matrix
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {GROUPS.map((g) => (
              <button
                key={g.label}
                onClick={() => setActiveGroup(g.label)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  activeGroup === g.label
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                    : "glass-panel text-slate-400 hover:text-white"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activeData.skills.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-panel noise-overlay relative flex flex-col justify-between rounded-2xl p-6"
              >
                <span className="border-beam" aria-hidden="true" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-cyan-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">
                      {s.years} yrs exp
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white">{s.name}</h3>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1.5">
                    <span>Proficiency</span>
                    <span className="text-cyan-300 font-semibold">{s.level}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.level}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + idx * 0.08 }}
                      className={`h-full rounded-full bg-gradient-to-r ${activeData.accent}`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
