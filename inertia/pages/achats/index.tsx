import Page from '~/components/page'
import ResourceTable from '~/components/resource_table'
import AppLayout from '~/layouts/app'
import { Link } from '@adonisjs/inertia/react'

export default function AchatsIndex({
  achats,
}: {
  achats: {
    id: string
    numeroAchat: string
    fournisseur: string
    dateAchat: string | null
    montantTotal: number
    utilisateur: string
  }[]
}) {
  return (
    <Page title="Achats">
      <p>
        <Link route="achats.create" className="btn btn--primary btn--sm">
          Nouvel achat
        </Link>
      </p>
      <ResourceTable
        rows={achats}
        columns={[
          {
            key: 'numeroAchat',
            label: 'Numéro',
            render: (row) => (
              <Link route="achats.show" routeParams={{ id: row.id as string }} className="il">
                {String(row.numeroAchat)}
              </Link>
            ),
          },
          { key: 'fournisseur', label: 'Fournisseur' },
          { key: 'dateAchat', label: 'Date' },
          { key: 'montantTotal', label: 'Total' },
          { key: 'utilisateur', label: 'Utilisateur' },
        ]}
      />
    </Page>
  )
}

AchatsIndex.layout = [AppLayout]
