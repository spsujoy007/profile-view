'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { PiMonitorBold, PiSunBold, PiMoonBold } from 'react-icons/pi'

const themes = [
  { key: 'system', icon: PiMonitorBold, label: 'System' },
  { key: 'light', icon: PiSunBold, label: 'Light' },
  { key: 'dark', icon: PiMoonBold, label: 'Dark' },
]

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex justify-between items-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full py-2 px-2 mx-10 shadow-sm">
      {themes.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          title={label}
          className={`p-2 rounded-full transition-all duration-200 cursor-pointer ${
            theme === key
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  )
}
