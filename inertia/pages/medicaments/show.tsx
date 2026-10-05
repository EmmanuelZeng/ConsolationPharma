import Page from '~/components/page'
import ResourceTable from '~/components/resource_table'
import AppLayout from '~/layouts/app'
import { Link } from '@adonisjs/inertia/react'

export default function MedicamentsShow({
  medicament,
}: {
  medicament: {
    id: string
    nom: string
    description: string | null
    categorie: string
    prixVente: number
    seuilAlerte: number
    stock: number
    status: string
    lots: {
      id: string
      numeroLot: string
      quantite: number
      prixAchat: number
      dateExpiration: string | null
      dateReception: string | null
      fournisseur: string | null
    }[]
  }
}) {
  return (
    <Page title={medicament.nom}>
      <p>
        <Link route="medicaments.edit" routeParams={{ id: medicament.id }} className="il">
          Modifier
        </Link>
      </p>
      <div className="panel">
        <p>Catégorie : {medicament.categorie}</p>
        <p>Description : {medicament.description ?? '—'}</p>
        <p>Prix de vente : {medicament.prixVente} FC</p>
        <p>Seuil d alerte : {medicament.seuilAlerte}</p>
        <p>
          Stock : {medicament.stock} ({medicament.status})
        </p>
      </div>
      <h2 style={{ marginTop: 16 }}>Lots</h2>
      <ResourceTable
        rows={medicament.lots}
        columns={[
          { key: 'numeroLot', label: 'Lot' },
          { key: 'quantite', label: 'Quantité' },
          { key: 'prixAchat', label: 'Prix achat' },
          { key: 'dateExpiration', label: 'Expiration' },
          { key: 'fournisseur', label: 'Fournisseur' },
        ]}
        emptyLabel="Aucun lot enregistré."
      />
    </Page>
  )
}

MedicamentsShow.layout = [AppLayout]
