import { Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import authStore from '../../../stores/AuthModel'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = observer(({ children }: ProtectedRouteProps) => {
  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
})

export default ProtectedRoute

