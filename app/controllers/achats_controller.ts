import Achat from '#models/achat'
import Fournisseur from '#models/fournisseur'
import Medicament from '#models/medicament'
import AchatService from '#services/achat_service'
import { createAchatValidator } from '#validators/achat'
import type { HttpContext } from '@adonisjs/core/http'

export default class AchatsController {
  private achatService = new AchatService()

  async index({ inertia }: HttpContext) {
    const achats = await Achat.query()
      .preload('fournisseur')
      .preload('user')
      .orderBy('created_at', 'desc')

    return inertia.render('achats/index', {
      achats: achats.map((achat) => ({
        id: achat.id,
        numeroAchat: achat.numeroAchat,
        fournisseur: achat.fournisseur.nom,
        dateAchat: achat.dateAchat.toISODate(),
        montantTotal: achat.montantTotal,
        utilisateur: achat.user.fullName,
      })),
    })
  }

  async create({ inertia }: HttpContext) {
    const [fournisseurs, medicaments] = await Promise.all([
      Fournisseur.query().orderBy('nom', 'asc'),
      Medicament.query().orderBy('nom', 'asc'),
    ])

    return inertia.render('achats/create', {
      fournisseurs: fournisseurs.map((f) => ({ id: f.id, nom: f.nom })),
      medicaments: medicaments.map((m) => ({ id: m.id, nom: m.nom })),
    })
  }

  async store({ auth, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createAchatValidator)

    try {
      await this.achatService.create(auth.getUserOrFail().id, {
        fournisseurId: payload.fournisseurId,
        dateAchat: payload.dateAchat,
        lignes: payload.lignes.map((ligne) => ({
          medicamentId: ligne.medicamentId,
          numeroLot: ligne.numeroLot,
          quantite: ligne.quantite,
          prixUnitaire: ligne.prixUnitaire,
          dateExpiration: ligne.dateExpiration,
        })),
      })
    } catch (error) {
      session.flash('error', error instanceof Error ? error.message : 'Erreur lors de l\'achat.')
      return response.redirect().back()
    }

    session.flash('success', 'Achat enregistré et stock mis à jour.')
    return response.redirect().toRoute('achats.index')
  }

  async show({ inertia, params }: HttpContext) {
    const achat = await Achat.query()
      .where('id', params.id)
      .preload('fournisseur')
      .preload('user')
      .preload('details', (query) => {
        query.preload('lot', (lotQuery) => lotQuery.preload('medicament'))
      })
      .firstOrFail()

    return inertia.render('achats/show', {
      achat: {
        id: achat.id,
        numeroAchat: achat.numeroAchat,
        fournisseur: achat.fournisseur.nom,
        dateAchat: achat.dateAchat.toISODate(),
        montantTotal: achat.montantTotal,
        utilisateur: achat.user.fullName,
        lignes: achat.details.map((detail) => ({
          medicament: detail.lot.medicament.nom,
          numeroLot: detail.lot.numeroLot,
          quantite: detail.quantite,
          prixUnitaire: detail.prixUnitaire,
          sousTotal: detail.sousTotal,
        })),
      },
    })
  }
}
