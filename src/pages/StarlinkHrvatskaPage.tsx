import type { ReactNode } from 'react'
import { AnimatedPage } from '../components/AnimatedPage'
import { PageSEO, SITE_NAME, SITE_URL } from '../components/PageSEO'
import {
  STARLINK_HR,
  STARLINK_HR_PATH,
  STARLINK_REFERRAL_REL,
  formatStarlinkContentVerifiedDate,
} from '../config/starlinkHr'

type Lang = 'hr' | 'en'

interface StarlinkHrvatskaPageProps {
  language: Lang
}

const IMAGE_FRAME =
  'relative overflow-hidden rounded-2xl border border-[rgba(110,68,255,0.14)] bg-white/45 p-2 shadow-[0_12px_48px_rgba(46,36,71,0.08)] backdrop-blur-md dark:border-lavender/18 dark:bg-white/[0.06] sm:p-2.5'

const SURFACE_CARD =
  'rounded-2xl border border-[rgba(110,68,255,0.1)] bg-white/55 p-5 shadow-sm backdrop-blur-sm dark:border-lavender/12 dark:bg-white/[0.04] sm:p-6'

const SECTION_CLASS =
  'Section fade-in scroll-mt-28 px-4 py-10 sm:px-6 sm:py-12 lg:py-14'

const H2_CLASS =
  'font-heading text-2xl font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:text-3xl'

const BODY_CLASS =
  'text-base leading-relaxed text-plum/78 dark:text-pearl/75 sm:text-[1.0625rem]'

