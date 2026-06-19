'use client';

import { useTheme } from '@/components/theme-provider';
import { useEffect, useRef, useState } from 'react';

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ExperiencePage() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';
  const designSteps = [
    {
      step: 1,
      title: 'Define Requirements',
      summary: 'Gather functional and non-functional requirements, SLAs, and success metrics.',
      details: ['Identify users and personas', 'List must-have features', 'Define performance & availability targets']
    },
    {
      step: 2,
      title: 'High-level Architecture',
      summary: 'Sketch major system components and interactions.',
      details: ['Client (web/mobile)', 'API gateway / backend services', 'Datastore(s) and cache', 'External integrations']
    },
    {
      step: 3,
      title: 'Component Breakdown',
      summary: 'Design individual services, their responsibilities and APIs.',
      details: ['Service boundaries', 'Data models', 'Public/internal endpoints', 'Error handling strategy']
    },
    {
      step: 4,
      title: 'Data Flow & Storage',
      summary: 'Map how data moves through the system and where it is stored.',
      details: ['Read/write paths', 'Normalization vs denormalization', 'Indexing and query patterns', 'Backup & retention']
    },
    {
      step: 5,
      title: 'Scalability & Reliability',
      summary: 'Plan for growth and failure modes.',
      details: ['Autoscaling and load balancing', 'Circuit breakers & retries', 'Monitoring and alerting', 'Capacity planning']
    },
    {
      step: 6,
      title: 'Security & Compliance',
      summary: 'Address authentication, authorization, and data protection.',
      details: ['Auth model (OAuth/JWT)', 'Encryption in transit & at rest', 'Audit logging', 'Privacy regulations']
    },
    {
      step: 7,
      title: 'Deployment & Operations',
      summary: 'Define CI/CD, rollout, and operational runbooks.',
      details: ['CI pipelines', 'Blue/green or canary releases', 'Rollback procedures', 'Runbooks and incident response']
    },
  ];

  const containerRef = useRef(null);
  const nodeRefs = useRef([]);
  const [inView, setInView] = useState({});
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    nodeRefs.current = nodeRefs.current.slice(0, designSteps.length);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = entry.target.getAttribute('data-step');
          if (entry.isIntersecting) {
            setInView((s) => ({ ...s, [idx]: true }));
          }
        });
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
    );

    nodeRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [designSteps.length]);

  // Smooth scroll-driven trunk / branch growth (lightweight)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handle = () => {
      const rect = el.getBoundingClientRect();
      const height = rect.height || 1;
      const visible = Math.min(Math.max(window.innerHeight - rect.top, 0), window.innerHeight + height);
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + height), 0), 1);
      el.style.setProperty('--tree-progress', String(progress));
    };
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, []);

  const surfaceCard = isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-white/10 bg-white/[0.03] text-white';
  const softerText = isLight ? 'text-slate-500' : 'text-white/60';
  const mutedText = isLight ? 'text-slate-600' : 'text-white/60';

  return (
    <div className='space-y-6 pb-10'>
      <section className={joinClasses('rounded-[28px] border p-5 sm:p-6', surfaceCard)}>
        <h1 className={joinClasses('text-3xl font-medium tracking-[-0.04em]', isLight ? 'text-slate-950' : 'text-white')}>
          Experience
        </h1>
        <p className={joinClasses('mt-3 text-base', mutedText)}>
          My professional journey across different companies and roles, building expertise in frontend development and design.
        </p>

        <div
          ref={containerRef}
          className='relative mt-8 py-8 overflow-hidden'
          aria-label='Career Tree'
        >
          {/* decorative particles / stars */}
          <div aria-hidden className='pointer-events-none absolute inset-0 -z-10'>
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 73) % 100}%`,
                  animationDelay: `${(i % 5) * 0.6}s`
                }}
                className='absolute w-[4px] h-[4px] rounded-full bg-white/10 dark:bg-white/8 opacity-70 animate-pulse'
              />
            ))}
          </div>

          {/* trunk */}
          <div
            className='absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-1.5 rounded-full'
            style={{
              background: isLight
                ? 'linear-gradient(180deg,#8b5cf6,#06b6d4)'
                : 'linear-gradient(180deg,rgba(99,102,241,0.9),rgba(6,182,212,0.9))',
              boxShadow: isLight ? '0 6px 24px rgba(99,102,241,0.12)' : '0 8px 40px rgba(6,182,212,0.12)'
            }}
            aria-hidden
          />

          <div className='relative z-10 max-w-6xl mx-auto px-4'>
            <div style={{ gridTemplateColumns: '1fr 64px 1fr' }} className='grid gap-y-8'>
              { // render latest/current first (root crown)
                [...designSteps].slice().reverse().map((s, i) => {
                  const isRoot = i === 0;
                  const side = isRoot ? 'center' : i % 2 === 1 ? 'left' : 'right';
                  const stepKey = String(s.step);
                  if (isRoot) {
                    return (
                      <div key={stepKey} style={{ gridTemplateColumns: '1fr 64px 1fr' }} className='grid items-center'>
                        <div className='col-span-3 flex justify-center'>
                          <article
                            ref={(el) => (nodeRefs.current[i] = el)}
                            data-step={stepKey}
                            onMouseEnter={() => setHovered(stepKey)}
                            onMouseLeave={() => setHovered(null)}
                            onMouseEnter={() => setHovered(stepKey)}
                            onMouseLeave={() => setHovered(null)}
                            className={joinClasses(
                              'group max-w-2xl w-full transition-transform transition-opacity duration-700 transform will-change-transform',
                              inView[stepKey] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
                              isLight ? 'backdrop-blur-md border border-slate-200 bg-gradient-to-r from-white/40 to-white/20 text-slate-900' : 'backdrop-blur-md border border-white/10 bg-gradient-to-r from-white/6 to-white/4 text-white',
                              'hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl rounded-2xl'
                            )}
                            style={{ WebkitBackdropFilter: 'blur(8px)' }}
                            aria-labelledby={`title-${stepKey}`}
                          >
                            <div className='flex items-center gap-6 p-6'>
                              <div className='flex-shrink-0'>
                                <div className='rounded-full w-20 h-20 grid place-items-center bg-gradient-to-tr from-amber-400 to-pink-500 ring-2 ring-white/10 shadow-lg'>
                                  <span className='font-bold text-lg'>★</span>
                                </div>
                              </div>
                              <div>
                                <h2 id={`title-${stepKey}`} className='text-2xl font-bold'>
                                  {s.title} — Current
                                </h2>
                                <p className={joinClasses('mt-2 text-sm', mutedText)}>{s.summary}</p>
                                <div className='mt-4 flex flex-wrap gap-2'>
                                  {s.details.map((d, idx) => (
                                    <span key={idx} className='text-xs px-3 py-1 rounded-full bg-white/8 transition-transform duration-300 group-hover:-translate-y-1'>
                                      {d}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </article>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={stepKey} className='grid items-center' style={{ gridTemplateColumns: '1fr 64px 1fr' }}>
                      {/* left column */}
                      <div className='flex justify-end pr-6'>
                        {side === 'left' && (
                          <article
                            ref={(el) => (nodeRefs.current[i] = el)}
                            data-step={stepKey}
                            onMouseEnter={() => setHovered(stepKey)}
                            onMouseLeave={() => setHovered(null)}
                            className={joinClasses(
                              'group max-w-md w-full transition-transform transition-opacity duration-700 transform origin-left will-change-transform',
                              inView[stepKey] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6',
                              isLight ? 'backdrop-blur-sm border border-slate-200 bg-gradient-to-br from-white/60 to-white/30 text-slate-900' : 'backdrop-blur-sm border border-white/10 bg-gradient-to-br from-white/6 to-white/3 text-white',
                              'hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl'
                            )}
                            style={{
                              WebkitBackdropFilter: 'blur(6px)'
                            }}
                            aria-labelledby={`title-${stepKey}`}
                          >
                            <div className='flex items-start gap-4 p-4'>
                              <div className='flex-shrink-0'>
                                <div className='rounded-full w-14 h-14 grid place-items-center bg-gradient-to-tr from-indigo-500 to-cyan-400 ring-1 ring-white/10'>
                                  <span className='font-semibold text-sm'>{s.title.split(' ').map(t=>t[0]).slice(0,2).join('')}</span>
                                </div>
                              </div>
                              <div>
                                <h4 id={`title-${stepKey}`} className='text-lg font-semibold'>
                                  {s.title}
                                </h4>
                                <p className={joinClasses('mt-1 text-sm', mutedText)}>{s.summary}</p>
                                <div className='mt-3 flex flex-wrap gap-2'>
                                  {s.details.map((d, idx) => (
                                    <span key={idx} className='text-xs px-2 py-1 rounded-full bg-white/6 transition-transform duration-300 group-hover:-translate-y-1'>{d}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </article>
                        )}
                      </div>

                      {/* center column: branch + dot + year */}
                      <div className='relative flex items-center justify-center'>
                        {/* branch SVG draws from trunk to node */}
                        <svg width='64' height='56' viewBox='0 0 64 56' fill='none' xmlns='http://www.w3.org/2000/svg' className='overflow-visible'>
                          <path
                            d={side === 'left' ? 'M32 4 C20 12, 12 20, 0 28' : side === 'right' ? 'M32 4 C44 12, 52 20, 64 28' : 'M32 0 L32 36'}
                            stroke={hovered === stepKey ? (isLight ? '#f97316' : '#f59e0b') : (isLight ? '#7c3aed' : '#60a5fa')}
                            strokeWidth='2.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            style={{
                              strokeDasharray: 200,
                              strokeDashoffset: inView[stepKey] ? 0 : 200,
                              transition: 'stroke-dashoffset 900ms cubic-bezier(.2,.9,.2,1), stroke 300ms ease'
                            }}
                          />
                        </svg>

                        {/* year label */}
                        <div className={joinClasses('absolute -left-10 text-xs', mutedText)} style={{ top: isRoot ? -6 : 8 }}>
                          {`Y${s.step + 2019}`}
                        </div>

                        {/* dot on trunk */}
                        <div
                          className={joinClasses(
                            'w-3 h-3 rounded-full',
                            isRoot ? 'bg-amber-400 shadow-[0_0_12px_rgba(250,204,21,0.24)]' : 'bg-white/60'
                          )}
                          aria-hidden
                        />
                      </div>

                      {/* right column */}
                      <div className='flex items-start pl-6'>
                        {side === 'right' && (
                          <article
                            ref={(el) => (nodeRefs.current[i] = el)}
                            data-step={stepKey}
                            className={joinClasses(
                              'group max-w-md w-full transition-transform transition-opacity duration-700 transform origin-right will-change-transform',
                              inView[stepKey] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6',
                              isLight ? 'backdrop-blur-sm border border-slate-200 bg-gradient-to-br from-white/60 to-white/30 text-slate-900' : 'backdrop-blur-sm border border-white/10 bg-gradient-to-br from-white/6 to-white/3 text-white',
                              'hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl'
                            )}
                            style={{ WebkitBackdropFilter: 'blur(6px)' }}
                            aria-labelledby={`title-${stepKey}`}
                          >
                            <div className='flex items-start gap-4 p-4'>
                              <div className='flex-shrink-0'>
                                <div className='rounded-full w-14 h-14 grid place-items-center bg-gradient-to-tr from-indigo-500 to-cyan-400 ring-1 ring-white/10'>
                                  <span className='font-semibold text-sm'>{s.title.split(' ').map(t=>t[0]).slice(0,2).join('')}</span>
                                </div>
                              </div>
                              <div>
                                <h4 id={`title-${stepKey}`} className='text-lg font-semibold'>
                                  {s.title}
                                </h4>
                                <p className={joinClasses('mt-1 text-sm', mutedText)}>{s.summary}</p>
                                <div className='mt-3 flex flex-wrap gap-2'>
                                  {s.details.map((d, idx) => (
                                    <span key={idx} className='text-xs px-2 py-1 rounded-full bg-white/6 transition-transform duration-300 group-hover:-translate-y-1'>{d}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </article>
                        )}
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
