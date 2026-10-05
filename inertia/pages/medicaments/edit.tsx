import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Form } from '@adonisjs/inertia/react'

export default function MedicamentsEdit({
  medicament,
  categories,
}: {
  medicament: {
    id: string
    nom: string
    description: string | null
    categorieId: string
    prixVente: number
    seuilAlerte: number
  }
  categories: { id: string; nom: string }[]
}) {
  return (
    <Page title="Modifier le médicament">
      <Form route="medicaments.update" routeParams={{ id: medicament.id }} method="put">
        {({ errors, processing }) => (
          <div className="auth__form">
            <div className="field">
              <label className="field__label" htmlFor="nom">
                Nom
              </label>
              <input
                id="nom"
                name="nom"
                defaultValue={medicament.nom}
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
                defaultValue={medicament.description ?? ''}
                className="field__input"
                rows={3}
              />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="categorieId">
                Catégorie
              </label>
              <select
                id="categorieId"
                name="categorieId"
                defaultValue={medicament.categorieId}
                className="field__input"
              >
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
              <input
                id="prixVente"
                name="prixVente"
                type="number"
                defaultValue={medicament.prixVente}
                className="field__input"
              />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="seuilAlerte">
                Seuil d alerte
              </label>
              <input
                id="seuilAlerte"
                name="seuilAlerte"
                type="number"
                defaultValue={medicament.seuilAlerte}
                className="field__input"
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

MedicamentsEdit.layout = [AppLayout]
