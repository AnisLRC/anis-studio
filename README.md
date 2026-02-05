# Ani's Studio – razvoj i deploy

## 🚨 PRIJE DEPLOYMENT-a

**OBAVEZNO napraviti prije pusha na produkciju:**

- [ ] Zamijeniti placeholder telefon u `src/config/contact.ts`
- [ ] Postaviti environment varijable u Vercel:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_ADMIN_PASSWORD`
- [ ] Testirati sve forme s pravim Supabase-om
- [ ] Verificirati da admin login radi
- [ ] Provjeriti da `.env` datoteke nisu commited-e u git (koristiti `git status`)

---

## Kako pokrenuti projekt lokalno

1. Instaliraj dependencies:
   ```bash
   npm install
   ```

2. Kreiraj `.env.local` fajl u root direktoriju projekta (kopiraj iz `.env.example`):
   ```bash
   cp .env.example .env.local
   ```
   
   Zatim popuni s pravim vrijednostima:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_ADMIN_PASSWORD=your_secure_admin_password
   ```

3. **VAŽNO - Ukloni .env iz git-a (ako je slučajno commitovan):**
   ```bash
   git rm --cached .env
   git commit -m "Remove .env from git tracking"
   ```

4. Pokreni development server:
   ```bash
   npm run dev
   ```

5. Otvori aplikaciju u browseru:
   - Aplikacija će biti dostupna na `http://localhost:5173` (ili sljedeći slobodan port)

## Kako deployati na Vercel

### Automatski deployment

Projekt je povezan na Vercel i koristi automatski deployment:

- **Automatski deployment**: Svaki `git push` na `main` branch automatski pokreće novi build i deployment na Vercel

### Environment varijable u Vercel

Postavi sljedeće env varijable u Vercel Dashboard → Project Settings → Environment Variables:

| Varijabla | Opis | Obavezno |
|-----------|------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | DA |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | DA |
| `VITE_ADMIN_PASSWORD` | Admin panel password | DA |

**Napomena**: Nakon dodavanja environment varijabli, morat ćeš pokrenuti redeploy.

### Provjera build logova

Ako build padne, provjeri logove:
- Vercel Dashboard → Deployments → Last build → Logs
- Tamo ćeš vidjeti detaljne informacije o greškama

### Prije svakog deploymenta

Obavezno provjeri [🚨 PRIJE DEPLOYMENT-a](#-prije-deployment-a) checklist na vrhu ovog dokumenta!

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
