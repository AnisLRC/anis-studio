import { supabase, isSupabaseConfigured } from './supabase'

// ============================================
// Union Types
// ============================================

export type LanguageCode = 'hr' | 'en'

export type UserType = 'client' | 'carpenter'

export type DrawnBy = 'ani' | 'carpenter'

export type VrLocationPreference = 'studio' | 'client_home' | 'unsure'

export type VrPackagePreference = '3d_vr' | '3d_vr_online' | 'unsure' | null

export type VrSceneType = 'simlab_package' | 'webxr_scene' | 'video_tour' | 'image_gallery' | 'other'

export type VrAppointmentLocationPreference = 'studio' | 'client_home' | 'online' | 'other'

export type VrAppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show'

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

export type ProjectFileType =
  | "plan"
  | "inspiration"
  | "space_photo"
  | "kitchen_sketch"
  | "carpenter_3d_export"
  | "vr_asset"
  | "other"

export interface ProjectFile {
  id: string
  project_id: string
  created_at: string

  file_type: ProjectFileType

  storage_bucket: string
  storage_path: string

  original_name: string
  mime_type: string | null
  size_bytes: number | null

  notes: string | null
}

export interface VrScene {
  id: string
  project_id: string
  scene_type: VrSceneType
  title: string
  description: string | null
  simlab_project_url: string | null
  webxr_url: string | null
  video_url: string | null
  cover_image_url: string | null
  storage_bucket: string | null
  storage_path: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface VrAppointment {
  id: string
  vr_scene_id: string
  scheduled_at: string
  location_preference: VrAppointmentLocationPreference | null
  status: VrAppointmentStatus
  client_name: string | null
  client_email: string | null
  client_phone: string | null
  notes: string | null
  created_at: string
  updated_at: string
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

export type NewProjectFileInput = {
  project_id: string
  file_type: ProjectFileType
  storage_bucket: string
  storage_path: string
  original_name: string
  mime_type?: string | null
  size_bytes?: number | null
  notes?: string | null
}

export interface NewVrSceneInput {
  project_id: string
  scene_type: VrSceneType
  title: string
  description?: string | null
  simlab_project_url?: string | null
  webxr_url?: string | null
  video_url?: string | null
  cover_image_url?: string | null
  storage_bucket?: string | null
  storage_path?: string | null
  notes?: string | null
}

export interface NewVrAppointmentInput {
  vr_scene_id: string
  scheduled_at: string
  location_preference?: VrAppointmentLocationPreference | null
  status: VrAppointmentStatus
  client_name?: string | null
  client_email?: string | null
  client_phone?: string | null
  notes?: string | null
}

// ============================================
// Constants
// ============================================

const NOT_CONFIGURED_ERROR =
  '[Interiors] Supabase nije konfiguriran. Provjeri .env.local i postavke.'

const PROJECT_FILES_BUCKET = "project-files"; // TODO: kreiraj ovaj bucket u Supabase Storage

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

  const { data, error } = await supabase!
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
 * Fetches a single project by ID from Supabase.
 * If Supabase is not configured, returns null without throwing an error.
 *
 * @param id - The project ID to fetch
 * @returns The project if found, or null if not found
 * @throws Error if Supabase is configured but the fetch fails
 */
export async function fetchProjectById(id: string): Promise<Project | null> {
  if (!isSupabaseConfigured) {
    console.log("[Interiors] fetchProjectById (fallback)", id);
    return null;
  }

  const { data, error } = await supabase!
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[Interiors] fetchProjectById error:", error);
    throw error;
  }

  return (data as Project) ?? null;
}

/**
 * Fetches a single client by ID from Supabase.
 * If Supabase is not configured, returns null without throwing an error.
 *
 * @param id - The client ID to fetch
 * @returns The client if found, or null if not found
 * @throws Error if Supabase is configured but the fetch fails
 */
export async function fetchClientById(id: string): Promise<Client | null> {
  if (!isSupabaseConfigured) {
    console.log("[Interiors] fetchClientById (fallback)", id);
    return null;
  }

  const { data, error } = await supabase!
    .from("clients")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[Interiors] fetchClientById error:", error);
    throw error;
  }

