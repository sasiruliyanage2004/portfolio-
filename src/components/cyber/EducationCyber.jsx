import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  Sparkles,
  CheckCircle2,
  Briefcase,
  ShieldCheck,
  Download,
  ExternalLink,
  Eye,
  X,
} from "lucide-react";

const EDUCATION_DATA = [
  {
    period: "June 2026 — Present",
    badge: "Current • Industry Role",
    title: "Software Engineering Intern",
    institution: "Multi Talent Technology",
    location: "Western Province, Sri Lanka",
    description: "Contributing to full-stack software development, client web applications, API integrations, and modern UI engineering.",
    highlights: [
      "Developing production-ready web solutions with React, Node.js, and modern tech stacks",
      "Collaborating with engineering teams on database workflows, REST APIs, and UI architecture",
      "Actively participating in agile development sprints, code quality reviews, and testing",
    ],
    icon: Briefcase,
    status: "active",
  },
  {
    period: "2024 — 2028 (Expected)",
    badge: "Undergraduate • 3rd Year",
    title: "BSc (Hons) in Information Technology",
    institution: "Sri Lanka Institute of Information Technology (SLIIT)",
    location: "Malabe, Western Province, Sri Lanka",
    description: "Specializing in Full-Stack Software Engineering, Information Technology, Distributed Systems, Data Structures & Algorithms, and Cloud Architectures.",
    highlights: [
      "Core modules: OOP (Java), DBMS (MySQL/SQL), Web Development, DSA, C",
      "Building practical enterprise web architectures, Computer Vision & AI algorithms",
      "Active participant in software development hackathons & project showcases",
    ],
    icon: GraduationCap,
    status: "active",
  },
  {
    period: "May 2024 — July 2024",
    badge: "Industry Experience",
    title: "Trainee Account Assistant",
    institution: "Liberty Motor Associates",
    location: "Western Province, Sri Lanka",
    description: "Conducted financial data auditing, transactional record reconciliation, and digital database ledger management.",
    highlights: [
      "Assisted senior accounting teams in transaction logging and daily reconciliation",
      "Applied structured data management, numerical accuracy, and spreadsheet automation",
      "Developed professional teamwork, corporate communications, and multitasking skills",
    ],
    icon: Briefcase,
    status: "completed",
  },
  {
    period: "2023 — 2024",
    badge: "Commerce Stream",
    title: "GCE Advanced Level Examination",
    institution: "Gurukula College, Kelaniya",
    location: "Kelaniya, Sri Lanka",
    description: "Completed Advanced Level with high analytical, economics, and business management focus.",
    highlights: [
      "Accounting — A (Distinction)",
      "Business Studies — B",
      "Economics — B",
      "Built strong foundation in quantitative analysis, business logic & logical reasoning",
    ],
    icon: Award,
    status: "completed",
  },
  {
    period: "2020 — 2021",
    badge: "Secondary Education",
    title: "GCE Ordinary Level Examination",
    institution: "Gurukula College, Kelaniya",
    location: "Kelaniya, Sri Lanka",
    description: "Achieved outstanding academic foundation with multiple distinctions.",
    highlights: [
      "Mathematics — A (Distinction)",
      "Health & Physical Education — A (Distinction)",
      "Early leadership in school clubs and academic competitions",
    ],
    icon: BookOpen,
    status: "completed",
  },
];

const MONGODB_CERTIFICATIONS = [
  {
    id: "MDBwsxpdpul98",
    title: "MongoDB Data Modeling Path",
    category: "Master Credential",
    date: "October 03, 2026",
    issuer: "MongoDB, Inc.",
    image: "/certificates/cert-page-9.webp",
    skills: ["Data Modeling", "Schema Optimization", "Aggregation Pipelines", "Indexing Strategy"],
    featured: true,
  },
  {
    id: "MDBxn0iwfuazm",
    title: "Advanced Schema Patterns and Anti-patterns",
    category: "Architecture",
    date: "October 02, 2026",
    issuer: "MongoDB, Inc.",
    image: "/certificates/cert-page-1.webp",
  },
  {
    id: "MDBgvf913c7o8",
    title: "Schema Design Optimization",
    category: "Performance",
    date: "October 03, 2026",
    issuer: "MongoDB, Inc.",
    image: "/certificates/cert-page-2.webp",
  },
  {
    id: "MDBwfsxqxdp4g",
    title: "Indexing Design Fundamentals",
    category: "Indexing",
    date: "October 03, 2026",
    issuer: "MongoDB, Inc.",
    image: "/certificates/cert-page-4.webp",
  },
  {
    id: "MDBy6wuSnlixz",
    title: "Performance Tools and Techniques",
    category: "Diagnostics",
    date: "October 03, 2026",
    issuer: "MongoDB, Inc.",
    image: "/certificates/cert-page-5.webp",
  },
  {
    id: "MDBcgsymixb7l",
    title: "Relational to Document Model",
    category: "Data Migration",
    date: "October 01, 2026",
    issuer: "MongoDB, Inc.",
    image: "/certificates/cert-page-6.webp",
  },
  {
    id: "MDBykbdv8x7x3",
    title: "Fundamentals of Data Transformation",
    category: "Pipelines",
    date: "October 03, 2026",
    issuer: "MongoDB, Inc.",
    image: "/certificates/cert-page-3.webp",
  },
  {
    id: "MDBmwrzx5e4wp",
    title: "Schema Patterns and Anti-patterns",
    category: "Design",
    date: "October 01, 2026",
    issuer: "MongoDB, Inc.",
    image: "/certificates/cert-page-8.webp",
  },
  {
    id: "MDBa39zjxbafir",
    title: "CRUD Operations",
    category: "Core DB",
    date: "October 01, 2026",
    issuer: "MongoDB, Inc.",
    image: "/certificates/cert-page-7.webp",
  },
];

