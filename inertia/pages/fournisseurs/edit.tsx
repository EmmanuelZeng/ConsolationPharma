import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Form } from '@adonisjs/inertia/react'

export default function FournisseursEdit({
  fournisseur,
}: {
  fournisseur: {
    id: string
    nom: string
    telephone: string | null
    email: string | null
    adresse: string | null
  }
}) {
  return (
    <Page title="Modifier le fournisseur">
      <Form route="fournisseurs.update" routeParams={{ id: fournisseur.id }} method="put">
        {({ processing }) => (
          <div className="auth__form">
            <div className="field">
              <label className="field__label" htmlFor="nom">
                Nom
              </label>
              <input id="nom" name="nom" defaultValue={fournisseur.nom} className="field__input" />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="telephone">
                Téléphone
              </label>
              <input
                id="telephone"
                name="telephone"
                defaultValue={fournisseur.telephone ?? ''}
                className="field__input"
              />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={fournisseur.email ?? ''}
                className="field__input"
              />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="adresse">
                Adresse
              </label>
              <textarea
                id="adresse"
                name="adresse"
                defaultValue={fournisseur.adresse ?? ''}
                className="field__input"
                rows={3}
              />
            </div>
            <button type="submit" className="btn btn--primary" disabled={processing}>
              Mettre à jour
            </button>
          </div>
        )}
      </Form>
    </Page>
  )
}

FournisseursEdit.layout = [AppLayout]
