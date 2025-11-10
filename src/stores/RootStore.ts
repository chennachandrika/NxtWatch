import { makeAutoObservable } from 'mobx'
import authModel from './AuthModel'
import userModel from './UserModel'
import themeModel from './ThemeModel'
import languageModel from './LanguageModel'
import videoModel from './VideoModel'
import trendingModel from './TrendingModel'
import gamingModel from './GamingModel'
import savedVideosModel from './SavedVideosModel'
import videoDetailsModel from './VideoDetailsModel'

/**
 * RootStore - Centralized store composition
 * 
 * This demonstrates MobX store composition pattern where all stores
 * are accessible through a single root store. This enables:
 * - Easy store access
 * - Store dependencies (stores observing other stores)
 * - Better organization
 * - Easier testing
 */
class RootStore {
  // All stores as properties
  auth = authModel
  user = userModel
  theme = themeModel
  language = languageModel
  video = videoModel
  trending = trendingModel
  gaming = gamingModel
  savedVideos = savedVideosModel
  videoDetails = videoDetailsModel

  constructor() {
    makeAutoObservable(this)
  }

  // Example: Computed value that depends on multiple stores
  get isAppReady(): boolean {
    return !this.auth.isLoading && this.theme.theme !== null
  }

  // Example: Action that coordinates multiple stores
  resetAllStores = () => {
    this.video.clearError()
    this.trending.clearError()
    this.gaming.clearError()
    this.videoDetails.clearError()
    this.savedVideos.clearAllSavedVideos()
  }
}

// Export singleton instance
const rootStore = new RootStore()

export default rootStore

// Also export individual stores for backward compatibility
export {
  authModel,
  userModel,
  themeModel,
  languageModel,
  videoModel,
  trendingModel,
  gamingModel,
  savedVideosModel,
  videoDetailsModel,
}

