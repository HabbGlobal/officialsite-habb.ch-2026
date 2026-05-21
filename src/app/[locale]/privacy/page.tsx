import { Metadata } from 'next'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { buildPageMetadata } from '@/lib/seo'
import { LegalContent } from '@/components/LegalContent'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale as Locale)

  return buildPageMetadata({
    locale: locale as Locale,
    path: '/privacy',
    title: t('privacy.title'),
    description:
      locale === 'de'
        ? 'Datenschutzerklärung von Habb Switzerland – wie wir personenbezogene Daten erheben, bearbeiten und schützen (revDSG & DSGVO).'
        : 'Privacy policy of Habb Switzerland – how we collect, process and protect personal data (revFADP & GDPR).',
  })
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const t = getTranslations(locale)

  const sectionKeys = [
    'intro',
    'controller',
    'collection',
    'purposes',
    'cookies',
    'sharing',
    'hosting',
    'retention',
    'security',
    'rights',
    'international',
    'changes',
    'contact',
  ]
  const sections = sectionKeys.map((key) => ({
    title: t(`privacy.sections.${key}.title`),
    content: t(`privacy.sections.${key}.content`),
  }))

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-habb-gray-50 via-white to-habb-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-habb-gray-900 mb-4">{t('privacy.title')}</h1>
            <p className="text-habb-gray-500">
              {t('privacy.lastUpdated', { date: locale === 'de' ? '18. Mai 2026' : 'May 18, 2026' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-4xl">
            <LegalContent sections={sections} />

            {/* Contact Info */}
            <div className="mt-16 p-8 bg-habb-gray-50 rounded-2xl">
              <h3 className="text-xl font-semibold text-habb-gray-900 mb-4">
                {locale === 'de' ? 'Datenschutzbeauftragter' : 'Data Protection Officer'}
              </h3>
              <div className="text-habb-gray-600 space-y-2">
                <p>Habb Switzerland</p>
                <p>Sonnheimstrasse 6</p>
                <p>3415 Rüegsauschachen, {locale === 'de' ? 'Schweiz' : 'Switzerland'}</p>
                <p className="mt-4">
                  <a href="mailto:privacy@habb.ch" className="text-swiss-red hover:underline">
                    privacy@habb.ch
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
