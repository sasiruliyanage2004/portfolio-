import { useState, useRef, useMemo, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import {
  Radio,
  ArrowUpRight,
  Database,
  ShieldCheck,
  Activity,
  Layers,
  Cpu,
  X,
  ExternalLink,
  Sparkles,
  GitBranch,
  Terminal,
  Zap,
  CheckCircle2,
  Lock,
} from "lucide-react";

const GithubIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const CATEGORIES = ["All", "AI Solutions", "Web Apps", "UI/UX"];

const PROJECTS = [
  {
    id: "suspicious-activity-detection",
    title: "AI Suspicious Activity & Weapon Detection System",
    blurb: "Computer Vision anomaly & weapon detection pipeline processing live PTZ camera streams with under 30ms latency for automated security monitoring.",
    longDescription: "An enterprise-grade autonomous surveillance system engineered to detect lethal weapons (firearms, bladed weapons) and abnormal aggressive behavioral anomalies in real-time. Built with a high-throughput FastAPI asynchronous gateway and optimized YOLOv11 tensor graphs running over WebSockets.",
    category: "AI Solutions",
    tech: ["YOLOv11", "FastAPI", "Python", "React", "OpenCV", "PTZ Camera"],
    span: "lg:col-span-2 lg:row-span-2",
    featured: true,
    live: true,
    github: "https://github.com/sasiruliyanage2004/Suspicious-Activity-Detection",
    demo: "https://github.com/sasiruliyanage2004/Suspicious-Activity-Detection",
    metrics: [
      { label: "Latency", val: "<30ms" },
      { label: "Vision Model", val: "YOLOv11" },
      { label: "Detection Acc", val: "98.4%" },
    ],
    status: "v1.2.0 • REAL-TIME FEED ACTIVE",
    engineTitle: "YOLOv11 Neural Inference Engine",
    sync: "FastAPI WebSocket Stream",
    badge: "Real-time AI Security",
    architecture: [
      { step: "01. Input Stream", title: "PTZ Live RTSP Feeds", desc: "Multi-camera H.264 stream ingestion with OpenCV hardware acceleration" },
      { step: "02. Inference", title: "YOLOv11 Neural Core", desc: "FP16 optimized tensor pipeline detecting weapons & aggressive motion vectors" },
      { step: "03. Asynchronous Bus", title: "FastAPI WebSocket Hub", desc: "Sub-30ms bidirectional broadcast layer delivering alert payloads" },
      { step: "04. Client Dashboard", title: "React Cyber Monitor", desc: "Real-time bounding box rendering, instant incident logging & sound alarms" },
    ],
    highlights: [
      "Sub-30ms real-time weapon & anomalous behavior bounding-box tracking",
      "Asynchronous frame-dropping prevention queue for 60fps continuous streams",
      "Automated incident alert dispatch with snapshot audit logs",
    ],
  },
  {
    id: "ayurlife",
    title: "AyurLife — Ayurvedic Healthcare Ecosystem",
    blurb: "Full-stack healthcare portal and companion mobile app connecting certified Ayurvedic doctors, herbal medicine vendors, and patients with diagnostic search and appointments.",
    longDescription: "A comprehensive digital health ecosystem modernizing traditional Sri Lankan Ayurvedic medical practice. Incorporates patient diagnostic search, doctor booking schedules, herbal inventory management, and an administrative knowledge base.",
    category: "Web Apps",
    tech: ["React 19", "Node.js", "Express", "MongoDB", "Tailwind CSS", "React Native"],
    span: "lg:col-span-1 lg:row-span-1",
    featured: false,
    live: true,
    github: "https://github.com/sasiruliyanage2004/AyurLife---Integrated-Ayurvedic-Herbal-Medicine-Platform",
    demo: "https://github.com/sasiruliyanage2004/AyurLife---Integrated-Ayurvedic-Herbal-Medicine-Platform",
    metrics: [
      { label: "Platform", val: "Web + App" },
      { label: "Architecture", val: "MERN" },
      { label: "Database", val: "MongoDB" },
    ],
    status: "v2.4.0 • ONLINE",
    engineTitle: "Ayurvedic Herbal Portal Engine",
    architecture: [
      { step: "01. Client Layers", title: "React 19 Web + React Native App", desc: "Cross-platform mobile & responsive desktop user interfaces" },
      { step: "02. API Gateway", title: "Express.js RESTful Micro-routes", desc: "JWT authenticated doctor scheduling & medicine ordering endpoints" },
      { step: "03. Data Persistence", title: "MongoDB Atlas Knowledge Base", desc: "Document store for herbal formulas, patient histories & doctor directories" },
    ],
    highlights: [
      "Role-based access control for Admins, Doctors, Herbal Vendors, and Patients",
      "Full herbal medicine knowledge base with disease-to-cure relational mappings",
      "Cross-platform responsive design on both React 19 web and React Native mobile",
    ],
  },
  {
    id: "gitbrain",
    title: "GitBrain — Autonomous AI Version Control",
    blurb: "Developer platform with native AI project management, automated semantic git-less snapshots, and autonomous AI pull-request review engines without CLI complexity.",
    longDescription: "An intelligent autonomous workspace that abstracts git complexity using localized semantic snapshots, automatic code diff analysis, and intelligent pull-request code reviewer agents.",
    category: "AI Solutions",
    tech: ["TypeScript", "React", "Node.js", "AI Agent", "Tailwind CSS"],
    span: "lg:col-span-1 lg:row-span-1",
    featured: false,
    live: true,
    github: "https://github.com/sasiruliyanage2004/GitBrain",
    demo: "https://github.com/sasiruliyanage2004/GitBrain",
    metrics: [
      { label: "Core", val: "AI Agent" },
      { label: "Engine", val: "TypeScript" },
      { label: "Diff Mode", val: "Semantic" },
    ],
    status: "v1.0.0 • ACTIVE",
    engineTitle: "GitBrain Autonomous Code Agent",
    architecture: [
      { step: "01. File Watcher", title: "Local Virtual Workspace", desc: "In-memory file tree tracker observing delta modifications" },
      { step: "02. AI Reasoning", title: "Semantic Commit Agent", desc: "LLM agent synthesizing structured commit summaries and PR reviews" },
      { step: "03. Interface", title: "Cyber Studio UI", desc: "Visual timeline graph of project snapshots with one-click rollbacks" },
    ],
    highlights: [
      "Zero-terminal git abstraction with automated branchless versioning",
      "Autonomous code review generation with vulnerability highlighting",
      "Blazing fast local state recovery with visual time-travel navigation",
    ],
  },
  {
    id: "biometrics-platform",
    title: "Real-Time Biometric Face Verification",
    blurb: "High-security biometric face recognition app using face-api.js neural networks and MongoDB for automated employee registration, live attendance, and access control.",
    longDescription: "Neural network-based facial landmark extraction and biometric verification platform. Designed for contact-less attendance and enterprise security clearance with real-time liveness verification.",
    category: "AI Solutions",
    tech: ["face-api.js", "React", "Node.js", "MongoDB", "Computer Vision"],
    span: "lg:col-span-1 lg:row-span-1",
    featured: false,
    live: true,
    github: "https://github.com/sasiruliyanage2004/Real-time-Biometrics-Platform",
    demo: "https://github.com/sasiruliyanage2004/Real-time-Biometrics-Platform",
    metrics: [
      { label: "Model", val: "face-api.js" },
      { label: "Accuracy", val: "99.1%" },
      { label: "Auth Speed", val: "<80ms" },
    ],
    status: "v1.1.0 • ONLINE",
    engineTitle: "Neural Biometric Pipeline",
    architecture: [
      { step: "01. Camera Stream", title: "Webcam Video Buffer", desc: "Browser canvas capture with lighting normalization" },
      { step: "02. Landmark Engine", title: "SSD MobileNet V1", desc: "68-point facial landmark detector computing 128-dimensional embedding vectors" },
      { step: "03. Matcher & DB", title: "Euclidean Vector Matcher", desc: "Fast nearest-neighbor matching against encrypted MongoDB employee profiles" },
    ],
    highlights: [
      "Client-side neural inference ensuring zero raw biometric image exposure to network",
      "Automated timestamped attendance logs with attendance analytics",
      "Under 80ms face matching latency over large identity databases",
    ],
  },
  {
    id: "wfh-tracking",
    title: "WorkforceOS — Remote Productivity Suite",
    blurb: "Enterprise remote workforce management system offering attendance tracking, activity logging, automated screen capture, and productivity analytics for distributed teams.",
    longDescription: "A comprehensive remote employee management suite enabling managers and remote workers to maintain transparent, automated productivity records, active work duration metrics, and task audits.",
    category: "Web Apps",
    tech: ["TypeScript", "React", "Node.js", "MongoDB", "Productivity Engine"],
    span: "lg:col-span-1 lg:row-span-1",
    featured: false,
    live: true,
    github: "https://github.com/sasiruliyanage2004/WFH-Tracking",
    demo: "https://github.com/sasiruliyanage2004/WFH-Tracking",
    metrics: [
      { label: "Sync", val: "Real-time" },
      { label: "Security", val: "AES-256" },
      { label: "Target", val: "Enterprise" },
    ],
    status: "v2.0.0 • ACTIVE",
    engineTitle: "WorkforceOS Productivity Daemon",
    architecture: [
      { step: "01. Client Agent", title: "Work Session Tracker", desc: "Automated work duration timers and activity heartbeat pings" },
      { step: "02. Aggregation Hub", title: "Node.js Analytics Worker", desc: "Computes active vs idle hours, break durations, and project allocations" },
      { step: "03. Executive Dashboard", title: "React 19 Admin Panel", desc: "Real-time company-wide productivity trends, payroll exports, and logs" },
    ],
    highlights: [
      "Granular timesheet and project billing calculation modules",
      "Automated daily productivity summaries with weekly team comparison charts",
      "Robust data privacy safeguards with role-restricted audit permissions",
    ],
  },
  {
    id: "advertising-agency",
    title: "AdVantage — Web Advertising Portal",
    blurb: "Interactive digital media agency showcase platform enabling dynamic campaign asset previews, client proposal generation, and commercial marketing service workflows.",
    longDescription: "A commercial digital agency portal designed to showcase high-impact creative campaigns, calculate dynamic client advertising rate quotes, and manage prospective lead inquiries.",
    category: "UI/UX",
    tech: ["JavaScript", "HTML5", "CSS3", "PHP", "MySQL"],
    span: "lg:col-span-1 lg:row-span-1",
    featured: false,
    live: true,
    github: "https://github.com/sasiruliyanage2004/Web-Based-Advertising-Agency",
    demo: "https://github.com/sasiruliyanage2004/Web-Based-Advertising-Agency",
    metrics: [
      { label: "Stack", val: "PHP + JS" },
      { label: "Database", val: "MySQL" },
      { label: "Design", val: "Custom UI" },
    ],
    status: "v1.0.0 • PRODUCTION",
    engineTitle: "AdVantage Campaign Gateway",
    architecture: [
      { step: "01. Frontend", title: "Dynamic Marketing Interface", desc: "Custom CSS3 animated project portfolios with rich media carousels" },
      { step: "02. Backend Logic", title: "PHP Service Engine", desc: "Processes client quotation requests, contact inquiries & service catalogues" },
      { step: "03. Database", title: "MySQL Campaign Store", desc: "Relational storage for customer proposals, service rates, and reviews" },
    ],
    highlights: [
      "Interactive advertising campaign cost estimation calculator",
      "Clean semantic architecture with responsive cross-browser styling",
      "Modular PHP and MySQL backend for straightforward content management",
    ],
  },
];

// ------------------------------------------------------------------
// PROJECT DEEP DIVE MODAL COMPONENT (Awwwards Standard)
// ------------------------------------------------------------------
function ProjectDeepDiveModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    // Stop Lenis smooth scroll completely while modal is active
    if (window.__lenis) {
      window.__lenis.stop();
    }

    // Completely lock background page scroll on both body and html
    const origBodyOverflow = document.body.style.overflow;
    const origHtmlOverflow = document.documentElement.style.overflow;
    const origBodyTouch = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = origBodyOverflow;
      document.documentElement.style.overflow = origHtmlOverflow;
      document.body.style.touchAction = origBodyTouch;
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto overscroll-contain"
    >
      <motion.div
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="project-card-obsidian noise-overlay relative w-full max-w-3xl max-h-[88vh] overflow-y-auto overscroll-contain rounded-3xl border border-cyan-500/30 p-5 sm:p-8 shadow-2xl z-10"
      >
        <span className="border-beam" aria-hidden="true" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-400">
                <Sparkles className="h-3 w-3" />
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                <Radio className="h-2.5 w-2.5" />
                {project.status || "ACTIVE"}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-slate-400 hover:bg-white/20 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Project Description */}
        <div className="mb-6">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {project.longDescription || project.blurb}
          </p>
        </div>

        {/* Metrics Bar */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-6">
            {project.metrics.map((m, i) => (
              <div key={i} className="rounded-2xl bg-white/5 p-3 text-center border border-white/10">
                <div className="text-cyan-400 font-bold text-base sm:text-xl font-mono">{m.val}</div>
                <div className="text-[10px] sm:text-xs opacity-70 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* System Architecture Flow */}
        {project.architecture && (
          <div className="mb-6">
            <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
              <Layers className="h-3.5 w-3.5" />
              System Architecture &amp; Data Pipeline
            </h4>
            <div className="space-y-2.5">
              {project.architecture.map((arch, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-black/30 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4"
                >
                  <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 font-semibold">
                    <span className="text-[10px] opacity-60">{arch.step}</span>
                    <span>{arch.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 sm:text-right font-normal">
                    {arch.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Engineering Highlights */}
        {project.highlights && (
          <div className="mb-6">
            <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Key Engineering Highlights
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300 font-mono">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Badges */}
        <div className="mb-6">
          <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            <Cpu className="h-3.5 w-3.5" />
            Technologies &amp; Libraries
          </h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="tech-badge rounded-lg px-3 py-1 font-mono text-[11px] font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 font-mono text-xs font-bold text-black hover:bg-cyan-400 transition-all cursor-pointer shadow-lg"
            >
              <GithubIcon className="h-4 w-4" />
              <span>Explore GitHub Repository</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <button
            onClick={onClose}
            className="font-mono text-xs text-slate-400 hover:text-white transition-colors cursor-pointer px-3 py-2"
          >
            Close Window (Esc)
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ------------------------------------------------------------------
// 3D INTERACTIVE CARD
// ------------------------------------------------------------------
function Card3D({ project, onInspect }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });

  const isFeatured = project.featured || (project.span && project.span.includes("row-span-2"));

  const handleMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
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
        className={`project-card-obsidian noise-overlay relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl z-10 ${
          !isFeatured
            ? "hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-cyan-400/50 border border-transparent"
            : "group-hover:border-cyan-400"
        }`}
      >
        {/* Top Header Block */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-bold transition-colors">
              {project.title}
            </h3>
            {project.live && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-3 py-1 font-mono text-xs font-semibold text-emerald-300 shrink-0">
                <Radio className="h-3 w-3" />
                LIVE
              </span>
            )}
          </div>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed font-normal">
            {project.blurb}
          </p>

          {/* Featured Metrics Box */}
          {isFeatured && project.metrics && (
            <div className="bento-ui-preview-frame my-5 sm:my-6 rounded-2xl p-4 sm:p-5 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-2">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs sm:text-sm">
                  <Activity className="h-4 w-4 animate-pulse text-cyan-300" />
                  <span>{project.engineTitle || "Live Telemetry"}</span>
                </div>
                <span className="text-[10px] opacity-70">{project.status}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 my-3 sm:my-4 text-center">
                {project.metrics.map((m, i) => (
                  <div key={i} className="rounded-xl bg-white/5 p-2 sm:p-3 border border-white/10">
                    <div className="text-cyan-400 font-bold text-sm sm:text-lg">{m.val}</div>
                    <div className="text-[9px] sm:text-xs opacity-70 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] sm:text-[11px] opacity-80 pt-2 border-t border-white/10">
                <span className="flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-indigo-400" /> {project.sync}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-500">
                  <ShieldCheck className="h-3.5 w-3.5" /> {project.badge}
                </span>
              </div>
            </div>
          )}

          {/* Mini Metrics Preview for non-featured card */}
          {!isFeatured && project.metrics && (
            <div className="bento-ui-preview-frame my-4 rounded-2xl p-3.5 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-[11px]">
                  <Activity className="h-3.5 w-3.5 animate-pulse text-cyan-300" />
                  <span>{project.engineTitle || "System Engine"}</span>
                </div>
                <span className="text-[10px] opacity-70">{project.status}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 my-2 text-center">
                {project.metrics.map((m, i) => (
                  <div key={i} className="rounded-xl bg-white/5 p-2 border border-white/10">
                    <div className="text-cyan-400 font-bold text-xs sm:text-sm">{m.val}</div>
                    <div className="text-[9px] opacity-70 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Block */}
        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="tech-badge rounded-lg px-2.5 sm:px-3 py-0.5 sm:py-1 font-mono text-[11px] sm:text-xs font-semibold"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
            <button
              onClick={() => onInspect(project)}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Inspect Architecture</span>
            </button>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold opacity-80 hover:text-cyan-400 transition-colors"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ------------------------------------------------------------------
// MAIN PROJECTS SECTION
// ------------------------------------------------------------------
export default function ProjectsCyber() {
  const [cat, setCat] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [githubStats, setGithubStats] = useState({ repos: 11, updated: "Active" });
  const sectionRef = useRef(null);

  useEffect(() => {
    // Real-Time GitHub API Live Activity Stream Fetcher
    fetch("https://api.github.com/users/sasiruliyanage2004")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.public_repos) {
          setGithubStats({
            repos: data.public_repos,
            updated: new Date(data.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          });
        }
      })
      .catch(() => {});
  }, []);

  const list = useMemo(() => {
    if (cat === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === cat);
  }, [cat]);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden bg-transparent px-4 sm:px-6 py-20 sm:py-28 lg:px-10 scroll-mt-20">
      <div className="mx-auto max-w-7xl relative">
        {/* Real-time GitHub Live Activity Stream Pill */}
        <div className="flex justify-center md:justify-start mb-4">
          <a
            href="https://github.com/sasiruliyanage2004"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] sm:text-xs text-slate-300 hover:text-cyan-400 transition-all border border-cyan-500/20 cursor-pointer shadow-lg"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="h-2 w-2 -ml-3.5 rounded-full bg-emerald-400" />
            <span className="font-bold text-white">Live GitHub Stream:</span>
            <span className="text-cyan-400">{githubStats.repos} Public Repositories</span>
            <span className="opacity-50">• Synced {githubStats.updated}</span>
          </a>
        </div>

        {/* Section Header */}
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between mb-8 sm:mb-12 gap-5 sm:gap-6 text-center md:text-left">
          <div className="relative z-10">
            <p className="font-mono text-xs tracking-[0.3em] text-cyan-400 font-extrabold uppercase dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              AUTHENTIC BUILDS &amp; REPOSITORIES
            </p>
            <h2 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-6xl dark:drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Projects &amp; <span className="text-gradient">Builds</span>
            </h2>
          </div>

          {/* Category Tab Switcher */}
          <div className="theme-switcher-bar relative z-10 flex flex-wrap justify-center gap-1 rounded-full p-1.5 backdrop-blur-md shadow-lg border self-center md:self-auto max-w-full">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="relative rounded-full px-3 sm:px-4 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs font-medium transition-colors cursor-pointer"
              >
                {cat === c && (
                  <motion.span
                    layoutId="activeCategoryPill"
                    style={{ background: "linear-gradient(135deg, var(--grad-start), var(--grad-mid))" }}
                    className="absolute inset-0 rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${cat === c ? "text-white font-semibold" : "opacity-70 hover:opacity-100"}`}>
                  {c}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 relative z-10">
          <AnimatePresence mode="popLayout">
            {list.map((project) => (
              <Card3D key={project.id} project={project} onInspect={(p) => setSelectedProject(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Project Deep-Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDeepDiveModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
