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

  // Awwwards Signature Scroll Zoom-In & Zoom-Out Parallax Effect
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.88, 1, 1, 0.88]);
  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [60, 0, 0, -60]);

  const activeData = GROUPS.find((g) => g.label === activeGroup) || GROUPS[0];

  return (
    <section ref={sectionRef} id="skills" className="relative w-full bg-transparent overflow-hidden py-28 px-6 lg:px-10 scroll-mt-24">
      <motion.div style={{ scale, y }} className="mx-auto max-w-7xl relative">
        {/* Clean Section Header (Smudge-free in Light Mode) */}
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="relative z-10">
            <p className="font-mono text-xs tracking-[0.3em] text-cyan-400 font-extrabold uppercase dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              TECHNICAL PROFICIENCY
            </p>
            <h2 className="mt-2 text-5xl font-extrabold text-slate-900 dark:text-white sm:text-6xl dark:drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Skills <span className="text-gradient">Matrix</span>
            </h2>
          </div>

          {/* Theme-Aware Sliding Domain Tab Switcher Indicator */}
          <div className="theme-switcher-bar relative z-10 flex flex-wrap gap-1 rounded-full p-1.5 backdrop-blur-md shadow-lg border" role="tablist" aria-label="Skill Categories">
            {GROUPS.map((g) => {
              const Icon = g.icon;
              const isActive = activeGroup === g.label;
              return (
                <button
                  key={g.label}
                  onClick={() => setActiveGroup(g.label)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveGroup(g.label);
                    }
                  }}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${g.id}`}
                  id={`tab-${g.id}`}
                  className="relative flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-medium transition-colors cursor-pointer"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeDomainPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className={`relative z-10 h-3.5 w-3.5 ${isActive ? "text-white" : "opacity-70"}`} />
                  <span className={`relative z-10 ${isActive ? "text-white font-semibold" : "opacity-70 hover:opacity-100"}`}>
                    {g.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skill Pills with Animated Glowing Progress Bars (Theme-Aware) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            id={`panel-${activeData.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeData.id}`}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 relative z-10"
          >
            {activeData.skills.map((skill) => (
              <div
                key={skill.name}
                className="skill-card-bg noise-overlay relative flex flex-col justify-between rounded-2xl p-5 backdrop-blur-xl hover:border-cyan-400/50 transition-colors shadow-lg z-10"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-base">{skill.name}</h3>
                    <span className="font-mono text-[10px] text-cyan-500 font-bold">{skill.level}%</span>
                  </div>
                  <span className="font-mono text-[10px] opacity-70 block mb-4">{skill.exp}</span>
                </div>

                <div className="h-1.5 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ background: "linear-gradient(90deg, var(--grad-start), var(--grad-mid), var(--grad-end))" }}
                    className="h-full rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"
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
