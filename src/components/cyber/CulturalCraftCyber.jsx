import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Code2, Cpu, Palette } from "lucide-react";

const CRAFT_ITEMS = [
  {
    title: "Dumbara Geometric Matrix",
    heritage: "Traditional Dumbara mat-weaving from Kandy — geometric diamond motifs passed down through generations of Sri Lankan master weavers.",
    math: "Procedural Canvas Rendering: Nested Diamond Grid Matrix with dynamic mouse opacity spotlighting.",
    accent: "from-cyan-500 to-indigo-500",
  },
  {
    title: "Liyawela Bio-Flow",
    heritage: "Liyawela vine carvings — organic, flowing sinuous lines symbolizing growth, vitality, and continuous motion.",
    math: "Harmonic Trigonometric Wave: y = sin(x * 0.02 + t) * 20 with dynamic cursor repulsion vectors.",
    accent: "from-indigo-500 to-violet-500",
  },
  {
    title: "Pala Pethi Lotus Petals",
    heritage: "Pala Pethi lotus petal motifs seen in classic Sri Lankan temple architecture — representing purity and flourishing innovation.",
    math: "Polar Coordinate Curves: r = cos(k * θ) polar petal equations rendered with radial glow gradients.",
    accent: "from-violet-500 to-cyan-500",
  },
];

export default function CulturalCraftCyber() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.88, 1, 1, 0.88]);
  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [60, 0, 0, -60]);

  return (
    <section ref={sectionRef} id="craft" className="relative overflow-hidden bg-transparent px-6 py-24 lg:px-10 scroll-mt-24">
      <motion.div style={{ scale, y }} className="mx-auto max-w-7xl relative">
        {/* Section Header (Smudge-free in Light Mode) */}
        <div className="mb-12 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400 font-extrabold uppercase flex items-center justify-center gap-2 dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <Sparkles className="h-3.5 w-3.5" />
            HERITAGE MEETS PROCEDURAL MATH
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white dark:drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            The Craft Behind <span className="text-gradient">The Code</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal">
            Bridging centuries-old Sri Lankan motif artistry with 60fps real-time HTML5 Canvas math algorithms.
          </p>
        </div>

        {/* 3 Craft Feature Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CRAFT_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="project-card-obsidian noise-overlay relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 hover:border-cyan-400 shadow-xl"
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
          ))}
        </div>
      </motion.div>
    </section>
  );
}
