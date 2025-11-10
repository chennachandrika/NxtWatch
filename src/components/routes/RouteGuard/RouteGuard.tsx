import { Navigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import authStore from '../../../stores/AuthModel'

interface RouteGuardProps {
  children: React.ReactNode
  protected?: boolean // If true, requires auth. If false/undefined, public route
}

interface LocationState {
  from?: {
    pathname: string
  }
}

const RouteGuard = observer(({ children, protected: isProtected = false }: RouteGuardProps) => {
  const location = useLocation()
  const isAuthenticated = authStore.isAuthenticated

  // Protected route: requires authentication
  if (isProtected) {
    if (!isAuthenticated) {
      // Save the attempted location to redirect after login
      return <Navigate to="/login" state={{ from: location }} replace />
    }
    return <>{children}</>
  }

  // Public route: should NOT be accessible when authenticated
  if (isAuthenticated) {
    // If there's a 'from' state, redirect there, otherwise go to home
    const state = location.state as LocationState | null
    const from = state?.from
    return <Navigate to={from?.pathname || '/'} replace />
  }

  return <>{children}</>
})

export default RouteGuard

