import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import RouteGuard from '../components/routes/RouteGuard'

// Lazy load pages for code splitting
const Login = lazy(() => import('../components/auth/Login'))
const HomePage = lazy(() => import('../pages/HomePage'))
const TrendingPage = lazy(() => import('../pages/TrendingPage'))
const GamingPage = lazy(() => import('../pages/GamingPage'))
const SavedVideosPage = lazy(() => import('../pages/SavedVideosPage'))
const VideoDetailsPage = lazy(() => import('../pages/VideoDetailsPage'))

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
)

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

// Helper function to wrap routes with RouteGuard and Suspense
export const renderRoute = (route: AppRoute) => {
  return (
    <RouteGuard protected={route.protected}>
      <Suspense fallback={<PageLoader />}>
        {route.element}
      </Suspense>
    </RouteGuard>
  )
}
