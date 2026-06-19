'use client';

import { useTheme } from '@/components/theme-provider';

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProjectsPage() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  const projects = [
    {
      name: 'Nimbus Dashboard',
      type: 'Product Design',
      summary: 'A responsive analytics workspace with live metrics and role-aware navigation.',
    },
    {
      name: 'Pulse Connect',
      type: 'Community Platform',
      summary: 'A creator network built around collaboration, discovery, and portfolio sharing.',
    },
    {
      name: 'Design System v2',
      type: 'Frontend Engineering',
      summary: 'Comprehensive component library and design tokens for enterprise applications.',
    },
    {
      name: 'Flow Analytics',
      type: 'Product Design',
      summary: 'Real-time data visualization platform for tracking user engagement metrics.',
    },
  ];

  const surfaceCard = isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-white/10 bg-white/[0.03] text-white';
  const softerText = isLight ? 'text-slate-500' : 'text-white/46';
  const mutedText = isLight ? 'text-slate-600' : 'text-white/60';

  return (
    <div className='space-y-6 pb-10'>
      <section className={joinClasses('rounded-[28px] border p-5 sm:p-6', surfaceCard)}>
        <h1 className={joinClasses('text-3xl font-medium tracking-[-0.04em]', isLight ? 'text-slate-950' : 'text-white')}>
          Projects
        </h1>
        <p className={joinClasses('mt-3 text-base', mutedText)}>
          Here are some of my recent projects and work. Each one represents a unique challenge and learning opportunity.
        </p>

        <div className='mt-8 grid gap-4 md:grid-cols-2'>
          {projects.map((project) => (
            <article
              key={project.name}
              className={joinClasses(
                'group rounded-3xl border p-5 transition cursor-pointer hover:shadow-lg',
                isLight ? 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100' : 'border-white/10 bg-[#0b0e14] hover:border-white/18 hover:bg-white/[0.06]'
              )}
            >
              <p className={joinClasses('text-sm', softerText)}>{project.type}</p>
              <h3 className={joinClasses('mt-2 text-lg font-medium', isLight ? 'text-slate-950' : 'text-white')}>
                {project.name}
              </h3>
              <p className={joinClasses('mt-2 text-sm leading-6', mutedText)}>{project.summary}</p>
              <button className={joinClasses('mt-4 text-sm font-medium', isLight ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300')}>
                View Project →
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
