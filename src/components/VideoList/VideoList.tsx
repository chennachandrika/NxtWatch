import { observer } from 'mobx-react-lite'
import VideoCard from '../VideoCard/VideoCard'
import TrendingVideoCard from '../TrendingVideoCard/TrendingVideoCard'
import videoModel from '../../stores/VideoModel'
import trendingModel from '../../stores/TrendingModel'

interface VideoListProps {
  model?: typeof videoModel | typeof trendingModel
  isTrending?: boolean
}

const VideoList = observer(({ model = videoModel, isTrending = false }: VideoListProps) => {
  if (model.isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (model.errorMessage) {
    return (
      <div className="text-center py-20">
        <div className="mb-4 text-red-600 dark:text-red-400">
          ⚠️ {model.errorMessage}
        </div>
        <button
          onClick={() => {
            if ('fetchVideos' in model) {
              model.fetchVideos(model.searchQuery || '')
            } else if ('fetchTrendingVideos' in model) {
              model.fetchTrendingVideos()
            }
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    )
  }

  if (model.videos.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📺</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          No videos found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try again later
        </p>
      </div>
    )
  }

  // Use horizontal layout for trending, grid layout for home
  if (isTrending) {
    return (
      <div className="space-y-0">
        {model.videos.map((video) => (
          <TrendingVideoCard key={video.id} video={video} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {model.videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
})

export default VideoList
