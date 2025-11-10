import type { VideoDetails } from '../../../../stores/VideoDetailsModel'

interface VideoPlayerProps {
  video: VideoDetails
}

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
      <img
        src={video.thumbnail_url}
        alt={video.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <button
          onClick={() => window.open(video.video_url, '_blank')}
          className="w-20 h-20 rounded-full bg-white/90 hover:bg-white transition-colors flex items-center justify-center"
          aria-label="Play video"
        >
          <svg
            className="w-12 h-12 text-gray-900 ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default VideoPlayer

