import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Server, Cloud, Wrench, Sparkles, CheckCircle2 } from "lucide-react";
import { TechIcons, TECH_RIBBON } from "../TechIcons";

const GROUPS = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Code2,
    skills: [
      {
        name: "React 19 & Web Architecture",
        logo: TechIcons.react,
        brandColor: "#61DAFB",
        brandGlow: "rgba(97,218,251,0.25)",
        badge: "Production Core",
        badgeType: "cyan",
        scope: ["Server Components", "State Pipelines", "Concurrent Rendering", "Custom Hooks"],
        proof: "AyurLife & GitBrain",
      },
      {
        name: "JavaScript (ES6+) & TypeScript",
        logo: TechIcons.typescript,
        brandColor: "#3178C6",
        brandGlow: "rgba(49,120,198,0.25)",
        badge: "Daily Driver",
        badgeType: "cyan",
        scope: ["Static Typing", "Async/Await Event Loop", "DOM Engine", "Modular SDKs"],
        proof: "WorkforceOS & GitBrain",
      },
      {
        name: "Tailwind CSS v4 & Motion UI",
        logo: TechIcons.tailwind,
        brandColor: "#06B6D4",
        brandGlow: "rgba(6,182,212,0.25)",
        badge: "Design Architecture",
        badgeType: "cyan",
        scope: ["Design Tokens", "Framer Motion", "Micro-interactions", "Responsive Grid"],
        proof: "Portfolio & AyurLife",
      },
      {
        name: "React Native (Mobile Apps)",
        logo: TechIcons.reactNative,
        brandColor: "#61DAFB",
        brandGlow: "rgba(97,218,251,0.25)",
        badge: "Mobile Ecosystem",
        badgeType: "emerald",
        scope: ["Native Bridge", "Mobile Navigation", "Offline Cache", "Touch Gestures"],
        proof: "AyurLife Companion App",
      },
      {
        name: "HTML5 Canvas & Generative Math",
        logo: TechIcons.html5,
        brandColor: "#E34F26",
        brandGlow: "rgba(227,79,38,0.25)",
        badge: "Cultural Tech",
        badgeType: "teal",
        scope: ["2D Canvas API", "60fps Render Loops", "Sine Wave Kinematics", "Dumbara Matrix"],
        proof: "Cultural Pattern Engine",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend & Core",
    icon: Server,
    skills: [
      {
        name: "Node.js & Express.js",
        logo: TechIcons.node,
        brandColor: "#5FA04E",
        brandGlow: "rgba(95,160,78,0.25)",
        badge: "Full-Stack API",
        badgeType: "emerald",
        scope: ["RESTful Gateways", "JWT Auth", "Middleware Chains", "Asynchronous IO"],
        proof: "AyurLife & Biometrics",
      },
      {
        name: "Java (OOP & System Design)",
        logo: TechIcons.java,
        brandColor: "#ED8B00",
        brandGlow: "rgba(237,139,0,0.25)",
        badge: "Academic & Core",
        badgeType: "cyan",
        scope: ["Object-Oriented Design", "Design Patterns", "Multithreading", "Data Structures"],
        proof: "SLIIT Curriculum & Labs",
      },
      {
        name: "Python & FastAPI",
        logo: TechIcons.python,
        brandColor: "#3776AB",
        brandGlow: "rgba(55,118,171,0.25)",
        badge: "High-Throughput",
        badgeType: "emerald",
        scope: ["Async WebSocket Hubs", "Pydantic Schemas", "OpenCV Pipelines", "AI Integration"],
        proof: "YOLOv11 Security Core",
      },
      {
        name: "C Programming & Algorithms",
        logo: TechIcons.c,
        brandColor: "#00599C",
        brandGlow: "rgba(0,89,156,0.25)",
        badge: "Systems Foundation",
        badgeType: "teal",
        scope: ["Memory Pointers", "DSA Implementations", "Low-Level Logic", "Complexity Analysis"],
        proof: "SLIIT Academic Core",
      },
      {
        name: "REST Architecture & Micro-APIs",
        logo: TechIcons.postman,
        brandColor: "#FF6C37",
        brandGlow: "rgba(255,108,55,0.25)",
        badge: "Integration",
        badgeType: "cyan",
        scope: ["API Versioning", "Rate Limiting", "JSON Payloads", "Postman Testing"],
        proof: "Multi Talent Tech",
      },
    ],
  },
  {
    id: "ai-db",
    label: "AI, Vision & DB",
    icon: Cloud,
    skills: [
      {
        name: "Computer Vision & YOLOv11",
        logo: TechIcons.yolo,
        brandColor: "#06B6D4",
        brandGlow: "rgba(6,182,212,0.25)",
        badge: "AI Specialty",
        badgeType: "emerald",
        scope: ["Weapon Detection", "Tensor Inference", "PTZ RTSP Streams", "<30ms Latency"],
        proof: "Suspicious Activity Detection",
      },
      {
        name: "face-api.js Neural Biometrics",
        logo: TechIcons.faceApi,
        brandColor: "#10B981",
        brandGlow: "rgba(16,185,129,0.25)",
        badge: "Deep Learning",
        badgeType: "cyan",
        scope: ["Facial Embeddings", "SSD MobileNet V1", "Landmark Tracking", "Vector Match"],
        proof: "Biometrics Platform",
      },
      {
        name: "MongoDB Atlas & NoSQL",
        logo: TechIcons.mongodb,
        brandColor: "#47A248",
        brandGlow: "rgba(71,162,72,0.25)",
        badge: "Document DB",
        badgeType: "emerald",
        scope: ["Document Schemas", "Aggregation Pipelines", "Indexing", "Mongoose ODM"],
        proof: "AyurLife & WorkforceOS",
      },
      {
        name: "MySQL & Relational DBMS",
        logo: TechIcons.mysql,
        brandColor: "#00758F",
        brandGlow: "rgba(0,117,143,0.25)",
        badge: "Relational DB",
        badgeType: "teal",
        scope: ["Normalization (3NF)", "Complex Joins", "ACID Transactions", "Query Tuning"],
        proof: "SLIIT Database Systems",
      },
    ],
  },
  {
    id: "tools",
    label: "Professional & Tools",
    icon: Wrench,
    skills: [
      {
        name: "Git, GitHub & Versioning",
        logo: TechIcons.git,
        brandColor: "#F05032",
        brandGlow: "rgba(240,80,50,0.25)",
        badge: "Collaboration",
        badgeType: "cyan",
        scope: ["Branching Workflows", "Pull Request Reviews", "Git Actions CI", "Semantic Merges"],
        proof: "Active GitHub Repos",
      },
      {
        name: "Docker & Containerization",
        logo: TechIcons.docker,
        brandColor: "#2496ED",
        brandGlow: "rgba(36,150,237,0.25)",
        badge: "DevOps & Cloud",
        badgeType: "cyan",
        scope: ["Dockerfile Configurations", "Container Isolation", "Microservices", "Port Mapping"],
        proof: "DevOps Toolchain",
      },
      {
        name: "Enterprise Admin & Data Audit",
        logo: TechIcons.express,
        brandColor: "#FFFFFF",
        brandGlow: "rgba(255,255,255,0.2)",
        badge: "Management",
        badgeType: "emerald",
        scope: ["Knowledge Bases", "Financial Reconciliation", "Digital Spreadsheets", "Access Control"],
        proof: "Liberty Motors & AyurLife",
      },
      {
        name: "Agile & Team Engineering",
        logo: TechIcons.postman,
        brandColor: "#FF6C37",
        brandGlow: "rgba(255,108,55,0.25)",
        badge: "Methodology",
        badgeType: "teal",
        scope: ["Sprint Planning", "Cross-functional Delivery", "Code Quality Standards", "Standups"],
        proof: "Multi Talent Technology",
      },
    ],
  },
];

