import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Link } from '@adonisjs/inertia/react'

type Summary = {
  counts: {
    medicaments: number
    fournisseurs: number
    ventes: number
    achats: number
  }
  stockValue: number
  ventes: {
    jour: number
    semaine: number
    mois: number
  }
  topMedicaments: { nom: string; quantite: number }[]
  alerts: {
    lowStock: { id: string; nom: string; stock: number; status: string }[]
    outOfStock: { id: string; nom: string; stock: number; status: string }[]
    expiringLots: {
      id: string
      numeroLot: string
      medicament: string
      dateExpiration: string | null
      quantite: number
    }[]
  }
}

export default function Dashboard({ summary }: { summary: Summary }) {
  return (
    <Page title="Tableau de bord">
      <div className="grid-cards">
        <article className="panel stat">
          <span>Médicaments</span>
          <strong>{summary.counts.medicaments}</strong>
        </article>
        <article className="panel stat">
          <span>Fournisseurs</span>
          <strong>{summary.counts.fournisseurs}</strong>
        </article>
        <article className="panel stat">
          <span>Ventes</span>
          <strong>{summary.counts.ventes}</strong>
        </article>
        <article className="panel stat">
          <span>Achats</span>
          <strong>{summary.counts.achats}</strong>
        </article>
        <article className="panel stat">
          <span>Valeur du stock</span>
          <strong>{summary.stockValue.toLocaleString('fr-FR')} FC</strong>
        </article>
      </div>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2>Ventes</h2>
        <p>Jour : {summary.ventes.jour.toLocaleString('fr-FR')} FC</p>
        <p>Semaine : {summary.ventes.semaine.toLocaleString('fr-FR')} FC</p>
        <p>Mois : {summary.ventes.mois.toLocaleString('fr-FR')} FC</p>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2>Alertes stock</h2>
        <h3>Stock faible</h3>
        {summary.alerts.lowStock.length === 0 ? (
          <p className="muted">Aucune alerte.</p>
        ) : (
          summary.alerts.lowStock.map((item) => (
            <p key={item.id}>
              {item.nom} — {item.stock} unités
            </p>
          ))
        )}
        <h3>Rupture</h3>
        {summary.alerts.outOfStock.length === 0 ? (
          <p className="muted">Aucune rupture.</p>
        ) : (
          summary.alerts.outOfStock.map((item) => (
            <p key={item.id}>
              {item.nom} — {item.stock} unités
            </p>
          ))
        )}
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2>Lots bientôt expirés</h2>
        {summary.alerts.expiringLots.length === 0 ? (
          <p className="muted">Aucun lot à surveiller.</p>
        ) : (
          summary.alerts.expiringLots.map((lot) => (
            <p key={lot.id}>
              {lot.medicament} ({lot.numeroLot}) — expire le {lot.dateExpiration} — {lot.quantite}{' '}
              unités
            </p>
          ))
        )}
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2>Top ventes</h2>
        {summary.topMedicaments.length === 0 ? (
          <p className="muted">Pas encore de ventes.</p>
        ) : (
          summary.topMedicaments.map((item) => (
            <p key={item.nom}>
              {item.nom} — {item.quantite} unités
            </p>
          ))
        )}
        <p style={{ marginTop: 12 }}>
          <Link route="ventes.create" className="il">
            Nouvelle vente
          </Link>
        </p>
      </section>
    </Page>
  )
}

Dashboard.layout = [AppLayout]
