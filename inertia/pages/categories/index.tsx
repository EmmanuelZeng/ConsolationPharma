import Page from '~/components/page'
import ResourceTable from '~/components/resource_table'
import AppLayout from '~/layouts/app'
import { Link } from '@adonisjs/inertia/react'

export default function CategoriesIndex({
  categories,
}: {
  categories: { id: string; nom: string; description: string | null }[]
}) {
  return (
    <Page title="Catégories">
      <p>
        <Link route="categories.create" className="btn btn--primary btn--sm">
          Nouvelle catégorie
        </Link>
      </p>
      <ResourceTable
        rows={categories}
        columns={[
          { key: 'nom', label: 'Nom' },
          { key: 'description', label: 'Description' },
          {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
              <Link route="categories.edit" routeParams={{ id: row.id as string }} className="il">
                Modifier
              </Link>
            ),
          },
        ]}
      />
    </Page>
  )
}

CategoriesIndex.layout = [AppLayout]
