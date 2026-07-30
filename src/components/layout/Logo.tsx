import Link from 'next/link'
import Image from 'next/image'

export function Logo({ className = '' }: { className?: string, locale?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/brand/logo-full.png"
        alt="Habb Switzerland"
        width={800}
        height={303}
        className="h-11 sm:h-12 w-auto"
        priority
      />
    </Link>
  )
}
