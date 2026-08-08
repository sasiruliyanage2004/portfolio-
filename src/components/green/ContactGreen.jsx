import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";

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

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const SOCIALS = [
  { icon: GithubIcon, href: "#", label: "GitHub" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
];

function MagneticIcon({ icon: Icon, href, label }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.4);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={label}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className="glass-panel flex h-11 w-11 items-center justify-center rounded-full text-emerald-400/70 transition-colors hover:text-emerald-300 border border-emerald-500/20 bg-[#06140e]"
    >
      <Icon className="h-4 w-4" />
    </motion.a>
  );
}

const FIELDS = [
  { id: "name", label: "name", type: "text", placeholder: "Jane Doe" },
  { id: "email", label: "email", type: "email", placeholder: "jane@company.com" },
];

export default function ContactGreen() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3200);
    }, 1100);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#040d08] px-6 py-28 lg:px-10 border-t border-emerald-500/15">
      <div className="absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-emerald-400">GET IN TOUCH</p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            Let's build something <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">worth shipping</span>
          </h2>
        </div>

        <div className="glass-panel noise-overlay relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-[#06140e]/90">
          <span className="border-beam" aria-hidden="true" />

          <div className="flex items-center gap-2 border-b border-emerald-500/20 px-5 py-3.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-3 font-mono text-[11px] text-emerald-400/60">~/contact --green</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 px-6 py-8 sm:px-8">
            {FIELDS.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="mb-1.5 block font-mono text-xs text-emerald-400/80"
                >
                  <span className="text-emerald-400">&gt;</span> {field.label}:
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  required
                  value={form[field.id]}
                  onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-emerald-500/20 bg-emerald-950/30 px-4 py-3 font-mono text-sm text-emerald-100 placeholder:text-emerald-700 outline-none transition-colors focus:border-emerald-400/60"
                />
              </div>
            ))}

            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-emerald-400/80">
                <span className="text-emerald-400">&gt;</span> message:
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-lg border border-emerald-500/20 bg-emerald-950/30 px-4 py-3 font-mono text-sm text-emerald-100 placeholder:text-emerald-700 outline-none transition-colors focus:border-emerald-400/60"
              />
            </div>

            <button
              type="submit"
              disabled={status !== "idle"}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 px-6 py-3.5 font-mono text-sm font-semibold text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-shadow hover:shadow-[0_0_40px_rgba(16,185,129,0.55)] disabled:opacity-70"
            >
              {status === "sending" ? (
                "sending()..."
              ) : (
                <>
                  send_message()
                  <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          {SOCIALS.map((s) => (
            <MagneticIcon key={s.label} {...s} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {status === "sent" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-panel fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full px-5 py-3 shadow-2xl border border-emerald-500/40 bg-[#06140e]"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span className="font-mono text-xs text-emerald-200">
              Message sent — I'll reply within 24h.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
