'use client';

import { useTheme } from '@/components/theme-provider';

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SkillsPage() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'JavaScript']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs']
    },
    {
      category: 'Design',
      skills: ['Motion Design', 'UI Design', 'UX Research', 'Figma', 'Prototyping']
    },
    {
      category: 'Tools & Platforms',
      skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Firebase', 'API Design']
    },
  ];

  const surfaceCard = isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-white/10 bg-white/[0.03] text-white';
  const softerText = isLight ? 'text-slate-500' : 'text-white/46';
  const mutedText = isLight ? 'text-slate-600' : 'text-white/60';
  const chipSurface = isLight ? 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100' : 'border-white/10 bg-[#0b0e14] text-white/76 hover:bg-white/[0.08]';

  return (
    <div className='space-y-6 pb-10'>
      <section className={joinClasses('rounded-[28px] border p-5 sm:p-6', surfaceCard)}>
        <h1 className={joinClasses('text-3xl font-medium tracking-[-0.04em]', isLight ? 'text-slate-950' : 'text-white')}>
          Skills
        </h1>
        <p className={joinClasses('mt-3 text-base', mutedText)}>
          A comprehensive overview of my technical skills, tools, and expertise across different domains.
        </p>

        <div className='mt-8 grid gap-6 md:grid-cols-2'>
          {skillCategories.map((category) => (
            <div key={category.category}>
              <h3 className={joinClasses('text-lg font-medium mb-4', isLight ? 'text-slate-950' : 'text-white')}>
                {category.category}
              </h3>
              <div className='flex flex-wrap gap-2'>
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={joinClasses(
                      'rounded-full border px-4 py-2 text-sm transition cursor-pointer',
                      chipSurface
                    )}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
