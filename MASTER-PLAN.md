# Master Plan — Ani's Studio (End-to-End do produkcije)

Glavni plan za realizaciju: od trenutnog MVP-a do pune produkcije kroz 6 tjedana (staging, UX polish, CMS temelj, dashboard CMS, Stripe checkout, public integracija i SEO, finalni QA i launch).

---

## Polazno stanje (već gotovo)

Baza je "production-ready" za trenutni MVP: Tailwind v4 stabilan, Header/Hero, forme rade i spremaju u Supabase, RLS za lrc_inquiries, admin panel radi (basic), deploy na Vercel, test checkliste postoje.

Sad gradimo "Full web" kroz **6 tjedana** (realno i sigurno za CMS + Stripe + private images).

---

## Tjedan 0 (1 dan): Freeze + priprema release okruženja

**Cilj:** da sve što radimo ide bez rizika.

**Taskovi:**

- Stvoriti staging okruženje (Supabase project ili schema + Vercel preview env)
- Branch strategija: `main` (prod), `develop` (staging), feature grane
- "Release checklist" dokument (jedna stranica)

**Gate (DoD):** Staging radi identično kao prod (env vars, baza, build).

---

## Tjedan 1: UX/UI Polish paket (2–4 dana + 1–2 dana test)

**Cilj:** dovršiti premium UX koji si već isplanirala.

**Implementirati:**

- Toast notifications (react-hot-toast) — sve forme
- Page transitions (Framer Motion)
- Micro-interactions (buttons/cards/links)
- Skeleton loaders u admin listama
- Dark mode toggle + poboljšanja
- Typography refinement + color accents
- Upload progress (Interiors upload)

**Test:** Desktop checklist + mobile test; `npm run build` bez grešaka.

**Gate (DoD):** Nema "success screen" blokade; sve poruke idu preko toastova. Admin loading više nije "Loading…". Mobile responsive bez overflowa na gumbima.

---

## Tjedan 2: CMS FOUNDATION (DB + RLS + Private Storage + Admin Auth) (5–7 dana)

Temelj za "sve kroz dashboard".

### 2.1 Data model (Supabase)

**Tablice (minimum):**

- **products:** id, title, description, price, currency, sku (optional), tags[], collections[], is_active, publish_start_at, publish_end_at, created_at, updated_at
- **portfolio_items:** id, title, description, section (enum: lrc/interijeri/web), tags[], collections[], is_active, publish_start_at, publish_end_at, timestamps
- **media_assets:** id, storage_path, alt_text (required), title (optional), tags[], collections[], section_visibility[], is_active, timestamps
- **Join tablice:** product_media (product_id, media_id, sort_order), portfolio_media (portfolio_id, media_id, sort_order)
- Za Stripe (Tjedan 4): **orders**, **order_items** (schema u Tjednu 4)

### 2.2 RLS pravila (strogo)

- Public (anon): SELECT samo za is_active=true i unutar publish window (ako postavljen)
- Admin (authenticated + role=admin): CRUD
- Forms (anon): INSERT u lrc_inquiries (već radi)

### 2.3 Private bucket za slike

- Bucket npr. `media-private` (PRIVATE)
- Storage policies: upload/view samo adminu
- Public web ne dobiva public URL — samo signed URL mehanizam

### 2.4 Kako public web vidi private slike

- **Rješenje:** Supabase Edge Function (ili Vercel serverless) koja generira signed URL za traženi storage_path s kratkim TTL (npr. 60–300s).
- Endpoint: `GET /functions/v1/media-signed-url?assetId=...`
- Funkcija validira: asset is_active=true, u publish window
- Vraća signed URL + expiry
- Frontend cache-a signed URL u memoriji (npr. 60s)

### 2.5 Admin login

- Prelaz s "env password + localStorage" na **Supabase Auth**
- Admin user (tvoj email) + RLS claims/role
- Opcija: magic link ili email+password

**Gate (DoD):** Ne-admin ne može vidjeti admin rute ni storage. Public web čita samo aktivni sadržaj. Signed URL radi i slike se prikazuju na javnom webu.

---

## Tjedan 3: DASHBOARD CMS (Media Library + Content Manager) (5–8 dana)

**Cilj:** upravljanje slikama i objavama/proizvodima bez deploya.

