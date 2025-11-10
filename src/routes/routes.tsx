import { Navigate } from 'react-router-dom'
import Login from '../components/Login/Login'
import Home from '../components/Home/Home'
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
    path: '*',
    element: <Navigate to="/" replace />,
  },
]
