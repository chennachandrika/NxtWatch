import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import AppLayout from '../components/AppLayout/AppLayout'
import SearchBar from '../components/SearchBar/SearchBar'
import VideoList from '../components/VideoList/VideoList'
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
