import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, Home, Layers, Mail, User } from "lucide-react";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "skills", label: "Skills", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function FloatingDockCyber() {
  const [active, setActive] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
      // Ensure 'home' is active when near top of the page
      if (window.scrollY < 300) {
        setActive("home");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY >= 300) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -30% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={`fixed left-1/2 top-8 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/20 backdrop-blur-xl transition-all duration-500 ${
        isScrolled
          ? "px-3 py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] bg-[#0b0f17]/95 scale-95"
          : "px-4 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#0b0f17]/85 scale-100"
      }`}
    >
      {NAV.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId="dock-active"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/35 via-violet-500/35 to-cyan-500/35 ring-1 ring-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
            <Icon
              className={`relative h-3.5 w-3.5 ${isActive ? "text-cyan-300" : "text-slate-400"}`}
            />
            <span className={`relative ${isActive ? "text-white font-semibold" : "text-slate-400"}`}>
              {item.label}
            </span>
          </a>
        );
      })}

      {/* Smoothly Collapsing Right Items on Scroll */}
      <AnimatePresence mode="popLayout">
        {!isScrolled && (
          <motion.div
            layout
            initial={{ opacity: 0, width: 0, scale: 0.8 }}
            animate={{ opacity: 1, width: "auto", scale: 1 }}
            exit={{ opacity: 0, width: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="flex items-center gap-1.5 overflow-hidden"
          >
            <div className="mx-1 h-5 w-px bg-white/15" />

            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 font-mono text-[10px] text-emerald-300 md:inline-flex whitespace-nowrap">
              <span className="relative flex h-1.5 w-1.5">
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Available for Hire
            </span>

            <a
              href="/resume.pdf"
              download="Sasiru_Liyanage_CV.pdf"
              aria-label="Download resume"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-cyan-300 hover:bg-white/10"
            >
              <FileDown className="h-3.5 w-3.5" />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-cyan-300 hover:bg-white/10"
            >
              <GithubIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-cyan-300 hover:bg-white/10"
            >
              <LinkedinIcon className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
