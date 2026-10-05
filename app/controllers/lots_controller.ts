import Lot from '#models/lot'
import Medicament from '#models/medicament'
import StockService from '#services/stock_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class LotsController {
  private stockService = new StockService()

  async index({ inertia }: HttpContext) {
    const lots = await Lot.query()
      .preload('medicament')
      .preload('fournisseur')
      .orderBy('date_expiration', 'asc')

    const today = this.stockService.todayIsoDate()

    return inertia.render('lots/index', {
      lots: lots.map((lot) => ({
        id: lot.id,
        numeroLot: lot.numeroLot,
        medicament: lot.medicament.nom,
        fournisseur: lot.fournisseur?.nom ?? null,
        quantite: lot.quantite,
        prixAchat: lot.prixAchat,
        dateExpiration: lot.dateExpiration.toISODate(),
        dateReception: lot.dateReception.toISODate(),
        expired: lot.dateExpiration.toISODate()! < today,
      })),
    })
  }

  async stock({ inertia }: HttpContext) {
    const items = await Medicament.query().preload('categorie').orderBy('nom', 'asc')

    const medicaments = await Promise.all(
      items.map(async (medicament) => {
        const { stock, status } = await this.stockService.getMedicamentStockStatus(medicament)
        return {
          id: medicament.id,
          nom: medicament.nom,
          categorie: medicament.categorie.nom,
          stock,
          seuilAlerte: medicament.seuilAlerte,
          status,
        }
      })
    )

    return inertia.render('lots/stock', { medicaments })
  }
}
