import { useState, useRef, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Radio,
  ArrowUpRight,
  Database,
  ShieldCheck,
  Activity,
  Layers,
  Cpu,
  X,
  Sparkles,
  CheckCircle2,
  Maximize2,
  LayoutGrid,
  Box,
} from "lucide-react";
import ThreeDMarquee from "../ThreeDMarquee";

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
    sync: "Express RESTful API",
    badge: "Healthcare Portal",
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
    sync: "Virtual Workspace Engine",
    badge: "AI Developer Tool",
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
    sync: "SSD MobileNet V1",
    badge: "Biometric Auth",
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
    sync: "Heartbeat Activity Ping",
    badge: "Enterprise Workforce",
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
    sync: "PHP Service Engine",
    badge: "Marketing Platform",
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
// PROJECT DEEP DIVE MODAL (Header + Body + Sticky Footer)
// ------------------------------------------------------------------
function ProjectDeepDiveModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    if (window.__lenis) {
      window.__lenis.stop();
    }

    const origBodyOverflow = document.body.style.overflow;
    const origHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = origBodyOverflow;
      document.documentElement.style.overflow = origHtmlOverflow;
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
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 15, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        className="project-card-obsidian noise-overlay relative flex flex-col w-full max-w-3xl max-h-[85vh] rounded-3xl border border-cyan-500/30 shadow-2xl z-10 overflow-hidden"
      >
        <span className="border-beam" aria-hidden="true" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-7 pb-4 shrink-0 bg-[#090d16]/95 backdrop-blur-md">
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

        {/* Modal Scrollable Content Area */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 overscroll-contain">
          {/* Project Description */}
          <div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {project.longDescription || project.blurb}
            </p>
          </div>

          {/* Metrics Bar */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
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
            <div>
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
            <div>
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
          <div>
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
        </div>

        {/* Modal Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6 border-t border-white/10 shrink-0 bg-[#090d16]/95 backdrop-blur-md">
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
// INTERACTIVE EXPANDABLE PROJECT CARD (Click to Expand / Focus)
// ------------------------------------------------------------------
function ExpandableProjectCard({ project, isExpanded, onSelect, onInspect }) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className={`group relative transition-all duration-500 ${
        isExpanded ? "lg:col-span-2 lg:row-span-2" : "lg:col-span-1 lg:row-span-1"
      }`}
    >
      <div
        onClick={() => {
          if (!isExpanded) onSelect(project.id);
        }}
        className={`project-card-obsidian noise-overlay relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-xl z-10 border ${
          isExpanded
            ? "border-cyan-400/80 shadow-[0_20px_50px_rgba(6,182,212,0.2)] bg-[#0c1220]/95"
            : "border-white/10 hover:border-cyan-400/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)] cursor-pointer"
        }`}
      >
        {isExpanded && <span className="border-beam" aria-hidden="true" />}

        {/* Top Header Block */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                isExpanded
                  ? "border border-cyan-500/40 bg-cyan-500/20 text-cyan-300"
                  : "border border-white/15 bg-white/5 text-slate-300"
              }`}>
                <Sparkles className="h-2.5 w-2.5" />
                {project.category}
              </span>

              {isExpanded && (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400 animate-pulse">
                  <Radio className="h-2.5 w-2.5" />
                  ACTIVE FOCUS
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {!isExpanded ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(project.id);
                  }}
                  title="Expand to Spotlight"
                  className="rounded-full bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 p-1.5 transition-all border border-white/10 cursor-pointer"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </button>
              ) : (
                project.live && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-3 py-1 font-mono text-xs font-semibold text-emerald-300 shrink-0">
                    <Radio className="h-3 w-3" />
                    LIVE
                  </span>
                )
              )}
            </div>
          </div>

          <h3 className={`font-bold transition-colors ${isExpanded ? "text-2xl sm:text-3xl text-cyan-300 mt-2" : "text-lg sm:text-xl text-white group-hover:text-cyan-400"}`}>
            {project.title}
          </h3>

          <p className="mt-3 text-xs sm:text-sm sm:leading-relaxed font-normal text-slate-300">
            {project.blurb}
          </p>

          {/* Expanded Live Telemetry Frame */}
          {isExpanded && project.metrics && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.35 }}
              className="bento-ui-preview-frame my-5 rounded-2xl p-4 sm:p-5 font-mono text-xs shadow-inner"
            >
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
            </motion.div>
          )}

          {/* Mini Metrics for Compact Cards */}
          {!isExpanded && project.metrics && (
            <div className="bento-ui-preview-frame my-3 rounded-xl p-2.5 font-mono text-xs shadow-inner">
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {project.metrics.map((m, i) => (
                  <div key={i} className="rounded-lg bg-white/5 p-1.5 border border-white/10">
                    <div className="text-cyan-400 font-bold text-xs">{m.val}</div>
                    <div className="text-[8px] opacity-70 truncate">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Block */}
        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="tech-badge rounded-lg px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] font-semibold"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-white/10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInspect(project);
              }}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Inspect Architecture</span>
            </button>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold opacity-80 hover:text-cyan-400 transition-colors"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ------------------------------------------------------------------
// MAIN PROJECTS SECTION
// ------------------------------------------------------------------
export default function ProjectsCyber() {
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "3d"
  const [cat, setCat] = useState("All");
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
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

  // When changing category, auto-focus first project in that category if active is hidden
  useEffect(() => {
    if (list.length > 0 && !list.find((p) => p.id === activeId)) {
      setActiveId(list[0].id);
    }
  }, [cat, list, activeId]);

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
            <p className="text-xs font-mono text-slate-400 mt-2">
              💡 {viewMode === "grid" ? "Select any card to expand its live spotlight & telemetry" : "3D Isometric Wall • Hover any card to pause animation"}
            </p>
          </div>

          {/* Dual Controls: Category Tabs + 3D View Mode Switcher */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 self-center md:self-auto z-10">
            {/* View Mode Toggle (Grid vs 3D Marquee Horizon) */}
            <div className="theme-switcher-bar flex items-center rounded-full p-1 backdrop-blur-md shadow-lg border">
              <button
                onClick={() => setViewMode("grid")}
                title="Bento Grid View"
                className={`relative flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-medium transition-colors cursor-pointer ${
                  viewMode === "grid" ? "text-white font-semibold" : "opacity-70 hover:opacity-100 text-slate-300"
                }`}
              >
                {viewMode === "grid" && (
                  <motion.span
                    layoutId="activeViewModePill"
                    style={{ background: "linear-gradient(135deg, var(--grad-start), var(--grad-mid))" }}
                    className="absolute inset-0 rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <LayoutGrid className="relative z-10 h-3.5 w-3.5" />
                <span className="relative z-10">Grid</span>
              </button>

              <button
                onClick={() => setViewMode("3d")}
                title="3D Isometric Wall View"
                className={`relative flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-medium transition-colors cursor-pointer ${
                  viewMode === "3d" ? "text-white font-semibold" : "opacity-70 hover:opacity-100 text-slate-300"
                }`}
              >
                {viewMode === "3d" && (
                  <motion.span
                    layoutId="activeViewModePill"
                    style={{ background: "linear-gradient(135deg, var(--grad-start), var(--grad-mid))" }}
                    className="absolute inset-0 rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Box className="relative z-10 h-3.5 w-3.5 text-cyan-400" />
                <span className="relative z-10">3D Wall</span>
              </button>
            </div>

            {/* Category Tab Switcher (Visible in Grid Mode) */}
            {viewMode === "grid" && (
              <div className="theme-switcher-bar flex flex-wrap justify-center gap-1 rounded-full p-1 backdrop-blur-md shadow-lg border">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className="relative rounded-full px-3 py-1 font-mono text-[11px] font-medium transition-colors cursor-pointer"
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
            )}
          </div>
        </div>

        {/* View Switcher: Dynamic Expandable Bento Grid OR 3D Isometric Marquee Horizon */}
        {viewMode === "3d" ? (
          <ThreeDMarquee />
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 relative z-10">
            <AnimatePresence mode="popLayout">
              {list.map((project) => (
                <ExpandableProjectCard
                  key={project.id}
                  project={project}
                  isExpanded={activeId === project.id}
                  onSelect={(id) => setActiveId(id)}
                  onInspect={(p) => setSelectedProject(p)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
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
