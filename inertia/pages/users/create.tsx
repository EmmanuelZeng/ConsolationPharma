import Page from '~/components/page'
import PasswordInput from '~/components/password_input'
import AppLayout from '~/layouts/app'
import { Form, Link } from '@adonisjs/inertia/react'

export default function UsersCreate({ roles }: { roles: string[] }) {
  return (
    <Page title="Nouvel utilisateur">
      <Form route="users.store">
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
              <label className="field__label" htmlFor="prenom">
                Prénom
              </label>
              <input id="prenom" name="prenom" className="field__input" />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="email">
                Email
              </label>
              <input id="email" name="email" type="email" className="field__input" />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="password">
                Mot de passe
              </label>
              <PasswordInput id="password" name="password" showLeadingIcon={false} />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="role">
                Rôle
              </label>
              <select id="role" name="role" className="field__input">
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn--primary" disabled={processing}>
              Créer
            </button>
            <Link route="users.index" className="il">
              Annuler
            </Link>
          </div>
        )}
      </Form>
    </Page>
  )
}

UsersCreate.layout = [AppLayout]
