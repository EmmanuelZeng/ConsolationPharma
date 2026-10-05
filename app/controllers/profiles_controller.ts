import User from '#models/user'
import {
  updatePasswordValidator,
  updateProfileValidator,
} from '#validators/user'
import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  async show({ auth, inertia }: HttpContext) {
    const user = auth.getUserOrFail()

    return inertia.render('profile/show', {
      profile: {
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      },
    })
  }

  async update({ auth, request, response, session }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(updateProfileValidator)

    if (payload.email !== user.email) {
      const existing = await User.query().where('email', payload.email).whereNot('id', user.id).first()
      if (existing) {
        session.flash('error', 'Cet email est déjà utilisé.')
        return response.redirect().back()
      }
    }

    user.merge(payload)
    await user.save()

    session.flash('success', 'Profil mis à jour.')
    return response.redirect().back()
  }

  async updatePassword({ auth, request, response, session }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(updatePasswordValidator)

    const valid = await hash.verify(user.password, payload.currentPassword)
    if (!valid) {
      session.flash('error', 'Mot de passe actuel incorrect.')
      return response.redirect().back()
    }

    user.password = payload.password
    await user.save()

    session.flash('success', 'Mot de passe modifié.')
    return response.redirect().back()
  }
}
