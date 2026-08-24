import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Layers, Mail, Code2, GraduationCap, Sun, Moon } from "lucide-react";

// Complete Navigation Items
const NAV_ITEMS = [
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

      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
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
        className={`fixed left-1/2 top-6 z-[60] -translate-x-1/2 hidden md:flex items-center rounded-2xl border backdrop-blur-2xl transition-all duration-300 shadow-2xl ${
          isLightMode
            ? isScrolled
              ? "px-3 py-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.18)] bg-white/95 border-slate-300"
              : "px-3.5 py-2 shadow-[0_20px_50px_rgba(15,23,42,0.14)] bg-white/90 border-slate-200"
            : isScrolled
              ? "px-3 py-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_20px_rgba(6,182,212,0.15)] bg-[#090d16]/95 border-white/20"
              : "px-3.5 py-2 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_25px_rgba(6,182,212,0.12)] bg-[#090d16]/90 border-white/15"
        }`}
      >
        {/* Brand Avatar & Name */}
        <a
          href="#home"
          aria-label="Sasiru Liyanage Home"
          className="group flex items-center gap-2.5 pr-2.5 pl-1 py-1 transition-transform active:scale-95 cursor-pointer shrink-0"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl p-[1.5px] bg-gradient-to-tr from-cyan-400 via-emerald-400 to-indigo-500 shadow-[0_0_12px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_18px_rgba(6,182,212,0.8)] group-hover:scale-105 transition-all shrink-0">
            <img
              src="/profile.png"
              alt="Sasiru Liyanage"
              className="h-full w-full rounded-[10px] object-cover border border-black/40"
              onError={(e) => {
                e.target.src = "/favicon.svg";
              }}
            />
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 border-[1.5px] border-[#090d16] shadow-[0_0_6px_#10b981]" />
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
          className={`mx-1.5 h-6 w-[1px] ${
            isLightMode ? "bg-slate-300" : "bg-white/15"
          } shrink-0`}
        />

        {/* 🎨 Magic UI Gradient Button Group Navigation */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                aria-label={item.label}
                whileTap={{ scale: 0.92 }}
                className={`relative flex items-center gap-2 h-10 px-3.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? isLightMode
                      ? "text-slate-900 font-bold"
                      : "text-white font-bold"
                    : isLightMode
                    ? "text-slate-600 hover:text-cyan-700"
                    : "text-slate-400 hover:text-cyan-300"
                }`}
              >
                {/* 🌟 Magic UI Active Gradient Border Ring */}
                {isActive && (
                  <motion.div
                    layoutId="activeDesktopGradientBorder"
                    className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-tr from-cyan-400 via-teal-400 to-emerald-400 shadow-[0_0_16px_rgba(6,182,212,0.5)] z-0"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  >
                    <div
                      className={`w-full h-full rounded-[10px] ${
                        isLightMode ? "bg-white" : "bg-[#0b0f17]"
                      }`}
                    />
                  </motion.div>
                )}

                <Icon
                  className={`relative z-10 h-4 w-4 transition-transform duration-200 ${
                    isActive ? "text-cyan-400 scale-110" : ""
                  }`}
                />

                <span className="relative z-10">{item.label}</span>
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
              <div className="mx-1.5 h-6 w-[1px] bg-white/15" />

              <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-[10px] font-medium text-emerald-600 dark:text-emerald-300 whitespace-nowrap shadow-inner">
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
          className={`mx-1.5 h-6 w-[1px] ${
            isLightMode ? "bg-slate-300" : "bg-white/15"
          } shrink-0`}
        />

        {/* ☀️/🌙 Magic UI Integrated Theme Toggle Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="relative flex items-center justify-center h-10 w-10 rounded-xl text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          {isLightMode ? (
            <Sun className="h-4.5 w-4.5 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          ) : (
            <Moon className="h-4.5 w-4.5 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.7)]" />
          )}
        </motion.button>
      </motion.nav>

      {/* ========================================================================= */}
      {/* 📱 2. MOBILE GRADIENT BUTTON GROUP DOCK (Bottom Floating Island — < MD)   */}
      {/* ========================================================================= */}
      <motion.nav
        layout
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`fixed bottom-3.5 left-1/2 z-[60] -translate-x-1/2 flex md:hidden items-center justify-between h-[60px] p-1.5 rounded-2xl border backdrop-blur-2xl transition-all duration-300 shadow-2xl w-[94vw] max-w-[420px] ${
          isLightMode
            ? "bg-white/95 border-slate-300 shadow-[0_16px_40px_rgba(15,23,42,0.2)]"
            : "bg-[#090d16]/95 border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(6,182,212,0.2)]"
        }`}
      >
        {/* Navigation Buttons Group */}
        <div className="flex items-center justify-between flex-1 gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                aria-label={item.label}
                whileTap={{ scale: 0.92 }}
                className={`relative flex items-center justify-center h-11 w-11 rounded-xl transition-all duration-200 cursor-pointer select-none shrink-0 ${
                  isActive
                    ? isLightMode
                      ? "text-cyan-700"
                      : "text-white"
                    : isLightMode
                    ? "text-slate-500 hover:text-slate-900"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {/* 🌟 Magic UI Glowing Gradient Border for Active Item */}
                {isActive && (
                  <motion.div
                    layoutId="activeMobileGradientBorder"
                    className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-tr from-cyan-400 via-teal-400 to-emerald-400 shadow-[0_0_14px_rgba(6,182,212,0.6)] z-0"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  >
                    <div
                      className={`w-full h-full rounded-[10px] ${
                        isLightMode ? "bg-white" : "bg-[#0b0f17]"
                      }`}
                    />
                  </motion.div>
                )}

                <Icon
                  className={`relative z-10 h-5 w-5 transition-transform duration-200 ${
                    isActive
                      ? isLightMode
                        ? "text-cyan-700 scale-110"
                        : "text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                      : ""
                  }`}
                />
              </motion.a>
            );
          })}
        </div>

        {/* Divider */}
        <div
          className={`mx-1.5 h-6 w-[1px] ${
            isLightMode ? "bg-slate-300" : "bg-white/15"
          } shrink-0`}
        />

        {/* ☀️/🌙 Integrated Theme Toggle Button (Matching media_1787592485968.png!) */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.08 }}
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="relative flex items-center justify-center h-11 w-11 rounded-xl text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer shrink-0"
        >
          {isLightMode ? (
            <Sun className="h-5 w-5 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          ) : (
            <Moon className="h-5 w-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          )}
        </motion.button>
      </motion.nav>
    </>
  );
}
