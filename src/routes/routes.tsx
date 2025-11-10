import { Navigate } from 'react-router-dom'
import Login from '../components/Login/Login'
import Home from '../components/Home/Home'
import Trending from '../components/Trending/Trending'
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
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/trending',
    element: (
      <ProtectedRoute>
        <Trending />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]
