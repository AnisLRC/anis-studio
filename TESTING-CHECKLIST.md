# Testiranje promjena - Checklist ✅

## Što provjeriti nakon optimizacije dizajna:

### 1. **Header**
- [ ] Header je manji i kompaktniji
- [ ] Logo i navigacija su dobro pozicionirani
- [ ] Mobile menu radi ispravno
- [ ] Language toggle radi
- [ ] Cart button radi

### 2. **WelcomeSection**
- [ ] Visina je smanjena (ne zauzima cijeli ekran)
- [ ] Slogan "Svaka ideja je bitna ✨" je dobro prikazan
- [ ] Tri CTA gumba su u istoj ravni
- [ ] Tekst na gumbima ne prelazi

### 3. **PortfolioSection**
- [ ] Tag gumbovi su u istoj ravni (simetrični)
- [ ] Filter gumbovi imaju konzistentnu visinu
- [ ] Grid layout radi ispravno

### 4. **LRCSection (Webshop)**
- [ ] Tag gumbovi za odabir proizvoda su u istoj ravni
- [ ] Svi tag gumbovi imaju istu visinu
- [ ] Gumb "Pošalji upit" ima pravilno prikazan tekst
- [ ] Procesi su ažurirani (4 procesa: Lasersko rezanje, Lasersko graviranje, Epoksy smola, Svila)
- [ ] Procesi prikazuju samo naslove (bez koraka)

### 5. **InteriorsSection**
- [ ] ProcessSection je na početku (prije forme)
- [ ] Prikazuju se samo koraci 3 i 4 (2D koncept i 3D render)
- [ ] Gumb "Pošalji narudžbu" ima pravilno prikazan tekst
- [ ] Forma je kompaktnija ali još uvijek čitljiva

### 6. **WebAtelierSection**
- [ ] Gumb "Zatraži ponudu" ima pravilno prikazan tekst
- [ ] Tekst gumba je skraćen ("Zatraži ponudu" umjesto "Zatraži ponudu za landing stranicu")
- [ ] CTA sekcija je kompaktnija

### 7. **ContactSection**
- [ ] Gumb "Pošalji poruku" ima pravilno prikazan tekst
- [ ] Forma je kompaktnija

### 8. **Ostale sekcije**
- [ ] TestimonialsSection je kompaktnija
- [ ] FAQSection je kompaktnija
- [ ] AboutSection je kompaktnija

### 9. **Općenito**
- [ ] Stranica zahtijeva manje scroll-a
- [ ] Sve sekcije su bolje optimizirane
- [ ] Nema preloma teksta na gumbima
- [ ] Mobile responsive design radi ispravno
- [ ] Animacije rade glatko

### 10. **Build test**
```bash
npm run build
```
- [ ] Build prođe bez grešaka
- [ ] Nema TypeScript grešaka
- [ ] Nema lint grešaka

---

## Kako testirati:

### Lokalno testiranje:
```bash
npm run dev
```

### Build test:
```bash
npm run build
```

### Mobile testiranje:
- Otvorite dev server na mobilnom uređaju (vidi `MOBILE-TESTING-GUIDE.md`)
- Provjerite da sve radi dobro na mobilnom ekranu

---

## Očekivani rezultati:

✅ **Header:** ~40% manji  
✅ **Sekcije:** ~15% kompaktnije  
✅ **Gumbevi:** Tekst pravilno prikazan, bez overflow-a  
✅ **Webshop:** Simetričan layout  
✅ **ProcessSection:** Na pravom mjestu u Interiors sekciji  
✅ **LRC procesi:** Ažurirani i jednostavniji  

---

**Sve promjene su implementirane i spremne za testiranje!** 🚀

