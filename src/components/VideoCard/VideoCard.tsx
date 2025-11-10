import type { Video } from '../../stores/VideoModel'

interface VideoCardProps {
  video: Video
}

const VideoCard = ({ video }: VideoCardProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
        const diffInMinutes = Math.floor(diffInSeconds / 60)
        const diffInHours = Math.floor(diffInMinutes / 60)
        const diffInDays = Math.floor(diffInHours / 24)
        const diffInMonths = Math.floor(diffInDays / 30)
        const diffInYears = Math.floor(diffInDays / 365)
    
        if (diffInYears > 0) {
          return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`
        } else if (diffInMonths > 0) {
          return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`
        } else if (diffInDays > 0) {
          return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`
        } else if (diffInHours > 0) {
          return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`
        } else {
          return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`
        }
      }
    
  return (
    <div className="cursor-pointer hover:scale-[1.02] transition-transform">
      <div className="relative w-full aspect-video mb-3 rounded-lg overflow-hidden">
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex gap-3">
        <img
          src={video.channel.profile_image_url}
          alt={video.channel.name}
          className="w-10 h-10 rounded-full flex-shrink-0"
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
            <span>•</span>
            <span>{formatDate(video.published_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
