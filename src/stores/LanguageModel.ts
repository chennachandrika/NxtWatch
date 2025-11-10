import { makeAutoObservable } from 'mobx'
import i18n from '../i18n/config'

export type Language = 'en' | 'es' | 'fr' | 'hi'

class LanguageModel {
  language: Language = 'en'

  constructor() {
    makeAutoObservable(this)
    
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && ['en', 'es', 'fr', 'hi'].includes(savedLanguage)) {
      this.language = savedLanguage
      this.changeLanguage(savedLanguage)
    } else {
      // Initialize with default language
      this.changeLanguage('en')
    }
  }

  changeLanguage = (lang: Language) => {
    this.language = lang
    localStorage.setItem('language', lang)
    i18n.changeLanguage(lang)
    
    // Update HTML lang attribute
    document.documentElement.lang = lang
  }

  getLanguageName = (lang: Language): string => {
    const names: Record<Language, string> = {
      en: 'English',
      es: 'Español',
      fr: 'Français',
      hi: 'हिंदी',
    }
    return names[lang]
  }

  getSupportedLanguages = (): Language[] => {
    return ['en', 'es', 'fr', 'hi']
  }
}

export default new LanguageModel()

