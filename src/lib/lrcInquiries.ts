import { supabase, isSupabaseConfigured } from './supabase'

export interface LrcInquiryPayload {
  product: string
  description: string
  name: string
  email: string
  phone?: string
  language: 'hr' | 'en'
}

export interface LrcInquiry {
  id: string
  created_at: string
  product: string
  description: string
  name: string
  email: string
  phone: string | null
  language: string
  source: string
  status: string
}

/**
 * Submits an LRC inquiry to Supabase.
 * If Supabase is not configured, falls back to console.log without throwing an error.
 * 
 * @param payload - The inquiry data to submit
 * @throws Error if Supabase is configured but the submission fails
 */
export async function submitLrcInquiry(payload: LrcInquiryPayload): Promise<void> {
  if (!isSupabaseConfigured) {
    console.warn('[LRC Inquiry] Supabase is not configured. Falling back to console.log.')
    console.log('[LRC Inquiry] Payload:', payload)
    return
  }

  if (!supabase) {
    throw new Error('Supabase client is not available')
  }

  const { error } = await supabase
    .from('lrc_inquiries')
    .insert([
      {
        product: payload.product,
        description: payload.description,
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        language: payload.language,
        source: 'web',
        status: 'new'
      }
    ])

  if (error) {
    throw new Error(`Failed to submit LRC inquiry: ${error.message}`)
  }
}

/**
 * Fetches all LRC inquiries from Supabase.
 * If Supabase is not configured, returns an empty array without throwing an error.
 * 
 * @returns Array of LRC inquiries, sorted by created_at descending (newest first)
 * @throws Error if Supabase is configured but the fetch fails
 */
export async function fetchLrcInquiries(): Promise<LrcInquiry[]> {
  if (!isSupabaseConfigured) {
    return []
  }

  if (!supabase) {
    throw new Error('Supabase client is not available')
  }

  const { data, error } = await supabase
    .from('lrc_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as LrcInquiry[]
}

