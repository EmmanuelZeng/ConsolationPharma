import Logo from '~/components/logo'
import { type ReactNode } from 'react'
import { Activity, Package, ShieldCheck } from 'lucide-react'
import FlashToasts from '~/components/flash_toasts'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="login-shell">
        <section className="login-shell__hero" aria-hidden={false}>
          <div className="login-shell__hero-inner">
            <Logo href={null} showText size={32} />

            <h1 className="login-shell__headline">
              Gestion de pharmacie claire, fiable et pensée pour le terrain.
            </h1>
            <p className="login-shell__lead">
              Stocks, achats, ventes et alertes au même endroit. Connectez-vous pour accéder à
              votre espace de travail.
            </p>

            <ul className="login-shell__features">
              <li>
                <Package size={18} />
                Suivi des lots et ruptures
              </li>
              <li>
                <Activity size={18} />
                Ventes avec règle FEFO
              </li>
              <li>
                <ShieldCheck size={18} />
                Accès sécurisé par rôle
              </li>
            </ul>
          </div>
        </section>

        <section className="login-shell__panel">
          <div className="login-shell__card">{children}</div>
        </section>
      </div>
      <FlashToasts />
    </>
  )
}
