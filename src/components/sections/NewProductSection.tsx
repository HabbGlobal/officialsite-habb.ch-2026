import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { Button } from '@/components/ui'
import { Sparkles, ArrowRight, Clock, Check } from 'lucide-react'

interface NewProductSectionProps {
  locale: Locale
}

const PRICING_URL = 'https://one.habb.ch/pricing'

export function NewProductSection({ locale }: NewProductSectionProps) {
  const t = getTranslations(locale)

  const keyFeatures = JSON.parse(t('services.habbOne.keyFeatures') || '[]') as {
    icon: string
    title: string
    description: string
  }[]

  const timeFeatures = JSON.parse(t('services.habbOne.plans.time.features') || '[]') as string[]

  return (
    <section className="section-padding bg-habb-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-swiss-red/20 via-transparent to-transparent pointer-events-none" />
      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: HABB One teaser */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-swiss-red px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-6">
              <Sparkles className="w-4 h-4" />
              {t('services.habbOne.badge')}
            </span>
            <h2 className="text-white mb-4 text-3xl sm:text-4xl font-bold leading-tight">
              {t('services.habbOne.teaserTitle')}
            </h2>
            <p className="text-lg sm:text-xl text-habb-gray-300 mb-8">
              {t('services.habbOne.teaserText')}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 mb-10">
              {keyFeatures.map((feature, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/15 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-habb-gray-200"
                >
                  {feature.title}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
              <Link href={`/${locale}/services/habb-one`} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-swiss-red hover:bg-swiss-red-dark">
                  {t('services.habbOne.teaserCta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href={`/${locale}/contact`} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
                >
                  {t('common.contactUs')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: time-tracking entry card */}
          <div className="lg:pl-4">
            <div className="rounded-2xl bg-white text-habb-gray-900 p-6 sm:p-8 shadow-2xl max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <p className="text-sm font-medium text-habb-gray-500 mb-4">
                {t('services.habbOne.plans.homeEyebrow')}
              </p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-swiss-red/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-swiss-red" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wider text-habb-gray-700">
                  {t('services.habbOne.plans.time.badge')}
                </span>
              </div>
              <div className="mb-3">
                <span className="text-3xl sm:text-4xl font-bold text-habb-gray-900">
                  {t('services.habbOne.plans.time.price')}
                </span>
                <span className="text-habb-gray-500 ml-1">
                  {t('services.habbOne.plans.time.period')}
                </span>
              </div>
              <p className="text-habb-gray-600 mb-6">
                {t('services.habbOne.plans.time.tagline')}
              </p>
              <ul className="space-y-2.5 mb-7">
                {timeFeatures.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-habb-gray-700">
                    <Check className="w-5 h-5 text-swiss-red flex-shrink-0 mt-px" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-swiss-red hover:bg-swiss-red-dark">
                  {t('services.habbOne.plans.time.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <p className="text-xs text-habb-gray-400 mt-3 text-center">
                {t('services.habbOne.plans.vatNote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
