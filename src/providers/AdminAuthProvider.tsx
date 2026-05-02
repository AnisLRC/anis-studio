import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export interface AdminLoginResult {
  success: boolean
  error?: string
}

interface AdminAuthContextValue {
  session: Session | null
  user: User | null
  isAdmin: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<AdminLoginResult>
  logout: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined)

function mapAuthErrorMessage(message: string | undefined): string {
  const m = message?.toLowerCase() ?? ''
  if (
    m.includes('invalid login credentials') ||
    m.includes('invalid email or password')
  ) {
    return 'Neispravna e-pošta ili lozinka.'
  }
  if (m.includes('email not confirmed')) {
    return 'Potvrdite adresu e-pošte prije prijave.'
  }
  return 'Prijava nije uspjela. Pokušajte ponovo.'
}

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) {
      setSession(null)
      setLoading(false)
      return
    }

    let cancelled = false

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return
      setSession(data.session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<AdminLoginResult> => {
    if (!supabase || !isSupabaseConfigured) {
      return {
        success: false,
        error:
          'Supabase nije konfiguriran. Provjerite VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY u .env.',
      }
    }

    const trimmedEmail = email.trim()
    if (!trimmedEmail || !password) {
      return { success: false, error: 'Unesite e-poštu i lozinku.' }
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    })

    if (error) {
      return { success: false, error: mapAuthErrorMessage(error.message) }
    }

    return { success: true }
  }, [])

  const logout = useCallback(async (): Promise<void> => {
    if (!supabase || !isSupabaseConfigured) {
      setSession(null)
      return
    }

    // Immediate UI teardown so AdminRoute redirects before persistence finishes flushing
    setSession(null)

    await supabase.auth.signOut({ scope: 'global' })

    const { data } = await supabase.auth.getSession()
    setSession(data.session ?? null)
  }, [])

  const value = useMemo<AdminAuthContextValue>(() => {
    const user = session?.user ?? null
    const isAdmin = Boolean(session?.user)

    return {
      session,
      user,
      isAdmin,
      loading,
      login,
      logout,
    }
  }, [session, loading, login, logout])

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  )
}

export const useAdminAuth = (): AdminAuthContextValue => {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}
