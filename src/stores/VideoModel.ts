import { makeAutoObservable, runInAction } from 'mobx'
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
    makeAutoObservable(this)
  }

  setSearchQuery = (query: string) => {
    this.searchQuery = query
  }

  fetchVideos = async (searchQuery: string = '') => {
    // Prevent duplicate concurrent requests
    if (this.isFetching) {
      return
    }

    this.isFetching = true
    this.isLoading = true
    this.errorMessage = ''
    this.searchQuery = searchQuery

    try {
      const data = await fetchVideosAPI(searchQuery)
      runInAction(() => {
        this.videos = data.videos || []
        this.isLoading = false
        this.isFetching = false
      })
    } catch (error) {
      runInAction(() => {
        this.errorMessage = error instanceof Error 
          ? error.message 
          : 'Failed to fetch videos'
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

export default new VideoModel()
