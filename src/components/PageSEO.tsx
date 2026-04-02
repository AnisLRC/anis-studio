import { Helmet } from 'react-helmet-async'

/** Production origin — keep in sync with public/robots.txt and public/sitemap.xml */
export const SITE_URL = 'https://anistudio.hr'
export const SITE_NAME = "Ani's Studio"

interface PageSEOProps {
  title: string
  description: string
  /** Path relative to SITE_URL, e.g. "/lrc". Omit for noindex pages. */
  canonical?: string
  noIndex?: boolean
  ogTitle?: string
  ogDescription?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function PageSEO({
  title,
  description,
  canonical,
  noIndex = false,
  ogTitle,
  ogDescription,
  jsonLd,
}: PageSEOProps) {
  /** Page-specific title only (no brand suffix); document title is always `{title} | {SITE_NAME}`. */
  const fullTitle = `${title} | ${SITE_NAME}`
  const resolvedOgTitle = ogTitle ?? fullTitle
  const resolvedOgDescription = ogDescription ?? description
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex,follow' : 'index,follow'} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}
