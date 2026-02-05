# 🔧 Kako Popraviti Contact Formu - Točne Upute

## Problem
Contact forma baca grešku: **"Error submitting contact inquiry: Error: Failed to fetch"**

## Mogući Uzroci
1. **Najčešće:** Supabase projekt je pauziran (inactive free-tier)
2. Supabase Row Level Security (RLS) blokira anonymous (anon) korisnike jer ne postoje politike koje to dozvoljavaju
3. Vercel environment varijable nisu postavljene ispravno

---

## ✅ RJEŠENJE (Slijedi korake po redu)

### **KORAK 1: Otvori Supabase Dashboard**

1. Otvori browser
2. Idi na: https://supabase.com/dashboard
3. Login ako već nisi
4. Odaberi svoj projekt

---

### **KORAK 2: Pokreni SQL Migraciju**

1. U Supabase Dashboardu, klikni **"SQL Editor"** (lijevi sidebar)
2. Klikni **"New Query"**
3. Otvori fajl: `supabase/lrc_inquiries_rls_policies.sql` u ovom projektu
4. **COPY cijeli sadržaj fajla** (Ctrl+A, Ctrl+C)
5. **PASTE u Supabase SQL Editor** (Ctrl+V)
6. Klikni zeleni **"Run"** button (ili pritisni Ctrl+Enter)
7. **Očekivani rezultat:** "Success. No rows returned" (zelena poruka)

**Što ova skripta radi:**
- Omogućava RLS na `lrc_inquiries` tablici
- Dodaje policy da **bilo tko može insert-ati** (za public forme)
- Dodaje policy da **authenticated korisnici mogu čitati** (za admin panel)
- Dodaje policy da **authenticated korisnici mogu update-ati** (za mijenjanje statusa)

---

### **KORAK 3: Verifikuj Vercel Environment Variables**

1. Otvori: https://vercel.com/dashboard
2. Odaberi svoj projekt "Ani's Studio"
3. Klikni **"Settings"** → **"Environment Variables"**
4. **Provjeri da postoje ove 3 varijable:**

| Variable | Value | Environments |
|----------|-------|--------------|
| `VITE_SUPABASE_URL` | `https://cpvofgaknmgnmusypoev.supabase.co` | Production ✅ Preview ✅ Development ✅ |
| `VITE_SUPABASE_ANON_KEY` | (tvoj anon key iz .env fajla) | Production ✅ Preview ✅ Development ✅ |
| `VITE_ADMIN_PASSWORD` | (tvoja lozinka) | Production ✅ Preview ✅ Development ✅ |

**Ako nešto nedostaje:**
- Klikni **"Add New"**
- Unesi ime varijable, vrijednost
- **OBAVEZNO** označi sva tri environments: Production, Preview, Development
- Klikni **"Save"**
- Vercel će pitati "Redeploy?" → klikni **"Yes"**

---

### **KORAK 4: Push Changes na Git**

Otvori terminal u projektu i izvršavaj redom:

```bash
# Dodaj nove fajlove
git add supabase/lrc_inquiries_rls_policies.sql
git add src/lib/contactInquiries.ts
git add src/components/ContactSection.tsx
git add CONTACT-FORM-FIX-INSTRUCTIONS.md

# Commit
git commit -m "fix: add RLS policies for contact form and improve error messages"

# Push (ovo će triggerati Vercel redeploy)
git push origin main
```

---

### **KORAK 5: Čekaj Deployment (2-3 min)**

1. Idi na Vercel Dashboard → Deployments
2. Vidi najnoviji deployment (trebao bi biti "Building..." ili "Ready")
3. Čekaj da status postane **"Ready"** (zelena kvačica)

---

### **KORAK 6: Testiraj Ponovno**

1. Otvori tvoju production stranicu (refresh)
2. Idi na `/kontakt`
3. Popuni formu:
   - Ime: Tvoje ime
   - Email: Tvoj email
   - Poruka: Testna poruka
4. Klikni **"Pošalji poruku"**
5. **Očekivano:** Zelena success poruka "Hvala vam! Vaša poruka je poslana."

---

### **KORAK 7: Verifikuj u Supabase**

1. Otvori Supabase Dashboard
2. Klikni **"Table Editor"** (lijevi sidebar)
3. Odaberi tablicu **`lrc_inquiries`**
4. **Očekivano:** Vidiš novi red s:
   - `name` = tvoje ime
   - `email` = tvoj email
   - `description` = tvoja poruka
   - `source` = `'contact'`
   - `status` = `'new'`

---

## 🔍 Troubleshooting

### ⚠️ NAJČEŠĆI PROBLEM: Supabase Projekt Pauziran

**Ako vidiš grešku "Failed to fetch" ili "ERR_NAME_NOT_RESOLVED":**

1. Otvori Supabase Dashboard: https://supabase.com/dashboard
2. Odaberi svoj projekt
3. Provjeri status projekta (gore desno):
   - ✅ **"Healthy"** = sve OK
   - 🛑 **"Paused"** ili **"Inactive"** = PROBLEM!

**Ako je projekt pauziran (Paused):**
- Klikni **"Restore project"** ili **"Resume"** button
- Čekaj 2-3 minute dok se projekt aktivira
- Status će postati "Healthy"
- Refresh svoju stranicu i testiraj ponovno

**Zašto se to dešava:**
Supabase free-tier automatski pauzira projekte nakon 1 tjedan neaktivnosti. Kad je projekt pauziran, API ne radi i sve forme će failati s "Failed to fetch".

**Kako spriječiti:**
- Logiraj se u Supabase Dashboard barem jednom tjedno
- Ili upgrade na Pro plan ($25/mjesec) za "always-on" projekte

---

### Ako i dalje ne radi nakon što je projekt aktivan:

**Test 1: Provjeri RLS policies**
U Supabase SQL Editor, pokreni:
```sql
SELECT policyname, cmd, roles 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'lrc_inquiries';
```

**Očekivano:** Vidiš 4 policy-ja (INSERT, SELECT, UPDATE, DELETE)

**Test 2: Provjer ima li `source` kolona**
U Supabase SQL Editor, pokreni:
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'lrc_inquiries';
```

**Očekivano:** Kolona `source` postoji (type: `text`)

**Test 3: Privremeno disablaj RLS (za debug)**
```sql
ALTER TABLE lrc_inquiries DISABLE ROW LEVEL SECURITY;
```

Onda testiraj formu ponovno. Ako sad radi, problem je definitivno u RLS policies.

---

## 📞 Ako Ništa Ne Pomaže

Pošalji mi:
1. Screenshot Supabase SQL Editor nakon pokretanja migracije
2. Screenshot Console-a u browseru (F12 → Console tab)
3. Screenshot Vercel Environment Variables

---

**Sretno! Javi mi kad prođe! 🚀**
