import Link from 'next/link'

const features = [
  {
    title: 'Build Your Identity',
    description: 'Create a profile that represents you.',
    icon: (
      <>
        <circle cx='12' cy='8.2' r='3.1' />
        <path d='M5.2 19a6.8 6.8 0 0 1 13.6 0' />
      </>
    ),
  },
  {
    title: 'Showcase Your Work',
    description: 'Highlight projects, skills and achievements.',
    icon: (
      <>
        <path d='M4 14.5 19.2 4.8l-2.7 14.4-5-3.3-2.8 2.8.8-4.3Z' />
        <path d='m10.8 15.9 8.4-11.1' />
      </>
    ),
  },
  {
    title: 'Connect & Grow',
    description: 'Network with developers and creators.',
    icon: (
      <>
        <circle cx='8.2' cy='9' r='2.5' />
        <circle cx='15.8' cy='9' r='2.5' />
        <path d='M3.8 19a4.4 4.4 0 0 1 8.8 0' />
        <path d='M11.4 19a4.4 4.4 0 0 1 8.8 0' />
      </>
    ),
  },
]

export default function SignupPage() {
  return (
    <main className='relative h-screen overflow-hidden bg-[#040507] text-white'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(82,122,255,0.12),transparent_40%),radial-gradient(circle_at_85%_75%,rgba(255,255,255,0.06),transparent_35%),linear-gradient(180deg,#090b10_0%,#05060a_60%,#040507_100%)]' />
      <div className='absolute inset-0 opacity-45 [background-image:radial-gradient(rgba(255,255,255,0.75)_0.55px,transparent_0.55px)] [background-size:36px_36px] [mask-image:linear-gradient(180deg,white,transparent_92%)]' />

      <div className='relative mx-auto grid h-full max-w-[1600px] gap-6 p-3 sm:p-4 lg:grid-cols-[1.04fr_0.96fr] lg:p-5'>
        <section className='relative hidden overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,19,0.88),rgba(6,8,13,0.94))] px-7 py-7 shadow-[0_26px_90px_rgba(0,0,0,0.58)] lg:block lg:px-9'>
          <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent' />
          <div className='absolute inset-x-[-14%] bottom-[-16%] h-[56%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22),rgba(255,255,255,0.07)_24%,rgba(255,255,255,0.02)_44%,transparent_70%)] blur-2xl' />

          <div className='absolute -left-[8%] bottom-[-36%] h-[78%] w-[86%] rounded-full border border-white/20 bg-[radial-gradient(circle_at_42%_36%,rgba(255,255,255,0.55),rgba(255,255,255,0.14)_24%,rgba(37,58,115,0.3)_52%,rgba(5,8,15,0.96)_74%)] shadow-[0_0_60px_rgba(255,255,255,0.18)]' />
          <div className='absolute left-[20%] top-[17%] h-[58%] w-[58%] rounded-full border border-white/20 opacity-45' />
          <div className='absolute left-[26%] top-[22%] h-[52%] w-[62%] rounded-full border border-white/16 opacity-35' />
          <div className='absolute left-[40%] top-[29%] h-[45%] w-[50%] rounded-full border border-white/14 opacity-25' />

          <div className='relative flex h-full flex-col justify-between'>
            <div>
              <div className='flex items-center gap-3 text-[1.7rem] font-semibold tracking-[-0.03em] text-white/95'>
                <svg viewBox='0 0 24 24' className='h-7 w-7 fill-none stroke-current stroke-[2.7]'>
                  <path d='m7 5 7 7-7 7' />
                  <path d='m13 5 7 7-7 7' />
                </svg>
                <span>profilesView</span>
              </div>

              <div className='mt-20 max-w-xl'>
                <h1 className='text-5xl font-medium leading-[1.02] tracking-[-0.06em] text-white xl:text-6xl'>
                  Create Your Profile.
                  <span className='mt-2 block text-white/68'>Share Your World.</span>
                </h1>
                <p className='mt-7 max-w-md text-lg leading-9 text-white/72'>
                  Join profilesView and build your presence, showcase your work, and connect with amazing people.
                </p>

                <div className='mt-10 space-y-5'>
                  {features.map((feature) => (
                    <article key={feature.title} className='flex items-start gap-4'>
                      <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'>
                        <svg viewBox='0 0 24 24' className='h-5.5 w-5.5 fill-none stroke-current stroke-[1.8]'>
                          {feature.icon}
                        </svg>
                      </div>
                      <div>
                        <h2 className='text-[1.08rem] font-medium text-white/96'>{feature.title}</h2>
                        <p className='mt-1 text-[0.98rem] leading-relaxed text-white/58'>{feature.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='relative flex items-center justify-center'>
          <div className='absolute inset-x-4 top-5 h-[82%] rounded-[28px] border border-white/6 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_44%)] lg:inset-x-8 lg:top-8' />

          <div className='relative w-full max-w-[620px] rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(17,20,28,0.92),rgba(8,10,14,0.96))] px-5 py-6 shadow-[0_24px_90px_rgba(0,0,0,0.62)] backdrop-blur-xl sm:px-7 sm:py-7'>
            <div className='text-center'>
              <h2 className='text-[2rem] font-medium tracking-[-0.04em] text-white'>Create your account</h2>
              <p className='mt-2 text-base text-white/60'>Join profilesView and start your journey</p>
            </div>

            <form className='mt-7 space-y-4'>
              <div className='grid gap-4 sm:grid-cols-2'>
                <label className='block'>
                  <span className='mb-2 block text-sm font-medium text-white/82'>Full Name</span>
                  <div className='flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition focus-within:border-white/22 focus-within:bg-white/[0.06]'>
                    <svg viewBox='0 0 24 24' className='h-5 w-5 shrink-0 fill-none stroke-current stroke-[1.8]'>
                      <circle cx='12' cy='8' r='3' />
                      <path d='M5 19a7 7 0 0 1 14 0' />
                    </svg>
                    <input
                      type='text'
                      placeholder='John Doe'
                      className='h-full w-full bg-transparent text-[0.98rem] text-white outline-none placeholder:text-white/36'
                    />
                  </div>
                </label>

                <label className='block'>
                  <span className='mb-2 block text-sm font-medium text-white/82'>Username</span>
                  <div className='flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition focus-within:border-white/22 focus-within:bg-white/[0.06]'>
                    <svg viewBox='0 0 24 24' className='h-5 w-5 shrink-0 fill-none stroke-current stroke-[1.8]'>
                      <circle cx='12' cy='12' r='9' />
                      <path d='M8.2 12a3.8 3.8 0 1 1 7.6 0 3.8 3.8 0 0 1-7.6 0Z' />
                    </svg>
                    <input
                      type='text'
                      placeholder='johndoe'
                      className='h-full w-full bg-transparent text-[0.98rem] text-white outline-none placeholder:text-white/36'
                    />
                  </div>
                </label>
              </div>

              <label className='block'>
                <span className='mb-2 block text-sm font-medium text-white/82'>Email address</span>
                <div className='flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition focus-within:border-white/22 focus-within:bg-white/[0.06]'>
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
                <div className='flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition focus-within:border-white/22 focus-within:bg-white/[0.06]'>
                  <svg viewBox='0 0 24 24' className='h-5 w-5 shrink-0 fill-none stroke-current stroke-[1.8]'>
                    <path d='M7 11V8a5 5 0 0 1 10 0v3' />
                    <rect x='5' y='11' width='14' height='10' rx='2' />
                  </svg>
                  <input
                    type='password'
                    placeholder='Create a strong password'
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

              <label className='block'>
                <span className='mb-2 block text-sm font-medium text-white/82'>Confirm Password</span>
                <div className='flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition focus-within:border-white/22 focus-within:bg-white/[0.06]'>
                  <svg viewBox='0 0 24 24' className='h-5 w-5 shrink-0 fill-none stroke-current stroke-[1.8]'>
                    <path d='M7 11V8a5 5 0 0 1 10 0v3' />
                    <rect x='5' y='11' width='14' height='10' rx='2' />
                  </svg>
                  <input
                    type='password'
                    placeholder='Confirm your password'
                    className='h-full w-full bg-transparent text-[0.98rem] text-white outline-none placeholder:text-white/36'
                  />
                  <button type='button' className='shrink-0 text-white/55 transition hover:text-white' aria-label='Show confirm password'>
                    <svg viewBox='0 0 24 24' className='h-5 w-5 fill-none stroke-current stroke-[1.8]'>
                      <path d='M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z' />
                      <circle cx='12' cy='12' r='3' />
                    </svg>
                  </button>
                </div>
              </label>

              <label className='flex items-start gap-3 pt-1 text-sm text-white/72'>
                <input type='checkbox' className='mt-[2px] h-5 w-5 rounded border border-white/20 bg-transparent accent-white' />
                <span>
                  I agree to the{' '}
                  <Link href='#' className='font-medium text-white/94'>
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href='#' className='font-medium text-white/94'>
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <button
                type='submit'
                className='group flex h-12 w-full items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#fbfbfb,#dfdfdf)] px-5 text-base font-medium text-black shadow-[0_16px_30px_rgba(255,255,255,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(255,255,255,0.12)]'
              >
                <span>Create account</span>
                <svg viewBox='0 0 24 24' className='ml-3 h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5' fill='none' stroke='currentColor' strokeWidth='1.8'>
                  <path d='m5 12h14' />
                  <path d='m13 6 6 6-6 6' />
                </svg>
              </button>

              <div className='flex items-center gap-4 pt-1'>
                <span className='h-px flex-1 bg-white/10' />
                <span className='text-sm text-white/45'>or continue with</span>
                <span className='h-px flex-1 bg-white/10' />
              </div>

              <div className='grid gap-3 sm:grid-cols-2'>
                <button
                  type='button'
                  className='flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-medium text-white/88 transition hover:border-white/22 hover:bg-white/[0.06]'
                >
                  <svg viewBox='0 0 24 24' className='h-4.5 w-4.5 fill-current'>
                    <path d='M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.5v-2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.6.6 1.9 1 .1-.8.4-1.5.8-1.8-2.7-.3-5.5-1.4-5.5-6.3 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.6.1-3.4 0 0 1.1-.4 3.6 1.3a12.2 12.2 0 0 1 6.6 0c2.5-1.7 3.6-1.3 3.6-1.3.7 1.8.2 3.1.1 3.4.8.9 1.3 2.1 1.3 3.5 0 4.9-2.8 6-5.5 6.3.4.4.9 1.1.9 2.2v3.2c0 .3.2.6.8.5A12 12 0 0 0 12 .5Z' />
                  </svg>
                  <span>Continue with GitHub</span>
                </button>

                <button
                  type='button'
                  className='flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-medium text-white/88 transition hover:border-white/22 hover:bg-white/[0.06]'
                >
                  <svg viewBox='0 0 24 24' className='h-4.5 w-4.5 fill-current'>
                    <path d='M21.8 10.1H12v4.1h5.6c-.2 1.1-.8 2.1-1.7 2.8v2.3h2.8c1.7-1.5 2.7-3.7 2.7-6.4 0-.6 0-1.1-.1-1.8Z' />
                    <path d='M12 22c2.5 0 4.6-.8 6.2-2.2l-2.8-2.3c-.8.6-1.9 1-3.4 1-2.6 0-4.8-1.8-5.6-4.3H3.4v2.4A10 10 0 0 0 12 22Z' />
                    <path d='M6.4 13.2a6 6 0 0 1 0-3.9V6.9H3.4a10 10 0 0 0 0 9l3-2.7Z' />
                    <path d='M12 4.1c1.4 0 2.7.5 3.7 1.4l2.8-2.8A10 10 0 0 0 3.4 6.9l3 2.4C7.2 6 9.4 4.1 12 4.1Z' />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>

              <p className='pt-1 text-center text-sm text-white/56'>
                Already have an account?{' '}
                <Link href='/login' className='font-semibold text-white hover:opacity-85'>
                  Login
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}
