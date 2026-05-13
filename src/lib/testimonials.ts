import type { Testimonial } from '../data/testimonials'
import { supabase, isSupabaseConfigured } from './supabase'

const TABLE = 'testimonial_submissions'

// ============================================
// Types
// ============================================

export type TestimonialSubmissionStatus = 'pending' | 'approved' | 'rejected'

export type TestimonialSubmissionCategory = 'general' | 'interiors' | 'lrc' | 'webAtelier'

export type NameDisplayPreference = 'full_name' | 'first_name_only' | 'initials' | 'anonymous'

export interface TestimonialSubmission {
  id: string
  created_at: string
  updated_at: string
  status: TestimonialSubmissionStatus
  category: TestimonialSubmissionCategory
  original_text: string
  edited_text: string | null
  submitted_name: string
  name_display_preference: NameDisplayPreference
  public_display_name: string | null
  email: string
  location_display: string | null
  admin_note: string | null
  consent_public: boolean
  approved_at: string | null
  approved_by: string | null
  rating: number | null
}

/**
 * Input for public client submit.
 * `consent_public` must be explicitly `true` — the type enforces this at compile time.
 */
export interface CreateTestimonialSubmissionInput {
  category: TestimonialSubmissionCategory
  original_text: string
  submitted_name: string
  name_display_preference?: NameDisplayPreference
  email: string
  location_display?: string | null
  rating?: number | null
  /** Must be true. The RLS policy and this function both enforce it. */
  consent_public: true
}

/**
 * Input for admin moderation updates (approve, reject, edit public version).
 * All fields are optional — only provided fields are patched.
 */
export interface UpdateTestimonialSubmissionInput {
  status?: TestimonialSubmissionStatus
  category?: TestimonialSubmissionCategory
  edited_text?: string | null
  public_display_name?: string | null
  admin_note?: string | null
}

/**
 * Javno ime za prikaz iz klijentovog imena i preference (bez AI).
 * Za prazno ime: `anonymous` → "Anonimno"; ostale opcije → "" (nema smislenog prikaza).
 */
export function derivePublicDisplayName(
  submittedName: string,
  preference: NameDisplayPreference
): string {
  const t = submittedName.trim()

  if (preference === 'anonymous') {
    return 'Anonimno'
  }

  if (!t) {
    return ''
  }

  switch (preference) {
    case 'full_name':
      return t
    case 'first_name_only': {
      const parts = t.split(/\s+/).filter(Boolean)
      return parts[0] ?? ''
    }
    case 'initials': {
      const parts = t.split(/\s+/).filter(Boolean)
      if (parts.length === 0) return ''
      return parts
        .map((p) => p[0]?.toUpperCase())
        .filter(Boolean)
        .map((c) => `${c}.`)
        .join(' ')
    }
    default:
      return t
  }
}

// ============================================
// Internal helpers (mirrors pattern from portfolio.ts)
// ============================================

function requireClient(): NonNullable<typeof supabase> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      'Supabase nije konfiguriran. Postavi VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY.'
    )
  }
  return supabase
}

function formatSupabaseError(context: string, message: string): Error {
  return new Error(`${context}: ${message}`)
}

async function requireAuthUserId(client: ReturnType<typeof requireClient>): Promise<string> {
  const {
    data: { user },
    error,
  } = await client.auth.getUser()

  if (error) {
    throw formatSupabaseError('Autentikacija', error.message)
  }
  if (!user) {
    throw new Error('Morate biti prijavljeni za tu radnju.')
  }
  return user.id
}

function isValidStatus(v: string): v is TestimonialSubmissionStatus {
  return v === 'pending' || v === 'approved' || v === 'rejected'
}

function isValidCategory(v: string): v is TestimonialSubmissionCategory {
  return v === 'general' || v === 'interiors' || v === 'lrc' || v === 'webAtelier'
}

function isValidNameDisplayPreference(v: string): v is NameDisplayPreference {
  return (
    v === 'full_name' || v === 'first_name_only' || v === 'initials' || v === 'anonymous'
  )
}

function normalizeSubmissionRow(row: Record<string, unknown>): TestimonialSubmission {
  const status = String(row.status ?? '')
  if (!isValidStatus(status)) {
    throw new Error(`Neočekivani status u bazi: ${status}`)
  }

  const category = String(row.category ?? '')
  if (!isValidCategory(category)) {
    throw new Error(`Neočekivana kategorija u bazi: ${category}`)
  }

  const pref = String(row.name_display_preference ?? 'first_name_only')
  const name_display_preference = isValidNameDisplayPreference(pref) ? pref : 'first_name_only'

  const ratingRaw = row.rating
  const rating =
    ratingRaw == null || ratingRaw === ''
      ? null
      : (() => {
          const n = Number(ratingRaw)
          return Number.isFinite(n) ? n : null
        })()

  return {
    id: String(row.id),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
    status,
    category,
    original_text: String(row.original_text ?? ''),
    edited_text: row.edited_text != null ? String(row.edited_text) : null,
    submitted_name: String(row.submitted_name ?? ''),
    name_display_preference,
    public_display_name: row.public_display_name != null ? String(row.public_display_name) : null,
    email: String(row.email ?? ''),
    location_display: row.location_display != null ? String(row.location_display) : null,
    admin_note: row.admin_note != null ? String(row.admin_note) : null,
    consent_public: Boolean(row.consent_public),
    approved_at: row.approved_at != null ? String(row.approved_at) : null,
    approved_by: row.approved_by != null ? String(row.approved_by) : null,
    rating,
  }
}

