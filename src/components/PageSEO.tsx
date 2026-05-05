import { createPortal } from 'react-dom'
import { Helmet } from 'react-helmet-async'

/** Production origin — keep in sync with public/robots.txt and public/sitemap.xml */
export const SITE_URL = 'https://anistudio.hr'
export const SITE_NAME = "Ani's Studio"

/** Default social preview asset in `public/` — resolved to absolute URL for og/twitter */
export const DEFAULT_OG_IMAGE_PATH = '/og-image.png'
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`

/** Must match `public/og-image.png` dimensions (standard OG ratio) */
const DEFAULT_OG_IMAGE_WIDTH = 1200
const DEFAULT_OG_IMAGE_HEIGHT = 630

const DEFAULT_OG_IMAGE_ALT =
  "Ani's Studio — 3D vizualizacija interijera i kuhinja. Studio za vizualizaciju prostora prije izvedbe."

interface PageSEOProps {
  title: string
  description: string
  /** Path relative to SITE_URL, e.g. "/lrc". Omit for noindex pages. */
  canonical?: string
  noIndex?: boolean
  ogTitle?: string
  ogDescription?: string
  /** Full absolute image URL (defaults to DEFAULT_OG_IMAGE_URL) */
  ogImage?: string
  ogImageAlt?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function PageSEO({
  title,
  description,
  canonical,
  noIndex = false,
  ogTitle,
  ogDescription,
  ogImage,
  ogImageAlt,
  jsonLd,
}: PageSEOProps) {
  /** Page-specific title only (no brand suffix); document title is always `{title} | {SITE_NAME}`. */
  const fullTitle = `${title} | ${SITE_NAME}`
  const resolvedOgTitle = ogTitle ?? fullTitle
  const resolvedOgDescription = ogDescription ?? description
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined
  const resolvedOgImageUrl = ogImage ?? DEFAULT_OG_IMAGE_URL
  const resolvedOgImageAlt = ogImageAlt ?? DEFAULT_OG_IMAGE_ALT

  const helmet = (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex,follow' : 'index,follow'} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={resolvedOgImageUrl} />
      <meta property="og:image:secure_url" content={resolvedOgImageUrl} />
      <meta property="og:image:width" content={String(DEFAULT_OG_IMAGE_WIDTH)} />
      <meta property="og:image:height" content={String(DEFAULT_OG_IMAGE_HEIGHT)} />
      <meta property="og:image:alt" content={resolvedOgImageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={resolvedOgImageUrl} />
      <meta name="twitter:image:alt" content={resolvedOgImageAlt} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )

  /* Helmet on React 19 relies on hoistables; portaling ensures meta/title land in document.head. */
  if (typeof document === 'undefined' || !document.head) {
    return helmet
  }
  return createPortal(helmet, document.head)
}
