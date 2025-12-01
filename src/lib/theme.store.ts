import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  initializeTheme: () => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'light',

  setTheme: (theme) => {
    set({ theme })

    // Spremi u localStorage (bez diranja <html> ili documentElement)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', theme)
    }
  },

  toggleTheme: () => {
    const current = get().theme
    const next: Theme = current === 'light' ? 'dark' : 'light'
    get().setTheme(next)
  },

  initializeTheme: () => {
    if (typeof window === 'undefined') return

    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      get().setTheme(stored as Theme)
    } else {
      get().setTheme('light')
    }
  },
}))
