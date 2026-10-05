import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Printer,
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Sparkles,
  Award,
  CheckCircle2,
  ShieldCheck,
  Terminal,
} from "lucide-react";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      if (window.__lenis) window.__lenis.stop();
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      if (window.__lenis) window.__lenis.start();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const isLight = document.documentElement.classList.contains("light-theme");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        data-lenis-prevent="true"
        className="fixed inset-0 z-[99999] flex items-center justify-center p-2.5 sm:p-6 bg-black/80 backdrop-blur-2xl overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.94, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.94, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          className={`relative flex flex-col w-full max-w-4xl max-h-[92vh] rounded-3xl border shadow-2xl z-10 overflow-hidden ${
            isLight
              ? "bg-[#faf9f6] text-slate-900 border-slate-300 shadow-[0_25px_70px_rgba(15,23,42,0.25)]"
              : "bg-[#0a0f1d]/95 backdrop-blur-xl text-[#F8FAFC] border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.95)]"
          }`}
        >
          <span className="border-beam resume-no-print" aria-hidden="true" />

          {/* 🌟 Modal Sticky Top Action Bar */}
          <div
            className={`resume-no-print flex items-center justify-between border-b px-4 sm:px-7 py-3.5 sm:py-4 backdrop-blur-md shrink-0 ${
              isLight
                ? "bg-white/95 border-slate-200 text-slate-900"
                : "bg-black/80 border-white/10 text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full p-[1.5px] bg-gradient-to-tr from-cyan-500 to-emerald-400 shrink-0">
                <img
                  src="/profile.png"
                  alt="Sasiru Liyanage"
                  className="h-full w-full rounded-full object-cover border border-black/20"
                  onError={(e) => {
                    e.target.src = "/favicon.svg";
                  }}
                />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base tracking-tight font-mono">
                  Sasiru Liyanage{" "}
                  <span className={isLight ? "text-cyan-700 font-bold" : "text-cyan-400 font-bold"}>
                    · Verified CV
                  </span>
                </h3>
                <p className="text-[10px] sm:text-xs opacity-75 font-mono">
                  Full-Stack Software Engineer &amp; UI Architect • SLIIT '26
                </p>
              </div>
            </div>

            {/* Actions: Download PDF, Print / Save PDF, Close */}
            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                download="Sasiru_Liyanage_CV.pdf"
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-xs font-bold transition-all cursor-pointer shadow-sm ${
                  isLight
                    ? "bg-cyan-600 text-white hover:bg-cyan-700 shadow-md"
                    : "bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25"
                }`}
                title="Download Official PDF Document"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Download PDF</span>
              </a>

              <button
                type="button"
                onClick={handlePrint}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-xs font-bold transition-all cursor-pointer ${
                  isLight
                    ? "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 shadow-xs"
                    : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
                title="Print or Save as High-Res PDF"
              >
                <Printer className="h-3.5 w-3.5 text-cyan-500" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className={`rounded-full p-2 transition-colors cursor-pointer shrink-0 ${
                  isLight
                    ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
                }`}
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 📄 Scrollable Formatted Resume Sheet */}
          <div className="resume-printable-sheet overflow-y-auto p-5 sm:p-9 space-y-7 overscroll-contain text-xs sm:text-sm">
            {/* Header / Contact Overview with Direct Portfolio Link */}
            <div className={`border-b pb-6 ${isLight ? "border-slate-200" : "border-white/10"}`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                    Sasiru Nethvidu Liyanage
                  </h1>
                  <p
                    className={`font-mono font-semibold text-xs sm:text-sm mt-1.5 ${
                      isLight ? "text-cyan-700 font-bold" : "text-cyan-400"
                    }`}
                  >
                    Full-Stack Software Engineer • 3rd-Year Undergraduate at SLIIT Malabe
                  </p>
                  <p className="text-[11px] font-mono opacity-70 mt-0.5">
                    Specializing in React 19, TypeScript, Python FastAPI, WebSockets &amp; Database Architecture
                  </p>
                </div>

                {/* Direct Contact Links */}
                <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 font-mono text-[11px]">
                  <a
                    href="mailto:liyanagesasiru@gmail.com"
                    className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors"
                  >
                    <Mail className={`h-3.5 w-3.5 ${isLight ? "text-cyan-700" : "text-cyan-400"}`} />
                    <span>liyanagesasiru@gmail.com</span>
                  </a>
                  <a
                    href="tel:+94715700953"
                    className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors"
                  >
                    <Phone className={`h-3.5 w-3.5 ${isLight ? "text-emerald-700" : "text-emerald-400"}`} />
                    <span>+94 71 57 00 953</span>
                  </a>
                  <span className="flex items-center gap-1.5 opacity-80">
                    <MapPin className={`h-3.5 w-3.5 ${isLight ? "text-indigo-700" : "text-indigo-400"}`} />
                    <span>Makola, Western Province, Sri Lanka</span>
                  </span>
                </div>
              </div>

              {/* 🌐 Digital Presence Quick-Access Bar (Portfolio, GitHub, LinkedIn) */}
              <div className="mt-4 pt-3.5 border-t border-dashed border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Live Web Portfolio Anchor Badge */}
                  <a
                    href="https://sasiruliyanage.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 font-mono text-[11px] font-bold transition-all shadow-xs group ${
                      isLight
                        ? "bg-cyan-50 text-cyan-800 border border-cyan-300 hover:bg-cyan-100 hover:border-cyan-400"
                        : "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400"
                    }`}
                    title="Click to visit live interactive web portfolio"
                  >
                    <Globe className="h-3.5 w-3.5 text-cyan-500 group-hover:scale-110 transition-transform" />
                    <span>Live Portfolio: <strong className="underline underline-offset-2">sasiruliyanage.vercel.app</strong></span>
                    <ExternalLink className="h-3 w-3 opacity-70 group-hover:opacity-100" />
                  </a>

                  {/* GitHub Profile */}
                  <a
                    href="https://github.com/sasiruliyanage2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 font-mono text-[11px] font-semibold transition-all ${
                      isLight
                        ? "bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200"
                        : "bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>github.com/sasiruliyanage2004</span>
                  </a>

                  {/* LinkedIn Profile */}
                  <a
                    href="https://www.linkedin.com/in/sasiruliyanage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 font-mono text-[11px] font-semibold transition-all ${
                      isLight
                        ? "bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200"
                        : "bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <LinkedinIcon className="h-3.5 w-3.5 text-blue-500" />
                    <span>linkedin.com/in/sasiruliyanage</span>
                  </a>
                </div>

                <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  Available for Hire 2026
                </span>
              </div>
            </div>

            {/* 🎯 Executive Summary */}
            <div className="page-break-inside-avoid">
              <h2
                className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest mb-2.5 ${
                  isLight ? "text-cyan-800 font-extrabold" : "text-cyan-400"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" /> Executive Summary
              </h2>
              <p className={`leading-relaxed font-normal ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                High-impact Full-Stack Software Engineer and 3rd-Year Information Technology Undergraduate at SLIIT Malabe. Proven engineering competency across modern React 19 ecosystems, TypeScript, Python FastAPI microservices, and high-performance WebGL graphics. Creator of autonomous AI computer vision surveillance pipelines and cloud web architectures. MongoDB Certified in Data Modeling &amp; Enterprise Architecture, with proven capability in delivering low-latency WebSockets, clean architecture, and modern cyber-minimalist UI/UX.
              </p>
            </div>

            {/* 🎓 Education & Academic Rigor */}
            <div className="page-break-inside-avoid">
              <h2
                className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest mb-3 ${
                  isLight ? "text-emerald-800 font-extrabold" : "text-emerald-400"
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" /> Education &amp; Academic Qualifications
              </h2>
              <div className="space-y-3">
                {/* SLIIT */}
                <div
                  className={`rounded-2xl border p-4 sm:p-5 ${
                    isLight
                      ? "bg-white border-slate-200 shadow-sm text-slate-900"
                      : "bg-white/[0.02] border-white/10 text-slate-100"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-sm sm:text-base">
                      BSc (Hons) in Information Technology — Software Engineering Specialization
                    </h3>
                    <span
                      className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full w-fit font-bold ${
                        isLight
                          ? "bg-cyan-100 text-cyan-800 border border-cyan-300"
                          : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      }`}
                    >
                      2024 – 2028 (Expected) • 3rd Year
                    </span>
                  </div>
                  <p className="opacity-75 text-xs font-mono mt-1 font-semibold">
                    Sri Lanka Institute of Information Technology (SLIIT), Malabe
                  </p>
                  <p className={`text-xs mt-2 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                    Core Modules: Data Structures &amp; Algorithms, Object-Oriented Software Engineering (Java), Database Management Systems (MySQL, MongoDB), Web Application Development, Computer Networks, Operating Systems, and Cloud Architectures.
                  </p>
                </div>

                {/* Secondary Education - Gurukula College */}
                <div
                  className={`rounded-2xl border p-3.5 sm:p-4 ${
                    isLight
                      ? "bg-white border-slate-200 shadow-sm text-slate-900"
                      : "bg-white/[0.02] border-white/10 text-slate-100"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-xs sm:text-sm">
                      GCE Advanced Level &amp; Ordinary Level Examinations
                    </h3>
                    <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                      Gurukula College, Kelaniya (2020 – 2024)
                    </span>
                  </div>
                  <p className={`text-xs mt-1.5 leading-relaxed font-mono ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                    Advanced Level: Accounting (A Distinction), Business Studies (B), Economics (B) • Built strong foundation in quantitative analysis, business logic, and algorithm design.
                  </p>
                </div>
              </div>
            </div>

            {/* 💻 Core Technical Competencies */}
            <div className="page-break-inside-avoid">
              <h2
                className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest mb-3 ${
                  isLight ? "text-indigo-800 font-extrabold" : "text-indigo-400"
                }`}
              >
                <Code2 className="h-3.5 w-3.5" /> Technical Skills &amp; Technology Stack
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div
                  className={`rounded-xl border p-3.5 ${
                    isLight
                      ? "bg-white border-slate-200 shadow-sm"
                      : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  <span className={`font-bold block mb-1.5 ${isLight ? "text-cyan-800" : "text-cyan-400"}`}>
                    Frontend &amp; UI Architecture
                  </span>
                  <p className={`font-sans text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    React 19, Next.js 15, TypeScript, JavaScript (ES2024), Tailwind CSS v4, Framer Motion, HTML5 Canvas, WebGL, Vite, PWA, Responsive UI/UX.
                  </p>
                </div>
                <div
                  className={`rounded-xl border p-3.5 ${
                    isLight
                      ? "bg-white border-slate-200 shadow-sm"
                      : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  <span className={`font-bold block mb-1.5 ${isLight ? "text-emerald-800" : "text-emerald-400"}`}>
                    Backend &amp; Distributed Systems
                  </span>
                  <p className={`font-sans text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    Node.js, Express.js, Python (FastAPI, Flask), RESTful APIs, WebSockets (real-time telemetry), Microservices, Firebase Cloud Functions.
                  </p>
                </div>
                <div
                  className={`rounded-xl border p-3.5 ${
                    isLight
                      ? "bg-white border-slate-200 shadow-sm"
                      : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  <span className={`font-bold block mb-1.5 ${isLight ? "text-amber-800" : "text-amber-400"}`}>
                    Database Architecture &amp; Modeling
                  </span>
                  <p className={`font-sans text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    MongoDB (Certified Data Modeling Path, Schema Optimization, Aggregations), PostgreSQL, MySQL, Redis Caching, ACID Transactions.
                  </p>
                </div>
                <div
                  className={`rounded-xl border p-3.5 ${
                    isLight
                      ? "bg-white border-slate-200 shadow-sm"
                      : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  <span className={`font-bold block mb-1.5 ${isLight ? "text-violet-800" : "text-violet-400"}`}>
                    AI, DevOps &amp; Engineering Tools
                  </span>
                  <p className={`font-sans text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    YOLOv11, OpenCV, Git, GitHub Actions (CI/CD), Docker, Linux/Bash, Postman, Vercel, Figma, Clean Architecture.
                  </p>
                </div>
              </div>
            </div>

            {/* 🚀 Featured Key Projects */}
            <div className="page-break-inside-avoid">
              <h2
                className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest mb-3 ${
                  isLight ? "text-cyan-800 font-extrabold" : "text-cyan-400"
                }`}
              >
                <Briefcase className="h-3.5 w-3.5" /> Featured Engineering Projects
              </h2>
              <div className="space-y-3">
                {/* Project 1: AI Weapon & Suspicious Activity */}
                <div
                  className={`rounded-2xl border p-4 sm:p-5 ${
                    isLight
                      ? "bg-white border-slate-200 shadow-sm"
                      : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-sm sm:text-base">
                      AI Suspicious Activity &amp; Weapon Detection Pipeline
                    </h3>
                    <span
                      className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full w-fit font-bold ${
                        isLight
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      FastAPI • YOLOv11 • WebSockets • React 19
                    </span>
                  </div>
                  <p className={`text-xs mt-2 leading-relaxed font-sans ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    Autonomous computer vision security pipeline delivering real-time frame inference (<strong className="font-mono">&lt;30ms latency</strong>) over WebSockets to detect weapons, physical altercations, and perimeter intrusions with automated alert dispatching.
                  </p>
                </div>

                {/* Project 2: Interactive Cyber Portfolio */}
                <div
                  className={`rounded-2xl border p-4 sm:p-5 ${
                    isLight
                      ? "bg-white border-slate-200 shadow-sm"
                      : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm sm:text-base">
                        Interactive Cyber-Portfolio &amp; Cultural Motif Engine
                      </h3>
                      <a
                        href="https://sasiruliyanage.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[10px] text-cyan-600 dark:text-cyan-400 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>sasiruliyanage.vercel.app</span>
                      </a>
                    </div>
                    <span
                      className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full w-fit font-bold ${
                        isLight
                          ? "bg-cyan-100 text-cyan-800 border border-cyan-300"
                          : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      }`}
                    >
                      React 19 • Tailwind v4 • WebGL • Framer Motion
                    </span>
                  </div>
                  <p className={`text-xs mt-2 leading-relaxed font-sans ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    Awwwards-caliber digital experience engineered with custom mathematical particle canvas, dynamic light-tracing glassmorphism, bilingual accessibility, Command Palette, and 98+ Google Lighthouse scores across all Core Web Vitals.
                  </p>
                </div>

                {/* Project 3: AyurLife */}
                <div
                  className={`rounded-2xl border p-4 sm:p-5 ${
                    isLight
                      ? "bg-white border-slate-200 shadow-sm"
                      : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-sm sm:text-base">
                      AyurLife — Ayurvedic Healthcare &amp; Telemedicine Companion
                    </h3>
                    <span
                      className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full w-fit font-bold ${
                        isLight
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      Flutter • Firebase • Health Telemetry
                    </span>
                  </div>
                  <p className={`text-xs mt-2 leading-relaxed font-sans ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    Cross-platform mobile telemedicine system connecting patients with certified Ayurvedic doctors, featuring digital prescription management, real-time dosage scheduling, and personalized herbal remedy algorithms.
                  </p>
                </div>

                {/* Project 4: High-Throughput Distributed Transaction Engine */}
                <div
                  className={`rounded-2xl border p-4 sm:p-5 ${
                    isLight
                      ? "bg-white border-slate-200 shadow-sm"
                      : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-sm sm:text-base">
                      Distributed Inventory &amp; Transaction Engine
                    </h3>
                    <span
                      className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full w-fit font-bold ${
                        isLight
                          ? "bg-violet-100 text-violet-800 border border-violet-300"
                          : "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                      }`}
                    >
                      Node.js • Express • PostgreSQL • MongoDB • Redis
                    </span>
                  </div>
                  <p className={`text-xs mt-2 leading-relaxed font-sans ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    High-concurrency microservice handling automated inventory settlements, ACID transactions, optimistic concurrency control, and JWT-authenticated role-based access control.
                  </p>
                </div>
              </div>
            </div>

            {/* 🏆 Verified Professional Certifications & Accreditations */}
            <div className="page-break-inside-avoid">
              <h2
                className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest mb-3 ${
                  isLight ? "text-emerald-800 font-extrabold" : "text-emerald-400"
                }`}
              >
                <Award className="h-3.5 w-3.5" /> Verified Industry Accreditations &amp; Certifications
              </h2>
              <div
                className={`rounded-2xl border p-4 sm:p-5 ${
                  isLight
                    ? "bg-white border-slate-200 shadow-sm"
                    : "bg-white/[0.02] border-white/10"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        MongoDB Certified: Data Modeling Path
                      </span>
                      <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                        Master Credential // ID: MDBwsxpdpul98
                      </span>
                    </div>
                    <p className="text-[11px] font-mono opacity-80">
                      Issued by MongoDB, Inc. (VP Raghu Viswanathan) • October 2026
                    </p>
                  </div>
                  <a
                    href="/certificates/mongodb-certifications.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-mono text-[10px] px-3 py-1.5 rounded-xl w-fit font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0 ${
                      isLight
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/40"
                    }`}
                  >
                    <span>View Official PDF (9 Proofs)</span>
                    <Download className="h-3 w-3" />
                  </a>
                </div>

                <p className={`text-xs mt-3 leading-relaxed font-sans ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                  Completed 8 comprehensive specialization modules in document schema design, anti-pattern mitigation, indexing strategies, data transformation pipelines, and relational-to-document database migrations:
                </p>

                {/* 8 Tracks Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 font-mono text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span>Advanced Schema Patterns &amp; Anti-patterns</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span>Schema Design Optimization</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span>Indexing Design Fundamentals</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span>Performance Tools and Techniques</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span>Relational to Document Model</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span>Fundamentals of Data Transformation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span>Schema Patterns and Anti-patterns</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span>CRUD Operations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 🏆 Honors, Contributions & Industry Experience */}
            <div className="page-break-inside-avoid">
              <h2
                className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest mb-2.5 ${
                  isLight ? "text-emerald-800 font-extrabold" : "text-emerald-400"
                }`}
              >
                <Award className="h-3.5 w-3.5" /> Industry Experience &amp; Contributions
              </h2>
              <div className="space-y-2.5">
                <div className={`p-3 rounded-xl border ${isLight ? "bg-white border-slate-200" : "bg-white/[0.02] border-white/10"}`}>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">Trainee Account Assistant — Liberty Motor Associates</span>
                    <span className="opacity-70 text-[10px]">May 2024 – July 2024</span>
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                    Assisted accounting teams in transaction logging, transactional reconciliation, structured numerical auditing, and spreadsheet automation.
                  </p>
                </div>
                <div className={`p-3 rounded-xl border ${isLight ? "bg-white border-slate-200" : "bg-white/[0.02] border-white/10"}`}>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">SLIIT Faculty of Computing Tech Community</span>
                    <span className="opacity-70 text-[10px]">2024 – Present</span>
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                    Active contributor to university technical workshops, open-source project development, and competitive programming hackathons.
                  </p>
                </div>
              </div>
            </div>

            {/* 🌐 Print & Digital Live Link Banner at Bottom of Sheet */}
            <div className={`p-4 rounded-2xl border text-center font-mono ${
              isLight ? "bg-cyan-50/80 border-cyan-200 text-cyan-900" : "bg-cyan-500/5 border-cyan-500/20 text-cyan-300"
            }`}>
              <div className="flex items-center justify-center gap-2 text-xs font-bold">
                <Globe className="h-4 w-4 text-cyan-500" />
                <span>INTERACTIVE DIGITAL PORTFOLIO &amp; REPOSITORIES</span>
              </div>
              <p className="text-[11px] mt-1 opacity-80">
                To inspect live interactive 3D demos, GitHub commits, and source code, visit:
              </p>
              <a
                href="https://sasiruliyanage.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 text-xs font-extrabold underline underline-offset-4 text-cyan-600 dark:text-cyan-300 hover:text-cyan-500"
              >
                https://sasiruliyanage.vercel.app/
              </a>
            </div>
          </div>

          {/* 🌟 Modal Footer Bar */}
          <div
            className={`resume-no-print border-t px-6 py-3 flex items-center justify-between font-mono text-xs shrink-0 ${
              isLight
                ? "bg-slate-100/95 border-slate-200 text-slate-600"
                : "bg-[#0b101a]/80 border-white/10 text-slate-400"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for Full-Stack Roles &amp; Internships</span>
            </div>
            <a
              href="https://sasiruliyanage.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline flex items-center gap-1 font-bold ${
                isLight ? "text-cyan-800" : "text-cyan-400"
              }`}
            >
              <span>sasiruliyanage.vercel.app</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
