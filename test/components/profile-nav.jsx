'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/theme-provider';

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

const navItems = [
  { label: 'Overview', href: '' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Skills', href: '/skills' },
  { label: 'Articles', href: '/articles' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Activity', href: '/activity' },
];

export default function ProfileNav({ username }) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  const isActive = (href) => {
    if (href === '') {
      return pathname === `/${username}`;
    }
    return pathname === `/${username}${href}`;
  };

  const navLink = isLight
    ? 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
    : 'border-white/10 text-white/72 hover:border-white/18 hover:bg-white/6';
  
  const activeLink = isLight
    ? 'border-slate-300 bg-slate-100 text-slate-950'
    : 'border-white/18 bg-white/8 text-white';

  return (
    <nav className='mb-6 flex flex-wrap gap-2'>
      {navItems.map((item) => {
        const href = `/${username}${item.href}`;
        const active = isActive(item.href);
        return (
          <Link
            key={item.label}
            href={href}
            className={joinClasses(
              'rounded-full border px-4 py-2 text-sm font-medium transition',
              active ? activeLink : navLink
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
