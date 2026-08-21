import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Send, Mail, Phone, MapPin, AlertCircle, Copy, Check, Terminal as TerminalIcon } from "lucide-react";

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

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

  const handleCommandExecute = (e) => {
    e.preventDefault();
    const cleanCmd = cmdInput.trim().toLowerCase();
    if (!cleanCmd) return;

    const newHistory = [...cmdHistory, { type: "user", text: `$ ${cmdInput}` }];

    switch (cleanCmd) {
      case "help":
        newHistory.push({
          type: "out",
          text: "AVAILABLE CYBER TERMINAL COMMANDS:\n  whoami          - Display developer identity & credentials\n  exp             - View current & past industry experience\n  projects        - Navigate to Projects & Architecture section\n  skills          - Jump to Skills Matrix section\n  resume          - Download official updated CV (PDF)\n  stats           - View live system & engineering telemetry\n  sudo hire sasiru- Direct priority hiring protocol\n  contact         - Display email, WhatsApp & location details\n  github          - Open GitHub profile\n  clear           - Clear terminal buffer",
        });
        break;
      case "whoami":
        newHistory.push({
          type: "out",
          text: "Sasiru Nethvidu Liyanage\nFull-Stack Software Engineer • Computer Vision & AI Enthusiast\n2nd-Year Undergraduate at SLIIT (BSc Hons IT '26)\nCurrent Role: Software Engineering Intern at Multi Talent Technology",
        });
        break;
      case "exp":
      case "experience":
        newHistory.push({
          type: "out",
          text: "INDUSTRY EXPERIENCE:\n[1] Software Engineering Intern — Multi Talent Technology (Jun 2026 — Present)\n    • Full-stack web apps, API architecture, agile sprint deployments\n[2] Trainee Account Assistant — Liberty Motor Associates (May 2024 — Jul 2024)\n    • Data auditing, financial reconciliation & spreadsheet automation",
        });
        break;
      case "resume":
      case "cv":
      case "cat resume.pdf":
      case "cat cv":
        newHistory.push({
          type: "out",
          text: "Initiating secure download of Sasiru_Liyanage_CV.pdf...",
        });
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Sasiru_Liyanage_CV.pdf";
        link.click();
        break;
      case "sudo hire sasiru":
      case "hire":
        newHistory.push({
          type: "out",
          text: "✨ ACCESS GRANTED! Priority hiring protocol initiated.\nRedirecting to WhatsApp to start the conversation...",
        });
        setTimeout(() => {
          window.open("https://wa.me/94715700953?text=Hi%20Sasiru,%20I%20would%20like%20to%20discuss%20a%20job/project%20opportunity%20with%20you!", "_blank");
        }, 800);
        break;
      case "stats":
      case "telemetry":
        newHistory.push({
          type: "out",
          text: "ENGINEERING TELEMETRY:\n• Primary Stacks: React 19, TypeScript, Node.js, Python, FastAPI, YOLOv11\n• Repositories: 11 Public GitHub Builds\n• Location: Makola, Western Province, Sri Lanka\n• Status: Operational & Available for Hire",
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
          text: "CONTACT DETAILS:\n• Email: liyanagesasiru@gmail.com\n• Phone: +94 71 57 00 953\n• WhatsApp: wa.me/94715700953\n• Address: 96/2 Makola South, Makola, Western Province, LK",
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
        newHistory.push({ type: "error", text: `command not found: ${cleanCmd}. Type 'help' to see all available commands.` });
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
    <section ref={sectionRef} id="contact" className="relative w-full overflow-hidden bg-transparent py-20 sm:py-28 px-4 sm:px-6 lg:px-10 scroll-mt-20">
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-8 sm:mb-12 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400 font-extrabold uppercase">GET IN TOUCH</p>
          <h2 className="mt-2 sm:mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
            Let's build something <span className="text-gradient">worth shipping</span>
          </h2>

          {/* Interactive Copy-to-Clipboard Badges & WhatsApp Quick Link */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 font-mono text-xs">
            <CopyBadge value="liyanagesasiru@gmail.com" icon={Mail} label="liyanagesasiru@gmail.com" />
            <a
              href="https://wa.me/94715700953?text=Hi%20Sasiru,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 hover:border-emerald-400/50 hover:text-emerald-400 transition-all cursor-pointer text-xs"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>+94 71 57 00 953</span>
            </a>
            <span className="glass-panel inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs">
              <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              Makola, Western Province, LK
            </span>
          </div>
        </div>

        <div className="contact-terminal-box noise-overlay relative overflow-hidden rounded-3xl backdrop-blur-2xl shadow-2xl z-10">
          <span className="border-beam" aria-hidden="true" />

          {/* Terminal Window Header with Interactive Mode Tabs */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 sm:px-5 py-3 sm:py-3.5 bg-black/40">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-1 sm:ml-2 font-mono text-[11px] sm:text-xs opacity-80 truncate max-w-[120px] sm:max-w-none">contact_terminal.sh</span>
            </div>

            <div className="flex gap-1.5 sm:gap-2">
              <button
                onClick={() => setActiveTab("form")}
                className={`rounded-lg px-2.5 sm:px-3 py-1 font-mono text-[11px] sm:text-xs transition-colors cursor-pointer ${
                  activeTab === "form" ? "bg-cyan-500/20 text-cyan-400 font-semibold" : "opacity-60 hover:opacity-100"
                }`}
              >
                Contact Form
              </button>
              <button
                onClick={() => setActiveTab("cli")}
                className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-2.5 sm:px-3 py-1 font-mono text-[11px] sm:text-xs transition-colors cursor-pointer ${
                  activeTab === "cli" ? "bg-cyan-500/20 text-cyan-400 font-semibold" : "opacity-60 hover:opacity-100"
                }`}
              >
                <TerminalIcon className="h-3 w-3" />
                <span>Terminal</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Standard GUI Contact Form */}
          {activeTab === "form" ? (
            <form onSubmit={handleSubmit} className="space-y-6 p-7 sm:p-9">
              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wider">
                  // YOUR_NAME
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. John Doe / Hiring Manager"
                  className="w-full rounded-xl border border-white/20 px-4 py-3 font-mono text-sm transition-all focus:border-cyan-400 focus:outline-none [&:user-valid]:border-emerald-500/50 [&:user-invalid]:border-red-500/40"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-wider">
                  // YOUR_EMAIL_ADDRESS
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. recruiter@company.com"
                  className="w-full rounded-xl border border-white/20 px-4 py-3 font-mono text-sm transition-all focus:border-cyan-400 focus:outline-none [&:user-valid]:border-emerald-500/50 [&:user-invalid]:border-red-500/40"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wider">
                  // PROJECT_OR_INQUIRY_DETAILS
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project idea, job opportunity, or inquiry..."
                  className="w-full rounded-xl border border-white/20 px-4 py-3 font-mono text-sm transition-all focus:border-cyan-400 focus:outline-none [&:user-valid]:border-emerald-500/50 [&:user-invalid]:border-red-500/40"
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
          <div className="flex flex-wrap items-center justify-between border-t border-white/[0.06] px-7 py-3.5 bg-black/40 text-xs">
            <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-400 opacity-80">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Status: Encrypted &amp; Operational</span>
            </div>
            <p className="font-mono text-[11px] opacity-70">
              © {new Date().getFullYear()} Sasiru Liyanage
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
