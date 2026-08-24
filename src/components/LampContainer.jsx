"use client";
import React from "react";
import { motion } from "framer-motion";

export function LampContainer({ children, className = "" }) {
  return (
    <div
      className={`relative flex min-h-[380px] sm:min-h-[460px] flex-col items-center justify-center overflow-hidden bg-transparent w-full z-0 ${className}`}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left Conic Beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)] backdrop-blur-3xl" />
          <div className="absolute w-40 h-[100%] left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)] backdrop-blur-3xl" />
        </motion.div>

        {/* Right Conic Beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)] backdrop-blur-3xl" />
          <div className="absolute w-[100%] right-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)] backdrop-blur-3xl" />
        </motion.div>

        {/* Bottom Ambient Blur Flare */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Core Glow Orb */}
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-40 blur-3xl" />

        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        />

        {/* Top Horizontal Laser Beam Emitter */}
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400 shadow-[0_0_20px_#06b6d4,0_0_35px_#10b981]"
        />

        {/* Top Mask */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]" />
      </div>

      {/* Illuminated Content In Aceternity Stage Position */}
      <div className="relative z-50 flex -translate-y-36 sm:-translate-y-44 flex-col items-center px-4 sm:px-5 w-full">
        {children}
      </div>
    </div>
  );
}
