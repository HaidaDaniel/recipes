import { Navigate, Outlet } from '@tanstack/react-router'
import { useAuth } from '../context/AppContext'

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}
