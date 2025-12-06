import { supabase, isSupabaseConfigured } from './supabase'

export type LrcInquiryStatus = "new" | "read" | "archived"

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
  status: LrcInquiryStatus
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

/**
 * Updates the status of an LRC inquiry in Supabase.
 * If Supabase is not configured, throws an error.
 * 
 * @param inquiryId - The ID of the inquiry to update
 * @param status - The new status to set (must be one of: "new", "read", "archived")
 * @throws Error if Supabase is not configured, client is not available, or the update fails
 */
export async function updateLrcInquiryStatus(
  inquiryId: string,
  status: LrcInquiryStatus
): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Cannot update inquiry status.')
  }

  if (!supabase) {
    throw new Error('Supabase client is not available')
  }

  // Validate status
  const validStatuses: LrcInquiryStatus[] = ['new', 'read', 'archived']
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status: ${status}. Must be one of: ${validStatuses.join(', ')}`)
  }

  const { error } = await supabase
    .from('lrc_inquiries')
    .update({ status })
    .eq('id', inquiryId)

  if (error) {
    throw new Error(`Failed to update LRC inquiry status: ${error.message}`)
  }
}