  return (data as Client) ?? null;
}

/**
 * Fetches a single carpenter by ID from Supabase.
 * If Supabase is not configured, returns null without throwing an error.
 *
 * @param id - The carpenter ID to fetch
 * @returns The carpenter if found, or null if not found
 * @throws Error if Supabase is configured but the fetch fails
 */
export async function fetchCarpenterById(id: string): Promise<Carpenter | null> {
  if (!isSupabaseConfigured) {
    console.log("[Interiors] fetchCarpenterById (fallback)", id);
    return null;
  }

  const { data, error } = await supabase!
    .from("carpenters")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[Interiors] fetchCarpenterById error:", error);
    throw error;
  }

  return (data as Carpenter) ?? null;
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

  const { data, error } = await supabase!
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
 * Updates the status of a project in Supabase.
 * If Supabase is not configured, returns a mock project with the updated status for development.
 *
 * @param projectId - The ID of the project to update
 * @param status - The new status to set
 * @returns The updated project
 * @throws Error if Supabase is configured but the update fails
 */
export async function updateProjectStatus(
  projectId: string,
  status: Project["status"]
): Promise<Project> {
  if (!isSupabaseConfigured || !supabase) {
    console.log('[Interiors] updateProjectStatus (fallback)', { projectId, status })
    // fallback za dev bez Supabase env-a
    const now = new Date().toISOString()
    return {
      id: projectId,
      created_at: now,
      updated_at: now,
      title: '',
      user_type: 'client',
      client_id: null,
      carpenter_id: null,
      drawn_by: 'ani',
      uses_corpus: false,
      wants_vr: false,
      vr_location_preference: null,
      vr_package_preference: null,
      status: status,
      space_type: null,
      area_m2: null,
      budget: null,
      notes: null,
    }
  }

  const { data, error } = await supabase!
    .from('projects')
    .update({
      status: status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', projectId)
    .select('*')
    .single()

  if (error) {
    console.error('[Interiors] updateProjectStatus error:', error)
    throw error
  }

  return data as Project
}

/**
 * Creates a new client in Supabase.
 * If Supabase is not configured, returns a mock client with fake ID for development.
 * If a client with the same email already exists, returns the existing client.
 *
 * @param input - The client data to create (without id, created_at)
 * @returns The created or existing client
 * @throws Error if Supabase is configured but the operation fails
 */
export async function createClient(input: {
  name: string
  email: string
  phone: string | null
  language: string
  notes: string | null
}): Promise<Client> {
  if (!isSupabaseConfigured) {
    console.log('[Interiors] createClient (fallback)', input)

    const now = new Date().toISOString()

    return {
      id: 'fallback-client',
      created_at: now,
      name: input.name,
      email: input.email,
      phone: input.phone,
      language: input.language as Client['language'],
      notes: input.notes,
    }
  }

  // 1) prvo provjeri postoji li već klijent s ovim emailom
  const {
    data: existing,
    error: selectError,
  } = await supabase!
    .from('clients')
    .select('*')
    .eq('email', input.email)
    .maybeSingle()

  if (selectError) {
    console.error('[Interiors] createClient select error:', selectError)
    throw selectError
  }

  if (existing) {
    console.log(
      '[Interiors] createClient: reusing existing client with same email'
    )
    return existing as Client
  }

  // 2) ako ne postoji → normalan insert
  const { data, error } = await supabase!
    .from('clients')
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone,
      language: input.language,
      notes: input.notes,
    })
    .select('*')
    .single()

  if (error) {
    console.error('[Interiors] createClient insert error:', error)
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

  const { data, error } = await supabase!
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
      const { data: existing, error: fetchError } = await supabase!
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

  const { data, error } = await supabase!
    .from('carpenters')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[Interiors] fetchCarpenters error:', error)
    throw error
  }

  return (data ?? []) as Carpenter[]
}

/**
 * Creates a new project file record in Supabase.
 * If Supabase is not configured, returns a mock project file with fake ID for development.
 *
 * @param input - The project file data to create
 * @returns The created project file
 * @throws Error if Supabase is configured but the creation fails
 */
