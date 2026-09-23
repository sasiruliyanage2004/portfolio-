import React from "react";

/**
 * NoiseOverlay Component
 * Renders a subtle, high-performance SVG film grain / static noise overlay
 * over the entire viewport in Dark Mode to give a luxurious "Matte Pitch-Black" texture.
 */
export default function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9999] dark:opacity-[0.04] opacity-0 mix-blend-screen select-none transition-opacity duration-300"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="film-grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.80"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain-noise)" />
      </svg>
    </div>
  );
}
