import type { ReactNode } from 'react'
import { AnimatedPage } from '../components/AnimatedPage'
import { PageSEO, SITE_NAME, SITE_URL } from '../components/PageSEO'
import { trackEvent } from '../lib/analytics'
import {
  STARLINK_HR,
  STARLINK_HR_PATH,
  STARLINK_REFERRAL_REL,
  formatStarlinkContentVerifiedDate,
} from '../config/starlinkHr'

type Lang = 'hr' | 'en'
type StarlinkReferralPlacement = 'hero' | 'pricing' | 'referral_steps' | 'final_cta'

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
    hr: 'Saznajte kako Starlink radi u Hrvatskoj i kako putem referral poveznice možete ostvariti jedan mjesec usluge bez naknade.',
    en: 'Learn how Starlink works in Croatia and how you may receive one month of service at no charge through the referral link.',
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
    hr: 'Ostvari 1 mjesec bez naknade',
    en: 'Get 1 month at no charge',
  },
  benefitLabel: {
    hr: 'Referral pogodnost',
    en: 'Referral benefit',
  },
  benefitHeadline: {
    hr: '1 mjesec Starlink usluge bez naknade za vas — i 1 mjesec pogodnosti za mene',
    en: '1 month of Starlink service at no charge for you — and a 1-month referral benefit for me',
  },
  benefitFinePrint: {
    hr: 'Vrijedi kada naručite putem moje referral poveznice, prema aktualnim pravilima Starlink referral programa.',
    en: 'Available when you order through my referral link, subject to the current Starlink referral programme rules.',
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
    hr: 'Ovo je referral poveznica. Pogodnost se primjenjuje prema aktualnim pravilima Starlink referral programa.',
    en: 'This is a referral link. The benefit is applied under the current Starlink referral programme rules.',
  },
  independenceNote: {
    hr: "Ani's Studio nije povezan sa Starlinkom i nije njegov zastupnik ni prodavatelj. Narudžba, cijene i uvjeti provjeravaju se izravno na službenoj Starlink stranici.",
    en: "Ani's Studio is not affiliated with Starlink and is not its representative or reseller. Orders, prices and terms are handled directly through the official Starlink website.",
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
    hr: 'Starlink je dostupan diljem Hrvatske. Za kvalitetno korištenje na konkretnoj lokaciji najvažniji su otvoren pogled prema nebu, odgovarajući paket i pravilno postavljena antena.',
    en: 'Starlink is available throughout Croatia. For reliable use at a specific location, the most important factors are a clear view of the sky, the appropriate service plan and correct antenna placement.',
  },
  checkHeading: {
    hr: 'Što treba provjeriti prije narudžbe?',
    en: 'What should you check before ordering?',
  },
  checklist: {
    hr: [
      'odgovarajući paket za vaš način uporabe',
      'jasan pogled prema nebu',
      'moguće prepreke poput stabala, krovova i viših objekata',
      'mjesto montaže i sigurno provođenje kabela',
      'pristup električnoj energiji',
      'aktualnu cijenu opreme, dostave i mjesečne usluge',
      'pravila korištenja na drugoj lokaciji',
    ],
    en: [
      'the appropriate plan for how you will use the service',
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
    hr: 'Starlink nudi različite vrste usluge za stalnu kućnu adresu i za prenosivu ili putnu uporabu. Nazivi paketa i pravila mogu se mijenjati, zato prije narudžbe pregledajte aktualnu ponudu na službenoj stranici.',
    en: 'Starlink offers different types of service for a fixed home address and for portable or travel use. Plan names and rules may change, so view the current offer on the official website before ordering.',
  },
  homeTitle: {
    hr: 'Za dom',
    en: 'For the home',
  },
  homeBody: {
    hr: 'Namijenjeno stalnoj adresi, npr. kući ili vikendici. Odaberite odgovarajući paket i provjerite ima li mjesto postavljanja otvoren pogled prema nebu.',
    en: 'Intended for a fixed address, such as a house or holiday home. Choose the appropriate plan and make sure the installation location has a clear view of the sky.',
  },
  travelTitle: {
    hr: 'Za putovanja i promjenjive lokacije',
    en: 'For travel and changing locations',
  },
  travelBody: {
    hr: 'Uz odgovarajući Roam paket Starlink se može koristiti na različitim lokacijama diljem Hrvatske. Najvažnije je pronaći mjesto s dovoljno otvorenim pogledom prema nebu i koristiti uslugu u skladu s pravilima odabranog paketa.',
    en: 'With an appropriate Roam plan, Starlink can be used at different locations throughout Croatia. The key requirements are finding a location with a sufficiently clear view of the sky and using the service in accordance with the selected plan.',
  },
  travelNote: {
    hr: 'Ovo ne znači automatski korištenje tijekom vožnje; pravila uporabe u pokretu ovise o opremi i odabranom planu.',
    en: 'This does not automatically include use while a vehicle is moving; in-motion use depends on the equipment and selected plan.',
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
    hr: 'Cijene opreme, dostave i mjesečne usluge mogu se mijenjati. Konačnu cijenu i uvjete provjerite neposredno prije narudžbe na službenoj Starlink stranici.',
    en: 'Equipment, delivery and monthly service prices may change. Check the final price and terms on the official Starlink website just before you order.',
  },
  costCta: {
    hr: 'Pogledaj ponudu i ostvari pogodnost',
    en: 'View the offer and claim the benefit',
  },
  referralHeading: {
    hr: 'Kako funkcionira referral pogodnost?',
    en: 'How does the referral benefit work?',
  },
  referralLead: {
    hr: 'Kada prihvatljivu narudžbu dovršite putem moje referral poveznice, možete dobiti jedan mjesec Starlink usluge bez naknade. Jedan mjesec referral pogodnosti mogu dobiti i ja kao preporučitelj.',
    en: 'When you complete an eligible order through my referral link, you may receive one month of Starlink service at no charge. I may also receive a one-month referral benefit as the referrer.',
  },
  referralSteps: {
    hr: [
      'Otvorite Starlink preko označene referral poveznice',
      'Pregledajte aktualnu ponudu, odaberite odgovarajući paket te provjerite konačnu cijenu i uvjete',
      'Ako završite prihvatljivu narudžbu, možete ostvariti jedan mjesec usluge bez naknade',
    ],
    en: [
      'Open Starlink through the marked referral link',
      'View the current offer, choose the appropriate plan and check the final price and terms',
      'If you complete an eligible order, you may receive one month of service at no charge',
    ],
  },
  referralLimits: {
    hr: "Pogodnost primjenjuje Starlink prema aktualnim pravilima programa. Ani's Studio ne obrađuje narudžbu, ne prima plaćanje i ne može samostalno odobriti pogodnost.",
    en: "The benefit is applied by Starlink under the current programme rules. Ani's Studio does not process the order, receive payment or independently approve the benefit.",
  },
  referralCta: {
    hr: 'Ostvari 1 mjesec putem referral poveznice',
    en: 'Get 1 month through the referral link',
  },
  orderHeading: {
    hr: 'Kako izgleda narudžba?',
    en: 'What does ordering look like?',
  },
  orderSteps: {
    hr: [
      'Otvorite službenu stranicu preko poveznice',
      'Unesite adresu u narudžbenom procesu Starlinka',
      'Pregledajte prikazani paket, opremu, dostavu i uvjete',
      'Provjerite konačni iznos prije plaćanja',
      'Narudžbu dovršite izravno na Starlink stranici',
    ],
    en: [
      'Open the official website through the link',
      'Enter your address in the Starlink order process',
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
        hr: 'Dobivamo li kupac i preporučitelj po jedan mjesec pogodnosti?',
        en: 'Do the customer and referrer each receive a one-month benefit?',
      },
      answer: {
        hr: 'Prema aktualnoj referral ponudi, prihvatljivi novi korisnik može dobiti jedan mjesec Starlink usluge bez naknade, a jedan mjesec pogodnosti može dobiti i preporučitelj. Pogodnost primjenjuje Starlink prema važećim pravilima programa.',
        en: 'Under the current referral offer, an eligible new customer may receive one month of Starlink service at no charge, and the referrer may also receive a one-month benefit. Starlink applies the benefit under the current programme rules.',
      },
    },
    {
      question: {
        hr: 'Radi li Starlink na svakoj adresi u Hrvatskoj?',
        en: 'Is Starlink available at every address in Croatia?',
      },
      answer: {
        hr: 'Starlink je dostupan diljem Hrvatske. Za kvalitetno korištenje na konkretnoj lokaciji najvažniji su otvoren pogled prema nebu, odgovarajući paket i pravilno postavljena antena.',
        en: 'Starlink is available throughout Croatia. For reliable use at a specific location, the most important factors are a clear view of the sky, the appropriate service plan and correct antenna placement.',
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
        hr: 'Nisu. Cijene opreme, dostave i mjesečne usluge, kao i nazivi paketa, mogu se mijenjati. Konačnu cijenu i uvjete provjerite neposredno prije narudžbe.',
        en: 'No. Equipment, delivery and monthly service prices, as well as plan names, may change. Check the final price and terms just before you order.',
      },
    },
    {
      question: {
        hr: 'Može li se oprema koristiti na drugoj lokaciji?',
        en: 'Can the equipment be used at another location?',
      },
      answer: {
        hr: 'To ovisi o vrsti usluge i aktualnim pravilima Starlinka. Prije narudžbe na službenoj stranici odaberite odgovarajući paket i pregledajte razliku između kućne i putne uporabe.',
        en: "That depends on the type of service and Starlink's current rules. Before ordering, choose the appropriate plan and review the difference between home and travel use on the official website.",
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
    hr: 'Ostvarite 1 mjesec usluge bez naknade',
    en: 'Get 1 month of service at no charge',
  },
  finalBody: {
    hr: 'Prije narudžbe pregledajte aktualnu ponudu, konačnu cijenu, opremu i uvjete izravno na službenoj stranici.',
    en: 'Before ordering, view the current offer, the final price, equipment and terms directly on the official website.',
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
  placement,
  language,
}: {
  children: ReactNode
  className?: string
  id?: string
  describedBy?: string
  placement: StarlinkReferralPlacement
  language: Lang
}) {
  return (
    <a
      id={id}
      href={STARLINK_HR.referralUrl}
      target="_blank"
      rel={STARLINK_REFERRAL_REL}
      className={className}
      aria-describedby={describedBy}
      onClick={() =>
        trackEvent('starlink_referral_click', {
          placement,
          language,
        })
      }
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
              <div className="mt-5 rounded-2xl border border-amethyst/22 bg-white/70 p-4 shadow-sm backdrop-blur-sm dark:border-lavender/25 dark:bg-white/[0.06] sm:p-5">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-amethyst dark:text-lavender">
                  {copy.benefitLabel[language]}
                </p>
                <p className="mt-1.5 font-heading text-base font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:text-lg">
                  {copy.benefitHeadline[language]}
                </p>
                <p
                  id="starlink-hero-referral-note"
                  className="mt-2 text-xs leading-relaxed text-plum/70 dark:text-pearl/68 sm:text-[0.8125rem]"
                >
                  {copy.benefitFinePrint[language]}
                </p>
              </div>
              <p className={`mt-5 ${BODY_CLASS}`}>{copy.intro[language]}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ReferralLink
                  id="starlink-hero-cta"
                  describedBy="starlink-hero-referral-note"
                  placement="hero"
                  language={language}
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
                <p className="text-xs leading-relaxed text-plum/68 dark:text-pearl/65 sm:text-[0.8125rem]">
                  {copy.independenceNote[language]}
                </p>
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
                  <p className="mt-2 text-sm leading-relaxed text-plum/68 dark:text-pearl/62 sm:text-[0.9375rem]">
                    {copy.travelNote[language]}
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
              placement="pricing"
              language={language}
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
            <p className={`mt-4 ${BODY_CLASS}`}>{copy.referralLead[language]}</p>
            <NumberedSteps items={copy.referralSteps[language]} />
            <div id="starlink-referral-note" className={`${SURFACE_CARD} mt-6 space-y-2`}>
              <p className="text-sm leading-relaxed text-plum/75 dark:text-pearl/72">
                {copy.referralLimits[language]}
              </p>
            </div>
            <ReferralLink
              describedBy="starlink-referral-note"
              placement="referral_steps"
              language={language}
              className="btn btn-primary mt-6 inline-flex min-h-[48px] w-full items-center justify-center !whitespace-normal px-6 py-3 text-center text-base font-semibold shadow-md sm:w-auto"
            >
              {copy.referralCta[language]}
            </ReferralLink>
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
                placement="final_cta"
                language={language}
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
