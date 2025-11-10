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
    <div className="h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="sticky top-0 z-40 bg-white dark:bg-black px-4 lg:px-8 pt-4 pb-4 border-b border-gray-200 dark:border-gray-800">
            <SearchBar />
          </div>
          <div className="flex-1 overflow-y-auto px-4 lg:px-8 pb-4">
            <VideoList />
          </div>
        </main>
      </div>
    </div>
  )
})

export default Home
