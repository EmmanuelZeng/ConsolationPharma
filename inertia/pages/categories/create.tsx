import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Form, Link } from '@adonisjs/inertia/react'

export default function CategoriesCreate() {
  return (
    <Page title="Nouvelle catégorie">
      <Form route="categories.store">
        {({ errors, processing }) => (
          <div className="auth__form">
            <div className="field">
              <label className="field__label" htmlFor="nom">
                Nom
              </label>
              <input id="nom" name="nom" className="field__input" />
              {errors.nom && <span className="field__error">{errors.nom}</span>}
            </div>
            <div className="field">
              <label className="field__label" htmlFor="description">
                Description
              </label>
              <textarea id="description" name="description" className="field__input" rows={3} />
            </div>
            <button type="submit" className="btn btn--primary" disabled={processing}>
              Enregistrer
            </button>
            <Link route="categories.index" className="il">
              Annuler
            </Link>
          </div>
        )}
      </Form>
    </Page>
  )
}

CategoriesCreate.layout = [AppLayout]
