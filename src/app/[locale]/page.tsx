import { Metadata } from 'next'
import { Locale } from '@/lib/i18n'
import { getSiteUrl } from '@/lib/site'
import { organizationLd, webSiteLd } from '@/lib/structured-data'
import { JsonLd } from '@/components/JsonLd'
import {
  HeroSection,
  NewProductSection,
  GastroProductSection,
  FeaturesSection,
  AboutSection,
  ServicesSection,
  CTASection
} from '@/components/sections'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getSiteUrl()
  const isGerman = locale === 'de'
  const title = isGerman
    ? 'Software & KI für Schweizer KMU | Habb Switzerland'
    : 'Software & AI for Swiss SMEs | Habb Switzerland'
  const description = isGerman
    ? 'Individuelle Software-Lösungen und Prozessoptimierung mit KI für Schweizer KMU – plus eigene Produkte: HABB One (ERP) und HABB Gastro.'
    : 'Custom software solutions and AI process optimisation for Swiss SMEs – plus our own products: HABB One (ERP) and HABB Gastro.'

  return {
    title: { absolute: title },
    description,
    keywords: isGerman
      ? ['Habb Switzerland', 'KI-Automatisierung Schweiz', 'Technologie-Lösungen Schweiz', 'ERP Schweizer KMU', 'Software Schweiz']
      : ['Habb Switzerland', 'AI automation Switzerland', 'technology solutions Switzerland', 'ERP Swiss SME'],
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'de-CH': `${baseUrl}/de`,
        'en-CH': `${baseUrl}/en`,
        'x-default': `${baseUrl}/de`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      locale: isGerman ? 'de_CH' : 'en_CH',
      alternateLocale: [isGerman ? 'en_CH' : 'de_CH'],
      type: 'website',
      images: [{ url: isGerman ? '/og-default.jpg' : '/og-default-en.jpg', width: 1200, height: 630, alt: 'Habb Switzerland' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [isGerman ? '/og-default.jpg' : '/og-default-en.jpg'],
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  return (
    <>
      <JsonLd data={[organizationLd(locale), webSiteLd(locale)]} />
      <HeroSection locale={locale} />
      <NewProductSection locale={locale} />
      <GastroProductSection locale={locale} />
      <FeaturesSection locale={locale} />
      <AboutSection locale={locale} />
      <ServicesSection locale={locale} />
      <CTASection locale={locale} />
    </>
  )
}
