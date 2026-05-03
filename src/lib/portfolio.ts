import { supabase, isSupabaseConfigured } from './supabase'

const PORTFOLIO_BUCKET = 'portfolio-images'
const TABLE = 'portfolio_items'

const MAX_IMAGE_BYTES = 10 * 1024 * 1024
const ALLOWED_IMAGE_MIME = new Set(['image/jpeg', 'image/png', 'image/webp'])

export type PortfolioCategory = 'lrc' | 'interiors' | 'web-atelier'

export interface PortfolioItem {
  id: string
  created_at: string
  updated_at: string
  title: string
  title_en: string | null
  description: string | null
  description_en: string | null
  category: PortfolioCategory
  tags: string[]
  image_url: string | null
  image_path: string | null
  image_alt: string | null
  image_alt_en: string | null
  display_order: number
  is_visible: boolean
  project_link: string | null
  client_name: string | null
  year_completed: number | null
  created_by: string | null
  updated_by: string | null
}

/** Fields accepted on create/update (caller sets `title` + `category` for create). */
export type PortfolioItemInput = {
  title?: string
  title_en?: string | null
  description?: string | null
  description_en?: string | null
  category?: PortfolioCategory
  tags?: string[]
  image_url?: string | null
  image_path?: string | null
  image_alt?: string | null
  image_alt_en?: string | null
  display_order?: number
  is_visible?: boolean
  project_link?: string | null
  client_name?: string | null
  year_completed?: number | null
}

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

function isPortfolioCategory(v: string): v is PortfolioCategory {
  return v === 'lrc' || v === 'interiors' || v === 'web-atelier'
}

/** Strip paths; keep letters, numbers, dot, hyphen, underscore; fallback "image". */
export function sanitizePortfolioFileName(name: string): string {
  const base = name.replace(/^.*[/\\]/, '')
  const cleaned = base.replace(/[^a-zA-Z0-9.\-_]/g, '_').slice(0, 180)
  return cleaned.length > 0 ? cleaned : 'image'
}

/**
 * Public portfolio: only visible rows. Uses anon key (no session required).
 * Ordered by display_order desc, then created_at desc.
 */
export async function fetchPublicPortfolioItems(): Promise<PortfolioItem[]> {
  const client = requireClient()

  const { data, error } = await client
    .from(TABLE)
    .select('*')
    .eq('is_visible', true)
    .order('display_order', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    throw formatSupabaseError('Dohvat javnog portfelja', error.message)
  }

  return (data ?? []).map(normalizePortfolioRow)
}

/**
 * Admin: all rows. Requires authenticated session (RLS).
 */
export async function fetchAdminPortfolioItems(): Promise<PortfolioItem[]> {
  const client = requireClient()
  await requireAuthUserId(client)

  const { data, error } = await client
    .from(TABLE)
    .select('*')
    .order('display_order', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    throw formatSupabaseError('Dohvat admin portfelja', error.message)
  }

  return (data ?? []).map(normalizePortfolioRow)
}

/**
 * Create row. Requires auth. Sets created_by / updated_by to current user.
 */
export async function createPortfolioItem(
  input: PortfolioItemInput & { title: string; category: PortfolioCategory }
): Promise<PortfolioItem> {
  const client = requireClient()
  const userId = await requireAuthUserId(client)

  const payload = {
    title: input.title,
    category: input.category,
    title_en: input.title_en ?? null,
    description: input.description ?? null,
    description_en: input.description_en ?? null,
    tags: input.tags ?? [],
    image_url: input.image_url ?? null,
    image_path: input.image_path ?? null,
    image_alt: input.image_alt ?? null,
    image_alt_en: input.image_alt_en ?? null,
    display_order: input.display_order ?? 0,
    is_visible: input.is_visible ?? true,
    project_link: input.project_link ?? null,
    client_name: input.client_name ?? null,
    year_completed: input.year_completed ?? null,
    created_by: userId,
    updated_by: userId,
  }

  const { data, error } = await client.from(TABLE).insert(payload).select('*').single()

  if (error) {
    throw formatSupabaseError('Stvaranje portfolio stavke', error.message)
  }

  return normalizePortfolioRow(data)
}

/**
 * Partial update. Requires auth. Sets updated_by to current user.
 */
export async function updatePortfolioItem(
  id: string,
  input: PortfolioItemInput
): Promise<PortfolioItem> {
  const client = requireClient()
  const userId = await requireAuthUserId(client)

  const patch: Record<string, unknown> = { ...input, updated_by: userId }

  Object.keys(patch).forEach((key) => {
    if (patch[key] === undefined) {
      delete patch[key]
    }
  })

  if ('category' in patch && typeof patch.category === 'string' && !isPortfolioCategory(patch.category)) {
    throw new Error('Nevažeća kategorija. Dozvoljeno: lrc, interiors, web-atelier.')
  }

  const { data, error } = await client
    .from(TABLE)
    .update(patch)
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    throw formatSupabaseError('Ažuriranje portfolio stavke', error.message)
  }

  return normalizePortfolioRow(data)
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const client = requireClient()
  await requireAuthUserId(client)

  const { error } = await client.from(TABLE).delete().eq('id', id)

  if (error) {
    throw formatSupabaseError('Brisanje portfolio stavke', error.message)
  }
}

