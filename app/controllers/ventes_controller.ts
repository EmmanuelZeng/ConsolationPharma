import Medicament from '#models/medicament'
import Vente from '#models/vente'
import StockService from '#services/stock_service'
import VenteService from '#services/vente_service'
import { createVenteValidator } from '#validators/vente'
import type { HttpContext } from '@adonisjs/core/http'

export default class VentesController {
  private venteService = new VenteService(new StockService())

  async index({ inertia, request }: HttpContext) {
    const numero = request.input('numero')
    const userId = request.input('user_id')
    const date = request.input('date')

    const query = Vente.query().preload('user').orderBy('created_at', 'desc')

    if (numero) {
      query.whereILike('numero_vente', `%${numero}%`)
    }
    if (userId) {
      query.where('user_id', userId)
    }
    if (date) {
      query.whereRaw('date(created_at) = ?', [date])
    }

    const ventes = await query

    return inertia.render('ventes/index', {
      ventes: ventes.map((vente) => ({
        id: vente.id,
        numeroVente: vente.numeroVente,
        date: vente.createdAt.toISO(),
        utilisateur: vente.user.fullName,
        montantTotal: vente.montantTotal,
      })),
      filters: { numero, userId, date },
    })
  }

  async create({ inertia }: HttpContext) {
    const medicaments = await Medicament.query().orderBy('nom', 'asc')
    const stockService = new StockService()

    const rows = await Promise.all(
      medicaments.map(async (medicament) => ({
        id: medicament.id,
        nom: medicament.nom,
        prixVente: medicament.prixVente,
        stock: await stockService.getStockQuantity(medicament.id),
      }))
    )

    return inertia.render('ventes/create', { medicaments: rows })
  }

  async store({ auth, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createVenteValidator)

    try {
      await this.venteService.create(auth.getUserOrFail().id, {
        lignes: payload.lignes,
      })
    } catch (error) {
      session.flash('error', error instanceof Error ? error.message : 'Erreur lors de la vente.')
      return response.redirect().back()
    }

    session.flash('success', 'Vente enregistrée.')
    return response.redirect().toRoute('ventes.index')
  }

  async show({ inertia, params }: HttpContext) {
    const vente = await Vente.query()
      .where('id', params.id)
      .preload('user')
      .preload('details', (query) => {
        query.preload('lot', (lotQuery) => lotQuery.preload('medicament'))
      })
      .firstOrFail()

    return inertia.render('ventes/show', {
      vente: {
        id: vente.id,
        numeroVente: vente.numeroVente,
        date: vente.createdAt.toISO(),
        utilisateur: vente.user.fullName,
        montantTotal: vente.montantTotal,
        lignes: vente.details.map((detail) => ({
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
