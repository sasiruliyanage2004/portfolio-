import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Printer,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Sparkles,
  Award,
  CheckCircle2,
  Share2,
} from "lucide-react";

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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        data-lenis-prevent="true"
        className="fixed inset-0 z-[99999] flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.94, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.94, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          className="relative flex flex-col w-full max-w-4xl max-h-[90vh] rounded-3xl border border-cyan-500/30 bg-[#090d16]/98 dark:bg-[#090d16]/98 light-theme:bg-white text-slate-100 dark:text-slate-100 light-theme:text-slate-900 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_30px_rgba(6,182,212,0.25)] z-10 overflow-hidden"
        >
          <span className="border-beam" aria-hidden="true" />

          {/* 🌟 Modal Sticky Top Action Bar */}
          <div className="flex items-center justify-between border-b border-white/10 dark:border-white/10 light-theme:border-slate-200 px-4 sm:px-7 py-3.5 sm:py-4.5 bg-[#0b101a]/95 dark:bg-[#0b101a]/95 light-theme:bg-slate-50/95 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full p-[1.5px] bg-gradient-to-tr from-cyan-400 to-emerald-400 shrink-0">
                <img
                  src="/profile.png"
                  alt="Sasiru Liyanage"
                  className="h-full w-full rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = "/favicon.svg";
                  }}
                />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base tracking-tight font-mono">
                  Sasiru Liyanage <span className="text-cyan-400 font-normal text-xs sm:text-sm">· CV</span>
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
                  Full-Stack Software Engineer &amp; UI Architect
                </p>
              </div>
            </div>

            {/* Actions: Download, Print, Close */}
            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                download="Sasiru_Liyanage_CV.pdf"
                className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 px-3 py-1.5 font-mono text-xs font-bold text-cyan-300 hover:bg-cyan-500/25 transition-all cursor-pointer shadow-sm"
                title="Download PDF"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Download PDF</span>
              </a>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 dark:border-white/15 light-theme:border-slate-300 px-3 py-1.5 font-mono text-xs text-slate-300 dark:text-slate-300 light-theme:text-slate-700 hover:bg-white/10 transition-all cursor-pointer"
                title="Print Resume"
              >
                <Printer className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Print</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-white/10 dark:bg-white/10 light-theme:bg-slate-200 p-2 text-slate-400 dark:text-slate-400 light-theme:text-slate-600 hover:bg-white/20 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 📄 Scrollable Formatted Resume Sheet */}
          <div className="overflow-y-auto p-5 sm:p-8 space-y-7 overscroll-contain text-xs sm:text-sm font-body">
            {/* Header / Contact Overview */}
            <div className="border-b border-white/10 dark:border-white/10 light-theme:border-slate-200 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Sasiru Nethvidu Liyanage
                  </h1>
                  <p className="text-cyan-400 dark:text-cyan-400 light-theme:text-cyan-700 font-mono font-semibold text-xs sm:text-sm mt-1">
                    Full-Stack Software Engineer • Sri Lanka Institute of Information Technology (SLIIT)
                  </p>
                </div>
                <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 font-mono text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3 w-3 text-cyan-400" /> liyanagesasiru@gmail.com
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3 text-emerald-400" /> +94 71 57 00 953
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-indigo-400" /> Makola, Western Province, Sri Lanka
                  </span>
                </div>
              </div>
            </div>

            {/* 🎯 Executive Profile */}
            <div>
              <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2.5">
                <Sparkles className="h-3.5 w-3.5" /> Executive Summary
              </h2>
              <p className="text-slate-300 dark:text-slate-300 light-theme:text-slate-700 leading-relaxed font-normal">
                Results-driven 2nd-Year Software Engineering Undergraduate at SLIIT with deep expertise in modern full-stack web architecture, React 19, TypeScript, Python FastAPI, and high-performance WebGL/Canvas graphics. Experienced in architecting low-latency microservices, real-time WebSocket pipelines, and scalable cloud applications with clean code principles.
              </p>
            </div>

            {/* 🎓 Education */}
            <div>
              <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
                <GraduationCap className="h-3.5 w-3.5" /> Education
              </h2>
              <div className="rounded-2xl border border-white/10 dark:border-white/10 light-theme:border-slate-200 bg-white/[0.02] dark:bg-white/[0.02] light-theme:bg-slate-50/80 p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-bold text-sm sm:text-base text-slate-100 dark:text-slate-100 light-theme:text-slate-900">
                    BSc (Hons) in Information Technology — Software Engineering
                  </h3>
                  <span className="font-mono text-[11px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full w-fit">
                    2024 – Present (2nd Year)
                  </span>
                </div>
                <p className="text-slate-400 text-xs font-mono mt-1">
                  Sri Lanka Institute of Information Technology (SLIIT), Malabe
                </p>
                <p className="text-slate-300 dark:text-slate-300 light-theme:text-slate-600 text-xs mt-2.5 leading-relaxed">
                  Focus Areas: Data Structures &amp; Algorithms, Object-Oriented Software Engineering, Database Systems, Web Application Development, Computer Networks, and UI/UX Architecture.
                </p>
              </div>
            </div>

            {/* 💻 Core Technical Competencies */}
            <div>
              <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
                <Code2 className="h-3.5 w-3.5" /> Technical Skills &amp; Stack
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="rounded-xl border border-white/10 dark:border-white/10 light-theme:border-slate-200 bg-white/[0.02] p-3.5">
                  <span className="text-cyan-400 font-bold block mb-1.5">Frontend &amp; UI</span>
                  <p className="text-slate-300 dark:text-slate-300 light-theme:text-slate-700 font-sans text-xs">
                    React 19, TypeScript, JavaScript (ES6+), Next.js, Tailwind CSS v4, Framer Motion, HTML5 Canvas, Responsive Design.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 dark:border-white/10 light-theme:border-slate-200 bg-white/[0.02] p-3.5">
                  <span className="text-emerald-400 font-bold block mb-1.5">Backend &amp; Cloud</span>
                  <p className="text-slate-300 dark:text-slate-300 light-theme:text-slate-700 font-sans text-xs">
                    Node.js, Express.js, Python, FastAPI, MongoDB, PostgreSQL, RESTful APIs, WebSockets, Firebase.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 dark:border-white/10 light-theme:border-slate-200 bg-white/[0.02] p-3.5">
                  <span className="text-amber-400 font-bold block mb-1.5">DevOps &amp; Tools</span>
                  <p className="text-slate-300 dark:text-slate-300 light-theme:text-slate-700 font-sans text-xs">
                    Git, GitHub, Docker, Vite, Postman, Vercel, Linux/Bash, Figma.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 dark:border-white/10 light-theme:border-slate-200 bg-white/[0.02] p-3.5">
                  <span className="text-violet-400 font-bold block mb-1.5">Engineering Practices</span>
                  <p className="text-slate-300 dark:text-slate-300 light-theme:text-slate-700 font-sans text-xs">
                    Clean Architecture, Microservices, Performance Tuning (CWV), Agile/Scrum, CI/CD pipelines.
                  </p>
                </div>
              </div>
            </div>

            {/* 🚀 Featured Key Projects */}
            <div>
              <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
                <Briefcase className="h-3.5 w-3.5" /> Featured Engineering Projects
              </h2>
              <div className="space-y-3">
                {/* Project 1 */}
                <div className="rounded-2xl border border-white/10 dark:border-white/10 light-theme:border-slate-200 bg-white/[0.02] p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-100 dark:text-slate-100 light-theme:text-slate-900">
                      AI Suspicious Activity &amp; Weapon Detection System
                    </h3>
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full w-fit">
                      FastAPI • YOLOv11 • WebSockets • React
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 dark:text-slate-300 light-theme:text-slate-600 mt-2 leading-relaxed font-sans">
                    Enterprise autonomous computer vision surveillance pipeline detecting weapons and abnormal aggressive behaviors in real-time with sub-30ms latency over WebSockets.
                  </p>
                </div>

                {/* Project 2 */}
                <div className="rounded-2xl border border-white/10 dark:border-white/10 light-theme:border-slate-200 bg-white/[0.02] p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-sm sm:text-base text-slate-100 dark:text-slate-100 light-theme:text-slate-900">
                      AyurLife — Ayurvedic Healthcare Companion
                    </h3>
                    <span className="font-mono text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full w-fit">
                      Flutter • Firebase • Health Telemetry
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 dark:text-slate-300 light-theme:text-slate-600 mt-2 leading-relaxed font-sans">
                    Mobile healthcare application connecting patients with registered Ayurvedic doctors, real-time dosage scheduling, and personalized herbal remedies.
                  </p>
                </div>
              </div>
            </div>

            {/* 🏆 Honors & Activities */}
            <div>
              <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2.5">
                <Award className="h-3.5 w-3.5" /> Extracurriculars &amp; Contributions
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-300 dark:text-slate-300 light-theme:text-slate-600 font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  Active open-source contributor &amp; participant in university algorithmic hackathons.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  SLIIT Faculty of Computing Tech Community &amp; Workshop delegate.
                </li>
              </ul>
            </div>
          </div>

          {/* 🌟 Footer Bar */}
          <div className="border-t border-white/10 dark:border-white/10 light-theme:border-slate-200 px-6 py-3 bg-[#0b101a]/80 dark:bg-[#0b101a]/80 light-theme:bg-slate-50 flex items-center justify-between text-slate-400 font-mono text-xs">
            <span>Available for Full-Stack Roles &amp; Internships</span>
            <span className="text-cyan-400 font-bold">2026 Ready</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
