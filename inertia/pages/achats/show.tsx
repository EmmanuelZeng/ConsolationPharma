import Page from '~/components/page'
import ResourceTable from '~/components/resource_table'
import AppLayout from '~/layouts/app'

export default function AchatsShow({
  achat,
}: {
  achat: {
    id?: string
    numeroAchat: string
    fournisseur: string
    dateAchat: string | null
    montantTotal: number
    utilisateur: string
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
    <Page title={achat.numeroAchat}>
      <div className="panel">
        <p>Fournisseur : {achat.fournisseur}</p>
        <p>Date : {achat.dateAchat}</p>
        <p>Utilisateur : {achat.utilisateur}</p>
        <p>Total : {achat.montantTotal} FC</p>
      </div>
      <ResourceTable
        rows={achat.lignes}
        columns={[
          { key: 'medicament', label: 'Médicament' },
          { key: 'numeroLot', label: 'Lot' },
          { key: 'quantite', label: 'Quantité' },
          { key: 'prixUnitaire', label: 'Prix achat' },
          { key: 'sousTotal', label: 'Sous-total' },
        ]}
      />
    </Page>
  )
}

AchatsShow.layout = [AppLayout]
