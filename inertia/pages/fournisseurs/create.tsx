import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Form, Link } from '@adonisjs/inertia/react'

export default function FournisseursCreate() {
  return (
    <Page title="Nouveau fournisseur">
      <Form route="fournisseurs.store">
        {({ processing }) => (
          <div className="auth__form">
            <div className="field">
              <label className="field__label" htmlFor="nom">
                Nom
              </label>
              <input id="nom" name="nom" className="field__input" />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="telephone">
                Téléphone
              </label>
              <input id="telephone" name="telephone" className="field__input" />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="email">
                Email
              </label>
              <input id="email" name="email" type="email" className="field__input" />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="adresse">
                Adresse
              </label>
              <textarea id="adresse" name="adresse" className="field__input" rows={3} />
            </div>
            <button type="submit" className="btn btn--primary" disabled={processing}>
              Enregistrer
            </button>
            <Link route="fournisseurs.index" className="il">
              Annuler
            </Link>
          </div>
        )}
      </Form>
    </Page>
  )
}

FournisseursCreate.layout = [AppLayout]