const copy = {
  seoTitle: {
    hr: 'Starlink u Hrvatskoj – vodič prije narudžbe',
    en: 'Starlink in Croatia – guide before ordering',
  },
  seoDescription: {
    hr: 'Jednostavan vodič na hrvatskom: kako Starlink radi, kome može koristiti, što provjeriti prije narudžbe i kako funkcionira referral pogodnost.',
    en: 'A simple guide to Starlink in Croatia: how it works, who it may help, what to check before ordering and how the referral benefit works.',
  },
  h1: {
    hr: 'Starlink u Hrvatskoj: jednostavan vodič prije narudžbe',
    en: 'Starlink in Croatia: a simple guide before ordering',
  },
  intro: {
    hr: 'Starlink može biti zanimljiva opcija za kuće, vikendice i lokacije na kojima klasični kabelski ili mobilni internet nije dovoljno dostupan ili stabilan. Ovaj neovisni vodič na hrvatskom jeziku objašnjava što trebate provjeriti prije odluke.',
    en: 'Starlink may be an option for homes, holiday properties and locations where cable or mobile internet is unavailable or unreliable. This independent guide explains what you should check before making a decision.',
  },
  ctaPrimary: {
    hr: 'Provjeri dostupnost i aktualnu ponudu',
    en: 'Check availability and current offer',
  },
  ctaSecondary: {
    hr: 'Kako funkcionira?',
    en: 'How does it work?',
  },
  referralNoteLead: {
    hr: 'Napomena:',
    en: 'Note:',
  },
  referralNote: {
    hr: 'Ovo je referral poveznica. Ako putem nje naručite Starlink i ispunjeni su aktualni uvjeti programa, vi možete ostvariti jedan mjesec usluge bez naknade, a pogodnost mogu ostvariti i ja kao preporučitelj.',
    en: 'This is a referral link. If you order Starlink through this link and meet the current programme requirements, you may receive one month of service at no charge, and I may also receive a referral benefit.',
  },
  independenceNote: {
    hr: "Ani's Studio nije povezan sa Starlinkom i nije njegov zastupnik ni prodavatelj. Narudžba, dostupnost, cijene i uvjeti provjeravaju se izravno na službenoj Starlink stranici.",
    en: "Ani's Studio is not affiliated with Starlink and is not its representative or reseller. Orders, availability, prices and terms are handled directly through the official Starlink website.",
  },
  trustTags: {
    hr: [
      'Vodič na hrvatskom',
      'Neovisne informacije',
      'Narudžba izravno od Starlinka',
    ],
    en: [
      'Guide available in Croatian and English',
      'Independent information',
      'Order directly from Starlink',
    ],
  },
  heroAlt: {
    hr: 'Ilustracija kuće u ruralnom krajoliku s vanjskom satelitskom antenom i obitelji koja koristi internet na terasi.',
    en: 'Illustration of a house in a rural landscape with an outdoor satellite antenna and a family using the internet on the terrace.',
  },
  howHeading: {
    hr: 'Što je satelitski internet?',
    en: 'What is satellite internet?',
  },
  howBody: {
    hr: 'Za razliku od kabelskog interneta, veza se uspostavlja između satelita, vanjske antene i kućnog usmjerivača. Zbog toga može biti dostupna i ondje gdje nema optike, koaksijalnog kabela ili kvalitetnog signala mobilne mreže.',
    en: 'Unlike cable internet, the connection is made between satellites, an outdoor antenna and a home router. That is why it can be available even where there is no fibre, coaxial cable or a reliable mobile signal.',
  },
  howSteps: {
    hr: [
      'Satelit šalje i prima podatke',
      'Vanjska antena komunicira sa satelitima',
      'Usmjerivač povezuje uređaje u kući',
    ],
    en: [
      'The satellite sends and receives data',
      'The outdoor antenna communicates with the satellites',
      'The router connects devices in the home',
    ],
  },
  howDisclaimer: {
    hr: 'Ovo je pojednostavljeni opis. Brzina, kašnjenje i stabilnost ovise o lokaciji, opremi, vremenskim uvjetima i opterećenju mreže, pa ih ne treba shvatiti kao jamstvo.',
    en: 'This is a simplified description. Speed, latency and stability depend on location, equipment, weather conditions and network load, so they should not be treated as a guarantee.',
  },
  howAlt: {
    hr: 'Pojednostavljeni prikaz veze između satelita, vanjske antene i kućnog usmjerivača.',
    en: 'Simplified illustration of the connection between satellites, an outdoor antenna and a home router.',
  },
  whoHeading: {
    hr: 'Kome bi mogao biti koristan?',
    en: 'Who might it be useful for?',
  },
  audience: {
    hr: [
      'kućanstvima izvan gradskih područja',
      'vikendicama i povremeno korištenim objektima',
      'lokacijama bez optike ili stabilne kabelske veze',
      'korisnicima kojima mobilna mreža nema dovoljno dobar signal',
      'određenim korisnicima kojima je potrebna veza na više lokacija',
    ],
    en: [
      'households outside urban areas',
      'holiday homes and occasionally used properties',
      'locations without fibre or a stable cable connection',
      'users whose mobile network signal is not good enough',
      'some users who need a connection at more than one location',
    ],
  },
  whoNote: {
    hr: 'Dostupnost i prikladan paket ovise o adresi, načinu uporabe i aktualnoj ponudi. Prije narudžbe to treba provjeriti na službenoj Starlink stranici.',
    en: 'Availability and a suitable plan depend on the address, how the service is used and the current offer. Check this on the official Starlink website before ordering.',
  },
  checkHeading: {
    hr: 'Što treba provjeriti prije narudžbe?',
    en: 'What should you check before ordering?',
  },
  checklist: {
    hr: [
      'dostupnost usluge na adresi',
      'jasan pogled prema nebu',
      'moguće prepreke poput stabala, krovova i viših objekata',
      'mjesto montaže i sigurno provođenje kabela',
      'pristup električnoj energiji',
      'aktualnu cijenu opreme, dostave i mjesečne usluge',
      'pravila korištenja na drugoj lokaciji',
    ],
    en: [
      'service availability at the address',
      'a clear view of the sky',
      'possible obstructions such as trees, roofs and taller buildings',
      'mounting location and safe cable routing',
      'access to electrical power',
      'the current price of equipment, delivery and monthly service',
      'rules for using the service at another location',
    ],
  },
  checkNote: {
    hr: 'Zapreke poput stabala, krovova i viših objekata mogu zakloniti pogled prema nebu i utjecati na stabilnost veze. Zato je mjesto montaže antene važno provjeriti prije odluke.',
    en: 'Obstructions such as trees, roofs and taller buildings can block the view of the sky and affect connection stability. That is why the antenna mounting location should be checked before you decide.',
  },
  antennaAlt: {
    hr: 'Ilustracija položaja vanjske antene i potrebnog otvorenog pogleda prema nebu, bez zapreka poput stabala ili krovova.',
    en: 'Illustration of outdoor antenna placement and the need for a clear view of the sky, without obstructions such as trees or roofs.',
  },
  useHeading: {
    hr: 'Kućna ili putna uporaba',
    en: 'Home or travel use',
  },
  useBody: {
    hr: 'Starlink može nuditi različite vrste usluge za stalnu kućnu adresu i za prenosivu ili putnu uporabu. Nazivi paketa, područja dostupnosti i pravila mogu se mijenjati, zato ih prije narudžbe provjerite na službenoj stranici.',
    en: 'Starlink may offer different types of service for a fixed home address and for portable or travel use. Plan names, coverage areas and rules may change, so check them on the official website before ordering.',
  },
  homeTitle: {
    hr: 'Za dom',
    en: 'For the home',
  },
  homeBody: {
    hr: 'Namijenjeno stalnoj adresi, npr. kući ili vikendici. Prije narudžbe provjerite je li usluga dostupna na toj adresi i koja pravila vrijede za prelazak na drugu lokaciju.',
    en: 'Intended for a fixed address, such as a house or holiday home. Before ordering, check whether the service is available at that address and which rules apply if you move it to another location.',
  },
  travelTitle: {
    hr: 'Za putovanja i promjenjive lokacije',
    en: 'For travel and changing locations',
  },
  travelBody: {
    hr: 'Namijenjeno prenosivoj uporabi, npr. na putovanju ili na više mjesta. Dostupnost, pauza usluge i pravila korištenja izvan početne zone mogu se razlikovati — provjerite ih na službenoj stranici.',
    en: 'Intended for portable use, for example while travelling or at more than one place. Availability, service pause options and rules outside the original coverage area may differ — check them on the official website.',
  },
  homeTravelAlt: {
    hr: 'Usporedni prikaz kućne uporabe satelitskog interneta i prenosive uporabe na putovanju.',
    en: 'Side-by-side illustration of home satellite internet use and portable use while travelling.',
  },
  balanceHeading: {
    hr: 'Prednosti i ograničenja',
    en: 'Benefits and limitations',
  },
  benefitsHeading: {
    hr: 'Moguće prednosti',
    en: 'Possible benefits',
  },
  limitationsHeading: {
    hr: 'Moguća ograničenja',
    en: 'Possible limitations',
  },
  benefits: {
    hr: [
      'dostupnost na lokacijama s malo drugih opcija',
      'relativno jednostavno postavljanje',
      'neovisnost o lokalnoj kabelskoj infrastrukturi',
      'mogućnost povezivanja više kućnih uređaja',
    ],
    en: [
      'availability in locations with few other options',
      'relatively straightforward setup',
      'independence from local cable infrastructure',
      'the ability to connect several household devices',
    ],
  },
  limitations: {
    hr: [
      'potreban je odgovarajući pogled prema nebu',
      'početni trošak opreme i dostave',
      'mjesečna cijena može se mijenjati',
      'vremenski uvjeti i prepreke mogu utjecati na vezu',
      'iskustvo i performanse ovise o lokaciji i opterećenju mreže',
    ],
    en: [
      'a suitable view of the sky is required',
      'upfront cost of equipment and delivery',
      'the monthly price may change',
      'weather conditions and obstructions may affect the connection',
      'experience and performance depend on location and network load',
    ],
  },
  costHeading: {
    hr: 'Koliko košta?',
    en: 'How much does it cost?',
  },
  costBody: {
    hr: 'Cijene opreme, dostave i mjesečne usluge mogu se mijenjati. Točan iznos za svoju adresu provjerite neposredno prije narudžbe na službenoj Starlink stranici.',
    en: 'Equipment, delivery and monthly service prices may change. Check the exact amount for your address on the official Starlink website just before you order.',
  },
  costCta: {
    hr: 'Provjeri aktualnu ponudu na Starlinku',
    en: 'Check the current offer on Starlink',
  },
  referralHeading: {
    hr: 'Kako funkcionira referral pogodnost?',
    en: 'How does the referral benefit work?',
  },
  referralSteps: {
    hr: [
      'Otvorite Starlink preko označene referral poveznice',
      'Provjerite adresu, dostupnost i aktualne uvjete',
      'Ako završite narudžbu i ispunjeni su uvjeti programa, možete ostvariti jedan mjesec usluge bez naknade',
    ],
    en: [
      'Open Starlink through the marked referral link',
      'Check the address, availability and current terms',
      'If you complete an order and meet the programme requirements, you may receive one month of service at no charge',
    ],
  },
  referralLimits: {
    hr: "Pogodnost određuje Starlink. Uvjeti se mogu promijeniti. Ani's Studio ne obrađuje narudžbu ni plaćanje i ne može odobriti niti jamčiti pogodnost.",
    en: "Starlink determines the benefit. Terms may change. Ani's Studio does not process the order or payment and cannot approve or guarantee the benefit.",
  },
  referralCta: {
    hr: 'Otvori Starlink referral poveznicu',
    en: 'Open the Starlink referral link',
  },
  orderHeading: {
    hr: 'Kako izgleda narudžba?',
    en: 'What does ordering look like?',
  },
  orderSteps: {
    hr: [
      'Otvorite službenu stranicu preko poveznice',
      'Unesite adresu i provjerite dostupnost',
      'Pregledajte prikazani paket, opremu, dostavu i uvjete',
      'Provjerite konačni iznos prije plaćanja',
      'Narudžbu dovršite izravno na Starlink stranici',
    ],
    en: [
      'Open the official website through the link',
      'Enter your address and check availability',
      'Review the displayed plan, equipment, delivery and terms',
      'Check the final amount before payment',
      'Complete the order directly on the Starlink website',
    ],
  },
  faqHeading: {
    hr: 'Česta pitanja',
    en: 'Frequently asked questions',
  },
  faq: [
    {
      question: {
        hr: 'Je li ovo službena Starlink stranica?',
        en: 'Is this an official Starlink website?',
      },
      answer: {
        hr: "Nije. Ovo je neovisni informativni vodič Ani's Studija. Službena stranica nalazi se na starlink.com, a narudžba se obavlja isključivo tamo.",
        en: "No. This is an independent informational guide from Ani's Studio. The official website is at starlink.com, and orders are placed only there.",
      },
    },
    {
      question: {
        hr: "Kupujem li Starlink od Ani's Studija?",
        en: "Am I purchasing Starlink from Ani's Studio?",
      },
      answer: {
        hr: "Ne. Ani's Studio nije prodavatelj, zastupnik ni pružatelj Starlink usluge. Narudžba i plaćanje obavljaju se izravno na službenoj Starlink stranici.",
        en: "No. Ani's Studio is not a seller, representative or provider of Starlink service. Orders and payment are completed directly on the official Starlink website.",
      },
    },
    {
      question: {
        hr: 'Je li jedan mjesec bez naknade zajamčen?',
        en: 'Is one month at no charge guaranteed?',
      },
      answer: {
        hr: 'Nije zajamčen. Ako naručite putem referral poveznice i ispunjeni su aktualni uvjeti programa, možete ostvariti jedan mjesec usluge bez naknade. Pogodnost određuje Starlink, a uvjeti se mogu promijeniti.',
        en: 'It is not guaranteed. If you order through the referral link and meet the current programme requirements, you may receive one month of service at no charge. Starlink determines the benefit, and terms may change.',
      },
    },
    {
      question: {
        hr: 'Radi li Starlink na svakoj adresi u Hrvatskoj?',
        en: 'Is Starlink available at every address in Croatia?',
      },
      answer: {
        hr: 'Ne nužno. Dostupnost ovisi o adresi, načinu uporabe i aktualnoj ponudi. Prije odluke to treba provjeriti na službenoj Starlink stranici.',
        en: 'Not necessarily. Availability depends on the address, how the service is used and the current offer. Check this on the official Starlink website before deciding.',
      },
    },
    {
      question: {
        hr: 'Treba li antena imati otvoren pogled prema nebu?',
        en: 'Does the antenna need a clear view of the sky?',
      },
      answer: {
        hr: 'Da, jasan pogled prema nebu važan je za stabilniju vezu. Stabla, krovovi i viši objekti mogu zakloniti signal i utjecati na pouzdanost.',
        en: 'Yes, a clear view of the sky is important for a more stable connection. Trees, roofs and taller buildings can block the signal and affect reliability.',
      },
    },
    {
      question: {
        hr: 'Jesu li cijene i paketi uvijek isti?',
        en: 'Are prices and plans always the same?',
      },
      answer: {
        hr: 'Nisu. Cijene opreme, dostave i mjesečne usluge, kao i nazivi paketa, mogu se mijenjati. Točan iznos za svoju adresu provjerite neposredno prije narudžbe.',
        en: 'No. Equipment, delivery and monthly service prices, as well as plan names, may change. Check the exact amount for your address just before you order.',
      },
    },
    {
      question: {
        hr: 'Može li se oprema koristiti na drugoj lokaciji?',
        en: 'Can the equipment be used at another location?',
      },
      answer: {
        hr: 'To ovisi o vrsti usluge i aktualnim pravilima Starlinka. Prije narudžbe na službenoj stranici provjerite razliku između kućne i putne uporabe.',
        en: "That depends on the type of service and Starlink's current rules. Before ordering, check the difference between home and travel use on the official website.",
      },
    },
    {
      question: {
        hr: "Pruža li Ani's Studio tehničku podršku za Starlink?",
        en: "Does Ani's Studio provide Starlink technical support?",
      },
      answer: {
        hr: "Ne. Ani's Studio ne pruža tehničku podršku za Starlink, ne obrađuje narudžbe i ne može odobriti pogodnosti. Za podršku se obratite Starlinku putem službene stranice.",
        en: "No. Ani's Studio does not provide Starlink technical support, does not process orders and cannot approve benefits. For support, contact Starlink through the official website.",
      },
    },
  ],
  finalHeading: {
    hr: 'Provjerite odgovara li Starlink vašoj lokaciji',
    en: 'Check whether Starlink is right for your location',
  },
  finalBody: {
    hr: 'Prije narudžbe provjerite dostupnost, konačnu cijenu, opremu i aktualne uvjete izravno na službenoj stranici.',
    en: 'Before ordering, check availability, the final price, equipment and current terms directly on the official website.',
  },
  legalHeading: {
    hr: 'Pravna napomena',
    en: 'Legal notice',
  },
  legalBody: {
    hr: "Ova stranica je neovisni informativni vodič Ani's Studija. Ani's Studio nije povezan sa Starlinkom, nije njegov zastupnik, prodavatelj ni pružatelj tehničke podrške. Starlink naziv pripada njegovu vlasniku. Dostupnost, cijene, uvjeti usluge i referral pogodnosti određuje Starlink i mogu se promijeniti.",
    en: "This page is an independent informational guide provided by Ani's Studio. Ani's Studio is not affiliated with Starlink and is not its representative, reseller or technical support provider. The Starlink name belongs to its owner. Availability, prices, service terms and referral benefits are determined by Starlink and may change.",
  },
  reviewedLabel: {
    hr: 'Sadržaj posljednji put provjeren:',
    en: 'Content last reviewed:',
  },
  legalLink: {
    hr: 'Službeni Starlink pravni uvjeti',
    en: 'Official Starlink legal terms',
  },
} as const

