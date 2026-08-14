import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "Initializing Portfolio...",
  "Loading Cultural Assets...",
  "Calibrating Dumbara Matrix...",
  "Systems Online ✓",
];

export default function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  // Typewriter per line
  useEffect(() => {
    if (lineIndex >= LINES.length) return;
    const line = LINES[lineIndex];
    if (charIndex < line.length) {
      const t = setTimeout(() => {
        setDisplayedText((p) => p + line[charIndex]);
        setCharIndex((c) => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      // Next line
      const t = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setLineIndex((l) => l + 1);
      }, 320);
      return () => clearTimeout(t);
    }
  }, [charIndex, lineIndex]);

  // Progress bar
  useEffect(() => {
    const total = 1800;
    const steps = 80;
    const interval = total / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setProgress(Math.min(100, Math.round((step / steps) * 100)));
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => setDone(true), 300);
        setTimeout(() => onComplete(), 900);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#03050c] overflow-hidden"
        >
          {/* Ambient glows */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px] pointer-events-none" />

          {/* Logo / Initials */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="mb-10 relative"
          >
            <div className="h-20 w-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center shadow-2xl">
              <span
                className="font-mono text-2xl font-extrabold"
                style={{
                  background: "linear-gradient(135deg,#06b6d4,#6366f1,#a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                SL
              </span>
            </div>
            {/* Ring pulse */}
            <span className="absolute inset-0 rounded-2xl border border-cyan-400/30 animate-ping pointer-events-none" />
          </motion.div>

          {/* Typewriter */}
          <div className="h-6 mb-8 font-mono text-sm text-cyan-400/80 tracking-widest">
            {lineIndex < LINES.length ? displayedText : ""}
            <span className="animate-pulse ml-0.5">|</span>
          </div>

          {/* Progress bar */}
          <div className="relative w-64 sm:w-80 h-[3px] rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg,#06b6d4,#6366f1,#a855f7)",
                transition: "width 0.08s linear",
              }}
            />
          </div>
          <p className="mt-3 font-mono text-[11px] text-slate-500">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
