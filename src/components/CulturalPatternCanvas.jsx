import { useEffect, useRef } from "react";

// ------------------------------------------------------------------
// DUMBARA GEOMETRIC MAT CANVAS — ADAPTIVE DESKTOP & MOBILE AMBIENT ENGINE
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
      // After finger is lifted, smoothly blend back to autonomous ambient wave after 2.5s
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

      // On touch devices when user is not actively pressing, engage Autonomous Living Ambient Wave
      if (isTouchDevice && !isTouchActive) {
        // Graceful harmonic Lissajous orbital path illuminating the Dumbara diamonds
        const orbitalX = w * 0.5 + Math.cos(time * 0.015) * (w * 0.38);
        const orbitalY = h * 0.45 + Math.sin(time * 0.022) * (h * 0.32);
        mouse.targetX = orbitalX;
        mouse.targetY = orbitalY;
      }

      // Smooth lerp coordinates
      if (mouse.x < -500) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }

      const isLight = document.documentElement.classList.contains("light-theme");

      // Tall Upright Dumbara Diamond Grid Dimensions (Traditional Sri Lankan Geometry)
      const sizeX = 85;
      const sizeY = 120;
      const rowHeight = sizeY / 2; // 60px row spacing for interlocking upright diamonds
      const cols = Math.ceil(w / sizeX) + 4;
      const rows = Math.ceil(h / rowHeight) + 4;
      const maxDist = isTouchDevice ? 280 : 340;

      // Draw Radiant Spotlight Glow Aura
      if (mouse.x > -200 && mouse.y > -200) {
        const glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, maxDist);
        if (isLight) {
          glowGrad.addColorStop(0, isTouchDevice ? "rgba(14, 116, 144, 0.12)" : "rgba(14, 116, 144, 0.09)");
          glowGrad.addColorStop(1, "rgba(14, 116, 144, 0)");
        } else {
          glowGrad.addColorStop(0, isTouchDevice ? "rgba(6, 182, 212, 0.24)" : "rgba(6, 182, 212, 0.20)");
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
          const wave = Math.sin(time * 0.02 + (c + r) * 0.4) * 3;

          const dist = Math.hypot(x - mouse.x, y + wave - mouse.y);
          const glow = dist < maxDist ? Math.pow(1 - dist / maxDist, 2) : 0;
          const scale = 1 + glow * 0.18;

          // Upright Dumbara Mat settings matching traditional Sri Lankan weave
          const baseOuterOpacity = isLight ? 0.08 : 0.20;
          const baseInnerOpacity = isLight ? 0.06 : 0.15;
          const outerOpacity = Math.min(isLight ? 0.45 : 0.80, baseOuterOpacity + glow * (isLight ? 0.32 : 0.58));
          const innerOpacity = Math.min(isLight ? 0.38 : 0.70, baseInnerOpacity + glow * (isLight ? 0.28 : 0.50));

          // Outer Diamond Border (Ceylon Sapphire Cyan / Teal)
          ctx.strokeStyle = isLight
            ? `rgba(14, 116, 144, ${outerOpacity})`
            : `rgba(6, 182, 212, ${outerOpacity})`;
          ctx.lineWidth = isLight ? 1.2 + glow * 0.6 : 1.4 + glow * 1.0;
          ctx.beginPath();
          ctx.moveTo(x, y - (sizeY / 2) * scale + wave);
          ctx.lineTo(x + (sizeX / 2) * scale, y + wave);
          ctx.lineTo(x, y + (sizeY / 2) * scale + wave);
          ctx.lineTo(x - (sizeX / 2) * scale, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Inner Concentric Diamond (Emerald Green / Cyan)
          ctx.strokeStyle = isLight
            ? `rgba(16, 185, 129, ${innerOpacity})`
            : `rgba(16, 185, 129, ${innerOpacity})`;
          ctx.lineWidth = isLight ? 0.9 + glow * 0.4 : 1.0 + glow * 0.7;
          ctx.beginPath();
          ctx.moveTo(x, y - (sizeY / 3.5) * scale + wave);
          ctx.lineTo(x + (sizeX / 3.5) * scale, y + wave);
          ctx.lineTo(x, y + (sizeY / 3.5) * scale + wave);
          ctx.lineTo(x - (sizeX / 3.5) * scale, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Dumbara Center Lotus Dots (Pure Teal / Emerald)
          if ((c + r) % 2 === 0) {
            const dotOpacity = Math.min(isLight ? 0.45 : 0.80, (isLight ? 0.10 : 0.22) + glow * (isLight ? 0.28 : 0.52));
            ctx.fillStyle = isLight
              ? `rgba(13, 148, 136, ${dotOpacity})`
              : `rgba(6, 182, 212, ${dotOpacity})`;
            ctx.beginPath();
            ctx.arc(x, y + wave, isLight ? 2.8 + glow * 1.2 : 3.5 + glow * 1.5, 0, Math.PI * 2);
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
      <canvas ref={canvasRef} className="w-full h-full opacity-90" />
    </div>
  );
}
