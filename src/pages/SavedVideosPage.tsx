import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import AppLayout from '../components/layouts/AppLayout'
import VideoList from '../components/features/video/VideoList'
import savedVideosModel from '../stores/SavedVideosModel'
import type { Video } from '../stores/VideoModel'

const SavedVideosPage = observer(() => {
  const { t } = useTranslation()
  
  const headerContent = (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
        <span className="text-2xl">💾</span>
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
        {t('savedVideos.title')}
      </h1>
    </div>
  )

  // Create a mock model object that matches the VideoList interface
  const savedVideosListModel: {
    videos: Video[]
    isLoading: boolean
    errorMessage: string
  } = {
    videos: savedVideosModel.savedVideos,
    isLoading: false,
    errorMessage: '',
  }

  return (
    <AppLayout headerContent={headerContent} headerClassName="pt-6">
      {savedVideosModel.savedVideos.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📺</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            {t('savedVideos.noVideos')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t('savedVideos.emptyState')}
          </p>
        </div>
      ) : (
        <VideoList model={savedVideosListModel} />
      )}
    </AppLayout>
  )
})

export default SavedVideosPage
