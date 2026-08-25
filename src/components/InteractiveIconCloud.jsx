import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TECH_SLUGS = [
  { name: "React 19", slug: "react", color: "#61DAFB" },
  { name: "TypeScript", slug: "typescript", color: "#3178C6" },
  { name: "Python", slug: "python", color: "#3776AB" },
  { name: "Node.js", slug: "nodedotjs", color: "#5FA04E" },
  { name: "Java", slug: "openjdk", color: "#ED8B00" },
  { name: "MongoDB", slug: "mongodb", color: "#47A248" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4" },
  { name: "FastAPI", slug: "fastapi", color: "#009688" },
  { name: "Docker", slug: "docker", color: "#2496ED" },
  { name: "Git", slug: "git", color: "#F05032" },
  { name: "GitHub", slug: "github", color: "#FFFFFF" },
  { name: "MySQL", slug: "mysql", color: "#4479A1" },
  { name: "JavaScript", slug: "javascript", color: "#F7DF1E" },
  { name: "Express.js", slug: "express", color: "#FFFFFF" },
  { name: "OpenCV", slug: "opencv", color: "#5C3EE8" },
  { name: "HTML5", slug: "html5", color: "#E34F26" },
  { name: "CSS3", slug: "css3", color: "#1572B6" },
  { name: "Postman", slug: "postman", color: "#FF6C37" },
  { name: "Figma", slug: "figma", color: "#F24E1E" },
  { name: "Vite", slug: "vite", color: "#646CFF" },
  { name: "PostgreSQL", slug: "postgresql", color: "#4169E1" },
  { name: "Linux", slug: "linux", color: "#FCC624" },
  { name: "Android", slug: "android", color: "#3DDC84" },
  { name: "C++", slug: "cplusplus", color: "#00599C" },
];

export default function InteractiveIconCloud({ size = 380 }) {
  const containerRef = useRef(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const rotationRef = useRef({ x: 0, y: 0, vx: 0.003, vy: 0.004 });
  const isInteracting = useRef(false);
  const isVisibleRef = useRef(false);

  // Generate 3D Fibonacci sphere distribution points
  const points = useRef(
    TECH_SLUGS.map((tech, idx) => {
      const phi = Math.acos(-1 + (2 * idx) / TECH_SLUGS.length);
      const theta = Math.sqrt(TECH_SLUGS.length * Math.PI) * phi;
      return {
        ...tech,
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
        imgUrl: `https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace("#", "")}`,
      };
    })
  ).current;

  useEffect(() => {
    let animId;
    const radius = size * 0.42;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          animId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const render = () => {
      if (!isVisibleRef.current || !containerRef.current) return;
      const nodes = containerRef.current.children;

      // Auto rotation physics
      if (!isInteracting.current) {
        rotationRef.current.x += rotationRef.current.vx;
        rotationRef.current.y += rotationRef.current.vy;
      }

      const sinX = Math.sin(rotationRef.current.x);
      const cosX = Math.cos(rotationRef.current.x);
      const sinY = Math.sin(rotationRef.current.y);
      const cosY = Math.cos(rotationRef.current.y);

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const el = nodes[i];
        if (!el) continue;

        // 3D rotation matrix (Yaw & Pitch)
        const x1 = pt.x * cosY - pt.z * sinY;
        const z1 = pt.x * sinY + pt.z * cosY;
        const y2 = pt.y * cosX - z1 * sinX;
        const z2 = pt.y * sinX + z1 * cosX;

        // Perspective scale & depth
        const scale = (z2 + 2) / 3;
        const alpha = Math.max(0.2, (z2 + 1.2) / 2.2);
        const screenX = x1 * radius;
        const screenY = y2 * radius;

        el.style.transform = `translate3d(calc(-50% + ${screenX}px), calc(-50% + ${screenY}px), 0) scale(${scale.toFixed(3)})`;
        el.style.opacity = alpha.toFixed(3);
        el.style.zIndex = Math.round((z2 + 1) * 100);
      }

      animId = requestAnimationFrame(render);
    };

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [size, points]);

  const handlePointerDown = (e) => {
    isInteracting.current = true;
  };

  const handlePointerUp = () => {
    isInteracting.current = false;
  };

  return (
    <div className="relative flex items-center justify-center select-none py-4">
      {/* 3D Interactive Fibonacci Cloud Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        style={{ width: size, height: size }}
        className="relative cursor-grab active:cursor-grabbing touch-none transform-gpu will-change-transform"
      >
        {points.map((tech) => (
          <div
            key={tech.slug}
            onMouseEnter={() => setHoveredIcon(tech.name)}
            onMouseLeave={() => setHoveredIcon(null)}
            className="absolute left-1/2 top-1/2 flex items-center justify-center p-2 rounded-2xl bg-white/5 dark:bg-white/5 light-theme:bg-slate-100/80 border border-white/10 dark:border-white/10 light-theme:border-slate-300/80 backdrop-blur-md transition-shadow hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] cursor-pointer"
            style={{ width: 44, height: 44 }}
            title={tech.name}
          >
            <img
              src={tech.imgUrl}
              alt={tech.name}
              loading="lazy"
              decoding="async"
              className="h-6 w-6 object-contain pointer-events-none drop-shadow-sm"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        ))}
      </div>

      {/* Active Icon Floating Badge */}
      {hoveredIcon && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-4 z-50 rounded-full border border-cyan-500/30 bg-[#090d16]/95 px-3 py-1 font-mono text-xs font-bold text-cyan-400 shadow-xl backdrop-blur-md pointer-events-none"
        >
          {hoveredIcon}
        </motion.div>
      )}
    </div>
  );
}
