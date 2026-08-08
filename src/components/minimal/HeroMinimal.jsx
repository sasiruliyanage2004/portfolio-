import { motion, useScroll, useTransform } from 'framer-motion';
import Crosshair from '../Crosshair';
import { Star, Code2, Cpu } from 'lucide-react';

const STATS = [
  { value: '2+', label: 'Years Experience' },
  { value: '20+', label: 'Production Builds' },
  { value: '15+', label: 'Tech Stack' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: 0.08 * i },
  }),
};

export default function HeroMinimal({ briefingMode }) {
  const { scrollY } = useScroll();
  const avatarScale = useTransform(scrollY, [0, 400], [1, 0.88]);

  return (
    <section id="top" className="relative pt-40 pb-28 grid-veil">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 mono-pill text-cyan-300/80 mb-6"
          >
            <span className="w-4 h-px bg-cyan-400/60" />
            Engineering Architecture → Scalable Code
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.05] mb-6"
          >
            Hi, I'm <span className="text-glow">Full-Stack Engineer</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg text-zinc-400 leading-relaxed max-w-xl mb-4"
          >
            I design distributed systems on the whiteboard, then ship the code that
            proves the diagram right. My work lives at the seam between{' '}
            <span className="text-zinc-200">Engineering Architecture</span> and{' '}
            <span className="text-zinc-200">Scalable Code</span> — built for teams that
            need both to hold under load.
          </motion.p>

          {briefingMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 rounded-lg border border-cyan-400/30 bg-cyan-400/[0.06] px-4 py-3 max-w-xl"
            >
              <p className="mono-pill text-cyan-300 mb-2">Recruiter 30-sec briefing</p>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Backend-leaning full-stack engineer, 2+ yrs shipping production systems.
                Strong in distributed architecture, cloud infra, and React front ends.
                Open to senior IC or founding-engineer roles.
              </p>
            </motion.div>
          )}

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="rounded-md bg-zinc-100 text-zinc-950 font-medium text-sm px-5 py-2.5 hover:bg-white transition-colors"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="rounded-md border border-white/[0.12] text-zinc-200 font-medium text-sm px-5 py-2.5 hover:border-white/[0.24] hover:bg-white/[0.03] transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Right Column — Lahiru Liyanage Style Portrait Card with Floating Badges (Minimal Theme) */}
        <motion.div
          style={{ scale: avatarScale }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="relative flex justify-center py-6 px-4"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-4 bg-cyan-400/10 rounded-3xl blur-2xl scale-105 pointer-events-none" />

          {/* Main Card Container */}
          <div className="crosshair-frame relative w-full max-w-[400px] rounded-3xl border border-white/[0.12] bg-[#121318] p-3 shadow-2xl overflow-visible">
            <Crosshair />

            {/* Profile Image Frame */}
            <div className="relative h-[360px] sm:h-[420px] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#09090B]">
              <Crosshair />
              <img
                src="/profile.png"
                alt="Developer Portrait"
                className="h-full w-full object-cover object-top filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121318] via-transparent to-transparent opacity-80" />
            </div>

            {/* Floating Badge 1 (Top-Right Star Badge) */}
            <div className="absolute -top-3 -right-3 bg-cyan-400 text-zinc-950 p-3 rounded-2xl shadow-xl border border-cyan-300">
              <Star className="h-5 w-5 fill-current" />
            </div>

            {/* Floating Badge 2 (Bottom-Left Code Badge) */}
            <div className="absolute -bottom-3 -left-3 bg-[#121318] text-cyan-400 p-3 rounded-2xl shadow-xl border border-white/[0.16]">
              <Code2 className="h-5 w-5" />
            </div>

            {/* Floating Badge 3 (Bottom-Right Info Card) */}
            <div className="absolute -bottom-6 -right-3 sm:-right-6 rounded-2xl border border-white/[0.14] bg-[#09090B]/95 p-4 shadow-2xl backdrop-blur-md max-w-[210px]">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="h-7 w-7 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                  <Cpu className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="mono-pill text-zinc-100 font-semibold">Architecture → Code</h4>
                  <p className="mono-pill text-zinc-500 text-[9px]">Design Thinking</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 flex-1 rounded-full bg-white/[0.1] overflow-hidden">
                  <div className="h-full w-full rounded-full bg-cyan-400" />
                </div>
                <span className="mono-pill text-cyan-400 text-[10px]">100%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="glow-line max-w-6xl mx-auto mt-24" />
    </section>
  );
}
