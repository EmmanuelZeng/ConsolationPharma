import { Link } from '@adonisjs/inertia/react'
import { Pill } from 'lucide-react'

type LogoProps = {
  size?: number
  showText?: boolean
  href?: 'dashboard' | 'session.create' | null
}

export default function Logo({ size = 28, showText = true, href = 'dashboard' }: LogoProps) {
  const content = (
    <>
      <span className="brand-mark" style={{ width: size + 8, height: size + 8 }}>
        <Pill size={size} strokeWidth={2.2} aria-hidden />
      </span>
      {showText && <span className="brand-text">Consolation Pharma</span>}
    </>
  )

  if (!href) {
    return (
      <span className="brand" aria-label="Consolation Pharma">
        {content}
      </span>
    )
  }

  return (
    <Link route={href} className="brand" aria-label="Consolation Pharma">
      {content}
    </Link>
  )
}