export interface PortfolioImageUploadResult {
  publicUrl: string
  path: string
}

/**
 * Upload image to portfolio-images. Requires authenticated session.
 * Path: `{category}/{uuid}-{safeFileName}`
 */
export async function uploadPortfolioImage(
  file: File,
  category: PortfolioCategory
): Promise<PortfolioImageUploadResult> {
  const client = requireClient()
  await requireAuthUserId(client)

  if (!isPortfolioCategory(category)) {
    throw new Error('Nevažeća kategorija za upload. Koristi lrc, interiors ili web-atelier.')
  }

  const mime = (file.type || '').toLowerCase()
  if (!ALLOWED_IMAGE_MIME.has(mime)) {
    throw new Error(
      'Dopušteni formati slike su JPEG, PNG i WebP. Provjeri tip datoteke i ekstenziju.'
    )
  }

  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error('Datoteka je prevelika. Maksimalno 10 MB.')
  }

  const safe = sanitizePortfolioFileName(file.name)
  const objectPath = `${category}/${crypto.randomUUID()}-${safe}`

  const { data, error } = await client.storage
    .from(PORTFOLIO_BUCKET)
    .upload(objectPath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: mime || undefined,
    })

  if (error) {
    throw formatSupabaseError('Upload slike u portfolio-images', error.message)
  }

  const rawPath = data?.path ?? objectPath
  const normalizedPath = normalizePortfolioImageObjectPath(
    typeof rawPath === 'string' ? rawPath : objectPath
  )
  const { data: urlData } = client.storage.from(PORTFOLIO_BUCKET).getPublicUrl(normalizedPath)

  if (!urlData?.publicUrl) {
    throw new Error('Upload je uspio, ali javni URL nije dostupan. Provjeri da je bucket javan.')
  }

  return { publicUrl: urlData.publicUrl, path: normalizedPath }
}

/**
 * Canonical object key inside the portfolio-images bucket (matches storage.objects.name).
 * Strips leading slashes and accidental "portfolio-images/" prefix from older clients.
 */
export function normalizePortfolioImageObjectPath(storagePath: string): string {
  let p = storagePath.trim().replace(/^\/+/g, '')
  const prefixed = `${PORTFOLIO_BUCKET}/`
  while (p.startsWith(prefixed)) {
    p = p.slice(prefixed.length).trim().replace(/^\/+/g, '')
  }
  return p
}

/**
 * Remove object from portfolio-images bucket. Requires authenticated session.
 * Storage RLS must allow authenticated SELECT + DELETE on this bucket row (see portfolio_images_storage.sql).
 */
export async function deletePortfolioImage(storagePath: string): Promise<void> {
  const client = requireClient()
  await requireAuthUserId(client)

  const normalized = normalizePortfolioImageObjectPath(storagePath)
  if (!normalized) {
    throw new Error('Nedostaje putanja datoteke u bucketu.')
  }

  const { data: removed, error } = await client.storage
    .from(PORTFOLIO_BUCKET)
    .remove([normalized])

  if (error) {
    throw formatSupabaseError(
      'Brisanje slike iz portfolio-images',
      `${error.message} (putanja: ${JSON.stringify(normalized)})`
    )
  }

  if (!removed?.length) {
    throw formatSupabaseError(
      'Brisanje slike iz portfolio-images',
      `Ništa nije uklonjeno (prazan Storage odgovor). Putanja u bucketu: ${JSON.stringify(normalized)}. Provjeri RLS: treba politika SELECT "portfolio_images_authenticated_select" uz DELETE.`
    )
  }
}

function normalizePortfolioRow(row: Record<string, unknown>): PortfolioItem {
  const category = String(row.category ?? '')
  if (!isPortfolioCategory(category)) {
    throw new Error(`Neočekivana kategorija u bazi: ${category}`)
  }

  const tagsRaw = row.tags
  const tags = Array.isArray(tagsRaw)
    ? tagsRaw.map((t) => String(t))
    : []

  return {
    id: String(row.id),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
    title: String(row.title ?? ''),
    title_en: row.title_en != null ? String(row.title_en) : null,
    description: row.description != null ? String(row.description) : null,
    description_en: row.description_en != null ? String(row.description_en) : null,
    category,
    tags,
    image_url: row.image_url != null ? String(row.image_url) : null,
    image_path: row.image_path != null ? String(row.image_path) : null,
    image_alt: row.image_alt != null ? String(row.image_alt) : null,
    image_alt_en: row.image_alt_en != null ? String(row.image_alt_en) : null,
    display_order: Number(row.display_order ?? 0),
    is_visible: Boolean(row.is_visible),
    project_link: row.project_link != null ? String(row.project_link) : null,
    client_name: row.client_name != null ? String(row.client_name) : null,
    year_completed: (() => {
      if (row.year_completed == null || row.year_completed === '') return null
      const y = Number(row.year_completed)
      return Number.isFinite(y) ? y : null
    })(),
    created_by: row.created_by != null ? String(row.created_by) : null,
    updated_by: row.updated_by != null ? String(row.updated_by) : null,
  }
}
