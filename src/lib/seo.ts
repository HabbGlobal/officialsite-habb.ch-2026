import type { Metadata } from 'next'
import { Locale } from './i18n'
import { getSiteUrl } from './site'

// Real 1200x630 share cards (the logo is square and would be cropped)
const OG_IMAGE_DE = '/og-default.jpg'
const OG_IMAGE_EN = '/og-default-en.jpg'

interface BuildMetadataArgs {
  locale: Locale
  /** Route path below the locale segment, e.g. '' for home, '/about', '/services/habb-one' */
  path: string
  title: string
  description: string
  ogType?: 'website' | 'article'
  /** Set true for thin/duplicate or legal pages that should not be indexed */
  noindex?: boolean
}

/**
 * Single source of truth for per-page SEO metadata: absolute canonical,
 * full hreflang set (de-CH / en-CH / x-default → de) and Open Graph / Twitter.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  ogType = 'website',
  noindex = false,
}: BuildMetadataArgs): Metadata {
  const baseUrl = getSiteUrl()
  const cleanPath = path && !path.startsWith('/') ? `/${path}` : path
  const canonical = `${baseUrl}/${locale}${cleanPath}`
  const isGerman = locale === 'de'
  const ogImage = isGerman ? OG_IMAGE_DE : OG_IMAGE_EN

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'de-CH': `${baseUrl}/de${cleanPath}`,
        'en-CH': `${baseUrl}/en${cleanPath}`,
        'x-default': `${baseUrl}/de${cleanPath}`,
      },
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Habb Switzerland',
      locale: isGerman ? 'de_CH' : 'en_CH',
      // Must be an array: Next only coerces alternateLocale to an array for
      // og types whose field list includes it (e.g. website). For type
      // 'article' it would stay a string and crash MultiMeta (.map).
      alternateLocale: [isGerman ? 'en_CH' : 'de_CH'],
      type: ogType,
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Habb Switzerland' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
