import Categorie from '#models/categorie'
import Medicament from '#models/medicament'
import VenteDetail from '#models/vente_detail'
import StockService from '#services/stock_service'
import { createMedicamentValidator, updateMedicamentValidator } from '#validators/medicament'
import type { HttpContext } from '@adonisjs/core/http'

export default class MedicamentsController {
  private stockService = new StockService()

  async index({ inertia, request }: HttpContext) {
    const search = request.input('search', '')
    const categorieId = request.input('categorie_id')
    const filter = request.input('filter')

    const query = Medicament.query().preload('categorie').orderBy('nom', 'asc')

    if (search) {
      query.where((builder) => {
        builder
          .whereILike('nom', `%${search}%`)
          .orWhereHas('categorie', (categorieQuery) => {
            categorieQuery.whereILike('nom', `%${search}%`)
          })
      })
    }

    if (categorieId) {
      query.where('categorie_id', categorieId)
    }

    const medicaments = await query
    const categories = await Categorie.query().orderBy('nom', 'asc')

    const rows = []
    for (const medicament of medicaments) {
      const { stock, status } = await this.stockService.getMedicamentStockStatus(medicament)

      if (filter === 'faible' && status !== 'FAIBLE') continue
      if (filter === 'rupture' && status !== 'RUPTURE') continue
      if (filter === 'disponible' && status === 'RUPTURE') continue

      rows.push({
        id: medicament.id,
        nom: medicament.nom,
        categorie: medicament.categorie.nom,
        prixVente: medicament.prixVente,
        stock,
        seuilAlerte: medicament.seuilAlerte,
        status,
      })
    }

    return inertia.render('medicaments/index', {
      medicaments: rows,
      categories: categories.map((c) => ({ id: c.id, nom: c.nom })),
      filters: { search, categorieId, filter },
    })
  }

  async create({ inertia }: HttpContext) {
    const categories = await Categorie.query().orderBy('nom', 'asc')
    return inertia.render('medicaments/create', {
      categories: categories.map((c) => ({ id: c.id, nom: c.nom })),
    })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createMedicamentValidator)
    await Medicament.create(payload)

    session.flash('success', 'Médicament enregistré.')
    return response.redirect().toRoute('medicaments.index')
  }

  async show({ inertia, params }: HttpContext) {
    const medicament = await Medicament.query()
      .where('id', params.id)
      .preload('categorie')
      .preload('lots', (lotQuery) => {
        lotQuery.preload('fournisseur').orderBy('date_expiration', 'asc')
      })
      .firstOrFail()

    const { stock, status } = await this.stockService.getMedicamentStockStatus(medicament)

    return inertia.render('medicaments/show', {
      medicament: {
        id: medicament.id,
        nom: medicament.nom,
        description: medicament.description,
        categorie: medicament.categorie.nom,
        prixVente: medicament.prixVente,
        seuilAlerte: medicament.seuilAlerte,
        stock,
        status,
        lots: medicament.lots.map((lot) => ({
          id: lot.id,
          numeroLot: lot.numeroLot,
          quantite: lot.quantite,
          prixAchat: lot.prixAchat,
          dateExpiration: lot.dateExpiration.toISODate(),
          dateReception: lot.dateReception.toISODate(),
          fournisseur: lot.fournisseur?.nom ?? null,
        })),
      },
    })
  }

  async edit({ inertia, params }: HttpContext) {
    const medicament = await Medicament.findOrFail(params.id)
    const categories = await Categorie.query().orderBy('nom', 'asc')

    return inertia.render('medicaments/edit', {
      medicament: {
        id: medicament.id,
        nom: medicament.nom,
        description: medicament.description,
        categorieId: medicament.categorieId,
        prixVente: medicament.prixVente,
        seuilAlerte: medicament.seuilAlerte,
      },
      categories: categories.map((c) => ({ id: c.id, nom: c.nom })),
    })
  }

  async update({ request, response, session, params }: HttpContext) {
    const medicament = await Medicament.findOrFail(params.id)
    const payload = await request.validateUsing(updateMedicamentValidator)

    medicament.merge(payload)
    await medicament.save()

    session.flash('success', 'Médicament mis à jour.')
    return response.redirect().toRoute('medicaments.show', { id: medicament.id })
  }

  async destroy({ response, session, params }: HttpContext) {
    const medicament = await Medicament.findOrFail(params.id)

    const sold = await VenteDetail.query()
      .join('lots', 'vente_details.lot_id', 'lots.id')
      .where('lots.medicament_id', medicament.id)
      .count('vente_details.id as total')

    if (Number(sold[0].$extras.total) > 0) {
      session.flash('error', 'Impossible de supprimer un médicament déjà vendu.')
      return response.redirect().back()
    }

    await medicament.delete()
    session.flash('success', 'Médicament supprimé.')
    return response.redirect().toRoute('medicaments.index')
  }
}
