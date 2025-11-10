import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import AppLayout from '../components/layouts/AppLayout'
import SearchBar from '../components/features/search/SearchBar'
import VideoList from '../components/features/video/VideoList'
import videoModel from '../stores/VideoModel'

const HomePage = observer(() => {
  const hasFetched = useRef(false)

  useEffect(() => {
    // Prevent duplicate API calls in StrictMode
    if (!hasFetched.current) {
      hasFetched.current = true
      videoModel.fetchVideos('')
    }
  }, [])

  return (
    <AppLayout headerContent={<SearchBar />}>
      <VideoList model={videoModel} />
    </AppLayout>
  )
})

export default HomePage
