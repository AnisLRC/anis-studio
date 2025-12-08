# Ani's Studio – razvoj i deploy

## Kako pokrenuti projekt lokalno

1. Instaliraj dependencies:
   ```bash
   npm install
   ```

2. Kreiraj `.env.local` fajl u root direktoriju projekta s potrebnim environment varijablama:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Pokreni development server:
   ```bash
   npm run dev
   ```

4. Otvori aplikaciju u browseru:
   - Aplikacija će biti dostupna na `http://localhost:5173` (ili sljedeći slobodan port)

## Kako deployati na Vercel

Projekt je povezan na Vercel i koristi automatski deployment:

- **Automatski deployment**: Svaki `git push` na `main` branch automatski pokreće novi build i deployment na Vercel
- **Environment varijable**: Postavi potrebne env varijable u Vercel projektu:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - (dodajte druge ako su potrebne)
- **Provjera build logova**: Ako build padne, provjeri logove:
  - Vercel Dashboard → Deployments → Last build → Logs
  - Tamo ćeš vidjeti detaljne informacije o greškama

## Kako proširiti projekt

### Novi tip datoteke (project_files.file_type)

1. **U Supabase SQL editoru** dodajte novu vrijednost u enum ili check constraint za `project_files.file_type`:
   ```sql
   -- Primjer: ako koristite check constraint
   ALTER TABLE project_files 
   DROP CONSTRAINT IF EXISTS project_files_file_type_check;
   
   ALTER TABLE project_files 
   ADD CONSTRAINT project_files_file_type_check 
   CHECK (file_type IN ('plan', 'inspiration', 'space_photo', 'kitchen_sketch', 'carpenter_3d_export', 'vr_asset', 'other', 'novi_tip'));
   ```

2. **U kodu projekta** proširite TypeScript tip `ProjectFileType` u `src/lib/interiors.ts`:
   ```typescript
   export type ProjectFileType =
     | "plan"
     | "inspiration"
     | "space_photo"
     | "kitchen_sketch"
     | "carpenter_3d_export"
     | "vr_asset"
     | "other"
     | "novi_tip"  // dodajte novu vrijednost
   ```

3. **Dodajte ljudski čitljiv label** u helper funkciju `mapFileTypeLabel` u `src/pages/AdminInteriorsProjectDetailPage.tsx`:
   ```typescript
   function mapFileTypeLabel(fileType: ProjectFile["file_type"]): string {
     switch (fileType) {
       // ... postojeći slučajevi
       case "novi_tip":
         return "Novi tip datoteke";
       // ...
     }
   }
   ```

4. **Po potrebi** dodajte:
   - Novi upload section u formu (`InteriorsClientForm.tsx` ili `InteriorsCarpenterForm.tsx`)
   - Novu opciju filtera u admin stranici (`AdminInteriorsProjectDetailPage.tsx`)

### Novi status projekta

1. **U Supabase SQL editoru** dodajte novu vrijednost u `projects.status`:
   ```sql
   -- Primjer: ako koristite check constraint
   ALTER TABLE projects 
   DROP CONSTRAINT IF EXISTS projects_status_check;
   
   ALTER TABLE projects 
   ADD CONSTRAINT projects_status_check 
   CHECK (status IN ('inquiry', '3d_in_progress', '3d_done', 'vr_in_progress', 'vr_done', 'presented', 'novi_status'));
   ```

2. **U kodu projekta** proširite TypeScript tip `ProjectStatus` u `src/lib/interiors.ts`:
   ```typescript
   export type ProjectStatus =
     | 'inquiry'
     | '3d_in_progress'
     | '3d_done'
     | 'vr_in_progress'
     | 'vr_done'
     | 'presented'
     | 'novi_status'  // dodajte novu vrijednost
   ```

3. **Ažurirajte label** u `STATUS_OPTIONS` konstanti u `src/pages/AdminInteriorsProjectsPage.tsx`:
   ```typescript
   const STATUS_OPTIONS: { value: "" | Project["status"]; label: string }[] = [
     // ... postojeće opcije
     { value: "novi_status", label: "Novi status" },
   ];
   ```

4. **Provjerite gdje se statusi koriste** i ažurirajte po potrebi:
   - Admin lista projekata (`AdminInteriorsProjectsPage.tsx`)
   - Detalj projekta (`AdminInteriorsProjectDetailPage.tsx`)
   - Filteri i sortiranje

### Novi VR scene type

1. **U Supabase SQL editoru** dodajte novu vrijednost u `vr_scenes.scene_type`:
   ```sql
   -- Primjer: ako koristite check constraint
   ALTER TABLE vr_scenes 
   DROP CONSTRAINT IF EXISTS vr_scenes_scene_type_check;
   
   ALTER TABLE vr_scenes 
   ADD CONSTRAINT vr_scenes_scene_type_check 
   CHECK (scene_type IN ('simlab_package', 'webxr_scene', 'video_tour', 'image_gallery', 'other', 'novi_tip'));
   ```

2. **U kodu projekta** proširite TypeScript tip `VrSceneType` u `src/lib/interiors.ts`:
   ```typescript
   export type VrSceneType = 
     | 'simlab_package' 
     | 'webxr_scene' 
     | 'video_tour' 
     | 'image_gallery' 
     | 'other'
     | 'novi_tip'  // dodajte novu vrijednost
   ```

3. **Dodajte opciju u select** u adminu za dodavanje nove VR scene (`AdminInteriorsProjectDetailPage.tsx`):
   - Pronađite select element za `scene_type` i dodajte novu `<option>` vrijednost

4. **Ažurirajte helper funkciju** `mapVrSceneType` u `src/pages/AdminInteriorsProjectDetailPage.tsx`:
   ```typescript
   function mapVrSceneType(sceneType: VrSceneType): string {
     switch (sceneType) {
       // ... postojeći slučajevi
       case "novi_tip":
         return "Novi VR tip";
       // ...
     }
   }
   ```

5. **Po potrebi** prilagodite prikaz u adminu i public VR stranici (`PublicProjectVrPage.tsx`)

## Korisne rute za testiranje

- `/` – HomePage (početna stranica)
- `/lrc` – LRC public stranica
- `/interijeri` – landing za interijere (sekcija na homepage)
- `/admin/interiors-projects` – admin lista interijera
- `/admin/interiors-projects/:id` – detalj projekta
- `/vr/:projectId` – public VR za projekt
- `/admin/login` – admin login stranica
- `/admin/settings` – admin postavke
- `/admin/lrc-inquiries` – admin lista LRC upita

## Build i preview

- **Build za produkciju**: `npm run build`
- **Preview build-a**: `npm run preview`
- **TypeScript provjera**: `tsc --noEmit` (ako je dostupan kroz npm script)
