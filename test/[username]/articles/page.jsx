'use client';

import { useTheme } from '@/components/theme-provider';

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ArticlesPage() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  const articles = [
    {
      title: 'Designing profile systems that scale with identity',
      excerpt: 'Exploring how to build profile systems that grow with user needs and maintain clarity at scale.',
      date: '2025-01-15',
      readTime: '8 min read'
    },
    {
      title: 'How to keep dashboards readable without losing density',
      excerpt: 'Balancing information density with usability in data-heavy interfaces.',
      date: '2025-01-08',
      readTime: '6 min read'
    },
    {
      title: 'The art of micro-interactions in product design',
      excerpt: 'Why small details matter: using micro-interactions to improve user experience.',
      date: '2024-12-28',
      readTime: '7 min read'
    },
    {
      title: 'Building accessible components with React',
      excerpt: 'A practical guide to creating accessible React components that work for everyone.',
      date: '2024-12-15',
      readTime: '10 min read'
    },
  ];

  const surfaceCard = isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-white/10 bg-white/[0.03] text-white';
  const softerText = isLight ? 'text-slate-500' : 'text-white/46';
  const mutedText = isLight ? 'text-slate-600' : 'text-white/60';

  return (
    <div className='space-y-6 pb-10'>
      <section className={joinClasses('rounded-[28px] border p-5 sm:p-6', surfaceCard)}>
        <h1 className={joinClasses('text-3xl font-medium tracking-[-0.04em]', isLight ? 'text-slate-950' : 'text-white')}>
          Articles
        </h1>
        <p className={joinClasses('mt-3 text-base', mutedText)}>
          Thoughts and insights on design, development, and creating better digital experiences.
        </p>

        <div className='mt-8 space-y-4'>
          {articles.map((article) => (
            <article
              key={article.title}
              className={joinClasses(
                'rounded-[22px] border p-5 transition cursor-pointer group',
                isLight ? 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100' : 'border-white/10 bg-[#0b0e14] hover:border-white/18 hover:bg-white/[0.06]'
              )}
            >
              <h3 className={joinClasses('text-lg font-medium group-hover:underline', isLight ? 'text-slate-950' : 'text-white')}>
                {article.title}
              </h3>
              <p className={joinClasses('mt-2 text-sm leading-6', mutedText)}>
                {article.excerpt}
              </p>
              <div className={joinClasses('mt-4 flex gap-4 text-sm', softerText)}>
                <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
