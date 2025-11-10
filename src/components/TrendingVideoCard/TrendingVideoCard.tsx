import { useNavigate } from 'react-router-dom'
import type { Video } from '../../stores/VideoModel'
import { formatRelativeTime } from '../../utils/dateUtils'

interface TrendingVideoCardProps {
  video: Video
}

const TrendingVideoCard = ({ video }: TrendingVideoCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/videos/${video.id}`)
  }

  return (
    <div className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors mb-4 p-2" onClick={handleClick}>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Thumbnail - Top on mobile, Left on desktop */}
        <div className="shrink-0 w-full sm:w-64">
          <div className="relative w-full aspect-video sm:w-64 sm:h-36 rounded-lg overflow-hidden">
            <img
              src={video.thumbnail_url}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Video Info - Bottom on mobile, Right on desktop */}
        <div className="flex-1 min-w-0 py-1 sm:py-2">
          <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 text-gray-900 dark:text-white">
            {video.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
            {video.channel.name}
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <span>{video.view_count} views</span>
            <span>•</span>
            <span>{formatRelativeTime(video.published_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendingVideoCard
