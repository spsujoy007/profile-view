export default function LoginPage() {
  const features = [
    {
      title: 'Personalized Profiles',
      description: 'Create a profile that represents your work and identity.',
      icon: (
        <path d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.5 9h-3.1a15.3 15.3 0 0 0-1.1-4.4A8 8 0 0 1 19.5 11ZM12 4c.7 0 1.7 1.7 2.3 5H9.7C10.3 5.7 11.3 4 12 4Zm-3.2 2.6A15.3 15.3 0 0 0 7.7 11H4.5a8 8 0 0 1 4.3-4.4ZM4.5 13h3.2a15.3 15.3 0 0 0 1.1 4.4A8 8 0 0 1 4.5 13Zm7.5 7c-.7 0-1.7-1.7-2.3-5h4.6c-.6 3.3-1.6 5-2.3 5Zm3.2-2.6c.5-1.3.9-2.8 1.1-4.4h3.2a8 8 0 0 1-4.3 4.4ZM15.2 11H8.8c.2-1.7.6-3.2 1.1-4.4h4.2c.5 1.2.9 2.7 1.1 4.4Zm-.1 2c-.2 1.7-.6 3.2-1.1 4.4H10c-.5-1.2-.9-2.7-1.1-4.4h6.2Z' />
      ),
    },
    {
      title: 'Highlight Your Work',
      description: 'Surface projects, achievements, and the impact behind them.',
      icon: <path d='M13 2 4 14h6l-1 8 9-12h-6l1-8Z' />,
    },
    {
      title: 'Connect & Collaborate',
      description: 'Build meaningful connections with developers and creators.',
      icon: (
        <path d='M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m18 0v-2a4 4 0 0 0-3-3.87m-4-8.13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm6 11.5a3.5 3.5 0 0 0-3.5-3.5h-1.5m0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
      ),
    },
  ]

  const socials = ['GitHub', 'Google', 'Vercel']

  return (
    <main className='relative min-h-screen overflow-hidden bg-[#050505] text-white'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_32%),radial-gradient(circle_at_20%_80%,_rgba(255,255,255,0.08),_transparent_24%),linear-gradient(180deg,_#090909_0%,_#040404_100%)]' />
      <div className='absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(255,255,255,0.9)_0.7px,transparent_0.7px)] [background-size:44px_44px] [mask-image:linear-gradient(180deg,white,transparent_88%)]' />

      <div className='relative mx-auto grid min-h-screen max-w-[1440px] gap-8 p-4 sm:p-6 lg:grid-cols-[1.08fr_0.92fr] lg:p-8'>
        <section className='relative overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(13,13,13,0.9),rgba(6,6,6,0.92))] px-6 py-8 shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:px-8 lg:px-10 lg:py-9'>
          <div className='absolute inset-x-[-12%] bottom-[-26%] h-[58%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.28),rgba(255,255,255,0.12)_18%,rgba(255,255,255,0.04)_34%,transparent_68%)] blur-2xl' />
          <div className='absolute left-[12%] top-[22%] h-[56%] w-[78%] rounded-full border border-white/10 opacity-60' />
          <div className='absolute left-[24%] top-[18%] h-[46%] w-[62%] rounded-full border border-white/10 opacity-35' />
          <div className='absolute left-[38%] top-[34%] h-[28%] w-[38%] rounded-full border border-white/10 opacity-25' />
          <div className='absolute bottom-[-18%] left-[-18%] h-[46vw] w-[46vw] max-h-[620px] max-w-[620px] rounded-full border border-white/20 bg-[radial-gradient(circle_at_36%_34%,rgba(255,255,255,0.45),rgba(255,255,255,0.12)_20%,rgba(255,255,255,0.05)_36%,rgba(255,255,255,0.01)_58%,transparent_68%)] shadow-[0_0_120px_rgba(255,255,255,0.08)]' />
          <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent' />

          <div className='relative flex h-full flex-col justify-between'>
            <div>
              <div className='flex items-center gap-3 text-[1.03rem] font-semibold tracking-[-0.03em] text-white/95'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/5 shadow-[0_0_18px_rgba(255,255,255,0.1)]'>
                  <svg viewBox='0 0 24 24' className='h-5 w-5 fill-none stroke-current stroke-[2.5]'>
                    <path d='m7 5 7 7-7 7' />
                    <path d='m13 5 7 7-7 7' />
                  </svg>
                </div>
                <span>profilesView</span>
              </div>

              <div className='mt-16 max-w-xl lg:mt-28'>
                <h1 className='max-w-lg text-5xl font-medium tracking-[-0.06em] text-white sm:text-6xl lg:text-[5rem] lg:leading-[0.95]'>
                  Your Profile.
                  <span className='block text-white/55'>Your Presence.</span>
                </h1>
                <p className='mt-7 max-w-md text-base leading-7 text-white/68 sm:text-lg'>
                  Showcase your work, skills, and experience to the world with a profile that feels polished, modern, and unmistakably yours.
                </p>

                <div className='mt-10 space-y-5'>
                  {features.map((feature) => (
                    <article key={feature.title} className='flex items-start gap-4'>
                      <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'>
                        <svg viewBox='0 0 24 24' className='h-6 w-6 fill-none stroke-current stroke-[1.8]'>
                          {feature.icon}
                        </svg>
                      </div>
                      <div>
                        <h2 className='text-base font-medium text-white/95'>{feature.title}</h2>
                        <p className='mt-1 max-w-sm text-sm leading-6 text-white/58 sm:text-[0.95rem]'>{feature.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className='relative mt-20 text-sm text-white/42'>
              <span>© 2024 profilesView. All rights reserved.</span>
            </div>
          </div>
        </section>

        <section className='relative flex items-center justify-center'>
          <div className='absolute inset-x-8 top-8 h-[75%] rounded-[30px] border border-white/6 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_42%)] blur-0' />

          <div className='relative w-full max-w-[530px] rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(22,22,22,0.92),rgba(10,10,10,0.96))] px-5 py-7 shadow-[0_24px_90px_rgba(0,0,0,0.62)] backdrop-blur-xl sm:px-8 sm:py-9'>
            <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/14 bg-white/6 text-white shadow-[0_0_34px_rgba(255,255,255,0.1)]'>
              <svg viewBox='0 0 24 24' className='h-8 w-8 fill-none stroke-current stroke-[2.7]'>
                <path d='m8 5 7 7-7 7' />
                <path d='m13 5 7 7-7 7' />
              </svg>
            </div>

            <div className='mt-6 text-center'>
              <h2 className='text-3xl font-medium tracking-[-0.05em] text-white'>Welcome back</h2>
              <p className='mt-2 text-sm text-white/58'>Login to continue to profilesView</p>
            </div>

            <form className='mt-8 space-y-5'>
              <label className='block'>
                <span className='mb-2 block text-sm font-medium text-white/82'>Email address</span>
                <div className='flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition focus-within:border-white/20 focus-within:bg-white/[0.05]'>
                  <svg viewBox='0 0 24 24' className='h-5 w-5 shrink-0 fill-none stroke-current stroke-[1.8]'>
                    <path d='M4 6h16v12H4z' />
                    <path d='m4 7 8 6 8-6' />
                  </svg>
                  <input
                    type='email'
                    placeholder='you@example.com'
                    className='h-full w-full bg-transparent text-[0.98rem] text-white outline-none placeholder:text-white/36'
                  />
                </div>
              </label>

              <label className='block'>
                <span className='mb-2 block text-sm font-medium text-white/82'>Password</span>
                <div className='flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition focus-within:border-white/20 focus-within:bg-white/[0.05]'>
                  <svg viewBox='0 0 24 24' className='h-5 w-5 shrink-0 fill-none stroke-current stroke-[1.8]'>
                    <path d='M7 11V8a5 5 0 0 1 10 0v3' />
                    <rect x='5' y='11' width='14' height='10' rx='2' />
                  </svg>
                  <input
                    type='password'
                    placeholder='Enter your password'
                    className='h-full w-full bg-transparent text-[0.98rem] text-white outline-none placeholder:text-white/36'
                  />
                  <button type='button' className='shrink-0 text-white/55 transition hover:text-white' aria-label='Show password'>
                    <svg viewBox='0 0 24 24' className='h-5 w-5 fill-none stroke-current stroke-[1.8]'>
                      <path d='M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z' />
                      <circle cx='12' cy='12' r='3' />
                    </svg>
                  </button>
                </div>
              </label>

              <div className='flex justify-end text-sm'>
                <a href='#' className='text-white/62 transition hover:text-white'>Forgot password?</a>
              </div>

              <button
                type='submit'
                className='group flex h-14 w-full items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#fbfbfb,#dbdbdb)] px-5 text-base font-medium text-black shadow-[0_16px_30px_rgba(255,255,255,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(255,255,255,0.12)]'
              >
                <span>Login</span>
                <svg viewBox='0 0 24 24' className='ml-3 h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5' fill='none' stroke='currentColor' strokeWidth='1.8'>
                  <path d='m5 12h14' />
                  <path d='m13 6 6 6-6 6' />
                </svg>
              </button>

              <div className='flex items-center gap-4 pt-2'>
                <span className='h-px flex-1 bg-white/10' />
                <span className='text-sm text-white/45'>or continue with</span>
                <span className='h-px flex-1 bg-white/10' />
              </div>

              <div className='grid gap-3 sm:grid-cols-3'>
                {socials.map((social) => (
                  <button
                    key={social}
                    type='button'
                    className='flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/[0.06]'
                  >
                    {social === 'GitHub' && (
                      <svg viewBox='0 0 24 24' className='h-4.5 w-4.5 fill-current'>
                        <path d='M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.5v-2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.6.6 1.9 1 .1-.8.4-1.5.8-1.8-2.7-.3-5.5-1.4-5.5-6.3 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.6.1-3.4 0 0 1.1-.4 3.6 1.3a12.2 12.2 0 0 1 6.6 0c2.5-1.7 3.6-1.3 3.6-1.3.7 1.8.2 3.1.1 3.4.8.9 1.3 2.1 1.3 3.5 0 4.9-2.8 6-5.5 6.3.4.4.9 1.1.9 2.2v3.2c0 .3.2.6.8.5A12 12 0 0 0 12 .5Z' />
                      </svg>
                    )}
                    {social === 'Google' && (
                      <svg viewBox='0 0 24 24' className='h-4.5 w-4.5 fill-current'>
                        <path d='M21.8 10.1H12v4.1h5.6c-.2 1.1-.8 2.1-1.7 2.8v2.3h2.8c1.7-1.5 2.7-3.7 2.7-6.4 0-.6 0-1.1-.1-1.8Z' />
                        <path d='M12 22c2.5 0 4.6-.8 6.2-2.2l-2.8-2.3c-.8.6-1.9 1-3.4 1-2.6 0-4.8-1.8-5.6-4.3H3.4v2.4A10 10 0 0 0 12 22Z' />
                        <path d='M6.4 13.2a6 6 0 0 1 0-3.9V6.9H3.4a10 10 0 0 0 0 9l3-2.7Z' />
                        <path d='M12 4.1c1.4 0 2.7.5 3.7 1.4l2.8-2.8A10 10 0 0 0 3.4 6.9l3 2.4C7.2 6 9.4 4.1 12 4.1Z' />
                      </svg>
                    )}
                    {social === 'Vercel' && (
                      <svg viewBox='0 0 24 24' className='h-4.5 w-4.5 fill-current'>
                        <path d='M12 4 2.6 20h18.8L12 4Z' />
                      </svg>
                    )}
                    <span>{social}</span>
                  </button>
                ))}
              </div>

              <p className='pt-3 text-center text-sm text-white/54'>
                Don&apos;t have an account?{' '}
                <a href='#' className='font-medium text-white transition hover:opacity-80'>
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}
