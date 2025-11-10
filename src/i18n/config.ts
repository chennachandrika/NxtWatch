import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from '../locales/en/translation.json'
import esTranslations from '../locales/es/translation.json'
import frTranslations from '../locales/fr/translation.json'
import hiTranslations from '../locales/hi/translation.json'

const resources = {
  en: {
    translation: enTranslations,
  },
  es: {
    translation: esTranslations,
  },
  fr: {
    translation: frTranslations,
  },
  hi: {
    translation: hiTranslations,
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en', // Default language from localStorage or 'en'
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
    react: {
      useSuspense: false, // Disable suspense for better compatibility
    },
  })

export default i18n

