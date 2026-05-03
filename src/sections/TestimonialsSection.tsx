import { DecorativeSkyBackdrop } from '../components/DecorativeSkyBackdrop'
import TestimonialMarquee, {
  type TestimonialMarqueeRowBlock,
  type TestimonialRowGroupKey,
} from '../components/TestimonialMarquee'
import type { TestimonialCategory } from '../data/testimonials'
import { TESTIMONIALS } from '../data/testimonials'

interface TestimonialsSectionProps {
  language: 'hr' | 'en'
}

const byIdAsc = <T extends { id: number }>(a: T, b: T) => a.id - b.id

/**
 * Public: which testimonial rows render on the live site (per group).
 * Trust row = general + interiors combined (interiors-first public: only this row when preview is off).
 * Category intent: general + interiors on via `trust`; `lrc` and `webAtelier` off until set to `true`.
 */
export const PUBLIC_TESTIMONIAL_ROW_VISIBILITY: Record<TestimonialRowGroupKey, boolean> = {
  trust: true,
  lrc: false,
  webAtelier: false,
}

/**
 * Local preview: when `true`, shows LRC row (and optional Web Atelier placeholder) regardless of public flags.
 * **Interiors-first public:** keep `false` so only `PUBLIC_TESTIMONIAL_ROW_VISIBILITY` applies (trust row only).
 */
export const PREVIEW_ALL_TESTIMONIAL_ROWS = false

/**
 * Preview-only: show dashed placeholder for Web Atelier when there are no testimonials yet.
 * No fake cards are created.
 */
export const PREVIEW_WEB_ATELIER_EMPTY_ROW = false

function collectByCategories(categories: TestimonialCategory[]) {
  return TESTIMONIALS.filter((t) => categories.includes(t.category)).sort(byIdAsc)
}

function buildTestimonialRowBlocks(): TestimonialMarqueeRowBlock[] {
  const preview = PREVIEW_ALL_TESTIMONIAL_ROWS
  const pub = PUBLIC_TESTIMONIAL_ROW_VISIBILITY

  const trustItems = collectByCategories(['general', 'interiors'])
  const lrcItems = collectByCategories(['lrc'])
  const webItems = collectByCategories(['webAtelier'])

  const blocks: TestimonialMarqueeRowBlock[] = []

  if ((preview || pub.trust) && trustItems.length > 0) {
    blocks.push({
      groupKey: 'trust',
      items: trustItems,
      rowTone: 'purple',
      marqueeDirection: 'left',
    })
  }

  if ((preview || pub.lrc) && lrcItems.length > 0) {
    blocks.push({
      groupKey: 'lrc',
      items: lrcItems,
      rowTone: 'softPink',
      marqueeDirection: 'right',
    })
  }

  if (webItems.length > 0 && (preview || pub.webAtelier)) {
    blocks.push({
      groupKey: 'webAtelier',
      items: webItems,
      rowTone: 'softBlue',
      marqueeDirection: 'left',
    })
  } else if (preview && PREVIEW_WEB_ATELIER_EMPTY_ROW) {
    blocks.push({
      groupKey: 'webAtelier',
      items: [],
      rowTone: 'softBlue',
      marqueeDirection: 'left',
      emptyPreview: true,
    })
  }

  return blocks
}

export default function TestimonialsSection({ language }: TestimonialsSectionProps) {
  const translations = {
    title: {
      hr: 'Što kažu naši kupci',
      en: 'What Our Customers Say',
    },
    subtitle: {
      hr: 'Povjerenje naših kupaca je naš najveći uspjeh.',
      en: "Our customers' trust is our greatest success.",
    },
    helperHover: {
      hr: 'Za čitanje, zadrži pokazivač iznad recenzije.',
      en: 'To read, keep your pointer over a review.',
    },
  }

  const rowBlocks = buildTestimonialRowBlocks()

  return (
    <section id="testimonials" className="section-with-bg relative overflow-x-clip px-4 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <DecorativeSkyBackdrop priority="lazy" />
        <div className="absolute inset-0 section-bg-overlay-light dark:section-bg-overlay-dark" />
      </div>

      <div className="relative z-10 mx-auto min-w-0 max-w-6xl">
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="mb-3 font-heading text-2xl font-bold tracking-tight text-balance text-plum/90 dark:text-pearl sm:mb-3.5 sm:text-3xl md:text-4xl">
            <span className="mr-2">💬</span>
            {translations.title[language]}
          </h2>
          <p className="mx-auto max-w-2xl px-1 text-base leading-relaxed text-plum/80 dark:text-pearl/75 sm:text-lg">
            {translations.subtitle[language]}
          </p>
          <p
            className="mx-auto mt-3.5 hidden max-w-2xl px-1 text-center text-xs font-normal leading-relaxed tracking-wide text-plum/45 dark:text-pearl/42 sm:mt-4 sm:text-[0.8125rem] [@media(hover:hover)_and_(pointer:fine)]:block"
          >
            {translations.helperHover[language]}
          </p>
        </div>

        <TestimonialMarquee language={language} rowBlocks={rowBlocks} />
      </div>
    </section>
  )
}
