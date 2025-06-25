import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

let logoutCallback: (() => void) | null = null

export function setLogoutCallback(cb: () => void) {
  logoutCallback = cb
}

export function callLogout() {
  if (logoutCallback) logoutCallback()
}

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

export const useAuth = () => useContext(AuthContext)
