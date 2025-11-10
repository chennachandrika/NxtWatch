import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams, useNavigate } from 'react-router-dom'
import AppLayout from '../components/layouts/AppLayout'
import VideoPlayer from '../components/features/video/VideoPlayer'
import VideoDetailsContent from '../components/features/video/VideoDetailsContent'
import videoDetailsModel from '../stores/VideoDetailsModel'

const VideoDetailsPage = observer(() => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const hasFetched = useRef(false)

  useEffect(() => {
    if (id && !hasFetched.current) {
      hasFetched.current = true
      videoDetailsModel.fetchVideoDetails(id)
    }
  }, [id])

  if (videoDetailsModel.isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AppLayout>
    )
  }

  if (videoDetailsModel.errorMessage) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <div className="mb-4 text-red-600 dark:text-red-400">
            ⚠️ {videoDetailsModel.errorMessage}
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => videoDetailsModel.fetchVideoDetails(id!)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Retry
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (!videoDetailsModel.videoDetails) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📺</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Video not found
          </h3>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg mt-4"
          >
            Go Back
          </button>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 mt-4">
        <VideoPlayer video={videoDetailsModel.videoDetails} />
        <VideoDetailsContent video={videoDetailsModel.videoDetails} />
      </div>
    </AppLayout>
  )
})

export default VideoDetailsPage
