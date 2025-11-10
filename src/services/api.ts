


// API Base URL
const API_BASE_URL = 'https://apis.ccbp.in'

// Helper function to get JWT token
const getJwtToken = () => {
  return localStorage.getItem('jwt_token') || ''
}

export const loginAPI = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
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
  const queryParam = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''
  
  const headers: HeadersInit = {
    'Accept': 'application/json',
  }

  // Add Authorization header with Bearer token
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}/videos/all${queryParam}`, {
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