// ============================================
// Public functions
// ============================================

/**
 * Submit a new review from a public (unauthenticated) client.
 *
 * Always sets `status: 'pending'`. The `consent_public` field must be `true`
 * (enforced both by this function and the DB RLS policy).
 *
 * Does not require authentication — uses the anon Supabase key.
 */
export async function createTestimonialSubmission(
  input: CreateTestimonialSubmissionInput
): Promise<void> {
  const client = requireClient()

  const originalTrim = input.original_text.trim()
  if (!originalTrim) {
    throw new Error('Tekst recenzije ne smije biti prazan.')
  }

  const nameTrim = input.submitted_name.trim()
  if (!nameTrim) {
    throw new Error('Ime ne smije biti prazno.')
  }

  const emailTrim = input.email.trim()
  if (!emailTrim) {
    throw new Error('Email ne smije biti prazan.')
  }

  if (!isValidCategory(input.category)) {
    throw new Error('Nevažeća kategorija.')
  }

  const rawPref = input.name_display_preference ?? 'first_name_only'
  const namePreference: NameDisplayPreference = isValidNameDisplayPreference(rawPref)
    ? rawPref
    : 'first_name_only'

  const derivedDisplay = derivePublicDisplayName(nameTrim, namePreference).trim()

  const ratingSafe: number | null =
    input.rating != null &&
    Number.isFinite(input.rating) &&
    input.rating >= 1 &&
    input.rating <= 5
      ? input.rating
      : null

  type PublicInsert = {
    status: 'pending'
    category: TestimonialSubmissionCategory
    original_text: string
    submitted_name: string
    name_display_preference: NameDisplayPreference
    email: string
    location_display: string | null
    consent_public: true
    rating: number | null
    public_display_name?: string
  }

  const row: PublicInsert = {
    status: 'pending',
    category: input.category,
    original_text: originalTrim,
    submitted_name: nameTrim,
    name_display_preference: namePreference,
    email: emailTrim,
    location_display: input.location_display?.trim() || null,
    consent_public: true,
    rating: ratingSafe,
  }

  if (derivedDisplay !== '') {
    row.public_display_name = derivedDisplay
  }

  const { error } = await client.from(TABLE).insert([row])

  if (error) {
    throw formatSupabaseError('Slanje recenzije', error.message)
  }
}

/**
 * RPC response tip za javno sigurne approved recenzije.
 * Ne sadrži PII polja (email, submitted_name, admin_note, approved_by).
 */
export interface PublicApprovedTestimonialRPC {
  id: string
  created_at: string
  category: TestimonialSubmissionCategory
  text_to_display: string
  public_display_name: string
  location_display: string | null
  rating: number | null
}

/**
 * Dohvat samo odobrenih recenzija za javni prikaz (anon ključ).
 * Koristi SECURITY DEFINER RPC koji zaobilazi RLS i vraća samo javno sigurna polja.
 * Pending i rejected recenzije se nikad ne vraćaju (filtrirano u RPC-u).
 *
 * PII polja (email, submitted_name, admin_note, approved_by) se ne vraćaju iz RPC-a.
 */
export async function fetchApprovedTestimonialSubmissionsPublic(): Promise<TestimonialSubmission[]> {
  const client = requireClient()

  const { data, error } = await client
    .rpc('get_public_approved_testimonials')

  if (error) {
    throw formatSupabaseError('Dohvat odobrenih recenzija', error.message)
  }

  // Mapiramo RPC response u TestimonialSubmission shape.
  // RPC već resolvea edited_text vs original_text u text_to_display.
  // RPC već resolvea public_display_name s 'Anonimno' fallbackom.
  const out: TestimonialSubmission[] = []
  for (const row of (data ?? []) as PublicApprovedTestimonialRPC[]) {
    try {
      if (!isValidCategory(row.category)) {
        continue
      }

      const ratingNum =
        row.rating != null && typeof row.rating === 'number' && Number.isFinite(row.rating)
          ? row.rating
          : null
      const ratingSafe =
        ratingNum !== null && ratingNum >= 1 && ratingNum <= 5 ? Math.round(ratingNum) : null

      const submission: TestimonialSubmission = {
        id: String(row.id),
        created_at: String(row.created_at),
        updated_at: String(row.created_at), // RPC ne vraća updated_at; koristi created_at
        status: 'approved', // Hardkodirano jer RPC vraća samo approved
        category: row.category,
        original_text: String(row.text_to_display), // RPC već resolvea edited vs original
        edited_text: null, // RPC već resolvea u text_to_display; frontend ne treba logiku
        submitted_name: '', // Ne vraća se iz RPC-a (PII)
        name_display_preference: 'full_name', // Placeholder; nije relevantan za approved prikaz
        public_display_name: row.public_display_name || null,
        email: '', // Ne vraća se iz RPC-a (PII)
        location_display: row.location_display || null,
        admin_note: null, // Ne vraća se iz RPC-a (interno)
        consent_public: true, // Uvijek true za approved
        approved_at: null, // RPC ne vraća; nije potreban za display
        approved_by: null, // Ne vraća se iz RPC-a (interno)
        rating: ratingSafe,
      }

      out.push(submission)
    } catch {
      /* preskoči neispravan red */
    }
  }
  return out
}

