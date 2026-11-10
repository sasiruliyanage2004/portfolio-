import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Server,
  Cloud,
  Wrench,
  Sparkles,
  CheckCircle2,
  Globe2,
  Award,
  Search,
  X,
  Database,
  Layers,
  ShieldCheck,
  ExternalLink,
  Check,
  Copy,
} from "lucide-react";
import { TechIcons } from "../TechIcons";
import InteractiveIconCloud from "../InteractiveIconCloud";

const CERTIFICATIONS = [
  {
    id: "mongodb",
    title: "MongoDB Certified Data Modeler",
    issuer: "MongoDB, Inc. (Official Credential)",
    year: "2026",
    credentialId: "MDBwsxpdpul98",
    logo: TechIcons.mongodbCert,
    accent: "#00ED64",
    brandGlow: "rgba(0,237,100,0.35)",
    status: "Verified Credential",
    description:
      "Official professional certification issued by MongoDB, Inc. Validates deep expertise in document schema architecture, MongoDB Atlas, indexing topologies, aggregation frameworks, ACID transactions, and high-concurrency database optimizations.",
    highlights: [
      "Completed 8 advanced specialized tracks in data modeling & query patterns",
      "Mastery of Polymorphic, Bucket, and Extended Reference schema patterns",
      "Compound, Multikey & Geospatial index optimizations for high throughput",
      "Seamless migration strategies from relational 3NF to high-performance document stores",
    ],
    productionProof: "AyurLife Herbal Medicine Platform & Biometrics Guard Core",
  },
  {
    id: "sliit",
    title: "BSc (Hons) in Information Technology",
    issuer: "SLIIT, Malabe • 3rd Year Undergraduate",
    year: "2024 — 2028 (Expected)",
    credentialId: "SLIIT-IT-SE-Y3",
    logo: TechIcons.java,
    accent: "#06B6D4",
    brandGlow: "rgba(6,182,212,0.3)",
    status: "Academic Distinction",
    description:
      "Undergraduate software engineering curriculum covering Enterprise Java OOP, Data Structures & Algorithms, Distributed DBMS (MySQL, MongoDB, PostgreSQL), Computer Networks, and Full-Stack Software Engineering Architecture.",
    highlights: [
      "Software Engineering Specialization with top project execution scores",
      "Object-Oriented Design Patterns (Singleton, Factory, Observer, MVC)",
      "High-Performance Database Systems & Transaction Integrity (ACID)",
      "Collaborative Agile/Scrum team leadership and test-driven development",
    ],
    productionProof: "Academic Labs, Semester Capstone Projects & Enterprise Portfolios",
  },
  {
    id: "ai-vision",
    title: "Computer Vision & YOLOv11 AI Core",
    issuer: "Autonomous Security & Surveillance Systems",
    year: "2026",
    credentialId: "CV-YOLO11-SYS",
    logo: TechIcons.yolo,
    accent: "#10B981",
    brandGlow: "rgba(16,185,129,0.3)",
    status: "Production Ready",
    description:
      "Deep learning computer vision engineering for real-time weapon, intrusion, and suspicious activity detection across RTSP PTZ surveillance streams with sub-30ms inference latency.",
    highlights: [
      "Ultra-low latency inference using TensorRT and PyTorch pipelines",
      "Integrated neural facial embeddings via face-api.js with SSD MobileNet V1",
      "Async FastAPI WebSocket hub delivering instant security alerts",
      "Multi-stream RTSP camera synchronization and bounding box kinematics",
    ],
    productionProof: "Suspicious Activity Detection Core & Liberty Security System",
  },
];

