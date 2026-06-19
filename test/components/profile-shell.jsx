'use client';

import { useState } from 'react';
import { useTheme } from '@/components/theme-provider';

const navItems = [
  { label: 'Overview', href: '/overview', icon: 'home' },
  { label: 'Projects', href: '/projects', icon: 'projects' },
  { label: 'Experience', href: '/experience', icon: 'experience' },
  { label: 'Skills', href: '/skills', icon: 'skills' },
  { label: 'Articles', href: '/articles', icon: 'articles' },
  { label: 'Achievements', href: '/achievements', icon: 'achievements' },
  { label: 'Activity', href: '/activity', icon: 'activity' },
];

const themeStops = [
  { label: 'Dark', icon: 'moon' },
  { label: 'System', icon: 'system' },
  { label: 'Light', icon: 'sun' },
];

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

function BrandMark() {
  return (
    <div className='flex items-center gap-3 text-lg font-semibold tracking-[-0.03em] text-white/96'>
      <div className='flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 shadow-[0_0_20px_rgba(255,255,255,0.08)]'>
        <svg viewBox='0 0 24 24' className='h-5.5 w-5.5 fill-none stroke-current stroke-[2.6]'>
          <path d='m7 5 7 7-7 7' />
          <path d='m13 5 7 7-7 7' />
        </svg>
      </div>
      <span>profilesView</span>
    </div>
  );
}

function Icon({ name, className = '' }) {
  const common = 'fill-none stroke-current stroke-[1.85]';

  switch (name) {
    case 'home':
      return (
        <svg viewBox='0 0 24 24' className={className}>
          <path className={common} d='M3.5 11.5 12 4l8.5 7.5' />
          <path className={common} d='M6.5 10.5V20h11v-9.5' />
          <path className={common} d='M10 20v-6h4v6' />
        </svg>
      );
    case 'projects':
      return (
        <svg viewBox='0 0 24 24' className={className}>
          <path className={common} d='M4.5 7.5h15v10h-15z' />
          <path className={common} d='M8 7.5V5.2h8V7.5' />
          <path className={common} d='M4.5 11.2h15' />
        </svg>
      );
    case 'experience':
      return (
        <svg viewBox='0 0 24 24' className={className}>
          <path className={common} d='M5 7.5h14v11H5z' />
          <path className={common} d='M9 7.5V5.5h6v2' />
          <path className={common} d='M5 12h14' />
          <path className={common} d='M10 12v2.2h4V12' />
        </svg>
      );
    case 'skills':
      return (
        <svg viewBox='0 0 24 24' className={className}>
          <path className={common} d='M8 12a4 4 0 1 1 8 0' />
          <path className={common} d='M6 19.5a6.5 6.5 0 0 1 12 0' />
          <path className={common} d='M12 3.5v2.2' />
          <path className={common} d='M5.2 6.2 6.9 7.9' />
          <path className={common} d='M18.8 6.2 17.1 7.9' />
        </svg>
      );
    case 'articles':
      return (
        <svg viewBox='0 0 24 24' className={className}>
          <path className={common} d='M6 4.5h10l2.5 2.5v12.5H6z' />
          <path className={common} d='M16 4.5V7h2.5' />
          <path className={common} d='M8.2 11h7.6' />
          <path className={common} d='M8.2 14h5.8' />
        </svg>
      );
    case 'achievements':
      return (
        <svg viewBox='0 0 24 24' className={className}>
          <path className={common} d='M8 4.8h8v4.2a4 4 0 0 1-8 0z' />
          <path className={common} d='M9.2 18.5h5.6' />
          <path className={common} d='M12 14v4.5' />
          <path className={common} d='M7.2 8.5H5.7a2 2 0 0 0 2 2' />
          <path className={common} d='M16.8 8.5h1.5a2 2 0 0 1-2 2' />
        </svg>
      );
    case 'activity':
      return (
        <svg viewBox='0 0 24 24' className={className}>
          <path className={common} d='M4 12h4l2-5 4 10 2-5h4' />
          <path className={common} d='M5 20.5h14' />
        </svg>
      );
    case 'edit':
      return (
        <svg viewBox='0 0 24 24' className={className}>
          <path className={common} d='M4.5 19.5 8 18.8l9.8-9.8a1.6 1.6 0 0 0 0-2.3l-1-1a1.6 1.6 0 0 0-2.3 0L4.8 15.7z' />
          <path className={common} d='M13.2 6.7 17 10.5' />
        </svg>
      );
    case 'moon':
      return (
        <svg viewBox='0 0 24 24' className={className}>
          <path className={common} d='M14.8 4.8A7.7 7.7 0 1 0 19.2 17a8.7 8.7 0 0 1-4.4-12.2Z' />
        </svg>
      );
    case 'system':
      return (
        <svg viewBox='0 0 24 24' className={className}>
          <rect x='4.5' y='5' width='15' height='10' rx='2' className={common} />
          <path className={common} d='M9 19h6' />
          <path className={common} d='M12 15v4' />
        </svg>
      );
    case 'sun':
      return (
        <svg viewBox='0 0 24 24' className={className}>
          <circle cx='12' cy='12' r='4' className={common} />
          <path className={common} d='M12 3.8v2.2' />
          <path className={common} d='M12 18v2.2' />
          <path className={common} d='M5.7 5.7 7.3 7.3' />
          <path className={common} d='M16.7 16.7 18.3 18.3' />
          <path className={common} d='M3.8 12h2.2' />
          <path className={common} d='M18 12h2.2' />
          <path className={common} d='M5.7 18.3 7.3 16.7' />
          <path className={common} d='M16.7 7.3 18.3 5.7' />
        </svg>
      );
    case 'menu':
      return (
        <svg viewBox='0 0 24 24' className={className}>
          <path className={common} d='M4 7.5h16' />
          <path className={common} d='M4 12h16' />
          <path className={common} d='M4 16.5h16' />
        </svg>
      );
    default:
      return null;
  }
}

