import { LotSchema } from '#database/schema'
import Fournisseur from '#models/fournisseur'
import Medicament from '#models/medicament'
import { beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class Lot extends LotSchema {
  @belongsTo(() => Medicament)
  declare medicament: BelongsTo<typeof Medicament>

  @belongsTo(() => Fournisseur)
  declare fournisseur: BelongsTo<typeof Fournisseur>

  @beforeCreate()
  static assignUuid(lot: Lot) {
    if (!lot.id) {
      lot.id = randomUUID()
    }
  }
}
