import { makeAutoObservable, runInAction } from 'mobx'
import { loginAPI } from '../services/api'
import userModel from './UserModel'

interface LoginCredentials {
  username: string
  password: string
}

class AuthModel{
  isAuthenticated: boolean = false
  isLoading: boolean = false
  errorMessage: string = ''
  jwtToken: string = ''

  constructor() {
    makeAutoObservable(this)
    this.checkAuthStatus()
  }

  checkAuthStatus = () => {
    const token = localStorage.getItem('jwt_token')
    if (token) {
      this.jwtToken = token
      this.isAuthenticated = true
      // Load user info if available
      userModel.loadUserFromStorage()
    }
  }

  login = async (credentials: LoginCredentials) => {
    this.isLoading = true
    this.errorMessage = ''

    try {
      const data = await loginAPI(credentials.username, credentials.password)

      runInAction(() => {
        this.jwtToken = data.jwt_token
        this.isAuthenticated = true
        this.isLoading = false
        localStorage.setItem('jwt_token', data.jwt_token)
        
        // Store user info in UserModel
        userModel.setUser({
          username: credentials.username,
          name: credentials.username,
        })
      })
      return { success: true }
    } catch (error) {
      runInAction(() => {
        this.errorMessage = error instanceof Error 
          ? error.message 
          : 'Something went wrong. Please try again.'
        this.isLoading = false
      })
      return { success: false, error: this.errorMessage }
    }
  }

  logout = () => {
    this.isAuthenticated = false
    this.jwtToken = ''
    this.errorMessage = ''
    localStorage.removeItem('jwt_token')
    // Clear user info
    userModel.clearUser()
  }

  clearError = () => {
    this.errorMessage = ''
  }
}

export default new AuthModel()
