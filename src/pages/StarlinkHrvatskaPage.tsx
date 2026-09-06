import type { ReactNode } from 'react'
import { AnimatedPage } from '../components/AnimatedPage'
import { PageSEO, SITE_NAME, SITE_URL } from '../components/PageSEO'
import {
  STARLINK_HR,
  STARLINK_HR_PATH,
  STARLINK_REFERRAL_REL,
  formatStarlinkContentVerifiedDate,
} from '../config/starlinkHr'

const SEO_TITLE = 'Starlink u Hrvatskoj – vodič prije narudžbe'
const SEO_DESCRIPTION =
  'Jednostavan vodič na hrvatskom: kako Starlink radi, kome može koristiti, što provjeriti prije narudžbe i kako funkcionira referral pogodnost.'

const IMAGE_FRAME =
  'relative overflow-hidden rounded-2xl border border-[rgba(110,68,255,0.14)] bg-white/45 p-2 shadow-[0_12px_48px_rgba(46,36,71,0.08)] backdrop-blur-md dark:border-lavender/18 dark:bg-white/[0.06] sm:p-2.5'

const SURFACE_CARD =
  'rounded-2xl border border-[rgba(110,68,255,0.1)] bg-white/55 p-5 shadow-sm backdrop-blur-sm dark:border-lavender/12 dark:bg-white/[0.04] sm:p-6'

const SECTION_CLASS =
  'Section fade-in scroll-mt-28 px-4 py-10 sm:px-6 sm:py-12 lg:py-14'

const H2_CLASS =
  'font-heading text-2xl font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:text-3xl'

const BODY_CLASS =
  'text-base leading-relaxed text-plum/78 dark:text-pearl/72 sm:text-[1.0625rem]'

const audienceItems = [
  'kućanstvima izvan gradskih područja',
  'vikendicama i povremeno korištenim objektima',
  'lokacijama bez optike ili stabilne kabelske veze',
  'korisnicima kojima mobilna mreža nema dovoljno dobar signal',
  'određenim korisnicima kojima je potrebna veza na više lokacija',
]

const checklistItems = [
  'dostupnost usluge na adresi',
  'jasan pogled prema nebu',
  'moguće prepreke poput stabala, krovova i viših objekata',
  'mjesto montaže i sigurno provođenje kabela',
  'pristup električnoj energiji',
  'aktualnu cijenu opreme, dostave i mjesečne usluge',
  'pravila korištenja na drugoj lokaciji',
]

const benefits = [
  'dostupnost na lokacijama s malo drugih opcija',
  'relativno jednostavno postavljanje',
  'neovisnost o lokalnoj kabelskoj infrastrukturi',
  'mogućnost povezivanja više kućnih uređaja',
]

const limitations = [
  'potreban je odgovarajući pogled prema nebu',
  'početni trošak opreme i dostave',
  'mjesečna cijena može se mijenjati',
  'vremenski uvjeti i prepreke mogu utjecati na vezu',
  'iskustvo i performanse ovise o lokaciji i opterećenju mreže',
]

const howItWorksSteps = [
  'Satelit šalje i prima podatke',
  'Vanjska antena komunicira sa satelitima',
  'Usmjerivač povezuje uređaje u kući',
]

const referralSteps = [
  'Otvorite Starlink preko označene referral poveznice',
  'Provjerite adresu, dostupnost i aktualne uvjete',
  'Ako završite narudžbu i ispunjeni su uvjeti programa, možete ostvariti jedan mjesec usluge bez naknade',
]

const orderSteps = [
  'Otvorite službenu stranicu preko poveznice',
  'Unesite adresu i provjerite dostupnost',
  'Pregledajte prikazani paket, opremu, dostavu i uvjete',
  'Provjerite konačni iznos prije plaćanja',
  'Narudžbu dovršite izravno na Starlink stranici',
]

