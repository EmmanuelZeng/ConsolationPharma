import Page from '~/components/page'
import ResourceTable from '~/components/resource_table'
import AppLayout from '~/layouts/app'

export default function VentesShow({
  vente,
}: {
  vente: {
    id?: string
    numeroVente: string
    date: string | null
    utilisateur: string
    montantTotal: number
    lignes: {
      medicament: string
      numeroLot: string
      quantite: number
      prixUnitaire: number
      sousTotal: number
    }[]
  }
}) {
  return (
    <Page title={vente.numeroVente}>
      <div className="panel">
        <p>Date : {vente.date}</p>
        <p>Utilisateur : {vente.utilisateur}</p>
        <p>Total : {vente.montantTotal} FC</p>
      </div>
      <ResourceTable
        rows={vente.lignes}
        columns={[
          { key: 'medicament', label: 'Médicament' },
          { key: 'numeroLot', label: 'Lot' },
          { key: 'quantite', label: 'Quantité' },
          { key: 'prixUnitaire', label: 'Prix unitaire' },
          { key: 'sousTotal', label: 'Sous-total' },
        ]}
      />
    </Page>
  )
}

VentesShow.layout = [AppLayout]
