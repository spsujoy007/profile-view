'use client';

import ProfileHeader from '@/components/profile-header';
import ProfileNav from '@/components/profile-nav';
import { useTheme } from '@/components/theme-provider';

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function OverviewPage({ params }) {
  const { username } = params;
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  const overviewStats = [
    { label: 'Projects', value: '12' },
    { label: 'Followers', value: '1.8k' },
    { label: 'Following', value: '94' },
    { label: 'Views', value: '24.7k' },
  ];

  const quickLinks = [
    { label: 'Overview', description: 'Profile summary and statistics' },
    { label: 'Projects', description: 'Showcase of recent work' },
    { label: 'Experience', description: 'Professional background' },
    { label: 'Skills', description: 'Technical and design expertise' },
    { label: 'Articles', description: 'Published thoughts and insights' },
    { label: 'Achievements', description: 'Awards and milestones' },
    { label: 'Activity', description: 'Recent updates and progress' },
  ];

  const surfaceCard = isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-white/10 bg-white/[0.03] text-white';
  const mutedText = isLight ? 'text-slate-600' : 'text-white/60';
  const softerText = isLight ? 'text-slate-500' : 'text-white/46';

  return (
    <div className='space-y-6 pb-10'>
      <ProfileHeader stats={overviewStats} username={username} usernameSlug={username} />
      <ProfileNav username={username} />

      <section className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
        <div className={joinClasses('rounded-[28px] border p-5 sm:p-6', surfaceCard)}>
          <h2 className={joinClasses('text-2xl font-medium tracking-[-0.04em]', isLight ? 'text-slate-950' : 'text-white')}>
            Welcome Back!
          </h2>
          <p className={joinClasses('mt-3 max-w-2xl text-sm leading-6', mutedText)}>
            This is your profile overview. Navigate through different sections to view your projects, experience, skills, articles, achievements, and recent activity. Each section has been organized into dedicated pages for better navigation and clarity.
          </p>
        </div>

        <div className={joinClasses('rounded-[28px] border p-5 sm:p-6', surfaceCard)}>
          <h2 className={joinClasses('text-xl font-medium tracking-[-0.04em]', isLight ? 'text-slate-950' : 'text-white')}>
            Quick Navigation
          </h2>
          <p className={joinClasses('mt-3 text-xs', softerText)}>Click any section to navigate</p>
          <nav className='mt-4 flex flex-wrap gap-2'>
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.label === 'Overview' ? `/${username}` : `/${username}/${link.label.toLowerCase()}`}
                title={link.description}
                className={joinClasses(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition',
                  isLight ? 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950' : 'border-white/10 bg-white/3 text-white/72 hover:border-white/18 hover:bg-white/6 hover:text-white'
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className={joinClasses('rounded-[28px] border p-5 sm:p-6', surfaceCard)}>
        <h2 className={joinClasses('text-2xl font-medium tracking-[-0.04em]', isLight ? 'text-slate-950' : 'text-white')}>
          About This Profile
        </h2>
        <div className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <div>
            <p className={joinClasses('text-3xl font-medium tracking-tighter', isLight ? 'text-blue-600' : 'text-blue-400')}>7</p>
            <p className={joinClasses('mt-1 text-sm', softerText)}>Sections</p>
          </div>
          <div>
            <p className={joinClasses('text-3xl font-medium tracking-tighter', isLight ? 'text-green-600' : 'text-green-400')}>Organized</p>
            <p className={joinClasses('mt-1 text-sm', softerText)}>Navigation</p>
          </div>
          <div>
            <p className={joinClasses('text-3xl font-medium tracking-tighter', isLight ? 'text-purple-600' : 'text-purple-400')}>Dark Mode</p>
            <p className={joinClasses('mt-1 text-sm', softerText)}>Supported</p>
          </div>
          <div>
            <p className={joinClasses('text-3xl font-medium tracking-tighter', isLight ? 'text-orange-600' : 'text-orange-400')}>Responsive</p>
            <p className={joinClasses('mt-1 text-sm', softerText)}>Design</p>
          </div>
        </div>
      </section>
    </div>
  );
}
