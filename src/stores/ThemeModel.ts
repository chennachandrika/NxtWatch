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
    this.applyTheme(this.theme)
    localStorage.setItem('theme', this.theme)
  }

  setTheme = (theme: Theme) => {
    this.theme = theme
    this.applyTheme(theme)
    localStorage.setItem('theme', theme)
  }

  private applyTheme = (theme: Theme) => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }
}

export default new ThemeStore()
