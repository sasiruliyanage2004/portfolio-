import { useEffect, useRef } from "react";

// ------------------------------------------------------------------
// LUXURY CULTURAL TECH AMBIENT CANVAS (Ultra-Optimized 60-120fps Engine)
// ------------------------------------------------------------------
export default function CulturalPatternCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    let animationFrameId;
    let time = 0;
    let isPaused = false;

    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    let isTouchActive = false;
    let touchTimeout;

    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;

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

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (!isTouchDevice) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    } else {
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    const render = () => {
      if (isPaused) return;

      time += 1;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Subtle living orbital light on mobile
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

      // Adaptive grid spacing (Larger diamonds on mobile for 2x performance)
      const sizeX = isTouchDevice ? 115 : 90;
      const sizeY = isTouchDevice ? 165 : 130;
      const rowHeight = sizeY / 2;
      const cols = Math.ceil(w / sizeX) + 3;
      const rows = Math.ceil(h / rowHeight) + 3;
      const maxDist = isTouchDevice ? 240 : 320;

      // Draw Soft Volumetric Spotlight Glow Aura
      if (mouse.x > -200 && mouse.y > -200) {
        const glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, maxDist);
        if (isLight) {
          glowGrad.addColorStop(0, "rgba(14, 116, 144, 0.06)");
          glowGrad.addColorStop(1, "rgba(14, 116, 144, 0)");
        } else {
          glowGrad.addColorStop(0, "rgba(6, 182, 212, 0.10)");
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
          const wave = Math.sin(time * 0.015 + (c + r) * 0.3) * 1.8;

          const dist = Math.hypot(x - mouse.x, y + wave - mouse.y);
          const glow = dist < maxDist ? Math.pow(1 - dist / maxDist, 2) : 0;
          const scale = 1 + glow * 0.08;

          // 💎 Luxury Ultra-Subtle Watermark Opacity (0.035 - 0.065 Base)
          const baseOuterOpacity = isLight ? 0.035 : 0.06;
          const baseInnerOpacity = isLight ? 0.025 : 0.04;
          const outerOpacity = Math.min(isLight ? 0.16 : 0.26, baseOuterOpacity + glow * (isLight ? 0.12 : 0.20));
          const innerOpacity = Math.min(isLight ? 0.12 : 0.20, baseInnerOpacity + glow * (isLight ? 0.09 : 0.16));

          // Outer Diamond Border
          ctx.strokeStyle = isLight
            ? `rgba(14, 116, 144, ${outerOpacity})`
            : `rgba(6, 182, 212, ${outerOpacity})`;
          ctx.lineWidth = isLight ? 0.8 + glow * 0.3 : 0.85 + glow * 0.35;
          ctx.beginPath();
          ctx.moveTo(x, y - (sizeY / 2) * scale + wave);
          ctx.lineTo(x + (sizeX / 2) * scale, y + wave);
          ctx.lineTo(x, y + (sizeY / 2) * scale + wave);
          ctx.lineTo(x - (sizeX / 2) * scale, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Inner Concentric Diamond
          ctx.strokeStyle = `rgba(16, 185, 129, ${innerOpacity})`;
          ctx.lineWidth = isLight ? 0.6 + glow * 0.2 : 0.65 + glow * 0.25;
          ctx.beginPath();
          ctx.moveTo(x, y - (sizeY / 3.5) * scale + wave);
          ctx.lineTo(x + (sizeX / 3.5) * scale, y + wave);
          ctx.lineTo(x, y + (sizeY / 3.5) * scale + wave);
          ctx.lineTo(x - (sizeX / 3.5) * scale, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Micro Lotus Center Dots
          if ((c + r) % 2 === 0) {
            const dotOpacity = Math.min(isLight ? 0.18 : 0.28, (isLight ? 0.04 : 0.07) + glow * (isLight ? 0.12 : 0.20));
            ctx.fillStyle = isLight
              ? `rgba(13, 148, 136, ${dotOpacity})`
              : `rgba(6, 182, 212, ${dotOpacity})`;
            ctx.beginPath();
            ctx.arc(x, y + wave, isLight ? 1.5 + glow * 0.6 : 1.8 + glow * 0.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      clearTimeout(touchTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full transform-gpu">
      {/* 🌌 Deep Volumetric Ambient Breathing Mesh Glow Orbs */}
      <div className="absolute top-[10%] left-[15%] h-[400px] sm:h-[500px] w-[400px] sm:w-[500px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/12 blur-[100px] sm:blur-[140px] pointer-events-none transform-gpu" />
      <div className="absolute top-[45%] right-[10%] h-[420px] sm:h-[550px] w-[420px] sm:w-[550px] rounded-full bg-indigo-500/8 dark:bg-indigo-500/10 blur-[110px] sm:blur-[160px] pointer-events-none transform-gpu" />
      <div className="absolute top-[75%] left-[20%] h-[380px] sm:h-[450px] w-[380px] sm:w-[450px] rounded-full bg-emerald-500/8 dark:bg-emerald-500/10 blur-[100px] sm:blur-[140px] pointer-events-none transform-gpu" />

      <canvas ref={canvasRef} className="relative z-10 w-full h-full transform-gpu will-change-transform" />
    </div>
  );
}
