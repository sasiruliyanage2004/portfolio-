import { useEffect, useRef } from "react";

export default function CulturalPatternCanvas({ theme = "dumbara" }) {
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

    // Render loop
    const render = () => {
      time += 1;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (theme === "dumbara") {
        drawDumbaraPattern(ctx, width, height, time);
      } else if (theme === "liyawela") {
        drawLiyawelaPattern(ctx, width, height, time);
      } else if (theme === "palapethi") {
        drawPalaPethiPattern(ctx, width, height, time);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ opacity: 0.85 }}
    />
  );
}

// ------------------------------------------------------------------
// 1. DUMBARA GEOMETRIC WEAVING ALGORITHM (ඩම්බර රටා)
// Procedural Rhombus Diamond Weave Grid + Center Lotus Crosses
// ------------------------------------------------------------------
function drawDumbaraPattern(ctx, width, height, time) {
  const size = 70; // Grid cell size
  const cols = Math.ceil(width / size) + 2;
  const rows = Math.ceil(height / size) + 2;

  ctx.lineWidth = 1.2;

  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < cols; c++) {
      const x = c * size + (r % 2 === 0 ? 0 : size / 2);
      const y = r * (size / 2);

      // Algorithmic wave offset mimicking traditional loom tension
      const wave = Math.sin(time * 0.015 + (c + r) * 0.4) * 3;
      const opacity = 0.15 + Math.sin(time * 0.01 + c * 0.2 + r * 0.3) * 0.08;

      ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;

      // Draw Outer Dumbara Rhombus Diamond
      ctx.beginPath();
      ctx.moveTo(x, y - size / 2 + wave);
      ctx.lineTo(x + size / 2, y + wave);
      ctx.lineTo(x, y + size / 2 + wave);
      ctx.lineTo(x - size / 2, y + wave);
      ctx.closePath();
      ctx.stroke();

      // Draw Inner Dumbara Concentric Diamond
      ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.85})`;
      ctx.beginPath();
      ctx.moveTo(x, y - size / 4 + wave);
      ctx.lineTo(x + size / 4, y + wave);
      ctx.lineTo(x, y + size / 4 + wave);
      ctx.lineTo(x - size / 4, y + wave);
      ctx.closePath();
      ctx.stroke();

      // Draw Center Lotus Cross Motif
      if ((c + r) % 3 === 0) {
        ctx.fillStyle = `rgba(6, 182, 212, ${opacity * 1.2})`;
        ctx.beginPath();
        ctx.arc(x, y + wave, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

// ------------------------------------------------------------------
// 2. LIYAWELA BIO-TECH VINE FLOW ALGORITHM (ලියවැල)
// Procedural Sinusoidal Leaf-and-Vine Curves + Spiraling Tendrils
// ------------------------------------------------------------------
function drawLiyawelaPattern(ctx, width, height, time) {
  const vineCount = 5;
  ctx.lineWidth = 1.4;

  for (let v = 0; v < vineCount; v++) {
    const baseY = (height / (vineCount + 1)) * (v + 1);
    const speed = 0.008 + v * 0.002;
    const amplitude = 40 + v * 10;
    const frequency = 0.008;

    ctx.beginPath();
    ctx.strokeStyle = v % 2 === 0 ? "rgba(168, 85, 247, 0.22)" : "rgba(6, 182, 212, 0.20)";

    for (let x = -50; x < width + 50; x += 12) {
      const y = baseY + Math.sin(x * frequency + time * speed + v) * amplitude;

      if (x === -50) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);

      // Draw Liyawela Leaf Tendril Nodes along the main vine
      if (x % 96 === 0) {
        const leafAngle = Math.cos(x * frequency + time * speed) * 0.8;
        const leafLen = 22;
        const lx = x + Math.cos(leafAngle) * leafLen;
        const ly = y + Math.sin(leafAngle) * leafLen;

        ctx.save();
        ctx.strokeStyle = "rgba(168, 85, 247, 0.30)";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + 12, y - 14, lx, ly);
        ctx.stroke();

        ctx.fillStyle = "rgba(6, 182, 212, 0.35)";
        ctx.beginPath();
        ctx.arc(lx, ly, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    ctx.stroke();
  }
}

// ------------------------------------------------------------------
// 3. PALA PETHI DECONSTRUCTED FLORAL PETAL ALGORITHM (පළා පෙති)
// Procedural Interlocking 4-Petal Flowers + Antigravity Floating Petals
// ------------------------------------------------------------------
function drawPalaPethiPattern(ctx, width, height, time) {
  const spacing = 80;
  const cols = Math.ceil(width / spacing) + 2;
  const rows = Math.ceil(height / spacing) + 2;

  ctx.lineWidth = 1.3;

  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < cols; c++) {
      const cx = c * spacing;
      const cy = r * spacing;

      // Antigravity drift offset
      const driftY = (Math.sin(time * 0.01 + c * 0.3) * 6);
      const opacity = 0.16 + Math.cos(time * 0.008 + c + r) * 0.06;

      ctx.strokeStyle = `rgba(20, 184, 166, ${opacity})`;

      // Draw 4 Pala Pethi Petals
      const petalRadius = 18;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
        const px = cx + Math.cos(angle) * (petalRadius / 2);
        const py = cy + driftY + Math.sin(angle) * (petalRadius / 2);

        ctx.beginPath();
        ctx.arc(px, py, petalRadius / 2, angle - Math.PI / 2, angle + Math.PI / 2);
        ctx.stroke();
      }

      // Center Floral Seed
      ctx.fillStyle = `rgba(245, 158, 11, ${opacity * 1.4})`;
      ctx.beginPath();
      ctx.arc(cx, cy + driftY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
