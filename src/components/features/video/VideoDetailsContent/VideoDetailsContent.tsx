import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import type { VideoDetails } from '../../../../stores/VideoDetailsModel'
import savedVideosModel from '../../../../stores/SavedVideosModel'

interface VideoDetailsContentProps {
  video: VideoDetails
}

const VideoDetailsContent = observer(({ video }: VideoDetailsContentProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    setIsSaved(savedVideosModel.isVideoSaved(video.id))
  }, [video.id])

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (isDisliked) setIsDisliked(false)
  }

  const handleDislike = () => {
    setIsDisliked(!isDisliked)
    if (isLiked) setIsLiked(false)
  }

  const handleSave = () => {
    if (isSaved) {
      savedVideosModel.removeVideo(video.id)
      setIsSaved(false)
    } else {
      savedVideosModel.saveVideo(video)
      setIsSaved(true)
    }
  }

  return (
    <div className="space-y-4">
      {/* Video Title */}
      <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
        {video.title}
      </h1>

      {/* Video Stats and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>{video.view_count} views</span>
          <span>•</span>
          <span>{video.published_at}</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isLiked
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span>👍</span>
            <span>Like</span>
          </button>
          <button
            onClick={handleDislike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isDisliked
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span>👎</span>
            <span>Dislike</span>
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isSaved
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span>{isSaved ? '✓' : '➕'}</span>
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Channel Info */}
      <div className="flex items-start gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <img
          src={video.channel.profile_image_url}
          alt={video.channel.name}
          className="w-12 h-12 rounded-full flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            {video.channel.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {video.channel.subscriber_count} subscribers
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  )
})

export default VideoDetailsContent

