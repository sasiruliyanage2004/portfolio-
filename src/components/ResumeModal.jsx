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
  Calendar,
  Layers,
  Zap,
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
        className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-5 md:p-6 bg-black/80 backdrop-blur-2xl overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.94, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.94, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          className={`relative flex flex-col w-full max-w-4xl max-h-[94vh] rounded-3xl border shadow-2xl z-10 overflow-hidden ${
            isLight
              ? "bg-[#ffffff] text-slate-900 border-slate-300 shadow-[0_25px_70px_rgba(15,23,42,0.25)]"
              : "bg-[#0b101d] text-[#F8FAFC] border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.95)]"
          }`}
        >
          <span className="border-beam resume-no-print" aria-hidden="true" />

          {/* 🌟 Modal Sticky Top Action Bar (Web Controls) */}
          <div
            className={`resume-no-print flex items-center justify-between border-b px-4 sm:px-6 py-3 backdrop-blur-md shrink-0 ${
              isLight
                ? "bg-white/95 border-slate-200 text-slate-900"
                : "bg-[#080d1a]/95 border-white/10 text-white"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                Official Curriculum Vitae (A4 Executive Format)
              </span>
            </div>

            {/* Actions: Download PDF, Print / Save PDF, Close */}
            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                download="Sasiru_Liyanage_CV.pdf"
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-xs font-bold transition-all cursor-pointer shadow-sm bg-cyan-600 text-white hover:bg-cyan-700 shadow-md"
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
                    ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
                }`}
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 📄 Scrollable Executive 2-Column Designer Sheet */}
          <div className="resume-printable-sheet overflow-y-auto overscroll-contain flex-1">
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-full">
              
              {/* ========================================================= */}
              {/* 🎨 LEFT COLUMN: PROFILE, EDUCATION, SKILLS, CONTACT       */}
              {/* ========================================================= */}
              <div
                className={`md:col-span-4 p-6 sm:p-7 space-y-6 flex flex-col justify-between border-r ${
                  isLight
                    ? "bg-[#e8e6e1] border-slate-300 text-slate-800"
                    : "bg-[#0d1424] border-white/10 text-slate-200"
                }`}
              >
                <div>
                  {/* Arched Portrait Headshot */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative w-36 h-44 sm:w-40 sm:h-48 rounded-t-full rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-slate-400/30 to-transparent shadow-xl">
                      <img
                        src="/profile.png"
                        alt="Sasiru Liyanage"
                        className="w-full h-full object-cover rounded-t-full rounded-b-xl"
                        onError={(e) => {
                          e.target.src = "/favicon.svg";
                        }}
                      />
                    </div>
                  </div>

                  {/* Section: Education */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="font-extrabold font-mono text-xs uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                        EDUCATION
                      </h4>
                      <div className="flex-1 h-[1.5px] bg-slate-400/60 dark:bg-white/20" />
                    </div>

                    <div className="space-y-3.5 text-xs">
                      <div>
                        <span className="font-mono text-[10px] font-semibold text-slate-600 dark:text-slate-400 block">
                          2024 — 2028 (Expected) • 3rd Year
                        </span>
                        <h5 className="font-bold text-xs leading-snug text-slate-900 dark:text-white">
                          BSc (Hons) in Information Technology
                        </h5>
                        <p className="font-medium text-[11px] text-cyan-800 dark:text-cyan-400">
                          SLIIT, Malabe
                        </p>
                        <ul className="list-disc list-inside text-[10.5px] text-slate-600 dark:text-slate-300 mt-1 space-y-0.5">
                          <li>Full-Stack Software Engineering</li>
                          <li>OOP (Java), DBMS (MySQL, MongoDB)</li>
                          <li>Advanced DSA &amp; Computer Networks</li>
                        </ul>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] font-semibold text-slate-600 dark:text-slate-400 block">
                          2023 — 2024
                        </span>
                        <h5 className="font-bold text-xs leading-snug text-slate-900 dark:text-white">
                          GCE Advanced Level (Commerce)
                        </h5>
                        <p className="font-medium text-[11px] text-slate-700 dark:text-slate-300">
                          Gurukula College, Kelaniya
                        </p>
                        <p className="text-[10.5px] text-slate-600 dark:text-slate-400 mt-0.5">
                          Accounting (A Distinction) • Business Studies (B) • Economics (B)
                        </p>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] font-semibold text-slate-600 dark:text-slate-400 block">
                          2020 — 2021
                        </span>
                        <h5 className="font-bold text-xs leading-snug text-slate-900 dark:text-white">
                          GCE Ordinary Level Examination
                        </h5>
                        <p className="text-[10.5px] text-slate-600 dark:text-slate-400">
                          Mathematics: A Distinction • 9 Distinctions
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section: Technical Skills */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="font-extrabold font-mono text-xs uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                        TECHNICAL SKILLS
                      </h4>
                      <div className="flex-1 h-[1.5px] bg-slate-400/60 dark:bg-white/20" />
                    </div>

                    <div className="space-y-2.5 text-xs font-mono">
                      <div>
                        <span className="font-bold text-[10px] uppercase text-cyan-800 dark:text-cyan-400 block mb-1">
                          Languages
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {["JavaScript", "TypeScript", "Python", "Java", "C", "SQL"].map((lang) => (
                            <span key={lang} className="px-1.5 py-0.5 rounded bg-white/70 dark:bg-white/10 text-[10px] font-semibold border border-slate-300 dark:border-white/15">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-[10px] uppercase text-emerald-800 dark:text-emerald-400 block mb-1">
                          Web &amp; Mobile
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {["React 19", "Next.js", "Node.js", "FastAPI", "Tailwind v4", "Flutter", "WebSockets"].map((fw) => (
                            <span key={fw} className="px-1.5 py-0.5 rounded bg-white/70 dark:bg-white/10 text-[10px] font-semibold border border-slate-300 dark:border-white/15">
                              {fw}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-[10px] uppercase text-indigo-800 dark:text-indigo-400 block mb-1">
                          Databases &amp; AI
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {["MongoDB", "PostgreSQL", "MySQL", "YOLOv11", "OpenCV", "Redis"].map((db) => (
                            <span key={db} className="px-1.5 py-0.5 rounded bg-white/70 dark:bg-white/10 text-[10px] font-semibold border border-slate-300 dark:border-white/15">
                              {db}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section: Core Strengths */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2.5">
                      <h4 className="font-extrabold font-mono text-xs uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                        CORE STRENGTHS
                      </h4>
                      <div className="flex-1 h-[1.5px] bg-slate-400/60 dark:bg-white/20" />
                    </div>
                    <ul className="list-disc list-inside text-[11px] space-y-1 text-slate-700 dark:text-slate-300 font-sans">
                      <li>Analytical Problem Solving &amp; DSA</li>
                      <li>Real-time WebSockets &amp; Computer Vision</li>
                      <li>High-concurrency Microservices</li>
                      <li>Clean Code &amp; Test-Driven Architecture</li>
                      <li>Agile / Scrum Sprint Leadership</li>
                    </ul>
                  </div>

                  {/* Section: Contact & Online Web Presence */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="font-extrabold font-mono text-xs uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                        CONTACT DETAILS
                      </h4>
                      <div className="flex-1 h-[1.5px] bg-slate-400/60 dark:bg-white/20" />
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      {/* Live Portfolio Web Link */}
                      <a
                        href="https://sasiruliyanage.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-bold text-cyan-800 dark:text-cyan-400 hover:underline break-all"
                      >
                        <Globe className="h-3.5 w-3.5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                        <span>sasiruliyanage.vercel.app</span>
                      </a>

                      <a
                        href="tel:+94715700953"
                        className="flex items-center gap-2 hover:text-cyan-600 transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span>+94 71 57 00 953</span>
                      </a>

                      <a
                        href="mailto:liyanagesasiru@gmail.com"
                        className="flex items-center gap-2 hover:text-cyan-600 transition-colors break-all"
                      >
                        <Mail className="h-3.5 w-3.5 shrink-0 text-indigo-600" />
                        <span>liyanagesasiru@gmail.com</span>
                      </a>

                      <a
                        href="https://github.com/sasiruliyanage2004"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-cyan-600 transition-colors"
                      >
                        <GithubIcon className="h-3.5 w-3.5 shrink-0" />
                        <span>github.com/sasiruliyanage2004</span>
                      </a>

                      <a
                        href="https://www.linkedin.com/in/sasiruliyanage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-cyan-600 transition-colors"
                      >
                        <LinkedinIcon className="h-3.5 w-3.5 shrink-0 text-blue-600" />
                        <span>linkedin.com/in/sasiruliyanage</span>
                      </a>

                      <div className="flex items-start gap-2 opacity-80 text-[10.5px]">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-500 mt-0.5" />
                        <span>96/2 Makola South, Makola, Sri Lanka</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* 💼 RIGHT COLUMN: HEADER BANNER, PROFILE, EXPERIENCE,      */}
              {/*    PROJECTS, CERTIFICATIONS & ACHIEVEMENTS                */}
              {/* ========================================================= */}
              <div className="md:col-span-8 flex flex-col">
                
                {/* 🌟 Top Dark Charcoal Banner (Like Jonathan Patterson in Image 2) */}
                <div
                  className={`p-6 sm:p-8 flex flex-col justify-center ${
                    isLight ? "bg-[#33353b] text-white" : "bg-[#090d16] text-white border-b border-white/10"
                  }`}
                >
                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase font-sans">
                    SASIRU NETHVIDU LIYANAGE
                  </h1>
                  <p className="mt-1 font-mono text-xs sm:text-sm font-semibold tracking-wider text-cyan-300">
                    FULL-STACK SOFTWARE ENGINEER • COMPUTER VISION &amp; AI ARCHITECT
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-[11px] font-mono opacity-80">
                    <span>SLIIT 3rd Year</span>
                    <span>•</span>
                    <a
                      href="https://sasiruliyanage.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 text-cyan-300 font-bold hover:text-cyan-200"
                    >
                      🌐 sasiruliyanage.vercel.app
                    </a>
                  </div>
                </div>

                {/* Right Body Content */}
                <div className="p-6 sm:p-8 space-y-6 flex-1 text-xs sm:text-sm">
                  
                  {/* 1. Profile Info (Executive Summary) */}
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <h3 className="font-extrabold font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                        PROFILE INFO
                      </h3>
                      <div className="flex-1 h-[1.5px] bg-slate-300 dark:bg-white/20" />
                    </div>
                    <p className={`leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                      Analytical 3rd-Year Information Technology Undergraduate at SLIIT specializing in Full-Stack Web Architectures, Real-Time Computer Vision (YOLOv11), and distributed systems. MongoDB Certified Data Modeler with deep experience architecting sub-30ms WebSocket pipelines, low-latency microservices, and cyber-minimalist UI/UX. Passionate about building high-impact production software with zero compromises on performance and code quality.
                    </p>
                  </div>

                  {/* 2. Work Experience (Vertical Timeline with Nodes from Image 2) */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="font-extrabold font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                        WORK EXPERIENCE
                      </h3>
                      <div className="flex-1 h-[1.5px] bg-slate-300 dark:bg-white/20" />
                    </div>

                    <div className="relative pl-6 space-y-5 border-l-2 border-slate-300 dark:border-white/20 ml-2">
                      {/* Experience Node 1 */}
                      <div className="relative">
                        <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-cyan-500 bg-white dark:bg-[#0b101d]" />
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wide">
                            Software Engineering Intern
                          </h4>
                          <span className="font-mono text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                            Jun 2026 — Present
                          </span>
                        </div>
                        <p className="font-mono text-[11px] font-semibold text-cyan-800 dark:text-cyan-400 mb-1">
                          Multi Talent Technology
                        </p>
                        <ul className={`list-disc list-inside text-xs space-y-0.5 leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                          <li>Developing production-ready web solutions with React, Node.js, and modern tech stacks.</li>
                          <li>Collaborating with engineering teams on database workflows, REST APIs, and UI architecture.</li>
                        </ul>
                      </div>

                      {/* Experience Node 2 */}
                      <div className="relative">
                        <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-slate-400 bg-white dark:bg-[#0b101d]" />
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase tracking-wide">
                            Trainee Account Assistant
                          </h4>
                          <span className="font-mono text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                            May 2024 — Jul 2024
                          </span>
                        </div>
                        <p className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-400 mb-1">
                          Liberty Motor Associates
                        </p>
                        <ul className={`list-disc list-inside text-xs space-y-0.5 leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                          <li>Audited daily transactional records and conducted digital financial reconciliations.</li>
                          <li>Implemented automated spreadsheet records for billing, inventory, and ledger accuracy.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 3. Technical Projects (Clean Showcase from Image 1 & 2) */}
                  <div>
                    <div className="flex items-center gap-3 mb-3.5">
                      <h3 className="font-extrabold font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                        TECHNICAL PROJECTS
                      </h3>
                      <div className="flex-1 h-[1.5px] bg-slate-300 dark:bg-white/20" />
                    </div>

                    <div className="space-y-3">
                      {/* Project 1 */}
                      <div className={`p-3.5 rounded-xl border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/10"}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            AI Suspicious Activity &amp; Weapon Detection
                          </h4>
                          <span className="font-mono text-[10px] font-bold text-cyan-800 dark:text-cyan-400">
                            YOLOv11 • FASTAPI • WEBSOCKETS
                          </span>
                        </div>
                        <p className={`text-xs mt-1 leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                          Real-time computer vision security pipeline detecting weapons (guns, knives) and aggressive behavioral anomalies over live PTZ feeds with &lt;30ms latency.
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1.5 font-mono text-[9.5px]">
                          {["Python", "YOLOv11", "FastAPI", "React 19", "OpenCV", "WebSockets"].map((t) => (
                            <span key={t} className="px-1.5 py-0.5 rounded bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 font-semibold">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project 2 */}
                      <div className={`p-3.5 rounded-xl border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/10"}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                              Interactive Cyber-Portfolio &amp; Cultural Engine
                            </h4>
                            <a
                              href="https://sasiruliyanage.vercel.app/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-700 dark:text-cyan-400 hover:underline font-mono text-[10px] flex items-center gap-0.5"
                            >
                              <ExternalLink className="h-2.5 w-2.5" />
                              <span>Live</span>
                            </a>
                          </div>
                          <span className="font-mono text-[10px] font-bold text-emerald-800 dark:text-emerald-400">
                            REACT 19 • VITE • TAILWIND V4
                          </span>
                        </div>
                        <p className={`text-xs mt-1 leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                          Ultra-fast personal portfolio with WebGL canvas, mathematical particle physics, bilingual SEO, and 98+ Lighthouse scores across Core Web Vitals.
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1.5 font-mono text-[9.5px]">
                          {["React 19", "Vite", "Tailwind v4", "WebGL", "Framer Motion", "SEO"].map((t) => (
                            <span key={t} className="px-1.5 py-0.5 rounded bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 font-semibold">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project 3 */}
                      <div className={`p-3.5 rounded-xl border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/10"}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            AyurLife: Integrated Ayurvedic Healthcare Ecosystem
                          </h4>
                          <span className="font-mono text-[10px] font-bold text-indigo-800 dark:text-indigo-400">
                            FULL-STACK • MERN • FLUTTER
                          </span>
                        </div>
                        <p className={`text-xs mt-1 leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                          Full-admin healthcare portal &amp; mobile app with diagnostic search, doctor booking, and herbal inventory knowledge base management.
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1.5 font-mono text-[9.5px]">
                          {["Flutter", "React Native", "Node.js", "Express", "MongoDB", "Firebase"].map((t) => (
                            <span key={t} className="px-1.5 py-0.5 rounded bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 font-semibold">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. Verified Industry Certifications (MongoDB) */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-extrabold font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                        VERIFIED INDUSTRY CERTIFICATIONS
                      </h3>
                      <div className="flex-1 h-[1.5px] bg-slate-300 dark:bg-white/20" />
                    </div>

                    <div className={`p-3.5 rounded-xl border ${isLight ? "bg-emerald-50/60 border-emerald-300" : "bg-emerald-500/5 border-emerald-500/20"}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>MongoDB Certified: Data Modeling Path</span>
                          </h4>
                          <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400">
                            Issued by MongoDB, Inc. • Oct 2026 • Credential ID: MDBwsxpdpul98
                          </span>
                        </div>
                        <a
                          href="/certificates/mongodb-certifications.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-400 underline underline-offset-2 flex items-center gap-1 w-fit"
                        >
                          <Download className="h-3 w-3" />
                          <span>View Official PDF (9 Proofs)</span>
                        </a>
                      </div>
                      <p className={`text-[11px] mt-1.5 leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                        Completed 8 specialized modules: Schema Design Optimization, Advanced Schema Anti-patterns, Indexing Fundamentals, Performance Tools, Relational to Document Model, Data Transformation, Schema Patterns, and CRUD Operations.
                      </p>
                    </div>
                  </div>

                  {/* 5. Achievements & Extracurriculars */}
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <h3 className="font-extrabold font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                        ACHIEVEMENTS &amp; CONTRIBUTIONS
                      </h3>
                      <div className="flex-1 h-[1.5px] bg-slate-300 dark:bg-white/20" />
                    </div>
                    <ul className={`list-disc list-inside text-xs space-y-1 ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                      <li>Active contributor to university technical workshops and competitive algorithmic hackathons at SLIIT.</li>
                      <li>Selected member of SLIIT Faculty of Computing Tech Community &amp; open-source research projects.</li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
