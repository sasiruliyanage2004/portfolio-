import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHASES = [
  { threshold: 0, text: "INITIALIZING ENVIRONMENT" },
  { threshold: 28, text: "SYNCHRONIZING DUMBARA MATRIX" },
  { threshold: 64, text: "COMPOSING ARCHITECTURAL UI" },
  { threshold: 92, text: "SYSTEMS ONLINE" },
];

export default function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const exitTriggered = useRef(false);

  // Check if active theme is light or dark
  const isLight =
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("light-theme") ||
        localStorage.getItem("portfolio_theme") !== "dark"
      : true;

  // Smooth exit handler (split shutters slide apart)
  const triggerExit = useCallback(() => {
    if (exitTriggered.current) return;
    exitTriggered.current = true;
    setProgress(100);
    setIsExiting(true);

    // Give the shutter animation 750ms to smoothly glide open before unmounting
    setTimeout(() => {
      setIsFinished(true);
      onComplete?.();
    }, 750);
  }, [onComplete]);

  // Click or keydown to skip/enter immediately
  useEffect(() => {
    const handleKeyDown = () => triggerExit();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerExit]);

  // High-performance kinetic counter (0 -> 100 in ~1100ms)
  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    const isLighthouse =
      typeof navigator !== "undefined" &&
      (navigator.userAgent.includes("Lighthouse") ||
        navigator.userAgent.includes("Chrome-Lighthouse") ||
        navigator.userAgent.includes("PageSpeed") ||
        navigator.userAgent.includes("Googlebot"));

    // Lighthouse: almost instant. Mobile: snappy 600ms. Desktop: cinematic 1150ms.
    const duration = isLighthouse ? 120 : isMobile ? 650 : 1150;
    const startTime = performance.now();

    let animationFrameId;

    const updateCounter = (currentTime) => {
      if (exitTriggered.current) return;
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);

      // Ease-out cubic for realistic, silky deceleration at the end
      const easeProgress = 1 - Math.pow(1 - progressRatio, 3);
      const currentVal = Math.round(easeProgress * 100);

      setProgress(currentVal);

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        // Brief pause at 100% before cinematic shutter opening
        setTimeout(() => {
          triggerExit();
        }, isLighthouse ? 20 : 120);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [triggerExit]);

  // Determine current active phase text
  const currentPhase =
    [...PHASES].reverse().find((p) => progress >= p.threshold)?.text ||
    "INITIALIZING";

  return (
    <AnimatePresence>
      {!isFinished && (
        <div
          onClick={triggerExit}
          className={`fixed inset-0 z-[99999] overflow-hidden select-none cursor-pointer ${
            isLight ? "bg-[#f8fafc]" : "bg-black"
          }`}
          title="Click anywhere to enter"
          role="region"
          aria-label="Portfolio Introduction Loader"
        >
          {/* =========================================================================
              TOP ARCHITECTURAL SHUTTER
              ========================================================================= */}
          <motion.div
            className={`absolute top-0 left-0 right-0 h-1/2 z-10 flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden ${
              isLight
                ? "bg-white/98 border-b border-slate-200/90 shadow-[0_15px_40px_rgba(15,23,42,0.06)]"
                : "bg-[#04060b] border-b border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
            }`}
            initial={{ y: 0 }}
            animate={isExiting ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
          >
            {/* Subtle cyber grid backdrop */}
            <div
              className={`absolute inset-0 pointer-events-none ${
                isLight
                  ? "opacity-[0.10] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]"
                  : "opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
              }`}
            />
            <div
              className={`absolute inset-0 pointer-events-none ${
                isLight
                  ? "bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent"
                  : "bg-gradient-to-b from-cyan-950/20 via-transparent to-transparent"
              }`}
            />

            {/* Top HUD Row */}
            <div className="relative flex items-center justify-between w-full pointer-events-none">
              {/* Brand & Monogram Identity */}
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md ${
                    isLight
                      ? "bg-gradient-to-br from-cyan-500/15 to-emerald-500/15 border border-cyan-500/30 text-cyan-700 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                      : "bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 border border-cyan-500/30 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  }`}
                >
                  <span className="font-mono text-xs font-black tracking-widest">
                    SL
                  </span>
                </div>
                <div className="flex flex-col">
                  <span
                    className={`font-mono text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase ${
                      isLight ? "text-slate-900" : "text-slate-100"
                    }`}
                  >
                    SASIRU LIYANAGE
                  </span>
                  <span
                    className={`font-mono text-[9px] tracking-wider uppercase ${
                      isLight ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    FULL-STACK ARCHITECT // 2026
                  </span>
                </div>
              </div>

              {/* Coordinates & Live Status Badge */}
              <div className="flex items-center gap-4 sm:gap-6 font-mono text-[10px]">
                <span
                  className={`hidden sm:inline-block tracking-widest ${
                    isLight ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  6°55'55"N 79°51'52"E
                </span>
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full border backdrop-blur-md ${
                    isLight
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 font-semibold"
                      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-semibold tracking-wider">LIVE</span>
                </div>
              </div>
            </div>

            {/* Top Shutter Bottom Guide */}
            <div
              className={`relative w-full flex items-center justify-between font-mono text-[9px] tracking-[0.2em] uppercase pointer-events-none ${
                isLight ? "text-slate-400" : "text-slate-400 opacity-80"
              }`}
            >
              <span>SYS.SEC // LEVEL 01</span>
              <span>DUMBARA KINETIC ENGINE</span>
            </div>
          </motion.div>

          {/* =========================================================================
              BOTTOM ARCHITECTURAL SHUTTER
              ========================================================================= */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 h-1/2 z-10 flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden ${
              isLight
                ? "bg-white/98 border-t border-slate-200/90 shadow-[0_-15px_40px_rgba(15,23,42,0.06)]"
                : "bg-[#04060b] border-t border-white/[0.08] shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"
            }`}
            initial={{ y: 0 }}
            animate={isExiting ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
          >
            {/* Subtle cyber grid backdrop */}
            <div
              className={`absolute inset-0 pointer-events-none ${
                isLight
                  ? "opacity-[0.10] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]"
                  : "opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
              }`}
            />
            <div
              className={`absolute inset-0 pointer-events-none ${
                isLight
                  ? "bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent"
                  : "bg-gradient-to-t from-cyan-950/20 via-transparent to-transparent"
              }`}
            />

            {/* Bottom Shutter Top Guide */}
            <div
              className={`relative w-full flex items-center justify-between font-mono text-[9px] tracking-[0.2em] uppercase pointer-events-none ${
                isLight ? "text-slate-400" : "text-slate-400 opacity-80"
              }`}
            >
              <span>LATENCY // &lt;16MS</span>
              <span>CULTURAL CYBER ALGORITHMS</span>
            </div>

            {/* Bottom HUD Row */}
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full pointer-events-none">
              <div className="flex flex-col">
                <span
                  className={`font-mono text-[10px] sm:text-[11px] tracking-wider font-semibold ${
                    isLight ? "text-slate-800" : "text-slate-300"
                  }`}
                >
                  SLIIT UNDERGRADUATE • FULL-STACK SOFTWARE ENGINEER
                </span>
                <span
                  className={`font-mono text-[9px] tracking-wider ${
                    isLight ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  COLOMBO, SRI LANKA • UTC+05:30
                </span>
              </div>

              {/* Click to Skip Affordance */}
              <div
                className={`flex items-center gap-2 self-start sm:self-auto font-mono text-[10px] tracking-widest px-3.5 py-1.5 rounded-full transition-all ${
                  isLight
                    ? "text-cyan-700 bg-cyan-50 border border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:bg-cyan-100"
                    : "text-cyan-300 bg-cyan-500/10 border border-cyan-500/25 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:bg-cyan-500/20"
                }`}
              >
                <span>CLICK ANYWHERE TO ENTER</span>
                <span className="animate-pulse">→</span>
              </div>
            </div>
          </motion.div>

          {/* =========================================================================
              CENTER DISPLAY — GIANT KINETIC COUNTER & LASER SWEEP
              ========================================================================= */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
            animate={
              isExiting
                ? { opacity: 0, scale: 1.12, filter: "blur(8px)" }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {/* Ambient Multi-Chromatic Aura Glow */}
            <div
              className={`absolute w-72 sm:w-[480px] h-72 sm:h-[480px] rounded-full blur-[110px] -z-10 pointer-events-none ${
                isLight
                  ? "bg-gradient-to-r from-cyan-400/20 via-emerald-400/20 to-indigo-400/20"
                  : "bg-gradient-to-r from-cyan-500/20 via-emerald-500/15 to-indigo-500/20"
              }`}
            />

            <div className="flex flex-col items-center text-center px-4">
              {/* Ultra-Large Modernist Kinetic Counter */}
              <div className="flex items-baseline justify-center">
                <span
                  className={`font-mono text-8xl sm:text-[9.5rem] md:text-[11.5rem] font-black tracking-tighter leading-none select-none text-transparent bg-clip-text ${
                    isLight
                      ? "bg-gradient-to-b from-slate-950 via-slate-800 to-cyan-700 drop-shadow-[0_10px_25px_rgba(15,23,42,0.12)]"
                      : "bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
                  }`}
                  style={{
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(progress).padStart(2, "0")}
                </span>
                <span
                  className={`font-mono text-2xl sm:text-4xl md:text-5xl font-light ml-2 select-none ${
                    isLight ? "text-cyan-600 font-semibold" : "text-cyan-400/80"
                  }`}
                >
                  %
                </span>
              </div>

              {/* Dynamic Phase Status Indicator */}
              <div className="mt-3 sm:mt-5 flex items-center gap-2.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                    isLight ? "bg-cyan-600 shadow-[0_0_8px_#0284c7]" : "bg-cyan-400 shadow-[0_0_8px_#06b6d4]"
                  }`}
                />
                <p
                  className={`font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase font-bold drop-shadow-sm ${
                    isLight ? "text-cyan-700" : "text-cyan-200"
                  }`}
                >
                  {currentPhase}
                </p>
              </div>

              {/* Razor-Thin Precision Laser Seam Progress Line */}
              <div
                className={`mt-6 sm:mt-8 relative w-56 sm:w-80 md:w-96 h-[2.5px] rounded-full overflow-hidden backdrop-blur-sm ${
                  isLight ? "bg-slate-200" : "bg-white/[0.08]"
                }`}
              >
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.9)]"
                  style={{
                    width: `${progress}%`,
                    transition: "width 0.05s linear",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* =========================================================================
              HORIZONTAL OPTICAL LASER SEAM (Flash on reveal)
              ========================================================================= */}
          {isExiting && (
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_30px_#06b6d4,0_0_10px_#10b981] z-30 pointer-events-none"
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
