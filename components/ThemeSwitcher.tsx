'use client'

import { useEffect, useState } from 'react'
import styles from './ThemeSwitcher.module.css'
import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa'

type Theme = 'light' | 'dark' | 'system'

export default function ThemeSwitcher() {
  // Initialize with 'system' but will update after checking localStorage
  const [theme, setTheme] = useState<Theme>('system')

  // On component mount, read theme from localStorage and set up listeners
  useEffect(() => {
    // Read from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    }

    // Set up media query listener for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  // Apply the selected theme to the document
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement

    if (newTheme === 'system') {
      root.removeAttribute('data-theme')
      localStorage.setItem('theme', 'system')
    } else {
      root.setAttribute('data-theme', newTheme)
      localStorage.setItem('theme', newTheme)
    }
  }

  // Update theme state and apply it
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  return (
    <div className={styles.themeSwitcher}>
      <span className={styles.label}>Theme:</span>
      <div className={styles.buttons}>
        <button
          className={`${styles.themeButton} ${
            theme === 'light' ? styles.active : ''
          }`}
          onClick={() => handleThemeChange('light')}
          aria-label='Light theme'
          title='Light theme'
        >
          <FaSun size={10} />
        </button>
        <button
          className={`${styles.themeButton} ${
            theme === 'dark' ? styles.active : ''
          }`}
          onClick={() => handleThemeChange('dark')}
          aria-label='Dark theme'
          title='Dark theme'
        >
          <FaMoon size={10} />
        </button>
        <button
          className={`${styles.themeButton} ${
            theme === 'system' ? styles.active : ''
          }`}
          onClick={() => handleThemeChange('system')}
          aria-label='System theme'
          title='Use system preference'
        >
          <FaDesktop size={10} />
        </button>
      </div>
    </div>
  )
}
