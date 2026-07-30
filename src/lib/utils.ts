import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: Date | string, locale: string = 'en'): string {
  const d = new Date(date)
  return d.toLocaleDateString(locale === 'de' ? 'de-CH' : 'en-CH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function getLocalizedContent<T>(
  contentEn: T,
  contentDe: T | null | undefined,
  locale: string
): T {
  if (locale === 'de' && contentDe) return contentDe
  return contentEn
}

/**
 * Editors sometimes append the brand to a post title ("… | Habb.ch"), which the
 * title template would then duplicate. Strip any trailing brand.
 */
export function stripBrandSuffix(title: string): string {
  return title.replace(/\s*[|\u2013-]\s*(Habb Switzerland|Habb Schweiz|Habb\.ch)\s*$/i, '').trim()
}

/**
 * Post bodies pasted from a full HTML document can carry <head>, <title> and
 * <meta> tags. Rendering those inside the page body yields a second <title>,
 * which pollutes the search snippet — remove document-level markup.
 */
export function sanitizeArticleHtml(html: string): string {
  return html
    .replace(/<head[\s\S]*?<\/head>/gi, '')
    .replace(/<\/?(?:html|body)\b[^>]*>/gi, '')
    .replace(/<title[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*>/gi, '')
    .replace(/<link\b[^>]*>/gi, '')
    .trim()
}
