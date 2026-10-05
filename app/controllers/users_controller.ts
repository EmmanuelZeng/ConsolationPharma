import { UserRole } from '#enums/user_role'
import User from '#models/user'
import Vente from '#models/vente'
import Achat from '#models/achat'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import type { InertiaPages } from '@adonisjs/inertia/types'

export default class UsersController {
  async index({ inertia }: HttpContext) {
    const users = await User.query().orderBy('created_at', 'desc')

    return inertia.render('users/index', {
      users: users.map((user) => ({
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISO(),
      })),
    })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('users/create', { roles: Object.values(UserRole) })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    await User.create(payload)

    session.flash('success', 'Utilisateur créé.')
    return response.redirect().toRoute('users.index')
  }

  async edit({ inertia, params }: HttpContext) {
    const user = await User.findOrFail(params.id)

    const pageProps: InertiaPages['users/edit'] = {
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      },
      roles: Object.values(UserRole),
    }

    return inertia.render('users/edit', pageProps)
  }

  async update({ request, response, session, params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const payload = await request.validateUsing(updateUserValidator)

    if (payload.email !== user.email) {
      const existing = await User.query()
        .where('email', payload.email)
        .whereNot('id', user.id)
        .first()
      if (existing) {
        session.flash('error', 'Cet email est déjà utilisé.')
        return response.redirect().back()
      }
    }

    user.merge(payload)
    await user.save()

    session.flash('success', 'Utilisateur mis à jour.')
    return response.redirect().toRoute('users.index')
  }

  async destroy({ response, session, params }: HttpContext) {
    const user = await User.findOrFail(params.id)

    const [ventes, achats] = await Promise.all([
      Vente.query().where('user_id', user.id).count('* as total'),
      Achat.query().where('user_id', user.id).count('* as total'),
    ])

    const hasHistory =
      Number(ventes[0].$extras.total) > 0 || Number(achats[0].$extras.total) > 0

    if (hasHistory) {
      session.flash('error', 'Impossible de supprimer un utilisateur avec un historique.')
      return response.redirect().back()
    }

    await user.delete()
    session.flash('success', 'Utilisateur supprimé.')
    return response.redirect().toRoute('users.index')
  }
}
