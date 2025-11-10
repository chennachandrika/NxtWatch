import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import AppLayout from '../components/layouts/AppLayout'
import VideoList from '../components/features/video/VideoList'
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

  const headerContent = (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
        <span className="text-2xl">🔥</span>
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
        Trending
      </h1>
    </div>
  )

  return (
    <AppLayout headerContent={headerContent} headerClassName="pt-6">
      <VideoList model={trendingModel} isTrending={true} />
    </AppLayout>
  )
})

export default TrendingPage