export default function SkillsCyber() {
  const [activeGroup, setActiveGroup] = useState("Frontend");
  const [hoveredTech, setHoveredTech] = useState(null);
  const sectionRef = useRef(null);

  const activeData = GROUPS.find((g) => g.label === activeGroup) || GROUPS[0];

  return (
    <section ref={sectionRef} id="skills" className="relative w-full bg-transparent overflow-hidden py-20 sm:py-28 px-4 sm:px-6 lg:px-10 scroll-mt-20">
      <div className="mx-auto max-w-7xl relative">
        {/* Section Header */}
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between mb-8 sm:mb-10 gap-5 sm:gap-6 text-center md:text-left">
          <div className="relative z-10">
            <p className="font-mono text-xs tracking-[0.3em] text-cyan-400 font-extrabold uppercase dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              VERIFIED ENGINEERING STACK
            </p>
            <h2 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-6xl dark:drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Skills <span className="text-gradient">Matrix</span>
            </h2>
            <p className="text-xs font-mono text-slate-400 mt-2">
              ⚡ Production-ready technologies, frameworks &amp; AI vision pipelines
            </p>
          </div>

          {/* Theme-Aware Sliding Domain Tab Switcher */}
          <div className="theme-switcher-bar relative z-10 flex flex-wrap justify-center gap-1 rounded-full p-1.5 backdrop-blur-md shadow-lg border self-center md:self-auto max-w-full" role="tablist" aria-label="Skill Categories">
            {GROUPS.map((g) => {
              const Icon = g.icon;
              const isActive = activeGroup === g.label;
              return (
                <button
                  key={g.label}
                  onClick={() => setActiveGroup(g.label)}
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

        {/* 🌟 Interactive Modern Tech Stack Ribbon (Visual Logo Cloud) */}
        <div className="mb-10 sm:mb-12 relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 dark:bg-black/30 p-3 sm:p-4 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between gap-2 mb-2.5 px-2">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" />
              Core Technology Ecosystem
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              {hoveredTech ? `⚡ ${hoveredTech}` : "Hover any icon to inspect"}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-1">
            {TECH_RIBBON.map((t, idx) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredTech(t.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  className="group relative flex items-center justify-center rounded-xl p-2.5 sm:p-3 bg-white/5 hover:bg-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer shadow-sm"
                  style={{
                    boxShadow: hoveredTech === t.name ? `0 0 16px ${t.glow}` : undefined,
                    borderColor: hoveredTech === t.name ? t.color : undefined,
                  }}
                  title={t.name}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:scale-110" />
                  
                  {/* Subtle Tooltip Tag */}
                  <span className="absolute -top-7 rounded-md bg-black/90 border border-white/20 px-2 py-0.5 font-mono text-[9px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-20">
                    {t.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Detailed Authentic Engineering Matrix with Colorful Official Brand Logos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            id={`panel-${activeData.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeData.id}`}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 relative z-10"
          >
            {activeData.skills.map((skill) => {
              const BrandLogo = skill.logo;
              return (
                <div
                  key={skill.name}
                  className="skill-card-bg noise-overlay relative flex flex-col justify-between rounded-3xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-xl z-10 group"
                  style={{
                    transition: "all 0.3s ease",
                  }}
                >
                  <div>
                    {/* Top Row: Official Brand Logo & Status Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-2xl p-2 bg-white/5 border border-white/10 shadow-inner group-hover:border-cyan-400/40 transition-colors"
                        style={{
                          boxShadow: `0 0 15px ${skill.brandGlow}`,
                        }}
                      >
                        {BrandLogo && <BrandLogo className="h-6 w-6" />}
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                            skill.badgeType === "emerald"
                              ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                              : skill.badgeType === "teal"
                              ? "border border-teal-500/30 bg-teal-500/10 text-teal-400"
                              : "border border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
                          }`}
                        >
                          <Sparkles className="h-2.5 w-2.5" />
                          {skill.badge}
                        </span>

                        <span className="font-mono text-[10px] text-slate-400">
                          {skill.proof}
                        </span>
                      </div>
                    </div>

                    {/* Skill Title */}
                    <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-cyan-300 transition-colors mb-3">
                      {skill.name}
                    </h3>

                    {/* Technical Capabilities Scope Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {skill.scope.map((item, i) => (
                        <span
                          key={i}
                          className="rounded-md bg-white/5 border border-white/10 px-2 py-1 font-mono text-[10px] sm:text-[11px] text-slate-300 font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Verified Proof Row */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Production Ready</span>
                    </span>
                    <span className="opacity-60 font-mono text-[10px]">{skill.proof}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
