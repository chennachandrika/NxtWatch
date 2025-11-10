import { Navigate } from 'react-router-dom'
import Login from '../components/Login/Login'
import HomePage from '../pages/HomePage'
import TrendingPage from '../pages/TrendingPage'
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
    path: '*',
    element: <Navigate to="/" replace />,
  },
]
