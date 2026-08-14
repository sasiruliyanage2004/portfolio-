import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CulturalPatternCanvas({ theme = "dumbara" }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {theme === "dumbara" && <DumbaraCanvas />}
          {theme === "liyawela" && <LiyawelaCanvas />}
          {theme === "palapethi" && <PalaPethiCanvas />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ------------------------------------------------------------------
// 1. DUMBARA GEOMETRIC MAT CANVAS (Kandy Sapphire & Sigiriya Gold)
// ------------------------------------------------------------------
function DumbaraCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    let lastClientX = -1000;
    let lastClientY = -1000;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    const handlePointerMove = (e) => {
      if (isTouchDevice) return;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY + window.scrollY;
    };

    const handleScroll = () => {
      if (isTouchDevice || lastClientX < 0) return;
      mouse.targetX = lastClientX;
      mouse.targetY = lastClientY + window.scrollY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const render = () => {
      time += 1;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Lerp mouse position for silky smooth movement
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      const isLight = document.documentElement.classList.contains("light-theme");
      const size = 95;
      const cols = Math.ceil(w / size) + 2;
      const rows = Math.ceil(h / size) + 2;
      const maxDist = 300;

      // Draw Cursor Spotlight Glow Aura
      if (mouse.x > 0 && mouse.y > 0 && !isTouchDevice) {
        const glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, maxDist);
        if (isLight) {
          glowGrad.addColorStop(0, "rgba(180, 83, 9, 0.14)");
          glowGrad.addColorStop(1, "rgba(180, 83, 9, 0)");
        } else {
          glowGrad.addColorStop(0, "rgba(6, 182, 212, 0.18)");
          glowGrad.addColorStop(1, "rgba(6, 182, 212, 0)");
        }
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, maxDist, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const x = c * size + (r % 2 === 0 ? 0 : size / 2);
          const y = r * (size * 0.6);
          const wave = Math.sin(time * 0.02 + (c + r) * 0.5) * 4;

          // Distance-based Cursor Glow & Scale Interpolation
          const dist = Math.hypot(x - mouse.x, y + wave - mouse.y);
          const glow = dist < maxDist ? Math.pow(1 - dist / maxDist, 2) : 0;
          const scale = 1 + glow * 0.12;

          const baseOuterOpacity = isLight ? 0.55 : 0.65;
          const baseInnerOpacity = isLight ? 0.50 : 0.60;
          const outerOpacity = Math.min(1, baseOuterOpacity + glow * 0.35);
          const innerOpacity = Math.min(1, baseInnerOpacity + glow * 0.35);

          // Outer Diamond Border (Ceylon Sapphire Cyan / Royal Indigo)
          ctx.strokeStyle = isLight
            ? `rgba(55, 48, 163, ${outerOpacity})`
            : `rgba(6, 182, 212, ${outerOpacity})`;
          ctx.lineWidth = 2.2 + glow * 0.8;
          ctx.beginPath();
          ctx.moveTo(x, y - (size / 2) * scale + wave);
          ctx.lineTo(x + (size / 2) * scale, y + wave);
          ctx.lineTo(x, y + (size / 2) * scale + wave);
          ctx.lineTo(x - (size / 2) * scale, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Inner Concentric Diamond (Sigiriya Amber Gold)
          ctx.strokeStyle = isLight
            ? `rgba(180, 83, 9, ${innerOpacity})`
            : `rgba(245, 158, 11, ${innerOpacity})`;
          ctx.lineWidth = 1.6 + glow * 0.6;
          ctx.beginPath();
          ctx.moveTo(x, y - (size / 3.5) * scale + wave);
          ctx.lineTo(x + (size / 3.5) * scale, y + wave);
          ctx.lineTo(x, y + (size / 3.5) * scale + wave);
          ctx.lineTo(x - (size / 3.5) * scale, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Dumbara Center Lotus Dots (Royal Kandy Violet)
          if ((c + r) % 2 === 0) {
            const dotOpacity = Math.min(1, (isLight ? 0.65 : 0.75) + glow * 0.25);
            ctx.fillStyle = isLight
              ? `rgba(126, 34, 206, ${dotOpacity})`
              : `rgba(139, 92, 246, ${dotOpacity})`;
            ctx.beginPath();
            ctx.arc(x, y + wave, 4.5 + glow * 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full opacity-85" />;
}

// ------------------------------------------------------------------
// 2. LIYAWELA BIO-FLOW CANVAS (Kandy Sapphire & Emerald Gold)
// ------------------------------------------------------------------
function LiyawelaCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    let lastClientX = -1000;
    let lastClientY = -1000;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    const handlePointerMove = (e) => {
      if (isTouchDevice) return;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY + window.scrollY;
    };

    const handleScroll = () => {
      if (isTouchDevice || lastClientX < 0) return;
      mouse.targetX = lastClientX;
      mouse.targetY = lastClientY + window.scrollY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const render = () => {
      time += 1;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      const isLight = document.documentElement.classList.contains("light-theme");
      const vineCount = Math.ceil(h / 180);
      const maxDist = 300;

      // Draw Cursor Spotlight Glow Aura
      if (mouse.x > 0 && mouse.y > 0 && !isTouchDevice) {
        const glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, maxDist);
        if (isLight) {
          glowGrad.addColorStop(0, "rgba(180, 83, 9, 0.12)");
          glowGrad.addColorStop(1, "rgba(180, 83, 9, 0)");
        } else {
          glowGrad.addColorStop(0, "rgba(245, 158, 11, 0.18)");
          glowGrad.addColorStop(1, "rgba(245, 158, 11, 0)");
        }
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, maxDist, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let v = 0; v < vineCount; v++) {
        const baseY = 120 + v * 180;
        const speed = 0.012 + (v % 4) * 0.003;
        const amplitude = 65 + (v % 3) * 10;

        ctx.beginPath();
        for (let x = -50; x < w + 50; x += 10) {
          const y = baseY + Math.sin(x * 0.007 + time * speed + v * 1.5) * amplitude;

          const dist = Math.hypot(x - mouse.x, y - mouse.y);
          const glow = dist < maxDist ? Math.pow(1 - dist / maxDist, 2) : 0;

          const baseOpacity = isLight
            ? (v % 2 === 0 ? 0.55 : 0.50)
            : (v % 2 === 0 ? 0.70 : 0.65);
          const opacity = Math.min(1, baseOpacity + glow * 0.30);

          ctx.lineWidth = 2.8 + glow * 2.0;
          ctx.strokeStyle = isLight
            ? v % 2 === 0 ? `rgba(180, 83, 9, ${opacity})` : `rgba(14, 116, 144, ${opacity})`
            : v % 2 === 0 ? `rgba(245, 158, 11, ${opacity})` : `rgba(6, 182, 212, ${opacity})`;

          if (x === -50) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw Liyawela Leaf Tendrils
        for (let x = 40; x < w; x += 110) {
          const y = baseY + Math.sin(x * 0.007 + time * speed + v * 1.5) * amplitude;
          const leafAngle = Math.cos(x * 0.007 + time * speed) * 1.4;

          const dist = Math.hypot(x - mouse.x, y - mouse.y);
          const glow = dist < maxDist ? Math.pow(1 - dist / maxDist, 2) : 0;

          const lx = x + Math.cos(leafAngle) * (35 + glow * 8);
          const ly = y + Math.sin(leafAngle) * (35 + glow * 8);

          const leafOpacity = Math.min(1, (isLight ? 0.55 : 0.70) + glow * 0.30);
          ctx.strokeStyle = isLight
            ? `rgba(126, 34, 206, ${leafOpacity})`
            : `rgba(139, 92, 246, ${leafOpacity})`;
          ctx.lineWidth = 2.0 + glow * 0.8;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.quadraticCurveTo(x + 20, y - 25, lx, ly);
          ctx.stroke();

          ctx.fillStyle = isLight
            ? `rgba(180, 83, 9, ${leafOpacity})`
            : `rgba(245, 158, 11, ${leafOpacity})`;
          ctx.beginPath();
          ctx.ellipse(lx, ly, 7 + glow * 3, 4 + glow * 2, leafAngle, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full opacity-85" />;
}

// ------------------------------------------------------------------
// 3. PALA PETHI FLORAL CANVAS (Sigiriya Amber & Temple Indigo)
// ------------------------------------------------------------------
function PalaPethiCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    let lastClientX = -1000;
    let lastClientY = -1000;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    const handlePointerMove = (e) => {
      if (isTouchDevice) return;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY + window.scrollY;
    };

    const handleScroll = () => {
      if (isTouchDevice || lastClientX < 0) return;
      mouse.targetX = lastClientX;
      mouse.targetY = lastClientY + window.scrollY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const render = () => {
      time += 1;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      const isLight = document.documentElement.classList.contains("light-theme");
      const gridSpacing = 160;
      const cols = Math.ceil(w / gridSpacing) + 1;
      const rows = Math.ceil(h / gridSpacing) + 1;
      const maxDist = 300;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * gridSpacing + (r % 2 === 0 ? 0 : gridSpacing / 2);
          const cy = r * gridSpacing;
          const rotateSpeed = 0.005 + (c % 3) * 0.002;
          const baseRotation = time * rotateSpeed;

          const dist = Math.hypot(cx - mouse.x, cy - mouse.y);
          const glow = dist < maxDist ? Math.pow(1 - dist / maxDist, 2) : 0;
          const petalRadius = 45 + Math.sin(time * 0.03 + c + r) * 6 + glow * 15;

          const baseOpacity = isLight ? 0.50 : 0.65;
          const opacity = Math.min(1, baseOpacity + glow * 0.35);

          const petalCount = 8;
          ctx.strokeStyle = isLight
            ? `rgba(55, 48, 163, ${opacity})`
            : `rgba(6, 182, 212, ${opacity})`;
          ctx.lineWidth = 1.8 + glow * 1.0;

          for (let i = 0; i < petalCount; i++) {
            const angle = baseRotation + (i * Math.PI * 2) / petalCount;
            const px = cx + Math.cos(angle) * petalRadius;
            const py = cy + Math.sin(angle) * petalRadius;

            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.quadraticCurveTo(
              cx + Math.cos(angle + 0.3) * (petalRadius * 0.6),
              cy + Math.sin(angle + 0.3) * (petalRadius * 0.6),
              px,
              py
            );
            ctx.quadraticCurveTo(
              cx + Math.cos(angle - 0.3) * (petalRadius * 0.6),
              cy + Math.sin(angle - 0.3) * (petalRadius * 0.6),
              cx,
              cy
            );
            ctx.stroke();
          }

          // Center Lotus Core (Sigiriya Gold)
          ctx.fillStyle = isLight
            ? `rgba(180, 83, 9, ${opacity})`
            : `rgba(245, 158, 11, ${opacity})`;
          ctx.beginPath();
          ctx.arc(cx, cy, 6 + glow * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full opacity-85" />;
}
