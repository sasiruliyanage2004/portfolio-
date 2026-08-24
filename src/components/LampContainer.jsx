import { motion } from "framer-motion";

export function LampContainer({ children, className = "" }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-transparent w-full pt-10 sm:pt-16 pb-6 ${className}`}
    >
      {/* 🌟 100% Organic Downward Spotlight Beam (Zero Box Artifacts) */}
      <div className="absolute top-0 inset-x-0 flex flex-col items-center justify-start pointer-events-none z-0">
        {/* Top Horizontal Laser Beam Emitter */}
        <motion.div
          initial={{ opacity: 0, width: "30%" }}
          whileInView={{ opacity: 1, width: "70%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-[2px] max-w-[500px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#06b6d4,0_0_40px_#10b981]"
        />

        {/* Downward Conical Light Flare Curtain with Radial Mask */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0.5 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          className="relative w-full max-w-[650px] h-[180px] sm:h-[240px] -mt-[1px] origin-top"
          style={{
            background: "radial-gradient(50% 100% at 50% 0%, rgba(6,182,212,0.35) 0%, rgba(16,185,129,0.12) 50%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 60% 80% at 50% 10%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 50% 10%, black 30%, transparent 100%)",
          }}
        />

        {/* Ambient Central Glow Ball */}
        <div className="absolute top-4 h-24 w-48 sm:w-72 rounded-full bg-cyan-400/25 blur-3xl" />
      </div>

      {/* Content Container Illuminated Naturally by the Lamp */}
      <div className="relative z-10 flex flex-col items-center px-2 sm:px-4 w-full">
        {children}
      </div>
    </div>
  );
}
