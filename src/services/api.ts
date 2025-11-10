


// API Base URL
const API_BASE_URL = 'https://apis.ccbp.in'

// Helper function to get JWT token
const getJwtToken = () => {
  return localStorage.getItem('jwt_token') || ''
}

// Get API URL - use proxy in development, direct URL in production
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    // In development, use Vite proxy to avoid CORS
    return '/api'
  }
  // In production, use direct URL
  return API_BASE_URL
}

export const loginAPI = async (username: string, password: string) => {
  const baseUrl = getApiUrl()
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error_msg || 'Login failed')
  }

  return response.json()
}

export const fetchVideosAPI = async (searchQuery: string = '') => {
  const token = getJwtToken()
  const baseUrl = getApiUrl()
  const queryParam = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''
  
  const headers: HeadersInit = {
    'Accept': 'application/json',
  }

  // Add Authorization header with Bearer token
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${baseUrl}/videos/all${queryParam}`, {
    method: 'GET',
    headers,
  })

  if (!response.ok) {
    if (response.status === 401) {
      // Clear token if unauthorized
      localStorage.removeItem('jwt_token')
      throw new Error('Unauthorized. Please login again.')
    }
    throw new Error('Failed to fetch videos')
  }

  return response.json()
}

export const fetchTrendingVideosAPI = async () => {
  const token = getJwtToken()
  const baseUrl = getApiUrl()
  
  const headers: HeadersInit = {
    'Accept': 'application/json',
  }

  // Add Authorization header with Bearer token
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${baseUrl}/videos/trending`, {
    method: 'GET',
    headers,
  })

  if (!response.ok) {
    if (response.status === 401) {
      // Clear token if unauthorized
      localStorage.removeItem('jwt_token')
      throw new Error('Unauthorized. Please login again.')
    }
    throw new Error('Failed to fetch trending videos')
  }

  return response.json()
}