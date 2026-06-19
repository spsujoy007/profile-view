'use client';

import { useTheme } from '@/components/theme-provider';

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AchievementsPage() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  const achievements = [
    {
      title: 'Won best product concept at the 2025 builder showcase',
      category: 'Award',
      date: '2025-01-20',
    },
    {
      title: 'Reached 20k monthly profile views across launched projects',
      category: 'Milestone',
      date: '2025-01-15',
    },
    {
      title: 'Published open-source design system with 5k GitHub stars',
      category: 'Open Source',
      date: '2024-12-10',
    },
    {
      title: 'Led design system modernization project at Arc Studio',
      category: 'Professional',
      date: '2024-11-30',
    },
    {
      title: 'Mentored 10 junior developers in React best practices',
      category: 'Mentoring',
      date: '2024-11-15',
    },
  ];

  const surfaceCard = isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-white/10 bg-white/[0.03] text-white';
  const softerText = isLight ? 'text-slate-500' : 'text-white/46';
  const mutedText = isLight ? 'text-slate-600' : 'text-white/60';
  const categoryColors = {
    Award: isLight ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    Milestone: isLight ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    'Open Source': isLight ? 'bg-green-50 border-green-200 text-green-700' : 'bg-green-500/10 border-green-500/30 text-green-400',
    Professional: isLight ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    Mentoring: isLight ? 'bg-pink-50 border-pink-200 text-pink-700' : 'bg-pink-500/10 border-pink-500/30 text-pink-400',
  };

  return (
    <div className='space-y-6 pb-10'>
      <section className={joinClasses('rounded-[28px] border p-5 sm:p-6', surfaceCard)}>
        <h1 className={joinClasses('text-3xl font-medium tracking-[-0.04em]', isLight ? 'text-slate-950' : 'text-white')}>
          Achievements
        </h1>
        <p className={joinClasses('mt-3 text-base', mutedText)}>
          Highlights and milestones from my professional journey and personal projects.
        </p>

        <div className='mt-8 space-y-3'>
          {achievements.map((achievement, idx) => (
            <div
              key={idx}
              className={joinClasses(
                'rounded-[22px] border p-4 flex items-start gap-4',
                isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#0b0e14]'
              )}
            >
              <div className={joinClasses('rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap mt-1', categoryColors[achievement.category] || categoryColors.Professional)}>
                {achievement.category}
              </div>
              <div className='flex-1'>
                <h3 className={joinClasses('font-medium', isLight ? 'text-slate-950' : 'text-white')}>
                  {achievement.title}
                </h3>
                <p className={joinClasses('mt-1 text-sm', softerText)}>
                  {new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
