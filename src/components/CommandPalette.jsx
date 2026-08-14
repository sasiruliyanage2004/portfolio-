import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Command, Moon, Sun, Copy, FolderGit2, Terminal, User, FileText, Check, GraduationCap } from "lucide-react";

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

export default function CommandPalette({ theme, toggleTheme, open, setOpen }) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  // Global Ctrl/Cmd + K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setOpen]);

  const ACTIONS = [
    {
      id: "projects",
      category: "Navigation",
      label: "Jump to Projects & Builds",
      icon: FolderGit2,
      run: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
    },
    {
      id: "education",
      category: "Navigation",
      label: "Jump to Education & Journey",
      icon: GraduationCap,
      run: () => {
        document.getElementById("education")?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
    },
    {
      id: "skills",
      category: "Navigation",
      label: "Jump to Skills Matrix",
      icon: Terminal,
      run: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
    },
    {
      id: "contact",
      category: "Navigation",
      label: "Jump to Contact Terminal",
      icon: User,
      run: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
    },
    {
      id: "toggle-theme",
      category: "Appearance",
      label: `Switch Theme to ${theme === "dark" ? "Light Mode (Porcelain)" : "Dark Mode (Obsidian)"}`,
      icon: theme === "dark" ? Sun : Moon,
      run: () => {
        toggleTheme();
        setOpen(false);
      },
    },
    {
      id: "copy-email",
      category: "Actions",
      label: "Copy Email (liyanagesasiru@gmail.com)",
      icon: Copy,
      run: () => {
        navigator.clipboard.writeText("liyanagesasiru@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: "download-resume",
      category: "Actions",
      label: "Download CV / Resume (PDF)",
      icon: FileText,
      run: () => {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Sasiru_Liyanage_CV.pdf";
        link.click();
        setOpen(false);
      },
    },
    {
      id: "github",
      category: "Social Links",
      label: "Open GitHub Profile",
      icon: GithubIcon,
      run: () => {
        window.open("https://github.com/sasiruliyanage2004", "_blank");
        setOpen(false);
      },
    },
    {
      id: "linkedin",
      category: "Social Links",
      label: "Open LinkedIn Profile",
      icon: LinkedinIcon,
      run: () => {
        window.open("https://www.linkedin.com/in/sasiruliyanage", "_blank");
        setOpen(false);
      },
    },
  ];

  const filteredActions = ACTIONS.filter(
    (action) =>
      action.label.toLowerCase().includes(query.toLowerCase()) ||
      action.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Command Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="command-modal-box noise-overlay relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 dark:border-white/20 light-theme:border-slate-300 bg-[#090d16]/95 dark:bg-[#090d16]/95 light-theme:bg-white/95 text-slate-100 dark:text-slate-100 light-theme:text-slate-900 shadow-2xl backdrop-blur-2xl"
          >
            <span className="border-beam" aria-hidden="true" />

            {/* Input Search Header */}
            <div className="flex items-center border-b border-white/10 dark:border-white/10 light-theme:border-slate-200 px-5 py-4">
              <Search className="h-5 w-5 text-cyan-400 shrink-0 mr-3" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent font-mono text-sm placeholder:text-slate-500 focus:outline-none"
              />
              <kbd className="hidden sm:inline-block rounded-md bg-white/10 dark:bg-white/10 light-theme:bg-slate-100 px-2 py-1 font-mono text-[10px] opacity-70">
                ESC to close
              </kbd>
            </div>

            {/* Actions List */}
            <div className="max-h-[360px] overflow-y-auto p-3 space-y-1">
              {filteredActions.length > 0 ? (
                filteredActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={action.run}
                      className="group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all hover:bg-cyan-500/10 hover:text-cyan-400 cursor-pointer"
                    >
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <div className="glass-panel flex h-8 w-8 items-center justify-center rounded-lg group-hover:border-cyan-400/50">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="font-semibold">{action.label}</span>
                          <span className="ml-2 text-[10px] opacity-50 uppercase tracking-wider">
                            • {action.category}
                          </span>
                        </div>
                      </div>
                      {action.id === "copy-email" && copied && (
                        <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono">
                          <Check className="h-3.5 w-3.5" /> Copied!
                        </span>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center font-mono text-xs opacity-60">
                  No matching commands found for "{query}".
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-white/10 dark:border-white/10 light-theme:border-slate-200 px-5 py-3 font-mono text-[11px] opacity-60">
              <span className="flex items-center gap-1.5">
                <Command className="h-3.5 w-3.5 text-cyan-400" /> Navigation Shortcuts
              </span>
              <span>Use ↑ ↓ to navigate, Enter to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