### 3.1 Media Library (Admin)

- Lista/grid slika + search + filter: kolekcija, tag, odjeljak, active
- Upload modal (drag&drop) + progress
- Edit: alt_text (required), title, tags, collections, section visibility, active toggle
- (v1.1 optional) "Where used"
- UAC: ne može spremiti asset bez alt_text; is_active=false = ne prikazuje se nigdje; upload stvara media_assets red + file u storage

### 3.2 Products Manager (LRC)

- Lista proizvoda + filter: active, kolekcija, tag, search
- Create/Edit: title (HR), description (HR), price, tags, collections, active, publish from/to, povezivanje slika iz Media Library + redoslijed
- UAC: publish_start_at u budućnosti = ne prikazuje se; deaktivacija odmah miče s javnog prikaza

### 3.3 Portfolio Manager (Interijeri/LRC/Web)

- Isto kao products, s poljem section.

**Gate (DoD):** Možeš napraviti kolekciju "Valentinovo", ubaciti 10 proizvoda, aktivirati i zakazati, bez deploya.

---

## Tjedan 4: STRIPE CHECKOUT + ORDERS (6–10 dana)

**Cilj:** e-commerce tok: košarica → plaćanje → narudžba → admin pregled.

### 4.1 DB schema za narudžbe

- **orders:** id, status (draft/pending/paid/failed/canceled/refunded), customer_email, customer_name, phone, shipping_address (json), currency, subtotal, shipping, total, stripe_checkout_session_id, stripe_payment_intent_id, created_at
- **order_items:** order_id, product_id, title_snapshot, unit_price, qty, personalization (json, optional), line_total

### 4.2 Server-side Stripe integracija

- **POST /api/stripe/create-checkout-session:** prima items (productId + qty); server povuče cijene iz DB; kreira Stripe session
- **POST /api/stripe/webhook:** checkout.session.completed → orders.status = paid; sprema Stripe ID-eve

### 4.3 Checkout flow

- Cart → "Checkout" → redirect na Stripe Checkout → return URL → Thank you; Thank you stranica povlači order status

### 4.4 Admin Orders page

- Lista narudžbi + filter status; order detail (stavke, adresa, kontakt); Export CSV (nice-to-have)

**Gate (DoD):** Test kartice rade; webhook prebacuje order u "paid"; admin vidi sve narudžbe.

---

## Tjedan 5: PUBLIC SITE integracija + SEO/Performance (4–7 dana)

**Cilj:** javne stranice vuku realne podatke iz CMS-a.

### 5.1 Zamjena hardcode sadržaja

- LRC: proizvodi iz products + slike preko signed URL
- Portfolio: portfolio_items + filteri (kolekcije/tagovi)
- About slike iz media library (ako treba)

### 5.2 SEO (must-have)

- Title/description po ruti; OpenGraph + share image; sitemap.xml + robots.txt; basic structured data (Organization + Product)

### 5.3 Performance

- Lazy load slika + caching signed URL; route-level code splitting; build size check

**Gate (DoD):** Public web samo aktivno + publish window; SEO meta + share preview rade.

---

## Tjedan 6: FINAL QA + Launch (3–5 dana)

**Cilj:** nula iznenađenja u produkciji.

### 6.1 Test plan

- **Smoke (15 min):** Home / LRC / Interijeri / Web Atelier / Kontakt; 1 upload u adminu; 1 "deaktiviraj proizvod" → nestane public; 1 checkout (Stripe test)
- **Regression:** Desktop checklist; mobile (lokalna mreža + pravi uređaj); `npm run build`
- **Security:** RLS (anon ne čita admin); storage (anon ne listaje bucket); signed URL endpoint rate-limit (basic)

### 6.2 Go-live checklist

- Vercel env vars (prod) + Stripe keys + webhook secret; Supabase Edge functions deployed; Domain + SSL; Analytics + error tracking; Backup/rollback (previous deployment u Vercelu)

**Launch Gate:** Sve kritično radi na produkciji; order u "paid" se vidi u adminu.

---

## Ukupno trajanje

- **Realno:** ~6 tjedana od danas.
- Intenzivno (svaki dan): može se stisnuti na 4 tjedna; 6 je sigurnije zbog CMS + Stripe + private images.
