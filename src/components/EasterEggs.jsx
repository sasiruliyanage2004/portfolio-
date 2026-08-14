import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

export default function EasterEggs() {
  const seqRef = useRef([]);
  const [showSecret, setShowSecret] = useState(false);

  // ── Tab title change on blur/focus ────────────────────────────────────────
  useEffect(() => {
    const originalTitle = document.title;
    const awayTitle = "👋 Come back! | Sasiru Liyanage";

    const onBlur = () => { document.title = awayTitle; };
    const onFocus = () => { document.title = originalTitle; };

    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  // ── Konami Code listener ──────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key;
      seqRef.current = [...seqRef.current, key].slice(-KONAMI.length);
      if (seqRef.current.join(",") === KONAMI.join(",")) {
        triggerKonami();
        seqRef.current = [];
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const triggerKonami = () => {
    setShowSecret(true);
    // Confetti burst — brand colors
    const colors = ["#06b6d4", "#6366f1", "#a855f7", "#ffffff"];
    confetti({
      particleCount: 220,
      spread: 120,
      origin: { x: 0.5, y: 0.55 },
      colors,
      scalar: 1.1,
      ticks: 300,
    });
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 80,
      origin: { x: 0, y: 0.6 },
      colors,
      ticks: 250,
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 80,
      origin: { x: 1, y: 0.6 },
      colors,
      ticks: 250,
    });
    setTimeout(() => setShowSecret(false), 5000);
  };

  return (
    <>
      {/* Secret Konami modal */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
          >
            <div className="relative rounded-3xl border border-white/20 bg-[#090d16]/95 backdrop-blur-2xl p-10 text-center shadow-2xl max-w-sm mx-4">
              <div className="text-5xl mb-4">🎮</div>
              <h2
                className="text-2xl font-extrabold font-mono mb-2"
                style={{
                  background: "linear-gradient(135deg,#06b6d4,#6366f1,#a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                KONAMI CODE UNLOCKED
              </h2>
              <p className="font-mono text-sm text-slate-400 leading-relaxed">
                You found the easter egg! 🇱🇰<br />
                Sasiru says thanks for exploring every corner.
              </p>
              <p className="mt-3 font-mono text-xs text-cyan-400 opacity-70">
                ↑↑↓↓←→←→BA
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
