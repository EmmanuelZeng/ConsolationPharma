import Page from '~/components/page'
import ResourceTable from '~/components/resource_table'
import AppLayout from '~/layouts/app'
import { Link } from '@adonisjs/inertia/react'

export default function UsersIndex({
  users,
}: {
  users: {
    id: string
    nom: string
    prenom: string
    email: string
    role: string
    createdAt: string | null
  }[]
}) {
  return (
    <Page title="Utilisateurs">
      <p>
        <Link route="users.create" className="btn btn--primary btn--sm">
          Nouvel utilisateur
        </Link>
      </p>
      <ResourceTable
        rows={users}
        columns={[
          { key: 'nom', label: 'Nom' },
          { key: 'prenom', label: 'Prénom' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Rôle' },
          {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
              <Link route="users.edit" routeParams={{ id: row.id as string }} className="il">
                Modifier
              </Link>
            ),
          },
        ]}
      />
    </Page>
  )
}

UsersIndex.layout = [AppLayout]
