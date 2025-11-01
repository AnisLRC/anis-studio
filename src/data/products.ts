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
    tags: ['epoxy', 'decor'],
    description: 'Handcrafted coasters with unique epoxy resin patterns and natural wood accents.',
    descriptionHr: 'Ručno izrađeni podmetači s jedinstvenim uzorcima epoksidne smole i prirodnim drvenim detaljima.'
  },
  {
    id: '2',
    name: 'Laser Engraved Wooden Sign',
    nameHr: 'Laserski gravirani drveni natpis',
    price: 45.00,
    image: '🪵',
    tags: ['wood', 'laser', 'decor'],
    description: 'Personalized wooden sign with laser-engraved text and decorative elements.',
    descriptionHr: 'Personalizirani drveni natpis s laserski graviranim tekstom i ukrasnim elementima.'
  },
  {
    id: '3',
    name: 'Epoxy Resin Serving Tray',
    nameHr: 'Poslužavnik od epoksidne smole',
    price: 55.00,
    image: '💎',
    tags: ['epoxy', 'decor'],
    description: 'Beautiful epoxy resin serving tray with unique patterns and colors.',
    descriptionHr: 'Prekrasan poslužavnik od epoksidne smole s jedinstvenim uzorcima i bojama.'
  },
  {
    id: '4',
    name: 'Laser Cut Wooden Clock',
    nameHr: 'Laserski izrezani drveni sat',
    price: 65.00,
    image: '🪵',
    tags: ['wood', 'laser', 'decor'],
    description: 'Elegant wooden clock with laser-cut design and modern aesthetics.',
    descriptionHr: 'Elegantan drveni sat s laserski izrezanim dizajnom i modernom estetikom.'
  },
  {
    id: '5',
    name: 'Epoxy Resin Wall Art',
    nameHr: 'Zidna umjetnina od epoksidne smole',
    price: 75.00,
    image: '💎',
    tags: ['epoxy', 'decor'],
    description: 'Stunning wall art piece made with epoxy resin and creative design.',
    descriptionHr: 'Zapanjujuća zidna umjetnina izrađena od epoksidne smole s kreativnim dizajnom.'
  },
  {
    id: '6',
    name: 'Laser Engraved Keychain',
    nameHr: 'Laserski gravirani privjesak',
    price: 15.00,
    image: '🪵',
    tags: ['wood', 'laser'],
    description: 'Personalized wooden keychain with laser-engraved text or design.',
    descriptionHr: 'Personalizirani drveni privjesak s laserski graviranim tekstom ili dizajnom.'
  },
  {
    id: '7',
    name: 'Laser Cut Mandala Decoration',
    nameHr: 'Laserski izrezana mandala ukras',
    price: 50.00,
    image: '🪵',
    tags: ['wood', 'laser', 'mandala', 'decor'],
    description: 'Beautiful mandala design laser-cut from wood, perfect for wall decoration.',
    descriptionHr: 'Prekrasna mandala laserski izrezana iz drva, savršena za zidni ukras.'
  },
  {
    id: '8',
    name: 'Epoxy Resin Mandala Art',
    nameHr: 'Mandala umjetnina od epoksidne smole',
    price: 80.00,
    image: '💎',
    tags: ['epoxy', 'mandala', 'decor'],
    description: 'Stunning mandala art piece created with epoxy resin and vibrant colors.',
    descriptionHr: 'Zapanjujuća mandala umjetnina stvorena od epoksidne smole s živim bojama.'
  },
  {
    id: '9',
    name: 'Laser Engraved Cutting Board',
    nameHr: 'Laserski gravirana daska za rezanje',
    price: 35.00,
    image: '🪵',
    tags: ['wood', 'laser'],
    description: 'Personalized wooden cutting board with laser-engraved design.',
    descriptionHr: 'Personalizirana drvena daska za rezanje s laserski graviranim dizajnom.'
  },
  {
    id: '10',
    name: 'Plaster Wall Decoration',
    nameHr: 'Zidni ukras od gipsa',
    price: 45.00,
    image: '🎨',
    tags: ['plaster', 'decor'],
    description: 'Elegant wall decoration made from plaster with unique texture and design.',
    descriptionHr: 'Elegantan zidni ukras izrađen od gipsa s jedinstvenom teksturom i dizajnom.'
  },
  {
    id: '11',
    name: 'Epoxy Resin Jewelry Box',
    nameHr: 'Kutija za nakit od epoksidne smole',
    price: 60.00,
    image: '💎',
    tags: ['epoxy', 'jewelry', 'decor'],
    description: 'Beautiful jewelry box with epoxy resin lid and elegant design.',
    descriptionHr: 'Prekrasna kutija za nakit s poklopcem od epoksidne smole i elegantnim dizajnom.'
  },
  {
    id: '12',
    name: 'Plaster Sculpture',
    nameHr: 'Gipsana skulptura',
    price: 70.00,
    image: '🎨',
    tags: ['plaster', 'decor'],
    description: 'Handcrafted plaster sculpture with artistic design and fine details.',
    descriptionHr: 'Ručno izrađena gipsana skulptura s umjetničkim dizajnom i finim detaljima.'
  },
  {
    id: '13',
    name: 'Epoxy Resin Table Top',
    nameHr: 'Stolna ploča od epoksidne smole',
    price: 120.00,
    image: '💎',
    tags: ['epoxy', 'decor'],
    description: 'Custom epoxy resin table top with unique patterns and colors.',
    descriptionHr: 'Prilagođena stolna ploča od epoksidne smole s jedinstvenim uzorcima i bojama.'
  },
  {
    id: '14',
    name: 'Laser Engraved Gift Box',
    nameHr: 'Laserski gravirana kutija za poklon',
    price: 28.00,
    image: '🪵',
    tags: ['wood', 'laser'],
    description: 'Personalized wooden gift box with laser-engraved decoration.',
    descriptionHr: 'Personalizirana drvena kutija za poklon s laserski graviranim ukrasom.'
  },
  {
    id: '15',
    name: 'Plaster Mandala Wall Art',
    nameHr: 'Zidna mandala od gipsa',
    price: 65.00,
    image: '🎨',
    tags: ['plaster', 'mandala', 'decor'],
    description: 'Beautiful mandala wall art made from plaster with intricate design.',
    descriptionHr: 'Prekrasna zidna mandala izrađena od gipsa s zamršenim dizajnom.'
  }
]

export const productTags = [
  { id: 'all', label: { hr: 'Sve', en: 'All' } },
  { id: 'epoxy', label: { hr: 'Epoksidna smola', en: 'Epoxy' } },
  { id: 'wood', label: { hr: 'Gravura', en: 'Engraving' } },
  { id: 'plaster', label: { hr: 'Gips', en: 'Plaster' } },
  { id: 'laser', label: { hr: 'Laser', en: 'Laser' } },
  { id: 'mandala', label: { hr: 'Mandela', en: 'Mandala' } },
  { id: 'jewelry', label: { hr: 'Nakit', en: 'Jewelry' } },
  { id: 'silk', label: { hr: 'Svila', en: 'Silk' } }
]


