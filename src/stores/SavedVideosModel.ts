import { makeAutoObservable, runInAction } from 'mobx'
import type { Video } from './VideoModel'
import type { VideoDetails } from './VideoDetailsModel'

class SavedVideosModel {
  savedVideos: Video[] = []

  constructor() {
    makeAutoObservable(this)
    this.loadSavedVideos()
  }

  loadSavedVideos = () => {
    const saved = localStorage.getItem('saved_videos')
    if (saved) {
      try {
        this.savedVideos = JSON.parse(saved)
      } catch (error) {
        console.error('Failed to parse saved videos', error)
        this.savedVideos = []
      }
    }
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
      runInAction(() => {
        this.savedVideos = [...this.savedVideos, video]
        this.persistSavedVideos()
      })
    }
  }

  removeVideo = (videoId: string) => {
    runInAction(() => {
      this.savedVideos = this.savedVideos.filter((video) => video.id !== videoId)
      this.persistSavedVideos()
    })
  }

  isVideoSaved = (videoId: string): boolean => {
    return this.savedVideos.some((video) => video.id === videoId)
  }

  private persistSavedVideos = () => {
    localStorage.setItem('saved_videos', JSON.stringify(this.savedVideos))
  }

  clearAllSavedVideos = () => {
    runInAction(() => {
      this.savedVideos = []
      localStorage.removeItem('saved_videos')
    })
  }
}

export default new SavedVideosModel()