function ReferralLink({
  children,
  className,
  id,
  describedBy,
}: {
  children: ReactNode
  className?: string
  id?: string
  describedBy?: string
}) {
  return (
    <a
      id={id}
      href={STARLINK_HR.referralUrl}
      target="_blank"
      rel={STARLINK_REFERRAL_REL}
      className={className}
      aria-describedby={describedBy}
    >
      {children}
    </a>
  )
}

function ReferralNote({
  id,
  language,
  compact = false,
}: {
  id?: string
  language: Lang
  compact?: boolean
}) {
  return (
    <div id={id} className="space-y-2">
      <p className="text-xs leading-relaxed text-plum/72 dark:text-pearl/70 sm:text-[0.8125rem]">
        <span className="font-semibold text-plum/82 dark:text-pearl/80">
          {copy.referralNoteLead[language]}
        </span>{' '}
        {copy.referralNote[language]}
      </p>
      {!compact && (
        <p className="text-xs leading-relaxed text-plum/68 dark:text-pearl/65 sm:text-[0.8125rem]">
          {copy.independenceNote[language]}
        </p>
      )}
    </div>
  )
}

function NumberedSteps({ items }: { items: readonly string[] }) {
  return (
    <ol className="mt-6 space-y-3">
      {items.map((item, index) => (
        <li key={item} className="flex gap-3">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amethyst/15 text-sm font-bold text-amethyst dark:bg-lavender/20 dark:text-lavender"
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <span className="min-w-0 pt-1 text-sm leading-relaxed text-plum/78 dark:text-pearl/72 sm:text-[0.9375rem]">
            {item}
          </span>
        </li>
      ))}
    </ol>
  )
}

