'use client'

import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-[#111318] font-sans transition-colors duration-300">
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Welcome to Profiles View</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        Explore and manage your profiles.
      </p>
    </div>
  );
}
