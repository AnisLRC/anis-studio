import { supabase, isSupabaseConfigured } from './supabase'

// ============================================
// Union Types
// ============================================

export type LanguageCode = 'hr' | 'en'

export type UserType = 'client' | 'carpenter'

export type DrawnBy = 'ani' | 'carpenter'

export type VrLocationPreference = 'studio' | 'client_home' | 'unsure'

export type VrPackagePreference = '3d_vr' | '3d_vr_online' | 'unsure' | null

export type ProjectStatus =
  | 'inquiry'
  | '3d_in_progress'
  | '3d_done'
  | 'vr_in_progress'
  | 'vr_done'
  | 'presented'

// ============================================
// Interfaces
// ============================================

export interface Client {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  language: LanguageCode
  notes: string | null
}

export interface Carpenter {
  id: string
  created_at: string
  company_name: string
  contact_name: string
  email: string
  phone: string | null
  uses_corpus: boolean
  estimated_vr_projects_per_year: number | null
  notes: string | null
}

export interface Project {
  id: string
  created_at: string
  updated_at: string
  title: string
  user_type: UserType
  client_id: string | null
  carpenter_id: string | null
  drawn_by: DrawnBy
  uses_corpus: boolean
  wants_vr: boolean
  vr_location_preference: VrLocationPreference | null
  vr_package_preference: VrPackagePreference
  status: ProjectStatus
  space_type: string | null
  area_m2: number | null
  budget: number | null
  notes: string | null
}

export type ProjectListFilters = {
  userType?: Project["user_type"]; // 'client' | 'carpenter'
  status?: Project["status"];      // 'inquiry' | '3d_in_progress' | ...
  wantsVr?: boolean;
};

// ============================================
// Input Types
// ============================================

export type NewClientInput = Omit<Client, 'id' | 'created_at'>

export type NewCarpenterInput = Omit<Carpenter, 'id' | 'created_at'>

export type NewProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>

// ============================================
// Constants
// ============================================

const NOT_CONFIGURED_ERROR =
  '[Interiors] Supabase nije konfiguriran. Provjeri .env.local i postavke.'

// ============================================
// Helper Functions
// ============================================

/**
 * Fetches projects from Supabase with optional filtering.
 * If Supabase is not configured, returns an empty array without throwing an error.
 *
 * @param filters - Optional filters for projects (applied client-side)
 * @returns Array of projects, sorted by created_at descending (newest first)
 * @throws Error if Supabase is configured but the fetch fails
 */
export async function fetchProjects(
  filters: ProjectListFilters = {}
): Promise<Project[]> {
  if (!isSupabaseConfigured) {
    console.log("[Interiors] fetchProjects (fallback)", filters);
    // fallback za dev bez Supabase env-a
    return [];
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Interiors] fetchProjects error:", error);
    throw error;
  }

  let projects = (data ?? []) as Project[];

  const { userType, status, wantsVr } = filters;

  if (userType) {
    projects = projects.filter((p) => p.user_type === userType);
  }

  if (status) {
    projects = projects.filter((p) => p.status === status);
  }

  if (typeof wantsVr === "boolean") {
    projects = projects.filter((p) => p.wants_vr === wantsVr);
  }

  return projects;
}

/**
 * Creates a new project in Supabase.
 * If Supabase is not configured, returns a mock project with fake ID for development.
 *
 * @param payload - The project data to create (without id, created_at, updated_at)
 * @returns The created project
 * @throws Error if Supabase is configured but the creation fails
 */
