import { motion } from "framer-motion";

export function LampContainer({ children, className = "" }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-transparent w-full pt-10 sm:pt-14 pb-4 ${className}`}
    >
      {/* 🌟 100% Fluid Conic & Linear Lamp Spotlight Header */}
      <div className="absolute top-0 inset-x-0 flex flex-col items-center justify-start pointer-events-none z-0">
        {/* Top Horizontal Laser Beam Emitter */}
        <motion.div
          initial={{ opacity: 0, width: "30%" }}
          whileInView={{ opacity: 1, width: "75%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-[2px] max-w-[550px] bg-gradient-to-r from-transparent via-cyan-500 dark:via-cyan-400 to-transparent shadow-[0_0_16px_rgba(6,182,212,0.4)] dark:shadow-[0_0_24px_#06b6d4,0_0_45px_#10b981]"
        />

        {/* Downward Conical Spotlight Beam (Dark Theme: Vivid Neon Curtain | Light Theme: Soft Sapphire Mist) */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0.6 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          className="relative w-full max-w-[700px] h-[170px] sm:h-[220px] -mt-[1px] origin-top"
        >
          {/* Dark Mode Glowing Conic Curtain */}
          <div
            className="hidden dark:block absolute inset-0"
            style={{
              background: "radial-gradient(55% 100% at 50% 0%, rgba(6,182,212,0.32) 0%, rgba(16,185,129,0.12) 50%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 70% 90% at 50% 0%, black 20%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 90% at 50% 0%, black 20%, transparent 100%)",
            }}
          />

          {/* Light Mode Soft Royal Sapphire Curtain (Zero Murky Blobs) */}
          <div
            className="block dark:hidden absolute inset-0"
            style={{
              background: "radial-gradient(50% 100% at 50% 0%, rgba(2,132,199,0.12) 0%, rgba(16,185,129,0.05) 50%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 80% 90% at 50% 0%, black 30%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 0%, black 30%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Central Core Glow Ball (Dark Theme Only) */}
        <div className="absolute top-2 h-20 w-48 sm:w-72 rounded-full bg-cyan-400/20 blur-3xl hidden dark:block" />
      </div>

      {/* Content Container Illuminated Naturally by the Lamp */}
      <div className="relative z-10 flex flex-col items-center px-2 sm:px-4 w-full">
        {children}
      </div>
    </div>
  );
}
