import Page from '~/components/page'
import ResourceTable from '~/components/resource_table'
import AppLayout from '~/layouts/app'
import { Link } from '@adonisjs/inertia/react'

export default function LotsIndex({
  lots,
}: {
  lots: {
    id: string
    numeroLot: string
    medicament: string
    fournisseur: string | null
    quantite: number
    prixAchat: number
    dateExpiration: string | null
    dateReception: string | null
    expired: boolean
  }[]
}) {
  return (
    <Page title="Lots">
      <p>
        <Link route="lots.stock" className="il">
          Voir le stock par médicament
        </Link>
      </p>
      <ResourceTable
        rows={lots}
        columns={[
          { key: 'numeroLot', label: 'Lot' },
          { key: 'medicament', label: 'Médicament' },
          { key: 'fournisseur', label: 'Fournisseur' },
          { key: 'quantite', label: 'Quantité' },
          { key: 'prixAchat', label: 'Prix achat' },
          { key: 'dateExpiration', label: 'Expiration' },
          {
            key: 'expired',
            label: 'Statut',
            render: (row) => (row.expired ? 'Expiré' : 'Valide'),
          },
        ]}
      />
    </Page>
  )
}

LotsIndex.layout = [AppLayout]
