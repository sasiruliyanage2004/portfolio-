import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "transparent",
      border: "2px solid rgba(14, 165, 233, 0.8)", // tailwind primary
      height: 32,
      width: 32,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 500,
        damping: 20
      }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      backgroundColor: "rgba(14, 165, 233, 0.2)",
      border: "2px solid rgba(14, 165, 233, 1)",
      height: 48,
      width: 48,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 500,
        damping: 20
      }
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none mix-blend-screen"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
      />
      <div 
        className="fixed top-0 left-0 z-[9999] w-2 h-2 bg-primary rounded-full pointer-events-none shadow-[0_0_10px_2px_rgba(56,189,248,0.8)]"
        style={{
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`,
          transition: 'transform 0.05s linear'
        }}
      />
    </>
  );
};

export default CustomCursor;
