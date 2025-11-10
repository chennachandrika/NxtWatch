import { makeAutoObservable, flow, computed } from 'mobx'
import { fetchTrendingVideosAPI } from '../services/api'
import type { Video } from './VideoModel'

class TrendingModel {
  videos: Video[] = []
  isLoading: boolean = false
  errorMessage: string = ''
  private isFetching: boolean = false

  constructor() {
    makeAutoObservable(this, {
      // Mark computed and flow
      videoCount: computed,
      hasVideos: computed,
      fetchTrendingVideos: flow,
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
  fetchTrendingVideos = flow(function* (this: TrendingModel) {
    // Prevent duplicate concurrent requests
    if (this.isFetching) {
      return
    }

    this.isFetching = true
    this.isLoading = true
    this.errorMessage = ''

    try {
      const data = yield fetchTrendingVideosAPI()
      this.videos = data.videos || []
      this.isLoading = false
      this.isFetching = false
    } catch (error) {
      this.errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to fetch trending videos'
      this.isLoading = false
      this.videos = []
      this.isFetching = false
    }
  })

  clearError = () => {
    this.errorMessage = ''
  }
}

export default new TrendingModel()
