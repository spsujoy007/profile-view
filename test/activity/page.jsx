'use client';

import { useTheme } from '@/components/theme-provider';

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ActivityPage() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  const activity = [
    {
      event: 'Published a new case study for Nimbus Dashboard',
      type: 'publish',
      timestamp: '2 hours ago'
    },
    {
      event: 'Received 18 new profile visits in the last 24 hours',
      type: 'visit',
      timestamp: '1 day ago'
    },
    {
      event: 'Updated project screenshots and overview copy',
      type: 'update',
      timestamp: '3 days ago'
    },
    {
      event: 'Started following Jane Chen',
      type: 'follow',
      timestamp: '1 week ago'
    },
    {
      event: 'Received positive feedback on Pulse Connect project',
      type: 'feedback',
      timestamp: '1 week ago'
    },
    {
      event: 'Launched new portfolio website',
      type: 'launch',
      timestamp: '2 weeks ago'
    },
  ];

  const surfaceCard = isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-white/10 bg-white/[0.03] text-white';
  const softerText = isLight ? 'text-slate-500' : 'text-white/46';
  const mutedText = isLight ? 'text-slate-600' : 'text-white/60';

  const getActivityIcon = (type) => {
    const icons = {
      publish: '📝',
      visit: '👁️',
      update: '✏️',
      follow: '👥',
      feedback: '💬',
      launch: '🚀',
    };
    return icons[type] || '•';
  };

  return (
    <div className='space-y-6 pb-10'>
      <section className={joinClasses('rounded-[28px] border p-5 sm:p-6', surfaceCard)}>
        <h1 className={joinClasses('text-3xl font-medium tracking-[-0.04em]', isLight ? 'text-slate-950' : 'text-white')}>
          Activity
        </h1>
        <p className={joinClasses('mt-3 text-base', mutedText)}>
          Recent activity and updates from your profile and projects.
        </p>

        <div className='mt-8 space-y-3'>
          {activity.map((item, idx) => (
            <div
              key={idx}
              className={joinClasses(
                'flex items-start gap-4 rounded-[22px] border px-4 py-4 transition',
                isLight ? 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100' : 'border-white/10 bg-[#0b0e14] hover:border-white/18 hover:bg-white/[0.06]'
              )}
            >
              <span className='text-2xl mt-1'>{getActivityIcon(item.type)}</span>
              <div className='flex-1'>
                <p className={joinClasses('text-sm font-medium', isLight ? 'text-slate-950' : 'text-white')}>
                  {item.event}
                </p>
                <p className={joinClasses('mt-1 text-xs', softerText)}>
                  {item.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
