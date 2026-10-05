import DashboardService from '#services/dashboard_service'
import StockService from '#services/stock_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  private dashboardService = new DashboardService(new StockService())

  async index({ inertia }: HttpContext) {
    const summary = await this.dashboardService.getSummary()

    return inertia.render('dashboard', {
      summary: {
        counts: summary.counts,
        stockValue: summary.stockValue,
        ventes: summary.ventes,
        topMedicaments: summary.topMedicaments,
        alerts: {
          lowStock: summary.alerts.lowStock.map(({ medicament, stock, status }) => ({
            id: medicament.id,
            nom: medicament.nom,
            stock,
            status,
          })),
          outOfStock: summary.alerts.outOfStock.map(({ medicament, stock, status }) => ({
            id: medicament.id,
            nom: medicament.nom,
            stock,
            status,
          })),
          expiringLots: summary.alerts.expiringLots.map((lot) => ({
            id: lot.id,
            numeroLot: lot.numeroLot,
            medicament: lot.medicament.nom,
            dateExpiration: lot.dateExpiration.toISODate(),
            quantite: lot.quantite,
          })),
        },
      },
    })
  }
}