export async function createProjectFile(
  input: NewProjectFileInput
): Promise<ProjectFile> {
  if (!isSupabaseConfigured) {
    console.log("[Interiors] createProjectFile (fallback)", input)

    const now = new Date().toISOString()

    return {
      id: "fallback-project-file",
      created_at: now,
      project_id: input.project_id,
      file_type: input.file_type,
      storage_bucket: input.storage_bucket,
      storage_path: input.storage_path,
      original_name: input.original_name,
      mime_type: input.mime_type ?? null,
      size_bytes: input.size_bytes ?? null,
      notes: input.notes ?? null,
    }
  }

  const { data, error } = await supabase!
    .from("project_files")
    .insert({
      project_id: input.project_id,
      file_type: input.file_type,
      storage_bucket: input.storage_bucket,
      storage_path: input.storage_path,
      original_name: input.original_name,
      mime_type: input.mime_type ?? null,
      size_bytes: input.size_bytes ?? null,
      notes: input.notes ?? null,
    })
    .select("*")
    .single()

  if (error) {
    console.error("[Interiors] createProjectFile error:", error)
    throw error
  }

  return data as ProjectFile
}

/**
 * Fetches all project files for a specific project from Supabase.
 * If Supabase is not configured, returns an empty array without throwing an error.
 *
 * @param projectId - The project ID to fetch files for
 * @returns Array of project files, sorted by created_at ascending (oldest first)
 * @throws Error if Supabase is configured but the fetch fails
 */
export async function fetchProjectFilesForProject(
  projectId: string
): Promise<ProjectFile[]> {
  if (!isSupabaseConfigured) {
    console.log("[Interiors] fetchProjectFilesForProject (fallback)", projectId)
    return []
  }

  const { data, error } = await supabase!
    .from("project_files")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("[Interiors] fetchProjectFilesForProject error:", error)
    throw error
  }

  return (data ?? []) as ProjectFile[]
}

/**
 * Uploads a file to Supabase Storage and creates a project file record.
 * If Supabase is not configured, returns null without throwing an error.
 *
 * @param projectId - The project ID to associate the file with
 * @param file - The file to upload
 * @param fileType - The type of file (plan, inspiration, etc.)
 * @returns The created project file record, or null if Supabase is not configured
 * @throws Error if Supabase is configured but the upload or creation fails
 */
export async function uploadProjectFileToStorage(
  projectId: string,
  file: File,
  fileType: ProjectFileType
): Promise<ProjectFile | null> {
  if (!isSupabaseConfigured) {
    console.log("[Interiors] uploadProjectFileToStorage (fallback)", {
      projectId,
      fileName: file.name,
      fileType,
    })

    // u dev okruženju bez Supabase-a samo preskačemo upload
    return null
  }

  // malo čišćenje imena datoteke za path
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_\u0100-\u017F]/g, "_")
  const timestamp = Date.now()
  const random = Math.random().toString(36).slice(2, 8)
  const path = `${projectId}/${timestamp}-${random}-${safeName}`

  // 1) Upload u Storage
  const { data: uploadData, error: uploadError } = await supabase!.storage
    .from(PROJECT_FILES_BUCKET)
    .upload(path, file)

  if (uploadError) {
    console.error(
      "[Interiors] uploadProjectFileToStorage upload error:",
      uploadError
    )
    throw uploadError
  }

  const storagePath = uploadData?.path ?? path

  // 2) Zapis u project_files tablicu
  const projectFile = await createProjectFile({
    project_id: projectId,
    file_type: fileType,
    storage_bucket: PROJECT_FILES_BUCKET,
    storage_path: storagePath,
    original_name: file.name,
    mime_type: file.type || null,
    size_bytes: file.size,
    notes: null,
  })

  return projectFile
}

// ============================================
// VR helpers
// ============================================

/**
 * Creates a new VR scene in Supabase.
 * If Supabase is not configured, returns a mock VR scene with fake ID for development.
 *
 * @param input - The VR scene data to create
 * @returns The created VR scene
 * @throws Error if Supabase is configured but the creation fails
 */
