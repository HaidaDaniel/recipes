import { Navigate, Outlet } from '@tanstack/react-router'
import { useAuth } from '../context/AppContext'
import { ROUTES } from '../router'

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} />
  }

  return <Outlet />
}