function GuideImage({
  src,
  alt,
  lazy = true,
}: {
  src: string
  alt: string
  lazy?: boolean
}) {
  return (
    <div className={IMAGE_FRAME}>
      <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[rgba(248,246,255,0.55)] dark:bg-white/[0.04]">
        <img
          src={src}
          alt={alt}
          width={1600}
          height={900}
          className="h-full w-full object-contain"
          loading={lazy ? 'lazy' : undefined}
          decoding="async"
          fetchPriority={lazy ? undefined : 'high'}
        />
      </div>
    </div>
  )
}

export default function StarlinkHrvatskaPage({ language }: StarlinkHrvatskaPageProps) {
  const verifiedOn = formatStarlinkContentVerifiedDate(language)
  const seoTitle = copy.seoTitle[language]
  const seoDescription = copy.seoDescription[language]

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seoTitle,
      description: seoDescription,
      url: `${SITE_URL}${STARLINK_HR_PATH}`,
      inLanguage: language,
      dateModified: STARLINK_HR.contentLastVerified,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: copy.faq.map((item) => ({
        '@type': 'Question',
        name: item.question[language],
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer[language],
        },
      })),
    },
  ]

  return (
    <AnimatedPage>
      <PageSEO
        title={seoTitle}
        description={seoDescription}
        canonical={STARLINK_HR_PATH}
        jsonLd={jsonLd}
      />
      <main className="min-w-0" lang={language}>
        <section className="Section fade-in px-4 pt-10 pb-8 sm:px-6 sm:pt-14 sm:pb-10 lg:pt-16">
          <div className="mx-auto grid min-w-0 max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
                {copy.h1[language]}
              </h1>
              <p className={`mt-5 ${BODY_CLASS}`}>{copy.intro[language]}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ReferralLink
                  id="starlink-hero-cta"
                  describedBy="starlink-hero-referral-note"
                  className="btn btn-primary inline-flex min-h-[48px] w-full items-center justify-center !whitespace-normal px-6 py-3 text-center text-base font-semibold shadow-md sm:w-auto sm:max-w-md"
                >
                  {copy.ctaPrimary[language]}
                </ReferralLink>
                <a
                  href="#kako-funkcionira"
                  className="btn btn-secondary inline-flex min-h-[48px] w-full items-center justify-center !whitespace-normal px-6 py-3 text-center text-base font-semibold sm:w-auto"
                >
                  {copy.ctaSecondary[language]}
                </a>
              </div>
              <div className="mt-4 max-w-xl">
                <ReferralNote id="starlink-hero-referral-note" language={language} />
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {copy.trustTags[language].map((tag) => (
                  <li
                    key={tag}
                    className="inline-flex min-h-[32px] items-center rounded-full border border-amethyst/20 bg-white/50 px-3 py-1 text-xs font-semibold text-plum/75 dark:border-lavender/20 dark:bg-white/5 dark:text-pearl/75"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">
              <div className={IMAGE_FRAME}>
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[rgba(248,246,255,0.55)] dark:bg-white/[0.04] md:aspect-[16/9]">
                  <picture>
                    <source
                      media="(max-width: 767px)"
                      srcSet={STARLINK_HR.images.heroMobile}
                      type="image/webp"
                    />
                    <img
                      src={STARLINK_HR.images.heroDesktop}
                      alt={copy.heroAlt[language]}
                      width={1600}
                      height={900}
                      className="h-full w-full object-contain"
                      decoding="async"
                      fetchPriority="high"
                      loading="eager"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="kako-funkcionira"
          className={SECTION_CLASS}
          aria-labelledby="starlink-how-heading"
        >
          <div className="mx-auto grid min-w-0 max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <h2 id="starlink-how-heading" className={H2_CLASS}>
                {copy.howHeading[language]}
              </h2>
              <p className={`mt-4 ${BODY_CLASS}`}>{copy.howBody[language]}</p>
              <NumberedSteps items={copy.howSteps[language]} />
              <p className="mt-4 text-sm leading-relaxed text-plum/68 dark:text-pearl/65">
                {copy.howDisclaimer[language]}
              </p>
            </div>
            <GuideImage src={STARLINK_HR.images.howItWorks} alt={copy.howAlt[language]} />
          </div>
        </section>

        <section className={SECTION_CLASS} aria-labelledby="starlink-who-heading">
          <div className="mx-auto max-w-5xl">
            <h2 id="starlink-who-heading" className={H2_CLASS}>
              {copy.whoHeading[language]}
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {copy.audience[language].map((item) => (
                <li key={item} className={SURFACE_CARD}>
                  <p className="text-sm leading-relaxed text-plum/80 dark:text-pearl/75 sm:text-[0.9375rem]">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
            <p className={`mt-6 ${BODY_CLASS}`}>{copy.whoNote[language]}</p>
          </div>
        </section>

        <section className={SECTION_CLASS} aria-labelledby="starlink-check-heading">
          <div className="mx-auto grid min-w-0 max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <h2 id="starlink-check-heading" className={H2_CLASS}>
                {copy.checkHeading[language]}
              </h2>
              <ul className="mt-6 space-y-3">
                {copy.checklist[language].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amethyst/70 dark:bg-lavender/70"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-plum/78 dark:text-pearl/72 sm:text-[0.9375rem]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className={`mt-6 ${BODY_CLASS}`}>{copy.checkNote[language]}</p>
            </div>
            <GuideImage src={STARLINK_HR.images.antenna} alt={copy.antennaAlt[language]} />
          </div>
        </section>

        <section className={SECTION_CLASS} aria-labelledby="starlink-use-heading">
          <div className="mx-auto max-w-6xl">
            <h2 id="starlink-use-heading" className={H2_CLASS}>
              {copy.useHeading[language]}
            </h2>
            <p className={`mt-4 max-w-3xl ${BODY_CLASS}`}>{copy.useBody[language]}</p>
            <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">
              <GuideImage
                src={STARLINK_HR.images.homeTravel}
                alt={copy.homeTravelAlt[language]}
              />
              <div className="grid grid-cols-1 gap-4">
                <article className={SURFACE_CARD}>
                  <h3 className="font-heading text-lg font-bold text-plum/90 dark:text-pearl">
                    {copy.homeTitle[language]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-plum/75 dark:text-pearl/70 sm:text-[0.9375rem]">
                    {copy.homeBody[language]}
                  </p>
                </article>
                <article className={SURFACE_CARD}>
                  <h3 className="font-heading text-lg font-bold text-plum/90 dark:text-pearl">
                    {copy.travelTitle[language]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-plum/75 dark:text-pearl/70 sm:text-[0.9375rem]">
                    {copy.travelBody[language]}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className={SECTION_CLASS} aria-labelledby="starlink-balance-heading">
          <div className="mx-auto max-w-5xl">
            <h2 id="starlink-balance-heading" className={H2_CLASS}>
              {copy.balanceHeading[language]}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className={SURFACE_CARD}>
                <h3 className="font-heading text-lg font-bold text-plum/90 dark:text-pearl">
                  {copy.benefitsHeading[language]}
                </h3>
                <ul className="mt-4 space-y-3">
                  {copy.benefits[language].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amethyst/70 dark:bg-lavender/70"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-plum/78 dark:text-pearl/72 sm:text-[0.9375rem]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={SURFACE_CARD}>
                <h3 className="font-heading text-lg font-bold text-plum/90 dark:text-pearl">
                  {copy.limitationsHeading[language]}
                </h3>
                <ul className="mt-4 space-y-3">
                  {copy.limitations[language].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-plum/35 dark:bg-pearl/40"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-plum/78 dark:text-pearl/72 sm:text-[0.9375rem]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={SECTION_CLASS} aria-labelledby="starlink-cost-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="starlink-cost-heading" className={H2_CLASS}>
              {copy.costHeading[language]}
            </h2>
            <p className={`mt-4 ${BODY_CLASS}`}>{copy.costBody[language]}</p>
            <ReferralLink
              describedBy="starlink-cost-referral-note"
              className="btn btn-primary mt-6 inline-flex min-h-[48px] w-full items-center justify-center !whitespace-normal px-6 py-3 text-center text-base font-semibold shadow-md sm:w-auto"
            >
              {copy.costCta[language]}
            </ReferralLink>
            <div className="mt-4">
              <ReferralNote id="starlink-cost-referral-note" language={language} compact />
            </div>
          </div>
        </section>

        <section
          id="referral"
          className={SECTION_CLASS}
          aria-labelledby="starlink-referral-heading"
        >
          <div className="mx-auto max-w-3xl">
            <h2 id="starlink-referral-heading" className={H2_CLASS}>
              {copy.referralHeading[language]}
            </h2>
            <NumberedSteps items={copy.referralSteps[language]} />
            <div className={`${SURFACE_CARD} mt-6 space-y-2`}>
              <p className="text-sm leading-relaxed text-plum/75 dark:text-pearl/72">
                {copy.referralLimits[language]}
              </p>
            </div>
            <ReferralLink
              describedBy="starlink-referral-note"
              className="btn btn-primary mt-6 inline-flex min-h-[48px] w-full items-center justify-center !whitespace-normal px-6 py-3 text-center text-base font-semibold shadow-md sm:w-auto"
            >
              {copy.referralCta[language]}
            </ReferralLink>
            <div className="mt-4">
              <ReferralNote id="starlink-referral-note" language={language} />
            </div>
          </div>
        </section>

        <section className={SECTION_CLASS} aria-labelledby="starlink-order-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="starlink-order-heading" className={H2_CLASS}>
              {copy.orderHeading[language]}
            </h2>
            <NumberedSteps items={copy.orderSteps[language]} />
          </div>
        </section>

        <section
          id="starlink-faq"
          className={SECTION_CLASS}
          aria-labelledby="starlink-faq-heading"
        >
          <div className="mx-auto max-w-3xl">
            <h2 id="starlink-faq-heading" className={H2_CLASS}>
              {copy.faqHeading[language]}
            </h2>
            <div className="mt-6 space-y-3">
              {copy.faq.map((item) => (
                <details
                  key={item.question.hr}
                  className="rounded-2xl border border-[rgba(110,68,255,0.1)] bg-white/55 px-5 py-1 shadow-sm backdrop-blur-sm dark:border-lavender/12 dark:bg-white/[0.04]"
                >
                  <summary className="min-h-[44px] cursor-pointer py-3.5 text-[0.9375rem] font-semibold leading-snug text-plum/90 dark:text-pearl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst/50">
                    {item.question[language]}
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed text-plum/75 dark:text-pearl/70">
                    {item.answer[language]}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="Section fade-in px-4 pb-8 sm:px-6 sm:pb-10" aria-labelledby="starlink-final-cta-heading">
          <div className="mx-auto max-w-xl">
            <div className="rounded-2xl border border-[rgba(110,68,255,0.12)] bg-white/50 p-6 text-center shadow-[0_8px_40px_rgba(46,36,71,0.06)] backdrop-blur-md dark:border-lavender/12 dark:bg-white/[0.04] dark:shadow-[0_12px_48px_rgba(0,0,0,0.25)] sm:p-8">
              <h2
                id="starlink-final-cta-heading"
                className="font-heading text-xl font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:text-2xl"
              >
                {copy.finalHeading[language]}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-plum/78 dark:text-pearl/72 sm:mt-4 sm:text-[0.9375rem]">
                {copy.finalBody[language]}
              </p>
              <ReferralLink
                describedBy="starlink-final-referral-note"
                className="btn btn-primary mt-6 inline-flex min-h-[48px] w-full max-w-sm items-center justify-center !whitespace-normal px-8 py-3 text-center text-base font-semibold shadow-md sm:mt-7 sm:w-auto sm:px-10"
              >
                {copy.ctaPrimary[language]}
              </ReferralLink>
              <div className="mx-auto mt-4 max-w-md text-left">
                <ReferralNote id="starlink-final-referral-note" language={language} compact />
              </div>
            </div>
          </div>
        </section>

        <section className="Section fade-in px-4 pb-12 sm:px-6 sm:pb-14 lg:pb-16" aria-labelledby="starlink-legal-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="starlink-legal-heading" className="sr-only">
              {copy.legalHeading[language]}
            </h2>
            <p className="text-sm leading-relaxed text-plum/68 dark:text-pearl/65">
              {copy.legalBody[language]}
            </p>
            <p className="mt-4 text-sm text-plum/62 dark:text-pearl/58">
              {copy.reviewedLabel[language]} {verifiedOn}
            </p>
            <p className="mt-3 text-sm">
              <a
                href={STARLINK_HR.legalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-amethyst/40 underline-offset-2 hover:text-amethyst dark:decoration-lavender/40 dark:hover:text-lavender"
              >
                {copy.legalLink[language]}
              </a>
            </p>
          </div>
        </section>
      </main>
    </AnimatedPage>
  )
}
