# Ani's Studio — Setup Complete ✅

## 🎨 Pearl & Amethyst Tema Aktivirana

### Što je napravljeno:

#### 1. **TailwindCSS Konfiguracija**
- ✅ `tailwind.config.js` — Custom boje (pearl, amethyst, lavender, plum)
- ✅ `postcss.config.js` — Tailwind + Autoprefixer setup
- ✅ Container centriran s paddingom 1.25rem

#### 2. **Google Fonts**
- ✅ Poppins (300, 400, 500, 600, 700, 800) — Naslovi
- ✅ Inter (400, 500, 600) — Body tekst
- ✅ Preconnect optimizacija u `index.html`

#### 3. **Komponente**
Sve komponente su dovršene i funkcionalne:
- ✅ `Header.tsx` — Sticky header s navigacijom, language toggle, cart icon
- ✅ `HeroSection.tsx` — Animirana hero sekcija s framer-motion
- ✅ `LRCSection.tsx` — Prikaz proizvoda s filterima i search-om
- ✅ `InteriorsSection.tsx` — Forma za narudžbu interijera
- ✅ `WebAtelierSection.tsx` — Pricing tablice za web usluge
- ✅ `AboutSection.tsx` — O studiju s badge-ovima
- ✅ `ContactSection.tsx` — Kontakt forma (demo submit)
- ✅ `Footer.tsx` — Footer s linkovima i društvenim mrežama
- ✅ `CartDrawer.tsx` — Bočni panel za košaricu

#### 4. **Provider-i (React Context)**
- ✅ `I18nProvider.tsx` — HR/EN jezik, localStorage persistence
- ✅ `CartProvider.tsx` — Košarica state management
- ✅ `UiProvider.tsx` — Drawer i modal state

#### 5. **Lib Utilities**
- ✅ `cart.ts` — Funkcije za rad s košaricom (add, remove, update, clear)
- ✅ `stripe.ts` — Stripe checkout integracija (demo)

#### 6. **Stilovi (Pearl & Amethyst)**
- ✅ `tokens.css` — CSS varijable za boje, spacing, typography
- ✅ `base.css` — Kompletni stilovi:
  - Epoxy background s mica shimmer efektom
  - Glassmorphism komponente
  - Grid i Flexbox utility klase
  - Responsive dizajn
  - Form stilovi
  - Button stilovi
  - Product cards
  - Timeline komponente

#### 7. **Git Save Script**
```bash
npm run save
```
Automatski dodaje, commituje i pusha promjene.

---

## 🚀 Kako pokrenuti:

```bash
# 1. Instalacija dependencija (ako nisu već)
npm install

# 2. Pokretanje dev servera
npm run dev

# 3. Build za production
npm run build

# 4. Preview production builda
npm run preview
```

---

## 📁 Struktura projekta:

```
anis-studio/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LRCSection.tsx
│   │   ├── InteriorsSection.tsx
│   │   ├── WebAtelierSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   └── CartDrawer.tsx
│   ├── providers/
│   │   ├── I18nProvider.tsx
│   │   ├── CartProvider.tsx
│   │   └── UiProvider.tsx
│   ├── lib/
│   │   ├── cart.ts
│   │   └── stripe.ts
│   ├── data/
│   │   └── products.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   └── base.css
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── index.html
```

---

## 🎨 Design Sistem:

### Boje:
- **Pearl**: `#F9F7FB` — Pozadina
- **Amethyst**: `#6E44FF` — Primarna
- **Lavender**: `#BDA6FF` — Accent
- **Plum**: `#2E2447` — Tekst

### Typography:
- **Heading**: Poppins
- **Body**: Inter

### Efekti:
- Glassmorphism paneli
- Epoxy shimmer background
- Smooth animations (framer-motion)

---

## ✨ Funkcionalnosti:

### Dvojezičnost (HR/EN)
- Automatsko spremanje odabira u localStorage
- Prijevodi za sve sekcije

### Košarica
- Add to cart
- Update količine
- Ukloni artikle
- Stripe checkout demo

### Responsive Design
- Mobile-first pristup
- Hamburger menu na mobilnim uređajima
- Optimizirano za sve veličine ekrana

---

## 📝 Bilješke:

### Stripe Test Mode
Stripe ključevi u `src/lib/stripe.ts` su placeholder vrijednosti.  
Za stvarnu integraciju, dodaj svoje test ključeve.

### Backend
Trenutno nema backend-a — sve je frontend demo.  
Checkout i contact forme su simulirane s `alert()` funkcijama.

---

## 🛠️ Sljedeći koraci:

1. **Backend integracija**:
   - Stvori API endpoint za contact formu
   - Dodaj Stripe server-side checkout
   
2. **Slike**:
   - Dodaj prave slike proizvoda (trenutno su emoji placeholderi)
   - Optimiziraj slike za web

3. **SEO**:
   - Dodaj meta tagove
   - Dodaj strukturirane podatke (JSON-LD)

4. **Analytics**:
   - Integriraj Google Analytics
   - Dodaj conversion tracking

---

**Napravljeno s ♥ i ☕**