const PUBLIC_DB_TESTIMONIAL_ID_BASE = 10_000

/** Mapira odobrenu recenziju iz baze na oblik koji koristi TestimonialsSection / marquee. */
export function mapApprovedSubmissionToTestimonial(
  row: TestimonialSubmission,
  ordinal: number
): Testimonial {
  const textBody = (row.edited_text?.trim() || row.original_text.trim()) || ''
  const nameRaw = row.public_display_name?.trim()
  const name = nameRaw && nameRaw.length > 0 ? nameRaw : 'Anonimno'

  const locRaw = row.location_display?.trim()
  const location = locRaw
    ? { hr: locRaw, en: locRaw }
    : { hr: '', en: '' }

  const testimonial: Testimonial = {
    id: PUBLIC_DB_TESTIMONIAL_ID_BASE + ordinal,
    name,
    location,
    category: row.category,
    text: { hr: textBody, en: textBody },
  }

  if (
    row.rating != null &&
    Number.isFinite(row.rating) &&
    row.rating >= 1 &&
    row.rating <= 5
  ) {
    testimonial.rating = row.rating
  }

  return testimonial
}

/**
 * Fetch testimonial submissions. Requires authenticated session (admin).
 *
 * @param status - Optional filter: 'pending' | 'approved' | 'rejected'.
 *                 If omitted, returns all statuses ordered by created_at desc.
 */
export async function fetchTestimonialSubmissions(
  status?: TestimonialSubmissionStatus
): Promise<TestimonialSubmission[]> {
  const client = requireClient()
  await requireAuthUserId(client)

  let query = client
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    throw formatSupabaseError('Dohvat recenzija', error.message)
  }

  return (data ?? []).map((row) => normalizeSubmissionRow(row as Record<string, unknown>))
}

/**
 * Partial update of a testimonial submission. Requires authenticated session (admin).
 *
 * When `status` is set to `'approved'`, `approved_at` and `approved_by` are
 * automatically set to the current timestamp and the authenticated user's ID.
 */
export async function updateTestimonialSubmission(
  id: string,
  input: UpdateTestimonialSubmissionInput
): Promise<TestimonialSubmission> {
  const client = requireClient()
  const userId = await requireAuthUserId(client)

  const patch: Record<string, unknown> = {}

  if (input.status !== undefined) {
    if (!isValidStatus(input.status)) {
      throw new Error('Nevažeći status. Dozvoljeno: pending, approved, rejected.')
    }
    patch.status = input.status

    if (input.status === 'approved') {
      patch.approved_at = new Date().toISOString()
      patch.approved_by = userId
    }
  }

  if (input.category !== undefined) {
    if (!isValidCategory(input.category)) {
      throw new Error('Nevažeća kategorija.')
    }
    patch.category = input.category
  }

  if ('edited_text' in input) {
    patch.edited_text = input.edited_text?.trim() || null
  }

  if ('public_display_name' in input) {
    patch.public_display_name = input.public_display_name?.trim() || null
  }

  if ('admin_note' in input) {
    patch.admin_note = input.admin_note?.trim() || null
  }

  const { data, error } = await client
    .from(TABLE)
    .update(patch)
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    throw formatSupabaseError('Ažuriranje recenzije', error.message)
  }

  return normalizeSubmissionRow(data as Record<string, unknown>)
}

/**
 * Permanently delete a rejected submission row. Requires authenticated session (admin).
 *
 * Only rows with `status = 'rejected'` are deleted (enforced in the query and by RLS).
 */
export async function deleteTestimonialSubmission(id: string): Promise<void> {
  const client = requireClient()
  await requireAuthUserId(client)

  const { data, error } = await client
    .from(TABLE)
    .delete()
    .eq('id', id)
    .eq('status', 'rejected')
    .select('id')
    .maybeSingle()

  if (error) {
    throw formatSupabaseError('Brisanje recenzije', error.message)
  }
  if (!data) {
    throw new Error('Brisanje nije moguće: recenzija nije odbijena ili ne postoji.')
  }
}
