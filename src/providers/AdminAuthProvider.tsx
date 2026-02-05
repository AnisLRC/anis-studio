import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface AdminAuthContextValue {
  isAdmin: boolean
  login: (password: string) => Promise<boolean>
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined)

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'anis-admin-2025'
const STORAGE_KEY = 'anis_admin_is_admin'

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    }
    return false
  })

  const login = async (password: string): Promise<boolean> => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, 'true')
      }
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <AdminAuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = (): AdminAuthContextValue => {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}


