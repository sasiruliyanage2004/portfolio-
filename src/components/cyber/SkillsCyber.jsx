import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Code2, Server, Cloud, Wrench } from "lucide-react";

const GROUPS = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Code2,
    skills: [
      { name: "React 19 / Modern Web", level: 95, exp: "Specialized" },
      { name: "JavaScript (ES6+) & TypeScript", level: 92, exp: "Core Tech" },
      { name: "Tailwind CSS v4 & Responsive UI", level: 95, exp: "Advanced" },
      { name: "React Native (Mobile Apps)", level: 86, exp: "AyurLife App" },
      { name: "HTML5 / Canvas & Motion", level: 90, exp: "Dumbara Matrix" },
    ],
  },
  {
    id: "backend",
    label: "Backend & Core",
    icon: Server,
    skills: [
      { name: "Node.js / Express.js", level: 92, exp: "Full-Stack" },
      { name: "Java (OOP & System Design)", level: 88, exp: "SLIIT Module" },
      { name: "Python / FastAPI", level: 88, exp: "YOLOv11 Backend" },
      { name: "C Programming & DSA", level: 85, exp: "Academic Core" },
      { name: "REST APIs & Architecture", level: 90, exp: "Production" },
    ],
  },
  {
    id: "ai-db",
    label: "AI, Vision & DB",
    icon: Cloud,
    skills: [
      { name: "Computer Vision & YOLOv11", level: 90, exp: "AI Security" },
      { name: "face-api.js Biometrics", level: 88, exp: "Biometric Auth" },
      { name: "MongoDB / Atlas", level: 92, exp: "NoSQL DB" },
      { name: "MySQL & Relational DBMS", level: 88, exp: "SLIIT Core" },
    ],
  },
  {
    id: "tools",
    label: "Professional & Tools",
    icon: Wrench,
    skills: [
      { name: "Git / GitHub Version Control", level: 95, exp: "Advanced" },
      { name: "Admin & Knowledge Base Mgmt", level: 90, exp: "AyurLife Admin" },
      { name: "Team Communication & Leadership", level: 92, exp: "Professional" },
      { name: "Time Management & Multitasking", level: 94, exp: "Experienced" },
    ],
  },
];

export default function SkillsCyber() {
  const [activeGroup, setActiveGroup] = useState("Frontend");
  const sectionRef = useRef(null);

  const activeData = GROUPS.find((g) => g.label === activeGroup) || GROUPS[0];

  return (
    <section ref={sectionRef} id="skills" className="relative w-full bg-transparent overflow-hidden py-20 sm:py-28 px-4 sm:px-6 lg:px-10 scroll-mt-20">
      <div className="mx-auto max-w-7xl relative">
        {/* Clean Section Header (Smudge-free in Light Mode) */}
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between mb-8 sm:mb-12 gap-5 sm:gap-6 text-center md:text-left">
          <div className="relative z-10">
            <p className="font-mono text-xs tracking-[0.3em] text-cyan-400 font-extrabold uppercase dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              TECHNICAL PROFICIENCY
            </p>
            <h2 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-6xl dark:drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Skills <span className="text-gradient">Matrix</span>
            </h2>
          </div>

          {/* Theme-Aware Sliding Domain Tab Switcher Indicator */}
          <div className="theme-switcher-bar relative z-10 flex flex-wrap justify-center gap-1 rounded-full p-1.5 backdrop-blur-md shadow-lg border self-center md:self-auto max-w-full" role="tablist" aria-label="Skill Categories">
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
                  className="relative flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs font-medium transition-colors cursor-pointer"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeDomainPill"
                      style={{ background: "linear-gradient(135deg, var(--grad-start), var(--grad-mid))" }}
                      className="absolute inset-0 rounded-full shadow-md"
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
      </div>
    </section>
  );
}
