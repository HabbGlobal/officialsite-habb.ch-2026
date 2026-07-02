import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { buildPageMetadata } from '@/lib/seo'
import { softwareApplicationLd, breadcrumbLd, faqPageLd } from '@/lib/structured-data'
import { JsonLd } from '@/components/JsonLd'
import { Button } from '@/components/ui'
import {
  ArrowRight,
  Clock,
  Users,
  FileText,
  Calendar,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  Check,
} from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale as Locale)

  const meta = buildPageMetadata({
    locale: locale as Locale,
    path: '/services/habb-one',
    title: t('services.habbOne.metaTitle'),
    description: t('services.habbOne.metaDescription'),
  })

  meta.title = { absolute: t('services.habbOne.metaTitle') }
  meta.keywords =
    locale === 'de'
      ? [
          'ERP Software Schweiz',
          'ERP für KMU',
          'ERP Schweizer KMU',
          'KMU Software Schweiz',
          'Offerten Software',
          'QR-Rechnung Software',
          'Auftragsverwaltung KMU',
          'Zeiterfassung Software Schweiz',
          'Branchensoftware KMU',
          'HABB One',
        ]
      : [
          'ERP software Switzerland',
          'ERP for SMEs',
          'Swiss SME ERP',
          'business software Switzerland',
          'quotation software',
          'QR invoice software',
          'order management SME',
          'time tracking software Switzerland',
          'HABB One',
        ]

  // Product visual beats the generic logo for social sharing
  meta.openGraph = { ...meta.openGraph, images: ['/habb-one/promo.jpg'] }
  meta.twitter = { ...meta.twitter, images: ['/habb-one/promo.jpg'] }

  return meta
}

