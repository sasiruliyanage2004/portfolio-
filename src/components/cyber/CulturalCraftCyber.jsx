import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Code2, Palette, Sun, Moon } from "lucide-react";

const CRAFT_ITEMS = [
  {
    id: "dumbara",
    title: "Dumbara Geometric Matrix",
    heritage: "Traditional Dumbara mat-weaving from Kandy — geometric diamond motifs passed down through generations of Sri Lankan master weavers.",
    math: "Procedural Canvas Rendering: Nested Diamond Grid Matrix with dynamic mouse opacity spotlighting.",
    accent: "from-cyan-500 to-indigo-500",
  },
  {
    id: "liyawela",
    title: "Liyawela Bio-Flow",
    heritage: "Liyawela vine carvings — organic, flowing sinuous lines symbolizing growth, vitality, and continuous motion.",
    math: "Harmonic Trigonometric Wave: y = sin(x * 0.02 + t) * 20 with dynamic cursor repulsion vectors.",
    accent: "from-indigo-500 to-violet-500",
  },
  {
    id: "palapethi",
    title: "Pala Pethi Lotus Petals",
    heritage: "Pala Pethi lotus petal motifs seen in classic Sri Lankan temple architecture — representing purity and flourishing innovation.",
    math: "Polar Coordinate Curves: r = cos(k * θ) polar petal equations rendered with radial glow gradients.",
    accent: "from-violet-500 to-cyan-500",
  },
];

export default function CulturalCraftCyber({ theme, toggleTheme, activePattern, setActivePattern }) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.88, 1, 1, 0.88]);
  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [60, 0, 0, -60]);

  const isLight = theme === "light";

  return (
    <section ref={sectionRef} id="craft" className="relative overflow-hidden bg-transparent px-6 py-24 lg:px-10 scroll-mt-24">
      <motion.div style={{ scale, y }} className="mx-auto max-w-7xl relative">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400 font-extrabold uppercase flex items-center justify-center gap-2">
            <Sparkles className="h-3.5 w-3.5" />
            HERITAGE MEETS PROCEDURAL MATH
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
            The Craft Behind <span className="text-gradient">The Code</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal">
            Bridging centuries-old Sri Lankan motif artistry with 60fps real-time HTML5 Canvas math algorithms.
          </p>

          {/* Interactive Motif Selector & Theme Switcher Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            {CRAFT_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePattern?.(item.id)}
                className={`rounded-full px-4 py-2 font-semibold transition-all cursor-pointer ${
                  activePattern === item.id
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/25"
                    : "glass-panel text-slate-600 dark:text-slate-300 hover:border-cyan-400/50"
                }`}
              >
                {item.title.split(" ")[0]} Motif
              </button>
            ))}

            <button
              onClick={toggleTheme}
              className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-400/50 cursor-pointer shadow-md"
            >
              {isLight ? <Moon className="h-3.5 w-3.5 text-indigo-500" /> : <Sun className="h-3.5 w-3.5 text-amber-400" />}
              <span>{isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}</span>
            </button>
          </div>
        </div>

        {/* 3 Craft Feature Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CRAFT_ITEMS.map((item) => {
            const isActive = activePattern === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActivePattern?.(item.id)}
                className={`project-card-obsidian noise-overlay relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 cursor-pointer shadow-xl ${
                  isActive ? "border-cyan-400 shadow-cyan-500/20 ring-1 ring-cyan-400/50" : "hover:border-cyan-400/50"
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`h-8 w-8 rounded-xl bg-gradient-to-r ${item.accent} flex items-center justify-center text-white shadow-md`}>
                      <Palette className="h-4 w-4" />
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-normal mb-5">
                    {item.heritage}
                  </p>
                </div>

                <div className="bento-ui-preview-frame rounded-2xl p-4 font-mono text-xs shadow-inner">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2">
                    <Code2 className="h-4 w-4" />
                    <span>Algorithm Math</span>
                  </div>
                  <p className="text-[11px] opacity-80 leading-normal">{item.math}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
