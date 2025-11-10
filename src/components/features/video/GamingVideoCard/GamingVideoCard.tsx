import { useNavigate } from 'react-router-dom'
import type { GamingVideo } from '../../../../stores/GamingModel'

interface GamingVideoCardProps {
  video: GamingVideo
}

const GamingVideoCard = ({ video }: GamingVideoCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/videos/${video.id}`)
  }

  return (
    <div className="cursor-pointer hover:scale-[1.02] transition-transform" onClick={handleClick}>
      {/* Taller aspect ratio for gaming videos */}
      <div className="relative w-full aspect-[9/10] md:aspect-[9/12] mb-3 rounded-lg overflow-hidden">
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="w-full h-full object-cover"
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
}

export default GamingVideoCard

