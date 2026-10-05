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
} from "lucide-react";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
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
        className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-5 md:p-6 bg-black/85 backdrop-blur-2xl overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.94, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.94, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          className="relative flex flex-col w-full max-w-4xl max-h-[94vh] rounded-3xl border border-stone-400/40 shadow-2xl z-10 overflow-hidden bg-[#ffffff] text-[#2b2927]"
        >
          {/* 🌟 Modal Sticky Top Action Bar (Web Controls) */}
          <div className="resume-no-print flex items-center justify-between border-b px-4 sm:px-6 py-3 bg-[#2d2c29] text-white shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-amber-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-200">
                Curriculum Vitae • Executive Stone Template
              </span>
            </div>

            {/* Actions: Download PDF, Print / Save PDF, Close */}
            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                download="Sasiru_Liyanage_CV.pdf"
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-xs font-bold transition-all cursor-pointer shadow-sm bg-[#5d5953] hover:bg-[#4d4944] text-white border border-white/20"
                title="Download Official PDF Document"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Download PDF</span>
              </a>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 font-mono text-xs font-bold text-white hover:bg-white/20 transition-all cursor-pointer"
                title="Print or Save as High-Res PDF"
              >
                <Printer className="h-3.5 w-3.5 text-stone-300" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 📄 Scrollable Executive 2-Column Designer Sheet (Matching Jonathan Patterson Image 2) */}
          <div className="resume-printable-sheet overflow-y-auto overscroll-contain flex-1 relative bg-white">
            
            {/* Top dark charcoal background behind sidebar arch on desktop */}
            <div className="hidden md:block absolute top-0 left-0 right-0 h-[72mm] bg-[#5d5953] z-0 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 min-h-full relative z-10">
              
              {/* ========================================================= */}
              {/* 🎨 LEFT COLUMN: PROFILE, EDUCATION, SKILLS, CONTACT       */}
              {/* ========================================================= */}
              <div className="md:col-span-4 bg-[#d5d2cc] text-[#2b2927] p-5 sm:p-6 space-y-5 flex flex-col md:rounded-t-[80px] md:mt-3 md:ml-3 md:mb-3 shadow-sm border border-[#c4c0b8]">
                
                {/* Arched Portrait Headshot with Thick White Border */}
                <div className="flex flex-col items-center mt-2 mb-3">
                  <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-[6px] border-white shadow-xl bg-[#5d5953]">
                    <img
                      src="/profile.png"
                      alt="Sasiru Liyanage"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/favicon.svg";
                      }}
                    />
                  </div>
                </div>

                {/* Section: Education */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <h4 className="font-extrabold font-sans text-xs uppercase tracking-[0.16em] text-[#2b2927]">
                      EDUCATION
                    </h4>
                    <div className="flex-1 h-[1.5px] bg-[#8c8881]" />
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <span className="text-[9.5px] text-[#4f4c47] font-medium block">
                        2024 — 2028 (Expected)
                      </span>
                      <h5 className="font-extrabold text-[10.5px] uppercase text-[#2b2927] leading-snug">
                        BSc (Hons) in Information Tech.
                      </h5>
                      <p className="font-bold text-[10px] uppercase text-[#3b3935]">
                        SLIIT, Malabe • 3rd Year
                      </p>
                      <ul className="list-disc list-inside text-[9.5px] text-[#4f4c47] mt-0.5 space-y-0.5">
                        <li>Software Engineering Specialization</li>
                        <li>OOP (Java), DBMS (MySQL, MongoDB), DSA</li>
                      </ul>
                    </div>

                    <div>
                      <span className="text-[9.5px] text-[#4f4c47] font-medium block">
                        2023 — 2024
                      </span>
                      <h5 className="font-extrabold text-[10.5px] uppercase text-[#2b2927]">
                        GCE Advanced Level (Commerce)
                      </h5>
                      <p className="font-bold text-[10px] uppercase text-[#3b3935]">
                        Gurukula College, Kelaniya
                      </p>
                      <p className="text-[9.5px] text-[#4f4c47]">
                        Accounting: A | Business: B | Econ: B
                      </p>
                    </div>

                    <div>
                      <span className="text-[9.5px] text-[#4f4c47] font-medium block">
                        2020 — 2021
                      </span>
                      <h5 className="font-extrabold text-[10.5px] uppercase text-[#2b2927]">
                        GCE Ordinary Level Examination
                      </h5>
                      <p className="text-[9.5px] text-[#4f4c47]">
                        Mathematics: A Distinction • 9 Distinctions
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section: Skills (Bulleted Clean Style) */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-extrabold font-sans text-xs uppercase tracking-[0.16em] text-[#2b2927]">
                      SKILLS
                    </h4>
                    <div className="flex-1 h-[1.5px] bg-[#8c8881]" />
                  </div>

                  <ul className="list-disc list-inside text-[10px] space-y-1 text-[#2b2927] font-medium leading-snug">
                    <li>React 19, Next.js &amp; Tailwind v4</li>
                    <li>TypeScript &amp; JavaScript (ES2024)</li>
                    <li>Python, FastAPI &amp; YOLOv11</li>
                    <li>Node.js &amp; Express Microservices</li>
                    <li>MongoDB (Certified) &amp; PostgreSQL</li>
                    <li>Real-time WebSockets &amp; Canvas</li>
                    <li>Docker, Git &amp; CI/CD Pipelines</li>
                    <li>Clean Architecture &amp; Unit Testing</li>
                  </ul>
                </div>

                {/* Section: Attributes */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-extrabold font-sans text-xs uppercase tracking-[0.16em] text-[#2b2927]">
                      ATTRIBUTES
                    </h4>
                    <div className="flex-1 h-[1.5px] bg-[#8c8881]" />
                  </div>

                  <ul className="list-disc list-inside text-[10px] space-y-1 text-[#2b2927] font-medium leading-snug">
                    <li>Analytical Problem Solving &amp; DSA</li>
                    <li>High-Concurrency Architecture</li>
                    <li>Agile / Scrum Sprint Leadership</li>
                    <li>English (Professional Working)</li>
                    <li>Sinhala (Native)</li>
                  </ul>
                </div>

                {/* Section: Contact */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <h4 className="font-extrabold font-sans text-xs uppercase tracking-[0.16em] text-[#2b2927]">
                      CONTACT
                    </h4>
                    <div className="flex-1 h-[1.5px] bg-[#8c8881]" />
                  </div>

                  <div className="space-y-1.5 text-[10px] font-medium">
                    <a
                      href="tel:+94715700953"
                      className="flex items-center gap-2 text-[#2b2927] hover:underline"
                    >
                      <Phone className="h-3 w-3 shrink-0" />
                      <span>+94 71 57 00 953</span>
                    </a>

                    <a
                      href="mailto:liyanagesasiru@gmail.com"
                      className="flex items-center gap-2 text-[#2b2927] hover:underline break-all"
                    >
                      <Mail className="h-3 w-3 shrink-0" />
                      <span>liyanagesasiru@gmail.com</span>
                    </a>

                    <div className="flex items-center gap-2 text-[#2b2927]">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span>Makola, Western Province, Sri Lanka</span>
                    </div>

                    {/* Live Website Portfolio Link */}
                    <a
                      href="https://sasiruliyanage.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-bold text-[#1a1918] hover:underline break-all"
                    >
                      <Globe className="h-3 w-3 shrink-0" />
                      <span>www.sasiruliyanage.vercel.app</span>
                    </a>

                    <a
                      href="https://github.com/sasiruliyanage2004"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#2b2927] hover:underline"
                    >
                      <GithubIcon className="h-3 w-3 shrink-0" />
                      <span>github.com/sasiruliyanage2004</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/sasiruliyanage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#2b2927] hover:underline"
                    >
                      <LinkedinIcon className="h-3 w-3 shrink-0" />
                      <span>linkedin.com/in/sasiruliyanage</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* ========================================================= */}
              {/* 💼 RIGHT COLUMN: HEADER BANNER, PROFILE, EXPERIENCE,      */}
              {/*    PROJECTS, ACHIEVEMENTS (Jonathan Patterson Layout)     */}
              {/* ========================================================= */}
              <div className="md:col-span-8 flex flex-col bg-white">
                
                {/* 🌟 Top Dark Charcoal Header Banner (#5d5953) */}
                <div className="bg-[#5d5953] text-white p-6 sm:p-9 flex flex-col justify-center">
                  <h1 className="text-2xl sm:text-4xl font-black tracking-[0.1em] uppercase font-sans leading-none">
                    SASIRU NETHVIDU
                  </h1>
                  <h1 className="text-2xl sm:text-4xl font-black tracking-[0.1em] uppercase font-sans leading-none mt-1 mb-2">
                    LIYANAGE
                  </h1>
                  <p className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#f1f0ee]">
                    Full-Stack Software Engineer • Computer Vision &amp; AI Architect
                  </p>
                </div>

                {/* Body Content Right */}
                <div className="p-6 sm:p-8 space-y-5 text-xs text-[#2b2927] flex-1 flex flex-col justify-between">
                  
                  {/* PROFILE INFO */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-extrabold font-sans text-xs sm:text-sm uppercase tracking-[0.16em] text-[#2b2927]">
                        PROFILE INFO
                      </h3>
                      <div className="flex-1 h-[1.5px] bg-[#8c8881]" />
                    </div>
                    <p className="text-[10px] sm:text-[10.5px] leading-relaxed text-[#4f4c47] text-justify">
                      Results-driven 3rd-Year Information Technology Undergraduate at SLIIT Malabe specializing in modern web architectures, real-time Computer Vision (YOLOv11), and high-concurrency microservices. MongoDB Certified Data Modeler experienced in architecting sub-30ms WebSocket pipelines, relational-to-document database migrations, and clean test-driven architectures. Committed to building scalable production software with zero compromises on performance and code quality.
                    </p>
                  </div>

                  {/* EXPERIENCE (Timeline from Image 2) */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-extrabold font-sans text-xs sm:text-sm uppercase tracking-[0.16em] text-[#2b2927]">
                        EXPERIENCE
                      </h3>
                      <div className="flex-1 h-[1.5px] bg-[#8c8881]" />
                    </div>

                    <div className="relative pl-5 ml-1.5 space-y-4">
                      {/* Vertical line */}
                      <div className="absolute left-[5.5px] top-1.5 bottom-1.5 w-[1.5px] bg-[#8c8881]" />

                      {/* Job Node 1 */}
                      <div className="relative">
                        <div className="absolute -left-[20.5px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#5d5953] bg-white" />
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <h4 className="font-extrabold text-[11px] uppercase tracking-wide text-[#2b2927]">
                            SOFTWARE ENGINEERING INTERN
                          </h4>
                          <span className="text-[9.5px] text-[#4f4c47] font-medium">
                            2026 — PRESENT
                          </span>
                        </div>
                        <div className="text-[10px] font-bold uppercase text-[#4f4c47] mb-1">
                          MULTI TALENT TECHNOLOGY
                        </div>
                        <p className="text-[9.5px] text-[#4f4c47] leading-relaxed">
                          Developing production-ready web solutions with React, Node.js, and modern cloud stacks. Collaborating with engineering teams on database workflows, REST APIs, and responsive UI architecture.
                        </p>
                      </div>

                      {/* Job Node 2 */}
                      <div className="relative">
                        <div className="absolute -left-[20.5px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#5d5953] bg-white" />
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <h4 className="font-extrabold text-[11px] uppercase tracking-wide text-[#2b2927]">
                            TRAINEE ACCOUNT ASSISTANT
                          </h4>
                          <span className="text-[9.5px] text-[#4f4c47] font-medium">
                            MAY 2024 — JUL 2024
                          </span>
                        </div>
                        <div className="text-[10px] font-bold uppercase text-[#4f4c47] mb-1">
                          LIBERTY MOTOR ASSOCIATES
                        </div>
                        <p className="text-[9.5px] text-[#4f4c47] leading-relaxed">
                          Audited daily transactional records, conducted digital financial reconciliations, and implemented automated spreadsheet systems for billing accuracy, inventory management, and ledger control.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* PROJECTS */}
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <h3 className="font-extrabold font-sans text-xs sm:text-sm uppercase tracking-[0.16em] text-[#2b2927]">
                        PROJECTS
                      </h3>
                      <div className="flex-1 h-[1.5px] bg-[#8c8881]" />
                    </div>

                    <div className="space-y-2.5">
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-extrabold text-[10.5px] uppercase text-[#2b2927]">
                            AI SUSPICIOUS ACTIVITY &amp; WEAPON DETECTION
                          </h4>
                          <span className="text-[9px] text-[#69655f] font-semibold">
                            YOLOv11 • FASTAPI • WEBSOCKETS
                          </span>
                        </div>
                        <p className="text-[9.5px] text-[#4f4c47] leading-relaxed">
                          Real-time computer vision security surveillance detecting weapons (guns, knives) and behavioral anomalies over live PTZ camera feeds with sub-30ms frame latency and automated dispatching.
                        </p>
                      </div>

                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-extrabold text-[10.5px] uppercase text-[#2b2927]">
                              INTERACTIVE PORTFOLIO &amp; CULTURAL ENGINE
                            </h4>
                            <a
                              href="https://sasiruliyanage.vercel.app/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[9px] text-[#0369a1] hover:underline font-bold"
                            >
                              Live
                            </a>
                          </div>
                          <span className="text-[9px] text-[#69655f] font-semibold">
                            REACT 19 • VITE • TAILWIND V4
                          </span>
                        </div>
                        <p className="text-[9.5px] text-[#4f4c47] leading-relaxed">
                          High-performance web portfolio with WebGL canvas, particle physics, bilingual SEO, and 98+ Google Lighthouse scores. Live at sasiruliyanage.vercel.app.
                        </p>
                      </div>

                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-extrabold text-[10.5px] uppercase text-[#2b2927]">
                            AYURLIFE: AYURVEDIC HEALTHCARE ECOSYSTEM
                          </h4>
                          <span className="text-[9px] text-[#69655f] font-semibold">
                            FULL-STACK • MERN • FLUTTER
                          </span>
                        </div>
                        <p className="text-[9.5px] text-[#4f4c47] leading-relaxed">
                          Healthcare portal and mobile application featuring diagnostic symptom search, registered doctor booking, and digital herbal inventory knowledge-base management.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ACHIEVEMENTS & CERTIFICATIONS (2-Column from Image 2) */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-extrabold font-sans text-xs sm:text-sm uppercase tracking-[0.16em] text-[#2b2927]">
                        ACHIEVEMENTS
                      </h3>
                      <div className="flex-1 h-[1.5px] bg-[#8c8881]" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="font-extrabold text-[10px] uppercase text-[#2b2927] mb-0.5">
                          • MONGODB CERTIFIED (2026)
                        </div>
                        <p className="text-[9px] text-[#4f4c47] leading-relaxed">
                          Certified Data Modeling Path (ID: MDBwsxpdpul98) issued by MongoDB, Inc. Completed 8 specialized tracks in schema optimization, indexing, and migrations.
                        </p>
                      </div>

                      <div>
                        <div className="font-extrabold text-[10px] uppercase text-[#2b2927] mb-0.5">
                          • SLIIT HACKATHONS (2024 — 2026)
                        </div>
                        <p className="text-[9px] text-[#4f4c47] leading-relaxed">
                          Active contributor to university technical workshops, competitive algorithmic hackathons, and open-source project developments at SLIIT Malabe.
                        </p>
                      </div>
                    </div>
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
