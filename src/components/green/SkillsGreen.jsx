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
    accent: "from-emerald-400 to-teal-400",
    skills: [
      { name: "React / Next.js", level: 95, years: 5, icon: Code2 },
      { name: "TypeScript", level: 90, years: 4, icon: Boxes },
      { name: "Tailwind CSS", level: 92, years: 4, icon: Palette },
      { name: "Framer Motion", level: 85, years: 3, icon: Wand2 },
    ],
  },
  {
    label: "Backend",
    accent: "from-teal-400 to-emerald-500",
    skills: [
      { name: "Node.js", level: 88, years: 5, icon: Server },
      { name: "PostgreSQL", level: 82, years: 4, icon: Database },
      { name: "GraphQL", level: 78, years: 3, icon: Layers },
    ],
  },
  {
    label: "AI / Cloud",
    accent: "from-emerald-500 to-green-400",
    skills: [
      { name: "AWS", level: 80, years: 3, icon: Cloud },
      { name: "LLM Integration", level: 84, years: 2, icon: Wand2 },
    ],
  },
  {
    label: "Tools",
    accent: "from-green-400 to-emerald-400",
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
      className="glass-panel noise-overlay group relative overflow-hidden rounded-xl p-5 border border-emerald-500/20 bg-[#06140e]/80"
    >
      <span className="border-beam opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded-lg border border-emerald-400/30 bg-emerald-950/60 p-2">
            <Icon className="h-4 w-4 text-emerald-400" />
          </span>
          <span className="text-sm font-medium text-emerald-100">{skill.name}</span>
        </div>
        <span className="font-mono text-[11px] text-emerald-400/80">{skill.level}%</span>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-emerald-950/80 border border-emerald-500/20">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 shadow-[0_0_12px_rgba(16,185,129,0.7)]"
        />
      </div>

      <motion.p
        initial={false}
        animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden font-mono text-[11px] text-emerald-300/70"
      >
        <span className="mt-3 block">{skill.years}+ years hands-on experience</span>
      </motion.p>
    </motion.div>
  );
}

export default function SkillsGreen() {
  return (
    <section id="skills" className="relative bg-[#040d08] px-6 py-28 lg:px-10 border-t border-emerald-500/15">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="font-mono text-xs tracking-[0.3em] text-emerald-400">CAPABILITIES</p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            Skills <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Matrix</span>
          </h2>
        </div>

        <div className="space-y-14">
          {GROUPS.map((group) => (
            <div key={group.label}>
              <div className="mb-5 flex items-center gap-3">
                <span className={`h-1.5 w-8 rounded-full bg-gradient-to-r ${group.accent}`} />
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400/80">
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
