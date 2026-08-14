import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, useScroll } from "framer-motion";

// Thin 3px gradient progress bar that grows as user scrolls the page
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9997] h-[3px] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #06b6d4 0%, #6366f1 50%, #a855f7 100%)",
      }}
    />
  );
}
