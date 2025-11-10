import { makeAutoObservable, runInAction } from 'mobx'
import { fetchTrendingVideosAPI } from '../services/api'
import type { Video } from './VideoModel'

class TrendingModel {
  videos: Video[] = []
  isLoading: boolean = false
  errorMessage: string = ''
  private isFetching: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  fetchTrendingVideos = async () => {
    // Prevent duplicate concurrent requests
    if (this.isFetching) {
      return
    }

    this.isFetching = true
    this.isLoading = true
    this.errorMessage = ''

    try {
      const data = await fetchTrendingVideosAPI()
      runInAction(() => {
        this.videos = data.videos || []
        this.isLoading = false
        this.isFetching = false
      })
    } catch (error) {
      runInAction(() => {
        this.errorMessage = error instanceof Error 
          ? error.message 
          : 'Failed to fetch trending videos'
        this.isLoading = false
        this.videos = []
        this.isFetching = false
      })
    }
  }

  clearError = () => {
    this.errorMessage = ''
  }
}

export default new TrendingModel()
