# Kako dodati slike na web stranicu

Ovaj dokument objašnjava kako zamijeniti placeholder slike s pravim fotografijama vašeg rada.

## 📁 Struktura za slike

Kreirajte sljedeću strukturu foldera:

```
public/
  images/
    products/          # Slike proizvoda za LRC sekciju
      product-1.jpg
      product-2.jpg
      ...
    gallery/           # Slike za galeriju
      lrc/
        lrc-1.jpg
        lrc-2.jpg
      interiors/
        interior-1.jpg
        interior-2.jpg
      web/
        web-1.jpg
        web-2.jpg
    about/             # Slike za O meni sekciju
      profile.jpg
      workspace.jpg
```

## 1️⃣ LRC Proizvodi - Dodavanje slika proizvoda

### Korak 1: Dodajte slike u folder
Dodajte slike proizvoda u `public/images/products/` folder.

### Korak 2: Ažurirajte data/products.ts
Otvorite `src/data/products.ts` i dodajte putanje do slika:

```typescript
export const sampleProducts = [
  {
    id: "1",
    name: "Custom Epoxy Tray",
    nameHr: "Personalizirani epoksi poslužavnik",
    price: 45,
    image: "/images/products/product-1.jpg",  // ← Dodajte putanju
    tags: ["epoksi", "poklon"]
  },
  // ... ostali proizvodi
]
```

### Korak 3: Ažurirajte LRCSection.tsx (ako je potrebno)
Ako želite koristiti različite veličine slika ili lazy loading, ažurirajte `src/components/LRCSection.tsx`:

```tsx
{/* Zamijenite placeholder div s: */}
<img 
  src={product.image} 
  alt={language === 'hr' ? product.nameHr : product.name}
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

## 2️⃣ Galerija - Dodavanje slika projekata

### Korak 1: Dodajte slike u odgovarajuće foldere
- LRC projekti → `public/images/gallery/lrc/`
- Interijeri → `public/images/gallery/interiors/`
- Web projekti → `public/images/gallery/web/`

### Korak 2: Ažurirajte GallerySection.tsx
Otvorite `src/components/GallerySection.tsx` i dodajte putanje do slika:

```tsx
const translations = {
  // ...
  items: {
    hr: [
      {
        id: 1,
        category: "LRC Proizvodi",
        title: "Epoksi poklon set",
        description: "Personalizirani poklon set s laser gravurom",
        aspect: "square",
        image: "/images/gallery/lrc/lrc-1.jpg"  // ← Dodajte ovo
      },
      // ... ostali projekti
    ]
  }
}
```

### Korak 3: Zamijenite placeholder u renderiranju
U istoj datoteci, pronađite dio s placeholder gradijentoм i zamijenite ga:

```tsx
{/* Zamijenite cijeli gradient div s: */}
<img 
  src={item.image} 
  alt={item.title}
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

## 3️⃣ O meni sekcija - Profilna slika

### Korak 1: Dodajte profilnu sliku
Dodajte vašu fotografiju u `public/images/about/profile.jpg`

### Korak 2: Ažurirajte AboutSection.tsx
Otvorite `src/components/AboutSection.tsx` i pronađite dio s emoji 👩‍🎨:

```tsx
{/* Zamijenite cijeli placeholder div s: */}
<img 
  src="/images/about/profile.jpg" 
  alt="Ani's Studio"
  className="w-full h-full object-cover rounded-2xl"
/>
```

## 📐 Preporučene dimenzije slika

### LRC Proizvodi:
- **Omjer**: 1:1 (kvadrat)
- **Dimenzije**: 800x800px ili 1000x1000px
- **Format**: JPG ili WebP
- **Veličina**: Max 200KB po slici

### Galerija:
- **Kvadrat**: 1000x1000px (epoksi, nakit, mali predmeti)
- **Landscape**: 1600x900px (interijeri, web projekti)
- **Portrait**: 900x1200px (ormari, vertikalni projekti)
- **Format**: JPG ili WebP
- **Veličina**: Max 300KB po slici

### Profilna slika:
- **Omjer**: 1:1 (kvadrat)
- **Dimenzije**: 800x800px
- **Format**: JPG ili WebP
- **Veličina**: Max 150KB

## 🎨 Optimizacija slika

### Online alati za kompresiju:
- [TinyPNG](https://tinypng.com/) - Za PNG i JPG
- [Squoosh](https://squoosh.app/) - Google alat za sve formate
- [ImageOptim](https://imageoptim.com/) - Mac aplikacija

### Preporuke:
1. **Uvijek kompresirajte slike** prije uploada
2. **Koristite JPG** za fotografije, PNG za logo/grafiku
3. **WebP format** je najbolji za web (moderna podrška)
4. **Imenujte datoteke jasno**: `epoksi-poklon-set.jpg` umjesto `IMG_1234.jpg`

## 🚀 Implementacija s React-om (Napredno)

Ako želite naprednije upravljanje slikama, koristite React komponente:

### Kreiranje Image komponente:

```tsx
// src/components/OptimizedImage.tsx
interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: string
}

export function OptimizedImage({ src, alt, className, aspectRatio }: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false)
  
  return (
    <div className={`relative ${aspectRatio || 'aspect-square'} ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
```

### Korištenje:
```tsx
<OptimizedImage 
  src={product.image}
  alt={product.name}
  className="rounded-xl"
  aspectRatio="aspect-square"
/>
```

## ✅ Checklist

- [ ] Kreiran `public/images/` folder s podfoldovima
- [ ] Dodane i kompresirane slike proizvoda
- [ ] Ažuriran `products.ts` s putanjama do slika
- [ ] Zamijenjen placeholder u `LRCSection.tsx`
- [ ] Dodane slike za galeriju
- [ ] Ažuriran `GallerySection.tsx` s putanjama
- [ ] Zamijenjen placeholder u galeriji
- [ ] Dodana profilna slika
- [ ] Ažuriran `AboutSection.tsx`
- [ ] Testirane sve slike u pregledniku
- [ ] Provjerena brzina učitavanja

## 📞 Pomoć

Ako naiđete na probleme:
1. Provjerite da li su putanje do slika ispravne
2. Provjerite da li su slike u `public/` folderu (ne u `src/`)
3. Osvježite preglednik (CTRL+F5 za hard refresh)
4. Provjerite konzolu za greške (F12 u pregledniku)

---

**Napomena**: Placeholder slike će ostati vidljive sve dok ne dodate stvarne slike i ne ažurirate kod kako je opisano gore.








