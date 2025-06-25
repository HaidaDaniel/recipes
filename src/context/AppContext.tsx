import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

import { setLogoutCallback } from './auth-utils'
import { OpenAPI } from '../api/generated'

const AuthContext = createContext<{
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuth] = useState(false)

  useEffect(() => {
    setAuth(!!localStorage.getItem('token'))
  }, [])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    OpenAPI.TOKEN = localStorage.getItem('token') ?? ''
    setAuth(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setAuth(false)
  }

  useEffect(() => {
    setLogoutCallback(logout)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
