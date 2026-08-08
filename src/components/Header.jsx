// Header.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Work', href: '#projects' },
  { label: 'Stack', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Header({ briefingMode, setBriefingMode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[#09090B]/80 backdrop-blur-md border-b border-white/[0.08]' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand mark */}
        <a href="#top" className="font-semibold tracking-tight text-[15px] text-zinc-100 flex items-center gap-1">
          PORTFOLIO<span className="text-cyan-400">.</span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mono-pill text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Status + briefing toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#121318] px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 status-dot" />
            <span className="mono-pill text-zinc-300">Online // Available for hire</span>
          </div>

          <button
            onClick={() => setBriefingMode(!briefingMode)}
            aria-pressed={briefingMode}
            className={`mono-pill rounded-full px-3 py-1.5 border transition-colors ${
              briefingMode
                ? 'border-cyan-400/50 text-cyan-300 bg-cyan-400/10'
                : 'border-white/[0.08] text-zinc-400 hover:text-zinc-100 hover:border-white/[0.14]'
            }`}
          >
            {briefingMode ? '⏸ Exit briefing' : '▶ 30-sec briefing'}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
