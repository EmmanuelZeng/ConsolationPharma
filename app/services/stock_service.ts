import Lot from '#models/lot'
import Medicament from '#models/medicament'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { DateTime } from 'luxon'

export type StockStatus = 'NORMAL' | 'FAIBLE' | 'RUPTURE'

export type LotAllocation = {
  lot: Lot
  quantity: number
}

export default class StockService {
  todayIsoDate() {
    return DateTime.now().toISODate()!
  }

  availableLotsQuery(medicamentId: string, trx?: TransactionClientContract) {
    return Lot.query({ client: trx })
      .where('medicament_id', medicamentId)
      .where('quantite', '>', 0)
      .where('date_expiration', '>=', this.todayIsoDate())
      .orderBy('date_expiration', 'asc')
  }

  async getStockQuantity(medicamentId: string, trx?: TransactionClientContract) {
    const row = await this.availableLotsQuery(medicamentId, trx).sum('quantite as total').first()
    return Number(row?.$extras.total ?? 0)
  }

  resolveStatus(stock: number, seuilAlerte: number): StockStatus {
    if (stock <= 0) {
      return 'RUPTURE'
    }
    if (stock <= seuilAlerte) {
      return 'FAIBLE'
    }
    return 'NORMAL'
  }

  async getMedicamentStockStatus(medicament: Medicament, trx?: TransactionClientContract) {
    const stock = await this.getStockQuantity(medicament.id, trx)
    return {
      stock,
      status: this.resolveStatus(stock, medicament.seuilAlerte),
    }
  }

  async allocateLots(
    medicamentId: string,
    quantity: number,
    trx?: TransactionClientContract
  ): Promise<LotAllocation[]> {
    const lots = await this.availableLotsQuery(medicamentId, trx)
    let remaining = quantity
    const allocations: LotAllocation[] = []

    for (const lot of lots) {
      if (remaining <= 0) {
        break
      }

      const take = Math.min(lot.quantite, remaining)
      allocations.push({ lot, quantity: take })
      remaining -= take
    }

    if (remaining > 0) {
      throw new Error('Stock insuffisant pour ce médicament.')
    }

    return allocations
  }

  async deductFromLots(allocations: LotAllocation[], trx?: TransactionClientContract) {
    for (const { lot, quantity } of allocations) {
      lot.quantite -= quantity
      lot.useTransaction(trx!)
      await lot.save()
    }
  }

  async getStockValue(trx?: TransactionClientContract) {
    const row = await Lot.query({ client: trx })
      .where('quantite', '>', 0)
      .where('date_expiration', '>=', this.todayIsoDate())
      .select('*')
      .then(async (lots) => {
        return lots.reduce((sum, lot) => sum + lot.quantite * Number(lot.prixAchat), 0)
      })

    return row
  }

  async getLowStockMedicaments() {
    const medicaments = await Medicament.query().preload('categorie')
    const results = []

    for (const medicament of medicaments) {
      const { stock, status } = await this.getMedicamentStockStatus(medicament)
      if (status === 'FAIBLE') {
        results.push({ medicament, stock, status })
      }
    }

    return results
  }

  async getOutOfStockMedicaments() {
    const medicaments = await Medicament.query().preload('categorie')
    const results = []

    for (const medicament of medicaments) {
      const { stock, status } = await this.getMedicamentStockStatus(medicament)
      if (status === 'RUPTURE') {
        results.push({ medicament, stock, status })
      }
    }

    return results
  }

  async getLotsExpiringWithinDays(days = 30) {
    const limit = DateTime.now().plus({ days }).toISODate()!

    return Lot.query()
      .where('quantite', '>', 0)
      .where('date_expiration', '>=', this.todayIsoDate())
      .where('date_expiration', '<=', limit)
      .preload('medicament')
      .preload('fournisseur')
      .orderBy('date_expiration', 'asc')
  }
}
