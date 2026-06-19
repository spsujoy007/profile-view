'use client';

import { useTheme } from '@/components/theme-provider';

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ExperiencePage() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  const experience = [
    {
      year: '2024',
      role: 'Frontend Engineer',
      company: 'Arc Studio',
      period: '2024 - Present',
      location: 'Remote / New York, USA',
      description: 'Leading frontend development for enterprise applications. Building scalable React components and optimizing performance.'
    },
    {
      year: '2022',
      role: 'UI Developer',
      company: 'Northstar Labs',
      period: '2022 - 2024',
      location: 'Austin, Texas, USA',
      description: 'Developed interactive user interfaces for SaaS products. Implemented design systems and mentored junior developers.'
    },
    {
      year: '2021',
      role: 'Junior Developer',
      company: 'Creative Studios',
      period: '2021 - 2022',
      location: 'Bangalore, India',
      description: 'Started career building responsive websites. Learned best practices in web development and design collaboration.'
    },
  ];

  const surfaceCard = isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-white/10 bg-white/[0.03] text-white';
  const softerText = isLight ? 'text-slate-500' : 'text-white/46';
  const mutedText = isLight ? 'text-slate-600' : 'text-white/60';
  const stepSurface = isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#0b0e14]';

  return (
    <div className='space-y-6 pb-10'>
      <section className={joinClasses('rounded-[28px] border p-5 sm:p-6', surfaceCard)}>
        <h1 className={joinClasses('text-3xl font-medium tracking-[-0.04em]', isLight ? 'text-slate-950' : 'text-white')}>
          Experience
        </h1>
        <p className={joinClasses('mt-3 text-base', mutedText)}>
          My professional journey across different companies and roles, shown in timeline order with location and job dates.
        </p>

        <div className='mt-8 space-y-5'>
          {experience.map((item, idx) => (
            <div key={item.year} className='flex gap-4 sm:gap-5'>
              <div className='flex flex-col items-center'>
                <div className={joinClasses('flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium', isLight ? 'border-slate-200 bg-white text-slate-950' : 'border-white/10 bg-white/6 text-white')}>
                  {idx + 1}
                </div>
                {idx !== experience.length - 1 && (
                  <div className={joinClasses('mt-2 h-full w-px flex-1', isLight ? 'bg-slate-200' : 'bg-white/10')} />
                )}
              </div>

              <div className={joinClasses('flex-1 rounded-[22px] border p-5 transition', stepSurface)}>
                <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                  <div className='flex-1'>
                    <p className={joinClasses('text-xs font-medium uppercase tracking-[0.22em]', softerText)}>{item.year}</p>
                    <h3 className={joinClasses('mt-2 text-lg font-medium', isLight ? 'text-slate-950' : 'text-white')}>
                      {item.role}
                    </h3>
                    <p className={joinClasses('text-sm', softerText)}>{item.company}</p>
                    <p className={joinClasses('mt-2 text-sm', softerText)}>{item.location}</p>
                    <p className={joinClasses('mt-3 text-sm leading-6', mutedText)}>{item.description}</p>
                  </div>

                  <div className={joinClasses('rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap', isLight ? 'border-slate-200 bg-white text-slate-700' : 'border-white/10 bg-white/6 text-white/70')}>
                    {item.period}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
