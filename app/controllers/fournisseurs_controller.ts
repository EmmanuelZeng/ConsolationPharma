import Achat from '#models/achat'
import Fournisseur from '#models/fournisseur'
import { createFournisseurValidator, updateFournisseurValidator } from '#validators/fournisseur'
import type { HttpContext } from '@adonisjs/core/http'

export default class FournisseursController {
  async index({ inertia }: HttpContext) {
    const fournisseurs = await Fournisseur.query().orderBy('nom', 'asc')

    return inertia.render('fournisseurs/index', {
      fournisseurs: fournisseurs.map((f) => ({
        id: f.id,
        nom: f.nom,
        telephone: f.telephone,
        email: f.email,
        adresse: f.adresse,
      })),
    })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('fournisseurs/create', {})
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createFournisseurValidator)
    await Fournisseur.create(payload)

    session.flash('success', 'Fournisseur enregistré.')
    return response.redirect().toRoute('fournisseurs.index')
  }

  async show({ inertia, params }: HttpContext) {
    const fournisseur = await Fournisseur.findOrFail(params.id)
    const achats = await Achat.query()
      .where('fournisseur_id', fournisseur.id)
      .preload('user')
      .preload('details', (query) => {
        query.preload('lot', (lotQuery) => lotQuery.preload('medicament'))
      })
      .orderBy('date_achat', 'desc')

    return inertia.render('fournisseurs/show', {
      fournisseur: {
        id: fournisseur.id,
        nom: fournisseur.nom,
        telephone: fournisseur.telephone,
        email: fournisseur.email,
        adresse: fournisseur.adresse,
      },
      achats: achats.map((achat) => ({
        id: achat.id,
        numeroAchat: achat.numeroAchat,
        dateAchat: achat.dateAchat.toISODate(),
        montantTotal: achat.montantTotal,
        utilisateur: achat.user.fullName,
        lignes: achat.details.map((detail) => ({
          medicament: detail.lot.medicament.nom,
          quantite: detail.quantite,
          sousTotal: detail.sousTotal,
        })),
      })),
    })
  }

  async edit({ inertia, params }: HttpContext) {
    const fournisseur = await Fournisseur.findOrFail(params.id)

    return inertia.render('fournisseurs/edit', {
      fournisseur: {
        id: fournisseur.id,
        nom: fournisseur.nom,
        telephone: fournisseur.telephone,
        email: fournisseur.email,
        adresse: fournisseur.adresse,
      },
    })
  }

  async update({ request, response, session, params }: HttpContext) {
    const fournisseur = await Fournisseur.findOrFail(params.id)
    const payload = await request.validateUsing(updateFournisseurValidator)

    fournisseur.merge(payload)
    await fournisseur.save()

    session.flash('success', 'Fournisseur mis à jour.')
    return response.redirect().toRoute('fournisseurs.show', { id: fournisseur.id })
  }

  async destroy({ response, session, params }: HttpContext) {
    const fournisseur = await Fournisseur.findOrFail(params.id)
    const achats = await Achat.query().where('fournisseur_id', fournisseur.id).count('* as total')

    if (Number(achats[0].$extras.total) > 0) {
      session.flash('error', 'Impossible de supprimer un fournisseur avec des achats.')
      return response.redirect().back()
    }

    await fournisseur.delete()
    session.flash('success', 'Fournisseur supprimé.')
    return response.redirect().toRoute('fournisseurs.index')
  }
}
