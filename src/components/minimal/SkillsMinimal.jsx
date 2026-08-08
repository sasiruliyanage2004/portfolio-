import { motion } from 'framer-motion';
import Crosshair from '../Crosshair';

const MATRIX = [
  {
    domain: 'Frontend',
    accent: 'cyan',
    items: [
      { name: 'React / Next.js', level: 92 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Framer Motion', level: 78 },
    ],
  },
  {
    domain: 'Backend',
    accent: 'indigo',
    items: [
      { name: 'Node.js', level: 90 },
      { name: 'Go', level: 75 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'gRPC / REST', level: 82 },
    ],
  },
  {
    domain: 'Cloud / DevOps',
    accent: 'cyan',
    items: [
      { name: 'AWS', level: 80 },
      { name: 'Docker', level: 88 },
      { name: 'Kubernetes', level: 70 },
      { name: 'Terraform', level: 72 },
    ],
  },
  {
    domain: 'System Architecture',
    accent: 'indigo',
    items: [
      { name: 'Distributed Systems', level: 84 },
      { name: 'Event-Driven Design', level: 86 },
      { name: 'API Design', level: 90 },
      { name: 'Scalability Planning', level: 80 },
    ],
  },
];

const accentMap = {
  cyan: { bar: 'bg-cyan-400', text: 'text-cyan-300' },
  indigo: { bar: 'bg-indigo-400', text: 'text-indigo-300' },
};

function ProficiencyBar({ name, level, accent }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-zinc-300">{name}</span>
        <span className="mono-pill text-zinc-500">{level}%</span>
      </div>
      <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className={`h-full rounded-full ${accentMap[accent].bar}`}
        />
      </div>
    </div>
  );
}

export default function SkillsMinimal() {
  return (
    <section id="skills" className="py-28 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="mono-pill text-indigo-300/80 mb-3">// capability matrix</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Depth across the stack,{' '}
            <span className="text-zinc-500">fluent in the seams between layers.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MATRIX.map((group, gi) => (
            <motion.div
              key={group.domain}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: gi * 0.05, ease: 'easeOut' }}
              className="crosshair-frame relative rounded-xl border border-white/[0.08] bg-[#121318] p-6"
            >
              <Crosshair />
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-zinc-100">{group.domain}</h3>
                <span className={`mono-pill ${accentMap[group.accent].text}`}>
                  0{gi + 1}
                </span>
              </div>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <ProficiencyBar key={item.name} {...item} accent={group.accent} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
