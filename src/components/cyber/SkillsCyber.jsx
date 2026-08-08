import { useState } from "react";
import { motion } from "framer-motion";
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

function SkillCard({ skill }) {
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="glass-panel noise-overlay group relative overflow-hidden rounded-xl p-5"
    >
      <span className="border-beam opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
            <Icon className="h-4 w-4 text-cyan-300" />
          </span>
          <span className="text-sm font-medium text-slate-200">{skill.name}</span>
        </div>
        <span className="font-mono text-[11px] text-slate-500">{skill.level}%</span>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
        />
      </div>

      <motion.p
        initial={false}
        animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden font-mono text-[11px] text-slate-500"
      >
        <span className="mt-3 block">{skill.years}+ years hands-on experience</span>
      </motion.p>
    </motion.div>
  );
}

export default function SkillsCyber() {
  return (
    <section id="skills" className="relative bg-[#0b0f17] px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400/80">CAPABILITIES</p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            Skills <span className="text-gradient">Matrix</span>
          </h2>
        </div>

        <div className="space-y-14">
          {GROUPS.map((group) => (
            <div key={group.label}>
              <div className="mb-5 flex items-center gap-3">
                <span className={`h-1.5 w-8 rounded-full bg-gradient-to-r ${group.accent}`} />
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                  {group.label}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {group.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
