import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Printer,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  Sparkles,
  Award,
  CheckCircle2,
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
          className={`relative flex flex-col w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl z-10 overflow-hidden ${
            isLight
              ? "bg-[#faf9f6] text-slate-900 border-slate-300 shadow-[0_25px_70px_rgba(15,23,42,0.25)]"
              : "bg-[#090d16]/98 text-slate-100 border-cyan-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_30px_rgba(6,182,212,0.2)]"
          }`}
        >
          <span className="border-beam" aria-hidden="true" />

          {/* 🌟 Modal Sticky Top Action Bar */}
          <div
            className={`flex items-center justify-between border-b px-4 sm:px-7 py-3.5 sm:py-4 backdrop-blur-md shrink-0 ${
              isLight
                ? "bg-white/95 border-slate-200 text-slate-900"
                : "bg-[#0b101a]/95 border-white/10 text-white"
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
                    · CV
                  </span>
                </h3>
                <p className="text-[10px] sm:text-xs opacity-70 font-mono">
                  Full-Stack Software Engineer &amp; UI Architect
                </p>
              </div>
            </div>

            {/* Actions: Download, Print, Close */}
            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                download="Sasiru_Liyanage_CV.pdf"
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-xs font-bold transition-all cursor-pointer shadow-sm ${
                  isLight
                    ? "bg-cyan-600 text-white hover:bg-cyan-700 shadow-md"
                    : "bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25"
                }`}
                title="Download PDF"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Download PDF</span>
              </a>

              <button
                type="button"
                onClick={handlePrint}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-xs transition-all cursor-pointer ${
                  isLight
                    ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                    : "border-white/15 text-slate-300 hover:bg-white/10"
                }`}
                title="Print Resume"
              >
                <Printer className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Print</span>
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
          <div className="overflow-y-auto p-5 sm:p-8 space-y-7 overscroll-contain text-xs sm:text-sm">
            {/* Header / Contact Overview */}
            <div className={`border-b pb-6 ${isLight ? "border-slate-200" : "border-white/10"}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Sasiru Nethvidu Liyanage
                  </h1>
                  <p
                    className={`font-mono font-semibold text-xs sm:text-sm mt-1 ${
                      isLight ? "text-cyan-700 font-bold" : "text-cyan-400"
                    }`}
                  >
                    Full-Stack Software Engineer • Sri Lanka Institute of Information Technology (SLIIT)
                  </p>
                </div>
                <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 font-mono text-[11px] opacity-80">
                  <span className="flex items-center gap-1.5">
                    <Mail className={`h-3 w-3 ${isLight ? "text-cyan-700" : "text-cyan-400"}`} />{" "}
                    liyanagesasiru@gmail.com
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className={`h-3 w-3 ${isLight ? "text-emerald-700" : "text-emerald-400"}`} />{" "}
                    +94 71 57 00 953
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className={`h-3 w-3 ${isLight ? "text-indigo-700" : "text-indigo-400"}`} />{" "}
                    Makola, Western Province, Sri Lanka
                  </span>
                </div>
              </div>
            </div>

            {/* 🎯 Executive Summary */}
            <div>
              <h2
                className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest mb-2.5 ${
                  isLight ? "text-cyan-800 font-extrabold" : "text-cyan-400"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" /> Executive Summary
              </h2>
              <p className={`leading-relaxed font-normal ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                Results-driven 2nd-Year Software Engineering Undergraduate at SLIIT with deep expertise in modern full-stack web architecture, React 19, TypeScript, Python FastAPI, and high-performance WebGL/Canvas graphics. Experienced in architecting low-latency microservices, real-time WebSocket pipelines, and scalable cloud applications with clean code principles.
              </p>
            </div>

            {/* 🎓 Education */}
            <div>
              <h2
                className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest mb-3 ${
                  isLight ? "text-emerald-800 font-extrabold" : "text-emerald-400"
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" /> Education
              </h2>
              <div
                className={`rounded-2xl border p-4 sm:p-5 ${
                  isLight
                    ? "bg-white border-slate-200 shadow-sm text-slate-900"
                    : "bg-white/[0.02] border-white/10 text-slate-100"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-bold text-sm sm:text-base">
                    BSc (Hons) in Information Technology — Software Engineering
                  </h3>
                  <span
                    className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full w-fit font-semibold ${
                      isLight
                        ? "bg-cyan-100 text-cyan-800 border border-cyan-300"
                        : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    }`}
                  >
                    2024 – Present (2nd Year)
                  </span>
                </div>
                <p className="opacity-75 text-xs font-mono mt-1">
                  Sri Lanka Institute of Information Technology (SLIIT), Malabe
                </p>
                <p className={`text-xs mt-2.5 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                  Focus Areas: Data Structures &amp; Algorithms, Object-Oriented Software Engineering, Database Systems, Web Application Development, Computer Networks, and UI/UX Architecture.
                </p>
              </div>
            </div>

            {/* 💻 Core Technical Competencies */}
            <div>
              <h2
                className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest mb-3 ${
                  isLight ? "text-indigo-800 font-extrabold" : "text-indigo-400"
                }`}
              >
                <Code2 className="h-3.5 w-3.5" /> Technical Skills &amp; Stack
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
                    Frontend &amp; UI
                  </span>
                  <p className={`font-sans text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    React 19, TypeScript, JavaScript (ES6+), Next.js, Tailwind CSS v4, Framer Motion, HTML5 Canvas, Responsive Design.
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
                    Backend &amp; Cloud
                  </span>
                  <p className={`font-sans text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    Node.js, Express.js, Python, FastAPI, MongoDB, PostgreSQL, RESTful APIs, WebSockets, Firebase.
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
                    DevOps &amp; Tools
                  </span>
                  <p className={`font-sans text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    Git, GitHub, Docker, Vite, Postman, Vercel, Linux/Bash, Figma.
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
                    Engineering Practices
                  </span>
                  <p className={`font-sans text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    Clean Architecture, Microservices, Performance Tuning (CWV), Agile/Scrum, CI/CD pipelines.
                  </p>
                </div>
              </div>
            </div>

            {/* 🚀 Featured Key Projects */}
            <div>
              <h2
                className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest mb-3 ${
                  isLight ? "text-cyan-800 font-extrabold" : "text-cyan-400"
                }`}
              >
                <Briefcase className="h-3.5 w-3.5" /> Featured Engineering Projects
              </h2>
              <div className="space-y-3">
                {/* Project 1 */}
                <div
                  className={`rounded-2xl border p-4 sm:p-5 ${
                    isLight
                      ? "bg-white border-slate-200 shadow-sm"
                      : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-sm sm:text-base">
                      AI Suspicious Activity &amp; Weapon Detection System
                    </h3>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-full w-fit font-semibold ${
                        isLight
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      FastAPI • YOLOv11 • WebSockets • React
                    </span>
                  </div>
                  <p className={`text-xs mt-2 leading-relaxed font-sans ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    Enterprise autonomous computer vision surveillance pipeline detecting weapons and abnormal aggressive behaviors in real-time with sub-30ms latency over WebSockets.
                  </p>
                </div>

                {/* Project 2 */}
                <div
                  className={`rounded-2xl border p-4 sm:p-5 ${
                    isLight
                      ? "bg-white border-slate-200 shadow-sm"
                      : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-sm sm:text-base">
                      AyurLife — Ayurvedic Healthcare Companion
                    </h3>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-full w-fit font-semibold ${
                        isLight
                          ? "bg-cyan-100 text-cyan-800 border border-cyan-300"
                          : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      }`}
                    >
                      Flutter • Firebase • Health Telemetry
                    </span>
                  </div>
                  <p className={`text-xs mt-2 leading-relaxed font-sans ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    Mobile healthcare application connecting patients with registered Ayurvedic doctors, real-time dosage scheduling, and personalized herbal remedies.
                  </p>
                </div>
              </div>
            </div>

            {/* 🏆 Honors & Activities */}
            <div>
              <h2
                className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest mb-2.5 ${
                  isLight ? "text-emerald-800 font-extrabold" : "text-emerald-400"
                }`}
              >
                <Award className="h-3.5 w-3.5" /> Extracurriculars &amp; Contributions
              </h2>
              <ul className={`space-y-1.5 text-xs font-sans ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${isLight ? "text-emerald-600" : "text-emerald-400"}`} />
                  Active open-source contributor &amp; participant in university algorithmic hackathons.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${isLight ? "text-emerald-600" : "text-emerald-400"}`} />
                  SLIIT Faculty of Computing Tech Community &amp; Workshop delegate.
                </li>
              </ul>
            </div>
          </div>

          {/* 🌟 Footer Bar */}
          <div
            className={`border-t px-6 py-3 flex items-center justify-between font-mono text-xs ${
              isLight
                ? "bg-slate-100/95 border-slate-200 text-slate-600"
                : "bg-[#0b101a]/80 border-white/10 text-slate-400"
            }`}
          >
            <span>Available for Full-Stack Roles &amp; Internships</span>
            <span className={isLight ? "text-cyan-800 font-bold" : "text-cyan-400 font-bold"}>
              2026 Ready
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
