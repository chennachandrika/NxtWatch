


// Get API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://apis.ccbp.in'

// Use Vite proxy in development
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    // In development, use proxy
    return '/api'
  }
  // In production, use the environment variable or fallback
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