import { makeAutoObservable } from 'mobx'

export interface User {
  username: string
  name?: string
  email?: string
  profileImageUrl?: string
}

class UserModel {
  user: User | null = null

  constructor() {
    makeAutoObservable(this)
    this.loadUserFromStorage()
  }

  loadUserFromStorage = () => {
    const storedUser = localStorage.getItem('user_info')
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser)
      } catch (error) {
        console.error('Failed to parse user info from storage', error)
      }
    }
  }

  setUser = (user: User) => {
    this.user = user
    localStorage.setItem('user_info', JSON.stringify(user))
  }

  updateUser = (updates: Partial<User>) => {
    if (this.user) {
      this.user = { ...this.user, ...updates }
      localStorage.setItem('user_info', JSON.stringify(this.user))
    }
  }

  clearUser = () => {
    this.user = null
    localStorage.removeItem('user_info')
  }

  getInitials = (): string => {
    if (!this.user) return 'U'
    const name = this.user.name || this.user.username || ''
    if (name.length === 0) return 'U'
    return name.charAt(0).toUpperCase()
  }
}

export default new UserModel()
