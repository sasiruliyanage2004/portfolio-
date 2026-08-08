import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Crosshair from '../Crosshair';

const FIELDS = [
  { key: 'name', label: 'name', placeholder: 'Jane Doe', type: 'text' },
  { key: 'email', label: 'email', placeholder: 'jane@company.com', type: 'email' },
  { key: 'message', label: 'message', placeholder: 'Tell me about the role or project…', type: 'textarea' },
];

export default function ContactMinimal() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [toast, setToast] = useState(null);

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setToast({ kind: 'error', text: 'exit 1 — all fields required' });
      setTimeout(() => setToast(null), 2800);
      return;
    }
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setToast({ kind: 'success', text: 'exit 0 — message queued for delivery' });
      setTimeout(() => setToast(null), 3200);
    }, 900);
  };

  return (
    <section id="contact" className="py-28 border-t border-white/[0.06]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-10">
          <p className="mono-pill text-cyan-300/80 mb-3">// open a channel</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Let's build something <span className="text-zinc-500">that scales.</span>
          </h2>
        </div>

        <div className="crosshair-frame relative rounded-xl border border-white/[0.08] bg-[#121318] overflow-hidden">
          <Crosshair />

          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-black/20">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="mono-pill text-zinc-500 ml-2">bash — ~/contact</span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 font-mono text-sm">
            <p className="text-zinc-500 mb-6">
              <span className="text-cyan-400">➜</span>{' '}
              <span className="text-indigo-300">~</span>{' '}
              contact --new
              <span className="caret-blink text-zinc-400">▍</span>
            </p>

            <div className="space-y-5">
              {FIELDS.map((field) => (
                <div key={field.key}>
                  <label htmlFor={field.key} className="block text-zinc-500 mb-1.5">
                    --{field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.key}
                      rows={4}
                      value={form[field.key]}
                      onChange={handleChange(field.key)}
                      placeholder={field.placeholder}
                      className="w-full resize-none rounded-md bg-black/30 border border-white/[0.08] px-3 py-2 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-colors"
                    />
                  ) : (
                    <input
                      id={field.key}
                      type={field.type}
                      value={form[field.key]}
                      onChange={handleChange(field.key)}
                      placeholder={field.placeholder}
                      className="w-full rounded-md bg-black/30 border border-white/[0.08] px-3 py-2 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-cyan-400 text-zinc-950 font-medium px-4 py-2 hover:bg-cyan-300 transition-colors disabled:opacity-60"
            >
              {status === 'sending' ? 'sending…' : status === 'sent' ? '✓ sent' : 'run ./send.sh'}
            </button>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 16, x: '-50%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`fixed bottom-6 left-1/2 z-50 mono-pill rounded-md border px-4 py-2.5 backdrop-blur-md ${
              toast.kind === 'success'
                ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200'
                : 'border-red-400/40 bg-red-400/10 text-red-200'
            }`}
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
