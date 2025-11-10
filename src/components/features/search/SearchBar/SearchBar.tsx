import { useState, FormEvent } from 'react'
import { observer } from 'mobx-react-lite'
import videoModel from '../../../../stores/VideoModel'

const SearchBar = observer(() => {
  const [searchQuery, setSearchQuery] = useState('')

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
          placeholder="Search"
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gray-100 dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          🔍
        </button>
      </div>
    </form>
  )
})

export default SearchBar

