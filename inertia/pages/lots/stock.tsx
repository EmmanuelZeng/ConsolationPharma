import Page from '~/components/page'
import ResourceTable from '~/components/resource_table'
import AppLayout from '~/layouts/app'

export default function LotsStock({
  medicaments,
}: {
  medicaments: {
    id: string
    nom: string
    categorie: string
    stock: number
    seuilAlerte: number
    status: string
  }[]
}) {
  return (
    <Page title="Stock">
      <ResourceTable
        rows={medicaments}
        columns={[
          { key: 'nom', label: 'Médicament' },
          { key: 'categorie', label: 'Catégorie' },
          { key: 'stock', label: 'Stock' },
          { key: 'seuilAlerte', label: 'Seuil' },
          { key: 'status', label: 'Statut' },
        ]}
      />
    </Page>
  )
}

LotsStock.layout = [AppLayout]
