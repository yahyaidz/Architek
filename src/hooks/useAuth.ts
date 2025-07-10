// src/hooks/useAuth.ts
import { useState, useEffect, createContext, useContext } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  loading: boolean
  login: (password: string) => Promise< boolean >
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const useAuthProvider = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Mot de passe admin (à changer selon vos besoins)
  const ADMIN_PASSWORD = 'Architek2025!'

  useEffect(() => {
    // Vérifier si déjà connecté (stocké dans localStorage)
    const authStatus = localStorage.getItem('admin_authenticated')
    const authTime = localStorage.getItem('admin_auth_time')
    
    if (authStatus === 'true' && authTime) {
      const authTimestamp = parseInt(authTime)
      const now = Date.now()
      const EIGHT_HOURS = 8 * 60 * 60 * 1000 // 8 heures en millisecondes
      
      // Vérifier si la session n'a pas expiré (8 heures)
      if (now - authTimestamp < EIGHT_HOURS) {
        setIsAuthenticated(true)
      } else {
        // Session expirée, nettoyer
        localStorage.removeItem('admin_authenticated')
        localStorage.removeItem('admin_auth_time')
      }
    }
    
    setLoading(false)
  }, [])

  const login = async (password: string): Promise< boolean > => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('admin_authenticated', 'true')
      localStorage.setItem('admin_auth_time', Date.now().toString())
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_auth_time')
  }

  return {
    isAuthenticated,
    loading,
    login,
    logout
  }
}

export { AuthContext }
