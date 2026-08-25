"use client";
import React from "react";
import { motion } from "framer-motion";

export function LampContainer({ children, className = "" }) {
  return (
    <div
      className={`relative flex min-h-[340px] sm:min-h-[440px] flex-col items-center justify-center overflow-hidden bg-transparent w-full z-0 ${className}`}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 pointer-events-none [mask-image:radial-gradient(ellipse_65%_80%_at_50%_35%,#000_40%,transparent_100%)]">
        {/* Left Conic Beam with Natural Feathered Falloff (Dark & Light Adaptive) */}
        <motion.div
          initial={{ opacity: 0.3, width: "10rem" }}
          whileInView={{ opacity: 0.85, width: "16rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-52 sm:h-64 w-[16rem] sm:w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top] blur-[2px] [mask-image:linear-gradient(to_bottom,black_30%,transparent_90%)] dark:opacity-85 opacity-40"
        />

        {/* Right Conic Beam with Natural Feathered Falloff */}
        <motion.div
          initial={{ opacity: 0.3, width: "10rem" }}
          whileInView={{ opacity: 0.85, width: "16rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-52 sm:h-64 w-[16rem] sm:w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top] blur-[2px] [mask-image:linear-gradient(to_bottom,black_30%,transparent_90%)] dark:opacity-85 opacity-40"
        />

        {/* Core Volumetric Soft Glow Spotlight (Naturally Diffused) */}
        <div className="absolute inset-auto z-30 h-36 sm:h-44 w-[18rem] sm:w-[32rem] -translate-y-1/2 rounded-full bg-cyan-500/25 dark:bg-cyan-500/30 blur-[60px] sm:blur-[80px]" />
        <div className="absolute inset-auto z-30 h-28 sm:h-32 w-[14rem] sm:w-[22rem] -translate-y-[3.5rem] sm:-translate-y-[4rem] rounded-full bg-teal-400/20 dark:bg-teal-400/25 blur-[45px] sm:blur-[60px]" />

        <motion.div
          initial={{ width: "6rem", opacity: 0.3 }}
          whileInView={{ width: "12rem", opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-28 sm:h-36 w-48 sm:w-72 -translate-y-[4.5rem] sm:-translate-y-[5.5rem] rounded-full bg-cyan-400/35 blur-2xl sm:blur-3xl"
        />

        {/* Top Horizontal Laser Beam Emitter */}
        <motion.div
          initial={{ width: "10rem" }}
          whileInView={{ width: "18rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-[1.5px] w-[18rem] sm:w-[32rem] -translate-y-[5.8rem] sm:-translate-y-[6.8rem] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#06b6d4,0_0_40px_#10b981]"
        />
      </div>

      {/* Illuminated Content In Stage Position */}
      <div className="relative z-50 flex -translate-y-32 sm:-translate-y-44 flex-col items-center px-4 sm:px-5 w-full">
        {children}
      </div>
    </div>
  );
}
