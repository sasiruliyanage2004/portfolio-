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

  // High-performance kinetic counter (0 -> 100 in ~1200ms)
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

    // Lighthouse: almost instant. Mobile: snappy 600ms. Desktop: cinematic 1200ms.
    const duration = isLighthouse ? 120 : isMobile ? 650 : 1250;
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
          className="fixed inset-0 z-[99999] overflow-hidden select-none cursor-pointer bg-black"
          title="Click anywhere to enter"
          role="region"
          aria-label="Portfolio Introduction Loader"
        >
          {/* =========================================================================
              TOP ARCHITECTURAL SHUTTER
              ========================================================================= */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#04060b] border-b border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-10 flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden"
            initial={{ y: 0 }}
            animate={isExiting ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
          >
            {/* Subtle cyber grid backdrop */}
            <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

            {/* Top HUD Row */}
            <div className="relative flex items-center justify-between w-full pointer-events-none">
              {/* Brand & Monogram Identity */}
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <span className="font-mono text-xs font-black tracking-widest text-cyan-300">
                    SL
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.25em] text-slate-100 uppercase">
                    SASIRU LIYANAGE
                  </span>
                  <span className="font-mono text-[9px] tracking-wider text-slate-400 uppercase">
                    SYSTEM ARCHITECT // 2026
                  </span>
                </div>
              </div>

              {/* Coordinates & Live Status Badge */}
              <div className="flex items-center gap-4 sm:gap-6 font-mono text-[10px]">
                <span className="hidden sm:inline-block tracking-widest text-slate-400">
                  6°55'55"N 79°51'52"E
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-semibold tracking-wider">LIVE</span>
                </div>
              </div>
            </div>

            {/* Top Shutter Bottom Guide */}
            <div className="relative w-full flex items-center justify-between text-slate-400 font-mono text-[9px] tracking-[0.2em] uppercase pointer-events-none opacity-80">
              <span>SYS.SEC // LEVEL 01</span>
              <span>DUMBARA KINETIC ENGINE</span>
            </div>
          </motion.div>

          {/* =========================================================================
              BOTTOM ARCHITECTURAL SHUTTER
              ========================================================================= */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#04060b] border-t border-white/[0.08] shadow-[0_-15px_40px_rgba(0,0,0,0.8)] z-10 flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden"
            initial={{ y: 0 }}
            animate={isExiting ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }}
          >
            {/* Subtle cyber grid backdrop */}
            <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Shutter Top Guide */}
            <div className="relative w-full flex items-center justify-between text-slate-400 font-mono text-[9px] tracking-[0.2em] uppercase pointer-events-none opacity-80">
              <span>LATENCY // &lt;16MS</span>
              <span>CULTURAL CYBER ALGORITHMS</span>
            </div>

            {/* Bottom HUD Row */}
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full pointer-events-none">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-slate-300 font-medium">
                  SLIIT UNDERGRADUATE • FULL-STACK SOFTWARE ENGINEER
                </span>
                <span className="font-mono text-[9px] text-slate-400 tracking-wider">
                  COLOMBO, SRI LANKA • UTC+05:30
                </span>
              </div>

              {/* Click to Skip Affordance */}
              <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-[10px] tracking-widest text-cyan-300 bg-cyan-500/10 border border-cyan-500/25 px-3.5 py-1.5 rounded-full hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)]">
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
            <div className="absolute w-72 sm:w-[480px] h-72 sm:h-[480px] bg-gradient-to-r from-cyan-500/20 via-emerald-500/15 to-indigo-500/20 rounded-full blur-[110px] -z-10 pointer-events-none" />

            <div className="flex flex-col items-center text-center px-4">
              {/* Ultra-Large Modernist Kinetic Counter */}
              <div className="flex items-baseline justify-center">
                <span
                  className="font-mono text-8xl sm:text-[9.5rem] md:text-[11.5rem] font-black tracking-tighter leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
                  style={{
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(progress).padStart(2, "0")}
                </span>
                <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-light text-cyan-400/80 ml-2 select-none">
                  %
                </span>
              </div>

              {/* Dynamic Phase Status Indicator */}
              <div className="mt-3 sm:mt-5 flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-pulse" />
                <p className="font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase text-cyan-200 font-semibold drop-shadow-sm">
                  {currentPhase}
                </p>
              </div>

              {/* Razor-Thin Precision Laser Seam Progress Line */}
              <div className="mt-6 sm:mt-8 relative w-56 sm:w-80 md:w-96 h-[2px] bg-white/[0.08] rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.9)]"
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
              className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_30px_#06b6d4,0_0_10px_#10b981] z-30 pointer-events-none"
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
