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
    <div className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors mb-4" onClick={handleClick}>
      <div className="flex gap-4">
        {/* Thumbnail - Left Side */}
        <div className="flex-shrink-0">
          <div className="relative w-84 h-56 rounded-lg overflow-hidden">
            <img
              src={video.thumbnail_url}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Video Info - Right Side */}
        <div className="flex-1 min-w-0 py-2">
          <h3 className="font-semibold text-base mb-2 line-clamp-2 text-gray-900 dark:text-white">
            {video.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {video.channel.name}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
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
