import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import Login from '../components/auth/Login'
import HomePage from '../pages/HomePage'
import TrendingPage from '../pages/TrendingPage'
import GamingPage from '../pages/GamingPage'
import SavedVideosPage from '../pages/SavedVideosPage'
import VideoDetailsPage from '../pages/VideoDetailsPage'
import RouteGuard from '../components/routes/RouteGuard'

export interface AppRoute {
  path: string
  element: ReactElement
  protected?: boolean // true = requires auth, false/undefined = public route
}

export const appRoutes: AppRoute[] = [
  {
    path: '/login',
    element: <Login />,
    protected: false, // Public route - accessible when not authenticated
  },
  {
    path: '/',
    element: <HomePage />,
    protected: true, // Requires authentication
  },
  {
    path: '/trending',
    element: <TrendingPage />,
    protected: true,
  },
  {
    path: '/gaming',
    element: <GamingPage />,
    protected: true,
  },
  {
    path: '/saved',
    element: <SavedVideosPage />,
    protected: true,
  },
  {
    path: '/videos/:id',
    element: <VideoDetailsPage />,
    protected: true,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]

// Helper function to wrap routes with RouteGuard
export const renderRoute = (route: AppRoute) => {
  return (
    <RouteGuard protected={route.protected}>
      {route.element}
    </RouteGuard>
  )
}
