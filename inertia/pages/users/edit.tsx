import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Form, Link } from '@adonisjs/inertia/react'

export default function UsersEdit({
  user,
  roles,
}: {
  user: { id: string; nom: string; prenom: string; email: string; role: string }
  roles: string[]
}) {
  return (
    <Page title="Modifier l utilisateur">
      <Form route="users.update" routeParams={{ id: user.id }} method="put">
        {({ errors, processing }) => (
          <div className="auth__form">
            <div className="field">
              <label className="field__label" htmlFor="nom">
                Nom
              </label>
              <input id="nom" name="nom" defaultValue={user.nom} className="field__input" />
              {errors.nom && <span className="field__error">{errors.nom}</span>}
            </div>
            <div className="field">
              <label className="field__label" htmlFor="prenom">
                Prénom
              </label>
              <input id="prenom" name="prenom" defaultValue={user.prenom} className="field__input" />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={user.email}
                className="field__input"
              />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="role">
                Rôle
              </label>
              <select id="role" name="role" defaultValue={user.role} className="field__input">
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn--primary" disabled={processing}>
              Mettre à jour
            </button>
            <Link route="users.index" className="il">
              Retour
            </Link>
          </div>
        )}
      </Form>
    </Page>
  )
}

UsersEdit.layout = [AppLayout]
