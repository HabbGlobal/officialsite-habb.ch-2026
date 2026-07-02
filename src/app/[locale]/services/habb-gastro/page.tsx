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
  QrCode,
  ChefHat,
  CreditCard,
  CalendarCheck,
  ShoppingBag,
  Settings,
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
    path: '/services/habb-gastro',
    title: t('services.habbGastro.metaTitle'),
    description: t('services.habbGastro.metaDescription'),
  })

  meta.title = { absolute: t('services.habbGastro.metaTitle') }
  meta.keywords =
    locale === 'de'
      ? [
          'Gastro-Software Schweiz',
          'Restaurant-Software',
          'Kassensystem Restaurant',
          'QR-Bestellung Restaurant',
          'Küchen-Display KDS',
          'Reservationssystem Restaurant',
          'Take-Away Software',
          'Street-Food Kasse',
          'HABB Gastro',
        ]
      : [
          'restaurant software Switzerland',
          'POS system restaurant',
          'QR ordering restaurant',
          'kitchen display system',
          'reservation system restaurant',
          'take-away software',
          'HABB Gastro',
        ]

  // Product visual beats the generic logo for social sharing
  meta.openGraph = { ...meta.openGraph, images: ['/gastro/overview.jpg'] }
  meta.twitter = { ...meta.twitter, images: ['/gastro/overview.jpg'] }

  return meta
}

export default async function HabbGastroPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const t = getTranslations(locale)

  const overviewParagraphs = (t('services.habbGastro.overviewText') || '').split('\n').filter(Boolean)

  const keyFeatures = JSON.parse(t('services.habbGastro.keyFeatures') || '[]') as {
    icon: string
    title: string
    description: string
  }[]

  const industries = JSON.parse(t('services.habbGastro.industries') || '[]') as string[]
  const benefits = JSON.parse(t('services.habbGastro.benefits') || '[]') as string[]
  const faq = JSON.parse(t('services.habbGastro.faq') || '[]') as { q: string; a: string }[]

  // Module visuals, aligned with the keyFeatures order (alt text reuses the
  // localized feature titles): QR, kitchen, POS, reservations, takeaway, admin
  const galleryImages = [
    '/gastro/qr-bestellung.jpg',
    '/gastro/kitchen.jpg',
    '/gastro/pos.jpg',
    '/gastro/reservation.jpg',
    '/gastro/takeaway.jpg',
    '/gastro/admin.jpg',
  ].map((src, i) => ({ src, alt: keyFeatures[i]?.title ?? t('services.habbGastro.sectionTitle') }))

  const iconMap: Record<string, React.ElementType> = {
    QrCode,
    ChefHat,
    CreditCard,
    CalendarCheck,
    ShoppingBag,
    Settings,
  }

  return (
    <>
      <JsonLd
        data={[
          softwareApplicationLd({
            locale,
            name: t('services.habbGastro.productName'),
            description: t('services.habbGastro.metaDescription'),
            path: '/services/habb-gastro',
          }),
          breadcrumbLd(locale, [
            { name: t('nav.home'), path: '' },
            { name: t('nav.services'), path: '/services' },
            { name: t('services.habbGastro.sectionTitle'), path: '/services/habb-gastro' },
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
                {t('services.habbGastro.sectionTitle')}
              </span>
              <h1 className="text-habb-gray-900 mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight break-words hyphens-auto">
                {t('services.habbGastro.productName')}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-swiss-red mb-6">
                {t('services.habbGastro.tagline')}
              </p>
              <p className="text-lg text-habb-gray-600 mb-8">
                {overviewParagraphs[0]}
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                <Link href={`/${locale}/contact`} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">
                    {t('common.contactUs')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={`/${locale}/services`} className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    {t('services.habbGastro.backToServices')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-habb-gray-100">
              <Image
                src="/gastro/overview.jpg"
                alt={t('services.habbGastro.productName')}
                width={1200}
                height={1200}
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
                {t('services.habbGastro.overviewTitle')}
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
                {t('services.habbGastro.keyFeaturesTitle')}
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
            {t('services.habbGastro.galleryTitle')}
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
                  width={1200}
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
            {t('services.habbGastro.benefitsTitle')}
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

      {/* Industries Section */}
      <section className="section-padding bg-habb-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl font-bold text-habb-gray-900 mb-4">
              {t('services.habbGastro.industriesTitle')}
            </h2>
            <p className="text-lg text-habb-gray-600 leading-relaxed">
              {t('services.habbGastro.industriesIntro')}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {industries.map((industry, i) => (
              <span
                key={i}
                className="rounded-full border border-habb-gray-200 bg-white px-5 py-2.5 text-base font-medium text-habb-gray-800"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-habb-gray-900 mb-10 text-center">
              {t('services.habbGastro.faqTitle')}
            </h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-habb-gray-200 bg-habb-gray-50 p-6"
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

      {/* CTA Section */}
      <section className="section-padding bg-habb-gray-900 text-white">
        <div className="container-wide text-center">
          <h2 className="text-white mb-6">{t('services.habbGastro.ctaTitle')}</h2>
          <p className="text-lg text-habb-gray-300 mb-10 max-w-2xl mx-auto">
            {t('services.habbGastro.ctaDescription')}
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
