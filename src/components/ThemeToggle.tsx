import { Moon, Sun } from 'lucide-react'
import { useEffect } from 'react'
import { useThemeStore } from '../lib/theme.store'

export const ThemeToggle = () => {
  const { theme, toggleTheme, initializeTheme } = useThemeStore()
  const isDark = theme === 'dark'
  
  useEffect(() => {
    // Initialize theme on mount
    initializeTheme()
  }, [initializeTheme])
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-[rgba(110,68,255,0.1)] dark:hover:bg-[rgba(189,166,255,0.1)] transition-all duration-300"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-[#6E44FF] dark:text-[#BDA6FF]" />
      )}
    </button>
  )
}
