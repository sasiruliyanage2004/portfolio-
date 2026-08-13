import { useState, useEffect } from "react";
import { Command, Heart, Clock, ArrowUpRight, Copy, Check, Mail } from "lucide-react";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer({ onOpenCommandPalette }) {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);

  // Real-time Live Sri Lankan Time Clock (Asia/Colombo)
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Colombo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("liyanagesasiru@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="sticky bottom-0 h-[85vh] sm:h-screen w-full flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-[#05080f] dark:bg-[#05080f] light-theme:bg-[#F7F5F1] text-slate-100 dark:text-slate-100 light-theme:text-slate-900 z-0 overflow-hidden">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/10 dark:border-white/10 light-theme:border-slate-300 pb-8">
        <div>
          <p className="font-mono text-xs text-cyan-400 font-extrabold uppercase tracking-[0.3em] mb-2">
            LOCATION &amp; LOCAL TIME
          </p>
          <div className="flex items-center gap-3 font-mono text-sm text-slate-300 dark:text-slate-300 light-theme:text-slate-700">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-cyan-400 animate-spin-slow" />
              Sri Lanka (GMT+5:30):
            </span>
            <span className="font-bold text-white dark:text-white light-theme:text-slate-900 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
              {time || "11:30:00 AM"}
            </span>
          </div>
        </div>

        {/* Clean Integrated Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2.5 rounded-full border border-white/20 dark:border-white/20 light-theme:border-slate-300 bg-white/5 px-5 py-2.5 font-mono text-xs transition-all hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 cursor-pointer shadow-lg"
        >
          <Command className="h-4 w-4 text-cyan-400" />
          <span>Open Command Palette</span>
          <kbd className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-cyan-300">Ctrl + K</kbd>
        </button>
      </div>

      {/* Middle Hero Section */}
      <div className="my-auto py-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none drop-shadow-xl">
              Let's create the <span className="text-gradient">Extraordinary</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl">
              2nd Year SLIIT Undergraduate &amp; Full-Stack Engineer crafting high-performance React 19 web applications with Sri Lankan cultural motif algorithms.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-cyan-500 to-violet-500 px-6 py-3 font-mono text-xs font-bold text-white shadow-xl hover:shadow-cyan-500/25 transition-all cursor-pointer"
            >
              <Mail className="h-4 w-4" />
              {copied ? "Email Copied!" : "liyanagesasiru@gmail.com"}
              {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4 opacity-80" />}
            </button>
          </div>
        </div>
      </div>

      {/* Giant Ambient Background Typography */}
      <div className="relative py-4 border-t border-white/10 dark:border-white/10 light-theme:border-slate-300 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/sasiruliyanage2004"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
          >
            <GithubIcon className="h-4 w-4" /> GitHub <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/sasiruliyanage"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
          >
            <LinkedinIcon className="h-4 w-4" /> LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <p className="flex items-center gap-1.5 opacity-80">
          © {new Date().getFullYear()} Sasiru Liyanage. Crafting with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 animate-pulse" /> in Sri Lanka.
        </p>
      </div>
    </footer>
  );
}
