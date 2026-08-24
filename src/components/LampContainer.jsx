import { motion } from "framer-motion";

export function LampContainer({ children, className = "" }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-transparent w-full pt-8 sm:pt-14 pb-4 ${className}`}
    >
      {/* 🌟 Theatrical Wide-Angle Stage Spotlight Flare (Zero Box Edges) */}
      <div className="absolute top-0 inset-x-0 flex flex-col items-center justify-start pointer-events-none z-0 w-full">
        {/* Top Horizontal Laser Beam Emitter — Smooth 0% fade on both edges */}
        <motion.div
          initial={{ opacity: 0, width: "30%" }}
          whileInView={{ opacity: 1, width: "80%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-[2px] w-full max-w-4xl bg-gradient-to-r from-transparent via-cyan-500 dark:via-cyan-400 to-transparent shadow-[0_0_20px_#06b6d4,0_0_40px_#10b981]"
        />

        {/* Theatrical Conical Spotlight Flare (Fanning outwards with 100% feathered edges) */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0.4 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          className="w-[120vw] max-w-[1100px] h-[220px] sm:h-[300px] -mt-[1px] origin-top opacity-35 dark:opacity-90 transition-opacity"
          style={{
            background: "radial-gradient(60% 100% at 50% 0%, rgba(6, 182, 212, 0.28) 0%, rgba(16, 185, 129, 0.08) 50%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 70% 90% at 50% 0%, black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 90% at 50% 0%, black 20%, transparent 100%)",
          }}
        />

        {/* Ambient Top Glow Core */}
        <div className="absolute top-0 h-16 w-72 sm:w-96 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      {/* Content Container Illuminated Naturally Under the Spotlight */}
      <div className="relative z-10 flex flex-col items-center px-2 sm:px-4 w-full">
        {children}
      </div>
    </div>
  );
}
