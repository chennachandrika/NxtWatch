import { makeAutoObservable, flow, computed } from 'mobx'
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
    makeAutoObservable(this, {
      // Mark computed and flow
      hasVideoDetails: computed,
      currentVideoId: computed,
      fetchVideoDetails: flow,
    })
  }

  // Computed: Check if video details exist
  get hasVideoDetails(): boolean {
    return this.videoDetails !== null
  }

  // Computed: Get current video ID
  get currentVideoId(): string | null {
    return this.videoDetails?.id || null
  }

  // Flow: Better async handling
  fetchVideoDetails = flow(function* (this: VideoDetailsModel, videoId: string) {
    // Prevent duplicate concurrent requests
    if (this.isFetching) {
      return
    }

    this.isFetching = true
    this.isLoading = true
    this.errorMessage = ''

    try {
      const data = yield fetchVideoDetailsAPI(videoId)
      this.videoDetails = data.video_details || null
      this.isLoading = false
      this.isFetching = false
    } catch (error) {
      this.errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to fetch video details'
      this.isLoading = false
      this.videoDetails = null
      this.isFetching = false
    }
  })

  clearError = () => {
    this.errorMessage = ''
  }

  clearVideoDetails = () => {
    this.videoDetails = null
    this.errorMessage = ''
  }
}

export default new VideoDetailsModel()
