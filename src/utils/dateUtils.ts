/**
 * Format date to show relative time (e.g., "5 years ago", "2 months ago")
 * @param dateString - ISO date string
 * @returns Formatted relative time string
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInDays / 365)

  if (diffInYears > 0) {
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`
  } else if (diffInMonths > 0) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`
  } else if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`
  } else if (diffInHours > 0) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`
  } else {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`
  }
}

/**
 * Format date to locale date string
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "12/25/2023")
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}
