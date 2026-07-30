import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site'
import { supabase } from '@/lib/supabase'

interface RouteDef {
  path: string
  priority: number
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
}

// Canonical routes only — duplicate aliases (e.g. /services/smartmail,
// /services/ai-Solutions) are intentionally excluded and point here via
// rel=canonical to consolidate ranking signals.
const ROUTES: RouteDef[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/services/habb-one', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/services/ai-solutions', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/services/habb-gastro', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'daily' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
]

/** Published blog posts, so search engines don't rely on internal links alone. */
async function getPostEntries(): Promise<{ slug: string; lastModified: Date }[]> {
  try {
    const table = process.env.SUPABASE_POST_TABLE || 'Post'
    const { data, error } = await supabase
      .from(table)
      .select('slug,updatedAt,createdAt')
      .eq('published', true)
    if (error) {
      console.error('sitemap: fetch posts error', error)
      return []
    }
    return (data || [])
      .filter((p: { slug?: string }) => !!p.slug)
      .map((p: { slug: string; updatedAt?: string; createdAt?: string }) => ({
        slug: p.slug,
        lastModified: new Date(p.updatedAt || p.createdAt || Date.now()),
      }))
  } catch (err) {
    console.error('sitemap: getPostEntries error', err)
    return []
  }
}

function alternates(baseUrl: string, path: string) {
  return {
    languages: {
      'de-CH': `${baseUrl}/de${path}`,
      'en-CH': `${baseUrl}/en${path}`,
      'x-default': `${baseUrl}/de${path}`,
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl()
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = ROUTES.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${baseUrl}/de${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: alternates(baseUrl, path),
    })
  )

  const posts = await getPostEntries()
  const postEntries: MetadataRoute.Sitemap = posts.map(({ slug, lastModified }) => ({
    url: `${baseUrl}/de/blog/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    alternates: alternates(baseUrl, `/blog/${slug}`),
  }))

  return [...staticEntries, ...postEntries]
}
