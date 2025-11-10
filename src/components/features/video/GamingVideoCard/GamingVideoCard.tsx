import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { GamingVideo } from '../../../../stores/GamingModel'

interface GamingVideoCardProps {
  video: GamingVideo
}

const GamingVideoCard = memo(({ video }: GamingVideoCardProps) => {
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
      aria-label={`${video.title} - ${video.view_count} watching worldwide`}
    >
      {/* Taller aspect ratio for gaming videos */}
      <div className="relative w-full aspect-[9/10] md:aspect-[9/12] mb-3 rounded-lg overflow-hidden">
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2 text-gray-900 dark:text-white">
          {video.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <span>{video.view_count} Watching Worldwide</span>
        </div>
      </div>
    </div>
  )
})

GamingVideoCard.displayName = 'GamingVideoCard'

export default GamingVideoCard

