import Medicament from '#models/medicament'
import Vente from '#models/vente'
import VenteDetail from '#models/vente_detail'
import StockService from '#services/stock_service'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export type VenteLineInput = {
  medicamentId: string
  quantite: number
}

export type CreateVenteInput = {
  lignes: VenteLineInput[]
}

export default class VenteService {
  constructor(protected stockService: StockService) {}

  async create(userId: string, payload: CreateVenteInput) {
    return db.transaction(async (trx) => {
      let montantTotal = 0
      const numeroVente = `VTE-${DateTime.now().toFormat('yyyyMMddHHmmss')}`
      const detailRows: {
        lotId: string
        quantite: number
        prixUnitaire: number
        sousTotal: number
      }[] = []

      for (const ligne of payload.lignes) {
        const medicament = await Medicament.findOrFail(ligne.medicamentId, { client: trx })
        const stock = await this.stockService.getStockQuantity(medicament.id, trx)

        if (stock < ligne.quantite) {
          throw new Error(`Stock insuffisant pour ${medicament.nom}.`)
        }

        const allocations = await this.stockService.allocateLots(
          medicament.id,
          ligne.quantite,
          trx
        )

        for (const allocation of allocations) {
          const sousTotal = allocation.quantity * Number(medicament.prixVente)
          montantTotal += sousTotal

          detailRows.push({
            lotId: allocation.lot.id,
            quantite: allocation.quantity,
            prixUnitaire: Number(medicament.prixVente),
            sousTotal,
          })
        }

        await this.stockService.deductFromLots(allocations, trx)
      }

      const vente = await Vente.create(
        {
          userId,
          numeroVente,
          montantTotal,
        },
        { client: trx }
      )

      for (const row of detailRows) {
        await VenteDetail.create(
          {
            venteId: vente.id,
            ...row,
          },
          { client: trx }
        )
      }

      await vente.load('user')
      await vente.load('details', (query) => {
        query.preload('lot', (lotQuery) => lotQuery.preload('medicament'))
      })

      return vente
    })
  }
}
