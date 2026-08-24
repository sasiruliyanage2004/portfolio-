import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function SwitchModeToggle({ theme, toggleTheme }) {
  const isLight = theme === "light";

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      title={`Switch to ${isLight ? "Dark (Cyber)" : "Light (Porcelain)"} Mode`}
      aria-label={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
      className={`relative inline-flex items-center justify-between rounded-full p-1 transition-all duration-300 cursor-pointer border select-none w-[68px] h-[34px] ${
        isLight
          ? "bg-slate-200/90 border-slate-300/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)] hover:border-amber-500/50"
          : "bg-[#0b101a] border-white/20 shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)] hover:border-cyan-400/60"
      }`}
    >
      {/* Sliding Luminous Knob */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={`absolute rounded-full z-0 flex items-center justify-center w-[26px] h-[26px] transition-all duration-300 ${
          isLight
            ? "left-1 bg-gradient-to-tr from-white to-amber-50 border border-amber-300/60 shadow-[0_2px_8px_rgba(245,158,11,0.3)]"
            : "right-1 bg-gradient-to-tr from-[#121927] to-[#1c273c] border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.5)]"
        }`}
      />

      {/* Sun Icon Button (Left) */}
      <div
        className={`relative z-10 flex flex-1 items-center justify-center transition-all duration-300 ${
          isLight
            ? "text-amber-500 scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
            : "text-slate-500 opacity-40 hover:opacity-80"
        }`}
      >
        <Sun className="h-4 w-4" />
      </div>

      {/* Moon Icon Button (Right) */}
      <div
        className={`relative z-10 flex flex-1 items-center justify-center transition-all duration-300 ${
          !isLight
            ? "text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]"
            : "text-slate-400 opacity-40 hover:opacity-80"
        }`}
      >
        <Moon className="h-4 w-4" />
      </div>
    </motion.button>
  );
}
