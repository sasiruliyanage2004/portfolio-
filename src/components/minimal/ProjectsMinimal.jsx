import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Crosshair from '../Crosshair';

const PROJECTS = [
  {
    id: 'orbit',
    title: 'Orbit',
    tagline: 'Event-driven order pipeline processing 4M+ events/day',
    tags: ['Go', 'Kafka', 'Postgres', 'Redis'],
    size: 'lg',
    github: 'https://github.com',
    demo: '#',
    nodes: ['Client', 'API Gateway', 'Kafka', 'Worker Pool', 'Postgres'],
  },
  {
    id: 'ledger',
    title: 'Ledger',
    tagline: 'Double-entry accounting engine for multi-tenant SaaS',
    tags: ['Rust', 'gRPC', 'CockroachDB'],
    size: 'sm',
    github: 'https://github.com',
    demo: '#',
    nodes: ['Client', 'gRPC', 'Ledger Core', 'CockroachDB'],
  },
  {
    id: 'meridian',
    title: 'Meridian',
    tagline: 'Realtime collaboration layer with CRDT sync',
    tags: ['TypeScript', 'WebRTC', 'CRDT'],
    size: 'sm',
    github: 'https://github.com',
    demo: '#',
    nodes: ['Peer A', 'Signal Server', 'Peer B', 'CRDT Merge'],
  },
  {
    id: 'strata',
    title: 'Strata',
    tagline: 'Infra-as-code framework for zero-downtime cluster rollouts',
    tags: ['TypeScript', 'AWS', 'Terraform', 'K8s'],
    size: 'md',
    github: 'https://github.com',
    demo: '#',
    nodes: ['CLI', 'Plan Engine', 'Terraform', 'K8s Cluster'],
  },
];

function ArchitectureDiagram({ nodes }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="overflow-hidden"
    >
      <div className="mt-4 rounded-lg border border-white/[0.06] bg-black/30 p-4">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="mono-pill text-zinc-600">architecture.diagram</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {nodes.map((node, i) => (
            <div key={node} className="flex items-center gap-2">
              <span className="mono-pill rounded border border-white/[0.08] bg-[#121318] px-2 py-1 text-zinc-300">
                {node}
              </span>
              {i < nodes.length - 1 && <span className="text-cyan-400/60 text-xs">→</span>}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project }) {
  const [showDiagram, setShowDiagram] = useState(false);

  const spanClass =
    project.size === 'lg'
      ? 'md:col-span-2 md:row-span-2'
      : project.size === 'md'
      ? 'md:col-span-2'
      : '';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`crosshair-frame relative rounded-xl border border-white/[0.08] bg-[#121318] p-6 flex flex-col hover:border-white/[0.16] transition-colors ${spanClass}`}
    >
      <Crosshair />

      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-zinc-100">{project.title}</h3>
        <div className="flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} source on GitHub`}
            className="text-zinc-500 hover:text-zinc-100 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.93c.57.1.78-.25.78-.55v-2.02c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16v3.2c0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} live demo`}
            className="text-zinc-500 hover:text-cyan-400 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>

      <p className="text-sm text-zinc-400 leading-relaxed mb-4">{project.tagline}</p>

      <div className="flex flex-wrap gap-2 mb-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="mono-pill rounded border border-white/[0.08] px-2 py-1 text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <button
          onClick={() => setShowDiagram((v) => !v)}
          className="mono-pill flex items-center gap-1.5 text-zinc-500 hover:text-cyan-300 transition-colors"
        >
          <span className={`transition-transform ${showDiagram ? 'rotate-90' : ''}`}>›</span>
          {showDiagram ? 'Hide' : 'View'} architecture
        </button>

        <AnimatePresence>
          {showDiagram && <ArchitectureDiagram nodes={project.nodes} />}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function ProjectsMinimal() {
  return (
    <section id="projects" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="mono-pill text-cyan-300/80 mb-3">// featured builds</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Architecture you can read,{' '}
            <span className="text-zinc-500">code you can trust.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:auto-rows-fr">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
