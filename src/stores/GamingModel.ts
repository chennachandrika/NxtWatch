import { makeAutoObservable, runInAction } from 'mobx'
import { fetchGamingVideosAPI } from '../services/api'

export type GamingVideo = {
  id: string
  title: string
  thumbnail_url: string
  view_count: string
}

class GamingModel {
  videos: GamingVideo[] = []
  isLoading: boolean = false
  errorMessage: string = ''
  private isFetching: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  fetchGamingVideos = async () => {
    // Prevent duplicate concurrent requests
    if (this.isFetching) {
      return
    }

    this.isFetching = true
    this.isLoading = true
    this.errorMessage = ''

    try {
      const data = await fetchGamingVideosAPI()
      runInAction(() => {
        this.videos = data.videos || []
        this.isLoading = false
        this.isFetching = false
      })
    } catch (error) {
      runInAction(() => {
        this.errorMessage = error instanceof Error 
          ? error.message 
          : 'Failed to fetch gaming videos'
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

export default new GamingModel()
