import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

import { setLogoutCallback } from './auth-utils'
import { OpenAPI } from '../api/generated'

export const LocalStorageKeyName = 'token' as const

const AuthContext = createContext<{
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}>({
  isAuthenticated: false,
  login: () => { },
  logout: () => { },
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuth] = useState(false)

  useEffect(() => {
    setAuth(!!localStorage.getItem(LocalStorageKeyName))
  }, [])

  const login = (token: string) => {
    localStorage.setItem(LocalStorageKeyName, token)
    OpenAPI.TOKEN = localStorage.getItem(LocalStorageKeyName) ?? ''
    setAuth(true)
  }

  const logout = () => {
    localStorage.removeItem(LocalStorageKeyName)
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

export const useAuth = () => useContext(AuthContext)
