

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

// Create authenticated API request helper
const createApiRequest = async (
  endpoint: string,
  options: RequestInit = {},
  errorMessage: string = 'Request failed'
): Promise<Response> => {
  const token = getJwtToken()
  const baseUrl = getApiUrl()
  
  const headers: HeadersInit = {
    'Accept': 'application/json',
    ...options.headers,
  }

  // Add Authorization header with Bearer token
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    if (response.status === 401) {
      // Clear token if unauthorized
      localStorage.removeItem('jwt_token')
      throw new Error('Unauthorized. Please login again.')
    }
    
    // Try to parse error message from response
    try {
      const errorData = await response.json()
      throw new Error(errorData.error_msg || errorMessage)
    } catch {
      throw new Error(errorMessage)
    }
  }

  return response
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
    try {
      const errorData = await response.json()
      throw new Error(errorData.error_msg || 'Login failed')
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Login failed')
    }
  }

  return response.json()
}

export const fetchVideosAPI = async (searchQuery: string = '') => {
  const queryParam = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''
  const response = await createApiRequest(
    `/videos/all${queryParam}`,
    { method: 'GET' },
    'Failed to fetch videos'
  )
  return response.json()
}

export const fetchTrendingVideosAPI = async () => {
  const response = await createApiRequest(
    '/videos/trending',
    { method: 'GET' },
    'Failed to fetch trending videos'
  )
  return response.json()
}

export const fetchGamingVideosAPI = async () => {
  const response = await createApiRequest(
    '/videos/gaming',
    { method: 'GET' },
    'Failed to fetch gaming videos'
  )
  return response.json()
}

export const fetchVideoDetailsAPI = async (videoId: string) => {
  const response = await createApiRequest(
    `/videos/${videoId}`,
    { method: 'GET' },
    'Failed to fetch video details'
  )
  return response.json()
}