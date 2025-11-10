import { Navigate } from 'react-router-dom'
import Login from '../components/Login/Login'
import HomePage from '../pages/HomePage'
import TrendingPage from '../pages/TrendingPage'
import GamingPage from '../pages/GamingPage'
import SavedVideosPage from '../pages/SavedVideosPage'
import VideoDetailsPage from '../pages/VideoDetailsPage'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

export const appRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/trending',
    element: (
      <ProtectedRoute>
        <TrendingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/gaming',
    element: (
      <ProtectedRoute>
        <GamingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/saved',
    element: (
      <ProtectedRoute>
        <SavedVideosPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/videos/:id',
    element: (
      <ProtectedRoute>
        <VideoDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]
