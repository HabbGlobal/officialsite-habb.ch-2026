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
  Mail,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Zap,
  Database,
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
    path: '/services/ai-solutions',
    title: t('services.smartmail.metaTitle'),
    description: t('services.smartmail.metaDescription'),
  })

  meta.title = { absolute: t('services.smartmail.metaTitle') }
  meta.keywords =
    locale === 'de'
      ? [
          'E-Mail-Automatisierung KMU',
          'E-Mail Automatisierung Schweiz',
          'KI E-Mail-Klassifizierung',
          'KI Offerten erstellen',
          'automatische Offertenerstellung',
          'KI für KMU',
          'künstliche Intelligenz KMU Schweiz',
          'Angebotserstellung automatisieren',
          'HABB AI Lösungen',
        ]
      : [
          'email automation SME',
          'email automation Switzerland',
          'AI email classification',
          'AI quotation generation',
          'automatic quotation software',
          'AI for SMEs',
          'HABB AI Solutions',
        ]

  return meta
}

export default async function SmartMailPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const t = getTranslations(locale)

  const overviewParagraphs = (t('services.smartmail.overviewText') || '').split('\n').filter(Boolean)

  const keyFeatures = JSON.parse(t('services.smartmail.keyFeatures') || '[]') as {
    icon: string
    title: string
    description: string
  }[]

  const benefits = JSON.parse(t('services.smartmail.benefits') || '[]') as string[]
  const steps = JSON.parse(t('services.smartmail.steps') || '[]') as {
    title: string
    description: string
  }[]
  const faq = JSON.parse(t('services.smartmail.faq') || '[]') as { q: string; a: string }[]

  const iconMap: Record<string, React.ElementType> = {
    Mail,
    FileText,
    Zap,
    CheckCircle2,
    ShieldCheck,
    Database,
  }

  return (
    <>
      <JsonLd
        data={[
          softwareApplicationLd({
            locale,
            name: t('services.smartmail.productName'),
            description: t('services.smartmail.metaDescription'),
            path: '/services/ai-solutions',
          }),
          breadcrumbLd(locale, [
            { name: t('nav.home'), path: '' },
            { name: t('nav.services'), path: '/services' },
            { name: t('services.smartmail.sectionTitle'), path: '/services/ai-solutions' },
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
                {t('services.smartmail.sectionTitle')}
              </span>
              <h1 className="text-habb-gray-900 mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight break-words hyphens-auto">
                {t('services.smartmail.productName')}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-swiss-red mb-6">
                {t('services.smartmail.tagline')}
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
                    {t('services.smartmail.backToServices')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/habb-smartmail.png"
                alt={t('services.smartmail.productName')}
                width={700}
                height={500}
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
                {t('services.smartmail.overviewTitle')}
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
                {t('services.smartmail.keyFeaturesTitle')}
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

      {/* How It Works Section */}
      <section className="section-padding bg-habb-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold text-habb-gray-900 mb-4">
              {t('services.smartmail.howTitle')}
            </h2>
            <p className="text-lg text-habb-gray-600 leading-relaxed">
              {t('services.smartmail.howIntro')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="rounded-2xl bg-white border border-habb-gray-200 p-6">
                <div className="w-10 h-10 rounded-lg bg-swiss-red text-white flex items-center justify-center font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-habb-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-habb-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-habb-gray-900 mb-10 text-center">
            {t('services.smartmail.benefitsTitle')}
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

      {/* FAQ Section */}
      <section className="section-padding bg-habb-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-habb-gray-900 mb-10 text-center">
              {t('services.smartmail.faqTitle')}
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

      {/* CTA Section */}
      <section className="section-padding bg-habb-gray-900 text-white">
        <div className="container-wide text-center">
          <h2 className="text-white mb-6">{t('services.smartmail.ctaTitle')}</h2>
          <p className="text-lg text-habb-gray-300 mb-10 max-w-2xl mx-auto">
            {t('services.smartmail.ctaDescription')}
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
