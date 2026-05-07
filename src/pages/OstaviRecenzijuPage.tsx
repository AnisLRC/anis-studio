import { useState } from 'react'
import { AnimatedPage } from '../components/AnimatedPage'
import { PageSEO } from '../components/PageSEO'
import { DecorativeSkyBackdrop } from '../components/DecorativeSkyBackdrop'
import {
  createTestimonialSubmission,
  type NameDisplayPreference,
} from '../lib/testimonials'

interface OstaviRecenzijuPageProps {
  language: 'hr' | 'en'
}

interface ReviewFormState {
  submitted_name: string
  email: string
  original_text: string
  name_display_preference: NameDisplayPreference
  location_display: string
  consent_public: boolean
}

const INITIAL_FORM: ReviewFormState = {
  submitted_name: '',
  email: '',
  original_text: '',
  name_display_preference: 'first_name_only',
  location_display: '',
  consent_public: false,
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

const copy = {
  pageTitle: {
    hr: 'Ostavite recenziju — Ani\'s Studio',
    en: 'Leave a review — Ani\'s Studio',
  },
  pageDescription: {
    hr: 'Podijelite vaše iskustvo s Ani\'s Studio. Recenzija se pregledava prije javne objave.',
    en: 'Share your experience with Ani\'s Studio. Reviews are reviewed before publication.',
  },
  heading: {
    hr: 'Ostavite recenziju',
    en: 'Leave a review',
  },
  subheading: {
    hr: 'Zahvaljujemo što dijelite vaše iskustvo. Recenzija će biti pregledana prije javne objave.',
    en: 'Thank you for sharing your experience. Your review will be reviewed before it is published.',
  },
  labelName: { hr: 'Ime i prezime', en: 'Full name' },
  labelEmail: { hr: 'Email', en: 'Email' },
  labelText: { hr: 'Vaša recenzija', en: 'Your review' },
  labelNamePref: {
    hr: 'Kako želite da se ime prikaže javno?',
    en: 'How would you like your name to appear publicly?',
  },
  namePrefOptions: {
    full_name: { hr: 'Puno ime i prezime', en: 'Full name' },
    first_name_only: { hr: 'Samo ime', en: 'First name only' },
    initials: { hr: 'Inicijali', en: 'Initials' },
    anonymous: { hr: 'Anonimno', en: 'Anonymous' },
  },
  labelLocation: {
    hr: 'Mjesto / grad (opcionalno)',
    en: 'Location / city (optional)',
  },
  labelConsent: {
    hr: 'Potvrđujem da sam klijent/ica Ani\'s Studio i dopuštam da se moja recenzija, nakon pregleda i odobrenja, objavi na web stranici Ani\'s Studio.',
    en: 'I confirm that I am an Ani\'s Studio client and allow my review to be published on the Ani\'s Studio website after review and approval.',
  },
  submitBtn: { hr: 'Pošalji recenziju', en: 'Submit review' },
  submittingBtn: { hr: 'Slanje…', en: 'Submitting…' },
  successHeading: { hr: 'Hvala vam na recenziji.', en: 'Thank you for your review.' },
  successBody: {
    hr: 'Vaša poruka je zaprimljena i bit će pregledana prije javne objave.',
    en: 'Your message has been received and will be reviewed before it is published.',
  },
  submitAnother: { hr: 'Pošalji još jednu', en: 'Submit another' },
  errorGeneral: {
    hr: 'Slanje nije uspjelo. Molimo pokušajte ponovo.',
    en: 'Submission failed. Please try again.',
  },
  errRequired: { hr: 'Ovo polje je obavezno.', en: 'This field is required.' },
  errEmail: { hr: 'Unesite ispravnu email adresu.', en: 'Enter a valid email address.' },
  errTextMin: {
    hr: 'Recenzija mora imati najmanje 10 znakova.',
    en: 'Review must be at least 10 characters.',
  },
  errConsent: {
    hr: 'Potrebna je vaša privola za objavu.',
    en: 'Your consent for publication is required.',
  },
}

const NAME_PREF_ORDER: NameDisplayPreference[] = [
  'full_name',
  'first_name_only',
  'initials',
  'anonymous',
]

export default function OstaviRecenzijuPage({ language }: OstaviRecenzijuPageProps) {
  const [form, setForm] = useState<ReviewFormState>(INITIAL_FORM)
  const [honeypot, setHoneypot] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ReviewFormState, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const t = (key: keyof typeof copy): string => {
    const entry = copy[key]
    if (typeof entry === 'object' && 'hr' in entry) {
      return entry[language] as string
    }
    return String(entry)
  }

  function validate(): boolean {
    const errors: Partial<Record<keyof ReviewFormState, string>> = {}

    if (!form.submitted_name.trim()) {
      errors.submitted_name = t('errRequired')
    }
    if (!form.email.trim()) {
      errors.email = t('errRequired')
    } else if (!isValidEmail(form.email)) {
      errors.email = t('errEmail')
    }
    if (!form.original_text.trim()) {
      errors.original_text = t('errRequired')
    } else if (form.original_text.trim().length < 10) {
      errors.original_text = t('errTextMin')
    }
    if (!form.consent_public) {
      errors.consent_public = t('errConsent')
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError(null)

    // Honeypot check — silently succeed without DB write
    if (honeypot.trim() !== '') {
      setSuccess(true)
      return
    }

    if (!validate()) return

    setIsSubmitting(true)
    try {
      await createTestimonialSubmission({
        category: 'interiors',
        submitted_name: form.submitted_name.trim(),
        email: form.email.trim(),
        original_text: form.original_text.trim(),
        name_display_preference: form.name_display_preference,
        location_display: form.location_display.trim() || null,
        consent_public: true,
      })
      setSuccess(true)
      setForm(INITIAL_FORM)
      setFieldErrors({})
    } catch (err) {
      const msg = err instanceof Error ? err.message : t('errorGeneral')
      setSubmitError(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleReset() {
    setSuccess(false)
    setSubmitError(null)
    setFieldErrors({})
    setForm(INITIAL_FORM)
    setHoneypot('')
  }

  const inputClass =
    'mt-1 w-full rounded-xl border border-[rgba(110,68,255,0.18)] bg-white/80 px-4 py-3 text-sm text-plum/90 placeholder:text-plum/35 shadow-sm backdrop-blur-sm transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20 dark:border-lavender/20 dark:bg-white/10 dark:text-pearl dark:placeholder:text-pearl/30 dark:focus:border-lavender/50'
  const labelClass = 'block text-sm font-semibold text-plum/85 dark:text-pearl/85'
  const errorClass = 'mt-1.5 text-xs font-medium text-red-600 dark:text-red-400'

  return (
    <AnimatedPage>
      <PageSEO
        title={copy.pageTitle[language]}
        description={copy.pageDescription[language]}
        canonical="/ostavi-recenziju"
        noIndex
      />
      <main className="min-w-0">
        <section className="Section fade-in relative section-with-bg min-h-[min(100dvh,auto)]">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <DecorativeSkyBackdrop priority="high" />
            <div className="absolute inset-0 section-bg-overlay-light dark:section-bg-overlay-dark" />
          </div>

          <div className="relative z-10 mx-auto min-w-0 max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
            {/* Heading */}
            <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-balance text-plum/90 dark:text-pearl sm:text-3xl">
                {t('heading')}
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-plum/72 dark:text-pearl/68 sm:text-[0.9375rem]">
                {t('subheading')}
              </p>
            </div>

            {/* Card */}
            <div className="mx-auto max-w-xl">
              <div className="overflow-hidden rounded-3xl border border-[rgba(110,68,255,0.16)] bg-[rgba(248,246,255,0.72)] shadow-[0_8px_40px_rgba(46,36,71,0.06)] backdrop-blur-md dark:border-lavender/12 dark:bg-white/[0.04] dark:shadow-[0_12px_48px_rgba(0,0,0,0.25)]">
                <div className="p-6 sm:p-8 md:p-10">
                  {success ? (
                    /* Success state */
                    <div className="flex flex-col items-center gap-5 py-4 text-center">
                      <span className="text-4xl" aria-hidden>
                        ✓
                      </span>
                      <div>
                        <h2 className="font-heading text-xl font-bold text-plum/90 dark:text-pearl sm:text-2xl">
                          {t('successHeading')}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-plum/72 dark:text-pearl/68 sm:text-[0.9375rem]">
                          {t('successBody')}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="mt-2 inline-flex min-h-[44px] items-center rounded-xl border border-amethyst/25 bg-white/70 px-6 py-2.5 text-sm font-semibold text-plum/90 shadow-sm backdrop-blur-sm transition hover:border-[--color-primary]/40 hover:bg-white/90 dark:border-lavender/25 dark:bg-white/10 dark:text-pearl dark:hover:bg-white/[0.15]"
                      >
                        {t('submitAnother')}
                      </button>
                    </div>
                  ) : (
                    /* Form */
                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-5"
                    >
                      {/* Honeypot — visually hidden from real users, ignored by screen readers */}
                      <div
                        aria-hidden="true"
                        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
                        tabIndex={-1}
                      >
                        <label htmlFor="review-website">Website</label>
                        <input
                          id="review-website"
                          type="text"
                          name="website"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      {/* submitted_name */}
                      <div>
                        <label className={labelClass} htmlFor="review-name">
                          {t('labelName')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="review-name"
                          type="text"
                          className={inputClass}
                          value={form.submitted_name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, submitted_name: e.target.value }))
                          }
                          autoComplete="name"
                          disabled={isSubmitting}
                        />
                        {fieldErrors.submitted_name && (
                          <p className={errorClass}>{fieldErrors.submitted_name}</p>
                        )}
                      </div>

                      {/* email */}
                      <div>
                        <label className={labelClass} htmlFor="review-email">
                          {t('labelEmail')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="review-email"
                          type="email"
                          className={inputClass}
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                          autoComplete="email"
                          disabled={isSubmitting}
                        />
                        {fieldErrors.email && (
                          <p className={errorClass}>{fieldErrors.email}</p>
                        )}
                      </div>

                      {/* original_text */}
                      <div>
                        <label className={labelClass} htmlFor="review-text">
                          {t('labelText')} <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="review-text"
                          rows={5}
                          className={`${inputClass} resize-y min-h-[7rem]`}
                          value={form.original_text}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, original_text: e.target.value }))
                          }
                          disabled={isSubmitting}
                        />
                        {fieldErrors.original_text && (
                          <p className={errorClass}>{fieldErrors.original_text}</p>
                        )}
                      </div>

                      {/* name_display_preference */}
                      <div>
                        <label className={labelClass} htmlFor="review-name-pref">
                          {t('labelNamePref')}
                        </label>
                        <select
                          id="review-name-pref"
                          className={inputClass}
                          value={form.name_display_preference}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              name_display_preference: e.target.value as NameDisplayPreference,
                            }))
                          }
                          disabled={isSubmitting}
                        >
                          {NAME_PREF_ORDER.map((pref) => (
                            <option key={pref} value={pref}>
                              {copy.namePrefOptions[pref][language]}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* location_display */}
                      <div>
                        <label className={labelClass} htmlFor="review-location">
                          {t('labelLocation')}
                        </label>
                        <input
                          id="review-location"
                          type="text"
                          className={inputClass}
                          value={form.location_display}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, location_display: e.target.value }))
                          }
                          autoComplete="address-level2"
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* consent_public */}
                      <div className="rounded-xl border border-[rgba(110,68,255,0.12)] bg-white/40 p-4 dark:border-lavender/12 dark:bg-white/[0.04]">
                        <label className="flex cursor-pointer items-start gap-3">
                          <input
                            type="checkbox"
                            checked={form.consent_public}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, consent_public: e.target.checked }))
                            }
                            disabled={isSubmitting}
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-amethyst/30 text-[--color-primary] accent-[--color-primary] focus:ring-[--color-primary]/30"
                          />
                          <span className="text-xs leading-relaxed text-plum/75 dark:text-pearl/68 sm:text-sm">
                            {t('labelConsent')}
                          </span>
                        </label>
                        {fieldErrors.consent_public && (
                          <p className={`${errorClass} ml-7`}>{fieldErrors.consent_public}</p>
                        )}
                      </div>

                      {/* Submit error */}
                      {submitError && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-400/25 dark:bg-red-900/20 dark:text-red-300">
                          {submitError}
                        </div>
                      )}

                      {/* Submit button */}
                      <div className="pt-1">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#6E44FF] to-[#8B6FFF] px-8 py-3 text-sm font-semibold text-white shadow-md transition-[filter,box-shadow] hover:brightness-[1.04] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 dark:from-[#6E44FF] dark:to-[#9D7FFF]"
                        >
                          {isSubmitting ? t('submittingBtn') : t('submitBtn')}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AnimatedPage>
  )
}
