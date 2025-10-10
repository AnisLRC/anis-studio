// Sample product data for Ani's LRC

export interface Product {
  id: string
  name: string
  nameHr: string
  price: number
  image: string
  tags: string[]
  description: string
  descriptionHr: string
}

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Epoxy Resin Coaster Set',
    nameHr: 'Set podmetača od epoksidne smole',
    price: 25.00,
    image: '🎨',
    tags: ['epoxy', 'home', 'gift'],
    description: 'Handcrafted coasters with unique epoxy resin patterns and natural wood accents.',
    descriptionHr: 'Ručno izrađeni podmetači s jedinstvenim uzorcima epoksidne smole i prirodnim drvenim detaljima.'
  },
  {
    id: '2',
    name: 'Laser Engraved Wooden Sign',
    nameHr: 'Laserski gravirani drveni natpis',
    price: 45.00,
    image: '🪵',
    tags: ['wood', 'laser', 'custom'],
    description: 'Personalized wooden sign with laser-engraved text and decorative elements.',
    descriptionHr: 'Personalizirani drveni natpis s laserski graviranim tekstom i ukrasnim elementima.'
  },
  {
    id: '3',
    name: 'Macrame Wall Hanging',
    nameHr: 'Makrame zidni ukras',
    price: 35.00,
    image: '🧶',
    tags: ['macrame', 'decor', 'handmade'],
    description: 'Beautiful macrame wall hanging with natural cotton cord and wooden dowel.',
    descriptionHr: 'Prekrasan makrame zidni ukras s prirodnim pamučnim koncem i drvenim štapićem.'
  },
  {
    id: '4',
    name: 'Ceramic Mug with Epoxy Handle',
    nameHr: 'Keramička šalica s epoksidnom ručkom',
    price: 30.00,
    image: '☕',
    tags: ['ceramic', 'epoxy', 'kitchen'],
    description: 'Unique ceramic mug with custom epoxy resin handle and personalized design.',
    descriptionHr: 'Jedinstvena keramička šalica s prilagođenom epoksidnom ručkom i personaliziranim dizajnom.'
  },
  {
    id: '5',
    name: 'Silk Painted Scarf',
    nameHr: 'Šal sručno oslikan na svili',
    price: 55.00,
    image: '🧣',
    tags: ['silk', 'painted', 'fashion'],
    description: 'Hand-painted silk scarf with original artwork and vibrant colors.',
    descriptionHr: 'Ručno oslikan šal od svile s originalnim umjetničkim djelom i živim bojama.'
  },
  {
    id: '6',
    name: 'Epoxy Resin Jewelry Tray',
    nameHr: 'Posuda za nakit od epoksidne smole',
    price: 40.00,
    image: '💎',
    tags: ['epoxy', 'jewelry', 'organizer'],
    description: 'Elegant jewelry tray with epoxy resin base and decorative inclusions.',
    descriptionHr: 'Elegantna posuda za nakit s bazom od epoksidne smole i ukrasnim inkluzijama.'
  }
]

export const productTags = [
  { id: 'all', label: { hr: 'Sve', en: 'All' } },
  { id: 'epoxy', label: { hr: 'Epoksidna smola', en: 'Epoxy' } },
  { id: 'wood', label: { hr: 'Drvo', en: 'Wood' } },
  { id: 'ceramic', label: { hr: 'Keramika', en: 'Ceramic' } },
  { id: 'macrame', label: { hr: 'Makrame', en: 'Macrame' } },
  { id: 'silk', label: { hr: 'Svila', en: 'Silk' } },
  { id: 'laser', label: { hr: 'Laser', en: 'Laser' } },
  { id: 'custom', label: { hr: 'Prilagođeno', en: 'Custom' } },
  { id: 'gift', label: { hr: 'Poklon', en: 'Gift' } },
  { id: 'home', label: { hr: 'Dom', en: 'Home' } },
  { id: 'decor', label: { hr: 'Ukras', en: 'Decor' } },
  { id: 'kitchen', label: { hr: 'Kuhinja', en: 'Kitchen' } },
  { id: 'fashion', label: { hr: 'Moda', en: 'Fashion' } },
  { id: 'jewelry', label: { hr: 'Nakit', en: 'Jewelry' } },
  { id: 'organizer', label: { hr: 'Organizator', en: 'Organizer' } },
  { id: 'handmade', label: { hr: 'Ručno izrađeno', en: 'Handmade' } },
  { id: 'painted', label: { hr: 'Oslikano', en: 'Painted' } }
]


