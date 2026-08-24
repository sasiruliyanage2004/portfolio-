import { motion } from "framer-motion";

export function LampContainer({ children, className = "" }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-transparent w-full pt-6 sm:pt-10 pb-4 ${className}`}
    >
      {/* 🌟 Pure Open Linear Downward Light Projection (Zero Capsule / Circle Artifacts) */}
      <div className="absolute top-0 inset-x-0 flex flex-col items-center justify-start pointer-events-none z-0">
        {/* Top Horizontal Laser Beam Emitter */}
        <motion.div
          initial={{ opacity: 0, width: "20%" }}
          whileInView={{ opacity: 1, width: "65%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-[2px] max-w-[500px] bg-gradient-to-r from-transparent via-cyan-500 dark:via-cyan-400 to-transparent shadow-[0_0_20px_#06b6d4,0_0_35px_#10b981]"
        />

        {/* Downward Pure Linear Light Curtain (Completely Open at Bottom, No Closed Oval / Pill) */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0.6 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          className="w-full max-w-[600px] h-[160px] sm:h-[200px] origin-top opacity-30 dark:opacity-100 transition-opacity"
          style={{
            background: "linear-gradient(to bottom, rgba(6, 182, 212, 0.18) 0%, rgba(16, 185, 129, 0.05) 40%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* Content Container Illuminated Naturally by the Lamp */}
      <div className="relative z-10 flex flex-col items-center px-2 sm:px-4 w-full">
        {children}
      </div>
    </div>
  );
}