const GROUPS = [
  {
    id: "all",
    label: "All Tech",
    icon: Layers,
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: Code2,
    skills: [
      {
        name: "React 19 & Web Architecture",
        logo: TechIcons.react,
        brandGlow: "rgba(97,218,251,0.25)",
        badge: "2+ Yrs • Core",
        badgeType: "cyan",
        level: 95,
        experience: "2+ Years Production",
        scope: ["Server Actions", "Concurrent Rendering", "State Pipelines", "Custom Hooks Architecture"],
        proof: "AyurLife & GitBrain",
        details:
          "Architecting enterprise user interfaces with React 19, exploiting Server Actions, concurrent transitions, custom hooks, and memoized rendering trees for zero-lag interactions.",
      },
      {
        name: "Next.js 15 & SSR Frameworks",
        logo: TechIcons.nextjs,
        brandGlow: "rgba(255,255,255,0.25)",
        badge: "Modern Stack",
        badgeType: "cyan",
        level: 90,
        experience: "2 Years Applied",
        scope: ["App Router", "Server Components (RSC)", "Dynamic API Routes", "Core Web Vitals SEO"],
        proof: "Modern Web Ecosystems",
        details:
          "Building production Next.js applications with hybrid rendering (SSR, SSG, ISR), automated sitemaps, edge caching, and optimized Largest Contentful Paint (LCP).",
      },
      {
        name: "JavaScript (ES2024) & TypeScript",
        logo: TechIcons.typescript,
        brandGlow: "rgba(49,120,198,0.25)",
        badge: "2+ Yrs • Daily",
        badgeType: "cyan",
        level: 94,
        experience: "2+ Years Production",
        scope: ["Strict Type Safety", "Async Event Loop", "DOM Engine", "Modular SDK Design"],
        proof: "WorkforceOS & GitBrain",
        details:
          "Writing robust TypeScript with discriminated unions, generic constraints, defensive API parsing, and functional immutability.",
      },
      {
        name: "Tailwind CSS v4 & Motion UI",
        logo: TechIcons.tailwind,
        brandGlow: "rgba(6,182,212,0.25)",
        badge: "Design Arch",
        badgeType: "cyan",
        level: 96,
        experience: "2+ Years Production",
        scope: ["CSS Design Tokens", "Framer Motion", "Micro-interactions", "Responsive Grid/Flex"],
        proof: "Portfolio & AyurLife",
        details:
          "Crafting bespoke design systems, physics-based spring animations, accessible modal dialogs, and adaptive dark/light themes.",
      },
      {
        name: "React Native (Mobile Apps)",
        logo: TechIcons.reactNative,
        brandGlow: "rgba(97,218,251,0.25)",
        badge: "Mobile Apps",
        badgeType: "emerald",
        level: 86,
        experience: "1.5 Years Applied",
        scope: ["Native Bridge", "Mobile Navigation", "Offline Cache", "Touch Gesture Physics"],
        proof: "AyurLife Companion App",
        details:
          "Developing fluid cross-platform iOS and Android applications with offline-first persistence, native hardware bridges, and biometric auth.",
      },
      {
        name: "HTML5 Canvas & 60fps Kinematics",
        logo: TechIcons.html5,
        brandGlow: "rgba(227,79,38,0.25)",
        badge: "Cultural Tech",
        badgeType: "teal",
        level: 92,
        experience: "2 Years Creative",
        scope: ["2D Canvas API", "60fps Render Loops", "Sine Wave Kinematics", "Dumbara Matrix"],
        proof: "Cultural Pattern Engine",
        details:
          "Procedural generative mathematics, hardware-accelerated particle fields, and authentic Sri Lankan Dumbara weaving geometry rendered in real-time.",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend & Core",
    icon: Server,
    skills: [
      {
        name: "Node.js & Express Microservices",
        logo: TechIcons.node,
        brandGlow: "rgba(95,160,78,0.25)",
        badge: "2+ Yrs • Full-Stack",
        badgeType: "emerald",
        level: 93,
        experience: "2+ Years Production",
        scope: ["RESTful Gateways", "JWT Bearer Auth", "Middleware Pipelines", "Asynchronous Non-blocking IO"],
        proof: "AyurLife & Biometrics",
        details:
          "Engineering scalable RESTful backends, secure cookie authentication, role-based access control (RBAC), and transactional controllers.",
      },
      {
        name: "Python & FastAPI Hubs",
        logo: TechIcons.python,
        brandGlow: "rgba(55,118,171,0.25)",
        badge: "High-Throughput",
        badgeType: "emerald",
        level: 91,
        experience: "2 Years Production",
        scope: ["Async WebSocket Hubs", "Pydantic Schemas", "OpenCV Pipelines", "AI Model Serving"],
        proof: "YOLOv11 Security Core",
        details:
          "Asynchronous Python backends utilizing uvloop, Pydantic data contracts, multi-threaded video stream processing, and instant WebSocket dispatch.",
      },
      {
        name: "Real-time WebSockets & SSE",
        logo: TechIcons.websocket,
        brandGlow: "rgba(6,182,212,0.3)",
        badge: "<30ms Latency",
        badgeType: "cyan",
        level: 89,
        experience: "2 Years Applied",
        scope: ["Bi-directional Streams", "Server-Sent Events", "Heartbeat Ping/Pong", "RTSP Surveillance Streams"],
        proof: "Security Core & Biometrics",
        details:
          "Full-duplex real-time communication channels for instant alerts, biometric vector verification, and multi-client live telemetry broadcasts.",
      },
      {
        name: "Java (OOP & System Design)",
        logo: TechIcons.java,
        brandGlow: "rgba(237,139,0,0.25)",
        badge: "Academic Core",
        badgeType: "cyan",
        level: 90,
        experience: "3 Years Academic",
        scope: ["Object-Oriented Design", "Design Patterns", "Multithreading", "Data Structures & Algos"],
        proof: "SLIIT Curriculum & Labs",
        details:
          "Enterprise Java engineering, rigorous polymorphic hierarchies, concurrency controls, and comprehensive algorithmic problem solving.",
      },
      {
        name: "REST Architecture & Micro-APIs",
        logo: TechIcons.postman,
        brandGlow: "rgba(255,108,55,0.25)",
        badge: "Integration",
        badgeType: "cyan",
        level: 94,
        experience: "2+ Years Production",
        scope: ["API Versioning", "Rate Limiting", "JSON Payloads", "Postman Automated Suites"],
        proof: "Multi Talent Tech",
        details:
          "Clean RESTful contracts, idempotent methods, graceful error payloads with contextual codes, and automated test runners.",
      },
      {
        name: "C Systems Programming",
        logo: TechIcons.c,
        brandGlow: "rgba(0,89,156,0.25)",
        badge: "Systems Foundation",
        badgeType: "teal",
        level: 85,
        experience: "2 Years Academic",
        scope: ["Memory Pointers", "DSA Implementations", "Low-Level Logic", "Complexity Analysis"],
        proof: "SLIIT Academic Core",
        details:
          "Deep grounding in memory allocation, pointer arithmetic, buffer management, and time/space complexity optimization.",
      },
    ],
  },
  {
    id: "database",
    label: "Databases & NoSQL",
    icon: Database,
    skills: [
      {
        name: "MongoDB Atlas & NoSQL",
        logo: TechIcons.mongodbCert,
        brandGlow: "rgba(0,237,100,0.35)",
        badge: "★ MongoDB Certified",
        badgeType: "emerald",
        level: 96,
        experience: "2+ Years • Certified",
        scope: ["Certified Data Modeler", "Advanced Schema Patterns", "Aggregation Pipeline", "Indexing Topologies"],
        proof: "Official MongoDB Inc. Credential",
        details:
          "Certified by MongoDB, Inc. (ID: MDBwsxpdpul98). Expert in document modeling, Bucket & Polymorphic patterns, multi-stage aggregation pipelines ($facet, $lookup, $graphLookup), indexing strategies, and high-concurrency NoSQL topologies.",
      },
      {
        name: "PostgreSQL Relational Architecture",
        logo: TechIcons.postgresql,
        brandGlow: "rgba(65,105,225,0.3)",
        badge: "Enterprise RDBMS",
        badgeType: "cyan",
        level: 90,
        experience: "2 Years Applied",
        scope: ["Relational Integrity", "Complex Joins", "JSONB Document Storage", "Query Execution Tuning"],
        proof: "AyurLife & SLIIT RDBMS",
        details:
          "Designing resilient relational schemas, foreign key constraints, composite B-tree indexing, JSONB hybrid storage, and transactional safety.",
      },
      {
        name: "MySQL & ACID DBMS",
        logo: TechIcons.mysql,
        brandGlow: "rgba(0,117,143,0.25)",
        badge: "Relational DB",
        badgeType: "teal",
        level: 92,
        experience: "3 Years Academic & Applied",
        scope: ["Normalization (3NF)", "Transactions & Locks", "Stored Procedures", "Query Optimization"],
        proof: "SLIIT Database Systems",
        details:
          "Strict normalization, ACID isolation levels, deadlock prevention, indexing optimization, and SQL performance tuning.",
      },
      {
        name: "Redis & In-Memory Caching",
        logo: TechIcons.redis,
        brandGlow: "rgba(220,56,45,0.3)",
        badge: "High Performance",
        badgeType: "cyan",
        level: 87,
        experience: "1.5 Years Applied",
        scope: ["Key-Value Caching", "Session Store", "Pub/Sub Messaging", "Rate Limiting Counters"],
        proof: "High-Traffic Micro-APIs",
        details:
          "Sub-millisecond latency data caching, distributed token buckets for rate limiting, and real-time session stores.",
      },
    ],
  },
  {
    id: "ai-vision",
    label: "AI, Vision & Biometrics",
    icon: Cloud,
    skills: [
      {
        name: "Computer Vision & YOLOv11",
        logo: TechIcons.yolo,
        brandGlow: "rgba(6,182,212,0.25)",
        badge: "AI Specialty",
        badgeType: "emerald",
        level: 93,
        experience: "1.5 Years Specialized",
        scope: ["Weapon Detection", "Tensor Inference", "PTZ RTSP Streams", "<30ms Latency"],
        proof: "Suspicious Activity Detection",
        details:
          "Trained and deployed YOLOv11 vision models for real-time security surveillance, achieving sub-30ms frame inference and automated anomaly bounding box telemetry.",
      },
      {
        name: "face-api.js Neural Biometrics",
        logo: TechIcons.faceApi,
        brandGlow: "rgba(16,185,129,0.25)",
        badge: "Deep Learning",
        badgeType: "cyan",
        level: 91,
        experience: "1.5 Years Applied",
        scope: ["Facial Embeddings", "SSD MobileNet V1", "Landmark Tracking", "128D Vector Match"],
        proof: "Biometrics Platform",
        details:
          "Neural network face detection in the browser, computing 128D Euclidean distance vectors for spoof-resistant identity authentication.",
      },
    ],
  },
  {
    id: "tools",
    label: "DevOps & Professional",
    icon: Wrench,
    skills: [
      {
        name: "Docker & Containerization",
        logo: TechIcons.docker,
        brandGlow: "rgba(36,150,237,0.25)",
        badge: "DevOps & Cloud",
        badgeType: "cyan",
        level: 89,
        experience: "2 Years Applied",
        scope: ["Multi-stage Builds", "Container Isolation", "Docker Compose Orchestration", "Port Networking"],
        proof: "DevOps Toolchain",
        details:
          "Containerizing full-stack microservices, configuring multi-stage Dockerfiles for minimal image sizes, and local cluster orchestration.",
      },
      {
        name: "Git, GitHub & CI/CD Pipelines",
        logo: TechIcons.git,
        brandGlow: "rgba(240,80,50,0.25)",
        badge: "Collaboration",
        badgeType: "cyan",
        level: 95,
        experience: "3 Years Daily",
        scope: ["Branching Workflows", "GitHub Actions CI", "Pull Request Audits", "Semantic Versioning"],
        proof: "Active GitHub Repos",
        details:
          "Managing release pipelines, automated unit test suites in GitHub Actions, branch protection policies, and clean commit hygiene.",
      },
      {
        name: "Enterprise Admin & Data Audit",
        logo: TechIcons.express,
        brandGlow: "rgba(255,255,255,0.2)",
        badge: "Management",
        badgeType: "emerald",
        level: 92,
        experience: "2 Years Professional",
        scope: ["Knowledge Bases", "Financial Reconciliation", "Digital Spreadsheets", "Access Control"],
        proof: "Liberty Motors & AyurLife",
        details:
          "Enterprise data integrity management, financial records auditing, automated spreadsheet workflows, and inventory tracking.",
      },
      {
        name: "Agile & Team Engineering",
        logo: TechIcons.postman,
        brandGlow: "rgba(255,108,55,0.25)",
        badge: "Methodology",
        badgeType: "teal",
        level: 93,
        experience: "2+ Years Applied",
        scope: ["Sprint Planning", "Cross-Functional Delivery", "Code Reviews", "Daily Standups"],
        proof: "Multi Talent Technology",
        details:
          "Leading collaborative sprints, peer code reviews, continuous integration practices, and client demonstration milestones.",
      },
    ],
  },
  {
    id: "certifications",
    label: "Certifications",
    icon: Award,
  },
];

export default function SkillsCyber() {
  const [activeGroup, setActiveGroup] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [copiedId, setCopiedId] = useState(false);
  const sectionRef = useRef(null);

  // Flatten all skills for "All Tech" and search
  const allSkills = useMemo(() => {
    const list = [];
    GROUPS.forEach((g) => {
      if (g.skills) {
        g.skills.forEach((s) => {
          if (!list.some((item) => item.name === s.name)) {
            list.push({ ...s, category: g.label });
          }
        });
      }
    });
    return list;
  }, []);

  // Filter skills based on tab and search
  const filteredSkills = useMemo(() => {
    let result;
    if (activeGroup === "all") {
      result = allSkills;
    } else if (activeGroup === "certifications") {
      return [];
    } else {
      const group = GROUPS.find((g) => g.id === activeGroup);
      result = group && group.skills ? group.skills : [];
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.badge.toLowerCase().includes(q) ||
          s.scope.some((item) => item.toLowerCase().includes(q)) ||
          s.proof.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeGroup, searchQuery, allSkills]);

  const handleCopyCredential = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full bg-transparent overflow-hidden py-20 sm:py-28 px-4 sm:px-6 lg:px-10 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl relative">
        {/* =========================================================================
            SECTION HEADER
            ========================================================================= */}
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between mb-8 sm:mb-12 gap-5 sm:gap-6 text-center md:text-left">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-2">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              <span className="font-mono text-xs tracking-[0.25em] text-cyan-400 font-extrabold uppercase">
                VERIFIED ENGINEERING STACK
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-6xl dark:drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Skills <span className="text-gradient">Matrix</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 max-w-xl">
              ⚡ Production-ready modern web architectures, certified NoSQL data topologies, &amp; low-latency AI computer vision pipelines
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="relative z-10 w-full md:w-80 self-center md:self-end">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills (e.g. Mongo, React, YOLO)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-full border border-white/10 dark:border-white/10 light-theme:border-slate-300 bg-white/5 dark:bg-[#0a0f1d]/90 light-theme:bg-white text-xs font-mono text-slate-100 dark:text-slate-100 light-theme:text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 p-0.5 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-[10px] font-mono text-cyan-400 mt-1 pl-3">
                Found {filteredSkills.length} matching technology{filteredSkills.length === 1 ? "" : "ies"}
              </p>
            )}
          </div>
        </div>

        {/* =========================================================================
            OFFICIAL CERTIFICATION SHOWCASE BANNER (MongoDB Inc. Spotlight)
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12 relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-slate-900/60 to-cyan-950/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
        >
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-[#001E2B] border border-emerald-500/40 p-3 flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(0,237,100,0.3)]">
                <TechIcons.mongodbCert className="h-12 w-12 sm:h-14 sm:w-14" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 font-mono text-[10px] font-bold text-emerald-400">
                    <ShieldCheck className="h-3 w-3" />
                    OFFICIAL INDUSTRY CERTIFICATION
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">YEAR 2026</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  MongoDB Certified Data Modeler
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-2xl leading-relaxed">
                  Issued by <span className="font-semibold text-emerald-300">MongoDB, Inc.</span> • Completed 8 advanced specialized tracks in document schema patterns, high-concurrency indexing topologies, and relational-to-NoSQL migrations.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[10px] text-slate-400">
                  <span className="text-slate-300 font-medium">Credential ID:</span>
                  <code className="px-2 py-0.5 rounded bg-black/40 border border-emerald-500/30 text-emerald-300 font-bold">
                    MDBwsxpdpul98
                  </code>
                  <button
                    onClick={() => handleCopyCredential("MDBwsxpdpul98")}
                    className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Copy Credential ID"
                  >
                    {copiedId ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Check className="h-3 w-3" /> Copied!
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="h-3 w-3" /> Copy ID
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="flex items-center gap-3 self-stretch lg:self-center shrink-0">
              <button
                onClick={() => setSelectedCert(CERTIFICATIONS[0])}
                className="w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-5 py-3 font-mono text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 transition-all shadow-[0_0_20px_rgba(0,237,100,0.2)] cursor-pointer"
              >
                <Award className="h-4 w-4" />
                <span>Inspect Certification</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            SLIDING DOMAIN TAB SWITCHER
            ========================================================================= */}
        <div className="theme-switcher-bar relative z-10 flex flex-wrap justify-center md:justify-start gap-1 rounded-full p-1.5 backdrop-blur-md shadow-lg border mb-8 sm:mb-10 max-w-full overflow-x-auto" role="tablist" aria-label="Skill Categories">
          {GROUPS.map((g) => {
            const Icon = g.icon;
            const isActive = activeGroup === g.id;
            return (
              <button
                key={g.id}
                onClick={() => {
                  setActiveGroup(g.id);
                  setSearchQuery("");
                }}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${g.id}`}
                id={`tab-${g.id}`}
                className="relative flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeDomainPill"
                    style={{ background: "linear-gradient(135deg, var(--grad-start), var(--grad-mid))" }}
                    className="absolute inset-0 rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`relative z-10 h-3.5 w-3.5 ${isActive ? "text-white" : "opacity-70"}`} />
                <span className={`relative z-10 ${isActive ? "text-white font-semibold" : "opacity-70 hover:opacity-100"}`}>
                  {g.label}
                </span>
                {g.id === "certifications" && (
                  <span className="relative z-10 ml-0.5 px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-[9px] font-bold text-emerald-300">
                    3
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            TAB CONTENT: CERTIFICATIONS TAB
            ========================================================================= */}
        {activeGroup === "certifications" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {CERTIFICATIONS.map((cert) => {
              const CertLogo = cert.logo;
              return (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="skill-card-bg noise-overlay relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-emerald-400/50 transition-all duration-300 shadow-xl cursor-pointer group"
                  style={{
                    boxShadow: `0 10px 30px -10px ${cert.brandGlow}`,
                  }}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div
                        className="flex h-13 w-13 items-center justify-center rounded-2xl p-2 bg-white/5 border border-white/10 shadow-inner group-hover:border-emerald-400/40 transition-colors"
                        style={{
                          boxShadow: `0 0 20px ${cert.brandGlow}`,
                        }}
                      >
                        <CertLogo className="h-8 w-8" />
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold border border-emerald-500/40 bg-emerald-500/15 text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        {cert.status}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-emerald-300 transition-colors mb-1">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-[10px] text-slate-400 mb-3">
                      {cert.issuer} • {cert.year}
                    </p>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                      {cert.description}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      {cert.highlights.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300 font-normal">
                          <Check className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-emerald-400 font-semibold group-hover:underline flex items-center gap-1">
                      <span>View Credential Details</span>
                      <ExternalLink className="h-3 w-3" />
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{cert.credentialId}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {/* 🌐 Interactive 3D Orbiting Magic UI Icon Cloud & Tech Highlights */}
            {activeGroup === "all" && !searchQuery && (
              <div className="mb-12 sm:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-3xl border border-white/10 bg-white/5 dark:bg-black/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <span className="border-beam" aria-hidden="true" />

                {/* Left Column: 3D Interactive Spinning Sphere */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                  <InteractiveIconCloud size={340} />
                </div>

                {/* Right Column: Ecosystem Highlights & Capability Snapshot */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-5 text-left">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs font-bold text-cyan-400 w-fit">
                    <Globe2 className="h-3.5 w-3.5 animate-spin-slow" />
                    <span>Interactive 3D Technology Globe</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    A comprehensive stack engineered for <span className="text-gradient">high-throughput production</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Specialized in modern client-side architectures (React 19 &amp; Next.js 15), certified NoSQL schema topologies (MongoDB Atlas), robust asynchronous backends (Node.js &amp; FastAPI), and low-latency computer vision pipelines (YOLOv11 &lt;30ms).
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center">
                      <div className="font-mono text-base sm:text-xl font-bold text-cyan-400">25+</div>
                      <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Core Technologies</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center">
                      <div className="font-mono text-base sm:text-xl font-bold text-emerald-400">&lt;30ms</div>
                      <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Inference Speed</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center">
                      <div className="font-mono text-base sm:text-xl font-bold text-teal-400">100%</div>
                      <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Verified Proof</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Detailed Authentic Engineering Matrix Cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup + searchQuery}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                id={`panel-${activeGroup}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeGroup}`}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 relative z-10"
              >
                {filteredSkills.map((skill) => {
                  const BrandLogo = skill.logo;
                  return (
                    <div
                      key={skill.name}
                      onClick={() => setSelectedSkill(skill)}
                      className="skill-card-bg noise-overlay relative flex flex-col justify-between rounded-3xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-xl z-10 group cursor-pointer"
                    >
                      <div>
                        {/* Top Row: Official Brand Logo & Status Badge */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div
                            className="flex h-11 w-11 items-center justify-center rounded-2xl p-2 bg-white/5 border border-white/10 shadow-inner group-hover:border-cyan-400/40 transition-colors"
                            style={{
                              boxShadow: `0 0 15px ${skill.brandGlow}`,
                            }}
                          >
                            {BrandLogo && <BrandLogo className="h-6 w-6" />}
                          </div>

                          <div className="flex flex-col items-end gap-1">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                                skill.badgeType === "emerald"
                                  ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                  : skill.badgeType === "teal"
                                  ? "border border-teal-500/30 bg-teal-500/10 text-teal-400"
                                  : "border border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
                              }`}
                            >
                              <Sparkles className="h-2.5 w-2.5" />
                              {skill.badge}
                            </span>

                            <span className="font-mono text-[10px] text-slate-400">
                              {skill.experience || skill.proof}
                            </span>
                          </div>
                        </div>

                        {/* Skill Title */}
                        <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-cyan-300 transition-colors mb-3">
                          {skill.name}
                        </h3>

                        {/* Technical Capabilities Scope Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {skill.scope.map((item, i) => (
                            <span
                              key={i}
                              className="rounded-md bg-white/5 border border-white/10 px-2 py-1 font-mono text-[10px] sm:text-[11px] text-slate-300 font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Verified Proof Row */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold group-hover:underline">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Inspect Skill</span>
                        </span>
                        <span className="opacity-60 font-mono text-[10px]">{skill.proof}</span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {/* =========================================================================
            INTERACTIVE MODAL: SKILL DETAIL INSPECTOR
            ========================================================================= */}
        <AnimatePresence>
          {selectedSkill && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-xl rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-[#090d16] p-6 sm:p-8 shadow-2xl text-left overflow-hidden text-slate-900 dark:text-white"
              >
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-2.5 flex items-center justify-center shadow-inner"
                      style={{ boxShadow: `0 0 20px ${selectedSkill.brandGlow}` }}
                    >
                      {selectedSkill.logo && <selectedSkill.logo className="h-8 w-8" />}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-widest">
                        TECHNOLOGY SPECIFICATION
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                        {selectedSkill.name}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="p-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Experience & Level */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono text-xs">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px]">EXPERIENCE</span>
                      <span className="text-slate-900 dark:text-white font-bold">{selectedSkill.experience || "2+ Years Production"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px]">MASTERY LEVEL</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{selectedSkill.level || 94}% Production Core</span>
                    </div>
                  </div>

                  {/* Deep Description */}
                  <div>
                    <h4 className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 font-bold">
                      ARCHITECTURAL CAPABILITY
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                      {selectedSkill.details ||
                        `Production engineering with ${selectedSkill.name}, implementing high-performance pipelines, clean modular design, and robust error boundaries.`}
                    </p>
                  </div>

                  {/* Core Scopes */}
                  <div>
                    <h4 className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-bold">
                      VERIFIED COMPETENCIES
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedSkill.scope.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-mono"
                        >
                          <Check className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Production Proof */}
                  <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-slate-400">Deployed In Production:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{selectedSkill.proof}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="px-5 py-2.5 rounded-full border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/10 font-mono text-xs font-bold text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-all cursor-pointer"
                  >
                    Close Inspector
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            INTERACTIVE MODAL: CERTIFICATION DETAIL INSPECTOR
            ========================================================================= */}
        <AnimatePresence>
          {selectedCert && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-xl rounded-3xl border border-emerald-500/30 dark:border-emerald-500/40 bg-white dark:bg-[#090d16] p-6 sm:p-8 shadow-2xl text-left overflow-hidden text-slate-900 dark:text-white"
              >
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="h-16 w-16 rounded-2xl bg-emerald-950/10 dark:bg-[#001E2B] border border-emerald-500/40 p-2.5 flex items-center justify-center shadow-[0_0_25px_rgba(0,237,100,0.25)] shrink-0"
                    >
                      {selectedCert.logo && <selectedCert.logo className="h-10 w-10" />}
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">
                        <ShieldCheck className="h-3 w-3" /> VERIFIED CREDENTIAL
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                        {selectedCert.title}
                      </h3>
                      <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                        {selectedCert.issuer} • {selectedCert.year}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Credential ID Card */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-emerald-500/30 font-mono text-xs">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px]">VERIFIED CREDENTIAL ID</span>
                      <span className="text-emerald-600 dark:text-emerald-300 font-bold text-sm">{selectedCert.credentialId}</span>
                    </div>
                    <button
                      onClick={() => handleCopyCredential(selectedCert.credentialId)}
                      className="px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-500/25 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      {copiedId ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedId ? "Copied" : "Copy ID"}</span>
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                    {selectedCert.description}
                  </p>

                  {/* Key Highlights */}
                  <div>
                    <h4 className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-bold">
                      VERIFIED COMPETENCY TRACKS
                    </h4>
                    <div className="space-y-2">
                      {selectedCert.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 font-mono"
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Production Proof */}
                  <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-slate-400">Deployed In Production:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{selectedCert.productionProof}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-5 py-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-500/20 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30 transition-all cursor-pointer"
                  >
                    Close Inspector
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
