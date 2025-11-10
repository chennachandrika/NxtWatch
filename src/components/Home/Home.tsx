import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import SearchBar from '../SearchBar/SearchBar'
import VideoList from '../VideoList/VideoList'
import videoModel from '../../stores/VideoModel'

const Home = observer(() => {
  const hasFetched = useRef(false)

  useEffect(() => {
    // Prevent duplicate API calls in StrictMode
    if (!hasFetched.current) {
      hasFetched.current = true
      videoModel.fetchVideos('')
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8">
          <SearchBar />
          <VideoList />
        </main>
      </div>
    </div>
  )
})

export default Home
