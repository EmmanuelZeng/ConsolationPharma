import { VenteDetailSchema } from '#database/schema'
import Lot from '#models/lot'
import Vente from '#models/vente'
import { beforeCreate, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class VenteDetail extends VenteDetailSchema {
  @belongsTo(() => Vente)
  declare vente: BelongsTo<typeof Vente>

  @belongsTo(() => Lot)
  declare lot: BelongsTo<typeof Lot>

  @beforeCreate()
  static assignUuid(detail: VenteDetail) {
    if (!detail.id) {
      detail.id = randomUUID()
    }
  }
}
