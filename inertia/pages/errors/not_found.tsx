import MarketingLayout from '~/layouts/marketing'
import { Link } from '@adonisjs/inertia/react'

export default function NotFound() {
  return (
    <div className="home">
      <article className="prose-card">
        <div className="pc-top">
          <span className="pc-status mono tag" style={{ color: 'var(--subtle)' }}>
            <span className="dot" /> 404
          </span>
        </div>
        <div className="pc-lead">
          <span>Page introuvable.</span>
        </div>
        <p className="pc-para">Cette adresse n&apos;existe pas ou a été déplacée.</p>
        <p style={{ marginTop: 16 }}>
          <Link route="session.create" className="btn btn--primary btn--sm">
            Retour à la connexion
          </Link>
        </p>
      </article>
    </div>
  )
}

NotFound.layout = [MarketingLayout]
