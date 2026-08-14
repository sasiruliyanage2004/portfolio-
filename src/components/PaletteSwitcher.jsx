import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, Sparkles } from "lucide-react";

export const PALETTES = [
  {
    id: "current",
    name: "Classic Cyber",
    desc: "Cyan → Indigo → Violet",
    colors: ["#06b6d4", "#6366f1", "#a855f7"],
    previewGradient: "linear-gradient(135deg, #06b6d4 0%, #6366f1 50%, #a855f7 100%)",
  },
  {
    id: "option-a",
    name: "Emerald Matrix",
    desc: "Cyan → Emerald → Teal",
    colors: ["#06b6d4", "#10b981", "#0d9488"],
    previewGradient: "linear-gradient(135deg, #06b6d4 0%, #10b981 50%, #0d9488 100%)",
  },
  {
    id: "option-b",
    name: "Sapphire Glow",
    desc: "Indigo → Cyan → Emerald",
    colors: ["#6366f1", "#06b6d4", "#10b981"],
    previewGradient: "linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #10b981 100%)",
  },
  {
    id: "option-c",
    name: "Teal Aurora ⭐",
    desc: "Teal → Cyan → Violet",
    colors: ["#0d9488", "#06b6d4", "#a855f7"],
    previewGradient: "linear-gradient(135deg, #0d9488 0%, #06b6d4 50%, #a855f7 100%)",
  },
];

export default function PaletteSwitcher({ activePalette, onSelectPalette }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-8 z-[70]">
      {/* Palette selector trigger button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Customize Theme Gradient Palette"
        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 dark:border-white/20 light-theme:border-slate-300 bg-[#090d16]/90 dark:bg-[#090d16]/90 light-theme:bg-white/95 backdrop-blur-xl shadow-2xl transition-all hover:border-cyan-400/50 cursor-pointer text-cyan-400 dark:text-cyan-300 light-theme:text-indigo-600"
      >
        <span
          className="absolute inset-0 rounded-full opacity-30 animate-pulse pointer-events-none"
          style={{
            background: PALETTES.find((p) => p.id === activePalette)?.previewGradient || PALETTES[0].previewGradient,
          }}
        />
        <Palette className="h-5 w-5 relative z-10" />
      </motion.button>

      {/* Floating Menu Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15, x: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute bottom-16 right-0 w-72 rounded-3xl border border-white/20 dark:border-white/20 light-theme:border-slate-300 bg-[#090d16]/95 dark:bg-[#090d16]/95 light-theme:bg-white/95 backdrop-blur-2xl p-4 shadow-2xl text-slate-100 dark:text-slate-100 light-theme:text-slate-900 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 dark:border-white/10 light-theme:border-slate-200 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400 light-theme:text-indigo-600" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">Live Color Matrix</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400 light-theme:text-slate-500">4 Palettes</span>
            </div>

            {/* Options List */}
            <div className="space-y-2">
              {PALETTES.map((palette) => {
                const isSelected = activePalette === palette.id;
                return (
                  <button
                    key={palette.id}
                    onClick={() => {
                      onSelectPalette(palette.id);
                    }}
                    className={`group w-full flex items-center justify-between p-2.5 rounded-2xl border transition-all text-left cursor-pointer ${
                      isSelected
                        ? "border-cyan-400/80 bg-cyan-500/10 light-theme:border-indigo-500 light-theme:bg-indigo-50 shadow-lg shadow-cyan-500/10"
                        : "border-white/10 dark:border-white/10 light-theme:border-slate-200 hover:border-white/25 hover:bg-white/5 light-theme:hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Gradient preview swatch pill */}
                      <div
                        className="h-7 w-7 rounded-xl shadow-md border border-white/20 shrink-0"
                        style={{ background: palette.previewGradient }}
                      />
                      <div>
                        <div className="font-mono text-xs font-bold text-white dark:text-white light-theme:text-slate-900 flex items-center gap-1.5">
                          {palette.name}
                        </div>
                        <div className="font-mono text-[10px] text-slate-400 light-theme:text-slate-600 leading-tight">
                          {palette.desc}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="h-5 w-5 rounded-full bg-cyan-400 light-theme:bg-indigo-600 flex items-center justify-center text-[#05070e] light-theme:text-white shrink-0">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer tip */}
            <div className="mt-3 pt-2.5 border-t border-white/10 dark:border-white/10 light-theme:border-slate-200 text-center">
              <p className="font-mono text-[10px] text-slate-400 light-theme:text-slate-500">
                Click any palette to preview live on entire site
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
