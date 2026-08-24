import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Layers, Mail, User, GraduationCap } from "lucide-react";
import SwitchModeToggle from "../SwitchModeToggle";

const NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function FloatingDockCyber({ theme, toggleTheme }) {
  const [active, setActive] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const isLightMode = theme === "light";

  // Bulletproof Scroll Spy for 100% Accurate Navbar Active Section Highlighting
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 15);

      if (scrollPosition < 250) {
        setActive("home");
        return;
      }

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - 300;

      if (isAtBottom) {
        setActive("contact");
        return;
      }

      const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
      const viewportMiddle = window.innerHeight / 2;

      let currentActive = "home";
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportMiddle);

        if (rect.top <= viewportMiddle + 100 && rect.bottom >= 150) {
          if (distance < minDistance) {
            minDistance = distance;
            currentActive = section.id;
          }
        }
      });

      setActive(currentActive);
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  return (
    <motion.nav
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={`fixed left-1/2 top-3 sm:top-6 z-[60] flex -translate-x-1/2 items-center gap-1 sm:gap-1.5 rounded-full border backdrop-blur-2xl transition-all duration-500 max-w-[96vw] sm:max-w-none ${
        isLightMode
          ? isScrolled
            ? "px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.15)] bg-white/95 scale-95 border-slate-300"
            : "px-3 sm:px-4 py-1.5 sm:py-2.5 shadow-[0_20px_50px_rgba(15,23,42,0.12)] bg-white/90 scale-100 border-slate-200"
          : isScrolled
            ? "px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-[0_16px_50px_rgba(0,0,0,0.95)] bg-[#0b0f17]/95 scale-95 border-white/25"
            : "px-3 sm:px-4 py-1.5 sm:py-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-[#0b0f17]/90 scale-100 border-white/20"
      }`}
    >
      {/* 🚀 Watermelon-style Personal Brand Logo & Name */}
      <a
        href="#home"
        aria-label="Sasiru Liyanage Home"
        className="group flex items-center gap-2 pr-1 sm:pr-2 pl-1 py-1 transition-transform active:scale-95"
      >
        {/* Layered Cyber Diamond Brand Logo */}
        <div className="relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-teal-500/20 border border-emerald-400/40 shadow-[0_0_12px_rgba(16,185,129,0.3)] group-hover:border-cyan-400 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.5)] transition-all">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-emerald-400 group-hover:text-cyan-300 transition-colors"
          >
            <path
              d="M12 2L3 7L12 12L21 7L12 2Z"
              fill="currentColor"
              fillOpacity="0.9"
            />
            <path
              d="M3 12L12 17L21 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 17L12 22L21 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.7"
            />
          </svg>
        </div>

        {/* Brand Name Text (Hidden on extremely small screens, visible on sm and above) */}
        <span className="font-extrabold tracking-tight text-slate-900 dark:text-white font-mono text-xs sm:text-sm hidden xs:inline-block sm:inline-block">
          Sasiru<span className="text-cyan-400">.dev</span>
        </span>
      </a>

      {/* Brand Divider */}
      <div className={`mx-0.5 sm:mx-1 h-5 w-px ${isLightMode ? "bg-slate-300" : "bg-white/15"}`} />

      {/* Navigation Links */}
      {NAV.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-label={item.label}
            className="relative flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId="activeDockCyberPill"
                style={{ background: "linear-gradient(135deg, var(--grad-start), var(--grad-mid))" }}
                className="absolute inset-0 rounded-full opacity-90 shadow-md"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}

            <Icon
              className={`relative z-10 h-3.5 w-3.5 transition-transform duration-300 ${
                isActive ? "text-white scale-110" : isLightMode ? "text-slate-600 hover:text-cyan-600" : "text-slate-400 hover:text-cyan-300"
              }`}
            />

            <AnimatePresence>
              {(!isScrolled || isActive) && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`relative z-10 font-mono overflow-hidden whitespace-nowrap hidden md:inline-block ${
                    isActive ? "text-white font-semibold" : isLightMode ? "text-slate-600" : "text-slate-300"
                  }`}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        );
      })}

      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.25 }}
            className="hidden items-center overflow-hidden lg:flex"
          >
            <div className={`mx-1.5 h-5 w-px ${isLightMode ? "bg-slate-300" : "bg-white/15"}`} />

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-[10px] font-medium text-emerald-600 dark:text-emerald-300 whitespace-nowrap">
              <span className="relative flex h-1.5 w-1.5">
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Available for Hire
            </span>
            <span className="ml-2 font-mono text-[9px] opacity-60 border border-white/15 rounded-lg px-2 py-1 whitespace-nowrap hidden sm:inline-block">
              Ctrl+K
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Animated Sun/Moon Switch Mode Slider */}
      <div className="flex items-center pl-1 sm:pl-2">
        <div className={`mr-1 sm:mr-2 h-5 w-px ${isLightMode ? "bg-slate-300" : "bg-white/15"}`} />
        <SwitchModeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </motion.nav>
  );
}
