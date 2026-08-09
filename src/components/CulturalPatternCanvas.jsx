import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CulturalPatternCanvas({ theme = "dumbara" }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
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
// 1. DUMBARA GEOMETRIC MAT WEAVING CANVASES (ඩම්බර රටා)
// Bold Rhombus Lattice + Stylized Elephant/Peacock Geometric Motifs
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

      const size = 90; // Large, bold grid size
      const cols = Math.ceil(w / size) + 2;
      const rows = Math.ceil(h / size) + 2;

      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const x = c * size + (r % 2 === 0 ? 0 : size / 2);
          const y = r * (size * 0.6);
          const wave = Math.sin(time * 0.02 + (c + r) * 0.5) * 4;

          // Outer Bold Diamond Border
          ctx.strokeStyle = "rgba(6, 182, 212, 0.40)"; // Bright cyan stroke
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(x, y - size / 2 + wave);
          ctx.lineTo(x + size / 2, y + wave);
          ctx.lineTo(x, y + size / 2 + wave);
          ctx.lineTo(x - size / 2, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Inner Concentric Diamond
          ctx.strokeStyle = "rgba(99, 102, 241, 0.45)"; // Bright indigo stroke
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(x, y - size / 3.5 + wave);
          ctx.lineTo(x + size / 3.5, y + wave);
          ctx.lineTo(x, y + size / 3.5 + wave);
          ctx.lineTo(x - size / 3.5, y + wave);
          ctx.closePath();
          ctx.stroke();

          // Stylized Dumbara Elephant/Peacock Geometric Figure Motif in center cells
          if ((c + r) % 2 === 0) {
            ctx.fillStyle = "rgba(6, 182, 212, 0.50)";
            ctx.beginPath();
            ctx.arc(x, y + wave, 4, 0, Math.PI * 2);
            ctx.fill();

            // Dumbara Diamond Accents
            ctx.strokeStyle = "rgba(6, 182, 212, 0.35)";
            ctx.beginPath();
            ctx.moveTo(x - 8, y + wave);
            ctx.lineTo(x, y - 8 + wave);
            ctx.lineTo(x + 8, y + wave);
            ctx.lineTo(x, y + 8 + wave);
            ctx.closePath();
            ctx.stroke();
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
// 2. LIYAWELA ORGANIC BIO-FLOW VINE CANVAS (ලියවැල)
// Interlacing Curved S-Lines + Leaf Tendril Spirals
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

      const vineCount = 6;
      ctx.lineWidth = 2.2;

      for (let v = 0; v < vineCount; v++) {
        const baseY = (h / (vineCount + 1)) * (v + 1);
        const speed = 0.01 + v * 0.003;
        const amplitude = 55 + v * 12;

        ctx.beginPath();
        ctx.strokeStyle = v % 2 === 0 ? "rgba(168, 85, 247, 0.45)" : "rgba(6, 182, 212, 0.40)";

        for (let x = -40; x < w + 40; x += 15) {
          const y = baseY + Math.sin(x * 0.008 + time * speed + v) * amplitude;

          if (x === -40) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);

          // Draw Liyawela Leaf Tendril Spirals
          if (x % 90 === 0) {
            const angle = Math.cos(x * 0.008 + time * speed) * 1.2;
            const lx = x + Math.cos(angle) * 30;
            const ly = y + Math.sin(angle) * 30;

            ctx.save();
            ctx.strokeStyle = "rgba(168, 85, 247, 0.50)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.quadraticCurveTo(x + 15, y - 20, lx, ly);
            ctx.stroke();

            // Leaf Tendril Tip Node
            ctx.fillStyle = "rgba(6, 182, 212, 0.60)";
            ctx.beginPath();
            ctx.arc(lx, ly, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
        ctx.stroke();
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
// 3. PALA PETHI FLORAL PETAL CANVAS (පළා පෙති)
// Layered Petal/Lotus Flowers + Antigravity Floating Petal Fragments
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

      const spacing = 110;
      const cols = Math.ceil(w / spacing) + 2;
      const rows = Math.ceil(h / spacing) + 2;

      ctx.lineWidth = 2.0;

      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const cx = c * spacing;
          const cy = r * spacing;
          const driftY = Math.sin(time * 0.015 + c * 0.4) * 8;

          ctx.strokeStyle = "rgba(20, 184, 166, 0.45)"; // Teal cyan

          // Draw Layered 4-Petal Lotus Flower Motif
          const R = 24;
          for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
            const px = cx + Math.cos(angle) * (R / 2);
            const py = cy + driftY + Math.sin(angle) * (R / 2);

            ctx.beginPath();
            ctx.arc(px, py, R / 2, angle - Math.PI / 2, angle + Math.PI / 2);
            ctx.stroke();

            // Inner Petal Layer
            ctx.strokeStyle = "rgba(245, 158, 11, 0.35)"; // Amber gold accent
            ctx.beginPath();
            ctx.arc(px, py, R / 3.5, angle - Math.PI / 2, angle + Math.PI / 2);
            ctx.stroke();
            ctx.strokeStyle = "rgba(20, 184, 166, 0.45)";
          }

          // Center Lotus Seed
          ctx.fillStyle = "rgba(245, 158, 11, 0.70)";
          ctx.beginPath();
          ctx.arc(cx, cy + driftY, 3.5, 0, Math.PI * 2);
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
