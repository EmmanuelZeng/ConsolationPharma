import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Form, Link } from '@adonisjs/inertia/react'

export default function MedicamentsCreate({
  categories,
}: {
  categories: { id: string; nom: string }[]
}) {
  return (
    <Page title="Nouveau médicament">
      <Form route="medicaments.store">
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
            <div className="field">
              <label className="field__label" htmlFor="categorieId">
                Catégorie
              </label>
              <select id="categorieId" name="categorieId" className="field__input">
                {categories.map((categorie) => (
                  <option key={categorie.id} value={categorie.id}>
                    {categorie.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="prixVente">
                Prix de vente
              </label>
              <input id="prixVente" name="prixVente" type="number" className="field__input" />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="seuilAlerte">
                Seuil d alerte
              </label>
              <input id="seuilAlerte" name="seuilAlerte" type="number" className="field__input" />
            </div>
            <button type="submit" className="btn btn--primary" disabled={processing}>
              Enregistrer
            </button>
            <Link route="medicaments.index" className="il">
              Annuler
            </Link>
          </div>
        )}
      </Form>
    </Page>
  )
}

MedicamentsCreate.layout = [AppLayout]
