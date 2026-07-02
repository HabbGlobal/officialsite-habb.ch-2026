import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { Button } from '@/components/ui'
import {
  UtensilsCrossed,
  ArrowRight,
  QrCode,
  ChefHat,
  CreditCard,
  CalendarCheck,
  ShoppingBag,
  Settings,
  CheckCircle2,
} from 'lucide-react'

interface GastroProductSectionProps {
  locale: Locale
}

export function GastroProductSection({ locale }: GastroProductSectionProps) {
  const t = getTranslations(locale)

  const keyFeatures = JSON.parse(t('services.habbGastro.keyFeatures') || '[]') as {
    icon: string
    title: string
    description: string
  }[]

  const iconMap: Record<string, React.ElementType> = {
    QrCode,
    ChefHat,
    CreditCard,
    CalendarCheck,
    ShoppingBag,
    Settings,
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: teaser */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-swiss-red/10 text-swiss-red px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-6">
              <UtensilsCrossed className="w-4 h-4" />
              {t('services.habbGastro.badge')}
            </span>
            <h2 className="text-habb-gray-900 mb-4 text-3xl sm:text-4xl font-bold leading-tight">
              {t('services.habbGastro.teaserTitle')}
            </h2>
            <p className="text-lg sm:text-xl text-habb-gray-600 mb-8">
              {t('services.habbGastro.teaserText')}
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
              <Link href={`/${locale}/services/habb-gastro`} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-swiss-red hover:bg-swiss-red-dark">
                  {t('services.habbGastro.teaserCta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href={`/${locale}/contact`} className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {t('common.contactUs')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: feature grid */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {keyFeatures.map((feature, i) => {
                const Icon = iconMap[feature.icon] ?? CheckCircle2
                return (
                  <div
                    key={i}
                    className="flex flex-col gap-3 rounded-xl bg-habb-gray-50 p-5 border border-habb-gray-100"
                  >
                    <div className="w-10 h-10 rounded-lg bg-swiss-red/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-swiss-red" />
                    </div>
                    <span className="text-sm font-medium text-habb-gray-900 leading-snug">
                      {feature.title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