export default async function HabbOnePage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const t = getTranslations(locale)

  const overviewParagraphs = (t('services.habbOne.overviewText') || '').split('\n').filter(Boolean)

  const keyFeatures = JSON.parse(t('services.habbOne.keyFeatures') || '[]') as {
    icon: string
    title: string
    description: string
  }[]

  const industries = JSON.parse(t('services.habbOne.industries') || '[]') as string[]
  const benefits = JSON.parse(t('services.habbOne.benefits') || '[]') as string[]
  const faq = JSON.parse(t('services.habbOne.faq') || '[]') as { q: string; a: string }[]

  // Module visuals; alt texts reuse the localized feature titles where the
  // motif matches, the hosting visual gets its own description
  const galleryImages = [
    { src: '/habb-one/qr-rechnung.jpg', alt: keyFeatures[0]?.title },
    { src: '/habb-one/crm-auftrag.jpg', alt: keyFeatures[1]?.title },
    { src: '/habb-one/zeiterfassung.jpg', alt: keyFeatures[2]?.title },
    { src: '/habb-one/einsatzplanung.jpg', alt: keyFeatures[3]?.title },
    { src: '/habb-one/lohnabrechnung.jpg', alt: keyFeatures[4]?.title },
    {
      src: '/habb-one/swiss-hosting.jpg',
      alt:
        locale === 'de'
          ? 'Gemacht für Schweizer Unternehmen – Hosting in Zürich, DSG-konform'
          : 'Made for Swiss companies – hosted in Zurich, FADP-compliant',
    },
  ].map((img) => ({ ...img, alt: img.alt ?? t('services.habbOne.sectionTitle') }))

  const PRICING_URL = 'https://one.habb.ch/pricing'
  const timePlan = {
    badge: t('services.habbOne.plans.time.badge'),
    price: t('services.habbOne.plans.time.price'),
    period: t('services.habbOne.plans.time.period'),
    tagline: t('services.habbOne.plans.time.tagline'),
    features: JSON.parse(t('services.habbOne.plans.time.features') || '[]') as string[],
    cta: t('services.habbOne.plans.time.cta'),
  }
  const erpPlan = {
    badge: t('services.habbOne.plans.erp.badge'),
    price: t('services.habbOne.plans.erp.price'),
    period: t('services.habbOne.plans.erp.period'),
    tagline: t('services.habbOne.plans.erp.tagline'),
    features: JSON.parse(t('services.habbOne.plans.erp.features') || '[]') as string[],
    cta: t('services.habbOne.plans.erp.cta'),
  }

  const iconMap: Record<string, React.ElementType> = {
    Clock,
    Users,
    FileText,
    Calendar,
    BarChart3,
    ShieldCheck,
  }

  return (
    <>
      <JsonLd
        data={[
          softwareApplicationLd({
            locale,
            name: t('services.habbOne.productName'),
            description: t('services.habbOne.metaDescription'),
            path: '/services/habb-one',
          }),
          breadcrumbLd(locale, [
            { name: t('nav.home'), path: '' },
            { name: t('nav.services'), path: '/services' },
            { name: t('services.habbOne.sectionTitle'), path: '/services/habb-one' },
          ]),
          faqPageLd(faq.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />
      {/* Hero / Header Section */}
      <section className="section-padding bg-gradient-to-br from-habb-gray-50 via-white to-habb-gray-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="min-w-0">
              <span className="inline-block text-sm font-semibold text-swiss-red uppercase tracking-widest mb-4">
                {t('services.habbOne.sectionTitle')}
              </span>
              <h1 className="text-habb-gray-900 mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight break-words hyphens-auto">
                {t('services.habbOne.productName')}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-swiss-red mb-6">
                {t('services.habbOne.tagline')}
              </p>
              <p className="text-lg text-habb-gray-600 mb-8">
                {overviewParagraphs[0]}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/${locale}/contact`}>
                  <Button size="lg">
                    {t('common.contactUs')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={`/${locale}/services`}>
                  <Button size="lg" variant="outline">
                    {t('services.habbOne.backToServices')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-habb-gray-100">
              <Image
                src="/habb-one/overview-product.jpg"
                alt={t('services.habbOne.productName')}
                width={1122}
                height={842}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-habb-gray-900 mb-6">
                {t('services.habbOne.overviewTitle')}
              </h2>
              <div className="space-y-4">
                {overviewParagraphs.map((paragraph, i) => (
                  <p key={i} className="text-lg text-habb-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h2 className="text-3xl font-bold text-habb-gray-900 mb-6">
                {t('services.habbOne.keyFeaturesTitle')}
              </h2>
              <div className="space-y-5">
                {keyFeatures.map((feature, i) => {
                  const Icon = iconMap[feature.icon] ?? CheckCircle2
                  return (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-habb-gray-50 hover:bg-habb-gray-100 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-swiss-red/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-swiss-red" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-habb-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-habb-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module Gallery Section */}
      <section className="section-padding bg-habb-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-habb-gray-900 mb-10 text-center">
            {t('services.habbOne.galleryTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-habb-gray-200 bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={960}
                  height={1200}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-habb-gray-900 mb-10 text-center">
            {t('services.habbOne.benefitsTitle')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5 max-w-4xl mx-auto">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-swiss-red flex-shrink-0 mt-0.5" />
                <span className="text-lg text-habb-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section: time-tracking only vs full ERP */}
      <section className="section-padding bg-gradient-to-br from-habb-gray-50 via-white to-habb-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-habb-gray-900 mb-4">
              {t('services.habbOne.plans.title')}
            </h2>
            <p className="text-lg text-habb-gray-600 leading-relaxed">
              {t('services.habbOne.plans.intro')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Time-tracking only */}
            <div className="flex flex-col rounded-2xl border-2 border-habb-gray-200 bg-white p-8">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-swiss-red" />
                <span className="text-sm font-semibold uppercase tracking-wider text-habb-gray-700">
                  {timePlan.badge}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-bold text-habb-gray-900">{timePlan.price}</span>
                <span className="text-habb-gray-500 ml-1">{timePlan.period}</span>
              </div>
              <p className="text-habb-gray-600 mb-6">{timePlan.tagline}</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {timePlan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-habb-gray-700">
                    <Check className="w-5 h-5 text-swiss-red flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full">
                  {timePlan.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>

            {/* Full ERP (highlighted) */}
            <div className="flex flex-col rounded-2xl border-2 border-swiss-red bg-white p-8 shadow-xl relative">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-swiss-red" />
                <span className="text-sm font-semibold uppercase tracking-wider text-swiss-red">
                  {erpPlan.badge}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-bold text-habb-gray-900">{erpPlan.price}</span>
                <span className="text-habb-gray-500 ml-1">{erpPlan.period}</span>
              </div>
              <p className="text-habb-gray-600 mb-6">{erpPlan.tagline}</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {erpPlan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-habb-gray-700">
                    <Check className="w-5 h-5 text-swiss-red flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-swiss-red hover:bg-swiss-red-dark">
                  {erpPlan.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>

          <div className="text-center mt-8 space-y-2">
            <p className="text-habb-gray-600">{t('services.habbOne.plans.trialNote')}</p>
            <p className="text-sm text-habb-gray-400">{t('services.habbOne.plans.vatNote')}</p>
            <a
              href={PRICING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-swiss-red font-semibold hover:gap-3 transition-all"
            >
              {t('services.habbOne.plans.pricingLink')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl font-bold text-habb-gray-900 mb-4">
              {t('services.habbOne.industriesTitle')}
            </h2>
            <p className="text-lg text-habb-gray-600 leading-relaxed">
              {t('services.habbOne.industriesIntro')}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {industries.map((industry, i) => (
              <span
                key={i}
                className="rounded-full border border-habb-gray-200 bg-habb-gray-50 px-5 py-2.5 text-base font-medium text-habb-gray-800"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-habb-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-habb-gray-900 mb-10 text-center">
              {t('services.habbOne.faqTitle')}
            </h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-habb-gray-200 bg-white p-6"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-habb-gray-900 list-none">
                    {item.q}
                    <ArrowRight className="w-5 h-5 text-swiss-red flex-shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-4 text-habb-gray-600 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-8 text-center text-habb-gray-600">
              <Link href={`/${locale}/contact`} className="text-swiss-red font-medium hover:underline">
                {t('common.contactUs')}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Deep-Links zum HABB-One-Portal (SEO: gefolgte Links zu one.habb.ch) */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl font-bold text-habb-gray-900 mb-4">
              {locale === 'de' ? 'HABB One direkt entdecken' : 'Explore HABB One directly'}
            </h2>
            <p className="text-lg text-habb-gray-600 leading-relaxed">
              {locale === 'de'
                ? 'Mehr zu den einzelnen Lösungen der HABB-One-Plattform — direkt auf one.habb.ch:'
                : 'Learn more about the individual HABB One solutions — directly on one.habb.ch:'}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Zeiterfassung Schweiz', url: 'https://one.habb.ch/zeiterfassung-schweiz' },
              { label: locale === 'de' ? 'ERP für Werkstätten' : 'ERP for workshops', url: 'https://one.habb.ch/erp-werkstatt' },
              { label: 'QR-Rechnung Software', url: 'https://one.habb.ch/qr-rechnung-software' },
              { label: locale === 'de' ? 'Alle Preise & Pakete' : 'All plans & pricing', url: 'https://one.habb.ch/pricing' },
            ].map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-xl border border-habb-gray-200 bg-habb-gray-50 p-5 hover:border-swiss-red hover:bg-white transition-colors"
              >
                <span className="font-semibold text-habb-gray-900 leading-snug">{l.label}</span>
                <ArrowRight className="w-5 h-5 text-swiss-red flex-shrink-0 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-habb-gray-900 text-white">
        <div className="container-wide text-center">
          <h2 className="text-white mb-6">{t('services.habbOne.ctaTitle')}</h2>
          <p className="text-lg text-habb-gray-300 mb-10 max-w-2xl mx-auto">
            {t('services.habbOne.ctaDescription')}
          </p>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" className="bg-swiss-red hover:bg-swiss-red-dark">
              {t('common.contactUs')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
