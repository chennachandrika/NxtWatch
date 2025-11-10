import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import AppLayout from '../components/AppLayout/AppLayout'
import VideoList from '../components/VideoList/VideoList'
import gamingModel from '../stores/GamingModel'

const GamingPage = observer(() => {
  const hasFetched = useRef(false)

  useEffect(() => {
    // Prevent duplicate API calls in StrictMode
    if (!hasFetched.current) {
      hasFetched.current = true
      gamingModel.fetchGamingVideos()
    }
  }, [])

  const headerContent = (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
        <span className="text-2xl">🎮</span>
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
        Gaming
      </h1>
    </div>
  )

  return (
    <AppLayout headerContent={headerContent} headerClassName="pt-6">
      <VideoList model={gamingModel} isGaming={true} />
    </AppLayout>
  )
})

export default GamingPage
