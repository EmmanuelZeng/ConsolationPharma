import Page from '~/components/page'
import ResourceTable from '~/components/resource_table'
import AppLayout from '~/layouts/app'
import { Link } from '@adonisjs/inertia/react'

export default function FournisseursIndex({
  fournisseurs,
}: {
  fournisseurs: {
    id: string
    nom: string
    telephone: string | null
    email: string | null
    adresse: string | null
  }[]
}) {
  return (
    <Page title="Fournisseurs">
      <p>
        <Link route="fournisseurs.create" className="btn btn--primary btn--sm">
          Nouveau fournisseur
        </Link>
      </p>
      <ResourceTable
        rows={fournisseurs}
        columns={[
          {
            key: 'nom',
            label: 'Nom',
            render: (row) => (
              <Link route="fournisseurs.show" routeParams={{ id: row.id as string }} className="il">
                {String(row.nom)}
              </Link>
            ),
          },
          { key: 'telephone', label: 'Téléphone' },
          { key: 'email', label: 'Email' },
        ]}
      />
    </Page>
  )
}

FournisseursIndex.layout = [AppLayout]
