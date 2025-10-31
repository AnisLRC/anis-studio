import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Učitaj user iz localStorage pri inicijalizaciji
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('auth_user')
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch {
          localStorage.removeItem('auth_user')
        }
      }
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // TODO: Zamijeniti sa stvarnim API pozivom
      // Simulacija API poziva
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock user data - u produkciji bi ovo došlo od backend-a
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0]
      }
      
      setUser(mockUser)
      localStorage.setItem('auth_user', JSON.stringify(mockUser))
      localStorage.setItem('auth_token', 'mock_token_' + Date.now())
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // TODO: Zamijeniti sa stvarnim API pozivom
      // Simulacija API poziva
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data - u produkciji bi ovo došlo od backend-a
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name
      }
      
      setUser(mockUser)
      localStorage.setItem('auth_user', JSON.stringify(mockUser))
      localStorage.setItem('auth_token', 'mock_token_' + Date.now())
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

