import Page from '~/components/page'
import PasswordInput from '~/components/password_input'
import AppLayout from '~/layouts/app'
import { Form } from '@adonisjs/inertia/react'

export default function ProfileShow({
  profile,
}: {
  profile: { nom: string; prenom: string; email: string; role: string }
}) {
  return (
    <Page title="Mon profil">
      <section className="panel">
        <h2>Informations</h2>
        <Form route="profile.update" method="put">
          {({ errors, processing }) => (
            <div className="auth__form">
              <div className="field">
                <label className="field__label" htmlFor="nom">
                  Nom
                </label>
                <input id="nom" name="nom" defaultValue={profile.nom} className="field__input" />
                {errors.nom && <span className="field__error">{errors.nom}</span>}
              </div>
              <div className="field">
                <label className="field__label" htmlFor="prenom">
                  Prénom
                </label>
                <input
                  id="prenom"
                  name="prenom"
                  defaultValue={profile.prenom}
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
                  defaultValue={profile.email}
                  className="field__input"
                />
              </div>
              <p>Rôle : {profile.role}</p>
              <button type="submit" className="btn btn--primary" disabled={processing}>
                Mettre à jour le profil
              </button>
            </div>
          )}
        </Form>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2>Mot de passe</h2>
        <Form route="profile.password" method="put">
          {({ errors, processing }) => (
            <div className="auth__form">
              <div className="field">
                <label className="field__label" htmlFor="currentPassword">
                  Mot de passe actuel
                </label>
                <PasswordInput
                  id="currentPassword"
                  name="currentPassword"
                  showLeadingIcon={false}
                />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="password">
                  Nouveau mot de passe
                </label>
                <PasswordInput
                  id="password"
                  name="password"
                  showLeadingIcon={false}
                  invalid={Boolean(errors.password)}
                />
                {errors.password && <span className="field__error">{errors.password}</span>}
              </div>
              <div className="field">
                <label className="field__label" htmlFor="passwordConfirmation">
                  Confirmation
                </label>
                <PasswordInput
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  showLeadingIcon={false}
                />
              </div>
              <button type="submit" className="btn btn--secondary" disabled={processing}>
                Changer le mot de passe
              </button>
            </div>
          )}
        </Form>
      </section>
    </Page>
  )
}

ProfileShow.layout = [AppLayout]
