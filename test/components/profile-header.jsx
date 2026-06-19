'use client';

import Link from 'next/link';
import { useTheme } from '@/components/theme-provider';

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfileHeader({ username = 'Alex Morgan', usernameSlug = 'alexmorgan', bio, stats }) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  const shellCard = isLight
    ? 'border-slate-200 bg-white/85 text-slate-900 shadow-[0_26px_90px_rgba(15,23,42,0.08)]'
    : 'border-white/10 bg-[linear-gradient(180deg,rgba(13,16,23,0.94),rgba(8,10,14,0.98))] text-white shadow-[0_26px_90px_rgba(0,0,0,0.4)]';
  const mutedText = isLight ? 'text-slate-600' : 'text-white/60';
  const softerText = isLight ? 'text-slate-500' : 'text-white/46';
  const surfaceCard = isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-white/10 bg-white/[0.03] text-white';

  return (
    <section className={joinClasses('overflow-hidden rounded-[30px] border p-5 sm:p-7', shellCard)}>
      <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
        <div className='max-w-2xl'>
          <p className={joinClasses('text-sm font-medium uppercase tracking-[0.24em]', softerText)}>Profile Overview</p>
          <h1 className={joinClasses('mt-3 text-3xl font-medium tracking-[-0.06em] sm:text-5xl', isLight ? 'text-slate-950' : 'text-white')}>
            {username}
          </h1>
          <p className={joinClasses('mt-3 max-w-xl text-sm leading-6 sm:text-base', mutedText)}>
            {bio || 'Product-minded designer and frontend engineer crafting memorable digital identities, high-signal portfolios, and fast interfaces.'}
          </p>
        </div>

        <div className='flex flex-wrap gap-3'>
          <button className={joinClasses('rounded-[18px] border px-4 py-3 text-sm font-medium transition', isLight ? 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50' : 'border-white/10 bg-white/5 text-white/84 hover:border-white/18 hover:bg-white/8')}>
            Share Profile
          </button>
          <Link
            href={`/${usernameSlug}/edit`}
            className={joinClasses('rounded-[18px] px-4 py-3 text-sm font-medium transition hover:-translate-y-0.5 inline-block', isLight ? 'bg-[linear-gradient(180deg,#ffffff,#dde5ee)] text-slate-950' : 'bg-[linear-gradient(180deg,#f7f7f7,#dbdbdb)] text-black')}
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {stats && stats.length > 0 && (
        <div className='mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
          {stats.map((stat) => (
            <div key={stat.label} className={joinClasses('rounded-[22px] border p-4', surfaceCard)}>
              <div className={joinClasses('text-sm', softerText)}>{stat.label}</div>
              <div className={joinClasses('mt-2 text-3xl font-medium tracking-tighter', isLight ? 'text-slate-950' : 'text-white')}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
