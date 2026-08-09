import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CulturalPatternCanvas({ theme = "dumbara" }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
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
// 1. DUMBARA GEOMETRIC MAT WEAVING CANVAS (ඩම්බර රටා - TAB 1)
// ------------------------------------------------------------------
function DumbaraCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      time += 1;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const isLight = document.documentElement.classList.contains("light-theme");

      const size = 90;
      const cols = Math.ceil(w / size) + 2;
      const rows = Math.ceil(h / size) + 2;

      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const x = c * size + (r % 2 === 0 ? 0 : size / 2);
          const y = r * (size * 0.6);
          const wave = Math.sin(time * 0.02 + (c + r) * 0.5) * 4;

          // Outer Diamond Border
          ctx.strokeStyle = isLight ? "rgba(67, 56, 202, 0.35)" : "rgba(6, 182, 212, 0.45)";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(x, y - size / 2 + wave);
          ctx.lineTo(x + size / 2, y + wave);
          ctx.lineTo(x, y + size / 2 + wave);
          ctx.lineTo(x - size / 2, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Inner Concentric Diamond
          ctx.strokeStyle = isLight ? "rgba(14, 116, 144, 0.35)" : "rgba(99, 102, 241, 0.50)";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(x, y - size / 3.5 + wave);
          ctx.lineTo(x + size / 3.5, y + wave);
          ctx.lineTo(x, y + size / 3.5 + wave);
          ctx.lineTo(x - size / 3.5, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Dumbara Center Dots
          if ((c + r) % 2 === 0) {
            ctx.fillStyle = isLight ? "rgba(139, 39, 212, 0.50)" : "rgba(6, 182, 212, 0.60)";
            ctx.beginPath();
            ctx.arc(x, y + wave, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full opacity-90" />;
}

// ------------------------------------------------------------------
// 2. LIYAWELA ORGANIC BIO-FLOW VINE CANVAS (ලියවැල - TAB 2)
// ------------------------------------------------------------------
function LiyawelaCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      time += 1;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const isLight = document.documentElement.classList.contains("light-theme");
      const vineCount = 8;

      for (let v = 0; v < vineCount; v++) {
        const baseY = (h / (vineCount + 1)) * (v + 1);
        const speed = 0.012 + v * 0.003;
        const amplitude = 65 + v * 10;

        ctx.lineWidth = 2.5;
        ctx.strokeStyle = isLight
          ? v % 2 === 0 ? "rgba(139, 39, 212, 0.45)" : "rgba(14, 116, 144, 0.40)"
          : v % 2 === 0 ? "rgba(168, 85, 247, 0.65)" : "rgba(6, 182, 212, 0.60)";

        ctx.beginPath();
        for (let x = -50; x < w + 50; x += 10) {
          const y = baseY + Math.sin(x * 0.007 + time * speed + v * 1.5) * amplitude;
          if (x === -50) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw Liyawela Leaf Tendrils
        for (let x = 40; x < w; x += 110) {
          const y = baseY + Math.sin(x * 0.007 + time * speed + v * 1.5) * amplitude;
          const leafAngle = Math.cos(x * 0.007 + time * speed) * 1.4;

          const lx = x + Math.cos(leafAngle) * 35;
          const ly = y + Math.sin(leafAngle) * 35;

          ctx.strokeStyle = isLight ? "rgba(139, 39, 212, 0.50)" : "rgba(168, 85, 247, 0.70)";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.quadraticCurveTo(x + 20, y - 25, lx, ly);
          ctx.stroke();

          ctx.fillStyle = isLight ? "rgba(14, 116, 144, 0.55)" : "rgba(6, 182, 212, 0.70)";
          ctx.beginPath();
          ctx.ellipse(lx, ly, 7, 4, leafAngle, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full opacity-90" />;
}

// ------------------------------------------------------------------
// 3. PALA PETHI FLORAL PETAL CANVAS (පළා පෙති - TAB 3)
// ------------------------------------------------------------------
function PalaPethiCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      time += 1;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const isLight = document.documentElement.classList.contains("light-theme");
      const spacing = 100;
      const cols = Math.ceil(w / spacing) + 2;
      const rows = Math.ceil(h / spacing) + 2;

      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const cx = c * spacing + (r % 2 === 0 ? 0 : spacing / 2);
          const cy = r * spacing;
          const driftY = Math.sin(time * 0.015 + c * 0.5) * 8;

          ctx.strokeStyle = isLight ? "rgba(14, 116, 144, 0.45)" : "rgba(20, 184, 166, 0.65)";
          ctx.lineWidth = 2.2;
          const R = 28;

          for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
            const px = cx + Math.cos(angle) * (R / 2);
            const py = cy + driftY + Math.sin(angle) * (R / 2);

            ctx.beginPath();
            ctx.arc(px, py, R / 2, angle - Math.PI / 2, angle + Math.PI / 2);
            ctx.stroke();

            ctx.strokeStyle = isLight ? "rgba(180, 83, 9, 0.45)" : "rgba(245, 158, 11, 0.55)";
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.arc(px, py, R / 3.5, angle - Math.PI / 2, angle + Math.PI / 2);
            ctx.stroke();
            ctx.strokeStyle = isLight ? "rgba(14, 116, 144, 0.45)" : "rgba(20, 184, 166, 0.65)";
            ctx.lineWidth = 2.2;
          }

          ctx.fillStyle = isLight ? "rgba(180, 83, 9, 0.70)" : "rgba(245, 158, 11, 0.85)";
          ctx.beginPath();
          ctx.arc(cx, cy + driftY, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full opacity-90" />;
}
