import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [advocate, setAdvocate] = useState(null)
  const [loading, setLoading]   = useState(true)

  // On app load, check if token exists and is still valid
  useEffect(() => {
    const token = localStorage.getItem('lexdesk_token')
    if (!token) { setLoading(false); return }

    authAPI.me()
      .then(data => setAdvocate(data))
      .catch(() => localStorage.removeItem('lexdesk_token'))
      .finally(() => setLoading(false))
  }, [])

  async function login(email, password) {
    const data = await authAPI.login({ email, password })
    localStorage.setItem('lexdesk_token', data.token)
    setAdvocate(data.advocate)
  }

  function logout() {
    localStorage.removeItem('lexdesk_token')
    setAdvocate(null)
  }

  return (
    <AuthContext.Provider value={{ advocate, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}