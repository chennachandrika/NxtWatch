import { makeAutoObservable, computed, reaction } from 'mobx'
import type { Video } from './VideoModel'
import type { VideoDetails } from './VideoDetailsModel'

class SavedVideosModel {
  savedVideos: Video[] = []

  constructor() {
    makeAutoObservable(this, {
      // Mark computed values
      savedVideoCount: computed,
      savedVideoIds: computed,
      isEmpty: computed,
    })
    this.loadSavedVideos()
    
    // Reaction: Auto-persist to localStorage when savedVideos changes
    reaction(
      () => this.savedVideos.length,
      () => this.persistSavedVideos()
    )
  }

  loadSavedVideos = () => {
    const saved = localStorage.getItem('saved_videos')
    if (saved) {
      try {
        this.savedVideos = JSON.parse(saved)
      } catch {
        // Silently handle parse errors - reset to empty array
        this.savedVideos = []
        localStorage.removeItem('saved_videos')
      }
    }
  }

  // Computed: Get count of saved videos
  get savedVideoCount(): number {
    return this.savedVideos.length
  }

  // Computed: Get array of saved video IDs (for quick lookup)
  get savedVideoIds(): string[] {
    return this.savedVideos.map((video) => video.id)
  }

  // Computed: Check if no videos saved
  get isEmpty(): boolean {
    return this.savedVideos.length === 0
  }

  saveVideo = (videoDetails: VideoDetails) => {
    // Convert VideoDetails to Video format
    const video: Video = {
      id: videoDetails.id,
      title: videoDetails.title,
      thumbnail_url: videoDetails.thumbnail_url,
      channel: {
        name: videoDetails.channel.name,
        profile_image_url: videoDetails.channel.profile_image_url,
      },
      view_count: videoDetails.view_count,
      published_at: videoDetails.published_at,
    }

    // Check if video is already saved
    if (!this.isVideoSaved(video.id)) {
      this.savedVideos = [...this.savedVideos, video]
      // Persistence handled by reaction
    }
  }

  removeVideo = (videoId: string) => {
    this.savedVideos = this.savedVideos.filter((video) => video.id !== videoId)
    // Persistence handled by reaction
  }

  isVideoSaved = (videoId: string): boolean => {
    // Use computed savedVideoIds for O(1) lookup instead of O(n) some()
    return this.savedVideoIds.includes(videoId)
  }

  private persistSavedVideos = () => {
    localStorage.setItem('saved_videos', JSON.stringify(this.savedVideos))
  }

  clearAllSavedVideos = () => {
    this.savedVideos = []
    localStorage.removeItem('saved_videos')
  }
}

export default new SavedVideosModel()
