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
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    const handlePointerMove = (e) => {
      if (isTouchDevice) return;
      // Exact viewport mouse coordinates for 100% zero-offset alignment
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const render = () => {
      time += 1;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Lerp mouse position for silky smooth movement
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      const isLight = document.documentElement.classList.contains("light-theme");
      const size = 95;
      const cols = Math.ceil(w / size) + 2;
      const rows = Math.ceil(h / size) + 2;
      const maxDist = 320;

      // Draw Cursor Spotlight Glow Aura
      if (mouse.x > 0 && mouse.y > 0 && !isTouchDevice) {
        const glowGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, maxDist);
        if (isLight) {
          glowGrad.addColorStop(0, "rgba(55, 48, 163, 0.06)");
          glowGrad.addColorStop(1, "rgba(55, 48, 163, 0)");
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

          const dist = Math.hypot(x - mouse.x, y + wave - mouse.y);
          const glow = dist < maxDist ? Math.pow(1 - dist / maxDist, 2) : 0;
          const scale = 1 + glow * 0.12;

          // Light mode uses whisper-quiet opacities (0.07 base) for ultra-clean porcelain look
          const baseOuterOpacity = isLight ? 0.07 : 0.28;
          const baseInnerOpacity = isLight ? 0.05 : 0.22;
          const outerOpacity = Math.min(isLight ? 0.35 : 0.75, baseOuterOpacity + glow * (isLight ? 0.28 : 0.45));
          const innerOpacity = Math.min(isLight ? 0.30 : 0.65, baseInnerOpacity + glow * (isLight ? 0.25 : 0.40));

          // Outer Diamond Border (Ceylon Sapphire Cyan / Royal Indigo)
          ctx.strokeStyle = isLight
            ? `rgba(55, 48, 163, ${outerOpacity})`
            : `rgba(6, 182, 212, ${outerOpacity})`;
          ctx.lineWidth = isLight ? 1.2 + glow * 0.6 : 1.6 + glow * 0.8;
          ctx.beginPath();
          ctx.moveTo(x, y - (size / 2) * scale + wave);
          ctx.lineTo(x + (size / 2) * scale, y + wave);
          ctx.lineTo(x, y + (size / 2) * scale + wave);
          ctx.lineTo(x - (size / 2) * scale, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Inner Concentric Diamond (Electric Indigo / Sapphire Teal)
          ctx.strokeStyle = isLight
            ? `rgba(14, 116, 144, ${innerOpacity})`
            : `rgba(99, 102, 241, ${innerOpacity})`;
          ctx.lineWidth = isLight ? 0.9 + glow * 0.5 : 1.2 + glow * 0.6;
          ctx.beginPath();
          ctx.moveTo(x, y - (size / 3.5) * scale + wave);
          ctx.lineTo(x + (size / 3.5) * scale, y + wave);
          ctx.lineTo(x, y + (size / 3.5) * scale + wave);
          ctx.lineTo(x - (size / 3.5) * scale, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Dumbara Center Lotus Dots (Royal Kandy Violet)
          if ((c + r) % 2 === 0) {
            const dotOpacity = Math.min(isLight ? 0.35 : 0.75, (isLight ? 0.08 : 0.30) + glow * (isLight ? 0.25 : 0.35));
            ctx.fillStyle = isLight
              ? `rgba(126, 34, 206, ${dotOpacity})`
              : `rgba(168, 85, 247, ${dotOpacity})`;
            ctx.beginPath();
            ctx.arc(x, y + wave, isLight ? 3.0 + glow * 1.5 : 3.8 + glow * 1.8, 0, Math.PI * 2);
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
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full opacity-90" />
    </div>
  );
}
