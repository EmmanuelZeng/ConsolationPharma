import Achat from '#models/achat'
import AchatDetail from '#models/achat_detail'
import Lot from '#models/lot'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export type AchatLineInput = {
  medicamentId: string
  numeroLot: string
  quantite: number
  prixUnitaire: number
  dateExpiration: string
}

export type CreateAchatInput = {
  fournisseurId: string
  dateAchat: string
  lignes: AchatLineInput[]
}

export default class AchatService {
  async create(userId: string, payload: CreateAchatInput) {
    return db.transaction(async (trx) => {
      let montantTotal = 0
      const numeroAchat = `ACH-${DateTime.now().toFormat('yyyyMMddHHmmss')}`

      const achat = await Achat.create(
        {
          fournisseurId: payload.fournisseurId,
          userId,
          numeroAchat,
          montantTotal: 0,
          dateAchat: DateTime.fromISO(payload.dateAchat),
        },
        { client: trx }
      )

      for (const ligne of payload.lignes) {
        const sousTotal = ligne.quantite * ligne.prixUnitaire
        montantTotal += sousTotal

        const lot = await Lot.create(
          {
            medicamentId: ligne.medicamentId,
            fournisseurId: payload.fournisseurId,
            numeroLot: ligne.numeroLot,
            quantite: ligne.quantite,
            prixAchat: ligne.prixUnitaire,
            dateExpiration: DateTime.fromISO(ligne.dateExpiration),
            dateReception: DateTime.fromISO(payload.dateAchat),
          },
          { client: trx }
        )

        await AchatDetail.create(
          {
            achatId: achat.id,
            lotId: lot.id,
            quantite: ligne.quantite,
            prixUnitaire: ligne.prixUnitaire,
            sousTotal,
          },
          { client: trx }
        )
      }

      achat.montantTotal = montantTotal
      achat.useTransaction(trx)
      await achat.save()

      await achat.load('fournisseur')
      await achat.load('user')
      await achat.load('details', (query) => {
        query.preload('lot', (lotQuery) => lotQuery.preload('medicament'))
      })

      return achat
    })
  }
}
