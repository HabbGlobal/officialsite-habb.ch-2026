'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { Logo } from './Logo'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'

interface HeaderProps {
  locale: Locale
}

interface DropdownItem {
  key: string
  label: string
  description: string
}

// Anchor/product targets for the dropdown entries (keys come from i18n)
const SERVICE_HREFS: Record<string, string> = {
  custom: '/services#development',
  ai: '/services#data',
  consulting: '/services#consulting',
}

const PRODUCT_HREFS: Record<string, string> = {
  'habb-one': '/services/habb-one',
  'habb-gastro': '/services/habb-gastro',
  'ai-solutions': '/services/ai-solutions',
}

// Paths (below /<locale>) that belong to the product dropdown
const PRODUCT_PATHS = [
  '/services/habb-one',
  '/services/habb-gastro',
  '/services/ai-solutions',
  '/services/ai-Solutions',
  '/services/smartmail',
]

export function Header({ locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileGroup, setMobileGroup] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const t = getTranslations(locale)

  // Close all menus after navigation
  useEffect(() => {
    setMobileMenuOpen(false)
    setOpenDropdown(null)
    setMobileGroup(null)
  }, [pathname])

  // Close the desktop dropdown on outside click / Escape
  useEffect(() => {
    if (!openDropdown) return
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDropdown(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [openDropdown])

  const servicesItems = (JSON.parse(t('nav.servicesDropdown') || '[]') as DropdownItem[]).map(
    (item) => ({ ...item, href: `/${locale}${SERVICE_HREFS[item.key] ?? '/services'}` })
  )
  const productItems = (JSON.parse(t('nav.productsDropdown') || '[]') as DropdownItem[]).map(
    (item) => ({ ...item, href: `/${locale}${PRODUCT_HREFS[item.key] ?? '/services'}` })
  )

  const isProductActive = PRODUCT_PATHS.some((p) => pathname.startsWith(`/${locale}${p}`))
  const isServicesActive = pathname.startsWith(`/${locale}/services`) && !isProductActive

  const triggerClass = (active: boolean, open: boolean) =>
    cn(
      'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
      active || open
        ? 'text-swiss-red bg-swiss-red/5'
        : 'text-habb-gray-700 hover:text-swiss-red hover:bg-habb-gray-50'
    )

  const plainLinkClass = (active: boolean) =>
    cn(
      'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
      active
        ? 'text-swiss-red bg-swiss-red/5'
        : 'text-habb-gray-700 hover:text-swiss-red hover:bg-habb-gray-50'
    )

  const dropdowns: {
    id: string
    label: string
    active: boolean
    items: (DropdownItem & { href: string })[]
    footerLink?: { href: string; label: string }
  }[] = [
    {
      id: 'services',
      label: t('nav.services'),
      active: isServicesActive,
      items: servicesItems,
      footerLink: { href: `/${locale}/services`, label: t('nav.allServices') },
    },
    {
      id: 'products',
      label: t('nav.products'),
      active: isProductActive,
      items: productItems,
    },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-habb-gray-100">
      <nav ref={navRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Logo locale={locale} />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {dropdowns.map((dropdown) => (
              <div
                key={dropdown.id}
                className="relative"
                onMouseEnter={() => setOpenDropdown(dropdown.id)}
                onMouseLeave={() => setOpenDropdown((cur) => (cur === dropdown.id ? null : cur))}
              >
                <button
                  type="button"
                  className={triggerClass(dropdown.active, openDropdown === dropdown.id)}
                  aria-expanded={openDropdown === dropdown.id}
                  aria-haspopup="menu"
                  // Open only — hover already opens on desktop, so a toggle
                  // would immediately close the hover-opened menu on click.
                  // Closing happens via mouseleave, Escape or outside click.
                  onClick={() => setOpenDropdown(dropdown.id)}
                >
                  {dropdown.label}
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform',
                      openDropdown === dropdown.id && 'rotate-180'
                    )}
                  />
                </button>

                {openDropdown === dropdown.id && (
                  <div className="absolute left-0 top-full pt-2 w-80 z-50">
                    <div className="rounded-xl border border-habb-gray-100 bg-white shadow-xl overflow-hidden">
                      <div className="p-2">
                        {dropdown.items.map((item) => (
                          <Link
                            key={item.key}
                            href={item.href}
                            className="block rounded-lg px-4 py-3 hover:bg-habb-gray-50 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span className="block text-sm font-semibold text-habb-gray-900">
                              {item.label}
                            </span>
                            <span className="block text-xs text-habb-gray-500 mt-0.5">
                              {item.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                      {dropdown.footerLink && (
                        <Link
                          href={dropdown.footerLink.href}
                          className="flex items-center gap-2 border-t border-habb-gray-100 bg-habb-gray-50 px-6 py-3 text-sm font-medium text-swiss-red hover:bg-habb-gray-100 transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {dropdown.footerLink.label}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              href={`/${locale}/about`}
              className={plainLinkClass(pathname.startsWith(`/${locale}/about`))}
            >
              {t('nav.about')}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className={plainLinkClass(pathname.startsWith(`/${locale}/blog`))}
            >
              {t('nav.blog')}
            </Link>
          </div>

          {/* Right side: language, contact CTA, mobile toggle */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />

            <Link href={`/${locale}/contact`} className="hidden lg:block">
              <Button size="sm">
                {t('nav.contact')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <button
              className="lg:hidden p-2 text-habb-gray-700 hover:bg-habb-gray-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-habb-gray-100 animate-slide-down">
            <div className="flex flex-col gap-1">
              {dropdowns.map((dropdown) => (
                <div key={dropdown.id}>
                  <button
                    type="button"
                    className={cn(
                      'flex w-full items-center justify-between px-4 py-3 text-base font-medium rounded-lg transition-colors',
                      dropdown.active
                        ? 'text-swiss-red bg-swiss-red/5'
                        : 'text-habb-gray-700 hover:text-swiss-red hover:bg-habb-gray-50'
                    )}
                    aria-expanded={mobileGroup === dropdown.id}
                    onClick={() =>
                      setMobileGroup((cur) => (cur === dropdown.id ? null : dropdown.id))
                    }
                  >
                    {dropdown.label}
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 transition-transform',
                        mobileGroup === dropdown.id && 'rotate-180'
                      )}
                    />
                  </button>

                  {mobileGroup === dropdown.id && (
                    <div className="mt-1 mb-2 ml-2 border-l-2 border-habb-gray-100 pl-2">
                      {dropdown.items.map((item) => (
                        <Link
                          key={item.key}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-lg px-4 py-2.5 hover:bg-habb-gray-50"
                        >
                          <span className="block text-sm font-medium text-habb-gray-900">
                            {item.label}
                          </span>
                          <span className="block text-xs text-habb-gray-500">
                            {item.description}
                          </span>
                        </Link>
                      ))}
                      {dropdown.footerLink && (
                        <Link
                          href={dropdown.footerLink.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-swiss-red"
                        >
                          {dropdown.footerLink.label}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <Link
                href={`/${locale}/about`}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'px-4 py-3 text-base font-medium rounded-lg transition-colors',
                  pathname.startsWith(`/${locale}/about`)
                    ? 'text-swiss-red bg-swiss-red/5'
                    : 'text-habb-gray-700 hover:text-swiss-red hover:bg-habb-gray-50'
                )}
              >
                {t('nav.about')}
              </Link>
              <Link
                href={`/${locale}/blog`}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'px-4 py-3 text-base font-medium rounded-lg transition-colors',
                  pathname.startsWith(`/${locale}/blog`)
                    ? 'text-swiss-red bg-swiss-red/5'
                    : 'text-habb-gray-700 hover:text-swiss-red hover:bg-habb-gray-50'
                )}
              >
                {t('nav.blog')}
              </Link>

              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 px-2"
              >
                <Button className="w-full">
                  {t('nav.contact')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
