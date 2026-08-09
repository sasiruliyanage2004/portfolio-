import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Code2, Server, Cloud, Wrench } from "lucide-react";

const GROUPS = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Code2,
    skills: [
      { name: "React / Next.js", level: 95, exp: "3 yrs exp" },
      { name: "TypeScript", level: 90, exp: "3 yrs exp" },
      { name: "Tailwind CSS", level: 95, exp: "3 yrs exp" },
      { name: "Framer Motion", level: 88, exp: "2 yrs exp" },
      { name: "Three.js / WebGL", level: 80, exp: "1 yr exp" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js / Express", level: 92, exp: "3 yrs exp" },
      { name: "Python / FastAPI", level: 85, exp: "2 yrs exp" },
      { name: "PostgreSQL / Prisma", level: 88, exp: "2 yrs exp" },
      { name: "MongoDB", level: 90, exp: "3 yrs exp" },
      { name: "REST & GraphQL APIs", level: 92, exp: "3 yrs exp" },
    ],
  },
  {
    id: "ai-cloud",
    label: "AI / Cloud",
    icon: Cloud,
    skills: [
      { name: "PyTorch & ML Basics", level: 82, exp: "2 yrs exp" },
      { name: "Firebase & Web3Forms", level: 90, exp: "2 yrs exp" },
      { name: "Docker / Containers", level: 85, exp: "2 yrs exp" },
      { name: "Vercel & Netlify CI/CD", level: 95, exp: "3 yrs exp" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    skills: [
      { name: "Git / GitHub CLI", level: 95, exp: "4 yrs exp" },
      { name: "VS Code / Antigravity IDE", level: 98, exp: "4 yrs exp" },
      { name: "Figma UI/UX", level: 88, exp: "3 yrs exp" },
      { name: "Postman API Studio", level: 92, exp: "3 yrs exp" },
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
    <section ref={sectionRef} id="skills" className="relative w-full bg-transparent overflow-hidden py-28 px-6 lg:px-10 scroll-mt-24">
      <motion.div style={{ scale, opacity, y }} className="mx-auto max-w-7xl relative">
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          {/* Subtle Radial Dimming Mask Overlay behind Section Heading for Crystal-Clear Readability */}
          <div className="pointer-events-none absolute -top-12 -left-12 w-[480px] h-[220px] rounded-full bg-radial from-[#05080f]/90 via-[#05080f]/60 to-transparent blur-2xl z-0" />

          <div className="relative z-10">
            <p className="font-mono text-xs tracking-[0.3em] text-cyan-400 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">TECHNICAL PROFICIENCY</p>
            <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              Skills <span className="text-gradient">Matrix</span>
            </h2>
          </div>

          {/* Sliding Domain Tab Switcher Indicator */}
          <div className="relative z-10 flex flex-wrap gap-1 rounded-full border border-white/10 bg-[#0e1422] p-1.5 backdrop-blur-md">
            {GROUPS.map((g) => {
              const Icon = g.icon;
              const isActive = activeGroup === g.label;
              return (
                <button
                  key={g.label}
                  onClick={() => setActiveGroup(g.label)}
                  className="relative flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-medium transition-colors cursor-pointer"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeDomainPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className={`relative z-10 h-3.5 w-3.5 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span className={`relative z-10 ${isActive ? "text-white font-semibold" : "text-slate-400 hover:text-white"}`}>
                    {g.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skill Pills with Animated Glowing Progress Bars */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 relative z-10"
          >
            {activeData.skills.map((skill) => (
              <div
                key={skill.name}
                className="noise-overlay relative flex flex-col justify-between rounded-2xl p-5 border border-white/15 dark:border-white/15 light-theme:border-slate-300/40 bg-[#0b0f17]/92 dark:bg-[#0b0f17]/92 light-theme:bg-[#F7F5F1]/95 backdrop-blur-xl hover:border-cyan-400/50 transition-colors shadow-lg z-10"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white text-base">{skill.name}</h3>
                    <span className="font-mono text-[10px] text-cyan-300 font-medium">{skill.level}%</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 block mb-4">{skill.exp}</span>
                </div>

                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
