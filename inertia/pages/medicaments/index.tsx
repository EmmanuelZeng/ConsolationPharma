import Page from '~/components/page'
import ResourceTable from '~/components/resource_table'
import AppLayout from '~/layouts/app'
import { Form, Link } from '@adonisjs/inertia/react'

function statusLabel(status: string) {
  if (status === 'RUPTURE') {
    return 'Rupture'
  }
  if (status === 'FAIBLE') {
    return 'Stock faible'
  }
  return 'Normal'
}

export default function MedicamentsIndex({
  medicaments,
  categories = [],
  filters = {},
}: {
  categories?: { id: string; nom: string }[]
  filters?: { search?: string; categorieId?: string; filter?: string }
  medicaments: {
    id: string
    nom: string
    categorie: string
    prixVente: number
    stock: number
    seuilAlerte: number
    status: string
  }[]
}) {
  return (
    <Page title="Médicaments">
      <div className="toolbar">
        <Link route="medicaments.create" className="btn btn--primary btn--sm">
          Nouveau médicament
        </Link>
      </div>

      <Form route="medicaments.index" method="get" className="filters panel">
        <div className="filters__grid">
          <div className="field">
            <label className="field__label" htmlFor="search">
              Recherche
            </label>
            <input
              id="search"
              name="search"
              type="search"
              placeholder="Nom du médicament"
              defaultValue={filters.search ?? ''}
              className="field__input"
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="categorie_id">
              Catégorie
            </label>
            <select
              id="categorie_id"
              name="categorie_id"
              defaultValue={filters.categorieId ?? ''}
              className="field__input"
            >
              <option value="">Toutes</option>
              {categories.map((categorie) => (
                <option key={categorie.id} value={categorie.id}>
                  {categorie.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="filter">
              Stock
            </label>
            <select
              id="filter"
              name="filter"
              defaultValue={filters.filter ?? ''}
              className="field__input"
            >
              <option value="">Tous</option>
              <option value="disponible">Disponible</option>
              <option value="faible">Stock faible</option>
              <option value="rupture">Rupture</option>
            </select>
          </div>
        </div>

        <div className="filters__actions">
          <button type="submit" className="btn btn--secondary btn--sm">
            Filtrer
          </button>
          <Link route="medicaments.index" className="btn btn--ghost btn--sm">
            Réinitialiser
          </Link>
        </div>
      </Form>

      <ResourceTable
        rows={medicaments}
        emptyLabel="Aucun médicament ne correspond aux filtres."
        columns={[
          {
            key: 'nom',
            label: 'Médicament',
            render: (row) => (
              <Link route="medicaments.show" routeParams={{ id: row.id as string }} className="il">
                {String(row.nom)}
              </Link>
            ),
          },
          { key: 'categorie', label: 'Catégorie' },
          {
            key: 'prixVente',
            label: 'Prix vente',
            render: (row) => `${Number(row.prixVente).toLocaleString('fr-FR')} FC`,
          },
          { key: 'stock', label: 'Stock' },
          { key: 'seuilAlerte', label: 'Seuil' },
          {
            key: 'status',
            label: 'Statut',
            render: (row) => (
              <span className={`badge badge--${String(row.status).toLowerCase()}`}>
                {statusLabel(String(row.status))}
              </span>
            ),
          },
        ]}
      />
    </Page>
  )
}

MedicamentsIndex.layout = [AppLayout]