const faqItems = [
  {
    question: 'Je li ovo službena Starlink stranica?',
    answer:
      'Nije. Ovo je neovisni informativni vodič Ani\'s Studija. Službena stranica nalazi se na starlink.com, a narudžba se obavlja isključivo tamo.',
  },
  {
    question: 'Kupujem li Starlink od Ani\'s Studija?',
    answer:
      'Ne. Ani\'s Studio nije prodavatelj, zastupnik ni pružatelj Starlink usluge. Narudžba i plaćanje obavljaju se izravno na službenoj Starlink stranici.',
  },
  {
    question: 'Je li jedan mjesec bez naknade zajamčen?',
    answer:
      'Nije zajamčen. Ako naručite putem referral poveznice i ispunjeni su aktualni uvjeti programa, možete ostvariti jedan mjesec usluge bez naknade. Pogodnost određuje Starlink, a uvjeti se mogu promijeniti.',
  },
  {
    question: 'Radi li Starlink na svakoj adresi u Hrvatskoj?',
    answer:
      'Ne nužno. Dostupnost ovisi o adresi, načinu uporabe i aktualnoj ponudi. Prije odluke to treba provjeriti na službenoj Starlink stranici.',
  },
  {
    question: 'Treba li antena imati otvoren pogled prema nebu?',
    answer:
      'Da, jasan pogled prema nebu važan je za stabilniju vezu. Stabla, krovovi i viši objekti mogu zakloniti signal i utjecati na pouzdanost.',
  },
  {
    question: 'Jesu li cijene i paketi uvijek isti?',
    answer:
      'Nisu. Cijene opreme, dostave i mjesečne usluge, kao i nazivi paketa, mogu se mijenjati. Točan iznos za svoju adresu provjerite neposredno prije narudžbe.',
  },
  {
    question: 'Može li se oprema koristiti na drugoj lokaciji?',
    answer:
      'To ovisi o vrsti usluge i aktualnim pravilima Starlinka. Prije narudžbe na službenoj stranici provjerite razliku između kućne i putne uporabe.',
  },
  {
    question: 'Pruža li Ani\'s Studio tehničku podršku za Starlink?',
    answer:
      'Ne. Ani\'s Studio ne pruža tehničku podršku za Starlink, ne obrađuje narudžbe i ne može odobriti pogodnosti. Za podršku se obratite Starlinku putem službene stranice.',
  },
]

