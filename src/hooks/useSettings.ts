import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export interface Settings {
  id: number
  is_lrc_form_enabled: boolean
}

const DEFAULT_SETTINGS: Settings = { id: 1, is_lrc_form_enabled: true }

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSettings() {
      setIsLoading(true)
      setError(null)

      // Skip API call if Supabase is not configured
      if (!isSupabaseConfigured) {
        setSettings(DEFAULT_SETTINGS)
        setIsLoading(false)
        return
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('settings')
          .select('*')
          .eq('id', 1)
          .single()

        if (fetchError) {
          throw fetchError
        }

        setSettings(data)
      } catch (err) {
        console.error('Error fetching settings:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch settings')
        // Fallback to default settings if Supabase call fails
        setSettings(DEFAULT_SETTINGS)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  async function updateSettings(updates: Partial<Settings>) {
    setError(null)

    // Skip API call if Supabase is not configured
    if (!isSupabaseConfigured) {
      const updatedSettings = { ...DEFAULT_SETTINGS, ...updates }
      setSettings(updatedSettings)
      return { success: true, data: updatedSettings }
    }

    try {
      const { data, error: updateError } = await supabase
        .from('settings')
        .update(updates)
        .eq('id', 1)
        .select()
        .single()

      if (updateError) {
        throw updateError
      }

      setSettings(data)
      return { success: true, data }
    } catch (err) {
      console.error('Error updating settings:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to update settings'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  return {
    settings,
    isLoading,
    error,
    updateSettings,
  }
}

