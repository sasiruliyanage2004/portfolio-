import { useEffect, useRef } from "react";

// ------------------------------------------------------------------
// DUMBARA GEOMETRIC MAT CANVAS — SIGNATURE CULTURAL TECH CANVAS
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
    let lastClientX = -1000;
    let lastClientY = -1000;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    const handlePointerMove = (e) => {
      if (isTouchDevice) return;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleScroll = () => {
      if (isTouchDevice || lastClientX < 0) return;
      mouse.targetX = lastClientX;
      mouse.targetY = lastClientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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

      // Smooth lerp mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      const isLight = document.documentElement.classList.contains("light-theme");

      // Tall Upright Dumbara Diamond Grid Dimensions (Correct Vertical Orientation)
      const sizeX = 85;
      const sizeY = 120;
      const rowHeight = sizeY / 2; // 60px row spacing for seamless interlocking upright diamonds
      const cols = Math.ceil(w / sizeX) + 4;
      const rows = Math.ceil(h / rowHeight) + 4; // Cover 100% of viewport from top to bottom
      const maxDist = 320;

      // Draw Radiant Cursor Spotlight Glow Aura
      if (mouse.x > 0 && mouse.y > 0 && !isTouchDevice) {
        const glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, maxDist);
        if (isLight) {
          glowGrad.addColorStop(0, "rgba(55, 48, 163, 0.08)");
          glowGrad.addColorStop(1, "rgba(55, 48, 163, 0)");
        } else {
          glowGrad.addColorStop(0, "rgba(6, 182, 212, 0.20)");
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
          const baseOuterOpacity = isLight ? 0.07 : 0.20;
          const baseInnerOpacity = isLight ? 0.05 : 0.15;
          const outerOpacity = Math.min(isLight ? 0.35 : 0.75, baseOuterOpacity + glow * (isLight ? 0.28 : 0.55));
          const innerOpacity = Math.min(isLight ? 0.30 : 0.65, baseInnerOpacity + glow * (isLight ? 0.25 : 0.48));

          // Outer Diamond Border (Ceylon Sapphire Cyan / Royal Indigo)
          ctx.strokeStyle = isLight
            ? `rgba(55, 48, 163, ${outerOpacity})`
            : `rgba(6, 182, 212, ${outerOpacity})`;
          ctx.lineWidth = isLight ? 1.2 + glow * 0.6 : 1.4 + glow * 1.0;
          ctx.beginPath();
          ctx.moveTo(x, y - (sizeY / 2) * scale + wave);
          ctx.lineTo(x + (sizeX / 2) * scale, y + wave);
          ctx.lineTo(x, y + (sizeY / 2) * scale + wave);
          ctx.lineTo(x - (sizeX / 2) * scale, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Inner Concentric Diamond (Electric Indigo)
          ctx.strokeStyle = isLight
            ? `rgba(14, 116, 144, ${innerOpacity})`
            : `rgba(99, 102, 241, ${innerOpacity})`;
          ctx.lineWidth = isLight ? 0.9 + glow * 0.4 : 1.0 + glow * 0.7;
          ctx.beginPath();
          ctx.moveTo(x, y - (sizeY / 3.5) * scale + wave);
          ctx.lineTo(x + (sizeX / 3.5) * scale, y + wave);
          ctx.lineTo(x, y + (sizeY / 3.5) * scale + wave);
          ctx.lineTo(x - (sizeX / 3.5) * scale, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Dumbara Center Lotus Dots (Royal Kandy Violet)
          if ((c + r) % 2 === 0) {
            const dotOpacity = Math.min(isLight ? 0.35 : 0.75, (isLight ? 0.08 : 0.22) + glow * (isLight ? 0.25 : 0.50));
            ctx.fillStyle = isLight
              ? `rgba(126, 34, 206, ${dotOpacity})`
              : `rgba(168, 85, 247, ${dotOpacity})`;
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
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full opacity-90" />
    </div>
  );
}
