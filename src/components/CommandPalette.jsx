import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Command, Moon, Sun, Copy, Sparkles, FolderGit2, Terminal, User, FileText, Check } from "lucide-react";

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

export default function CommandPalette({ theme, toggleTheme, activePattern, setActivePattern, open, setOpen }) {
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
      id: "craft",
      category: "Navigation",
      label: "Jump to Craft Behind The Code",
      icon: Sparkles,
      run: () => {
        document.getElementById("craft")?.scrollIntoView({ behavior: "smooth" });
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
      id: "pattern-dumbara",
      category: "Cultural Motifs",
      label: "Set Background Pattern: Dumbara Geometric",
      icon: Sparkles,
      run: () => {
        setActivePattern("dumbara");
        setOpen(false);
      },
    },
    {
      id: "pattern-liyawela",
      category: "Cultural Motifs",
      label: "Set Background Pattern: Liyawela Bio-Flow",
      icon: Sparkles,
      run: () => {
        setActivePattern("liyawela");
        setOpen(false);
      },
    },
    {
      id: "pattern-palapethi",
      category: "Cultural Motifs",
      label: "Set Background Pattern: Pala Pethi Floral",
      icon: Sparkles,
      run: () => {
        setActivePattern("palapethi");
        setOpen(false);
      },
    },
    {
      id: "copy-email",
      category: "Quick Actions",
      label: "Copy Email Address (liyanagesasiru@gmail.com)",
      icon: Copy,
      run: () => {
        navigator.clipboard.writeText("liyanagesasiru@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: "github",
      category: "Quick Actions",
      label: "Open GitHub Profile",
      icon: GithubIcon,
      run: () => {
        window.open("https://github.com/sasiruliyanage2004", "_blank");
        setOpen(false);
      },
    },
    {
      id: "linkedin",
      category: "Quick Actions",
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
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/20 bg-[#0b0f17] dark:bg-[#0b0f17] light-theme:bg-[#ffffff] text-slate-100 dark:text-slate-100 light-theme:text-slate-900 shadow-2xl backdrop-blur-2xl z-10"
          >
            {/* Search Bar Input Header */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <Search className="h-4 w-4 text-cyan-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                autoFocus
                className="w-full bg-transparent font-mono text-sm placeholder-slate-500 focus:outline-none"
              />
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-[10px] text-slate-400">ESC</kbd>
            </div>

            {/* Action List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredActions.length === 0 ? (
                <p className="p-4 text-center font-mono text-xs text-slate-400">No matching commands found.</p>
              ) : (
                filteredActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={action.run}
                      className="flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left font-mono text-xs transition-colors hover:bg-cyan-500/20 hover:text-cyan-300 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-cyan-400" />
                        <span>{action.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase">{action.category}</span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-slate-500 bg-black/30">
              <div className="flex items-center gap-2">
                <span>Press <kbd className="text-cyan-400">Ctrl + K</kbd> anytime to open</span>
              </div>
              {copied && <span className="text-emerald-400 flex items-center gap-1"><Check className="h-3 w-3" /> Email Copied!</span>}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
