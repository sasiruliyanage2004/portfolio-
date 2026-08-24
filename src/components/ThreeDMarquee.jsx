import { motion } from "framer-motion";
import { Sparkles, Radio, Activity, Database, ShieldCheck, Layers, Cpu, Code2, ArrowUpRight } from "lucide-react";

const MARQUEE_CARDS = [
  {
    id: "yolo-tensor",
    title: "YOLOv11 Tensor Graph",
    subtitle: "AI Weapon & Anomaly Detection",
    category: "AI Core",
    badge: "<30ms Latency",
    desc: "Real-time FP16 neural tensor inference pipeline processing multi-camera PTZ RTSP streams.",
    tech: ["YOLOv11", "FastAPI", "OpenCV", "Python"],
    color: "#06b6d4",
    stat: "98.4% Acc",
  },
  {
    id: "ayurlife-portal",
    title: "AyurLife Healthcare Portal",
    subtitle: "Modern Ayurvedic Ecosystem",
    category: "Full-Stack",
    badge: "Web + Mobile",
    desc: "Cross-platform MERN portal with diagnostic search, doctor booking & herbal knowledge base.",
    tech: ["React 19", "Node.js", "MongoDB", "React Native"],
    color: "#10b981",
    stat: "MERN Stack",
  },
  {
    id: "gitbrain-agent",
    title: "GitBrain Autonomous VCS",
    subtitle: "Semantic AI Version Control",
    category: "AI Agent",
    badge: "Zero-Terminal",
    desc: "Automated branchless snapshots and autonomous pull-request review agents.",
    tech: ["TypeScript", "React", "AI Agent", "Node.js"],
    color: "#6366f1",
    stat: "AI Agent",
  },
  {
    id: "biometric-auth",
    title: "Neural Face Verification",
    subtitle: "Contactless Biometric Gate",
    category: "Computer Vision",
    badge: "SSD MobileNet",
    desc: "68-point facial landmark extraction with encrypted Euclidean vector matching.",
    tech: ["face-api.js", "React", "MongoDB", "TensorFlow"],
    color: "#06b6d4",
    stat: "<80ms Auth",
  },
  {
    id: "workforce-os",
    title: "WorkforceOS Productivity",
    subtitle: "Remote Team Daemon",
    category: "Enterprise",
    badge: "Real-time Sync",
    desc: "Automated timesheet logging, screen audit triggers and activity analytics.",
    tech: ["TypeScript", "React 19", "Node.js", "MongoDB"],
    color: "#10b981",
    stat: "Enterprise",
  },
  {
    id: "multi-talent-tech",
    title: "Multi Talent Technology",
    subtitle: "Software Engineering Intern",
    category: "Industry Experience",
    badge: "Jun 2026 — Present",
    desc: "Developing enterprise web applications, RESTful microservices, and participating in Agile sprints.",
    tech: ["Full-Stack", "REST APIs", "Agile", "UI/UX"],
    color: "#3b82f6",
    stat: "Active Role",
  },
  {
    id: "sliit-academic",
    title: "SLIIT Faculty of Computing",
    subtitle: "BSc (Hons) in Information Tech",
    category: "Undergraduate",
    badge: "2nd Year",
    desc: "Advanced coursework in Data Structures, OOP Java, Database Systems & Algorithms.",
    tech: ["Java", "DSA", "DBMS", "C Programming"],
    color: "#8b5cf6",
    stat: "SLIIT '26",
  },
  {
    id: "cultural-matrix",
    title: "Dumbara Kinematics Engine",
    subtitle: "Procedural Heritage Canvas",
    category: "Creative Math",
    badge: "60fps Loop",
    desc: "Procedural HTML5 canvas rendering Sri Lankan Dumbara geometric motif algorithms.",
    tech: ["HTML5 Canvas", "Trigonometry", "Kinematics", "React"],
    color: "#06b6d4",
    stat: "Bespoke Math",
  },
];

// Split cards into 3 columns for rich 3D perspective
const col1 = [...MARQUEE_CARDS.slice(0, 3), ...MARQUEE_CARDS.slice(0, 3)];
const col2 = [...MARQUEE_CARDS.slice(3, 6), ...MARQUEE_CARDS.slice(3, 6)];
const col3 = [...MARQUEE_CARDS.slice(5, 8), ...MARQUEE_CARDS.slice(0, 3)];

function MarqueeColumn({ cards, duration = 25, reverse = false }) {
  return (
    <div className="flex flex-col gap-5 overflow-hidden">
      <motion.div
        initial={{ y: reverse ? "-50%" : "0%" }}
        animate={{ y: reverse ? "0%" : "-50%" }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-5 shrink-0 hover:[animation-play-state:paused]"
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="group relative w-72 sm:w-80 rounded-3xl border border-white/10 bg-[#0c1220]/90 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] shadow-2xl cursor-pointer"
          >
            <span className="border-beam" aria-hidden="true" />

            {/* Card Header */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-400">
                <Sparkles className="h-2.5 w-2.5" />
                {card.category}
              </span>
              <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2 py-0.5">
                {card.stat}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              {card.title}
            </h4>
            <p className="text-[11px] font-mono text-slate-400 mb-2.5">{card.subtitle}</p>

            <p className="text-xs text-slate-300 leading-relaxed font-normal mb-4 line-clamp-2">
              {card.desc}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1 pt-3 border-t border-white/10">
              {card.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[9px] text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ThreeDMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl my-6">
      {/* Background Neon Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[500px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-emerald-500/10 to-indigo-500/15 blur-3xl pointer-events-none" />

      {/* Top & Bottom Vignette Mask */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#090d16] via-[#090d16]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090d16] via-[#090d16]/80 to-transparent z-20 pointer-events-none" />

      {/* 3D Perspective Isometric Canvas */}
      <div
        className="relative flex items-center justify-center min-h-[520px] sm:min-h-[580px] overflow-hidden"
        style={{
          perspective: "1200px",
        }}
      >
        <div
          className="flex gap-5 sm:gap-6 justify-center items-center"
          style={{
            transform: "rotateX(48deg) rotateZ(-24deg) scale(0.95)",
            transformStyle: "preserve-3d",
          }}
        >
          <MarqueeColumn cards={col1} duration={28} />
          <MarqueeColumn cards={col2} duration={32} reverse={true} />
          <MarqueeColumn cards={col3} duration={26} />
        </div>
      </div>

      {/* Status Overlay Footer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full border border-white/15 bg-black/80 px-4 py-1.5 font-mono text-[11px] text-cyan-300 backdrop-blur-md shadow-xl">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>3D Isometric Horizon • Hover any card to pause</span>
      </div>
    </div>
  );
}
