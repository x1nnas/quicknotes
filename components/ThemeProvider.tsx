'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark') // Default to dark
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Apply dark mode immediately on mount to prevent flash
    const root = window.document.documentElement
    root.classList.add('dark')
    
    // Get theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      setThemeState(savedTheme)
      if (savedTheme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
    
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

