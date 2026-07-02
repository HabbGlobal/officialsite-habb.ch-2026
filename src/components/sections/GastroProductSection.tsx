import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { Button } from '@/components/ui'
import { UtensilsCrossed, ArrowRight } from 'lucide-react'

interface GastroProductSectionProps {
  locale: Locale
}

export function GastroProductSection({ locale }: GastroProductSectionProps) {
  const t = getTranslations(locale)

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

          {/* Right: product visual */}
          <div className="lg:pl-4">
            <Link
              href={`/${locale}/services/habb-gastro`}
              className="block rounded-2xl overflow-hidden border border-habb-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                src="/gastro/overview-product.jpg"
                alt={t('services.habbGastro.teaserTitle')}
                width={1200}
                height={769}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full h-auto object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
