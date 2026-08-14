import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
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

  // 3D Tilt Spring Physics for Floating Dock
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(y, { stiffness: 220, damping: 18 });
  const rotateY = useSpring(x, { stiffness: 220, damping: 18 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set((px - 0.5) * 12);
    y.set((0.5 - py) * 12);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
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
    <div className="fixed left-1/2 top-6 z-[60] -translate-x-1/2 [perspective:1000px]">
      <motion.nav
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        layout
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className={`relative flex items-center gap-1.5 rounded-full border backdrop-blur-2xl transition-all duration-500 ${
          isLightMode
            ? isScrolled
              ? "px-3.5 py-1.5 shadow-[0_20px_45px_rgba(15,23,42,0.18)] bg-white/95 scale-95 border-slate-300/90"
              : "px-4.5 py-2.5 shadow-[0_25px_55px_rgba(15,23,42,0.14)] bg-white/90 scale-100 border-slate-200"
            : isScrolled
              ? "px-3.5 py-1.5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] bg-[#0b0f17]/95 scale-95 border-white/25"
              : "px-4.5 py-2.5 shadow-[0_30px_70px_rgba(0,0,0,0.88)] bg-[#0b0f17]/90 scale-100 border-white/20"
        }`}
      >
        {/* Specular Rim Highlight for Real 3D Glass Look */}
        <div className="absolute inset-x-4 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/40 light-theme:via-indigo-400/40 to-transparent rounded-full pointer-events-none" />

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

              <AnimatePresence>
                {(!isScrolled || isActive) && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`relative z-10 font-mono overflow-hidden whitespace-nowrap ${
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

        <div className={`mx-1 h-5 w-px ${isLightMode ? "bg-slate-300" : "bg-white/15"}`} />

        {/* Available for Hire Pill (Collapses on Scroll) */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25 }}
              className="hidden items-center overflow-hidden md:flex"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-[10px] font-medium text-emerald-600 dark:text-emerald-300 whitespace-nowrap">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Available for Hire
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
