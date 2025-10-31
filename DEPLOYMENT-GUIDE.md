# Deployment Priprema - Korak 7 🚀

## ✅ Status projekta

### Sve promjene kompletirane:
- ✅ Design optimizacija (header, sekcije, gumbevi)
- ✅ Webshop simetrija
- ✅ ProcessSection premješten
- ✅ LRC procesi ažurirani
- ✅ Build test spreman

---

## 🚀 Deployment opcije

### Opcija 1: Netlify (Najjednostavnija) ⭐

#### Prednosti:
- Besplatno za statičke stranice
- Automatski HTTPS
- CDN distribucija
- Drag & drop deployment

#### Koraci:

1. **Build projekta:**
   ```bash
   npm run build
   ```
   Ovo kreira `dist` folder sa production buildom.

2. **Deploy na Netlify:**
   - Idite na https://app.netlify.com
   - Login ili registracija (besplatno)
   - Drag & drop `dist` folder na Netlify
   - Automatski dobivate URL (npr. `random-name-123.netlify.app`)

3. **Custom domen (opcionalno):**
   - U Netlify settings → Domain management
   - Dodajte svoj domen

---

### Opcija 2: Vercel (Brza i jednostavna) ⚡

#### Prednosti:
- Besplatno za personal projekte
- Automatski HTTPS
- CDN distribucija
- Vrlo brza

#### Koraci:

1. **Instalirajte Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login u Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   Vercel će automatski:
   - Detektovati Vite projekat
   - Build-ati projekat
   - Deploy-ati na URL (npr. `anis-studio.vercel.app`)

4. **Production deploy:**
   ```bash
   vercel --prod
   ```

---

### Opcija 3: GitHub Pages (Za open source) 📄

#### Prednosti:
- Besplatno kroz GitHub
- Automatski deployment
- Integracija s Git workflowom

#### Koraci:

1. **Instalirajte gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Dodajte script u `package.json`:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

4. **Konfigurirajte GitHub Pages:**
   - Settings → Pages
   - Source: gh-pages branch
   - Custom domain (opcionalno)

---

## 🔧 Prije deploymenta - Checklist

### Build test:
- [ ] `npm run build` prođe bez grešaka
- [ ] `npm run preview` radi ispravno
- [ ] Sve sekcije su vidljive
- [ ] Gumbevi rade
- [ ] Mobile responsive radi

### SEO optimizacija (opcionalno):
- [ ] Meta tags u `index.html`
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Structured data (JSON-LD)

### Performance:
- [ ] Lazy loading za slike (već implementirano)
- [ ] Code splitting (opcionalno)
- [ ] Image optimization (kada dodate prave slike)

---

## 📝 Deployment checklist

### Prije deploymenta:
- [x] Sve promjene commitane u Git
- [ ] Build test prošao
- [ ] Preview test prošao
- [ ] Mobile testiranje prošlo
- [ ] SEO meta tags dodani (opcionalno)

### Nakon deploymenta:
- [ ] Testirati sve sekcije na produkciji
- [ ] Provjeriti mobile verziju
- [ ] Provjeriti da svi linkovi rade
- [ ] Provjeriti da svi formi rade
- [ ] Provjeriti da animacije rade glatko

---

## 🛠️ Build konfiguracija

### Trenutni build:
```bash
npm run build
```

### Output:
- `dist/` folder - production build
- Minified CSS i JS
- Optimized assets
- Source maps (za debugging)

### Preview build:
```bash
npm run preview
```

---

## 🌐 Environment varijable (za budućnost)

### Kada budete spremni za backend:
Kreirati `.env` file:
```env
VITE_API_URL=https://your-api.com
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_APP_ENV=production
```

### Trenutno:
Nisu potrebne environment varijable (sve je konfigurirano).

---

## 📊 Performance metrije (za provjeru)

### Lighthouse test (Chrome DevTools):
1. Otvorite `chrome://inspect`
2. Lighthouse tab
3. Testirajte:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

### Očekivani rezultati:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

---

## 🎯 Quick Start Deployment

### Najbrži način (Netlify):
```bash
# 1. Build
npm run build

# 2. Idite na netlify.com
# 3. Drag & drop dist folder
# 4. Gotovo! 🎉
```

### Najprofesionalniji način (Vercel):
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Follow prompts
# 4. Gotovo! 🚀
```

---

## 🔒 Security checklist

- [ ] HTTPS enabled (automatski na Netlify/Vercel)
- [ ] Environment varijable zaštitljene
- [ ] API keys ne u kod (kada dodate backend)
- [ ] Content Security Policy (opcionalno)

---

## 📱 Mobile deployment test

Nakon deploymenta, testirajte na mobilnom:
1. Otvorite URL na mobilnom uređaju
2. Provjerite sve sekcije
3. Testirajte forme
4. Testirajte navigaciju
5. Testirajte gumbeve

---

## ✅ Finalni koraci

### 1. Build test:
```bash
npm run build
```

### 2. Preview test:
```bash
npm run preview
```

### 3. Deploy:
- Odaberite jedan od gore navedenih načina
- Pratite korake za deployment

### 4. Testiranje na produkciji:
- Provjerite sve funkcionalnosti
- Testirajte na različitim uređajima

---

## 🎉 Gotovo!

Vaša stranica je spremna za deployment! 

**Preporučujem Netlify za početak** - najjednostavniji i najbrži način.

---

**Sve je spremno za deployment!** 🚀✨

