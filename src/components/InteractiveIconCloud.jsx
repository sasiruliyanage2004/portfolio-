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
  const lastMousePos = useRef({ x: 0, y: 0 });

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

    const render = () => {
      if (!containerRef.current) return;
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

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [size, points]);

  // Mouse / Touch Drag Handlers for 3D Orbit Control
  const handlePointerDown = (e) => {
    isInteracting.current = true;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (e) => {
    if (!isInteracting.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const dx = clientX - lastMousePos.current.x;
    const dy = clientY - lastMousePos.current.y;

    rotationRef.current.y += dx * 0.006;
    rotationRef.current.x -= dy * 0.006;
    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    isInteracting.current = false;
  };

  return (
    <div
      className="relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing mx-auto"
      style={{ width: size, height: size, maxWidth: "100%" }}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      {/* Luminous Celestial Background Halo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/10 via-emerald-500/5 to-teal-500/10 blur-2xl pointer-events-none" />
      <div className="absolute inset-4 rounded-full border border-white/5 dark:border-cyan-500/10 pointer-events-none" />

      {/* 3D Sphere Container */}
      <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
        {points.map((tech) => (
          <div
            key={tech.name}
            onMouseEnter={() => setHoveredIcon(tech.name)}
            onMouseLeave={() => setHoveredIcon(null)}
            className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-2xl p-2.5 bg-white/10 dark:bg-black/60 border border-white/15 dark:border-white/10 backdrop-blur-md transition-shadow duration-300 group hover:border-cyan-400 hover:shadow-[0_0_16px_rgba(6,182,212,0.6)] cursor-pointer"
            style={{
              boxShadow: hoveredIcon === tech.name ? `0 0 20px ${tech.color}` : undefined,
            }}
          >
            <img
              src={tech.imgUrl}
              alt={tech.name}
              loading="lazy"
              className="h-6 w-6 sm:h-7 sm:w-7 object-contain pointer-events-none filter drop-shadow"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />

            {/* Micro Hover Badge Tooltip */}
            <span className="absolute -bottom-6 rounded-md bg-black/95 border border-white/20 px-2 py-0.5 font-mono text-[9px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-30">
              {tech.name}
            </span>
          </div>
        ))}
      </div>

      {/* Central Interactive Status Pill */}
      <div className="absolute bottom-2 rounded-full border border-white/15 bg-black/70 px-3 py-1 font-mono text-[10px] text-cyan-300 backdrop-blur-md pointer-events-none shadow-lg">
        {hoveredIcon ? `✨ ${hoveredIcon}` : "3D Sphere • Drag to Orbit"}
      </div>
    </div>
  );
}
