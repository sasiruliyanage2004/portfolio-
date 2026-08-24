import { useEffect, useRef } from "react";

// ------------------------------------------------------------------
// LUXURY CULTURAL TECH AMBIENT CANVAS (Subtle Dumbara Weave + Deep Mesh Glow)
// ------------------------------------------------------------------
export default function CulturalPatternCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    let isTouchActive = false;
    let touchTimeout;

    const handlePointerMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        isTouchActive = true;
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        clearTimeout(touchTimeout);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        isTouchActive = true;
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        clearTimeout(touchTimeout);
      }
    };

    const handleTouchEnd = () => {
      clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => {
        isTouchActive = false;
      }, 2500);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    const render = () => {
      time += 1;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;

      // Subtle living orbital light
      if (isTouchDevice && !isTouchActive) {
        const orbitalX = w * 0.5 + Math.cos(time * 0.012) * (w * 0.35);
        const orbitalY = h * 0.45 + Math.sin(time * 0.018) * (h * 0.28);
        mouse.targetX = orbitalX;
        mouse.targetY = orbitalY;
      }

      // Smooth lerp coordinates
      if (mouse.x < -500) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;
      }

      const isLight = document.documentElement.classList.contains("light-theme");

      // Tall Upright Dumbara Diamond Grid Dimensions
      const sizeX = 90;
      const sizeY = 130;
      const rowHeight = sizeY / 2;
      const cols = Math.ceil(w / sizeX) + 4;
      const rows = Math.ceil(h / rowHeight) + 4;
      const maxDist = isTouchDevice ? 260 : 320;

      // Draw Soft Volumetric Spotlight Glow Aura
      if (mouse.x > -200 && mouse.y > -200) {
        const glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, maxDist);
        if (isLight) {
          glowGrad.addColorStop(0, "rgba(14, 116, 144, 0.06)");
          glowGrad.addColorStop(1, "rgba(14, 116, 144, 0)");
        } else {
          glowGrad.addColorStop(0, "rgba(6, 182, 212, 0.12)");
          glowGrad.addColorStop(1, "rgba(6, 182, 212, 0)");
        }
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, maxDist, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let r = -2; r < rows; r++) {
        for (let c = -2; c < cols; c++) {
          const x = c * sizeX + (Math.abs(r) % 2 === 0 ? 0 : sizeX / 2);
          const y = r * rowHeight;
          const wave = Math.sin(time * 0.015 + (c + r) * 0.3) * 2;

          const dist = Math.hypot(x - mouse.x, y + wave - mouse.y);
          const glow = dist < maxDist ? Math.pow(1 - dist / maxDist, 2) : 0;
          const scale = 1 + glow * 0.1;

          // 💎 Luxury Ultra-Subtle Watermark Opacity (0.04 - 0.07 Base)
          const baseOuterOpacity = isLight ? 0.035 : 0.065;
          const baseInnerOpacity = isLight ? 0.025 : 0.045;
          const outerOpacity = Math.min(isLight ? 0.18 : 0.28, baseOuterOpacity + glow * (isLight ? 0.12 : 0.22));
          const innerOpacity = Math.min(isLight ? 0.14 : 0.22, baseInnerOpacity + glow * (isLight ? 0.10 : 0.18));

          // Outer Diamond Border (Precision Hairline CAD Stroke)
          ctx.strokeStyle = isLight
            ? `rgba(14, 116, 144, ${outerOpacity})`
            : `rgba(6, 182, 212, ${outerOpacity})`;
          ctx.lineWidth = isLight ? 0.8 + glow * 0.3 : 0.85 + glow * 0.4;
          ctx.beginPath();
          ctx.moveTo(x, y - (sizeY / 2) * scale + wave);
          ctx.lineTo(x + (sizeX / 2) * scale, y + wave);
          ctx.lineTo(x, y + (sizeY / 2) * scale + wave);
          ctx.lineTo(x - (sizeX / 2) * scale, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Inner Concentric Diamond
          ctx.strokeStyle = isLight
            ? `rgba(16, 185, 129, ${innerOpacity})`
            : `rgba(16, 185, 129, ${innerOpacity})`;
          ctx.lineWidth = isLight ? 0.6 + glow * 0.2 : 0.7 + glow * 0.3;
          ctx.beginPath();
          ctx.moveTo(x, y - (sizeY / 3.5) * scale + wave);
          ctx.lineTo(x + (sizeX / 3.5) * scale, y + wave);
          ctx.lineTo(x, y + (sizeY / 3.5) * scale + wave);
          ctx.lineTo(x - (sizeX / 3.5) * scale, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Micro Lotus Center Dots
          if ((c + r) % 2 === 0) {
            const dotOpacity = Math.min(isLight ? 0.20 : 0.32, (isLight ? 0.04 : 0.08) + glow * (isLight ? 0.14 : 0.24));
            ctx.fillStyle = isLight
              ? `rgba(13, 148, 136, ${dotOpacity})`
              : `rgba(6, 182, 212, ${dotOpacity})`;
            ctx.beginPath();
            ctx.arc(x, y + wave, isLight ? 1.8 + glow * 0.8 : 2.2 + glow * 1.0, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      clearTimeout(touchTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
      {/* 🌌 Deep Volumetric Ambient Breathing Mesh Glow Orbs (Silicon Valley / Linear Look) */}
      <div className="absolute top-[10%] left-[15%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/12 blur-[140px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute top-[45%] right-[10%] h-[550px] w-[550px] rounded-full bg-indigo-500/8 dark:bg-indigo-500/10 blur-[160px] pointer-events-none" />
      <div className="absolute top-[75%] left-[20%] h-[450px] w-[450px] rounded-full bg-emerald-500/8 dark:bg-emerald-500/10 blur-[140px] pointer-events-none" />

      <canvas ref={canvasRef} className="relative z-10 w-full h-full" />
    </div>
  );
}
