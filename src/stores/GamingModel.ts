import { makeAutoObservable, flow, computed } from 'mobx'
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
    makeAutoObservable(this, {
      // Mark computed and flow
      videoCount: computed,
      hasVideos: computed,
      fetchGamingVideos: flow,
    })
  }

  // Computed: Get video count
  get videoCount(): number {
    return this.videos.length
  }

  // Computed: Check if videos exist
  get hasVideos(): boolean {
    return this.videos.length > 0
  }

  // Flow: Better async handling
  fetchGamingVideos = flow(function* (this: GamingModel) {
    // Prevent duplicate concurrent requests
    if (this.isFetching) {
      return
    }

    this.isFetching = true
    this.isLoading = true
    this.errorMessage = ''

    try {
      const data = yield fetchGamingVideosAPI()
      this.videos = data.videos || []
      this.isLoading = false
      this.isFetching = false
    } catch (error) {
      this.errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to fetch gaming videos'
      this.isLoading = false
      this.videos = []
      this.isFetching = false
    }
  })

  clearError = () => {
    this.errorMessage = ''
  }
}

export default new GamingModel()
