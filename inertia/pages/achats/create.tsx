import AchatLignesForm from '~/components/achat_lignes_form'
import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Form, Link } from '@adonisjs/inertia/react'

export default function AchatsCreate({
  fournisseurs,
  medicaments,
}: {
  fournisseurs: { id: string; nom: string }[]
  medicaments: { id: string; nom: string }[]
}) {
  const today = new Date().toISOString().slice(0, 10)

  return (
    <Page title="Nouvel achat">
      <Form route="achats.store">
        {({ processing }) => (
          <div className="auth__form">
            <div className="field">
              <label className="field__label" htmlFor="fournisseurId">
                Fournisseur
              </label>
              <select id="fournisseurId" name="fournisseurId" className="field__input" required>
                {fournisseurs.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="dateAchat">
                Date d achat
              </label>
              <input
                id="dateAchat"
                name="dateAchat"
                type="date"
                defaultValue={today}
                className="field__input"
                required
              />
            </div>

            <AchatLignesForm medicaments={medicaments} />

            <div className="form-actions">
              <button type="submit" className="btn btn--primary" disabled={processing}>
                Valider l achat
              </button>
              <Link route="achats.index" className="il">
                Annuler
              </Link>
            </div>
          </div>
        )}
      </Form>
    </Page>
  )
}

AchatsCreate.layout = [AppLayout]
