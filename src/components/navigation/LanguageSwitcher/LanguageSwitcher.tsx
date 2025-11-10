import { useState, useRef, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import languageModel from '../../../stores/LanguageModel'

const LanguageSwitcher = observer(() => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = languageModel.getSupportedLanguages()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLanguageChange = (lang: typeof languageModel.language) => {
    languageModel.changeLanguage(lang)
    setIsOpen(false)
  }

  const currentLanguageName = languageModel.getLanguageName(languageModel.language)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg outline-none hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1.5"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className="text-lg" role="img" aria-label="Language">
          🌐
        </span>
        <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentLanguageName}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  languageModel.language === lang
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {languageModel.getLanguageName(lang)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
})

export default LanguageSwitcher

