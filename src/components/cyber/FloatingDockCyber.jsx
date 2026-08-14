import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Layers, Mail, User } from "lucide-react";

const NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "skills", label: "Skills", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function FloatingDockCyber({ theme }) {
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

      // If scrolled near bottom of page (Contact & Footer area)
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
    <div className="fixed left-1/2 top-6 z-[60] -translate-x-1/2">
      <motion.nav
        layout
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className={`relative flex items-center gap-1.5 rounded-full border backdrop-blur-2xl transition-all duration-500 px-5 py-2.5 ${
          isLightMode
            ? isScrolled
              ? "shadow-[0_20px_45px_rgba(15,23,42,0.18)] bg-white/95 border-slate-300"
              : "shadow-[0_25px_55px_rgba(15,23,42,0.14)] bg-white/90 border-slate-200"
            : isScrolled
              ? "shadow-[0_25px_60px_rgba(0,0,0,0.95)] bg-[#0b0f17]/95 border-white/25"
              : "shadow-[0_30px_70px_rgba(0,0,0,0.88)] bg-[#0b0f17]/90 border-white/20"
        }`}
      >
        {/* Specular Rim Highlight for Real Glass Look */}
        <div className="absolute inset-x-4 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/40 light-theme:via-indigo-400/40 to-transparent rounded-full pointer-events-none" />

        {/* Fully Expanded Navigation Items at ALL Scroll Positions */}
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
                  layoutId="activeDockCyberPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-90 shadow-md"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}

              <Icon
                className={`relative z-10 h-3.5 w-3.5 transition-transform duration-300 ${
                  isActive ? "text-white scale-110" : isLightMode ? "text-slate-600 hover:text-indigo-600" : "text-slate-400 hover:text-cyan-300"
                }`}
              />

              <span
                className={`relative z-10 font-mono overflow-hidden whitespace-nowrap ${
                  isActive ? "text-white font-semibold" : isLightMode ? "text-slate-600" : "text-slate-300"
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}

        <div className={`mx-1.5 h-5 w-px ${isLightMode ? "bg-slate-300" : "bg-white/15"}`} />

        {/* Ultra-Premium 3D Emerald Live Status Pill Badge */}
        <div className="hidden items-center md:flex">
          <a
            href="#contact"
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-bold tracking-tight whitespace-nowrap transition-all duration-300 shadow-lg ${
              isLightMode
                ? "bg-emerald-500/15 border border-emerald-600/40 text-emerald-800 hover:bg-emerald-500/25 hover:border-emerald-600/70 hover:shadow-emerald-500/20"
                : "bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400/70 hover:shadow-[0_0_18px_rgba(16,185,129,0.4)]"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            </span>
            <span>Available for Hire</span>
          </a>
        </div>
      </motion.nav>
    </div>
  );
}
