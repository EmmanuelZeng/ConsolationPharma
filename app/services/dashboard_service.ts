import Achat from '#models/achat'
import Fournisseur from '#models/fournisseur'
import Medicament from '#models/medicament'
import Vente from '#models/vente'
import StockService from '#services/stock_service'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class DashboardService {
  constructor(protected stockService: StockService) {}

  async getSummary() {
    const [
      medicamentsCount,
      fournisseursCount,
      ventesCount,
      achatsCount,
      stockValue,
      lowStock,
      outOfStock,
      expiringLots,
      ventesJour,
      ventesSemaine,
      ventesMois,
      topMedicaments,
    ] = await Promise.all([
      Medicament.query().count('* as total'),
      Fournisseur.query().count('* as total'),
      Vente.query().count('* as total'),
      Achat.query().count('* as total'),
      this.stockService.getStockValue(),
      this.stockService.getLowStockMedicaments(),
      this.stockService.getOutOfStockMedicaments(),
      this.stockService.getLotsExpiringWithinDays(30),
      this.sumVentesSince(DateTime.now().startOf('day')),
      this.sumVentesSince(DateTime.now().startOf('week')),
      this.sumVentesSince(DateTime.now().startOf('month')),
      this.getTopMedicaments(),
    ])

    return {
      counts: {
        medicaments: Number(medicamentsCount[0].$extras.total),
        fournisseurs: Number(fournisseursCount[0].$extras.total),
        ventes: Number(ventesCount[0].$extras.total),
        achats: Number(achatsCount[0].$extras.total),
      },
      stockValue,
      alerts: {
        lowStock,
        outOfStock,
        expiringLots,
      },
      ventes: {
        jour: ventesJour,
        semaine: ventesSemaine,
        mois: ventesMois,
      },
      topMedicaments,
    }
  }

  private async sumVentesSince(since: DateTime) {
    const row = await Vente.query()
      .where('created_at', '>=', since.toSQL()!)
      .sum('montant_total as total')
      .first()

    return Number(row?.$extras.total ?? 0)
  }

  private async getTopMedicaments(limit = 5) {
    const rows = await db
      .from('vente_details')
      .join('lots', 'vente_details.lot_id', 'lots.id')
      .join('medicaments', 'lots.medicament_id', 'medicaments.id')
      .groupBy('medicaments.id', 'medicaments.nom')
      .select('medicaments.nom as nom')
      .sum('vente_details.quantite as total')
      .orderBy('total', 'desc')
      .limit(limit)

    return rows.map((row) => ({
      nom: row.nom,
      quantite: Number(row.total),
    }))
  }
}
