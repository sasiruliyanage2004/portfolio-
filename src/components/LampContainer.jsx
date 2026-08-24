import { motion } from "framer-motion";

export function LampContainer({ children, className = "" }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-transparent w-full pt-8 sm:pt-14 pb-4 ${className}`}
    >
      {/* 🌟 Authentic Aceternity Cyan/Emerald Lamp Stage Spotlight */}
      <div className="absolute top-0 inset-x-0 flex flex-col items-center justify-start pointer-events-none z-0 w-full">
        {/* Top Horizontal Laser Beam Emitter — Visible in both themes */}
        <motion.div
          initial={{ opacity: 0, width: "30%" }}
          whileInView={{ opacity: 1, width: "80%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-[2px] w-full max-w-4xl bg-gradient-to-r from-transparent via-cyan-500 dark:via-cyan-400 to-transparent shadow-[0_0_20px_#06b6d4,0_0_40px_#10b981]"
        />

        {/* 🌙 Dark Mode ONLY: Full Cinematic Theatrical Conical Spotlight Beam */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0.4 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          className="hidden dark:block w-[130vw] max-w-[1200px] h-[240px] sm:h-[320px] -mt-[1px] origin-top opacity-95"
          style={{
            background: "radial-gradient(60% 100% at 50% 0%, rgba(6, 182, 212, 0.35) 0%, rgba(16, 185, 129, 0.12) 45%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 75% 95% at 50% 0%, black 25%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 95% at 50% 0%, black 25%, transparent 100%)",
          }}
        />

        {/* 🌙 Dark Mode ONLY: Ambient Glow Core */}
        <div className="hidden dark:block absolute top-0 h-20 w-80 sm:w-[450px] rounded-full bg-cyan-400/25 blur-3xl" />
      </div>

      {/* Content Container Illuminated Perfectly Under the Spotlight */}
      <div className="relative z-10 flex flex-col items-center px-2 sm:px-4 w-full">
        {children}
      </div>
    </div>
  );
}
