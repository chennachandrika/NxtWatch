import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Video } from '../../../../stores/VideoModel'
import { formatRelativeTime } from '../../../../utils/dateUtils'

interface TrendingVideoCardProps {
  video: Video
}

const TrendingVideoCard = memo(({ video }: TrendingVideoCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/videos/${video.id}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors mb-4 p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 outline-none"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${video.title} by ${video.channel.name}`}
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Thumbnail - Top on mobile, Left on desktop */}
        <div className="shrink-0 w-full sm:w-84">
          <div className="relative w-full aspect-square sm:w-84 sm:h-52 rounded-lg overflow-hidden">
            <img
              src={video.thumbnail_url}
              alt={video.title}
              className="w-full h-full object-cover"
              loading="lazy"
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
            <span aria-hidden="true">•</span>
            <span>{formatRelativeTime(video.published_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
})

TrendingVideoCard.displayName = 'TrendingVideoCard'

export default TrendingVideoCard

