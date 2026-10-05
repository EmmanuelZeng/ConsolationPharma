import Page from '~/components/page'
import ResourceTable from '~/components/resource_table'
import AppLayout from '~/layouts/app'
import { Link } from '@adonisjs/inertia/react'

export default function VentesIndex({
  ventes,
  filters: _filters,
}: {
  filters?: { numero?: string; userId?: string; date?: string }
  ventes: {
    id: string
    numeroVente: string
    date: string | null
    utilisateur: string
    montantTotal: number
  }[]
}) {
  return (
    <Page title="Ventes">
      <p>
        <Link route="ventes.create" className="btn btn--primary btn--sm">
          Nouvelle vente
        </Link>
      </p>
      <ResourceTable
        rows={ventes}
        columns={[
          {
            key: 'numeroVente',
            label: 'Numéro',
            render: (row) => (
              <Link route="ventes.show" routeParams={{ id: row.id as string }} className="il">
                {String(row.numeroVente)}
              </Link>
            ),
          },
          { key: 'date', label: 'Date' },
          { key: 'utilisateur', label: 'Utilisateur' },
          { key: 'montantTotal', label: 'Total' },
        ]}
      />
    </Page>
  )
}

VentesIndex.layout = [AppLayout]
