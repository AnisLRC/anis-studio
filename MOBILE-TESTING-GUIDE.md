# Kako testirati na mobilnom uređaju 📱

## Opcija 1: Preko lokalne mreže (Najbrže) ⚡

### Korak 1: Pokrenite dev server
```bash
npm run dev
```

Vite će automatski pokrenuti server i prikazati URL-ove:
- `http://localhost:5173` (za vaš računalo)
- `http://192.168.x.x:5173` (za druge uređaje u istoj mreži)

### Korak 2: Pronađite vašu IP adresu

**Windows:**
```powershell
ipconfig
```
Tražite "IPv4 Address" pod "Wireless LAN adapter" ili "Ethernet adapter"

**Mac/Linux:**
```bash
ifconfig
# ili
ip addr
```

Primjer: `192.168.1.105`

### Korak 3: Otvorite na mobilnom uređaju

1. **Povežite mobilni uređaj na istu Wi‑Fi mrežu kao vaš računalo**
2. **Otvorite browser na mobilnom** (Chrome, Safari, Firefox)
3. **Unesite URL:** `http://192.168.x.x:5173` (zamijenite x.x s vašom IP adresom)

**Primjer:**
```
http://192.168.1.105:5173
```

### ✅ Prednosti:
- ✅ Najbrže rješenje
- ✅ Real-time promjene (hot reload)
- ✅ Nema potrebe za dodatnim servisima
- ✅ Besplatno

### ⚠️ Važno:
- Računalo i mobilni uređaj moraju biti na **istoj Wi‑Fi mreži**
- Provjerite da firewall ne blokira port 5173

---

## Opcija 2: Browser DevTools (Mobile Emulator) 🖥️

### Chrome DevTools:
1. Otvorite Chrome na računalu
2. Pokrenite `npm run dev`
3. Otvorite `http://localhost:5173`
4. **F12** ili **Right-click → Inspect**
5. Kliknite ikonu **Toggle device toolbar** (Ctrl+Shift+M)
6. Odaberite uređaj (iPhone, Android, iPad, itd.)
7. Testirajte direktno u browseru

### Firefox DevTools:
1. Otvorite Firefox
2. Pokrenite `npm run dev`
3. Otvorite `http://localhost:5173`
4. **F12** → **Responsive Design Mode** (Ctrl+Shift+M)
5. Odaberite uređaj

### ✅ Prednosti:
- ✅ Brzo testiranje različitih veličina ekrana
- ✅ Ne treba mobilni uređaj
- ✅ Network throttling za testiranje brzine

### ⚠️ Ograničenja:
- ❌ Ne simulira touch gestures
- ❌ Ne pokazuje stvarnu performansu
- ❌ Ne testira stvarni browser na mobilnom

---

## Opcija 3: Ngrok (Pristup s interneta) 🌐

### Korak 1: Instalirajte Ngrok
Preuzmite s: https://ngrok.com/download

### Korak 2: Pokrenite dev server
```bash
npm run dev
```

### Korak 3: Pokrenite Ngrok
```bash
ngrok http 5173
```

Ngrok će vam dati URL poput:
```
https://abc123.ngrok.io
```

### Korak 4: Otvorite na mobilnom
Unesite Ngrok URL u browser na mobilnom uređaju (može biti na bilo kojoj mreži)

### ✅ Prednosti:
- ✅ Pristup s bilo koje mreže
- ✅ Možete testirati s drugih lokacija
- ✅ HTTPS (sigurno)

### ⚠️ Ograničenja:
- ❌ Potreban je Ngrok account (besplatno plan ima ograničenja)
- ❌ URL se mijenja svaki put (osim ako imate paid plan)
- ❌ Sporije od lokalne mreže

---

## Opcija 4: LocalTunnel (Besplatna alternativa) 🔓

### Korak 1: Instalirajte
```bash
npm install -g localtunnel
```

### Korak 2: Pokrenite dev server
```bash
npm run dev
```

### Korak 3: Pokrenite LocalTunnel
```bash
lt --port 5173
```

Dobit ćete URL poput:
```
https://random-name.loca.lt
```

### Korak 4: Otvorite na mobilnom
Unesite URL u browser na mobilnom uređaju

### ✅ Prednosti:
- ✅ Besplatno
- ✅ Pristup s bilo koje mreže
- ✅ HTTPS

---

## Opcija 5: Deploy na Netlify/Vercel (Za produkciju) 🚀

### Netlify:
1. Build projekta:
```bash
npm run build
```

2. Drag & drop `dist` folder na Netlify
3. Automatski dobivate URL (npr. `anis-studio.netlify.app`)
4. Otvorite na mobilnom uređaju

### Vercel:
```bash
npm install -g vercel
vercel
```

### ✅ Prednosti:
- ✅ Produkcijski build
- ✅ Trajni URL
- ✅ SSL certifikat
- ✅ CDN distribucija

---

## 📱 Što testirati na mobilnom uređaju:

### 1. **Touch Interactions**
- ✅ Gumbi su dovoljno veliki (44x44px minimum)
- ✅ Nema hover efekata (koriste se active states)
- ✅ Smooth scroll radi
- ✅ Mobile menu radi

### 2. **Responsive Layout**
- ✅ Tekst je čitljiv
- ✅ Slike se pravilno skaliraju
- ✅ Grid layout radi na malim ekranima
- ✅ Forme su mobile-friendly

### 3. **Performance**
- ✅ Stranica se brzo učitava
- ✅ Animacije su smooth
- ✅ Nema lag-a pri scroll-u
- ✅ Lazy loading radi

### 4. **Funkcionalnosti**
- ✅ Login/Register modali rade
- ✅ File upload radi
- ✅ Navigation radi
- ✅ Language toggle radi

---

## 🔧 Troubleshooting

### Problem: Ne mogu pristupiti s mobilnog
**Rješenje:**
1. Provjerite da su oba uređaja na istoj Wi‑Fi mreži
2. Provjerite firewall na računalu
3. Provjerite da je port 5173 otvoren
4. Pokušajte s drugim portom u `vite.config.ts`

### Problem: Stranica se ne učitava
**Rješenje:**
1. Provjerite da je dev server pokrenut
2. Provjerite URL (trebao bi biti `http://`, ne `https://`)
3. Provjerite da li je IP adresa ispravna

### Problem: Promjene se ne vide
**Rješenje:**
1. Hard refresh na mobilnom (Ctrl+Shift+R ili shake device)
2. Provjerite da je hot reload aktivan
3. Provjerite konzolu za greške

---

## 💡 Preporuka

Za brzo testiranje: **Opcija 1** (Lokalna mreža)  
Za detaljno testiranje: **Opcija 2** (Browser DevTools)  
Za dijeljenje s drugima: **Opcija 3** (Ngrok) ili **Opcija 5** (Deploy)

---

**Sada možete testirati svoju stranicu na mobilnom uređaju!** 📱✨

