import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Layers, Mail, User, GraduationCap } from "lucide-react";

// Exactly 5 essential navigation destinations
const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "education", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function FloatingDockCyber({ theme }) {
  const [active, setActive] = useState("home");
  const isLightMode = theme === "light";

  // Bulletproof Scroll Spy for 100% Accurate Navbar Active Section Highlighting
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY;

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
    <motion.nav
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`fixed bottom-4 sm:bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center justify-around sm:justify-center gap-1 sm:gap-2 h-[64px] sm:h-[68px] px-2.5 sm:px-4 rounded-2xl sm:rounded-full border backdrop-blur-2xl transition-all duration-300 shadow-2xl w-[94vw] max-w-[440px] sm:w-auto sm:max-w-none ${
        isLightMode
          ? "bg-white/95 border-slate-300 shadow-[0_16px_40px_rgba(15,23,42,0.18)]"
          : "bg-[#090d16]/90 border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(13,148,136,0.2)]"
      }`}
    >
      {/* 🚀 Item 1: Profile Avatar Home Link */}
      <a
        href="#home"
        aria-label="Sasiru Liyanage Home"
        className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full transition-transform active:scale-95 cursor-pointer shrink-0"
      >
        <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full p-[1.5px] bg-gradient-to-tr from-teal-400 via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(13,148,136,0.5)] group-hover:shadow-[0_0_18px_rgba(6,182,212,0.8)] group-hover:scale-105 transition-all">
          <img
            src="/profile.png"
            alt="Sasiru Liyanage"
            className="h-full w-full rounded-full object-cover border border-black/40"
            onError={(e) => {
              e.target.src = "/favicon.svg";
            }}
          />
          {/* Live Online Teal Status Dot */}
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-teal-400 border-2 border-[#090d16] shadow-[0_0_8px_#14b8a6]" />
        </div>
      </a>

      {/* Laser Vertical Divider */}
      <div
        className={`mx-0.5 sm:mx-1.5 h-6 w-[1px] ${
          isLightMode
            ? "bg-gradient-to-b from-transparent via-slate-300 to-transparent"
            : "bg-gradient-to-b from-transparent via-white/20 to-transparent"
        } shrink-0`}
      />

      {/* 🧭 Navigation Items (Home, Projects, About, Skills, Contact) */}
      <div className="flex items-center justify-between sm:justify-center flex-1 sm:flex-initial gap-1 sm:gap-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              aria-label={item.label}
              whileTap={{ scale: 0.92 }}
              className={`relative flex items-center justify-center gap-1.5 min-w-[44px] h-[44px] sm:min-w-[48px] sm:h-[48px] px-2.5 sm:px-3.5 rounded-xl sm:rounded-full transition-all duration-200 cursor-pointer select-none ${
                isActive
                  ? isLightMode
                    ? "text-teal-700 font-bold"
                    : "text-teal-300 font-bold"
                  : isLightMode
                  ? "text-slate-500 hover:text-slate-900"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {/* ✨ Active Tab Sliding Pill Background (Teal Accent) */}
              {isActive && (
                <motion.span
                  layoutId="activeBottomNavPill"
                  className={`absolute inset-0 rounded-xl sm:rounded-full border ${
                    isLightMode
                      ? "bg-teal-500/15 border-teal-500/30 shadow-[0_2px_12px_rgba(13,148,136,0.15)]"
                      : "bg-teal-500/20 border-teal-400/40 shadow-[0_0_16px_rgba(13,148,136,0.4)]"
                  }`}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}

              {/* Icon */}
              <Icon
                className={`relative z-10 h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform duration-200 ${
                  isActive
                    ? isLightMode
                      ? "text-teal-700 scale-110"
                      : "text-teal-300 scale-110 drop-shadow-[0_0_8px_rgba(20,184,166,0.6)]"
                    : ""
                }`}
              />

              {/* Active Tab Label (Shown ONLY on the Active Tab) */}
              <AnimatePresence mode="popLayout">
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, width: 0, x: -6 }}
                    animate={{ opacity: 1, width: "auto", x: 0 }}
                    exit={{ opacity: 0, width: 0, x: -6 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 font-mono text-[11px] sm:text-xs overflow-hidden whitespace-nowrap"
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
  );
}