export async function createProject(
  payload: NewProjectInput
): Promise<Project> {
  if (!isSupabaseConfigured || !supabase) {
    console.warn(NOT_CONFIGURED_ERROR)
    // soft-fallback za razvoj – vrati payload s fake ID-em
    return {
      ...payload,
      id: 'local-dev-id',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  const { data, error } = await supabase
    .from('projects')
    .insert(payload)
    .select('*')
    .single()

  if (error) {
    console.error('[Interiors] createProject error:', error)
    throw error
  }

  return data as Project
}

/**
 * Creates a new client in Supabase.
 * If Supabase is not configured, returns a mock client with fake ID for development.
 *
 * @param payload - The client data to create (without id, created_at)
 * @returns The created client
 * @throws Error if Supabase is configured but the creation fails
 */
export async function createClient(payload: NewClientInput): Promise<Client> {
  if (!isSupabaseConfigured || !supabase) {
    console.warn(NOT_CONFIGURED_ERROR)
    // soft-fallback za razvoj – vrati payload s fake ID-em
    return {
      ...payload,
      id: 'local-dev-id',
      created_at: new Date().toISOString(),
    }
  }

  const { data, error } = await supabase
    .from('clients')
    .insert(payload)
    .select('*')
    .single()

  if (error) {
    console.error('[Interiors] createClient error:', error)

    // 1) Je li ovo greška zbog duplikata emaila? (unique constraint)
    const code = (error as any).code
    const details = (error as any).details as string | undefined

    const isDuplicateEmail =
      code === '23505' ||
      (details && details.includes('clients_email_unique'))

    if (isDuplicateEmail) {
      // 2) Umjesto da padnemo, pokušaj dohvatiti postojećeg klijenta s tim emailom
      const { data: existing, error: fetchError } = await supabase
        .from('clients')
        .select('*')
        .eq('email', payload.email)
        .maybeSingle()

      if (fetchError) {
        console.error(
          '[Interiors] createClient fetch existing by email error:',
          fetchError
        )
        throw error // vratimo originalnu grešku ako i fetch pukne
      }

      if (existing) {
        console.info(
          '[Interiors] createClient: reusing existing client with same email'
        )
        return existing as Client
      }

      // ako je baš sve čudno i nema existinga, ipak bacimo originalnu grešku
      throw error
    }

    // 3) Sve ostale greške i dalje bacamo normalno
    throw error
  }

  return data as Client
}

/**
 * Creates a new carpenter in Supabase.
 * If Supabase is not configured, returns a mock carpenter with fake ID for development.
 *
 * @param payload - The carpenter data to create (without id, created_at)
 * @returns The created carpenter
 * @throws Error if Supabase is configured but the creation fails
 */
export async function createCarpenter(payload: NewCarpenterInput): Promise<Carpenter> {
  if (!isSupabaseConfigured || !supabase) {
    console.warn(NOT_CONFIGURED_ERROR)
    // soft-fallback za razvoj – vrati payload s fake ID-em
    return {
      ...payload,
      id: 'local-dev-id',
      created_at: new Date().toISOString(),
    }
  }

  const { data, error } = await supabase
    .from('carpenters')
    .insert(payload)
    .select('*')
    .single()

  if (error) {
    console.error('[Interiors] createCarpenter error:', error)

    // 1) Je li ovo greška zbog duplikata emaila? (unique constraint)
    const code = (error as any).code
    const details = (error as any).details as string | undefined

    const isDuplicateEmail =
      code === '23505' ||
      (details && details.includes('carpenters_email_unique'))

    if (isDuplicateEmail) {
      // 2) Umjesto da padnemo, pokušaj dohvatiti postojećeg stolara s tim emailom
      const { data: existing, error: fetchError } = await supabase
        .from('carpenters')
        .select('*')
        .eq('email', payload.email)
        .maybeSingle()

      if (fetchError) {
        console.error(
          '[Interiors] createCarpenter fetch existing by email error:',
          fetchError
        )
        throw error // vratimo originalnu grešku ako i fetch pukne
      }

      if (existing) {
        console.info(
          '[Interiors] createCarpenter: reusing existing carpenter with same email'
        )
        return existing as Carpenter
      }

      // ako je baš sve čudno i nema existinga, ipak bacimo originalnu grešku
      throw error
    }

    // 3) Sve ostale greške i dalje bacamo normalno
    throw error
  }

  return data as Carpenter
}

/**
 * Fetches all carpenters from Supabase.
 * If Supabase is not configured, returns an empty array without throwing an error.
 *
 * @returns Array of carpenters, sorted by created_at descending (newest first)
 * @throws Error if Supabase is configured but the fetch fails
 */
export async function fetchCarpenters(): Promise<Carpenter[]> {
  if (!isSupabaseConfigured || !supabase) {
    console.warn(NOT_CONFIGURED_ERROR)
    return []
  }

  const { data, error } = await supabase
    .from('carpenters')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[Interiors] fetchCarpenters error:', error)
    throw error
  }

  return (data ?? []) as Carpenter[]
}

