import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Form, Link } from '@adonisjs/inertia/react'

export default function CategoriesEdit({
  categorie,
}: {
  categorie: { id: string; nom: string; description: string | null }
}) {
  return (
    <Page title="Modifier la catégorie">
      <Form route="categories.update" routeParams={{ id: categorie.id }} method="put">
        {({ errors, processing }) => (
          <div className="auth__form">
            <div className="field">
              <label className="field__label" htmlFor="nom">
                Nom
              </label>
              <input
                id="nom"
                name="nom"
                defaultValue={categorie.nom}
                className="field__input"
              />
              {errors.nom && <span className="field__error">{errors.nom}</span>}
            </div>
            <div className="field">
              <label className="field__label" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={categorie.description ?? ''}
                className="field__input"
                rows={3}
              />
            </div>
            <button type="submit" className="btn btn--primary" disabled={processing}>
              Mettre à jour
            </button>
            <Link route="categories.index" className="il">
              Retour
            </Link>
          </div>
        )}
      </Form>
    </Page>
  )
}

CategoriesEdit.layout = [AppLayout]
