import { observer } from 'mobx-react-lite'
import AppLayout from '../components/AppLayout/AppLayout'
import VideoList from '../components/VideoList/VideoList'
import savedVideosModel from '../stores/SavedVideosModel'

const SavedVideosPage = observer(() => {
  const headerContent = (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
        <span className="text-2xl">💾</span>
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
        Saved Videos
      </h1>
    </div>
  )

  // Create a mock model object that matches the VideoList interface
  const savedVideosListModel = {
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
            No saved videos yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Save videos you like to watch them later
          </p>
        </div>
      ) : (
        <VideoList model={savedVideosListModel as any} />
      )}
    </AppLayout>
  )
})

export default SavedVideosPage