const trustTags = [
  'Vodič na hrvatskom',
  'Neovisne informacije',
  'Narudžba izravno od Starlinka',
]

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
  compact = false,
}: {
  id?: string
  compact?: boolean
}) {
  return (
    <div id={id} className="space-y-2">
      <p className="text-xs leading-relaxed text-plum/70 dark:text-pearl/62 sm:text-[0.8125rem]">
        <span className="font-semibold text-plum/80 dark:text-pearl/75">Napomena:</span>{' '}
        Ovo je referral poveznica. Ako putem nje naručite Starlink i ispunjeni su
        aktualni uvjeti programa, vi možete ostvariti jedan mjesec usluge bez naknade,
        a pogodnost mogu ostvariti i ja kao preporučitelj.
      </p>
      {!compact && (
        <p className="text-xs leading-relaxed text-plum/62 dark:text-pearl/55 sm:text-[0.8125rem]">
          Ani&apos;s Studio nije povezan sa Starlinkom i nije njegov zastupnik ni
          prodavatelj. Narudžba, dostupnost, cijene i uvjeti provjeravaju se izravno
          na službenoj Starlink stranici.
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
          <span className={`min-w-0 pt-1 text-sm leading-relaxed text-plum/78 dark:text-pearl/70 sm:text-[0.9375rem]`}>
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

export default function StarlinkHrvatskaPage() {
  const verifiedOn = formatStarlinkContentVerifiedDate()

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: SEO_TITLE,
      description: SEO_DESCRIPTION,
      url: `${SITE_URL}${STARLINK_HR_PATH}`,
      inLanguage: 'hr',
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
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ]

  return (
    <AnimatedPage>
      <PageSEO
        title={SEO_TITLE}
        description={SEO_DESCRIPTION}
        canonical={STARLINK_HR_PATH}
        jsonLd={jsonLd}
      />
      <main className="min-w-0" lang="hr">
        {/* A. Hero */}
        <section className="Section fade-in px-4 pt-10 pb-8 sm:px-6 sm:pt-14 sm:pb-10 lg:pt-16">
          <div className="mx-auto grid min-w-0 max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
                Starlink u Hrvatskoj: jednostavan vodič prije narudžbe
              </h1>
              <p className={`mt-5 ${BODY_CLASS}`}>
                Starlink može biti zanimljiva opcija za kuće, vikendice i lokacije na
                kojima klasični kabelski ili mobilni internet nije dovoljno dostupan
                ili stabilan. Ovaj neovisni vodič na hrvatskom jeziku objašnjava što
                trebate provjeriti prije odluke.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ReferralLink
                  id="starlink-hero-cta"
                  describedBy="starlink-hero-referral-note"
                  className="btn btn-primary inline-flex min-h-[48px] w-full items-center justify-center !whitespace-normal px-6 py-3 text-center text-base font-semibold shadow-md sm:w-auto sm:max-w-md"
                >
                  Provjeri dostupnost i aktualnu ponudu
                </ReferralLink>
                <a
                  href="#kako-funkcionira"
                  className="btn btn-secondary inline-flex min-h-[48px] w-full items-center justify-center !whitespace-normal px-6 py-3 text-center text-base font-semibold sm:w-auto"
                >
                  Kako funkcionira?
                </a>
              </div>
              <div className="mt-4 max-w-xl">
                <ReferralNote id="starlink-hero-referral-note" />
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {trustTags.map((tag) => (
                  <li
                    key={tag}
                    className="inline-flex min-h-[32px] items-center rounded-full border border-amethyst/20 bg-white/50 px-3 py-1 text-xs font-semibold text-plum/75 dark:border-lavender/20 dark:bg-white/5 dark:text-pearl/70"
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
                      alt="Ilustracija kuće u ruralnom krajoliku s vanjskom satelitskom antenom i obitelji koja koristi internet na terasi."
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

        {/* B. Što je satelitski internet */}
        <section
          id="kako-funkcionira"
          className={SECTION_CLASS}
          aria-labelledby="starlink-how-heading"
        >
          <div className="mx-auto grid min-w-0 max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <h2 id="starlink-how-heading" className={H2_CLASS}>
                Što je satelitski internet?
              </h2>
              <p className={`mt-4 ${BODY_CLASS}`}>
                Za razliku od kabelskog interneta, veza se uspostavlja između
                satelita, vanjske antene i kućnog usmjerivača. Zbog toga može biti
                dostupna i ondje gdje nema optike, koaksijalnog kabela ili
                kvalitetnog signala mobilne mreže.
              </p>
              <NumberedSteps items={howItWorksSteps} />
              <p className="mt-4 text-sm leading-relaxed text-plum/65 dark:text-pearl/58">
                Ovo je pojednostavljeni opis. Brzina, kašnjenje i stabilnost ovise o
                lokaciji, opremi, vremenskim uvjetima i opterećenju mreže, pa ih ne
                treba shvatiti kao jamstvo.
              </p>
            </div>
            <GuideImage
              src={STARLINK_HR.images.howItWorks}
              alt="Pojednostavljeni prikaz veze između satelita, vanjske antene i kućnog usmjerivača."
            />
          </div>
        </section>

        {/* C. Kome bi mogao biti koristan */}
        <section className={SECTION_CLASS} aria-labelledby="starlink-who-heading">
          <div className="mx-auto max-w-5xl">
            <h2 id="starlink-who-heading" className={H2_CLASS}>
              Kome bi mogao biti koristan?
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {audienceItems.map((item) => (
                <li key={item} className={SURFACE_CARD}>
                  <p className="text-sm leading-relaxed text-plum/80 dark:text-pearl/72 sm:text-[0.9375rem]">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
            <p className={`mt-6 ${BODY_CLASS}`}>
              Dostupnost i prikladan paket ovise o adresi, načinu uporabe i
              aktualnoj ponudi. Prije narudžbe to treba provjeriti na službenoj
              Starlink stranici.
            </p>
          </div>
        </section>

        {/* D. Što treba provjeriti */}
        <section className={SECTION_CLASS} aria-labelledby="starlink-check-heading">
          <div className="mx-auto grid min-w-0 max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <h2 id="starlink-check-heading" className={H2_CLASS}>
                Što treba provjeriti prije narudžbe?
              </h2>
              <ul className="mt-6 space-y-3">
                {checklistItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amethyst/70 dark:bg-lavender/70"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-plum/78 dark:text-pearl/70 sm:text-[0.9375rem]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className={`mt-6 ${BODY_CLASS}`}>
                Zapreke poput stabala, krovova i viših objekata mogu zakloniti
                pogled prema nebu i utjecati na stabilnost veze. Zato je mjesto
                montaže antene važno provjeriti prije odluke.
              </p>
            </div>
            <GuideImage
              src={STARLINK_HR.images.antenna}
              alt="Ilustracija položaja vanjske antene i potrebnog otvorenog pogleda prema nebu, bez zapreka poput stabala ili krovova."
            />
          </div>
        </section>

        {/* E. Kućna ili putna uporaba */}
        <section className={SECTION_CLASS} aria-labelledby="starlink-use-heading">
          <div className="mx-auto max-w-6xl">
            <h2 id="starlink-use-heading" className={H2_CLASS}>
              Kućna ili putna uporaba
            </h2>
            <p className={`mt-4 max-w-3xl ${BODY_CLASS}`}>
              Starlink može nuditi različite vrste usluge za stalnu kućnu adresu i
              za prenosivu ili putnu uporabu. Nazivi paketa, područja dostupnosti i
              pravila mogu se mijenjati, zato ih prije narudžbe provjerite na
              službenoj stranici.
            </p>
            <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">
              <GuideImage
                src={STARLINK_HR.images.homeTravel}
                alt="Usporedni prikaz kućne uporabe satelitskog interneta i prenosive uporabe na putovanju."
              />
              <div className="grid grid-cols-1 gap-4">
                <article className={SURFACE_CARD}>
                  <h3 className="font-heading text-lg font-bold text-plum/90 dark:text-pearl">
                    Za dom
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-plum/75 dark:text-pearl/68 sm:text-[0.9375rem]">
                    Namijenjeno stalnoj adresi, npr. kući ili vikendici. Prije
                    narudžbe provjerite je li usluga dostupna na toj adresi i koja
                    pravila vrijede za prelazak na drugu lokaciju.
                  </p>
                </article>
                <article className={SURFACE_CARD}>
                  <h3 className="font-heading text-lg font-bold text-plum/90 dark:text-pearl">
                    Za putovanja i promjenjive lokacije
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-plum/75 dark:text-pearl/68 sm:text-[0.9375rem]">
                    Namijenjeno prenosivoj uporabi, npr. na putovanju ili na više
                    mjesta. Dostupnost, pauza usluge i pravila korištenja izvan
                    početne zone mogu se razlikovati — provjerite ih na službenoj
                    stranici.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* F. Prednosti i ograničenja */}
        <section className={SECTION_CLASS} aria-labelledby="starlink-balance-heading">
          <div className="mx-auto max-w-5xl">
            <h2 id="starlink-balance-heading" className={H2_CLASS}>
              Prednosti i ograničenja
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className={SURFACE_CARD}>
                <h3 className="font-heading text-lg font-bold text-plum/90 dark:text-pearl">
                  Moguće prednosti
                </h3>
                <ul className="mt-4 space-y-3">
                  {benefits.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amethyst/70 dark:bg-lavender/70"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-plum/78 dark:text-pearl/70 sm:text-[0.9375rem]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={SURFACE_CARD}>
                <h3 className="font-heading text-lg font-bold text-plum/90 dark:text-pearl">
                  Moguća ograničenja
                </h3>
                <ul className="mt-4 space-y-3">
                  {limitations.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-plum/35 dark:bg-pearl/35"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-plum/78 dark:text-pearl/70 sm:text-[0.9375rem]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* G. Koliko košta */}
        <section className={SECTION_CLASS} aria-labelledby="starlink-cost-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="starlink-cost-heading" className={H2_CLASS}>
              Koliko košta?
            </h2>
            <p className={`mt-4 ${BODY_CLASS}`}>
              Cijene opreme, dostave i mjesečne usluge mogu se mijenjati. Točan
              iznos za svoju adresu provjerite neposredno prije narudžbe na
              službenoj Starlink stranici.
            </p>
            <ReferralLink
              describedBy="starlink-cost-referral-note"
              className="btn btn-primary mt-6 inline-flex min-h-[48px] w-full items-center justify-center !whitespace-normal px-6 py-3 text-center text-base font-semibold shadow-md sm:w-auto"
            >
              Provjeri aktualnu ponudu na Starlinku
            </ReferralLink>
            <div className="mt-4">
              <ReferralNote id="starlink-cost-referral-note" compact />
            </div>
          </div>
        </section>

        {/* H. Referral pogodnost */}
        <section
          id="referral"
          className={SECTION_CLASS}
          aria-labelledby="starlink-referral-heading"
        >
          <div className="mx-auto max-w-3xl">
            <h2 id="starlink-referral-heading" className={H2_CLASS}>
              Kako funkcionira referral pogodnost?
            </h2>
            <NumberedSteps items={referralSteps} />
            <div className={`${SURFACE_CARD} mt-6 space-y-2`}>
              <p className="text-sm leading-relaxed text-plum/75 dark:text-pearl/68">
                Pogodnost određuje Starlink. Uvjeti se mogu promijeniti. Ani&apos;s
                Studio ne obrađuje narudžbu ni plaćanje i ne može odobriti niti
                jamčiti pogodnost.
              </p>
            </div>
            <ReferralLink
              describedBy="starlink-referral-note"
              className="btn btn-primary mt-6 inline-flex min-h-[48px] w-full items-center justify-center !whitespace-normal px-6 py-3 text-center text-base font-semibold shadow-md sm:w-auto"
            >
              Otvori Starlink referral poveznicu
            </ReferralLink>
            <div className="mt-4">
              <ReferralNote id="starlink-referral-note" />
            </div>
          </div>
        </section>

        {/* I. Kako izgleda narudžba */}
        <section className={SECTION_CLASS} aria-labelledby="starlink-order-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="starlink-order-heading" className={H2_CLASS}>
              Kako izgleda narudžba?
            </h2>
            <NumberedSteps items={orderSteps} />
          </div>
        </section>

        {/* J. FAQ */}
        <section
          id="starlink-faq"
          className={SECTION_CLASS}
          aria-labelledby="starlink-faq-heading"
        >
          <div className="mx-auto max-w-3xl">
            <h2 id="starlink-faq-heading" className={H2_CLASS}>
              Česta pitanja
            </h2>
            <div className="mt-6 space-y-3">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="rounded-2xl border border-[rgba(110,68,255,0.1)] bg-white/55 px-5 py-1 shadow-sm backdrop-blur-sm dark:border-lavender/12 dark:bg-white/[0.04]"
                >
                  <summary className="cursor-pointer py-3.5 min-h-[44px] text-[0.9375rem] font-semibold leading-snug text-plum/90 dark:text-pearl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst/50">
                    {item.question}
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed text-plum/75 dark:text-pearl/68">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* K. Završni CTA */}
        <section className="Section fade-in px-4 pb-8 sm:px-6 sm:pb-10" aria-labelledby="starlink-final-cta-heading">
          <div className="mx-auto max-w-xl">
            <div className="rounded-2xl border border-[rgba(110,68,255,0.12)] bg-white/50 p-6 text-center shadow-[0_8px_40px_rgba(46,36,71,0.06)] backdrop-blur-md dark:border-lavender/12 dark:bg-white/[0.04] dark:shadow-[0_12px_48px_rgba(0,0,0,0.25)] sm:p-8">
              <h2
                id="starlink-final-cta-heading"
                className="font-heading text-xl font-bold tracking-tight text-balance text-plum/95 dark:text-pearl sm:text-2xl"
              >
                Provjerite odgovara li Starlink vašoj lokaciji
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-plum/78 dark:text-pearl/72 sm:mt-4 sm:text-[0.9375rem]">
                Prije narudžbe provjerite dostupnost, konačnu cijenu, opremu i
                aktualne uvjete izravno na službenoj stranici.
              </p>
              <ReferralLink
                describedBy="starlink-final-referral-note"
                className="btn btn-primary mt-6 inline-flex min-h-[48px] w-full max-w-sm items-center justify-center !whitespace-normal px-8 py-3 text-center text-base font-semibold shadow-md sm:mt-7 sm:w-auto sm:px-10"
              >
                Provjeri dostupnost i aktualnu ponudu
              </ReferralLink>
              <div className="mx-auto mt-4 max-w-md text-left">
                <ReferralNote id="starlink-final-referral-note" compact />
              </div>
            </div>
          </div>
        </section>

        {/* L. Pravna napomena */}
        <section className="Section fade-in px-4 pb-12 sm:px-6 sm:pb-14 lg:pb-16" aria-labelledby="starlink-legal-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="starlink-legal-heading" className="sr-only">
              Pravna napomena
            </h2>
            <p className="text-sm leading-relaxed text-plum/65 dark:text-pearl/58">
              Ova stranica je neovisni informativni vodič Ani&apos;s Studija.
              Ani&apos;s Studio nije povezan sa Starlinkom, nije njegov zastupnik,
              prodavatelj ni pružatelj tehničke podrške. Starlink naziv pripada
              njegovu vlasniku. Dostupnost, cijene, uvjeti usluge i referral
              pogodnosti određuje Starlink i mogu se promijeniti.
            </p>
            <p className="mt-4 text-sm text-plum/60 dark:text-pearl/52">
              Sadržaj posljednji put provjeren: {verifiedOn}
            </p>
            <p className="mt-3 text-sm">
              <a
                href={STARLINK_HR.legalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-amethyst/40 underline-offset-2 hover:text-amethyst dark:decoration-lavender/40 dark:hover:text-lavender"
              >
                Službeni Starlink pravni uvjeti
              </a>
            </p>
          </div>
        </section>
      </main>
    </AnimatedPage>
  )
}
