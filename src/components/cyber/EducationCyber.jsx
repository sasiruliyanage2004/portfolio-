import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Award, BookOpen, Calendar, MapPin, Sparkles, CheckCircle2, Briefcase } from "lucide-react";

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
      "Actively participating in agile development sprints, code quality reviews, and testing"
    ],
    icon: Briefcase,
    status: "active"
  },
  {
    period: "2024 — 2028 (Expected)",
    badge: "Undergraduate • 2nd Year",
    title: "BSc (Hons) in Information Technology",
    institution: "Sri Lanka Institute of Information Technology (SLIIT)",
    location: "Malabe, Western Province, Sri Lanka",
    description: "Specializing in Full-Stack Software Engineering, Information Technology, Distributed Systems, Data Structures & Algorithms, and Cloud Architectures.",
    highlights: [
      "Core modules: OOP (Java), DBMS (MySQL/SQL), Web Development, DSA, C",
      "Building practical enterprise web architectures, Computer Vision & AI algorithms",
      "Active participant in software development hackathons & project showcases"
    ],
    icon: GraduationCap,
    status: "active"
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
      "Developed professional teamwork, corporate communications, and multitasking skills"
    ],
    icon: Briefcase,
    status: "completed"
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
      "Built strong foundation in quantitative analysis, business logic & logical reasoning"
    ],
    icon: Award,
    status: "completed"
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
      "Early leadership in school clubs and academic competitions"
    ],
    icon: BookOpen,
    status: "completed"
  }
];

export default function EducationCyber() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
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
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Education &amp; <span className="text-gradient">Journey</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            The academic rigor and structured computer science disciplines shaping my engineering philosophy.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical spine background track */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-slate-300/80 dark:bg-white/10 rounded-full" />

          {/* Animated Glowing spine fill */}
          <motion.div
            style={{
              height: pathHeight,
              background: "linear-gradient(to bottom, var(--grad-start), var(--grad-mid), var(--grad-end))",
            }}
            className="absolute left-6 md:left-1/2 top-0 w-[3px] -translate-x-1/2 origin-top rounded-full shadow-[0_0_12px_rgba(6,182,212,0.6)] z-10"
          />

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16 pt-4">
            {EDUCATION_DATA.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  } gap-8 md:gap-12`}
                >
                  {/* Center Node Icon */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-300 dark:border-white/20 bg-white dark:bg-[#090d16] shadow-xl backdrop-blur-xl group">
                    <Icon className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    {item.status === "active" && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="ml-14 md:ml-0 w-full md:w-[calc(50%-3rem)]">
                    <div className="project-card-obsidian noise-overlay rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-xl group">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-bold text-cyan-600 dark:text-cyan-300">
                          <Calendar className="h-3 w-3" />
                          {item.period}
                        </span>
                        <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>

                      <div className="mt-1 flex items-center gap-1.5 font-mono text-xs text-slate-600 dark:text-slate-400">
                        <MapPin className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>{item.institution}</span>
                      </div>

                      <p className="mt-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <ul className="mt-4 space-y-2 pt-3 border-t border-slate-200 dark:border-white/10">
                        {item.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
                            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
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
      </div>
    </section>
  );
}
