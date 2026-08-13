import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Send, Mail, Phone, MapPin, AlertCircle, Copy, Check } from "lucide-react";

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

const SOCIALS = [
  { icon: GithubIcon, href: "https://github.com/sasiruliyanage2004", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/sasiruliyanage", label: "LinkedIn" },
];

function MagneticIcon({ icon: Icon, href, label }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 transition-colors hover:text-cyan-400"
    >
      <Icon className="h-4 w-4" />
    </motion.a>
  );
}

function CopyBadge({ value, icon: Icon, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 transition-all hover:border-cyan-400/50 hover:text-white cursor-pointer"
    >
      <Icon className="h-3.5 w-3.5 text-cyan-400" />
      <span>{label}</span>
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 opacity-60" />}
    </button>
  );
}

export default function ContactCyber() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Awwwards Signature Scroll Zoom-In & Zoom-Out Parallax Effect
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.88, 1, 1, 0.88]);
  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [60, 0, 0, -60]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "6e01e3e1-e476-48bc-a687-c330d87209c5",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New Portfolio Message from ${form.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (err) {
      console.error("Web3Forms Submission Error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden bg-transparent px-6 pt-36 pb-28 lg:px-10 scroll-mt-24">
      <motion.div style={{ scale, y }} className="relative mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400/80">GET IN TOUCH</p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            Let's build something <span className="text-gradient">worth shipping</span>
          </h2>

          {/* Interactive Copy-to-Clipboard Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-slate-300">
            <CopyBadge value="liyanagesasiru@gmail.com" icon={Mail} label="liyanagesasiru@gmail.com" />
            <CopyBadge value="+94715700953" icon={Phone} label="+94 71 57 00 953" />
            <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-slate-400">
              <MapPin className="h-3.5 w-3.5 text-indigo-400" />
              Western Province, Sri Lanka
            </span>
          </div>
        </div>

        <div className="noise-overlay relative overflow-hidden rounded-2xl border border-white/15 dark:border-white/15 light-theme:border-slate-300/40 bg-[#0b0f17]/95 dark:bg-[#0b0f17]/95 light-theme:bg-[#F7F5F1]/95 backdrop-blur-2xl shadow-2xl z-10">
          <span className="border-beam" aria-hidden="true" />

          {/* Terminal Window Header */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3.5 bg-black/40">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 font-mono text-xs text-slate-400 opacity-80">contact_terminal.sh</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-7 sm:p-9">
            <div>
              <label htmlFor="name" className="mb-2 block font-mono text-xs text-slate-300 uppercase tracking-wider">
                // FULL_NAME
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Sasiru Nethvidu Liyanage"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder-slate-500 transition-all focus:border-cyan-400 focus:bg-white/[0.06] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block font-mono text-xs text-slate-300 uppercase tracking-wider">
                // EMAIL_ADDRESS
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="liyanagesasiru@gmail.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder-slate-500 transition-all focus:border-cyan-400 focus:bg-white/[0.06] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block font-mono text-xs text-slate-300 uppercase tracking-wider">
                // PROJECT_DETAILS
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project idea..."
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white placeholder-slate-500 transition-all focus:border-cyan-400 focus:bg-white/[0.06] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-cyan-500 to-violet-500 py-3.5 font-mono text-xs font-semibold text-white shadow-lg transition-all hover:shadow-cyan-500/25 disabled:opacity-50 cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.span key="idle" className="flex items-center gap-2">
                    Send Message <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </motion.span>
                )}
                {status === "sending" && (
                  <motion.span key="sending" className="flex items-center gap-2">
                    Transmitting...
                  </motion.span>
                )}
                {status === "sent" && (
                  <motion.span key="sent" className="flex items-center gap-2 text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" /> Message Sent Successfully!
                  </motion.span>
                )}
                {status === "error" && (
                  <motion.span key="error" className="flex items-center gap-2 text-red-300">
                    <AlertCircle className="h-4 w-4" /> Error Transmitting. Try Again!
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>

          {/* Terminal Footer */}
          <div className="flex flex-wrap items-center justify-between border-t border-white/[0.06] px-7 py-4 bg-black/40 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <MagneticIcon key={s.label} {...s} />
              ))}
            </div>
            <p className="font-mono text-[11px] opacity-70">
              © {new Date().getFullYear()} Sasiru Liyanage. Built with React 19 + Vite 8.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
