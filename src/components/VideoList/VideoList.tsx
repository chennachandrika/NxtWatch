import { observer } from 'mobx-react-lite'
import videoModel from '../../stores/VideoModel'
import VideoCard from '../VideoCard/VideoCard'

const VideoList = observer(() => {
  if (videoModel.isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (videoModel.errorMessage) {
    return (
      <div className="text-center py-20">
        <div className="mb-4 text-red-600 dark:text-red-400">
          ⚠️ {videoModel.errorMessage}
        </div>
        <button
          onClick={() => videoModel.fetchVideos(videoModel.searchQuery)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    )
  }

  if (videoModel.videos.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📺</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          No videos found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try searching for something else
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {videoModel.videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
})

export default VideoList
