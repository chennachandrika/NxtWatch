import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import VideoList from '../components/VideoList/VideoList'
import trendingModel from '../stores/TrendingModel'

const TrendingPage = observer(() => {
  const hasFetched = useRef(false)

  useEffect(() => {
    // Prevent duplicate API calls in StrictMode
    if (!hasFetched.current) {
      hasFetched.current = true
      trendingModel.fetchTrendingVideos()
    }
  }, [])

  return (
    <div className="h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="sticky top-0 z-40 bg-white dark:bg-black px-4 lg:px-8 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Trending
              </h1>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-4 lg:px-8 pb-4">
            <VideoList model={trendingModel} isTrending={true} />
          </div>
        </main>
      </div>
    </div>
  )
})

export default TrendingPage
