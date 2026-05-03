export type TestimonialCategory = 'general' | 'interiors' | 'lrc' | 'webAtelier'

export interface Testimonial {
  id: number
  name: string
  location: { hr: string; en: string }
  rating: number
  text: {
    hr: string
    en: string
  }
  category: TestimonialCategory
  /** Optional attribution (e.g. platform or page name). */
  source?: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Danijel Kordić',
    location: { hr: 'Hrvatska', en: 'Croatia' },
    rating: 5,
    category: 'general',
    text: {
      hr: 'Odlični radovi za svaku prigodu........Sve pohvale',
      en: 'Excellent works for every occasion........All praise',
    },
  },
  {
    id: 2,
    name: 'Ivica Biškup',
    location: { hr: 'Hrvatska', en: 'Croatia' },
    rating: 5,
    category: 'lrc',
    text: {
      hr: 'Predobra "kola za vino" Odrađeno za čistu 10 Preporučujem svima!!',
      en: 'Too good "wine cart" Done for a pure 10 I recommend to everyone!!',
    },
  },
  {
    id: 3,
    name: 'Martina Damjanović',
    location: { hr: 'Hrvatska', en: 'Croatia' },
    rating: 5,
    category: 'general',
    text: {
      hr: 'Odlično odrađeno, svake pohvale i preporuke svima, nećete pogriješiti ❤️❤️❤️❤️',
      en: "Excellent work, all praise and recommendations to everyone, you won't go wrong ❤️❤️❤️❤️",
    },
  },
  {
    id: 4,
    name: 'Sanja Mlinek Vučković',
    location: { hr: 'Hrvatska', en: 'Croatia' },
    rating: 5,
    category: 'general',
    text: {
      hr: 'Najviše od svega mi se sviđa posvećenost poslu. Veliki + od mene. Izašli u susret što me jako razveselilo ❤️',
      en: 'Most of all, I like the dedication to work. Big + from me. They went out of their way to help, which made me very happy ❤️',
    },
  },
  {
    id: 5,
    name: 'Danijel Drmić',
    location: { hr: 'Hrvatska', en: 'Croatia' },
    rating: 5,
    category: 'general',
    text: {
      hr: 'Radovi za svaku preporuku čista desetka',
      en: 'Works for every recommendation, a pure ten',
    },
  },
  {
    id: 6,
    name: 'Katarina Ronto',
    location: { hr: 'Hrvatska', en: 'Croatia' },
    rating: 5,
    category: 'lrc',
    text: {
      hr: 'Ono što mene posebno oduševljava posvećenost je ovome poslu. Entuzijazam koji "pršti" iz radova, energija uložena u detalje te ljubav najvažniji su "začini" ove priče. I u mom domu svoje je mjesto našao jedan takav rad! Preporučujem svakome od srca uživanje u čaroliji Ani\'s LRC! ❤️❤️❤️',
      en: 'What particularly delights me is the dedication to this work. The enthusiasm that "sparkles" from the works, the energy invested in details, and love are the most important "ingredients" of this story. And in my home, one such work has found its place! I wholeheartedly recommend everyone to enjoy the magic of Ani\'s LRC! ❤️❤️❤️',
    },
  },
  {
    id: 7,
    name: 'Đanela Novljaković',
    location: { hr: 'Hrvatska', en: 'Croatia' },
    rating: 5,
    category: 'lrc',
    text: {
      hr: 'Predivni radovi, moj sin oduševljen s poklonom ❤️ Inovatovno i kreativno, za svaku preporuku ✨',
      en: 'Wonderful works, my son is delighted with the gift ❤️ Innovative and creative, for every recommendation ✨',
    },
  },
  {
    id: 8,
    name: 'Branka Brana',
    location: { hr: 'Hrvatska', en: 'Croatia' },
    rating: 5,
    category: 'lrc',
    text: {
      hr: 'Izvrsno! Oduševljena šahom koji je kombinacija rada lasera i epoxy smole. Uredno, precizno, pedantno i uz to šah je personaliziran sa imenom. Svaka čast na idejama i kreativnosti!!!!',
      en: 'Excellent! Delighted with the chess set which is a combination of laser work and epoxy resin. Neat, precise, meticulous, and additionally, the chess set is personalized with a name. Kudos to the ideas and creativity!!!!',
    },
  },
  {
    id: 9,
    name: 'Damir Pejić',
    location: { hr: 'Hrvatska', en: 'Croatia' },
    rating: 5,
    category: 'lrc',
    text: {
      hr: 'Proizvodi su kvalitetni i praktični. Posebno mi se sviđa jer možeš sudjelovati u kreiranju određenog proizvoda i tako ga prilagoditi svojim potrebama. Jako sam zadovoljan tako da moje preporuke. 😊',
      en: 'The products are high quality and practical. I particularly like that you can participate in creating a specific product and thus adapt it to your needs. I am very satisfied, so my recommendations. 😊',
    },
  },
  {
    id: 10,
    name: 'Mirela Galić',
    location: { hr: 'Hrvatska', en: 'Croatia' },
    rating: 5,
    category: 'lrc',
    source: "Facebook — Ani's Studio",
    text: {
      hr: 'Stigli su mi radovi, znači oduševljena sam kvalitetom proizvoda i preciznošću kojom su napravljeni. Definitivno ću opet naručit 😍😍😍',
      en: "Everything arrived, and I'm truly delighted with the product quality and the precision of the work. I will definitely order again 😍😍😍",
    },
  },
]
