import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2, Sparkles } from "lucide-react";

const EXPERIENCES = [
  {
    role: "Software Engineering Intern",
    company: "Multi Talent Technology",
    period: "June 2026 — Present",
    badge: "Current • Industry Role",
    location: "Western Province, Sri Lanka",
    type: "Internship",
    description:
      "Contributing to full-stack software development, client web applications, API integrations, and modern UI engineering in an agile enterprise environment.",
    responsibilities: [
      "Developing production-ready web solutions using React, Node.js, and modern cloud stacks.",
      "Collaborating with engineering teams on database workflows, REST API endpoints, and responsive UI architecture.",
      "Actively participating in agile sprint planning, code quality reviews, and automated testing.",
    ],
    tech: ["React 19", "Node.js", "REST APIs", "Git", "Cloud Stacks"],
    status: "active",
  },
  {
    role: "Lead Full-Stack & UI/UX Consultant",
    company: "Independent Client Engagements",
    period: "2024 — Present",
    badge: "Freelance & Consulting",
    location: "Remote / Sri Lanka",
    type: "Contract / Project Lead",
    description:
      "Architecting bespoke full-stack systems and high-converting editorial web experiences for commercial clients and technical initiatives.",
    responsibilities: [
      "Engineered Movi Coffee's luxury hospitality web platform with real-time reservation flows and editorial aesthetics.",
      "Architected Aethra Vision edge computer vision dashboard utilizing YOLOv11 and FastAPI WebSocket pipelines.",
      "Maintained 98+ Google Lighthouse scores across Core Web Vitals, accessibility, and SEO.",
    ],
    tech: ["Next.js", "FastAPI", "MongoDB", "YOLOv11", "Tailwind CSS", "Framer Motion"],
    status: "completed",
  },
  {
    role: "Trainee Account Assistant",
    company: "Liberty Motor Associates",
    period: "May 2024 — July 2024",
    badge: "Industry Experience",
    location: "Western Province, Sri Lanka",
    type: "Corporate Trainee",
    description:
      "Conducted financial data auditing, transactional record reconciliation, and digital database spreadsheet automation.",
    responsibilities: [
      "Assisted senior accounting teams in transaction logging, daily reconciliation, and digital ledger control.",
      "Applied structured data management, numerical accuracy, and spreadsheet automation to eliminate billing discrepancies.",
      "Developed corporate communications, technical documentation, and cross-functional teamwork habits.",
    ],
    tech: ["Digital Ledger Systems", "Advanced Spreadsheets", "Data Auditing", "Financial Reconciliation"],
    status: "completed",
  },
];

export default function ExperienceCyber() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full py-24 sm:py-32 overflow-hidden bg-transparent"
    >
      {/* Background Accent Mesh Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-0 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_70%)] blur-3xl pointer-events-none"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center lg:text-left max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-300 mb-4"
          >
            <Briefcase className="h-3.5 w-3.5 text-emerald-400" />
            <span>CAREER JOURNEY // EXPERIENCE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
          >
            Professional experience delivering{" "}
            <span className="text-gradient">production-grade</span> software.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed mt-5"
          >
            A chronicle of practical roles, software internships, and independent engineering projects where code
            meets production scale.
          </motion.p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-cyan-500/20 dark:border-cyan-500/30 space-y-12 sm:space-y-16">
          {EXPERIENCES.map((exp, idx) => {
            const isCurrent = exp.status === "active";

            return (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: idx * 0.18 + 0.2 }}
                className="relative group"
              >
                {/* Timeline Node Beacon */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                    isCurrent
                      ? "border-emerald-400 bg-emerald-500/20 shadow-[0_0_12px_#10b981]"
                      : "border-cyan-400 bg-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      isCurrent ? "bg-emerald-400 animate-pulse" : "bg-cyan-400"
                    }`}
                  />
                </div>

                {/* Experience Card */}
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 dark:border-white/10 shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 space-y-4">
                  {/* Top Meta Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-bold ${
                        isCurrent
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30"
                          : "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30"
                      }`}
                    >
                      <Sparkles className="h-3 w-3" />
                      {exp.badge}
                    </span>

                    <div className="flex items-center gap-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Role & Company */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 font-bold mt-1">
                      <Building2 className="h-4 w-4" />
                      <span>{exp.company}</span>
                      <span className="text-slate-400">• {exp.type}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-white/5">
                    {exp.responsibilities.map((resp) => (
                      <div key={resp} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-2 pt-3">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-800 dark:text-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
