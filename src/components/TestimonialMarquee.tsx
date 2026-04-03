import { useEffect, useState, type ReactNode } from 'react'
import type { Testimonial } from '../data/testimonials'
import { TESTIMONIALS } from '../data/testimonials'

interface TestimonialMarqueeProps {
  language: 'hr' | 'en'
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(mq.matches)
    const onChange = () => setReduce(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduce
}

const avatarGradients = [
  'from-amethyst to-plum',
  'from-lavender to-amethyst',
  'from-amethyst to-lavender',
  'from-plum/90 to-amethyst',
  'from-lavender to-plum',
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function MarqueeRow({
  items,
  language,
  reverse,
  verifiedLabel,
  renderStars,
}: {
  items: Testimonial[]
  language: 'hr' | 'en'
  reverse: boolean
  verifiedLabel: string
  renderStars: (rating: number) => ReactNode
}) {
  const loop = [...items, ...items]

  return (
    <div
      className={`testimonial-marquee-row group/marquee relative overflow-hidden py-1 ${reverse ? 'row-reverse' : ''}`}
    >
      <div className="testimonial-marquee-track flex w-max gap-3 sm:gap-4">
        {loop.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}`}
            testimonial={testimonial}
            language={language}
            cardIndex={index % items.length}
            verifiedLabel={verifiedLabel}
            renderStars={renderStars}
            layout="marquee"
          />
        ))}
      </div>
    </div>
  )
}

function TestimonialCard({
  testimonial,
  language,
  cardIndex,
  verifiedLabel,
  renderStars,
  layout,
}: {
  testimonial: Testimonial
  language: 'hr' | 'en'
  cardIndex: number
  verifiedLabel: string
  renderStars: (rating: number) => ReactNode
  layout: 'marquee' | 'grid'
}) {
  const widthClass =
    layout === 'marquee'
      ? 'w-[min(100vw-2rem,304px)] shrink-0 sm:w-[328px]'
      : 'w-full min-w-0'

  return (
    <article
      tabIndex={0}
      className={`group/card flex min-h-[218px] flex-col rounded-xl border border-amethyst/18 bg-white/[0.82] p-4 shadow-[0_8px_28px_rgba(46,36,71,0.06)] backdrop-blur-xl transition-[box-shadow,border-color] duration-300 sm:min-h-[228px] sm:rounded-2xl sm:p-[1.125rem] dark:border-lavender/12 dark:bg-white/[0.07] dark:shadow-[0_10px_36px_rgba(0,0,0,0.22)] dark:focus-within:border-lavender/22 dark:focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.28)] dark:hover:border-lavender/18 dark:hover:shadow-[0_12px_40px_rgba(189,166,255,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amethyst/40 dark:focus-visible:outline-lavender/40 hover:border-amethyst/25 hover:shadow-[0_12px_36px_rgba(110,68,255,0.09)] ${widthClass}`}
    >
      {/* Header: avatar left | name + verified (verified always directly under name) */}
      <div className="flex items-start gap-3 sm:gap-3.5">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[0.6875rem] font-bold tracking-wide text-white shadow-[0_2px_12px_rgba(110,68,255,0.28)] ring-1 ring-white/25 dark:ring-white/10 sm:h-11 sm:w-11 sm:text-sm ${avatarGradients[cardIndex % avatarGradients.length]}`}
          aria-hidden={true}
        >
          {getInitials(testimonial.name)}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 pt-0.5">
          <p className="font-heading text-left text-sm font-semibold leading-snug tracking-tight text-plum/95 dark:text-pearl sm:text-[0.9375rem]">
            {testimonial.name}
          </p>
          {testimonial.rating === 5 ? (
            <span className="inline-flex w-fit items-center gap-0.5 rounded-full border border-amethyst/15 bg-white/70 px-2 py-0.5 text-[10px] font-medium leading-none text-amethyst/90 dark:border-lavender/25 dark:bg-white/10 dark:text-lavender/90">
              <span aria-hidden>✓</span>
              {verifiedLabel}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-0.5 sm:mt-3.5">{renderStars(testimonial.rating)}</div>

      <div className="mt-3 flex min-h-0 flex-1 flex-col sm:mt-3.5">
        <div className="rounded-lg border border-amethyst/10 bg-white/55 px-3 py-2.5 dark:border-lavender/10 dark:bg-white/[0.05] sm:px-3.5 sm:py-3">
          <p className="line-clamp-3 min-h-0 flex-1 text-left text-[0.8125rem] leading-relaxed text-plum/88 dark:text-pearl/88 sm:line-clamp-4 sm:text-sm">
            &ldquo;{testimonial.text[language]}&rdquo;
          </p>
        </div>
      </div>
    </article>
  )
}

export default function TestimonialMarquee({ language }: TestimonialMarqueeProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  const verifiedLabel = language === 'hr' ? 'Verificirano' : 'Verified'

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-300 ${
          index < rating
            ? 'text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]'
            : 'text-gray-300 dark:text-gray-600'
        }`}
        style={{
          fontSize: '0.875rem',
          animation: index < rating ? `starPulse 2s ease-in-out ${index * 0.1}s infinite` : 'none',
        }}
      >
        ★
      </span>
    ))

  const mid = Math.ceil(TESTIMONIALS.length / 2)
  const row1Items = TESTIMONIALS.slice(0, mid)
  const row2Items = TESTIMONIALS.slice(mid)

  if (prefersReducedMotion) {
    return (
      <>
        <style>{`
          @keyframes starPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.15); opacity: 0.9; }
          }
        `}</style>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              language={language}
              cardIndex={index}
              verifiedLabel={verifiedLabel}
              renderStars={renderStars}
              layout="grid"
            />
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        @keyframes starPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.9; }
        }
        @keyframes testimonial-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .testimonial-marquee-track {
          animation: testimonial-marquee 52s linear infinite;
          will-change: transform;
        }
        .testimonial-marquee-row.row-reverse .testimonial-marquee-track {
          animation-direction: reverse;
        }
        .testimonial-marquee-row:hover .testimonial-marquee-track,
        .testimonial-marquee-row:focus-within .testimonial-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-marquee-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="flex flex-col gap-4 sm:gap-5">
        <MarqueeRow items={row1Items} language={language} reverse={false} verifiedLabel={verifiedLabel} renderStars={renderStars} />
        <MarqueeRow items={row2Items} language={language} reverse verifiedLabel={verifiedLabel} renderStars={renderStars} />
      </div>
    </>
  )
}
