import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Layers, Mail, Code2, GraduationCap } from "lucide-react";
import SwitchModeToggle from "../SwitchModeToggle";

// Full Desktop Navigation (5 sections)
const DESKTOP_NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "contact", label: "Contact", icon: Mail },
];

// Complete Mobile Navigation (All 5 Sections + Avatar)
const MOBILE_NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code2 },
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
      setIsScrolled(scrollPosition > 20);

      if (scrollPosition < 250) {
        setActive("home");
        return;
      }

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - 250;

      if (isAtBottom) {
        setActive("contact");
        return;
      }

      const sections = DESKTOP_NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
      const viewportMiddle = window.innerHeight / 2;

      let currentActive = "home";
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportMiddle);

        if (rect.top <= viewportMiddle + 100 && rect.bottom >= 120) {
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
    <>
      {/* ========================================================================= */}
      {/* 💻 1. DESKTOP FLOATING NAVBAR (Top Floating Island — MD & Up)             */}
      {/* ========================================================================= */}
      <motion.nav
        layout
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className={`fixed left-1/2 top-6 z-[60] -translate-x-1/2 hidden md:flex items-center rounded-full border backdrop-blur-2xl transition-all duration-300 ring-1 shadow-2xl ${
          isLightMode
            ? isScrolled
              ? "px-3.5 py-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.18)] bg-white/95 ring-black/5 border-slate-300"
              : "px-4 py-2.5 shadow-[0_20px_50px_rgba(15,23,42,0.14)] bg-white/90 ring-black/5 border-slate-200"
            : isScrolled
              ? "px-3.5 py-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_20px_rgba(6,182,212,0.15)] bg-[#090d16]/95 ring-white/10 border-white/20"
              : "px-4 py-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_25px_rgba(6,182,212,0.12)] bg-[#090d16]/90 ring-white/10 border-white/15"
        }`}
      >
        {/* Brand Avatar & Name */}
        <a
          href="#home"
          aria-label="Sasiru Liyanage Home"
          className="group flex items-center gap-2.5 pr-2.5 pl-0.5 py-0.5 transition-transform active:scale-95 cursor-pointer shrink-0"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full p-[1.5px] bg-gradient-to-tr from-cyan-400 via-emerald-400 to-indigo-500 shadow-[0_0_12px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_18px_rgba(6,182,212,0.8)] group-hover:scale-105 transition-all shrink-0">
            <img
              src="/profile.png"
              alt="Sasiru Liyanage"
              className="h-full w-full rounded-full object-cover border border-black/40"
              onError={(e) => {
                e.target.src = "/favicon.svg";
              }}
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-[1.5px] border-[#090d16] shadow-[0_0_6px_#10b981]" />
          </div>

          <span
            className={`font-extrabold tracking-tight font-mono text-sm whitespace-nowrap ${
              isLightMode ? "text-slate-900" : "text-white"
            }`}
          >
            Sasiru{" "}
            <span className={isLightMode ? "text-cyan-700 font-bold" : "text-cyan-400 font-bold"}>
              Liyanage
            </span>
          </span>
        </a>

        {/* Laser Divider */}
        <div
          className={`mx-1.5 h-5 w-[1px] ${
            isLightMode
              ? "bg-gradient-to-b from-transparent via-slate-300 to-transparent"
              : "bg-gradient-to-b from-transparent via-white/20 to-transparent"
          } shrink-0`}
        />

        {/* Navigation Items */}
        <div className="flex items-center gap-1">
          {DESKTOP_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                aria-label={item.label}
                whileTap={{ scale: 0.92 }}
                className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer select-none ${
                  isActive
                    ? isLightMode
                      ? "text-teal-800 font-bold"
                      : "text-teal-300 font-bold"
                    : isLightMode
                    ? "text-slate-600 hover:text-cyan-700"
                    : "text-slate-400 hover:text-cyan-300"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeDesktopDockPill"
                    className={`absolute inset-0 rounded-full border ${
                      isLightMode
                        ? "bg-teal-500/15 border-teal-500/30 shadow-[0_2px_10px_rgba(13,148,136,0.15)]"
                        : "bg-teal-500/20 border-teal-400/40 shadow-[0_0_15px_rgba(13,148,136,0.4)]"
                    }`}
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}

                <Icon
                  className={`relative z-10 h-4 w-4 transition-transform duration-200 ${
                    isActive ? "scale-110" : ""
                  }`}
                />

                <span className="relative z-10 font-mono">{item.label}</span>
              </motion.a>
            );
          })}
        </div>

        {/* Available for Hire Badge */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center overflow-hidden"
            >
              <div className="mx-1.5 h-4 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-[10px] font-medium text-emerald-600 dark:text-emerald-300 whitespace-nowrap shadow-inner">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Available for Hire
              </span>
              <span className="ml-2 font-mono text-[9px] opacity-60 border border-white/15 rounded-lg px-2 py-1 whitespace-nowrap">
                Ctrl+K
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Laser Divider */}
        <div
          className={`mx-1.5 h-5 w-[1px] ${
            isLightMode
              ? "bg-gradient-to-b from-transparent via-slate-300 to-transparent"
              : "bg-gradient-to-b from-transparent via-white/20 to-transparent"
          } shrink-0`}
        />

        {/* Theme Switcher Toggle */}
        <div className="flex items-center pl-1 shrink-0">
          <SwitchModeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </motion.nav>

      {/* ========================================================================= */}
      {/* 📱 2. MOBILE BOTTOM FLOATING NAVBAR (Exactly 5 Items Per Spec — < MD)      */}
      {/* ========================================================================= */}
      <motion.nav
        layout
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`fixed bottom-3.5 left-1/2 z-[60] -translate-x-1/2 flex md:hidden items-center justify-around h-[62px] px-2.5 rounded-2xl border backdrop-blur-2xl transition-all duration-300 shadow-2xl w-[94vw] max-w-[410px] ${
          isLightMode
            ? "bg-white/95 border-slate-300 shadow-[0_16px_40px_rgba(15,23,42,0.2)]"
            : "bg-[#090d16]/95 border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(13,148,136,0.2)]"
        }`}
      >
        {/* Item 1: Profile Avatar */}
        <a
          href="#home"
          aria-label="Sasiru Liyanage Home"
          className="relative flex h-11 w-11 items-center justify-center rounded-full transition-transform active:scale-95 cursor-pointer shrink-0"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full p-[1.5px] bg-gradient-to-tr from-teal-400 via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(13,148,136,0.5)]">
            <img
              src="/profile.png"
              alt="Sasiru Liyanage"
              className="h-full w-full rounded-full object-cover border border-black/40"
              onError={(e) => {
                e.target.src = "/favicon.svg";
              }}
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-teal-400 border-2 border-[#090d16] shadow-[0_0_8px_#14b8a6]" />
          </div>
        </a>

        {/* Divider */}
        <div
          className={`h-6 w-[1px] ${
            isLightMode ? "bg-slate-300" : "bg-white/15"
          } shrink-0`}
        />

        {/* Items 2, 3, 4, 5: Home, Projects, About, Contact */}
        <div className="flex items-center justify-between flex-1 gap-1 pl-1">
          {MOBILE_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                aria-label={item.label}
                whileTap={{ scale: 0.92 }}
                className={`relative flex items-center justify-center gap-1.5 min-w-[44px] h-[44px] px-2.5 rounded-xl transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? isLightMode
                      ? "text-teal-700 font-bold"
                      : "text-teal-300 font-bold"
                    : isLightMode
                    ? "text-slate-500 hover:text-slate-900"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {/* Active Tab Teal Pill */}
                {isActive && (
                  <motion.span
                    layoutId="activeMobileNavPill"
                    className={`absolute inset-0 rounded-xl border ${
                      isLightMode
                        ? "bg-teal-500/15 border-teal-500/30 shadow-[0_2px_10px_rgba(13,148,136,0.15)]"
                        : "bg-teal-500/20 border-teal-400/40 shadow-[0_0_15px_rgba(13,148,136,0.4)]"
                    }`}
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}

                <Icon
                  className={`relative z-10 h-4 w-4 transition-transform duration-200 ${
                    isActive ? "scale-110" : ""
                  }`}
                />

                {/* Label text ONLY on active tab */}
                <AnimatePresence mode="popLayout">
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, x: -4 }}
                      animate={{ opacity: 1, width: "auto", x: 0 }}
                      exit={{ opacity: 0, width: 0, x: -4 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10 font-mono text-[11px] overflow-hidden whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