function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    if (window.__lenis) window.__lenis.stop();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      if (window.__lenis) window.__lenis.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!cert) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-lenis-prevent="true"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/75 dark:bg-black/85 backdrop-blur-2xl overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 15, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        className="certificate-modal-box noise-overlay relative flex flex-col w-full max-w-3xl max-h-[90vh] rounded-3xl border border-slate-300 dark:border-emerald-500/40 bg-[#faf9f6] dark:bg-[#0b101b] shadow-2xl z-10 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 p-4 sm:p-5 shrink-0 bg-white/95 dark:bg-black/85 backdrop-blur-xl">
          <div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              Official Proof of Completion // ID: {cert.id}
            </span>
            <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">{cert.title}</h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Certificate Preview"
            className="rounded-full bg-slate-100 dark:bg-white/10 p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/20 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Certificate Display Canvas */}
        <div className="overflow-y-auto p-4 sm:p-6 flex items-center justify-center bg-slate-100/90 dark:bg-black/60">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-auto rounded-xl border border-slate-300 dark:border-white/15 shadow-xl object-contain max-h-[62vh]"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-white/10 shrink-0 bg-white/95 dark:bg-black/85 backdrop-blur-xl font-mono text-xs">
          <span className="text-slate-600 dark:text-slate-400 text-[11px] truncate font-medium">
            Issued by MongoDB, Inc. • VP Raghu Viswanathan
          </span>
          <a
            href="/certificates/mongodb-certifications.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-bold ml-2 shrink-0 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Open Verified PDF</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function EducationCyber() {
  const [selectedCert, setSelectedCert] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      id="education"
      className="relative w-full overflow-hidden bg-transparent py-20 sm:py-24 lg:py-32 scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 dark:border-white/10 bg-cyan-500/10 dark:bg-white/5 px-3.5 py-1 sm:px-4 sm:py-1.5 font-mono text-[11px] sm:text-xs text-cyan-600 dark:text-cyan-400 mb-3 sm:mb-4 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ACADEMIC FOUNDATION &amp; CERTIFICATIONS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Education &amp; <span className="text-gradient">Journey</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            The academic rigor, software engineering disciplines, and verified industry credentials shaping my technical expertise.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical spine background track */}
          <div className="absolute left-3.5 sm:left-6 md:left-1/2 top-0 bottom-0 w-[2px] sm:w-[3px] -translate-x-1/2 bg-slate-300/80 dark:bg-white/10 rounded-full" />

          {/* Animated Glowing spine fill */}
          <motion.div
            style={{
              height: pathHeight,
              background: "linear-gradient(to bottom, var(--grad-start), var(--grad-mid), var(--grad-end))",
            }}
            className="absolute left-3.5 sm:left-6 md:left-1/2 top-0 w-[2px] sm:w-[3px] -translate-x-1/2 origin-top rounded-full shadow-[0_0_12px_rgba(6,182,212,0.6)] z-10"
          />

          {/* Timeline Nodes */}
          <div className="space-y-8 sm:space-y-16 pt-2 sm:pt-4">
            {EDUCATION_DATA.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  } gap-6 md:gap-12`}
                >
                  {/* Center Node Icon */}
                  <div className="absolute left-3.5 sm:left-6 md:left-1/2 -translate-x-1/2 z-20 flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl border border-slate-300 dark:border-white/20 bg-white dark:bg-[#090d16] shadow-xl backdrop-blur-xl group">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-600 dark:text-cyan-400" />
                    {item.status === "active" && (
                      <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500" />
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="ml-7 sm:ml-12 md:ml-0 w-[calc(100%-1.75rem)] sm:w-[calc(100%-3rem)] md:w-[calc(50%-3rem)]">
                    <div className="project-card-obsidian noise-overlay rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 border border-slate-200 dark:border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-xl group">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 sm:px-3 py-0.5 sm:py-1 font-mono text-[10px] sm:text-[11px] font-bold text-cyan-600 dark:text-cyan-300 w-fit">
                          <Calendar className="h-3 w-3" />
                          {item.period}
                        </span>
                        <span className="font-mono text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors break-words">
                        {item.title}
                      </h3>

                      <div className="mt-1 flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                        <MapPin className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span className="truncate">{item.institution}</span>
                      </div>

                      <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 pt-2.5 sm:pt-3 border-t border-slate-200 dark:border-white/10">
                        {item.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-mono">
                            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                            <span className="break-words">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ============================================================= */}
        {/* 🏆 VERIFIED PROFESSIONAL CERTIFICATIONS & ACCREDITATIONS      */}
        {/* ============================================================= */}
        <div className="mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-slate-200 dark:border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-500/10 dark:bg-emerald-500/5 px-3.5 py-1 sm:px-4 sm:py-1.5 font-mono text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 mb-3 backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>OFFICIAL INDUSTRY ACCREDITATIONS</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Verified Database <span className="text-gradient">Certifications</span>
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Official industry certifications issued by MongoDB, Inc. verifying advanced competency in schema architecture, query optimization, and enterprise document modeling.
            </p>
          </div>

          {/* Featured Master Credential Banner */}
          <div className="project-card-obsidian noise-overlay rounded-3xl p-5 sm:p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden mb-8 group">
            <span className="border-beam" aria-hidden="true" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Certificate High-Res Thumbnail Preview */}
              <div
                onClick={() => setSelectedCert(MONGODB_CERTIFICATIONS[0])}
                className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-300 dark:border-white/15 bg-slate-900 shadow-xl cursor-pointer group/thumb aspect-[4/3] flex items-center justify-center"
              >
                <img
                  src="/certificates/cert-page-9.webp"
                  alt="MongoDB Data Modeling Path Certification"
                  className="w-full h-full object-cover object-center transform group-hover/thumb:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 bg-black/80 px-3 py-1.5 rounded-lg border border-cyan-500/40 backdrop-blur-md shadow-lg">
                    <Eye className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Click to Inspect Certificate</span>
                  </span>
                </div>
              </div>

              {/* Credential Details */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      VERIFIED BY MONGODB, INC.
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-600 dark:text-cyan-400">
                      <Award className="h-3 w-3" />
                      MASTER PATH CREDENTIAL
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    MongoDB Certified: Data Modeling Path
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    Comprehensive professional certification validating mastery in document schema design, anti-pattern mitigation, indexing strategies, data transformation pipelines, and relational-to-document database migrations.
                  </p>
                </div>

                {/* Metadata Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 p-2.5 text-center shadow-sm">
                    <div className="text-[10px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400">Credential ID</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 truncate">
                      MDBwsxpdpul98
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 p-2.5 text-center shadow-sm">
                    <div className="text-[10px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400">Issue Date</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-cyan-600 dark:text-cyan-400">October 2026</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 p-2.5 text-center shadow-sm">
                    <div className="text-[10px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400">Modules Completed</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-amber-600 dark:text-amber-400">8 Specialized Tracks</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="/certificates/mongodb-certifications.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 font-mono text-xs font-bold text-black hover:bg-emerald-400 transition-all cursor-pointer shadow-lg hover:shadow-emerald-500/25"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Official PDF (All 9 Proofs)</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedCert(MONGODB_CERTIFICATIONS[0])}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/5 px-4 py-2.5 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-white hover:border-cyan-500/50 hover:bg-slate-200/80 dark:hover:bg-white/10 transition-all cursor-pointer shadow-sm"
                  >
                    <Eye className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Specialized Modules Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400">
                Completed Specialization Modules ({MONGODB_CERTIFICATIONS.length - 1})
              </span>
              <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                100% Accredited
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {MONGODB_CERTIFICATIONS.slice(1).map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="group/item project-card-obsidian noise-overlay rounded-2xl p-4 border border-slate-300 dark:border-white/10 hover:border-emerald-500/60 dark:hover:border-emerald-500/40 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/15 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30 dark:border-emerald-500/20">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                        Verified
                      </span>
                      <span className="font-mono text-[10px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">{cert.category}</span>
                    </div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                      {cert.title}
                    </h5>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400">
                    <span className="truncate font-medium">ID: <span className="text-slate-900 dark:text-slate-200 font-bold">{cert.id}</span></span>
                    <Eye className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400 opacity-80 group-hover/item:opacity-100 shrink-0 ml-1.5 transition-transform group-hover/item:scale-110" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
