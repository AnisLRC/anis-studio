import { supabase, isSupabaseConfigured } from './supabase'

export interface ContactInquiryPayload {
  name: string
  email: string
  message: string
  language: 'hr' | 'en'
}

/**
 * Submits a contact inquiry to Supabase (reuses lrc_inquiries table with source='contact').
 * If Supabase is not configured, falls back to console.log without throwing an error.
 * 
 * @param payload - The contact inquiry data to submit
 * @throws Error if Supabase is configured but the submission fails
 */
export async function submitContactInquiry(payload: ContactInquiryPayload): Promise<void> {
  if (!isSupabaseConfigured) {
    console.warn('[Contact Inquiry] Supabase is not configured. Falling back to console.log.')
    console.log('[Contact Inquiry] Payload:', payload)
    return
  }

  if (!supabase) {
    throw new Error('Supabase client is not available')
  }

  const { error } = await supabase
    .from('lrc_inquiries')
    .insert([
      {
        name: payload.name,
        email: payload.email,
        phone: null, // Contact form doesn't have phone field
        product: 'N/A', // Not applicable for contact inquiries
        description: payload.message,
        language: payload.language,
        source: 'contact',
        status: 'new'
      }
    ])

  if (error) {
    throw new Error(`Failed to submit contact inquiry: ${error.message}`)
  }
}
