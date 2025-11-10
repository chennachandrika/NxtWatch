import React, { useState, useEffect, type FormEvent } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import videoModel from '../../../../stores/VideoModel'
import { useDebounce } from '../../../../hooks/useDebounce'

const SearchBar = observer(() => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  // Auto-search when debounced value changes (skip initial mount)
  const isInitialMount = React.useRef(true)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    videoModel.fetchVideos(debouncedSearchQuery)
  }, [debouncedSearchQuery])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    videoModel.fetchVideos(searchQuery)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('home.searchPlaceholder')}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white"
          aria-label={t('common.search')}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={t('common.search')}
        >
          <span aria-hidden="true">🔍</span>
        </button>
      </div>
    </form>
  )
})

export default SearchBar

