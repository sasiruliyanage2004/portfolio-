import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function SwitchModeToggle({ theme, toggleTheme, size = "compact" }) {
  const isLight = theme === "light";

  const isCompact = size === "compact";
  const containerClass = isCompact ? "w-[58px] h-[28px] p-0.5" : "w-[68px] h-[34px] p-1";
  const knobClass = isCompact ? "w-[24px] h-[24px]" : "w-[26px] h-[26px]";
  const iconClass = isCompact ? "h-3 w-3" : "h-3.5 w-3.5";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
      className={`relative inline-flex items-center justify-between rounded-full transition-all duration-300 cursor-pointer border select-none ${containerClass} ${
        isLight
          ? "bg-slate-200/90 border-slate-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] hover:border-slate-400"
          : "bg-[#090d16] border-white/20 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] hover:border-cyan-400/50"
      }`}
    >
      {/* Sliding Animated Knob */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={`absolute rounded-full shadow-md z-0 flex items-center justify-center ${knobClass} ${
          isLight
            ? "left-0.5 bg-white border border-slate-300/80 shadow-sm"
            : "right-0.5 bg-[#172033] border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
        }`}
      />

      {/* Sun Icon Position (Left) */}
      <div
        className={`relative z-10 flex flex-1 items-center justify-center transition-all duration-300 ${
          isLight ? "text-amber-500 scale-110 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]" : "text-slate-500 opacity-40 hover:opacity-70"
        }`}
      >
        <Sun className={iconClass} />
      </div>

      {/* Moon Icon Position (Right) */}
      <div
        className={`relative z-10 flex flex-1 items-center justify-center transition-all duration-300 ${
          !isLight ? "text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" : "text-slate-400 opacity-40 hover:opacity-70"
        }`}
      >
        <Moon className={iconClass} />
      </div>
    </button>
  );
}
