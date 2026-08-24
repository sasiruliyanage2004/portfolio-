import { motion } from "framer-motion";

export function LampContainer({ children, className = "" }) {
  return (
    <div
      className={`relative flex min-h-[360px] sm:min-h-[420px] flex-col items-center justify-center overflow-hidden bg-transparent w-full z-0 ${className}`}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left Conic Light Beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "12rem" }}
          whileInView={{ opacity: 1, width: "28rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[28rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-transparent h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-transparent bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right Conic Light Beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "12rem" }}
          whileInView={{ opacity: 1, width: "28rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[28rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-transparent bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-transparent h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Ambient Radial Glowing Halo */}
        <div className="absolute inset-auto z-50 h-36 w-[26rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-40 blur-3xl" />

        {/* Pulsing Central Cyan Light Orb */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-32 w-64 -translate-y-[5rem] rounded-full bg-cyan-400/80 blur-2xl"
        />

        {/* Central Glowing Laser Line */}
        <motion.div
          initial={{ width: "12rem" }}
          whileInView={{ width: "28rem" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[28rem] -translate-y-[6rem] bg-cyan-400 shadow-[0_0_24px_#06b6d4]"
        />
      </div>

      {/* Content Container Illuminated under the Lamp */}
      <div className="relative z-50 flex -translate-y-36 sm:-translate-y-40 flex-col items-center px-4 w-full">
        {children}
      </div>
    </div>
  );
}