export async function createVrScene(
  input: NewVrSceneInput
): Promise<VrScene> {
  if (!isSupabaseConfigured) {
    console.log("[Interiors] createVrScene (fallback)", input)
    const now = new Date().toISOString()
    return {
      id: "mock-vr-scene",
      project_id: input.project_id,
      scene_type: input.scene_type,
      title: input.title,
      description: input.description ?? null,
      simlab_project_url: input.simlab_project_url ?? null,
      webxr_url: input.webxr_url ?? null,
      video_url: input.video_url ?? null,
      cover_image_url: input.cover_image_url ?? null,
      storage_bucket: input.storage_bucket ?? null,
      storage_path: input.storage_path ?? null,
      notes: input.notes ?? null,
      created_at: now,
      updated_at: now,
    }
  }

  const { data, error } = await supabase!
    .from("vr_scenes")
    .insert(input)
    .select("*")
    .single()

  if (error) {
    console.error("[Interiors] createVrScene error:", error)
    throw error
  }

  return data as VrScene
}

/**
 * Fetches all VR scenes for a specific project from Supabase.
 * If Supabase is not configured, returns an empty array without throwing an error.
 *
 * @param projectId - The project ID to fetch VR scenes for
 * @returns Array of VR scenes, sorted by created_at ascending (oldest first)
 * @throws Error if Supabase is configured but the fetch fails
 */
export async function fetchVrScenesForProject(
  projectId: string
): Promise<VrScene[]> {
  if (!isSupabaseConfigured) {
    console.log("[Interiors] fetchVrScenesForProject (fallback)", projectId)
    return []
  }

  const { data, error } = await supabase!
    .from("vr_scenes")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("[Interiors] fetchVrScenesForProject error:", error)
    throw error
  }

  return (data ?? []) as VrScene[]
}

/**
 * Creates a new VR appointment in Supabase.
 * If Supabase is not configured, returns a mock VR appointment with fake ID for development.
 *
 * @param input - The VR appointment data to create
 * @returns The created VR appointment
 * @throws Error if Supabase is configured but the creation fails
 */
export async function createVrAppointment(
  input: NewVrAppointmentInput
): Promise<VrAppointment> {
  if (!isSupabaseConfigured) {
    console.log("[Interiors] createVrAppointment (fallback)", input)
    const now = new Date().toISOString()
    return {
      id: "mock-vr-appointment",
      vr_scene_id: input.vr_scene_id,
      scheduled_at: input.scheduled_at,
      location_preference: input.location_preference ?? null,
      status: input.status,
      client_name: input.client_name ?? null,
      client_email: input.client_email ?? null,
      client_phone: input.client_phone ?? null,
      notes: input.notes ?? null,
      created_at: now,
      updated_at: now,
    }
  }

  const { data, error } = await supabase!
    .from("vr_appointments")
    .insert(input)
    .select("*")
    .single()

  if (error) {
    console.error("[Interiors] createVrAppointment error:", error)
    throw error
  }

  return data as VrAppointment
}

/**
 * Fetches all VR appointments for a specific VR scene from Supabase.
 * If Supabase is not configured, returns an empty array without throwing an error.
 *
 * @param vrSceneId - The VR scene ID to fetch appointments for
 * @returns Array of VR appointments, sorted by scheduled_at ascending (oldest first)
 * @throws Error if Supabase is configured but the fetch fails
 */
export async function fetchVrAppointmentsForScene(
  vrSceneId: string
): Promise<VrAppointment[]> {
  if (!isSupabaseConfigured) {
    console.log("[Interiors] fetchVrAppointmentsForScene (fallback)", vrSceneId)
    return []
  }

  const { data, error } = await supabase!
    .from("vr_appointments")
    .select("*")
    .eq("vr_scene_id", vrSceneId)
    .order("scheduled_at", { ascending: true })

  if (error) {
    console.error("[Interiors] fetchVrAppointmentsForScene error:", error)
    throw error
  }

  return (data ?? []) as VrAppointment[]
}

