import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Link } from '@adonisjs/inertia/react'

export default function FournisseursShow({
  fournisseur,
  achats,
}: {
  fournisseur: {
    id: string
    nom: string
    telephone: string | null
    email: string | null
    adresse: string | null
  }
  achats: {
    id: string
    numeroAchat: string
    dateAchat: string | null
    montantTotal: number
    utilisateur: string
    lignes: { medicament: string; quantite: number; sousTotal: number }[]
  }[]
}) {
  return (
    <Page title={fournisseur.nom}>
      <p>
        <Link route="fournisseurs.edit" routeParams={{ id: fournisseur.id }} className="il">
          Modifier
        </Link>
      </p>
      <div className="panel">
        <p>Téléphone : {fournisseur.telephone ?? '—'}</p>
        <p>Email : {fournisseur.email ?? '—'}</p>
        <p>Adresse : {fournisseur.adresse ?? '—'}</p>
      </div>
      <h2 style={{ marginTop: 16 }}>Historique des achats</h2>
      {achats.length === 0 ? (
        <p className="muted">Aucun achat enregistré.</p>
      ) : (
        achats.map((achat) => (
          <article key={achat.id} className="panel" style={{ marginTop: 8 }}>
            <p>
              <Link route="achats.show" routeParams={{ id: achat.id }} className="il">
                {achat.numeroAchat}
              </Link>{' '}
              — {achat.dateAchat} — {achat.montantTotal} FC
            </p>
          </article>
        ))
      )}
    </Page>
  )
}

FournisseursShow.layout = [AppLayout]
