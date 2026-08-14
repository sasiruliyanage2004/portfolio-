import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Send, Mail, Phone, MapPin, AlertCircle, Copy, Check, Terminal as TerminalIcon } from "lucide-react";

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

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const SOCIALS = [
  { icon: GithubIcon, href: "https://github.com/sasiruliyanage2004", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/sasiruliyanage", label: "LinkedIn" },
  { icon: WhatsAppIcon, href: "https://wa.me/94715700953?text=Hi%20Sasiru,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!", label: "WhatsApp" },
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
      className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:text-cyan-400"
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
      className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 transition-all hover:border-cyan-400/50 cursor-pointer"
    >
      <Icon className="h-3.5 w-3.5 text-cyan-400" />
      <span>{label}</span>
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 opacity-60" />}
    </button>
  );
}

export default function ContactCyber() {
  const [activeTab, setActiveTab] = useState("form"); // "form" | "cli"
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  // CLI Command Executor States
  const [cmdInput, setCmdInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([
    { type: "sys", text: "Sasiru CyberShell v2.4.0 (x86_64-apple-darwin20)" },
    { type: "sys", text: "Type 'help' to view available system commands." },
  ]);

  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.88, 1, 1, 0.88]);
  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [60, 0, 0, -60]);

  const handleCommandExecute = (e) => {
    e.preventDefault();
    const cleanCmd = cmdInput.trim().toLowerCase();
    if (!cleanCmd) return;

    const newHistory = [...cmdHistory, { type: "user", text: `$ ${cmdInput}` }];

    switch (cleanCmd) {
      case "help":
        newHistory.push({
          type: "out",
          text: "AVAILABLE COMMANDS:\n  whoami    - Display developer identity & background\n  projects  - Jump to Projects & Builds section\n  skills    - Jump to Skills Matrix section\n  contact   - Display email & phone details\n  whatsapp  - Direct chat on WhatsApp (+94 71 57 00 953)\n  github    - Open GitHub repository\n  clear     - Clear shell output",
        });
        break;
      case "whoami":
        newHistory.push({
          type: "out",
          text: "Sasiru Nethvidu Liyanage\nFull-Stack Software Engineer & 2nd Year Undergraduate at SLIIT ('26)\nSpecialization: React 19, Node.js, Python, Tailwind v4, & Framer Motion.",
        });
        break;
      case "projects":
        newHistory.push({ type: "out", text: "Redirecting to Projects & Builds section..." });
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "skills":
        newHistory.push({ type: "out", text: "Redirecting to Skills Matrix section..." });
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "contact":
        newHistory.push({
          type: "out",
          text: "Email: liyanagesasiru@gmail.com\nPhone: +94 71 57 00 953\nWhatsApp: wa.me/94715700953\nLocation: Western Province, Sri Lanka",
        });
        break;
      case "whatsapp":
        newHistory.push({ type: "out", text: "Opening WhatsApp chat..." });
        window.open("https://wa.me/94715700953?text=Hi%20Sasiru,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!", "_blank");
        break;
      case "github":
        newHistory.push({ type: "out", text: "Opening https://github.com/sasiruliyanage2004..." });
        window.open("https://github.com/sasiruliyanage2004", "_blank");
        break;
      case "clear":
        setCmdHistory([]);
        setCmdInput("");
        return;
      default:
        newHistory.push({ type: "error", text: `command not found: ${cleanCmd}. Type 'help' for options.` });
        break;
    }

    setCmdHistory(newHistory);
    setCmdInput("");
  };

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
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400 font-extrabold uppercase">GET IN TOUCH</p>
          <h2 className="mt-3 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
            Let's build something <span className="text-gradient">worth shipping</span>
          </h2>

          {/* Interactive Copy-to-Clipboard Badges & WhatsApp Quick Link */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            <CopyBadge value="liyanagesasiru@gmail.com" icon={Mail} label="liyanagesasiru@gmail.com" />
            <a
              href="https://wa.me/94715700953?text=Hi%20Sasiru,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 hover:border-emerald-400/50 hover:text-emerald-400 transition-all cursor-pointer"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-400" />
              <span>+94 71 57 00 953 (WhatsApp)</span>
            </a>
            <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2">
              <MapPin className="h-3.5 w-3.5 text-indigo-400" />
              Western Province, Sri Lanka
            </span>
          </div>
        </div>

        <div className="contact-terminal-box noise-overlay relative overflow-hidden rounded-3xl backdrop-blur-2xl shadow-2xl z-10">
          <span className="border-beam" aria-hidden="true" />

          {/* Terminal Window Header with Interactive Mode Tabs */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5 bg-black/40">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-2 font-mono text-xs opacity-80">contact_terminal.sh</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("form")}
                className={`rounded-lg px-3 py-1 font-mono text-xs transition-colors cursor-pointer ${
                  activeTab === "form" ? "bg-cyan-500/20 text-cyan-400 font-semibold" : "opacity-60 hover:opacity-100"
                }`}
              >
                Contact Form
              </button>
              <button
                onClick={() => setActiveTab("cli")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-mono text-xs transition-colors cursor-pointer ${
                  activeTab === "cli" ? "bg-cyan-500/20 text-cyan-400 font-semibold" : "opacity-60 hover:opacity-100"
                }`}
              >
                <TerminalIcon className="h-3 w-3" /> CLI Mode
              </button>
            </div>
          </div>

          {/* Tab 1: Standard GUI Contact Form */}
          {activeTab === "form" ? (
            <form onSubmit={handleSubmit} className="space-y-6 p-7 sm:p-9">
              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wider">
                  // FULL_NAME
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Sasiru Nethvidu Liyanage"
                  className="w-full rounded-xl border px-4 py-3 font-mono text-sm transition-all focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-wider">
                  // EMAIL_ADDRESS
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="liyanagesasiru@gmail.com"
                  className="w-full rounded-xl border px-4 py-3 font-mono text-sm transition-all focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wider">
                  // PROJECT_DETAILS
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project idea..."
                  className="w-full rounded-xl border px-4 py-3 font-mono text-sm transition-all focus:border-cyan-400 focus:outline-none"
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
          ) : (
            /* Tab 2: Interactive Terminal Command Executor */
            <div className="p-7 sm:p-9 font-mono text-xs">
              <div className="min-h-[220px] max-h-[300px] overflow-y-auto space-y-2 mb-4 pr-2">
                {cmdHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className={`whitespace-pre-line ${
                      item.type === "sys"
                        ? "text-cyan-400 font-semibold"
                        : item.type === "user"
                        ? "text-indigo-400 font-bold"
                        : item.type === "error"
                        ? "text-red-400"
                        : "opacity-90"
                    }`}
                  >
                    {item.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleCommandExecute} className="flex items-center gap-2 border-t border-white/10 pt-4">
                <span className="text-cyan-400 font-bold">$</span>
                <input
                  type="text"
                  value={cmdInput}
                  onChange={(e) => setCmdInput(e.target.value)}
                  placeholder="Type 'help', 'whoami', 'projects', 'skills', 'contact', or 'whatsapp'..."
                  className="w-full bg-transparent font-mono text-xs focus:outline-none"
                />
              </form>
            </div>
          )}

          {/* Terminal Footer */}
          <div className="flex flex-wrap items-center justify-between border-t border-white/[0.06] px-7 py-4 bg-black/40 text-xs">
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