function SidebarContent({ onNavigate, compact = false }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  const shellClasses = isLight
    ? 'border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(237,242,248,0.96))] text-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.12)]'
    : 'border-white/10 bg-[linear-gradient(180deg,rgba(10,13,19,0.94),rgba(5,7,11,0.98))] text-white shadow-[0_30px_90px_rgba(0,0,0,0.42)]';
  const itemBase = isLight
    ? 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-950'
    : 'border-transparent text-white/66 hover:border-white/10 hover:bg-white/4 hover:text-white';
  const itemActive = isLight
    ? 'border-slate-200 bg-white text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'
    : 'border-white/18 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]';
  const panelSurface = isLight
    ? 'border-slate-200 bg-white text-slate-900'
    : 'border-white/10 bg-white/3 text-white';
  const textMuted = isLight ? 'text-slate-500' : 'text-white/38';
  const themeButtonBase = isLight
    ? 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    : 'text-white/52 hover:bg-white/6 hover:text-white/82';
  const themeButtonActive = isLight ? 'bg-slate-200 text-slate-950' : 'bg-white/12 text-white';

  return (
    <div className={joinClasses('flex h-full flex-col justify-between rounded-[34px] border p-5 backdrop-blur-xl', shellClasses)}>
      <div>
        <BrandMark />

        <nav className='mt-8 space-y-2'>
          {navItems.map((item, index) => {
            const active = index === 0;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                className={joinClasses('flex items-center gap-3 rounded-[18px] border px-4 py-3 text-[0.95rem] transition duration-200', active ? itemActive : itemBase)}
              >
                <Icon name={item.icon} className='h-5 w-5 shrink-0' />
                <span className='font-medium'>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      <div className='mt-6 space-y-4'>
        <a
          href='#edit-profile'
          onClick={onNavigate}
          className={joinClasses('flex items-center justify-between rounded-[18px] border px-4 py-4 transition', panelSurface, isLight ? 'hover:border-slate-300 hover:bg-slate-50' : 'hover:border-white/18 hover:bg-white/6')}
        >
          <span className='flex items-center gap-3'>
            <Icon name='edit' className='h-5 w-5' />
            <span className='font-medium'>Edit Profile</span>
          </span>
          <span className={joinClasses('text-lg', textMuted)}>{compact ? '›' : '→'}</span>
        </a>

        <div className={joinClasses('rounded-3xl border p-2', isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-white/3')}>
          <div className='grid grid-cols-3 gap-1'>
            {themeStops.map((item) => {
              const active = (item.label === 'Dark' && theme === 'dark') || (item.label === 'Light' && theme === 'light') || (item.label === 'System' && theme === 'system');

              return (
                <button
                  key={item.label}
                  type='button'
                  onClick={() => setTheme(item.label.toLowerCase())}
                  className={joinClasses('flex items-center justify-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium transition', active ? themeButtonActive : themeButtonBase)}
                >
                  <Icon name={item.icon} className='h-4 w-4' />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className={joinClasses('px-1 text-sm', textMuted)}>© 2024 profilesView</p>
      </div>
    </div>
  );
}

export default function ProfileShell({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  const shellClasses = isLight
    ? 'bg-[radial-gradient(circle_at_18%_15%,rgba(96,126,255,0.10),transparent_35%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.45),transparent_28%),linear-gradient(180deg,#eef2f7_0%,#edf1f7_55%,#e6ebf2_100%)] text-slate-900'
    : 'bg-[#040507] text-white';

  return (
    <div className={joinClasses('relative min-h-screen overflow-hidden transition-colors duration-200', shellClasses)}>
      <div className={joinClasses('absolute inset-0', isLight ? 'opacity-25 bg-[radial-gradient(circle_at_18%_15%,rgba(96,126,255,0.10),transparent_35%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.45),transparent_28%)]' : 'bg-[radial-gradient(circle_at_18%_15%,rgba(96,126,255,0.13),transparent_35%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.07),transparent_28%),linear-gradient(180deg,#0a0d13_0%,#05070b_55%,#040507_100%)]')} />
      <div className={joinClasses('absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.7)_0.55px,transparent_0.55px)] bg-size-[36px_36px] mask-[linear-gradient(180deg,white,transparent_92%)]', isLight ? 'opacity-15' : 'opacity-35')} />

      <div className='relative mx-auto min-h-screen max-w-screen-2xl p-3 sm:p-4 lg:p-5'>
        <aside className='fixed left-3 top-3 z-40 hidden h-[calc(100vh-1.5rem)] w-80 lg:block sm:left-4 sm:top-4 sm:h-[calc(100vh-2rem)] lg:left-5 lg:top-5 lg:h-[calc(100vh-2.5rem)]'>
          <SidebarContent />
        </aside>

        <div
          className={`fixed inset-0 z-50 lg:hidden ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-hidden={!mobileMenuOpen}
        >
          <button
            type='button'
            aria-label='Close navigation'
            className={`absolute inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className={`relative h-full w-[min(88vw,20rem)] transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className='h-full p-3 pr-0'>
              <SidebarContent onNavigate={() => setMobileMenuOpen(false)} compact />
            </div>
          </aside>
        </div>

        <div className='flex min-h-screen min-w-0 flex-1 flex-col'>
          <header className={joinClasses('sticky top-0 z-30 border-b backdrop-blur-xl lg:hidden', isLight ? 'border-slate-200 bg-[rgba(238,242,247,0.82)]' : 'border-white/8 bg-[rgba(4,5,7,0.82)]')}>
            <div className='flex h-16 items-center justify-between gap-3 px-4 sm:px-5'>
              <button
                type='button'
                onClick={() => setMobileMenuOpen(true)}
                className={joinClasses('inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition', isLight ? 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50' : 'border-white/10 bg-white/4 text-white/86 hover:border-white/18 hover:bg-white/8')}
                aria-label='Open navigation'
                aria-expanded={mobileMenuOpen}
              >
                <Icon name='menu' className='h-5 w-5' />
              </button>

              <BrandMark />

              <div className='h-11 w-11' />
            </div>
          </header>

          <main className='flex-1 px-2 py-4 sm:px-3 sm:py-5 lg:pl-84 lg:px-0 lg:py-0'>
            <div className='mx-auto w-full max-w-6xl'>{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
