import { makeAutoObservable, flow, computed } from 'mobx'
import { fetchVideosAPI } from '../services/api'

export type Video = {
  id: string
  title: string
  thumbnail_url: string
  channel: {
    name: string
    profile_image_url: string
  }
  view_count: string
  published_at: string
}

class VideoModel {
  videos: Video[] = []
  isLoading: boolean = false
  errorMessage: string = ''
  searchQuery: string = ''
  private isFetching: boolean = false

  constructor() {
    makeAutoObservable(this, {
      // Explicitly mark computed values
      filteredVideos: computed,
      videoCount: computed,
      hasVideos: computed,
      // Use flow for async operations
      fetchVideos: flow,
    })
  }

  // Computed: Derived state - automatically updates when videos or searchQuery changes
  get filteredVideos(): Video[] {
    if (!this.searchQuery.trim()) {
      return this.videos
    }
    const query = this.searchQuery.toLowerCase()
    return this.videos.filter(
      (video) =>
        video.title.toLowerCase().includes(query) ||
        video.channel.name.toLowerCase().includes(query)
    )
  }

  // Computed: Total video count
  get videoCount(): number {
    return this.videos.length
  }

  // Computed: Check if videos exist
  get hasVideos(): boolean {
    return this.videos.length > 0
  }

  // Computed: Check if search has results
  get hasSearchResults(): boolean {
    return this.filteredVideos.length > 0
  }

  setSearchQuery = (query: string) => {
    this.searchQuery = query
  }

  // Flow: Better async handling than runInAction
  fetchVideos = flow(function* (this: VideoModel, searchQuery: string = '') {
    // Prevent duplicate concurrent requests
    if (this.isFetching) {
      return
    }

    this.isFetching = true
    this.isLoading = true
    this.errorMessage = ''
    this.searchQuery = searchQuery

    try {
      const data = yield fetchVideosAPI(searchQuery)
      this.videos = data.videos || []
      this.isLoading = false
      this.isFetching = false
    } catch (error) {
      this.errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to fetch videos'
      this.isLoading = false
      this.videos = []
      this.isFetching = false
    }
  })

  clearError = () => {
    this.errorMessage = ''
  }
}

export default new VideoModel()
