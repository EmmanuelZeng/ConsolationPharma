import PasswordInput from '~/components/password_input'
import AuthLayout from '~/layouts/auth'
import { Form } from '@adonisjs/inertia/react'
import { Mail } from 'lucide-react'

export default function Login() {
  return (
    <>
      <p className="login-card__eyebrow">Espace sécurisé</p>
      <h2 className="login-card__title">Connexion</h2>
      <p className="login-card__subtitle">
        Saisissez vos identifiants pour ouvrir le tableau de bord.
      </p>

      <Form route="session.store">
        {({ errors, processing }) => (
          <div className="login-card__form">
            <div className="field">
              <label className="field__label" htmlFor="email">
                Adresse email
              </label>
              <div className="field-with-icon">
                <Mail size={16} className="field-with-icon__icon" aria-hidden />
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="field__input field-with-icon__input"
                  autoComplete="username"
                  placeholder="admin@consolation.pharma"
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
              </div>
              {errors.email && <span className="field__error">{errors.email}</span>}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="password">
                Mot de passe
              </label>
              <PasswordInput
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="Votre mot de passe"
                invalid={Boolean(errors.password)}
              />
              {errors.password && <span className="field__error">{errors.password}</span>}
            </div>

            <button type="submit" className="btn btn--primary btn--block login-card__submit" disabled={processing}>
              {processing ? 'Connexion en cours…' : 'Se connecter'}
            </button>
          </div>
        )}
      </Form>

      <p className="login-card__hint">
        Compte démo : <code>admin@consolation.pharma</code>
      </p>
    </>
  )
}

Login.layout = [AuthLayout]
