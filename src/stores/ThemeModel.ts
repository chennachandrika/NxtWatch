import { makeAutoObservable } from 'mobx'

type Theme = 'light' | 'dark'

class ThemeStore {
  theme: Theme = 'light'

  constructor() {
    makeAutoObservable(this)

    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.theme = savedTheme
    }
    this.applyTheme(this.theme)
  }

  toggleTheme = () => {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', this.theme)
    this.applyTheme(this.theme)
  }

  setTheme = (theme: Theme) => {
    this.theme = theme
    this.applyTheme(theme)
    localStorage.setItem('theme', theme)
  }

  private applyTheme = (theme: Theme) => {
    const html = document.documentElement
    if (theme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    // Force a reflow to ensure the change is applied
    void html.offsetHeight
  }
}

export default new ThemeStore()
