import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Video } from '../../../../stores/VideoModel'
import { formatRelativeTime } from '../../../../utils/dateUtils'

interface VideoCardProps {
  video: Video
}

const VideoCard = memo(({ video }: VideoCardProps) => {
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
      className="cursor-pointer hover:scale-[1.02] transition-transform focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 rounded-lg outline-none"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${video.title} by ${video.channel.name}`}
    >
      <div className="relative w-full aspect-video mb-3 rounded-lg overflow-hidden">
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex gap-3">
        <img
          src={video.channel.profile_image_url}
          alt={`${video.channel.name} profile`}
          className="w-10 h-10 rounded-full flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1 line-clamp-2 text-gray-900 dark:text-white">
            {video.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            {video.channel.name}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <span>{video.view_count} views</span>
            <span aria-hidden="true">•</span>
            <span>{formatRelativeTime(video.published_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
})

VideoCard.displayName = 'VideoCard'

export default VideoCard

