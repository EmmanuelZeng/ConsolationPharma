import Page from '~/components/page'
import VenteLignesForm from '~/components/vente_lignes_form'
import AppLayout from '~/layouts/app'
import { Form, Link } from '@adonisjs/inertia/react'

export default function VentesCreate({
  medicaments,
}: {
  medicaments: { id: string; nom: string; prixVente: number; stock: number }[]
}) {
  return (
    <Page title="Nouvelle vente">
      <Form route="ventes.store">
        {({ processing }) => (
          <div className="auth__form">
            <VenteLignesForm medicaments={medicaments} />

            <div className="form-actions">
              <button type="submit" className="btn btn--primary" disabled={processing}>
                Valider la vente
              </button>
              <Link route="ventes.index" className="il">
                Annuler
              </Link>
            </div>
          </div>
        )}
      </Form>
    </Page>
  )
}

VentesCreate.layout = [AppLayout]
