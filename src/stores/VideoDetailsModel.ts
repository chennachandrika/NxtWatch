import { makeAutoObservable, runInAction } from 'mobx'
import { fetchVideoDetailsAPI } from '../services/api'

export type VideoDetails = {
  id: string
  title: string
  video_url: string
  thumbnail_url: string
  channel: {
    name: string
    profile_image_url: string
    subscriber_count: string
  }
  view_count: string
  published_at: string
  description: string
}

class VideoDetailsModel {
  videoDetails: VideoDetails | null = null
  isLoading: boolean = false
  errorMessage: string = ''
  private isFetching: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  fetchVideoDetails = async (videoId: string) => {
    // Prevent duplicate concurrent requests
    if (this.isFetching) {
      return
    }

    this.isFetching = true
    this.isLoading = true
    this.errorMessage = ''

    try {
      const data = await fetchVideoDetailsAPI(videoId)
      runInAction(() => {
        this.videoDetails = data.video_details || null
        this.isLoading = false
        this.isFetching = false
      })
    } catch (error) {
      runInAction(() => {
        this.errorMessage = error instanceof Error 
          ? error.message 
          : 'Failed to fetch video details'
        this.isLoading = false
        this.videoDetails = null
        this.isFetching = false
      })
    }
  }

  clearError = () => {
    this.errorMessage = ''
  }

  clearVideoDetails = () => {
    this.videoDetails = null
    this.errorMessage = ''
  }
}

export default new VideoDetailsModel()
